import { noChange } from "lit";
import { Directive, directive, PartType, type ElementPart, type PartInfo } from "lit/directive.js";
import { handleAction, hasAction, type ActionConfig } from "custom-card-helpers";
import type { LibrusHass } from "./types";

type ActionHost = HTMLElement & { hass?: LibrusHass };

/** True when the card should show a pointer cursor / actionable affordance. */
export function isActionable(tapAction: ActionConfig | undefined): boolean {
  return hasAction(tapAction);
}

/**
 * `<ha-card ${tapAction(this, config.tap_action, entityId)}>`: runs the tap
 * action on click, and while one is configured makes the card a keyboard
 * button (role="button", tabindex 0, Enter/Space) - a plain `@click` left
 * it unreachable without a mouse. With no action (or "none") the element
 * is left exactly as it was.
 */
class TapActionDirective extends Directive {
  private _host?: ActionHost;
  private _action?: ActionConfig;
  private _entity?: string;
  private _element?: HTMLElement;

  constructor(info: PartInfo) {
    super(info);
    if (info.type !== PartType.ELEMENT) throw new Error("tapAction() is an element directive");
  }

  render(_host: ActionHost, _action: ActionConfig | undefined, _entity?: string): unknown {
    return noChange;
  }

  update(part: ElementPart, [host, action, entity]: Parameters<this["render"]>): unknown {
    this._host = host;
    this._action = action;
    this._entity = entity;
    const el = part.element as HTMLElement;
    if (this._element !== el) {
      this._element = el;
      el.addEventListener("click", this._onClick);
      el.addEventListener("keydown", this._onKey);
    }
    if (this._active) {
      el.setAttribute("role", "button");
      el.setAttribute("tabindex", "0");
    } else {
      el.removeAttribute("role");
      el.removeAttribute("tabindex");
    }
    return noChange;
  }

  private get _active(): boolean {
    return Boolean(this._action && hasAction(this._action));
  }

  private _run(ev: Event): void {
    const host = this._host;
    if (!this._active || !host?.hass) return;
    ev.stopPropagation();
    handleAction(host, host.hass, { tap_action: this._action, entity: this._entity }, "tap");
  }

  private _onClick = (ev: Event): void => this._run(ev);

  private _onKey = (ev: KeyboardEvent): void => {
    // Only the card itself, not a focused control inside it.
    if (ev.target !== this._element || (ev.key !== "Enter" && ev.key !== " ")) return;
    if (!this._active) return;
    ev.preventDefault();
    this._run(ev);
  };
}

export const tapAction = directive(TapActionDirective);
