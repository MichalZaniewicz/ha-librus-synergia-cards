function e(e,t,i,a){var s,r=arguments.length,n=r<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,a);else for(var o=e.length-1;o>=0;o--)(s=e[o])&&(n=(r<3?s(n):r>3?s(t,i,n):s(t,i))||n);return r>3&&n&&Object.defineProperty(t,i,n),n}"function"==typeof SuppressedError&&SuppressedError;
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=globalThis,i=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,a=Symbol(),s=new WeakMap;let r=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==a)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(i&&void 0===e){const i=void 0!==t&&1===t.length;i&&(e=s.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&s.set(t,e))}return e}toString(){return this.cssText}};const n=(e,...t)=>{const i=1===e.length?e[0]:t.reduce((t,i,a)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[a+1],e[0]);return new r(i,e,a)},o=i?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return(e=>new r("string"==typeof e?e:e+"",void 0,a))(t)})(e):e,{is:c,defineProperty:d,getOwnPropertyDescriptor:l,getOwnPropertyNames:h,getOwnPropertySymbols:u,getPrototypeOf:g}=Object,p=globalThis,m=p.trustedTypes,v=m?m.emptyScript:"",b=p.reactiveElementPolyfillSupport,_=(e,t)=>e,y={toAttribute(e,t){switch(t){case Boolean:e=e?v:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(e){i=null}}return i}},f=(e,t)=>!c(e,t),w={attribute:!0,type:String,converter:y,reflect:!1,useDefault:!1,hasChanged:f};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),p.litPropertyMetadata??=new WeakMap;let k=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=w){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const i=Symbol(),a=this.getPropertyDescriptor(e,i,t);void 0!==a&&d(this.prototype,e,a)}}static getPropertyDescriptor(e,t,i){const{get:a,set:s}=l(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:a,set(t){const r=a?.call(this);s?.call(this,t),this.requestUpdate(e,r,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??w}static _$Ei(){if(this.hasOwnProperty(_("elementProperties")))return;const e=g(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(_("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(_("properties"))){const e=this.properties,t=[...h(e),...u(e)];for(const i of t)this.createProperty(i,e[i])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,i]of t)this.elementProperties.set(e,i)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const i=this._$Eu(e,t);void 0!==i&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const e of i)t.unshift(o(e))}else void 0!==e&&t.push(o(e));return t}static _$Eu(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((e,a)=>{if(i)e.adoptedStyleSheets=a.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const i of a){const a=document.createElement("style"),s=t.litNonce;void 0!==s&&a.setAttribute("nonce",s),a.textContent=i.cssText,e.appendChild(a)}})(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){const i=this.constructor.elementProperties.get(e),a=this.constructor._$Eu(e,i);if(void 0!==a&&!0===i.reflect){const s=(void 0!==i.converter?.toAttribute?i.converter:y).toAttribute(t,i.type);this._$Em=e,null==s?this.removeAttribute(a):this.setAttribute(a,s),this._$Em=null}}_$AK(e,t){const i=this.constructor,a=i._$Eh.get(e);if(void 0!==a&&this._$Em!==a){const e=i.getPropertyOptions(a),s="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:y;this._$Em=a;const r=s.fromAttribute(t,e.type);this[a]=r??this._$Ej?.get(a)??r,this._$Em=null}}requestUpdate(e,t,i,a=!1,s){if(void 0!==e){const r=this.constructor;if(!1===a&&(s=this[e]),i??=r.getPropertyOptions(e),!((i.hasChanged??f)(s,t)||i.useDefault&&i.reflect&&s===this._$Ej?.get(e)&&!this.hasAttribute(r._$Eu(e,i))))return;this.C(e,t,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:a,wrapped:s},r){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,r??t??this[e]),!0!==s||void 0!==r)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),!0===a&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,i]of e){const{wrapped:e}=i,a=this[t];!0!==e||this._$AL.has(t)||void 0===a||this.C(t,void 0,i,a)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};k.elementStyles=[],k.shadowRootOptions={mode:"open"},k[_("elementProperties")]=new Map,k[_("finalized")]=new Map,b?.({ReactiveElement:k}),(p.reactiveElementVersions??=[]).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const x=globalThis,$=e=>e,z=x.trustedTypes,j=z?z.createPolicy("lit-html",{createHTML:e=>e}):void 0,C="$lit$",S=`lit$${Math.random().toFixed(9).slice(2)}$`,D="?"+S,I=`<${D}>`,E=document,T=()=>E.createComment(""),N=e=>null===e||"object"!=typeof e&&"function"!=typeof e,A=Array.isArray,M="[ \t\n\f\r]",L=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,P=/-->/g,O=/>/g,B=RegExp(`>|${M}(?:([^\\s"'>=/]+)(${M}*=${M}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),F=/'/g,K=/"/g,U=/^(?:script|style|textarea|title)$/i,H=e=>(t,...i)=>({_$litType$:e,strings:t,values:i}),R=H(1),W=H(2),G=Symbol.for("lit-noChange"),q=Symbol.for("lit-nothing"),Z=new WeakMap,J=E.createTreeWalker(E,129);function V(e,t){if(!A(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==j?j.createHTML(t):t}const Y=(e,t)=>{const i=e.length-1,a=[];let s,r=2===t?"<svg>":3===t?"<math>":"",n=L;for(let t=0;t<i;t++){const i=e[t];let o,c,d=-1,l=0;for(;l<i.length&&(n.lastIndex=l,c=n.exec(i),null!==c);)l=n.lastIndex,n===L?"!--"===c[1]?n=P:void 0!==c[1]?n=O:void 0!==c[2]?(U.test(c[2])&&(s=RegExp("</"+c[2],"g")),n=B):void 0!==c[3]&&(n=B):n===B?">"===c[0]?(n=s??L,d=-1):void 0===c[1]?d=-2:(d=n.lastIndex-c[2].length,o=c[1],n=void 0===c[3]?B:'"'===c[3]?K:F):n===K||n===F?n=B:n===P||n===O?n=L:(n=B,s=void 0);const h=n===B&&e[t+1].startsWith("/>")?" ":"";r+=n===L?i+I:d>=0?(a.push(o),i.slice(0,d)+C+i.slice(d)+S+h):i+S+(-2===d?t:h)}return[V(e,r+(e[i]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),a]};class X{constructor({strings:e,_$litType$:t},i){let a;this.parts=[];let s=0,r=0;const n=e.length-1,o=this.parts,[c,d]=Y(e,t);if(this.el=X.createElement(c,i),J.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(a=J.nextNode())&&o.length<n;){if(1===a.nodeType){if(a.hasAttributes())for(const e of a.getAttributeNames())if(e.endsWith(C)){const t=d[r++],i=a.getAttribute(e).split(S),n=/([.?@])?(.*)/.exec(t);o.push({type:1,index:s,name:n[2],strings:i,ctor:"."===n[1]?ae:"?"===n[1]?se:"@"===n[1]?re:ie}),a.removeAttribute(e)}else e.startsWith(S)&&(o.push({type:6,index:s}),a.removeAttribute(e));if(U.test(a.tagName)){const e=a.textContent.split(S),t=e.length-1;if(t>0){a.textContent=z?z.emptyScript:"";for(let i=0;i<t;i++)a.append(e[i],T()),J.nextNode(),o.push({type:2,index:++s});a.append(e[t],T())}}}else if(8===a.nodeType)if(a.data===D)o.push({type:2,index:s});else{let e=-1;for(;-1!==(e=a.data.indexOf(S,e+1));)o.push({type:7,index:s}),e+=S.length-1}s++}}static createElement(e,t){const i=E.createElement("template");return i.innerHTML=e,i}}function Q(e,t,i=e,a){if(t===G)return t;let s=void 0!==a?i._$Co?.[a]:i._$Cl;const r=N(t)?void 0:t._$litDirective$;return s?.constructor!==r&&(s?._$AO?.(!1),void 0===r?s=void 0:(s=new r(e),s._$AT(e,i,a)),void 0!==a?(i._$Co??=[])[a]=s:i._$Cl=s),void 0!==s&&(t=Q(e,s._$AS(e,t.values),s,a)),t}class ee{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:i}=this._$AD,a=(e?.creationScope??E).importNode(t,!0);J.currentNode=a;let s=J.nextNode(),r=0,n=0,o=i[0];for(;void 0!==o;){if(r===o.index){let t;2===o.type?t=new te(s,s.nextSibling,this,e):1===o.type?t=new o.ctor(s,o.name,o.strings,this,e):6===o.type&&(t=new ne(s,this,e)),this._$AV.push(t),o=i[++n]}r!==o?.index&&(s=J.nextNode(),r++)}return J.currentNode=E,a}p(e){let t=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class te{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,i,a){this.type=2,this._$AH=q,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=a,this._$Cv=a?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=Q(this,e,t),N(e)?e===q||null==e||""===e?(this._$AH!==q&&this._$AR(),this._$AH=q):e!==this._$AH&&e!==G&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>A(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==q&&N(this._$AH)?this._$AA.nextSibling.data=e:this.T(E.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:i}=e,a="number"==typeof i?this._$AC(e):(void 0===i.el&&(i.el=X.createElement(V(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===a)this._$AH.p(t);else{const e=new ee(a,this),i=e.u(this.options);e.p(t),this.T(i),this._$AH=e}}_$AC(e){let t=Z.get(e.strings);return void 0===t&&Z.set(e.strings,t=new X(e)),t}k(e){A(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,a=0;for(const s of e)a===t.length?t.push(i=new te(this.O(T()),this.O(T()),this,this.options)):i=t[a],i._$AI(s),a++;a<t.length&&(this._$AR(i&&i._$AB.nextSibling,a),t.length=a)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=$(e).nextSibling;$(e).remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class ie{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,a,s){this.type=1,this._$AH=q,this._$AN=void 0,this.element=e,this.name=t,this._$AM=a,this.options=s,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=q}_$AI(e,t=this,i,a){const s=this.strings;let r=!1;if(void 0===s)e=Q(this,e,t,0),r=!N(e)||e!==this._$AH&&e!==G,r&&(this._$AH=e);else{const a=e;let n,o;for(e=s[0],n=0;n<s.length-1;n++)o=Q(this,a[i+n],t,n),o===G&&(o=this._$AH[n]),r||=!N(o)||o!==this._$AH[n],o===q?e=q:e!==q&&(e+=(o??"")+s[n+1]),this._$AH[n]=o}r&&!a&&this.j(e)}j(e){e===q?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class ae extends ie{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===q?void 0:e}}class se extends ie{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==q)}}class re extends ie{constructor(e,t,i,a,s){super(e,t,i,a,s),this.type=5}_$AI(e,t=this){if((e=Q(this,e,t,0)??q)===G)return;const i=this._$AH,a=e===q&&i!==q||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,s=e!==q&&(i===q||a);a&&this.element.removeEventListener(this.name,this,i),s&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}let ne=class{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){Q(this,e)}};const oe=x.litHtmlPolyfillSupport;oe?.(X,te),(x.litHtmlVersions??=[]).push("3.3.3");const ce=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class de extends k{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,i)=>{const a=i?.renderBefore??t;let s=a._$litPart$;if(void 0===s){const e=i?.renderBefore??null;a._$litPart$=s=new te(t.insertBefore(T(),e),e,void 0,i??{})}return s._$AI(e),s})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return G}}de._$litElement$=!0,de.finalized=!0,ce.litElementHydrateSupport?.({LitElement:de});const le=ce.litElementPolyfillSupport;le?.({LitElement:de}),(ce.litElementVersions??=[]).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const he=e=>(t,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)},ue={attribute:!0,type:String,converter:y,reflect:!1,hasChanged:f},ge=(e=ue,t,i)=>{const{kind:a,metadata:s}=i;let r=globalThis.litPropertyMetadata.get(s);if(void 0===r&&globalThis.litPropertyMetadata.set(s,r=new Map),"setter"===a&&((e=Object.create(e)).wrapped=!0),r.set(i.name,e),"accessor"===a){const{name:a}=i;return{set(i){const s=t.get.call(this);t.set.call(this,i),this.requestUpdate(a,s,e,!0,i)},init(t){return void 0!==t&&this.C(a,void 0,e,t),t}}}if("setter"===a){const{name:a}=i;return function(i){const s=this[a];t.call(this,i),this.requestUpdate(a,s,e,!0,i)}}throw Error("Unsupported decorator location: "+a)};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function pe(e){return(t,i)=>"object"==typeof i?ge(e,t,i):((e,t,i)=>{const a=t.hasOwnProperty(i);return t.constructor.createProperty(i,e),a?Object.getOwnPropertyDescriptor(t,i):void 0})(e,t,i)}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function me(e){return pe({...e,state:!0,attribute:!1})}const ve="librus_synergia";class be extends Error{constructor(e,t){super(e),this.code=e,this.deviceId=t}}function _e(e){const t=new Set;for(const i of Object.values(e.entities??{}))i.platform===ve&&i.device_id&&t.add(i.device_id);return[...t]}function ye(e,t){const i=_e(e);if(t){if(!i.includes(t))throw new be("device_missing",t);return t}if(1===i.length)return i[0];if(0===i.length)throw new be("no_device");throw new be("multiple_devices")}function fe(e,t){const i={};for(const a of Object.values(e.entities??{}))a.device_id===t&&a.platform===ve&&a.translation_key&&(i[a.translation_key]=a.entity_id);return i}function we(e,t,i){const a=[];for(const s of Object.values(e.entities??{}))if(s.device_id===t&&s.platform===ve&&s.translation_key===i){const t=e.states[s.entity_id],i=t?.attributes;a.push({entityId:s.entity_id,subject:i?.subject||s.entity_id,subjectId:i?.subject_id})}return a.sort((e,t)=>e.subject.localeCompare(t.subject))}const ke={"error.device_missing":"Device {device} not found","error.multiple_devices":"Multiple students found - set device_id","error.no_device":"No Librus Synergia device found","empty.loading":"Loading…","empty.generic_error":"Something went wrong","editor.student":"Student","editor.subject":"Subject","editor.subject_auto":"Overall / all subjects","editor.title":"Card title (optional)","editor.max_items":"Max rows shown","editor.days_ahead":"Days ahead","editor.days_back":"Days of history","editor.target":"Target average","editor.mailbox":"Mailbox","editor.show_saturday":"Show Saturday","editor.exam_keywords":"Exam category keywords (comma-separated)","editor.icon":"Icon override (e.g. mdi:star)","editor.hide_header":"Hide header","editor.compact":"Compact mode","editor.category_filter":"Category filter (comma-separated, optional)","editor.sort":"Sort order","sort.newest":"Newest first","sort.oldest":"Oldest first","card.grades.title":"Grade average","card.grades.subtitle":"All subjects","card.grades.empty":"No grades yet this year","card.subject_spotlight.title":"Best & weakest subject","card.subject_spotlight.subtitle":"By average","card.subject_spotlight.empty":"Not enough graded subjects to compare yet","card.subject_spotlight.best":"Top subject","card.subject_spotlight.weakest":"Room to grow","card.grade_trend.title":"Grade trend","card.grade_trend.subtitle":"Last {days} days","card.grade_trend.empty":"Not enough history yet","card.grade_distribution.title":"Grade distribution","card.grade_distribution.subtitle":"{count} grades, all subjects","card.grade_distribution.other":"other","card.grades_radar.title":"Grade profile","card.grades_radar.subtitle":"By subject","card.grades_radar.empty":"Not enough subjects with grades yet","label.average":"Average","card.grade_category_distribution.title":"Grades by category","card.grade_category_distribution.subtitle":"Tests, quizzes, answers…","card.grade_category_distribution.empty":"No categorized grades yet","unit.grades":"grades","card.grade_category_distribution.uncategorized":"Uncategorized","card.subject_time.title":"Lesson time split","card.subject_time.subtitle":"Lessons per week, by subject","card.subject_time.empty":"No lessons found for this week","unit.lessons_per_week":"lessons/wk","card.attendance_weekday.title":"Absences by weekday","card.attendance_weekday.subtitle":"This school year","card.attendance_weekday.empty":"No absences or lates recorded","card.recent_activity.title":"What's new","card.recent_activity.subtitle":"Grades, notices, announcements & messages","card.recent_activity.empty":"Nothing new yet","card.grade_log.title":"Grade log","card.grade_log.subtitle":"All subjects","card.grade_log.empty_filtered":"No grades match this filter","card.latest_grade.title":"Latest grade","card.latest_grade.empty":"No grades yet","card.behaviour_grade.title":"Behaviour grade","card.behaviour_grade.subtitle":"Semester grade","card.behaviour_grade.empty":"No behaviour grade yet","card.descriptive_grades.title":"Descriptive grades","card.descriptive_grades.subtitle":"Non-numeric assessment","card.descriptive_grades.empty":"No descriptive grades yet","card.attendance.title":"Attendance","card.attendance.subtitle":"This school year","card.attendance.by_semester":"By semester","card.attendance_heatmap.title":"Attendance - year map","card.attendance_heatmap.subtitle":"This school year","card.attendance_heatmap.empty":"No attendance data","card.attendance_heatmap.status.good":"Present","card.attendance_heatmap.status.warn":"Excused","card.attendance_heatmap.status.bad":"Unexcused","card.attendance_heatmap.no_data":"No data","card.attendance.semester":"Semester {n}","stat.absences":"Absences","stat.unexcused":"Unexcused","stat.excused":"Excused","stat.late":"Late","stat.records":"Records","stat.percentage":"Attendance","card.behaviour_notices.title":"Behaviour notices","card.behaviour_notices.empty":"No notices","card.messages.title":"Messages","card.messages.unavailable":"Messages module not enabled","card.messages.read_notice":"Opening marks it as read in Librus","card.messages.fetch_failed":"Couldn't load the full message","card.messages.attachment_notice":"Attached - open in the Librus app to download","card.substitutions.title":"Substitutions, alerts & justifications","card.substitutions.subtitle":"Zastępstwa, alerty i usprawiedliwienia","card.substitutions.empty":"No substitutions, alerts, or justifications","mailbox.inbox":"Inbox","mailbox.notes":"Notes","mailbox.alerts":"Alerts","mailbox.substitutions":"Substitutions","mailbox.absences":"Absences","mailbox.justifications":"Justifications","mailbox.trash":"Trash","card.announcements.title":"Announcements","card.announcements.empty":"No announcements","card.homework_assignments.title":"Homework assignments","card.homework_assignments.empty":"No homework assignments","label.due":"Due","card.today_lessons.title":"Today's lessons","card.today_lessons.subtitle":"Timetable","card.today_lessons.empty":"No lessons today","label.now":"now","card.next_lesson.title":"Next lesson","card.next_lesson.empty":"No more lessons today","label.in_minutes":"in {minutes} min","label.in_hours":"in {hours}h","label.in_hours_minutes":"in {hours}h {minutes}m","label.in_days":"in {days}d","label.in_days_hours":"in {days}d {hours}h","card.agenda.title":"Agenda","card.agenda.subtitle":"Upcoming","card.agenda.empty":"Nothing scheduled","card.free_days.title":"Free days","card.free_days.empty":"No upcoming free days","label.days_until":"days until","card.school_year.title":"End of school year","card.school_year.empty":"No school year data","label.days_until_year_end":"days until year end","label.current_semester":"Current semester","label.days_until_semester_end":"days until semester end","label.year_progress":"School year","card.exam_countdown.title":"Next exam","card.exam_countdown.empty":"No upcoming exams","card.week_timetable.title":"Week timetable","card.week_timetable.subtitle":"This week","card.week_timetable.subtitle_upcoming":"Upcoming week","card.week_timetable.break_now":"Break — next lesson in {minutes} min","card.week_timetable.empty":"No lessons found for this week","card.school.title":"School","label.head_teacher":"Head teacher","label.tutor":"Homeroom teacher","label.semester_ends":"Semester ends","label.year_ends":"Year ends","card.today.title":"Today","stat.lucky_number":"Lucky number","card.week_summary.title":"Week in review","stat.new_grades":"New grades","card.lucky_number.title":"Lucky number","card.lucky_number.subtitle":"Today in the register","card.lucky_number.subtitle_for_date":"For {date}","card.lucky_number.yours_today":"It's your number today!","card.lucky_number.yours_for_date":"It's your number on {date}!","card.lucky_number.empty":"No lucky number published yet (e.g. during a school break)","card.student.title":"Student card","stat.overall_rating":"overall","stat.attendance_score":"Attendance","stat.behaviour_score":"Behaviour","stat.grades_score":"Grades","stat.activity_score":"Activity","card.streak.title":"Streaks","card.streak.attendance":"No absences","card.streak.behaviour":"Good behaviour","card.streak.grades":"Good grades","label.days":"days","card.rank.title":"Rank","card.rank.empty":"No grades yet to compute a rank","rank.bronze":"Bronze","rank.silver":"Silver","rank.gold":"Gold","rank.diamond":"Diamond","label.to_next_rank":"to next rank","label.top_rank":"Top rank reached","card.achievements.title":"Achievements","card.achievements.count":"{n} unlocked","card.achievements.empty":"No badges yet - they'll appear here once a new achievement is unlocked while this card is on a dashboard (earlier ones can't be recovered)","card.achievements.next_hint":"{n} more to: {title}","achievement.first_six":"First six!","achievement.good_grade_streak_5":"5 good grades in a row","achievement.good_grade_streak_10":"10 good grades in a row","achievement.good_grade_streak_20":"20 good grades in a row","achievement.attendance_streak_7":"A week without an absence","achievement.attendance_streak_30":"A month without an absence","achievement.attendance_streak_90":"3 months without an absence","achievement.behaviour_streak_7":"A week without a note","achievement.behaviour_streak_30":"A month without a note","achievement.behaviour_streak_90":"3 months without a note","card.level.title":"Level","card.level.subtitle":"XP from grades & attendance","label.level":"Level {n}","label.xp_to_next":"{n} XP to next level","label.xp_from_grades":"From grades","label.xp_from_attendance":"From attendance","label.xp_total":"Total XP","card.teachers.title":"Teachers","card.teachers.homeroom":"Homeroom teacher","card.teachers.count":"{n} subjects","card.teachers.empty":"No teacher directory yet","card.grade_goal.title":"Grade goal","card.grade_goal.subtitle_overall":"Overall average","card.grade_goal.empty":"No grades yet to track a goal against","card.grade_goal.reached":"Goal reached 🎉","label.current":"Now","label.target":"Target","label.to_go":"to go","label.sixes_needed":"≈ {n} more top grades","card.bell_schedule.title":"Today's schedule","card.bell_schedule.empty":"No bell schedule yet — needs ha-librus-synergia with the bell_schedule attribute","label.lesson_short":"L{n}","label.after_school":"School's out for today","card.tomorrow.title":"Tomorrow","card.tomorrow.title_next_school_day":"Next school day","card.tomorrow.empty":"Nothing scheduled for the next school day","card.tomorrow.lessons":"lessons","card.tomorrow.starts":"Starts","card.tomorrow.ends":"Ends","card.tomorrow.homework":"Homework due: {n}","card.grade_simulator.subtitle":"What if… (rough estimate)","card.grade_simulator.empty":"Pick a subject that has grades","label.weight":"Weight","card.homework_checklist.title":"Homework checklist","card.homework_checklist.progress":"{done}/{total} done","card.semester_comparison.title":"Semester comparison","card.semester_comparison.subtitle":"Semester 1 vs 2, by subject","card.semester_comparison.empty":"No semester averages yet","card.semester_comparison.s1":"Sem 1","card.semester_comparison.s2":"Sem 2","editor.mode":"Mode","mode.archetype":"Archetype","mode.hero":"Hero","card.hero.title_archetype":"Your archetype","card.hero.title_hero":"Your hero","card.hero.subtitle":"based on your Librus data","card.hero.empty":"Not enough data yet to compute a result","hero.chip.avg_naukowiec":"STEM avg {n}","hero.chip.avg_humanista":"Humanities avg {n}","hero.chip.avg_poliglota":"Languages avg {n}","hero.chip.avg_artysta":"Arts avg {n}","hero.chip.avg_sportowiec":"PE avg {n}","hero.chip.grades":"{n} grades","hero.chip.streak_days":"{n}-day streak","hero.chip.unexcused":"{n} unexcused","hero.chip.good_streak":"{n}-grade streak","hero.chip.overall_avg":"avg {n}","hero.chip.overall_avg_full":"overall avg {n}","hero.chip.semester1":"term 1: {n}","hero.chip.semester2":"term 2: {n}","hero.chip.behaviour":"conduct {name}","hero.chip.positive_notes":"+{n} notes","hero.chip.badges":"{n} badges","hero.chip.various_categories":"various categories","hero.chip.subjects_count":"{n} subjects","hero.chip.spread":"spread {n}","hero.naukowiec.archetype_name":"Scientist","hero.naukowiec.hero_name":"Archmage","hero.naukowiec.archetype_desc":"Maths, physics and computer science outshine every other subject.","hero.naukowiec.hero_desc":"You wield the magic of numbers - equations are your spells.","hero.humanista.archetype_name":"Humanist","hero.humanista.hero_name":"Bard","hero.humanista.archetype_desc":"Polish and history are the subjects where you shine brightest.","hero.humanista.hero_desc":"Words are your weapon - a good story wins anyone over.","hero.poliglota.archetype_name":"Polyglot","hero.poliglota.hero_name":"Translator","hero.poliglota.archetype_desc":"English and German clearly outrank every other subject.","hero.poliglota.hero_desc":"You know more languages than most adults ever will.","hero.artysta.archetype_name":"Artist","hero.artysta.hero_name":"Illusionist","hero.artysta.archetype_desc":"Art and music are the subjects where you're strongest.","hero.artysta.hero_desc":"You create worlds that others can only imagine.","hero.sportowiec.archetype_name":"Athlete","hero.sportowiec.hero_name":"Herald of the Arena","hero.sportowiec.archetype_desc":"Physical education is clearly your strongest subject.","hero.sportowiec.hero_desc":"Strength and stamina - nobody on the field matches you.","hero.wojownik.archetype_name":"Attendance Warrior","hero.wojownik.hero_name":"The Unyielding","hero.wojownik.archetype_desc":"A long attendance streak and zero unexcused absences.","hero.wojownik.hero_desc":"You show up every single day, no exceptions, no excuses.","hero.meteor.archetype_name":"Meteor","hero.meteor.hero_name":"Meteor","hero.meteor.archetype_desc":"Your good-grade streak stretches back a dozen entries.","hero.meteor.hero_desc":"You're tearing through the term, leaving a trail of grades.","hero.feniks.archetype_name":"Phoenix","hero.feniks.hero_name":"Phoenix","hero.feniks.archetype_desc":"This semester's average is clearly up from the last one.","hero.feniks.hero_desc":"You rise from a weaker start, stronger than before.","hero.spolecznik.archetype_name":"People Person","hero.spolecznik.hero_name":"Healer","hero.spolecznik.archetype_desc":"Model conduct grade and nothing but positive notes.","hero.spolecznik.hero_desc":"Your presence calms and settles the whole class at once.","hero.kolekcjoner.archetype_name":"Collector","hero.kolekcjoner.hero_name":"Trophy Hunter","hero.kolekcjoner.archetype_desc":"The most unlocked badges across every category.","hero.kolekcjoner.hero_desc":"Your trophy case is bursting with earned achievements.","hero.prymus.archetype_name":"Top of the Class","hero.prymus.hero_name":"Legend","hero.prymus.archetype_desc":"A high average holds steady across every subject.","hero.prymus.hero_desc":"They'll be telling stories about your results for years.","hero.wszechstronny.archetype_name":"All-Rounder","hero.wszechstronny.hero_name":"Avatar of Balance","hero.wszechstronny.archetype_desc":"No subject dominates - your grades are level across the board.","hero.wszechstronny.hero_desc":"You wield a bit of every element - nothing surprises you.","card.hero_stats.title":"Hero stats","card.hero_stats.subtitle":"Your character sheet","card.hero_stats.empty":"Not enough data for stats yet","hero_stat.sila":"Strength","hero_stat.intelekt":"Intellect","hero_stat.wiedza":"Wisdom","hero_stat.charyzma":"Charisma","hero_stat.wytrwalosc":"Endurance","hero_stat.szczescie":"Luck","card.hero_history.title":"Hero history","card.hero_history.subtitle":"how your result changed over time","card.hero_history.empty":"No history yet - it appears once your result changes","card.hero_history.current":"current ({n}d)","card.last_update.subtitle":"Last data refresh","label.just_now":"Just now","label.minutes_ago":"{minutes} min ago","label.hours_ago":"{hours}h ago","label.days_ago":"{days}d ago"},xe={en:ke,pl:{"error.device_missing":"Nie znaleziono urządzenia {device}","error.multiple_devices":"Znaleziono kilkoro uczniów - ustaw device_id","error.no_device":"Nie znaleziono urządzenia Librus Synergia","empty.loading":"Wczytywanie…","empty.generic_error":"Coś poszło nie tak","editor.student":"Uczeń","editor.subject":"Przedmiot","editor.subject_auto":"Ogólna / wszystkie przedmioty","editor.title":"Tytuł karty (opcjonalnie)","editor.max_items":"Maks. liczba wierszy","editor.days_ahead":"Dni do przodu","editor.days_back":"Dni historii","editor.target":"Docelowa średnia","editor.mailbox":"Skrzynka","editor.show_saturday":"Pokaż sobotę","editor.exam_keywords":"Słowa-klucze kategorii sprawdzianów (po przecinku)","editor.icon":"Własna ikona (np. mdi:star)","editor.hide_header":"Ukryj nagłówek","editor.compact":"Tryb kompaktowy","editor.category_filter":"Filtr kategorii (po przecinku, opcjonalnie)","editor.sort":"Kolejność","sort.newest":"Najpierw najnowsze","sort.oldest":"Najpierw najstarsze","card.grades.title":"Średnia ocen","card.grades.subtitle":"Wszystkie przedmioty","card.grades.empty":"Brak ocen w tym roku szkolnym","card.subject_spotlight.title":"Najlepszy i najsłabszy przedmiot","card.subject_spotlight.subtitle":"Wg średniej","card.subject_spotlight.empty":"Za mało przedmiotów z ocenami, by porównać","card.subject_spotlight.best":"Najlepszy","card.subject_spotlight.weakest":"Do przećwiczenia","card.grade_trend.title":"Trend średniej","card.grade_trend.subtitle":"Ostatnie {days} dni","card.grade_trend.empty":"Za mało historii","card.grade_distribution.title":"Rozkład ocen","card.grade_distribution.subtitle":"{count} ocen, wszystkie przedmioty","card.grade_distribution.other":"inne","card.grades_radar.title":"Profil ocen","card.grades_radar.subtitle":"Wg przedmiotu","card.grades_radar.empty":"Za mało przedmiotów z ocenami","label.average":"Średnia","card.grade_category_distribution.title":"Oceny wg kategorii","card.grade_category_distribution.subtitle":"Sprawdziany, kartkówki, odpowiedzi…","card.grade_category_distribution.empty":"Brak ocen z przypisaną kategorią","unit.grades":"ocen","card.grade_category_distribution.uncategorized":"Bez kategorii","card.subject_time.title":"Podział czasu lekcji","card.subject_time.subtitle":"Lekcje w tygodniu, wg przedmiotu","card.subject_time.empty":"Brak lekcji w tym tygodniu","unit.lessons_per_week":"lekcji/tydz.","card.attendance_weekday.title":"Nieobecności wg dnia tygodnia","card.attendance_weekday.subtitle":"Ten rok szkolny","card.attendance_weekday.empty":"Brak nieobecności ani spóźnień","card.recent_activity.title":"Co nowego","card.recent_activity.subtitle":"Oceny, uwagi, ogłoszenia i wiadomości","card.recent_activity.empty":"Nic nowego","card.grade_log.title":"Dziennik ocen","card.grade_log.subtitle":"Wszystkie przedmioty","card.grade_log.empty_filtered":"Brak ocen pasujących do filtra","card.latest_grade.title":"Ostatnia ocena","card.latest_grade.empty":"Brak ocen","card.behaviour_grade.title":"Ocena zachowania","card.behaviour_grade.subtitle":"Ocena semestralna","card.behaviour_grade.empty":"Brak jeszcze oceny zachowania","card.descriptive_grades.title":"Oceny opisowe","card.descriptive_grades.subtitle":"Ocenianie opisowe","card.descriptive_grades.empty":"Brak jeszcze ocen opisowych","card.attendance.title":"Frekwencja","card.attendance.subtitle":"W tym roku szkolnym","card.attendance.by_semester":"Wg semestru","card.attendance_heatmap.title":"Frekwencja - mapa roku","card.attendance_heatmap.subtitle":"Ten rok szkolny","card.attendance_heatmap.empty":"Brak danych o frekwencji","card.attendance_heatmap.status.good":"Obecność","card.attendance_heatmap.status.warn":"Usprawiedliwiona","card.attendance_heatmap.status.bad":"Nieusprawiedliwiona","card.attendance_heatmap.no_data":"Brak danych","card.attendance.semester":"Semestr {n}","stat.absences":"Nieobecności","stat.unexcused":"Nieusprawiedliwione","stat.excused":"Usprawiedliwione","stat.late":"Spóźnienia","stat.records":"Rekordów","stat.percentage":"Frekwencja","card.behaviour_notices.title":"Uwagi","card.behaviour_notices.empty":"Brak uwag","card.messages.title":"Wiadomości","card.messages.unavailable":"Moduł wiadomości nie jest włączony","card.messages.read_notice":"Otwarcie oznaczy jako przeczytane w Librusie","card.messages.fetch_failed":"Nie udało się pobrać pełnej treści","card.messages.attachment_notice":"Załącznik - pobierz w aplikacji Librus","card.substitutions.title":"Zastępstwa, alerty i usprawiedliwienia","card.substitutions.subtitle":"Wiadomości specjalne","card.substitutions.empty":"Brak zastępstw, alertów ani usprawiedliwień","mailbox.inbox":"Odebrane","mailbox.notes":"Uwagi","mailbox.alerts":"Alerty","mailbox.substitutions":"Zastępstwa","mailbox.absences":"Nieobecności","mailbox.justifications":"Usprawiedliwienia","mailbox.trash":"Kosz","card.announcements.title":"Ogłoszenia","card.announcements.empty":"Brak ogłoszeń","card.homework_assignments.title":"Zadania domowe","card.homework_assignments.empty":"Brak zadań domowych","label.due":"Termin","card.today_lessons.title":"Dzisiejszy plan lekcji","card.today_lessons.subtitle":"Plan lekcji","card.today_lessons.empty":"Brak lekcji dzisiaj","label.now":"teraz","card.next_lesson.title":"Najbliższa lekcja","card.next_lesson.empty":"Koniec lekcji na dziś","label.in_minutes":"za {minutes} min","label.in_hours":"za {hours} godz.","label.in_hours_minutes":"za {hours} godz. {minutes} min","label.in_days":"za {days} dni","label.in_days_hours":"za {days} dni {hours} godz.","card.agenda.title":"Terminarz","card.agenda.subtitle":"Nadchodzące","card.agenda.empty":"Brak zaplanowanych wydarzeń","card.free_days.title":"Dni wolne","card.free_days.empty":"Brak nadchodzących dni wolnych","label.days_until":"dni do","card.school_year.title":"Koniec roku szkolnego","card.school_year.empty":"Brak danych o roku szkolnym","label.days_until_year_end":"dni do końca roku","label.current_semester":"Aktualny semestr","label.days_until_semester_end":"dni do końca semestru","label.year_progress":"Rok szkolny","card.exam_countdown.title":"Najbliższy sprawdzian","card.exam_countdown.empty":"Brak nadchodzących sprawdzianów","card.week_timetable.title":"Plan tygodniowy","card.week_timetable.subtitle":"Ten tydzień","card.week_timetable.subtitle_upcoming":"Nadchodzący tydzień","card.week_timetable.break_now":"Przerwa — następna lekcja za {minutes} min","card.week_timetable.empty":"Brak lekcji w tym tygodniu","card.school.title":"Szkoła","label.head_teacher":"Dyrektor","label.tutor":"Wychowawca","label.semester_ends":"Koniec semestru","label.year_ends":"Koniec roku szkolnego","card.today.title":"Dziś","stat.lucky_number":"Numerek","card.week_summary.title":"Tydzień w skrócie","stat.new_grades":"Nowe oceny","card.lucky_number.title":"Szczęśliwy numerek","card.lucky_number.subtitle":"Dziś w dzienniku","card.lucky_number.subtitle_for_date":"Na {date}","card.lucky_number.yours_today":"To Twój numerek dzisiaj!","card.lucky_number.yours_for_date":"To Twój numerek na {date}!","card.lucky_number.empty":"Nie opublikowano jeszcze numerka (np. w trakcie przerwy szkolnej)","card.student.title":"Karta ucznia","stat.overall_rating":"ocena ogólna","stat.attendance_score":"Frekwencja","stat.behaviour_score":"Zachowanie","stat.grades_score":"Oceny","stat.activity_score":"Aktywność","card.streak.title":"Passy","card.streak.attendance":"Bez nieobecności","card.streak.behaviour":"Dobre zachowanie","card.streak.grades":"Dobre oceny","label.days":"dni","card.rank.title":"Ranga","card.rank.empty":"Brak jeszcze ocen do wyliczenia rangi","rank.bronze":"Brąz","rank.silver":"Srebro","rank.gold":"Złoto","rank.diamond":"Diament","label.to_next_rank":"do kolejnej rangi","label.top_rank":"Osiągnięto najwyższą rangę","card.achievements.title":"Osiągnięcia","card.achievements.count":"Odblokowano: {n}","card.achievements.empty":"Jeszcze żadnych odznak - pojawią się tu, gdy nowe osiągnięcie odblokuje się przy tej karcie na dashboardzie (wcześniejszych nie da się odzyskać)","card.achievements.next_hint":"Jeszcze {n} do: {title}","achievement.first_six":"Pierwsza szóstka!","achievement.good_grade_streak_5":"5 dobrych ocen z rzędu","achievement.good_grade_streak_10":"10 dobrych ocen z rzędu","achievement.good_grade_streak_20":"20 dobrych ocen z rzędu","achievement.attendance_streak_7":"Tydzień bez nieobecności","achievement.attendance_streak_30":"Miesiąc bez nieobecności","achievement.attendance_streak_90":"3 miesiące bez nieobecności","achievement.behaviour_streak_7":"Tydzień bez uwagi","achievement.behaviour_streak_30":"Miesiąc bez uwagi","achievement.behaviour_streak_90":"3 miesiące bez uwagi","card.level.title":"Poziom","card.level.subtitle":"XP za oceny i frekwencję","label.level":"Poziom {n}","label.xp_to_next":"{n} XP do kolejnego poziomu","label.xp_from_grades":"Z ocen","label.xp_from_attendance":"Z frekwencji","label.xp_total":"Suma XP","card.teachers.title":"Nauczyciele","card.teachers.homeroom":"Wychowawca","card.teachers.count":"{n} przedmiotów","card.teachers.empty":"Brak jeszcze katalogu nauczycieli","card.grade_goal.title":"Cel oceny","card.grade_goal.subtitle_overall":"Średnia ogólna","card.grade_goal.empty":"Brak ocen, na których można oprzeć cel","card.grade_goal.reached":"Cel osiągnięty 🎉","label.current":"Teraz","label.target":"Cel","label.to_go":"do celu","label.sixes_needed":"≈ jeszcze {n}× ocena maksymalna","card.bell_schedule.title":"Plan dnia","card.bell_schedule.empty":"Brak rozkładu dzwonków — wymaga ha-librus-synergia z atrybutem bell_schedule","label.lesson_short":"L{n}","label.after_school":"Lekcje na dziś zakończone","card.tomorrow.title":"Jutro","card.tomorrow.title_next_school_day":"Następny dzień nauki","card.tomorrow.empty":"Nic zaplanowanego na następny dzień nauki","card.tomorrow.lessons":"lekcji","card.tomorrow.starts":"Początek","card.tomorrow.ends":"Koniec","card.tomorrow.homework":"Zadania na termin: {n}","card.grade_simulator.subtitle":"A gdyby… (szacunkowo)","card.grade_simulator.empty":"Wybierz przedmiot, który ma oceny","label.weight":"Waga","card.homework_checklist.title":"Zadania do odhaczenia","card.homework_checklist.progress":"{done}/{total} zrobione","card.semester_comparison.title":"Porównanie semestrów","card.semester_comparison.subtitle":"Semestr 1 vs 2, wg przedmiotu","card.semester_comparison.empty":"Brak średnich semestralnych","card.semester_comparison.s1":"Sem 1","card.semester_comparison.s2":"Sem 2","editor.mode":"Tryb","mode.archetype":"Archetyp","mode.hero":"Bohater","card.hero.title_archetype":"Twój archetyp","card.hero.title_hero":"Twój bohater","card.hero.subtitle":"na podstawie danych z Librusa","card.hero.empty":"Za mało danych, żeby coś obliczyć","hero.chip.avg_naukowiec":"śr. ścisłych {n}","hero.chip.avg_humanista":"śr. humanist. {n}","hero.chip.avg_poliglota":"śr. języków {n}","hero.chip.avg_artysta":"śr. artyst. {n}","hero.chip.avg_sportowiec":"śr. WF {n}","hero.chip.grades":"{n} ocen","hero.chip.streak_days":"passa {n} dni","hero.chip.unexcused":"{n} nieuspr.","hero.chip.good_streak":"passa {n} ocen","hero.chip.overall_avg":"śr. {n}","hero.chip.overall_avg_full":"śr. ogólna {n}","hero.chip.semester1":"sem. 1: {n}","hero.chip.semester2":"sem. 2: {n}","hero.chip.behaviour":"zachowanie {name}","hero.chip.positive_notes":"uwagi +{n}","hero.chip.badges":"odznaki {n}","hero.chip.various_categories":"różne kategorie","hero.chip.subjects_count":"{n} przedm.","hero.chip.spread":"rozrzut {n}","hero.naukowiec.archetype_name":"Naukowiec","hero.naukowiec.hero_name":"Archimag","hero.naukowiec.archetype_desc":"Matematyka, fizyka i informatyka biją resztę przedmiotów na głowę.","hero.naukowiec.hero_desc":"Władasz magią liczb - zaklęcia to wzory, różdżka to kalkulator.","hero.humanista.archetype_name":"Humanista","hero.humanista.hero_name":"Bard","hero.humanista.archetype_desc":"Polski i historia to przedmioty, w których błyszczysz najbardziej.","hero.humanista.hero_desc":"Słowo to Twoja broń - opowieścią przekonasz każdego wokół siebie.","hero.poliglota.archetype_name":"Poliglota","hero.poliglota.hero_name":"Tłumacz","hero.poliglota.archetype_desc":"Angielski i niemiecki wyraźnie górują nad resztą przedmiotów.","hero.poliglota.hero_desc":"Znasz więcej języków niż większość dorosłych w Twoim otoczeniu.","hero.artysta.archetype_name":"Artysta","hero.artysta.hero_name":"Iluzjonista","hero.artysta.archetype_desc":"Plastyka i muzyka to obszary, w których jesteś najmocniejszy.","hero.artysta.hero_desc":"Tworzysz światy, które inni potrafią sobie jedynie wyobrazić.","hero.sportowiec.archetype_name":"Sportowiec","hero.sportowiec.hero_name":"Herold Areny","hero.sportowiec.archetype_desc":"Wychowanie fizyczne to zdecydowanie Twoja najmocniejsza strona.","hero.sportowiec.hero_desc":"Siła i wytrwałość - na boisku nikt Ci dziś nie dorównuje.","hero.wojownik.archetype_name":"Wojownik Frekwencji","hero.wojownik.hero_name":"Niezłomny","hero.wojownik.archetype_desc":"Długa passa obecności i zero nieusprawiedliwionych nieobecności.","hero.wojownik.hero_desc":"Stajesz na posterunku każdego dnia, bez wyjątku i bez wymówek.","hero.meteor.archetype_name":"Meteor","hero.meteor.hero_name":"Meteor","hero.meteor.archetype_desc":"Passa dobrych ocen ciągnie się przez ostatnie kilkanaście wpisów.","hero.meteor.hero_desc":"Pędzisz przez semestr, zostawiając za sobą świetlisty ślad ocen.","hero.feniks.archetype_name":"Feniks","hero.feniks.hero_name":"Feniks","hero.feniks.archetype_desc":"Średnia w tym semestrze rośnie wyraźnie względem poprzedniego.","hero.feniks.hero_desc":"Powstajesz z popiołów słabszego startu, silniejszy niż wcześniej.","hero.spolecznik.archetype_name":"Społecznik","hero.spolecznik.hero_name":"Uzdrowiciel","hero.spolecznik.archetype_desc":"Wzorowa ocena zachowania i same pozytywne uwagi nauczycieli.","hero.spolecznik.hero_desc":"Twoja obecność koi nastroje i łagodzi spory całej klasy.","hero.kolekcjoner.archetype_name":"Kolekcjoner","hero.kolekcjoner.hero_name":"Łowca Trofeów","hero.kolekcjoner.archetype_desc":"Najwięcej odblokowanych odznak spośród wszystkich kategorii.","hero.kolekcjoner.hero_desc":"Twoja gablota z trofeami pęka w szwach od zdobytych osiągnięć.","hero.prymus.archetype_name":"Prymus","hero.prymus.hero_name":"Legenda","hero.prymus.archetype_desc":"Wysoka średnia utrzymuje się równo we wszystkich przedmiotach.","hero.prymus.hero_desc":"O Twoich wynikach będą opowiadać jeszcze długo po Twoim odejściu.","hero.wszechstronny.archetype_name":"Wszechstronny Talent","hero.wszechstronny.hero_name":"Awatar Równowagi","hero.wszechstronny.archetype_desc":"Żaden przedmiot nie dominuje - oceny wyrównane na całej linii.","hero.wszechstronny.hero_desc":"Władasz każdym żywiołem po trosze - nic Cię dziś nie zaskoczy.","card.hero_stats.title":"Statystyki bohatera","card.hero_stats.subtitle":"Twoja karta postaci","card.hero_stats.empty":"Za mało danych na statystyki","hero_stat.sila":"Siła","hero_stat.intelekt":"Intelekt","hero_stat.wiedza":"Wiedza","hero_stat.charyzma":"Charyzma","hero_stat.wytrwalosc":"Wytrwałość","hero_stat.szczescie":"Szczęście","card.hero_history.title":"Historia bohatera","card.hero_history.subtitle":"jak zmieniał się Twój wynik","card.hero_history.empty":"Brak historii jeszcze - pojawi się, gdy wynik się zmieni","card.hero_history.current":"obecnie ({n} dni)","card.last_update.subtitle":"Ostatnia aktualizacja danych","label.just_now":"Przed chwilą","label.minutes_ago":"{minutes} min temu","label.hours_ago":"{hours} godz. temu","label.days_ago":"{days} dni temu"}};function $e(e,t,i){let a=function(e){const t=e?.language??"en",i=t.split("-")[0]?.toLowerCase();return xe[i]??ke}(e)[t]??ke[t];if(i)for(const[e,t]of Object.entries(i))a=a.replace(`{${e}}`,String(t));return a}function ze(e,t){const i=Math.max(0,Math.round(t));if(i<60)return $e(e,"label.in_minutes",{minutes:i});if(i<1440){const t=Math.floor(i/60),a=i%60;return 0===a?$e(e,"label.in_hours",{hours:t}):$e(e,"label.in_hours_minutes",{hours:t,minutes:a})}const a=Math.floor(i/1440),s=Math.floor(i%1440/60);return 0===s?$e(e,"label.in_days",{days:a}):$e(e,"label.in_days_hours",{days:a,hours:s})}var je;const Ce=[{kind:"text",key:"icon",label:"editor.icon"},{kind:"boolean",key:"hide_header",label:"editor.hide_header"},{kind:"boolean",key:"compact",label:"editor.compact"}],Se=[{value:"archetype",label:"mode.archetype"},{value:"hero",label:"mode.hero"}],De={kind:"text",key:"category_filter",label:"editor.category_filter"},Ie={kind:"select",key:"sort",label:"editor.sort",options:[{value:"newest",label:"sort.newest"},{value:"oldest",label:"sort.oldest"}]},Ee={kind:"number",key:"days",label:"editor.days_back",min:7,max:365},Te={kind:"text",key:"title",label:"editor.title"},Ne=e=>({kind:"number",key:"max_items",label:"editor.max_items",min:1,max:e}),Ae={"custom:librus-grade-log-card":[Te,Ne(100),De,Ee,Ie],"custom:librus-recent-activity-card":[Te,Ne(50)],"custom:librus-homework-checklist-card":[Te,Ne(30)],"custom:librus-announcements-card":[Te,Ne(20)],"custom:librus-agenda-card":[Te,{kind:"number",key:"days_ahead",label:"editor.days_ahead",min:1,max:60}],"custom:librus-messages-card":[Te,{kind:"select",key:"mailbox",label:"editor.mailbox",options:[{value:"inbox",label:"mailbox.inbox"},{value:"substitutions",label:"mailbox.substitutions"},{value:"alerts",label:"mailbox.alerts"},{value:"justifications",label:"mailbox.justifications"}]},Ne(20)],"custom:librus-grade-trend-card":[{kind:"subject"},{kind:"number",key:"days",label:"editor.days_back",min:7,max:180}],"custom:librus-subject-grades-card":[{kind:"subject"},Ne(100),De,Ee,Ie],"custom:librus-grade-goal-card":[{kind:"subject"},{kind:"number",key:"target",label:"editor.target",min:1,max:6,float:!0},Te],"custom:librus-bell-schedule-card":[Te],"custom:librus-tomorrow-card":[Te],"custom:librus-grade-simulator-card":[{kind:"subject"}],"custom:librus-semester-comparison-card":[Te],"custom:librus-week-timetable-card":[{kind:"boolean",key:"show_saturday",label:"editor.show_saturday"}],"custom:librus-subject-time-card":[{kind:"boolean",key:"show_saturday",label:"editor.show_saturday"}],"custom:librus-exam-countdown-card":[Te,{kind:"text",key:"exam_keywords",label:"editor.exam_keywords"}],"custom:librus-hero-card":[Te,{kind:"select",key:"mode",label:"editor.mode",options:Se}],"custom:librus-hero-history-card":[Te,{kind:"select",key:"mode",label:"editor.mode",options:Se}]};function Me(){return document.createElement("librus-card-editor")}let Le=je=class extends de{setConfig(e){this._config=e}get _fields(){return this._config&&Ae[this._config.type]||[]}render(){if(!this.hass||!this._config)return q;const e=this.hass,t=this._config,i=_e(e),a=this._fields,s=a.some(e=>"subject"===e.kind);let r;try{r=ye(e,t.device_id)}catch{r=void 0}const n=s&&r?we(e,r,"subject_average"):[];return R`
      <div class="form">
        ${i.length>1?R`
              <ha-select
                label=${$e(e,"editor.student")}
                .value=${t.device_id??""}
                .options=${i.map(t=>{const i=e.devices?.[t];return{value:t,label:i?.name_by_user||i?.name||t}})}
                naturalMenuWidth
                fixedMenuPosition
                @selected=${e=>this._pickDevice(e)}
                @closed=${e=>{e.stopPropagation(),this._pickDevice(e)}}
              >
                ${i.map(t=>{const i=e.devices?.[t];return R`<ha-list-item .value=${t}>${i?.name_by_user||i?.name||t}</ha-list-item>`})}
              </ha-select>
            `:q}
        ${s?R`
              <ha-select
                label=${$e(e,"editor.subject")}
                .value=${void 0!==t.subject_id?String(t.subject_id):""}
                .options=${[{value:"",label:$e(e,"editor.subject_auto")},...n.filter(e=>void 0!==e.subjectId).map(e=>({value:String(e.subjectId),label:e.subject}))]}
                naturalMenuWidth
                fixedMenuPosition
                @selected=${e=>this._pickSubject(e)}
                @closed=${e=>{e.stopPropagation(),this._pickSubject(e)}}
              >
                <ha-list-item .value=${""}>${$e(e,"editor.subject_auto")}</ha-list-item>
                ${n.map(e=>void 0!==e.subjectId?R`<ha-list-item .value=${String(e.subjectId)}>${e.subject}</ha-list-item>`:q)}
              </ha-select>
            `:q}
        ${a.map(e=>this._renderField(e))}
        <hr class="sep" />
        ${Ce.map(e=>this._renderField(e))}
      </div>
    `}_renderField(e){if("subject"===e.kind)return q;const t=this.hass,i=this._config;return"text"===e.kind?R`
        <ha-textfield
          label=${$e(t,e.label)}
          .value=${i[e.key]??""}
          @change=${t=>this._onText(e.key,t.target.value)}
        ></ha-textfield>
      `:"boolean"===e.kind?R`
        <ha-formfield label=${$e(t,e.label)}>
          <ha-switch
            .checked=${Boolean(i[e.key])}
            @change=${t=>this._patch({[e.key]:t.target.checked||void 0})}
          ></ha-switch>
        </ha-formfield>
      `:"number"===e.kind?R`
        <ha-textfield
          type="number"
          no-spinner
          label=${$e(t,e.label)}
          min=${e.min}
          max=${e.max}
          step=${e.float?"0.05":"1"}
          .value=${void 0!==i[e.key]?String(i[e.key]):""}
          @change=${t=>this._onNumber(e,t.target.value)}
        ></ha-textfield>
      `:R`
      <ha-select
        label=${$e(t,e.label)}
        .value=${i[e.key]??e.options[0].value}
        .options=${e.options.map(e=>({value:e.value,label:$e(t,e.label)}))}
        naturalMenuWidth
        fixedMenuPosition
        @selected=${t=>this._pickSelect(e,t)}
        @closed=${t=>{t.stopPropagation(),this._pickSelect(e,t)}}
      >
        ${e.options.map(e=>R`<ha-list-item .value=${e.value}>${$e(t,e.label)}</ha-list-item>`)}
      </ha-select>
    `}static _selectValue(e){const t=e.detail;if(t&&void 0!==t.value)return String(t.value);const i=e.currentTarget;return i?.value??""}_pickDevice(e){const t=je._selectValue(e);t&&t!==this._config?.device_id&&this._patch({device_id:t})}_pickSubject(e){const t=je._selectValue(e),i=""===t?void 0:Number(t);i!==this._config?.subject_id&&this._patch({subject_id:Number.isNaN(i)?void 0:i})}_pickSelect(e,t){const i=je._selectValue(t);if(!i)return;i!==(this._config?.[e.key]??e.options[0].value)&&this._patch({[e.key]:i===e.options[0].value?void 0:i})}_onText(e,t){this._patch({[e]:t.trim()||void 0})}_onNumber(e,t){const i=e.float?Number.parseFloat(t):Number.parseInt(t,10);if(Number.isNaN(i))return void this._patch({[e.key]:void 0});const a=Math.min(e.max,Math.max(e.min,i));this._patch({[e.key]:e.float?Math.round(100*a)/100:a})}_patch(e){if(!this._config)return;const t={...this._config,...e};for(const[i,a]of Object.entries(e))void 0===a&&delete t[i];this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t},bubbles:!0,composed:!0}))}};Le.styles=n`
    .form {
      display: flex;
      flex-direction: column;
      gap: 12px;
      padding: 4px 0;
    }
    ha-select,
    ha-textfield {
      width: 100%;
    }
    hr.sep {
      border: none;
      border-top: 1px solid var(--divider-color);
      margin: 2px 0;
    }
  `,e([pe({attribute:!1})],Le.prototype,"hass",void 0),e([me()],Le.prototype,"_config",void 0),Le=je=e([he("librus-card-editor")],Le);class Pe extends de{get _cardConfig(){return this._config}_syncTheme(){this.classList.toggle("dark",Boolean(this.hass?.themes?.darkMode));const e=this._cardConfig;this.classList.toggle("compact",Boolean(e?.compact)),this.classList.toggle("hide-header",Boolean(e?.hide_header))}updated(e){super.updated(e);const t=this._cardConfig?.icon;if(!t)return;const i=this.renderRoot.querySelector(".icon-badge ha-icon");i&&i.getAttribute("icon")!==t&&i.setAttribute("icon",t)}_resolveEntities(){if(!this.hass)return{error:this._message("mdi:alert-circle-outline",$e(this.hass,"empty.loading"))};const e=this._resolvedCache;if(e&&e.entities===this.hass.entities&&e.configuredDeviceId===this._configuredDeviceId)return e.result;let t;try{const e=ye(this.hass,this._configuredDeviceId);t={deviceId:e,map:fe(this.hass,e)}}catch(e){t={error:this._message("mdi:alert-circle-outline",this._configErrorMessage(e))}}return this._resolvedCache={entities:this.hass.entities,configuredDeviceId:this._configuredDeviceId,result:t},t}_configErrorMessage(e){return e instanceof be?"device_missing"===e.code?$e(this.hass,"error.device_missing",{device:e.deviceId??""}):"multiple_devices"===e.code?$e(this.hass,"error.multiple_devices"):$e(this.hass,"error.no_device"):$e(this.hass,"empty.generic_error")}_message(e,t,i){return R`
      <ha-card class="static">
        <div class="empty">
          <ha-icon .icon=${e}></ha-icon>
          <div class="t1">${t}</div>
          ${i?R`<div class="t2">${i}</div>`:q}
        </div>
      </ha-card>
    `}}e([pe({attribute:!1})],Pe.prototype,"hass",void 0);const Oe=n`
  :host {
    --lc-brand: #4f46e5;
    --lc-brand-strong: #3730a3;
    --lc-brand-bg: #ebe9fc;
    --lc-ring-track: #e4e1f7;
    --lc-amber: #e08e1d;
    --lc-amber-bg: #fbebd1;
    --lc-chip-bg: rgba(79, 70, 229, 0.06);
    --lc-good: #2e8f57;
    --lc-good-bg: #e1f3e7;
    --lc-warn: #e08e1d;
    --lc-warn-bg: #fbebd1;
    --lc-bad: #c6444b;
    --lc-bad-bg: #f9e3e4;
    --lc-neutral-dot: #b4b0cf;
    /* 16-color chart palette (grade categories, subjects, ...) - the first
       6 alias the tokens above for continuity; the rest are new hues, kept
       in the same muted-professional family as the brand indigo/amber.
       Needed once a breakdown can have more distinct entries than the core
       5-6 semantic colors sensibly cover (e.g. a real timetable's ~16
       subjects) - found live: cycling through only 6 colors on 16 segments
       made several of them visually indistinguishable from each other. */
    --lc-chart-1: var(--lc-brand);
    --lc-chart-2: var(--lc-good);
    --lc-chart-3: var(--lc-warn);
    --lc-chart-4: var(--lc-bad);
    --lc-chart-5: var(--lc-brand-strong);
    --lc-chart-6: var(--lc-neutral-dot);
    --lc-chart-7: #0f9488;
    --lc-chart-8: #9333ea;
    --lc-chart-9: #c2703a;
    --lc-chart-10: #2563a8;
    --lc-chart-11: #db5a7b;
    --lc-chart-12: #6b8e3d;
    --lc-chart-13: #a8763e;
    --lc-chart-14: #1591b0;
    --lc-chart-15: #7c5cd4;
    --lc-chart-16: #a68a1f;
    /* Rank tiers (librus-rank-card) - Gold deliberately reuses --lc-amber
       above rather than a near-duplicate hue. */
    --lc-bronze: #b87333;
    --lc-bronze-bg: #f1e2d3;
    --lc-silver: #7c8794;
    --lc-silver-bg: #e6e9ec;
    --lc-diamond: #1f9cb8;
    --lc-diamond-bg: #d9f1f6;
  }
  :host(.dark) {
    --lc-brand: #948cf2;
    --lc-brand-strong: #b4acf7;
    --lc-brand-bg: rgba(148, 140, 242, 0.16);
    --lc-ring-track: #302d4e;
    --lc-amber: #f3ae4e;
    --lc-amber-bg: rgba(243, 174, 78, 0.15);
    --lc-chip-bg: rgba(255, 255, 255, 0.06);
    --lc-good: #5fc98a;
    --lc-good-bg: rgba(95, 201, 138, 0.14);
    --lc-warn: #f3ae4e;
    --lc-warn-bg: rgba(243, 174, 78, 0.15);
    --lc-bad: #e27c81;
    --lc-bad-bg: rgba(226, 124, 129, 0.14);
    --lc-neutral-dot: #6d698c;
    --lc-chart-1: var(--lc-brand);
    --lc-chart-2: var(--lc-good);
    --lc-chart-3: var(--lc-warn);
    --lc-chart-4: var(--lc-bad);
    --lc-chart-5: var(--lc-brand-strong);
    --lc-chart-6: var(--lc-neutral-dot);
    --lc-chart-7: #7dd3c0;
    --lc-chart-8: #c98cf2;
    --lc-chart-9: #f2b88c;
    --lc-chart-10: #8cc9f2;
    --lc-chart-11: #f28ca0;
    --lc-chart-12: #a8d16a;
    --lc-chart-13: #d1a86a;
    --lc-chart-14: #6ab8d1;
    --lc-chart-15: #b88cf2;
    --lc-chart-16: #f2e08c;
    --lc-bronze: #d9925a;
    --lc-bronze-bg: rgba(217, 146, 90, 0.16);
    --lc-silver: #a7b0ba;
    --lc-silver-bg: rgba(167, 176, 186, 0.16);
    --lc-diamond: #4dd0e8;
    --lc-diamond-bg: rgba(77, 208, 232, 0.16);
  }
`,Be=n`
  ha-card {
    cursor: pointer;
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 13px;
  }
  ha-card.static {
    cursor: default;
  }

  /* Universal density options (LibrusBaseCard._syncTheme) - .compact/.hide-header
     are host classes, same "toggle a class, react in CSS" pattern as .dark. */
  :host(.hide-header) .header {
    display: none;
  }
  :host(.compact) ha-card {
    padding: 10px 12px;
    gap: 8px;
  }
  :host(.compact) .header {
    gap: 8px;
  }
  :host(.compact) .icon-badge {
    width: 26px;
    height: 26px;
    border-radius: 7px;
  }
  :host(.compact) .icon-badge ha-icon {
    --mdc-icon-size: 16px;
  }
  :host(.compact) .title {
    font-size: 0.84rem;
  }
  :host(.compact) .subtitle {
    display: none;
  }

  .header {
    display: flex;
    align-items: center;
    gap: 11px;
  }
  .icon-badge {
    width: 36px;
    height: 36px;
    border-radius: 10px;
    background: var(--lc-brand-bg);
    color: var(--lc-brand);
    display: flex;
    align-items: center;
    justify-content: center;
    flex: none;
  }
  .icon-badge.amber {
    background: var(--lc-amber-bg);
    color: var(--lc-amber);
  }
  .icon-badge.good {
    background: var(--lc-good-bg);
    color: var(--lc-good);
  }
  .icon-badge.bad {
    background: var(--lc-bad-bg);
    color: var(--lc-bad);
  }
  .icon-badge.bronze {
    background: var(--lc-bronze-bg);
    color: var(--lc-bronze);
  }
  .icon-badge.silver {
    background: var(--lc-silver-bg);
    color: var(--lc-silver);
  }
  .icon-badge.diamond {
    background: var(--lc-diamond-bg);
    color: var(--lc-diamond);
  }
  .title-block {
    min-width: 0;
    flex: 1;
  }
  .title {
    font-size: 0.95rem;
    font-weight: 700;
    line-height: 1.25;
  }
  .subtitle {
    font-size: 0.76rem;
    color: var(--secondary-text-color);
    margin-top: 1px;
  }

  hr {
    border: none;
    border-top: 1px dashed var(--divider-color);
    margin: 0;
  }

  .stat-value {
    font-variant-numeric: tabular-nums;
  }

  .bar {
    display: flex;
    height: 9px;
    border-radius: 5px;
    overflow: hidden;
    background: var(--divider-color);
  }
  .seg {
    min-width: 2px;
  }

  /* Ranked horizontal bar chart (hBarChart in render-helpers) - one row
     per item: label, proportional bar, value. */
  .hbar-chart {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  .hbar-row {
    display: grid;
    grid-template-columns: minmax(0, 6.5rem) 1fr auto;
    align-items: center;
    gap: 8px;
    font-size: 0.78rem;
  }
  .hbar-label {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: var(--secondary-text-color);
  }
  .hbar-track {
    height: 10px;
    border-radius: 5px;
    background: var(--divider-color);
    overflow: hidden;
  }
  .hbar-fill {
    display: block;
    height: 100%;
    border-radius: 5px;
    min-width: 3px;
  }
  .hbar-val {
    font-variant-numeric: tabular-nums;
    font-weight: 800;
  }

  .ring {
    flex: none;
  }

  .radar-chart {
    flex: none;
  }
  .radar-grid {
    fill: none;
    stroke: var(--divider-color);
    stroke-width: 1;
  }
  .radar-axis {
    stroke: var(--divider-color);
    stroke-width: 1;
  }
  .radar-label {
    fill: var(--secondary-text-color);
    font-size: 10.5px;
  }

  .donut-chart {
    flex: none;
  }
  .donut-total {
    font-size: 20px;
    font-weight: 800;
  }
  .donut-unit {
    font-size: 9px;
  }

  /* Shared "centered chart + legend row below" layout - used by the radar
     and donut chart cards (grades-radar, grade-category-distribution,
     subject-time). Cards with their own bespoke legend markup (Attendance,
     Attendance heatmap) define a local .legend/.legend-item after this in
     their own static styles array, which wins at equal specificity. */
  .chart-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4px 0 8px;
  }
  .legend {
    display: flex;
    flex-wrap: wrap;
    gap: 6px 14px;
    font-size: 0.7rem;
    color: var(--secondary-text-color);
    justify-content: center;
  }
  .legend-item {
    display: inline-flex;
    align-items: center;
    gap: 5px;
  }
  .legend-item b {
    color: var(--primary-text-color);
  }
  /* .dot's margin-top:5px (below) is tuned for .list-item, where it aligns
     a dot with the first line of a possibly-multi-line body - found live:
     the same margin inside a single-line .legend-item pushes the dot
     below center instead, since align-items:center no longer has a
     symmetric box to center. */
  .legend-item .dot {
    margin-top: 0;
  }

  /* A denser alternative to .legend for a breakdown with many entries
     (subjects, categories) - found live: with 16 real subjects, the
     wrapped-pill .legend ran to several ragged rows. A fixed 2-column
     grid reads as a tidy list instead, same "many rows, not many pills"
     shape a mockup (approved by the user, Variant B) compared against a
     grouped "top N + Other" alternative for. */
  .legend-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3px 14px;
  }
  .legend-cell {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 3px 0;
    font-size: 0.72rem;
    color: var(--secondary-text-color);
    min-width: 0;
  }
  .legend-cell .dot {
    margin-top: 0;
  }
  .legend-cell .name {
    flex: 1;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .legend-cell b {
    color: var(--primary-text-color);
    font-variant-numeric: tabular-nums;
  }

  .scroll-list {
    display: flex;
    flex-direction: column;
    gap: 9px;
    max-height: 320px;
    overflow-y: auto;
    /* A gutter before the scrollbar, and a slim, theme-aware thumb instead
       of the browser's default boxy grey scrollbar (which clashes with
       this card family's rounded, colored look and otherwise sits flush
       against the text with no breathing room). Firefox via
       scrollbar-width/-color, Chromium via ::-webkit-scrollbar. */
    padding-right: 8px;
    scrollbar-width: thin;
    scrollbar-color: var(--lc-neutral-dot) transparent;
  }
  .scroll-list::-webkit-scrollbar {
    width: 6px;
  }
  .scroll-list::-webkit-scrollbar-track {
    background: transparent;
  }
  .scroll-list::-webkit-scrollbar-thumb {
    background: var(--lc-neutral-dot);
    border-radius: 999px;
  }
  .scroll-list::-webkit-scrollbar-thumb:hover {
    background: var(--lc-brand);
  }

  .dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    display: block;
    flex: none;
    margin-top: 5px;
  }
  .dot.good {
    background: var(--lc-good);
  }
  .dot.bad {
    background: var(--lc-bad);
  }
  .dot.neutral {
    background: var(--lc-neutral-dot);
  }
  .dot.warn {
    background: var(--lc-warn);
  }

  .stats {
    display: flex;
    flex-wrap: wrap;
    gap: 12px 8px;
  }
  .stat {
    flex: 1 1 74px;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  .stat-value {
    font-size: 1.15rem;
    font-weight: 800;
    line-height: 1.2;
    display: flex;
    align-items: baseline;
    gap: 3px;
  }
  .stat-value .unit {
    font-size: 0.66rem;
    font-weight: 600;
    color: var(--secondary-text-color);
  }
  .stat-label {
    font-size: 0.66rem;
    color: var(--secondary-text-color);
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }
  .stat.good .stat-value {
    color: var(--lc-good);
  }
  .stat.bad .stat-value {
    color: var(--lc-bad);
  }
  .stat.warn .stat-value {
    color: var(--lc-warn);
  }

  .list-item {
    display: flex;
    gap: 9px;
    align-items: flex-start;
  }
  .list-item .body {
    min-width: 0;
    flex: 1;
  }
  .row1 {
    display: flex;
    justify-content: space-between;
    gap: 8px;
    font-size: 0.78rem;
    font-weight: 700;
  }
  .row1 time {
    font-weight: 600;
    color: var(--secondary-text-color);
    font-size: 0.68rem;
    white-space: nowrap;
    font-variant-numeric: tabular-nums;
  }
  .cat-label {
    font-size: 0.65rem;
    color: var(--lc-brand);
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.03em;
  }
  /* A category badge on its own line, above the event text - found live:
     inlining the badge into .row1 alongside larger text left it looking
     vertically off (no shared baseline between the two font sizes in a
     flex row with no align-items set). Its own row sidesteps the
     alignment question entirely instead of trying to fix it in place. */
  .cat-label-row {
    margin-bottom: 2px;
  }
  .item-text {
    font-size: 0.75rem;
    color: var(--secondary-text-color);
    margin-top: 2px;
    line-height: 1.4;
  }
  .quote {
    font-size: 0.72rem;
    color: var(--secondary-text-color);
    font-style: italic;
    margin-top: 3px;
  }
  .quote::before {
    content: "\\201C";
  }
  .quote::after {
    content: "\\201D";
  }

  .chip {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    background: var(--lc-chip-bg);
    color: var(--secondary-text-color);
    border-radius: 999px;
    padding: 3px 9px 3px 7px;
    font-size: 0.68rem;
    font-weight: 600;
  }
  .chip .n {
    font-weight: 800;
    color: var(--primary-text-color);
  }
  .chip.hot {
    background: var(--lc-brand-bg);
    color: var(--lc-brand-strong);
  }
  .chip.hot .n {
    color: var(--lc-brand-strong);
  }
  .chips {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }

  .empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 24px 16px;
    text-align: center;
    color: var(--secondary-text-color);
  }
  .empty ha-icon {
    --mdc-icon-size: 28px;
    opacity: 0.7;
  }
  .empty .t1 {
    font-size: 0.9rem;
    font-weight: 600;
    color: var(--primary-text-color);
  }
  .empty .t2 {
    font-size: 0.76rem;
    max-width: 26ch;
  }
`;function Fe(e){const t=Math.max(1,...e.map(e=>e.value));return R`
    <div class="hbar-chart">
      ${e.map(e=>R`
          <div class="hbar-row">
            <span class="hbar-label" title=${e.label}>${e.label}</span>
            <span class="hbar-track">
              <span
                class="hbar-fill"
                style="width:${Math.round(e.value/t*100)}%;background:${e.colorVar}"
              ></span>
            </span>
            <b class="hbar-val">${e.value}</b>
          </div>
        `)}
    </div>
  `}function Ke(e,t,i=64,a=6){const s=Math.max(0,Math.min(100,e)),r=(i-a)/2,n=2*Math.PI*r,o=i/2;return R`
    <svg width=${i} height=${i} viewBox="0 0 ${i} ${i}" class="ring">
      <circle
        cx=${o}
        cy=${o}
        r=${r}
        fill="none"
        stroke="var(--lc-ring-track)"
        stroke-width=${a}
      ></circle>
      <circle
        cx=${o}
        cy=${o}
        r=${r}
        fill="none"
        stroke=${t}
        stroke-width=${a}
        stroke-linecap="round"
        stroke-dasharray=${n}
        stroke-dashoffset=${n-s/100*n}
        transform="rotate(-90 ${o} ${o})"
      ></circle>
    </svg>
  `}function Ue(e,t={}){const i=t.width??220,a=t.height??200,s=t.max??6,r=t.colorVar??"var(--lc-brand)",n=t.ringCount??3,o=i/2,c=a/2-4,d=Math.min(i,a)/2-32,l=e.length;if(l<3)return R`<svg width=${i} height=${a} viewBox="0 0 ${i} ${a}" class="radar-chart"></svg>`;const h=e=>-Math.PI/2+2*e*Math.PI/l,u=(e,t)=>{const i=Math.max(0,Math.min(s,t))/s*d;return[o+i*Math.cos(h(e)),c+i*Math.sin(h(e))]},g=Array.from({length:n},(e,t)=>s*(t+1)/n),p=e.map((e,t)=>u(t,s)),m=e.map((e,t)=>u(t,e.value)),v=m.map(e=>e.join(",")).join(" ");return R`
    <svg width=${i} height=${a} viewBox="0 0 ${i} ${a}" class="radar-chart">
      ${g.map(t=>W`<polygon
            points=${e.map((e,i)=>u(i,t).join(",")).join(" ")}
            class="radar-grid"
          ></polygon>`)}
      ${p.map(([e,t])=>W`<line x1=${o} y1=${c} x2=${e} y2=${t} class="radar-axis"></line>`)}
      <polygon
        points=${v}
        fill=${r}
        fill-opacity="0.22"
        stroke=${r}
        stroke-width="2"
        stroke-linejoin="round"
      ></polygon>
      ${m.map(([e,t])=>W`<circle cx=${e} cy=${t} r="3.2" fill=${r}></circle>`)}
      ${e.map((e,t)=>{const[i,a]=u(t,1.18*s),r=Math.cos(h(t)),n=Math.abs(r)<.3?"middle":r>0?"start":"end";return W`<text x=${i} y=${a+3} text-anchor=${n} class="radar-label">${e.label}</text>`})}
    </svg>
  `}const He=new Set(["unknown","unavailable",""]);let Re=class extends Pe{static getConfigElement(){return Me()}static getStubConfig(){return{type:"custom:librus-grades-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 3}render(){if(!this._config||!this.hass)return q;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{deviceId:t,map:i}=e,a=this.hass,s=i.overall_average?a.states[i.overall_average]:void 0,r=we(a,t,"subject_average").map(e=>({...e,state:a.states[e.entityId]})).filter(e=>e.state&&!He.has(e.state.state));if((!s||He.has(s.state))&&0===r.length)return this._message("mdi:school-outline",$e(a,"card.grades.empty"));const n=s&&!He.has(s.state)?Number(s.state):void 0,o=r.length?Math.max(...r.map(e=>Number(e.state.state))):6;return R`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:school-outline"></ha-icon></div>
          <div class="title-block">
            <div class="title">${$e(a,"card.grades.title")}</div>
            <div class="subtitle">${$e(a,"card.grades.subtitle")}</div>
          </div>
        </div>

        ${void 0!==n?R`
              <div class="ring-row">
                ${Ke(n/6*100,"var(--lc-brand)",68,7)}
                <div>
                  <div class="ring-num">${n.toLocaleString(a.language,{maximumFractionDigits:2})}</div>
                  <div class="ring-label">${$e(a,"card.grades.subtitle")}</div>
                </div>
              </div>
            `:q}
        ${r.length?R`
              <div class="sub-list">
                ${r.map(e=>{const t=Number(e.state.state);return R`
                    <div class="sub-row">
                      <span class="name" title=${e.subject}>${e.subject}</span>
                      <span class="bar"
                        ><span
                          style="width:${Math.min(100,t/o*100)}%"
                        ></span
                      ></span>
                      <span class="val">${t.toLocaleString(a.language,{maximumFractionDigits:2})}</span>
                    </div>
                  `})}
              </div>
            `:q}
      </ha-card>
    `}};function We(e){const t=new Date(e);return Number.isNaN(t.getTime())?"":t.toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"})}function Ge(e,t){const i=new Date(`${e.slice(0,10)}T00:00:00`);return Number.isNaN(i.getTime())?e:i.toLocaleDateString(t,{day:"numeric",month:"short"})}function qe(e,t){const i=Date.UTC(e.getFullYear(),e.getMonth(),e.getDate()),a=Date.UTC(t.getFullYear(),t.getMonth(),t.getDate());return Math.round((a-i)/864e5)}function Ze(e,t){return Math.max(0,Math.floor((e.getTime()-t.getTime())/6e4))}Re.styles=[Oe,Be,n`
      .ring-row {
        display: flex;
        align-items: center;
        gap: 16px;
      }
      .ring-num {
        font-size: 1.5rem;
        font-weight: 800;
        font-variant-numeric: tabular-nums;
        line-height: 1.1;
      }
      .ring-label {
        font-size: 0.72rem;
        color: var(--secondary-text-color);
      }
      .sub-list {
        display: flex;
        flex-direction: column;
        gap: 8px;
        max-height: 220px;
        overflow-y: auto;
        padding-right: 8px;
        scrollbar-width: thin;
        scrollbar-color: var(--lc-neutral-dot) transparent;
      }
      .sub-list::-webkit-scrollbar {
        width: 6px;
      }
      .sub-list::-webkit-scrollbar-track {
        background: transparent;
      }
      .sub-list::-webkit-scrollbar-thumb {
        background: var(--lc-neutral-dot);
        border-radius: 999px;
      }
      .sub-list::-webkit-scrollbar-thumb:hover {
        background: var(--lc-brand);
      }
      .sub-row {
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .sub-row .name {
        font-size: 0.74rem;
        color: var(--secondary-text-color);
        width: 92px;
        flex: none;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .sub-row .bar {
        flex: 1;
        height: 8px;
        border-radius: 4px;
        background: var(--divider-color);
        overflow: hidden;
        display: block;
      }
      .sub-row .bar span {
        display: block;
        height: 100%;
        background: var(--lc-brand);
        border-radius: 4px;
      }
      .sub-row .val {
        font-size: 0.76rem;
        font-weight: 800;
        width: 32px;
        text-align: right;
        font-variant-numeric: tabular-nums;
      }
    `],e([me()],Re.prototype,"_config",void 0),Re=e([he("librus-grades-card")],Re);const Je=/^\[([^\]]+)\]\s*/;function Ve(e){const t=Je.exec(e);return t?{category:t[1],text:e.slice(t[0].length)}:{category:null,text:e}}function Ye(e,t){let i=e;const a=(t.category_filter??"").split(",").map(e=>e.trim().toLowerCase()).filter(Boolean);if(a.length&&(i=i.filter(e=>{const t=(e.category??"").toLowerCase();return a.some(e=>t.includes(e))})),t.days){const e=new Date;e.setHours(0,0,0,0),e.setDate(e.getDate()-t.days);const a=e.toISOString().slice(0,10);i=i.filter(e=>!e.date||e.date>=a)}const s=[...i].sort((e,t)=>(e.date??"").localeCompare(t.date??""));return"oldest"===t.sort?s:s.reverse()}let Xe=class extends Pe{static getConfigElement(){return Me()}static getStubConfig(){return{type:"custom:librus-grade-log-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 4}render(){if(!this._config||!this.hass)return q;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{deviceId:t}=e,i=this.hass,a=[];for(const e of we(i,t,"subject_average")){const t=i.states[e.entityId]?.attributes.grades??[];for(const i of t)a.push({...i,subject:e.subject})}if(0===a.length)return this._message("mdi:notebook-multiple",$e(i,"card.grades.empty"));const s=Ye(a,this._config);if(0===s.length)return this._message("mdi:notebook-multiple",$e(i,"card.grade_log.empty_filtered"));const r=this._config.max_items??25;return R`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:notebook-multiple"></ha-icon></div>
          <div class="title-block">
            <div class="title">${this._config.title??$e(i,"card.grade_log.title")}</div>
            <div class="subtitle">${$e(i,"card.grade_log.subtitle")}</div>
          </div>
        </div>
        <div class="scroll-list">
          ${s.slice(0,r).map(e=>R`
              <div class="list-item">
                <div class="grade-chip">${e.value}</div>
                <div class="body">
                  <div class="row1">
                    <span>${e.subject}${e.category?R` · <span class="cat-label">${e.category}</span>`:q}</span>
                    ${e.date?R`<time>${Ge(e.date,i.language)}</time>`:q}
                  </div>
                  ${e.comments.length?R`<div class="quote">${e.comments.join(" · ")}</div>`:q}
                </div>
              </div>
            `)}
        </div>
      </ha-card>
    `}};Xe.styles=[Oe,Be,n`
      .grade-chip {
        flex: none;
        min-width: 26px;
        height: 26px;
        border-radius: 8px;
        background: var(--lc-brand-bg);
        color: var(--lc-brand-strong);
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 800;
        font-size: 0.78rem;
        padding: 0 4px;
      }
    `],e([me()],Xe.prototype,"_config",void 0),Xe=e([he("librus-grade-log-card")],Xe);let Qe=class extends Pe{static getConfigElement(){return Me()}static getStubConfig(){return{type:"custom:librus-subject-grades-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 3}render(){if(!this._config||!this.hass)return q;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{deviceId:t}=e,i=this.hass,a=we(i,t,"subject_average"),s=void 0!==this._config.subject_id?a.find(e=>e.subjectId===this._config.subject_id):a[0];if(!s)return this._message("mdi:notebook-outline",$e(i,"card.grades.empty"));const r=i.states[s.entityId],n=r?.attributes.grades??[];if(0===n.length)return this._message("mdi:notebook-outline",$e(i,"card.grades.empty"));const o=Ye(n,this._config);if(0===o.length)return this._message("mdi:notebook-outline",$e(i,"card.grade_log.empty_filtered"));const c=this._config.max_items,d=c?o.slice(0,c):o;return R`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:notebook-outline"></ha-icon></div>
          <div class="title-block">
            <div class="title">${s.subject}</div>
            <div class="subtitle">${r.state}</div>
          </div>
        </div>
        <div class="scroll-list">
          ${d.map(e=>R`
              <div class="list-item">
                <div class="grade-chip">${e.value}</div>
                <div class="body">
                  <div class="row1">
                    <span class="cat-label">${e.category??""}</span>
                    ${e.date?R`<time>${Ge(e.date,i.language)}</time>`:q}
                  </div>
                  ${e.comments.length?R`<div class="quote">${e.comments.join(" · ")}</div>`:q}
                </div>
              </div>
            `)}
        </div>
      </ha-card>
    `}};Qe.styles=[Oe,Be,n`
      .grade-chip {
        flex: none;
        min-width: 26px;
        height: 26px;
        border-radius: 8px;
        background: var(--lc-brand-bg);
        color: var(--lc-brand-strong);
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 800;
        font-size: 0.78rem;
        padding: 0 4px;
      }
    `],e([me()],Qe.prototype,"_config",void 0),Qe=e([he("librus-subject-grades-card")],Qe);let et=class extends Pe{constructor(){super(...arguments),this._points=[]}static getConfigElement(){return Me()}static getStubConfig(){return{type:"custom:librus-grade-trend-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}get _historyDays(){return this._config?.days??60}getCardSize(){return 3}connectedCallback(){super.connectedCallback(),this._refreshTimer=setInterval(()=>{this._fetch(!0)},18e5)}disconnectedCallback(){super.disconnectedCallback(),clearInterval(this._refreshTimer)}_resolveEntityId(){if(!this.hass||!this._config)return;const e=this._resolveEntities();if("error"in e)return;const{deviceId:t,map:i}=e;if(void 0!==this._config.subject_id){const e=we(this.hass,t,"subject_average");return e.find(e=>e.subjectId===this._config.subject_id)?.entityId}return i.overall_average}async _fetch(e=!1){const t=this._resolveEntityId();if(!this.hass||!t)return;const i=new Date,a=new Date(i.getTime()-864e5*this._historyDays),s=`${t}:${i.toDateString()}:${this._historyDays}`;if(e||this._fetchedFor!==s){this._fetchedFor=s;try{this._points=await async function(e,t,i,a){const s=`history/period/${encodeURIComponent(i.toISOString())}?filter_entity_id=${encodeURIComponent(t)}&end_time=${encodeURIComponent(a.toISOString())}`,r=await e.callApi("GET",s),n=r?.[0]??[],o=[];for(const e of n){const t=Number(e.state);if(!Number.isFinite(t))continue;const i=new Date(e.last_changed).getTime();if(Number.isNaN(i))continue;const a=o[o.length-1];a&&a.value===t||o.push({timestamp:i,value:t})}return o}(this.hass,t,a,i)}catch{this._points=[]}}}render(){if(!this._config||!this.hass)return q;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const t=this.hass;this._fetch();const i=this._resolveEntityId(),a=void 0!==this._config.subject_id?we(t,e.deviceId,"subject_average").find(e=>e.subjectId===this._config.subject_id)?.subject:void 0;if(!i||this._points.length<2)return this._message("mdi:chart-line",$e(t,"card.grade_trend.empty"));const s=this._points[0],r=this._points[this._points.length-1],n=Math.round(100*(r.value-s.value))/100,o=n>0?"mdi:trending-up":n<0?"mdi:trending-down":"mdi:trending-neutral",c=n>0?"good":n<0?"bad":"";return R`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:chart-line"></ha-icon></div>
          <div class="title-block">
            <div class="title">${this._config.title??a??$e(t,"card.grade_trend.title")}</div>
            <div class="subtitle">${$e(t,"card.grade_trend.subtitle",{days:this._historyDays})}</div>
          </div>
          <div class="trend ${c}">
            <ha-icon icon=${o}></ha-icon>
            <span>${n>0?"+":""}${n}</span>
          </div>
        </div>
        <div class="chart-row">
          <div class="current-value">${r.value.toFixed(2)}</div>
          ${function(e,t={}){const i=t.width??280,a=t.height??72,s=t.colorVar??"var(--lc-brand)";if(e.length<2)return R`<svg width=${i} height=${a} viewBox="0 0 ${i} ${a}" class="line-chart"></svg>`;const r=e.map(e=>e.timestamp),n=e.map(e=>e.value),o=Math.min(...r),c=Math.max(...r),d=t.min??Math.min(...n),l=t.max??Math.max(...n),h=c-o||1,u=l-d||1,g=e=>6+(e-o)/h*(i-12),p=e=>a-6-(e-d)/u*(a-12),m=e.map(e=>`${g(e.timestamp).toFixed(1)},${p(e.value).toFixed(1)}`).join(" "),v=e[0],b=e[e.length-1],_=`${g(v.timestamp).toFixed(1)},${(a-6).toFixed(1)} ${m} ${g(b.timestamp).toFixed(1)},${(a-6).toFixed(1)}`;return R`
    <svg width=${i} height=${a} viewBox="0 0 ${i} ${a}" class="line-chart">
      <polygon points=${_} fill=${s} opacity="0.12"></polygon>
      <polyline
        points=${m}
        fill="none"
        stroke=${s}
        stroke-width="2"
        stroke-linejoin="round"
        stroke-linecap="round"
      ></polyline>
      <circle cx=${g(b.timestamp)} cy=${p(b.value)} r="3" fill=${s}></circle>
    </svg>
  `}(this._points,{colorVar:"var(--lc-brand)"})}
        </div>
      </ha-card>
    `}};var tt,it;et.styles=[Oe,Be,n`
      .header {
        align-items: flex-start;
      }
      .trend {
        display: flex;
        align-items: center;
        gap: 3px;
        font-size: 0.78rem;
        font-weight: 700;
        color: var(--secondary-text-color);
      }
      .trend.good {
        color: var(--lc-good);
      }
      .trend.bad {
        color: var(--lc-bad);
      }
      .trend ha-icon {
        --mdc-icon-size: 18px;
      }
      .chart-row {
        display: flex;
        align-items: center;
        gap: 12px;
      }
      .current-value {
        font-size: 1.6rem;
        font-weight: 800;
        flex: none;
        font-variant-numeric: tabular-nums;
      }
      .line-chart {
        flex: 1;
        min-width: 0;
        height: 56px;
      }
    `],e([me()],et.prototype,"_config",void 0),e([me()],et.prototype,"_points",void 0),et=e([he("librus-grade-trend-card")],et),function(e){e.language="language",e.system="system",e.comma_decimal="comma_decimal",e.decimal_comma="decimal_comma",e.space_comma="space_comma",e.none="none"}(tt||(tt={})),function(e){e.language="language",e.system="system",e.am_pm="12",e.twenty_four="24"}(it||(it={}));var at=["closed","locked","off"],st=function(e,t,i,a){a=a||{},i=null==i?{}:i;var s=new Event(t,{bubbles:void 0===a.bubbles||a.bubbles,cancelable:Boolean(a.cancelable),composed:void 0===a.composed||a.composed});return s.detail=i,e.dispatchEvent(s),s},rt=function(e){st(window,"haptic",e)},nt=function(e,t,i,a){if(a||(a={action:"more-info"}),!a.confirmation||a.confirmation.exemptions&&a.confirmation.exemptions.some(function(e){return e.user===t.user.id})||(rt("warning"),confirm(a.confirmation.text||"Are you sure you want to "+a.action+"?")))switch(a.action){case"more-info":(i.entity||i.camera_image)&&st(e,"hass-more-info",{entityId:i.entity?i.entity:i.camera_image});break;case"navigate":a.navigation_path&&function(e,t,i){void 0===i&&(i=!1),i?history.replaceState(null,"",t):history.pushState(null,"",t),st(window,"location-changed",{replace:i})}(0,a.navigation_path);break;case"url":a.url_path&&window.open(a.url_path);break;case"toggle":i.entity&&(function(e,t){(function(e,t,i){void 0===i&&(i=!0);var a,s=function(e){return e.substr(0,e.indexOf("."))}(t),r="group"===s?"homeassistant":s;switch(s){case"lock":a=i?"unlock":"lock";break;case"cover":a=i?"open_cover":"close_cover";break;default:a=i?"turn_on":"turn_off"}e.callService(r,a,{entity_id:t})})(e,t,at.includes(e.states[t].state))}(t,i.entity),rt("success"));break;case"call-service":if(!a.service)return void rt("failure");var s=a.service.split(".",2);t.callService(s[0],s[1],a.service_data,a.target),rt("success");break;case"fire-dom-event":st(e,"ll-custom",a)}};function ot(e){return void 0!==e&&"none"!==e.action}function ct(e,t,i){if(t&&ot(t))return a=>{e.hass&&(a.stopPropagation(),function(e,t,i){var a;i.tap_action&&(a=i.tap_action),nt(e,t,i,a)}(e,e.hass,{tap_action:t,entity:i}))}}function dt(e){return ot(e)}let lt=class extends Pe{static getConfigElement(){return Me()}static getStubConfig(){return{type:"custom:librus-grade-goal-card",target:4.5}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 2}render(){if(!this._config||!this.hass)return q;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{deviceId:t,map:i}=e,a=this.hass,s=we(a,t,"subject_average"),r=void 0!==this._config.subject_id?s.find(e=>e.subjectId===this._config.subject_id):void 0,n=r?r.entityId:i.overall_average,o=n?a.states[n]:void 0,c=Number(o?.state);if(!o||Number.isNaN(c))return this._message("mdi:target",$e(a,"card.grade_goal.empty"));const d=this._config.target??4.5,l=r?Number(o.attributes.grade_count)||0:s.reduce((e,t)=>e+(a.states[t.entityId]?.attributes.grades?.length??0),0),h=c>=d,u=d<=1?h?100:0:Math.max(0,Math.min(100,(c-1)/(d-1)*100)),g=!h&&d<6&&l>0?Math.ceil(l*(d-c)/(6-d)):null;return R`
      <ha-card @click=${ct(this,this._config.tap_action,n)}>
        <div class="header">
          <div class="icon-badge ${h?"good":""}">
            <ha-icon icon=${h?"mdi:flag-checkered":"mdi:target"}></ha-icon>
          </div>
          <div class="title-block">
            <div class="title">${this._config.title??r?.subject??$e(a,"card.grade_goal.title")}</div>
            <div class="subtitle">
              ${$e(a,r?"card.grade_goal.title":"card.grade_goal.subtitle_overall")}
            </div>
          </div>
        </div>
        <div class="ring-row">
          ${Ke(Math.round(u),h?"var(--lc-good)":"var(--lc-brand)",68,7)}
          <div>
            <div class="ring-num">${c.toFixed(2)}</div>
            <div class="ring-label">${$e(a,"label.current")}</div>
          </div>
        </div>
        <hr />
        <div class="stats">
          <div class="stat">
            <div class="stat-value">${d.toFixed(2)}</div>
            <div class="stat-label">${$e(a,"label.target")}</div>
          </div>
          <div class="stat ${h?"good":""}">
            <div class="stat-value">
              ${h?$e(a,"card.grade_goal.reached"):null!==g?$e(a,"label.sixes_needed",{n:g}):"—"}
            </div>
            <div class="stat-label">${h||null===g?"":$e(a,"label.to_go")}</div>
          </div>
        </div>
      </ha-card>
    `}};lt.styles=[Oe,Be,n`
      .ring-row {
        display: flex;
        align-items: center;
        gap: 16px;
      }
      .ring-num {
        font-size: 1.7rem;
        font-weight: 800;
        font-variant-numeric: tabular-nums;
        line-height: 1.1;
        color: var(--lc-brand);
      }
      .ring-label {
        font-size: 0.72rem;
        color: var(--secondary-text-color);
      }
      .stat .stat-value {
        font-size: 0.95rem;
      }
    `],e([me()],lt.prototype,"_config",void 0),lt=e([he("librus-grade-goal-card")],lt);const ht=[1,2,3,4,5,6];let ut=class extends Pe{constructor(){super(...arguments),this._grade=5,this._weight=1}static getConfigElement(){return Me()}static getStubConfig(){return{type:"custom:librus-grade-simulator-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 2}render(){if(!this._config||!this.hass)return q;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{deviceId:t}=e,i=this.hass,a=we(i,t,"subject_average"),s=void 0!==this._config.subject_id?a.find(e=>e.subjectId===this._config.subject_id):a[0],r=s?i.states[s.entityId]:void 0,n=Number(r?.state),o=Number(r?.attributes.grade_count)||0;if(!s||Number.isNaN(n))return this._message("mdi:calculator-variant-outline",$e(i,"card.grade_simulator.empty"));const c=(n*o+this._grade*this._weight)/(o+this._weight),d=Math.round(100*(c-n))/100,l=d>0?"good":d<0?"bad":"";return R`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:calculator-variant-outline"></ha-icon></div>
          <div class="title-block">
            <div class="title">${s.subject}</div>
            <div class="subtitle">${$e(i,"card.grade_simulator.subtitle")}</div>
          </div>
        </div>
        <div class="projection">
          <span class="from">${n.toFixed(2)}</span>
          <ha-icon icon="mdi:arrow-right-thin"></ha-icon>
          <span class="to ${l}">${c.toFixed(2)}</span>
          ${0!==d?R`<span class="delta ${l}">${d>0?"+":""}${d}</span>`:q}
        </div>
        <div class="grade-row">
          ${ht.map(e=>R`
              <button
                class="gbtn ${e===this._grade?"active":""}"
                @click=${()=>{this._grade=e}}
              >
                ${e}
              </button>
            `)}
        </div>
        <div class="weight-row">
          <span class="wlabel">${$e(i,"label.weight")}</span>
          <button
            class="wbtn"
            ?disabled=${this._weight<=1}
            @click=${()=>{this._weight=Math.max(1,this._weight-1)}}
          >
            −
          </button>
          <span class="wval">${this._weight}</span>
          <button
            class="wbtn"
            ?disabled=${this._weight>=5}
            @click=${()=>{this._weight=Math.min(5,this._weight+1)}}
          >
            +
          </button>
        </div>
      </ha-card>
    `}};ut.styles=[Oe,Be,n`
      .projection {
        display: flex;
        align-items: baseline;
        gap: 10px;
      }
      .projection .from {
        font-size: 1.5rem;
        font-weight: 700;
        color: var(--secondary-text-color);
        font-variant-numeric: tabular-nums;
      }
      .projection ha-icon {
        --mdc-icon-size: 20px;
        color: var(--secondary-text-color);
        align-self: center;
      }
      .projection .to {
        font-size: 1.9rem;
        font-weight: 800;
        color: var(--lc-brand);
        font-variant-numeric: tabular-nums;
      }
      .projection .to.good {
        color: var(--lc-good);
      }
      .projection .to.bad {
        color: var(--lc-bad);
      }
      .delta {
        font-size: 0.8rem;
        font-weight: 700;
      }
      .delta.good {
        color: var(--lc-good);
      }
      .delta.bad {
        color: var(--lc-bad);
      }
      .grade-row {
        display: flex;
        gap: 6px;
      }
      .gbtn {
        flex: 1;
        border: 1px solid var(--divider-color);
        background: var(--card-background-color);
        color: var(--primary-text-color);
        border-radius: 8px;
        padding: 8px 0;
        font-size: 0.95rem;
        font-weight: 700;
        cursor: pointer;
        font-family: inherit;
      }
      .gbtn.active {
        background: var(--lc-brand);
        border-color: var(--lc-brand);
        color: #fff;
      }
      .weight-row {
        display: flex;
        align-items: center;
        gap: 10px;
      }
      .wlabel {
        font-size: 0.78rem;
        color: var(--secondary-text-color);
        font-weight: 600;
        margin-right: auto;
      }
      .wbtn {
        width: 28px;
        height: 28px;
        border: 1px solid var(--divider-color);
        background: var(--card-background-color);
        color: var(--primary-text-color);
        border-radius: 8px;
        font-size: 1rem;
        font-weight: 800;
        cursor: pointer;
        font-family: inherit;
      }
      .wbtn[disabled] {
        opacity: 0.4;
        cursor: default;
      }
      .wval {
        font-size: 1rem;
        font-weight: 800;
        min-width: 16px;
        text-align: center;
        font-variant-numeric: tabular-nums;
      }
    `],e([me()],ut.prototype,"_config",void 0),e([me()],ut.prototype,"_grade",void 0),e([me()],ut.prototype,"_weight",void 0),ut=e([he("librus-grade-simulator-card")],ut);let gt=class extends Pe{static getConfigElement(){return Me()}static getStubConfig(){return{type:"custom:librus-semester-comparison-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 3}render(){if(!this._config||!this.hass)return q;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{deviceId:t}=e,i=this.hass,a=e=>{if(null==e)return null;const t=Number(e);return Number.isFinite(t)?t:null},s=we(i,t,"subject_average").map(e=>{const t=i.states[e.entityId]?.attributes??{};return{subject:e.subject,s1:a(t.average_semester_1),s2:a(t.average_semester_2)}}).filter(e=>null!==e.s1||null!==e.s2).sort((e,t)=>e.subject.localeCompare(t.subject));return 0===s.length?this._message("mdi:swap-horizontal",$e(i,"card.semester_comparison.empty")):R`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:swap-horizontal"></ha-icon></div>
          <div class="title-block">
            <div class="title">${this._config.title??$e(i,"card.semester_comparison.title")}</div>
            <div class="subtitle">${$e(i,"card.semester_comparison.subtitle")}</div>
          </div>
        </div>
        <div class="rows">
          <div class="row head">
            <span class="subj"></span>
            <span class="val">${$e(i,"card.semester_comparison.s1")}</span>
            <span class="val">${$e(i,"card.semester_comparison.s2")}</span>
            <span class="delta"></span>
          </div>
          ${s.map(e=>{const t=null!==e.s1&&null!==e.s2?Math.round(100*(e.s2-e.s1))/100:null,i=null===t?"":t>0?"good":t<0?"bad":"";return R`
              <div class="row">
                <span class="subj" title=${e.subject}>${e.subject}</span>
                <span class="val">${null!==e.s1?e.s1.toFixed(2):"—"}</span>
                <span class="val strong">${null!==e.s2?e.s2.toFixed(2):"—"}</span>
                <span class="delta ${i}">
                  ${null===t?"":R`<ha-icon
                          icon=${t>0?"mdi:menu-up":t<0?"mdi:menu-down":"mdi:minus"}
                        ></ha-icon>${0!==t?Math.abs(t).toFixed(2):""}`}
                </span>
              </div>
            `})}
        </div>
      </ha-card>
    `}};gt.styles=[Oe,Be,n`
      .rows {
        display: flex;
        flex-direction: column;
        gap: 3px;
      }
      .row {
        display: grid;
        grid-template-columns: 1fr 3.2rem 3.2rem 3.2rem;
        align-items: center;
        gap: 6px;
        font-size: 0.82rem;
        padding: 3px 0;
      }
      .row.head {
        font-size: 0.62rem;
        font-weight: 800;
        text-transform: uppercase;
        letter-spacing: 0.04em;
        color: var(--secondary-text-color);
      }
      .subj {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .val {
        text-align: right;
        font-variant-numeric: tabular-nums;
        color: var(--secondary-text-color);
      }
      .val.strong {
        color: var(--primary-text-color);
        font-weight: 700;
      }
      .delta {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 1px;
        font-size: 0.72rem;
        font-weight: 700;
        font-variant-numeric: tabular-nums;
        color: var(--secondary-text-color);
      }
      .delta ha-icon {
        --mdc-icon-size: 16px;
      }
      .delta.good {
        color: var(--lc-good);
      }
      .delta.bad {
        color: var(--lc-bad);
      }
    `],e([me()],gt.prototype,"_config",void 0),gt=e([he("librus-semester-comparison-card")],gt);const pt=["1","2","3","4","5","6"],mt={1:"var(--lc-bad)",2:"var(--lc-bad)",3:"var(--lc-warn)",4:"var(--lc-good)",5:"var(--lc-good)",6:"var(--lc-good)",other:"var(--lc-neutral-dot)"};let vt=class extends Pe{static getConfigElement(){return Me()}static getStubConfig(){return{type:"custom:librus-grade-distribution-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 2}render(){if(!this._config||!this.hass)return q;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{deviceId:t}=e,i=this.hass,a={1:0,2:0,3:0,4:0,5:0,6:0,other:0};let s=0;for(const e of we(i,t,"subject_average")){const t=i.states[e.entityId]?.attributes.grades??[];for(const e of t){const t=/^([1-6])/.exec(e.value.trim())?.[1];a[t??"other"]+=1,s+=1}}if(0===s)return this._message("mdi:chart-bar",$e(i,"card.grades.empty"));const r=Math.max(...Object.values(a),1),n=[...pt,"other"];return R`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:chart-bar"></ha-icon></div>
          <div class="title-block">
            <div class="title">${$e(i,"card.grade_distribution.title")}</div>
            <div class="subtitle">${$e(i,"card.grade_distribution.subtitle",{count:s})}</div>
          </div>
        </div>
        <div class="histogram">
          ${n.map(e=>{const t=a[e];return R`
              <div class="col">
                <div class="col-count">${t>0?t:""}</div>
                <div class="col-bar-track">
                  <div
                    class="col-bar"
                    style="height:${t/r*100}%;background:${mt[e]}"
                  ></div>
                </div>
                <div class="col-label">${"other"===e?$e(i,"card.grade_distribution.other"):e}</div>
              </div>
            `})}
        </div>
      </ha-card>
    `}};vt.styles=[Oe,Be,n`
      .histogram {
        display: flex;
        align-items: flex-end;
        gap: 6px;
        height: 110px;
      }
      .col {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 100%;
        min-width: 0;
      }
      .col-count {
        font-size: 0.68rem;
        font-weight: 800;
        min-height: 14px;
      }
      .col-bar-track {
        flex: 1;
        width: 100%;
        display: flex;
        align-items: flex-end;
      }
      .col-bar {
        width: 100%;
        min-height: 3px;
        border-radius: 4px 4px 0 0;
        transition: height 0.2s ease;
      }
      .col-label {
        font-size: 0.66rem;
        color: var(--secondary-text-color);
        font-weight: 700;
        margin-top: 4px;
      }
    `],e([me()],vt.prototype,"_config",void 0),vt=e([he("librus-grade-distribution-card")],vt);let bt=class extends Pe{static getConfigElement(){return Me()}static getStubConfig(){return{type:"custom:librus-grades-radar-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 3}render(){if(!this._config||!this.hass)return q;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{deviceId:t}=e,i=this.hass,a=[];for(const e of we(i,t,"subject_average")){const t=i.states[e.entityId]?.state,s=void 0!==t?Number(t):NaN;Number.isFinite(s)&&a.push({label:e.subject,value:s})}if(a.length<3)return this._message("mdi:chart-timeline-variant",$e(i,"card.grades_radar.empty"));const s=a.reduce((e,t)=>e+t.value,0)/a.length;return R`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:chart-timeline-variant"></ha-icon></div>
          <div class="title-block">
            <div class="title">${$e(i,"card.grades_radar.title")}</div>
            <div class="subtitle">${$e(i,"card.grades_radar.subtitle")}</div>
          </div>
        </div>
        <div class="chart-wrap">${Ue(a,{max:6})}</div>
        <div class="legend">
          <span class="legend-item">
            <span class="dot" style="background:var(--lc-brand)"></span>
            ${$e(i,"label.average")} <b>${s.toFixed(2)}</b>
          </span>
        </div>
      </ha-card>
    `}};bt.styles=[Oe,Be],e([me()],bt.prototype,"_config",void 0),bt=e([he("librus-grades-radar-card")],bt);const _t=Array.from({length:16},(e,t)=>`var(--lc-chart-${t+1})`);let yt=class extends Pe{static getConfigElement(){return Me()}static getStubConfig(){return{type:"custom:librus-grade-category-distribution-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 3}render(){if(!this._config||!this.hass)return q;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{deviceId:t}=e,i=this.hass,a=new Map;for(const e of we(i,t,"subject_average")){const t=i.states[e.entityId]?.attributes.grades??[];for(const e of t){const t=e.category??"__uncategorized";a.set(t,(a.get(t)??0)+1)}}const s=[...a.values()].reduce((e,t)=>e+t,0);if(0===s)return this._message("mdi:chart-donut",$e(i,"card.grade_category_distribution.empty"));const r=[...a.entries()].sort((e,t)=>t[1]-e[1]).map(([e,t],a)=>({label:"__uncategorized"===e?$e(i,"card.grade_category_distribution.uncategorized"):e,value:t,colorVar:_t[a%_t.length]}));return R`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:chart-bar"></ha-icon></div>
          <div class="title-block">
            <div class="title">${$e(i,"card.grade_category_distribution.title")}</div>
            <div class="subtitle">${$e(i,"card.grade_category_distribution.subtitle")}</div>
          </div>
        </div>
        ${Fe(r)}
      </ha-card>
    `}};yt.styles=[Oe,Be],e([me()],yt.prototype,"_config",void 0),yt=e([he("librus-grade-category-distribution-card")],yt);let ft=class extends Pe{static getConfigElement(){return Me()}static getStubConfig(){return{type:"custom:librus-latest-grade-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 2}render(){if(!this._config||!this.hass)return q;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{deviceId:t}=e,i=this.hass,a=function(e,t){let i=null;for(const a of we(e,t,"subject_average")){const t=e.states[a.entityId]?.attributes;t?.latest_grade&&t.latest_grade_date&&(!i||t.latest_grade_date>i.date)&&(i={subject:a.subject,grade:t.latest_grade,date:t.latest_grade_date,comments:t.latest_grade_comments??[]})}return i}(i,t);return a?R`
      <ha-card>
        <div class="header">
          <div class="icon-badge amber"><ha-icon icon="mdi:star-outline"></ha-icon></div>
          <div class="title-block">
            <div class="title">${$e(i,"card.latest_grade.title")}</div>
            <div class="subtitle">${a.subject} &middot; ${Ge(a.date,i.language)}</div>
          </div>
          <div class="grade-badge">${a.grade}</div>
        </div>
        ${a.comments.length?R`
              <hr />
              ${a.comments.map(e=>R`<div class="quote">${e}</div>`)}
            `:q}
      </ha-card>
    `:this._message("mdi:star-outline",$e(i,"card.latest_grade.empty"))}};ft.styles=[Oe,Be,n`
      .grade-badge {
        font-size: 1.5rem;
        font-weight: 800;
        color: var(--lc-brand);
        flex: none;
      }
    `],e([me()],ft.prototype,"_config",void 0),ft=e([he("librus-latest-grade-card")],ft);let wt=class extends Pe{static getConfigElement(){return Me()}static getStubConfig(){return{type:"custom:librus-behaviour-grade-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 2}render(){if(!this._config||!this.hass)return q;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{map:t}=e,i=this.hass,a=t.behaviour_grade?i.states[t.behaviour_grade]:void 0,s=(a?.attributes.recent??[])[0];return s?R`
      <ha-card>
        <div class="header">
          <div class="icon-badge good"><ha-icon icon="mdi:medal-outline"></ha-icon></div>
          <div class="title-block">
            <div class="title">${$e(i,"card.behaviour_grade.title")}</div>
            <div class="subtitle">${s.category??$e(i,"card.behaviour_grade.subtitle")}</div>
          </div>
          <div class="grade-badge">${s.short_name}</div>
        </div>
        ${null!==s.value?R`<div class="stats"><div class="stat good"><div class="stat-value">${s.value>0?"+":""}${s.value}</div><div class="stat-label">pkt</div></div></div>`:q}
        ${s.text?R`<div class="quote">${s.text}</div>`:q}
      </ha-card>
    `:this._message("mdi:medal-outline",$e(i,"card.behaviour_grade.empty"))}};wt.styles=[Oe,Be,n`
      .grade-badge {
        font-size: 1.5rem;
        font-weight: 800;
        color: var(--lc-good);
        flex: none;
      }
    `],e([me()],wt.prototype,"_config",void 0),wt=e([he("librus-behaviour-grade-card")],wt);let kt=class extends Pe{static getConfigElement(){return Me()}static getStubConfig(){return{type:"custom:librus-descriptive-grades-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 2}render(){if(!this._config||!this.hass)return q;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{map:t}=e,i=this.hass,a=t.descriptive_grades?i.states[t.descriptive_grades]:void 0,s=a?.attributes.recent??[];return a&&0!==s.length?R`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:text-box-outline"></ha-icon></div>
          <div class="title-block">
            <div class="title">${$e(i,"card.descriptive_grades.title")}</div>
            <div class="subtitle">${$e(i,"card.descriptive_grades.subtitle")}</div>
          </div>
        </div>
        <div class="scroll-list">
          ${s.map(e=>R`
              <div class="list-item">
                <span class="dot neutral"></span>
                <div class="body">
                  <div class="row1">
                    <span>${e.subject??""}</span>
                    ${e.date?R`<time>${Ge(e.date,i.language)}</time>`:q}
                  </div>
                  <div class="item-text">${e.value}</div>
                </div>
              </div>
            `)}
        </div>
      </ha-card>
    `:this._message("mdi:text-box-outline",$e(i,"card.descriptive_grades.empty"))}};kt.styles=[Oe,Be],e([me()],kt.prototype,"_config",void 0),kt=e([he("librus-descriptive-grades-card")],kt);const xt=new Set(["unknown","unavailable",""]);let $t=class extends Pe{static getConfigElement(){return Me()}static getStubConfig(){return{type:"custom:librus-subject-spotlight-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 2}render(){if(!this._config||!this.hass)return q;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{deviceId:t}=e,i=this.hass,a=we(i,t,"subject_average").map(e=>({subject:e.subject,state:i.states[e.entityId]})).filter(e=>e.state&&!xt.has(e.state.state)).map(e=>({subject:e.subject,value:Number(e.state.state)})).filter(e=>!Number.isNaN(e.value));if(a.length<2)return this._message("mdi:podium-gold",$e(i,"card.subject_spotlight.empty"));const s=a.reduce((e,t)=>t.value>e.value?t:e),r=a.reduce((e,t)=>t.value<e.value?t:e),n=e=>e.toLocaleString(i.language,{maximumFractionDigits:2});return R`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:podium-gold"></ha-icon></div>
          <div class="title-block">
            <div class="title">${$e(i,"card.subject_spotlight.title")}</div>
            <div class="subtitle">${$e(i,"card.subject_spotlight.subtitle")}</div>
          </div>
        </div>
        <div class="spotlight-row">
          <div class="spotlight-tile good">
            <ha-icon icon="mdi:trophy-outline"></ha-icon>
            <div class="spotlight-value">${n(s.value)}</div>
            <div class="spotlight-subject">${s.subject}</div>
            <div class="spotlight-label">${$e(i,"card.subject_spotlight.best")}</div>
          </div>
          <div class="spotlight-tile warn">
            <ha-icon icon="mdi:book-open-page-variant-outline"></ha-icon>
            <div class="spotlight-value">${n(r.value)}</div>
            <div class="spotlight-subject">${r.subject}</div>
            <div class="spotlight-label">${$e(i,"card.subject_spotlight.weakest")}</div>
          </div>
        </div>
      </ha-card>
    `}};$t.styles=[Oe,Be,n`
      .spotlight-row {
        display: flex;
        gap: 10px;
      }
      .spotlight-tile {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        gap: 2px;
        padding: 12px 8px;
        border-radius: var(--ha-card-border-radius, 12px);
        background: var(--divider-color);
      }
      .spotlight-tile.good {
        background: var(--lc-good-bg);
      }
      .spotlight-tile.good ha-icon {
        color: var(--lc-good);
      }
      .spotlight-tile.warn {
        background: var(--lc-warn-bg);
      }
      .spotlight-tile.warn ha-icon {
        color: var(--lc-warn);
      }
      .spotlight-value {
        font-size: 1.3rem;
        font-weight: 800;
        font-variant-numeric: tabular-nums;
        margin-top: 2px;
      }
      .spotlight-subject {
        font-size: 0.78rem;
        font-weight: 700;
        color: var(--primary-text-color);
      }
      .spotlight-label {
        font-size: 0.62rem;
        color: var(--secondary-text-color);
        text-transform: uppercase;
        letter-spacing: 0.04em;
      }
    `],e([me()],$t.prototype,"_config",void 0),$t=e([he("librus-subject-spotlight-card")],$t);const zt=/^obecno|^present/i,jt=/uspr\.?/i;function Ct(e,t){return t?.[e]??zt.test(e)?"good":jt.test(e)?"warn":"bad"}let St=class extends Pe{static getConfigElement(){return Me()}static getStubConfig(){return{type:"custom:librus-attendance-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 2}render(){if(!this._config||!this.hass)return q;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{map:t}=e,i=this.hass,a=t.attendance?i.states[t.attendance]:void 0;if(!a)return this._message("mdi:calendar-remove",$e(i,"empty.generic_error"));const s=a.attributes.breakdown??{},r=a.attributes.presence_by_type,n=a.attributes.total_records??0,o=a.attributes.percentage,c=a.attributes.by_semester??{},d=Object.entries(c).sort(([e],[t])=>Number(e)-Number(t)),l=Number(a.state)||0,h=a.attributes.unexcused_count,u=a.attributes.excused_count,g=void 0!==h,p=Object.entries(s),m={good:"var(--lc-good)",warn:"var(--lc-warn)",bad:"var(--lc-bad)"},v=p.map(([e,t])=>({flexGrow:Math.max(t,.001),colorVar:m[Ct(e,r)],title:`${e}: ${t}`}));return R`
      <ha-card>
        <div class="header">
          <div class="icon-badge bad"><ha-icon icon="mdi:calendar-remove"></ha-icon></div>
          <div class="title-block">
            <div class="title">${$e(i,"card.attendance.title")}</div>
            <div class="subtitle">${$e(i,"card.attendance.subtitle")}</div>
          </div>
        </div>
        <div class="stats">
          ${null!=o?R`
                <div class="stat ${o>=90?"good":o<75?"bad":""}">
                  <div class="stat-value">${o}<span class="unit">%</span></div>
                  <div class="stat-label">${$e(i,"stat.percentage")}</div>
                </div>
              `:q}
          ${g?R`
                <div class="stat ${h>0?"bad":""}">
                  <div class="stat-value">${h}</div>
                  <div class="stat-label">${$e(i,"stat.unexcused")}</div>
                </div>
                <div class="stat ${u>0?"warn":""}">
                  <div class="stat-value">${u}</div>
                  <div class="stat-label">${$e(i,"stat.excused")}</div>
                </div>
              `:R`
                <div class="stat bad">
                  <div class="stat-value">${l}</div>
                  <div class="stat-label">${$e(i,"stat.absences")}</div>
                </div>
              `}
          <div class="stat">
            <div class="stat-value">${n}</div>
            <div class="stat-label">${$e(i,"stat.records")}</div>
          </div>
        </div>
        ${v.length?function(e){return R`
    <div class="bar">
      ${e.map(e=>R`<div
            class="seg"
            style="flex-grow:${e.flexGrow};background:${e.colorVar}"
            title=${e.title??""}
          ></div>`)}
    </div>
  `}(v):q}
        ${p.length?R`
              <div class="legend">
                ${p.map(([e,t])=>R`
                    <span class="legend-item">
                      <span class="legend-dot ${Ct(e,r)}"></span>${e}
                      <b>${t}</b>
                    </span>
                  `)}
              </div>
            `:q}
        ${d.length>1?R`
              <hr />
              <div class="semester-block">
                <div class="semester-title">${$e(i,"card.attendance.by_semester")}</div>
                ${d.map(([e,t])=>R`
                    <div class="semester-row">
                      <span>${$e(i,"card.attendance.semester",{n:e})}</span>
                      <span class="semester-pct">${null!=t.percentage?`${t.percentage}%`:"–"}</span>
                    </div>
                  `)}
              </div>
            `:q}
      </ha-card>
    `}};St.styles=[Oe,Be,n`
      .legend {
        display: flex;
        flex-wrap: wrap;
        gap: 8px 14px;
        font-size: 0.7rem;
        color: var(--secondary-text-color);
      }
      .legend-item {
        display: inline-flex;
        align-items: center;
        gap: 5px;
      }
      .legend-item b {
        color: var(--primary-text-color);
      }
      .legend-dot {
        width: 7px;
        height: 7px;
        border-radius: 50%;
        display: inline-block;
      }
      .legend-dot.good {
        background: var(--lc-good);
      }
      .legend-dot.bad {
        background: var(--lc-bad);
      }
      .legend-dot.warn {
        background: var(--lc-warn);
      }
      .semester-title {
        font-size: 0.65rem;
        color: var(--secondary-text-color);
        text-transform: uppercase;
        letter-spacing: 0.04em;
        margin-bottom: 4px;
      }
      .semester-row {
        display: flex;
        justify-content: space-between;
        font-size: 0.78rem;
        padding: 3px 0;
      }
      .semester-pct {
        font-weight: 700;
        font-variant-numeric: tabular-nums;
      }
    `],e([me()],St.prototype,"_config",void 0),St=e([he("librus-attendance-card")],St);let Dt=class extends Pe{static getConfigElement(){return Me()}static getStubConfig(){return{type:"custom:librus-attendance-tile-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 1}render(){if(!this._config||!this.hass)return q;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{map:t}=e,i=this.hass,a=t.attendance?i.states[t.attendance]:void 0;if(!a)return this._message("mdi:calendar-remove",$e(i,"empty.generic_error"));const s=a.attributes.percentage,r=a.attributes.unexcused_count??(Number(a.state)||0),n=a.attributes.excused_count;return R`
      <ha-card class="tile" @click=${ct(this,this._config.tap_action,t.attendance)}>
        <div class="icon-badge ${0===r?"good":"bad"}">
          <ha-icon icon="mdi:calendar-remove"></ha-icon>
        </div>
        <div class="tile-body">
          <div class="subj">
            ${r} ${$e(i,"stat.absences").toLowerCase()}
          </div>
          ${null!=s||n?R`
                <div class="meta">
                  ${null!=s?R`${$e(i,"stat.percentage")}: ${s}%`:q}
                  ${n?R`${null!=s?" · ":""}${n} ${$e(i,"stat.excused").toLowerCase()}`:q}
                </div>
              `:q}
        </div>
      </ha-card>
    `}};function It(e){const t=new Date(e);return t.setDate(t.getDate()-(function(e){const t=e.getDay();return 0===t?7:t}(e)-1)),t.setHours(0,0,0,0),t}Dt.styles=[Oe,Be,n`
      ha-card.tile {
        flex-direction: row;
        align-items: center;
        padding: 12px 16px;
      }
      .tile-body {
        min-width: 0;
      }
      .subj {
        font-weight: 700;
        font-size: 0.86rem;
      }
      .meta {
        font-size: 0.7rem;
        color: var(--secondary-text-color);
        margin-top: 1px;
      }
    `],e([me()],Dt.prototype,"_config",void 0),Dt=e([he("librus-attendance-tile-card")],Dt);const Et=[0,1,2,3,4];let Tt=class extends Pe{static getConfigElement(){return Me()}static getStubConfig(){return{type:"custom:librus-attendance-heatmap-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 2}render(){if(!this._config||!this.hass)return q;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{map:t}=e,i=this.hass,a=t.attendance?i.states[t.attendance]:void 0,s=a?.attributes.by_date;if(!a||!s||0===Object.keys(s).length)return this._message("mdi:calendar-blank-outline",$e(i,"card.attendance_heatmap.empty"));const r=t.school_class?i.states[t.school_class]:void 0,n=r?.attributes.school_year_start,o=new Date,c=It(o),d=n?It(new Date(`${n}T00:00:00`)):new Date(c.getTime()-96768e5),l=[];for(let e=new Date(d);e<=c;e.setDate(e.getDate()+7))l.push(new Date(e));return R`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:calendar-blank-outline"></ha-icon></div>
          <div class="title-block">
            <div class="title">${$e(i,"card.attendance_heatmap.title")}</div>
            <div class="subtitle">${$e(i,"card.attendance_heatmap.subtitle")}</div>
          </div>
        </div>
        <div class="heatmap-scroll">
          <div class="heatmap" style="grid-template-columns: repeat(${l.length}, 11px);">
            ${l.map(e=>R`
                <div class="heatmap-col">
                  ${Et.map(t=>{const a=new Date(e);if(a.setDate(a.getDate()+t),a>o)return R`<span class="cell future"></span>`;const r=function(e){return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`}(a),n=s[r];return R`<span class="cell ${n??"none"}" title=${`${r}${n?` - ${$e(i,`card.attendance_heatmap.status.${n}`)}`:""}`}></span>`})}
                </div>
              `)}
          </div>
        </div>
        <div class="heatmap-legend">
          <span class="legend-item"><span class="cell good"></span>${$e(i,"card.attendance_heatmap.status.good")}</span>
          <span class="legend-item"><span class="cell warn"></span>${$e(i,"card.attendance_heatmap.status.warn")}</span>
          <span class="legend-item"><span class="cell bad"></span>${$e(i,"card.attendance_heatmap.status.bad")}</span>
          <span class="legend-item"><span class="cell none"></span>${$e(i,"card.attendance_heatmap.no_data")}</span>
        </div>
      </ha-card>
    `}};Tt.styles=[Oe,Be,n`
      .heatmap-scroll {
        overflow-x: auto;
        padding-bottom: 2px;
      }
      .heatmap {
        display: grid;
        grid-auto-flow: column;
        gap: 3px;
        width: max-content;
      }
      .heatmap-col {
        display: flex;
        flex-direction: column;
        gap: 3px;
      }
      .cell {
        width: 11px;
        height: 11px;
        border-radius: 3px;
        display: inline-block;
        background: var(--divider-color);
      }
      .cell.good {
        background: var(--lc-good);
      }
      .cell.warn {
        background: var(--lc-warn);
      }
      .cell.bad {
        background: var(--lc-bad);
      }
      .cell.future {
        background: transparent;
      }
      .heatmap-legend {
        display: flex;
        flex-wrap: wrap;
        gap: 4px 12px;
        margin-top: 10px;
        font-size: 0.66rem;
        color: var(--secondary-text-color);
      }
      .legend-item {
        display: inline-flex;
        align-items: center;
        gap: 5px;
      }
      .legend-item .cell {
        width: 9px;
        height: 9px;
      }
    `],e([me()],Tt.prototype,"_config",void 0),Tt=e([he("librus-attendance-heatmap-card")],Tt);const Nt=[1,2,3,4,5],At=["excused","unexcused","late"],Mt={excused:"var(--lc-warn)",unexcused:"var(--lc-bad)",late:"var(--lc-brand)"},Lt={excused:"stat.excused",unexcused:"stat.unexcused",late:"stat.late"};let Pt=class extends Pe{static getConfigElement(){return Me()}static getStubConfig(){return{type:"custom:librus-attendance-weekday-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 3}render(){if(!this._config||!this.hass)return q;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{map:t}=e,i=this.hass,a=t.attendance?i.states[t.attendance]:void 0,s=a?.attributes.by_weekday,r=Nt.map(e=>{const t=s?.[String(e)];return(t?.excused??0)+(t?.unexcused??0)+(t?.late??0)}),n=r.reduce((e,t)=>e+t,0);if(!s||0===n)return this._message("mdi:chart-bar-stacked",$e(i,"card.attendance_weekday.empty"));const o=Math.max(...r,1),c={excused:0,unexcused:0,late:0};for(const e of Nt){const t=s[String(e)];t&&(c.excused+=t.excused,c.unexcused+=t.unexcused,c.late+=t.late)}const d=Nt.map(e=>new Date(2026,0,e+4).toLocaleDateString(i.language,{weekday:"short"}));return R`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:chart-bar-stacked"></ha-icon></div>
          <div class="title-block">
            <div class="title">${$e(i,"card.attendance_weekday.title")}</div>
            <div class="subtitle">${$e(i,"card.attendance_weekday.subtitle")}</div>
          </div>
        </div>
        <div class="weekday-bars">
          ${Nt.map((e,t)=>{const a=s[String(e)],n=r[t],c=n>0?Math.max(22,n/o*84):4;return R`
              <div class="weekday-col">
                <div class="weekday-total">${n||""}</div>
                <div class="weekday-bar-stack" style="height:${c}px;${0===n?"background:var(--divider-color);":""}">
                  ${At.filter(e=>a&&a[e]>0).map(e=>R`
                      <div
                        class="seg"
                        style="height:${(a[e]/n*c).toFixed(1)}px;background:${Mt[e]}"
                        title="${$e(i,Lt[e])}: ${a[e]}"
                      ></div>
                    `)}
                </div>
                <div class="weekday-label">${d[t]}</div>
              </div>
            `})}
        </div>
        <div class="legend">
          ${At.map(e=>R`
              <span class="legend-item">
                <span class="dot" style="background:${Mt[e]}"></span>${$e(i,Lt[e])} <b>${c[e]}</b>
              </span>
            `)}
        </div>
      </ha-card>
    `}};Pt.styles=[Oe,Be,n`
      .weekday-bars {
        display: flex;
        align-items: flex-end;
        gap: 12px;
        height: 110px;
        padding: 0 4px;
      }
      .weekday-col {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-end;
        gap: 6px;
        height: 100%;
      }
      .weekday-total {
        font-size: 0.68rem;
        font-weight: 800;
        color: var(--primary-text-color);
        height: 14px;
      }
      .weekday-bar-stack {
        width: 100%;
        max-width: 30px;
        border-radius: 6px 6px 3px 3px;
        display: flex;
        flex-direction: column;
        overflow: hidden;
      }
      .weekday-bar-stack .seg:first-child {
        border-radius: 6px 6px 0 0;
      }
      .weekday-bar-stack .seg:last-child {
        border-radius: 0 0 3px 3px;
      }
      .weekday-label {
        font-size: 0.66rem;
        color: var(--secondary-text-color);
        font-weight: 700;
      }
    `],e([me()],Pt.prototype,"_config",void 0),Pt=e([he("librus-attendance-weekday-card")],Pt);const Ot={positive:"good",negative:"bad",neutral:"neutral"};let Bt=class extends Pe{static getConfigElement(){return Me()}static getStubConfig(){return{type:"custom:librus-behaviour-notices-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 2}render(){if(!this._config||!this.hass)return q;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{map:t}=e,i=this.hass,a=t.behaviour_notices?i.states[t.behaviour_notices]:void 0,s=a?.attributes.recent??[],r=a&&Number(a.state)||0;return a&&0!==s.length?R`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:alert-circle-outline"></ha-icon></div>
          <div class="title-block">
            <div class="title">${$e(i,"card.behaviour_notices.title")}</div>
            <div class="subtitle">${r}</div>
          </div>
        </div>
        <div class="scroll-list">
          ${s.map(e=>R`
              <div class="list-item">
                <span class="dot ${Ot[e.sentiment??"neutral"]}"></span>
                <div class="body">
                  <div class="row1">
                    <span class="cat-label">${e.category??""}</span>
                    ${e.date?R`<time>${Ge(e.date,i.language)}</time>`:q}
                  </div>
                  <div class="item-text">${e.text}</div>
                </div>
              </div>
            `)}
        </div>
      </ha-card>
    `:this._message("mdi:alert-circle-outline",$e(i,"card.behaviour_notices.empty"))}};Bt.styles=[Oe,Be],e([me()],Bt.prototype,"_config",void 0),Bt=e([he("librus-behaviour-notices-card")],Bt);let Ft=class extends Pe{static getConfigElement(){return Me()}static getStubConfig(){return{type:"custom:librus-behaviour-notices-tile-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 1}render(){if(!this._config||!this.hass)return q;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{map:t}=e,i=this.hass,a=t.behaviour_notices?i.states[t.behaviour_notices]:void 0;if(!a)return this._message("mdi:alert-circle-outline",$e(i,"empty.generic_error"));const s=Number(a.state)||0,r=(a.attributes.recent??[])[0],n="negative"===r?.sentiment?"bad":"positive"===r?.sentiment?"good":"";return R`
      <ha-card class="tile" @click=${ct(this,this._config.tap_action,t.behaviour_notices)}>
        <div class="icon-badge ${n}"><ha-icon icon="mdi:alert-circle-outline"></ha-icon></div>
        <div class="tile-body">
          <div class="subj">${s} ${$e(i,"card.behaviour_notices.title").toLowerCase()}</div>
          ${r?.category?R`<div class="meta">${r.category}</div>`:q}
        </div>
      </ha-card>
    `}};async function Kt(e,t,i,a="inbox"){return(await e.callWS({type:"call_service",domain:"librus_synergia",service:"get_message",service_data:{device_id:t,message_id:i,mailbox:a},return_response:!0})).response}Ft.styles=[Oe,Be,n`
      ha-card.tile {
        flex-direction: row;
        align-items: center;
        padding: 12px 16px;
      }
      .tile-body {
        min-width: 0;
      }
      .subj {
        font-weight: 700;
        font-size: 0.86rem;
      }
      .meta {
        font-size: 0.7rem;
        color: var(--secondary-text-color);
        margin-top: 1px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    `],e([me()],Ft.prototype,"_config",void 0),Ft=e([he("librus-behaviour-notices-tile-card")],Ft);const Ut={inbox:"recent",substitutions:"substitutions_recent",alerts:"alerts_recent",justifications:"justifications_recent"},Ht=[{key:"inbox",label:"mailbox.inbox"},{key:"notes",label:"mailbox.notes"},{key:"alerts",label:"mailbox.alerts"},{key:"substitutions",label:"mailbox.substitutions"},{key:"absences",label:"mailbox.absences"},{key:"justifications",label:"mailbox.justifications"},{key:"trash",label:"mailbox.trash"}];let Rt=class extends Pe{constructor(){super(...arguments),this._fullById={},this._pendingIds=new Set,this._errorIds=new Set}static getConfigElement(){return Me()}static getStubConfig(){return{type:"custom:librus-messages-card"}}get _mailbox(){return this._config?.mailbox&&Ut[this._config.mailbox]?this._config.mailbox:"inbox"}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 3}async _onMessageClick(e){if(this._expandedId===e.id)return void(this._expandedId=void 0);if(this._expandedId=e.id,this._fullById[e.id]||this._pendingIds.has(e.id))return;const t=this._resolveEntities();if("error"in t||!this.hass)return;const i=e.mailbox??this._mailbox;this._pendingIds=new Set(this._pendingIds).add(e.id);const a=new Set(this._errorIds);a.delete(e.id),this._errorIds=a;try{const a=await Kt(this.hass,t.deviceId,e.id,i);this._fullById={...this._fullById,[e.id]:a}}catch{this._errorIds=new Set(this._errorIds).add(e.id)}finally{const t=new Set(this._pendingIds);t.delete(e.id),this._pendingIds=t}}_renderMessageBody(e){const t=this.hass;if(this._expandedId!==e.id)return R`<div class="item-text"><b>${e.topic}</b> - ${e.content}</div>`;const i=this._fullById[e.id];return i?R`
        <div class="item-text"><b>${i.topic}</b></div>
        <div class="full-text">${i.content}</div>
        ${i.attachments?.length?R`
              <div class="attachments">
                ${i.attachments.map(e=>R`<div class="attachment">
                    <ha-icon icon="mdi:paperclip"></ha-icon>${e.filename??e.id}
                  </div>`)}
                <div class="read-notice">${$e(t,"card.messages.attachment_notice")}</div>
              </div>
            `:q}
        <div class="read-notice">${$e(t,"card.messages.read_notice")}</div>
      `:this._errorIds.has(e.id)?R`<div class="item-text"><b>${e.topic}</b> - ${$e(t,"card.messages.fetch_failed")}</div>`:R`<div class="item-text"><b>${e.topic}</b> - ${$e(t,"empty.loading")}</div>`}render(){if(!this._config||!this.hass)return q;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{map:t}=e,i=this.hass,a=t.unread_messages?i.states[t.unread_messages]:void 0;if(!a||"unavailable"===a.state)return this._message("mdi:email-outline",$e(i,"card.messages.unavailable"));const s=this._mailbox,r=a.attributes.mailbox_breakdown??{},n=a.attributes[Ut[s]]??[];Number(a.state);const o=this._config.max_items??6;return R`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:email-outline"></ha-icon></div>
          <div class="title-block">
            <div class="title">${this._config.title??$e(i,"card.messages.title")}</div>
            <div class="subtitle">${$e(i,`mailbox.${s}`)}</div>
          </div>
        </div>
        <div class="chips">
          ${Ht.map(({key:e,label:t})=>R`
              <span class="chip ${e===s?"hot":""}"
                >${$e(i,t)} <span class="n">${r[e]??0}</span></span
              >
            `)}
        </div>
        ${n.length?R`
              <hr />
              <div class="scroll-list">
                ${n.slice(0,o).map(e=>R`
                    <div class="list-item clickable" @click=${()=>this._onMessageClick(e)}>
                      <span class="dot ${e.unread?"good":"neutral"}"></span>
                      <div class="body">
                        <div class="row1">
                          <span class="sender"
                            >${e.sender}${e.has_attachment?R`<ha-icon class="clip" icon="mdi:paperclip"></ha-icon>`:q}</span
                          >
                          ${e.date?R`<time>${Ge(e.date,i.language)}</time>`:q}
                        </div>
                        ${this._renderMessageBody(e)}
                      </div>
                    </div>
                  `)}
              </div>
            `:q}
      </ha-card>
    `}};Rt.styles=[Oe,Be,n`
      .list-item.clickable {
        cursor: pointer;
      }
      .full-text {
        font-size: 0.75rem;
        color: var(--primary-text-color);
        margin-top: 4px;
        line-height: 1.5;
        white-space: pre-wrap;
      }
      .read-notice {
        font-size: 0.65rem;
        color: var(--secondary-text-color);
        font-style: italic;
        margin-top: 6px;
      }
      .clip {
        --mdc-icon-size: 13px;
        color: var(--secondary-text-color);
        display: inline-flex;
        vertical-align: -2px;
        margin-left: 4px;
      }
      .attachments {
        margin-top: 6px;
      }
      .attachment {
        display: flex;
        align-items: center;
        gap: 4px;
        font-size: 0.75rem;
        color: var(--primary-text-color);
      }
      .attachment ha-icon {
        --mdc-icon-size: 14px;
        flex: none;
      }
    `],e([me()],Rt.prototype,"_config",void 0),e([me()],Rt.prototype,"_expandedId",void 0),e([me()],Rt.prototype,"_fullById",void 0),e([me()],Rt.prototype,"_pendingIds",void 0),e([me()],Rt.prototype,"_errorIds",void 0),Rt=e([he("librus-messages-card")],Rt);let Wt=class extends Pe{static getConfigElement(){return Me()}static getStubConfig(){return{type:"custom:librus-messages-tile-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 1}render(){if(!this._config||!this.hass)return q;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{map:t}=e,i=this.hass,a=t.unread_messages?i.states[t.unread_messages]:void 0;if(!a||"unavailable"===a.state)return this._message("mdi:email-outline",$e(i,"card.messages.unavailable"));const s=Number(a.state)||0,r=(a.attributes.recent??[])[0];return R`
      <ha-card class="tile" @click=${ct(this,this._config.tap_action,t.unread_messages)}>
        <div class="icon-badge ${s>0?"amber":""}">
          <ha-icon icon="mdi:email-outline"></ha-icon>
        </div>
        <div class="tile-body">
          <div class="subj">${s} ${$e(i,"mailbox.inbox").toLowerCase()}</div>
          ${r?R`<div class="meta">${r.sender} · ${r.topic}</div>`:q}
        </div>
      </ha-card>
    `}};function Gt(e){return`${e.mailbox}:${e.id}`}Wt.styles=[Oe,Be,n`
      ha-card.tile {
        flex-direction: row;
        align-items: center;
        padding: 12px 16px;
      }
      .tile-body {
        min-width: 0;
      }
      .subj {
        font-weight: 700;
        font-size: 0.86rem;
      }
      .meta {
        font-size: 0.7rem;
        color: var(--secondary-text-color);
        margin-top: 1px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    `],e([me()],Wt.prototype,"_config",void 0),Wt=e([he("librus-messages-tile-card")],Wt);let qt=class extends Pe{constructor(){super(...arguments),this._fullByKey={},this._pendingKeys=new Set,this._errorKeys=new Set}static getConfigElement(){return Me()}static getStubConfig(){return{type:"custom:librus-substitutions-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 2}async _onClick(e){const t=Gt(e);if(this._expandedKey===t)return void(this._expandedKey=void 0);if(this._expandedKey=t,this._fullByKey[t]||this._pendingKeys.has(t))return;const i=this._resolveEntities();if("error"in i||!this.hass)return;this._pendingKeys=new Set(this._pendingKeys).add(t);const a=new Set(this._errorKeys);a.delete(t),this._errorKeys=a;try{const a=await Kt(this.hass,i.deviceId,e.id,e.mailbox);this._fullByKey={...this._fullByKey,[t]:a}}catch{this._errorKeys=new Set(this._errorKeys).add(t)}finally{const e=new Set(this._pendingKeys);e.delete(t),this._pendingKeys=e}}_renderBody(e){const t=this.hass,i=Gt(e);if(this._expandedKey!==i)return R`<div class="item-text"><b>${e.topic}</b> - ${e.content}</div>`;const a=this._fullByKey[i];return a?R`
        <div class="item-text"><b>${a.topic}</b></div>
        <div class="full-text">${a.content}</div>
        ${a.attachments?.length?R`
              <div class="attachments">
                ${a.attachments.map(e=>R`<div class="attachment">
                    <ha-icon icon="mdi:paperclip"></ha-icon>${e.filename??e.id}
                  </div>`)}
                <div class="read-notice">${$e(t,"card.messages.attachment_notice")}</div>
              </div>
            `:q}
        <div class="read-notice">${$e(t,"card.messages.read_notice")}</div>
      `:this._errorKeys.has(i)?R`<div class="item-text"><b>${e.topic}</b> - ${$e(t,"card.messages.fetch_failed")}</div>`:R`<div class="item-text"><b>${e.topic}</b> - ${$e(t,"empty.loading")}</div>`}_renderSection(e,t){if(0===t.length)return q;const i=this.hass;return R`
      <div class="section-title">${e}</div>
      <div class="scroll-list">
        ${t.map(e=>R`
            <div class="list-item clickable" @click=${()=>this._onClick(e)}>
              <span class="dot ${e.unread?"good":"neutral"}"></span>
              <div class="body">
                <div class="row1">
                  <span class="sender"
                    >${e.sender}${e.has_attachment?R`<ha-icon class="clip" icon="mdi:paperclip"></ha-icon>`:q}</span
                  >
                  ${e.date?R`<time>${Ge(e.date,i.language)}</time>`:q}
                </div>
                ${this._renderBody(e)}
              </div>
            </div>
          `)}
      </div>
    `}render(){if(!this._config||!this.hass)return q;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{map:t}=e,i=this.hass,a=t.unread_messages?i.states[t.unread_messages]:void 0,s=a?.attributes.substitutions_recent??[],r=a?.attributes.alerts_recent??[],n=a?.attributes.justifications_recent??[];return!a||0===s.length&&0===r.length&&0===n.length?this._message("mdi:bell-alert-outline",$e(i,"card.substitutions.empty")):R`
      <ha-card>
        <div class="header">
          <div class="icon-badge amber"><ha-icon icon="mdi:bell-alert-outline"></ha-icon></div>
          <div class="title-block">
            <div class="title">${$e(i,"card.substitutions.title")}</div>
            <div class="subtitle">${$e(i,"card.substitutions.subtitle")}</div>
          </div>
        </div>
        ${this._renderSection($e(i,"mailbox.substitutions"),s)}
        ${this._renderSection($e(i,"mailbox.alerts"),r)}
        ${this._renderSection($e(i,"mailbox.justifications"),n)}
      </ha-card>
    `}};qt.styles=[Oe,Be,n`
      .section-title {
        font-size: 0.65rem;
        color: var(--secondary-text-color);
        text-transform: uppercase;
        letter-spacing: 0.04em;
        margin-top: 2px;
      }
      .section-title:not(:first-of-type) {
        margin-top: 10px;
      }
      .list-item.clickable {
        cursor: pointer;
      }
      .full-text {
        font-size: 0.75rem;
        color: var(--primary-text-color);
        margin-top: 4px;
        line-height: 1.5;
        white-space: pre-wrap;
      }
      .read-notice {
        font-size: 0.65rem;
        color: var(--secondary-text-color);
        font-style: italic;
        margin-top: 6px;
      }
      .clip {
        --mdc-icon-size: 13px;
        color: var(--secondary-text-color);
        display: inline-flex;
        vertical-align: -2px;
        margin-left: 4px;
      }
      .attachments {
        margin-top: 6px;
      }
      .attachment {
        display: flex;
        align-items: center;
        gap: 4px;
        font-size: 0.75rem;
        color: var(--primary-text-color);
      }
      .attachment ha-icon {
        --mdc-icon-size: 14px;
        flex: none;
      }
    `],e([me()],qt.prototype,"_config",void 0),e([me()],qt.prototype,"_expandedKey",void 0),e([me()],qt.prototype,"_fullByKey",void 0),e([me()],qt.prototype,"_pendingKeys",void 0),e([me()],qt.prototype,"_errorKeys",void 0),qt=e([he("librus-substitutions-card")],qt);let Zt=class extends Pe{static getConfigElement(){return Me()}static getStubConfig(){return{type:"custom:librus-announcements-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 2}_toggleExpanded(e){this._expandedId=this._expandedId===e?void 0:e}render(){if(!this._config||!this.hass)return q;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{map:t}=e,i=this.hass,a=t.unread_announcements?i.states[t.unread_announcements]:void 0,s=a?.attributes.recent??[];if(!a||0===s.length)return this._message("mdi:bullhorn-outline",$e(i,"card.announcements.empty"));const r=s.slice(0,this._config.max_items??10);return R`
      <ha-card>
        <div class="header">
          <div class="icon-badge amber"><ha-icon icon="mdi:bullhorn-outline"></ha-icon></div>
          <div class="title-block">
            <div class="title">${this._config.title??$e(i,"card.announcements.title")}</div>
            <div class="subtitle">${a.state}</div>
          </div>
        </div>
        <div class="scroll-list">
          ${r.map((e,t)=>{const a=e.id??String(t);return R`
              <div class="list-item clickable" @click=${()=>this._toggleExpanded(a)}>
                <span class="dot neutral"></span>
                <div class="body">
                  <div class="row1">${e.subject}</div>
                  ${e.start_date&&e.end_date?R`<div class="item-text">
                        ${Ge(e.start_date,i.language)} –
                        ${Ge(e.end_date,i.language)}
                      </div>`:q}
                  ${this._expandedId===a?R`<div class="full-text">${e.content}</div>`:q}
                </div>
              </div>
            `})}
        </div>
      </ha-card>
    `}};Zt.styles=[Oe,Be,n`
      .list-item.clickable {
        cursor: pointer;
      }
      .full-text {
        font-size: 0.75rem;
        color: var(--primary-text-color);
        margin-top: 4px;
        line-height: 1.5;
        white-space: pre-wrap;
      }
    `],e([me()],Zt.prototype,"_config",void 0),e([me()],Zt.prototype,"_expandedId",void 0),Zt=e([he("librus-announcements-card")],Zt);let Jt=class extends Pe{static getConfigElement(){return Me()}static getStubConfig(){return{type:"custom:librus-announcements-tile-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 1}render(){if(!this._config||!this.hass)return q;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{map:t}=e,i=this.hass,a=t.unread_announcements?i.states[t.unread_announcements]:void 0;if(!a)return this._message("mdi:bullhorn-outline",$e(i,"empty.generic_error"));const s=Number(a.state)||0,r=(a.attributes.recent??[])[0];return R`
      <ha-card class="tile" @click=${ct(this,this._config.tap_action,t.unread_announcements)}>
        <div class="icon-badge ${s>0?"amber":""}">
          <ha-icon icon="mdi:bullhorn-outline"></ha-icon>
        </div>
        <div class="tile-body">
          <div class="subj">${s} ${$e(i,"card.announcements.title").toLowerCase()}</div>
          ${r?R`<div class="meta">${r.subject}</div>`:q}
        </div>
      </ha-card>
    `}};Jt.styles=[Oe,Be,n`
      ha-card.tile {
        flex-direction: row;
        align-items: center;
        padding: 12px 16px;
      }
      .tile-body {
        min-width: 0;
      }
      .subj {
        font-weight: 700;
        font-size: 0.86rem;
      }
      .meta {
        font-size: 0.7rem;
        color: var(--secondary-text-color);
        margin-top: 1px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    `],e([me()],Jt.prototype,"_config",void 0),Jt=e([he("librus-announcements-tile-card")],Jt);let Vt=class extends Pe{static getConfigElement(){return Me()}static getStubConfig(){return{type:"custom:librus-homework-assignments-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 2}render(){if(!this._config||!this.hass)return q;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{map:t}=e,i=this.hass,a=t.homework_assignments?i.states[t.homework_assignments]:void 0,s=a?.attributes.recent??[];return a&&0!==s.length?R`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:notebook-edit-outline"></ha-icon></div>
          <div class="title-block">
            <div class="title">${$e(i,"card.homework_assignments.title")}</div>
            <div class="subtitle">${a.state}</div>
          </div>
        </div>
        <div class="scroll-list">
          ${s.map(e=>R`
              <div class="list-item">
                <span class="dot neutral"></span>
                <div class="body">
                  <div class="row1">
                    <span>${e.topic}</span>
                    ${e.due_date?R`<time>${$e(i,"label.due")} ${Ge(e.due_date,i.language)}</time>`:q}
                  </div>
                  <div class="item-text">${e.text}${e.teacher?R` - ${e.teacher}`:q}</div>
                </div>
              </div>
            `)}
        </div>
      </ha-card>
    `:this._message("mdi:notebook-edit-outline",$e(i,"card.homework_assignments.empty"))}};Vt.styles=[Oe,Be],e([me()],Vt.prototype,"_config",void 0),Vt=e([he("librus-homework-assignments-card")],Vt);let Yt=class extends Pe{constructor(){super(...arguments),this._done=new Set,this._storageKey=""}static getConfigElement(){return Me()}static getStubConfig(){return{type:"custom:librus-homework-checklist-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 3}_load(e){const t=`librus-hw-done:${e}`;if(this._storageKey!==t){this._storageKey=t;try{const e=window.localStorage.getItem(t);this._done=new Set(e?JSON.parse(e):[])}catch{this._done=new Set}}}_persist(e){const t=[...this._done].filter(t=>e.has(t));try{window.localStorage.setItem(this._storageKey,JSON.stringify(t))}catch{}}_toggle(e,t){const i=new Set(this._done);i.has(e)?i.delete(e):i.add(e),this._done=i,this._persist(t)}render(){if(!this._config||!this.hass)return q;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{deviceId:t,map:i}=e,a=this.hass;this._load(t);const s=i.homework_assignments?a.states[i.homework_assignments]:void 0,r=(s?.attributes.recent??[]).map((e,t)=>({...e,key:void 0!==e.id?String(e.id):`${e.topic}|${e.due_date??t}`}));if(0===r.length)return this._message("mdi:notebook-edit-outline",$e(a,"card.homework_assignments.empty"));const n=new Set(r.map(e=>e.key)),o=this._config.max_items??12,c=[...r].sort((e,t)=>{const i=this._done.has(e.key)?1:0,a=this._done.has(t.key)?1:0;return i!==a?i-a:(e.due_date??"").localeCompare(t.due_date??"")}),d=r.filter(e=>this._done.has(e.key)).length;return R`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:notebook-edit-outline"></ha-icon></div>
          <div class="title-block">
            <div class="title">${this._config.title??$e(a,"card.homework_checklist.title")}</div>
            <div class="subtitle">
              ${$e(a,"card.homework_checklist.progress",{done:d,total:r.length})}
            </div>
          </div>
        </div>
        <div class="scroll-list">
          ${c.slice(0,o).map(e=>{const t=this._done.has(e.key);return R`
              <div
                class="hw-item ${t?"done":""}"
                role="checkbox"
                aria-checked=${t}
                tabindex="0"
                @click=${()=>this._toggle(e.key,n)}
                @keydown=${t=>{"Enter"!==t.key&&" "!==t.key||(t.preventDefault(),this._toggle(e.key,n))}}
              >
                <span class="box"><ha-icon icon=${t?"mdi:checkbox-marked":"mdi:checkbox-blank-outline"}></ha-icon></span>
                <div class="body">
                  <div class="row1">
                    <span>${e.topic||e.text}</span>
                    ${e.due_date?R`<time>${Ge(e.due_date,a.language)}</time>`:q}
                  </div>
                  ${e.text&&e.text!==e.topic?R`<div class="item-text">${e.text}</div>`:q}
                </div>
              </div>
            `})}
        </div>
      </ha-card>
    `}};Yt.styles=[Oe,Be,n`
      .hw-item {
        display: flex;
        gap: 10px;
        padding: 7px 4px;
        border-radius: 8px;
        cursor: pointer;
      }
      .hw-item:hover {
        background: var(--lc-chip-bg);
      }
      .box {
        flex: none;
        color: var(--lc-brand);
        display: flex;
        align-items: flex-start;
        padding-top: 1px;
      }
      .box ha-icon {
        --mdc-icon-size: 20px;
      }
      .hw-item.done {
        opacity: 0.5;
      }
      .hw-item.done .box {
        color: var(--lc-good);
      }
      .hw-item.done .row1 span {
        text-decoration: line-through;
      }
    `],e([me()],Yt.prototype,"_config",void 0),e([me()],Yt.prototype,"_done",void 0),Yt=e([he("librus-homework-checklist-card")],Yt);function Xt(e){return e.length<=10?`${e}T00:00:00`:e}let Qt=class extends Pe{static getConfigElement(){return Me()}static getStubConfig(){return{type:"custom:librus-recent-activity-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 4}render(){if(!this._config||!this.hass)return q;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{deviceId:t,map:i}=e,a=this.hass,s=[];for(const e of we(a,t,"subject_average")){const t=a.states[e.entityId]?.attributes.grades??[];for(const i of t)i.date&&s.push({date:i.date,icon:"mdi:notebook-outline",title:`${i.value} · ${e.subject}`,text:i.category??""})}const r=i.behaviour_notices?a.states[i.behaviour_notices]:void 0;for(const e of r?.attributes.recent??[])e.date&&s.push({date:e.date,icon:"mdi:alert-circle-outline",title:e.category??"",text:e.text});const n=i.unread_announcements?a.states[i.unread_announcements]:void 0;for(const e of n?.attributes.recent??[])e.creation_date&&s.push({date:e.creation_date,icon:"mdi:bullhorn-outline",title:e.subject,text:""});const o=i.unread_messages?a.states[i.unread_messages]:void 0;for(const e of o?.attributes.recent??[])e.date&&s.push({date:e.date,icon:"mdi:email-outline",title:`${e.sender} · ${e.topic}`,text:e.content});s.sort((e,t)=>Xt(t.date).localeCompare(Xt(e.date)));const c=s.slice(0,this._config.max_items??15);return 0===c.length?this._message("mdi:bell-outline",$e(a,"card.recent_activity.empty")):R`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:bell-outline"></ha-icon></div>
          <div class="title-block">
            <div class="title">${this._config.title??$e(a,"card.recent_activity.title")}</div>
            <div class="subtitle">${$e(a,"card.recent_activity.subtitle")}</div>
          </div>
        </div>
        <div class="scroll-list">
          ${c.map(e=>R`
              <div class="list-item">
                <div class="type-icon"><ha-icon icon=${e.icon}></ha-icon></div>
                <div class="body">
                  <div class="row1">
                    <span>${e.title}</span>
                    <time>${Ge(e.date,a.language)}</time>
                  </div>
                  ${e.text?R`<div class="item-text">${e.text}</div>`:q}
                </div>
              </div>
            `)}
        </div>
      </ha-card>
    `}};function ei(e){return"string"==typeof e?{value:e,allDay:e.length<=10}:e.date?{value:e.date,allDay:!0}:{value:e.dateTime??"",allDay:!1}}async function ti(e,t,i,a){const s=`calendars/${t}?start=${encodeURIComponent(i.toISOString())}&end=${encodeURIComponent(a.toISOString())}`,r=await e.callApi("GET",s);return Array.isArray(r)?r.map(e=>{const t=ei(e.start),i=ei(e.end);return{start:t.value,end:i.value,allDay:t.allDay,summary:e.summary??"",description:e.description,location:e.location}}):[]}function ii(e,t){if(e.allDay)return!1;const i=new Date(e.start).getTime(),a=new Date(e.end).getTime(),s=t.getTime();return s>=i&&s<a}function ai(e,t){return(e.allDay?new Date(`${e.end}T23:59:59`):new Date(e.end)).getTime()<t.getTime()}Qt.styles=[Oe,Be,n`
      .type-icon {
        flex: none;
        width: 26px;
        height: 26px;
        border-radius: 8px;
        background: var(--lc-chip-bg);
        color: var(--lc-brand);
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 1px;
      }
      .type-icon ha-icon {
        --mdc-icon-size: 15px;
      }
    `],e([me()],Qt.prototype,"_config",void 0),Qt=e([he("librus-recent-activity-card")],Qt);let si=class extends Pe{constructor(){super(...arguments),this._events=[]}static getConfigElement(){return Me()}static getStubConfig(){return{type:"custom:librus-today-lessons-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 4}connectedCallback(){super.connectedCallback(),this._refreshTimer=setInterval(()=>{this._fetch(!0)},3e5),this._tickTimer=setInterval(()=>this.requestUpdate(),6e4)}disconnectedCallback(){super.disconnectedCallback(),clearInterval(this._refreshTimer),clearInterval(this._tickTimer)}async _fetch(e=!1){if(!this.hass||!this._config)return;const t=this._resolveEntities();if("error"in t)return;const i=t.map.timetable;if(!i)return;const a=new Date;a.setHours(0,0,0,0);const s=new Date(a);s.setDate(s.getDate()+1);const r=`${i}:${a.toDateString()}`;if(e||this._fetchedFor!==r){this._fetchedFor=r;try{const e=await ti(this.hass,i,a,s);this._events=e.filter(e=>!e.allDay).sort((e,t)=>e.start.localeCompare(t.start))}catch{this._events=[]}}}render(){if(!this._config||!this.hass)return q;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const t=this.hass;if(this._fetch(),0===this._events.length)return this._message("mdi:calendar-clock",$e(t,"card.today_lessons.empty"));const i=new Date;return R`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:calendar-clock"></ha-icon></div>
          <div class="title-block">
            <div class="title">${$e(t,"card.today_lessons.title")}</div>
            <div class="subtitle">${$e(t,"card.today_lessons.subtitle")}</div>
          </div>
        </div>
        <div class="timeline">
          ${this._events.map(e=>{const a=ii(e,i),s=ai(e,i);return R`
              <div class="tl-item ${a?"now":""} ${s?"done":""}">
                <span class="tl-time">${We(e.start)}</span>
                <span class="tl-dot"></span>
                <div class="tl-body">
                  <div class="subj">
                    ${e.summary} ${a?R`<span class="pill-now">${$e(t,"label.now")}</span>`:q}
                  </div>
                  ${e.location||e.description?R`<div class="meta">${[e.location,e.description].filter(Boolean).join(" · ")}</div>`:q}
                </div>
              </div>
            `})}
        </div>
      </ha-card>
    `}};si.styles=[Oe,Be,n`
      .timeline {
        display: flex;
        flex-direction: column;
      }
      .tl-item {
        display: flex;
        gap: 11px;
        padding: 6px 0;
        position: relative;
      }
      .tl-item:not(:last-child)::after {
        content: "";
        position: absolute;
        left: 26px;
        top: 28px;
        bottom: -6px;
        width: 1px;
        background: var(--divider-color);
      }
      .tl-time {
        width: 38px;
        flex: none;
        font-size: 0.66rem;
        color: var(--secondary-text-color);
        font-weight: 700;
        padding-top: 2px;
        font-variant-numeric: tabular-nums;
      }
      .tl-dot {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        margin-top: 3px;
        flex: none;
        background: var(--card-background-color);
        border: 2px solid var(--lc-neutral-dot);
      }
      .tl-item.now .tl-dot {
        background: var(--lc-brand);
        border-color: var(--lc-brand);
        box-shadow: 0 0 0 4px var(--lc-brand-bg);
      }
      .tl-item.done {
        opacity: 0.5;
      }
      .subj {
        font-weight: 700;
        font-size: 0.8rem;
        display: flex;
        align-items: center;
        gap: 6px;
      }
      .tl-item.now .subj {
        color: var(--lc-brand-strong);
      }
      .meta {
        font-size: 0.68rem;
        color: var(--secondary-text-color);
      }
      .pill-now {
        font-size: 0.58rem;
        font-weight: 800;
        background: var(--lc-brand);
        color: #fff;
        padding: 1px 6px;
        border-radius: 999px;
        letter-spacing: 0.03em;
        text-transform: uppercase;
      }
    `],e([me()],si.prototype,"_config",void 0),e([me()],si.prototype,"_events",void 0),si=e([he("librus-today-lessons-card")],si);let ri=class extends Pe{static getConfigElement(){return Me()}static getStubConfig(){return{type:"custom:librus-next-lesson-tile-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 1}connectedCallback(){super.connectedCallback(),this._tickTimer=setInterval(()=>this.requestUpdate(),3e4)}disconnectedCallback(){super.disconnectedCallback(),clearInterval(this._tickTimer)}render(){if(!this._config||!this.hass)return q;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{map:t}=e,i=this.hass,a=t.timetable?i.states[t.timetable]:void 0,s=a?.attributes.message,r=a?.attributes.start_time;if(!a||!s||!r)return this._message("mdi:clock-outline",$e(i,"card.next_lesson.empty"));const n=new Date(r.replace(" ","T")),o=new Date,c="on"===a.state,d=Ze(n,o),l=a.attributes.location,h=a.attributes.description;return R`
      <ha-card class="tile" @click=${ct(this,this._config.tap_action,t.timetable)}>
        <div class="icon-badge ${c?"good":""}"><ha-icon icon="mdi:clock-outline"></ha-icon></div>
        <div class="tile-body">
          <div class="subj">${s}</div>
          <div class="meta">
            ${c?$e(i,"label.now"):`${We(r.replace(" ","T"))} · ${ze(i,d)}`}
            ${l?` · ${l}`:""}${h?` · ${h}`:""}
          </div>
        </div>
      </ha-card>
    `}};ri.styles=[Oe,Be,n`
      ha-card.tile {
        flex-direction: row;
        align-items: center;
        padding: 12px 16px;
      }
      .tile-body {
        min-width: 0;
      }
      .subj {
        font-weight: 700;
        font-size: 0.86rem;
      }
      .meta {
        font-size: 0.7rem;
        color: var(--secondary-text-color);
        margin-top: 1px;
      }
    `],e([me()],ri.prototype,"_config",void 0),ri=e([he("librus-next-lesson-tile-card")],ri);let ni=class extends Pe{constructor(){super(...arguments),this._events=[]}static getConfigElement(){return Me()}static getStubConfig(){return{type:"custom:librus-agenda-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 4}connectedCallback(){super.connectedCallback(),this._refreshTimer=setInterval(()=>{this._fetch(!0)},9e5)}disconnectedCallback(){super.disconnectedCallback(),clearInterval(this._refreshTimer)}async _fetch(e=!1){if(!this.hass||!this._config)return;const t=this._resolveEntities();if("error"in t)return;const i=t.map.agenda;if(!i)return;const a=this._config.days_ahead??14,s=new Date;s.setHours(0,0,0,0);const r=new Date(s);r.setDate(r.getDate()+a);const n=`${i}:${s.toDateString()}:${a}`;if(e||this._fetchedFor!==n){this._fetchedFor=n;try{const e=await ti(this.hass,i,s,r);this._events=e.sort((e,t)=>e.start.localeCompare(t.start))}catch{this._events=[]}}}render(){if(!this._config||!this.hass)return q;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const t=this.hass;if(this._fetch(),0===this._events.length)return this._message("mdi:calendar-text-outline",$e(t,"card.agenda.empty"));const i=new Map;for(const e of this._events){const t=e.start.slice(0,10);i.has(t)||i.set(t,[]),i.get(t).push(e)}return R`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:calendar-text-outline"></ha-icon></div>
          <div class="title-block">
            <div class="title">${this._config.title??$e(t,"card.agenda.title")}</div>
            <div class="subtitle">${$e(t,"card.agenda.subtitle")}</div>
          </div>
        </div>
        <div class="scroll-list">
          ${[...i.entries()].map(([e,i])=>R`
              <div class="day-group">
                <div class="day-label">${Ge(e,t.language)}</div>
                ${i.map(e=>{const{category:t,text:i}=Ve(e.summary);return R`
                    <div class="list-item">
                      <span class="dot neutral"></span>
                      <div class="body">
                        ${t?R`<div class="cat-label-row"><span class="cat-label">${t}</span></div>`:q}
                        <div class="row1">${i}</div>
                        ${e.description?R`<div class="item-text">${e.description}</div>`:q}
                      </div>
                    </div>
                  `})}
              </div>
            `)}
        </div>
      </ha-card>
    `}};ni.styles=[Oe,Be,n`
      .day-group {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .day-group:not(:last-child) {
        margin-bottom: 4px;
      }
      .day-label {
        font-size: 0.66rem;
        font-weight: 800;
        color: var(--secondary-text-color);
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }
    `],e([me()],ni.prototype,"_config",void 0),e([me()],ni.prototype,"_events",void 0),ni=e([he("librus-agenda-card")],ni);const oi=new Set(["unknown","unavailable",""]),ci="sprawdzian";let di=class extends Pe{constructor(){super(...arguments),this._events=[]}static getConfigElement(){return Me()}static getStubConfig(){return{type:"custom:librus-exam-countdown-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 2}connectedCallback(){super.connectedCallback(),this._refreshTimer=setInterval(()=>{this._fetch(!0)},9e5)}disconnectedCallback(){super.disconnectedCallback(),clearInterval(this._refreshTimer)}_sensorExams(){if(!this.hass)return;const e=this._resolveEntities();if("error"in e)return;const t=e.map.next_exam?this.hass.states[e.map.next_exam]:void 0;if(!t||oi.has(t.state))return;const i=(new Date).toLocaleDateString("en-CA"),a=(t.attributes.upcoming??[]).filter(e=>e.date>=i).sort((e,t)=>e.date.localeCompare(t.date)).map(e=>({date:e.date,text:[e.subject,e.content].filter(Boolean).join(" — ")||e.category||""}));return 0===a.length?[{date:t.state,text:t.attributes.subject??""}]:a}async _fetch(e=!1){if(!this.hass||!this._config)return;const t=this._resolveEntities();if("error"in t)return;if(void 0!==this._sensorExams())return;const i=t.map.agenda;if(!i)return;const a=new Date;a.setHours(0,0,0,0);const s=new Date(a);s.setDate(s.getDate()+90);const r=this._config.exam_keywords||ci,n=`${i}:${a.toDateString()}:${r}`;if(!e&&this._fetchedFor===n)return;this._fetchedFor=n;const o=function(e){const t=(e||ci).split(",").map(e=>e.trim()).filter(Boolean).map(e=>e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"));return new RegExp(t.length?t.join("|"):ci,"i")}(this._config.exam_keywords);try{const e=await ti(this.hass,i,a,s);this._events=e.filter(e=>{const{category:t}=Ve(e.summary);return null!==t&&o.test(t)}).sort((e,t)=>e.start.localeCompare(t.start))}catch{this._events=[]}}render(){if(!this._config||!this.hass)return q;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const t=this.hass;this._fetch();const i=this._sensorExams()??this._events.map(e=>({date:e.start,text:Ve(e.summary).text}));if(0===i.length)return this._message("mdi:clipboard-text-outline",$e(t,"card.exam_countdown.empty"));const[a,...s]=i,r=qe(new Date,new Date(`${a.date.slice(0,10)}T00:00:00`));return R`
      <ha-card @click=${ct(this,this._config.tap_action,e.map.next_exam||e.map.agenda)}>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:clipboard-text-outline"></ha-icon></div>
          <div class="title-block">
            <div class="title">${$e(t,"card.exam_countdown.title")}</div>
            <div class="subtitle">${Ge(a.date,t.language)}</div>
          </div>
        </div>
        <div class="countdown">
          <span class="big">${r}</span>
          <span class="unit">${$e(t,"label.days_until")}<br /><b>${a.text}</b></span>
        </div>
        ${s.length?R`
              <hr />
              <div class="chips">
                ${s.slice(0,4).map(e=>R`<span class="chip">${e.text} <span class="n">${Ge(e.date,t.language)}</span></span>`)}
              </div>
            `:q}
      </ha-card>
    `}};di.styles=[Oe,Be,n`
      .countdown {
        display: flex;
        align-items: baseline;
        gap: 10px;
      }
      .countdown .big {
        font-size: 2rem;
        font-weight: 800;
        color: var(--lc-brand);
        line-height: 1;
        font-variant-numeric: tabular-nums;
      }
      .countdown .unit {
        font-size: 0.76rem;
        color: var(--secondary-text-color);
        line-height: 1.4;
      }
    `],e([me()],di.prototype,"_config",void 0),e([me()],di.prototype,"_events",void 0),di=e([he("librus-exam-countdown-card")],di);let li=class extends Pe{constructor(){super(...arguments),this._events=[]}static getConfigElement(){return Me()}static getStubConfig(){return{type:"custom:librus-free-days-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 2}connectedCallback(){super.connectedCallback(),this._refreshTimer=setInterval(()=>{this._fetch(!0)},36e5)}disconnectedCallback(){super.disconnectedCallback(),clearInterval(this._refreshTimer)}async _fetch(e=!1){if(!this.hass||!this._config)return;const t=this._resolveEntities();if("error"in t)return;const i=t.map.free_days;if(!i)return;const a=new Date;a.setHours(0,0,0,0);const s=new Date(a);s.setDate(s.getDate()+240);const r=`${i}:${a.toDateString()}`;if(e||this._fetchedFor!==r){this._fetchedFor=r;try{const e=await ti(this.hass,i,a,s);this._events=e.sort((e,t)=>e.start.localeCompare(t.start))}catch{this._events=[]}}}render(){if(!this._config||!this.hass)return q;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const t=this.hass;if(this._fetch(),0===this._events.length)return this._message("mdi:beach",$e(t,"card.free_days.empty"));const i=new Date,[a,...s]=this._events,r=qe(i,new Date(`${a.start}T00:00:00`));return R`
      <ha-card>
        <div class="header">
          <div class="icon-badge amber"><ha-icon icon="mdi:beach"></ha-icon></div>
          <div class="title-block">
            <div class="title">${$e(t,"card.free_days.title")}</div>
            <div class="subtitle">${a.summary}</div>
          </div>
        </div>
        <div class="countdown">
          <span class="big">${r}</span>
          <span class="unit">${$e(t,"label.days_until")}<br /><b>${a.summary}</b></span>
        </div>
        ${s.length?R`
              <hr />
              <div class="chips">
                ${s.slice(0,4).map(e=>R`<span class="chip">${e.summary} <span class="n">${Ge(e.start,t.language)}</span></span>`)}
              </div>
            `:q}
      </ha-card>
    `}};li.styles=[Oe,Be,n`
      .countdown {
        display: flex;
        align-items: baseline;
        gap: 10px;
      }
      .countdown .big {
        font-size: 2rem;
        font-weight: 800;
        color: var(--lc-brand);
        line-height: 1;
        font-variant-numeric: tabular-nums;
      }
      .countdown .unit {
        font-size: 0.76rem;
        color: var(--secondary-text-color);
        line-height: 1.4;
      }
    `],e([me()],li.prototype,"_config",void 0),e([me()],li.prototype,"_events",void 0),li=e([he("librus-free-days-card")],li);let hi=class extends Pe{constructor(){super(...arguments),this._events=[]}static getConfigElement(){return Me()}static getStubConfig(){return{type:"custom:librus-free-days-tile-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 1}connectedCallback(){super.connectedCallback(),this._refreshTimer=setInterval(()=>{this._fetch(!0)},36e5)}disconnectedCallback(){super.disconnectedCallback(),clearInterval(this._refreshTimer)}async _fetch(e=!1){if(!this.hass||!this._config)return;const t=this._resolveEntities();if("error"in t)return;const i=t.map.free_days;if(!i)return;const a=new Date;a.setHours(0,0,0,0);const s=new Date(a);s.setDate(s.getDate()+240);const r=`${i}:${a.toDateString()}`;if(e||this._fetchedFor!==r){this._fetchedFor=r;try{const e=await ti(this.hass,i,a,s);this._events=e.sort((e,t)=>e.start.localeCompare(t.start))}catch{this._events=[]}}}render(){if(!this._config||!this.hass)return q;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const t=this.hass;if(this._fetch(),0===this._events.length)return this._message("mdi:beach",$e(t,"card.free_days.empty"));const[i]=this._events,a=qe(new Date,new Date(`${i.start}T00:00:00`));return R`
      <ha-card class="tile" @click=${ct(this,this._config.tap_action,e.map.free_days)}>
        <div class="icon-badge amber"><ha-icon icon="mdi:beach"></ha-icon></div>
        <div class="tile-body">
          <div class="subj">${a} ${$e(t,"label.days").toLowerCase()}</div>
          <div class="meta">${i.summary}</div>
        </div>
      </ha-card>
    `}};function ui(e){const t=new Date(e).getDay();return 0===t?7:t}hi.styles=[Oe,Be,n`
      ha-card.tile {
        flex-direction: row;
        align-items: center;
        padding: 12px 16px;
      }
      .tile-body {
        min-width: 0;
      }
      .subj {
        font-weight: 700;
        font-size: 0.86rem;
      }
      .meta {
        font-size: 0.7rem;
        color: var(--secondary-text-color);
        margin-top: 1px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    `],e([me()],hi.prototype,"_config",void 0),e([me()],hi.prototype,"_events",void 0),hi=e([he("librus-free-days-tile-card")],hi);let gi=class extends Pe{constructor(){super(...arguments),this._events=[]}static getConfigElement(){return Me()}static getStubConfig(){return{type:"custom:librus-week-timetable-card"}}get _dayCount(){return this._config?.show_saturday?6:5}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 4}connectedCallback(){super.connectedCallback(),this._refreshTimer=setInterval(()=>{this._fetch(!0)},18e5),this._tickTimer=setInterval(()=>this.requestUpdate(),3e4)}disconnectedCallback(){super.disconnectedCallback(),clearInterval(this._refreshTimer),clearInterval(this._tickTimer)}async _fetch(e=!1){if(!this.hass||!this._config)return;const t=this._resolveEntities();if("error"in t)return;const i=t.map.timetable;if(!i)return;const a=function(e){const t=new Date(e),i=ui(e.toISOString()),a=i>=6?8-i:1-i;return t.setDate(t.getDate()+a),t.setHours(0,0,0,0),t}(new Date),s=new Date(a);s.setDate(s.getDate()+this._dayCount);const r=`${i}:${a.toDateString()}:${this._dayCount}`;if(e||this._fetchedFor!==r){this._fetchedFor=r;try{this._events=await ti(this.hass,i,a,s)}catch{this._events=[]}}}render(){if(!this._config||!this.hass)return q;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const t=this.hass;if(this._fetch(),0===this._events.length)return this._message("mdi:calendar-week-outline",$e(t,"card.week_timetable.empty"));const i=this._dayCount,a=Array.from({length:i},()=>[]);for(const e of this._events){const t=ui(e.start);t>=1&&t<=i&&a[t-1].push(e)}a.forEach(e=>e.sort((e,t)=>e.start.localeCompare(t.start)));const s=Math.max(...a.map(e=>e.length),1),r=Array.from({length:i},(e,i)=>new Date(2026,0,i+5).toLocaleDateString(t.language,{weekday:"short"})),n=new Date,o=ui(n.toISOString())-1,c=o>=0&&o<i?a[o]:[],d=c.find(e=>ii(e,n)),l=c.find(e=>new Date(e.start)>n),h=!d&&!!l&&c.some(e=>ai(e,n));return R`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:calendar-week-outline"></ha-icon></div>
          <div class="title-block">
            <div class="title">${$e(t,"card.week_timetable.title")}</div>
            <div class="subtitle">
              ${h?$e(t,"card.week_timetable.break_now",{minutes:Ze(new Date(l.start),n)}):$e(t,function(e){return ui(e.toISOString())>=6}(new Date)?"card.week_timetable.subtitle_upcoming":"card.week_timetable.subtitle")}
            </div>
          </div>
        </div>
        <div
          class="week-grid"
          style="grid-template-columns: 24px repeat(${i}, 1fr); grid-template-rows: auto repeat(${s}, 1fr);"
        >
          <span class="h"></span>
          ${r.map(e=>R`<span class="h">${e}</span>`)}
          ${Array.from({length:s},(e,t)=>R`
            <span class="n">${t+1}</span>
            ${a.map((e,i)=>{const a=e[t];if(!a)return R`<div class="cell empty"></div>`;const s=i===o&&ii(a,n);return R`<div
                class="cell on ${s?"current":""} ${h&&i===o&&a===l?"next":""}"
                title=${a.summary}
              >${function(e){const t=e.replace(/\(.*\)/,"").trim();return t.length<=4?t:t.slice(0,3)}(a.summary)}</div>`})}
          `)}
        </div>
      </ha-card>
    `}};gi.styles=[Oe,Be,n`
      .week-grid {
        display: grid;
        grid-template-columns: 24px repeat(5, 1fr); /* overridden inline per show_saturday */
        gap: 4px;
        font-size: 0.62rem;
      }
      .h {
        color: var(--secondary-text-color);
        text-align: center;
        font-weight: 700;
        padding-bottom: 2px;
        text-transform: capitalize;
      }
      .n {
        color: var(--secondary-text-color);
        text-align: center;
        font-weight: 700;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .cell {
        background: var(--divider-color);
        border-radius: 5px;
        padding: 3px 2px;
        text-align: center;
        font-weight: 700;
        color: var(--secondary-text-color);
        min-height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        line-height: 1.1;
      }
      .cell.on {
        background: var(--lc-brand-bg);
        color: var(--lc-brand-strong);
      }
      .cell.current {
        background: var(--lc-brand);
        color: #fff;
        box-shadow: 0 0 0 2px var(--lc-brand-strong);
      }
      /* The lesson coming up right after the break we're currently in. */
      .cell.next {
        background: var(--lc-brand-bg);
        color: var(--lc-brand-strong);
        outline: 2px dashed var(--lc-brand);
        outline-offset: -2px;
      }
      .cell.empty {
        background: transparent;
      }
    `],e([me()],gi.prototype,"_config",void 0),e([me()],gi.prototype,"_events",void 0),gi=e([he("librus-week-timetable-card")],gi);const pi=new Set(["unknown","unavailable",""]);function mi(e){return e.toLocaleTimeString("en-GB",{hour:"2-digit",minute:"2-digit",hour12:!1})}function vi(e){return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`}let bi=class extends Pe{constructor(){super(...arguments),this._events=[]}static getConfigElement(){return Me()}static getStubConfig(){return{type:"custom:librus-bell-schedule-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 3}connectedCallback(){super.connectedCallback(),this._refreshTimer=setInterval(()=>{this._fetch(!0)},9e5),this._tickTimer=setInterval(()=>this.requestUpdate(),3e4)}disconnectedCallback(){super.disconnectedCallback(),clearInterval(this._refreshTimer),clearInterval(this._tickTimer)}_targetDay(){const e=this._nextLessonDateIso();if(e){const t=new Date(`${e}T00:00:00`);if(!Number.isNaN(t.getTime()))return t}const t=new Date;return t.setHours(0,0,0,0),t}_nextLessonDateIso(){if(!this.hass)return;const e=this._resolveEntities();if("error"in e)return;const t=e.map.next_lesson?this.hass.states[e.map.next_lesson]:void 0,i=t?.attributes.date;return i&&!pi.has(t?.state??"")?i:void 0}async _fetch(e=!1){if(!this.hass||!this._config)return;const t=this._resolveEntities();if("error"in t)return;const i=t.map.timetable;if(!i)return;const a=this._targetDay(),s=new Date(a);s.setDate(s.getDate()+1);const r=`${i}:${vi(a)}`;if(e||this._fetchedFor!==r){this._fetchedFor=r;try{this._events=(await ti(this.hass,i,a,s)).filter(e=>!e.allDay)}catch{this._events=[]}}}render(){if(!this._config||!this.hass)return q;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{map:t}=e,i=this.hass;this._fetch();const a=t.school?i.states[t.school]:void 0,s=a?.attributes.bell_schedule??[];if(0===s.length)return this._message("mdi:bell-outline",$e(i,"card.bell_schedule.empty"));const r=new Map;for(const e of this._events){const t=mi(new Date(e.start));!r.has(t)&&e.summary&&r.set(t,{subject:e.summary,room:e.location||void 0})}const n=vi(this._targetDay())===vi(new Date),o=mi(new Date),c=t.current_lesson?i.states[t.current_lesson]:void 0,d=t.next_lesson?i.states[t.next_lesson]:void 0,l=c&&!pi.has(c.state)?c.state:void 0,h=d&&!pi.has(d.state)?d.state:void 0;let u;if(l)u=`${l} · ${$e(i,"label.now")}`;else if(h){const e=Number(d?.attributes.minutes_until);u=Number.isNaN(e)?h:`${h} · ${ze(i,e)}`}else u=$e(i,"label.after_school");return R`
      <ha-card @click=${ct(this,this._config.tap_action,t.school)}>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:bell-outline"></ha-icon></div>
          <div class="title-block">
            <div class="title">${this._config.title??$e(i,"card.bell_schedule.title")}</div>
            <div class="subtitle">${u}</div>
          </div>
        </div>
        <div class="periods">
          ${s.map(e=>{const t=r.get(e.start),a=n&&e.start<=o&&o<=e.end,s=n&&o>e.end;return R`
              <div class="period ${a?"current":""} ${s?"past":""} ${t?"":"free"}">
                <span class="pnum">${$e(i,"label.lesson_short",{n:e.lesson_no})}</span>
                <span class="ptime">${e.start}<span class="dash">–</span>${e.end}</span>
                ${t?R`<span class="psubj"
                      >${t.subject}${t.room?R` <span class="proom">${t.room}</span>`:q}</span
                    >`:q}
              </div>
            `})}
        </div>
      </ha-card>
    `}};function _i(e){const t=new Date(e),i=function(e){const t=new Date(e).getDay();return 0===t?7:t}(e.toISOString()),a=i>=6?8-i:1-i;return t.setDate(t.getDate()+a),t.setHours(0,0,0,0),t}bi.styles=[Oe,Be,n`
      .periods {
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
      .period {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 6px 8px;
        border-radius: 8px;
        font-size: 0.82rem;
      }
      .period.past {
        opacity: 0.45;
      }
      .period.free {
        opacity: 0.55;
      }
      .period.current {
        background: var(--lc-brand-bg);
        color: var(--lc-brand-strong);
        font-weight: 700;
        opacity: 1;
      }
      .pnum {
        flex: none;
        min-width: 30px;
        font-weight: 800;
        font-size: 0.72rem;
        color: var(--secondary-text-color);
      }
      .period.current .pnum {
        color: var(--lc-brand-strong);
      }
      .ptime {
        font-variant-numeric: tabular-nums;
        flex: none;
      }
      .dash {
        margin: 0 3px;
        color: var(--secondary-text-color);
      }
      .psubj {
        margin-left: auto;
        font-weight: 700;
        text-align: right;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .proom {
        font-weight: 600;
        color: var(--secondary-text-color);
        font-size: 0.72rem;
      }
    `],e([me()],bi.prototype,"_config",void 0),e([me()],bi.prototype,"_events",void 0),bi=e([he("librus-bell-schedule-card")],bi);const yi=Array.from({length:16},(e,t)=>`var(--lc-chart-${t+1})`);let fi=class extends Pe{constructor(){super(...arguments),this._events=[]}static getConfigElement(){return Me()}static getStubConfig(){return{type:"custom:librus-subject-time-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 3}connectedCallback(){super.connectedCallback(),this._refreshTimer=setInterval(()=>{this._fetch(!0)},18e5)}disconnectedCallback(){super.disconnectedCallback(),clearInterval(this._refreshTimer)}async _fetch(e=!1){if(!this.hass||!this._config)return;const t=this._resolveEntities();if("error"in t)return;const i=t.map.timetable;if(!i)return;const a=_i(new Date),s=new Date(a);s.setDate(s.getDate()+5);const r=`${i}:${a.toDateString()}`;if(e||this._fetchedFor!==r){this._fetchedFor=r;try{this._events=await ti(this.hass,i,a,s)}catch{this._events=[]}}}render(){if(!this._config||!this.hass)return q;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const t=this.hass;if(this._fetch(),0===this._events.length)return this._message("mdi:chart-bar",$e(t,"card.subject_time.empty"));const i=new Map;for(const e of this._events)e.summary&&i.set(e.summary,(i.get(e.summary)??0)+1);const a=[...i.entries()].sort((e,t)=>t[1]-e[1]).map(([e,t],i)=>({label:e,value:t,colorVar:yi[i%yi.length]}));return R`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:chart-bar"></ha-icon></div>
          <div class="title-block">
            <div class="title">${$e(t,"card.subject_time.title")}</div>
            <div class="subtitle">${$e(t,"card.subject_time.subtitle")}</div>
          </div>
        </div>
        ${Fe(a)}
      </ha-card>
    `}};fi.styles=[Oe,Be],e([me()],fi.prototype,"_config",void 0),e([me()],fi.prototype,"_events",void 0),fi=e([he("librus-subject-time-card")],fi);let wi=class extends Pe{static getConfigElement(){return Me()}static getStubConfig(){return{type:"custom:librus-school-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 2}render(){if(!this._config||!this.hass)return q;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{map:t}=e,i=this.hass,a=t.school?i.states[t.school]:void 0,s=t.school_class?i.states[t.school_class]:void 0;if(!a)return this._message("mdi:school",$e(i,"empty.generic_error"));const r=a.attributes.town,n=a.attributes.street,o=a.attributes.head_teacher,c=s?.attributes.homeroom_teacher,d=s?.attributes.first_semester_end,l=s?.attributes.school_year_end;return R`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:school"></ha-icon></div>
          <div class="title-block">
            <div class="title">${a.state}</div>
            <div class="subtitle">${[r,n].filter(Boolean).join(", ")}</div>
          </div>
        </div>
        <div class="stats">
          ${s?R`<div class="stat"><div class="stat-value">${s.state}</div><div class="stat-label">Klasa</div></div>`:q}
          ${c?R`<div class="stat"><div class="stat-value" style="font-size:0.95rem;">${c}</div><div class="stat-label">${$e(i,"label.tutor")}</div></div>`:q}
        </div>
        ${o?R`<div class="item-text">${$e(i,"label.head_teacher")}: ${o}</div>`:q}
        ${d||l?R`
              <hr />
              <div class="chips">
                ${d?R`<span class="chip">${$e(i,"label.semester_ends")} <span class="n">${Ge(d,i.language)}</span></span>`:q}
                ${l?R`<span class="chip">${$e(i,"label.year_ends")} <span class="n">${Ge(l,i.language)}</span></span>`:q}
              </div>
            `:q}
      </ha-card>
    `}};wi.styles=[Oe,Be],e([me()],wi.prototype,"_config",void 0),wi=e([he("librus-school-card")],wi);let ki=class extends Pe{static getConfigElement(){return Me()}static getStubConfig(){return{type:"custom:librus-school-year-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 2}connectedCallback(){super.connectedCallback(),this._tickTimer=setInterval(()=>this.requestUpdate(),36e5)}disconnectedCallback(){super.disconnectedCallback(),clearInterval(this._tickTimer)}render(){if(!this._config||!this.hass)return q;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{map:t}=e,i=this.hass,a=t.school_class?i.states[t.school_class]:void 0,s=a?.attributes.school_year_start,r=a?.attributes.first_semester_end,n=a?.attributes.school_year_end;if(!a||!s||!n)return this._message("mdi:party-popper",$e(i,"card.school_year.empty"));const o=new Date,c=new Date(`${s}T00:00:00`),d=new Date(`${n}T00:00:00`),l=Math.max(1,qe(c,d)),h=Math.min(l,Math.max(0,qe(c,o))),u=Math.round(h/l*100),g=Math.max(0,qe(o,d)),p=!r||o<new Date(`${r}T00:00:00`),m=p&&r?r:n,v=Math.max(0,qe(o,new Date(`${m}T00:00:00`)));return R`
      <ha-card @click=${ct(this,this._config.tap_action,t.school_class)}>
        <div class="header">
          <div class="icon-badge amber"><ha-icon icon="mdi:party-popper"></ha-icon></div>
          <div class="title-block">
            <div class="title">${$e(i,"card.school_year.title")}</div>
            <div class="subtitle">${Ge(n,i.language)}</div>
          </div>
        </div>
        <div class="ring-row">
          ${Ke(u,"var(--lc-brand)",68,7)}
          <div>
            <div class="ring-num">${g}</div>
            <div class="ring-label">${$e(i,"label.days_until_year_end")}</div>
          </div>
        </div>
        <hr />
        <div class="stats">
          <div class="stat">
            <div class="stat-value">${$e(i,"card.attendance.semester",{n:p?1:2})}</div>
            <div class="stat-label">${$e(i,"label.current_semester")}</div>
          </div>
          <div class="stat">
            <div class="stat-value">${v}</div>
            <div class="stat-label">${$e(i,"label.days_until_semester_end")}</div>
          </div>
          <div class="stat">
            <div class="stat-value">${u}<span class="unit">%</span></div>
            <div class="stat-label">${$e(i,"label.year_progress")}</div>
          </div>
        </div>
      </ha-card>
    `}};ki.styles=[Oe,Be,n`
      .ring-row {
        display: flex;
        align-items: center;
        gap: 16px;
      }
      .ring-num {
        font-size: 1.7rem;
        font-weight: 800;
        font-variant-numeric: tabular-nums;
        line-height: 1.1;
        color: var(--lc-brand);
      }
      .ring-label {
        font-size: 0.72rem;
        color: var(--secondary-text-color);
      }
    `],e([me()],ki.prototype,"_config",void 0),ki=e([he("librus-school-year-card")],ki);const xi=new Set(["unknown","unavailable",""]);let $i=class extends Pe{static getConfigElement(){return Me()}static getStubConfig(){return{type:"custom:librus-today-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 2}connectedCallback(){super.connectedCallback(),this._tickTimer=setInterval(()=>this.requestUpdate(),6e4)}disconnectedCallback(){super.disconnectedCallback(),clearInterval(this._tickTimer)}render(){if(!this._config||!this.hass)return q;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{map:t}=e,i=this.hass,a=e=>t[e]?i.states[t[e]]:void 0,s=a("lucky_number"),r=a("unread_messages"),n=a("unread_announcements"),o=a("timetable"),c=o?.attributes.message,d=o?.attributes.start_time,l="on"===o?.state;return R`
      <ha-card @click=${ct(this,this._config.tap_action,t.timetable)}>
        <div class="header">
          <div class="icon-badge amber"><ha-icon icon="mdi:white-balance-sunny"></ha-icon></div>
          <div class="title-block">
            <div class="title">${$e(i,"card.today.title")}</div>
            <div class="subtitle">${(new Date).toLocaleDateString(i.language,{weekday:"long",day:"numeric",month:"long"})}</div>
          </div>
        </div>
        <div class="stats">
          ${s&&!xi.has(s.state)&&!1!==s.attributes.is_today?R`<div class="stat"><div class="stat-value">${s.state}</div><div class="stat-label">${$e(i,"stat.lucky_number")}</div></div>`:q}
          ${r&&!xi.has(r.state)?R`<div class="stat"><div class="stat-value">${r.state}</div><div class="stat-label">${$e(i,"card.messages.title")}</div></div>`:q}
          ${n&&!xi.has(n.state)?R`<div class="stat"><div class="stat-value">${n.state}</div><div class="stat-label">${$e(i,"card.announcements.title")}</div></div>`:q}
        </div>
        ${c&&d?R`
              <hr />
              <div class="list-item">
                <span class="dot ${l?"good":"neutral"}"></span>
                <div class="body">
                  <div class="row1">${c}</div>
                  ${l?q:R`<div class="item-text">${ze(i,Ze(new Date(d.replace(" ","T")),new Date))}</div>`}
                </div>
              </div>
            `:q}
      </ha-card>
    `}};function zi(e){return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`}function ji(e){const t=new Date(e);for(t.setHours(0,0,0,0),t.setDate(t.getDate()+1);0===t.getDay()||6===t.getDay();)t.setDate(t.getDate()+1);return t}$i.styles=[Oe,Be],e([me()],$i.prototype,"_config",void 0),$i=e([he("librus-today-card")],$i);let Ci=class extends Pe{constructor(){super(...arguments),this._lessons=[]}static getConfigElement(){return Me()}static getStubConfig(){return{type:"custom:librus-tomorrow-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 3}connectedCallback(){super.connectedCallback(),this._refreshTimer=setInterval(()=>{this._fetch(!0)},18e5)}disconnectedCallback(){super.disconnectedCallback(),clearInterval(this._refreshTimer)}async _fetch(e=!1){if(!this.hass||!this._config)return;const t=this._resolveEntities();if("error"in t)return;const i=t.map.timetable;if(!i)return;const a=ji(new Date),s=new Date(a);s.setDate(s.getDate()+1);const r=`${i}:${zi(a)}`;if(e||this._fetchedFor!==r){this._fetchedFor=r;try{const e=await ti(this.hass,i,a,s);this._lessons=e.filter(e=>!e.allDay).sort((e,t)=>e.start.localeCompare(t.start))}catch{this._lessons=[]}}}render(){if(!this._config||!this.hass)return q;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{map:t}=e,i=this.hass;this._fetch();const a=ji(new Date),s=zi(a),r=new Date;r.setHours(0,0,0,0),r.setDate(r.getDate()+1);const n=s===zi(r),o=t.homework_assignments?i.states[t.homework_assignments]:void 0,c=(o?.attributes.recent??[]).filter(e=>(e.due_date??"").slice(0,10)===s),d=t.next_exam?i.states[t.next_exam]:void 0,l=(d?.attributes.upcoming??[]).filter(e=>e.date===s);if(0===this._lessons.length&&0===c.length&&0===l.length)return this._message("mdi:calendar-arrow-right",$e(i,"card.tomorrow.empty"));const h=this._lessons[0],u=this._lessons[this._lessons.length-1];return R`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:calendar-arrow-right"></ha-icon></div>
          <div class="title-block">
            <div class="title">
              ${this._config.title??$e(i,n?"card.tomorrow.title":"card.tomorrow.title_next_school_day")}
            </div>
            <div class="subtitle">
              ${a.toLocaleDateString(i.language,{weekday:"long",day:"numeric",month:"long"})}
            </div>
          </div>
        </div>
        ${this._lessons.length?R`
              <div class="stats">
                <div class="stat">
                  <div class="stat-value">${this._lessons.length}</div>
                  <div class="stat-label">${$e(i,"card.tomorrow.lessons")}</div>
                </div>
                <div class="stat">
                  <div class="stat-value">${We(h.start)}</div>
                  <div class="stat-label">${$e(i,"card.tomorrow.starts")}</div>
                </div>
                <div class="stat">
                  <div class="stat-value">${We(u.end)}</div>
                  <div class="stat-label">${$e(i,"card.tomorrow.ends")}</div>
                </div>
              </div>
            `:q}
        ${l.length||c.length?R`
              <div class="alerts">
                ${l.map(e=>R`
                    <div class="alert-row">
                      <span class="dot bad"></span>
                      <span>${e.category?`${e.category}: `:""}${e.subject??""}</span>
                    </div>
                  `)}
                ${c.length?R`
                      <div class="alert-row">
                        <span class="dot warn"></span>
                        <span>${$e(i,"card.tomorrow.homework",{n:c.length})}</span>
                      </div>
                    `:q}
              </div>
            `:q}
        ${this._lessons.length?R`
              <hr />
              <div class="scroll-list">
                ${this._lessons.map(e=>R`
                    <div class="list-item">
                      <span class="lt">${We(e.start)}</span>
                      <div class="body">
                        <div class="row1">${e.summary}</div>
                        ${e.location||e.description?R`<div class="item-text">${[e.location,e.description].filter(Boolean).join(" · ")}</div>`:q}
                      </div>
                    </div>
                  `)}
              </div>
            `:q}
      </ha-card>
    `}};Ci.styles=[Oe,Be,n`
      .alerts {
        display: flex;
        flex-direction: column;
        gap: 6px;
        margin-top: 4px;
      }
      .alert-row {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 0.8rem;
      }
      .lt {
        flex: none;
        width: 40px;
        font-size: 0.7rem;
        font-weight: 700;
        color: var(--secondary-text-color);
        font-variant-numeric: tabular-nums;
        padding-top: 1px;
      }
    `],e([me()],Ci.prototype,"_config",void 0),e([me()],Ci.prototype,"_lessons",void 0),Ci=e([he("librus-tomorrow-card")],Ci);const Si=new Set(["unknown","unavailable",""]);let Di=class extends Pe{static getConfigElement(){return Me()}static getStubConfig(){return{type:"custom:librus-week-summary-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 2}render(){if(!this._config||!this.hass)return q;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{deviceId:t,map:i}=e,a=this.hass,s=i.attendance?a.states[i.attendance]:void 0,r=i.behaviour_notices?a.states[i.behaviour_notices]:void 0,n=i.agenda?a.states[i.agenda]:void 0,o=new Date;o.setDate(o.getDate()-7);const c=o.toISOString().slice(0,10),d=we(a,t,"subject_average").filter(e=>{const t=a.states[e.entityId]?.attributes.latest_grade_date;return t&&t>=c}).length,l=n?.attributes.message;return R`
      <ha-card @click=${ct(this,this._config.tap_action,i.overall_average)}>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:calendar-check-outline"></ha-icon></div>
          <div class="title-block">
            <div class="title">${$e(a,"card.week_summary.title")}</div>
          </div>
        </div>
        <div class="stats">
          <div class="stat">
            <div class="stat-value">${d}</div>
            <div class="stat-label">${$e(a,"stat.new_grades")}</div>
          </div>
          ${s&&!Si.has(s.state)?(()=>{const e=s.attributes.unexcused_count??Number(s.state);return R`<div class="stat ${e>0?"bad":""}"><div class="stat-value">${e}</div><div class="stat-label">${$e(a,"stat.absences")}</div></div>`})():q}
          ${r&&!Si.has(r.state)?R`<div class="stat"><div class="stat-value">${r.state}</div><div class="stat-label">${$e(a,"card.behaviour_notices.title")}</div></div>`:q}
        </div>
        ${l?(()=>{const{category:e,text:t}=Ve(l);return R`
                <hr />
                <div class="list-item">
                  <span class="dot neutral"></span>
                  <div class="body">
                    ${e?R`<div class="cat-label-row"><span class="cat-label">${e}</span></div>`:q}
                    <div class="row1">${t}</div>
                    ${n?.attributes.start_time?R`<div class="item-text">${Ge(String(n.attributes.start_time),a.language)}</div>`:q}
                  </div>
                </div>
              `})():q}
      </ha-card>
    `}};Di.styles=[Oe,Be],e([me()],Di.prototype,"_config",void 0),Di=e([he("librus-week-summary-card")],Di);const Ii=new Set(["unknown","unavailable",""]);let Ei=class extends Pe{static getConfigElement(){return Me()}static getStubConfig(){return{type:"custom:librus-lucky-number-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 2}render(){if(!this._config||!this.hass)return q;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{map:t}=e,i=this.hass,a=t.lucky_number?i.states[t.lucky_number]:void 0;if(!a)return this._message("mdi:dice-5-outline",$e(i,"empty.generic_error"));if(Ii.has(a.state))return this._message("mdi:dice-5-outline",$e(i,"card.lucky_number.empty"));const s=a.attributes.is_today,r=a.attributes.day,n=a.attributes.is_yours,o=!1===s&&r,c=n?o?$e(i,"card.lucky_number.yours_for_date",{date:Ge(r,i.language)}):$e(i,"card.lucky_number.yours_today"):o?$e(i,"card.lucky_number.subtitle_for_date",{date:Ge(r,i.language)}):$e(i,"card.lucky_number.subtitle");return R`
      <ha-card
        class=${[dt(this._config.tap_action)?"":"static",n?"yours":""].filter(Boolean).join(" ")}
        @click=${ct(this,this._config.tap_action,t.lucky_number)}
      >
        <div class="header">
          <div class="icon-badge ${n?"good":"amber"}">
            <ha-icon icon=${n?"mdi:party-popper":"mdi:dice-5-outline"}></ha-icon>
          </div>
          <div class="title-block">
            <div class="title">${$e(i,"card.lucky_number.title")}</div>
            <div class="subtitle">${c}</div>
          </div>
        </div>
        <div class="number-wrap">
          <div class="number">${a.state}</div>
        </div>
      </ha-card>
    `}};Ei.styles=[Oe,Be,n`
      .number-wrap {
        display: flex;
        justify-content: center;
        padding: 4px 0 2px;
      }
      .number {
        font-size: 3rem;
        font-weight: 800;
        color: var(--lc-brand);
        line-height: 1;
        font-variant-numeric: tabular-nums;
      }
      ha-card.yours {
        box-shadow:
          0 0 0 2px var(--lc-good) inset,
          var(--ha-card-box-shadow, none);
        background: var(--lc-good-bg);
      }
      ha-card.yours .number {
        color: var(--lc-good);
      }
    `],e([me()],Ei.prototype,"_config",void 0),Ei=e([he("librus-lucky-number-card")],Ei);const Ti=new Set(["unknown","unavailable",""]);let Ni=class extends Pe{static getConfigElement(){return Me()}static getStubConfig(){return{type:"custom:librus-student-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 3}render(){if(!this._config||!this.hass)return q;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{deviceId:t,map:i}=e,a=this.hass,s=a.devices?.[t]?.name_by_user||a.devices?.[t]?.name||"",r=i.school_class?a.states[i.school_class]?.state:void 0,n=[],o=i.attendance?a.states[i.attendance]:void 0,c=o?.attributes.total_records;if(o&&c){const e=Number(o.state)||0;n.push({key:"attendance",label:$e(a,"stat.attendance_score"),value:Math.round((c-e)/c*100),colorVar:"var(--lc-good)"})}const d=i.behaviour_notices?a.states[i.behaviour_notices]:void 0;d&&!Ti.has(d.state)&&n.push({key:"behaviour",label:$e(a,"stat.behaviour_score"),value:Math.max(0,100-10*Number(d.state)),colorVar:"var(--lc-brand)"});const l=i.overall_average?a.states[i.overall_average]:void 0;l&&!Ti.has(l.state)&&n.push({key:"grades",label:$e(a,"stat.grades_score"),value:Math.round(Number(l.state)/6*100),colorVar:"var(--lc-amber)"});const h=we(a,t,"subject_average");if(h.length){const e=h.filter(e=>{const t=a.states[e.entityId]?.attributes.grade_count;return t&&t>0}).length;n.push({key:"activity",label:$e(a,"stat.activity_score"),value:Math.round(e/h.length*100),colorVar:"var(--lc-brand)"})}if(0===n.length)return this._message("mdi:cards-outline",$e(a,"empty.generic_error"));const u=Math.round(n.reduce((e,t)=>e+t.value,0)/n.length);return R`
      <ha-card class="tcard" @click=${ct(this,this._config.tap_action,i.overall_average)}>
        <div class="tcard-inner">
          <div class="tcard-head">
            <div>
              <div class="tcard-name">${s}</div>
              ${r?R`<div class="tcard-class">${r}</div>`:q}
            </div>
            <div class="tcard-rating">
              <div class="v">${u}</div>
              <div class="l">${$e(a,"stat.overall_rating")}</div>
            </div>
          </div>
          <div class="tcard-bars">
            ${n.map(e=>R`
                <div class="tbar-row">
                  <span class="name">${e.label}</span>
                  <span class="bar"
                    ><span style="width:${Math.max(4,Math.min(100,e.value))}%;background:${e.colorVar}"></span
                  ></span>
                  <span class="val">${e.value}</span>
                </div>
              `)}
          </div>
        </div>
      </ha-card>
    `}};Ni.styles=[Oe,Be,n`
      ha-card.tcard {
        padding: 3px;
        background: linear-gradient(165deg, var(--lc-brand-strong), var(--lc-brand) 55%, var(--lc-amber) 165%);
      }
      .tcard-inner {
        background: var(--card-background-color);
        border-radius: 13px;
        padding: 16px;
        display: flex;
        flex-direction: column;
        gap: 12px;
      }
      .tcard-head {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
      }
      .tcard-name {
        font-weight: 700;
        font-size: 1rem;
      }
      .tcard-class {
        font-size: 0.7rem;
        color: var(--secondary-text-color);
      }
      .tcard-rating {
        text-align: right;
      }
      .tcard-rating .v {
        font-size: 1.6rem;
        font-weight: 800;
        color: var(--lc-amber);
        line-height: 1;
      }
      .tcard-rating .l {
        font-size: 0.6rem;
        color: var(--secondary-text-color);
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }
      .tcard-bars {
        display: flex;
        flex-direction: column;
        gap: 7px;
      }
      .tbar-row {
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .tbar-row .name {
        font-size: 0.68rem;
        color: var(--secondary-text-color);
        width: 78px;
        flex: none;
      }
      .tbar-row .bar {
        flex: 1;
        height: 6px;
        border-radius: 3px;
        background: var(--divider-color);
        overflow: hidden;
        display: block;
      }
      .tbar-row .bar span {
        display: block;
        height: 100%;
        border-radius: 3px;
      }
      .tbar-row .val {
        font-size: 0.68rem;
        font-weight: 800;
        width: 22px;
        text-align: right;
      }
    `],e([me()],Ni.prototype,"_config",void 0),Ni=e([he("librus-student-card")],Ni);const Ai=new Set(["unknown","unavailable",""]);let Mi=class extends Pe{static getConfigElement(){return Me()}static getStubConfig(){return{type:"custom:librus-streak-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 2}render(){if(!this._config||!this.hass)return q;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{map:t}=e,i=this.hass,a=$e(i,"label.days"),s=[],r=t.attendance_streak?i.states[t.attendance_streak]:void 0;if(r&&!Ai.has(r.state))s.push({key:"attendance",label:$e(i,"card.streak.attendance"),value:Number(r.state),unit:a});else{const e=t.attendance?i.states[t.attendance]:void 0,r=e?.attributes.last_absence_date,n=t.school_class?i.states[t.school_class]?.attributes.school_year_start:void 0,o=r?new Date(`${r}T00:00:00`):n?new Date(`${n}T00:00:00`):void 0;o&&s.push({key:"attendance",label:$e(i,"card.streak.attendance"),value:Math.max(0,qe(o,new Date)),unit:a})}const n=t.behaviour_streak?i.states[t.behaviour_streak]:void 0;n&&!Ai.has(n.state)&&s.push({key:"behaviour",label:$e(i,"card.streak.behaviour"),value:Number(n.state),unit:a});const o=t.good_grade_streak?i.states[t.good_grade_streak]:void 0;return o&&!Ai.has(o.state)&&s.push({key:"grades",label:$e(i,"card.streak.grades"),value:Number(o.state)}),0===s.length?this._message("mdi:fire",$e(i,"empty.generic_error")):R`
      <ha-card
        class=${dt(this._config.tap_action)?"":"static"}
        @click=${ct(this,this._config.tap_action,t.attendance_streak??t.attendance)}
      >
        <div class="header">
          <div class="icon-badge amber"><ha-icon icon="mdi:fire"></ha-icon></div>
          <div class="title-block">
            <div class="title">${$e(i,"card.streak.title")}</div>
          </div>
        </div>
        <div class="stats">
          ${s.map(e=>R`
              <div class="stat">
                <div class="stat-value">${e.value}${e.unit?R`<span class="unit">${e.unit}</span>`:q}</div>
                <div class="stat-label">${e.label}</div>
              </div>
            `)}
        </div>
      </ha-card>
    `}};Mi.styles=[Oe,Be],e([me()],Mi.prototype,"_config",void 0),Mi=e([he("librus-streak-card")],Mi);const Li=new Set(["unknown","unavailable",""]),Pi=["bronze","silver","gold","diamond"],Oi={bronze:0,silver:3,gold:4,diamond:5},Bi={bronze:"var(--lc-bronze)",silver:"var(--lc-silver)",gold:"var(--lc-amber)",diamond:"var(--lc-diamond)"},Fi={bronze:"bronze",silver:"silver",gold:"amber",diamond:"diamond"},Ki={bronze:"mdi:medal-outline",silver:"mdi:trophy-outline",gold:"mdi:trophy",diamond:"mdi:diamond-stone"};let Ui=class extends Pe{static getConfigElement(){return Me()}static getStubConfig(){return{type:"custom:librus-rank-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 2}render(){if(!this._config||!this.hass)return q;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{map:t}=e,i=this.hass,a=t.rank?i.states[t.rank]:void 0;if(!a)return this._message("mdi:alert-circle-outline",$e(i,"empty.generic_error"));if(Li.has(a.state)||(s=a.state,!Pi.includes(s)))return this._message("mdi:trophy-outline",$e(i,"card.rank.empty"));var s;const r=a.state,n=a.attributes.average,o=a.attributes.points_to_next_tier,c=Pi.indexOf(r),d=Pi[c+1],l=Oi[r],h=d?Oi[d]:void 0,u=void 0!==n&&void 0!==h?(n-l)/(h-l)*100:100;return R`
      <ha-card @click=${ct(this,this._config.tap_action,t.rank)}>
        <div class="header">
          <div class="icon-badge ${Fi[r]}">
            <ha-icon icon=${Ki[r]}></ha-icon>
          </div>
          <div class="title-block">
            <div class="title">${this._config.title??$e(i,"card.rank.title")}</div>
          </div>
        </div>
        <div class="ring-row">
          ${Ke(Math.round(u),Bi[r],68,7)}
          <div>
            <div class="ring-num" style="color:${Bi[r]}">${$e(i,`rank.${r}`)}</div>
            <div class="ring-label">${void 0!==n?n.toFixed(2):"—"}</div>
          </div>
        </div>
        <div class="hint">
          ${null!=o?R`${o.toFixed(2)} ${$e(i,"label.to_next_rank")}`:$e(i,"label.top_rank")}
        </div>
      </ha-card>
    `}};Ui.styles=[Oe,Be,n`
      .ring-row {
        display: flex;
        align-items: center;
        gap: 16px;
      }
      .ring-num {
        font-size: 1.3rem;
        font-weight: 800;
        line-height: 1.2;
      }
      .ring-label {
        font-size: 0.85rem;
        font-weight: 600;
        color: var(--secondary-text-color);
        font-variant-numeric: tabular-nums;
      }
      .hint {
        font-size: 0.72rem;
        color: var(--secondary-text-color);
        margin-top: 10px;
      }
    `],e([me()],Ui.prototype,"_config",void 0),Ui=e([he("librus-rank-card")],Ui);const Hi=new Set(["unknown","unavailable",""]),Ri=[{sensorKey:"good_grade_streak",idPrefix:"good_grade_streak",thresholds:[5,10,20]},{sensorKey:"attendance_streak",idPrefix:"attendance_streak",thresholds:[7,30,90]},{sensorKey:"behaviour_streak",idPrefix:"behaviour_streak",thresholds:[7,30,90]}];let Wi=class extends Pe{constructor(){super(...arguments),this._unlocked=[],this._storageKey=""}static getConfigElement(){return Me()}static getStubConfig(){return{type:"custom:librus-achievements-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 2}disconnectedCallback(){super.disconnectedCallback(),this._unsubscribe?.(),this._unsubscribe=void 0,this._subscribedDeviceId=void 0}_load(e){const t=`librus-achievements:${e}`;if(this._storageKey!==t){this._storageKey=t;try{const e=window.localStorage.getItem(t);this._unlocked=e?JSON.parse(e):[]}catch{this._unlocked=[]}}}_persist(){try{window.localStorage.setItem(this._storageKey,JSON.stringify(this._unlocked.slice(-50)))}catch{}}async _subscribe(e){if(this._subscribedDeviceId===e||!this.hass)return;this._subscribedDeviceId=e,this._unsubscribe?.(),this._unsubscribe=void 0;const t=this.hass.devices[e]?.config_entries??[];this._unsubscribe=await this.hass.connection.subscribeEvents(e=>{const i=e.data;t.length&&i.entry_id&&!t.includes(i.entry_id)||this._unlocked.some(e=>e.id===i.id)||(this._unlocked=[...this._unlocked,{id:i.id,title:i.title,when:(new Date).toISOString()}],this._persist())},"librus_synergia_achievement_unlocked")}_nextMilestoneHint(e,t){let i;for(const a of Ri){const s=t[a.sensorKey],r=s?e.states[s]:void 0;if(!r||Hi.has(r.state))continue;const n=Number(r.state);if(Number.isFinite(n))for(const t of a.thresholds){if(n>=t)continue;const s=t-n;if(!i||s<i.gap){i={gap:s,remaining:s,title:$e(e,`achievement.${a.idPrefix}_${t}`)}}break}}return i?{remaining:i.remaining,title:i.title}:void 0}render(){if(!this._config||!this.hass)return q;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{deviceId:t,map:i}=e,a=this.hass;this._load(t),this._subscribe(t);const s=this._nextMilestoneHint(a,i);if(0===this._unlocked.length)return this._message("mdi:trophy-outline",$e(a,"card.achievements.empty"),s?$e(a,"card.achievements.next_hint",{n:s.remaining,title:s.title}):void 0);const r=[...this._unlocked].sort((e,t)=>t.when.localeCompare(e.when));return R`
      <ha-card>
        <div class="header">
          <div class="icon-badge amber"><ha-icon icon="mdi:trophy"></ha-icon></div>
          <div class="title-block">
            <div class="title">${this._config.title??$e(a,"card.achievements.title")}</div>
            <div class="subtitle">${$e(a,"card.achievements.count",{n:r.length})}</div>
          </div>
        </div>
        <div class="chips">
          ${r.map(e=>R`<span class="chip hot"><ha-icon icon="mdi:trophy-award"></ha-icon>${e.title}</span>`)}
        </div>
        ${s?R`
              <div class="next-hint">
                <ha-icon icon="mdi:target"></ha-icon>
                <span>${$e(a,"card.achievements.next_hint",{n:s.remaining,title:s.title})}</span>
              </div>
            `:q}
      </ha-card>
    `}};Wi.styles=[Oe,Be,n`
      .chip.hot {
        gap: 6px;
      }
      .chip.hot ha-icon {
        --mdc-icon-size: 15px;
      }
      .next-hint {
        display: flex;
        align-items: center;
        gap: 6px;
        margin-top: 10px;
        padding-top: 10px;
        border-top: 1px solid var(--divider-color, rgba(127, 127, 127, 0.2));
        font-size: 0.78rem;
        color: var(--secondary-text-color);
      }
      .next-hint ha-icon {
        --mdc-icon-size: 16px;
        flex-shrink: 0;
      }
    `],e([me()],Wi.prototype,"_config",void 0),e([me()],Wi.prototype,"_unlocked",void 0),Wi=e([he("librus-achievements-card")],Wi);let Gi=class extends Pe{static getConfigElement(){return Me()}static getStubConfig(){return{type:"custom:librus-teachers-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 2}render(){if(!this._config||!this.hass)return q;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{map:t}=e,i=this.hass,a=t.school?i.states[t.school]:void 0,s=a?.attributes.subject_teachers??{},r=Object.entries(s),n=t.school_class?i.states[t.school_class]:void 0,o=n?.attributes.homeroom_teacher;return o||0!==r.length?R`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:account-group-outline"></ha-icon></div>
          <div class="title-block">
            <div class="title">${this._config.title??$e(i,"card.teachers.title")}</div>
            <div class="subtitle">${$e(i,"card.teachers.count",{n:r.length})}</div>
          </div>
        </div>
        <div class="scroll-list">
          ${o?R`
                <div class="list-item">
                  <span class="dot warn"></span>
                  <div class="body">
                    <div class="row1"><span>${$e(i,"card.teachers.homeroom")}</span></div>
                    <div class="item-text">${o}</div>
                  </div>
                </div>
              `:q}
          ${r.map(([e,t])=>R`
              <div class="list-item">
                <span class="dot neutral"></span>
                <div class="body">
                  <div class="row1"><span>${e}</span></div>
                  <div class="item-text">${t.join(", ")}</div>
                </div>
              </div>
            `)}
        </div>
      </ha-card>
    `:this._message("mdi:account-group-outline",$e(i,"card.teachers.empty"))}};Gi.styles=[Oe,Be],e([me()],Gi.prototype,"_config",void 0),Gi=e([he("librus-teachers-card")],Gi);let qi=class extends Pe{static getConfigElement(){return Me()}static getStubConfig(){return{type:"custom:librus-level-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 2}render(){if(!this._config||!this.hass)return q;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{deviceId:t,map:i}=e,a=this.hass;let s=0,r=0;for(const e of we(a,t,"subject_average")){const t=a.states[e.entityId]?.attributes.grades??[];for(const e of t){s+=1;const t=/^([1-6])/.exec(e.value.trim())?.[1];t&&Number(t)>=4&&(r+=1)}}const n=i.attendance?a.states[i.attendance]:void 0,o=n?.attributes.total_records??0,c=n?.attributes.unexcused_count??0,d=n?.attributes.excused_count??0,l=8*s+7*r,h=1*Math.max(0,o-c-d),u=l+h,{level:g,into:p,span:m}=function(e){let t=1,i=0,a=100;for(;e>=i+a;)i+=a,t+=1,a+=100;return{level:t,into:e-i,span:a}}(u),v=p/m*100;return R`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:progress-star"></ha-icon></div>
          <div class="title-block">
            <div class="title">${this._config.title??$e(a,"card.level.title")}</div>
            <div class="subtitle">${$e(a,"card.level.subtitle")}</div>
          </div>
        </div>
        <div class="ring-row">
          ${Ke(Math.round(v),"var(--lc-brand)",68,7)}
          <div>
            <div class="ring-num">${$e(a,"label.level",{n:g})}</div>
            <div class="ring-label">${$e(a,"label.xp_to_next",{n:m-p})}</div>
          </div>
        </div>
        <div class="stats">
          <div class="stat">
            <div class="stat-value">${l}</div>
            <div class="stat-label">${$e(a,"label.xp_from_grades")}</div>
          </div>
          <div class="stat">
            <div class="stat-value">${h}</div>
            <div class="stat-label">${$e(a,"label.xp_from_attendance")}</div>
          </div>
          <div class="stat">
            <div class="stat-value">${u}</div>
            <div class="stat-label">${$e(a,"label.xp_total")}</div>
          </div>
        </div>
      </ha-card>
    `}};qi.styles=[Oe,Be,n`
      .ring-row {
        display: flex;
        align-items: center;
        gap: 16px;
      }
      .ring-num {
        font-size: 1.3rem;
        font-weight: 800;
        line-height: 1.2;
        color: var(--lc-brand);
      }
      .ring-label {
        font-size: 0.76rem;
        color: var(--secondary-text-color);
      }
    `],e([me()],qi.prototype,"_config",void 0),qi=e([he("librus-level-card")],qi);const Zi=[{id:"naukowiec",icon:"mdi:flask-outline",subjects:["Matematyka","Fizyka","Chemia","Informatyka","Biologia","Geografia"],avgChipKey:"hero.chip.avg_naukowiec"},{id:"humanista",icon:"mdi:book-open-page-variant-outline",subjects:["Język polski","Historia","Wiedza o społeczeństwie","Filozofia"],avgChipKey:"hero.chip.avg_humanista"},{id:"poliglota",icon:"mdi:translate",subjects:["Język angielski","Język niemiecki","Język francuski","Język hiszpański","Język rosyjski","Język włoski"],avgChipKey:"hero.chip.avg_poliglota"},{id:"artysta",icon:"mdi:palette-outline",subjects:["Plastyka","Muzyka"],avgChipKey:"hero.chip.avg_artysta"},{id:"sportowiec",icon:"mdi:run",subjects:["Wychowanie fizyczne"],avgChipKey:"hero.chip.avg_sportowiec"}],Ji={wojownik:"mdi:shield-check-outline",meteor:"mdi:meteor",feniks:"mdi:fire",spolecznik:"mdi:hand-heart-outline",kolekcjoner:"mdi:trophy-outline",prymus:"mdi:crown-outline",wszechstronny:"mdi:scale-balance"};function Vi(e,t){return{icon:t,nameKey:{archetype:`hero.${e}.archetype_name`,hero:`hero.${e}.hero_name`},descKey:{archetype:`hero.${e}.archetype_desc`,hero:`hero.${e}.hero_desc`}}}const Yi={};for(const e of Zi)Yi[e.id]=Vi(e.id,e.icon);for(const[e,t]of Object.entries(Ji))Yi[e]=Vi(e,t);function Xi(e){return e.toFixed(1)}function Qi(e,t){let i=0,a=0;for(const s of e)!t.includes(s.subject)||null===s.average||s.gradeCount<=0||(i+=s.average*s.gradeCount,a+=s.gradeCount);return a>0?{avg:i/a,count:a}:null}const ea="librus-hero-history:";function ta(e){try{const t=window.localStorage.getItem(`librus-achievements:${e}`);if(!t)return 0;const i=JSON.parse(t);return Array.isArray(i)?i.length:0}catch{return 0}}function ia(e){if(null==e)return null;const t=Number(e);return Number.isFinite(t)?t:null}let aa=class extends Pe{static getConfigElement(){return Me()}static getStubConfig(){return{type:"custom:librus-hero-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 2}updated(e){super.updated(e),this._pendingHistory&&function(e,t){try{const i=`${ea}${e}`,a=window.localStorage.getItem(i),s=a?JSON.parse(a):[],r=s[s.length-1];if(r&&r.id===t)return;s.push({id:t,when:(new Date).toISOString()}),window.localStorage.setItem(i,JSON.stringify(s.slice(-30)))}catch{}}(this._pendingHistory.deviceId,this._pendingHistory.resultId)}render(){if(!this._config||!this.hass)return q;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{deviceId:t,map:i}=e,a=this.hass,s="hero"===this._config.mode?"hero":"archetype",r=we(a,t,"subject_average").map(e=>{const t=a.states[e.entityId],i=t?.attributes.grades??[];return{subject:e.subject,average:t?ia(t.state):null,gradeCount:i.length}}),n=i.overall_average?a.states[i.overall_average]:void 0,o=i.attendance?a.states[i.attendance]:void 0,c=i.attendance_streak?a.states[i.attendance_streak]:void 0,d=i.good_grade_streak?a.states[i.good_grade_streak]:void 0,l=i.behaviour_grade?a.states[i.behaviour_grade]:void 0,h=i.behaviour_notices?a.states[i.behaviour_notices]:void 0,u=h?.attributes.recent??[],g=function(e){const t=e.subjects.filter(e=>e.gradeCount>0);if(!(t.length>0||null!==e.attendanceStreak||null!==e.behaviourShortName))return null;if(null!==e.overallAverage&&e.overallAverage>=5.3&&t.length>=4)return{...Yi.prymus,id:"prymus",evidence:[{key:"hero.chip.overall_avg_full",vars:{n:Xi(e.overallAverage)}},{key:"hero.chip.subjects_count",vars:{n:t.length}}]};if(e.achievementCount>=5)return{...Yi.kolekcjoner,id:"kolekcjoner",evidence:[{key:"hero.chip.badges",vars:{n:e.achievementCount}},{key:"hero.chip.various_categories"}]};if(null!==e.overallSemester1&&null!==e.overallSemester2&&e.overallSemester2-e.overallSemester1>=.5)return{...Yi.feniks,id:"feniks",evidence:[{key:"hero.chip.semester1",vars:{n:Xi(e.overallSemester1)}},{key:"hero.chip.semester2",vars:{n:Xi(e.overallSemester2)}}]};if(null!==e.attendanceStreak&&e.attendanceStreak>=30&&0===e.unexcusedCount)return{...Yi.wojownik,id:"wojownik",evidence:[{key:"hero.chip.streak_days",vars:{n:e.attendanceStreak}},{key:"hero.chip.unexcused",vars:{n:0}}]};if(null!==e.goodGradeStreak&&e.goodGradeStreak>=10)return{...Yi.meteor,id:"meteor",evidence:[{key:"hero.chip.good_streak",vars:{n:e.goodGradeStreak}},null!==e.overallAverage?{key:"hero.chip.overall_avg",vars:{n:Xi(e.overallAverage)}}:{key:"hero.chip.various_categories"}]};const i=e.recentNoteSentiments.filter(e=>"positive"===e).length,a=e.recentNoteSentiments.filter(e=>"negative"===e).length;if("wz"===e.behaviourShortName&&i>=2&&0===a)return{...Yi.spolecznik,id:"spolecznik",evidence:[{key:"hero.chip.behaviour",vars:{name:e.behaviourShortName}},{key:"hero.chip.positive_notes",vars:{n:i}}]};const s=Zi.map(t=>({cluster:t,result:Qi(e.subjects,t.subjects)})).filter(e=>null!==e.result);if(s.length>0){s.sort((e,t)=>t.result.avg-e.result.avg);const e=s[0],t=s[1],i=t?e.result.avg-t.result.avg:e.result.avg;if(e.result.count>=2&&i>=.4)return{...Yi[e.cluster.id],id:e.cluster.id,evidence:[{key:e.cluster.avgChipKey,vars:{n:Xi(e.result.avg)}},{key:"hero.chip.grades",vars:{n:e.result.count}}]}}const r=s.length>=2?s[0].result.avg-s[s.length-1].result.avg:0;return{...Yi.wszechstronny,id:"wszechstronny",evidence:[{key:"hero.chip.spread",vars:{n:Xi(r)}},{key:"hero.chip.subjects_count",vars:{n:t.length}}]}}({subjects:r,overallAverage:ia(n?.state),overallSemester1:ia(n?.attributes.average_semester_1),overallSemester2:ia(n?.attributes.average_semester_2),attendanceStreak:ia(c?.state),unexcusedCount:ia(o?.attributes.unexcused_count),goodGradeStreak:ia(d?.state),behaviourShortName:l&&!["unknown","unavailable"].includes(l.state)?l.state:null,recentNoteSentiments:u.map(e=>e.sentiment),achievementCount:ta(t)});return g?(this._pendingHistory={deviceId:t,resultId:g.id},R`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:creation-outline"></ha-icon></div>
          <div class="title-block">
            <div class="title">
              ${this._config.title??$e(a,"hero"===s?"card.hero.title_hero":"card.hero.title_archetype")}
            </div>
            <div class="subtitle">${$e(a,"card.hero.subtitle")}</div>
          </div>
        </div>
        <div class="result">
          <div class="result-badge"><ha-icon icon=${g.icon}></ha-icon></div>
          <div class="result-name">${$e(a,g.nameKey[s])}</div>
          <div class="result-desc">${$e(a,g.descKey[s])}</div>
        </div>
        <div class="evidence">
          ${g.evidence.map(e=>R`<span class="evidence-chip">${$e(a,e.key,e.vars)}</span>`)}
        </div>
      </ha-card>
    `):(this._pendingHistory=void 0,this._message("mdi:creation-outline",$e(a,"card.hero.empty")))}};aa.styles=[Oe,Be,n`
      /* Fixed-height contract: name and description each reserve exactly 2
         lines, and there are always exactly 2 evidence chips on one row -
         so the card's height never changes across any result. The copy in
         translations/*.ts is written to fit; this is the defensive
         backstop on top of that. */
      .result {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        gap: 10px;
        padding: 6px 4px 2px;
      }
      .result-badge {
        width: 76px;
        height: 76px;
        border-radius: 50%;
        background: var(--lc-brand-bg);
        color: var(--lc-brand);
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid var(--lc-brand);
        flex: none;
      }
      .result-badge ha-icon {
        --mdc-icon-size: 40px;
      }
      .result-name {
        font-size: 1.15rem;
        font-weight: 800;
        color: var(--primary-text-color);
        line-height: 1.25;
        min-height: 2.6em;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        align-items: center;
      }
      .result-desc {
        font-size: 0.8rem;
        color: var(--secondary-text-color);
        line-height: 1.5;
        max-width: 40ch;
        min-height: 3em;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
      .evidence {
        display: flex;
        gap: 8px;
        flex-wrap: nowrap;
        justify-content: center;
        overflow-x: auto;
        width: 100%;
      }
      .evidence-chip {
        font-size: 0.68rem;
        font-weight: 600;
        color: var(--lc-brand-strong);
        background: var(--lc-chip-bg);
        border-radius: 999px;
        padding: 4px 9px;
        font-variant-numeric: tabular-nums;
        white-space: nowrap;
        flex: none;
      }
    `],e([me()],aa.prototype,"_config",void 0),aa=e([he("librus-hero-card")],aa);const sa={wz:10,bdb:8,db:6,popr:4,ndp:2,ng:0},ra={diamond:10,gold:7.5,silver:5,bronze:2.5};function na(e,t){const i=Zi.find(e=>e.id===t);if(!i)return 0;const a=Qi(e,i.subjects);return a?Math.round(10*(a.avg/6*10+Number.EPSILON))/10:0}const oa=["1","2","3","4","5","7"];function ca(e){if(null==e)return null;const t=Number(e);return Number.isFinite(t)?t:null}let da=class extends Pe{static getConfigElement(){return Me()}static getStubConfig(){return{type:"custom:librus-hero-stats-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 3}render(){if(!this._config||!this.hass)return q;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{deviceId:t,map:i}=e,a=this.hass,s=we(a,t,"subject_average").map(e=>{const t=a.states[e.entityId],i=(t?.attributes.grades??[]).length;return{subject:e.subject,average:t?ca(t.state):null,gradeCount:i}}),r=i.attendance_streak?a.states[i.attendance_streak]:void 0,n=i.behaviour_grade?a.states[i.behaviour_grade]:void 0,o=i.rank?a.states[i.rank]:void 0,c=function(e){const t=null!==e.attendanceStreak?Math.round(100*Math.min(1,e.attendanceStreak/30))/10:0,i=e.behaviourShortName?sa[e.behaviourShortName]??5:0,a=e.rankTier?ra[e.rankTier]??0:0;return[{id:"sila",labelKey:"hero_stat.sila",icon:"mdi:arm-flex-outline",value:na(e.subjects,"sportowiec")},{id:"intelekt",labelKey:"hero_stat.intelekt",icon:"mdi:flask-outline",value:na(e.subjects,"naukowiec")},{id:"wiedza",labelKey:"hero_stat.wiedza",icon:"mdi:book-open-page-variant-outline",value:na(e.subjects,"humanista")},{id:"charyzma",labelKey:"hero_stat.charyzma",icon:"mdi:hand-heart-outline",value:i},{id:"wytrwalosc",labelKey:"hero_stat.wytrwalosc",icon:"mdi:shield-check-outline",value:t},{id:"szczescie",labelKey:"hero_stat.szczescie",icon:"mdi:clover-outline",value:a}]}({subjects:s,attendanceStreak:ca(r?.state),behaviourShortName:n&&!["unknown","unavailable"].includes(n.state)?n.state:null,rankTier:o&&!["unknown","unavailable"].includes(o.state)?o.state:null});if(c.every(e=>0===e.value))return this._message("mdi:arm-flex-outline",$e(a,"card.hero_stats.empty"));const d=c.map(e=>({label:$e(a,e.labelKey),value:e.value}));return R`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:arm-flex-outline"></ha-icon></div>
          <div class="title-block">
            <div class="title">${this._config.title??$e(a,"card.hero_stats.title")}</div>
            <div class="subtitle">${$e(a,"card.hero_stats.subtitle")}</div>
          </div>
        </div>
        <div class="chart-wrap">${Ue(d,{max:10})}</div>
        <div class="legend-grid">
          ${c.map((e,t)=>R`
              <div class="legend-cell">
                <span class="dot" style="background:var(--lc-chart-${oa[t%oa.length]})"></span>
                <span class="name">${$e(a,e.labelKey)}</span>
                <b>${e.value.toFixed(1)}</b>
              </div>
            `)}
        </div>
      </ha-card>
    `}};da.styles=[Oe,Be],e([me()],da.prototype,"_config",void 0),da=e([he("librus-hero-stats-card")],da);let la=class extends Pe{static getConfigElement(){return Me()}static getStubConfig(){return{type:"custom:librus-hero-history-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 3}render(){if(!this._config||!this.hass)return q;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{deviceId:t}=e,i=this.hass,a="hero"===this._config.mode?"hero":"archetype",s=function(e){try{const t=window.localStorage.getItem(`${ea}${e}`);if(!t)return[];const i=JSON.parse(t);return Array.isArray(i)?i:[]}catch{return[]}}(t);if(0===s.length)return this._message("mdi:history",$e(i,"card.hero_history.empty"));const r=new Date,n=[...s].reverse().map((e,t)=>{const i=Yi[e.id],a=new Date(e.when),n=0===t?r:new Date(s[s.length-t].when);return{entry:e,catalog:i,isCurrent:0===t,days:Math.max(0,qe(a,n))}});return R`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:history"></ha-icon></div>
          <div class="title-block">
            <div class="title">${this._config.title??$e(i,"card.hero_history.title")}</div>
            <div class="subtitle">${$e(i,"card.hero_history.subtitle")}</div>
          </div>
        </div>
        <div class="scroll-list">
          ${n.map(e=>R`
              <div class="list-item">
                <div class="type-icon"><ha-icon icon=${e.catalog?.icon??"mdi:help-circle"}></ha-icon></div>
                <div class="body">
                  <div class="row1">
                    <span>${e.catalog?$e(i,e.catalog.nameKey[a]):e.entry.id}</span>
                    <time>${Ge(e.entry.when,i.language)}</time>
                  </div>
                  <div class="item-text">
                    ${e.isCurrent?$e(i,"card.hero_history.current",{n:e.days}):`${e.days} ${$e(i,"label.days")}`}
                  </div>
                </div>
              </div>
            `)}
        </div>
      </ha-card>
    `}};la.styles=[Oe,Be,n`
      .type-icon {
        flex: none;
        width: 26px;
        height: 26px;
        border-radius: 8px;
        background: var(--lc-chip-bg);
        color: var(--lc-brand);
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 1px;
      }
      .type-icon ha-icon {
        --mdc-icon-size: 15px;
      }
    `],e([me()],la.prototype,"_config",void 0),la=e([he("librus-hero-history-card")],la);const ha=["overall_average","attendance","school"];let ua=class extends Pe{static getConfigElement(){return Me()}static getStubConfig(){return{type:"custom:librus-last-update-tile-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 1}connectedCallback(){super.connectedCallback(),this._tickTimer=setInterval(()=>this.requestUpdate(),3e4)}disconnectedCallback(){super.disconnectedCallback(),clearInterval(this._tickTimer)}render(){if(!this._config||!this.hass)return q;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{map:t}=e,i=this.hass,a=ha.map(e=>t[e]).find(e=>e&&i.states[e]),s=a?i.states[a]:void 0;if(!s)return this._message("mdi:clock-check-outline",$e(i,"empty.generic_error"));const r=s.last_reported??s.last_updated;return R`
      <ha-card class="tile">
        <div class="icon-badge"><ha-icon icon="mdi:clock-check-outline"></ha-icon></div>
        <div class="tile-body">
          <div class="subj">${function(e,t){if(!t)return"";const i=new Date(t).getTime();if(Number.isNaN(i))return"";const a=Math.max(0,Math.floor((Date.now()-i)/6e4));if(a<1)return $e(e,"label.just_now");if(a<60)return $e(e,"label.minutes_ago",{minutes:a});const s=Math.floor(a/60);return s<24?$e(e,"label.hours_ago",{hours:s}):$e(e,"label.days_ago",{days:Math.floor(s/24)})}(i,r)}</div>
          <div class="meta">${$e(i,"card.last_update.subtitle")}</div>
        </div>
      </ha-card>
    `}};ua.styles=[Oe,Be,n`
      ha-card.tile {
        flex-direction: row;
        align-items: center;
        padding: 12px 16px;
      }
      .tile-body {
        min-width: 0;
      }
      .subj {
        font-weight: 700;
        font-size: 0.86rem;
      }
      .meta {
        font-size: 0.7rem;
        color: var(--secondary-text-color);
        margin-top: 1px;
      }
    `],e([me()],ua.prototype,"_config",void 0),ua=e([he("librus-last-update-tile-card")],ua),window.customCards=window.customCards||[],window.customCards.push({type:"librus-grades-card",name:"Librus - Średnia ocen",description:"Średnia ogólna i średnie z każdego przedmiotu, z paskami porównawczymi.",preview:!0},{type:"librus-grade-log-card",name:"Librus - Dziennik ocen",description:"Wszystkie oceny ze wszystkich przedmiotów w jednej chronologicznej liście.",preview:!0},{type:"librus-subject-grades-card",name:"Librus - Oceny z przedmiotu",description:"Pełna lista ocen z JEDNEGO wybranego przedmiotu (wybór w konfiguracji karty).",preview:!0},{type:"librus-grade-trend-card",name:"Librus - Trend średniej",description:"Jak zmieniała się średnia (ogólna lub przedmiotu) w ostatnich 60 dniach.",preview:!0},{type:"librus-grade-goal-card",name:"Librus - Cel oceny",description:"Postęp do wybranej docelowej średniej (ogólnej lub z przedmiotu) + ile ocen brakuje.",preview:!0},{type:"librus-grade-simulator-card",name:"Librus - Symulator ocen",description:"A gdyby następna ocena to __ (waga __)? Zobacz, gdzie wylądowałaby średnia z przedmiotu.",preview:!0},{type:"librus-semester-comparison-card",name:"Librus - Porównanie semestrów",description:"Średnia z semestru 1 i 2 dla każdego przedmiotu obok siebie, ze zmianą.",preview:!0},{type:"librus-grade-distribution-card",name:"Librus - Rozkład ocen",description:"Histogram: ile było szóstek, piątek, czwórek itd. ze wszystkich przedmiotów.",preview:!0},{type:"librus-grades-radar-card",name:"Librus - Profil ocen (radar)",description:"Wykres pajęczynowy średnich wszystkich przedmiotów na jednym wykresie.",preview:!0},{type:"librus-grade-category-distribution-card",name:"Librus - Oceny wg kategorii",description:"Poziomy wykres słupkowy: ile ocen ze sprawdzianów, kartkówek, odpowiedzi itd.",preview:!0},{type:"librus-latest-grade-card",name:"Librus - Ostatnia ocena",description:"Najnowsza ocena ze wszystkich przedmiotów, wraz z komentarzem nauczyciela.",preview:!0},{type:"librus-behaviour-grade-card",name:"Librus - Ocena zachowania",description:"Formalna ocena zachowania, odrębna od uwag.",preview:!0},{type:"librus-descriptive-grades-card",name:"Librus - Oceny opisowe",description:"Oceny opisowe (nienumeryczne), jeśli szkoła je stosuje.",preview:!0},{type:"librus-subject-spotlight-card",name:"Librus - Najlepszy i najsłabszy przedmiot",description:"Dwa skrajne przedmioty wg średniej, obliczone z sensorów średnich per przedmiot.",preview:!0},{type:"librus-attendance-card",name:"Librus - Frekwencja",description:"Liczba realnych nieobecności i spóźnień, z rozbiciem na typy, % i podziałem na semestr.",preview:!0},{type:"librus-attendance-tile-card",name:"Librus - Frekwencja (kafelek)",description:"Kompaktowy kafelek z liczbą nieobecności i frekwencją %.",preview:!0},{type:"librus-attendance-heatmap-card",name:"Librus - Frekwencja (mapa roku)",description:"Mapa dni całego roku szkolnego kolorowana wg statusu frekwencji, w stylu GitHub contributions.",preview:!0},{type:"librus-attendance-weekday-card",name:"Librus - Nieobecności wg dnia tygodnia",description:"Słupek na każdy dzień tygodnia podzielony na usprawiedliwione/nieusprawiedliwione/spóźnienia.",preview:!0},{type:"librus-behaviour-notices-card",name:"Librus - Uwagi",description:"Lista uwag z kategorią i zabarwieniem (pozytywna/negatywna/neutralna).",preview:!0},{type:"librus-behaviour-notices-tile-card",name:"Librus - Uwagi (kafelek)",description:"Kompaktowy kafelek z liczbą uwag i ostatnią kategorią.",preview:!0},{type:"librus-messages-card",name:"Librus - Wiadomości",description:"Nieprzeczytane wiadomości ze wszystkich skrzynek i podgląd ostatnich z odebranych.",preview:!0},{type:"librus-messages-tile-card",name:"Librus - Wiadomości (kafelek)",description:"Kompaktowy kafelek z liczbą nieprzeczytanych i ostatnim nadawcą.",preview:!0},{type:"librus-substitutions-card",name:"Librus - Zastępstwa i alerty",description:"Pełna treść zastępstw i alertów - kliknij, by rozwinąć.",preview:!0},{type:"librus-announcements-card",name:"Librus - Ogłoszenia",description:"Nieprzeczytane ogłoszenia z tablicy szkolnej.",preview:!0},{type:"librus-announcements-tile-card",name:"Librus - Ogłoszenia (kafelek)",description:"Kompaktowy kafelek z liczbą nieprzeczytanych ogłoszeń.",preview:!0},{type:"librus-homework-assignments-card",name:"Librus - Zadania domowe",description:"Lista realnych zadań domowych z terminami.",preview:!0},{type:"librus-homework-checklist-card",name:"Librus - Zadania do odhaczenia",description:"Zadania domowe z polem wyboru - odhaczone lądują na dole (stan zapisany lokalnie w przeglądarce).",preview:!0},{type:"librus-recent-activity-card",name:"Librus - Co nowego",description:"Wspólny, chronologiczny feed najnowszych ocen, uwag, ogłoszeń i wiadomości.",preview:!0},{type:"librus-today-lessons-card",name:"Librus - Dzisiejszy plan lekcji",description:"Oś czasu dzisiejszych lekcji z podświetleniem aktualnej.",preview:!0},{type:"librus-next-lesson-tile-card",name:"Librus - Najbliższa lekcja",description:"Kompaktowy kafelek z najbliższą lub trwającą lekcją.",preview:!0},{type:"librus-agenda-card",name:"Librus - Terminarz",description:"Nadchodzące wydarzenia z terminarza, pogrupowane wg dnia.",preview:!0},{type:"librus-exam-countdown-card",name:"Librus - Najbliższy sprawdzian",description:"Odliczanie do najbliższego sprawdzianu z terminarza, wyodrębnione z ogólnej listy.",preview:!0},{type:"librus-free-days-card",name:"Librus - Dni wolne",description:"Odliczanie do najbliższej przerwy i lista kolejnych dni wolnych.",preview:!0},{type:"librus-free-days-tile-card",name:"Librus - Dni wolne (kafelek)",description:"Kompaktowy kafelek z odliczaniem do najbliższej przerwy.",preview:!0},{type:"librus-week-timetable-card",name:"Librus - Plan tygodniowy",description:"Siatka planu lekcji na cały tydzień.",preview:!0},{type:"librus-bell-schedule-card",name:"Librus - Plan dnia",description:"Rozkład dzwonków na dziś z podświetleniem bieżącej lekcji.",preview:!0},{type:"librus-subject-time-card",name:"Librus - Podział czasu lekcji",description:"Poziomy wykres słupkowy liczby lekcji w tygodniu na przedmiot, z planu lekcji.",preview:!0},{type:"librus-school-card",name:"Librus - Szkoła i klasa",description:"Nazwa i adres szkoły, klasa, wychowawca, terminy semestru.",preview:!0},{type:"librus-school-year-card",name:"Librus - Koniec roku szkolnego",description:"Odliczanie do końca roku szkolnego, pasek postępu roku i data końca semestru.",preview:!0},{type:"librus-today-card",name:"Librus - Dziś",description:"Szczęśliwy numerek, nieprzeczytane wiadomości/ogłoszenia i najbliższa lekcja w jednym miejscu.",preview:!0},{type:"librus-tomorrow-card",name:"Librus - Jutro",description:"Następny dzień nauki: lekcje, zadania na termin i sprawdziany (ogarnia weekend).",preview:!0},{type:"librus-week-summary-card",name:"Librus - Tydzień w skrócie",description:"Nowe oceny, nieobecności, uwagi i najbliższe wydarzenie w tym tygodniu.",preview:!0},{type:"librus-lucky-number-card",name:"Librus - Szczęśliwy numerek",description:"Dzisiejszy szczęśliwy numerek w dużym formacie.",preview:!0},{type:"librus-student-card",name:"Librus - Karta ucznia",description:"Zabawowa karta w stylu trading-card, licząca ogólną ocenę z frekwencji/zachowania/ocen/aktywności.",preview:!0},{type:"librus-streak-card",name:"Librus - Passy",description:"Trzy serie: bez nieobecności, bez uwag, dobrych ocen z rzędu.",preview:!0},{type:"librus-rank-card",name:"Librus - Ranga",description:"Brąz/Srebro/Złoto/Diament wg średniej ocen, z pierścieniem postępu do kolejnej rangi.",preview:!0},{type:"librus-achievements-card",name:"Librus - Osiągnięcia",description:"Gablota trofeów - odblokowane odznaki grywalizacji (pierwsza szóstka, serie ocen/frekwencji/zachowania). Śledzi je na żywo od dodania karty.",preview:!0},{type:"librus-teachers-card",name:"Librus - Nauczyciele",description:"Wychowawca i nauczyciele przedmiotów, wyliczeni z planu lekcji.",preview:!0},{type:"librus-level-card",name:"Librus - Poziom",description:"Licznik XP za oceny i frekwencję z pierścieniem postępu - w przeciwieństwie do Rangi rośnie tylko w górę.",preview:!0},{type:"librus-hero-card",name:"Librus - Bohater",description:"Jeden wynik liczony z ocen, frekwencji, zachowania i serii - jako archetyp ucznia albo postać RPG (tryb w ustawieniach karty).",preview:!0},{type:"librus-hero-stats-card",name:"Librus - Statystyki bohatera",description:"Karta postaci RPG - sześć statystyk (Siła/Intelekt/Wiedza/Charyzma/Wytrwałość/Szczęście) na wykresie radarowym, liczonych z ocen, frekwencji, zachowania i rangi.",preview:!0},{type:"librus-hero-history-card",name:"Librus - Historia bohatera",description:"Oś czasu poprzednich wyników karty Bohater - kiedy się zmieniały i jak długo trwały (śledzone od dodania karty, lokalnie w przeglądarce).",preview:!0},{type:"librus-last-update-tile-card",name:"Librus - Ostatnia aktualizacja",description:"Ile czasu temu integracja ostatnio pobrała dane z Librusa.",preview:!0}),console.info("%c LIBRUS-SYNERGIA-CARDS %c 53 cards loaded ","color: #fff; background: #4f46e5; font-weight: 700; border-radius: 3px 0 0 3px; padding: 2px 6px;","color: #4f46e5; background: transparent; font-weight: 500;");
