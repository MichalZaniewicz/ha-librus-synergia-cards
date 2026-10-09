function e(e,t,a,i){var s,r=arguments.length,o=r<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,a):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,i);else for(var n=e.length-1;n>=0;n--)(s=e[n])&&(o=(r<3?s(o):r>3?s(t,a,o):s(t,a))||o);return r>3&&o&&Object.defineProperty(t,a,o),o}"function"==typeof SuppressedError&&SuppressedError;
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=globalThis,a=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),s=new WeakMap;let r=class{constructor(e,t,a){if(this._$cssResult$=!0,a!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(a&&void 0===e){const a=void 0!==t&&1===t.length;a&&(e=s.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),a&&s.set(t,e))}return e}toString(){return this.cssText}};const o=(e,...t)=>{const a=1===e.length?e[0]:t.reduce((t,a,i)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(a)+e[i+1],e[0]);return new r(a,e,i)},n=a?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const a of e.cssRules)t+=a.cssText;return(e=>new r("string"==typeof e?e:e+"",void 0,i))(t)})(e):e,{is:c,defineProperty:d,getOwnPropertyDescriptor:l,getOwnPropertyNames:h,getOwnPropertySymbols:u,getPrototypeOf:p}=Object,g=globalThis,m=g.trustedTypes,v=m?m.emptyScript:"",b=g.reactiveElementPolyfillSupport,_=(e,t)=>e,f={toAttribute(e,t){switch(t){case Boolean:e=e?v:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let a=e;switch(t){case Boolean:a=null!==e;break;case Number:a=null===e?null:Number(e);break;case Object:case Array:try{a=JSON.parse(e)}catch(e){a=null}}return a}},y=(e,t)=>!c(e,t),w={attribute:!0,type:String,converter:f,reflect:!1,useDefault:!1,hasChanged:y};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),g.litPropertyMetadata??=new WeakMap;let x=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=w){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const a=Symbol(),i=this.getPropertyDescriptor(e,a,t);void 0!==i&&d(this.prototype,e,i)}}static getPropertyDescriptor(e,t,a){const{get:i,set:s}=l(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:i,set(t){const r=i?.call(this);s?.call(this,t),this.requestUpdate(e,r,a)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??w}static _$Ei(){if(this.hasOwnProperty(_("elementProperties")))return;const e=p(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(_("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(_("properties"))){const e=this.properties,t=[...h(e),...u(e)];for(const a of t)this.createProperty(a,e[a])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,a]of t)this.elementProperties.set(e,a)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const a=this._$Eu(e,t);void 0!==a&&this._$Eh.set(a,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const a=new Set(e.flat(1/0).reverse());for(const e of a)t.unshift(n(e))}else void 0!==e&&t.push(n(e));return t}static _$Eu(e,t){const a=t.attribute;return!1===a?void 0:"string"==typeof a?a:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const a of t.keys())this.hasOwnProperty(a)&&(e.set(a,this[a]),delete this[a]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((e,i)=>{if(a)e.adoptedStyleSheets=i.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const a of i){const i=document.createElement("style"),s=t.litNonce;void 0!==s&&i.setAttribute("nonce",s),i.textContent=a.cssText,e.appendChild(i)}})(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,a){this._$AK(e,a)}_$ET(e,t){const a=this.constructor.elementProperties.get(e),i=this.constructor._$Eu(e,a);if(void 0!==i&&!0===a.reflect){const s=(void 0!==a.converter?.toAttribute?a.converter:f).toAttribute(t,a.type);this._$Em=e,null==s?this.removeAttribute(i):this.setAttribute(i,s),this._$Em=null}}_$AK(e,t){const a=this.constructor,i=a._$Eh.get(e);if(void 0!==i&&this._$Em!==i){const e=a.getPropertyOptions(i),s="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:f;this._$Em=i;const r=s.fromAttribute(t,e.type);this[i]=r??this._$Ej?.get(i)??r,this._$Em=null}}requestUpdate(e,t,a,i=!1,s){if(void 0!==e){const r=this.constructor;if(!1===i&&(s=this[e]),a??=r.getPropertyOptions(e),!((a.hasChanged??y)(s,t)||a.useDefault&&a.reflect&&s===this._$Ej?.get(e)&&!this.hasAttribute(r._$Eu(e,a))))return;this.C(e,t,a)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:a,reflect:i,wrapped:s},r){a&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,r??t??this[e]),!0!==s||void 0!==r)||(this._$AL.has(e)||(this.hasUpdated||a||(t=void 0),this._$AL.set(e,t)),!0===i&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,a]of e){const{wrapped:e}=a,i=this[t];!0!==e||this._$AL.has(t)||void 0===i||this.C(t,void 0,a,i)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};x.elementStyles=[],x.shadowRootOptions={mode:"open"},x[_("elementProperties")]=new Map,x[_("finalized")]=new Map,b?.({ReactiveElement:x}),(g.reactiveElementVersions??=[]).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const k=globalThis,$=e=>e,z=k.trustedTypes,j=z?z.createPolicy("lit-html",{createHTML:e=>e}):void 0,C="$lit$",S=`lit$${Math.random().toFixed(9).slice(2)}$`,D="?"+S,T=`<${D}>`,N=document,I=()=>N.createComment(""),E=e=>null===e||"object"!=typeof e&&"function"!=typeof e,A=Array.isArray,M="[ \t\n\f\r]",L=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,P=/-->/g,F=/>/g,B=RegExp(`>|${M}(?:([^\\s"'>=/]+)(${M}*=${M}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),O=/'/g,K=/"/g,U=/^(?:script|style|textarea|title)$/i,R=e=>(t,...a)=>({_$litType$:e,strings:t,values:a}),W=R(1),H=R(2),q=Symbol.for("lit-noChange"),G=Symbol.for("lit-nothing"),J=new WeakMap,Z=N.createTreeWalker(N,129);function Y(e,t){if(!A(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==j?j.createHTML(t):t}const V=(e,t)=>{const a=e.length-1,i=[];let s,r=2===t?"<svg>":3===t?"<math>":"",o=L;for(let t=0;t<a;t++){const a=e[t];let n,c,d=-1,l=0;for(;l<a.length&&(o.lastIndex=l,c=o.exec(a),null!==c);)l=o.lastIndex,o===L?"!--"===c[1]?o=P:void 0!==c[1]?o=F:void 0!==c[2]?(U.test(c[2])&&(s=RegExp("</"+c[2],"g")),o=B):void 0!==c[3]&&(o=B):o===B?">"===c[0]?(o=s??L,d=-1):void 0===c[1]?d=-2:(d=o.lastIndex-c[2].length,n=c[1],o=void 0===c[3]?B:'"'===c[3]?K:O):o===K||o===O?o=B:o===P||o===F?o=L:(o=B,s=void 0);const h=o===B&&e[t+1].startsWith("/>")?" ":"";r+=o===L?a+T:d>=0?(i.push(n),a.slice(0,d)+C+a.slice(d)+S+h):a+S+(-2===d?t:h)}return[Y(e,r+(e[a]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),i]};class X{constructor({strings:e,_$litType$:t},a){let i;this.parts=[];let s=0,r=0;const o=e.length-1,n=this.parts,[c,d]=V(e,t);if(this.el=X.createElement(c,a),Z.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(i=Z.nextNode())&&n.length<o;){if(1===i.nodeType){if(i.hasAttributes())for(const e of i.getAttributeNames())if(e.endsWith(C)){const t=d[r++],a=i.getAttribute(e).split(S),o=/([.?@])?(.*)/.exec(t);n.push({type:1,index:s,name:o[2],strings:a,ctor:"."===o[1]?ie:"?"===o[1]?se:"@"===o[1]?re:ae}),i.removeAttribute(e)}else e.startsWith(S)&&(n.push({type:6,index:s}),i.removeAttribute(e));if(U.test(i.tagName)){const e=i.textContent.split(S),t=e.length-1;if(t>0){i.textContent=z?z.emptyScript:"";for(let a=0;a<t;a++)i.append(e[a],I()),Z.nextNode(),n.push({type:2,index:++s});i.append(e[t],I())}}}else if(8===i.nodeType)if(i.data===D)n.push({type:2,index:s});else{let e=-1;for(;-1!==(e=i.data.indexOf(S,e+1));)n.push({type:7,index:s}),e+=S.length-1}s++}}static createElement(e,t){const a=N.createElement("template");return a.innerHTML=e,a}}function Q(e,t,a=e,i){if(t===q)return t;let s=void 0!==i?a._$Co?.[i]:a._$Cl;const r=E(t)?void 0:t._$litDirective$;return s?.constructor!==r&&(s?._$AO?.(!1),void 0===r?s=void 0:(s=new r(e),s._$AT(e,a,i)),void 0!==i?(a._$Co??=[])[i]=s:a._$Cl=s),void 0!==s&&(t=Q(e,s._$AS(e,t.values),s,i)),t}class ee{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:a}=this._$AD,i=(e?.creationScope??N).importNode(t,!0);Z.currentNode=i;let s=Z.nextNode(),r=0,o=0,n=a[0];for(;void 0!==n;){if(r===n.index){let t;2===n.type?t=new te(s,s.nextSibling,this,e):1===n.type?t=new n.ctor(s,n.name,n.strings,this,e):6===n.type&&(t=new oe(s,this,e)),this._$AV.push(t),n=a[++o]}r!==n?.index&&(s=Z.nextNode(),r++)}return Z.currentNode=N,i}p(e){let t=0;for(const a of this._$AV)void 0!==a&&(void 0!==a.strings?(a._$AI(e,a,t),t+=a.strings.length-2):a._$AI(e[t])),t++}}class te{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,a,i){this.type=2,this._$AH=G,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=a,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=Q(this,e,t),E(e)?e===G||null==e||""===e?(this._$AH!==G&&this._$AR(),this._$AH=G):e!==this._$AH&&e!==q&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>A(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==G&&E(this._$AH)?this._$AA.nextSibling.data=e:this.T(N.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:a}=e,i="number"==typeof a?this._$AC(e):(void 0===a.el&&(a.el=X.createElement(Y(a.h,a.h[0]),this.options)),a);if(this._$AH?._$AD===i)this._$AH.p(t);else{const e=new ee(i,this),a=e.u(this.options);e.p(t),this.T(a),this._$AH=e}}_$AC(e){let t=J.get(e.strings);return void 0===t&&J.set(e.strings,t=new X(e)),t}k(e){A(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let a,i=0;for(const s of e)i===t.length?t.push(a=new te(this.O(I()),this.O(I()),this,this.options)):a=t[i],a._$AI(s),i++;i<t.length&&(this._$AR(a&&a._$AB.nextSibling,i),t.length=i)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=$(e).nextSibling;$(e).remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class ae{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,a,i,s){this.type=1,this._$AH=G,this._$AN=void 0,this.element=e,this.name=t,this._$AM=i,this.options=s,a.length>2||""!==a[0]||""!==a[1]?(this._$AH=Array(a.length-1).fill(new String),this.strings=a):this._$AH=G}_$AI(e,t=this,a,i){const s=this.strings;let r=!1;if(void 0===s)e=Q(this,e,t,0),r=!E(e)||e!==this._$AH&&e!==q,r&&(this._$AH=e);else{const i=e;let o,n;for(e=s[0],o=0;o<s.length-1;o++)n=Q(this,i[a+o],t,o),n===q&&(n=this._$AH[o]),r||=!E(n)||n!==this._$AH[o],n===G?e=G:e!==G&&(e+=(n??"")+s[o+1]),this._$AH[o]=n}r&&!i&&this.j(e)}j(e){e===G?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class ie extends ae{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===G?void 0:e}}class se extends ae{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==G)}}class re extends ae{constructor(e,t,a,i,s){super(e,t,a,i,s),this.type=5}_$AI(e,t=this){if((e=Q(this,e,t,0)??G)===q)return;const a=this._$AH,i=e===G&&a!==G||e.capture!==a.capture||e.once!==a.once||e.passive!==a.passive,s=e!==G&&(a===G||i);i&&this.element.removeEventListener(this.name,this,a),s&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}let oe=class{constructor(e,t,a){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=a}get _$AU(){return this._$AM._$AU}_$AI(e){Q(this,e)}};const ne=k.litHtmlPolyfillSupport;ne?.(X,te),(k.litHtmlVersions??=[]).push("3.3.3");const ce=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class de extends x{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,a)=>{const i=a?.renderBefore??t;let s=i._$litPart$;if(void 0===s){const e=a?.renderBefore??null;i._$litPart$=s=new te(t.insertBefore(I(),e),e,void 0,a??{})}return s._$AI(e),s})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return q}}de._$litElement$=!0,de.finalized=!0,ce.litElementHydrateSupport?.({LitElement:de});const le=ce.litElementPolyfillSupport;le?.({LitElement:de}),(ce.litElementVersions??=[]).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const he=e=>(t,a)=>{void 0!==a?a.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)},ue={attribute:!0,type:String,converter:f,reflect:!1,hasChanged:y},pe=(e=ue,t,a)=>{const{kind:i,metadata:s}=a;let r=globalThis.litPropertyMetadata.get(s);if(void 0===r&&globalThis.litPropertyMetadata.set(s,r=new Map),"setter"===i&&((e=Object.create(e)).wrapped=!0),r.set(a.name,e),"accessor"===i){const{name:i}=a;return{set(a){const s=t.get.call(this);t.set.call(this,a),this.requestUpdate(i,s,e,!0,a)},init(t){return void 0!==t&&this.C(i,void 0,e,t),t}}}if("setter"===i){const{name:i}=a;return function(a){const s=this[i];t.call(this,a),this.requestUpdate(i,s,e,!0,a)}}throw Error("Unsupported decorator location: "+i)};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function ge(e){return(t,a)=>"object"==typeof a?pe(e,t,a):((e,t,a)=>{const i=t.hasOwnProperty(a);return t.constructor.createProperty(a,e),i?Object.getOwnPropertyDescriptor(t,a):void 0})(e,t,a)}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function me(e){return ge({...e,state:!0,attribute:!1})}const ve="librus_synergia",be=new Set(["unknown","unavailable",""]);class _e extends Error{constructor(e,t){super(e),this.code=e,this.deviceId=t}}function fe(e){const t=new Set;for(const a of Object.values(e.entities??{}))a.platform===ve&&a.device_id&&t.add(a.device_id);return[...t]}function ye(e,t){const a=fe(e);if(t){if(!a.includes(t))throw new _e("device_missing",t);return t}if(1===a.length)return a[0];if(0===a.length)throw new _e("no_device");throw new _e("multiple_devices")}function we(e,t){const a={};for(const i of Object.values(e.entities??{}))i.device_id===t&&i.platform===ve&&i.translation_key&&(a[i.translation_key]=i.entity_id);return a}function xe(e,t,a){const i=[];for(const s of Object.values(e.entities??{}))if(s.device_id===t&&s.platform===ve&&s.translation_key===a){const t=e.states[s.entity_id],a=t?.attributes;i.push({entityId:s.entity_id,subject:a?.subject||s.entity_id,subjectId:a?.subject_id})}return i.sort((e,t)=>e.subject.localeCompare(t.subject))}function ke(e,t){for(const a of["school_class","lucky_number"]){const i=t[a]?e.states[t[a]]?.attributes.student_number:void 0;if("number"==typeof i)return i}}const $e={"error.device_missing":"Device {device} not found","error.multiple_devices":"Multiple students found - set device_id","error.no_device":"No Librus Synergia device found","empty.loading":"Loading…","empty.generic_error":"Something went wrong","editor.student":"Student","editor.subject":"Subject","editor.subject_auto":"Overall / all subjects","editor.title":"Card title (optional)","editor.max_items":"Max rows shown","editor.days_ahead":"Days ahead","editor.days_back":"Days of history","card.catch_up.title":"Catch up","card.catch_up.subtitle":"absence {period} · subjects: {count}","card.catch_up.empty":"No absence to catch up on in the last 3 weeks","card.catch_up.requires":"Needs ha-librus-synergia 0.12.2+ (Lesson topics sensor with catch_up)","card.catch_up.back_today":"back today","card.catch_up.back_on":"back since {date}","card.catch_up.progress":"{done} of {total} caught up","card.catch_up.lessons":"lessons: {count}","card.catch_up.homework":"homework: {count}","card.catch_up.no_topic":"no topic in Librus","card.catch_up.due":"due {date}","card.catch_up.other":"Other","card.exam_prep.title":"Test revision","card.exam_prep.subtitle":"tests in the next {days} days: {count}","card.exam_prep.empty":"No tests in the next {days} days","card.exam_prep.requires":"Needs ha-librus-synergia 0.12.1+ (Next exam sensor with topics)","card.exam_prep.topics":"topics: {count}","card.exam_prep.since":"since {date}","card.exam_prep.since_start":"since the start of the year","card.exam_prep.missed":"missed: {count}","card.exam_prep.more":"+{count} earlier topics","card.exam_prep.absent":"absent","card.exam_prep.no_topics":"No lesson topics in Librus for this subject yet","card.exam_prep.today":"today","card.exam_prep.tomorrow":"tomorrow","card.exam_prep.in_days":"in {days} days","card.school_documents.title":"School documents","card.school_documents.subtitle":"documents: {count}","card.school_documents.subtitle_new":"documents: {count} · new: {fresh}","card.school_documents.empty":"The school hasn't shared any documents","card.school_documents.requires":"Needs ha-librus-synergia 0.12.0+ (School documents sensor)","card.school_documents.new":"new","card.school_documents.added":"added {date}","card.school_documents.download_error":"download failed","card.justifications.title":"Justifications","card.justifications.subtitle_pending":"waiting for the school: {count}","card.justifications.subtitle_done":"nothing waiting for the school","card.justifications.empty":"No absences to excuse and no justifications sent","card.justifications.requires":"Needs ha-librus-synergia 0.12.0+ (Absence justifications sensor)","card.justifications.to_excuse":"Days to excuse: {count}","card.justifications.nothing_sent":"nothing sent yet","card.justifications.pending":"waiting","card.justifications.accepted":"accepted","card.justifications.rejected":"rejected","card.justifications.lessons":"lessons: {count}","card.justifications.sent":"sent {date}","card.school_trips.title":"School trips","card.school_trips.subtitle":"upcoming: {count}","card.school_trips.empty":"No school trips planned","card.school_trips.requires":"Needs ha-librus-synergia 0.12.0+ (Next school trip sensor)","card.school_trips.today":"today","card.school_trips.tomorrow":"tomorrow","card.school_trips.in_days":"in {days} days","editor.school_days_shown":"School days shown","card.lesson_topics.title":"What was taught","card.lesson_topics.subtitle":"last {days} school days","card.lesson_topics.missed":"{count} missed lessons to catch up on","card.lesson_topics.empty":"No lesson topics from the last days","card.lesson_topics.requires":"Needs ha-librus-synergia 0.12.0+ (Lesson topics sensor)","card.lesson_topics.today":"Today","card.lesson_topics.yesterday":"Yesterday","card.lesson_topics.lesson":"Lesson","card.lesson_topics.trip":"trip","card.lesson_topics.absent":"absent","editor.target":"Target average","editor.mailbox":"Mailbox","editor.show_saturday":"Show Saturday","editor.show_descriptive":"Show descriptive grades","editor.hide_teacher":"Hide the teacher","editor.accent_color":"Accent color (e.g. #e91e63 or teal)","editor.appearance":"Appearance","editor.accent_default":"Default (indigo)","editor.accent_pink":"Pink","editor.accent_purple":"Purple","editor.accent_teal":"Teal","editor.accent_green":"Green","editor.accent_orange":"Orange","editor.hide_icon":"Hide the icon","editor.hide_subtitle":"Hide the subtitle","editor.hide_legend":"Hide the legend","editor.hide_comments":"Hide comments","editor.list_height":"List height (px)","editor.more_items":"How many more to list","editor.tap_action":"Tap action","editor.exam_keywords":"Exam category keywords (comma-separated)","editor.icon":"Icon override (e.g. mdi:star)","editor.hide_header":"Hide header","editor.compact":"Compact mode","editor.hide_outage_warning":'Hide the "Librus not responding" warning',"outage.title":"Librus not responding","outage.data_from":"data from {time}","editor.category_filter":"Category filter (comma-separated, optional)","editor.sort":"Sort order","sort.newest":"Newest first","sort.oldest":"Oldest first","card.grades.title":"Grade average","card.grades.subtitle":"All subjects","card.grades.empty":"No grades yet this year","card.subject_spotlight.title":"Best & weakest subject","card.subject_spotlight.subtitle":"By average","card.subject_spotlight.empty":"Not enough graded subjects to compare yet","card.subject_spotlight.best":"Top subject","card.subject_spotlight.weakest":"Room to grow","card.grade_trend.title":"Grade trend","card.grade_trend.subtitle":"Last {days} days","card.grade_trend.empty":"Not enough history yet","card.grade_distribution.title":"Grade distribution","card.grade_distribution.subtitle":"{count} grades, all subjects","card.grade_distribution.other":"other","card.grades_radar.title":"Grade profile","card.grades_radar.subtitle":"By subject","card.grades_radar.empty":"Not enough subjects with grades yet","label.average":"Average","card.grade_category_distribution.title":"Grades by category","card.grade_category_distribution.subtitle":"Tests, quizzes, answers…","card.grade_category_distribution.empty":"No categorized grades yet","unit.grades":"grades","card.grade_category_distribution.uncategorized":"Uncategorized","card.subject_time.title":"Lesson time split","card.subject_time.subtitle":"Lessons per week, by subject","card.subject_time.empty":"No lessons found for this week","unit.lessons_per_week":"lessons/wk","card.attendance_weekday.title":"Absences by weekday","card.attendance_weekday.subtitle":"This school year","card.attendance_weekday.empty":"No absences or lates recorded","card.attendance_subject.title":"Absences by subject","card.attendance_subject.subtitle":"Which subjects are missed most often","card.attendance_subject.empty":"No absences recorded","card.school_day.title":"School day","card.school_day.today":"Today","card.school_day.tomorrow":"Tomorrow","card.school_day.status_before":"Lessons today","card.school_day.status_in":"At school","card.school_day.status_after":"School's out","card.school_day.status_free":"Day off","card.school_day.now":"Now","card.school_day.break":"Break","card.school_day.first":"First","card.school_day.left":"{minutes} min left","card.school_day.from":"from {time}","card.school_day.empty":"No lessons in the coming days","card.school_day.cancelled":"cancelled","card.school_day.substitution":"substitution","card.report_card.title":"Report card forecast","card.report_card.basis_semester_1":"1st semester · from the averages","card.report_card.basis_school_year":"Whole year · from the averages","card.report_card.average":"report-card average","card.report_card.at_risk":"At risk: {n}","card.report_card.declining":"Dropped: {n}","card.report_card.all_clear":"No risks","card.report_card.honours_from":"Distinction from {avg}","card.report_card.honours_ok":"average OK","card.report_card.missing":"missing","card.report_card.closest":"Closest to a change","card.report_card.sixes_to":"{n}× a 6 → {grade}","card.report_card.one_drops":"one 1 → {grade}","card.report_card.footer":"Forecast from the averages and the school's thresholds. The teacher gives the grade.","card.report_card.footer_behaviour":"A distinction also needs at least a very good behaviour grade.","card.report_card.empty":"No grades to forecast yet","card.report_card.needs_backend":"Needs ha-librus-synergia 0.12.0 or newer (Grade forecast sensor)","card.subject_attendance.title":"Attendance by subject","card.subject_attendance.lowest":"Lowest:","card.subject_attendance.at_risk":"{count} below 50%","card.subject_attendance.no_risk":"no risk","card.subject_attendance.tooltip":"{subject}: present at {present} of {total} lessons","card.subject_attendance.legend_good":"90% or more","card.subject_attendance.legend_warn":"50–90%","card.subject_attendance.legend_bad":"below 50%","card.subject_attendance.legend_few":"too few lessons","card.subject_attendance.empty":"No attendance data yet","card.subject_attendance.needs_backend":"Needs ha-librus-synergia 0.9.0 or newer (Lowest subject attendance sensor).","card.recent_activity.title":"What's new","card.recent_activity.subtitle":"Grades, notices, announcements & messages","card.recent_activity.empty":"Nothing new yet","card.grade_log.title":"Grade log","label.grade_improves":"corrects {value}","card.grade_log.subtitle":"All subjects","card.grade_log.empty_filtered":"No grades match this filter","card.latest_grade.title":"Latest grade","card.latest_grade.empty":"No grades yet","card.behaviour_grade.title":"Behaviour grade","card.behaviour_grade.subtitle":"Semester grade","card.behaviour_grade.empty":"No behaviour grade yet","card.descriptive_grades.title":"Descriptive grades","card.descriptive_grades.subtitle":"Non-numeric assessment","card.descriptive_grades.empty":"No descriptive grades yet","card.attendance.title":"Attendance","card.attendance.subtitle":"This school year","card.attendance.by_semester":"By semester","card.attendance_heatmap.title":"Attendance - year map","card.attendance_heatmap.subtitle":"This school year","card.attendance_heatmap.empty":"No attendance data","card.attendance_heatmap.status.good":"Present","card.attendance_heatmap.status.warn":"Excused","card.attendance_heatmap.status.bad":"Unexcused","card.attendance_heatmap.no_data":"No data","card.attendance.semester":"Semester {n}","stat.absences":"Absences","stat.unexcused":"Unexcused","stat.excused":"Excused","stat.unexcused_short":"Unexcused","stat.excused_short":"Excused","stat.late":"Late","stat.records":"Records","stat.percentage":"Attendance","card.behaviour_notices.title":"Behaviour notices","card.behaviour_notices.empty":"No notices","card.messages.title":"Messages","card.messages.unavailable":"Messages module not enabled","card.messages.read_notice":"Opening marks it as read in Librus","card.messages.fetch_failed":"Couldn't load the full message","card.messages.attachment_notice":"Tap a file to download it to this device","card.messages.attachment_error":"couldn't download - needs integration 0.12.0+","card.messages.to":"To {name}","card.messages.read_all":"Read","card.messages.read_some":"Read by {read} of {total}","card.messages.read_none":"Not read yet","card.messages.empty":"No messages here","card.messages.attachment_archived":"Librus doesn't let you download files from archived messages here - open the message in Synergia","card.substitutions.title":"Timetable changes","card.substitutions.subtitle":"Zastępstwa, alerty i usprawiedliwienia","card.substitutions.empty":"No changes to the timetable","card.changes.next":"Next: {subject}, {when}","card.changes.none":"No changes in the next {n} days","card.changes.recent":"Recently","card.changes.substitution":"substitution","card.changes.cancelled":"cancelled","card.changes.room":"room change","card.changes.moved":"moved","card.changes.chip_all":"All","card.changes.chip_substitution":"Substitutions","card.changes.chip_cancelled":"Cancelled","card.changes.chip_room":"Rooms","card.changes.chip_moved":"Moved","editor.show_past":"Show recent changes","mailbox.inbox":"Inbox","mailbox.notes":"Notes","mailbox.alerts":"Alerts","mailbox.substitutions":"Substitutions","mailbox.absences":"Absences","mailbox.justifications":"Justifications","mailbox.trash":"Trash","mailbox.outbox":"Sent","mailbox.archive":"Archive","card.announcements.title":"Announcements","card.announcements.empty":"No announcements","card.announcements.unread":"{n} unread","card.announcements.all_read":"All read","card.homework_assignments.title":"Homework assignments","card.homework_assignments.empty":"No homework assignments","label.due":"Due","card.today_lessons.title":"Today's lessons","card.today_lessons.subtitle":"Timetable","card.today_lessons.empty":"No lessons today","label.now":"now","card.next_lesson.title":"Next lesson","card.next_lesson.empty":"No more lessons today","label.in_minutes":"in {minutes} min","label.in_hours":"in {hours}h","label.in_hours_minutes":"in {hours}h {minutes}m","label.in_days":"in {days}d","label.in_days_hours":"in {days}d {hours}h","card.month.homework":"Homework due","card.month.homework_for":"Homework due: {subject}","card.month.nothing_month":"Nothing planned this month","card.month.nothing_day":"Nothing planned","card.month.previous":"Previous month","card.month.next":"Next month","card.month.free":"Day off","card.month.kind_test":"Tests","card.month.kind_quiz":"Quizzes","card.month.kind_trip":"Trips","card.month.kind_meeting":"Meetings","card.month.kind_homework":"Homework","card.month.kind_other":"Other","card.agenda.title":"Agenda","card.agenda.subtitle":"Upcoming","card.agenda.empty":"Nothing scheduled","card.free_days.title":"Free days","card.free_days.empty":"No upcoming free days","label.days_until":"days until","card.school_year.title":"End of school year","card.school_year.empty":"No school year data","label.days_until_year_end":"days until year end","label.current_semester":"Current semester","label.days_until_semester_end":"days until semester end","label.year_progress":"School year","card.exam_countdown.title":"Next exam","card.exam_countdown.empty":"No upcoming exams","card.week_timetable.title":"Week timetable","card.week_timetable.subtitle":"This week","card.week_timetable.subtitle_upcoming":"Upcoming week","card.week_timetable.break_now":"Break — next lesson in {minutes} min","card.week_timetable.empty":"No lessons found for this week","card.school.title":"School","label.head_teacher":"Head teacher","label.class":"Class","label.student_number":"Register no.","label.student_number_short":"no. {n}","label.lesson_cancelled":"cancelled","label.lesson_substitution":"substitution","label.lesson_moved":"moved","label.lesson_room_change":"room {from} → {to}","label.lesson_room_changed":"room changed","label.lesson_extra":"extra lesson","label.lesson_instead_of":"instead of {subject}","label.lesson_missing":"not this week","label.tutor":"Homeroom teacher","label.semester_ends":"Semester ends","label.year_ends":"Year ends","card.today.title":"Today","stat.lucky_number":"Lucky number","card.week_summary.title":"Week in review","stat.new_grades":"New grades","card.ai_summary.title":"Weekly summary","card.ai_summary.setup":"Weekly AI summary is off","card.ai_summary.setup_hint":"Turn it on under the Librus integration's Configure -> Weekly AI summary (integration 0.10 or newer).","card.ai_summary.waiting":"No summary yet","card.ai_summary.generating":"Generating…","card.ai_summary.generate":"Generate now","card.ai_summary.advice":"For the coming week","card.ai_summary.next_run":"Next: {when}","card.ai_summary.paused":"Automatic summary paused","card.ai_summary.disclaimer":"Written by AI, may contain mistakes","card.ai_summary.for_parent":"for the parent","card.ai_summary.for_student":"for the student","ai_summary.status.good":"Good","ai_summary.status.ok":"OK","ai_summary.status.caution":"Needs attention","ai_summary.section.grades":"Grades","ai_summary.section.attendance":"Attendance","ai_summary.section.behaviour":"Behaviour","ai_summary.section.next_week":"Next week","ai_summary.section.school_news":"From the school","editor.summary_only":"Headline and to-dos only","editor.hide_generate":"Hide the Generate now button","card.lucky_number.title":"Lucky number","card.lucky_number.subtitle":"Today in the register","card.lucky_number.subtitle_for_date":"For {date}","card.lucky_number.yours_today":"It's your number today!","card.lucky_number.yours_for_date":"It's your number on {date}!","card.lucky_number.empty":"No lucky number published yet (e.g. during a school break)","card.student.title":"Student card","stat.overall_rating":"overall","stat.attendance_score":"Attendance","stat.behaviour_score":"Behaviour","stat.grades_score":"Grades","stat.activity_score":"Activity","card.streak.title":"Streaks","card.streak.attendance":"No absences","card.streak.behaviour":"Good behaviour","card.streak.grades":"Good grades","label.days":"days","card.rank.title":"Rank","card.rank.empty":"No grades yet to compute a rank","rank.bronze":"Bronze","rank.silver":"Silver","rank.gold":"Gold","rank.diamond":"Diamond","label.to_next_rank":"to next rank","label.top_rank":"Top rank reached","card.achievements.title":"Achievements","card.achievements.count":"{n} unlocked","card.achievements.empty":"No badges yet - they'll appear here once a new achievement is unlocked while this card is on a dashboard (earlier ones can't be recovered)","card.achievements.next_hint":"{n} more to: {title}","card.achievements.closest":"Closest: {title}","card.achievements.of":"of {n}","card.achievements.goals":"Next goals","card.achievements.recent":"Recently earned","card.achievements.none_yet":"No badges earned yet.","card.achievements.days":"days","badge.first_six":"First six","badge.sixes":"Sixes collector","badge.good_grade_streak":"Good grades streak","badge.hat_trick":"Hat-trick","badge.test_ace":"Test at 5+","badge.subject_star":"Subject star","badge.honours":"Honours average","badge.comeback":"Comeback","badge.no_ones":"Semester without a 1","badge.attendance_streak":"No absences","badge.full_month":"100% month","badge.punctual":"Punctuality","badge.subject_attendance":"Perfect subject attendance","badge.behaviour_streak":"No notes","badge.praise":"Praise","badge.praises":"Praise series","badge.exemplary_behaviour":"Exemplary behaviour","badge.lucky":"Lucky number","badge.homework":"Hard-working","badge.school_year":"School year done","achievement.first_six":"First six!","achievement.good_grade_streak_5":"5 good grades in a row","achievement.good_grade_streak_10":"10 good grades in a row","achievement.good_grade_streak_20":"20 good grades in a row","achievement.attendance_streak_7":"A week without an absence","achievement.attendance_streak_30":"A month without an absence","achievement.attendance_streak_90":"3 months without an absence","achievement.behaviour_streak_7":"A week without a note","achievement.behaviour_streak_30":"A month without a note","achievement.behaviour_streak_90":"3 months without a note","card.level.title":"Level","card.level.subtitle":"XP from grades & attendance","label.level":"Level {n}","label.xp_to_next":"{n} XP to next level","label.xp_from_grades":"From grades","label.xp_from_attendance":"From attendance","label.xp_total":"Total XP","card.teachers.title":"Teachers","card.teachers.homeroom":"Homeroom teacher","card.teachers.count":"{n} subjects","card.teachers.empty":"No teacher directory yet","card.grade_goal.title":"Grade goal","card.grade_goal.subtitle_overall":"Overall average","card.grade_goal.empty":"No grades yet to track a goal against","card.grade_goal.reached":"Goal reached 🎉","label.current":"Now","label.target":"Target","label.to_go":"to go","label.sixes_needed":"≈ {n} more top grades","card.bell_schedule.title":"Today's schedule","card.bell_schedule.empty":"No bell schedule yet — needs ha-librus-synergia with the bell_schedule attribute","label.lesson_short":"L{n}","label.after_school":"School's out for today","editor.hide_room":"Hide classroom","editor.only_tomorrow":"Only the next school day","editor.student_name":"Name shown for {device} (optional)","card.first_lesson.title":"First lesson","card.first_lesson.today":"Today","card.first_lesson.tomorrow":"Tomorrow","card.first_lesson.earliest_today":"Earliest today: {who}","card.first_lesson.earliest_tomorrow":"Earliest tomorrow: {who}","card.first_lesson.earliest_on":"Earliest on {day}: {who}","card.first_lesson.free":"no lessons","card.first_lesson.no_data":"no timetable","card.first_lesson.first_canceled":"first lesson cancelled","card.first_lesson.first_n_canceled":"first {n} lessons cancelled","card.first_lesson.substitution":"substitution","card.first_lesson.empty":"No lessons today or on the next school day","card.tomorrow.title":"Tomorrow","card.tomorrow.title_next_school_day":"Next school day","card.tomorrow.empty":"Nothing scheduled for the next school day","card.tomorrow.lessons":"lessons","card.tomorrow.starts":"Starts","card.tomorrow.ends":"Ends","card.tomorrow.homework":"Homework due: {n}","card.grade_simulator.subtitle":"What if… (rough estimate)","card.grade_simulator.empty":"Pick a subject that has grades","label.weight":"Weight","card.grades.forecast_hint":"Report-card forecast: {grade}","label.forecast_grade":"forecast {grade}","card.grade_simulator.subtitle_exact":"What if… (exact average)","card.grade_simulator.report":"Report card:","label.sixes_needed_exact":"{n}× a 6 (weight 1)","label.forecast":"Forecast","label.forecast_report_average":"Report-card forecast","card.homework_checklist.title":"Homework checklist","card.homework_checklist.progress":"{done}/{total} done","card.homework_checklist.file_error":"couldn't download","card.semester_comparison.title":"Semester comparison","card.semester_comparison.subtitle":"Semester 1 vs 2, by subject","card.semester_comparison.empty":"No semester averages yet","card.semester_comparison.s1":"Sem 1","card.semester_comparison.s2":"Sem 2","editor.mode":"Mode","mode.archetype":"Archetype","mode.hero":"Hero","card.hero.title_archetype":"Your archetype","card.hero.title_hero":"Your hero","card.hero.subtitle":"based on your Librus data","card.hero.empty":"Not enough data yet to compute a result","hero.chip.avg_naukowiec":"STEM avg {n}","hero.chip.avg_humanista":"Humanities avg {n}","hero.chip.avg_poliglota":"Languages avg {n}","hero.chip.avg_artysta":"Arts avg {n}","hero.chip.avg_sportowiec":"PE avg {n}","hero.chip.grades":"{n} grades","hero.chip.streak_days":"{n}-day streak","hero.chip.unexcused":"{n} unexcused","hero.chip.good_streak":"{n}-grade streak","hero.chip.overall_avg":"avg {n}","hero.chip.overall_avg_full":"overall avg {n}","hero.chip.semester1":"term 1: {n}","hero.chip.semester2":"term 2: {n}","hero.chip.behaviour":"conduct {name}","hero.chip.positive_notes":"+{n} notes","hero.chip.badges":"{n} badges","hero.chip.various_categories":"various categories","hero.chip.subjects_count":"{n} subjects","hero.chip.spread":"spread {n}","hero.naukowiec.archetype_name":"Scientist","hero.naukowiec.hero_name":"Archmage","hero.naukowiec.archetype_desc":"Maths, physics and computer science outshine every other subject.","hero.naukowiec.hero_desc":"You wield the magic of numbers - equations are your spells.","hero.humanista.archetype_name":"Humanist","hero.humanista.hero_name":"Bard","hero.humanista.archetype_desc":"Polish and history are the subjects where you shine brightest.","hero.humanista.hero_desc":"Words are your weapon - a good story wins anyone over.","hero.poliglota.archetype_name":"Polyglot","hero.poliglota.hero_name":"Translator","hero.poliglota.archetype_desc":"English and German clearly outrank every other subject.","hero.poliglota.hero_desc":"You know more languages than most adults ever will.","hero.artysta.archetype_name":"Artist","hero.artysta.hero_name":"Illusionist","hero.artysta.archetype_desc":"Art and music are the subjects where you're strongest.","hero.artysta.hero_desc":"You create worlds that others can only imagine.","hero.sportowiec.archetype_name":"Athlete","hero.sportowiec.hero_name":"Herald of the Arena","hero.sportowiec.archetype_desc":"Physical education is clearly your strongest subject.","hero.sportowiec.hero_desc":"Strength and stamina - nobody on the field matches you.","hero.wojownik.archetype_name":"Attendance Warrior","hero.wojownik.hero_name":"The Unyielding","hero.wojownik.archetype_desc":"A long attendance streak and zero unexcused absences.","hero.wojownik.hero_desc":"You show up every single day, no exceptions, no excuses.","hero.meteor.archetype_name":"Meteor","hero.meteor.hero_name":"Meteor","hero.meteor.archetype_desc":"Your good-grade streak stretches back a dozen entries.","hero.meteor.hero_desc":"You're tearing through the term, leaving a trail of grades.","hero.feniks.archetype_name":"Phoenix","hero.feniks.hero_name":"Phoenix","hero.feniks.archetype_desc":"This semester's average is clearly up from the last one.","hero.feniks.hero_desc":"You rise from a weaker start, stronger than before.","hero.spolecznik.archetype_name":"People Person","hero.spolecznik.hero_name":"Healer","hero.spolecznik.archetype_desc":"Model conduct grade and nothing but positive notes.","hero.spolecznik.hero_desc":"Your presence calms and settles the whole class at once.","hero.kolekcjoner.archetype_name":"Collector","hero.kolekcjoner.hero_name":"Trophy Hunter","hero.kolekcjoner.archetype_desc":"The most unlocked badges across every category.","hero.kolekcjoner.hero_desc":"Your trophy case is bursting with earned achievements.","hero.prymus.archetype_name":"Top of the Class","hero.prymus.hero_name":"Legend","hero.prymus.archetype_desc":"A high average holds steady across every subject.","hero.prymus.hero_desc":"They'll be telling stories about your results for years.","hero.wszechstronny.archetype_name":"All-Rounder","hero.wszechstronny.hero_name":"Avatar of Balance","hero.wszechstronny.archetype_desc":"No subject dominates - your grades are level across the board.","hero.wszechstronny.hero_desc":"You wield a bit of every element - nothing surprises you.","card.hero_stats.title":"Hero stats","card.hero_stats.subtitle":"Your character sheet","card.hero_stats.empty":"Not enough data for stats yet","card.hero_stats.power":"Power","hero_stat.sila":"Strength","hero_stat.intelekt":"Intellect","hero_stat.wiedza":"Wisdom","hero_stat.charyzma":"Charisma","hero_stat.wytrwalosc":"Endurance","hero_stat.szczescie":"Luck","card.hero_history.title":"Hero history","card.hero_history.subtitle":"how your result changed over time","card.hero_history.empty":"No history yet - it appears once your result changes","card.hero_history.current":"current ({n}d)","card.grades.points_percentage":"{value}% of points","card.last_update.subtitle":"Last data refresh","card.last_update.not_responding":"Librus not responding · next attempt {time}","label.just_now":"Just now","label.minutes_ago":"{minutes} min ago","label.hours_ago":"{hours}h ago","label.days_ago":"{days}d ago"},ze={en:$e,pl:{"error.device_missing":"Nie znaleziono urządzenia {device}","error.multiple_devices":"Znaleziono kilkoro uczniów - ustaw device_id","error.no_device":"Nie znaleziono urządzenia Librus Synergia","empty.loading":"Wczytywanie…","empty.generic_error":"Coś poszło nie tak","editor.student":"Uczeń","editor.subject":"Przedmiot","editor.subject_auto":"Ogólna / wszystkie przedmioty","editor.title":"Tytuł karty (opcjonalnie)","editor.max_items":"Maks. liczba wierszy","editor.days_ahead":"Dni do przodu","editor.days_back":"Dni historii","card.catch_up.title":"Do nadrobienia","card.catch_up.subtitle":"nieobecność {period} · przedmioty: {count}","card.catch_up.empty":"Brak nieobecności do nadrobienia z ostatnich 3 tygodni","card.catch_up.requires":"Wymaga ha-librus-synergia 0.12.2+ (sensor Tematy lekcji z catch_up)","card.catch_up.back_today":"powrót dziś","card.catch_up.back_on":"w szkole od {date}","card.catch_up.progress":"nadrobione: {done} z {total}","card.catch_up.lessons":"lekcje: {count}","card.catch_up.homework":"zadania: {count}","card.catch_up.no_topic":"brak tematu w dzienniku","card.catch_up.due":"na {date}","card.catch_up.other":"Inne","card.exam_prep.title":"Do sprawdzianu","card.exam_prep.subtitle":"sprawdziany w ciągu {days} dni: {count}","card.exam_prep.empty":"Brak sprawdzianów w ciągu {days} dni","card.exam_prep.requires":"Wymaga ha-librus-synergia 0.12.1+ (sensor Najbliższy sprawdzian z tematami)","card.exam_prep.topics":"tematy: {count}","card.exam_prep.since":"od {date}","card.exam_prep.since_start":"od początku roku","card.exam_prep.missed":"opuszczone: {count}","card.exam_prep.more":"+{count} wcześniejszych tematów","card.exam_prep.absent":"nieobecny","card.exam_prep.no_topics":"Brak tematów lekcji z tego przedmiotu w dzienniku","card.exam_prep.today":"dziś","card.exam_prep.tomorrow":"jutro","card.exam_prep.in_days":"za {days} dni","card.school_documents.title":"Dokumenty szkoły","card.school_documents.subtitle":"dokumenty: {count}","card.school_documents.subtitle_new":"dokumenty: {count} · nowe: {fresh}","card.school_documents.empty":"Szkoła nie udostępniła żadnych dokumentów","card.school_documents.requires":"Wymaga ha-librus-synergia 0.12.0+ (sensor Dokumenty szkoły)","card.school_documents.new":"nowy","card.school_documents.added":"dodano {date}","card.school_documents.download_error":"nie udało się pobrać","card.justifications.title":"Usprawiedliwienia","card.justifications.subtitle_pending":"czeka na decyzję szkoły: {count}","card.justifications.subtitle_done":"nic nie czeka na decyzję szkoły","card.justifications.empty":"Brak nieobecności do usprawiedliwienia i wysłanych usprawiedliwień","card.justifications.requires":"Wymaga ha-librus-synergia 0.12.0+ (sensor Usprawiedliwienia)","card.justifications.to_excuse":"Do usprawiedliwienia: {count} dni","card.justifications.nothing_sent":"nic jeszcze nie wysłano","card.justifications.pending":"czeka","card.justifications.accepted":"przyjęte","card.justifications.rejected":"odrzucone","card.justifications.lessons":"lekcje: {count}","card.justifications.sent":"wysłane {date}","card.school_trips.title":"Wycieczki","card.school_trips.subtitle":"zaplanowane: {count}","card.school_trips.empty":"Brak zaplanowanych wycieczek","card.school_trips.requires":"Wymaga ha-librus-synergia 0.12.0+ (sensor Najbliższa wycieczka)","card.school_trips.today":"dziś","card.school_trips.tomorrow":"jutro","card.school_trips.in_days":"za {days} dni","editor.school_days_shown":"Liczba dni szkolnych","card.lesson_topics.title":"Co było na lekcji","card.lesson_topics.subtitle":"ostatnie dni szkolne: {days}","card.lesson_topics.missed":"Do nadrobienia: {count}","card.lesson_topics.empty":"Brak tematów lekcji z ostatnich dni","card.lesson_topics.requires":"Wymaga ha-librus-synergia 0.12.0+ (sensor Tematy lekcji)","card.lesson_topics.today":"Dziś","card.lesson_topics.yesterday":"Wczoraj","card.lesson_topics.lesson":"Lekcja","card.lesson_topics.trip":"wycieczka","card.lesson_topics.absent":"nieobecny","editor.target":"Docelowa średnia","editor.mailbox":"Skrzynka","editor.show_saturday":"Pokaż sobotę","editor.show_descriptive":"Pokaż oceny opisowe","editor.hide_teacher":"Ukryj nauczyciela","editor.accent_color":"Kolor akcentu (np. #e91e63 albo teal)","editor.appearance":"Wygląd","editor.accent_default":"Domyślny (indygo)","editor.accent_pink":"Różowy","editor.accent_purple":"Fioletowy","editor.accent_teal":"Morski","editor.accent_green":"Zielony","editor.accent_orange":"Pomarańczowy","editor.hide_icon":"Ukryj ikonę","editor.hide_subtitle":"Ukryj podtytuł","editor.hide_legend":"Ukryj legendę","editor.hide_comments":"Ukryj komentarze","editor.list_height":"Wysokość listy (px)","editor.more_items":"Ile kolejnych pokazać","editor.tap_action":"Akcja po kliknięciu","editor.exam_keywords":"Słowa-klucze kategorii sprawdzianów (po przecinku)","editor.icon":"Własna ikona (np. mdi:star)","editor.hide_header":"Ukryj nagłówek","editor.compact":"Tryb kompaktowy","editor.hide_outage_warning":"Ukryj ostrzeżenie „Librus nie odpowiada”","outage.title":"Librus nie odpowiada","outage.data_from":"dane z {time}","editor.category_filter":"Filtr kategorii (po przecinku, opcjonalnie)","editor.sort":"Kolejność","sort.newest":"Najpierw najnowsze","sort.oldest":"Najpierw najstarsze","card.grades.title":"Średnia ocen","card.grades.subtitle":"Wszystkie przedmioty","card.grades.empty":"Brak ocen w tym roku szkolnym","card.subject_spotlight.title":"Najlepszy i najsłabszy przedmiot","card.subject_spotlight.subtitle":"Wg średniej","card.subject_spotlight.empty":"Za mało przedmiotów z ocenami, by porównać","card.subject_spotlight.best":"Najlepszy","card.subject_spotlight.weakest":"Do przećwiczenia","card.grade_trend.title":"Trend średniej","card.grade_trend.subtitle":"Ostatnie {days} dni","card.grade_trend.empty":"Za mało historii","card.grade_distribution.title":"Rozkład ocen","card.grade_distribution.subtitle":"{count} ocen, wszystkie przedmioty","card.grade_distribution.other":"inne","card.grades_radar.title":"Profil ocen","card.grades_radar.subtitle":"Wg przedmiotu","card.grades_radar.empty":"Za mało przedmiotów z ocenami","label.average":"Średnia","card.grade_category_distribution.title":"Oceny wg kategorii","card.grade_category_distribution.subtitle":"Sprawdziany, kartkówki, odpowiedzi…","card.grade_category_distribution.empty":"Brak ocen z przypisaną kategorią","unit.grades":"ocen","card.grade_category_distribution.uncategorized":"Bez kategorii","card.subject_time.title":"Podział czasu lekcji","card.subject_time.subtitle":"Lekcje w tygodniu, wg przedmiotu","card.subject_time.empty":"Brak lekcji w tym tygodniu","unit.lessons_per_week":"lekcji/tydz.","card.attendance_weekday.title":"Nieobecności wg dnia tygodnia","card.attendance_weekday.subtitle":"Ten rok szkolny","card.attendance_weekday.empty":"Brak nieobecności ani spóźnień","card.attendance_subject.title":"Nieobecności wg przedmiotu","card.attendance_subject.subtitle":"Które przedmioty są najczęściej opuszczane","card.attendance_subject.empty":"Brak zarejestrowanych nieobecności","card.school_day.title":"Dzień szkolny","card.school_day.today":"Dziś","card.school_day.tomorrow":"Jutro","card.school_day.status_before":"Dziś lekcje","card.school_day.status_in":"Na lekcjach","card.school_day.status_after":"Po lekcjach","card.school_day.status_free":"Wolne","card.school_day.now":"Teraz","card.school_day.break":"Przerwa","card.school_day.first":"Pierwsza","card.school_day.left":"jeszcze {minutes} min","card.school_day.from":"od {time}","card.school_day.empty":"Brak lekcji w najbliższych dniach","card.school_day.cancelled":"odwołana","card.school_day.substitution":"zastępstwo","card.report_card.title":"Świadectwo – prognoza","card.report_card.basis_semester_1":"I semestr · ze średnich","card.report_card.basis_school_year":"Cały rok · ze średnich","card.report_card.average":"średnia świadectwa","card.report_card.at_risk":"Zagrożone: {n}","card.report_card.declining":"Spadki: {n}","card.report_card.all_clear":"Bez zagrożeń","card.report_card.honours_from":"Pasek od {avg}","card.report_card.honours_ok":"średnia OK","card.report_card.missing":"brakuje","card.report_card.closest":"Najbliżej zmiany","card.report_card.sixes_to":"{n}× szóstka → {grade}","card.report_card.one_drops":"jedna 1 → {grade}","card.report_card.footer":"Prognoza ze średniej i progów szkoły. Ocenę wystawia nauczyciel.","card.report_card.footer_behaviour":"Do paska potrzeba też zachowania co najmniej bardzo dobrego.","card.report_card.empty":"Brak ocen do prognozy","card.report_card.needs_backend":"Wymaga ha-librus-synergia 0.12.0 lub nowszej (sensor Prognoza ocen)","card.subject_attendance.title":"Frekwencja z przedmiotów","card.subject_attendance.lowest":"Najniższa:","card.subject_attendance.at_risk":"{count} poniżej 50%","card.subject_attendance.no_risk":"bez zagrożeń","card.subject_attendance.tooltip":"{subject}: obecny na {present} z {total} lekcji","card.subject_attendance.legend_good":"90% i więcej","card.subject_attendance.legend_warn":"50–90%","card.subject_attendance.legend_bad":"poniżej 50%","card.subject_attendance.legend_few":"za mało lekcji","card.subject_attendance.empty":"Brak danych o frekwencji","card.subject_attendance.needs_backend":"Wymaga ha-librus-synergia 0.9.0 lub nowszej (sensor najniższej frekwencji z przedmiotu).","card.recent_activity.title":"Co nowego","card.recent_activity.subtitle":"Oceny, uwagi, ogłoszenia i wiadomości","card.recent_activity.empty":"Nic nowego","card.grade_log.title":"Dziennik ocen","label.grade_improves":"poprawa z {value}","card.grade_log.subtitle":"Wszystkie przedmioty","card.grade_log.empty_filtered":"Brak ocen pasujących do filtra","card.latest_grade.title":"Ostatnia ocena","card.latest_grade.empty":"Brak ocen","card.behaviour_grade.title":"Ocena zachowania","card.behaviour_grade.subtitle":"Ocena semestralna","card.behaviour_grade.empty":"Brak jeszcze oceny zachowania","card.descriptive_grades.title":"Oceny opisowe","card.descriptive_grades.subtitle":"Ocenianie opisowe","card.descriptive_grades.empty":"Brak jeszcze ocen opisowych","card.attendance.title":"Frekwencja","card.attendance.subtitle":"W tym roku szkolnym","card.attendance.by_semester":"Wg semestru","card.attendance_heatmap.title":"Frekwencja - mapa roku","card.attendance_heatmap.subtitle":"Ten rok szkolny","card.attendance_heatmap.empty":"Brak danych o frekwencji","card.attendance_heatmap.status.good":"Obecność","card.attendance_heatmap.status.warn":"Usprawiedliwiona","card.attendance_heatmap.status.bad":"Nieusprawiedliwiona","card.attendance_heatmap.no_data":"Brak danych","card.attendance.semester":"Semestr {n}","stat.absences":"Nieobecności","stat.unexcused":"Nieusprawiedliwione","stat.excused":"Usprawiedliwione","stat.unexcused_short":"Nieuspr.","stat.excused_short":"Uspr.","stat.late":"Spóźnienia","stat.records":"Rekordów","stat.percentage":"Frekwencja","card.behaviour_notices.title":"Uwagi","card.behaviour_notices.empty":"Brak uwag","card.messages.title":"Wiadomości","card.messages.unavailable":"Moduł wiadomości nie jest włączony","card.messages.read_notice":"Otwarcie oznaczy jako przeczytane w Librusie","card.messages.fetch_failed":"Nie udało się pobrać pełnej treści","card.messages.attachment_notice":"Kliknij plik, aby pobrać go na to urządzenie","card.messages.attachment_error":"nie udało się pobrać - wymaga integracji 0.12.0+","card.messages.to":"Do: {name}","card.messages.read_all":"Przeczytana","card.messages.read_some":"Przeczytana przez {read} z {total}","card.messages.read_none":"Jeszcze nieprzeczytana","card.messages.empty":"Brak wiadomości","card.messages.attachment_archived":"Librus nie pozwala tu pobrać plików z wiadomości w archiwum - otwórz wiadomość w Synergii","card.substitutions.title":"Zmiany w planie","card.substitutions.subtitle":"Wiadomości specjalne","card.substitutions.empty":"Bez zmian w planie","card.changes.next":"Najbliższa: {subject}, {when}","card.changes.none":"Bez zmian w najbliższych {n} dniach","card.changes.recent":"Ostatnio","card.changes.substitution":"zastępstwo","card.changes.cancelled":"odwołana","card.changes.room":"zmiana sali","card.changes.moved":"przeniesiona","card.changes.chip_all":"Wszystkie","card.changes.chip_substitution":"Zastępstwa","card.changes.chip_cancelled":"Odwołane","card.changes.chip_room":"Sale","card.changes.chip_moved":"Przeniesione","editor.show_past":"Pokaż ostatnie zmiany","mailbox.inbox":"Odebrane","mailbox.notes":"Uwagi","mailbox.alerts":"Alerty","mailbox.substitutions":"Zastępstwa","mailbox.absences":"Nieobecności","mailbox.justifications":"Usprawiedliwienia","mailbox.trash":"Kosz","mailbox.outbox":"Wysłane","mailbox.archive":"Archiwum","card.announcements.title":"Ogłoszenia","card.announcements.empty":"Brak ogłoszeń","card.announcements.unread":"Nieprzeczytane: {n}","card.announcements.all_read":"Wszystkie przeczytane","card.homework_assignments.title":"Zadania domowe","card.homework_assignments.empty":"Brak zadań domowych","label.due":"Termin","card.today_lessons.title":"Dzisiejszy plan lekcji","card.today_lessons.subtitle":"Plan lekcji","card.today_lessons.empty":"Brak lekcji dzisiaj","label.now":"teraz","card.next_lesson.title":"Najbliższa lekcja","card.next_lesson.empty":"Koniec lekcji na dziś","label.in_minutes":"za {minutes} min","label.in_hours":"za {hours} godz.","label.in_hours_minutes":"za {hours} godz. {minutes} min","label.in_days":"za {days} dni","label.in_days_hours":"za {days} dni {hours} godz.","card.month.homework":"Termin zadania domowego","card.month.homework_for":"Zadanie domowe: {subject}","card.month.nothing_month":"Nic zaplanowanego w tym miesiącu","card.month.nothing_day":"Nic zaplanowanego","card.month.previous":"Poprzedni miesiąc","card.month.next":"Następny miesiąc","card.month.free":"Dzień wolny","card.month.kind_test":"Sprawdziany","card.month.kind_quiz":"Kartkówki","card.month.kind_trip":"Wycieczki","card.month.kind_meeting":"Zebrania","card.month.kind_homework":"Zadania domowe","card.month.kind_other":"Inne","card.agenda.title":"Terminarz","card.agenda.subtitle":"Nadchodzące","card.agenda.empty":"Brak zaplanowanych wydarzeń","card.free_days.title":"Dni wolne","card.free_days.empty":"Brak nadchodzących dni wolnych","label.days_until":"dni do","card.school_year.title":"Koniec roku szkolnego","card.school_year.empty":"Brak danych o roku szkolnym","label.days_until_year_end":"dni do końca roku","label.current_semester":"Aktualny semestr","label.days_until_semester_end":"dni do końca semestru","label.year_progress":"Rok szkolny","card.exam_countdown.title":"Najbliższy sprawdzian","card.exam_countdown.empty":"Brak nadchodzących sprawdzianów","card.week_timetable.title":"Plan tygodniowy","card.week_timetable.subtitle":"Ten tydzień","card.week_timetable.subtitle_upcoming":"Nadchodzący tydzień","card.week_timetable.break_now":"Przerwa — następna lekcja za {minutes} min","card.week_timetable.empty":"Brak lekcji w tym tygodniu","card.school.title":"Szkoła","label.head_teacher":"Dyrektor","label.class":"Klasa","label.student_number":"Nr w dzienniku","label.student_number_short":"nr {n}","label.lesson_cancelled":"odwołana","label.lesson_substitution":"zastępstwo","label.lesson_moved":"przeniesiona","label.lesson_room_change":"sala {from} → {to}","label.lesson_room_changed":"zmiana sali","label.lesson_extra":"dodatkowa lekcja","label.lesson_instead_of":"zamiast: {subject}","label.lesson_missing":"nie ma jej w tym tygodniu","label.tutor":"Wychowawca","label.semester_ends":"Koniec semestru","label.year_ends":"Koniec roku szkolnego","card.today.title":"Dziś","stat.lucky_number":"Numerek","card.week_summary.title":"Tydzień w skrócie","stat.new_grades":"Nowe oceny","card.ai_summary.title":"Podsumowanie tygodnia","card.ai_summary.setup":"Podsumowanie AI jest wyłączone","card.ai_summary.setup_hint":"Włącz je w integracji Librus: Konfiguruj -> Podsumowanie tygodnia (AI) (integracja 0.10 lub nowsza).","card.ai_summary.waiting":"Jeszcze nie ma podsumowania","card.ai_summary.generating":"Generuję…","card.ai_summary.generate":"Wygeneruj teraz","card.ai_summary.advice":"Na ten tydzień","card.ai_summary.next_run":"Następne: {when}","card.ai_summary.paused":"Automatyczne podsumowanie wstrzymane","card.ai_summary.disclaimer":"Wygenerowane przez AI, może zawierać błędy","card.ai_summary.for_parent":"dla rodzica","card.ai_summary.for_student":"dla ucznia","ai_summary.status.good":"Dobrze","ai_summary.status.ok":"OK","ai_summary.status.caution":"Do uwagi","ai_summary.section.grades":"Oceny","ai_summary.section.attendance":"Frekwencja","ai_summary.section.behaviour":"Zachowanie","ai_summary.section.next_week":"Następny tydzień","ai_summary.section.school_news":"Szkoła pisze","editor.summary_only":"Tylko nagłówek i rady","editor.hide_generate":"Ukryj przycisk Wygeneruj teraz","card.lucky_number.title":"Szczęśliwy numerek","card.lucky_number.subtitle":"Dziś w dzienniku","card.lucky_number.subtitle_for_date":"Na {date}","card.lucky_number.yours_today":"To Twój numerek dzisiaj!","card.lucky_number.yours_for_date":"To Twój numerek na {date}!","card.lucky_number.empty":"Nie opublikowano jeszcze numerka (np. w trakcie przerwy szkolnej)","card.student.title":"Karta ucznia","stat.overall_rating":"ocena ogólna","stat.attendance_score":"Frekwencja","stat.behaviour_score":"Zachowanie","stat.grades_score":"Oceny","stat.activity_score":"Aktywność","card.streak.title":"Passy","card.streak.attendance":"Bez nieobecności","card.streak.behaviour":"Dobre zachowanie","card.streak.grades":"Dobre oceny","label.days":"dni","card.rank.title":"Ranga","card.rank.empty":"Brak jeszcze ocen do wyliczenia rangi","rank.bronze":"Brąz","rank.silver":"Srebro","rank.gold":"Złoto","rank.diamond":"Diament","label.to_next_rank":"do kolejnej rangi","label.top_rank":"Osiągnięto najwyższą rangę","card.achievements.title":"Osiągnięcia","card.achievements.count":"Odblokowano: {n}","card.achievements.empty":"Jeszcze żadnych odznak - pojawią się tu, gdy nowe osiągnięcie odblokuje się przy tej karcie na dashboardzie (wcześniejszych nie da się odzyskać)","card.achievements.next_hint":"Jeszcze {n} do: {title}","card.achievements.closest":"Najbliżej: {title}","card.achievements.of":"z {n}","card.achievements.goals":"Najbliższe cele","card.achievements.recent":"Ostatnio zdobyte","card.achievements.none_yet":"Jeszcze żadnej odznaki.","card.achievements.days":"dni","badge.first_six":"Pierwsza szóstka","badge.sixes":"Kolekcjoner szóstek","badge.good_grade_streak":"Seria dobrych ocen","badge.hat_trick":"Hat-trick","badge.test_ace":"Sprawdzian na 5+","badge.subject_star":"Prymus przedmiotu","badge.honours":"Świadectwo z paskiem","badge.comeback":"Comeback","badge.no_ones":"Semestr bez jedynki","badge.attendance_streak":"Bez nieobecności","badge.full_month":"100% w miesiącu","badge.punctual":"Punktualność","badge.subject_attendance":"Wzorowa frekwencja z przedmiotu","badge.behaviour_streak":"Bez uwagi","badge.praise":"Pochwała","badge.praises":"Seria pochwał","badge.exemplary_behaviour":"Wzorowe zachowanie","badge.lucky":"Szczęśliwy numerek","badge.homework":"Pracowitość","badge.school_year":"Rok ukończony","achievement.first_six":"Pierwsza szóstka!","achievement.good_grade_streak_5":"5 dobrych ocen z rzędu","achievement.good_grade_streak_10":"10 dobrych ocen z rzędu","achievement.good_grade_streak_20":"20 dobrych ocen z rzędu","achievement.attendance_streak_7":"Tydzień bez nieobecności","achievement.attendance_streak_30":"Miesiąc bez nieobecności","achievement.attendance_streak_90":"3 miesiące bez nieobecności","achievement.behaviour_streak_7":"Tydzień bez uwagi","achievement.behaviour_streak_30":"Miesiąc bez uwagi","achievement.behaviour_streak_90":"3 miesiące bez uwagi","card.level.title":"Poziom","card.level.subtitle":"XP za oceny i frekwencję","label.level":"Poziom {n}","label.xp_to_next":"{n} XP do kolejnego poziomu","label.xp_from_grades":"Z ocen","label.xp_from_attendance":"Z frekwencji","label.xp_total":"Suma XP","card.teachers.title":"Nauczyciele","card.teachers.homeroom":"Wychowawca","card.teachers.count":"{n} przedmiotów","card.teachers.empty":"Brak jeszcze katalogu nauczycieli","card.grade_goal.title":"Cel oceny","card.grade_goal.subtitle_overall":"Średnia ogólna","card.grade_goal.empty":"Brak ocen, na których można oprzeć cel","card.grade_goal.reached":"Cel osiągnięty 🎉","label.current":"Teraz","label.target":"Cel","label.to_go":"do celu","label.sixes_needed":"≈ jeszcze {n}× ocena maksymalna","card.bell_schedule.title":"Plan dnia","card.bell_schedule.empty":"Brak rozkładu dzwonków — wymaga ha-librus-synergia z atrybutem bell_schedule","label.lesson_short":"L{n}","label.after_school":"Lekcje na dziś zakończone","editor.hide_room":"Ukryj salę","editor.only_tomorrow":"Tylko następny dzień nauki","editor.student_name":"Imię dla: {device} (opcjonalnie)","card.first_lesson.title":"Pierwsza lekcja","card.first_lesson.today":"Dziś","card.first_lesson.tomorrow":"Jutro","card.first_lesson.earliest_today":"Najwcześniej dziś: {who}","card.first_lesson.earliest_tomorrow":"Najwcześniej jutro: {who}","card.first_lesson.earliest_on":"Najwcześniej ({day}): {who}","card.first_lesson.free":"wolne","card.first_lesson.no_data":"brak planu","card.first_lesson.first_canceled":"pierwsza lekcja odwołana","card.first_lesson.first_n_canceled":"pierwsze lekcje odwołane ({n})","card.first_lesson.substitution":"zastępstwo","card.first_lesson.empty":"Brak lekcji dziś i w następny dzień nauki","card.tomorrow.title":"Jutro","card.tomorrow.title_next_school_day":"Następny dzień nauki","card.tomorrow.empty":"Nic zaplanowanego na następny dzień nauki","card.tomorrow.lessons":"lekcji","card.tomorrow.starts":"Początek","card.tomorrow.ends":"Koniec","card.tomorrow.homework":"Zadania na termin: {n}","card.grade_simulator.subtitle":"A gdyby… (szacunkowo)","card.grade_simulator.empty":"Wybierz przedmiot, który ma oceny","label.weight":"Waga","card.grades.forecast_hint":"Prognoza na świadectwo: {grade}","label.forecast_grade":"prognoza {grade}","card.grade_simulator.subtitle_exact":"Co jeśli… (dokładna średnia)","card.grade_simulator.report":"Na świadectwie:","label.sixes_needed_exact":"{n}× szóstka (waga 1)","label.forecast":"Prognoza","label.forecast_report_average":"Prognoza świadectwa","card.homework_checklist.title":"Zadania do odhaczenia","card.homework_checklist.progress":"{done}/{total} zrobione","card.homework_checklist.file_error":"nie udało się pobrać","card.semester_comparison.title":"Porównanie semestrów","card.semester_comparison.subtitle":"Semestr 1 vs 2, wg przedmiotu","card.semester_comparison.empty":"Brak średnich semestralnych","card.semester_comparison.s1":"Sem 1","card.semester_comparison.s2":"Sem 2","editor.mode":"Tryb","mode.archetype":"Archetyp","mode.hero":"Bohater","card.hero.title_archetype":"Twój archetyp","card.hero.title_hero":"Twój bohater","card.hero.subtitle":"na podstawie danych z Librusa","card.hero.empty":"Za mało danych, żeby coś obliczyć","hero.chip.avg_naukowiec":"śr. ścisłych {n}","hero.chip.avg_humanista":"śr. humanist. {n}","hero.chip.avg_poliglota":"śr. języków {n}","hero.chip.avg_artysta":"śr. artyst. {n}","hero.chip.avg_sportowiec":"śr. WF {n}","hero.chip.grades":"{n} ocen","hero.chip.streak_days":"passa {n} dni","hero.chip.unexcused":"{n} nieuspr.","hero.chip.good_streak":"passa {n} ocen","hero.chip.overall_avg":"śr. {n}","hero.chip.overall_avg_full":"śr. ogólna {n}","hero.chip.semester1":"sem. 1: {n}","hero.chip.semester2":"sem. 2: {n}","hero.chip.behaviour":"zachowanie {name}","hero.chip.positive_notes":"uwagi +{n}","hero.chip.badges":"odznaki {n}","hero.chip.various_categories":"różne kategorie","hero.chip.subjects_count":"{n} przedm.","hero.chip.spread":"rozrzut {n}","hero.naukowiec.archetype_name":"Naukowiec","hero.naukowiec.hero_name":"Archimag","hero.naukowiec.archetype_desc":"Matematyka, fizyka i informatyka biją resztę przedmiotów na głowę.","hero.naukowiec.hero_desc":"Władasz magią liczb - zaklęcia to wzory, różdżka to kalkulator.","hero.humanista.archetype_name":"Humanista","hero.humanista.hero_name":"Bard","hero.humanista.archetype_desc":"Polski i historia to przedmioty, w których błyszczysz najbardziej.","hero.humanista.hero_desc":"Słowo to Twoja broń - opowieścią przekonasz każdego wokół siebie.","hero.poliglota.archetype_name":"Poliglota","hero.poliglota.hero_name":"Tłumacz","hero.poliglota.archetype_desc":"Angielski i niemiecki wyraźnie górują nad resztą przedmiotów.","hero.poliglota.hero_desc":"Znasz więcej języków niż większość dorosłych w Twoim otoczeniu.","hero.artysta.archetype_name":"Artysta","hero.artysta.hero_name":"Iluzjonista","hero.artysta.archetype_desc":"Plastyka i muzyka to obszary, w których jesteś najmocniejszy.","hero.artysta.hero_desc":"Tworzysz światy, które inni potrafią sobie jedynie wyobrazić.","hero.sportowiec.archetype_name":"Sportowiec","hero.sportowiec.hero_name":"Herold Areny","hero.sportowiec.archetype_desc":"Wychowanie fizyczne to zdecydowanie Twoja najmocniejsza strona.","hero.sportowiec.hero_desc":"Siła i wytrwałość - na boisku nikt Ci dziś nie dorównuje.","hero.wojownik.archetype_name":"Wojownik Frekwencji","hero.wojownik.hero_name":"Niezłomny","hero.wojownik.archetype_desc":"Długa passa obecności i zero nieusprawiedliwionych nieobecności.","hero.wojownik.hero_desc":"Stajesz na posterunku każdego dnia, bez wyjątku i bez wymówek.","hero.meteor.archetype_name":"Meteor","hero.meteor.hero_name":"Meteor","hero.meteor.archetype_desc":"Passa dobrych ocen ciągnie się przez ostatnie kilkanaście wpisów.","hero.meteor.hero_desc":"Pędzisz przez semestr, zostawiając za sobą świetlisty ślad ocen.","hero.feniks.archetype_name":"Feniks","hero.feniks.hero_name":"Feniks","hero.feniks.archetype_desc":"Średnia w tym semestrze rośnie wyraźnie względem poprzedniego.","hero.feniks.hero_desc":"Powstajesz z popiołów słabszego startu, silniejszy niż wcześniej.","hero.spolecznik.archetype_name":"Społecznik","hero.spolecznik.hero_name":"Uzdrowiciel","hero.spolecznik.archetype_desc":"Wzorowa ocena zachowania i same pozytywne uwagi nauczycieli.","hero.spolecznik.hero_desc":"Twoja obecność koi nastroje i łagodzi spory całej klasy.","hero.kolekcjoner.archetype_name":"Kolekcjoner","hero.kolekcjoner.hero_name":"Łowca Trofeów","hero.kolekcjoner.archetype_desc":"Najwięcej odblokowanych odznak spośród wszystkich kategorii.","hero.kolekcjoner.hero_desc":"Twoja gablota z trofeami pęka w szwach od zdobytych osiągnięć.","hero.prymus.archetype_name":"Prymus","hero.prymus.hero_name":"Legenda","hero.prymus.archetype_desc":"Wysoka średnia utrzymuje się równo we wszystkich przedmiotach.","hero.prymus.hero_desc":"O Twoich wynikach będą opowiadać jeszcze długo po Twoim odejściu.","hero.wszechstronny.archetype_name":"Wszechstronny Talent","hero.wszechstronny.hero_name":"Awatar Równowagi","hero.wszechstronny.archetype_desc":"Żaden przedmiot nie dominuje - oceny wyrównane na całej linii.","hero.wszechstronny.hero_desc":"Władasz każdym żywiołem po trosze - nic Cię dziś nie zaskoczy.","card.hero_stats.title":"Statystyki bohatera","card.hero_stats.subtitle":"Twoja karta postaci","card.hero_stats.empty":"Za mało danych na statystyki","card.hero_stats.power":"Moc","hero_stat.sila":"Siła","hero_stat.intelekt":"Intelekt","hero_stat.wiedza":"Wiedza","hero_stat.charyzma":"Charyzma","hero_stat.wytrwalosc":"Wytrwałość","hero_stat.szczescie":"Szczęście","card.hero_history.title":"Historia bohatera","card.hero_history.subtitle":"jak zmieniał się Twój wynik","card.hero_history.empty":"Brak historii jeszcze - pojawi się, gdy wynik się zmieni","card.hero_history.current":"obecnie ({n} dni)","card.grades.points_percentage":"{value}% punktów","card.last_update.subtitle":"Ostatnia aktualizacja danych","card.last_update.not_responding":"Librus nie odpowiada · następna próba {time}","label.just_now":"Przed chwilą","label.minutes_ago":"{minutes} min temu","label.hours_ago":"{hours} godz. temu","label.days_ago":"{days} dni temu"}};function je(e,t,a){let i=function(e){const t=e?.language??"en",a=t.split("-")[0]?.toLowerCase();return ze[a]??$e}(e)[t]??$e[t];if(a)for(const[e,t]of Object.entries(a))i=i.replace(`{${e}}`,String(t));return i}function Ce(e,t){const a=Math.max(0,Math.round(t));if(a<60)return je(e,"label.in_minutes",{minutes:a});if(a<1440){const t=Math.floor(a/60),i=a%60;return 0===i?je(e,"label.in_hours",{hours:t}):je(e,"label.in_hours_minutes",{hours:t,minutes:i})}const i=Math.floor(a/1440),s=Math.floor(a%1440/60);return 0===s?je(e,"label.in_days",{days:i}):je(e,"label.in_days_hours",{days:i,hours:s})}var Se;const De=[{kind:"text",key:"icon",label:"editor.icon"},{kind:"color"},{kind:"boolean",key:"hide_header",label:"editor.hide_header"},{kind:"boolean",key:"hide_icon",label:"editor.hide_icon"},{kind:"boolean",key:"hide_subtitle",label:"editor.hide_subtitle"},{kind:"boolean",key:"compact",label:"editor.compact"},{kind:"boolean",key:"hide_outage_warning",label:"editor.hide_outage_warning"}],Te=[{color:"#4f46e5",label:"editor.accent_default"},{color:"#e91e63",label:"editor.accent_pink"},{color:"#7e57c2",label:"editor.accent_purple"},{color:"#009688",label:"editor.accent_teal"},{color:"#43a047",label:"editor.accent_green"},{color:"#ff7043",label:"editor.accent_orange"}],Ne=new Set(["custom:librus-announcements-tile-card","custom:librus-attendance-tile-card","custom:librus-behaviour-notices-tile-card","custom:librus-free-days-tile-card","custom:librus-last-update-tile-card","custom:librus-messages-tile-card","custom:librus-next-lesson-tile-card","custom:librus-student-card"]),Ie=new Set(["announcements-tile","attendance-tile","behaviour-notices-tile","bell-schedule","exam-countdown","free-days-tile","grade-goal","lucky-number","messages-tile","next-lesson-tile","rank","school-year","streak","student","today","week-summary"].map(e=>`custom:librus-${e}-card`)),Ee=[{value:"archetype",label:"mode.archetype"},{value:"hero",label:"mode.hero"}],Ae={kind:"text",key:"category_filter",label:"editor.category_filter"},Me={kind:"select",key:"sort",label:"editor.sort",options:[{value:"newest",label:"sort.newest"},{value:"oldest",label:"sort.oldest"}]},Le={kind:"number",key:"days",label:"editor.days_back",min:7,max:365},Pe={kind:"text",key:"title",label:"editor.title"},Fe=e=>({kind:"number",key:"max_items",label:"editor.max_items",min:1,max:e}),Be={"custom:librus-lesson-topics-card":[Pe,{kind:"number",key:"days",label:"editor.school_days_shown",min:1,max:10}],"custom:librus-school-trips-card":[Pe,Fe(10)],"custom:librus-exam-prep-card":[Pe,{kind:"number",key:"days_ahead",label:"editor.days_ahead",min:1,max:60}],"custom:librus-school-documents-card":[Pe,Fe(20)],"custom:librus-justifications-card":[Pe,Fe(10)],"custom:librus-catch-up-card":[Pe],"custom:librus-month-calendar-card":[Pe],"custom:librus-substitutions-card":[Pe,{kind:"number",key:"days_ahead",label:"editor.days_ahead",min:1,max:30},{kind:"boolean",key:"show_past",label:"editor.show_past"},Fe(30)],"custom:librus-grade-log-card":[Pe,Fe(100),Ae,Le,Me,{kind:"boolean",key:"show_descriptive",label:"editor.show_descriptive"},{kind:"boolean",key:"hide_teacher",label:"editor.hide_teacher"}],"custom:librus-descriptive-grades-card":[{kind:"boolean",key:"hide_teacher",label:"editor.hide_teacher"}],"custom:librus-recent-activity-card":[Pe,Fe(50)],"custom:librus-subject-attendance-card":[Pe],"custom:librus-report-card-card":[Pe],"custom:librus-school-day-card":[Pe],"custom:librus-homework-checklist-card":[Pe,Fe(30)],"custom:librus-announcements-card":[Pe,Fe(20)],"custom:librus-agenda-card":[Pe,{kind:"number",key:"days_ahead",label:"editor.days_ahead",min:1,max:60}],"custom:librus-messages-card":[Pe,{kind:"select",key:"mailbox",label:"editor.mailbox",options:[{value:"inbox",label:"mailbox.inbox"},{value:"substitutions",label:"mailbox.substitutions"},{value:"alerts",label:"mailbox.alerts"},{value:"justifications",label:"mailbox.justifications"},{value:"outbox",label:"mailbox.outbox"},{value:"archive",label:"mailbox.archive"}]},Fe(20)],"custom:librus-grade-trend-card":[{kind:"subject"},{kind:"number",key:"days",label:"editor.days_back",min:7,max:180},Pe],"custom:librus-subject-grades-card":[{kind:"subject"},Fe(100),Ae,Le,Me],"custom:librus-grade-goal-card":[{kind:"subject"},{kind:"number",key:"target",label:"editor.target",min:1,max:6,float:!0},Pe],"custom:librus-bell-schedule-card":[Pe],"custom:librus-tomorrow-card":[Pe],"custom:librus-first-lesson-card":[Pe,{kind:"boolean",key:"hide_room",label:"editor.hide_room"},{kind:"boolean",key:"only_tomorrow",label:"editor.only_tomorrow"},{kind:"names"}],"custom:librus-grade-simulator-card":[{kind:"subject"}],"custom:librus-semester-comparison-card":[Pe],"custom:librus-week-timetable-card":[{kind:"boolean",key:"show_saturday",label:"editor.show_saturday"}],"custom:librus-subject-time-card":[{kind:"boolean",key:"show_saturday",label:"editor.show_saturday"}],"custom:librus-exam-countdown-card":[Pe,{kind:"text",key:"exam_keywords",label:"editor.exam_keywords"}],"custom:librus-hero-card":[Pe,{kind:"select",key:"mode",label:"editor.mode",options:Ee}],"custom:librus-hero-history-card":[Pe,{kind:"select",key:"mode",label:"editor.mode",options:Ee}],"custom:librus-achievements-card":[Pe],"custom:librus-hero-stats-card":[Pe],"custom:librus-level-card":[Pe],"custom:librus-rank-card":[Pe],"custom:librus-teachers-card":[Pe],"custom:librus-ai-summary-card":[Pe,{kind:"boolean",key:"summary_only",label:"editor.summary_only"},{kind:"boolean",key:"hide_generate",label:"editor.hide_generate"}]},Oe=e=>`custom:librus-${e}-card`;function Ke(e,t){for(const a of e){const e=Be[Oe(a)]??=[],i="key"in t?t.key:void 0;e.some(e=>"key"in e&&e.key===i)||e.push(t)}}function Ue(){return document.createElement("librus-card-editor")}Ke(["agenda","behaviour-notices","homework-assignments","teachers","substitutions","descriptive-grades","hero-history"],Fe(50)),Ke(["exam-countdown","free-days"],{kind:"number",key:"max_items",label:"editor.more_items",min:0,max:20}),Ke(["announcements","messages","recent-activity","behaviour-notices","descriptive-grades"],Me),Ke(["grade-log","subject-grades","descriptive-grades","latest-grade","behaviour-grade"],{kind:"boolean",key:"hide_comments",label:"editor.hide_comments"}),Ke(["bell-schedule","today-lessons","tomorrow"],{kind:"boolean",key:"hide_room",label:"editor.hide_room"}),Ke(["attendance","attendance-heatmap","attendance-subject","attendance-weekday","grades-radar","subject-attendance"],{kind:"boolean",key:"hide_legend",label:"editor.hide_legend"}),Ke(["agenda","announcements","behaviour-notices","descriptive-grades","grade-log","grades","hero-history","homework-assignments","homework-checklist","lesson-topics","messages","recent-activity","subject-grades","substitutions","teachers","tomorrow"],{kind:"number",key:"list_height",label:"editor.list_height",min:120,max:1200});let Re=Se=class extends de{setConfig(e){this._config=e}get _fields(){return this._config&&Be[this._config.type]||[]}get _addsTitle(){const e=this._config?.type??"";return!Ne.has(e)&&!this._fields.some(e=>"key"in e&&"title"===e.key)}get _commonFields(){const e=this._config?.type??"",t=new Set(["hide_header","hide_icon","hide_subtitle"]),a=Ne.has(e)?De.filter(e=>!("key"in e&&t.has(e.key))):[...De];return Ie.has(e)&&a.push({kind:"action"}),a}render(){if(!this.hass||!this._config)return G;const e=this.hass,t=this._config,a=fe(e),i=this._fields,s=i.some(e=>"subject"===e.kind);let r;try{r=ye(e,t.device_id)}catch{r=void 0}const o=s&&r?xe(e,r,"subject_average"):[];return W`
      <div class="form">
        ${a.length>1&&!i.some(e=>"names"===e.kind)?W`
              <ha-select
                label=${je(e,"editor.student")}
                .value=${t.device_id??""}
                .options=${a.map(t=>{const a=e.devices?.[t];return{value:t,label:a?.name_by_user||a?.name||t}})}
                naturalMenuWidth
                fixedMenuPosition
                @selected=${e=>this._pickDevice(e)}
                @closed=${e=>{e.stopPropagation(),this._pickDevice(e)}}
              >
                ${a.map(t=>{const a=e.devices?.[t];return W`<ha-list-item .value=${t}>${a?.name_by_user||a?.name||t}</ha-list-item>`})}
              </ha-select>
            `:G}
        ${s?W`
              <ha-select
                label=${je(e,"editor.subject")}
                .value=${void 0!==t.subject_id?String(t.subject_id):""}
                .options=${[{value:"",label:je(e,"editor.subject_auto")},...o.filter(e=>void 0!==e.subjectId).map(e=>({value:String(e.subjectId),label:e.subject}))]}
                naturalMenuWidth
                fixedMenuPosition
                @selected=${e=>this._pickSubject(e)}
                @closed=${e=>{e.stopPropagation(),this._pickSubject(e)}}
              >
                <ha-list-item .value=${""}>${je(e,"editor.subject_auto")}</ha-list-item>
                ${o.map(e=>void 0!==e.subjectId?W`<ha-list-item .value=${String(e.subjectId)}>${e.subject}</ha-list-item>`:G)}
              </ha-select>
            `:G}
        ${this._addsTitle?this._renderField(Pe):G}
        ${i.map(e=>this._renderField(e))}
        <div class="section">${je(e,"editor.appearance")}</div>
        ${this._commonFields.map(e=>this._renderField(e))}
      </div>
    `}_renderField(e){if("subject"===e.kind)return G;const t=this.hass,a=this._config;if("action"===e.kind)return W`
        <ha-selector
          .hass=${t}
          .selector=${{ui_action:{}}}
          .label=${je(t,"editor.tap_action")}
          .value=${a.tap_action}
          @value-changed=${e=>this._patch({tap_action:e.detail.value||void 0})}
        ></ha-selector>
      `;if("color"===e.kind){const e=a.accent_color??"",i=""!==e&&"undefined"!=typeof CSS&&CSS.supports("color",e);return W`
        <div class="color-field">
          ${this._input(je(t,"editor.accent_color"),e,e=>this._onText("accent_color",e),{},W`<span
              class="preview ${i?"":"none"}"
              style=${i?`background:${e}`:""}
            ></span>`)}
          <div class="swatches">
            ${Te.map((a,i)=>{const s=0===i?!e:e.toLowerCase()===a.color;return W`<button
                type="button"
                class="swatch ${s?"selected":""}"
                style="background:${a.color}"
                title=${je(t,a.label)}
                aria-label=${je(t,a.label)}
                @click=${()=>this._patch({accent_color:0===i?void 0:a.color})}
              ></button>`})}
          </div>
        </div>
      `}if("names"===e.kind)return W`${fe(t).map(e=>{const i=t.devices?.[e];return W`
          ${this._input(je(t,"editor.student_name",{device:i?.name_by_user||i?.name||e}),a.names?.[e]??"",t=>this._onName(e,t))}
        `})}`;if("text"===e.kind)return this._input(je(t,e.label),a[e.key]??"",t=>this._onText(e.key,t));if("boolean"===e.kind){const i=t=>this._patch({[e.key]:t.target.checked||void 0});return customElements.get("ha-formfield")?W`
        <ha-formfield label=${je(t,e.label)}>
          <ha-switch .checked=${Boolean(a[e.key])} @change=${i}></ha-switch>
        </ha-formfield>
      `:W`
          <ha-switch .checked=${Boolean(a[e.key])} @change=${i}
            >${je(t,e.label)}</ha-switch
          >
        `}return"number"===e.kind?this._input(je(t,e.label),void 0!==a[e.key]?String(a[e.key]):"",t=>this._onNumber(e,t),{type:"number",min:e.min,max:e.max,step:e.float?"0.05":"1"}):W`
      <ha-select
        label=${je(t,e.label)}
        .value=${a[e.key]??e.options[0].value}
        .options=${e.options.map(e=>({value:e.value,label:je(t,e.label)}))}
        naturalMenuWidth
        fixedMenuPosition
        @selected=${t=>this._pickSelect(e,t)}
        @closed=${t=>{t.stopPropagation(),this._pickSelect(e,t)}}
      >
        ${e.options.map(e=>W`<ha-list-item .value=${e.value}>${je(t,e.label)}</ha-list-item>`)}
      </ha-select>
    `}_input(e,t,a,i={},s){let r=t;const o=e=>{const t=String(e.currentTarget?.value??"");t!==r&&(r=t,a(t))},n=e=>{"Enter"===e.key&&o(e)};return customElements.get("ha-input")?W`
        <ha-input
          .label=${e}
          .value=${t}
          .type=${i.type??"text"}
          .min=${i.min}
          .max=${i.max}
          .step=${i.step}
          ?without-spin-buttons=${"number"===i.type}
          @change=${o}
          @focusout=${o}
          @keydown=${n}
          >${s?W`<span slot="end">${s}</span>`:G}</ha-input
        >
      `:customElements.get("ha-textfield")?W`
        <ha-textfield
          label=${e}
          .value=${t}
          type=${i.type??"text"}
          ?no-spinner=${"number"===i.type}
          min=${i.min??""}
          max=${i.max??""}
          step=${i.step??""}
          @change=${o}
          @focusout=${o}
          @keydown=${n}
        ></ha-textfield>
        ${s?W`<span class="end-outside">${s}</span>`:G}
      `:W`
      <label class="plain">
        <span>${e}</span>
        <input
          .value=${t}
          type=${i.type??"text"}
          min=${i.min??""}
          max=${i.max??""}
          step=${i.step??""}
          @change=${o}
          @keydown=${n}
        />
        ${s?W`<span class="end-outside">${s}</span>`:G}
      </label>
    `}static _selectValue(e){const t=e.detail;if(t&&void 0!==t.value)return String(t.value);const a=e.currentTarget;return a?.value??""}_pickDevice(e){const t=Se._selectValue(e);t&&t!==this._config?.device_id&&this._patch({device_id:t})}_pickSubject(e){const t=Se._selectValue(e),a=""===t?void 0:Number(t);a!==this._config?.subject_id&&this._patch({subject_id:Number.isNaN(a)?void 0:a})}_pickSelect(e,t){const a=Se._selectValue(t);if(!a)return;a!==(this._config?.[e.key]??e.options[0].value)&&this._patch({[e.key]:a===e.options[0].value?void 0:a})}_onName(e,t){const a={...this._config?.names??{}};t.trim()?a[e]=t.trim():delete a[e],this._patch({names:Object.keys(a).length?a:void 0})}_onText(e,t){this._patch({[e]:t.trim()||void 0})}_onNumber(e,t){const a=e.float?Number.parseFloat(t):Number.parseInt(t,10);if(Number.isNaN(a))return void this._patch({[e.key]:void 0});const i=Math.min(e.max,Math.max(e.min,a));this._patch({[e.key]:e.float?Math.round(100*i)/100:i})}_patch(e){if(!this._config)return;const t={...this._config,...e};for(const[a,i]of Object.entries(e))void 0===i&&delete t[a];this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t},bubbles:!0,composed:!0}))}};function We(e){const t=new Date(e);return Number.isNaN(t.getTime())?"":t.toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"})}function He(e,t){const a=new Date(`${e.slice(0,10)}T00:00:00`);return Number.isNaN(a.getTime())?e:a.toLocaleDateString(t,{day:"numeric",month:"short"})}function qe(e,t){const a=Date.UTC(e.getFullYear(),e.getMonth(),e.getDate()),i=Date.UTC(t.getFullYear(),t.getMonth(),t.getDate());return Math.round((i-a)/864e5)}function Ge(e,t){return Math.max(0,Math.floor((e.getTime()-t.getTime())/6e4))}function Je(e){if(null==e)return null;const t=Number(e);return Number.isFinite(t)?t:null}Re.styles=o`
    .form {
      display: flex;
      flex-direction: column;
      gap: 12px;
      padding: 4px 0;
    }
    ha-select,
    ha-input,
    ha-textfield {
      width: 100%;
    }
    label.plain {
      display: flex;
      flex-direction: column;
      gap: 4px;
      font-size: 0.85rem;
      color: var(--secondary-text-color);
    }
    label.plain input {
      font: inherit;
      color: var(--primary-text-color);
      background: var(--card-background-color, transparent);
      border: 1px solid var(--divider-color);
      border-radius: 6px;
      padding: 8px 10px;
    }
    .section {
      margin-top: 6px;
      padding-top: 12px;
      border-top: 1px solid var(--divider-color);
      font-size: 0.72rem;
      font-weight: 700;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      color: var(--secondary-text-color);
    }
    .color-field {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .preview {
      display: inline-block;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      margin-inline-end: 4px;
      vertical-align: middle;
      box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.15);
    }
    .preview.none {
      background: repeating-conic-gradient(var(--divider-color) 0 25%, transparent 0 50%) 50% / 8px 8px;
    }
    .end-outside {
      align-self: flex-end;
    }
    .swatches {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }
    .swatch {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      border: none;
      padding: 0;
      cursor: pointer;
      box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.15);
    }
    .swatch.selected {
      outline: 2px solid var(--primary-text-color);
      outline-offset: 2px;
    }
  `,e([ge({attribute:!1})],Re.prototype,"hass",void 0),e([me()],Re.prototype,"_config",void 0),Re=Se=e([he("librus-card-editor")],Re);const Ze=/^\[([^\]]+)\]\s*/;function Ye(e){const t=Ze.exec(e);return t?{category:t[1],text:e.slice(t[0].length)}:{category:null,text:e}}class Ve extends de{constructor(){super(...arguments),this._fetchGeneration=0}_beginFetch(){return++this._fetchGeneration}_isCurrentFetch(e){return e===this._fetchGeneration}_resolveAllByTranslationKey(e,t){if(!this.hass)return[];let a=this._subjectsCache;a&&a.entities===this.hass.entities&&a.deviceId===e||(a={entities:this.hass.entities,deviceId:e,byKey:new Map},this._subjectsCache=a);let i=a.byKey.get(t);return i||(i=xe(this.hass,e,t),a.byKey.set(t,i)),i}get _cardConfig(){return this._config}_syncTheme(){const e=Boolean(this.hass?.themes?.darkMode);this.classList.toggle("dark",e);const t=this._cardConfig;this.classList.toggle("compact",Boolean(t?.compact)),this.classList.toggle("hide-header",Boolean(t?.hide_header)),this.classList.toggle("hide-icon",Boolean(t?.hide_icon)),this.classList.toggle("hide-subtitle",Boolean(t?.hide_subtitle)),this.classList.toggle("hide-legend",Boolean(t?.hide_legend)),this.classList.toggle("hide-comments",Boolean(t?.hide_comments)),this._syncAccent(t?.accent_color,e);const a=t?.list_height;a&&a>0?this.style.setProperty("--lc-list-height",`${a}px`):this.style.removeProperty("--lc-list-height")}_syncAccent(e,t){const a=["--lc-brand","--lc-brand-strong","--lc-brand-bg","--lc-ring-track","--lc-chip-bg"],i=e?.trim();if(!i||"undefined"!=typeof CSS&&!CSS.supports("color",i)){for(const e of a)this.style.removeProperty(e);return}const s=(e,t)=>`color-mix(in srgb, ${i} ${e}%, ${t})`;this.style.setProperty("--lc-brand",i),this.style.setProperty("--lc-brand-strong",t?s(70,"white"):s(75,"black")),this.style.setProperty("--lc-brand-bg",s(t?18:14,"transparent")),this.style.setProperty("--lc-ring-track",s(t?24:16,"transparent")),this.style.setProperty("--lc-chip-bg",s(6,"transparent"))}updated(e){super.updated(e),this._syncOutageStrip();const t=this._cardConfig?.icon;if(!t)return;const a=this.renderRoot.querySelector(".icon-badge ha-icon");a&&a.getAttribute("icon")!==t&&a.setAttribute("icon",t)}_syncOutageStrip(){const e=this.renderRoot,t=e.querySelector(".lc-outage"),a=this._outageText(),i=e.querySelector(".header");if(!a||!i)return void t?.remove();const s=t??document.createElement("div");if(t||(s.className="lc-outage",s.setAttribute("role","status")),s.dataset.text!==a.join("|")){s.dataset.text=a.join("|");const e=document.createElement("ha-icon");e.setAttribute("icon","mdi:cloud-alert-outline");const t=document.createElement("b");t.textContent=a[0];const i=document.createElement("span");i.textContent=`· ${a[1]}`,s.replaceChildren(e,t,i)}s.previousElementSibling!==i&&i.after(s)}_outageText(){if(!this.hass||this._cardConfig?.hide_outage_warning)return null;const e=this._resolveEntities();if("error"in e)return null;const t=e.map.status,a=t?this.hass.states[t]:void 0;if("stale"!==a?.state)return null;const i=a.attributes.last_success;return[je(this.hass,"outage.title"),je(this.hass,"outage.data_from",{time:Xe("string"==typeof i?i:void 0,this.hass.language)})]}_resolveEntities(){if(!this.hass)return{error:this._message("mdi:alert-circle-outline",je(this.hass,"empty.loading"))};const e=this._resolvedCache;if(e&&e.entities===this.hass.entities&&e.configuredDeviceId===this._configuredDeviceId)return e.result;let t;try{const e=ye(this.hass,this._configuredDeviceId);t={deviceId:e,map:we(this.hass,e)}}catch(e){t={error:this._message("mdi:alert-circle-outline",this._configErrorMessage(e))}}return this._resolvedCache={entities:this.hass.entities,configuredDeviceId:this._configuredDeviceId,result:t},t}_configErrorMessage(e){return e instanceof _e?"device_missing"===e.code?je(this.hass,"error.device_missing",{device:e.deviceId??""}):"multiple_devices"===e.code?je(this.hass,"error.multiple_devices"):je(this.hass,"error.no_device"):je(this.hass,"empty.generic_error")}_message(e,t,a){return W`
      <ha-card class="static">
        <div class="empty">
          <ha-icon .icon=${e}></ha-icon>
          <div class="t1">${t}</div>
          ${a?W`<div class="t2">${a}</div>`:G}
        </div>
      </ha-card>
    `}}function Xe(e,t){if(!e)return"?";const a=new Date(e);if(Number.isNaN(a.getTime()))return"?";const i=We(e),s=new Date;if(a.getFullYear()===s.getFullYear()&&a.getMonth()===s.getMonth()&&a.getDate()===s.getDate())return i;return`${He(`${a.getFullYear()}-${String(a.getMonth()+1).padStart(2,"0")}-${String(a.getDate()).padStart(2,"0")}`,t)} ${i}`}e([ge({attribute:!1})],Ve.prototype,"hass",void 0);const Qe=o`
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
`,et=o`
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
  :host(.hide-icon) .header .icon-badge {
    display: none;
  }
  :host(.hide-subtitle) .subtitle {
    display: none;
  }
  :host(.hide-legend) .legend,
  :host(.hide-legend) .heatmap-legend {
    display: none;
  }
  :host(.hide-comments) .quote,
  :host(.hide-comments) .comment {
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

  /* Point grades in the grade lists ("17/20 85%") - see pointGradeEntries. */
  .grade-chip.points {
    gap: 4px;
    padding: 0 7px;
    font-variant-numeric: tabular-nums;
  }
  .grade-chip.points small {
    font-weight: 500;
    font-size: 0.68rem;
    opacity: 0.75;
  }
  .grade-chip.pt-good {
    background: var(--lc-good-bg);
    color: var(--lc-good);
  }
  .grade-chip.pt-bad {
    background: var(--lc-bad-bg);
    color: var(--lc-bad);
  }

  /* "Librus not responding" strip, inserted after .header by LibrusBaseCard. */
  .lc-outage {
    display: flex;
    align-items: center;
    gap: 7px;
    background: var(--lc-warn-bg);
    color: var(--lc-warn);
    border: 1px solid color-mix(in srgb, var(--lc-warn) 35%, transparent);
    border-radius: 8px;
    padding: 6px 10px;
    font-size: 0.78rem;
    line-height: 1.3;
  }
  .lc-outage b {
    font-weight: 500;
  }
  .lc-outage span {
    color: var(--primary-text-color);
    opacity: 0.8;
  }
  .lc-outage ha-icon {
    --mdc-icon-size: 15px;
    flex: none;
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
    max-height: var(--lc-list-height, 320px);
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
  /* Timetable lessons Librus marks as cancelled / substitution
     (utils/calendar.ts lessonInfo): a struck-through, dimmed row or cell,
     and a small tag after the subject. */
  .lesson-cancelled {
    opacity: 0.55;
  }
  .lesson-cancelled .lesson-name {
    text-decoration: line-through;
  }
  .lesson-tag {
    display: inline-block;
    font-size: 0.66rem;
    font-weight: 700;
    padding: 1px 6px;
    border-radius: 999px;
    margin-left: 6px;
    vertical-align: 1px;
    text-decoration: none;
    white-space: nowrap;
  }
  .lesson-tag.cancelled {
    background: var(--lc-bad-bg);
    color: var(--lc-bad);
  }
  .lesson-tag.substitution {
    background: var(--lc-warn-bg);
    color: var(--lc-warn);
  }
  .lesson-tag.room {
    background: var(--lc-brand-bg);
    color: var(--lc-brand);
  }

  .stat-label {
    font-size: 0.66rem;
    color: var(--secondary-text-color);
    text-transform: uppercase;
    letter-spacing: 0.04em;
    /* A long single word in a narrow tile wraps instead of running into
       the next tile (found live: "NIEUSPRAWIEDLIWIONE"). */
    overflow-wrap: anywhere;
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
    max-width: 46ch;
  }
`;function tt(e){const t=Math.max(1,...e.map(e=>e.value));return W`
    <div class="hbar-chart">
      ${e.map(e=>W`
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
  `}function at(e,t,a=64,i=6){const s=Math.max(0,Math.min(100,e)),r=(a-i)/2,o=2*Math.PI*r,n=a/2;return W`
    <svg width=${a} height=${a} viewBox="0 0 ${a} ${a}" class="ring">
      <circle
        cx=${n}
        cy=${n}
        r=${r}
        fill="none"
        stroke="var(--lc-ring-track)"
        stroke-width=${i}
      ></circle>
      <circle
        cx=${n}
        cy=${n}
        r=${r}
        fill="none"
        stroke=${t}
        stroke-width=${i}
        stroke-linecap="round"
        stroke-dasharray=${o}
        stroke-dashoffset=${o-s/100*o}
        transform="rotate(-90 ${n} ${n})"
      ></circle>
    </svg>
  `}function it(e,t){if(t.cancelled)return W`<span class="lesson-tag cancelled">${je(e,"label.lesson_cancelled")}</span>`;const a=[];return t.substitution&&a.push(W`<span class="lesson-tag substitution">${je(e,"label.lesson_substitution")}</span>`),t.moved&&a.push(W`<span class="lesson-tag substitution">${je(e,"label.lesson_moved")}</span>`),t.roomChange&&a.push(W`<span class="lesson-tag room"
        >${t.rooms?je(e,"label.lesson_room_change",{from:t.rooms[0],to:t.rooms[1]}):je(e,"label.lesson_room_changed")}</span
      >`),a.length?W`${a}`:G}const st=[1.75,2.75,3.75,4.75,5.5];function rt(e){const t=e?.attributes;if(!t||null===t.predicted_grade||void 0===t.predicted_grade)return;const a=t.sixes_to_next_grade;return{predicted:Number(t.predicted_grade),average:Number(t.forecast_average),weight:Number(t.forecast_weight),declining:!0===t.forecast_declining,sixesToNext:null==a?void 0:Number(a)}}let ot=class extends Ve{static getConfigElement(){return Ue()}static getStubConfig(){return{type:"custom:librus-grades-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 3}render(){if(!this._config||!this.hass)return G;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{deviceId:t,map:a}=e,i=this.hass,s=a.overall_average?i.states[a.overall_average]:void 0,r=this._resolveAllByTranslationKey(t,"subject_average").map(e=>{const t=i.states[e.entityId],a=t?.attributes.points_percentage,s=t&&be.has(t.state)&&"number"==typeof a?a:void 0;return{...e,state:t,points:s}}).filter(e=>e.state&&(!be.has(e.state.state)||void 0!==e.points));if((!s||be.has(s.state))&&0===r.length)return this._message("mdi:school-outline",je(i,"card.grades.empty"));const o=s&&!be.has(s.state)?Number(s.state):void 0,n=r.filter(e=>void 0===e.points).map(e=>Number(e.state.state)),c=n.length?Math.max(...n):6;return W`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:school-outline"></ha-icon></div>
          <div class="title-block">
            <div class="title">${this._config?.title??je(i,"card.grades.title")}</div>
            <div class="subtitle">${je(i,"card.grades.subtitle")}</div>
          </div>
        </div>

        ${void 0!==o?W`
              <div class="ring-row">
                ${at(o/6*100,"var(--lc-brand)",68,7)}
                <div>
                  <div class="ring-num">${o.toLocaleString(i.language,{maximumFractionDigits:2})}</div>
                  <div class="ring-label">${je(i,"card.grades.subtitle")}</div>
                </div>
              </div>
            `:G}
        ${r.length?W`
              <div class="sub-list">
                ${r.map(e=>{if(void 0!==e.points)return W`
                      <div class="sub-row">
                        <span class="name" title=${e.subject}>${e.subject}</span>
                        <span class="bar"><span style="width:${Math.min(100,e.points)}%"></span></span>
                        <span class="val">${e.points.toLocaleString(i.language,{maximumFractionDigits:1})}%</span>
                      </div>
                    `;const t=Number(e.state.state),a=rt(e.state);return W`
                    <div class="sub-row">
                      <span class="name" title=${e.subject}>${e.subject}</span>
                      <span class="bar"
                        ><span
                          style="width:${Math.min(100,t/c*100)}%"
                        ></span
                      ></span>
                      <span class="val">${t.toLocaleString(i.language,{maximumFractionDigits:2})}</span>
                      ${a?W`<span
                            class="fc ${function(e){return e.predicted<=1?"bad":e.declining?"warn":"ok"}(a)}"
                            title=${je(i,"card.grades.forecast_hint",{grade:a.predicted})}
                            >${a.predicted}</span
                          >`:G}
                    </div>
                  `})}
              </div>
            `:G}
      </ha-card>
    `}};function nt(e){return"string"==typeof e?{value:e,allDay:e.length<=10}:e.date?{value:e.date,allDay:!0}:{value:e.dateTime??"",allDay:!1}}async function ct(e,t,a,i){const s=`calendars/${t}?start=${encodeURIComponent(a.toISOString())}&end=${encodeURIComponent(i.toISOString())}`,r=await e.callApi("GET",s);return Array.isArray(r)?r.map(e=>{const t=nt(e.start),a=nt(e.end);return{start:t.value,end:a.value,allDay:t.allDay,summary:e.summary??"",description:e.description,location:e.location}}):[]}ot.styles=[Qe,et,o`
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
        max-height: var(--lc-list-height, 220px);
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
      .sub-row .fc {
        flex: none;
        width: 20px;
        height: 20px;
        border-radius: 6px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        font-size: 0.72rem;
        font-weight: 800;
        background: var(--divider-color);
        color: var(--primary-text-color);
      }
      .sub-row .fc.warn {
        background: var(--lc-warn-bg);
        color: var(--lc-warn);
      }
      .sub-row .fc.bad {
        background: var(--lc-bad-bg);
        color: var(--lc-bad);
      }
      .sub-row .val {
        font-size: 0.76rem;
        font-weight: 800;
        width: 32px;
        text-align: right;
        font-variant-numeric: tabular-nums;
      }
    `],e([me()],ot.prototype,"_config",void 0),ot=e([he("librus-grades-card")],ot);const dt=/\s*\((odwołane|zastępstwo|zmiana sali|przeniesiona)\)\s*$/i,lt=/^Zmiana sali:\s*(.+?)\s*→\s*(.+)$/;function ht(e){const t=dt.exec(e.summary)?.[1]?.toLowerCase(),a=e.summary.replace(dt,""),i=(e.description??"").split("\n").map(e=>e.trim()),s=i.slice(1).filter(Boolean),r=s.map(e=>lt.exec(e)).find(Boolean);return{name:a,cancelled:"odwołane"===t,substitution:"zastępstwo"===t,roomChange:"zmiana sali"===t||Boolean(r),moved:"przeniesiona"===t,teacher:i[0]||void 0,details:s,rooms:r?[r[1],r[2]]:void 0}}function ut(e,t=ht(e),a=!1){return[a?void 0:e.location,t.teacher,...t.details.filter(e=>!lt.test(e))].filter(Boolean).join(" · ")}function pt(e,t){if(e.allDay)return!1;const a=new Date(e.start).getTime(),i=new Date(e.end).getTime(),s=t.getTime();return s>=a&&s<i}function gt(e,t){return(e.allDay?new Date(`${e.end}T23:59:59`):new Date(e.end)).getTime()<t.getTime()}function mt(e){return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`}function vt(e){const t=e.getDay();return 0===t?7:t}function bt(e){const t=new Date(e);return t.setDate(t.getDate()-(vt(e)-1)),t.setHours(0,0,0,0),t}function _t(e){const t=new Date(e),a=vt(e),i=a>=6?8-a:1-a;return t.setDate(t.getDate()+i),t.setHours(0,0,0,0),t}function ft(e){const t=Array.isArray(e?.grades)?e?.grades:e?.recent;return Array.isArray(t)?t.map(e=>({subject:e.subject??"",value:e.value,category:e.skill??null,date:e.date,comments:e.comments??[],teacher:e.teacher??null,descriptive:!0})):[]}function yt(e){const t=e?.text_grades;return Array.isArray(t)?t.map(e=>({value:"✎",category:e.category,date:e.date,comments:e.value?[e.value]:[],text:!0})):[]}function wt(e){const t=e?.point_grades;return Array.isArray(t)?t.map(e=>({value:null!==e.points&&e.max_points?`${xt(e.points)}/${xt(e.max_points)}`:e.value,category:e.category,date:e.date,comments:[],percentage:e.percentage,points:!0})):[]}function xt(e){return Number.isInteger(e)?String(e):e.toFixed(1).replace(".",",")}function kt(e){return null==e?"":e>=75?"pt-good":e<50?"pt-bad":""}function $t(e,t){let a=e;const i=(t.category_filter??"").split(",").map(e=>e.trim().toLowerCase()).filter(Boolean);if(i.length&&(a=a.filter(e=>{const t=(e.category??"").toLowerCase();return i.some(e=>t.includes(e))})),t.days){const e=new Date;e.setHours(0,0,0,0),e.setDate(e.getDate()-t.days);const i=mt(e);a=a.filter(e=>!e.date||e.date>=i)}const s=[...a].sort((e,t)=>(e.date??"").localeCompare(t.date??""));return"oldest"===t.sort?s:s.reverse()}let zt=class extends Ve{static getConfigElement(){return Ue()}static getStubConfig(){return{type:"custom:librus-grade-log-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 4}render(){if(!this._config||!this.hass)return G;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{deviceId:t,map:a}=e,i=this.hass,s=[];for(const e of this._resolveAllByTranslationKey(t,"subject_average")){const t=i.states[e.entityId]?.attributes,a=[...t?.grades??[],...wt(t),...yt(t)];for(const t of a)s.push({...t,subject:e.subject})}if(this._config.show_descriptive&&a.descriptive_grades&&s.push(...ft(i.states[a.descriptive_grades]?.attributes)),0===s.length)return this._message("mdi:notebook-multiple",je(i,"card.grades.empty"));const r=$t(s,this._config);if(0===r.length)return this._message("mdi:notebook-multiple",je(i,"card.grade_log.empty_filtered"));const o=this._config.max_items??25;return W`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:notebook-multiple"></ha-icon></div>
          <div class="title-block">
            <div class="title">${this._config.title??je(i,"card.grade_log.title")}</div>
            <div class="subtitle">${je(i,"card.grade_log.subtitle")}</div>
          </div>
        </div>
        <div class="scroll-list">
          ${r.slice(0,o).map(e=>W`
              <div class="list-item">
                <div class="grade-chip ${e.improved?"improved":""} ${e.points?`points ${kt(e.percentage)}`:""} ${e.descriptive?"descriptive":""}">
                  ${e.value}${e.points&&null!==e.percentage&&void 0!==e.percentage?W`<small>${Math.round(e.percentage)}%</small>`:G}
                </div>
                <div class="body">
                  <div class="row1">
                    <span>${e.subject}${e.category?W` · <span class="cat-label">${e.category}</span>`:G}${e.improves?W` · <span class="fix-label">${je(i,"label.grade_improves",{value:e.improves})}</span>`:G}</span>
                    ${e.date?W`<time>${He(e.date,i.language)}</time>`:G}
                  </div>
                  ${e.teacher&&!this._config?.hide_teacher?W`<div class="item-text">${e.teacher}</div>`:G}
                  ${e.comments.length?W`<div class="quote">${e.comments.join(" · ")}</div>`:G}
                </div>
              </div>
            `)}
        </div>
      </ha-card>
    `}};zt.styles=[Qe,et,o`
      .grade-chip.descriptive {
        background: transparent;
        box-shadow: inset 0 0 0 1.5px var(--lc-brand-bg);
      }
      .grade-chip.improved {
        text-decoration: line-through;
        opacity: 0.55;
      }
      .fix-label {
        color: var(--lc-good);
        font-weight: 600;
      }
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
    `],e([me()],zt.prototype,"_config",void 0),zt=e([he("librus-grade-log-card")],zt);let jt=class extends Ve{static getConfigElement(){return Ue()}static getStubConfig(){return{type:"custom:librus-lesson-topics-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 5}_dayLabel(e){const t=this.hass,a=new Date,i=new Date(a);i.setDate(a.getDate()-1);const s=new Date(`${e}T00:00:00`).toLocaleDateString(t.language,{weekday:"short",day:"numeric",month:"short"});return e===mt(a)?`${je(t,"card.lesson_topics.today")} · ${s}`:e===mt(i)?`${je(t,"card.lesson_topics.yesterday")} · ${s}`:s}render(){if(!this._config||!this.hass)return G;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const t=this.hass,a=e.map.lesson_topics,i=a?t.states[a]:void 0;if(!i)return this._message("mdi:book-open-page-variant-outline",je(t,"card.lesson_topics.requires"));const s=(i.attributes.recent??[]).filter(e=>e.date),r=[...new Set(s.map(e=>e.date))].sort().reverse().slice(0,this._config.days??3);if(0===r.length)return this._message("mdi:book-open-page-variant-outline",je(t,"card.lesson_topics.empty"));const o=s.filter(e=>r.includes(e.date)),n=o.filter(e=>e.absent).length;return W`
      <ha-card class="static">
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:book-open-page-variant-outline"></ha-icon></div>
          <div class="title-block">
            <div class="title">${this._config.title??je(t,"card.lesson_topics.title")}</div>
            <div class="subtitle">
              ${n?je(t,"card.lesson_topics.missed",{count:n}):je(t,"card.lesson_topics.subtitle",{days:r.length})}
            </div>
          </div>
        </div>
        <div class="scroll-list">
          ${r.map(e=>W`
              <div class="day">${this._dayLabel(e)}</div>
              ${o.filter(t=>t.date===e).sort((e,t)=>(e.lesson_no??99)-(t.lesson_no??99)).map(e=>W`
                    <div class="topic-row ${e.absent?"missed":""}">
                      <span class="no">${e.lesson_no??"·"}</span>
                      <div class="body">
                        <div class="subj">
                          ${e.subject??je(t,"card.lesson_topics.lesson")}${e.is_trip?W`<span class="lesson-tag substitution">${je(t,"card.lesson_topics.trip")}</span>`:G}${e.absent?W`<span class="lesson-tag cancelled">${je(t,"card.lesson_topics.absent")}</span>`:G}
                        </div>
                        <div class="topic">${e.topic}</div>
                      </div>
                    </div>
                  `)}
            `)}
        </div>
      </ha-card>
    `}};jt.styles=[Qe,et,o`
      .day {
        font-size: 0.68rem;
        font-weight: 700;
        letter-spacing: 0.06em;
        text-transform: uppercase;
        color: var(--secondary-text-color);
        margin: 6px 0 2px;
      }
      .day:first-child {
        margin-top: 0;
      }
      .topic-row {
        display: grid;
        grid-template-columns: 26px 1fr;
        gap: 10px;
        padding: 5px 0;
      }
      .topic-row.missed {
        border-left: 3px solid var(--lc-warn);
        padding-left: 8px;
      }
      .no {
        width: 26px;
        height: 26px;
        border-radius: 8px;
        background: var(--lc-brand-bg);
        color: var(--lc-brand-strong);
        display: grid;
        place-items: center;
        font-weight: 800;
        font-size: 0.78rem;
      }
      .body {
        min-width: 0;
      }
      .subj {
        font-weight: 600;
        font-size: 0.84rem;
      }
      .topic {
        font-size: 0.8rem;
        color: var(--primary-text-color);
        opacity: 0.85;
        overflow-wrap: anywhere;
      }
    `],e([me()],jt.prototype,"_config",void 0),jt=e([he("librus-lesson-topics-card")],jt);let Ct=class extends Ve{static getConfigElement(){return Ue()}static getStubConfig(){return{type:"custom:librus-school-trips-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 4}render(){if(!this._config||!this.hass)return G;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const t=this.hass,a=e.map.school_trips,i=a?t.states[a]:void 0;if(!i)return this._message("mdi:bus-school",je(t,"card.school_trips.requires"));const s=i.attributes.upcoming??[],r=this._config.title??je(t,"card.school_trips.title");if(0===s.length)return this._message("mdi:bus-school",r,je(t,"card.school_trips.empty"));const o=s[0],n=i.attributes.days_until,c=o.date_from?new Date(`${o.date_from.slice(0,10)}T00:00:00`):null,d=this._config.max_items??4;return W`
      <ha-card class="static">
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:bus-school"></ha-icon></div>
          <div class="title-block">
            <div class="title">${r}</div>
            <div class="subtitle">${je(t,"card.school_trips.subtitle",{count:s.length})}</div>
          </div>
        </div>
        <div class="hero">
          ${c?W`<div class="date">
                <b>${c.getDate()}</b>
                <span>${c.toLocaleDateString(t.language,{month:"short"})}</span>
              </div>`:G}
          <div class="hero-text">
            <div class="dest">${o.destination}</div>
            ${c?W`<div class="meta">
                  ${c.toLocaleDateString(t.language,{weekday:"long"})}${o.date_to&&o.date_to.slice(0,10)!==o.date_from?.slice(0,10)?W` – ${He(o.date_to,t.language)}`:G}
                </div>`:G}
          </div>
          ${null!=n&&n<=7?W`<span class="soon">${this._when(n)}</span>`:G}
        </div>
        <div class="facts">
          ${o.transport?W`<div class="fact"><ha-icon icon="mdi:bus"></ha-icon><span>${o.transport}</span></div>`:G}
          ${o.route?W`<div class="fact"><ha-icon icon="mdi:map-marker-outline"></ha-icon><span>${o.route}</span></div>`:G}
          ${o.coordinator?W`<div class="fact"><ha-icon icon="mdi:account-outline"></ha-icon><span>${o.coordinator}</span></div>`:G}
        </div>
        ${s.length>1?W`<div class="later">
              ${s.slice(1,d).map(e=>W`<div class="later-row">
                  <span class="later-dest">${e.destination}</span>
                  <time>${e.date_from?He(e.date_from,t.language):""}</time>
                </div>`)}
            </div>`:G}
      </ha-card>
    `}_when(e){const t=this.hass;return e<=0?je(t,"card.school_trips.today"):1===e?je(t,"card.school_trips.tomorrow"):je(t,"card.school_trips.in_days",{days:e})}};Ct.styles=[Qe,et,o`
      .hero {
        display: flex;
        gap: 14px;
        align-items: center;
      }
      .date {
        width: 54px;
        flex: none;
        border-radius: 10px;
        background: var(--lc-brand-bg);
        color: var(--lc-brand-strong);
        text-align: center;
        padding: 6px 0;
      }
      .date b {
        display: block;
        font-size: 1.35rem;
        line-height: 1.1;
      }
      .date span {
        font-size: 0.68rem;
        text-transform: uppercase;
        letter-spacing: 0.06em;
      }
      .hero-text {
        min-width: 0;
        flex: 1;
      }
      .dest {
        font-weight: 600;
        font-size: 0.92rem;
        overflow-wrap: anywhere;
      }
      .meta {
        font-size: 0.76rem;
        color: var(--secondary-text-color);
      }
      .soon {
        font-size: 0.72rem;
        font-weight: 700;
        color: var(--lc-good);
        background: var(--lc-good-bg);
        padding: 2px 8px;
        border-radius: 999px;
        white-space: nowrap;
        flex: none;
      }
      .facts {
        display: grid;
        gap: 6px;
        font-size: 0.8rem;
      }
      .fact {
        display: grid;
        grid-template-columns: 18px 1fr;
        gap: 8px;
        align-items: start;
      }
      .fact ha-icon {
        --mdc-icon-size: 16px;
        color: var(--secondary-text-color);
      }
      .fact span {
        overflow-wrap: anywhere;
      }
      .later {
        display: grid;
        gap: 6px;
        border-top: 1px solid var(--divider-color, rgba(127, 127, 127, 0.2));
        padding-top: 10px;
        font-size: 0.8rem;
      }
      .later-row {
        display: flex;
        justify-content: space-between;
        gap: 10px;
      }
      .later-dest {
        min-width: 0;
        overflow-wrap: anywhere;
      }
      .later-row time {
        color: var(--secondary-text-color);
        white-space: nowrap;
        font-variant-numeric: tabular-nums;
      }
    `],e([me()],Ct.prototype,"_config",void 0),Ct=e([he("librus-school-trips-card")],Ct);let St=class extends Ve{constructor(){super(...arguments),this._open={}}static getConfigElement(){return Ue()}static getStubConfig(){return{type:"custom:librus-exam-prep-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 5}render(){if(!this._config||!this.hass)return G;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const t=this.hass,a=e.map.next_exam,i=a?t.states[a]:void 0,s="mdi:book-education-outline";if(!i)return this._message(s,je(t,"card.exam_prep.requires"));const r=i.attributes.upcoming??[],o=this._config.title??je(t,"card.exam_prep.title");if(r.length>0&&r.every(e=>void 0===e.topics))return this._message(s,o,je(t,"card.exam_prep.requires"));const n=this._config.days_ahead??14,c=r.filter(e=>(e.days_until??0)<=n);return 0===c.length?this._message(s,o,je(t,"card.exam_prep.empty",{days:n})):W`
      <ha-card class="static">
        <div class="header">
          <div class="icon-badge"><ha-icon icon=${s}></ha-icon></div>
          <div class="title-block">
            <div class="title">${o}</div>
            <div class="subtitle">
              ${je(t,"card.exam_prep.subtitle",{count:c.length,days:n})}
            </div>
          </div>
        </div>
        <div class="exams">${c.map((e,t)=>this._exam(e,t))}</div>
      </ha-card>
    `}_key(e,t){return String(e.id??`${e.date}-${t}`)}_exam(e,t){const a=this.hass,i=this._key(e,t),s=this._open[i]??0===t,r=new Date(`${e.date.slice(0,10)}T00:00:00`),o=e.topics??[],n=e.days_until??0,c=e.topics_since?je(a,"card.exam_prep.since",{date:He(e.topics_since,a.language)}):je(a,"card.exam_prep.since_start"),d=[e.category,o.length?`${je(a,"card.exam_prep.topics",{count:o.length})} ${c}`:null,e.missed_topics?je(a,"card.exam_prep.missed",{count:e.missed_topics}):null].filter(Boolean).join(" · ");return W`
      <div class="exam ${s?"open":""}">
        <button class="top" @click=${()=>this._toggle(i,s)} aria-expanded=${s?"true":"false"}>
          <div class="date">
            <b>${r.getDate()}</b>
            <span>${r.toLocaleDateString(a.language,{month:"short"})}</span>
          </div>
          <div class="body">
            <div class="row1">
              <span class="subject">${e.subject??e.content}</span>
              <span class="pill ${n<=3?"warn":""}">${this._when(n)}</span>
            </div>
            <div class="meta">${d}</div>
          </div>
          <ha-icon class="caret" icon=${s?"mdi:menu-up":"mdi:menu-down"}></ha-icon>
        </button>
        ${s?o.length?W`<div class="topics">
                ${e.more_topics?W`<div class="more">${je(a,"card.exam_prep.more",{count:e.more_topics})}</div>`:G}
                ${o.map(e=>W`<div class="topic">
                    <time>${He(e.date,a.language)}</time>
                    <span class="text"
                      >${e.topic}${(e.dates?.length??1)>1?W` <span
                            class="times"
                            title=${e.dates.map(e=>He(e,a.language)).join(", ")}
                            >×${e.dates.length}</span
                          >`:G}${e.absent?W` <span class="tag">${je(a,"card.exam_prep.absent")}</span>`:G}</span
                    >
                  </div>`)}
              </div>`:W`<div class="none">
                ${e.content?W`<div>${e.content}</div>`:G}
                <div>${je(a,"card.exam_prep.no_topics")}</div>
              </div>`:G}
      </div>
    `}_toggle(e,t){this._open={...this._open,[e]:!t}}_when(e){const t=this.hass;return e<=0?je(t,"card.exam_prep.today"):1===e?je(t,"card.exam_prep.tomorrow"):je(t,"card.exam_prep.in_days",{days:e})}};async function Dt(e,t,a,i="inbox"){return(await e.callWS({type:"call_service",domain:"librus_synergia",service:"get_message",service_data:{device_id:t,message_id:a,mailbox:i},return_response:!0})).response}async function Tt(e,t,a){const i=e,s=i.fetchWithAuth?await i.fetchWithAuth(t):await fetch(t,{headers:{Authorization:`Bearer ${i.auth?.data?.access_token??""}`}});if(!s.ok)throw new Error(`HTTP ${s.status}`);const r=await s.blob(),o=URL.createObjectURL(r),n=document.createElement("a");n.href=o,n.download=function(e){if(!e)return null;const t=/filename\*=UTF-8''([^;]+)/i.exec(e);if(t)try{return decodeURIComponent(t[1])}catch{}const a=/filename="?([^";]+)"?/i.exec(e);return a?a[1]:null}(s.headers.get("Content-Disposition"))??a,document.body.appendChild(n),n.click(),n.remove(),setTimeout(()=>URL.revokeObjectURL(o),6e4)}St.styles=[Qe,et,o`
      .exams {
        display: grid;
        gap: 8px;
      }
      .exam {
        border-radius: 10px;
        background: var(--lc-chip-bg);
        overflow: hidden;
      }
      .exam.open {
        background: var(--lc-brand-bg);
      }
      .top {
        all: unset;
        box-sizing: border-box;
        width: 100%;
        display: flex;
        gap: 10px;
        align-items: center;
        padding: 10px 12px;
        cursor: pointer;
      }
      .top:focus-visible {
        outline: 2px solid var(--lc-brand);
        outline-offset: -2px;
        border-radius: 10px;
      }
      .date {
        width: 46px;
        flex: none;
        border-radius: 9px;
        background: var(--lc-brand-bg);
        color: var(--lc-brand-strong);
        text-align: center;
        padding: 5px 0;
      }
      .exam.open .date {
        background: var(--card-background-color, var(--ha-card-background));
      }
      .date b {
        display: block;
        font-size: 1.15rem;
        line-height: 1.1;
      }
      .date span {
        font-size: 0.62rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }
      .body {
        flex: 1;
        min-width: 0;
      }
      .row1 {
        align-items: center;
      }
      .subject {
        min-width: 0;
        overflow-wrap: anywhere;
      }
      .pill {
        font-size: 0.66rem;
        font-weight: 700;
        border-radius: 999px;
        padding: 2px 8px;
        white-space: nowrap;
        background: var(--lc-brand-bg);
        color: var(--lc-brand-strong);
        flex: none;
      }
      .pill.warn {
        background: var(--lc-warn-bg);
        color: var(--lc-warn);
      }
      .meta {
        font-size: 0.72rem;
        color: var(--secondary-text-color);
        margin-top: 2px;
      }
      .caret {
        --mdc-icon-size: 20px;
        color: var(--secondary-text-color);
        flex: none;
      }
      .topics,
      .none {
        display: grid;
        gap: 7px;
        padding: 0 12px 12px;
        font-size: 0.78rem;
        line-height: 1.35;
      }
      .none {
        color: var(--secondary-text-color);
      }
      .topic {
        display: grid;
        grid-template-columns: 44px 1fr;
        gap: 8px;
      }
      .topic time {
        font-size: 0.68rem;
        color: var(--secondary-text-color);
        padding-top: 2px;
        font-variant-numeric: tabular-nums;
      }
      .text {
        min-width: 0;
        overflow-wrap: anywhere;
      }
      .tag {
        font-size: 0.6rem;
        font-weight: 700;
        color: var(--lc-bad);
        background: var(--lc-bad-bg);
        border-radius: 999px;
        padding: 1px 6px;
        white-space: nowrap;
      }
      .times {
        font-size: 0.62rem;
        font-weight: 700;
        color: var(--secondary-text-color);
        background: var(--lc-chip-bg);
        border-radius: 999px;
        padding: 1px 6px;
        white-space: nowrap;
      }
      .more {
        font-size: 0.7rem;
        color: var(--secondary-text-color);
      }
    `],e([me()],St.prototype,"_config",void 0),e([me()],St.prototype,"_open",void 0),St=e([he("librus-exam-prep-card")],St);let Nt=class extends Ve{constructor(){super(...arguments),this._fileState={}}static getConfigElement(){return Ue()}static getStubConfig(){return{type:"custom:librus-school-documents-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 4}render(){if(!this._config||!this.hass)return G;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const t=this.hass,a=e.deviceId,i=e.map.school_documents,s=i?t.states[i]:void 0,r="mdi:file-document-multiple-outline";if(!s)return this._message(r,je(t,"card.school_documents.requires"));const o=s.attributes.recent??[],n=this._config.title??je(t,"card.school_documents.title");if(0===o.length)return this._message(r,n,je(t,"card.school_documents.empty"));const c=o.filter(e=>this._isNew(e)).length,d=o.slice(0,this._config.max_items??6),l=c?je(t,"card.school_documents.subtitle_new",{count:o.length,fresh:c}):je(t,"card.school_documents.subtitle",{count:o.length});return W`
      <ha-card class="static">
        <div class="header">
          <div class="icon-badge"><ha-icon icon=${r}></ha-icon></div>
          <div class="title-block">
            <div class="title">${n}</div>
            <div class="subtitle">${l}</div>
          </div>
        </div>
        <div class="docs">
          ${d.map(e=>{const i=this._isNew(e),s=W`
              <span class="file ${i?"new":""}"><ha-icon icon="mdi:file-document-outline"></ha-icon></span>
              <span class="body">
                <span class="row1">
                  <span class="name">${e.name}</span>
                  ${i?W`<span class="pill">${je(t,"card.school_documents.new")}</span>`:G}
                </span>
                ${e.added?W`<span class="meta"
                      >${je(t,"card.school_documents.added",{date:He(e.added,t.language)})}</span
                    >`:G}
              </span>
              ${"error"===this._fileState[e.id]?W`<span class="doc-error">${je(t,"card.school_documents.download_error")}</span>`:G}
              <ha-icon
                class="open"
                icon=${"loading"===this._fileState[e.id]?"mdi:progress-download":"mdi:download"}
              ></ha-icon>
            `;return W`<button
              class="doc"
              type="button"
              ?disabled=${"loading"===this._fileState[e.id]}
              @click=${()=>this._download(a,e)}
            >
              ${s}
            </button>`})}
        </div>
      </ha-card>
    `}async _download(e,t){if(this.hass){this._fileState={...this._fileState,[t.id]:"loading"};try{await async function(e,t,a,i){await Tt(e,`/api/librus_synergia/school_file/${encodeURIComponent(t)}/${encodeURIComponent(a)}`,i)}(this.hass,e,t.id,t.name);const a={...this._fileState};delete a[t.id],this._fileState=a}catch{if(t.url){window.open(t.url,"_blank","noopener,noreferrer");const e={...this._fileState};delete e[t.id],this._fileState=e}else this._fileState={...this._fileState,[t.id]:"error"}}}}_isNew(e){if(!e.added)return!1;const t=new Date(e.added.replace(" ","T"));return!Number.isNaN(t.getTime())&&Date.now()-t.getTime()<6048e5}};Nt.styles=[Qe,et,o`
      .docs {
        display: grid;
        gap: 4px;
      }
      .doc {
        display: flex;
        gap: 10px;
        align-items: center;
        padding: 6px;
        margin: 0 -6px;
        border-radius: 10px;
        color: inherit;
        text-decoration: none;
        /* A button now (the download goes through Home Assistant). */
        width: calc(100% + 12px);
        background: none;
        border: 0;
        font: inherit;
        text-align: left;
        cursor: pointer;
      }
      .doc:disabled {
        cursor: progress;
      }
      .doc-error {
        font-size: 0.72rem;
        color: var(--lc-bad);
        white-space: nowrap;
      }
      .doc:hover {
        background: var(--lc-chip-bg);
      }
      .doc:focus-visible {
        outline: 2px solid var(--lc-brand);
      }
      .file {
        width: 32px;
        height: 32px;
        flex: none;
        border-radius: 8px;
        background: var(--lc-chip-bg);
        color: var(--secondary-text-color);
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .file.new {
        background: var(--lc-brand-bg);
        color: var(--lc-brand);
      }
      .file ha-icon {
        --mdc-icon-size: 18px;
      }
      .body {
        flex: 1;
        min-width: 0;
        display: grid;
        gap: 1px;
      }
      .row1 {
        align-items: center;
      }
      .name {
        min-width: 0;
        overflow-wrap: anywhere;
      }
      .pill {
        font-size: 0.64rem;
        font-weight: 700;
        border-radius: 999px;
        padding: 2px 8px;
        background: var(--lc-brand-bg);
        color: var(--lc-brand-strong);
        white-space: nowrap;
        flex: none;
      }
      .meta {
        font-size: 0.7rem;
        color: var(--secondary-text-color);
      }
      .open {
        --mdc-icon-size: 16px;
        color: var(--secondary-text-color);
        flex: none;
      }
    `],e([me()],Nt.prototype,"_config",void 0),e([me()],Nt.prototype,"_fileState",void 0),Nt=e([he("librus-school-documents-card")],Nt);let It=class extends Ve{static getConfigElement(){return Ue()}static getStubConfig(){return{type:"custom:librus-justifications-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 4}render(){if(!this._config||!this.hass)return G;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const t=this.hass,a=e.map.justifications,i=a?t.states[a]:void 0,s="mdi:clipboard-check-outline";if(!i)return this._message(s,je(t,"card.justifications.requires"));const r=e.map.unexcused_absences,o=r?t.states[r]:void 0,n=[...new Set((o?.attributes.awaiting_justification??[]).map(e=>e.slice(0,10)))].sort(),c=i.attributes.recent??[],d=Number(i.attributes.pending??0),l=Number(i.attributes.accepted??0),h=Number(i.attributes.rejected??0),u=this._config.title??je(t,"card.justifications.title");if(0===c.length&&0===n.length)return this._message(s,u,je(t,"card.justifications.empty"));const p=d?je(t,"card.justifications.subtitle_pending",{count:d}):je(t,"card.justifications.subtitle_done");return W`
      <ha-card class="static">
        <div class="header">
          <div class="icon-badge ${n.length||d?"amber":"good"}">
            <ha-icon icon=${s}></ha-icon>
          </div>
          <div class="title-block">
            <div class="title">${u}</div>
            <div class="subtitle">${p}</div>
          </div>
        </div>
        ${n.length?W`<div class="todo">
              <ha-icon icon="mdi:clock-outline"></ha-icon>
              <div>
                <div>${je(t,"card.justifications.to_excuse",{count:n.length})}</div>
                <div class="todo-dates">
                  ${n.map(e=>He(e,t.language)).join(", ")} ·
                  ${je(t,"card.justifications.nothing_sent")}
                </div>
              </div>
            </div>`:G}
        ${c.length?W`<div class="chips">
                <span class="chip">${je(t,"card.justifications.pending")} <span class="n">${d}</span></span>
                <span class="chip">${je(t,"card.justifications.accepted")} <span class="n">${l}</span></span>
                <span class="chip">${je(t,"card.justifications.rejected")} <span class="n">${h}</span></span>
              </div>
              <div class="list">
                ${c.slice(0,this._config.max_items??5).map(e=>this._item(e))}
              </div>`:G}
      </ha-card>
    `}_decision(e){if(e.decision)return e.decision;const t=(e.status||"").toLowerCase();return t.startsWith("accept")?"accepted":t.startsWith("reject")||t.startsWith("denied")||t.startsWith("refuse")?"rejected":"pending"}_item(e){const t=this.hass,a=this._decision(e),i=e.date_from?He(e.date_from,t.language):"",s=e.date_to?He(e.date_to,t.language):"",r=s&&s!==i?`${i} – ${s}`:i,o=[e.justified_absences?je(t,"card.justifications.lessons",{count:e.justified_absences}):null,e.posted?je(t,"card.justifications.sent",{date:He(e.posted,t.language)}):null].filter(Boolean);return W`
      <div class="item ${a}">
        <span class="stripe"></span>
        <div class="body">
          <div class="row1">
            <span>${r}</span>
            <span class="pill ${a}">${je(t,`card.justifications.${a}`)}</span>
          </div>
          <div class="item-text">
            ${o.join(" · ")}${e.message?W` · „${e.message.trim()}”`:G}
          </div>
        </div>
      </div>
    `}};It.styles=[Qe,et,o`
      .todo {
        display: flex;
        gap: 10px;
        align-items: center;
        background: var(--lc-warn-bg);
        color: var(--lc-warn);
        border-radius: 10px;
        padding: 10px 12px;
        font-size: 0.78rem;
        font-weight: 600;
      }
      .todo ha-icon {
        --mdc-icon-size: 20px;
        flex: none;
      }
      .todo-dates {
        color: var(--primary-text-color);
        font-weight: 400;
        font-size: 0.74rem;
        margin-top: 1px;
      }
      .list {
        display: grid;
        gap: 10px;
      }
      .item {
        display: flex;
        gap: 10px;
      }
      .stripe {
        width: 3px;
        flex: none;
        border-radius: 2px;
        background: var(--lc-warn);
      }
      .item.accepted .stripe {
        background: var(--lc-good);
      }
      .item.rejected .stripe {
        background: var(--lc-bad);
      }
      .body {
        flex: 1;
        min-width: 0;
      }
      .row1 {
        align-items: center;
      }
      .pill {
        font-size: 0.66rem;
        font-weight: 700;
        border-radius: 999px;
        padding: 2px 8px;
        white-space: nowrap;
        flex: none;
        background: var(--lc-warn-bg);
        color: var(--lc-warn);
      }
      .pill.accepted {
        background: var(--lc-good-bg);
        color: var(--lc-good);
      }
      .pill.rejected {
        background: var(--lc-bad-bg);
        color: var(--lc-bad);
      }
      .item-text {
        overflow-wrap: anywhere;
      }
    `],e([me()],It.prototype,"_config",void 0),It=e([he("librus-justifications-card")],It);let Et=class extends Ve{constructor(){super(...arguments),this._done=new Set,this._storageKey=""}static getConfigElement(){return Ue()}static getStubConfig(){return{type:"custom:librus-catch-up-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 5}_load(e){const t=`librus-catch-up-done:${e}`;if(this._storageKey!==t){this._storageKey=t;try{const e=window.localStorage.getItem(t);this._done=new Set(e?JSON.parse(e):[])}catch{this._done=new Set}}}_toggle(e,t){const a=new Set(this._done);a.has(e)?a.delete(e):a.add(e),this._done=a;try{window.localStorage.setItem(this._storageKey,JSON.stringify([...a].filter(e=>t.has(e))))}catch{}}render(){if(!this._config||!this.hass)return G;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const t=this.hass,{deviceId:a,map:i}=e,s="mdi:book-refresh-outline",r=i.lesson_topics?t.states[i.lesson_topics]:void 0;if(!r)return this._message(s,je(t,"card.catch_up.requires"));const o=this._config.title??je(t,"card.catch_up.title");if(!("catch_up"in r.attributes))return this._message(s,o,je(t,"card.catch_up.requires"));const n=r.attributes.catch_up;if(!n||0===n.lessons.length&&0===n.homework.length)return this._message(s,o,je(t,"card.catch_up.empty"));this._load(a);const c=new Map,d=(e,a)=>{const i=e??je(t,"card.catch_up.other");c.has(i)||c.set(i,[]),c.get(i).push(a)};for(const e of n.lessons)d(e.subject,{key:`${e.date}|${e.lesson_no??""}`,date:e.date,text:e.topic});for(const e of n.homework)d(e.subject,{key:`hw:${e.id}`,date:e.date,text:e.topic,homework:{due:e.due_date}});const l=new Set([...c.values()].flat().map(e=>e.key)),h=[...l].filter(e=>this._done.has(e)).length,u=n.from===n.to?He(n.from,t.language):`${He(n.from,t.language)} – ${He(n.to,t.language)}`,p=n.back_today?je(t,"card.catch_up.back_today"):n.back_on?je(t,"card.catch_up.back_on",{date:He(n.back_on,t.language)}):null;return W`
      <ha-card class="static">
        <div class="header">
          <div class="icon-badge amber"><ha-icon icon=${s}></ha-icon></div>
          <div class="title-block">
            <div class="title">${o}</div>
            <div class="subtitle">
              ${je(t,"card.catch_up.subtitle",{period:u,count:c.size})}
            </div>
          </div>
          ${p?W`<span class="pill">${p}</span>`:G}
        </div>
        <div class="progress">
          <div class="bar"><div style="width:${l.size?Math.round(100*h/l.size):0}%"></div></div>
          <span>${je(t,"card.catch_up.progress",{done:h,total:l.size})}</span>
        </div>
        ${[...c.entries()].map(([e,a])=>{const i=a.filter(e=>!e.homework).length,s=a.length-i,r=[i?je(t,"card.catch_up.lessons",{count:i}):null,s?je(t,"card.catch_up.homework",{count:s}):null].filter(Boolean).join(" · ");return W`<div class="subj">
            <div class="head"><span class="name">${e}</span><span class="meta">${r}</span></div>
            ${a.map(e=>{const a=this._done.has(e.key);return W`<button
                class="row ${a?"done":""} ${e.homework?"hw":""}"
                @click=${()=>this._toggle(e.key,l)}
                aria-pressed=${a?"true":"false"}
              >
                <time>${He(e.date,t.language)}</time>
                <ha-icon
                  class="box"
                  icon=${a?"mdi:checkbox-marked":"mdi:checkbox-blank-outline"}
                ></ha-icon>
                ${e.homework?W`<ha-icon class="hw-icon" icon="mdi:notebook-edit-outline"></ha-icon>`:G}
                <span class="text ${e.text?"":"muted"}"
                  >${e.text??je(t,"card.catch_up.no_topic")}</span
                >
                ${e.homework?.due?W`<span class="due"
                      >${je(t,"card.catch_up.due",{date:He(e.homework.due,t.language)})}</span
                    >`:G}
              </button>`})}
          </div>`})}
      </ha-card>
    `}};Et.styles=[Qe,et,o`
      .pill {
        font-size: 0.66rem;
        font-weight: 700;
        border-radius: 999px;
        padding: 2px 8px;
        white-space: nowrap;
        background: var(--lc-good-bg);
        color: var(--lc-good);
        flex: none;
      }
      .progress {
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 0.72rem;
        color: var(--secondary-text-color);
      }
      .bar {
        flex: 1;
        height: 6px;
        border-radius: 999px;
        background: var(--lc-ring-track);
        overflow: hidden;
      }
      .bar > div {
        height: 100%;
        background: var(--lc-brand);
      }
      .subj {
        border-radius: 10px;
        background: var(--lc-chip-bg);
        padding: 10px 12px;
        display: grid;
        gap: 6px;
      }
      .head {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        gap: 8px;
        font-size: 0.82rem;
        font-weight: 700;
      }
      .name {
        min-width: 0;
        overflow-wrap: anywhere;
      }
      .meta {
        font-size: 0.68rem;
        color: var(--secondary-text-color);
        font-weight: 600;
        white-space: nowrap;
      }
      .row {
        all: unset;
        box-sizing: border-box;
        display: flex;
        gap: 8px;
        align-items: flex-start;
        font-size: 0.78rem;
        line-height: 1.35;
        cursor: pointer;
        border-radius: 6px;
      }
      .row:focus-visible {
        outline: 2px solid var(--lc-brand);
      }
      .row time {
        font-size: 0.66rem;
        color: var(--secondary-text-color);
        width: 40px;
        flex: none;
        padding-top: 2px;
        font-variant-numeric: tabular-nums;
      }
      .box {
        --mdc-icon-size: 17px;
        color: var(--secondary-text-color);
        flex: none;
      }
      .row.done .box {
        color: var(--lc-good);
      }
      .hw-icon {
        --mdc-icon-size: 16px;
        color: var(--lc-brand);
        flex: none;
      }
      .text {
        flex: 1;
        min-width: 0;
        overflow-wrap: anywhere;
      }
      .text.muted {
        color: var(--secondary-text-color);
        font-style: italic;
      }
      .row.done .text {
        color: var(--secondary-text-color);
        text-decoration: line-through;
      }
      .due {
        font-size: 0.66rem;
        font-weight: 700;
        color: var(--lc-warn);
        white-space: nowrap;
        flex: none;
      }
    `],e([me()],Et.prototype,"_config",void 0),e([me()],Et.prototype,"_done",void 0),Et=e([he("librus-catch-up-card")],Et);const At=["test","quiz","trip","meeting","homework","other"],Mt=[["quiz",/kartk|quiz/i],["test",/sprawdzian|praca klasowa|test|egzamin|diagnoz/i],["trip",/wycieczk|wyjści/i],["meeting",/zebrani|konsultacj|wywiadówk/i]];function Lt(e,t){const a=`${e??""} ${t}`;return Mt.find(([,e])=>e.test(a))?.[0]??"other"}function Pt(e){const t=[],a=new Date(`${e.start.slice(0,10)}T12:00:00`),i=new Date(`${(e.end||e.start).slice(0,10)}T12:00:00`);do{t.push(mt(a)),a.setDate(a.getDate()+1)}while(a<i);return t}let Ft=class extends Ve{constructor(){super(...arguments),this._month=(()=>{const e=new Date;return new Date(e.getFullYear(),e.getMonth(),1)})(),this._agenda=[],this._free=[]}static getConfigElement(){return Ue()}static getStubConfig(){return{type:"custom:librus-month-calendar-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 6}connectedCallback(){super.connectedCallback(),this._refreshTimer=setInterval(()=>{this._fetch(!0)},18e5)}disconnectedCallback(){super.disconnectedCallback(),clearInterval(this._refreshTimer)}async _fetch(e=!1){if(!this.hass||!this._config)return;const t=this._resolveEntities();if("error"in t)return;const{agenda:a,free_days:i}=t.map,s=new Date(this._month),r=new Date(this._month.getFullYear(),this._month.getMonth()+1,1),o=`${a}:${i}:${mt(s)}`;if(!e&&this._fetchedFor===o)return;this._fetchedFor=o;const n=this._beginFetch(),c=e=>e?ct(this.hass,e,s,r).catch(()=>[]):[],[d,l]=await Promise.all([c(a),c(i)]);this._isCurrentFetch(n)&&(this._agenda=d,this._free=l)}_shift(e){this._month=new Date(this._month.getFullYear(),this._month.getMonth()+e,1),this._selected=void 0,this._fetch()}_index(e){const t=this.hass,a=new Map,i=(e,t)=>a.set(e,[...a.get(e)??[],t]);for(const e of this._agenda){const{category:t,text:a}=Ye(e.summary);i(e.start.slice(0,10),{kind:Lt(t,a),title:a,detail:[t,e.description].filter(Boolean).join(" · ")||void 0})}for(const a of e){const e=(a.due_date??"").slice(0,10);e&&i(e,{kind:"homework",title:a.subject?je(t,"card.month.homework_for",{subject:a.subject}):je(t,"card.month.homework"),detail:a.topic||void 0})}const s=new Map;for(const e of this._free)for(const t of Pt(e))s.set(t,e.summary);return{entries:a,free:s}}render(){if(!this._config||!this.hass)return G;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{map:t}=e,a=this.hass;this._fetch();const i=t.homework_assignments?a.states[t.homework_assignments]:void 0,s=i?.attributes.recent??[],{entries:r,free:o}=this._index(s),n=this._month.getFullYear(),c=this._month.getMonth(),d=new Date(n,c+1,0).getDate(),l=(this._month.getDay()+6)%7,h=mt(new Date),u=`${n}-${String(c+1).padStart(2,"0")}`,p=[...r.keys()].filter(e=>e.startsWith(u)).sort(),g=this._selected??(h.startsWith(u)?h:p.find(e=>e>=h)??p[0]),m=new Map;for(const e of p)for(const t of r.get(e)??[])m.set(t.kind,(m.get(t.kind)??0)+1);const v=["test","quiz","trip"].filter(e=>m.get(e)).map(e=>`${je(a,`card.month.kind_${e}`)} ${m.get(e)}`).join(" · "),b=this._month.toLocaleDateString(a.language,{month:"long",year:"numeric"}),_=[];for(let e=0;e<l;e++)_.push(W`<span class="day other"></span>`);for(let e=1;e<=d;e++){const t=new Date(n,c,e),i=mt(t),s=0===t.getDay()||6===t.getDay(),d=r.get(i)??[];_.push(W`<button
        class="day ${o.has(i)||s?"free":""} ${i===h?"today":""} ${i===g?"sel":""}"
        @click=${()=>this._selected=i}
        aria-label=${t.toLocaleDateString(a.language,{day:"numeric",month:"long"})}
      >
        <span class="n">${e}</span>
        <span class="dots">${d.slice(0,4).map(e=>W`<i class="dot k-${e.kind}"></i>`)}</span>
      </button>`)}const f=At.filter(e=>m.get(e)),y=g?r.get(g)??[]:[],w=g?o.get(g):void 0,x=g?new Date(`${g}T12:00:00`).toLocaleDateString(a.language,{weekday:"long",day:"numeric",month:"long"}):"";return W`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:calendar-month-outline"></ha-icon></div>
          <div class="title-block">
            <div class="title">${this._config.title??b.charAt(0).toUpperCase()+b.slice(1)}</div>
            <div class="subtitle">${v||je(a,"card.month.nothing_month")}</div>
          </div>
          <div class="nav">
            <button @click=${()=>this._shift(-1)} aria-label=${je(a,"card.month.previous")}>‹</button>
            <button @click=${()=>this._shift(1)} aria-label=${je(a,"card.month.next")}>›</button>
          </div>
        </div>
        <div class="grid">
          ${[0,1,2,3,4,5,6].map(e=>W`<span class="wd"
                >${new Date(2026,0,5+e).toLocaleDateString(a.language,{weekday:"short"}).replace(".","").slice(0,3)}</span
              >`)}
          ${_}
        </div>
        ${this._config.hide_legend?G:W`<div class="legend">
              ${f.map(e=>W`<span><i class="dot k-${e}"></i>${je(a,`card.month.kind_${e}`)}</span>`)}
              <span><i class="free-box"></i>${je(a,"card.month.free")}</span>
            </div>`}
        ${g?W`<div class="list">
              <div class="list-title">${x}</div>
              ${w?W`<div class="ev"><i class="free-box"></i><div>${w}</div></div>`:G}
              ${y.map(e=>W`<div class="ev">
                  <i class="dot k-${e.kind}"></i>
                  <div>${e.title}${e.detail?W`<small>${e.detail}</small>`:G}</div>
                </div>`)}
              ${w||0!==y.length?G:W`<div class="none">${je(a,"card.month.nothing_day")}</div>`}
            </div>`:G}
      </ha-card>
    `}};Ft.styles=[Qe,et,o`
      .nav {
        margin-left: auto;
        display: flex;
        gap: 4px;
      }
      .nav button {
        width: 30px;
        height: 30px;
        border-radius: 8px;
        border: 0;
        background: var(--lc-chip-bg);
        color: var(--primary-text-color);
        font: inherit;
        font-size: 1.05rem;
        cursor: pointer;
      }
      .grid {
        display: grid;
        grid-template-columns: repeat(7, minmax(0, 1fr));
        gap: 3px;
      }
      .wd {
        font-size: 0.62rem;
        font-weight: 700;
        text-transform: uppercase;
        text-align: center;
        color: var(--secondary-text-color);
        padding-bottom: 2px;
      }
      .day {
        min-height: 42px;
        border-radius: 8px;
        border: 1px solid transparent;
        background: none;
        color: inherit;
        font: inherit;
        padding: 4px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 4px;
        cursor: pointer;
      }
      .day.other {
        cursor: default;
      }
      .day.free {
        background: var(--lc-chip-bg);
      }
      .day.free .n {
        color: var(--secondary-text-color);
      }
      .day .n {
        font-size: 0.74rem;
        font-variant-numeric: tabular-nums;
        line-height: 20px;
      }
      .day.today .n {
        background: var(--lc-brand);
        color: #fff;
        border-radius: 99px;
        width: 20px;
        text-align: center;
        font-weight: 700;
      }
      .day.sel {
        border-color: var(--lc-brand);
      }
      .dots {
        display: flex;
        flex-wrap: wrap;
        gap: 2px;
      }
      .dot {
        width: 7px;
        height: 7px;
        border-radius: 50%;
        display: inline-block;
        flex: none;
      }
      .k-test {
        background: var(--lc-bad);
      }
      .k-quiz {
        background: var(--lc-amber);
      }
      .k-trip {
        background: var(--lc-good);
      }
      .k-meeting {
        background: var(--lc-brand);
      }
      .k-homework {
        background: var(--lc-chart-8);
      }
      .k-other {
        background: var(--secondary-text-color);
      }
      .free-box {
        width: 9px;
        height: 9px;
        border-radius: 2px;
        background: var(--lc-chip-bg);
        border: 1px solid var(--divider-color, rgba(127, 127, 127, 0.3));
        display: inline-block;
        flex: none;
      }
      .legend {
        display: flex;
        flex-wrap: wrap;
        gap: 6px 12px;
        margin-top: 10px;
        font-size: 0.7rem;
        color: var(--secondary-text-color);
      }
      .legend span {
        display: inline-flex;
        align-items: center;
        gap: 4px;
      }
      .list {
        margin-top: 12px;
        padding-top: 10px;
        border-top: 1px solid var(--divider-color, rgba(127, 127, 127, 0.2));
        display: grid;
        gap: 8px;
      }
      .list-title {
        font-size: 0.78rem;
        font-weight: 700;
      }
      .ev {
        display: grid;
        grid-template-columns: 10px minmax(0, 1fr);
        gap: 8px;
        align-items: start;
        font-size: 0.82rem;
      }
      .ev .dot,
      .ev .free-box {
        margin-top: 5px;
      }
      .ev small {
        display: block;
        color: var(--secondary-text-color);
        font-size: 0.74rem;
      }
      .none {
        font-size: 0.8rem;
        color: var(--secondary-text-color);
      }
    `],e([me()],Ft.prototype,"_config",void 0),e([me()],Ft.prototype,"_month",void 0),e([me()],Ft.prototype,"_selected",void 0),e([me()],Ft.prototype,"_agenda",void 0),e([me()],Ft.prototype,"_free",void 0),Ft=e([he("librus-month-calendar-card")],Ft);let Bt=class extends Ve{static getConfigElement(){return Ue()}static getStubConfig(){return{type:"custom:librus-subject-grades-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 3}render(){if(!this._config||!this.hass)return G;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{deviceId:t}=e,a=this.hass,i=this._resolveAllByTranslationKey(t,"subject_average"),s=void 0!==this._config.subject_id?i.find(e=>e.subjectId===this._config.subject_id):i[0];if(!s)return this._message("mdi:notebook-outline",je(a,"card.grades.empty"));const r=a.states[s.entityId],o=[...r?.attributes.grades??[],...wt(r?.attributes),...yt(r?.attributes)],n=r?.attributes.points_percentage;if(0===o.length)return this._message("mdi:notebook-outline",je(a,"card.grades.empty"));const c=$t(o,this._config);if(0===c.length)return this._message("mdi:notebook-outline",je(a,"card.grade_log.empty_filtered"));const d=this._config.max_items,l=d?c.slice(0,d):c;return W`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:notebook-outline"></ha-icon></div>
          <div class="title-block">
            <div class="title">${this._config?.title??s.subject}</div>
            <div class="subtitle">
              ${be.has(r.state)&&"number"==typeof n?je(a,"card.grades.points_percentage",{value:n.toLocaleString(a.language,{maximumFractionDigits:1})}):r.state}
            </div>
          </div>
        </div>
        <div class="scroll-list">
          ${l.map(e=>W`
              <div class="list-item">
                <div class="grade-chip ${e.improved?"improved":""} ${e.points?`points ${kt(e.percentage)}`:""}">
                  ${e.value}${e.points&&null!==e.percentage&&void 0!==e.percentage?W`<small>${Math.round(e.percentage)}%</small>`:G}
                </div>
                <div class="body">
                  <div class="row1">
                    <span><span class="cat-label">${e.category??""}</span>${e.improves?W` · <span class="fix-label">${je(a,"label.grade_improves",{value:e.improves})}</span>`:G}</span>
                    ${e.date?W`<time>${He(e.date,a.language)}</time>`:G}
                  </div>
                  ${e.comments.length?W`<div class="quote">${e.comments.join(" · ")}</div>`:G}
                </div>
              </div>
            `)}
        </div>
      </ha-card>
    `}};Bt.styles=[Qe,et,o`
      .grade-chip.improved {
        text-decoration: line-through;
        opacity: 0.55;
      }
      .fix-label {
        color: var(--lc-good);
        font-weight: 600;
      }
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
    `],e([me()],Bt.prototype,"_config",void 0),Bt=e([he("librus-subject-grades-card")],Bt);let Ot=class extends Ve{constructor(){super(...arguments),this._points=[]}static getConfigElement(){return Ue()}static getStubConfig(){return{type:"custom:librus-grade-trend-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}get _historyDays(){return this._config?.days??60}getCardSize(){return 3}connectedCallback(){super.connectedCallback(),this._refreshTimer=setInterval(()=>{this._fetch(!0)},18e5)}disconnectedCallback(){super.disconnectedCallback(),clearInterval(this._refreshTimer)}_resolveEntityId(){if(!this.hass||!this._config)return;const e=this._resolveEntities();if("error"in e)return;const{deviceId:t,map:a}=e;if(void 0!==this._config.subject_id){const e=this._resolveAllByTranslationKey(t,"subject_average");return e.find(e=>e.subjectId===this._config.subject_id)?.entityId}return a.overall_average}async _fetch(e=!1){const t=this._resolveEntityId();if(!this.hass||!t)return;const a=new Date,i=new Date(a.getTime()-864e5*this._historyDays),s=`${t}:${a.toDateString()}:${this._historyDays}`;if(!e&&this._fetchedFor===s)return;this._fetchedFor=s;const r=this._beginFetch();try{const e=await async function(e,t,a,i){const s=`history/period/${encodeURIComponent(a.toISOString())}?filter_entity_id=${encodeURIComponent(t)}&end_time=${encodeURIComponent(i.toISOString())}`,r=await e.callApi("GET",s),o=r?.[0]??[],n=[];for(const e of o){const t=Number(e.state);if(!Number.isFinite(t))continue;const a=new Date(e.last_changed).getTime();if(Number.isNaN(a))continue;const i=n[n.length-1];i&&i.value===t||n.push({timestamp:a,value:t})}return n}(this.hass,t,i,a);this._isCurrentFetch(r)&&(this._points=e)}catch{this._isCurrentFetch(r)&&(this._points=[])}}render(){if(!this._config||!this.hass)return G;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const t=this.hass;this._fetch();const a=this._resolveEntityId(),i=void 0!==this._config.subject_id?this._resolveAllByTranslationKey(e.deviceId,"subject_average").find(e=>e.subjectId===this._config.subject_id)?.subject:void 0;if(!a||this._points.length<2)return this._message("mdi:chart-line",je(t,"card.grade_trend.empty"));const s=this._points[0],r=this._points[this._points.length-1],o=Math.round(100*(r.value-s.value))/100,n=o>0?"mdi:trending-up":o<0?"mdi:trending-down":"mdi:trending-neutral",c=o>0?"good":o<0?"bad":"";return W`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:chart-line"></ha-icon></div>
          <div class="title-block">
            <div class="title">${this._config.title??i??je(t,"card.grade_trend.title")}</div>
            <div class="subtitle">${je(t,"card.grade_trend.subtitle",{days:this._historyDays})}</div>
          </div>
          <div class="trend ${c}">
            <ha-icon icon=${n}></ha-icon>
            <span>${o>0?"+":""}${o}</span>
          </div>
        </div>
        <div class="chart-row">
          <div class="current-value">${r.value.toFixed(2)}</div>
          ${function(e,t={}){const a=t.width??280,i=t.height??72,s=t.colorVar??"var(--lc-brand)";if(e.length<2)return W`<svg width=${a} height=${i} viewBox="0 0 ${a} ${i}" class="line-chart"></svg>`;const r=e.map(e=>e.timestamp),o=e.map(e=>e.value),n=Math.min(...r),c=Math.max(...r),d=t.min??Math.min(...o),l=t.max??Math.max(...o),h=c-n||1,u=l-d||1,p=e=>6+(e-n)/h*(a-12),g=e=>i-6-(e-d)/u*(i-12),m=e.map(e=>`${p(e.timestamp).toFixed(1)},${g(e.value).toFixed(1)}`).join(" "),v=e[0],b=e[e.length-1],_=`${p(v.timestamp).toFixed(1)},${(i-6).toFixed(1)} ${m} ${p(b.timestamp).toFixed(1)},${(i-6).toFixed(1)}`;return W`
    <svg width=${a} height=${i} viewBox="0 0 ${a} ${i}" class="line-chart">
      <polygon points=${_} fill=${s} opacity="0.12"></polygon>
      <polyline
        points=${m}
        fill="none"
        stroke=${s}
        stroke-width="2"
        stroke-linejoin="round"
        stroke-linecap="round"
      ></polyline>
      <circle cx=${p(b.timestamp)} cy=${g(b.value)} r="3" fill=${s}></circle>
    </svg>
  `}(this._points,{colorVar:"var(--lc-brand)"})}
        </div>
      </ha-card>
    `}};var Kt,Ut;Ot.styles=[Qe,et,o`
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
    `],e([me()],Ot.prototype,"_config",void 0),e([me()],Ot.prototype,"_points",void 0),Ot=e([he("librus-grade-trend-card")],Ot),function(e){e.language="language",e.system="system",e.comma_decimal="comma_decimal",e.decimal_comma="decimal_comma",e.space_comma="space_comma",e.none="none"}(Kt||(Kt={})),function(e){e.language="language",e.system="system",e.am_pm="12",e.twenty_four="24"}(Ut||(Ut={}));var Rt=["closed","locked","off"],Wt=function(e,t,a,i){i=i||{},a=null==a?{}:a;var s=new Event(t,{bubbles:void 0===i.bubbles||i.bubbles,cancelable:Boolean(i.cancelable),composed:void 0===i.composed||i.composed});return s.detail=a,e.dispatchEvent(s),s},Ht=function(e){Wt(window,"haptic",e)},qt=function(e,t,a,i){if(i||(i={action:"more-info"}),!i.confirmation||i.confirmation.exemptions&&i.confirmation.exemptions.some(function(e){return e.user===t.user.id})||(Ht("warning"),confirm(i.confirmation.text||"Are you sure you want to "+i.action+"?")))switch(i.action){case"more-info":(a.entity||a.camera_image)&&Wt(e,"hass-more-info",{entityId:a.entity?a.entity:a.camera_image});break;case"navigate":i.navigation_path&&function(e,t,a){void 0===a&&(a=!1),a?history.replaceState(null,"",t):history.pushState(null,"",t),Wt(window,"location-changed",{replace:a})}(0,i.navigation_path);break;case"url":i.url_path&&window.open(i.url_path);break;case"toggle":a.entity&&(function(e,t){(function(e,t,a){void 0===a&&(a=!0);var i,s=function(e){return e.substr(0,e.indexOf("."))}(t),r="group"===s?"homeassistant":s;switch(s){case"lock":i=a?"unlock":"lock";break;case"cover":i=a?"open_cover":"close_cover";break;default:i=a?"turn_on":"turn_off"}e.callService(r,i,{entity_id:t})})(e,t,Rt.includes(e.states[t].state))}(t,a.entity),Ht("success"));break;case"call-service":if(!i.service)return void Ht("failure");var s=i.service.split(".",2);t.callService(s[0],s[1],i.service_data,i.target),Ht("success");break;case"fire-dom-event":Wt(e,"ll-custom",i)}};function Gt(e){return void 0!==e&&"none"!==e.action}function Jt(e,t,a){if(t&&Gt(t))return i=>{e.hass&&(i.stopPropagation(),function(e,t,a){var i;a.tap_action&&(i=a.tap_action),qt(e,t,a,i)}(e,e.hass,{tap_action:t,entity:a}))}}function Zt(e){return Gt(e)}let Yt=class extends Ve{static getConfigElement(){return Ue()}static getStubConfig(){return{type:"custom:librus-grade-goal-card",target:4.5}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 2}render(){if(!this._config||!this.hass)return G;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{deviceId:t,map:a}=e,i=this.hass,s=this._resolveAllByTranslationKey(t,"subject_average"),r=void 0!==this._config.subject_id?s.find(e=>e.subjectId===this._config.subject_id):void 0,o=r?r.entityId:a.overall_average,n=o?i.states[o]:void 0,c=Number(n?.state);if(!n||Number.isNaN(c))return this._message("mdi:target",je(i,"card.grade_goal.empty"));const d=this._config.target??4.5,l=r?Number(n.attributes.grade_count)||0:s.reduce((e,t)=>e+(i.states[t.entityId]?.attributes.grades?.length??0),0),h=c>=d,u=d<=1?h?100:0:Math.max(0,Math.min(100,(c-1)/(d-1)*100)),p=r?rt(n):void 0,g=void 0!==p&&p.weight>0,m=h?null:g?function(e,t,a){return e>=a?0:a>=6||!(t>0)?null:Math.max(1,Math.ceil((a*t-e*t)/(6-a)-1e-9))}(p.average,p.weight,d):d<6&&l>0?Math.ceil(l*(d-c)/(6-d)):null,v=r?p?.predicted:a.grade_forecast?Number(i.states[a.grade_forecast]?.state):void 0;return W`
      <ha-card @click=${Jt(this,this._config.tap_action,o)}>
        <div class="header">
          <div class="icon-badge ${h?"good":""}">
            <ha-icon icon=${h?"mdi:flag-checkered":"mdi:target"}></ha-icon>
          </div>
          <div class="title-block">
            <div class="title">${this._config.title??r?.subject??je(i,"card.grade_goal.title")}</div>
            <div class="subtitle">
              ${je(i,r?"card.grade_goal.title":"card.grade_goal.subtitle_overall")}
            </div>
          </div>
        </div>
        <div class="ring-row">
          ${at(Math.round(u),h?"var(--lc-good)":"var(--lc-brand)",68,7)}
          <div>
            <div class="ring-num">${c.toFixed(2)}</div>
            <div class="ring-label">${je(i,"label.current")}</div>
          </div>
        </div>
        <hr />
        <div class="stats">
          <div class="stat">
            <div class="stat-value">${d.toFixed(2)}</div>
            <div class="stat-label">${je(i,"label.target")}</div>
          </div>
          <div class="stat ${h?"good":""}">
            <div class="stat-value">
              ${h?je(i,"card.grade_goal.reached"):null!==m?je(i,g?"label.sixes_needed_exact":"label.sixes_needed",{n:m}):"—"}
            </div>
            <div class="stat-label">${h||null===m?"":je(i,"label.to_go")}</div>
          </div>
          ${void 0===v||Number.isNaN(v)?G:W`<div class="stat">
                <div class="stat-value">
                  ${r?v:v.toLocaleString(i.language,{maximumFractionDigits:2})}
                </div>
                <div class="stat-label">
                  ${je(i,r?"label.forecast":"label.forecast_report_average")}
                </div>
              </div>`}
        </div>
      </ha-card>
    `}};Yt.styles=[Qe,et,o`
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
    `],e([me()],Yt.prototype,"_config",void 0),Yt=e([he("librus-grade-goal-card")],Yt);const Vt=[1,2,3,4,5,6];let Xt=class extends Ve{constructor(){super(...arguments),this._grade=5,this._weight=1}static getConfigElement(){return Ue()}static getStubConfig(){return{type:"custom:librus-grade-simulator-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 2}render(){if(!this._config||!this.hass)return G;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{deviceId:t,map:a}=e,i=this.hass,s=this._resolveAllByTranslationKey(t,"subject_average"),r=void 0!==this._config.subject_id?s.find(e=>e.subjectId===this._config.subject_id):s[0],o=r?i.states[r.entityId]:void 0,n=Number(o?.state),c=Number(o?.attributes.grade_count)||0;if(!r||Number.isNaN(n))return this._message("mdi:calculator-variant-outline",je(i,"card.grade_simulator.empty"));const d=rt(o),l=void 0!==d&&d.weight>0,h=l?d.average:n,u=l?d.weight:c,p=(h*u+this._grade*this._weight)/(u+this._weight),g=Math.round(100*(p-h))/100,m=function(e,t){const a=t.grade_forecast?e.states[t.grade_forecast]?.attributes.thresholds:void 0;return Array.isArray(a)&&5===a.length?a.map(Number):st}(i,a),v=function(e,t){return 1+t.filter(t=>e>=t).length}(p,m),b=g>0?"good":g<0?"bad":"";return W`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:calculator-variant-outline"></ha-icon></div>
          <div class="title-block">
            <div class="title">${this._config?.title??r.subject}</div>
            <div class="subtitle">
              ${je(i,l?"card.grade_simulator.subtitle_exact":"card.grade_simulator.subtitle")}
            </div>
          </div>
        </div>
        <div class="projection">
          <span class="from">${h.toFixed(2)}</span>
          <ha-icon icon="mdi:arrow-right-thin"></ha-icon>
          <span class="to ${b}">${p.toFixed(2)}</span>
          ${0!==g?W`<span class="delta ${b}">${g>0?"+":""}${g}</span>`:G}
        </div>
        ${d?W`<div class="report">
              ${je(i,"card.grade_simulator.report")}
              <b>${d.predicted}</b>
              <ha-icon icon="mdi:arrow-right-thin"></ha-icon>
              <b class=${v>d.predicted?"good":v<d.predicted?"bad":""}
                >${v}</b
              >
            </div>`:G}
        <div class="grade-row">
          ${Vt.map(e=>W`
              <button
                class="gbtn ${e===this._grade?"active":""}"
                @click=${()=>{this._grade=e}}
              >
                ${e}
              </button>
            `)}
        </div>
        <div class="weight-row">
          <span class="wlabel">${je(i,"label.weight")}</span>
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
    `}};Xt.styles=[Qe,et,o`
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
      .report {
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 0.8rem;
        color: var(--secondary-text-color);
      }
      .report b {
        font-size: 0.95rem;
        color: var(--primary-text-color);
      }
      .report b.good {
        color: var(--lc-good);
      }
      .report b.bad {
        color: var(--lc-bad);
      }
      .report ha-icon {
        --mdc-icon-size: 16px;
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
    `],e([me()],Xt.prototype,"_config",void 0),e([me()],Xt.prototype,"_grade",void 0),e([me()],Xt.prototype,"_weight",void 0),Xt=e([he("librus-grade-simulator-card")],Xt);let Qt=class extends Ve{static getConfigElement(){return Ue()}static getStubConfig(){return{type:"custom:librus-semester-comparison-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 3}render(){if(!this._config||!this.hass)return G;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{deviceId:t}=e,a=this.hass,i=this._resolveAllByTranslationKey(t,"subject_average").map(e=>{const t=a.states[e.entityId]?.attributes??{};return{subject:e.subject,s1:Je(t.average_semester_1),s2:Je(t.average_semester_2)}}).filter(e=>null!==e.s1||null!==e.s2).sort((e,t)=>e.subject.localeCompare(t.subject));return 0===i.length?this._message("mdi:swap-horizontal",je(a,"card.semester_comparison.empty")):W`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:swap-horizontal"></ha-icon></div>
          <div class="title-block">
            <div class="title">${this._config.title??je(a,"card.semester_comparison.title")}</div>
            <div class="subtitle">${je(a,"card.semester_comparison.subtitle")}</div>
          </div>
        </div>
        <div class="rows">
          <div class="row head">
            <span class="subj"></span>
            <span class="val">${je(a,"card.semester_comparison.s1")}</span>
            <span class="val">${je(a,"card.semester_comparison.s2")}</span>
            <span class="delta"></span>
          </div>
          ${i.map(e=>{const t=null!==e.s1&&null!==e.s2?Math.round(100*(e.s2-e.s1))/100:null,a=null===t?"":t>0?"good":t<0?"bad":"";return W`
              <div class="row">
                <span class="subj" title=${e.subject}>${e.subject}</span>
                <span class="val">${null!==e.s1?e.s1.toFixed(2):"—"}</span>
                <span class="val strong">${null!==e.s2?e.s2.toFixed(2):"—"}</span>
                <span class="delta ${a}">
                  ${null===t?"":W`<ha-icon
                          icon=${t>0?"mdi:menu-up":t<0?"mdi:menu-down":"mdi:minus"}
                        ></ha-icon>${0!==t?Math.abs(t).toFixed(2):""}`}
                </span>
              </div>
            `})}
        </div>
      </ha-card>
    `}};Qt.styles=[Qe,et,o`
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
    `],e([me()],Qt.prototype,"_config",void 0),Qt=e([he("librus-semester-comparison-card")],Qt);const ea=["1","2","3","4","5","6"],ta={1:"var(--lc-bad)",2:"var(--lc-bad)",3:"var(--lc-warn)",4:"var(--lc-good)",5:"var(--lc-good)",6:"var(--lc-good)",other:"var(--lc-neutral-dot)"};let aa=class extends Ve{static getConfigElement(){return Ue()}static getStubConfig(){return{type:"custom:librus-grade-distribution-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 2}render(){if(!this._config||!this.hass)return G;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{deviceId:t}=e,a=this.hass,i={1:0,2:0,3:0,4:0,5:0,6:0,other:0};let s=0;for(const e of this._resolveAllByTranslationKey(t,"subject_average")){const t=a.states[e.entityId]?.attributes.grades??[];for(const e of t){const t=/^([1-6])/.exec(e.value.trim())?.[1];i[t??"other"]+=1,s+=1}}if(0===s)return this._message("mdi:chart-bar",je(a,"card.grades.empty"));const r=Math.max(...Object.values(i),1),o=[...ea,"other"];return W`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:chart-bar"></ha-icon></div>
          <div class="title-block">
            <div class="title">${this._config?.title??je(a,"card.grade_distribution.title")}</div>
            <div class="subtitle">${je(a,"card.grade_distribution.subtitle",{count:s})}</div>
          </div>
        </div>
        <div class="histogram">
          ${o.map(e=>{const t=i[e];return W`
              <div class="col">
                <div class="col-count">${t>0?t:""}</div>
                <div class="col-bar-track">
                  <div
                    class="col-bar"
                    style="height:${t/r*100}%;background:${ta[e]}"
                  ></div>
                </div>
                <div class="col-label">${"other"===e?je(a,"card.grade_distribution.other"):e}</div>
              </div>
            `})}
        </div>
      </ha-card>
    `}};aa.styles=[Qe,et,o`
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
    `],e([me()],aa.prototype,"_config",void 0),aa=e([he("librus-grade-distribution-card")],aa);const ia={matematyka:"Mat",fizyka:"Fiz",chemia:"Chem",biologia:"Bio",geografia:"Geo",historia:"Hist",informatyka:"Inf",muzyka:"Muz",plastyka:"Plas",religia:"Rel",etyka:"Ety",technika:"Tech",przyroda:"Przy","wychowanie fizyczne":"WF","zajęcia z wychowawcą":"GW","godzina wychowawcza":"GW","edukacja dla bezpieczeństwa":"EDB","wiedza o społeczeństwie":"WOS"},sa={polski:"Pol",angielski:"Ang",niemiecki:"Niem",francuski:"Fra","hiszpański":"Hisz",rosyjski:"Ros","włoski":"Wł","łaciński":"Łac"},ra=new Set(["z","i","w","o","dla","na","ze"]);function oa(e){const[t,...a]=e.split(" + ");if(a.length)return`${oa(t)}+`;const i=e.replace(/\(.*\)/,"").trim(),s=i.toLowerCase();if(ia[s])return ia[s];const r=s.match(/^język\s+(\S+)/);if(r){const e=r[1];return sa[e]??e.charAt(0).toUpperCase()+e.slice(1,3)}const o=i.split(/\s+/).filter(e=>!ra.has(e.toLowerCase()));return o.length>1?o.slice(0,3).map(e=>e.charAt(0).toUpperCase()).join(""):i.length<=4?i:i.slice(0,3)}let na=class extends Ve{static getConfigElement(){return Ue()}static getStubConfig(){return{type:"custom:librus-grades-radar-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 3}render(){if(!this._config||!this.hass)return G;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{deviceId:t}=e,a=this.hass,i=[];for(const e of this._resolveAllByTranslationKey(t,"subject_average")){const t=a.states[e.entityId]?.state,s=void 0!==t?Number(t):NaN;Number.isFinite(s)&&i.push({label:oa(e.subject),title:e.subject,value:s})}if(i.length<3)return this._message("mdi:chart-timeline-variant",je(a,"card.grades_radar.empty"));const s=i.reduce((e,t)=>e+t.value,0)/i.length;return W`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:chart-timeline-variant"></ha-icon></div>
          <div class="title-block">
            <div class="title">${this._config?.title??je(a,"card.grades_radar.title")}</div>
            <div class="subtitle">${je(a,"card.grades_radar.subtitle")}</div>
          </div>
        </div>
        <div class="chart-wrap">${function(e,t={}){const a=t.width??220,i=t.height??200,s=t.max??6,r=t.colorVar??"var(--lc-brand)",o=t.ringCount??3,n=a/2,c=i/2-4,d=Math.min(a,i)/2-32,l=e.length;if(l<3)return W`<svg width=${a} height=${i} viewBox="0 0 ${a} ${i}" class="radar-chart"></svg>`;const h=e=>-Math.PI/2+2*e*Math.PI/l,u=(e,t)=>{const a=Math.max(0,Math.min(s,t))/s*d;return[n+a*Math.cos(h(e)),c+a*Math.sin(h(e))]},p=Array.from({length:o},(e,t)=>s*(t+1)/o),g=e.map((e,t)=>u(t,s)),m=e.map((e,t)=>u(t,e.value)),v=m.map(e=>e.join(",")).join(" ");return W`
    <svg width=${a} height=${i} viewBox="0 0 ${a} ${i}" class="radar-chart">
      ${p.map(t=>H`<polygon
            points=${e.map((e,a)=>u(a,t).join(",")).join(" ")}
            class="radar-grid"
          ></polygon>`)}
      ${g.map(([e,t])=>H`<line x1=${n} y1=${c} x2=${e} y2=${t} class="radar-axis"></line>`)}
      <polygon
        points=${v}
        fill=${r}
        fill-opacity="0.22"
        stroke=${r}
        stroke-width="2"
        stroke-linejoin="round"
      ></polygon>
      ${m.map(([e,t])=>H`<circle cx=${e} cy=${t} r="3.2" fill=${r}></circle>`)}
      ${e.map((e,t)=>{const[a,i]=u(t,1.18*s),r=Math.cos(h(t)),o=Math.abs(r)<.3?"middle":r>0?"start":"end";return H`<text x=${a} y=${i+3} text-anchor=${o} class="radar-label">${e.title?H`<title>${e.title}</title>`:""}${e.label}</text>`})}
    </svg>
  `}(i,{max:6})}</div>
        <div class="legend">
          <span class="legend-item">
            <span class="dot" style="background:var(--lc-brand)"></span>
            ${je(a,"label.average")} <b>${s.toFixed(2)}</b>
          </span>
        </div>
      </ha-card>
    `}};na.styles=[Qe,et],e([me()],na.prototype,"_config",void 0),na=e([he("librus-grades-radar-card")],na);const ca=Array.from({length:16},(e,t)=>`var(--lc-chart-${t+1})`);let da=class extends Ve{static getConfigElement(){return Ue()}static getStubConfig(){return{type:"custom:librus-grade-category-distribution-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 3}render(){if(!this._config||!this.hass)return G;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{deviceId:t}=e,a=this.hass,i=new Map;for(const e of this._resolveAllByTranslationKey(t,"subject_average")){const t=a.states[e.entityId]?.attributes.grades??[];for(const e of t){const t=e.category??"__uncategorized";i.set(t,(i.get(t)??0)+1)}}const s=[...i.values()].reduce((e,t)=>e+t,0);if(0===s)return this._message("mdi:chart-donut",je(a,"card.grade_category_distribution.empty"));const r=[...i.entries()].sort((e,t)=>t[1]-e[1]).map(([e,t],i)=>({label:"__uncategorized"===e?je(a,"card.grade_category_distribution.uncategorized"):e,value:t,colorVar:ca[i%ca.length]}));return W`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:chart-bar"></ha-icon></div>
          <div class="title-block">
            <div class="title">${this._config?.title??je(a,"card.grade_category_distribution.title")}</div>
            <div class="subtitle">${je(a,"card.grade_category_distribution.subtitle")}</div>
          </div>
        </div>
        ${tt(r)}
      </ha-card>
    `}};da.styles=[Qe,et],e([me()],da.prototype,"_config",void 0),da=e([he("librus-grade-category-distribution-card")],da);let la=class extends Ve{static getConfigElement(){return Ue()}static getStubConfig(){return{type:"custom:librus-latest-grade-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 2}render(){if(!this._config||!this.hass)return G;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{deviceId:t}=e,a=this.hass,i=function(e,t){let a=null;for(const i of t){const t=e.states[i.entityId]?.attributes;t?.latest_grade&&t.latest_grade_date&&(!a||t.latest_grade_date>a.date)&&(a={subject:i.subject,grade:t.latest_grade,date:t.latest_grade_date,comments:t.latest_grade_comments??[]})}return a}(a,this._resolveAllByTranslationKey(t,"subject_average"));return i?W`
      <ha-card>
        <div class="header">
          <div class="icon-badge amber"><ha-icon icon="mdi:star-outline"></ha-icon></div>
          <div class="title-block">
            <div class="title">${this._config?.title??je(a,"card.latest_grade.title")}</div>
            <div class="subtitle">${i.subject} &middot; ${He(i.date,a.language)}</div>
          </div>
          <div class="grade-badge">${i.grade}</div>
        </div>
        ${i.comments.length?W`
              <hr />
              ${i.comments.map(e=>W`<div class="quote">${e}</div>`)}
            `:G}
      </ha-card>
    `:this._message("mdi:star-outline",je(a,"card.latest_grade.empty"))}};la.styles=[Qe,et,o`
      .grade-badge {
        font-size: 1.5rem;
        font-weight: 800;
        color: var(--lc-brand);
        flex: none;
      }
    `],e([me()],la.prototype,"_config",void 0),la=e([he("librus-latest-grade-card")],la);let ha=class extends Ve{static getConfigElement(){return Ue()}static getStubConfig(){return{type:"custom:librus-behaviour-grade-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 2}render(){if(!this._config||!this.hass)return G;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{map:t}=e,a=this.hass,i=t.behaviour_grade?a.states[t.behaviour_grade]:void 0,s=(i?.attributes.recent??[])[0];if(!s)return this._message("mdi:medal-outline",je(a,"card.behaviour_grade.empty"));const r=s.grade||s.short_name,o=!s.name&&s.value?s.value:null,n=(s.comments??[]).map(e=>e.trim()).filter(Boolean);return W`
      <ha-card>
        <div class="header">
          <div class="icon-badge good"><ha-icon icon="mdi:medal-outline"></ha-icon></div>
          <div class="title-block">
            <div class="title">${this._config?.title??je(a,"card.behaviour_grade.title")}</div>
            <div class="subtitle">${s.category??je(a,"card.behaviour_grade.subtitle")}</div>
          </div>
          ${r?W`<div class="grade-badge">${r}</div>`:G}
        </div>
        ${s.name?W`<div class="grade-name">${s.name}</div>`:G}
        ${null!==o?W`<div class="stats"><div class="stat good"><div class="stat-value">${o>0?"+":""}${o}</div><div class="stat-label">pkt</div></div></div>`:G}
        ${s.text?W`<div class="quote">${s.text}</div>`:G}
        ${n.length?W`<div class="comment">${n.join(" · ")}</div>`:G}
      </ha-card>
    `}};function ua(e,t,a){const i="oldest"===t.sort?[...e].reverse():[...e],s=t.max_items??a;return void 0!==s?i.slice(0,s):i}ha.styles=[Qe,et,o`
      .grade-badge {
        font-size: 1.5rem;
        font-weight: 800;
        color: var(--lc-good);
        flex: none;
      }
      .grade-name {
        font-size: 1.05rem;
        font-weight: 700;
        color: var(--lc-good);
      }
      .grade-name::first-letter {
        text-transform: uppercase;
      }
      .comment {
        font-size: 0.8rem;
        color: var(--secondary-text-color);
        line-height: 1.4;
      }
    `],e([me()],ha.prototype,"_config",void 0),ha=e([he("librus-behaviour-grade-card")],ha);let pa=class extends Ve{static getConfigElement(){return Ue()}static getStubConfig(){return{type:"custom:librus-descriptive-grades-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 2}render(){if(!this._config||!this.hass)return G;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{map:t}=e,a=this.hass,i=t.descriptive_grades?a.states[t.descriptive_grades]:void 0,s=ft(i?.attributes).sort((e,t)=>(t.date??"").localeCompare(e.date??""));return i&&0!==s.length?W`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:text-box-outline"></ha-icon></div>
          <div class="title-block">
            <div class="title">${this._config?.title??je(a,"card.descriptive_grades.title")}</div>
            <div class="subtitle">${je(a,"card.descriptive_grades.subtitle")}</div>
          </div>
        </div>
        <div class="scroll-list">
          ${ua(s,this._config).map(e=>W`
              <div class="list-item">
                <div class="grade-chip">${e.value}</div>
                <div class="body">
                  <div class="row1">
                    <span>${e.subject}${e.category?W` · <span class="cat-label">${e.category}</span>`:G}</span>
                    ${e.date?W`<time>${He(e.date,a.language)}</time>`:G}
                  </div>
                  ${e.teacher&&!this._config?.hide_teacher?W`<div class="item-text">${e.teacher}</div>`:G}
                  ${e.comments.length?W`<div class="quote">${e.comments.join(" · ")}</div>`:G}
                </div>
              </div>
            `)}
        </div>
      </ha-card>
    `:this._message("mdi:text-box-outline",je(a,"card.descriptive_grades.empty"))}};pa.styles=[Qe,et,o`
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
    `],e([me()],pa.prototype,"_config",void 0),pa=e([he("librus-descriptive-grades-card")],pa);let ga=class extends Ve{static getConfigElement(){return Ue()}static getStubConfig(){return{type:"custom:librus-subject-spotlight-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 2}render(){if(!this._config||!this.hass)return G;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{deviceId:t}=e,a=this.hass,i=this._resolveAllByTranslationKey(t,"subject_average").map(e=>({subject:e.subject,state:a.states[e.entityId]})).filter(e=>e.state&&!be.has(e.state.state)).map(e=>({subject:e.subject,value:Number(e.state.state),forecast:rt(e.state)?.predicted})).filter(e=>!Number.isNaN(e.value));if(i.length<2)return this._message("mdi:podium-gold",je(a,"card.subject_spotlight.empty"));const s=i.reduce((e,t)=>t.value>e.value?t:e),r=i.reduce((e,t)=>t.value<e.value?t:e),o=e=>e.toLocaleString(a.language,{maximumFractionDigits:2});return W`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:podium-gold"></ha-icon></div>
          <div class="title-block">
            <div class="title">${this._config?.title??je(a,"card.subject_spotlight.title")}</div>
            <div class="subtitle">${je(a,"card.subject_spotlight.subtitle")}</div>
          </div>
        </div>
        <div class="spotlight-row">
          <div class="spotlight-tile good">
            <ha-icon icon="mdi:trophy-outline"></ha-icon>
            <div class="spotlight-value">${o(s.value)}</div>
            <div class="spotlight-subject">${s.subject}</div>
            <div class="spotlight-label">${je(a,"card.subject_spotlight.best")}</div>
            ${void 0!==s.forecast?W`<div class="spotlight-forecast">${je(a,"label.forecast_grade",{grade:s.forecast})}</div>`:G}
          </div>
          <div class="spotlight-tile warn">
            <ha-icon icon="mdi:book-open-page-variant-outline"></ha-icon>
            <div class="spotlight-value">${o(r.value)}</div>
            <div class="spotlight-subject">${r.subject}</div>
            <div class="spotlight-label">${je(a,"card.subject_spotlight.weakest")}</div>
            ${void 0!==r.forecast?W`<div class="spotlight-forecast">${je(a,"label.forecast_grade",{grade:r.forecast})}</div>`:G}
          </div>
        </div>
      </ha-card>
    `}};ga.styles=[Qe,et,o`
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
      .spotlight-forecast {
        font-size: 0.7rem;
        font-weight: 700;
        color: var(--secondary-text-color);
        margin-top: 2px;
      }
      .spotlight-label {
        font-size: 0.62rem;
        color: var(--secondary-text-color);
        text-transform: uppercase;
        letter-spacing: 0.04em;
      }
    `],e([me()],ga.prototype,"_config",void 0),ga=e([he("librus-subject-spotlight-card")],ga);const ma=/^obecno|^present/i,va=/uspr\.?/i;function ba(e,t){return t?.[e]??ma.test(e)?"good":va.test(e)?"warn":"bad"}let _a=class extends Ve{static getConfigElement(){return Ue()}static getStubConfig(){return{type:"custom:librus-attendance-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 2}render(){if(!this._config||!this.hass)return G;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{map:t}=e,a=this.hass,i=t.attendance?a.states[t.attendance]:void 0;if(!i)return this._message("mdi:calendar-remove",je(a,"empty.generic_error"));const s=i.attributes.breakdown??{},r=i.attributes.presence_by_type,o=i.attributes.total_records??0,n=i.attributes.percentage,c=i.attributes.by_semester??{},d=Object.entries(c).sort(([e],[t])=>Number(e)-Number(t)),l=Number(i.state)||0,h=i.attributes.unexcused_count,u=i.attributes.excused_count,p=void 0!==h,g=Object.entries(s),m={good:"var(--lc-good)",warn:"var(--lc-warn)",bad:"var(--lc-bad)"},v=g.map(([e,t])=>({flexGrow:Math.max(t,.001),colorVar:m[ba(e,r)],title:`${e}: ${t}`}));return W`
      <ha-card>
        <div class="header">
          <div class="icon-badge bad"><ha-icon icon="mdi:calendar-remove"></ha-icon></div>
          <div class="title-block">
            <div class="title">${this._config?.title??je(a,"card.attendance.title")}</div>
            <div class="subtitle">${je(a,"card.attendance.subtitle")}</div>
          </div>
        </div>
        <div class="stats">
          ${null!=n?W`
                <div class="stat ${n>=90?"good":n<75?"bad":""}">
                  <div class="stat-value">${n}<span class="unit">%</span></div>
                  <div class="stat-label">${je(a,"stat.percentage")}</div>
                </div>
              `:G}
          ${p?W`
                <div class="stat ${h>0?"bad":""}">
                  <div class="stat-value">${h}</div>
                  <div class="stat-label" title=${je(a,"stat.unexcused")}>${je(a,"stat.unexcused_short")}</div>
                </div>
                <div class="stat ${u>0?"warn":""}">
                  <div class="stat-value">${u}</div>
                  <div class="stat-label" title=${je(a,"stat.excused")}>${je(a,"stat.excused_short")}</div>
                </div>
              `:W`
                <div class="stat bad">
                  <div class="stat-value">${l}</div>
                  <div class="stat-label">${je(a,"stat.absences")}</div>
                </div>
              `}
          <div class="stat">
            <div class="stat-value">${o}</div>
            <div class="stat-label">${je(a,"stat.records")}</div>
          </div>
        </div>
        ${v.length?function(e){return W`
    <div class="bar">
      ${e.map(e=>W`<div
            class="seg"
            style="flex-grow:${e.flexGrow};background:${e.colorVar}"
            title=${e.title??""}
          ></div>`)}
    </div>
  `}(v):G}
        ${g.length?W`
              <div class="legend">
                ${g.map(([e,t])=>W`
                    <span class="legend-item">
                      <span class="legend-dot ${ba(e,r)}"></span>${e}
                      <b>${t}</b>
                    </span>
                  `)}
              </div>
            `:G}
        ${d.length>1?W`
              <hr />
              <div class="semester-block">
                <div class="semester-title">${je(a,"card.attendance.by_semester")}</div>
                ${d.map(([e,t])=>W`
                    <div class="semester-row">
                      <span>${je(a,"card.attendance.semester",{n:e})}</span>
                      <span class="semester-pct">${null!=t.percentage?`${t.percentage}%`:"–"}</span>
                    </div>
                  `)}
              </div>
            `:G}
      </ha-card>
    `}};_a.styles=[Qe,et,o`
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
    `],e([me()],_a.prototype,"_config",void 0),_a=e([he("librus-attendance-card")],_a);let fa=class extends Ve{static getConfigElement(){return Ue()}static getStubConfig(){return{type:"custom:librus-attendance-tile-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 1}render(){if(!this._config||!this.hass)return G;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{map:t}=e,a=this.hass,i=t.attendance?a.states[t.attendance]:void 0;if(!i)return this._message("mdi:calendar-remove",je(a,"empty.generic_error"));const s=i.attributes.percentage,r=i.attributes.unexcused_count??(Number(i.state)||0),o=i.attributes.excused_count;return W`
      <ha-card class="tile" @click=${Jt(this,this._config.tap_action,t.attendance)}>
        <div class="icon-badge ${0===r?"good":"bad"}">
          <ha-icon icon="mdi:calendar-remove"></ha-icon>
        </div>
        <div class="tile-body">
          <div class="subj">
            ${r} ${je(a,"stat.absences").toLowerCase()}
          </div>
          ${null!=s||o?W`
                <div class="meta">
                  ${null!=s?W`${je(a,"stat.percentage")}: ${s}%`:G}
                  ${o?W`${null!=s?" · ":""}${o} ${je(a,"stat.excused").toLowerCase()}`:G}
                </div>
              `:G}
        </div>
      </ha-card>
    `}};fa.styles=[Qe,et,o`
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
    `],e([me()],fa.prototype,"_config",void 0),fa=e([he("librus-attendance-tile-card")],fa);const ya=[0,1,2,3,4];let wa=class extends Ve{static getConfigElement(){return Ue()}static getStubConfig(){return{type:"custom:librus-attendance-heatmap-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 2}render(){if(!this._config||!this.hass)return G;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{map:t}=e,a=this.hass,i=t.attendance?a.states[t.attendance]:void 0,s=i?.attributes.by_date;if(!i||!s||0===Object.keys(s).length)return this._message("mdi:calendar-blank-outline",je(a,"card.attendance_heatmap.empty"));const r=t.school_class?a.states[t.school_class]:void 0,o=r?.attributes.school_year_start,n=new Date,c=mt(n),d=this._gridCache;let l,h;if(d&&d.byDate===s&&d.yearStartIso===o&&d.todayIso===c)({weeks:l,grid:h}=d);else{const e=bt(n),t=o?bt(new Date(`${o}T00:00:00`)):new Date(e.getTime()-96768e5);l=[];for(let a=new Date(t);a<=e;a.setDate(a.getDate()+7))l.push(new Date(a));h=W`${l.map(e=>W`
          <div class="heatmap-col">
            ${ya.map(t=>{const i=new Date(e);if(i.setDate(i.getDate()+t),i>n)return W`<span class="cell future"></span>`;const r=mt(i),o=s[r];return W`<span class="cell ${o??"none"}" title=${`${r}${o?` - ${je(a,`card.attendance_heatmap.status.${o}`)}`:""}`}></span>`})}
          </div>
        `)}`,this._gridCache={byDate:s,yearStartIso:o,todayIso:c,weeks:l,grid:h}}return W`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:calendar-blank-outline"></ha-icon></div>
          <div class="title-block">
            <div class="title">${this._config?.title??je(a,"card.attendance_heatmap.title")}</div>
            <div class="subtitle">${je(a,"card.attendance_heatmap.subtitle")}</div>
          </div>
        </div>
        <div class="heatmap-scroll">
          <div class="heatmap" style="grid-template-columns: repeat(${l.length}, 11px);">
            ${h}
          </div>
        </div>
        <div class="heatmap-legend">
          <span class="legend-item"><span class="cell good"></span>${je(a,"card.attendance_heatmap.status.good")}</span>
          <span class="legend-item"><span class="cell warn"></span>${je(a,"card.attendance_heatmap.status.warn")}</span>
          <span class="legend-item"><span class="cell bad"></span>${je(a,"card.attendance_heatmap.status.bad")}</span>
          <span class="legend-item"><span class="cell none"></span>${je(a,"card.attendance_heatmap.no_data")}</span>
        </div>
      </ha-card>
    `}};wa.styles=[Qe,et,o`
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
    `],e([me()],wa.prototype,"_config",void 0),wa=e([he("librus-attendance-heatmap-card")],wa);const xa=[1,2,3,4,5],ka=["excused","unexcused","late"],$a={excused:"var(--lc-warn)",unexcused:"var(--lc-bad)",late:"var(--lc-brand)"},za={excused:"stat.excused",unexcused:"stat.unexcused",late:"stat.late"};let ja=class extends Ve{static getConfigElement(){return Ue()}static getStubConfig(){return{type:"custom:librus-attendance-weekday-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 3}render(){if(!this._config||!this.hass)return G;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{map:t}=e,a=this.hass,i=t.attendance?a.states[t.attendance]:void 0,s=i?.attributes.by_weekday,r=xa.map(e=>{const t=s?.[String(e)];return(t?.excused??0)+(t?.unexcused??0)+(t?.late??0)}),o=r.reduce((e,t)=>e+t,0);if(!s||0===o)return this._message("mdi:chart-bar-stacked",je(a,"card.attendance_weekday.empty"));const n=Math.max(...r,1),c={excused:0,unexcused:0,late:0};for(const e of xa){const t=s[String(e)];t&&(c.excused+=t.excused,c.unexcused+=t.unexcused,c.late+=t.late)}const d=xa.map(e=>new Date(2026,0,e+4).toLocaleDateString(a.language,{weekday:"short"}));return W`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:chart-bar-stacked"></ha-icon></div>
          <div class="title-block">
            <div class="title">${this._config?.title??je(a,"card.attendance_weekday.title")}</div>
            <div class="subtitle">${je(a,"card.attendance_weekday.subtitle")}</div>
          </div>
        </div>
        <div class="weekday-bars">
          ${xa.map((e,t)=>{const i=s[String(e)],o=r[t],c=o>0?Math.max(22,o/n*84):4;return W`
              <div class="weekday-col">
                <div class="weekday-total">${o||""}</div>
                <div class="weekday-bar-stack" style="height:${c}px;${0===o?"background:var(--divider-color);":""}">
                  ${ka.filter(e=>i&&i[e]>0).map(e=>W`
                      <div
                        class="seg"
                        style="height:${(i[e]/o*c).toFixed(1)}px;background:${$a[e]}"
                        title="${je(a,za[e])}: ${i[e]}"
                      ></div>
                    `)}
                </div>
                <div class="weekday-label">${d[t]}</div>
              </div>
            `})}
        </div>
        <div class="legend">
          ${ka.map(e=>W`
              <span class="legend-item">
                <span class="dot" style="background:${$a[e]}"></span>${je(a,za[e])} <b>${c[e]}</b>
              </span>
            `)}
        </div>
      </ha-card>
    `}};ja.styles=[Qe,et,o`
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
    `],e([me()],ja.prototype,"_config",void 0),ja=e([he("librus-attendance-weekday-card")],ja);let Ca=class extends Ve{static getConfigElement(){return Ue()}static getStubConfig(){return{type:"custom:librus-attendance-subject-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 3}render(){if(!this._config||!this.hass)return G;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{map:t}=e,a=this.hass,i=t.attendance?a.states[t.attendance]:void 0,s=i?.attributes.by_subject,r=Object.entries(s??{}).map(([e,t])=>({subject:e,unexcused:t.unexcused,excused:t.excused,total:t.unexcused+t.excused})).filter(e=>e.total>0).sort((e,t)=>t.total-e.total);if(0===r.length)return this._message("mdi:book-remove-outline",je(a,"card.attendance_subject.empty"));const o=Math.max(1,...r.map(e=>e.total));return W`
      <ha-card>
        <div class="header">
          <div class="icon-badge bad"><ha-icon icon="mdi:book-remove-outline"></ha-icon></div>
          <div class="title-block">
            <div class="title">${this._config?.title??je(a,"card.attendance_subject.title")}</div>
            <div class="subtitle">${je(a,"card.attendance_subject.subtitle")}</div>
          </div>
        </div>
        <div class="hbar-chart">
          ${r.map(e=>{const t=Math.round(e.total/o*100),a=e.total?Math.round(e.unexcused/e.total*100):0,i=100-a;return W`
              <div class="hbar-row">
                <span class="hbar-label" title=${e.subject}>${e.subject}</span>
                <span class="sbar-track" style="width:${t}%">
                  ${e.unexcused?W`<span class="sbar-seg unexcused" style="width:${a}%"></span>`:G}
                  ${e.excused?W`<span class="sbar-seg excused" style="width:${i}%"></span>`:G}
                </span>
                <b class="hbar-val">${e.total}</b>
              </div>
            `})}
        </div>
        <div class="legend">
          <span class="legend-item"><span class="dot" style="background:var(--lc-bad)"></span>${je(a,"stat.unexcused")}</span>
          <span class="legend-item"><span class="dot" style="background:var(--lc-warn)"></span>${je(a,"stat.excused")}</span>
        </div>
      </ha-card>
    `}};Ca.styles=[Qe,et,o`
      .sbar-track {
        height: 10px;
        border-radius: 5px;
        background: var(--divider-color);
        overflow: hidden;
        display: flex;
      }
      .sbar-seg {
        height: 100%;
      }
      .sbar-seg:first-child {
        border-radius: 5px 0 0 5px;
      }
      .sbar-seg:last-child {
        border-radius: 0 5px 5px 0;
      }
      .sbar-seg.unexcused {
        background: var(--lc-bad);
      }
      .sbar-seg.excused {
        background: var(--lc-warn);
      }
    `],e([me()],Ca.prototype,"_config",void 0),Ca=e([he("librus-attendance-subject-card")],Ca);const Sa=e=>e.total<5?"few":e.percentage<50?"bad":e.percentage<90?"warn":"good";let Da=class extends Ve{static getConfigElement(){return Ue()}static getStubConfig(){return{type:"custom:librus-subject-attendance-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 4}render(){if(!this._config||!this.hass)return G;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{map:t}=e,a=this.hass,i=t.subject_attendance?a.states[t.subject_attendance]:void 0;if(!i)return this._message("mdi:calendar-check-outline",je(a,"card.subject_attendance.title"),je(a,"card.subject_attendance.needs_backend"));const s=i.attributes.subjects??{},r=Object.entries(s).map(([e,t])=>({name:e,...t,level:Sa(t)})).sort((e,t)=>Number("few"===e.level)-Number("few"===t.level)||e.percentage-t.percentage||t.total-e.total);if(0===r.length)return this._message("mdi:calendar-check-outline",je(a,"card.subject_attendance.empty"));const o=r.filter(e=>"few"!==e.level),n=o[0],c=o.filter(e=>"bad"===e.level).length;return W`
      <ha-card>
        <div class="header">
          <div class="icon-badge ${c?"bad":"good"}"><ha-icon icon="mdi:calendar-check-outline"></ha-icon></div>
          <div class="title-block">
            <div class="title">${this._config.title??je(a,"card.subject_attendance.title")}</div>
            ${n?W`<div class="subtitle">
                  ${je(a,"card.subject_attendance.lowest")} <b>${n.name} ${(e=>`${e.toLocaleString(a.language,{maximumFractionDigits:1})}%`)(n.percentage)}</b>
                </div>`:G}
          </div>
          <span class="pill ${c?"bad":"good"}"
            >${c?je(a,"card.subject_attendance.at_risk",{count:c}):je(a,"card.subject_attendance.no_risk")}</span
          >
        </div>
        <div class="tiles">
          ${r.map(e=>W`
              <div
                class="tile ${e.level}"
                title=${je(a,"card.subject_attendance.tooltip",{subject:e.name,present:e.present,total:e.total})}
              >
                <div class="ab">${oa(e.name)}</div>
                <div class="v">${"few"===e.level?"–":`${Math.round(e.percentage)}%`}</div>
                <div class="n">${e.present}/${e.total}</div>
              </div>
            `)}
        </div>
        <div class="legend">
          <span class="legend-item"><span class="dot" style="background:var(--lc-good)"></span>${je(a,"card.subject_attendance.legend_good")}</span>
          <span class="legend-item"><span class="dot" style="background:var(--lc-warn)"></span>${je(a,"card.subject_attendance.legend_warn")}</span>
          <span class="legend-item"><span class="dot" style="background:var(--lc-bad)"></span>${je(a,"card.subject_attendance.legend_bad")}</span>
          <span class="legend-item"><span class="dot" style="background:var(--lc-neutral-dot)"></span>${je(a,"card.subject_attendance.legend_few")}</span>
        </div>
      </ha-card>
    `}};Da.styles=[Qe,et,o`
      .subtitle b {
        color: var(--primary-text-color);
      }
      .pill {
        margin-left: auto;
        flex: none;
        font-size: 0.72rem;
        font-weight: 700;
        padding: 3px 9px;
        border-radius: 999px;
        white-space: nowrap;
      }
      .pill.good {
        background: var(--lc-good-bg);
        color: var(--lc-good);
      }
      .pill.bad {
        background: var(--lc-bad-bg);
        color: var(--lc-bad);
      }
      .tiles {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(60px, 1fr));
        gap: 7px;
      }
      .tile {
        border-radius: 9px;
        padding: 8px 4px 7px;
        text-align: center;
        background: var(--lc-chip-bg);
        border: 1px solid transparent;
      }
      .tile .ab {
        font-size: 0.72rem;
        font-weight: 700;
        color: var(--secondary-text-color);
      }
      .tile .v {
        font-size: 0.95rem;
        font-weight: 800;
        font-variant-numeric: tabular-nums;
        margin-top: 2px;
      }
      .tile .n {
        font-size: 0.64rem;
        color: var(--secondary-text-color);
        font-variant-numeric: tabular-nums;
      }
      .tile.good .v {
        color: var(--lc-good);
      }
      .tile.warn {
        background: var(--lc-warn-bg);
      }
      .tile.warn .v {
        color: var(--lc-warn);
      }
      .tile.bad {
        background: var(--lc-bad-bg);
        border-color: var(--lc-bad);
      }
      .tile.bad .v {
        color: var(--lc-bad);
      }
      .tile.few .v {
        color: var(--secondary-text-color);
        font-weight: 500;
        font-size: 0.8rem;
      }
    `],e([me()],Da.prototype,"_config",void 0),Da=e([he("librus-subject-attendance-card")],Da);const Ta=4.75;let Na=class extends Ve{static getConfigElement(){return Ue()}static getStubConfig(){return{type:"custom:librus-report-card-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 5}render(){if(!this._config||!this.hass)return G;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{map:t}=e,a=this.hass,i=t.grade_forecast?a.states[t.grade_forecast]:void 0;if(!i)return this._message("mdi:certificate-outline",je(a,"card.report_card.needs_backend"));const s=(i.attributes.subjects??[]).filter(e=>e&&"number"==typeof e.predicted);if(be.has(i.state)||0===s.length)return this._message("mdi:certificate-outline",je(a,"card.report_card.empty"));const r=Number(i.state),o=s.filter(e=>e.at_risk).length,n=s.filter(e=>e.declining).length,c=r>=Ta,d=Math.max(0,Math.min(100,(r-4)/.75*100)),l=e=>e.toLocaleString(a.language,{minimumFractionDigits:2,maximumFractionDigits:2}),h="school_year"===i.attributes.basis?"school_year":"semester_1";return W`
      <ha-card class="static">
        <div class="header">
          <div class="icon-badge ${c?"good":""}"><ha-icon icon="mdi:certificate-outline"></ha-icon></div>
          <div class="title-block">
            <div class="title">${this._config.title??je(a,"card.report_card.title")}</div>
            <div class="subtitle">
              ${je(a,"school_year"===h?"card.report_card.basis_school_year":"card.report_card.basis_semester_1")}
            </div>
          </div>
        </div>

        <div class="summary">
          <div>
            <div class="big">${l(r)}</div>
            <div class="big-label">${je(a,"card.report_card.average")}</div>
          </div>
          <div class="chips">
            ${o?W`<span class="chip bad">${je(a,"card.report_card.at_risk",{n:o})}</span>`:G}
            ${n?W`<span class="chip warn">${je(a,"card.report_card.declining",{n:n})}</span>`:G}
            ${o||n?G:W`<span class="chip good">${je(a,"card.report_card.all_clear")}</span>`}
          </div>
        </div>
        <div class="honours">
          <div class="hbar"><span class=${c?"done":""} style="width:${d}%"></span></div>
          <div class="hrow">
            <span>${je(a,"card.report_card.honours_from",{avg:l(Ta)})}</span>
            <span>
              ${c?W`<b class="ok">${je(a,"card.report_card.honours_ok")}</b>`:W`${je(a,"card.report_card.missing")} <b>${l(Ta-r)}</b>`}
            </span>
          </div>
        </div>

        <div class="tiles">
          ${s.map(e=>W`
              <div
                class="tile ${e.at_risk?"bad":e.declining?"warn":6===e.predicted?"six":""}"
                title=${`${e.subject}: ${l(e.average)}`}
              >
                <div class="g">${e.predicted}${e.declining?"↓":""}</div>
                <div class="n">${e.subject}</div>
                <div class="a">${l(e.average)}</div>
              </div>
            `)}
        </div>

        ${this._closest(s).length?W`
              <hr />
              <div class="closest">
                <div class="ct">${je(a,"card.report_card.closest")}</div>
                ${this._closest(s).map(([e,t])=>W`<div class="ci"><span>${e}</span><span>${t}</span></div>`)}
              </div>
            `:G}
        <div class="foot">
          ${je(a,"card.report_card.footer")}${c?W` ${je(a,"card.report_card.footer_behaviour")}`:G}
        </div>
      </ha-card>
    `}_closest(e){const t=this.hass,a=[];for(const i of e.filter(e=>e.at_risk&&e.sixes_to_next))a.push([i.subject,je(t,"card.report_card.sixes_to",{n:i.sixes_to_next,grade:i.predicted+1})]);for(const i of e.filter(e=>!e.at_risk&&1===e.sixes_to_next))a.push([i.subject,je(t,"card.report_card.sixes_to",{n:1,grade:i.predicted+1})]);for(const i of e.filter(e=>1===e.ones_to_drop))a.push([i.subject,je(t,"card.report_card.one_drops",{grade:i.predicted-1})]);return a.slice(0,3)}};Na.styles=[Qe,et,o`
      .summary {
        display: flex;
        align-items: center;
        gap: 14px;
      }
      .big {
        font-size: 2rem;
        font-weight: 800;
        font-variant-numeric: tabular-nums;
        line-height: 1;
        color: var(--lc-brand);
      }
      .big-label {
        font-size: 0.7rem;
        color: var(--secondary-text-color);
        margin-top: 3px;
      }
      .chips {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
        margin-left: auto;
        justify-content: flex-end;
      }
      .chip {
        font-size: 0.7rem;
        font-weight: 700;
        padding: 4px 9px;
        border-radius: 999px;
        white-space: nowrap;
      }
      .chip.good {
        background: var(--lc-good-bg);
        color: var(--lc-good);
      }
      .chip.bad {
        background: var(--lc-bad-bg);
        color: var(--lc-bad);
      }
      .chip.warn {
        background: var(--lc-warn-bg);
        color: var(--lc-warn);
      }
      .honours {
        display: flex;
        flex-direction: column;
        gap: 5px;
      }
      .hbar {
        height: 6px;
        border-radius: 3px;
        background: var(--divider-color);
        position: relative;
        overflow: hidden;
      }
      .hbar span {
        position: absolute;
        inset: 0 auto 0 0;
        background: var(--lc-amber);
        border-radius: 3px;
      }
      .hbar span.done {
        background: var(--lc-good);
      }
      .hrow {
        display: flex;
        justify-content: space-between;
        gap: 8px;
        font-size: 0.7rem;
        color: var(--secondary-text-color);
      }
      .hrow b {
        color: var(--primary-text-color);
      }
      .hrow b.ok {
        color: var(--lc-good);
      }
      .tiles {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(84px, 1fr));
        gap: 6px;
      }
      .tile {
        border-radius: 9px;
        padding: 8px 6px 7px;
        background: var(--lc-chip-bg);
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1px;
        text-align: center;
        min-width: 0;
      }
      .tile .g {
        font-size: 1.3rem;
        font-weight: 800;
        line-height: 1.1;
        color: var(--lc-brand);
      }
      .tile .n {
        font-size: 0.66rem;
        font-weight: 600;
        max-width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .tile .a {
        font-size: 0.62rem;
        color: var(--secondary-text-color);
        font-variant-numeric: tabular-nums;
      }
      .tile.six .g {
        color: var(--lc-good);
      }
      .tile.warn {
        background: var(--lc-warn-bg);
      }
      .tile.warn .g {
        color: var(--lc-warn);
      }
      .tile.bad {
        background: var(--lc-bad-bg);
      }
      .tile.bad .g {
        color: var(--lc-bad);
      }
      .closest {
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
      .closest .ct {
        font-size: 0.68rem;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        color: var(--secondary-text-color);
        font-weight: 700;
      }
      .closest .ci {
        font-size: 0.76rem;
        display: flex;
        justify-content: space-between;
        gap: 8px;
      }
      .closest .ci span:last-child {
        color: var(--secondary-text-color);
        white-space: nowrap;
      }
      .foot {
        font-size: 0.66rem;
        color: var(--secondary-text-color);
        line-height: 1.35;
      }
    `],e([me()],Na.prototype,"_config",void 0),Na=e([he("librus-report-card-card")],Na);function Ia(e){return{ev:e,...ht(e)}}const Ea={before:"mdi:weather-sunset-up",in:"mdi:bag-personal-outline",after:"mdi:home-outline",free:"mdi:palm-tree"},Aa={before:"",in:"good",after:"",free:"amber"},Ma={before:"card.school_day.status_before",in:"card.school_day.status_in",after:"card.school_day.status_after",free:"card.school_day.status_free"};let La=class extends Ve{constructor(){super(...arguments),this._events=[],this._loaded=!1}static getConfigElement(){return Ue()}static getStubConfig(){return{type:"custom:librus-school-day-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 3}connectedCallback(){super.connectedCallback(),this._refreshTimer=setInterval(()=>{this._fetch(!0)},9e5),this._tickTimer=setInterval(()=>this.requestUpdate(),3e4)}disconnectedCallback(){super.disconnectedCallback(),clearInterval(this._refreshTimer),clearInterval(this._tickTimer)}async _fetch(e=!1){if(!this.hass||!this._config)return;const t=this._resolveEntities();if("error"in t)return;const a=t.map.timetable;if(!a)return;const i=new Date;i.setHours(0,0,0,0);const s=new Date(i);s.setDate(s.getDate()+10);const r=`${a}:${mt(i)}`;if(!e&&this._fetchedFor===r)return;this._fetchedFor=r;const o=this._beginFetch();try{const e=await ct(this.hass,a,i,s);this._isCurrentFetch(o)&&(this._events=e.filter(e=>!e.allDay))}catch{this._isCurrentFetch(o)&&(this._events=[])}finally{this._isCurrentFetch(o)&&(this._loaded=!0)}}render(){if(!this._config||!this.hass)return G;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const t=this.hass;this._fetch();const a=new Date,i=mt(a),s=new Map;for(const e of[...this._events].sort((e,t)=>e.start.localeCompare(t.start))){const t=mt(new Date(e.start));s.has(t)||s.set(t,[]),s.get(t).push(Ia(e))}const r=e=>e.filter(e=>!e.cancelled),o=s.get(i)??[],n=r(o),c=n.length?new Date(n[n.length-1].ev.end):void 0;let d;if(d=c&&a<c?i:[...s.keys()].sort().find(e=>e>i&&r(s.get(e)).length>0),!d)return this._loaded?this._message("mdi:palm-tree",je(t,"card.school_day.empty")):this._message("mdi:calendar-clock",je(t,"card.school_day.title"));const l=s.get(d),h=r(l),u=h[0],p=h[h.length-1],g=d===i,m=g?a<new Date(u.ev.start)?"before":"in":n.length?"after":"free",v=new Date(`${d}T12:00:00`),b=new Date(a);b.setDate(b.getDate()+1);const _=v.toLocaleDateString(t.language,{weekday:"short",day:"numeric",month:"short"}),f=g?`${je(t,"card.school_day.today")} · ${_}`:d===mt(b)?`${je(t,"card.school_day.tomorrow")} · ${_}`:_,y=e=>e.ev.location?`${e.name} · ${e.ev.location}`:e.name,w=e=>(new Date(e).getTime()-a.getTime())/6e4;let x,k,$;const z=g?h.find(e=>pt(e.ev,a)):void 0;if(z)x=je(t,"card.school_day.now"),k=z,$=je(t,"card.school_day.left",{minutes:Math.max(0,Math.round(w(z.ev.end)))});else if("in"===m){const e=h.find(e=>new Date(e.ev.start)>a)??p;x=je(t,"card.school_day.break"),k=e,$=Ce(t,w(e.ev.start))}else"before"===m?(x=je(t,"card.school_day.first"),k=u,$=Ce(t,w(u.ev.start))):(x=je(t,"card.school_day.first"),k=u,$=je(t,"card.school_day.from",{time:We(u.ev.start)}));return W`
      <ha-card>
        <div class="header">
          <div class="icon-badge ${Aa[m]}"><ha-icon icon=${Ea[m]}></ha-icon></div>
          <div class="title-block">
            <div class="title">${this._config.title??je(t,"card.school_day.title")}</div>
            <div class="subtitle">${f}</div>
          </div>
          <span class="pill ${m}">${je(t,Ma[m])}</span>
        </div>
        <div class="daybar">
          ${l.map(e=>{const i=e.cancelled?"off":g&&pt(e.ev,a)?"now":g&&gt(e.ev,a)?"past":"",s=`${We(e.ev.start)}–${We(e.ev.end)} ${y(e)}${e.cancelled?` (${je(t,"card.school_day.cancelled")})`:e.substitution?` (${je(t,"card.school_day.substitution")})`:""}`;return W`<div class="seg ${i} ${e.substitution||e.roomChange||e.moved?"sub":""}" title=${s}>${oa(e.name)}</div>`})}
        </div>
        <div class="ends"><span>${We(u.ev.start)}</span><span>${We(p.ev.end)}</span></div>
        <div class="now-box">
          <span class="lbl">${x}</span>
          <span class="s">${y(k)}</span>
          <span class="r">${$}</span>
        </div>
      </ha-card>
    `}};La.styles=[Qe,et,o`
      .pill {
        margin-left: auto;
        flex: none;
        font-size: 0.72rem;
        font-weight: 700;
        padding: 3px 9px;
        border-radius: 999px;
        white-space: nowrap;
        background: var(--lc-chip-bg);
        color: var(--secondary-text-color);
      }
      .pill.in {
        background: var(--lc-good-bg);
        color: var(--lc-good);
      }
      .pill.free {
        background: var(--lc-amber-bg);
        color: var(--lc-amber);
      }
      .daybar {
        display: flex;
        gap: 3px;
      }
      .seg {
        flex: 1;
        min-width: 0;
        height: 30px;
        border-radius: 6px;
        background: var(--lc-ring-track);
        display: grid;
        place-items: center;
        font-size: 0.7rem;
        font-weight: 700;
        color: var(--secondary-text-color);
        overflow: hidden;
        white-space: nowrap;
      }
      .seg.past {
        background: var(--lc-brand-bg);
        color: var(--lc-brand-strong);
        opacity: 0.6;
      }
      .seg.now {
        background: var(--lc-brand);
        color: #fff;
      }
      .seg.sub {
        outline: 2px dashed var(--lc-amber);
        outline-offset: -2px;
      }
      .seg.off {
        background: transparent;
        border: 1px dashed var(--divider-color);
        text-decoration: line-through;
        opacity: 0.7;
      }
      .ends {
        display: flex;
        justify-content: space-between;
        font-size: 0.72rem;
        color: var(--secondary-text-color);
        font-variant-numeric: tabular-nums;
        margin-top: -6px;
      }
      .now-box {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 8px 10px;
        border-radius: 9px;
        background: var(--lc-chip-bg);
        min-width: 0;
      }
      .now-box .lbl {
        font-size: 0.78rem;
        color: var(--secondary-text-color);
        flex: none;
      }
      .now-box .s {
        font-weight: 700;
        font-size: 0.86rem;
        min-width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .now-box .r {
        margin-left: auto;
        font-size: 0.78rem;
        color: var(--secondary-text-color);
        white-space: nowrap;
        flex: none;
      }
    `],e([me()],La.prototype,"_config",void 0),e([me()],La.prototype,"_events",void 0),e([me()],La.prototype,"_loaded",void 0),La=e([he("librus-school-day-card")],La);const Pa={positive:"good",negative:"bad",neutral:"neutral"};let Fa=class extends Ve{static getConfigElement(){return Ue()}static getStubConfig(){return{type:"custom:librus-behaviour-notices-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 2}render(){if(!this._config||!this.hass)return G;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{map:t}=e,a=this.hass,i=t.behaviour_notices?a.states[t.behaviour_notices]:void 0,s=i?.attributes.recent??[],r=i&&Number(i.state)||0;return i&&0!==s.length?W`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:alert-circle-outline"></ha-icon></div>
          <div class="title-block">
            <div class="title">${this._config?.title??je(a,"card.behaviour_notices.title")}</div>
            <div class="subtitle">${r}</div>
          </div>
        </div>
        <div class="scroll-list">
          ${ua(s,this._config).map(e=>W`
              <div class="list-item">
                <span class="dot ${Pa[e.sentiment??"neutral"]}"></span>
                <div class="body">
                  <div class="row1">
                    <span class="cat-label">${e.category??""}</span>
                    ${e.date?W`<time>${He(e.date,a.language)}</time>`:G}
                  </div>
                  <div class="item-text">${e.text}</div>
                </div>
              </div>
            `)}
        </div>
      </ha-card>
    `:this._message("mdi:alert-circle-outline",je(a,"card.behaviour_notices.empty"))}};Fa.styles=[Qe,et],e([me()],Fa.prototype,"_config",void 0),Fa=e([he("librus-behaviour-notices-card")],Fa);let Ba=class extends Ve{static getConfigElement(){return Ue()}static getStubConfig(){return{type:"custom:librus-behaviour-notices-tile-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 1}render(){if(!this._config||!this.hass)return G;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{map:t}=e,a=this.hass,i=t.behaviour_notices?a.states[t.behaviour_notices]:void 0;if(!i)return this._message("mdi:alert-circle-outline",je(a,"empty.generic_error"));const s=Number(i.state)||0,r=(i.attributes.recent??[])[0],o="negative"===r?.sentiment?"bad":"positive"===r?.sentiment?"good":"";return W`
      <ha-card class="tile" @click=${Jt(this,this._config.tap_action,t.behaviour_notices)}>
        <div class="icon-badge ${o}"><ha-icon icon="mdi:alert-circle-outline"></ha-icon></div>
        <div class="tile-body">
          <div class="subj">${s} ${je(a,"card.behaviour_notices.title").toLowerCase()}</div>
          ${r?.category?W`<div class="meta">${r.category}</div>`:G}
        </div>
      </ha-card>
    `}};Ba.styles=[Qe,et,o`
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
    `],e([me()],Ba.prototype,"_config",void 0),Ba=e([he("librus-behaviour-notices-tile-card")],Ba);const Oa={inbox:"recent",substitutions:"substitutions_recent",alerts:"alerts_recent",justifications:"justifications_recent",outbox:"outbox_recent",archive:"archive_recent"},Ka=new Set(["outbox","archive"]),Ua={archive:"archive/inbox"},Ra=[{key:"inbox",label:"mailbox.inbox"},{key:"notes",label:"mailbox.notes"},{key:"alerts",label:"mailbox.alerts"},{key:"substitutions",label:"mailbox.substitutions"},{key:"absences",label:"mailbox.absences"},{key:"justifications",label:"mailbox.justifications"},{key:"trash",label:"mailbox.trash"},{key:"outbox",label:"mailbox.outbox"},{key:"archive",label:"mailbox.archive"}];let Wa=class extends Ve{constructor(){super(...arguments),this._fullById={},this._pendingIds=new Set,this._errorIds=new Set,this._attachmentState={}}static getConfigElement(){return Ue()}static getStubConfig(){return{type:"custom:librus-messages-card"}}get _mailbox(){return this._viewMailbox?this._viewMailbox:this._config?.mailbox&&Oa[this._config.mailbox]?this._config.mailbox:"inbox"}_pickMailbox(e){Oa[e]&&e!==this._mailbox&&(this._viewMailbox=e,this._expandedId=void 0)}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 3}async _onMessageClick(e){if(this._expandedId===e.id)return void(this._expandedId=void 0);if(this._expandedId=e.id,this._fullById[e.id]||this._pendingIds.has(e.id))return;const t=this._resolveEntities();if("error"in t||!this.hass)return;const a=e.mailbox??Ua[this._mailbox]??this._mailbox;this._pendingIds=new Set(this._pendingIds).add(e.id);const i=new Set(this._errorIds);i.delete(e.id),this._errorIds=i;try{const i=await Dt(this.hass,t.deviceId,e.id,a);this._fullById={...this._fullById,[e.id]:i}}catch{this._errorIds=new Set(this._errorIds).add(e.id)}finally{const t=new Set(this._pendingIds);t.delete(e.id),this._pendingIds=t}}async _download(e,t,a,i,s){e.stopPropagation();const r=this._resolveEntities();if(this.hass&&!("error"in r)){this._attachmentState={...this._attachmentState,[i]:"loading"};try{await async function(e,t,a,i,s){await Tt(e,`/api/librus_synergia/attachment/${encodeURIComponent(t)}/${encodeURIComponent(a)}/${encodeURIComponent(i)}`,s)}(this.hass,r.deviceId,t,a,s);const e={...this._attachmentState};delete e[i],this._attachmentState=e}catch{this._attachmentState={...this._attachmentState,[i]:"error"}}}}_renderMessageBody(e){const t=this.hass;if(this._expandedId!==e.id)return W`<div class="item-text"><b>${e.topic}</b> - ${e.content}</div>`;const a=this._fullById[e.id];return a?W`
        <div class="item-text"><b>${a.topic}</b></div>
        <div class="full-text">${a.content}</div>
        ${a.attachments?.length&&"archive"===this._mailbox?W`
              <div class="attachments" @click=${e=>e.stopPropagation()}>
                ${a.attachments.map(e=>W`<div class="attachment archived">
                    <ha-icon icon="mdi:paperclip"></ha-icon>
                    <span class="attachment-name">${e.filename??e.id}</span>
                  </div>`)}
                <div class="read-notice">${je(t,"card.messages.attachment_archived")}</div>
              </div>
            `:a.attachments?.length?W`
              <div class="attachments">
                ${a.attachments.map(a=>{const i=`${e.id}:${a.id}`,s=this._attachmentState[i];return W`<button
                    class="attachment"
                    type="button"
                    ?disabled=${"loading"===s}
                    @click=${t=>this._download(t,e.id,a.id,i,a.filename??a.id)}
                  >
                    <ha-icon icon=${"loading"===s?"mdi:progress-download":"mdi:paperclip"}></ha-icon>
                    <span class="attachment-name">${a.filename??a.id}</span>
                    ${"error"===s?W`<span class="attachment-error">${je(t,"card.messages.attachment_error")}</span>`:G}
                  </button>`})}
                <div class="read-notice">${je(t,"card.messages.attachment_notice")}</div>
              </div>
            `:G}
        ${"outbox"===this._mailbox?G:W`<div class="read-notice">${je(t,"card.messages.read_notice")}</div>`}
      `:this._errorIds.has(e.id)?W`<div class="item-text"><b>${e.topic}</b> - ${je(t,"card.messages.fetch_failed")}</div>`:W`<div class="item-text"><b>${e.topic}</b> - ${je(t,"empty.loading")}</div>`}render(){if(!this._config||!this.hass)return G;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{map:t}=e,a=this.hass,i=t.unread_messages?a.states[t.unread_messages]:void 0;if(!i||"unavailable"===i.state)return this._message("mdi:email-outline",je(a,"card.messages.unavailable"));const s=this._mailbox,r=i.attributes.mailbox_breakdown??{},o=i.attributes[Oa[s]]??[],n=new Set(i.attributes.missing_mailboxes??[]);Number(i.state);const c=this._config.max_items??6;return W`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:email-outline"></ha-icon></div>
          <div class="title-block">
            <div class="title">${this._config.title??je(a,"card.messages.title")}</div>
            <div class="subtitle">${je(a,`mailbox.${s}`)}</div>
          </div>
        </div>
        <div class="chips">
          ${Ra.filter(({key:e})=>!(Ka.has(e)&&void 0===i.attributes[Oa[e]]||n.has(Ua[e]??e))).map(({key:e,label:t})=>{const o=i.attributes[Oa[e]],n=e!==s&&(void 0!==o?0===o.length:!r[e]),c=void 0!==o&&!n;return W`
                <span
                  class="chip ${e===s?"hot":""} ${c?"pickable":""} ${n?"muted":""}"
                  role=${c?"button":G}
                  @click=${c?()=>this._pickMailbox(e):G}
                  >${je(a,t)}${Ka.has(e)?G:W` <span class="n">${r[e]??0}</span>`}</span
                >
              `})}
        </div>
        ${o.length?W`
              <hr />
              <div class="scroll-list">
                ${ua(o,{sort:this._config.sort,max_items:c}).map(e=>W`
                    <div class="list-item clickable" @click=${()=>this._onMessageClick(e)}>
                      <span class="dot ${e.unread&&!e.receiver?"good":"neutral"}"></span>
                      <div class="body">
                        <div class="row1">
                          <span class="sender"
                            >${e.receiver?je(a,"card.messages.to",{name:e.receiver}):e.sender}${e.has_attachment?W`<ha-icon class="clip" icon="mdi:paperclip"></ha-icon>`:G}</span
                          >
                          ${e.date?W`<time>${He(e.date,a.language)}</time>`:G}
                        </div>
                        ${this._renderReadState(e)}
                        ${this._renderMessageBody(e)}
                      </div>
                    </div>
                  `)}
              </div>
            `:W`<div class="empty-box">${je(a,"card.messages.empty")}</div>`}
      </ha-card>
    `}_renderReadState(e){const t=e.receivers_count;if(!e.receiver||void 0===t||0===t)return G;const a=this.hass,i=e.read_count??0,s=(e.read_by??[]).join(", ");return i>=t?W`<div class="read-state all" title=${s}>
        <ha-icon icon="mdi:check-all"></ha-icon>${je(a,"card.messages.read_all")}
      </div>`:i>0?W`<div class="read-state some" title=${s}>
        <ha-icon icon="mdi:check"></ha-icon>${je(a,"card.messages.read_some",{read:i,total:t})}
      </div>`:W`<div class="read-state">${je(a,"card.messages.read_none")}</div>`}};Wa.styles=[Qe,et,o`
      .read-state {
        display: flex;
        align-items: center;
        gap: 4px;
        font-size: 0.72rem;
        color: var(--secondary-text-color);
        margin-top: 2px;
      }
      .read-state ha-icon {
        --mdc-icon-size: 14px;
      }
      .read-state.all {
        color: var(--lc-good);
      }
      .list-item.clickable {
        cursor: pointer;
      }
      .chip.pickable {
        cursor: pointer;
      }
      .chip.muted {
        opacity: 0.45;
      }
      .empty-box {
        font-size: 0.75rem;
        color: var(--secondary-text-color);
        padding: 10px 2px 2px;
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
        font: inherit;
        font-size: 0.75rem;
        color: var(--lc-brand);
        background: none;
        border: 0;
        padding: 2px 0;
        cursor: pointer;
        text-align: left;
      }
      .attachment:disabled {
        cursor: progress;
        opacity: 0.7;
      }
      .attachment-name {
        text-decoration: underline;
        text-underline-offset: 2px;
      }
      .attachment-error {
        color: var(--lc-bad);
        margin-left: 6px;
      }
      .attachment ha-icon {
        --mdc-icon-size: 14px;
        flex: none;
      }
      /* Files of an archived message: listed, but not downloadable. */
      .attachment.archived {
        color: var(--secondary-text-color);
        cursor: default;
      }
      .attachment.archived .attachment-name {
        text-decoration: none;
      }
    `],e([me()],Wa.prototype,"_config",void 0),e([me()],Wa.prototype,"_expandedId",void 0),e([me()],Wa.prototype,"_fullById",void 0),e([me()],Wa.prototype,"_pendingIds",void 0),e([me()],Wa.prototype,"_errorIds",void 0),e([me()],Wa.prototype,"_viewMailbox",void 0),e([me()],Wa.prototype,"_attachmentState",void 0),Wa=e([he("librus-messages-card")],Wa);let Ha=class extends Ve{static getConfigElement(){return Ue()}static getStubConfig(){return{type:"custom:librus-messages-tile-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 1}render(){if(!this._config||!this.hass)return G;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{map:t}=e,a=this.hass,i=t.unread_messages?a.states[t.unread_messages]:void 0;if(!i||"unavailable"===i.state)return this._message("mdi:email-outline",je(a,"card.messages.unavailable"));const s=Number(i.state)||0,r=(i.attributes.recent??[])[0];return W`
      <ha-card class="tile" @click=${Jt(this,this._config.tap_action,t.unread_messages)}>
        <div class="icon-badge ${s>0?"amber":""}">
          <ha-icon icon="mdi:email-outline"></ha-icon>
        </div>
        <div class="tile-body">
          <div class="subj">${s} ${je(a,"mailbox.inbox").toLowerCase()}</div>
          ${r?W`<div class="meta">${r.sender} · ${r.topic}</div>`:G}
        </div>
      </ha-card>
    `}};Ha.styles=[Qe,et,o`
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
    `],e([me()],Ha.prototype,"_config",void 0),Ha=e([he("librus-messages-tile-card")],Ha);const qa=[{kind:"substitution",icon:"mdi:swap-horizontal",label:"card.changes.substitution",chip:"card.changes.chip_substitution"},{kind:"cancelled",icon:"mdi:calendar-remove",label:"card.changes.cancelled",chip:"card.changes.chip_cancelled"},{kind:"room",icon:"mdi:map-marker-outline",label:"card.changes.room",chip:"card.changes.chip_room"},{kind:"moved",icon:"mdi:calendar-arrow-right",label:"card.changes.moved",chip:"card.changes.chip_moved"}];function Ga(e){const t=ht(e),a=t.cancelled?"cancelled":t.substitution?"substitution":t.moved?"moved":t.roomChange?"room":void 0;if(!a)return;const i=t.details.filter(e=>!e.startsWith("Temat:")&&!e.startsWith("Zmiana sali:")),s=t.rooms?`${t.rooms[0]} → ${t.rooms[1]}`:e.location,r=[t.teacher,...i,"cancelled"===a?void 0:s].filter(Boolean).join(" · ");return{event:e,kind:a,subject:t.name,detail:r}}function Ja(e){return`${e.mailbox}:${e.id}`}let Za=class extends Ve{constructor(){super(...arguments),this._fullByKey={},this._pendingKeys=new Set,this._errorKeys=new Set,this._changes=[],this._filter="all"}static getConfigElement(){return Ue()}static getStubConfig(){return{type:"custom:librus-substitutions-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 4}connectedCallback(){super.connectedCallback(),this._refreshTimer=setInterval(()=>{this._fetch(!0)},18e5)}disconnectedCallback(){super.disconnectedCallback(),clearInterval(this._refreshTimer)}get _daysAhead(){return Math.max(1,Math.min(30,Number(this._config?.days_ahead)||7))}async _fetch(e=!1){if(!this.hass||!this._config)return;const t=this._resolveEntities();if("error"in t)return;const a=t.map.timetable;if(!a)return;const i=new Date;i.setHours(0,0,0,0),i.setDate(i.getDate()-14);const s=new Date;s.setHours(0,0,0,0),s.setDate(s.getDate()+this._daysAhead+1);const r=`${a}:${mt(i)}:${mt(s)}`;if(!e&&this._fetchedFor===r)return;this._fetchedFor=r;const o=this._beginFetch();try{const e=(await ct(this.hass,a,i,s)).filter(e=>!e.allDay).map(Ga).filter(e=>!!e).sort((e,t)=>e.event.start.localeCompare(t.event.start));this._isCurrentFetch(o)&&(this._changes=e)}catch{this._isCurrentFetch(o)&&(this._changes=[])}}_when(e){const t=new Date(e.start);return`${t.toLocaleDateString(this.hass?.language,{weekday:"short",day:"numeric",month:"numeric"})} · ${t.toLocaleTimeString(this.hass?.language,{hour:"2-digit",minute:"2-digit"})}`}_changeRow(e,t){const a=this.hass,i=qa.find(t=>t.kind===e.kind);return W`<div class="change ${t?"past":""}">
      <span class="ci ${e.kind}"><ha-icon icon=${i.icon}></ha-icon></span>
      <div class="cbody">
        <div class="csubj">${e.subject}<span class="ctag ${e.kind}">${je(a,i.label)}</span></div>
        ${e.detail?W`<div class="cdet">${e.detail}</div>`:G}
      </div>
      <time>${this._when(e.event)}</time>
    </div>`}async _onClick(e){const t=Ja(e);if(this._expandedKey===t)return void(this._expandedKey=void 0);if(this._expandedKey=t,this._fullByKey[t]||this._pendingKeys.has(t))return;const a=this._resolveEntities();if("error"in a||!this.hass)return;this._pendingKeys=new Set(this._pendingKeys).add(t);const i=new Set(this._errorKeys);i.delete(t),this._errorKeys=i;try{const i=await Dt(this.hass,a.deviceId,e.id,e.mailbox);this._fullByKey={...this._fullByKey,[t]:i}}catch{this._errorKeys=new Set(this._errorKeys).add(t)}finally{const e=new Set(this._pendingKeys);e.delete(t),this._pendingKeys=e}}_renderBody(e){const t=this.hass,a=Ja(e);if(this._expandedKey!==a)return W`<div class="item-text"><b>${e.topic}</b> - ${e.content}</div>`;const i=this._fullByKey[a];return i?W`
        <div class="item-text"><b>${i.topic}</b></div>
        <div class="full-text">${i.content}</div>
        ${i.attachments?.length?W`
              <div class="attachments">
                ${i.attachments.map(e=>W`<div class="attachment">
                    <ha-icon icon="mdi:paperclip"></ha-icon>${e.filename??e.id}
                  </div>`)}
                <div class="read-notice">${je(t,"card.messages.attachment_notice")}</div>
              </div>
            `:G}
        <div class="read-notice">${je(t,"card.messages.read_notice")}</div>
      `:this._errorKeys.has(a)?W`<div class="item-text"><b>${e.topic}</b> - ${je(t,"card.messages.fetch_failed")}</div>`:W`<div class="item-text"><b>${e.topic}</b> - ${je(t,"empty.loading")}</div>`}_renderSection(e,t){if(0===t.length)return G;const a=this.hass;return W`
      <div class="section-title">${e}</div>
      <div class="scroll-list">
        ${ua(t,{max_items:this._config?.max_items}).map(e=>W`
            <div class="list-item clickable" @click=${()=>this._onClick(e)}>
              <span class="dot ${e.unread?"good":"neutral"}"></span>
              <div class="body">
                <div class="row1">
                  <span class="sender"
                    >${e.sender}${e.has_attachment?W`<ha-icon class="clip" icon="mdi:paperclip"></ha-icon>`:G}</span
                  >
                  ${e.date?W`<time>${He(e.date,a.language)}</time>`:G}
                </div>
                ${this._renderBody(e)}
              </div>
            </div>
          `)}
      </div>
    `}render(){if(!this._config||!this.hass)return G;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{map:t}=e,a=this.hass;this._fetch();const i=t.unread_messages?a.states[t.unread_messages]:void 0,s=i?.attributes.substitutions_recent??[],r=i?.attributes.alerts_recent??[],o=i?.attributes.justifications_recent??[],n=s.length+r.length+o.length>0,c=Date.now(),d=this._changes.filter(e=>new Date(e.event.end).getTime()>c),l=this._changes.filter(e=>new Date(e.event.end).getTime()<=c).slice(-3).reverse(),h=("all"===this._filter?d:d.filter(e=>e.kind===this._filter)).slice(0,this._config.max_items??30),u=!1===this._config.show_past?[]:"all"===this._filter?l:l.filter(e=>e.kind===this._filter),p=new Map(qa.map(e=>[e.kind,d.filter(t=>t.kind===e.kind).length])),g=d[0],m=g?je(a,"card.changes.next",{subject:g.subject,when:this._when(g.event)}):je(a,"card.changes.none",{n:this._daysAhead});return W`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:swap-horizontal"></ha-icon></div>
          <div class="title-block">
            <div class="title">${this._config.title??je(a,"card.substitutions.title")}</div>
            <div class="subtitle">${m}</div>
          </div>
        </div>
        ${d.length?W`<div class="chips">
              <span class="chip pickable ${"all"===this._filter?"hot":""}" role="button" @click=${()=>this._filter="all"}
                >${je(a,"card.changes.chip_all")} <span class="n">${d.length}</span></span
              >
              ${qa.filter(e=>(p.get(e.kind)??0)>0).map(e=>W`<span
                  class="chip pickable ${this._filter===e.kind?"hot":""}"
                  role="button"
                  @click=${()=>this._filter=e.kind}
                  >${je(a,e.chip)} <span class="n">${p.get(e.kind)}</span></span
                >`)}
            </div>`:W`<div class="no-changes"><ha-icon icon="mdi:check"></ha-icon>${je(a,"card.substitutions.empty")}</div>`}
        <div class="changes scroll-list">
          ${h.map(e=>this._changeRow(e,!1))}
          ${u.length?W`<div class="section-title">${je(a,"card.changes.recent")}</div>
                ${u.map(e=>this._changeRow(e,!0))}`:G}
        </div>
        ${n?W`<div class="messages">
              ${this._renderSection(je(a,"mailbox.substitutions"),s)}
              ${this._renderSection(je(a,"mailbox.alerts"),r)}
              ${this._renderSection(je(a,"mailbox.justifications"),o)}
            </div>`:G}
      </ha-card>
    `}};Za.styles=[Qe,et,o`
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
      .chips {
        margin-bottom: 10px;
      }
      .chip.pickable {
        cursor: pointer;
      }
      .no-changes {
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 0.8rem;
        color: var(--secondary-text-color);
        margin-bottom: 4px;
      }
      .no-changes ha-icon {
        --mdc-icon-size: 16px;
        color: var(--lc-good);
      }
      .changes {
        display: grid;
        gap: 8px;
      }
      .change {
        display: grid;
        grid-template-columns: 30px minmax(0, 1fr) auto;
        gap: 10px;
        align-items: center;
      }
      .change.past {
        opacity: 0.55;
      }
      .ci {
        width: 30px;
        height: 30px;
        border-radius: 9px;
        display: grid;
        place-items: center;
        --mdc-icon-size: 17px;
      }
      .ci.substitution,
      .ctag.substitution {
        background: var(--lc-amber-bg);
        color: var(--lc-amber);
      }
      .ci.cancelled,
      .ctag.cancelled {
        background: var(--lc-bad-bg);
        color: var(--lc-bad);
      }
      .ci.room,
      .ctag.room {
        background: var(--lc-brand-bg);
        color: var(--lc-brand-strong);
      }
      .ci.moved,
      .ctag.moved {
        background: var(--lc-good-bg);
        color: var(--lc-good);
      }
      .csubj {
        font-size: 0.86rem;
        font-weight: 600;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .ctag {
        font-size: 0.62rem;
        font-weight: 700;
        padding: 1px 7px;
        border-radius: 99px;
        margin-left: 6px;
        vertical-align: 1px;
      }
      .cdet {
        font-size: 0.74rem;
        color: var(--secondary-text-color);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .change time {
        font-size: 0.72rem;
        color: var(--secondary-text-color);
        white-space: nowrap;
        text-align: right;
      }
      .messages {
        margin-top: 12px;
        padding-top: 10px;
        border-top: 1px solid var(--divider-color, rgba(127, 127, 127, 0.2));
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
    `],e([me()],Za.prototype,"_config",void 0),e([me()],Za.prototype,"_expandedKey",void 0),e([me()],Za.prototype,"_fullByKey",void 0),e([me()],Za.prototype,"_pendingKeys",void 0),e([me()],Za.prototype,"_errorKeys",void 0),e([me()],Za.prototype,"_changes",void 0),e([me()],Za.prototype,"_filter",void 0),Za=e([he("librus-substitutions-card")],Za);let Ya=class extends Ve{static getConfigElement(){return Ue()}static getStubConfig(){return{type:"custom:librus-announcements-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 2}_toggleExpanded(e){this._expandedId=this._expandedId===e?void 0:e}render(){if(!this._config||!this.hass)return G;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{map:t}=e,a=this.hass,i=t.unread_announcements?a.states[t.unread_announcements]:void 0,s=i?.attributes.notices??i?.attributes.recent??[],r=Number(i?.state)||0;if(!i||0===s.length)return this._message("mdi:bullhorn-outline",je(a,"card.announcements.empty"));const o=ua(s,this._config,10);return W`
      <ha-card>
        <div class="header">
          <div class="icon-badge amber"><ha-icon icon="mdi:bullhorn-outline"></ha-icon></div>
          <div class="title-block">
            <div class="title">${this._config.title??je(a,"card.announcements.title")}</div>
            <div class="subtitle">
              ${r?je(a,"card.announcements.unread",{n:r}):je(a,"card.announcements.all_read")}
            </div>
          </div>
        </div>
        <div class="scroll-list">
          ${o.map((e,t)=>{const i=e.id??String(t);return W`
              <div class="list-item clickable ${e.read?"read":"unread"}" @click=${()=>this._toggleExpanded(i)}>
                <span class="dot ${!1===e.read?"good":"neutral"}"></span>
                <div class="body">
                  <div class="row1">${e.subject}</div>
                  ${e.start_date&&e.end_date?W`<div class="item-text">
                        ${He(e.start_date,a.language)} –
                        ${He(e.end_date,a.language)}
                      </div>`:G}
                  ${this._expandedId===i?W`<div class="full-text">${e.content}</div>`:G}
                </div>
              </div>
            `})}
        </div>
      </ha-card>
    `}};Ya.styles=[Qe,et,o`
      .list-item.clickable {
        cursor: pointer;
      }
      .list-item.unread .row1 {
        font-weight: 700;
      }
      .list-item.read .row1 {
        color: var(--secondary-text-color);
      }
      .full-text {
        font-size: 0.75rem;
        color: var(--primary-text-color);
        margin-top: 4px;
        line-height: 1.5;
        white-space: pre-wrap;
      }
    `],e([me()],Ya.prototype,"_config",void 0),e([me()],Ya.prototype,"_expandedId",void 0),Ya=e([he("librus-announcements-card")],Ya);let Va=class extends Ve{static getConfigElement(){return Ue()}static getStubConfig(){return{type:"custom:librus-announcements-tile-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 1}render(){if(!this._config||!this.hass)return G;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{map:t}=e,a=this.hass,i=t.unread_announcements?a.states[t.unread_announcements]:void 0;if(!i)return this._message("mdi:bullhorn-outline",je(a,"empty.generic_error"));const s=Number(i.state)||0,r=(i.attributes.recent??[])[0];return W`
      <ha-card class="tile" @click=${Jt(this,this._config.tap_action,t.unread_announcements)}>
        <div class="icon-badge ${s>0?"amber":""}">
          <ha-icon icon="mdi:bullhorn-outline"></ha-icon>
        </div>
        <div class="tile-body">
          <div class="subj">${s} ${je(a,"card.announcements.title").toLowerCase()}</div>
          ${r?W`<div class="meta">${r.subject}</div>`:G}
        </div>
      </ha-card>
    `}};async function Xa(e,t,a,i,s,r){e.stopPropagation(),r({...s,[i.id]:"loading"});try{await async function(e,t,a,i){await Tt(e,`/api/librus_synergia/homework_attachment/${encodeURIComponent(t)}/${encodeURIComponent(a)}`,i)}(t,a,i.id,i.filename??i.id);const e={...s};delete e[i.id],r(e)}catch{r({...s,[i.id]:"error"})}}function Qa(e,t,a,i){return t?.length?W`
    <div class="files">
      ${t.map(t=>{const s=a[t.id];return W`<button
          class="file"
          type="button"
          ?disabled=${"loading"===s}
          @click=${e=>i(e,t)}
          @keydown=${e=>e.stopPropagation()}
        >
          <ha-icon icon=${"loading"===s?"mdi:progress-download":"mdi:paperclip"}></ha-icon>
          <span class="file-name">${t.filename??t.id}</span>
          ${"error"===s?W`<span class="file-error">${je(e,"card.homework_checklist.file_error")}</span>`:G}
        </button>`})}
    </div>
  `:G}Va.styles=[Qe,et,o`
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
    `],e([me()],Va.prototype,"_config",void 0),Va=e([he("librus-announcements-tile-card")],Va);const ei=o`
  .files {
    margin-top: 4px;
  }
  .file {
    display: flex;
    align-items: center;
    gap: 4px;
    font: inherit;
    font-size: 0.75rem;
    color: var(--lc-brand);
    background: none;
    border: 0;
    padding: 2px 0;
    cursor: pointer;
    text-align: left;
  }
  .file:disabled {
    cursor: progress;
    opacity: 0.7;
  }
  .file ha-icon {
    --mdc-icon-size: 14px;
    flex: none;
  }
  .file-name {
    text-decoration: underline;
    text-underline-offset: 2px;
  }
  .file-error {
    color: var(--lc-bad);
    margin-left: 6px;
  }
`;let ti=class extends Ve{constructor(){super(...arguments),this._fileState={}}static getConfigElement(){return Ue()}static getStubConfig(){return{type:"custom:librus-homework-assignments-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 2}render(){if(!this._config||!this.hass)return G;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{deviceId:t,map:a}=e,i=this.hass,s=a.homework_assignments?i.states[a.homework_assignments]:void 0,r=s?.attributes.recent??[];return s&&0!==r.length?W`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:notebook-edit-outline"></ha-icon></div>
          <div class="title-block">
            <div class="title">${this._config?.title??je(i,"card.homework_assignments.title")}</div>
            <div class="subtitle">${s.state}</div>
          </div>
        </div>
        <div class="scroll-list">
          ${ua(r,{max_items:this._config?.max_items}).map(e=>W`
              <div class="list-item">
                <span class="dot neutral"></span>
                <div class="body">
                  <div class="row1">
                    <span>${e.topic}</span>
                    ${e.due_date?W`<time>${je(i,"label.due")} ${He(e.due_date,i.language)}</time>`:G}
                  </div>
                  <div class="item-text">${e.text}${e.teacher?W` - ${e.teacher}`:G}</div>
                  ${Qa(i,e.attachments,this._fileState,(e,a)=>Xa(e,i,t,a,this._fileState,e=>{this._fileState=e}))}
                </div>
              </div>
            `)}
        </div>
      </ha-card>
    `:this._message("mdi:notebook-edit-outline",je(i,"card.homework_assignments.empty"))}};ti.styles=[Qe,et,ei],e([me()],ti.prototype,"_config",void 0),e([me()],ti.prototype,"_fileState",void 0),ti=e([he("librus-homework-assignments-card")],ti);let ai=class extends Ve{constructor(){super(...arguments),this._done=new Set,this._storageKey="",this._todoReading=!1,this._migrated=!1,this._fileState={}}static getConfigElement(){return Ue()}static getStubConfig(){return{type:"custom:librus-homework-checklist-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 3}_load(e){const t=`librus-hw-done:${e}`;if(this._storageKey!==t){this._storageKey=t;try{const e=window.localStorage.getItem(t);this._done=new Set(e?JSON.parse(e):[])}catch{this._done=new Set}}}_persist(e){const t=[...this._done].filter(t=>e.has(t));try{window.localStorage.setItem(this._storageKey,JSON.stringify(t))}catch{}}_localDone(){try{const e=window.localStorage.getItem(this._storageKey);return new Set(e?JSON.parse(e):[])}catch{return new Set}}async _readTodo(e,t){const a=this.hass?.states[e],i=a?.last_updated;if(this.hass&&!this._todoReading&&i!==this._todoReadFor){this._todoReading=!0;try{const a=await this.hass.callWS({type:"todo/item/list",entity_id:e}),s=new Set(a.items.filter(e=>"completed"===e.status).map(e=>e.uid));if(!this._migrated){this._migrated=!0;const i=new Set(a.items.map(e=>e.uid));for(const a of this._localDone())t.has(a)&&i.has(a)&&!s.has(a)&&(s.add(a),this._setTodoStatus(e,a,!0));try{window.localStorage.removeItem(this._storageKey)}catch{}}this._done=s,this._todoUids=new Set(a.items.map(e=>e.uid)),this._todoReadFor=i}catch{this._todoReadFor=i}finally{this._todoReading=!1}}}async _setTodoStatus(e,t,a){await(this.hass?.callService("todo","update_item",{entity_id:e,item:t,status:a?"completed":"needs_action"}))}_toggle(e,t,a){const i=new Set(this._done),s=!i.has(e);s?i.add(e):i.delete(e),this._done=i,a?this._setTodoStatus(a,e,s).catch(()=>{this._todoReadFor=void 0,this.requestUpdate()}):this._persist(t)}render(){if(!this._config||!this.hass)return G;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{deviceId:t,map:a}=e,i=this.hass;this._load(t);const s=a.homework,r=a.homework_assignments?i.states[a.homework_assignments]:void 0,o=(r?.attributes.recent??[]).map((e,t)=>({...e,key:void 0!==e.id?String(e.id):`${e.topic}|${e.due_date??t}`}));if(0===o.length)return this._message("mdi:notebook-edit-outline",je(i,"card.homework_assignments.empty"));const n=new Set(o.map(e=>e.key));s&&this._readTodo(s,n);const c=s&&this._todoUids?o.filter(e=>this._todoUids.has(e.key)):o;if(0===c.length)return this._message("mdi:notebook-edit-outline",je(i,"card.homework_assignments.empty"));const d=this._config.max_items??12,l=[...c].sort((e,t)=>{const a=this._done.has(e.key)?1:0,i=this._done.has(t.key)?1:0;return a!==i?a-i:(e.due_date??"").localeCompare(t.due_date??"")}),h=c.filter(e=>this._done.has(e.key)).length;return W`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:notebook-edit-outline"></ha-icon></div>
          <div class="title-block">
            <div class="title">${this._config.title??je(i,"card.homework_checklist.title")}</div>
            <div class="subtitle">
              ${je(i,"card.homework_checklist.progress",{done:h,total:c.length})}
            </div>
          </div>
        </div>
        <div class="scroll-list">
          ${l.slice(0,d).map(e=>{const a=this._done.has(e.key);return W`
              <div
                class="hw-item ${a?"done":""}"
                role="checkbox"
                aria-checked=${a}
                tabindex="0"
                @click=${()=>this._toggle(e.key,n,s)}
                @keydown=${t=>{"Enter"!==t.key&&" "!==t.key||(t.preventDefault(),this._toggle(e.key,n,s))}}
              >
                <span class="box"><ha-icon icon=${a?"mdi:checkbox-marked":"mdi:checkbox-blank-outline"}></ha-icon></span>
                <div class="body">
                  <div class="row1">
                    <span
                      >${e.category?W`<span class="cat-label">${e.category}</span> `:G}${e.topic||e.text}</span
                    >
                    ${e.due_date?W`<time>${He(e.due_date,i.language)}</time>`:G}
                  </div>
                  ${e.text&&e.text!==e.topic?W`<div class="item-text">${e.text}</div>`:G}
                  ${Qa(i,e.attachments,this._fileState,(e,a)=>Xa(e,i,t,a,this._fileState,e=>{this._fileState=e}))}
                </div>
              </div>
            `})}
        </div>
      </ha-card>
    `}};ai.styles=[Qe,et,ei,o`
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
    `],e([me()],ai.prototype,"_config",void 0),e([me()],ai.prototype,"_done",void 0),e([me()],ai.prototype,"_todoUids",void 0),e([me()],ai.prototype,"_fileState",void 0),ai=e([he("librus-homework-checklist-card")],ai);function ii(e){return e.length<=10?`${e}T00:00:00`:e}let si=class extends Ve{static getConfigElement(){return Ue()}static getStubConfig(){return{type:"custom:librus-recent-activity-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 4}render(){if(!this._config||!this.hass)return G;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{deviceId:t,map:a}=e,i=this.hass,s=[];for(const e of this._resolveAllByTranslationKey(t,"subject_average")){const t=i.states[e.entityId]?.attributes.grades??[];for(const a of t)a.date&&s.push({date:a.date,icon:"mdi:notebook-outline",title:`${a.value} · ${e.subject}`,text:a.category??""})}const r=a.behaviour_notices?i.states[a.behaviour_notices]:void 0;for(const e of r?.attributes.recent??[])e.date&&s.push({date:e.date,icon:"mdi:alert-circle-outline",title:e.category??"",text:e.text});const o=a.unread_announcements?i.states[a.unread_announcements]:void 0;for(const e of o?.attributes.recent??[])e.creation_date&&s.push({date:e.creation_date,icon:"mdi:bullhorn-outline",title:e.subject,text:""});const n=a.unread_messages?i.states[a.unread_messages]:void 0;for(const e of n?.attributes.recent??[])e.date&&s.push({date:e.date,icon:"mdi:email-outline",title:`${e.sender} · ${e.topic}`,text:e.content});s.sort((e,t)=>ii(t.date).localeCompare(ii(e.date)));const c=ua(s,this._config,15);return 0===c.length?this._message("mdi:bell-outline",je(i,"card.recent_activity.empty")):W`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:bell-outline"></ha-icon></div>
          <div class="title-block">
            <div class="title">${this._config.title??je(i,"card.recent_activity.title")}</div>
            <div class="subtitle">${je(i,"card.recent_activity.subtitle")}</div>
          </div>
        </div>
        <div class="scroll-list">
          ${c.map(e=>W`
              <div class="list-item">
                <div class="type-icon"><ha-icon icon=${e.icon}></ha-icon></div>
                <div class="body">
                  <div class="row1">
                    <span>${e.title}</span>
                    <time>${He(e.date,i.language)}</time>
                  </div>
                  ${e.text?W`<div class="item-text">${e.text}</div>`:G}
                </div>
              </div>
            `)}
        </div>
      </ha-card>
    `}};si.styles=[Qe,et,o`
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
    `],e([me()],si.prototype,"_config",void 0),si=e([he("librus-recent-activity-card")],si);let ri=class extends Ve{constructor(){super(...arguments),this._events=[]}static getConfigElement(){return Ue()}static getStubConfig(){return{type:"custom:librus-today-lessons-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 4}connectedCallback(){super.connectedCallback(),this._refreshTimer=setInterval(()=>{this._fetch(!0)},3e5),this._tickTimer=setInterval(()=>this.requestUpdate(),6e4)}disconnectedCallback(){super.disconnectedCallback(),clearInterval(this._refreshTimer),clearInterval(this._tickTimer)}async _fetch(e=!1){if(!this.hass||!this._config)return;const t=this._resolveEntities();if("error"in t)return;const a=t.map.timetable;if(!a)return;const i=new Date;i.setHours(0,0,0,0);const s=new Date(i);s.setDate(s.getDate()+1);const r=`${a}:${i.toDateString()}`;if(!e&&this._fetchedFor===r)return;this._fetchedFor=r;const o=this._beginFetch();try{const e=(await ct(this.hass,a,i,s)).filter(e=>!e.allDay).sort((e,t)=>e.start.localeCompare(t.start));this._isCurrentFetch(o)&&(this._events=e)}catch{this._isCurrentFetch(o)&&(this._events=[])}}render(){if(!this._config||!this.hass)return G;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const t=this.hass;if(this._fetch(),0===this._events.length)return this._message("mdi:calendar-clock",je(t,"card.today_lessons.empty"));const a=new Date;return W`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:calendar-clock"></ha-icon></div>
          <div class="title-block">
            <div class="title">${this._config?.title??je(t,"card.today_lessons.title")}</div>
            <div class="subtitle">${je(t,"card.today_lessons.subtitle")}</div>
          </div>
        </div>
        <div class="timeline">
          ${this._events.map(e=>{const i=ht(e),s=!i.cancelled&&pt(e,a),r=gt(e,a),o=ut(e,i,this._config?.hide_room);return W`
              <div class="tl-item ${s?"now":""} ${r?"done":""} ${i.cancelled?"lesson-cancelled":""}">
                <span class="tl-time">${We(e.start)}</span>
                <span class="tl-dot"></span>
                <div class="tl-body">
                  <div class="subj">
                    <span class="lesson-name">${i.name}</span>${it(t,i)}
                    ${s?W`<span class="pill-now">${je(t,"label.now")}</span>`:G}
                  </div>
                  ${o?W`<div class="meta">${o}</div>`:G}
                </div>
              </div>
            `})}
        </div>
      </ha-card>
    `}};ri.styles=[Qe,et,o`
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
    `],e([me()],ri.prototype,"_config",void 0),e([me()],ri.prototype,"_events",void 0),ri=e([he("librus-today-lessons-card")],ri);let oi=class extends Ve{static getConfigElement(){return Ue()}static getStubConfig(){return{type:"custom:librus-next-lesson-tile-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 1}connectedCallback(){super.connectedCallback(),this._tickTimer=setInterval(()=>this.requestUpdate(),3e4)}disconnectedCallback(){super.disconnectedCallback(),clearInterval(this._tickTimer)}render(){if(!this._config||!this.hass)return G;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{map:t}=e,a=this.hass,i=t.timetable?a.states[t.timetable]:void 0,s=i?.attributes.message,r=i?.attributes.start_time;if(!i||!s||!r)return this._message("mdi:clock-outline",je(a,"card.next_lesson.empty"));const o=new Date(r.replace(" ","T")),n=new Date,c="on"===i.state,d=Ge(o,n),l=i.attributes.location,h=i.attributes.description;return W`
      <ha-card class="tile" @click=${Jt(this,this._config.tap_action,t.timetable)}>
        <div class="icon-badge ${c?"good":""}"><ha-icon icon="mdi:clock-outline"></ha-icon></div>
        <div class="tile-body">
          <div class="subj">${s}</div>
          <div class="meta">
            ${c?je(a,"label.now"):`${We(r.replace(" ","T"))} · ${Ce(a,d)}`}
            ${l?` · ${l}`:""}${h?` · ${h}`:""}
          </div>
        </div>
      </ha-card>
    `}};oi.styles=[Qe,et,o`
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
    `],e([me()],oi.prototype,"_config",void 0),oi=e([he("librus-next-lesson-tile-card")],oi);let ni=class extends Ve{constructor(){super(...arguments),this._events=[]}static getConfigElement(){return Ue()}static getStubConfig(){return{type:"custom:librus-agenda-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 4}connectedCallback(){super.connectedCallback(),this._refreshTimer=setInterval(()=>{this._fetch(!0)},9e5)}disconnectedCallback(){super.disconnectedCallback(),clearInterval(this._refreshTimer)}async _fetch(e=!1){if(!this.hass||!this._config)return;const t=this._resolveEntities();if("error"in t)return;const a=t.map.agenda;if(!a)return;const i=this._config.days_ahead??14,s=new Date;s.setHours(0,0,0,0);const r=new Date(s);r.setDate(r.getDate()+i);const o=`${a}:${s.toDateString()}:${i}`;if(!e&&this._fetchedFor===o)return;this._fetchedFor=o;const n=this._beginFetch();try{const e=(await ct(this.hass,a,s,r)).sort((e,t)=>e.start.localeCompare(t.start));this._isCurrentFetch(n)&&(this._events=e)}catch{this._isCurrentFetch(n)&&(this._events=[])}}render(){if(!this._config||!this.hass)return G;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const t=this.hass;if(this._fetch(),0===this._events.length)return this._message("mdi:calendar-text-outline",je(t,"card.agenda.empty"));const a=new Map;for(const e of ua(this._events,{max_items:this._config.max_items})){const t=e.start.slice(0,10);a.has(t)||a.set(t,[]),a.get(t).push(e)}return W`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:calendar-text-outline"></ha-icon></div>
          <div class="title-block">
            <div class="title">${this._config.title??je(t,"card.agenda.title")}</div>
            <div class="subtitle">${je(t,"card.agenda.subtitle")}</div>
          </div>
        </div>
        <div class="scroll-list">
          ${[...a.entries()].map(([e,a])=>W`
              <div class="day-group">
                <div class="day-label">${He(e,t.language)}</div>
                ${a.map(e=>{const{category:t,text:a}=Ye(e.summary);return W`
                    <div class="list-item">
                      <span class="dot neutral"></span>
                      <div class="body">
                        ${t?W`<div class="cat-label-row"><span class="cat-label">${t}</span></div>`:G}
                        <div class="row1">${a}</div>
                        ${e.description?W`<div class="item-text">${e.description}</div>`:G}
                      </div>
                    </div>
                  `})}
              </div>
            `)}
        </div>
      </ha-card>
    `}};ni.styles=[Qe,et,o`
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
    `],e([me()],ni.prototype,"_config",void 0),e([me()],ni.prototype,"_events",void 0),ni=e([he("librus-agenda-card")],ni);const ci=new Set(["unknown","unavailable",""]),di="sprawdzian";let li=class extends Ve{constructor(){super(...arguments),this._events=[]}static getConfigElement(){return Ue()}static getStubConfig(){return{type:"custom:librus-exam-countdown-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 2}connectedCallback(){super.connectedCallback(),this._refreshTimer=setInterval(()=>{this._fetch(!0)},9e5)}disconnectedCallback(){super.disconnectedCallback(),clearInterval(this._refreshTimer)}_sensorExams(){if(!this.hass)return;const e=this._resolveEntities();if("error"in e)return;const t=e.map.next_exam?this.hass.states[e.map.next_exam]:void 0;if(!t||ci.has(t.state))return;const a=(new Date).toLocaleDateString("en-CA"),i=(t.attributes.upcoming??[]).filter(e=>e.date>=a).sort((e,t)=>e.date.localeCompare(t.date)).map(e=>({date:e.date,text:[e.subject,e.content].filter(Boolean).join(" — ")||e.category||""}));return 0===i.length?[{date:t.state,text:t.attributes.subject??""}]:i}async _fetch(e=!1){if(!this.hass||!this._config)return;const t=this._resolveEntities();if("error"in t)return;if(void 0!==this._sensorExams())return;const a=t.map.agenda;if(!a)return;const i=new Date;i.setHours(0,0,0,0);const s=new Date(i);s.setDate(s.getDate()+90);const r=this._config.exam_keywords||di,o=`${a}:${i.toDateString()}:${r}`;if(!e&&this._fetchedFor===o)return;this._fetchedFor=o;const n=function(e){const t=(e||di).split(",").map(e=>e.trim()).filter(Boolean).map(e=>e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"));return new RegExp(t.length?t.join("|"):di,"i")}(this._config.exam_keywords),c=this._beginFetch();try{const e=(await ct(this.hass,a,i,s)).filter(e=>{const{category:t}=Ye(e.summary);return null!==t&&n.test(t)}).sort((e,t)=>e.start.localeCompare(t.start));this._isCurrentFetch(c)&&(this._events=e)}catch{this._isCurrentFetch(c)&&(this._events=[])}}render(){if(!this._config||!this.hass)return G;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const t=this.hass;this._fetch();const a=this._sensorExams()??this._events.map(e=>({date:e.start,text:Ye(e.summary).text}));if(0===a.length)return this._message("mdi:clipboard-text-outline",je(t,"card.exam_countdown.empty"));const[i,...s]=a,r=qe(new Date,new Date(`${i.date.slice(0,10)}T00:00:00`));return W`
      <ha-card @click=${Jt(this,this._config.tap_action,e.map.next_exam||e.map.agenda)}>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:clipboard-text-outline"></ha-icon></div>
          <div class="title-block">
            <div class="title">${this._config.title??je(t,"card.exam_countdown.title")}</div>
            <div class="subtitle">${He(i.date,t.language)}</div>
          </div>
        </div>
        <div class="countdown">
          <span class="big">${r}</span>
          <span class="unit">${je(t,"label.days_until")}<br /><b>${i.text}</b></span>
        </div>
        ${s.length?W`
              <hr />
              <div class="chips">
                ${s.slice(0,this._config?.max_items??4).map(e=>W`<span class="chip">${e.text} <span class="n">${He(e.date,t.language)}</span></span>`)}
              </div>
            `:G}
      </ha-card>
    `}};li.styles=[Qe,et,o`
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
    `],e([me()],li.prototype,"_config",void 0),e([me()],li.prototype,"_events",void 0),li=e([he("librus-exam-countdown-card")],li);let hi=class extends Ve{constructor(){super(...arguments),this._events=[]}static getConfigElement(){return Ue()}static getStubConfig(){return{type:"custom:librus-free-days-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 2}connectedCallback(){super.connectedCallback(),this._refreshTimer=setInterval(()=>{this._fetch(!0)},36e5)}disconnectedCallback(){super.disconnectedCallback(),clearInterval(this._refreshTimer)}async _fetch(e=!1){if(!this.hass||!this._config)return;const t=this._resolveEntities();if("error"in t)return;const a=t.map.free_days;if(!a)return;const i=new Date;i.setHours(0,0,0,0);const s=new Date(i);s.setDate(s.getDate()+240);const r=`${a}:${i.toDateString()}`;if(!e&&this._fetchedFor===r)return;this._fetchedFor=r;const o=this._beginFetch();try{const e=(await ct(this.hass,a,i,s)).sort((e,t)=>e.start.localeCompare(t.start));this._isCurrentFetch(o)&&(this._events=e)}catch{this._isCurrentFetch(o)&&(this._events=[])}}render(){if(!this._config||!this.hass)return G;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const t=this.hass;if(this._fetch(),0===this._events.length)return this._message("mdi:beach",je(t,"card.free_days.empty"));const a=new Date,[i,...s]=this._events,r=qe(a,new Date(`${i.start}T00:00:00`));return W`
      <ha-card>
        <div class="header">
          <div class="icon-badge amber"><ha-icon icon="mdi:beach"></ha-icon></div>
          <div class="title-block">
            <div class="title">${this._config?.title??je(t,"card.free_days.title")}</div>
            <div class="subtitle">${i.summary}</div>
          </div>
        </div>
        <div class="countdown">
          <span class="big">${r}</span>
          <span class="unit">${je(t,"label.days_until")}<br /><b>${i.summary}</b></span>
        </div>
        ${s.length?W`
              <hr />
              <div class="chips">
                ${s.slice(0,this._config?.max_items??4).map(e=>W`<span class="chip">${e.summary} <span class="n">${He(e.start,t.language)}</span></span>`)}
              </div>
            `:G}
      </ha-card>
    `}};hi.styles=[Qe,et,o`
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
    `],e([me()],hi.prototype,"_config",void 0),e([me()],hi.prototype,"_events",void 0),hi=e([he("librus-free-days-card")],hi);let ui=class extends Ve{constructor(){super(...arguments),this._events=[]}static getConfigElement(){return Ue()}static getStubConfig(){return{type:"custom:librus-free-days-tile-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 1}connectedCallback(){super.connectedCallback(),this._refreshTimer=setInterval(()=>{this._fetch(!0)},36e5)}disconnectedCallback(){super.disconnectedCallback(),clearInterval(this._refreshTimer)}async _fetch(e=!1){if(!this.hass||!this._config)return;const t=this._resolveEntities();if("error"in t)return;const a=t.map.free_days;if(!a)return;const i=new Date;i.setHours(0,0,0,0);const s=new Date(i);s.setDate(s.getDate()+240);const r=`${a}:${i.toDateString()}`;if(!e&&this._fetchedFor===r)return;this._fetchedFor=r;const o=this._beginFetch();try{const e=(await ct(this.hass,a,i,s)).sort((e,t)=>e.start.localeCompare(t.start));this._isCurrentFetch(o)&&(this._events=e)}catch{this._isCurrentFetch(o)&&(this._events=[])}}render(){if(!this._config||!this.hass)return G;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const t=this.hass;if(this._fetch(),0===this._events.length)return this._message("mdi:beach",je(t,"card.free_days.empty"));const[a]=this._events,i=qe(new Date,new Date(`${a.start}T00:00:00`));return W`
      <ha-card class="tile" @click=${Jt(this,this._config.tap_action,e.map.free_days)}>
        <div class="icon-badge amber"><ha-icon icon="mdi:beach"></ha-icon></div>
        <div class="tile-body">
          <div class="subj">${i} ${je(t,"label.days").toLowerCase()}</div>
          <div class="meta">${a.summary}</div>
        </div>
      </ha-card>
    `}};function pi(e){const t=new Date(e).getDay();return 0===t?7:t}ui.styles=[Qe,et,o`
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
    `],e([me()],ui.prototype,"_config",void 0),e([me()],ui.prototype,"_events",void 0),ui=e([he("librus-free-days-tile-card")],ui);let gi=class extends Ve{constructor(){super(...arguments),this._events=[]}static getConfigElement(){return Ue()}static getStubConfig(){return{type:"custom:librus-week-timetable-card"}}get _dayCount(){return this._config?.show_saturday?6:5}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 4}connectedCallback(){super.connectedCallback(),this._refreshTimer=setInterval(()=>{this._fetch(!0)},18e5),this._tickTimer=setInterval(()=>this.requestUpdate(),3e4)}disconnectedCallback(){super.disconnectedCallback(),clearInterval(this._refreshTimer),clearInterval(this._tickTimer)}async _fetch(e=!1){if(!this.hass||!this._config)return;const t=this._resolveEntities();if("error"in t)return;const a=t.map.timetable;if(!a)return;const i=_t(new Date),s=new Date(i);s.setDate(s.getDate()+this._dayCount);const r=`${a}:${i.toDateString()}:${this._dayCount}`;if(!e&&this._fetchedFor===r)return;this._fetchedFor=r;const o=this._beginFetch();try{const e=await ct(this.hass,a,i,s);this._isCurrentFetch(o)&&(this._events=e)}catch{this._isCurrentFetch(o)&&(this._events=[])}}render(){if(!this._config||!this.hass)return G;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const t=this.hass;if(this._fetch(),0===this._events.length)return this._message("mdi:calendar-week-outline",je(t,"card.week_timetable.empty"));const a=this._dayCount,i=Array.from({length:a},()=>[]);for(const e of this._events){const t=pi(e.start);t>=1&&t<=a&&i[t-1].push(e)}i.forEach(e=>e.sort((e,t)=>e.start.localeCompare(t.start)));const s=e.map.school?t.states[e.map.school]:void 0,r=s?.attributes.bell_schedule??[],o=i.map(e=>e.map(e=>function(e,t){const a=function(e){return e.toLocaleTimeString("en-GB",{hour:"2-digit",minute:"2-digit",hour12:!1})}(new Date(e.start)),i=t.find(e=>e.start===a);return i?i.lesson_no:t.find(e=>e.start<=a&&a<e.end)?.lesson_no}(e,r))),n=r.length>0&&o.every(e=>e.every(e=>void 0!==e));let c,d;if(n){const e=o.flat(),t=Math.min(...e),a=Math.max(...e);c=Array.from({length:a-t+1},(e,a)=>t+a),d=c.map(e=>i.map((t,a)=>t.filter((t,i)=>o[a][i]===e)))}else{const e=Math.max(...i.map(e=>e.length),1);c=Array.from({length:e},(e,t)=>t+1),d=c.map((e,t)=>i.map(e=>e[t]?[e[t]]:[]))}const l=Array.from({length:a},(e,a)=>new Date(2026,0,a+5).toLocaleDateString(t.language,{weekday:"short"})),h=new Date,u=pi(h.toISOString())-1,p=e.map.plan_changes?t.states[e.map.plan_changes]:void 0,g=new Map;if(n)for(const e of p?.attributes.changes??[])"cancelled"!==e.kind&&null!==e.lesson_no&&g.set(`${e.date}|${e.lesson_no}`,e);const m=new Date(this._events[0].start),v=new Date(m.getFullYear(),m.getMonth(),m.getDate()-(pi(this._events[0].start)-1)),b=(u>=0&&u<a?i[u]:[]).filter(e=>!ht(e).cancelled),_=b.find(e=>pt(e,h)),f=b.find(e=>new Date(e.start)>h),y=!_&&!!f&&b.some(e=>gt(e,h));return W`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:calendar-week-outline"></ha-icon></div>
          <div class="title-block">
            <div class="title">${this._config?.title??je(t,"card.week_timetable.title")}</div>
            <div class="subtitle">
              ${y?je(t,"card.week_timetable.break_now",{minutes:Ge(new Date(f.start),h)}):je(t,function(e){return pi(e.toISOString())>=6}(new Date)?"card.week_timetable.subtitle_upcoming":"card.week_timetable.subtitle")}
            </div>
          </div>
        </div>
        <div
          class="week-grid"
          style="grid-template-columns: 24px repeat(${a}, 1fr); grid-template-rows: auto repeat(${c.length}, 1fr);"
        >
          <span class="h"></span>
          ${l.map(e=>W`<span class="h">${e}</span>`)}
          ${c.map((e,a)=>W`
            <span class="n">${e}</span>
            ${d[a].map((a,i)=>{const s=g.get(`${(e=>{const t=new Date(v.getFullYear(),v.getMonth(),v.getDate()+e);return`${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,"0")}-${String(t.getDate()).padStart(2,"0")}`})(i)}|${e}`);if(!a.length)return"missing"===s?.kind&&s.planned_subject?W`<div
                    class="cell missing"
                    title=${`${s.planned_subject} (${je(t,"label.lesson_missing")})`}
                  >${oa(s.planned_subject)}</div>`:W`<div class="cell empty"></div>`;const r=a.map(e=>ht(e)),o=Math.max(0,r.findIndex(e=>!e.cancelled)),n=r[o],c=r.every(e=>e.cancelled),d="extra"===s?.kind?je(t,"label.lesson_extra"):"subject"===s?.kind&&s.planned_subject?je(t,"label.lesson_instead_of",{subject:s.planned_subject}):"room"===s?.kind&&s.planned_classroom&&s.classroom?je(t,"label.lesson_room_change",{from:s.planned_classroom,to:s.classroom}):null,l=r.some(e=>e.substitution||e.roomChange||e.moved)||"subject"===s?.kind||"room"===s?.kind,p="extra"===s?.kind,m=i===u,b=m&&a.some((e,t)=>!r[t].cancelled&&pt(e,h)),_=y&&m&&a.includes(f),w=r.map(e=>e.cancelled?`${e.name} (${je(t,"label.lesson_cancelled")})`:e.roomChange&&e.rooms?`${e.name} (${je(t,"label.lesson_room_change",{from:e.rooms[0],to:e.rooms[1]})})`:e.moved?`${e.name} (${je(t,"label.lesson_moved")})`:e.substitution?`${e.name} (${je(t,"label.lesson_substitution")})`:e.name).join(" / ")+(d?` (${d})`:""),[x,...k]=n.name.split(" + "),$=a.length>1||k.length>0;return W`<div
                class="cell on ${b?"current":""} ${_?"next":""} ${c?"off":""} ${l&&!c?"sub":""} ${p&&!c?"extra":""}"
                title=${w}
              >${oa(x)}${$?"+":""}</div>`})}
          `)}
        </div>
      </ha-card>
    `}};gi.styles=[Qe,et,o`
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
      /* Cancelled: struck through on a dashed outline; substitution: amber
         dashed outline (same marks as the School day card). */
      .cell.off {
        background: transparent;
        border: 1px dashed var(--divider-color);
        text-decoration: line-through;
        opacity: 0.7;
      }
      .cell.sub {
        outline: 2px dashed var(--lc-amber);
        outline-offset: -2px;
      }
      /* Against the usual plan: an extra lesson (green outline), a planned
         lesson that isn't there (ghost cell, struck through). */
      .cell.extra {
        outline: 2px dashed var(--lc-good);
        outline-offset: -2px;
      }
      .cell.missing {
        background: transparent;
        border: 1px dashed var(--divider-color);
        text-decoration: line-through;
        opacity: 0.55;
      }
    `],e([me()],gi.prototype,"_config",void 0),e([me()],gi.prototype,"_events",void 0),gi=e([he("librus-week-timetable-card")],gi);const mi=new Set(["unknown","unavailable",""]);function vi(e){return e.toLocaleTimeString("en-GB",{hour:"2-digit",minute:"2-digit",hour12:!1})}function bi(e){return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`}let _i=class extends Ve{constructor(){super(...arguments),this._events=[]}static getConfigElement(){return Ue()}static getStubConfig(){return{type:"custom:librus-bell-schedule-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 3}connectedCallback(){super.connectedCallback(),this._refreshTimer=setInterval(()=>{this._fetch(!0)},9e5),this._tickTimer=setInterval(()=>this.requestUpdate(),3e4)}disconnectedCallback(){super.disconnectedCallback(),clearInterval(this._refreshTimer),clearInterval(this._tickTimer)}_targetDay(){const e=this._nextLessonDateIso();if(e){const t=new Date(`${e}T00:00:00`);if(!Number.isNaN(t.getTime()))return t}const t=new Date;return t.setHours(0,0,0,0),t}_nextLessonDateIso(){if(!this.hass)return;const e=this._resolveEntities();if("error"in e)return;const t=e.map.next_lesson?this.hass.states[e.map.next_lesson]:void 0,a=t?.attributes.date;return a&&!mi.has(t?.state??"")?a:void 0}async _fetch(e=!1){if(!this.hass||!this._config)return;const t=this._resolveEntities();if("error"in t)return;const a=t.map.timetable;if(!a)return;const i=this._targetDay(),s=new Date(i);s.setDate(s.getDate()+1);const r=`${a}:${bi(i)}`;if(!e&&this._fetchedFor===r)return;this._fetchedFor=r;const o=this._beginFetch();try{const e=(await ct(this.hass,a,i,s)).filter(e=>!e.allDay);this._isCurrentFetch(o)&&(this._events=e)}catch{this._isCurrentFetch(o)&&(this._events=[])}}render(){if(!this._config||!this.hass)return G;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{map:t}=e,a=this.hass;this._fetch();const i=t.school?a.states[t.school]:void 0,s=i?.attributes.bell_schedule??[];if(0===s.length)return this._message("mdi:bell-outline",je(a,"card.bell_schedule.empty"));const r=new Map;for(const e of this._events){const t=vi(new Date(e.start)),a=ht(e),i=r.get(t);e.summary&&(!i||i.info.cancelled&&!a.cancelled)&&r.set(t,{info:a,room:e.location||void 0})}const o=s.map(e=>r.has(e.start)),n=o.indexOf(!0),c=o.lastIndexOf(!0),d=-1===n?s:s.slice(n,c+1),l=bi(this._targetDay())===bi(new Date),h=vi(new Date),u=t.current_lesson?a.states[t.current_lesson]:void 0,p=t.next_lesson?a.states[t.next_lesson]:void 0,g=u&&!mi.has(u.state)?u.state:void 0,m=p&&!mi.has(p.state)?p.state:void 0;let v;if(g)v=`${g} · ${je(a,"label.now")}`;else if(m){const e=Number(p?.attributes.minutes_until);v=Number.isNaN(e)?m:`${m} · ${Ce(a,e)}`}else v=je(a,"label.after_school");return W`
      <ha-card @click=${Jt(this,this._config.tap_action,t.school)}>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:bell-outline"></ha-icon></div>
          <div class="title-block">
            <div class="title">${this._config.title??je(a,"card.bell_schedule.title")}</div>
            <div class="subtitle">${v}</div>
          </div>
        </div>
        <div class="periods">
          ${d.map(e=>{const t=r.get(e.start),i=l&&e.start<=h&&h<=e.end,s=l&&h>e.end;return W`
              <div
                class="period ${i&&!t?.info.cancelled?"current":""} ${s?"past":""} ${t?"":"free"} ${t?.info.cancelled?"lesson-cancelled":""}"
              >
                <span class="pnum">${je(a,"label.lesson_short",{n:e.lesson_no})}</span>
                <span class="ptime">${e.start}<span class="dash">–</span>${e.end}</span>
                ${t?W`<span class="psubj"
                      ><span class="lesson-name">${t.info.name}</span>${it(a,t.info)}${t.room&&!this._config?.hide_room?W` <span class="proom">${t.room}</span>`:G}</span
                    >`:G}
              </div>
            `})}
        </div>
      </ha-card>
    `}};_i.styles=[Qe,et,o`
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
    `],e([me()],_i.prototype,"_config",void 0),e([me()],_i.prototype,"_events",void 0),_i=e([he("librus-bell-schedule-card")],_i);const fi=Array.from({length:16},(e,t)=>`var(--lc-chart-${t+1})`);let yi=class extends Ve{constructor(){super(...arguments),this._events=[]}static getConfigElement(){return Ue()}static getStubConfig(){return{type:"custom:librus-subject-time-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 3}get _dayCount(){return this._config?.show_saturday?6:5}connectedCallback(){super.connectedCallback(),this._refreshTimer=setInterval(()=>{this._fetch(!0)},18e5)}disconnectedCallback(){super.disconnectedCallback(),clearInterval(this._refreshTimer)}async _fetch(e=!1){if(!this.hass||!this._config)return;const t=this._resolveEntities();if("error"in t)return;const a=t.map.timetable;if(!a)return;const i=_t(new Date),s=new Date(i);s.setDate(s.getDate()+this._dayCount);const r=`${a}:${i.toDateString()}:${this._dayCount}`;if(!e&&this._fetchedFor===r)return;this._fetchedFor=r;const o=this._beginFetch();try{const e=await ct(this.hass,a,i,s);this._isCurrentFetch(o)&&(this._events=e)}catch{this._isCurrentFetch(o)&&(this._events=[])}}render(){if(!this._config||!this.hass)return G;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const t=this.hass;if(this._fetch(),0===this._events.length)return this._message("mdi:chart-bar",je(t,"card.subject_time.empty"));const a=new Map;for(const e of this._events){if(!e.summary)continue;const t=ht(e);t.cancelled||a.set(t.name,(a.get(t.name)??0)+1)}const i=[...a.entries()].sort((e,t)=>t[1]-e[1]).map(([e,t],a)=>({label:e,value:t,colorVar:fi[a%fi.length]}));return W`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:chart-bar"></ha-icon></div>
          <div class="title-block">
            <div class="title">${this._config?.title??je(t,"card.subject_time.title")}</div>
            <div class="subtitle">${je(t,"card.subject_time.subtitle")}</div>
          </div>
        </div>
        ${tt(i)}
      </ha-card>
    `}};yi.styles=[Qe,et],e([me()],yi.prototype,"_config",void 0),e([me()],yi.prototype,"_events",void 0),yi=e([he("librus-subject-time-card")],yi);let wi=class extends Ve{static getConfigElement(){return Ue()}static getStubConfig(){return{type:"custom:librus-school-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 2}render(){if(!this._config||!this.hass)return G;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{map:t}=e,a=this.hass,i=t.school?a.states[t.school]:void 0,s=t.school_class?a.states[t.school_class]:void 0;if(!i)return this._message("mdi:school",je(a,"empty.generic_error"));const r=i.attributes.town,o=i.attributes.street,n=i.attributes.head_teacher,c=s?.attributes.homeroom_teacher,d=s?.attributes.first_semester_end,l=s?.attributes.school_year_end,h=ke(a,t);return W`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:school"></ha-icon></div>
          <div class="title-block">
            <div class="title">${this._config?.title??i.state}</div>
            <div class="subtitle">${[r,o].filter(Boolean).join(", ")}</div>
          </div>
        </div>
        <div class="stats">
          ${s?W`<div class="stat"><div class="stat-value">${s.state}</div><div class="stat-label">${je(a,"label.class")}</div></div>`:G}
          ${void 0!==h?W`<div class="stat"><div class="stat-value">${h}</div><div class="stat-label">${je(a,"label.student_number")}</div></div>`:G}
          ${c?W`<div class="stat"><div class="stat-value" style="font-size:0.95rem;">${c}</div><div class="stat-label">${je(a,"label.tutor")}</div></div>`:G}
        </div>
        ${n?W`<div class="item-text">${je(a,"label.head_teacher")}: ${n}</div>`:G}
        ${d||l?W`
              <hr />
              <div class="chips">
                ${d?W`<span class="chip">${je(a,"label.semester_ends")} <span class="n">${He(d,a.language)}</span></span>`:G}
                ${l?W`<span class="chip">${je(a,"label.year_ends")} <span class="n">${He(l,a.language)}</span></span>`:G}
              </div>
            `:G}
      </ha-card>
    `}};wi.styles=[Qe,et],e([me()],wi.prototype,"_config",void 0),wi=e([he("librus-school-card")],wi);let xi=class extends Ve{static getConfigElement(){return Ue()}static getStubConfig(){return{type:"custom:librus-school-year-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 2}connectedCallback(){super.connectedCallback(),this._tickTimer=setInterval(()=>this.requestUpdate(),36e5)}disconnectedCallback(){super.disconnectedCallback(),clearInterval(this._tickTimer)}render(){if(!this._config||!this.hass)return G;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{map:t}=e,a=this.hass,i=t.school_class?a.states[t.school_class]:void 0,s=i?.attributes.school_year_start,r=i?.attributes.first_semester_end,o=i?.attributes.school_year_end;if(!i||!s||!o)return this._message("mdi:party-popper",je(a,"card.school_year.empty"));const n=new Date,c=new Date(`${s}T00:00:00`),d=new Date(`${o}T00:00:00`),l=Math.max(1,qe(c,d)),h=Math.min(l,Math.max(0,qe(c,n))),u=Math.round(h/l*100),p=Math.max(0,qe(n,d)),g=!r||mt(n)<=r,m=g&&r?r:o,v=Math.max(0,qe(n,new Date(`${m}T00:00:00`)));return W`
      <ha-card @click=${Jt(this,this._config.tap_action,t.school_class)}>
        <div class="header">
          <div class="icon-badge amber"><ha-icon icon="mdi:party-popper"></ha-icon></div>
          <div class="title-block">
            <div class="title">${this._config?.title??je(a,"card.school_year.title")}</div>
            <div class="subtitle">${He(o,a.language)}</div>
          </div>
        </div>
        <div class="ring-row">
          ${at(u,"var(--lc-brand)",68,7)}
          <div>
            <div class="ring-num">${p}</div>
            <div class="ring-label">${je(a,"label.days_until_year_end")}</div>
          </div>
        </div>
        <hr />
        <div class="stats">
          <div class="stat">
            <div class="stat-value">${je(a,"card.attendance.semester",{n:g?1:2})}</div>
            <div class="stat-label">${je(a,"label.current_semester")}</div>
          </div>
          <div class="stat">
            <div class="stat-value">${v}</div>
            <div class="stat-label">${je(a,"label.days_until_semester_end")}</div>
          </div>
          <div class="stat">
            <div class="stat-value">${u}<span class="unit">%</span></div>
            <div class="stat-label">${je(a,"label.year_progress")}</div>
          </div>
        </div>
      </ha-card>
    `}};xi.styles=[Qe,et,o`
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
    `],e([me()],xi.prototype,"_config",void 0),xi=e([he("librus-school-year-card")],xi);let ki=class extends Ve{static getConfigElement(){return Ue()}static getStubConfig(){return{type:"custom:librus-today-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 2}connectedCallback(){super.connectedCallback(),this._tickTimer=setInterval(()=>this.requestUpdate(),6e4)}disconnectedCallback(){super.disconnectedCallback(),clearInterval(this._tickTimer)}render(){if(!this._config||!this.hass)return G;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{map:t}=e,a=this.hass,i=e=>t[e]?a.states[t[e]]:void 0,s=i("lucky_number"),r=i("unread_messages"),o=i("unread_announcements"),n=i("timetable"),c=n?.attributes.message,d=n?.attributes.start_time,l="on"===n?.state;return W`
      <ha-card @click=${Jt(this,this._config.tap_action,t.timetable)}>
        <div class="header">
          <div class="icon-badge amber"><ha-icon icon="mdi:white-balance-sunny"></ha-icon></div>
          <div class="title-block">
            <div class="title">${this._config?.title??je(a,"card.today.title")}</div>
            <div class="subtitle">${(new Date).toLocaleDateString(a.language,{weekday:"long",day:"numeric",month:"long"})}</div>
          </div>
        </div>
        <div class="stats">
          ${s&&!be.has(s.state)&&!1!==s.attributes.is_today?W`<div class="stat"><div class="stat-value">${s.state}</div><div class="stat-label">${je(a,"stat.lucky_number")}</div></div>`:G}
          ${r&&!be.has(r.state)?W`<div class="stat"><div class="stat-value">${r.state}</div><div class="stat-label">${je(a,"card.messages.title")}</div></div>`:G}
          ${o&&!be.has(o.state)?W`<div class="stat"><div class="stat-value">${o.state}</div><div class="stat-label">${je(a,"card.announcements.title")}</div></div>`:G}
        </div>
        ${c&&d?W`
              <hr />
              <div class="list-item">
                <span class="dot ${l?"good":"neutral"}"></span>
                <div class="body">
                  <div class="row1">${c}</div>
                  ${l?G:W`<div class="item-text">${Ce(a,Ge(new Date(d.replace(" ","T")),new Date))}</div>`}
                </div>
              </div>
            `:G}
      </ha-card>
    `}};function $i(e){return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`}function zi(e){const t=new Date(e);for(t.setHours(0,0,0,0),t.setDate(t.getDate()+1);0===t.getDay()||6===t.getDay();)t.setDate(t.getDate()+1);return t}ki.styles=[Qe,et],e([me()],ki.prototype,"_config",void 0),ki=e([he("librus-today-card")],ki);let ji=class extends Ve{constructor(){super(...arguments),this._lessons=[]}static getConfigElement(){return Ue()}static getStubConfig(){return{type:"custom:librus-tomorrow-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 3}connectedCallback(){super.connectedCallback(),this._refreshTimer=setInterval(()=>{this._fetch(!0)},18e5)}disconnectedCallback(){super.disconnectedCallback(),clearInterval(this._refreshTimer)}async _fetch(e=!1){if(!this.hass||!this._config)return;const t=this._resolveEntities();if("error"in t)return;const a=t.map.timetable;if(!a)return;const i=zi(new Date),s=new Date(i);s.setDate(s.getDate()+1);const r=`${a}:${$i(i)}`;if(!e&&this._fetchedFor===r)return;this._fetchedFor=r;const o=this._beginFetch();try{const e=(await ct(this.hass,a,i,s)).filter(e=>!e.allDay).sort((e,t)=>e.start.localeCompare(t.start));this._isCurrentFetch(o)&&(this._lessons=e)}catch{this._isCurrentFetch(o)&&(this._lessons=[])}}render(){if(!this._config||!this.hass)return G;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{map:t}=e,a=this.hass;this._fetch();const i=zi(new Date),s=$i(i),r=new Date;r.setHours(0,0,0,0),r.setDate(r.getDate()+1);const o=s===$i(r),n=t.homework_assignments?a.states[t.homework_assignments]:void 0,c=(n?.attributes.recent??[]).filter(e=>(e.due_date??"").slice(0,10)===s),d=t.next_exam?a.states[t.next_exam]:void 0,l=(d?.attributes.upcoming??[]).filter(e=>e.date===s);if(0===this._lessons.length&&0===c.length&&0===l.length)return this._message("mdi:calendar-arrow-right",je(a,"card.tomorrow.empty"));const h=this._lessons.filter(e=>!ht(e).cancelled),u=h[0],p=h[h.length-1];return W`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:calendar-arrow-right"></ha-icon></div>
          <div class="title-block">
            <div class="title">
              ${this._config.title??je(a,o?"card.tomorrow.title":"card.tomorrow.title_next_school_day")}
            </div>
            <div class="subtitle">
              ${i.toLocaleDateString(a.language,{weekday:"long",day:"numeric",month:"long"})}
            </div>
          </div>
        </div>
        ${this._lessons.length?W`
              <div class="stats">
                <div class="stat">
                  <div class="stat-value">${h.length}</div>
                  <div class="stat-label">${je(a,"card.tomorrow.lessons")}</div>
                </div>
                ${u?W`
                      <div class="stat">
                        <div class="stat-value">${We(u.start)}</div>
                        <div class="stat-label">${je(a,"card.tomorrow.starts")}</div>
                      </div>
                      <div class="stat">
                        <div class="stat-value">${We(p.end)}</div>
                        <div class="stat-label">${je(a,"card.tomorrow.ends")}</div>
                      </div>
                    `:G}
              </div>
            `:G}
        ${l.length||c.length?W`
              <div class="alerts">
                ${l.map(e=>W`
                    <div class="alert-row">
                      <span class="dot bad"></span>
                      <span>${e.category?`${e.category}: `:""}${e.subject??""}</span>
                    </div>
                  `)}
                ${c.length?W`
                      <div class="alert-row">
                        <span class="dot warn"></span>
                        <span>${je(a,"card.tomorrow.homework",{n:c.length})}</span>
                      </div>
                    `:G}
              </div>
            `:G}
        ${this._lessons.length?W`
              <hr />
              <div class="scroll-list">
                ${this._lessons.map(e=>{const t=ht(e);return W`
                    <div class="list-item ${t.cancelled?"lesson-cancelled":""}">
                      <span class="lt">${We(e.start)}</span>
                      <div class="body">
                        <div class="row1"><span><span class="lesson-name">${t.name}</span>${it(a,t)}</span></div>
                        ${ut(e,t,this._config?.hide_room)?W`<div class="item-text">${ut(e,t,this._config?.hide_room)}</div>`:G}
                      </div>
                    </div>
                  `})}
              </div>
            `:G}
      </ha-card>
    `}};ji.styles=[Qe,et,o`
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
    `],e([me()],ji.prototype,"_config",void 0),e([me()],ji.prototype,"_lessons",void 0),ji=e([he("librus-tomorrow-card")],ji);const Ci=/\s*\((odwołane|zastępstwo)\)\s*$/i,Si=["var(--lc-chart-1)","var(--lc-chart-2)","var(--lc-chart-3)","var(--lc-chart-7)","var(--lc-chart-8)","var(--lc-chart-10)"];function Di(e){const t=new Date(e);for(t.setHours(0,0,0,0),t.setDate(t.getDate()+1);0===t.getDay()||6===t.getDay();)t.setDate(t.getDate()+1);return t}const Ti=e=>new Date(e).getTime();function Ni(e,t,a){if(void 0===e)return{skipped:0,free:!1,started:!1,unknown:!0};const i=e.filter(e=>!e.allDay&&e.start.slice(0,10)===t).sort((e,t)=>Ti(e.start)-Ti(t.start)),s=i.filter(e=>!/\(odwołane\)\s*$/i.test(e.summary)),r=s[0];return r?{lesson:{start:r.start,subject:r.summary.replace(Ci,""),room:r.location||void 0,substitution:/\(zastępstwo\)\s*$/i.test(r.summary)},skipped:i.filter(e=>Ti(e.start)<Ti(r.start)&&!s.includes(e)).length,free:!1,started:Ti(r.start)<=a.getTime(),unknown:!1}:{skipped:0,free:!0,started:!1,unknown:!1}}function Ii(e,t,a){if(a?.trim())return a.trim();const i=e.devices?.[t];if(i?.name_by_user)return i.name_by_user;return(i?.name??"").replace(/^e-dziennik\s+/i,"").trim().split(/\s+/)[0]||i?.name||t}let Ei=class extends Ve{constructor(){super(...arguments),this._events=new Map}static getConfigElement(){return Ue()}static getStubConfig(){return{type:"custom:librus-first-lesson-card"}}setConfig(e){this._config=e}getCardSize(){return 1+2*Math.max(1,this._events.size)}connectedCallback(){super.connectedCallback(),this._refreshTimer=setInterval(()=>{this._fetch(!0)},18e5),this._tickTimer=setInterval(()=>this.requestUpdate(),6e4)}disconnectedCallback(){super.disconnectedCallback(),clearInterval(this._refreshTimer),clearInterval(this._tickTimer)}_deviceIds(){const e=fe(this.hass),t=this._config?.devices;return t?.length?t.filter(t=>e.includes(t)):[...e].sort((e,t)=>Ii(this.hass,e,this._config?.names?.[e]).localeCompare(Ii(this.hass,t,this._config?.names?.[t])))}async _fetch(e=!1){if(!this.hass||!this._config)return;const t=this.hass,a=this._deviceIds(),i=new Date;i.setHours(0,0,0,0);const s=Di(i);s.setDate(s.getDate()+1);const r=`${a.join(",")}:${mt(i)}`;if(!e&&this._fetchedFor===r)return;this._fetchedFor=r;const o=this._beginFetch(),n=await Promise.all(a.map(async e=>{const a=we(t,e).timetable;if(!a)return[e,void 0];try{return[e,await ct(t,a,i,s)]}catch{return[e,void 0]}}));this._isCurrentFetch(o)&&(this._events=new Map(n))}render(){if(!this._config||!this.hass)return G;this._syncTheme();const e=this.hass,t=this._config,a=this._deviceIds();if(0===a.length)return this._message("mdi:alert-circle-outline",je(e,"error.no_device"));if(this._fetch(),0===this._events.size)return this._message("mdi:alarm",je(e,"empty.loading"));const i=new Date,s=mt(i),r=Di(i),o=mt(r),n=new Date(i);n.setDate(n.getDate()+1);const c=o===mt(n),d=Boolean(t.only_tomorrow),l=a.map((a,r)=>({deviceId:a,name:Ii(e,a,t.names?.[a]),color:Si[r%Si.length],today:Ni(this._events.get(a),s,i),next:Ni(this._events.get(a),o,i)}));if(l.every(e=>(d||e.today.free)&&e.next.free))return this._message("mdi:alarm",je(e,"card.first_lesson.empty"));const h=!d&&l.some(e=>e.today.lesson&&!e.today.started),u=h?"today":"next",p=l.filter(e=>e[u].lesson&&!e[u].started).reduce((e,t)=>!e||Ti(t[u].lesson.start)<Ti(e[u].lesson.start)?t:e,void 0),g=c?je(e,"card.first_lesson.tomorrow"):r.toLocaleDateString(e.language,{weekday:"short"});let m="";if(p){const t=h?"card.first_lesson.earliest_today":c?"card.first_lesson.earliest_tomorrow":"card.first_lesson.earliest_on",[a,i]=je(e,t,{day:r.toLocaleDateString(e.language,{weekday:"long"}),who:"\0"}).split("\0");m=W`${a}<b>${p.name} ${We(p[u].lesson.start)}</b>${i??""}`}return W`
      <ha-card class="static">
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:alarm"></ha-icon></div>
          <div class="title-block">
            <div class="title">${t.title??je(e,"card.first_lesson.title")}</div>
            ${m?W`<div class="subtitle">${m}</div>`:G}
          </div>
        </div>
        <div class="kids">
          ${l.map((t,a)=>W`
              ${a>0?W`<hr />`:G}
              <div class="kid">
                <div class="avatar" style="background:${t.color}">${t.name.slice(0,1).toUpperCase()}</div>
                <div class="kname">${t.name}</div>
                <div class="lines">
                  ${d?G:this._line(je(e,"card.first_lesson.today"),t.today,{on:h,first:h&&p===t,past:t.today.started||!h})}
                  ${this._line(g,t.next,{on:!h,first:!h&&p===t,past:!1})}
                </div>
              </div>
            `)}
        </div>
      </ha-card>
    `}_line(e,t,a){const i=this.hass,s=`line${a.first?" first":""}${a.past?" past":""}`,r=W`<span class="day ${a.on?"on":""}">${e}</span>`;if(t.unknown||t.free||!t.lesson){const e=t.unknown?je(i,"card.first_lesson.no_data"):je(i,"card.first_lesson.free");return W`<div class=${s}>${r}<span class="time">–</span><span class="subj muted">${e}</span></div>`}const o=t.lesson,n=[];return 1===t.skipped&&n.push(je(i,"card.first_lesson.first_canceled")),t.skipped>1&&n.push(je(i,"card.first_lesson.first_n_canceled",{n:t.skipped})),o.substitution&&n.push(je(i,"card.first_lesson.substitution")),W`
      <div class=${s}>
        ${r}
        <span class="time">${We(o.start)}</span>
        <span class="subj"
          >${o.subject}${o.room&&!this._config?.hide_room?W`<span class="muted"> · ${o.room}</span>`:G}${n.map(e=>W` <span class="chip">${e}</span>`)}</span
        >
      </div>
    `}};Ei.styles=[Qe,et,o`
      .kids {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      .kid {
        display: grid;
        grid-template-columns: 30px 1fr;
        column-gap: 10px;
        align-items: start;
      }
      .avatar {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        color: #fff;
        font-weight: 800;
        font-size: 0.85rem;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      :host(.dark) .avatar {
        color: rgba(0, 0, 0, 0.78);
      }
      .kname {
        font-weight: 700;
        font-size: 0.88rem;
        line-height: 30px;
        min-width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .lines {
        grid-column: 2;
        display: flex;
        flex-direction: column;
        gap: 3px;
      }
      .line {
        display: grid;
        grid-template-columns: 3.4rem 3rem 1fr;
        gap: 6px;
        align-items: baseline;
        font-size: 0.84rem;
      }
      .day {
        color: var(--secondary-text-color);
        font-size: 0.72rem;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        font-weight: 700;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .day.on {
        color: var(--lc-brand);
      }
      .time {
        font-size: 0.95rem;
        font-weight: 600;
        font-variant-numeric: tabular-nums;
      }
      .line.first .time {
        color: var(--lc-brand);
        font-weight: 800;
      }
      .line.past {
        opacity: 0.45;
      }
      .subj {
        min-width: 0;
      }
      .muted {
        color: var(--secondary-text-color);
      }
      .chip {
        display: inline-block;
        font-size: 0.68rem;
        font-weight: 700;
        padding: 1px 7px;
        border-radius: 999px;
        background: var(--lc-amber-bg);
        color: var(--lc-amber);
        white-space: nowrap;
      }
      .subtitle b {
        color: var(--lc-brand);
        font-weight: 700;
      }
    `],e([me()],Ei.prototype,"_config",void 0),e([me()],Ei.prototype,"_events",void 0),Ei=e([he("librus-first-lesson-card")],Ei);let Ai=class extends Ve{static getConfigElement(){return Ue()}static getStubConfig(){return{type:"custom:librus-week-summary-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 2}render(){if(!this._config||!this.hass)return G;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{deviceId:t,map:a}=e,i=this.hass,s=a.attendance?i.states[a.attendance]:void 0,r=a.behaviour_notices?i.states[a.behaviour_notices]:void 0,o=a.agenda?i.states[a.agenda]:void 0,n=new Date;n.setDate(n.getDate()-7);const c=mt(n),d=this._resolveAllByTranslationKey(t,"subject_average").filter(e=>{const t=i.states[e.entityId]?.attributes.latest_grade_date;return t&&t>=c}).length,l=o?.attributes.message;return W`
      <ha-card @click=${Jt(this,this._config.tap_action,a.overall_average)}>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:calendar-check-outline"></ha-icon></div>
          <div class="title-block">
            <div class="title">${this._config?.title??je(i,"card.week_summary.title")}</div>
          </div>
        </div>
        <div class="stats">
          <div class="stat">
            <div class="stat-value">${d}</div>
            <div class="stat-label">${je(i,"stat.new_grades")}</div>
          </div>
          ${s&&!be.has(s.state)?(()=>{const e=s.attributes.unexcused_count??Number(s.state);return W`<div class="stat ${e>0?"bad":""}"><div class="stat-value">${e}</div><div class="stat-label">${je(i,"stat.absences")}</div></div>`})():G}
          ${r&&!be.has(r.state)?W`<div class="stat"><div class="stat-value">${r.state}</div><div class="stat-label">${je(i,"card.behaviour_notices.title")}</div></div>`:G}
        </div>
        ${l?(()=>{const{category:e,text:t}=Ye(l);return W`
                <hr />
                <div class="list-item">
                  <span class="dot neutral"></span>
                  <div class="body">
                    ${e?W`<div class="cat-label-row"><span class="cat-label">${e}</span></div>`:G}
                    <div class="row1">${t}</div>
                    ${o?.attributes.start_time?W`<div class="item-text">${He(String(o.attributes.start_time),i.language)}</div>`:G}
                  </div>
                </div>
              `})():G}
      </ha-card>
    `}};Ai.styles=[Qe,et],e([me()],Ai.prototype,"_config",void 0),Ai=e([he("librus-week-summary-card")],Ai);let Mi=class extends Ve{static getConfigElement(){return Ue()}static getStubConfig(){return{type:"custom:librus-lucky-number-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 2}render(){if(!this._config||!this.hass)return G;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{map:t}=e,a=this.hass,i=t.lucky_number?a.states[t.lucky_number]:void 0;if(!i)return this._message("mdi:dice-5-outline",je(a,"empty.generic_error"));if(be.has(i.state))return this._message("mdi:dice-5-outline",je(a,"card.lucky_number.empty"));const s=i.attributes.is_today,r=i.attributes.day,o=i.attributes.is_yours,n=!1===s&&r,c=o?n?je(a,"card.lucky_number.yours_for_date",{date:He(r,a.language)}):je(a,"card.lucky_number.yours_today"):n?je(a,"card.lucky_number.subtitle_for_date",{date:He(r,a.language)}):je(a,"card.lucky_number.subtitle");return W`
      <ha-card
        class=${[Zt(this._config.tap_action)?"":"static",o?"yours":""].filter(Boolean).join(" ")}
        @click=${Jt(this,this._config.tap_action,t.lucky_number)}
      >
        <div class="header">
          <div class="icon-badge ${o?"good":"amber"}">
            <ha-icon icon=${o?"mdi:party-popper":"mdi:dice-5-outline"}></ha-icon>
          </div>
          <div class="title-block">
            <div class="title">${this._config?.title??je(a,"card.lucky_number.title")}</div>
            <div class="subtitle">${c}</div>
          </div>
        </div>
        <div class="number-wrap">
          <div class="number">${i.state}</div>
        </div>
      </ha-card>
    `}};Mi.styles=[Qe,et,o`
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
    `],e([me()],Mi.prototype,"_config",void 0),Mi=e([he("librus-lucky-number-card")],Mi);let Li=class extends Ve{static getConfigElement(){return Ue()}static getStubConfig(){return{type:"custom:librus-student-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 3}render(){if(!this._config||!this.hass)return G;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{deviceId:t,map:a}=e,i=this.hass,s=i.devices?.[t]?.name_by_user||i.devices?.[t]?.name||"",r=a.school_class?i.states[a.school_class]?.state:void 0,o=ke(i,a),n=[],c=a.attendance?i.states[a.attendance]:void 0,d=c?.attributes.total_records;if(c&&d){const e=Number(c.state)||0;n.push({key:"attendance",label:je(i,"stat.attendance_score"),value:Math.round((d-e)/d*100),colorVar:"var(--lc-good)"})}const l=a.behaviour_notices?i.states[a.behaviour_notices]:void 0;l&&!be.has(l.state)&&n.push({key:"behaviour",label:je(i,"stat.behaviour_score"),value:Math.max(0,100-10*Number(l.state)),colorVar:"var(--lc-brand)"});const h=a.overall_average?i.states[a.overall_average]:void 0;h&&!be.has(h.state)&&n.push({key:"grades",label:je(i,"stat.grades_score"),value:Math.round(Number(h.state)/6*100),colorVar:"var(--lc-amber)"});const u=this._resolveAllByTranslationKey(t,"subject_average");if(u.length){const e=u.filter(e=>{const t=i.states[e.entityId]?.attributes.grade_count;return t&&t>0}).length;n.push({key:"activity",label:je(i,"stat.activity_score"),value:Math.round(e/u.length*100),colorVar:"var(--lc-brand)"})}if(0===n.length)return this._message("mdi:cards-outline",je(i,"empty.generic_error"));const p=Math.round(n.reduce((e,t)=>e+t.value,0)/n.length);return W`
      <ha-card class="tcard" @click=${Jt(this,this._config.tap_action,a.overall_average)}>
        <div class="tcard-inner">
          <div class="tcard-head">
            <div>
              <div class="tcard-name">${s}</div>
              ${r?W`<div class="tcard-class">
                    ${r}${void 0!==o?` · ${je(i,"label.student_number_short",{n:o})}`:""}
                  </div>`:G}
            </div>
            <div class="tcard-rating">
              <div class="v">${p}</div>
              <div class="l">${je(i,"stat.overall_rating")}</div>
            </div>
          </div>
          <div class="tcard-bars">
            ${n.map(e=>W`
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
    `}};Li.styles=[Qe,et,o`
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
    `],e([me()],Li.prototype,"_config",void 0),Li=e([he("librus-student-card")],Li);let Pi=class extends Ve{static getConfigElement(){return Ue()}static getStubConfig(){return{type:"custom:librus-streak-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 2}render(){if(!this._config||!this.hass)return G;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{map:t}=e,a=this.hass,i=je(a,"label.days"),s=[],r=t.attendance_streak?a.states[t.attendance_streak]:void 0;if(r&&!be.has(r.state))s.push({key:"attendance",label:je(a,"card.streak.attendance"),value:Number(r.state),unit:i});else{const e=t.attendance?a.states[t.attendance]:void 0,r=e?.attributes.last_absence_date,o=t.school_class?a.states[t.school_class]?.attributes.school_year_start:void 0,n=r?new Date(`${r}T00:00:00`):o?new Date(`${o}T00:00:00`):void 0;n&&s.push({key:"attendance",label:je(a,"card.streak.attendance"),value:Math.max(0,qe(n,new Date)),unit:i})}const o=t.behaviour_streak?a.states[t.behaviour_streak]:void 0;o&&!be.has(o.state)&&s.push({key:"behaviour",label:je(a,"card.streak.behaviour"),value:Number(o.state),unit:i});const n=t.good_grade_streak?a.states[t.good_grade_streak]:void 0;return n&&!be.has(n.state)&&s.push({key:"grades",label:je(a,"card.streak.grades"),value:Number(n.state)}),0===s.length?this._message("mdi:fire",je(a,"empty.generic_error")):W`
      <ha-card
        class=${Zt(this._config.tap_action)?"":"static"}
        @click=${Jt(this,this._config.tap_action,t.attendance_streak??t.attendance)}
      >
        <div class="header">
          <div class="icon-badge amber"><ha-icon icon="mdi:fire"></ha-icon></div>
          <div class="title-block">
            <div class="title">${this._config?.title??je(a,"card.streak.title")}</div>
          </div>
        </div>
        <div class="stats">
          ${s.map(e=>W`
              <div class="stat">
                <div class="stat-value">${e.value}${e.unit?W`<span class="unit">${e.unit}</span>`:G}</div>
                <div class="stat-label">${e.label}</div>
              </div>
            `)}
        </div>
      </ha-card>
    `}};Pi.styles=[Qe,et],e([me()],Pi.prototype,"_config",void 0),Pi=e([he("librus-streak-card")],Pi);const Fi=["bronze","silver","gold","diamond"],Bi={bronze:0,silver:3,gold:4,diamond:5},Oi={bronze:"var(--lc-bronze)",silver:"var(--lc-silver)",gold:"var(--lc-amber)",diamond:"var(--lc-diamond)"},Ki={bronze:"bronze",silver:"silver",gold:"amber",diamond:"diamond"},Ui={bronze:"mdi:medal-outline",silver:"mdi:trophy-outline",gold:"mdi:trophy",diamond:"mdi:diamond-stone"};let Ri=class extends Ve{static getConfigElement(){return Ue()}static getStubConfig(){return{type:"custom:librus-rank-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 2}render(){if(!this._config||!this.hass)return G;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{map:t}=e,a=this.hass,i=t.rank?a.states[t.rank]:void 0;if(!i)return this._message("mdi:alert-circle-outline",je(a,"empty.generic_error"));if(be.has(i.state)||(s=i.state,!Fi.includes(s)))return this._message("mdi:trophy-outline",je(a,"card.rank.empty"));var s;const r=i.state,o=i.attributes.average,n=i.attributes.points_to_next_tier,c=Fi.indexOf(r),d=Fi[c+1],l=Bi[r],h=d?Bi[d]:void 0,u=void 0!==o&&void 0!==h?(o-l)/(h-l)*100:100;return W`
      <ha-card @click=${Jt(this,this._config.tap_action,t.rank)}>
        <div class="header">
          <div class="icon-badge ${Ki[r]}">
            <ha-icon icon=${Ui[r]}></ha-icon>
          </div>
          <div class="title-block">
            <div class="title">${this._config.title??je(a,"card.rank.title")}</div>
          </div>
        </div>
        <div class="ring-row">
          ${at(Math.round(u),Oi[r],68,7)}
          <div>
            <div class="ring-num" style="color:${Oi[r]}">${je(a,`rank.${r}`)}</div>
            <div class="ring-label">${void 0!==o?o.toFixed(2):"—"}</div>
          </div>
        </div>
        <div class="hint">
          ${null!=n?W`${n.toFixed(2)} ${je(a,"label.to_next_rank")}`:je(a,"label.top_rank")}
        </div>
      </ha-card>
    `}};Ri.styles=[Qe,et,o`
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
    `],e([me()],Ri.prototype,"_config",void 0),Ri=e([he("librus-rank-card")],Ri);const Wi=[{sensorKey:"good_grade_streak",idPrefix:"good_grade_streak",thresholds:[5,10,20]},{sensorKey:"attendance_streak",idPrefix:"attendance_streak",thresholds:[7,30,90]},{sensorKey:"behaviour_streak",idPrefix:"behaviour_streak",thresholds:[7,30,90]}];let Hi=class extends Ve{constructor(){super(...arguments),this._unlocked=[],this._storageKey="",this._subscribeGeneration=0,this._torndown=!1}static getConfigElement(){return Ue()}static getStubConfig(){return{type:"custom:librus-achievements-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 2}connectedCallback(){super.connectedCallback(),this._torndown=!1}disconnectedCallback(){super.disconnectedCallback(),this._torndown=!0,this._subscribeGeneration++,this._unsubscribe?.(),this._unsubscribe=void 0,this._subscribedDeviceId=void 0}_load(e){const t=`librus-achievements:${e}`;if(this._storageKey!==t){this._storageKey=t;try{const e=window.localStorage.getItem(t);this._unlocked=e?JSON.parse(e):[]}catch{this._unlocked=[]}}}_persist(){try{window.localStorage.setItem(this._storageKey,JSON.stringify(this._unlocked.slice(-50)))}catch{}}async _subscribe(e){if(this._subscribedDeviceId===e||!this.hass)return;this._subscribedDeviceId=e,this._unsubscribe?.(),this._unsubscribe=void 0;const t=++this._subscribeGeneration,a=this.hass.devices[e]?.config_entries??[],i=await this.hass.connection.subscribeEvents(e=>{const t=e.data;a.length&&t.entry_id&&!a.includes(t.entry_id)||this._unlocked.some(e=>e.id===t.id)||(this._unlocked=[...this._unlocked,{id:t.id,title:t.title,when:(new Date).toISOString()}],this._persist())},"librus_synergia_achievement_unlocked");this._torndown||t!==this._subscribeGeneration?i():this._unsubscribe=i}_nextMilestoneHint(e,t){let a;for(const i of Wi){const s=t[i.sensorKey],r=s?e.states[s]:void 0;if(!r||be.has(r.state))continue;const o=Number(r.state);if(Number.isFinite(o))for(const t of i.thresholds){if(o>=t)continue;const s=t-o;if(!a||s<a.gap){a={gap:s,remaining:s,title:je(e,`achievement.${i.idPrefix}_${t}`)}}break}}return a?{remaining:a.remaining,title:a.title}:void 0}render(){if(!this._config||!this.hass)return G;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{deviceId:t,map:a}=e,i=this.hass,s=a.rank?i.states[a.rank]?.attributes.badges:void 0;if(Array.isArray(s)&&s.length)return this._renderBadges(i,s);this._load(t),this._subscribe(t);const r=this._nextMilestoneHint(i,a),o=(a.rank?i.states[a.rank]?.attributes.achievements:void 0)??[],n=[...this._unlocked];for(const e of o)n.some(t=>t.id===e.key)||n.push({id:e.key,title:e.title,when:""});if(0===n.length)return this._message("mdi:trophy-outline",je(i,"card.achievements.empty"),r?je(i,"card.achievements.next_hint",{n:r.remaining,title:r.title}):void 0);const c=n.sort((e,t)=>t.when.localeCompare(e.when));return W`
      <ha-card>
        <div class="header">
          <div class="icon-badge amber"><ha-icon icon="mdi:trophy"></ha-icon></div>
          <div class="title-block">
            <div class="title">${this._config.title??je(i,"card.achievements.title")}</div>
            <div class="subtitle">${je(i,"card.achievements.count",{n:c.length})}</div>
          </div>
        </div>
        <div class="chips">
          ${c.map(e=>W`<span class="chip hot"><ha-icon icon="mdi:trophy-award"></ha-icon>${e.title}</span>`)}
        </div>
        ${r?W`
              <div class="next-hint">
                <ha-icon icon="mdi:target"></ha-icon>
                <span>${je(i,"card.achievements.next_hint",{n:r.remaining,title:r.title})}</span>
              </div>
            `:G}
      </ha-card>
    `}_badgeName(e,t,a){const i=je(e,`badge.${t.key}`)??t.title;return void 0!==a&&t.tiers?`${i} · ${t.tiers[a]}`:i}_number(e,t,a){return"average"===a?t.toLocaleString(e.language,{minimumFractionDigits:2,maximumFractionDigits:2}):String(Math.round(t))}_goal(e){const t=e.earned.length>=(e.tiers?.length??1),a=e.tiers?e.tiers[e.earned.length]:e.target;if(!t&&null!=a&&null!==e.value&&a>0)return{target:a,ratio:Math.max(0,Math.min(1,e.value/a))}}_dateLabel(e,t){const a=new Date(`${t.slice(0,10)}T12:00:00`);return Number.isNaN(a.getTime())?t:a.toLocaleDateString(e.language,{day:"numeric",month:"short"})}_renderBadges(e,t){const a=t.reduce((e,t)=>e+(t.tiers?.length??1),0),i=t.reduce((e,t)=>e+t.earned.length,0),s=t.filter(e=>e.earned.length>0),r=t.map(e=>({b:e,goal:this._goal(e)})).filter(e=>!!e.goal&&e.goal.ratio>0).sort((e,t)=>t.goal.ratio-e.goal.ratio).slice(0,3),o=t.flatMap(e=>e.earned.map((t,a)=>({b:e,day:t,i:a}))).sort((e,t)=>t.day.localeCompare(e.day)).slice(0,3),n=r.length?je(e,"card.achievements.closest",{title:this._badgeName(e,r[0].b)}):je(e,"card.achievements.count",{n:i}),c=je(e,"card.achievements.days");return W`
      <ha-card>
        <div class="header">
          <div class="icon-badge amber"><ha-icon icon="mdi:trophy"></ha-icon></div>
          <div class="title-block">
            <div class="title">${this._config?.title??je(e,"card.achievements.title")}</div>
            <div class="subtitle">${n}</div>
          </div>
          <div class="sum"><b>${i}</b><span>${je(e,"card.achievements.of",{n:a})}</span></div>
        </div>
        <div class="bar"><i style="width:${a?Math.round(i/a*100):0}%"></i></div>
        ${s.length?W`<div class="strip">
              ${s.map(t=>{const a=t.tiers?t.earned.length-1:void 0;return W`<span class="strip-ic" title=${this._badgeName(e,t,a)}
                  ><ha-icon icon=${t.icon}></ha-icon
                ></span>`})}
            </div>`:W`<div class="none">${je(e,"card.achievements.none_yet")}</div>`}
        ${r.length?W`<div class="section-title">${je(e,"card.achievements.goals")}</div>
              <div class="goals">
                ${r.map(({b:t,goal:a})=>W`<div class="goal">
                    <span class="goal-ic"><ha-icon icon=${t.icon}></ha-icon></span>
                    <div class="goal-body">
                      <div class="goal-name">${this._badgeName(e,t)}</div>
                      <div class="bar"><i style="width:${Math.round(100*a.ratio)}%"></i></div>
                    </div>
                    <span class="goal-val"
                      >${this._number(e,t.value??0,t.unit)} /
                      ${this._number(e,a.target,t.unit)}${"days"===t.unit?` ${c}`:""}</span
                    >
                  </div>`)}
              </div>`:G}
        ${o.length?W`<div class="recent">
              <div class="section-title">${je(e,"card.achievements.recent")}</div>
              ${o.map(({b:t,day:a,i:i})=>W`<div class="recent-row">
                  <ha-icon icon=${t.icon}></ha-icon>
                  <span>${this._badgeName(e,t,t.tiers?i:void 0)}</span>
                  <time>${this._dateLabel(e,a)}</time>
                </div>`)}
            </div>`:G}
      </ha-card>
    `}};Hi.styles=[Qe,et,o`
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
      .sum {
        margin-left: auto;
        text-align: right;
        line-height: 1.1;
      }
      .sum b {
        font-size: 1.3rem;
        font-weight: 800;
        font-variant-numeric: tabular-nums;
      }
      .sum span {
        display: block;
        font-size: 0.7rem;
        color: var(--secondary-text-color);
      }
      .bar {
        height: 6px;
        border-radius: 99px;
        background: var(--lc-ring-track);
        overflow: hidden;
      }
      .bar > i {
        display: block;
        height: 100%;
        border-radius: inherit;
        background: var(--lc-brand);
      }
      .strip {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
        margin-top: 12px;
      }
      .strip-ic {
        width: 34px;
        height: 34px;
        border-radius: 10px;
        display: grid;
        place-items: center;
        background: var(--lc-amber-bg);
        color: var(--lc-amber);
        --mdc-icon-size: 19px;
      }
      .none {
        margin-top: 12px;
        font-size: 0.8rem;
        color: var(--secondary-text-color);
      }
      .section-title {
        margin: 14px 0 8px;
        font-size: 0.66rem;
        font-weight: 700;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: var(--secondary-text-color);
      }
      .goals {
        display: grid;
        gap: 10px;
      }
      .goal {
        display: grid;
        grid-template-columns: 30px minmax(0, 1fr) auto;
        gap: 10px;
        align-items: center;
      }
      .goal-ic {
        width: 30px;
        height: 30px;
        border-radius: 9px;
        display: grid;
        place-items: center;
        background: var(--lc-chip-bg);
        color: var(--secondary-text-color);
        --mdc-icon-size: 17px;
      }
      .goal-name {
        font-size: 0.8rem;
        font-weight: 600;
        margin-bottom: 4px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .goal-val {
        font-size: 0.74rem;
        color: var(--secondary-text-color);
        font-variant-numeric: tabular-nums;
        white-space: nowrap;
      }
      .recent {
        margin-top: 14px;
        border-top: 1px solid var(--divider-color, rgba(127, 127, 127, 0.2));
      }
      .recent-row {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 0.8rem;
        padding: 3px 0;
      }
      .recent-row ha-icon {
        --mdc-icon-size: 16px;
        color: var(--lc-good);
        flex-shrink: 0;
      }
      .recent-row time {
        margin-left: auto;
        color: var(--secondary-text-color);
        font-size: 0.74rem;
        white-space: nowrap;
      }
      .next-hint ha-icon {
        --mdc-icon-size: 16px;
        flex-shrink: 0;
      }
    `],e([me()],Hi.prototype,"_config",void 0),e([me()],Hi.prototype,"_unlocked",void 0),Hi=e([he("librus-achievements-card")],Hi);let qi=class extends Ve{static getConfigElement(){return Ue()}static getStubConfig(){return{type:"custom:librus-teachers-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 2}render(){if(!this._config||!this.hass)return G;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{map:t}=e,a=this.hass,i=t.school?a.states[t.school]:void 0,s=i?.attributes.subject_teachers??{},r=Object.entries(s),o=t.school_class?a.states[t.school_class]:void 0,n=o?.attributes.homeroom_teacher;return n||0!==r.length?W`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:account-group-outline"></ha-icon></div>
          <div class="title-block">
            <div class="title">${this._config.title??je(a,"card.teachers.title")}</div>
            <div class="subtitle">${je(a,"card.teachers.count",{n:r.length})}</div>
          </div>
        </div>
        <div class="scroll-list">
          ${n?W`
                <div class="list-item">
                  <span class="dot warn"></span>
                  <div class="body">
                    <div class="row1"><span>${je(a,"card.teachers.homeroom")}</span></div>
                    <div class="item-text">${n}</div>
                  </div>
                </div>
              `:G}
          ${ua(r,{max_items:this._config?.max_items}).map(([e,t])=>W`
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
    `:this._message("mdi:account-group-outline",je(a,"card.teachers.empty"))}};qi.styles=[Qe,et],e([me()],qi.prototype,"_config",void 0),qi=e([he("librus-teachers-card")],qi);let Gi=class extends Ve{static getConfigElement(){return Ue()}static getStubConfig(){return{type:"custom:librus-level-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 2}render(){if(!this._config||!this.hass)return G;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{deviceId:t,map:a}=e,i=this.hass;let s=0,r=0;for(const e of this._resolveAllByTranslationKey(t,"subject_average")){const t=i.states[e.entityId]?.attributes.grades??[];for(const e of t){s+=1;const t=/^([1-6])/.exec(e.value.trim())?.[1];t&&Number(t)>=4&&(r+=1)}}const o=a.attendance?i.states[a.attendance]:void 0,n=o?.attributes.total_records??0,c=o?.attributes.unexcused_count??0,d=o?.attributes.excused_count??0,l=8*s+7*r,h=1*Math.max(0,n-c-d),u=l+h,{level:p,into:g,span:m}=function(e){let t=1,a=0,i=100;for(;e>=a+i;)a+=i,t+=1,i+=100;return{level:t,into:e-a,span:i}}(u),v=g/m*100;return W`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:progress-star"></ha-icon></div>
          <div class="title-block">
            <div class="title">${this._config.title??je(i,"card.level.title")}</div>
            <div class="subtitle">${je(i,"card.level.subtitle")}</div>
          </div>
        </div>
        <div class="ring-row">
          ${at(Math.round(v),"var(--lc-brand)",68,7)}
          <div>
            <div class="ring-num">${je(i,"label.level",{n:p})}</div>
            <div class="ring-label">${je(i,"label.xp_to_next",{n:m-g})}</div>
          </div>
        </div>
        <div class="stats">
          <div class="stat">
            <div class="stat-value">${l}</div>
            <div class="stat-label">${je(i,"label.xp_from_grades")}</div>
          </div>
          <div class="stat">
            <div class="stat-value">${h}</div>
            <div class="stat-label">${je(i,"label.xp_from_attendance")}</div>
          </div>
          <div class="stat">
            <div class="stat-value">${u}</div>
            <div class="stat-label">${je(i,"label.xp_total")}</div>
          </div>
        </div>
      </ha-card>
    `}};Gi.styles=[Qe,et,o`
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
    `],e([me()],Gi.prototype,"_config",void 0),Gi=e([he("librus-level-card")],Gi);const Ji=[{id:"naukowiec",icon:"mdi:flask-outline",subjects:["Matematyka","Fizyka","Chemia","Informatyka","Biologia","Geografia"],avgChipKey:"hero.chip.avg_naukowiec"},{id:"humanista",icon:"mdi:book-open-page-variant-outline",subjects:["Język polski","Historia","Wiedza o społeczeństwie","Filozofia"],avgChipKey:"hero.chip.avg_humanista"},{id:"poliglota",icon:"mdi:translate",subjects:["Język angielski","Język niemiecki","Język francuski","Język hiszpański","Język rosyjski","Język włoski"],avgChipKey:"hero.chip.avg_poliglota"},{id:"artysta",icon:"mdi:palette-outline",subjects:["Plastyka","Muzyka"],avgChipKey:"hero.chip.avg_artysta"},{id:"sportowiec",icon:"mdi:run",subjects:["Wychowanie fizyczne"],avgChipKey:"hero.chip.avg_sportowiec"}],Zi={wojownik:"mdi:shield-check-outline",meteor:"mdi:meteor",feniks:"mdi:fire",spolecznik:"mdi:hand-heart-outline",kolekcjoner:"mdi:trophy-outline",prymus:"mdi:crown-outline",wszechstronny:"mdi:scale-balance"};function Yi(e,t){return{icon:t,nameKey:{archetype:`hero.${e}.archetype_name`,hero:`hero.${e}.hero_name`},descKey:{archetype:`hero.${e}.archetype_desc`,hero:`hero.${e}.hero_desc`}}}const Vi={};for(const e of Ji)Vi[e.id]=Yi(e.id,e.icon);for(const[e,t]of Object.entries(Zi))Vi[e]=Yi(e,t);function Xi(e){return e.toFixed(1)}function Qi(e,t){let a=0,i=0;for(const s of e)!t.includes(s.subject)||null===s.average||s.gradeCount<=0||(a+=s.average*s.gradeCount,i+=s.gradeCount);return i>0?{avg:a/i,count:i}:null}const es="librus-hero-history:";function ts(e){try{const t=window.localStorage.getItem(`librus-achievements:${e}`);if(!t)return 0;const a=JSON.parse(t);return Array.isArray(a)?a.length:0}catch{return 0}}let as=class extends Ve{static getConfigElement(){return Ue()}static getStubConfig(){return{type:"custom:librus-hero-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 2}updated(e){super.updated(e),this._pendingHistory&&function(e,t){try{const a=`${es}${e}`,i=window.localStorage.getItem(a),s=i?JSON.parse(i):[],r=s[s.length-1];if(r&&r.id===t)return;s.push({id:t,when:(new Date).toISOString()}),window.localStorage.setItem(a,JSON.stringify(s.slice(-30)))}catch{}}(this._pendingHistory.deviceId,this._pendingHistory.resultId)}render(){if(!this._config||!this.hass)return G;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{deviceId:t,map:a}=e,i=this.hass,s="hero"===this._config.mode?"hero":"archetype",r=this._resolveAllByTranslationKey(t,"subject_average").map(e=>{const t=i.states[e.entityId],a=t?.attributes.grades??[];return{subject:e.subject,average:t?Je(t.state):null,gradeCount:a.length}}),o=a.overall_average?i.states[a.overall_average]:void 0,n=a.attendance?i.states[a.attendance]:void 0,c=a.attendance_streak?i.states[a.attendance_streak]:void 0,d=a.good_grade_streak?i.states[a.good_grade_streak]:void 0,l=a.behaviour_grade?i.states[a.behaviour_grade]:void 0,h=a.behaviour_notices?i.states[a.behaviour_notices]:void 0,u=h?.attributes.recent??[],p=function(e){const t=e.subjects.filter(e=>e.gradeCount>0);if(!(t.length>0||null!==e.attendanceStreak||null!==e.behaviourShortName))return null;if(null!==e.overallAverage&&e.overallAverage>=5.3&&t.length>=4)return{...Vi.prymus,id:"prymus",evidence:[{key:"hero.chip.overall_avg_full",vars:{n:Xi(e.overallAverage)}},{key:"hero.chip.subjects_count",vars:{n:t.length}}]};if(e.achievementCount>=5)return{...Vi.kolekcjoner,id:"kolekcjoner",evidence:[{key:"hero.chip.badges",vars:{n:e.achievementCount}},{key:"hero.chip.various_categories"}]};if(null!==e.overallSemester1&&null!==e.overallSemester2&&e.overallSemester2-e.overallSemester1>=.5)return{...Vi.feniks,id:"feniks",evidence:[{key:"hero.chip.semester1",vars:{n:Xi(e.overallSemester1)}},{key:"hero.chip.semester2",vars:{n:Xi(e.overallSemester2)}}]};if(null!==e.attendanceStreak&&e.attendanceStreak>=30&&0===e.unexcusedCount)return{...Vi.wojownik,id:"wojownik",evidence:[{key:"hero.chip.streak_days",vars:{n:e.attendanceStreak}},{key:"hero.chip.unexcused",vars:{n:0}}]};if(null!==e.goodGradeStreak&&e.goodGradeStreak>=10)return{...Vi.meteor,id:"meteor",evidence:[{key:"hero.chip.good_streak",vars:{n:e.goodGradeStreak}},null!==e.overallAverage?{key:"hero.chip.overall_avg",vars:{n:Xi(e.overallAverage)}}:{key:"hero.chip.various_categories"}]};const a=e.recentNoteSentiments.filter(e=>"positive"===e).length,i=e.recentNoteSentiments.filter(e=>"negative"===e).length;if("wz"===e.behaviourShortName&&a>=2&&0===i)return{...Vi.spolecznik,id:"spolecznik",evidence:[{key:"hero.chip.behaviour",vars:{name:e.behaviourShortName}},{key:"hero.chip.positive_notes",vars:{n:a}}]};const s=Ji.map(t=>({cluster:t,result:Qi(e.subjects,t.subjects)})).filter(e=>null!==e.result);if(s.length>0){s.sort((e,t)=>t.result.avg-e.result.avg);const e=s[0],t=s[1],a=t?e.result.avg-t.result.avg:e.result.avg;if(e.result.count>=2&&a>=.4)return{...Vi[e.cluster.id],id:e.cluster.id,evidence:[{key:e.cluster.avgChipKey,vars:{n:Xi(e.result.avg)}},{key:"hero.chip.grades",vars:{n:e.result.count}}]}}const r=s.length>=2?s[0].result.avg-s[s.length-1].result.avg:0;return{...Vi.wszechstronny,id:"wszechstronny",evidence:[{key:"hero.chip.spread",vars:{n:Xi(r)}},{key:"hero.chip.subjects_count",vars:{n:t.length}}]}}({subjects:r,overallAverage:Je(o?.state),overallSemester1:Je(o?.attributes.average_semester_1),overallSemester2:Je(o?.attributes.average_semester_2),attendanceStreak:Je(c?.state),unexcusedCount:Je(n?.attributes.unexcused_count),goodGradeStreak:Je(d?.state),behaviourShortName:l&&!["unknown","unavailable"].includes(l.state)?l.state:null,recentNoteSentiments:u.map(e=>e.sentiment),achievementCount:ts(t)});return p?(this._pendingHistory={deviceId:t,resultId:p.id},W`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:creation-outline"></ha-icon></div>
          <div class="title-block">
            <div class="title">
              ${this._config.title??je(i,"hero"===s?"card.hero.title_hero":"card.hero.title_archetype")}
            </div>
            <div class="subtitle">${je(i,"card.hero.subtitle")}</div>
          </div>
        </div>
        <div class="result">
          <div class="result-badge"><ha-icon icon=${p.icon}></ha-icon></div>
          <div class="result-name">${je(i,p.nameKey[s])}</div>
          <div class="result-desc">${je(i,p.descKey[s])}</div>
        </div>
        <div class="evidence">
          ${p.evidence.map(e=>W`<span class="evidence-chip">${je(i,e.key,e.vars)}</span>`)}
        </div>
      </ha-card>
    `):(this._pendingHistory=void 0,this._message("mdi:creation-outline",je(i,"card.hero.empty")))}};as.styles=[Qe,et,o`
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
    `],e([me()],as.prototype,"_config",void 0),as=e([he("librus-hero-card")],as);const is={wz:10,bdb:8,db:6,popr:4,ndp:2,ng:0},ss={diamond:10,gold:7.5,silver:5,bronze:2.5};function rs(e,t){const a=Ji.find(e=>e.id===t);if(!a)return 0;const i=Qi(e,a.subjects);return i?Math.round(10*(i.avg/6*10+Number.EPSILON))/10:0}const os=10,ns=["1","2","3","4","5","7"],cs=260,ds=240;let ls=class extends Ve{static getConfigElement(){return Ue()}static getStubConfig(){return{type:"custom:librus-hero-stats-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 3}_renderStatRadar(e,t){const a=Math.min(cs,ds)/2-34,i=e.length,s=e=>-Math.PI/2+2*e*Math.PI/i,r=(e,t)=>{const i=Math.max(0,Math.min(os,t))/os*a;return[130+i*Math.cos(s(e)),116+i*Math.sin(s(e))]},o=[1/3,2/3,1].map(t=>e.map((e,a)=>r(a,os*t).join(",")).join(" ")),n=e.map((e,t)=>r(t,os)),c=e.map((e,t)=>r(t,e.value).join(",")).join(" "),d=e.map((e,t)=>r(t,Math.max(e.value,1.5)));return W`
      <svg width=${cs} height=${ds} viewBox="0 0 ${cs} ${ds}" class="radar-chart">
        ${o.map(e=>H`<polygon points=${e} class="radar-grid"></polygon>`)}
        ${n.map(([e,t])=>H`<line x1=${130} y1=${116} x2=${e} y2=${t} class="radar-axis"></line>`)}
        <polygon points=${c} class="radar-fill-polygon"></polygon>
        ${d.map(([t,a],i)=>{const s=`var(--lc-chart-${ns[i%ns.length]})`;return H`
            <circle cx=${t} cy=${a} r="11" class="vertex-badge" style="stroke:${s}"></circle>
            <foreignObject x=${t-9} y=${a-9} width="18" height="18">
              ${W`<div class="vertex-icon" style="color:${s}"><ha-icon icon=${e[i].icon}></ha-icon></div>`}
            </foreignObject>
          `})}
        ${e.map((e,a)=>{const[i,o]=r(a,1.14*os),n=Math.cos(s(a)),c=Math.abs(n)<.3?"middle":n>0?"start":"end";return H`<text x=${i} y=${o+3} text-anchor=${c} class="radar-label">${je(t,e.labelKey)}</text>`})}
      </svg>
    `}render(){if(!this._config||!this.hass)return G;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{deviceId:t,map:a}=e,i=this.hass,s=this._resolveAllByTranslationKey(t,"subject_average").map(e=>{const t=i.states[e.entityId],a=(t?.attributes.grades??[]).length;return{subject:e.subject,average:t?Je(t.state):null,gradeCount:a}}),r=a.attendance_streak?i.states[a.attendance_streak]:void 0,o=a.behaviour_grade?i.states[a.behaviour_grade]:void 0,n=a.rank?i.states[a.rank]:void 0,c=function(e){const t=null!==e.attendanceStreak?Math.round(100*Math.min(1,e.attendanceStreak/30))/10:0,a=e.behaviourShortName?is[e.behaviourShortName]??5:0,i=e.rankTier?ss[e.rankTier]??0:0;return[{id:"sila",labelKey:"hero_stat.sila",icon:"mdi:arm-flex-outline",value:rs(e.subjects,"sportowiec")},{id:"intelekt",labelKey:"hero_stat.intelekt",icon:"mdi:flask-outline",value:rs(e.subjects,"naukowiec")},{id:"wiedza",labelKey:"hero_stat.wiedza",icon:"mdi:book-open-page-variant-outline",value:rs(e.subjects,"humanista")},{id:"charyzma",labelKey:"hero_stat.charyzma",icon:"mdi:hand-heart-outline",value:a},{id:"wytrwalosc",labelKey:"hero_stat.wytrwalosc",icon:"mdi:shield-check-outline",value:t},{id:"szczescie",labelKey:"hero_stat.szczescie",icon:"mdi:clover-outline",value:i}]}({subjects:s,attendanceStreak:Je(r?.state),behaviourShortName:o&&!["unknown","unavailable"].includes(o.state)?o.state:null,rankTier:n&&!["unknown","unavailable"].includes(n.state)?n.state:null});if(c.every(e=>0===e.value))return this._message("mdi:arm-flex-outline",je(i,"card.hero_stats.empty"));const d=Math.round(c.reduce((e,t)=>e+t.value,0));return W`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:arm-flex-outline"></ha-icon></div>
          <div class="title-block">
            <div class="title">${this._config.title??je(i,"card.hero_stats.title")}</div>
            <div class="subtitle">${je(i,"card.hero_stats.subtitle")}</div>
          </div>
          <div class="power-badge">
            <div class="power-n">${d}</div>
            <div class="power-l">${je(i,"card.hero_stats.power")}</div>
          </div>
        </div>
        <div class="chart-wrap glow">${this._renderStatRadar(c,i)}</div>
        <div class="stat-bars">
          ${c.map((e,t)=>{const a=`var(--lc-chart-${ns[t%ns.length]})`;return W`
              <div class="stat-row">
                <div class="stat-icon" style="background:color-mix(in srgb, ${a} 16%, transparent); color:${a}">
                  <ha-icon icon=${e.icon}></ha-icon>
                </div>
                <div class="stat-mid">
                  <span class="stat-name">${je(i,e.labelKey)}</span>
                  <div class="stat-track">
                    <div class="stat-fill" style="width:${e.value/os*100}%; background:${a}"></div>
                  </div>
                </div>
                <span class="stat-value" style="color:${a}">${e.value.toFixed(1)}</span>
              </div>
            `})}
        </div>
      </ha-card>
    `}};ls.styles=[Qe,et,o`
      .header {
        align-items: center;
      }
      .power-badge {
        margin-left: auto;
        flex: none;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 50px;
        height: 50px;
        border-radius: 12px;
        background: linear-gradient(155deg, var(--lc-brand-bg), transparent);
        border: 1px solid var(--lc-brand);
      }
      .power-n {
        font-size: 1rem;
        font-weight: 800;
        color: var(--lc-brand);
        line-height: 1;
        font-variant-numeric: tabular-nums;
      }
      .power-l {
        font-size: 0.5rem;
        font-weight: 700;
        letter-spacing: 0.04em;
        text-transform: uppercase;
        color: var(--lc-brand-strong);
        margin-top: 2px;
      }
      .chart-wrap {
        display: flex;
        justify-content: center;
      }
      .radar-fill-polygon {
        fill: var(--lc-brand);
        fill-opacity: 0.24;
        stroke: var(--lc-brand);
        stroke-width: 2.5;
        stroke-linejoin: round;
      }
      .vertex-badge {
        fill: var(--ha-card-background, var(--card-background-color, #fff));
        stroke-width: 1.5;
      }
      .vertex-icon {
        width: 18px;
        height: 18px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .vertex-icon ha-icon {
        --mdc-icon-size: 12px;
      }
      .chart-wrap.glow svg {
        filter: drop-shadow(0 0 7px color-mix(in srgb, var(--lc-brand) 45%, transparent));
      }
      .stat-bars {
        display: flex;
        flex-direction: column;
        gap: 11px;
        margin-top: 4px;
      }
      .stat-row {
        display: grid;
        grid-template-columns: 28px 1fr auto;
        align-items: center;
        gap: 10px;
      }
      .stat-icon {
        width: 28px;
        height: 28px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex: none;
      }
      .stat-icon ha-icon {
        --mdc-icon-size: 15px;
      }
      .stat-mid {
        min-width: 0;
      }
      .stat-name {
        display: block;
        font-size: 0.74rem;
        font-weight: 700;
        color: var(--primary-text-color);
        margin-bottom: 3px;
      }
      .stat-track {
        height: 6px;
        border-radius: 4px;
        background: var(--lc-ring-track);
        overflow: hidden;
      }
      .stat-fill {
        height: 100%;
        border-radius: 4px;
      }
      .stat-value {
        font-size: 0.78rem;
        font-weight: 800;
        font-variant-numeric: tabular-nums;
      }
    `],e([me()],ls.prototype,"_config",void 0),ls=e([he("librus-hero-stats-card")],ls);let hs=class extends Ve{static getConfigElement(){return Ue()}static getStubConfig(){return{type:"custom:librus-hero-history-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 3}render(){if(!this._config||!this.hass)return G;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{deviceId:t}=e,a=this.hass,i="hero"===this._config.mode?"hero":"archetype",s=function(e){try{const t=window.localStorage.getItem(`${es}${e}`);if(!t)return[];const a=JSON.parse(t);return Array.isArray(a)?a:[]}catch{return[]}}(t);if(0===s.length)return this._message("mdi:history",je(a,"card.hero_history.empty"));const r=new Date,o=[...s].reverse().map((e,t)=>{const a=Vi[e.id],i=new Date(e.when),o=0===t?r:new Date(s[s.length-t].when);return{entry:e,catalog:a,isCurrent:0===t,days:Math.max(0,qe(i,o))}});return W`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:history"></ha-icon></div>
          <div class="title-block">
            <div class="title">${this._config.title??je(a,"card.hero_history.title")}</div>
            <div class="subtitle">${je(a,"card.hero_history.subtitle")}</div>
          </div>
        </div>
        <div class="scroll-list">
          ${ua(o,{max_items:this._config.max_items}).map(e=>W`
              <div class="list-item">
                <div class="type-icon"><ha-icon icon=${e.catalog?.icon??"mdi:help-circle"}></ha-icon></div>
                <div class="body">
                  <div class="row1">
                    <span>${e.catalog?je(a,e.catalog.nameKey[i]):e.entry.id}</span>
                    <time>${He(e.entry.when,a.language)}</time>
                  </div>
                  <div class="item-text">
                    ${e.isCurrent?je(a,"card.hero_history.current",{n:e.days}):`${e.days} ${je(a,"label.days")}`}
                  </div>
                </div>
              </div>
            `)}
        </div>
      </ha-card>
    `}};hs.styles=[Qe,et,o`
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
    `],e([me()],hs.prototype,"_config",void 0),hs=e([he("librus-hero-history-card")],hs);const us=["overall_average","attendance","school"];let ps=class extends Ve{static getConfigElement(){return Ue()}static getStubConfig(){return{type:"custom:librus-last-update-tile-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 1}connectedCallback(){super.connectedCallback(),this._tickTimer=setInterval(()=>this.requestUpdate(),3e4)}disconnectedCallback(){super.disconnectedCallback(),clearInterval(this._tickTimer)}render(){if(!this._config||!this.hass)return G;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{map:t}=e,a=this.hass;let i;const s=t.last_update?a.states[t.last_update]:void 0;if(s&&!["unknown","unavailable"].includes(s.state))i=s.state;else{const e=us.map(e=>t[e]).find(e=>e&&a.states[e]),s=e?a.states[e]:void 0;if(!s)return this._message("mdi:clock-check-outline",je(a,"empty.generic_error"));i=s.last_reported??s.last_updated}const r=t.status?a.states[t.status]:void 0,o="stale"===r?.state||"error"===r?.state,n=r?.attributes.next_attempt,c=o?je(a,"card.last_update.not_responding",{time:"string"==typeof n?Xe(n,a.language):"?"}):je(a,"card.last_update.subtitle");return W`
      <ha-card class="tile ${o?"stale":""}">
        <div class="icon-badge"><ha-icon icon="mdi:clock-check-outline"></ha-icon></div>
        <div class="tile-body">
          <div class="subj">${function(e,t){if(!t)return"";const a=new Date(t).getTime();if(Number.isNaN(a))return"";const i=Math.max(0,Math.floor((Date.now()-a)/6e4));if(i<1)return je(e,"label.just_now");if(i<60)return je(e,"label.minutes_ago",{minutes:i});const s=Math.floor(i/60);return s<24?je(e,"label.hours_ago",{hours:s}):je(e,"label.days_ago",{days:Math.floor(s/24)})}(a,i)}</div>
          <div class="meta">${c}</div>
        </div>
      </ha-card>
    `}};ps.styles=[Qe,et,o`
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
      ha-card.stale .icon-badge {
        background: var(--lc-warn-bg);
        color: var(--lc-warn);
      }
      ha-card.stale .subj {
        color: var(--lc-warn);
      }
      .meta {
        font-size: 0.7rem;
        color: var(--secondary-text-color);
        margin-top: 1px;
      }
    `],e([me()],ps.prototype,"_config",void 0),ps=e([he("librus-last-update-tile-card")],ps);const gs=["grades","attendance","behaviour","next_week","school_news"],ms={good:"good",ok:"ok",caution:"caution"};let vs=class extends Ve{constructor(){super(...arguments),this._pressing=!1}static getConfigElement(){return Ue()}static getStubConfig(){return{type:"custom:librus-ai-summary-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return this._config?.summary_only?4:8}render(){if(!this._config||!this.hass)return G;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const t=this.hass,a=e.map.weekly_summary,i=e.map.weekly_summary_generate,s=a?t.states[a]:void 0;if(!s)return this._message("mdi:creation-outline",je(t,"card.ai_summary.setup"),je(t,"card.ai_summary.setup_hint"));const r=s.attributes,o=Boolean(r.generating)||this._pressing,n=be.has(s.state)?void 0:s.state;if(!n)return W`
        <ha-card class="static">
          <div class="empty">
            <ha-icon icon="mdi:creation-outline"></ha-icon>
            <div class="t1">${je(t,o?"card.ai_summary.generating":"card.ai_summary.waiting")}</div>
            <div class="t2">${r.error?String(r.error):this._nextRun(r)}</div>
          </div>
          ${this._footer(r,i,o,!1)}
        </ha-card>
      `;const c="string"==typeof r.status?r.status:void 0,d=r.sections??{},l=gs.filter(e=>d[e]?.text),h=Array.isArray(r.advice)?r.advice:[],u="string"==typeof r.warning&&r.warning?r.warning:void 0,p="string"==typeof r.summary&&r.summary?r.summary:void 0,g=this._tab&&l.includes(this._tab)?this._tab:l[0],m=!0===this._config.summary_only;return W`
      <ha-card class="static">
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:creation"></ha-icon></div>
          <div class="title-block">
            <div class="title">${this._config.title||je(t,"card.ai_summary.title")}</div>
            <div class="subtitle">${this._subtitle(r)}</div>
          </div>
          ${c&&ms[c]?W`<span class="pill ${ms[c]}">${je(t,`ai_summary.status.${c}`)}</span>`:G}
        </div>
        <div class="headline">${n}</div>
        ${u?W`<div class="warning"><ha-icon icon="mdi:alert"></ha-icon><div>${u}</div></div>`:G}
        ${m?G:l.length&&g?W`${this._tabs(d,l,g)} ${this._panel(g,d[g])}`:p?W`<div class="prose">${this._paragraphs(p)}</div>`:G}
        ${h.length?W`
              <div class="advice">
                <div class="label">${je(t,"card.ai_summary.advice")}</div>
                <ol>
                  ${h.map(e=>W`<li>${e}</li>`)}
                </ol>
              </div>
            `:G}
        ${this._footer(r,i,o,!0)}
      </ha-card>
    `}_subtitle(e){const t=this.hass,a=[],i=new Intl.DateTimeFormat(t.language,{day:"numeric",month:"numeric"}),s="string"==typeof e.week_from?new Date(`${e.week_from}T12:00:00`):void 0,r="string"==typeof e.week_to?new Date(`${e.week_to}T12:00:00`):void 0;return s&&r&&!Number.isNaN(s.getTime())&&!Number.isNaN(r.getTime())&&a.push(`${i.format(s)} – ${i.format(r)}`),"student"!==e.audience&&"parent"!==e.audience||a.push(je(t,`card.ai_summary.for_${e.audience}`)),a.join(" · ")}_nextRun(e){const t=this.hass;if(e.paused)return je(t,"card.ai_summary.paused");const a="string"==typeof e.next_run?new Date(e.next_run):void 0;if(!a||Number.isNaN(a.getTime()))return"";return je(t,"card.ai_summary.next_run",{when:new Intl.DateTimeFormat(t.language,{weekday:"short",day:"numeric",month:"numeric",hour:"2-digit",minute:"2-digit"}).format(a)})}_footer(e,t,a,i){const s=this.hass,r=t&&!0!==this._config?.hide_generate,o=this._pressError??(i&&e.error?String(e.error):void 0);return W`
      <div class="foot">
        <div class="foot-text">
          ${i?W`<span>${this._nextRun(e)}</span><span>${je(s,"card.ai_summary.disclaimer")}</span>`:G}
          ${o?W`<span class="err">${o}</span>`:G}
        </div>
        ${r?W`<button class="gen" type="button" ?disabled=${a} @click=${()=>this._generate(t)}>
              <ha-icon icon=${a?"mdi:timer-sand":"mdi:refresh"}></ha-icon>
              ${je(s,a?"card.ai_summary.generating":"card.ai_summary.generate")}
            </button>`:G}
      </div>
    `}async _generate(e){if(this.hass&&!this._pressing){this._pressing=!0,this._pressError=void 0;try{await this.hass.callService("button","press",{entity_id:e})}catch(e){this._pressError=e instanceof Error?e.message:String(e?.message??e)}finally{this._pressing=!1}}}_tabs(e,t,a){const i=this.hass;return W`
      <div class="tabs" role="tablist">
        ${t.map(t=>{const s=ms[e[t]?.status??""]??"none";return W`
            <button
              class="tab"
              type="button"
              role="tab"
              aria-selected=${t===a?"true":"false"}
              @click=${()=>this._tab=t}
            >
              <span class="sdot ${s}"></span>${je(i,`ai_summary.section.${t}`)}
            </button>
          `})}
      </div>
    `}_panel(e,t){const a=this.hass,i=t.status?ms[t.status]:void 0;return W`
      <div class="panel" role="tabpanel">
        <div class="panel-head">
          <span>${je(a,`ai_summary.section.${e}`)}</span>
          ${i?W`<span class="pill small ${i}">${je(a,`ai_summary.status.${t.status}`)}</span>`:G}
        </div>
        <div class="prose">${this._paragraphs(t.text??"")}</div>
      </div>
    `}_paragraphs(e){return e.split(/\n\s*\n/).map(e=>e.trim()).filter(Boolean).map(e=>W`<p>${e}</p>`)}};vs.styles=[Qe,et,o`
      .pill {
        font-size: 0.72rem;
        font-weight: 700;
        padding: 3px 9px;
        border-radius: 999px;
        white-space: nowrap;
      }
      .pill.small {
        font-size: 0.68rem;
        padding: 2px 8px;
      }
      .pill.good {
        color: var(--lc-good);
        background: var(--lc-good-bg);
      }
      .pill.ok {
        color: var(--lc-brand);
        background: var(--lc-brand-bg);
      }
      .pill.caution {
        color: var(--lc-warn);
        background: var(--lc-warn-bg);
      }
      .headline {
        font-size: 1.02rem;
        font-weight: 600;
        line-height: 1.35;
        text-wrap: pretty;
      }
      .warning {
        display: flex;
        gap: 8px;
        align-items: flex-start;
        background: var(--lc-warn-bg);
        border-radius: 9px;
        padding: 9px 11px;
        font-size: 0.82rem;
        line-height: 1.4;
      }
      .warning ha-icon {
        color: var(--lc-warn);
        --mdc-icon-size: 18px;
        flex: none;
      }
      .tabs {
        display: flex;
        gap: 6px;
        overflow-x: auto;
        scrollbar-width: none;
      }
      .tabs::-webkit-scrollbar {
        display: none;
      }
      .tab {
        font: inherit;
        font-size: 0.78rem;
        display: inline-flex;
        align-items: center;
        gap: 6px;
        white-space: nowrap;
        border: 1px solid var(--divider-color);
        background: none;
        color: var(--secondary-text-color);
        border-radius: 999px;
        padding: 5px 10px;
        cursor: pointer;
      }
      .tab[aria-selected="true"] {
        background: var(--lc-brand-bg);
        border-color: transparent;
        color: var(--lc-brand);
        font-weight: 600;
      }
      .tab:focus-visible,
      .gen:focus-visible {
        outline: 2px solid var(--lc-brand);
        outline-offset: 2px;
      }
      .sdot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        flex: none;
        background: var(--lc-neutral-dot);
      }
      .sdot.good {
        background: var(--lc-good);
      }
      .sdot.ok {
        background: var(--lc-brand);
      }
      .sdot.caution {
        background: var(--lc-warn);
      }
      .panel {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .panel-head {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 0.8rem;
        font-weight: 700;
      }
      .prose {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .prose p {
        margin: 0;
        font-size: 0.86rem;
        line-height: 1.55;
        text-wrap: pretty;
      }
      .advice {
        background: var(--lc-chip-bg);
        border-radius: 10px;
        padding: 10px 12px;
      }
      .advice .label {
        font-size: 0.7rem;
        letter-spacing: 0.06em;
        text-transform: uppercase;
        color: var(--secondary-text-color);
        font-weight: 700;
        margin-bottom: 6px;
      }
      .advice ol {
        margin: 0;
        padding-left: 18px;
        font-size: 0.84rem;
        line-height: 1.45;
        display: flex;
        flex-direction: column;
        gap: 3px;
      }
      .foot {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 10px;
        flex-wrap: wrap;
        font-size: 0.7rem;
        color: var(--secondary-text-color);
        border-top: 1px dashed var(--divider-color);
        padding-top: 10px;
      }
      .foot-text {
        display: flex;
        flex-direction: column;
        gap: 2px;
        min-width: 0;
      }
      .foot-text span:empty {
        display: none;
      }
      .err {
        color: var(--lc-bad);
      }
      .gen {
        font: inherit;
        font-size: 0.74rem;
        font-weight: 600;
        display: inline-flex;
        align-items: center;
        gap: 5px;
        border: 0;
        background: var(--lc-brand-bg);
        color: var(--lc-brand);
        padding: 5px 10px;
        border-radius: 8px;
        cursor: pointer;
      }
      .gen[disabled] {
        opacity: 0.7;
        cursor: progress;
      }
      .gen ha-icon {
        --mdc-icon-size: 14px;
      }
      :host(.compact) .foot-text {
        display: none;
      }
    `],e([me()],vs.prototype,"_config",void 0),e([me()],vs.prototype,"_tab",void 0),e([me()],vs.prototype,"_pressing",void 0),e([me()],vs.prototype,"_pressError",void 0),vs=e([he("librus-ai-summary-card")],vs),window.customCards=window.customCards||[],window.customCards.push({type:"librus-grades-card",name:"Librus - Średnia ocen",description:"Średnia ogólna i średnie z każdego przedmiotu, z paskami porównawczymi.",preview:!0},{type:"librus-lesson-topics-card",name:"Librus - Co było na lekcji",description:"Tematy lekcji z ostatnich dni szkolnych, dzień po dniu; lekcje z nieobecnością wyróżnione.",preview:!0},{type:"librus-school-trips-card",name:"Librus - Wycieczki",description:"Najbliższa wycieczka szkolna: data, transport, trasa i opiekun, plus kolejne wycieczki.",preview:!0},{type:"librus-exam-prep-card",name:"Librus - Do sprawdzianu",description:"Sprawdziany z najbliższych dni z tematami do powtórki od poprzedniego sprawdzianu; opuszczone lekcje wyróżnione.",preview:!0},{type:"librus-school-documents-card",name:"Librus - Dokumenty szkoły",description:"Formularze i regulaminy udostępnione przez szkołę, z linkiem do otwarcia w Synergii.",preview:!0},{type:"librus-justifications-card",name:"Librus - Usprawiedliwienia",description:"Dni do usprawiedliwienia i wysłane usprawiedliwienia z decyzją szkoły.",preview:!0},{type:"librus-month-calendar-card",name:"Librus - Kalendarz miesiąca",description:"Miesiąc w siatce: sprawdziany, kartkówki, wycieczki, zebrania, terminy zadań i dni wolne.",preview:!0},{type:"librus-catch-up-card",name:"Librus - Do nadrobienia",description:"Po ostatniej nieobecności: tematy opuszczonych lekcji i zadania, według przedmiotów, do odhaczenia.",preview:!0},{type:"librus-grade-log-card",name:"Librus - Dziennik ocen",description:"Wszystkie oceny ze wszystkich przedmiotów w jednej chronologicznej liście.",preview:!0},{type:"librus-subject-grades-card",name:"Librus - Oceny z przedmiotu",description:"Pełna lista ocen z JEDNEGO wybranego przedmiotu (wybór w konfiguracji karty).",preview:!0},{type:"librus-grade-trend-card",name:"Librus - Trend średniej",description:"Jak zmieniała się średnia (ogólna lub przedmiotu) w ostatnich 60 dniach.",preview:!0},{type:"librus-grade-goal-card",name:"Librus - Cel oceny",description:"Postęp do wybranej docelowej średniej (ogólnej lub z przedmiotu) + ile ocen brakuje.",preview:!0},{type:"librus-grade-simulator-card",name:"Librus - Symulator ocen",description:"A gdyby następna ocena to __ (waga __)? Zobacz, gdzie wylądowałaby średnia z przedmiotu.",preview:!0},{type:"librus-semester-comparison-card",name:"Librus - Porównanie semestrów",description:"Średnia z semestru 1 i 2 dla każdego przedmiotu obok siebie, ze zmianą.",preview:!0},{type:"librus-grade-distribution-card",name:"Librus - Rozkład ocen",description:"Histogram: ile było szóstek, piątek, czwórek itd. ze wszystkich przedmiotów.",preview:!0},{type:"librus-grades-radar-card",name:"Librus - Profil ocen (radar)",description:"Wykres pajęczynowy średnich wszystkich przedmiotów na jednym wykresie.",preview:!0},{type:"librus-grade-category-distribution-card",name:"Librus - Oceny wg kategorii",description:"Poziomy wykres słupkowy: ile ocen ze sprawdzianów, kartkówek, odpowiedzi itd.",preview:!0},{type:"librus-latest-grade-card",name:"Librus - Ostatnia ocena",description:"Najnowsza ocena ze wszystkich przedmiotów, wraz z komentarzem nauczyciela.",preview:!0},{type:"librus-behaviour-grade-card",name:"Librus - Ocena zachowania",description:"Formalna ocena zachowania, odrębna od uwag.",preview:!0},{type:"librus-descriptive-grades-card",name:"Librus - Oceny opisowe",description:"Oceny opisowe (nienumeryczne), jeśli szkoła je stosuje.",preview:!0},{type:"librus-subject-spotlight-card",name:"Librus - Najlepszy i najsłabszy przedmiot",description:"Dwa skrajne przedmioty wg średniej, obliczone z sensorów średnich per przedmiot.",preview:!0},{type:"librus-attendance-card",name:"Librus - Frekwencja",description:"Liczba realnych nieobecności i spóźnień, z rozbiciem na typy, % i podziałem na semestr.",preview:!0},{type:"librus-attendance-tile-card",name:"Librus - Frekwencja (kafelek)",description:"Kompaktowy kafelek z liczbą nieobecności i frekwencją %.",preview:!0},{type:"librus-attendance-heatmap-card",name:"Librus - Frekwencja (mapa roku)",description:"Mapa dni całego roku szkolnego kolorowana wg statusu frekwencji, w stylu GitHub contributions.",preview:!0},{type:"librus-attendance-weekday-card",name:"Librus - Nieobecności wg dnia tygodnia",description:"Słupek na każdy dzień tygodnia podzielony na usprawiedliwione/nieusprawiedliwione/spóźnienia.",preview:!0},{type:"librus-attendance-subject-card",name:"Librus - Nieobecności wg przedmiotu",description:"Ranking przedmiotów wg liczby nieobecności, podzielony na usprawiedliwione/nieusprawiedliwione.",preview:!0},{type:"librus-school-day-card",name:"Librus - Dzień szkolny",description:"Lekcje dzisiaj (albo w następny dzień szkolny) jako pasek: bieżąca podświetlona, odwołane przekreślone, pod spodem co teraz i ile zostało.",preview:!0},{type:"librus-report-card-card",name:"Librus - Świadectwo (prognoza)",description:"Przewidywane oceny na świadectwo ze średnich: kafelki przedmiotów, średnia świadectwa, droga do paska i co jedna ocena może zmienić.",preview:!0},{type:"librus-subject-attendance-card",name:"Librus - Frekwencja z przedmiotów",description:"Kafelki z procentem obecności na każdym przedmiocie, kolorem widać, gdzie jest problem.",preview:!0},{type:"librus-behaviour-notices-card",name:"Librus - Uwagi",description:"Lista uwag z kategorią i zabarwieniem (pozytywna/negatywna/neutralna).",preview:!0},{type:"librus-behaviour-notices-tile-card",name:"Librus - Uwagi (kafelek)",description:"Kompaktowy kafelek z liczbą uwag i ostatnią kategorią.",preview:!0},{type:"librus-messages-card",name:"Librus - Wiadomości",description:"Nieprzeczytane wiadomości ze wszystkich skrzynek i podgląd ostatnich z odebranych.",preview:!0},{type:"librus-messages-tile-card",name:"Librus - Wiadomości (kafelek)",description:"Kompaktowy kafelek z liczbą nieprzeczytanych i ostatnim nadawcą.",preview:!0},{type:"librus-substitutions-card",name:"Librus - Zastępstwa i alerty",description:"Pełna treść zastępstw i alertów - kliknij, by rozwinąć.",preview:!0},{type:"librus-announcements-card",name:"Librus - Ogłoszenia",description:"Nieprzeczytane ogłoszenia z tablicy szkolnej.",preview:!0},{type:"librus-announcements-tile-card",name:"Librus - Ogłoszenia (kafelek)",description:"Kompaktowy kafelek z liczbą nieprzeczytanych ogłoszeń.",preview:!0},{type:"librus-homework-assignments-card",name:"Librus - Zadania domowe",description:"Lista realnych zadań domowych z terminami.",preview:!0},{type:"librus-homework-checklist-card",name:"Librus - Zadania do odhaczenia",description:"Zadania domowe z polem wyboru - odhaczone lądują na dole (stan zapisany lokalnie w przeglądarce).",preview:!0},{type:"librus-recent-activity-card",name:"Librus - Co nowego",description:"Wspólny, chronologiczny feed najnowszych ocen, uwag, ogłoszeń i wiadomości.",preview:!0},{type:"librus-today-lessons-card",name:"Librus - Dzisiejszy plan lekcji",description:"Oś czasu dzisiejszych lekcji z podświetleniem aktualnej.",preview:!0},{type:"librus-next-lesson-tile-card",name:"Librus - Najbliższa lekcja",description:"Kompaktowy kafelek z najbliższą lub trwającą lekcją.",preview:!0},{type:"librus-agenda-card",name:"Librus - Terminarz",description:"Nadchodzące wydarzenia z terminarza, pogrupowane wg dnia.",preview:!0},{type:"librus-exam-countdown-card",name:"Librus - Najbliższy sprawdzian",description:"Odliczanie do najbliższego sprawdzianu z terminarza, wyodrębnione z ogólnej listy.",preview:!0},{type:"librus-free-days-card",name:"Librus - Dni wolne",description:"Odliczanie do najbliższej przerwy i lista kolejnych dni wolnych.",preview:!0},{type:"librus-free-days-tile-card",name:"Librus - Dni wolne (kafelek)",description:"Kompaktowy kafelek z odliczaniem do najbliższej przerwy.",preview:!0},{type:"librus-week-timetable-card",name:"Librus - Plan tygodniowy",description:"Siatka planu lekcji na cały tydzień.",preview:!0},{type:"librus-bell-schedule-card",name:"Librus - Plan dnia",description:"Rozkład dzwonków na dziś z podświetleniem bieżącej lekcji.",preview:!0},{type:"librus-subject-time-card",name:"Librus - Podział czasu lekcji",description:"Poziomy wykres słupkowy liczby lekcji w tygodniu na przedmiot, z planu lekcji.",preview:!0},{type:"librus-school-card",name:"Librus - Szkoła i klasa",description:"Nazwa i adres szkoły, klasa, wychowawca, terminy semestru.",preview:!0},{type:"librus-school-year-card",name:"Librus - Koniec roku szkolnego",description:"Odliczanie do końca roku szkolnego, pasek postępu roku i data końca semestru.",preview:!0},{type:"librus-today-card",name:"Librus - Dziś",description:"Szczęśliwy numerek, nieprzeczytane wiadomości/ogłoszenia i najbliższa lekcja w jednym miejscu.",preview:!0},{type:"librus-tomorrow-card",name:"Librus - Jutro",description:"Następny dzień nauki: lekcje, zadania na termin i sprawdziany (ogarnia weekend).",preview:!0},{type:"librus-first-lesson-card",name:"Librus - Pierwsza lekcja",description:"O której i od czego zaczyna każde dziecko dziś i w następny dzień nauki - wszystkie dzieci na jednej karcie.",preview:!0},{type:"librus-week-summary-card",name:"Librus - Tydzień w skrócie",description:"Nowe oceny, nieobecności, uwagi i najbliższe wydarzenie w tym tygodniu.",preview:!0},{type:"librus-lucky-number-card",name:"Librus - Szczęśliwy numerek",description:"Dzisiejszy szczęśliwy numerek w dużym formacie.",preview:!0},{type:"librus-student-card",name:"Librus - Karta ucznia",description:"Zabawowa karta w stylu trading-card, licząca ogólną ocenę z frekwencji/zachowania/ocen/aktywności.",preview:!0},{type:"librus-streak-card",name:"Librus - Passy",description:"Trzy serie: bez nieobecności, bez uwag, dobrych ocen z rzędu.",preview:!0},{type:"librus-rank-card",name:"Librus - Ranga",description:"Brąz/Srebro/Złoto/Diament wg średniej ocen, z pierścieniem postępu do kolejnej rangi.",preview:!0},{type:"librus-achievements-card",name:"Librus - Osiągnięcia",description:"Gablota trofeów - odblokowane odznaki grywalizacji (pierwsza szóstka, serie ocen/frekwencji/zachowania). Śledzi je na żywo od dodania karty.",preview:!0},{type:"librus-teachers-card",name:"Librus - Nauczyciele",description:"Wychowawca i nauczyciele przedmiotów, wyliczeni z planu lekcji.",preview:!0},{type:"librus-level-card",name:"Librus - Poziom",description:"Licznik XP za oceny i frekwencję z pierścieniem postępu - w przeciwieństwie do Rangi rośnie tylko w górę.",preview:!0},{type:"librus-hero-card",name:"Librus - Bohater",description:"Jeden wynik liczony z ocen, frekwencji, zachowania i serii - jako archetyp ucznia albo postać RPG (tryb w ustawieniach karty).",preview:!0},{type:"librus-hero-stats-card",name:"Librus - Statystyki bohatera",description:"Karta postaci RPG - sześć statystyk (Siła/Intelekt/Wiedza/Charyzma/Wytrwałość/Szczęście) na wykresie radarowym, liczonych z ocen, frekwencji, zachowania i rangi.",preview:!0},{type:"librus-hero-history-card",name:"Librus - Historia bohatera",description:"Oś czasu poprzednich wyników karty Bohater - kiedy się zmieniały i jak długo trwały (śledzone od dodania karty, lokalnie w przeglądarce).",preview:!0},{type:"librus-last-update-tile-card",name:"Librus - Ostatnia aktualizacja",description:"Ile czasu temu integracja ostatnio pobrała dane z Librusa.",preview:!0},{type:"librus-ai-summary-card",name:"Librus - Podsumowanie tygodnia (AI)",description:"Tygodniowe podsumowanie nauki napisane przez AI: oceny, frekwencja, zachowanie, następny tydzień i rady.",preview:!0}),console.info("%c LIBRUS-SYNERGIA-CARDS %c 66 cards loaded ","color: #fff; background: #4f46e5; font-weight: 700; border-radius: 3px 0 0 3px; padding: 2px 6px;","color: #4f46e5; background: transparent; font-weight: 500;");
