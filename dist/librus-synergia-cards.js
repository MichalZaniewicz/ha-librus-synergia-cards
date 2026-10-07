function e(e,t,a,i){var s,r=arguments.length,n=r<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,a):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,a,i);else for(var o=e.length-1;o>=0;o--)(s=e[o])&&(n=(r<3?s(n):r>3?s(t,a,n):s(t,a))||n);return r>3&&n&&Object.defineProperty(t,a,n),n}"function"==typeof SuppressedError&&SuppressedError;
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=globalThis,a=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),s=new WeakMap;let r=class{constructor(e,t,a){if(this._$cssResult$=!0,a!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(a&&void 0===e){const a=void 0!==t&&1===t.length;a&&(e=s.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),a&&s.set(t,e))}return e}toString(){return this.cssText}};const n=(e,...t)=>{const a=1===e.length?e[0]:t.reduce((t,a,i)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(a)+e[i+1],e[0]);return new r(a,e,i)},o=a?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const a of e.cssRules)t+=a.cssText;return(e=>new r("string"==typeof e?e:e+"",void 0,i))(t)})(e):e,{is:c,defineProperty:d,getOwnPropertyDescriptor:l,getOwnPropertyNames:h,getOwnPropertySymbols:u,getPrototypeOf:p}=Object,g=globalThis,m=g.trustedTypes,v=m?m.emptyScript:"",b=g.reactiveElementPolyfillSupport,_=(e,t)=>e,y={toAttribute(e,t){switch(t){case Boolean:e=e?v:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let a=e;switch(t){case Boolean:a=null!==e;break;case Number:a=null===e?null:Number(e);break;case Object:case Array:try{a=JSON.parse(e)}catch(e){a=null}}return a}},f=(e,t)=>!c(e,t),w={attribute:!0,type:String,converter:y,reflect:!1,useDefault:!1,hasChanged:f};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),g.litPropertyMetadata??=new WeakMap;let k=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=w){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const a=Symbol(),i=this.getPropertyDescriptor(e,a,t);void 0!==i&&d(this.prototype,e,i)}}static getPropertyDescriptor(e,t,a){const{get:i,set:s}=l(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:i,set(t){const r=i?.call(this);s?.call(this,t),this.requestUpdate(e,r,a)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??w}static _$Ei(){if(this.hasOwnProperty(_("elementProperties")))return;const e=p(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(_("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(_("properties"))){const e=this.properties,t=[...h(e),...u(e)];for(const a of t)this.createProperty(a,e[a])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,a]of t)this.elementProperties.set(e,a)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const a=this._$Eu(e,t);void 0!==a&&this._$Eh.set(a,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const a=new Set(e.flat(1/0).reverse());for(const e of a)t.unshift(o(e))}else void 0!==e&&t.push(o(e));return t}static _$Eu(e,t){const a=t.attribute;return!1===a?void 0:"string"==typeof a?a:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const a of t.keys())this.hasOwnProperty(a)&&(e.set(a,this[a]),delete this[a]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((e,i)=>{if(a)e.adoptedStyleSheets=i.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const a of i){const i=document.createElement("style"),s=t.litNonce;void 0!==s&&i.setAttribute("nonce",s),i.textContent=a.cssText,e.appendChild(i)}})(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,a){this._$AK(e,a)}_$ET(e,t){const a=this.constructor.elementProperties.get(e),i=this.constructor._$Eu(e,a);if(void 0!==i&&!0===a.reflect){const s=(void 0!==a.converter?.toAttribute?a.converter:y).toAttribute(t,a.type);this._$Em=e,null==s?this.removeAttribute(i):this.setAttribute(i,s),this._$Em=null}}_$AK(e,t){const a=this.constructor,i=a._$Eh.get(e);if(void 0!==i&&this._$Em!==i){const e=a.getPropertyOptions(i),s="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:y;this._$Em=i;const r=s.fromAttribute(t,e.type);this[i]=r??this._$Ej?.get(i)??r,this._$Em=null}}requestUpdate(e,t,a,i=!1,s){if(void 0!==e){const r=this.constructor;if(!1===i&&(s=this[e]),a??=r.getPropertyOptions(e),!((a.hasChanged??f)(s,t)||a.useDefault&&a.reflect&&s===this._$Ej?.get(e)&&!this.hasAttribute(r._$Eu(e,a))))return;this.C(e,t,a)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:a,reflect:i,wrapped:s},r){a&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,r??t??this[e]),!0!==s||void 0!==r)||(this._$AL.has(e)||(this.hasUpdated||a||(t=void 0),this._$AL.set(e,t)),!0===i&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,a]of e){const{wrapped:e}=a,i=this[t];!0!==e||this._$AL.has(t)||void 0===i||this.C(t,void 0,a,i)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};k.elementStyles=[],k.shadowRootOptions={mode:"open"},k[_("elementProperties")]=new Map,k[_("finalized")]=new Map,b?.({ReactiveElement:k}),(g.reactiveElementVersions??=[]).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const x=globalThis,$=e=>e,z=x.trustedTypes,j=z?z.createPolicy("lit-html",{createHTML:e=>e}):void 0,C="$lit$",S=`lit$${Math.random().toFixed(9).slice(2)}$`,D="?"+S,T=`<${D}>`,I=document,E=()=>I.createComment(""),A=e=>null===e||"object"!=typeof e&&"function"!=typeof e,N=Array.isArray,M="[ \t\n\f\r]",L=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,P=/-->/g,B=/>/g,F=RegExp(`>|${M}(?:([^\\s"'>=/]+)(${M}*=${M}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),O=/'/g,K=/"/g,U=/^(?:script|style|textarea|title)$/i,H=e=>(t,...a)=>({_$litType$:e,strings:t,values:a}),W=H(1),R=H(2),G=Symbol.for("lit-noChange"),q=Symbol.for("lit-nothing"),J=new WeakMap,Z=I.createTreeWalker(I,129);function V(e,t){if(!N(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==j?j.createHTML(t):t}const Y=(e,t)=>{const a=e.length-1,i=[];let s,r=2===t?"<svg>":3===t?"<math>":"",n=L;for(let t=0;t<a;t++){const a=e[t];let o,c,d=-1,l=0;for(;l<a.length&&(n.lastIndex=l,c=n.exec(a),null!==c);)l=n.lastIndex,n===L?"!--"===c[1]?n=P:void 0!==c[1]?n=B:void 0!==c[2]?(U.test(c[2])&&(s=RegExp("</"+c[2],"g")),n=F):void 0!==c[3]&&(n=F):n===F?">"===c[0]?(n=s??L,d=-1):void 0===c[1]?d=-2:(d=n.lastIndex-c[2].length,o=c[1],n=void 0===c[3]?F:'"'===c[3]?K:O):n===K||n===O?n=F:n===P||n===B?n=L:(n=F,s=void 0);const h=n===F&&e[t+1].startsWith("/>")?" ":"";r+=n===L?a+T:d>=0?(i.push(o),a.slice(0,d)+C+a.slice(d)+S+h):a+S+(-2===d?t:h)}return[V(e,r+(e[a]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),i]};class X{constructor({strings:e,_$litType$:t},a){let i;this.parts=[];let s=0,r=0;const n=e.length-1,o=this.parts,[c,d]=Y(e,t);if(this.el=X.createElement(c,a),Z.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(i=Z.nextNode())&&o.length<n;){if(1===i.nodeType){if(i.hasAttributes())for(const e of i.getAttributeNames())if(e.endsWith(C)){const t=d[r++],a=i.getAttribute(e).split(S),n=/([.?@])?(.*)/.exec(t);o.push({type:1,index:s,name:n[2],strings:a,ctor:"."===n[1]?ie:"?"===n[1]?se:"@"===n[1]?re:ae}),i.removeAttribute(e)}else e.startsWith(S)&&(o.push({type:6,index:s}),i.removeAttribute(e));if(U.test(i.tagName)){const e=i.textContent.split(S),t=e.length-1;if(t>0){i.textContent=z?z.emptyScript:"";for(let a=0;a<t;a++)i.append(e[a],E()),Z.nextNode(),o.push({type:2,index:++s});i.append(e[t],E())}}}else if(8===i.nodeType)if(i.data===D)o.push({type:2,index:s});else{let e=-1;for(;-1!==(e=i.data.indexOf(S,e+1));)o.push({type:7,index:s}),e+=S.length-1}s++}}static createElement(e,t){const a=I.createElement("template");return a.innerHTML=e,a}}function Q(e,t,a=e,i){if(t===G)return t;let s=void 0!==i?a._$Co?.[i]:a._$Cl;const r=A(t)?void 0:t._$litDirective$;return s?.constructor!==r&&(s?._$AO?.(!1),void 0===r?s=void 0:(s=new r(e),s._$AT(e,a,i)),void 0!==i?(a._$Co??=[])[i]=s:a._$Cl=s),void 0!==s&&(t=Q(e,s._$AS(e,t.values),s,i)),t}class ee{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:a}=this._$AD,i=(e?.creationScope??I).importNode(t,!0);Z.currentNode=i;let s=Z.nextNode(),r=0,n=0,o=a[0];for(;void 0!==o;){if(r===o.index){let t;2===o.type?t=new te(s,s.nextSibling,this,e):1===o.type?t=new o.ctor(s,o.name,o.strings,this,e):6===o.type&&(t=new ne(s,this,e)),this._$AV.push(t),o=a[++n]}r!==o?.index&&(s=Z.nextNode(),r++)}return Z.currentNode=I,i}p(e){let t=0;for(const a of this._$AV)void 0!==a&&(void 0!==a.strings?(a._$AI(e,a,t),t+=a.strings.length-2):a._$AI(e[t])),t++}}class te{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,a,i){this.type=2,this._$AH=q,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=a,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=Q(this,e,t),A(e)?e===q||null==e||""===e?(this._$AH!==q&&this._$AR(),this._$AH=q):e!==this._$AH&&e!==G&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>N(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==q&&A(this._$AH)?this._$AA.nextSibling.data=e:this.T(I.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:a}=e,i="number"==typeof a?this._$AC(e):(void 0===a.el&&(a.el=X.createElement(V(a.h,a.h[0]),this.options)),a);if(this._$AH?._$AD===i)this._$AH.p(t);else{const e=new ee(i,this),a=e.u(this.options);e.p(t),this.T(a),this._$AH=e}}_$AC(e){let t=J.get(e.strings);return void 0===t&&J.set(e.strings,t=new X(e)),t}k(e){N(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let a,i=0;for(const s of e)i===t.length?t.push(a=new te(this.O(E()),this.O(E()),this,this.options)):a=t[i],a._$AI(s),i++;i<t.length&&(this._$AR(a&&a._$AB.nextSibling,i),t.length=i)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=$(e).nextSibling;$(e).remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class ae{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,a,i,s){this.type=1,this._$AH=q,this._$AN=void 0,this.element=e,this.name=t,this._$AM=i,this.options=s,a.length>2||""!==a[0]||""!==a[1]?(this._$AH=Array(a.length-1).fill(new String),this.strings=a):this._$AH=q}_$AI(e,t=this,a,i){const s=this.strings;let r=!1;if(void 0===s)e=Q(this,e,t,0),r=!A(e)||e!==this._$AH&&e!==G,r&&(this._$AH=e);else{const i=e;let n,o;for(e=s[0],n=0;n<s.length-1;n++)o=Q(this,i[a+n],t,n),o===G&&(o=this._$AH[n]),r||=!A(o)||o!==this._$AH[n],o===q?e=q:e!==q&&(e+=(o??"")+s[n+1]),this._$AH[n]=o}r&&!i&&this.j(e)}j(e){e===q?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class ie extends ae{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===q?void 0:e}}class se extends ae{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==q)}}class re extends ae{constructor(e,t,a,i,s){super(e,t,a,i,s),this.type=5}_$AI(e,t=this){if((e=Q(this,e,t,0)??q)===G)return;const a=this._$AH,i=e===q&&a!==q||e.capture!==a.capture||e.once!==a.once||e.passive!==a.passive,s=e!==q&&(a===q||i);i&&this.element.removeEventListener(this.name,this,a),s&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}let ne=class{constructor(e,t,a){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=a}get _$AU(){return this._$AM._$AU}_$AI(e){Q(this,e)}};const oe=x.litHtmlPolyfillSupport;oe?.(X,te),(x.litHtmlVersions??=[]).push("3.3.3");const ce=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class de extends k{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,a)=>{const i=a?.renderBefore??t;let s=i._$litPart$;if(void 0===s){const e=a?.renderBefore??null;i._$litPart$=s=new te(t.insertBefore(E(),e),e,void 0,a??{})}return s._$AI(e),s})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return G}}de._$litElement$=!0,de.finalized=!0,ce.litElementHydrateSupport?.({LitElement:de});const le=ce.litElementPolyfillSupport;le?.({LitElement:de}),(ce.litElementVersions??=[]).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const he=e=>(t,a)=>{void 0!==a?a.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)},ue={attribute:!0,type:String,converter:y,reflect:!1,hasChanged:f},pe=(e=ue,t,a)=>{const{kind:i,metadata:s}=a;let r=globalThis.litPropertyMetadata.get(s);if(void 0===r&&globalThis.litPropertyMetadata.set(s,r=new Map),"setter"===i&&((e=Object.create(e)).wrapped=!0),r.set(a.name,e),"accessor"===i){const{name:i}=a;return{set(a){const s=t.get.call(this);t.set.call(this,a),this.requestUpdate(i,s,e,!0,a)},init(t){return void 0!==t&&this.C(i,void 0,e,t),t}}}if("setter"===i){const{name:i}=a;return function(a){const s=this[i];t.call(this,a),this.requestUpdate(i,s,e,!0,a)}}throw Error("Unsupported decorator location: "+i)};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function ge(e){return(t,a)=>"object"==typeof a?pe(e,t,a):((e,t,a)=>{const i=t.hasOwnProperty(a);return t.constructor.createProperty(a,e),i?Object.getOwnPropertyDescriptor(t,a):void 0})(e,t,a)}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function me(e){return ge({...e,state:!0,attribute:!1})}const ve="librus_synergia",be=new Set(["unknown","unavailable",""]);class _e extends Error{constructor(e,t){super(e),this.code=e,this.deviceId=t}}function ye(e){const t=new Set;for(const a of Object.values(e.entities??{}))a.platform===ve&&a.device_id&&t.add(a.device_id);return[...t]}function fe(e,t){const a=ye(e);if(t){if(!a.includes(t))throw new _e("device_missing",t);return t}if(1===a.length)return a[0];if(0===a.length)throw new _e("no_device");throw new _e("multiple_devices")}function we(e,t){const a={};for(const i of Object.values(e.entities??{}))i.device_id===t&&i.platform===ve&&i.translation_key&&(a[i.translation_key]=i.entity_id);return a}function ke(e,t,a){const i=[];for(const s of Object.values(e.entities??{}))if(s.device_id===t&&s.platform===ve&&s.translation_key===a){const t=e.states[s.entity_id],a=t?.attributes;i.push({entityId:s.entity_id,subject:a?.subject||s.entity_id,subjectId:a?.subject_id})}return i.sort((e,t)=>e.subject.localeCompare(t.subject))}const xe={"error.device_missing":"Device {device} not found","error.multiple_devices":"Multiple students found - set device_id","error.no_device":"No Librus Synergia device found","empty.loading":"Loading…","empty.generic_error":"Something went wrong","editor.student":"Student","editor.subject":"Subject","editor.subject_auto":"Overall / all subjects","editor.title":"Card title (optional)","editor.max_items":"Max rows shown","editor.days_ahead":"Days ahead","editor.days_back":"Days of history","editor.target":"Target average","editor.mailbox":"Mailbox","editor.show_saturday":"Show Saturday","editor.exam_keywords":"Exam category keywords (comma-separated)","editor.icon":"Icon override (e.g. mdi:star)","editor.hide_header":"Hide header","editor.compact":"Compact mode","editor.category_filter":"Category filter (comma-separated, optional)","editor.sort":"Sort order","sort.newest":"Newest first","sort.oldest":"Oldest first","card.grades.title":"Grade average","card.grades.subtitle":"All subjects","card.grades.empty":"No grades yet this year","card.subject_spotlight.title":"Best & weakest subject","card.subject_spotlight.subtitle":"By average","card.subject_spotlight.empty":"Not enough graded subjects to compare yet","card.subject_spotlight.best":"Top subject","card.subject_spotlight.weakest":"Room to grow","card.grade_trend.title":"Grade trend","card.grade_trend.subtitle":"Last {days} days","card.grade_trend.empty":"Not enough history yet","card.grade_distribution.title":"Grade distribution","card.grade_distribution.subtitle":"{count} grades, all subjects","card.grade_distribution.other":"other","card.grades_radar.title":"Grade profile","card.grades_radar.subtitle":"By subject","card.grades_radar.empty":"Not enough subjects with grades yet","label.average":"Average","card.grade_category_distribution.title":"Grades by category","card.grade_category_distribution.subtitle":"Tests, quizzes, answers…","card.grade_category_distribution.empty":"No categorized grades yet","unit.grades":"grades","card.grade_category_distribution.uncategorized":"Uncategorized","card.subject_time.title":"Lesson time split","card.subject_time.subtitle":"Lessons per week, by subject","card.subject_time.empty":"No lessons found for this week","unit.lessons_per_week":"lessons/wk","card.attendance_weekday.title":"Absences by weekday","card.attendance_weekday.subtitle":"This school year","card.attendance_weekday.empty":"No absences or lates recorded","card.attendance_subject.title":"Absences by subject","card.attendance_subject.subtitle":"Which subjects are missed most often","card.attendance_subject.empty":"No absences recorded","card.subject_attendance.title":"Attendance by subject","card.subject_attendance.lowest":"Lowest:","card.subject_attendance.at_risk":"{count} below 50%","card.subject_attendance.no_risk":"no risk","card.subject_attendance.tooltip":"{subject}: present at {present} of {total} lessons","card.subject_attendance.legend_good":"90% or more","card.subject_attendance.legend_warn":"50–90%","card.subject_attendance.legend_bad":"below 50%","card.subject_attendance.legend_few":"too few lessons","card.subject_attendance.empty":"No attendance data yet","card.subject_attendance.needs_backend":"Needs ha-librus-synergia 0.9.0 or newer (Lowest subject attendance sensor).","card.recent_activity.title":"What's new","card.recent_activity.subtitle":"Grades, notices, announcements & messages","card.recent_activity.empty":"Nothing new yet","card.grade_log.title":"Grade log","label.grade_improves":"corrects {value}","card.grade_log.subtitle":"All subjects","card.grade_log.empty_filtered":"No grades match this filter","card.latest_grade.title":"Latest grade","card.latest_grade.empty":"No grades yet","card.behaviour_grade.title":"Behaviour grade","card.behaviour_grade.subtitle":"Semester grade","card.behaviour_grade.empty":"No behaviour grade yet","card.descriptive_grades.title":"Descriptive grades","card.descriptive_grades.subtitle":"Non-numeric assessment","card.descriptive_grades.empty":"No descriptive grades yet","card.attendance.title":"Attendance","card.attendance.subtitle":"This school year","card.attendance.by_semester":"By semester","card.attendance_heatmap.title":"Attendance - year map","card.attendance_heatmap.subtitle":"This school year","card.attendance_heatmap.empty":"No attendance data","card.attendance_heatmap.status.good":"Present","card.attendance_heatmap.status.warn":"Excused","card.attendance_heatmap.status.bad":"Unexcused","card.attendance_heatmap.no_data":"No data","card.attendance.semester":"Semester {n}","stat.absences":"Absences","stat.unexcused":"Unexcused","stat.excused":"Excused","stat.late":"Late","stat.records":"Records","stat.percentage":"Attendance","card.behaviour_notices.title":"Behaviour notices","card.behaviour_notices.empty":"No notices","card.messages.title":"Messages","card.messages.unavailable":"Messages module not enabled","card.messages.read_notice":"Opening marks it as read in Librus","card.messages.fetch_failed":"Couldn't load the full message","card.messages.attachment_notice":"Attached - open in the Librus app to download","card.substitutions.title":"Substitutions, alerts & justifications","card.substitutions.subtitle":"Zastępstwa, alerty i usprawiedliwienia","card.substitutions.empty":"No substitutions, alerts, or justifications","mailbox.inbox":"Inbox","mailbox.notes":"Notes","mailbox.alerts":"Alerts","mailbox.substitutions":"Substitutions","mailbox.absences":"Absences","mailbox.justifications":"Justifications","mailbox.trash":"Trash","card.announcements.title":"Announcements","card.announcements.empty":"No announcements","card.homework_assignments.title":"Homework assignments","card.homework_assignments.empty":"No homework assignments","label.due":"Due","card.today_lessons.title":"Today's lessons","card.today_lessons.subtitle":"Timetable","card.today_lessons.empty":"No lessons today","label.now":"now","card.next_lesson.title":"Next lesson","card.next_lesson.empty":"No more lessons today","label.in_minutes":"in {minutes} min","label.in_hours":"in {hours}h","label.in_hours_minutes":"in {hours}h {minutes}m","label.in_days":"in {days}d","label.in_days_hours":"in {days}d {hours}h","card.agenda.title":"Agenda","card.agenda.subtitle":"Upcoming","card.agenda.empty":"Nothing scheduled","card.free_days.title":"Free days","card.free_days.empty":"No upcoming free days","label.days_until":"days until","card.school_year.title":"End of school year","card.school_year.empty":"No school year data","label.days_until_year_end":"days until year end","label.current_semester":"Current semester","label.days_until_semester_end":"days until semester end","label.year_progress":"School year","card.exam_countdown.title":"Next exam","card.exam_countdown.empty":"No upcoming exams","card.week_timetable.title":"Week timetable","card.week_timetable.subtitle":"This week","card.week_timetable.subtitle_upcoming":"Upcoming week","card.week_timetable.break_now":"Break — next lesson in {minutes} min","card.week_timetable.empty":"No lessons found for this week","card.school.title":"School","label.head_teacher":"Head teacher","label.tutor":"Homeroom teacher","label.semester_ends":"Semester ends","label.year_ends":"Year ends","card.today.title":"Today","stat.lucky_number":"Lucky number","card.week_summary.title":"Week in review","stat.new_grades":"New grades","card.ai_summary.title":"Weekly summary","card.ai_summary.setup":"Weekly AI summary is off","card.ai_summary.setup_hint":"Turn it on under the Librus integration's Configure -> Weekly AI summary (integration 0.10 or newer).","card.ai_summary.waiting":"No summary yet","card.ai_summary.generating":"Generating…","card.ai_summary.generate":"Generate now","card.ai_summary.advice":"For the coming week","card.ai_summary.next_run":"Next: {when}","card.ai_summary.paused":"Automatic summary paused","card.ai_summary.disclaimer":"Written by AI, may contain mistakes","card.ai_summary.for_parent":"for the parent","card.ai_summary.for_student":"for the student","ai_summary.status.good":"Good","ai_summary.status.ok":"OK","ai_summary.status.caution":"Needs attention","ai_summary.section.grades":"Grades","ai_summary.section.attendance":"Attendance","ai_summary.section.behaviour":"Behaviour","ai_summary.section.next_week":"Next week","ai_summary.section.school_news":"From the school","editor.summary_only":"Headline and to-dos only","editor.hide_generate":"Hide the Generate now button","card.lucky_number.title":"Lucky number","card.lucky_number.subtitle":"Today in the register","card.lucky_number.subtitle_for_date":"For {date}","card.lucky_number.yours_today":"It's your number today!","card.lucky_number.yours_for_date":"It's your number on {date}!","card.lucky_number.empty":"No lucky number published yet (e.g. during a school break)","card.student.title":"Student card","stat.overall_rating":"overall","stat.attendance_score":"Attendance","stat.behaviour_score":"Behaviour","stat.grades_score":"Grades","stat.activity_score":"Activity","card.streak.title":"Streaks","card.streak.attendance":"No absences","card.streak.behaviour":"Good behaviour","card.streak.grades":"Good grades","label.days":"days","card.rank.title":"Rank","card.rank.empty":"No grades yet to compute a rank","rank.bronze":"Bronze","rank.silver":"Silver","rank.gold":"Gold","rank.diamond":"Diamond","label.to_next_rank":"to next rank","label.top_rank":"Top rank reached","card.achievements.title":"Achievements","card.achievements.count":"{n} unlocked","card.achievements.empty":"No badges yet - they'll appear here once a new achievement is unlocked while this card is on a dashboard (earlier ones can't be recovered)","card.achievements.next_hint":"{n} more to: {title}","achievement.first_six":"First six!","achievement.good_grade_streak_5":"5 good grades in a row","achievement.good_grade_streak_10":"10 good grades in a row","achievement.good_grade_streak_20":"20 good grades in a row","achievement.attendance_streak_7":"A week without an absence","achievement.attendance_streak_30":"A month without an absence","achievement.attendance_streak_90":"3 months without an absence","achievement.behaviour_streak_7":"A week without a note","achievement.behaviour_streak_30":"A month without a note","achievement.behaviour_streak_90":"3 months without a note","card.level.title":"Level","card.level.subtitle":"XP from grades & attendance","label.level":"Level {n}","label.xp_to_next":"{n} XP to next level","label.xp_from_grades":"From grades","label.xp_from_attendance":"From attendance","label.xp_total":"Total XP","card.teachers.title":"Teachers","card.teachers.homeroom":"Homeroom teacher","card.teachers.count":"{n} subjects","card.teachers.empty":"No teacher directory yet","card.grade_goal.title":"Grade goal","card.grade_goal.subtitle_overall":"Overall average","card.grade_goal.empty":"No grades yet to track a goal against","card.grade_goal.reached":"Goal reached 🎉","label.current":"Now","label.target":"Target","label.to_go":"to go","label.sixes_needed":"≈ {n} more top grades","card.bell_schedule.title":"Today's schedule","card.bell_schedule.empty":"No bell schedule yet — needs ha-librus-synergia with the bell_schedule attribute","label.lesson_short":"L{n}","label.after_school":"School's out for today","editor.hide_room":"Hide classroom","editor.only_tomorrow":"Only the next school day","editor.student_name":"Name shown for {device} (optional)","card.first_lesson.title":"First lesson","card.first_lesson.today":"Today","card.first_lesson.tomorrow":"Tomorrow","card.first_lesson.earliest_today":"Earliest today: {who}","card.first_lesson.earliest_tomorrow":"Earliest tomorrow: {who}","card.first_lesson.earliest_on":"Earliest on {day}: {who}","card.first_lesson.free":"no lessons","card.first_lesson.no_data":"no timetable","card.first_lesson.first_canceled":"first lesson cancelled","card.first_lesson.first_n_canceled":"first {n} lessons cancelled","card.first_lesson.substitution":"substitution","card.first_lesson.empty":"No lessons today or on the next school day","card.tomorrow.title":"Tomorrow","card.tomorrow.title_next_school_day":"Next school day","card.tomorrow.empty":"Nothing scheduled for the next school day","card.tomorrow.lessons":"lessons","card.tomorrow.starts":"Starts","card.tomorrow.ends":"Ends","card.tomorrow.homework":"Homework due: {n}","card.grade_simulator.subtitle":"What if… (rough estimate)","card.grade_simulator.empty":"Pick a subject that has grades","label.weight":"Weight","card.homework_checklist.title":"Homework checklist","card.homework_checklist.progress":"{done}/{total} done","card.semester_comparison.title":"Semester comparison","card.semester_comparison.subtitle":"Semester 1 vs 2, by subject","card.semester_comparison.empty":"No semester averages yet","card.semester_comparison.s1":"Sem 1","card.semester_comparison.s2":"Sem 2","editor.mode":"Mode","mode.archetype":"Archetype","mode.hero":"Hero","card.hero.title_archetype":"Your archetype","card.hero.title_hero":"Your hero","card.hero.subtitle":"based on your Librus data","card.hero.empty":"Not enough data yet to compute a result","hero.chip.avg_naukowiec":"STEM avg {n}","hero.chip.avg_humanista":"Humanities avg {n}","hero.chip.avg_poliglota":"Languages avg {n}","hero.chip.avg_artysta":"Arts avg {n}","hero.chip.avg_sportowiec":"PE avg {n}","hero.chip.grades":"{n} grades","hero.chip.streak_days":"{n}-day streak","hero.chip.unexcused":"{n} unexcused","hero.chip.good_streak":"{n}-grade streak","hero.chip.overall_avg":"avg {n}","hero.chip.overall_avg_full":"overall avg {n}","hero.chip.semester1":"term 1: {n}","hero.chip.semester2":"term 2: {n}","hero.chip.behaviour":"conduct {name}","hero.chip.positive_notes":"+{n} notes","hero.chip.badges":"{n} badges","hero.chip.various_categories":"various categories","hero.chip.subjects_count":"{n} subjects","hero.chip.spread":"spread {n}","hero.naukowiec.archetype_name":"Scientist","hero.naukowiec.hero_name":"Archmage","hero.naukowiec.archetype_desc":"Maths, physics and computer science outshine every other subject.","hero.naukowiec.hero_desc":"You wield the magic of numbers - equations are your spells.","hero.humanista.archetype_name":"Humanist","hero.humanista.hero_name":"Bard","hero.humanista.archetype_desc":"Polish and history are the subjects where you shine brightest.","hero.humanista.hero_desc":"Words are your weapon - a good story wins anyone over.","hero.poliglota.archetype_name":"Polyglot","hero.poliglota.hero_name":"Translator","hero.poliglota.archetype_desc":"English and German clearly outrank every other subject.","hero.poliglota.hero_desc":"You know more languages than most adults ever will.","hero.artysta.archetype_name":"Artist","hero.artysta.hero_name":"Illusionist","hero.artysta.archetype_desc":"Art and music are the subjects where you're strongest.","hero.artysta.hero_desc":"You create worlds that others can only imagine.","hero.sportowiec.archetype_name":"Athlete","hero.sportowiec.hero_name":"Herald of the Arena","hero.sportowiec.archetype_desc":"Physical education is clearly your strongest subject.","hero.sportowiec.hero_desc":"Strength and stamina - nobody on the field matches you.","hero.wojownik.archetype_name":"Attendance Warrior","hero.wojownik.hero_name":"The Unyielding","hero.wojownik.archetype_desc":"A long attendance streak and zero unexcused absences.","hero.wojownik.hero_desc":"You show up every single day, no exceptions, no excuses.","hero.meteor.archetype_name":"Meteor","hero.meteor.hero_name":"Meteor","hero.meteor.archetype_desc":"Your good-grade streak stretches back a dozen entries.","hero.meteor.hero_desc":"You're tearing through the term, leaving a trail of grades.","hero.feniks.archetype_name":"Phoenix","hero.feniks.hero_name":"Phoenix","hero.feniks.archetype_desc":"This semester's average is clearly up from the last one.","hero.feniks.hero_desc":"You rise from a weaker start, stronger than before.","hero.spolecznik.archetype_name":"People Person","hero.spolecznik.hero_name":"Healer","hero.spolecznik.archetype_desc":"Model conduct grade and nothing but positive notes.","hero.spolecznik.hero_desc":"Your presence calms and settles the whole class at once.","hero.kolekcjoner.archetype_name":"Collector","hero.kolekcjoner.hero_name":"Trophy Hunter","hero.kolekcjoner.archetype_desc":"The most unlocked badges across every category.","hero.kolekcjoner.hero_desc":"Your trophy case is bursting with earned achievements.","hero.prymus.archetype_name":"Top of the Class","hero.prymus.hero_name":"Legend","hero.prymus.archetype_desc":"A high average holds steady across every subject.","hero.prymus.hero_desc":"They'll be telling stories about your results for years.","hero.wszechstronny.archetype_name":"All-Rounder","hero.wszechstronny.hero_name":"Avatar of Balance","hero.wszechstronny.archetype_desc":"No subject dominates - your grades are level across the board.","hero.wszechstronny.hero_desc":"You wield a bit of every element - nothing surprises you.","card.hero_stats.title":"Hero stats","card.hero_stats.subtitle":"Your character sheet","card.hero_stats.empty":"Not enough data for stats yet","card.hero_stats.power":"Power","hero_stat.sila":"Strength","hero_stat.intelekt":"Intellect","hero_stat.wiedza":"Wisdom","hero_stat.charyzma":"Charisma","hero_stat.wytrwalosc":"Endurance","hero_stat.szczescie":"Luck","card.hero_history.title":"Hero history","card.hero_history.subtitle":"how your result changed over time","card.hero_history.empty":"No history yet - it appears once your result changes","card.hero_history.current":"current ({n}d)","card.last_update.subtitle":"Last data refresh","label.just_now":"Just now","label.minutes_ago":"{minutes} min ago","label.hours_ago":"{hours}h ago","label.days_ago":"{days}d ago"},$e={en:xe,pl:{"error.device_missing":"Nie znaleziono urządzenia {device}","error.multiple_devices":"Znaleziono kilkoro uczniów - ustaw device_id","error.no_device":"Nie znaleziono urządzenia Librus Synergia","empty.loading":"Wczytywanie…","empty.generic_error":"Coś poszło nie tak","editor.student":"Uczeń","editor.subject":"Przedmiot","editor.subject_auto":"Ogólna / wszystkie przedmioty","editor.title":"Tytuł karty (opcjonalnie)","editor.max_items":"Maks. liczba wierszy","editor.days_ahead":"Dni do przodu","editor.days_back":"Dni historii","editor.target":"Docelowa średnia","editor.mailbox":"Skrzynka","editor.show_saturday":"Pokaż sobotę","editor.exam_keywords":"Słowa-klucze kategorii sprawdzianów (po przecinku)","editor.icon":"Własna ikona (np. mdi:star)","editor.hide_header":"Ukryj nagłówek","editor.compact":"Tryb kompaktowy","editor.category_filter":"Filtr kategorii (po przecinku, opcjonalnie)","editor.sort":"Kolejność","sort.newest":"Najpierw najnowsze","sort.oldest":"Najpierw najstarsze","card.grades.title":"Średnia ocen","card.grades.subtitle":"Wszystkie przedmioty","card.grades.empty":"Brak ocen w tym roku szkolnym","card.subject_spotlight.title":"Najlepszy i najsłabszy przedmiot","card.subject_spotlight.subtitle":"Wg średniej","card.subject_spotlight.empty":"Za mało przedmiotów z ocenami, by porównać","card.subject_spotlight.best":"Najlepszy","card.subject_spotlight.weakest":"Do przećwiczenia","card.grade_trend.title":"Trend średniej","card.grade_trend.subtitle":"Ostatnie {days} dni","card.grade_trend.empty":"Za mało historii","card.grade_distribution.title":"Rozkład ocen","card.grade_distribution.subtitle":"{count} ocen, wszystkie przedmioty","card.grade_distribution.other":"inne","card.grades_radar.title":"Profil ocen","card.grades_radar.subtitle":"Wg przedmiotu","card.grades_radar.empty":"Za mało przedmiotów z ocenami","label.average":"Średnia","card.grade_category_distribution.title":"Oceny wg kategorii","card.grade_category_distribution.subtitle":"Sprawdziany, kartkówki, odpowiedzi…","card.grade_category_distribution.empty":"Brak ocen z przypisaną kategorią","unit.grades":"ocen","card.grade_category_distribution.uncategorized":"Bez kategorii","card.subject_time.title":"Podział czasu lekcji","card.subject_time.subtitle":"Lekcje w tygodniu, wg przedmiotu","card.subject_time.empty":"Brak lekcji w tym tygodniu","unit.lessons_per_week":"lekcji/tydz.","card.attendance_weekday.title":"Nieobecności wg dnia tygodnia","card.attendance_weekday.subtitle":"Ten rok szkolny","card.attendance_weekday.empty":"Brak nieobecności ani spóźnień","card.attendance_subject.title":"Nieobecności wg przedmiotu","card.attendance_subject.subtitle":"Które przedmioty są najczęściej opuszczane","card.attendance_subject.empty":"Brak zarejestrowanych nieobecności","card.subject_attendance.title":"Frekwencja z przedmiotów","card.subject_attendance.lowest":"Najniższa:","card.subject_attendance.at_risk":"{count} poniżej 50%","card.subject_attendance.no_risk":"bez zagrożeń","card.subject_attendance.tooltip":"{subject}: obecny na {present} z {total} lekcji","card.subject_attendance.legend_good":"90% i więcej","card.subject_attendance.legend_warn":"50–90%","card.subject_attendance.legend_bad":"poniżej 50%","card.subject_attendance.legend_few":"za mało lekcji","card.subject_attendance.empty":"Brak danych o frekwencji","card.subject_attendance.needs_backend":"Wymaga ha-librus-synergia 0.9.0 lub nowszej (sensor najniższej frekwencji z przedmiotu).","card.recent_activity.title":"Co nowego","card.recent_activity.subtitle":"Oceny, uwagi, ogłoszenia i wiadomości","card.recent_activity.empty":"Nic nowego","card.grade_log.title":"Dziennik ocen","label.grade_improves":"poprawa z {value}","card.grade_log.subtitle":"Wszystkie przedmioty","card.grade_log.empty_filtered":"Brak ocen pasujących do filtra","card.latest_grade.title":"Ostatnia ocena","card.latest_grade.empty":"Brak ocen","card.behaviour_grade.title":"Ocena zachowania","card.behaviour_grade.subtitle":"Ocena semestralna","card.behaviour_grade.empty":"Brak jeszcze oceny zachowania","card.descriptive_grades.title":"Oceny opisowe","card.descriptive_grades.subtitle":"Ocenianie opisowe","card.descriptive_grades.empty":"Brak jeszcze ocen opisowych","card.attendance.title":"Frekwencja","card.attendance.subtitle":"W tym roku szkolnym","card.attendance.by_semester":"Wg semestru","card.attendance_heatmap.title":"Frekwencja - mapa roku","card.attendance_heatmap.subtitle":"Ten rok szkolny","card.attendance_heatmap.empty":"Brak danych o frekwencji","card.attendance_heatmap.status.good":"Obecność","card.attendance_heatmap.status.warn":"Usprawiedliwiona","card.attendance_heatmap.status.bad":"Nieusprawiedliwiona","card.attendance_heatmap.no_data":"Brak danych","card.attendance.semester":"Semestr {n}","stat.absences":"Nieobecności","stat.unexcused":"Nieusprawiedliwione","stat.excused":"Usprawiedliwione","stat.late":"Spóźnienia","stat.records":"Rekordów","stat.percentage":"Frekwencja","card.behaviour_notices.title":"Uwagi","card.behaviour_notices.empty":"Brak uwag","card.messages.title":"Wiadomości","card.messages.unavailable":"Moduł wiadomości nie jest włączony","card.messages.read_notice":"Otwarcie oznaczy jako przeczytane w Librusie","card.messages.fetch_failed":"Nie udało się pobrać pełnej treści","card.messages.attachment_notice":"Załącznik - pobierz w aplikacji Librus","card.substitutions.title":"Zastępstwa, alerty i usprawiedliwienia","card.substitutions.subtitle":"Wiadomości specjalne","card.substitutions.empty":"Brak zastępstw, alertów ani usprawiedliwień","mailbox.inbox":"Odebrane","mailbox.notes":"Uwagi","mailbox.alerts":"Alerty","mailbox.substitutions":"Zastępstwa","mailbox.absences":"Nieobecności","mailbox.justifications":"Usprawiedliwienia","mailbox.trash":"Kosz","card.announcements.title":"Ogłoszenia","card.announcements.empty":"Brak ogłoszeń","card.homework_assignments.title":"Zadania domowe","card.homework_assignments.empty":"Brak zadań domowych","label.due":"Termin","card.today_lessons.title":"Dzisiejszy plan lekcji","card.today_lessons.subtitle":"Plan lekcji","card.today_lessons.empty":"Brak lekcji dzisiaj","label.now":"teraz","card.next_lesson.title":"Najbliższa lekcja","card.next_lesson.empty":"Koniec lekcji na dziś","label.in_minutes":"za {minutes} min","label.in_hours":"za {hours} godz.","label.in_hours_minutes":"za {hours} godz. {minutes} min","label.in_days":"za {days} dni","label.in_days_hours":"za {days} dni {hours} godz.","card.agenda.title":"Terminarz","card.agenda.subtitle":"Nadchodzące","card.agenda.empty":"Brak zaplanowanych wydarzeń","card.free_days.title":"Dni wolne","card.free_days.empty":"Brak nadchodzących dni wolnych","label.days_until":"dni do","card.school_year.title":"Koniec roku szkolnego","card.school_year.empty":"Brak danych o roku szkolnym","label.days_until_year_end":"dni do końca roku","label.current_semester":"Aktualny semestr","label.days_until_semester_end":"dni do końca semestru","label.year_progress":"Rok szkolny","card.exam_countdown.title":"Najbliższy sprawdzian","card.exam_countdown.empty":"Brak nadchodzących sprawdzianów","card.week_timetable.title":"Plan tygodniowy","card.week_timetable.subtitle":"Ten tydzień","card.week_timetable.subtitle_upcoming":"Nadchodzący tydzień","card.week_timetable.break_now":"Przerwa — następna lekcja za {minutes} min","card.week_timetable.empty":"Brak lekcji w tym tygodniu","card.school.title":"Szkoła","label.head_teacher":"Dyrektor","label.tutor":"Wychowawca","label.semester_ends":"Koniec semestru","label.year_ends":"Koniec roku szkolnego","card.today.title":"Dziś","stat.lucky_number":"Numerek","card.week_summary.title":"Tydzień w skrócie","stat.new_grades":"Nowe oceny","card.ai_summary.title":"Podsumowanie tygodnia","card.ai_summary.setup":"Podsumowanie AI jest wyłączone","card.ai_summary.setup_hint":"Włącz je w integracji Librus: Konfiguruj -> Podsumowanie tygodnia (AI) (integracja 0.10 lub nowsza).","card.ai_summary.waiting":"Jeszcze nie ma podsumowania","card.ai_summary.generating":"Generuję…","card.ai_summary.generate":"Wygeneruj teraz","card.ai_summary.advice":"Na ten tydzień","card.ai_summary.next_run":"Następne: {when}","card.ai_summary.paused":"Automatyczne podsumowanie wstrzymane","card.ai_summary.disclaimer":"Wygenerowane przez AI, może zawierać błędy","card.ai_summary.for_parent":"dla rodzica","card.ai_summary.for_student":"dla ucznia","ai_summary.status.good":"Dobrze","ai_summary.status.ok":"OK","ai_summary.status.caution":"Do uwagi","ai_summary.section.grades":"Oceny","ai_summary.section.attendance":"Frekwencja","ai_summary.section.behaviour":"Zachowanie","ai_summary.section.next_week":"Następny tydzień","ai_summary.section.school_news":"Szkoła pisze","editor.summary_only":"Tylko nagłówek i rady","editor.hide_generate":"Ukryj przycisk Wygeneruj teraz","card.lucky_number.title":"Szczęśliwy numerek","card.lucky_number.subtitle":"Dziś w dzienniku","card.lucky_number.subtitle_for_date":"Na {date}","card.lucky_number.yours_today":"To Twój numerek dzisiaj!","card.lucky_number.yours_for_date":"To Twój numerek na {date}!","card.lucky_number.empty":"Nie opublikowano jeszcze numerka (np. w trakcie przerwy szkolnej)","card.student.title":"Karta ucznia","stat.overall_rating":"ocena ogólna","stat.attendance_score":"Frekwencja","stat.behaviour_score":"Zachowanie","stat.grades_score":"Oceny","stat.activity_score":"Aktywność","card.streak.title":"Passy","card.streak.attendance":"Bez nieobecności","card.streak.behaviour":"Dobre zachowanie","card.streak.grades":"Dobre oceny","label.days":"dni","card.rank.title":"Ranga","card.rank.empty":"Brak jeszcze ocen do wyliczenia rangi","rank.bronze":"Brąz","rank.silver":"Srebro","rank.gold":"Złoto","rank.diamond":"Diament","label.to_next_rank":"do kolejnej rangi","label.top_rank":"Osiągnięto najwyższą rangę","card.achievements.title":"Osiągnięcia","card.achievements.count":"Odblokowano: {n}","card.achievements.empty":"Jeszcze żadnych odznak - pojawią się tu, gdy nowe osiągnięcie odblokuje się przy tej karcie na dashboardzie (wcześniejszych nie da się odzyskać)","card.achievements.next_hint":"Jeszcze {n} do: {title}","achievement.first_six":"Pierwsza szóstka!","achievement.good_grade_streak_5":"5 dobrych ocen z rzędu","achievement.good_grade_streak_10":"10 dobrych ocen z rzędu","achievement.good_grade_streak_20":"20 dobrych ocen z rzędu","achievement.attendance_streak_7":"Tydzień bez nieobecności","achievement.attendance_streak_30":"Miesiąc bez nieobecności","achievement.attendance_streak_90":"3 miesiące bez nieobecności","achievement.behaviour_streak_7":"Tydzień bez uwagi","achievement.behaviour_streak_30":"Miesiąc bez uwagi","achievement.behaviour_streak_90":"3 miesiące bez uwagi","card.level.title":"Poziom","card.level.subtitle":"XP za oceny i frekwencję","label.level":"Poziom {n}","label.xp_to_next":"{n} XP do kolejnego poziomu","label.xp_from_grades":"Z ocen","label.xp_from_attendance":"Z frekwencji","label.xp_total":"Suma XP","card.teachers.title":"Nauczyciele","card.teachers.homeroom":"Wychowawca","card.teachers.count":"{n} przedmiotów","card.teachers.empty":"Brak jeszcze katalogu nauczycieli","card.grade_goal.title":"Cel oceny","card.grade_goal.subtitle_overall":"Średnia ogólna","card.grade_goal.empty":"Brak ocen, na których można oprzeć cel","card.grade_goal.reached":"Cel osiągnięty 🎉","label.current":"Teraz","label.target":"Cel","label.to_go":"do celu","label.sixes_needed":"≈ jeszcze {n}× ocena maksymalna","card.bell_schedule.title":"Plan dnia","card.bell_schedule.empty":"Brak rozkładu dzwonków — wymaga ha-librus-synergia z atrybutem bell_schedule","label.lesson_short":"L{n}","label.after_school":"Lekcje na dziś zakończone","editor.hide_room":"Ukryj salę","editor.only_tomorrow":"Tylko następny dzień nauki","editor.student_name":"Imię dla: {device} (opcjonalnie)","card.first_lesson.title":"Pierwsza lekcja","card.first_lesson.today":"Dziś","card.first_lesson.tomorrow":"Jutro","card.first_lesson.earliest_today":"Najwcześniej dziś: {who}","card.first_lesson.earliest_tomorrow":"Najwcześniej jutro: {who}","card.first_lesson.earliest_on":"Najwcześniej ({day}): {who}","card.first_lesson.free":"wolne","card.first_lesson.no_data":"brak planu","card.first_lesson.first_canceled":"pierwsza lekcja odwołana","card.first_lesson.first_n_canceled":"pierwsze lekcje odwołane ({n})","card.first_lesson.substitution":"zastępstwo","card.first_lesson.empty":"Brak lekcji dziś i w następny dzień nauki","card.tomorrow.title":"Jutro","card.tomorrow.title_next_school_day":"Następny dzień nauki","card.tomorrow.empty":"Nic zaplanowanego na następny dzień nauki","card.tomorrow.lessons":"lekcji","card.tomorrow.starts":"Początek","card.tomorrow.ends":"Koniec","card.tomorrow.homework":"Zadania na termin: {n}","card.grade_simulator.subtitle":"A gdyby… (szacunkowo)","card.grade_simulator.empty":"Wybierz przedmiot, który ma oceny","label.weight":"Waga","card.homework_checklist.title":"Zadania do odhaczenia","card.homework_checklist.progress":"{done}/{total} zrobione","card.semester_comparison.title":"Porównanie semestrów","card.semester_comparison.subtitle":"Semestr 1 vs 2, wg przedmiotu","card.semester_comparison.empty":"Brak średnich semestralnych","card.semester_comparison.s1":"Sem 1","card.semester_comparison.s2":"Sem 2","editor.mode":"Tryb","mode.archetype":"Archetyp","mode.hero":"Bohater","card.hero.title_archetype":"Twój archetyp","card.hero.title_hero":"Twój bohater","card.hero.subtitle":"na podstawie danych z Librusa","card.hero.empty":"Za mało danych, żeby coś obliczyć","hero.chip.avg_naukowiec":"śr. ścisłych {n}","hero.chip.avg_humanista":"śr. humanist. {n}","hero.chip.avg_poliglota":"śr. języków {n}","hero.chip.avg_artysta":"śr. artyst. {n}","hero.chip.avg_sportowiec":"śr. WF {n}","hero.chip.grades":"{n} ocen","hero.chip.streak_days":"passa {n} dni","hero.chip.unexcused":"{n} nieuspr.","hero.chip.good_streak":"passa {n} ocen","hero.chip.overall_avg":"śr. {n}","hero.chip.overall_avg_full":"śr. ogólna {n}","hero.chip.semester1":"sem. 1: {n}","hero.chip.semester2":"sem. 2: {n}","hero.chip.behaviour":"zachowanie {name}","hero.chip.positive_notes":"uwagi +{n}","hero.chip.badges":"odznaki {n}","hero.chip.various_categories":"różne kategorie","hero.chip.subjects_count":"{n} przedm.","hero.chip.spread":"rozrzut {n}","hero.naukowiec.archetype_name":"Naukowiec","hero.naukowiec.hero_name":"Archimag","hero.naukowiec.archetype_desc":"Matematyka, fizyka i informatyka biją resztę przedmiotów na głowę.","hero.naukowiec.hero_desc":"Władasz magią liczb - zaklęcia to wzory, różdżka to kalkulator.","hero.humanista.archetype_name":"Humanista","hero.humanista.hero_name":"Bard","hero.humanista.archetype_desc":"Polski i historia to przedmioty, w których błyszczysz najbardziej.","hero.humanista.hero_desc":"Słowo to Twoja broń - opowieścią przekonasz każdego wokół siebie.","hero.poliglota.archetype_name":"Poliglota","hero.poliglota.hero_name":"Tłumacz","hero.poliglota.archetype_desc":"Angielski i niemiecki wyraźnie górują nad resztą przedmiotów.","hero.poliglota.hero_desc":"Znasz więcej języków niż większość dorosłych w Twoim otoczeniu.","hero.artysta.archetype_name":"Artysta","hero.artysta.hero_name":"Iluzjonista","hero.artysta.archetype_desc":"Plastyka i muzyka to obszary, w których jesteś najmocniejszy.","hero.artysta.hero_desc":"Tworzysz światy, które inni potrafią sobie jedynie wyobrazić.","hero.sportowiec.archetype_name":"Sportowiec","hero.sportowiec.hero_name":"Herold Areny","hero.sportowiec.archetype_desc":"Wychowanie fizyczne to zdecydowanie Twoja najmocniejsza strona.","hero.sportowiec.hero_desc":"Siła i wytrwałość - na boisku nikt Ci dziś nie dorównuje.","hero.wojownik.archetype_name":"Wojownik Frekwencji","hero.wojownik.hero_name":"Niezłomny","hero.wojownik.archetype_desc":"Długa passa obecności i zero nieusprawiedliwionych nieobecności.","hero.wojownik.hero_desc":"Stajesz na posterunku każdego dnia, bez wyjątku i bez wymówek.","hero.meteor.archetype_name":"Meteor","hero.meteor.hero_name":"Meteor","hero.meteor.archetype_desc":"Passa dobrych ocen ciągnie się przez ostatnie kilkanaście wpisów.","hero.meteor.hero_desc":"Pędzisz przez semestr, zostawiając za sobą świetlisty ślad ocen.","hero.feniks.archetype_name":"Feniks","hero.feniks.hero_name":"Feniks","hero.feniks.archetype_desc":"Średnia w tym semestrze rośnie wyraźnie względem poprzedniego.","hero.feniks.hero_desc":"Powstajesz z popiołów słabszego startu, silniejszy niż wcześniej.","hero.spolecznik.archetype_name":"Społecznik","hero.spolecznik.hero_name":"Uzdrowiciel","hero.spolecznik.archetype_desc":"Wzorowa ocena zachowania i same pozytywne uwagi nauczycieli.","hero.spolecznik.hero_desc":"Twoja obecność koi nastroje i łagodzi spory całej klasy.","hero.kolekcjoner.archetype_name":"Kolekcjoner","hero.kolekcjoner.hero_name":"Łowca Trofeów","hero.kolekcjoner.archetype_desc":"Najwięcej odblokowanych odznak spośród wszystkich kategorii.","hero.kolekcjoner.hero_desc":"Twoja gablota z trofeami pęka w szwach od zdobytych osiągnięć.","hero.prymus.archetype_name":"Prymus","hero.prymus.hero_name":"Legenda","hero.prymus.archetype_desc":"Wysoka średnia utrzymuje się równo we wszystkich przedmiotach.","hero.prymus.hero_desc":"O Twoich wynikach będą opowiadać jeszcze długo po Twoim odejściu.","hero.wszechstronny.archetype_name":"Wszechstronny Talent","hero.wszechstronny.hero_name":"Awatar Równowagi","hero.wszechstronny.archetype_desc":"Żaden przedmiot nie dominuje - oceny wyrównane na całej linii.","hero.wszechstronny.hero_desc":"Władasz każdym żywiołem po trosze - nic Cię dziś nie zaskoczy.","card.hero_stats.title":"Statystyki bohatera","card.hero_stats.subtitle":"Twoja karta postaci","card.hero_stats.empty":"Za mało danych na statystyki","card.hero_stats.power":"Moc","hero_stat.sila":"Siła","hero_stat.intelekt":"Intelekt","hero_stat.wiedza":"Wiedza","hero_stat.charyzma":"Charyzma","hero_stat.wytrwalosc":"Wytrwałość","hero_stat.szczescie":"Szczęście","card.hero_history.title":"Historia bohatera","card.hero_history.subtitle":"jak zmieniał się Twój wynik","card.hero_history.empty":"Brak historii jeszcze - pojawi się, gdy wynik się zmieni","card.hero_history.current":"obecnie ({n} dni)","card.last_update.subtitle":"Ostatnia aktualizacja danych","label.just_now":"Przed chwilą","label.minutes_ago":"{minutes} min temu","label.hours_ago":"{hours} godz. temu","label.days_ago":"{days} dni temu"}};function ze(e,t,a){let i=function(e){const t=e?.language??"en",a=t.split("-")[0]?.toLowerCase();return $e[a]??xe}(e)[t]??xe[t];if(a)for(const[e,t]of Object.entries(a))i=i.replace(`{${e}}`,String(t));return i}function je(e,t){const a=Math.max(0,Math.round(t));if(a<60)return ze(e,"label.in_minutes",{minutes:a});if(a<1440){const t=Math.floor(a/60),i=a%60;return 0===i?ze(e,"label.in_hours",{hours:t}):ze(e,"label.in_hours_minutes",{hours:t,minutes:i})}const i=Math.floor(a/1440),s=Math.floor(a%1440/60);return 0===s?ze(e,"label.in_days",{days:i}):ze(e,"label.in_days_hours",{days:i,hours:s})}var Ce;const Se=[{kind:"text",key:"icon",label:"editor.icon"},{kind:"boolean",key:"hide_header",label:"editor.hide_header"},{kind:"boolean",key:"compact",label:"editor.compact"}],De=[{value:"archetype",label:"mode.archetype"},{value:"hero",label:"mode.hero"}],Te={kind:"text",key:"category_filter",label:"editor.category_filter"},Ie={kind:"select",key:"sort",label:"editor.sort",options:[{value:"newest",label:"sort.newest"},{value:"oldest",label:"sort.oldest"}]},Ee={kind:"number",key:"days",label:"editor.days_back",min:7,max:365},Ae={kind:"text",key:"title",label:"editor.title"},Ne=e=>({kind:"number",key:"max_items",label:"editor.max_items",min:1,max:e}),Me={"custom:librus-grade-log-card":[Ae,Ne(100),Te,Ee,Ie],"custom:librus-recent-activity-card":[Ae,Ne(50)],"custom:librus-subject-attendance-card":[Ae],"custom:librus-homework-checklist-card":[Ae,Ne(30)],"custom:librus-announcements-card":[Ae,Ne(20)],"custom:librus-agenda-card":[Ae,{kind:"number",key:"days_ahead",label:"editor.days_ahead",min:1,max:60}],"custom:librus-messages-card":[Ae,{kind:"select",key:"mailbox",label:"editor.mailbox",options:[{value:"inbox",label:"mailbox.inbox"},{value:"substitutions",label:"mailbox.substitutions"},{value:"alerts",label:"mailbox.alerts"},{value:"justifications",label:"mailbox.justifications"}]},Ne(20)],"custom:librus-grade-trend-card":[{kind:"subject"},{kind:"number",key:"days",label:"editor.days_back",min:7,max:180},Ae],"custom:librus-subject-grades-card":[{kind:"subject"},Ne(100),Te,Ee,Ie],"custom:librus-grade-goal-card":[{kind:"subject"},{kind:"number",key:"target",label:"editor.target",min:1,max:6,float:!0},Ae],"custom:librus-bell-schedule-card":[Ae],"custom:librus-tomorrow-card":[Ae],"custom:librus-first-lesson-card":[Ae,{kind:"boolean",key:"hide_room",label:"editor.hide_room"},{kind:"boolean",key:"only_tomorrow",label:"editor.only_tomorrow"},{kind:"names"}],"custom:librus-grade-simulator-card":[{kind:"subject"}],"custom:librus-semester-comparison-card":[Ae],"custom:librus-week-timetable-card":[{kind:"boolean",key:"show_saturday",label:"editor.show_saturday"}],"custom:librus-subject-time-card":[{kind:"boolean",key:"show_saturday",label:"editor.show_saturday"}],"custom:librus-exam-countdown-card":[Ae,{kind:"text",key:"exam_keywords",label:"editor.exam_keywords"}],"custom:librus-hero-card":[Ae,{kind:"select",key:"mode",label:"editor.mode",options:De}],"custom:librus-hero-history-card":[Ae,{kind:"select",key:"mode",label:"editor.mode",options:De}],"custom:librus-achievements-card":[Ae],"custom:librus-hero-stats-card":[Ae],"custom:librus-level-card":[Ae],"custom:librus-rank-card":[Ae],"custom:librus-teachers-card":[Ae],"custom:librus-ai-summary-card":[Ae,{kind:"boolean",key:"summary_only",label:"editor.summary_only"},{kind:"boolean",key:"hide_generate",label:"editor.hide_generate"}]};function Le(){return document.createElement("librus-card-editor")}let Pe=Ce=class extends de{setConfig(e){this._config=e}get _fields(){return this._config&&Me[this._config.type]||[]}render(){if(!this.hass||!this._config)return q;const e=this.hass,t=this._config,a=ye(e),i=this._fields,s=i.some(e=>"subject"===e.kind);let r;try{r=fe(e,t.device_id)}catch{r=void 0}const n=s&&r?ke(e,r,"subject_average"):[];return W`
      <div class="form">
        ${a.length>1&&!i.some(e=>"names"===e.kind)?W`
              <ha-select
                label=${ze(e,"editor.student")}
                .value=${t.device_id??""}
                .options=${a.map(t=>{const a=e.devices?.[t];return{value:t,label:a?.name_by_user||a?.name||t}})}
                naturalMenuWidth
                fixedMenuPosition
                @selected=${e=>this._pickDevice(e)}
                @closed=${e=>{e.stopPropagation(),this._pickDevice(e)}}
              >
                ${a.map(t=>{const a=e.devices?.[t];return W`<ha-list-item .value=${t}>${a?.name_by_user||a?.name||t}</ha-list-item>`})}
              </ha-select>
            `:q}
        ${s?W`
              <ha-select
                label=${ze(e,"editor.subject")}
                .value=${void 0!==t.subject_id?String(t.subject_id):""}
                .options=${[{value:"",label:ze(e,"editor.subject_auto")},...n.filter(e=>void 0!==e.subjectId).map(e=>({value:String(e.subjectId),label:e.subject}))]}
                naturalMenuWidth
                fixedMenuPosition
                @selected=${e=>this._pickSubject(e)}
                @closed=${e=>{e.stopPropagation(),this._pickSubject(e)}}
              >
                <ha-list-item .value=${""}>${ze(e,"editor.subject_auto")}</ha-list-item>
                ${n.map(e=>void 0!==e.subjectId?W`<ha-list-item .value=${String(e.subjectId)}>${e.subject}</ha-list-item>`:q)}
              </ha-select>
            `:q}
        ${i.map(e=>this._renderField(e))}
        <hr class="sep" />
        ${Se.map(e=>this._renderField(e))}
      </div>
    `}_renderField(e){if("subject"===e.kind)return q;const t=this.hass,a=this._config;return"names"===e.kind?W`${ye(t).map(e=>{const i=t.devices?.[e];return W`
          <ha-textfield
            label=${ze(t,"editor.student_name",{device:i?.name_by_user||i?.name||e})}
            .value=${a.names?.[e]??""}
            @change=${t=>this._onName(e,t.target.value)}
          ></ha-textfield>
        `})}`:"text"===e.kind?W`
        <ha-textfield
          label=${ze(t,e.label)}
          .value=${a[e.key]??""}
          @change=${t=>this._onText(e.key,t.target.value)}
        ></ha-textfield>
      `:"boolean"===e.kind?W`
        <ha-formfield label=${ze(t,e.label)}>
          <ha-switch
            .checked=${Boolean(a[e.key])}
            @change=${t=>this._patch({[e.key]:t.target.checked||void 0})}
          ></ha-switch>
        </ha-formfield>
      `:"number"===e.kind?W`
        <ha-textfield
          type="number"
          no-spinner
          label=${ze(t,e.label)}
          min=${e.min}
          max=${e.max}
          step=${e.float?"0.05":"1"}
          .value=${void 0!==a[e.key]?String(a[e.key]):""}
          @change=${t=>this._onNumber(e,t.target.value)}
        ></ha-textfield>
      `:W`
      <ha-select
        label=${ze(t,e.label)}
        .value=${a[e.key]??e.options[0].value}
        .options=${e.options.map(e=>({value:e.value,label:ze(t,e.label)}))}
        naturalMenuWidth
        fixedMenuPosition
        @selected=${t=>this._pickSelect(e,t)}
        @closed=${t=>{t.stopPropagation(),this._pickSelect(e,t)}}
      >
        ${e.options.map(e=>W`<ha-list-item .value=${e.value}>${ze(t,e.label)}</ha-list-item>`)}
      </ha-select>
    `}static _selectValue(e){const t=e.detail;if(t&&void 0!==t.value)return String(t.value);const a=e.currentTarget;return a?.value??""}_pickDevice(e){const t=Ce._selectValue(e);t&&t!==this._config?.device_id&&this._patch({device_id:t})}_pickSubject(e){const t=Ce._selectValue(e),a=""===t?void 0:Number(t);a!==this._config?.subject_id&&this._patch({subject_id:Number.isNaN(a)?void 0:a})}_pickSelect(e,t){const a=Ce._selectValue(t);if(!a)return;a!==(this._config?.[e.key]??e.options[0].value)&&this._patch({[e.key]:a===e.options[0].value?void 0:a})}_onName(e,t){const a={...this._config?.names??{}};t.trim()?a[e]=t.trim():delete a[e],this._patch({names:Object.keys(a).length?a:void 0})}_onText(e,t){this._patch({[e]:t.trim()||void 0})}_onNumber(e,t){const a=e.float?Number.parseFloat(t):Number.parseInt(t,10);if(Number.isNaN(a))return void this._patch({[e.key]:void 0});const i=Math.min(e.max,Math.max(e.min,a));this._patch({[e.key]:e.float?Math.round(100*i)/100:i})}_patch(e){if(!this._config)return;const t={...this._config,...e};for(const[a,i]of Object.entries(e))void 0===i&&delete t[a];this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t},bubbles:!0,composed:!0}))}};Pe.styles=n`
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
  `,e([ge({attribute:!1})],Pe.prototype,"hass",void 0),e([me()],Pe.prototype,"_config",void 0),Pe=Ce=e([he("librus-card-editor")],Pe);class Be extends de{constructor(){super(...arguments),this._fetchGeneration=0}_beginFetch(){return++this._fetchGeneration}_isCurrentFetch(e){return e===this._fetchGeneration}_resolveAllByTranslationKey(e,t){if(!this.hass)return[];let a=this._subjectsCache;a&&a.entities===this.hass.entities&&a.deviceId===e||(a={entities:this.hass.entities,deviceId:e,byKey:new Map},this._subjectsCache=a);let i=a.byKey.get(t);return i||(i=ke(this.hass,e,t),a.byKey.set(t,i)),i}get _cardConfig(){return this._config}_syncTheme(){this.classList.toggle("dark",Boolean(this.hass?.themes?.darkMode));const e=this._cardConfig;this.classList.toggle("compact",Boolean(e?.compact)),this.classList.toggle("hide-header",Boolean(e?.hide_header))}updated(e){super.updated(e);const t=this._cardConfig?.icon;if(!t)return;const a=this.renderRoot.querySelector(".icon-badge ha-icon");a&&a.getAttribute("icon")!==t&&a.setAttribute("icon",t)}_resolveEntities(){if(!this.hass)return{error:this._message("mdi:alert-circle-outline",ze(this.hass,"empty.loading"))};const e=this._resolvedCache;if(e&&e.entities===this.hass.entities&&e.configuredDeviceId===this._configuredDeviceId)return e.result;let t;try{const e=fe(this.hass,this._configuredDeviceId);t={deviceId:e,map:we(this.hass,e)}}catch(e){t={error:this._message("mdi:alert-circle-outline",this._configErrorMessage(e))}}return this._resolvedCache={entities:this.hass.entities,configuredDeviceId:this._configuredDeviceId,result:t},t}_configErrorMessage(e){return e instanceof _e?"device_missing"===e.code?ze(this.hass,"error.device_missing",{device:e.deviceId??""}):"multiple_devices"===e.code?ze(this.hass,"error.multiple_devices"):ze(this.hass,"error.no_device"):ze(this.hass,"empty.generic_error")}_message(e,t,a){return W`
      <ha-card class="static">
        <div class="empty">
          <ha-icon .icon=${e}></ha-icon>
          <div class="t1">${t}</div>
          ${a?W`<div class="t2">${a}</div>`:q}
        </div>
      </ha-card>
    `}}e([ge({attribute:!1})],Be.prototype,"hass",void 0);const Fe=n`
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
`,Oe=n`
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
`;function Ke(e){const t=Math.max(1,...e.map(e=>e.value));return W`
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
  `}function Ue(e,t,a=64,i=6){const s=Math.max(0,Math.min(100,e)),r=(a-i)/2,n=2*Math.PI*r,o=a/2;return W`
    <svg width=${a} height=${a} viewBox="0 0 ${a} ${a}" class="ring">
      <circle
        cx=${o}
        cy=${o}
        r=${r}
        fill="none"
        stroke="var(--lc-ring-track)"
        stroke-width=${i}
      ></circle>
      <circle
        cx=${o}
        cy=${o}
        r=${r}
        fill="none"
        stroke=${t}
        stroke-width=${i}
        stroke-linecap="round"
        stroke-dasharray=${n}
        stroke-dashoffset=${n-s/100*n}
        transform="rotate(-90 ${o} ${o})"
      ></circle>
    </svg>
  `}let He=class extends Be{static getConfigElement(){return Le()}static getStubConfig(){return{type:"custom:librus-grades-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 3}render(){if(!this._config||!this.hass)return q;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{deviceId:t,map:a}=e,i=this.hass,s=a.overall_average?i.states[a.overall_average]:void 0,r=this._resolveAllByTranslationKey(t,"subject_average").map(e=>({...e,state:i.states[e.entityId]})).filter(e=>e.state&&!be.has(e.state.state));if((!s||be.has(s.state))&&0===r.length)return this._message("mdi:school-outline",ze(i,"card.grades.empty"));const n=s&&!be.has(s.state)?Number(s.state):void 0,o=r.length?Math.max(...r.map(e=>Number(e.state.state))):6;return W`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:school-outline"></ha-icon></div>
          <div class="title-block">
            <div class="title">${ze(i,"card.grades.title")}</div>
            <div class="subtitle">${ze(i,"card.grades.subtitle")}</div>
          </div>
        </div>

        ${void 0!==n?W`
              <div class="ring-row">
                ${Ue(n/6*100,"var(--lc-brand)",68,7)}
                <div>
                  <div class="ring-num">${n.toLocaleString(i.language,{maximumFractionDigits:2})}</div>
                  <div class="ring-label">${ze(i,"card.grades.subtitle")}</div>
                </div>
              </div>
            `:q}
        ${r.length?W`
              <div class="sub-list">
                ${r.map(e=>{const t=Number(e.state.state);return W`
                    <div class="sub-row">
                      <span class="name" title=${e.subject}>${e.subject}</span>
                      <span class="bar"
                        ><span
                          style="width:${Math.min(100,t/o*100)}%"
                        ></span
                      ></span>
                      <span class="val">${t.toLocaleString(i.language,{maximumFractionDigits:2})}</span>
                    </div>
                  `})}
              </div>
            `:q}
      </ha-card>
    `}};function We(e){const t=new Date(e);return Number.isNaN(t.getTime())?"":t.toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"})}function Re(e,t){const a=new Date(`${e.slice(0,10)}T00:00:00`);return Number.isNaN(a.getTime())?e:a.toLocaleDateString(t,{day:"numeric",month:"short"})}function Ge(e,t){const a=Date.UTC(e.getFullYear(),e.getMonth(),e.getDate()),i=Date.UTC(t.getFullYear(),t.getMonth(),t.getDate());return Math.round((i-a)/864e5)}function qe(e,t){return Math.max(0,Math.floor((e.getTime()-t.getTime())/6e4))}function Je(e){if(null==e)return null;const t=Number(e);return Number.isFinite(t)?t:null}He.styles=[Fe,Oe,n`
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
    `],e([me()],He.prototype,"_config",void 0),He=e([he("librus-grades-card")],He);const Ze=/^\[([^\]]+)\]\s*/;function Ve(e){const t=Ze.exec(e);return t?{category:t[1],text:e.slice(t[0].length)}:{category:null,text:e}}function Ye(e){return"string"==typeof e?{value:e,allDay:e.length<=10}:e.date?{value:e.date,allDay:!0}:{value:e.dateTime??"",allDay:!1}}async function Xe(e,t,a,i){const s=`calendars/${t}?start=${encodeURIComponent(a.toISOString())}&end=${encodeURIComponent(i.toISOString())}`,r=await e.callApi("GET",s);return Array.isArray(r)?r.map(e=>{const t=Ye(e.start),a=Ye(e.end);return{start:t.value,end:a.value,allDay:t.allDay,summary:e.summary??"",description:e.description,location:e.location}}):[]}function Qe(e,t){if(e.allDay)return!1;const a=new Date(e.start).getTime(),i=new Date(e.end).getTime(),s=t.getTime();return s>=a&&s<i}function et(e,t){return(e.allDay?new Date(`${e.end}T23:59:59`):new Date(e.end)).getTime()<t.getTime()}function tt(e){return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`}function at(e){const t=e.getDay();return 0===t?7:t}function it(e){const t=new Date(e);return t.setDate(t.getDate()-(at(e)-1)),t.setHours(0,0,0,0),t}function st(e){const t=new Date(e),a=at(e),i=a>=6?8-a:1-a;return t.setDate(t.getDate()+i),t.setHours(0,0,0,0),t}function rt(e,t){let a=e;const i=(t.category_filter??"").split(",").map(e=>e.trim().toLowerCase()).filter(Boolean);if(i.length&&(a=a.filter(e=>{const t=(e.category??"").toLowerCase();return i.some(e=>t.includes(e))})),t.days){const e=new Date;e.setHours(0,0,0,0),e.setDate(e.getDate()-t.days);const i=tt(e);a=a.filter(e=>!e.date||e.date>=i)}const s=[...a].sort((e,t)=>(e.date??"").localeCompare(t.date??""));return"oldest"===t.sort?s:s.reverse()}let nt=class extends Be{static getConfigElement(){return Le()}static getStubConfig(){return{type:"custom:librus-grade-log-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 4}render(){if(!this._config||!this.hass)return q;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{deviceId:t}=e,a=this.hass,i=[];for(const e of this._resolveAllByTranslationKey(t,"subject_average")){const t=a.states[e.entityId]?.attributes.grades??[];for(const a of t)i.push({...a,subject:e.subject})}if(0===i.length)return this._message("mdi:notebook-multiple",ze(a,"card.grades.empty"));const s=rt(i,this._config);if(0===s.length)return this._message("mdi:notebook-multiple",ze(a,"card.grade_log.empty_filtered"));const r=this._config.max_items??25;return W`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:notebook-multiple"></ha-icon></div>
          <div class="title-block">
            <div class="title">${this._config.title??ze(a,"card.grade_log.title")}</div>
            <div class="subtitle">${ze(a,"card.grade_log.subtitle")}</div>
          </div>
        </div>
        <div class="scroll-list">
          ${s.slice(0,r).map(e=>W`
              <div class="list-item">
                <div class="grade-chip ${e.improved?"improved":""}">${e.value}</div>
                <div class="body">
                  <div class="row1">
                    <span>${e.subject}${e.category?W` · <span class="cat-label">${e.category}</span>`:q}${e.improves?W` · <span class="fix-label">${ze(a,"label.grade_improves",{value:e.improves})}</span>`:q}</span>
                    ${e.date?W`<time>${Re(e.date,a.language)}</time>`:q}
                  </div>
                  ${e.comments.length?W`<div class="quote">${e.comments.join(" · ")}</div>`:q}
                </div>
              </div>
            `)}
        </div>
      </ha-card>
    `}};nt.styles=[Fe,Oe,n`
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
    `],e([me()],nt.prototype,"_config",void 0),nt=e([he("librus-grade-log-card")],nt);let ot=class extends Be{static getConfigElement(){return Le()}static getStubConfig(){return{type:"custom:librus-subject-grades-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 3}render(){if(!this._config||!this.hass)return q;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{deviceId:t}=e,a=this.hass,i=this._resolveAllByTranslationKey(t,"subject_average"),s=void 0!==this._config.subject_id?i.find(e=>e.subjectId===this._config.subject_id):i[0];if(!s)return this._message("mdi:notebook-outline",ze(a,"card.grades.empty"));const r=a.states[s.entityId],n=r?.attributes.grades??[];if(0===n.length)return this._message("mdi:notebook-outline",ze(a,"card.grades.empty"));const o=rt(n,this._config);if(0===o.length)return this._message("mdi:notebook-outline",ze(a,"card.grade_log.empty_filtered"));const c=this._config.max_items,d=c?o.slice(0,c):o;return W`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:notebook-outline"></ha-icon></div>
          <div class="title-block">
            <div class="title">${s.subject}</div>
            <div class="subtitle">${r.state}</div>
          </div>
        </div>
        <div class="scroll-list">
          ${d.map(e=>W`
              <div class="list-item">
                <div class="grade-chip ${e.improved?"improved":""}">${e.value}</div>
                <div class="body">
                  <div class="row1">
                    <span><span class="cat-label">${e.category??""}</span>${e.improves?W` · <span class="fix-label">${ze(a,"label.grade_improves",{value:e.improves})}</span>`:q}</span>
                    ${e.date?W`<time>${Re(e.date,a.language)}</time>`:q}
                  </div>
                  ${e.comments.length?W`<div class="quote">${e.comments.join(" · ")}</div>`:q}
                </div>
              </div>
            `)}
        </div>
      </ha-card>
    `}};ot.styles=[Fe,Oe,n`
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
    `],e([me()],ot.prototype,"_config",void 0),ot=e([he("librus-subject-grades-card")],ot);let ct=class extends Be{constructor(){super(...arguments),this._points=[]}static getConfigElement(){return Le()}static getStubConfig(){return{type:"custom:librus-grade-trend-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}get _historyDays(){return this._config?.days??60}getCardSize(){return 3}connectedCallback(){super.connectedCallback(),this._refreshTimer=setInterval(()=>{this._fetch(!0)},18e5)}disconnectedCallback(){super.disconnectedCallback(),clearInterval(this._refreshTimer)}_resolveEntityId(){if(!this.hass||!this._config)return;const e=this._resolveEntities();if("error"in e)return;const{deviceId:t,map:a}=e;if(void 0!==this._config.subject_id){const e=this._resolveAllByTranslationKey(t,"subject_average");return e.find(e=>e.subjectId===this._config.subject_id)?.entityId}return a.overall_average}async _fetch(e=!1){const t=this._resolveEntityId();if(!this.hass||!t)return;const a=new Date,i=new Date(a.getTime()-864e5*this._historyDays),s=`${t}:${a.toDateString()}:${this._historyDays}`;if(!e&&this._fetchedFor===s)return;this._fetchedFor=s;const r=this._beginFetch();try{const e=await async function(e,t,a,i){const s=`history/period/${encodeURIComponent(a.toISOString())}?filter_entity_id=${encodeURIComponent(t)}&end_time=${encodeURIComponent(i.toISOString())}`,r=await e.callApi("GET",s),n=r?.[0]??[],o=[];for(const e of n){const t=Number(e.state);if(!Number.isFinite(t))continue;const a=new Date(e.last_changed).getTime();if(Number.isNaN(a))continue;const i=o[o.length-1];i&&i.value===t||o.push({timestamp:a,value:t})}return o}(this.hass,t,i,a);this._isCurrentFetch(r)&&(this._points=e)}catch{this._isCurrentFetch(r)&&(this._points=[])}}render(){if(!this._config||!this.hass)return q;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const t=this.hass;this._fetch();const a=this._resolveEntityId(),i=void 0!==this._config.subject_id?this._resolveAllByTranslationKey(e.deviceId,"subject_average").find(e=>e.subjectId===this._config.subject_id)?.subject:void 0;if(!a||this._points.length<2)return this._message("mdi:chart-line",ze(t,"card.grade_trend.empty"));const s=this._points[0],r=this._points[this._points.length-1],n=Math.round(100*(r.value-s.value))/100,o=n>0?"mdi:trending-up":n<0?"mdi:trending-down":"mdi:trending-neutral",c=n>0?"good":n<0?"bad":"";return W`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:chart-line"></ha-icon></div>
          <div class="title-block">
            <div class="title">${this._config.title??i??ze(t,"card.grade_trend.title")}</div>
            <div class="subtitle">${ze(t,"card.grade_trend.subtitle",{days:this._historyDays})}</div>
          </div>
          <div class="trend ${c}">
            <ha-icon icon=${o}></ha-icon>
            <span>${n>0?"+":""}${n}</span>
          </div>
        </div>
        <div class="chart-row">
          <div class="current-value">${r.value.toFixed(2)}</div>
          ${function(e,t={}){const a=t.width??280,i=t.height??72,s=t.colorVar??"var(--lc-brand)";if(e.length<2)return W`<svg width=${a} height=${i} viewBox="0 0 ${a} ${i}" class="line-chart"></svg>`;const r=e.map(e=>e.timestamp),n=e.map(e=>e.value),o=Math.min(...r),c=Math.max(...r),d=t.min??Math.min(...n),l=t.max??Math.max(...n),h=c-o||1,u=l-d||1,p=e=>6+(e-o)/h*(a-12),g=e=>i-6-(e-d)/u*(i-12),m=e.map(e=>`${p(e.timestamp).toFixed(1)},${g(e.value).toFixed(1)}`).join(" "),v=e[0],b=e[e.length-1],_=`${p(v.timestamp).toFixed(1)},${(i-6).toFixed(1)} ${m} ${p(b.timestamp).toFixed(1)},${(i-6).toFixed(1)}`;return W`
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
    `}};var dt,lt;ct.styles=[Fe,Oe,n`
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
    `],e([me()],ct.prototype,"_config",void 0),e([me()],ct.prototype,"_points",void 0),ct=e([he("librus-grade-trend-card")],ct),function(e){e.language="language",e.system="system",e.comma_decimal="comma_decimal",e.decimal_comma="decimal_comma",e.space_comma="space_comma",e.none="none"}(dt||(dt={})),function(e){e.language="language",e.system="system",e.am_pm="12",e.twenty_four="24"}(lt||(lt={}));var ht=["closed","locked","off"],ut=function(e,t,a,i){i=i||{},a=null==a?{}:a;var s=new Event(t,{bubbles:void 0===i.bubbles||i.bubbles,cancelable:Boolean(i.cancelable),composed:void 0===i.composed||i.composed});return s.detail=a,e.dispatchEvent(s),s},pt=function(e){ut(window,"haptic",e)},gt=function(e,t,a,i){if(i||(i={action:"more-info"}),!i.confirmation||i.confirmation.exemptions&&i.confirmation.exemptions.some(function(e){return e.user===t.user.id})||(pt("warning"),confirm(i.confirmation.text||"Are you sure you want to "+i.action+"?")))switch(i.action){case"more-info":(a.entity||a.camera_image)&&ut(e,"hass-more-info",{entityId:a.entity?a.entity:a.camera_image});break;case"navigate":i.navigation_path&&function(e,t,a){void 0===a&&(a=!1),a?history.replaceState(null,"",t):history.pushState(null,"",t),ut(window,"location-changed",{replace:a})}(0,i.navigation_path);break;case"url":i.url_path&&window.open(i.url_path);break;case"toggle":a.entity&&(function(e,t){(function(e,t,a){void 0===a&&(a=!0);var i,s=function(e){return e.substr(0,e.indexOf("."))}(t),r="group"===s?"homeassistant":s;switch(s){case"lock":i=a?"unlock":"lock";break;case"cover":i=a?"open_cover":"close_cover";break;default:i=a?"turn_on":"turn_off"}e.callService(r,i,{entity_id:t})})(e,t,ht.includes(e.states[t].state))}(t,a.entity),pt("success"));break;case"call-service":if(!i.service)return void pt("failure");var s=i.service.split(".",2);t.callService(s[0],s[1],i.service_data,i.target),pt("success");break;case"fire-dom-event":ut(e,"ll-custom",i)}};function mt(e){return void 0!==e&&"none"!==e.action}function vt(e,t,a){if(t&&mt(t))return i=>{e.hass&&(i.stopPropagation(),function(e,t,a){var i;a.tap_action&&(i=a.tap_action),gt(e,t,a,i)}(e,e.hass,{tap_action:t,entity:a}))}}function bt(e){return mt(e)}let _t=class extends Be{static getConfigElement(){return Le()}static getStubConfig(){return{type:"custom:librus-grade-goal-card",target:4.5}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 2}render(){if(!this._config||!this.hass)return q;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{deviceId:t,map:a}=e,i=this.hass,s=this._resolveAllByTranslationKey(t,"subject_average"),r=void 0!==this._config.subject_id?s.find(e=>e.subjectId===this._config.subject_id):void 0,n=r?r.entityId:a.overall_average,o=n?i.states[n]:void 0,c=Number(o?.state);if(!o||Number.isNaN(c))return this._message("mdi:target",ze(i,"card.grade_goal.empty"));const d=this._config.target??4.5,l=r?Number(o.attributes.grade_count)||0:s.reduce((e,t)=>e+(i.states[t.entityId]?.attributes.grades?.length??0),0),h=c>=d,u=d<=1?h?100:0:Math.max(0,Math.min(100,(c-1)/(d-1)*100)),p=!h&&d<6&&l>0?Math.ceil(l*(d-c)/(6-d)):null;return W`
      <ha-card @click=${vt(this,this._config.tap_action,n)}>
        <div class="header">
          <div class="icon-badge ${h?"good":""}">
            <ha-icon icon=${h?"mdi:flag-checkered":"mdi:target"}></ha-icon>
          </div>
          <div class="title-block">
            <div class="title">${this._config.title??r?.subject??ze(i,"card.grade_goal.title")}</div>
            <div class="subtitle">
              ${ze(i,r?"card.grade_goal.title":"card.grade_goal.subtitle_overall")}
            </div>
          </div>
        </div>
        <div class="ring-row">
          ${Ue(Math.round(u),h?"var(--lc-good)":"var(--lc-brand)",68,7)}
          <div>
            <div class="ring-num">${c.toFixed(2)}</div>
            <div class="ring-label">${ze(i,"label.current")}</div>
          </div>
        </div>
        <hr />
        <div class="stats">
          <div class="stat">
            <div class="stat-value">${d.toFixed(2)}</div>
            <div class="stat-label">${ze(i,"label.target")}</div>
          </div>
          <div class="stat ${h?"good":""}">
            <div class="stat-value">
              ${h?ze(i,"card.grade_goal.reached"):null!==p?ze(i,"label.sixes_needed",{n:p}):"—"}
            </div>
            <div class="stat-label">${h||null===p?"":ze(i,"label.to_go")}</div>
          </div>
        </div>
      </ha-card>
    `}};_t.styles=[Fe,Oe,n`
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
    `],e([me()],_t.prototype,"_config",void 0),_t=e([he("librus-grade-goal-card")],_t);const yt=[1,2,3,4,5,6];let ft=class extends Be{constructor(){super(...arguments),this._grade=5,this._weight=1}static getConfigElement(){return Le()}static getStubConfig(){return{type:"custom:librus-grade-simulator-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 2}render(){if(!this._config||!this.hass)return q;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{deviceId:t}=e,a=this.hass,i=this._resolveAllByTranslationKey(t,"subject_average"),s=void 0!==this._config.subject_id?i.find(e=>e.subjectId===this._config.subject_id):i[0],r=s?a.states[s.entityId]:void 0,n=Number(r?.state),o=Number(r?.attributes.grade_count)||0;if(!s||Number.isNaN(n))return this._message("mdi:calculator-variant-outline",ze(a,"card.grade_simulator.empty"));const c=(n*o+this._grade*this._weight)/(o+this._weight),d=Math.round(100*(c-n))/100,l=d>0?"good":d<0?"bad":"";return W`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:calculator-variant-outline"></ha-icon></div>
          <div class="title-block">
            <div class="title">${s.subject}</div>
            <div class="subtitle">${ze(a,"card.grade_simulator.subtitle")}</div>
          </div>
        </div>
        <div class="projection">
          <span class="from">${n.toFixed(2)}</span>
          <ha-icon icon="mdi:arrow-right-thin"></ha-icon>
          <span class="to ${l}">${c.toFixed(2)}</span>
          ${0!==d?W`<span class="delta ${l}">${d>0?"+":""}${d}</span>`:q}
        </div>
        <div class="grade-row">
          ${yt.map(e=>W`
              <button
                class="gbtn ${e===this._grade?"active":""}"
                @click=${()=>{this._grade=e}}
              >
                ${e}
              </button>
            `)}
        </div>
        <div class="weight-row">
          <span class="wlabel">${ze(a,"label.weight")}</span>
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
    `}};ft.styles=[Fe,Oe,n`
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
    `],e([me()],ft.prototype,"_config",void 0),e([me()],ft.prototype,"_grade",void 0),e([me()],ft.prototype,"_weight",void 0),ft=e([he("librus-grade-simulator-card")],ft);let wt=class extends Be{static getConfigElement(){return Le()}static getStubConfig(){return{type:"custom:librus-semester-comparison-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 3}render(){if(!this._config||!this.hass)return q;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{deviceId:t}=e,a=this.hass,i=this._resolveAllByTranslationKey(t,"subject_average").map(e=>{const t=a.states[e.entityId]?.attributes??{};return{subject:e.subject,s1:Je(t.average_semester_1),s2:Je(t.average_semester_2)}}).filter(e=>null!==e.s1||null!==e.s2).sort((e,t)=>e.subject.localeCompare(t.subject));return 0===i.length?this._message("mdi:swap-horizontal",ze(a,"card.semester_comparison.empty")):W`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:swap-horizontal"></ha-icon></div>
          <div class="title-block">
            <div class="title">${this._config.title??ze(a,"card.semester_comparison.title")}</div>
            <div class="subtitle">${ze(a,"card.semester_comparison.subtitle")}</div>
          </div>
        </div>
        <div class="rows">
          <div class="row head">
            <span class="subj"></span>
            <span class="val">${ze(a,"card.semester_comparison.s1")}</span>
            <span class="val">${ze(a,"card.semester_comparison.s2")}</span>
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
    `}};wt.styles=[Fe,Oe,n`
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
    `],e([me()],wt.prototype,"_config",void 0),wt=e([he("librus-semester-comparison-card")],wt);const kt=["1","2","3","4","5","6"],xt={1:"var(--lc-bad)",2:"var(--lc-bad)",3:"var(--lc-warn)",4:"var(--lc-good)",5:"var(--lc-good)",6:"var(--lc-good)",other:"var(--lc-neutral-dot)"};let $t=class extends Be{static getConfigElement(){return Le()}static getStubConfig(){return{type:"custom:librus-grade-distribution-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 2}render(){if(!this._config||!this.hass)return q;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{deviceId:t}=e,a=this.hass,i={1:0,2:0,3:0,4:0,5:0,6:0,other:0};let s=0;for(const e of this._resolveAllByTranslationKey(t,"subject_average")){const t=a.states[e.entityId]?.attributes.grades??[];for(const e of t){const t=/^([1-6])/.exec(e.value.trim())?.[1];i[t??"other"]+=1,s+=1}}if(0===s)return this._message("mdi:chart-bar",ze(a,"card.grades.empty"));const r=Math.max(...Object.values(i),1),n=[...kt,"other"];return W`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:chart-bar"></ha-icon></div>
          <div class="title-block">
            <div class="title">${ze(a,"card.grade_distribution.title")}</div>
            <div class="subtitle">${ze(a,"card.grade_distribution.subtitle",{count:s})}</div>
          </div>
        </div>
        <div class="histogram">
          ${n.map(e=>{const t=i[e];return W`
              <div class="col">
                <div class="col-count">${t>0?t:""}</div>
                <div class="col-bar-track">
                  <div
                    class="col-bar"
                    style="height:${t/r*100}%;background:${xt[e]}"
                  ></div>
                </div>
                <div class="col-label">${"other"===e?ze(a,"card.grade_distribution.other"):e}</div>
              </div>
            `})}
        </div>
      </ha-card>
    `}};$t.styles=[Fe,Oe,n`
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
    `],e([me()],$t.prototype,"_config",void 0),$t=e([he("librus-grade-distribution-card")],$t);const zt={matematyka:"Mat",fizyka:"Fiz",chemia:"Chem",biologia:"Bio",geografia:"Geo",historia:"Hist",informatyka:"Inf",muzyka:"Muz",plastyka:"Plas",religia:"Rel",etyka:"Ety",technika:"Tech",przyroda:"Przy","wychowanie fizyczne":"WF","zajęcia z wychowawcą":"GW","godzina wychowawcza":"GW","edukacja dla bezpieczeństwa":"EDB","wiedza o społeczeństwie":"WOS"},jt={polski:"Pol",angielski:"Ang",niemiecki:"Niem",francuski:"Fra","hiszpański":"Hisz",rosyjski:"Ros","włoski":"Wł","łaciński":"Łac"},Ct=new Set(["z","i","w","o","dla","na","ze"]);function St(e){const t=e.replace(/\(.*\)/,"").trim(),a=t.toLowerCase();if(zt[a])return zt[a];const i=a.match(/^język\s+(\S+)/);if(i){const e=i[1];return jt[e]??e.charAt(0).toUpperCase()+e.slice(1,3)}const s=t.split(/\s+/).filter(e=>!Ct.has(e.toLowerCase()));return s.length>1?s.slice(0,3).map(e=>e.charAt(0).toUpperCase()).join(""):t.length<=4?t:t.slice(0,3)}let Dt=class extends Be{static getConfigElement(){return Le()}static getStubConfig(){return{type:"custom:librus-grades-radar-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 3}render(){if(!this._config||!this.hass)return q;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{deviceId:t}=e,a=this.hass,i=[];for(const e of this._resolveAllByTranslationKey(t,"subject_average")){const t=a.states[e.entityId]?.state,s=void 0!==t?Number(t):NaN;Number.isFinite(s)&&i.push({label:St(e.subject),title:e.subject,value:s})}if(i.length<3)return this._message("mdi:chart-timeline-variant",ze(a,"card.grades_radar.empty"));const s=i.reduce((e,t)=>e+t.value,0)/i.length;return W`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:chart-timeline-variant"></ha-icon></div>
          <div class="title-block">
            <div class="title">${ze(a,"card.grades_radar.title")}</div>
            <div class="subtitle">${ze(a,"card.grades_radar.subtitle")}</div>
          </div>
        </div>
        <div class="chart-wrap">${function(e,t={}){const a=t.width??220,i=t.height??200,s=t.max??6,r=t.colorVar??"var(--lc-brand)",n=t.ringCount??3,o=a/2,c=i/2-4,d=Math.min(a,i)/2-32,l=e.length;if(l<3)return W`<svg width=${a} height=${i} viewBox="0 0 ${a} ${i}" class="radar-chart"></svg>`;const h=e=>-Math.PI/2+2*e*Math.PI/l,u=(e,t)=>{const a=Math.max(0,Math.min(s,t))/s*d;return[o+a*Math.cos(h(e)),c+a*Math.sin(h(e))]},p=Array.from({length:n},(e,t)=>s*(t+1)/n),g=e.map((e,t)=>u(t,s)),m=e.map((e,t)=>u(t,e.value)),v=m.map(e=>e.join(",")).join(" ");return W`
    <svg width=${a} height=${i} viewBox="0 0 ${a} ${i}" class="radar-chart">
      ${p.map(t=>R`<polygon
            points=${e.map((e,a)=>u(a,t).join(",")).join(" ")}
            class="radar-grid"
          ></polygon>`)}
      ${g.map(([e,t])=>R`<line x1=${o} y1=${c} x2=${e} y2=${t} class="radar-axis"></line>`)}
      <polygon
        points=${v}
        fill=${r}
        fill-opacity="0.22"
        stroke=${r}
        stroke-width="2"
        stroke-linejoin="round"
      ></polygon>
      ${m.map(([e,t])=>R`<circle cx=${e} cy=${t} r="3.2" fill=${r}></circle>`)}
      ${e.map((e,t)=>{const[a,i]=u(t,1.18*s),r=Math.cos(h(t)),n=Math.abs(r)<.3?"middle":r>0?"start":"end";return R`<text x=${a} y=${i+3} text-anchor=${n} class="radar-label">${e.title?R`<title>${e.title}</title>`:""}${e.label}</text>`})}
    </svg>
  `}(i,{max:6})}</div>
        <div class="legend">
          <span class="legend-item">
            <span class="dot" style="background:var(--lc-brand)"></span>
            ${ze(a,"label.average")} <b>${s.toFixed(2)}</b>
          </span>
        </div>
      </ha-card>
    `}};Dt.styles=[Fe,Oe],e([me()],Dt.prototype,"_config",void 0),Dt=e([he("librus-grades-radar-card")],Dt);const Tt=Array.from({length:16},(e,t)=>`var(--lc-chart-${t+1})`);let It=class extends Be{static getConfigElement(){return Le()}static getStubConfig(){return{type:"custom:librus-grade-category-distribution-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 3}render(){if(!this._config||!this.hass)return q;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{deviceId:t}=e,a=this.hass,i=new Map;for(const e of this._resolveAllByTranslationKey(t,"subject_average")){const t=a.states[e.entityId]?.attributes.grades??[];for(const e of t){const t=e.category??"__uncategorized";i.set(t,(i.get(t)??0)+1)}}const s=[...i.values()].reduce((e,t)=>e+t,0);if(0===s)return this._message("mdi:chart-donut",ze(a,"card.grade_category_distribution.empty"));const r=[...i.entries()].sort((e,t)=>t[1]-e[1]).map(([e,t],i)=>({label:"__uncategorized"===e?ze(a,"card.grade_category_distribution.uncategorized"):e,value:t,colorVar:Tt[i%Tt.length]}));return W`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:chart-bar"></ha-icon></div>
          <div class="title-block">
            <div class="title">${ze(a,"card.grade_category_distribution.title")}</div>
            <div class="subtitle">${ze(a,"card.grade_category_distribution.subtitle")}</div>
          </div>
        </div>
        ${Ke(r)}
      </ha-card>
    `}};It.styles=[Fe,Oe],e([me()],It.prototype,"_config",void 0),It=e([he("librus-grade-category-distribution-card")],It);let Et=class extends Be{static getConfigElement(){return Le()}static getStubConfig(){return{type:"custom:librus-latest-grade-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 2}render(){if(!this._config||!this.hass)return q;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{deviceId:t}=e,a=this.hass,i=function(e,t){let a=null;for(const i of t){const t=e.states[i.entityId]?.attributes;t?.latest_grade&&t.latest_grade_date&&(!a||t.latest_grade_date>a.date)&&(a={subject:i.subject,grade:t.latest_grade,date:t.latest_grade_date,comments:t.latest_grade_comments??[]})}return a}(a,this._resolveAllByTranslationKey(t,"subject_average"));return i?W`
      <ha-card>
        <div class="header">
          <div class="icon-badge amber"><ha-icon icon="mdi:star-outline"></ha-icon></div>
          <div class="title-block">
            <div class="title">${ze(a,"card.latest_grade.title")}</div>
            <div class="subtitle">${i.subject} &middot; ${Re(i.date,a.language)}</div>
          </div>
          <div class="grade-badge">${i.grade}</div>
        </div>
        ${i.comments.length?W`
              <hr />
              ${i.comments.map(e=>W`<div class="quote">${e}</div>`)}
            `:q}
      </ha-card>
    `:this._message("mdi:star-outline",ze(a,"card.latest_grade.empty"))}};Et.styles=[Fe,Oe,n`
      .grade-badge {
        font-size: 1.5rem;
        font-weight: 800;
        color: var(--lc-brand);
        flex: none;
      }
    `],e([me()],Et.prototype,"_config",void 0),Et=e([he("librus-latest-grade-card")],Et);let At=class extends Be{static getConfigElement(){return Le()}static getStubConfig(){return{type:"custom:librus-behaviour-grade-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 2}render(){if(!this._config||!this.hass)return q;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{map:t}=e,a=this.hass,i=t.behaviour_grade?a.states[t.behaviour_grade]:void 0,s=(i?.attributes.recent??[])[0];if(!s)return this._message("mdi:medal-outline",ze(a,"card.behaviour_grade.empty"));const r=s.grade||s.short_name,n=!s.name&&s.value?s.value:null,o=(s.comments??[]).map(e=>e.trim()).filter(Boolean);return W`
      <ha-card>
        <div class="header">
          <div class="icon-badge good"><ha-icon icon="mdi:medal-outline"></ha-icon></div>
          <div class="title-block">
            <div class="title">${ze(a,"card.behaviour_grade.title")}</div>
            <div class="subtitle">${s.category??ze(a,"card.behaviour_grade.subtitle")}</div>
          </div>
          ${r?W`<div class="grade-badge">${r}</div>`:q}
        </div>
        ${s.name?W`<div class="grade-name">${s.name}</div>`:q}
        ${null!==n?W`<div class="stats"><div class="stat good"><div class="stat-value">${n>0?"+":""}${n}</div><div class="stat-label">pkt</div></div></div>`:q}
        ${s.text?W`<div class="quote">${s.text}</div>`:q}
        ${o.length?W`<div class="comment">${o.join(" · ")}</div>`:q}
      </ha-card>
    `}};At.styles=[Fe,Oe,n`
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
    `],e([me()],At.prototype,"_config",void 0),At=e([he("librus-behaviour-grade-card")],At);let Nt=class extends Be{static getConfigElement(){return Le()}static getStubConfig(){return{type:"custom:librus-descriptive-grades-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 2}render(){if(!this._config||!this.hass)return q;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{map:t}=e,a=this.hass,i=t.descriptive_grades?a.states[t.descriptive_grades]:void 0,s=i?.attributes.recent??[];return i&&0!==s.length?W`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:text-box-outline"></ha-icon></div>
          <div class="title-block">
            <div class="title">${ze(a,"card.descriptive_grades.title")}</div>
            <div class="subtitle">${ze(a,"card.descriptive_grades.subtitle")}</div>
          </div>
        </div>
        <div class="scroll-list">
          ${s.map(e=>W`
              <div class="list-item">
                <span class="dot neutral"></span>
                <div class="body">
                  <div class="row1">
                    <span>${e.subject??""}</span>
                    ${e.date?W`<time>${Re(e.date,a.language)}</time>`:q}
                  </div>
                  <div class="item-text">${e.value}</div>
                </div>
              </div>
            `)}
        </div>
      </ha-card>
    `:this._message("mdi:text-box-outline",ze(a,"card.descriptive_grades.empty"))}};Nt.styles=[Fe,Oe],e([me()],Nt.prototype,"_config",void 0),Nt=e([he("librus-descriptive-grades-card")],Nt);let Mt=class extends Be{static getConfigElement(){return Le()}static getStubConfig(){return{type:"custom:librus-subject-spotlight-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 2}render(){if(!this._config||!this.hass)return q;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{deviceId:t}=e,a=this.hass,i=this._resolveAllByTranslationKey(t,"subject_average").map(e=>({subject:e.subject,state:a.states[e.entityId]})).filter(e=>e.state&&!be.has(e.state.state)).map(e=>({subject:e.subject,value:Number(e.state.state)})).filter(e=>!Number.isNaN(e.value));if(i.length<2)return this._message("mdi:podium-gold",ze(a,"card.subject_spotlight.empty"));const s=i.reduce((e,t)=>t.value>e.value?t:e),r=i.reduce((e,t)=>t.value<e.value?t:e),n=e=>e.toLocaleString(a.language,{maximumFractionDigits:2});return W`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:podium-gold"></ha-icon></div>
          <div class="title-block">
            <div class="title">${ze(a,"card.subject_spotlight.title")}</div>
            <div class="subtitle">${ze(a,"card.subject_spotlight.subtitle")}</div>
          </div>
        </div>
        <div class="spotlight-row">
          <div class="spotlight-tile good">
            <ha-icon icon="mdi:trophy-outline"></ha-icon>
            <div class="spotlight-value">${n(s.value)}</div>
            <div class="spotlight-subject">${s.subject}</div>
            <div class="spotlight-label">${ze(a,"card.subject_spotlight.best")}</div>
          </div>
          <div class="spotlight-tile warn">
            <ha-icon icon="mdi:book-open-page-variant-outline"></ha-icon>
            <div class="spotlight-value">${n(r.value)}</div>
            <div class="spotlight-subject">${r.subject}</div>
            <div class="spotlight-label">${ze(a,"card.subject_spotlight.weakest")}</div>
          </div>
        </div>
      </ha-card>
    `}};Mt.styles=[Fe,Oe,n`
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
    `],e([me()],Mt.prototype,"_config",void 0),Mt=e([he("librus-subject-spotlight-card")],Mt);const Lt=/^obecno|^present/i,Pt=/uspr\.?/i;function Bt(e,t){return t?.[e]??Lt.test(e)?"good":Pt.test(e)?"warn":"bad"}let Ft=class extends Be{static getConfigElement(){return Le()}static getStubConfig(){return{type:"custom:librus-attendance-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 2}render(){if(!this._config||!this.hass)return q;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{map:t}=e,a=this.hass,i=t.attendance?a.states[t.attendance]:void 0;if(!i)return this._message("mdi:calendar-remove",ze(a,"empty.generic_error"));const s=i.attributes.breakdown??{},r=i.attributes.presence_by_type,n=i.attributes.total_records??0,o=i.attributes.percentage,c=i.attributes.by_semester??{},d=Object.entries(c).sort(([e],[t])=>Number(e)-Number(t)),l=Number(i.state)||0,h=i.attributes.unexcused_count,u=i.attributes.excused_count,p=void 0!==h,g=Object.entries(s),m={good:"var(--lc-good)",warn:"var(--lc-warn)",bad:"var(--lc-bad)"},v=g.map(([e,t])=>({flexGrow:Math.max(t,.001),colorVar:m[Bt(e,r)],title:`${e}: ${t}`}));return W`
      <ha-card>
        <div class="header">
          <div class="icon-badge bad"><ha-icon icon="mdi:calendar-remove"></ha-icon></div>
          <div class="title-block">
            <div class="title">${ze(a,"card.attendance.title")}</div>
            <div class="subtitle">${ze(a,"card.attendance.subtitle")}</div>
          </div>
        </div>
        <div class="stats">
          ${null!=o?W`
                <div class="stat ${o>=90?"good":o<75?"bad":""}">
                  <div class="stat-value">${o}<span class="unit">%</span></div>
                  <div class="stat-label">${ze(a,"stat.percentage")}</div>
                </div>
              `:q}
          ${p?W`
                <div class="stat ${h>0?"bad":""}">
                  <div class="stat-value">${h}</div>
                  <div class="stat-label">${ze(a,"stat.unexcused")}</div>
                </div>
                <div class="stat ${u>0?"warn":""}">
                  <div class="stat-value">${u}</div>
                  <div class="stat-label">${ze(a,"stat.excused")}</div>
                </div>
              `:W`
                <div class="stat bad">
                  <div class="stat-value">${l}</div>
                  <div class="stat-label">${ze(a,"stat.absences")}</div>
                </div>
              `}
          <div class="stat">
            <div class="stat-value">${n}</div>
            <div class="stat-label">${ze(a,"stat.records")}</div>
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
  `}(v):q}
        ${g.length?W`
              <div class="legend">
                ${g.map(([e,t])=>W`
                    <span class="legend-item">
                      <span class="legend-dot ${Bt(e,r)}"></span>${e}
                      <b>${t}</b>
                    </span>
                  `)}
              </div>
            `:q}
        ${d.length>1?W`
              <hr />
              <div class="semester-block">
                <div class="semester-title">${ze(a,"card.attendance.by_semester")}</div>
                ${d.map(([e,t])=>W`
                    <div class="semester-row">
                      <span>${ze(a,"card.attendance.semester",{n:e})}</span>
                      <span class="semester-pct">${null!=t.percentage?`${t.percentage}%`:"–"}</span>
                    </div>
                  `)}
              </div>
            `:q}
      </ha-card>
    `}};Ft.styles=[Fe,Oe,n`
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
    `],e([me()],Ft.prototype,"_config",void 0),Ft=e([he("librus-attendance-card")],Ft);let Ot=class extends Be{static getConfigElement(){return Le()}static getStubConfig(){return{type:"custom:librus-attendance-tile-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 1}render(){if(!this._config||!this.hass)return q;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{map:t}=e,a=this.hass,i=t.attendance?a.states[t.attendance]:void 0;if(!i)return this._message("mdi:calendar-remove",ze(a,"empty.generic_error"));const s=i.attributes.percentage,r=i.attributes.unexcused_count??(Number(i.state)||0),n=i.attributes.excused_count;return W`
      <ha-card class="tile" @click=${vt(this,this._config.tap_action,t.attendance)}>
        <div class="icon-badge ${0===r?"good":"bad"}">
          <ha-icon icon="mdi:calendar-remove"></ha-icon>
        </div>
        <div class="tile-body">
          <div class="subj">
            ${r} ${ze(a,"stat.absences").toLowerCase()}
          </div>
          ${null!=s||n?W`
                <div class="meta">
                  ${null!=s?W`${ze(a,"stat.percentage")}: ${s}%`:q}
                  ${n?W`${null!=s?" · ":""}${n} ${ze(a,"stat.excused").toLowerCase()}`:q}
                </div>
              `:q}
        </div>
      </ha-card>
    `}};Ot.styles=[Fe,Oe,n`
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
    `],e([me()],Ot.prototype,"_config",void 0),Ot=e([he("librus-attendance-tile-card")],Ot);const Kt=[0,1,2,3,4];let Ut=class extends Be{static getConfigElement(){return Le()}static getStubConfig(){return{type:"custom:librus-attendance-heatmap-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 2}render(){if(!this._config||!this.hass)return q;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{map:t}=e,a=this.hass,i=t.attendance?a.states[t.attendance]:void 0,s=i?.attributes.by_date;if(!i||!s||0===Object.keys(s).length)return this._message("mdi:calendar-blank-outline",ze(a,"card.attendance_heatmap.empty"));const r=t.school_class?a.states[t.school_class]:void 0,n=r?.attributes.school_year_start,o=new Date,c=tt(o),d=this._gridCache;let l,h;if(d&&d.byDate===s&&d.yearStartIso===n&&d.todayIso===c)({weeks:l,grid:h}=d);else{const e=it(o),t=n?it(new Date(`${n}T00:00:00`)):new Date(e.getTime()-96768e5);l=[];for(let a=new Date(t);a<=e;a.setDate(a.getDate()+7))l.push(new Date(a));h=W`${l.map(e=>W`
          <div class="heatmap-col">
            ${Kt.map(t=>{const i=new Date(e);if(i.setDate(i.getDate()+t),i>o)return W`<span class="cell future"></span>`;const r=tt(i),n=s[r];return W`<span class="cell ${n??"none"}" title=${`${r}${n?` - ${ze(a,`card.attendance_heatmap.status.${n}`)}`:""}`}></span>`})}
          </div>
        `)}`,this._gridCache={byDate:s,yearStartIso:n,todayIso:c,weeks:l,grid:h}}return W`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:calendar-blank-outline"></ha-icon></div>
          <div class="title-block">
            <div class="title">${ze(a,"card.attendance_heatmap.title")}</div>
            <div class="subtitle">${ze(a,"card.attendance_heatmap.subtitle")}</div>
          </div>
        </div>
        <div class="heatmap-scroll">
          <div class="heatmap" style="grid-template-columns: repeat(${l.length}, 11px);">
            ${h}
          </div>
        </div>
        <div class="heatmap-legend">
          <span class="legend-item"><span class="cell good"></span>${ze(a,"card.attendance_heatmap.status.good")}</span>
          <span class="legend-item"><span class="cell warn"></span>${ze(a,"card.attendance_heatmap.status.warn")}</span>
          <span class="legend-item"><span class="cell bad"></span>${ze(a,"card.attendance_heatmap.status.bad")}</span>
          <span class="legend-item"><span class="cell none"></span>${ze(a,"card.attendance_heatmap.no_data")}</span>
        </div>
      </ha-card>
    `}};Ut.styles=[Fe,Oe,n`
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
    `],e([me()],Ut.prototype,"_config",void 0),Ut=e([he("librus-attendance-heatmap-card")],Ut);const Ht=[1,2,3,4,5],Wt=["excused","unexcused","late"],Rt={excused:"var(--lc-warn)",unexcused:"var(--lc-bad)",late:"var(--lc-brand)"},Gt={excused:"stat.excused",unexcused:"stat.unexcused",late:"stat.late"};let qt=class extends Be{static getConfigElement(){return Le()}static getStubConfig(){return{type:"custom:librus-attendance-weekday-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 3}render(){if(!this._config||!this.hass)return q;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{map:t}=e,a=this.hass,i=t.attendance?a.states[t.attendance]:void 0,s=i?.attributes.by_weekday,r=Ht.map(e=>{const t=s?.[String(e)];return(t?.excused??0)+(t?.unexcused??0)+(t?.late??0)}),n=r.reduce((e,t)=>e+t,0);if(!s||0===n)return this._message("mdi:chart-bar-stacked",ze(a,"card.attendance_weekday.empty"));const o=Math.max(...r,1),c={excused:0,unexcused:0,late:0};for(const e of Ht){const t=s[String(e)];t&&(c.excused+=t.excused,c.unexcused+=t.unexcused,c.late+=t.late)}const d=Ht.map(e=>new Date(2026,0,e+4).toLocaleDateString(a.language,{weekday:"short"}));return W`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:chart-bar-stacked"></ha-icon></div>
          <div class="title-block">
            <div class="title">${ze(a,"card.attendance_weekday.title")}</div>
            <div class="subtitle">${ze(a,"card.attendance_weekday.subtitle")}</div>
          </div>
        </div>
        <div class="weekday-bars">
          ${Ht.map((e,t)=>{const i=s[String(e)],n=r[t],c=n>0?Math.max(22,n/o*84):4;return W`
              <div class="weekday-col">
                <div class="weekday-total">${n||""}</div>
                <div class="weekday-bar-stack" style="height:${c}px;${0===n?"background:var(--divider-color);":""}">
                  ${Wt.filter(e=>i&&i[e]>0).map(e=>W`
                      <div
                        class="seg"
                        style="height:${(i[e]/n*c).toFixed(1)}px;background:${Rt[e]}"
                        title="${ze(a,Gt[e])}: ${i[e]}"
                      ></div>
                    `)}
                </div>
                <div class="weekday-label">${d[t]}</div>
              </div>
            `})}
        </div>
        <div class="legend">
          ${Wt.map(e=>W`
              <span class="legend-item">
                <span class="dot" style="background:${Rt[e]}"></span>${ze(a,Gt[e])} <b>${c[e]}</b>
              </span>
            `)}
        </div>
      </ha-card>
    `}};qt.styles=[Fe,Oe,n`
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
    `],e([me()],qt.prototype,"_config",void 0),qt=e([he("librus-attendance-weekday-card")],qt);let Jt=class extends Be{static getConfigElement(){return Le()}static getStubConfig(){return{type:"custom:librus-attendance-subject-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 3}render(){if(!this._config||!this.hass)return q;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{map:t}=e,a=this.hass,i=t.attendance?a.states[t.attendance]:void 0,s=i?.attributes.by_subject,r=Object.entries(s??{}).map(([e,t])=>({subject:e,unexcused:t.unexcused,excused:t.excused,total:t.unexcused+t.excused})).filter(e=>e.total>0).sort((e,t)=>t.total-e.total);if(0===r.length)return this._message("mdi:book-remove-outline",ze(a,"card.attendance_subject.empty"));const n=Math.max(1,...r.map(e=>e.total));return W`
      <ha-card>
        <div class="header">
          <div class="icon-badge bad"><ha-icon icon="mdi:book-remove-outline"></ha-icon></div>
          <div class="title-block">
            <div class="title">${ze(a,"card.attendance_subject.title")}</div>
            <div class="subtitle">${ze(a,"card.attendance_subject.subtitle")}</div>
          </div>
        </div>
        <div class="hbar-chart">
          ${r.map(e=>{const t=Math.round(e.total/n*100),a=e.total?Math.round(e.unexcused/e.total*100):0,i=100-a;return W`
              <div class="hbar-row">
                <span class="hbar-label" title=${e.subject}>${e.subject}</span>
                <span class="sbar-track" style="width:${t}%">
                  ${e.unexcused?W`<span class="sbar-seg unexcused" style="width:${a}%"></span>`:q}
                  ${e.excused?W`<span class="sbar-seg excused" style="width:${i}%"></span>`:q}
                </span>
                <b class="hbar-val">${e.total}</b>
              </div>
            `})}
        </div>
        <div class="legend">
          <span class="legend-item"><span class="dot" style="background:var(--lc-bad)"></span>${ze(a,"stat.unexcused")}</span>
          <span class="legend-item"><span class="dot" style="background:var(--lc-warn)"></span>${ze(a,"stat.excused")}</span>
        </div>
      </ha-card>
    `}};Jt.styles=[Fe,Oe,n`
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
    `],e([me()],Jt.prototype,"_config",void 0),Jt=e([he("librus-attendance-subject-card")],Jt);const Zt=e=>e.total<5?"few":e.percentage<50?"bad":e.percentage<90?"warn":"good";let Vt=class extends Be{static getConfigElement(){return Le()}static getStubConfig(){return{type:"custom:librus-subject-attendance-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 4}render(){if(!this._config||!this.hass)return q;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{map:t}=e,a=this.hass,i=t.subject_attendance?a.states[t.subject_attendance]:void 0;if(!i)return this._message("mdi:calendar-check-outline",ze(a,"card.subject_attendance.title"),ze(a,"card.subject_attendance.needs_backend"));const s=i.attributes.subjects??{},r=Object.entries(s).map(([e,t])=>({name:e,...t,level:Zt(t)})).sort((e,t)=>Number("few"===e.level)-Number("few"===t.level)||e.percentage-t.percentage||t.total-e.total);if(0===r.length)return this._message("mdi:calendar-check-outline",ze(a,"card.subject_attendance.empty"));const n=r.filter(e=>"few"!==e.level),o=n[0],c=n.filter(e=>"bad"===e.level).length;return W`
      <ha-card>
        <div class="header">
          <div class="icon-badge ${c?"bad":"good"}"><ha-icon icon="mdi:calendar-check-outline"></ha-icon></div>
          <div class="title-block">
            <div class="title">${this._config.title??ze(a,"card.subject_attendance.title")}</div>
            ${o?W`<div class="subtitle">
                  ${ze(a,"card.subject_attendance.lowest")} <b>${o.name} ${(e=>`${e.toLocaleString(a.language,{maximumFractionDigits:1})}%`)(o.percentage)}</b>
                </div>`:q}
          </div>
          <span class="pill ${c?"bad":"good"}"
            >${c?ze(a,"card.subject_attendance.at_risk",{count:c}):ze(a,"card.subject_attendance.no_risk")}</span
          >
        </div>
        <div class="tiles">
          ${r.map(e=>W`
              <div
                class="tile ${e.level}"
                title=${ze(a,"card.subject_attendance.tooltip",{subject:e.name,present:e.present,total:e.total})}
              >
                <div class="ab">${St(e.name)}</div>
                <div class="v">${"few"===e.level?"–":`${Math.round(e.percentage)}%`}</div>
                <div class="n">${e.present}/${e.total}</div>
              </div>
            `)}
        </div>
        <div class="legend">
          <span class="legend-item"><span class="dot" style="background:var(--lc-good)"></span>${ze(a,"card.subject_attendance.legend_good")}</span>
          <span class="legend-item"><span class="dot" style="background:var(--lc-warn)"></span>${ze(a,"card.subject_attendance.legend_warn")}</span>
          <span class="legend-item"><span class="dot" style="background:var(--lc-bad)"></span>${ze(a,"card.subject_attendance.legend_bad")}</span>
          <span class="legend-item"><span class="dot" style="background:var(--lc-neutral-dot)"></span>${ze(a,"card.subject_attendance.legend_few")}</span>
        </div>
      </ha-card>
    `}};Vt.styles=[Fe,Oe,n`
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
    `],e([me()],Vt.prototype,"_config",void 0),Vt=e([he("librus-subject-attendance-card")],Vt);const Yt={positive:"good",negative:"bad",neutral:"neutral"};let Xt=class extends Be{static getConfigElement(){return Le()}static getStubConfig(){return{type:"custom:librus-behaviour-notices-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 2}render(){if(!this._config||!this.hass)return q;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{map:t}=e,a=this.hass,i=t.behaviour_notices?a.states[t.behaviour_notices]:void 0,s=i?.attributes.recent??[],r=i&&Number(i.state)||0;return i&&0!==s.length?W`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:alert-circle-outline"></ha-icon></div>
          <div class="title-block">
            <div class="title">${ze(a,"card.behaviour_notices.title")}</div>
            <div class="subtitle">${r}</div>
          </div>
        </div>
        <div class="scroll-list">
          ${s.map(e=>W`
              <div class="list-item">
                <span class="dot ${Yt[e.sentiment??"neutral"]}"></span>
                <div class="body">
                  <div class="row1">
                    <span class="cat-label">${e.category??""}</span>
                    ${e.date?W`<time>${Re(e.date,a.language)}</time>`:q}
                  </div>
                  <div class="item-text">${e.text}</div>
                </div>
              </div>
            `)}
        </div>
      </ha-card>
    `:this._message("mdi:alert-circle-outline",ze(a,"card.behaviour_notices.empty"))}};Xt.styles=[Fe,Oe],e([me()],Xt.prototype,"_config",void 0),Xt=e([he("librus-behaviour-notices-card")],Xt);let Qt=class extends Be{static getConfigElement(){return Le()}static getStubConfig(){return{type:"custom:librus-behaviour-notices-tile-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 1}render(){if(!this._config||!this.hass)return q;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{map:t}=e,a=this.hass,i=t.behaviour_notices?a.states[t.behaviour_notices]:void 0;if(!i)return this._message("mdi:alert-circle-outline",ze(a,"empty.generic_error"));const s=Number(i.state)||0,r=(i.attributes.recent??[])[0],n="negative"===r?.sentiment?"bad":"positive"===r?.sentiment?"good":"";return W`
      <ha-card class="tile" @click=${vt(this,this._config.tap_action,t.behaviour_notices)}>
        <div class="icon-badge ${n}"><ha-icon icon="mdi:alert-circle-outline"></ha-icon></div>
        <div class="tile-body">
          <div class="subj">${s} ${ze(a,"card.behaviour_notices.title").toLowerCase()}</div>
          ${r?.category?W`<div class="meta">${r.category}</div>`:q}
        </div>
      </ha-card>
    `}};async function ea(e,t,a,i="inbox"){return(await e.callWS({type:"call_service",domain:"librus_synergia",service:"get_message",service_data:{device_id:t,message_id:a,mailbox:i},return_response:!0})).response}Qt.styles=[Fe,Oe,n`
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
    `],e([me()],Qt.prototype,"_config",void 0),Qt=e([he("librus-behaviour-notices-tile-card")],Qt);const ta={inbox:"recent",substitutions:"substitutions_recent",alerts:"alerts_recent",justifications:"justifications_recent"},aa=[{key:"inbox",label:"mailbox.inbox"},{key:"notes",label:"mailbox.notes"},{key:"alerts",label:"mailbox.alerts"},{key:"substitutions",label:"mailbox.substitutions"},{key:"absences",label:"mailbox.absences"},{key:"justifications",label:"mailbox.justifications"},{key:"trash",label:"mailbox.trash"}];let ia=class extends Be{constructor(){super(...arguments),this._fullById={},this._pendingIds=new Set,this._errorIds=new Set}static getConfigElement(){return Le()}static getStubConfig(){return{type:"custom:librus-messages-card"}}get _mailbox(){return this._config?.mailbox&&ta[this._config.mailbox]?this._config.mailbox:"inbox"}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 3}async _onMessageClick(e){if(this._expandedId===e.id)return void(this._expandedId=void 0);if(this._expandedId=e.id,this._fullById[e.id]||this._pendingIds.has(e.id))return;const t=this._resolveEntities();if("error"in t||!this.hass)return;const a=e.mailbox??this._mailbox;this._pendingIds=new Set(this._pendingIds).add(e.id);const i=new Set(this._errorIds);i.delete(e.id),this._errorIds=i;try{const i=await ea(this.hass,t.deviceId,e.id,a);this._fullById={...this._fullById,[e.id]:i}}catch{this._errorIds=new Set(this._errorIds).add(e.id)}finally{const t=new Set(this._pendingIds);t.delete(e.id),this._pendingIds=t}}_renderMessageBody(e){const t=this.hass;if(this._expandedId!==e.id)return W`<div class="item-text"><b>${e.topic}</b> - ${e.content}</div>`;const a=this._fullById[e.id];return a?W`
        <div class="item-text"><b>${a.topic}</b></div>
        <div class="full-text">${a.content}</div>
        ${a.attachments?.length?W`
              <div class="attachments">
                ${a.attachments.map(e=>W`<div class="attachment">
                    <ha-icon icon="mdi:paperclip"></ha-icon>${e.filename??e.id}
                  </div>`)}
                <div class="read-notice">${ze(t,"card.messages.attachment_notice")}</div>
              </div>
            `:q}
        <div class="read-notice">${ze(t,"card.messages.read_notice")}</div>
      `:this._errorIds.has(e.id)?W`<div class="item-text"><b>${e.topic}</b> - ${ze(t,"card.messages.fetch_failed")}</div>`:W`<div class="item-text"><b>${e.topic}</b> - ${ze(t,"empty.loading")}</div>`}render(){if(!this._config||!this.hass)return q;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{map:t}=e,a=this.hass,i=t.unread_messages?a.states[t.unread_messages]:void 0;if(!i||"unavailable"===i.state)return this._message("mdi:email-outline",ze(a,"card.messages.unavailable"));const s=this._mailbox,r=i.attributes.mailbox_breakdown??{},n=i.attributes[ta[s]]??[];Number(i.state);const o=this._config.max_items??6;return W`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:email-outline"></ha-icon></div>
          <div class="title-block">
            <div class="title">${this._config.title??ze(a,"card.messages.title")}</div>
            <div class="subtitle">${ze(a,`mailbox.${s}`)}</div>
          </div>
        </div>
        <div class="chips">
          ${aa.map(({key:e,label:t})=>W`
              <span class="chip ${e===s?"hot":""}"
                >${ze(a,t)} <span class="n">${r[e]??0}</span></span
              >
            `)}
        </div>
        ${n.length?W`
              <hr />
              <div class="scroll-list">
                ${n.slice(0,o).map(e=>W`
                    <div class="list-item clickable" @click=${()=>this._onMessageClick(e)}>
                      <span class="dot ${e.unread?"good":"neutral"}"></span>
                      <div class="body">
                        <div class="row1">
                          <span class="sender"
                            >${e.sender}${e.has_attachment?W`<ha-icon class="clip" icon="mdi:paperclip"></ha-icon>`:q}</span
                          >
                          ${e.date?W`<time>${Re(e.date,a.language)}</time>`:q}
                        </div>
                        ${this._renderMessageBody(e)}
                      </div>
                    </div>
                  `)}
              </div>
            `:q}
      </ha-card>
    `}};ia.styles=[Fe,Oe,n`
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
    `],e([me()],ia.prototype,"_config",void 0),e([me()],ia.prototype,"_expandedId",void 0),e([me()],ia.prototype,"_fullById",void 0),e([me()],ia.prototype,"_pendingIds",void 0),e([me()],ia.prototype,"_errorIds",void 0),ia=e([he("librus-messages-card")],ia);let sa=class extends Be{static getConfigElement(){return Le()}static getStubConfig(){return{type:"custom:librus-messages-tile-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 1}render(){if(!this._config||!this.hass)return q;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{map:t}=e,a=this.hass,i=t.unread_messages?a.states[t.unread_messages]:void 0;if(!i||"unavailable"===i.state)return this._message("mdi:email-outline",ze(a,"card.messages.unavailable"));const s=Number(i.state)||0,r=(i.attributes.recent??[])[0];return W`
      <ha-card class="tile" @click=${vt(this,this._config.tap_action,t.unread_messages)}>
        <div class="icon-badge ${s>0?"amber":""}">
          <ha-icon icon="mdi:email-outline"></ha-icon>
        </div>
        <div class="tile-body">
          <div class="subj">${s} ${ze(a,"mailbox.inbox").toLowerCase()}</div>
          ${r?W`<div class="meta">${r.sender} · ${r.topic}</div>`:q}
        </div>
      </ha-card>
    `}};function ra(e){return`${e.mailbox}:${e.id}`}sa.styles=[Fe,Oe,n`
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
    `],e([me()],sa.prototype,"_config",void 0),sa=e([he("librus-messages-tile-card")],sa);let na=class extends Be{constructor(){super(...arguments),this._fullByKey={},this._pendingKeys=new Set,this._errorKeys=new Set}static getConfigElement(){return Le()}static getStubConfig(){return{type:"custom:librus-substitutions-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 2}async _onClick(e){const t=ra(e);if(this._expandedKey===t)return void(this._expandedKey=void 0);if(this._expandedKey=t,this._fullByKey[t]||this._pendingKeys.has(t))return;const a=this._resolveEntities();if("error"in a||!this.hass)return;this._pendingKeys=new Set(this._pendingKeys).add(t);const i=new Set(this._errorKeys);i.delete(t),this._errorKeys=i;try{const i=await ea(this.hass,a.deviceId,e.id,e.mailbox);this._fullByKey={...this._fullByKey,[t]:i}}catch{this._errorKeys=new Set(this._errorKeys).add(t)}finally{const e=new Set(this._pendingKeys);e.delete(t),this._pendingKeys=e}}_renderBody(e){const t=this.hass,a=ra(e);if(this._expandedKey!==a)return W`<div class="item-text"><b>${e.topic}</b> - ${e.content}</div>`;const i=this._fullByKey[a];return i?W`
        <div class="item-text"><b>${i.topic}</b></div>
        <div class="full-text">${i.content}</div>
        ${i.attachments?.length?W`
              <div class="attachments">
                ${i.attachments.map(e=>W`<div class="attachment">
                    <ha-icon icon="mdi:paperclip"></ha-icon>${e.filename??e.id}
                  </div>`)}
                <div class="read-notice">${ze(t,"card.messages.attachment_notice")}</div>
              </div>
            `:q}
        <div class="read-notice">${ze(t,"card.messages.read_notice")}</div>
      `:this._errorKeys.has(a)?W`<div class="item-text"><b>${e.topic}</b> - ${ze(t,"card.messages.fetch_failed")}</div>`:W`<div class="item-text"><b>${e.topic}</b> - ${ze(t,"empty.loading")}</div>`}_renderSection(e,t){if(0===t.length)return q;const a=this.hass;return W`
      <div class="section-title">${e}</div>
      <div class="scroll-list">
        ${t.map(e=>W`
            <div class="list-item clickable" @click=${()=>this._onClick(e)}>
              <span class="dot ${e.unread?"good":"neutral"}"></span>
              <div class="body">
                <div class="row1">
                  <span class="sender"
                    >${e.sender}${e.has_attachment?W`<ha-icon class="clip" icon="mdi:paperclip"></ha-icon>`:q}</span
                  >
                  ${e.date?W`<time>${Re(e.date,a.language)}</time>`:q}
                </div>
                ${this._renderBody(e)}
              </div>
            </div>
          `)}
      </div>
    `}render(){if(!this._config||!this.hass)return q;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{map:t}=e,a=this.hass,i=t.unread_messages?a.states[t.unread_messages]:void 0,s=i?.attributes.substitutions_recent??[],r=i?.attributes.alerts_recent??[],n=i?.attributes.justifications_recent??[];return!i||0===s.length&&0===r.length&&0===n.length?this._message("mdi:bell-alert-outline",ze(a,"card.substitutions.empty")):W`
      <ha-card>
        <div class="header">
          <div class="icon-badge amber"><ha-icon icon="mdi:bell-alert-outline"></ha-icon></div>
          <div class="title-block">
            <div class="title">${ze(a,"card.substitutions.title")}</div>
            <div class="subtitle">${ze(a,"card.substitutions.subtitle")}</div>
          </div>
        </div>
        ${this._renderSection(ze(a,"mailbox.substitutions"),s)}
        ${this._renderSection(ze(a,"mailbox.alerts"),r)}
        ${this._renderSection(ze(a,"mailbox.justifications"),n)}
      </ha-card>
    `}};na.styles=[Fe,Oe,n`
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
    `],e([me()],na.prototype,"_config",void 0),e([me()],na.prototype,"_expandedKey",void 0),e([me()],na.prototype,"_fullByKey",void 0),e([me()],na.prototype,"_pendingKeys",void 0),e([me()],na.prototype,"_errorKeys",void 0),na=e([he("librus-substitutions-card")],na);let oa=class extends Be{static getConfigElement(){return Le()}static getStubConfig(){return{type:"custom:librus-announcements-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 2}_toggleExpanded(e){this._expandedId=this._expandedId===e?void 0:e}render(){if(!this._config||!this.hass)return q;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{map:t}=e,a=this.hass,i=t.unread_announcements?a.states[t.unread_announcements]:void 0,s=i?.attributes.recent??[];if(!i||0===s.length)return this._message("mdi:bullhorn-outline",ze(a,"card.announcements.empty"));const r=s.slice(0,this._config.max_items??10);return W`
      <ha-card>
        <div class="header">
          <div class="icon-badge amber"><ha-icon icon="mdi:bullhorn-outline"></ha-icon></div>
          <div class="title-block">
            <div class="title">${this._config.title??ze(a,"card.announcements.title")}</div>
            <div class="subtitle">${i.state}</div>
          </div>
        </div>
        <div class="scroll-list">
          ${r.map((e,t)=>{const i=e.id??String(t);return W`
              <div class="list-item clickable" @click=${()=>this._toggleExpanded(i)}>
                <span class="dot neutral"></span>
                <div class="body">
                  <div class="row1">${e.subject}</div>
                  ${e.start_date&&e.end_date?W`<div class="item-text">
                        ${Re(e.start_date,a.language)} –
                        ${Re(e.end_date,a.language)}
                      </div>`:q}
                  ${this._expandedId===i?W`<div class="full-text">${e.content}</div>`:q}
                </div>
              </div>
            `})}
        </div>
      </ha-card>
    `}};oa.styles=[Fe,Oe,n`
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
    `],e([me()],oa.prototype,"_config",void 0),e([me()],oa.prototype,"_expandedId",void 0),oa=e([he("librus-announcements-card")],oa);let ca=class extends Be{static getConfigElement(){return Le()}static getStubConfig(){return{type:"custom:librus-announcements-tile-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 1}render(){if(!this._config||!this.hass)return q;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{map:t}=e,a=this.hass,i=t.unread_announcements?a.states[t.unread_announcements]:void 0;if(!i)return this._message("mdi:bullhorn-outline",ze(a,"empty.generic_error"));const s=Number(i.state)||0,r=(i.attributes.recent??[])[0];return W`
      <ha-card class="tile" @click=${vt(this,this._config.tap_action,t.unread_announcements)}>
        <div class="icon-badge ${s>0?"amber":""}">
          <ha-icon icon="mdi:bullhorn-outline"></ha-icon>
        </div>
        <div class="tile-body">
          <div class="subj">${s} ${ze(a,"card.announcements.title").toLowerCase()}</div>
          ${r?W`<div class="meta">${r.subject}</div>`:q}
        </div>
      </ha-card>
    `}};ca.styles=[Fe,Oe,n`
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
    `],e([me()],ca.prototype,"_config",void 0),ca=e([he("librus-announcements-tile-card")],ca);let da=class extends Be{static getConfigElement(){return Le()}static getStubConfig(){return{type:"custom:librus-homework-assignments-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 2}render(){if(!this._config||!this.hass)return q;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{map:t}=e,a=this.hass,i=t.homework_assignments?a.states[t.homework_assignments]:void 0,s=i?.attributes.recent??[];return i&&0!==s.length?W`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:notebook-edit-outline"></ha-icon></div>
          <div class="title-block">
            <div class="title">${ze(a,"card.homework_assignments.title")}</div>
            <div class="subtitle">${i.state}</div>
          </div>
        </div>
        <div class="scroll-list">
          ${s.map(e=>W`
              <div class="list-item">
                <span class="dot neutral"></span>
                <div class="body">
                  <div class="row1">
                    <span>${e.topic}</span>
                    ${e.due_date?W`<time>${ze(a,"label.due")} ${Re(e.due_date,a.language)}</time>`:q}
                  </div>
                  <div class="item-text">${e.text}${e.teacher?W` - ${e.teacher}`:q}</div>
                </div>
              </div>
            `)}
        </div>
      </ha-card>
    `:this._message("mdi:notebook-edit-outline",ze(a,"card.homework_assignments.empty"))}};da.styles=[Fe,Oe],e([me()],da.prototype,"_config",void 0),da=e([he("librus-homework-assignments-card")],da);let la=class extends Be{constructor(){super(...arguments),this._done=new Set,this._storageKey=""}static getConfigElement(){return Le()}static getStubConfig(){return{type:"custom:librus-homework-checklist-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 3}_load(e){const t=`librus-hw-done:${e}`;if(this._storageKey!==t){this._storageKey=t;try{const e=window.localStorage.getItem(t);this._done=new Set(e?JSON.parse(e):[])}catch{this._done=new Set}}}_persist(e){const t=[...this._done].filter(t=>e.has(t));try{window.localStorage.setItem(this._storageKey,JSON.stringify(t))}catch{}}_toggle(e,t){const a=new Set(this._done);a.has(e)?a.delete(e):a.add(e),this._done=a,this._persist(t)}render(){if(!this._config||!this.hass)return q;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{deviceId:t,map:a}=e,i=this.hass;this._load(t);const s=a.homework_assignments?i.states[a.homework_assignments]:void 0,r=(s?.attributes.recent??[]).map((e,t)=>({...e,key:void 0!==e.id?String(e.id):`${e.topic}|${e.due_date??t}`}));if(0===r.length)return this._message("mdi:notebook-edit-outline",ze(i,"card.homework_assignments.empty"));const n=new Set(r.map(e=>e.key)),o=this._config.max_items??12,c=[...r].sort((e,t)=>{const a=this._done.has(e.key)?1:0,i=this._done.has(t.key)?1:0;return a!==i?a-i:(e.due_date??"").localeCompare(t.due_date??"")}),d=r.filter(e=>this._done.has(e.key)).length;return W`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:notebook-edit-outline"></ha-icon></div>
          <div class="title-block">
            <div class="title">${this._config.title??ze(i,"card.homework_checklist.title")}</div>
            <div class="subtitle">
              ${ze(i,"card.homework_checklist.progress",{done:d,total:r.length})}
            </div>
          </div>
        </div>
        <div class="scroll-list">
          ${c.slice(0,o).map(e=>{const t=this._done.has(e.key);return W`
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
                    ${e.due_date?W`<time>${Re(e.due_date,i.language)}</time>`:q}
                  </div>
                  ${e.text&&e.text!==e.topic?W`<div class="item-text">${e.text}</div>`:q}
                </div>
              </div>
            `})}
        </div>
      </ha-card>
    `}};la.styles=[Fe,Oe,n`
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
    `],e([me()],la.prototype,"_config",void 0),e([me()],la.prototype,"_done",void 0),la=e([he("librus-homework-checklist-card")],la);function ha(e){return e.length<=10?`${e}T00:00:00`:e}let ua=class extends Be{static getConfigElement(){return Le()}static getStubConfig(){return{type:"custom:librus-recent-activity-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 4}render(){if(!this._config||!this.hass)return q;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{deviceId:t,map:a}=e,i=this.hass,s=[];for(const e of this._resolveAllByTranslationKey(t,"subject_average")){const t=i.states[e.entityId]?.attributes.grades??[];for(const a of t)a.date&&s.push({date:a.date,icon:"mdi:notebook-outline",title:`${a.value} · ${e.subject}`,text:a.category??""})}const r=a.behaviour_notices?i.states[a.behaviour_notices]:void 0;for(const e of r?.attributes.recent??[])e.date&&s.push({date:e.date,icon:"mdi:alert-circle-outline",title:e.category??"",text:e.text});const n=a.unread_announcements?i.states[a.unread_announcements]:void 0;for(const e of n?.attributes.recent??[])e.creation_date&&s.push({date:e.creation_date,icon:"mdi:bullhorn-outline",title:e.subject,text:""});const o=a.unread_messages?i.states[a.unread_messages]:void 0;for(const e of o?.attributes.recent??[])e.date&&s.push({date:e.date,icon:"mdi:email-outline",title:`${e.sender} · ${e.topic}`,text:e.content});s.sort((e,t)=>ha(t.date).localeCompare(ha(e.date)));const c=s.slice(0,this._config.max_items??15);return 0===c.length?this._message("mdi:bell-outline",ze(i,"card.recent_activity.empty")):W`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:bell-outline"></ha-icon></div>
          <div class="title-block">
            <div class="title">${this._config.title??ze(i,"card.recent_activity.title")}</div>
            <div class="subtitle">${ze(i,"card.recent_activity.subtitle")}</div>
          </div>
        </div>
        <div class="scroll-list">
          ${c.map(e=>W`
              <div class="list-item">
                <div class="type-icon"><ha-icon icon=${e.icon}></ha-icon></div>
                <div class="body">
                  <div class="row1">
                    <span>${e.title}</span>
                    <time>${Re(e.date,i.language)}</time>
                  </div>
                  ${e.text?W`<div class="item-text">${e.text}</div>`:q}
                </div>
              </div>
            `)}
        </div>
      </ha-card>
    `}};ua.styles=[Fe,Oe,n`
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
    `],e([me()],ua.prototype,"_config",void 0),ua=e([he("librus-recent-activity-card")],ua);let pa=class extends Be{constructor(){super(...arguments),this._events=[]}static getConfigElement(){return Le()}static getStubConfig(){return{type:"custom:librus-today-lessons-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 4}connectedCallback(){super.connectedCallback(),this._refreshTimer=setInterval(()=>{this._fetch(!0)},3e5),this._tickTimer=setInterval(()=>this.requestUpdate(),6e4)}disconnectedCallback(){super.disconnectedCallback(),clearInterval(this._refreshTimer),clearInterval(this._tickTimer)}async _fetch(e=!1){if(!this.hass||!this._config)return;const t=this._resolveEntities();if("error"in t)return;const a=t.map.timetable;if(!a)return;const i=new Date;i.setHours(0,0,0,0);const s=new Date(i);s.setDate(s.getDate()+1);const r=`${a}:${i.toDateString()}`;if(!e&&this._fetchedFor===r)return;this._fetchedFor=r;const n=this._beginFetch();try{const e=(await Xe(this.hass,a,i,s)).filter(e=>!e.allDay).sort((e,t)=>e.start.localeCompare(t.start));this._isCurrentFetch(n)&&(this._events=e)}catch{this._isCurrentFetch(n)&&(this._events=[])}}render(){if(!this._config||!this.hass)return q;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const t=this.hass;if(this._fetch(),0===this._events.length)return this._message("mdi:calendar-clock",ze(t,"card.today_lessons.empty"));const a=new Date;return W`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:calendar-clock"></ha-icon></div>
          <div class="title-block">
            <div class="title">${ze(t,"card.today_lessons.title")}</div>
            <div class="subtitle">${ze(t,"card.today_lessons.subtitle")}</div>
          </div>
        </div>
        <div class="timeline">
          ${this._events.map(e=>{const i=Qe(e,a),s=et(e,a);return W`
              <div class="tl-item ${i?"now":""} ${s?"done":""}">
                <span class="tl-time">${We(e.start)}</span>
                <span class="tl-dot"></span>
                <div class="tl-body">
                  <div class="subj">
                    ${e.summary} ${i?W`<span class="pill-now">${ze(t,"label.now")}</span>`:q}
                  </div>
                  ${e.location||e.description?W`<div class="meta">${[e.location,e.description].filter(Boolean).join(" · ")}</div>`:q}
                </div>
              </div>
            `})}
        </div>
      </ha-card>
    `}};pa.styles=[Fe,Oe,n`
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
    `],e([me()],pa.prototype,"_config",void 0),e([me()],pa.prototype,"_events",void 0),pa=e([he("librus-today-lessons-card")],pa);let ga=class extends Be{static getConfigElement(){return Le()}static getStubConfig(){return{type:"custom:librus-next-lesson-tile-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 1}connectedCallback(){super.connectedCallback(),this._tickTimer=setInterval(()=>this.requestUpdate(),3e4)}disconnectedCallback(){super.disconnectedCallback(),clearInterval(this._tickTimer)}render(){if(!this._config||!this.hass)return q;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{map:t}=e,a=this.hass,i=t.timetable?a.states[t.timetable]:void 0,s=i?.attributes.message,r=i?.attributes.start_time;if(!i||!s||!r)return this._message("mdi:clock-outline",ze(a,"card.next_lesson.empty"));const n=new Date(r.replace(" ","T")),o=new Date,c="on"===i.state,d=qe(n,o),l=i.attributes.location,h=i.attributes.description;return W`
      <ha-card class="tile" @click=${vt(this,this._config.tap_action,t.timetable)}>
        <div class="icon-badge ${c?"good":""}"><ha-icon icon="mdi:clock-outline"></ha-icon></div>
        <div class="tile-body">
          <div class="subj">${s}</div>
          <div class="meta">
            ${c?ze(a,"label.now"):`${We(r.replace(" ","T"))} · ${je(a,d)}`}
            ${l?` · ${l}`:""}${h?` · ${h}`:""}
          </div>
        </div>
      </ha-card>
    `}};ga.styles=[Fe,Oe,n`
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
    `],e([me()],ga.prototype,"_config",void 0),ga=e([he("librus-next-lesson-tile-card")],ga);let ma=class extends Be{constructor(){super(...arguments),this._events=[]}static getConfigElement(){return Le()}static getStubConfig(){return{type:"custom:librus-agenda-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 4}connectedCallback(){super.connectedCallback(),this._refreshTimer=setInterval(()=>{this._fetch(!0)},9e5)}disconnectedCallback(){super.disconnectedCallback(),clearInterval(this._refreshTimer)}async _fetch(e=!1){if(!this.hass||!this._config)return;const t=this._resolveEntities();if("error"in t)return;const a=t.map.agenda;if(!a)return;const i=this._config.days_ahead??14,s=new Date;s.setHours(0,0,0,0);const r=new Date(s);r.setDate(r.getDate()+i);const n=`${a}:${s.toDateString()}:${i}`;if(!e&&this._fetchedFor===n)return;this._fetchedFor=n;const o=this._beginFetch();try{const e=(await Xe(this.hass,a,s,r)).sort((e,t)=>e.start.localeCompare(t.start));this._isCurrentFetch(o)&&(this._events=e)}catch{this._isCurrentFetch(o)&&(this._events=[])}}render(){if(!this._config||!this.hass)return q;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const t=this.hass;if(this._fetch(),0===this._events.length)return this._message("mdi:calendar-text-outline",ze(t,"card.agenda.empty"));const a=new Map;for(const e of this._events){const t=e.start.slice(0,10);a.has(t)||a.set(t,[]),a.get(t).push(e)}return W`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:calendar-text-outline"></ha-icon></div>
          <div class="title-block">
            <div class="title">${this._config.title??ze(t,"card.agenda.title")}</div>
            <div class="subtitle">${ze(t,"card.agenda.subtitle")}</div>
          </div>
        </div>
        <div class="scroll-list">
          ${[...a.entries()].map(([e,a])=>W`
              <div class="day-group">
                <div class="day-label">${Re(e,t.language)}</div>
                ${a.map(e=>{const{category:t,text:a}=Ve(e.summary);return W`
                    <div class="list-item">
                      <span class="dot neutral"></span>
                      <div class="body">
                        ${t?W`<div class="cat-label-row"><span class="cat-label">${t}</span></div>`:q}
                        <div class="row1">${a}</div>
                        ${e.description?W`<div class="item-text">${e.description}</div>`:q}
                      </div>
                    </div>
                  `})}
              </div>
            `)}
        </div>
      </ha-card>
    `}};ma.styles=[Fe,Oe,n`
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
    `],e([me()],ma.prototype,"_config",void 0),e([me()],ma.prototype,"_events",void 0),ma=e([he("librus-agenda-card")],ma);const va=new Set(["unknown","unavailable",""]),ba="sprawdzian";let _a=class extends Be{constructor(){super(...arguments),this._events=[]}static getConfigElement(){return Le()}static getStubConfig(){return{type:"custom:librus-exam-countdown-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 2}connectedCallback(){super.connectedCallback(),this._refreshTimer=setInterval(()=>{this._fetch(!0)},9e5)}disconnectedCallback(){super.disconnectedCallback(),clearInterval(this._refreshTimer)}_sensorExams(){if(!this.hass)return;const e=this._resolveEntities();if("error"in e)return;const t=e.map.next_exam?this.hass.states[e.map.next_exam]:void 0;if(!t||va.has(t.state))return;const a=(new Date).toLocaleDateString("en-CA"),i=(t.attributes.upcoming??[]).filter(e=>e.date>=a).sort((e,t)=>e.date.localeCompare(t.date)).map(e=>({date:e.date,text:[e.subject,e.content].filter(Boolean).join(" — ")||e.category||""}));return 0===i.length?[{date:t.state,text:t.attributes.subject??""}]:i}async _fetch(e=!1){if(!this.hass||!this._config)return;const t=this._resolveEntities();if("error"in t)return;if(void 0!==this._sensorExams())return;const a=t.map.agenda;if(!a)return;const i=new Date;i.setHours(0,0,0,0);const s=new Date(i);s.setDate(s.getDate()+90);const r=this._config.exam_keywords||ba,n=`${a}:${i.toDateString()}:${r}`;if(!e&&this._fetchedFor===n)return;this._fetchedFor=n;const o=function(e){const t=(e||ba).split(",").map(e=>e.trim()).filter(Boolean).map(e=>e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"));return new RegExp(t.length?t.join("|"):ba,"i")}(this._config.exam_keywords),c=this._beginFetch();try{const e=(await Xe(this.hass,a,i,s)).filter(e=>{const{category:t}=Ve(e.summary);return null!==t&&o.test(t)}).sort((e,t)=>e.start.localeCompare(t.start));this._isCurrentFetch(c)&&(this._events=e)}catch{this._isCurrentFetch(c)&&(this._events=[])}}render(){if(!this._config||!this.hass)return q;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const t=this.hass;this._fetch();const a=this._sensorExams()??this._events.map(e=>({date:e.start,text:Ve(e.summary).text}));if(0===a.length)return this._message("mdi:clipboard-text-outline",ze(t,"card.exam_countdown.empty"));const[i,...s]=a,r=Ge(new Date,new Date(`${i.date.slice(0,10)}T00:00:00`));return W`
      <ha-card @click=${vt(this,this._config.tap_action,e.map.next_exam||e.map.agenda)}>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:clipboard-text-outline"></ha-icon></div>
          <div class="title-block">
            <div class="title">${this._config.title??ze(t,"card.exam_countdown.title")}</div>
            <div class="subtitle">${Re(i.date,t.language)}</div>
          </div>
        </div>
        <div class="countdown">
          <span class="big">${r}</span>
          <span class="unit">${ze(t,"label.days_until")}<br /><b>${i.text}</b></span>
        </div>
        ${s.length?W`
              <hr />
              <div class="chips">
                ${s.slice(0,4).map(e=>W`<span class="chip">${e.text} <span class="n">${Re(e.date,t.language)}</span></span>`)}
              </div>
            `:q}
      </ha-card>
    `}};_a.styles=[Fe,Oe,n`
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
    `],e([me()],_a.prototype,"_config",void 0),e([me()],_a.prototype,"_events",void 0),_a=e([he("librus-exam-countdown-card")],_a);let ya=class extends Be{constructor(){super(...arguments),this._events=[]}static getConfigElement(){return Le()}static getStubConfig(){return{type:"custom:librus-free-days-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 2}connectedCallback(){super.connectedCallback(),this._refreshTimer=setInterval(()=>{this._fetch(!0)},36e5)}disconnectedCallback(){super.disconnectedCallback(),clearInterval(this._refreshTimer)}async _fetch(e=!1){if(!this.hass||!this._config)return;const t=this._resolveEntities();if("error"in t)return;const a=t.map.free_days;if(!a)return;const i=new Date;i.setHours(0,0,0,0);const s=new Date(i);s.setDate(s.getDate()+240);const r=`${a}:${i.toDateString()}`;if(!e&&this._fetchedFor===r)return;this._fetchedFor=r;const n=this._beginFetch();try{const e=(await Xe(this.hass,a,i,s)).sort((e,t)=>e.start.localeCompare(t.start));this._isCurrentFetch(n)&&(this._events=e)}catch{this._isCurrentFetch(n)&&(this._events=[])}}render(){if(!this._config||!this.hass)return q;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const t=this.hass;if(this._fetch(),0===this._events.length)return this._message("mdi:beach",ze(t,"card.free_days.empty"));const a=new Date,[i,...s]=this._events,r=Ge(a,new Date(`${i.start}T00:00:00`));return W`
      <ha-card>
        <div class="header">
          <div class="icon-badge amber"><ha-icon icon="mdi:beach"></ha-icon></div>
          <div class="title-block">
            <div class="title">${ze(t,"card.free_days.title")}</div>
            <div class="subtitle">${i.summary}</div>
          </div>
        </div>
        <div class="countdown">
          <span class="big">${r}</span>
          <span class="unit">${ze(t,"label.days_until")}<br /><b>${i.summary}</b></span>
        </div>
        ${s.length?W`
              <hr />
              <div class="chips">
                ${s.slice(0,4).map(e=>W`<span class="chip">${e.summary} <span class="n">${Re(e.start,t.language)}</span></span>`)}
              </div>
            `:q}
      </ha-card>
    `}};ya.styles=[Fe,Oe,n`
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
    `],e([me()],ya.prototype,"_config",void 0),e([me()],ya.prototype,"_events",void 0),ya=e([he("librus-free-days-card")],ya);let fa=class extends Be{constructor(){super(...arguments),this._events=[]}static getConfigElement(){return Le()}static getStubConfig(){return{type:"custom:librus-free-days-tile-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 1}connectedCallback(){super.connectedCallback(),this._refreshTimer=setInterval(()=>{this._fetch(!0)},36e5)}disconnectedCallback(){super.disconnectedCallback(),clearInterval(this._refreshTimer)}async _fetch(e=!1){if(!this.hass||!this._config)return;const t=this._resolveEntities();if("error"in t)return;const a=t.map.free_days;if(!a)return;const i=new Date;i.setHours(0,0,0,0);const s=new Date(i);s.setDate(s.getDate()+240);const r=`${a}:${i.toDateString()}`;if(!e&&this._fetchedFor===r)return;this._fetchedFor=r;const n=this._beginFetch();try{const e=(await Xe(this.hass,a,i,s)).sort((e,t)=>e.start.localeCompare(t.start));this._isCurrentFetch(n)&&(this._events=e)}catch{this._isCurrentFetch(n)&&(this._events=[])}}render(){if(!this._config||!this.hass)return q;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const t=this.hass;if(this._fetch(),0===this._events.length)return this._message("mdi:beach",ze(t,"card.free_days.empty"));const[a]=this._events,i=Ge(new Date,new Date(`${a.start}T00:00:00`));return W`
      <ha-card class="tile" @click=${vt(this,this._config.tap_action,e.map.free_days)}>
        <div class="icon-badge amber"><ha-icon icon="mdi:beach"></ha-icon></div>
        <div class="tile-body">
          <div class="subj">${i} ${ze(t,"label.days").toLowerCase()}</div>
          <div class="meta">${a.summary}</div>
        </div>
      </ha-card>
    `}};function wa(e){const t=new Date(e).getDay();return 0===t?7:t}fa.styles=[Fe,Oe,n`
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
    `],e([me()],fa.prototype,"_config",void 0),e([me()],fa.prototype,"_events",void 0),fa=e([he("librus-free-days-tile-card")],fa);let ka=class extends Be{constructor(){super(...arguments),this._events=[]}static getConfigElement(){return Le()}static getStubConfig(){return{type:"custom:librus-week-timetable-card"}}get _dayCount(){return this._config?.show_saturday?6:5}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 4}connectedCallback(){super.connectedCallback(),this._refreshTimer=setInterval(()=>{this._fetch(!0)},18e5),this._tickTimer=setInterval(()=>this.requestUpdate(),3e4)}disconnectedCallback(){super.disconnectedCallback(),clearInterval(this._refreshTimer),clearInterval(this._tickTimer)}async _fetch(e=!1){if(!this.hass||!this._config)return;const t=this._resolveEntities();if("error"in t)return;const a=t.map.timetable;if(!a)return;const i=st(new Date),s=new Date(i);s.setDate(s.getDate()+this._dayCount);const r=`${a}:${i.toDateString()}:${this._dayCount}`;if(!e&&this._fetchedFor===r)return;this._fetchedFor=r;const n=this._beginFetch();try{const e=await Xe(this.hass,a,i,s);this._isCurrentFetch(n)&&(this._events=e)}catch{this._isCurrentFetch(n)&&(this._events=[])}}render(){if(!this._config||!this.hass)return q;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const t=this.hass;if(this._fetch(),0===this._events.length)return this._message("mdi:calendar-week-outline",ze(t,"card.week_timetable.empty"));const a=this._dayCount,i=Array.from({length:a},()=>[]);for(const e of this._events){const t=wa(e.start);t>=1&&t<=a&&i[t-1].push(e)}i.forEach(e=>e.sort((e,t)=>e.start.localeCompare(t.start)));const s=e.map.school?t.states[e.map.school]:void 0,r=s?.attributes.bell_schedule??[],n=i.map(e=>e.map(e=>function(e,t){const a=function(e){return e.toLocaleTimeString("en-GB",{hour:"2-digit",minute:"2-digit",hour12:!1})}(new Date(e.start)),i=t.find(e=>e.start===a);return i?i.lesson_no:t.find(e=>e.start<=a&&a<e.end)?.lesson_no}(e,r))),o=r.length>0&&n.every(e=>e.every(e=>void 0!==e));let c,d;if(o){const e=n.flat(),t=Math.min(...e),a=Math.max(...e);c=Array.from({length:a-t+1},(e,a)=>t+a),d=c.map(e=>i.map((t,a)=>t.filter((t,i)=>n[a][i]===e)))}else{const e=Math.max(...i.map(e=>e.length),1);c=Array.from({length:e},(e,t)=>t+1),d=c.map((e,t)=>i.map(e=>e[t]?[e[t]]:[]))}const l=Array.from({length:a},(e,a)=>new Date(2026,0,a+5).toLocaleDateString(t.language,{weekday:"short"})),h=new Date,u=wa(h.toISOString())-1,p=u>=0&&u<a?i[u]:[],g=p.find(e=>Qe(e,h)),m=p.find(e=>new Date(e.start)>h),v=!g&&!!m&&p.some(e=>et(e,h));return W`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:calendar-week-outline"></ha-icon></div>
          <div class="title-block">
            <div class="title">${ze(t,"card.week_timetable.title")}</div>
            <div class="subtitle">
              ${v?ze(t,"card.week_timetable.break_now",{minutes:qe(new Date(m.start),h)}):ze(t,function(e){return wa(e.toISOString())>=6}(new Date)?"card.week_timetable.subtitle_upcoming":"card.week_timetable.subtitle")}
            </div>
          </div>
        </div>
        <div
          class="week-grid"
          style="grid-template-columns: 24px repeat(${a}, 1fr); grid-template-rows: auto repeat(${c.length}, 1fr);"
        >
          <span class="h"></span>
          ${l.map(e=>W`<span class="h">${e}</span>`)}
          ${c.map((e,t)=>W`
            <span class="n">${e}</span>
            ${d[t].map((e,t)=>{const a=e[0];if(!a)return W`<div class="cell empty"></div>`;const i=t===u,s=i&&e.some(e=>Qe(e,h)),r=v&&i&&e.includes(m);return W`<div
                class="cell on ${s?"current":""} ${r?"next":""}"
                title=${e.map(e=>e.summary).join(" / ")}
              >${St(a.summary)}${e.length>1?"+":""}</div>`})}
          `)}
        </div>
      </ha-card>
    `}};ka.styles=[Fe,Oe,n`
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
    `],e([me()],ka.prototype,"_config",void 0),e([me()],ka.prototype,"_events",void 0),ka=e([he("librus-week-timetable-card")],ka);const xa=new Set(["unknown","unavailable",""]);function $a(e){return e.toLocaleTimeString("en-GB",{hour:"2-digit",minute:"2-digit",hour12:!1})}function za(e){return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`}let ja=class extends Be{constructor(){super(...arguments),this._events=[]}static getConfigElement(){return Le()}static getStubConfig(){return{type:"custom:librus-bell-schedule-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 3}connectedCallback(){super.connectedCallback(),this._refreshTimer=setInterval(()=>{this._fetch(!0)},9e5),this._tickTimer=setInterval(()=>this.requestUpdate(),3e4)}disconnectedCallback(){super.disconnectedCallback(),clearInterval(this._refreshTimer),clearInterval(this._tickTimer)}_targetDay(){const e=this._nextLessonDateIso();if(e){const t=new Date(`${e}T00:00:00`);if(!Number.isNaN(t.getTime()))return t}const t=new Date;return t.setHours(0,0,0,0),t}_nextLessonDateIso(){if(!this.hass)return;const e=this._resolveEntities();if("error"in e)return;const t=e.map.next_lesson?this.hass.states[e.map.next_lesson]:void 0,a=t?.attributes.date;return a&&!xa.has(t?.state??"")?a:void 0}async _fetch(e=!1){if(!this.hass||!this._config)return;const t=this._resolveEntities();if("error"in t)return;const a=t.map.timetable;if(!a)return;const i=this._targetDay(),s=new Date(i);s.setDate(s.getDate()+1);const r=`${a}:${za(i)}`;if(!e&&this._fetchedFor===r)return;this._fetchedFor=r;const n=this._beginFetch();try{const e=(await Xe(this.hass,a,i,s)).filter(e=>!e.allDay);this._isCurrentFetch(n)&&(this._events=e)}catch{this._isCurrentFetch(n)&&(this._events=[])}}render(){if(!this._config||!this.hass)return q;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{map:t}=e,a=this.hass;this._fetch();const i=t.school?a.states[t.school]:void 0,s=i?.attributes.bell_schedule??[];if(0===s.length)return this._message("mdi:bell-outline",ze(a,"card.bell_schedule.empty"));const r=new Map;for(const e of this._events){const t=$a(new Date(e.start));!r.has(t)&&e.summary&&r.set(t,{subject:e.summary,room:e.location||void 0})}const n=za(this._targetDay())===za(new Date),o=$a(new Date),c=t.current_lesson?a.states[t.current_lesson]:void 0,d=t.next_lesson?a.states[t.next_lesson]:void 0,l=c&&!xa.has(c.state)?c.state:void 0,h=d&&!xa.has(d.state)?d.state:void 0;let u;if(l)u=`${l} · ${ze(a,"label.now")}`;else if(h){const e=Number(d?.attributes.minutes_until);u=Number.isNaN(e)?h:`${h} · ${je(a,e)}`}else u=ze(a,"label.after_school");return W`
      <ha-card @click=${vt(this,this._config.tap_action,t.school)}>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:bell-outline"></ha-icon></div>
          <div class="title-block">
            <div class="title">${this._config.title??ze(a,"card.bell_schedule.title")}</div>
            <div class="subtitle">${u}</div>
          </div>
        </div>
        <div class="periods">
          ${s.map(e=>{const t=r.get(e.start),i=n&&e.start<=o&&o<=e.end,s=n&&o>e.end;return W`
              <div class="period ${i?"current":""} ${s?"past":""} ${t?"":"free"}">
                <span class="pnum">${ze(a,"label.lesson_short",{n:e.lesson_no})}</span>
                <span class="ptime">${e.start}<span class="dash">–</span>${e.end}</span>
                ${t?W`<span class="psubj"
                      >${t.subject}${t.room?W` <span class="proom">${t.room}</span>`:q}</span
                    >`:q}
              </div>
            `})}
        </div>
      </ha-card>
    `}};ja.styles=[Fe,Oe,n`
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
    `],e([me()],ja.prototype,"_config",void 0),e([me()],ja.prototype,"_events",void 0),ja=e([he("librus-bell-schedule-card")],ja);const Ca=Array.from({length:16},(e,t)=>`var(--lc-chart-${t+1})`);let Sa=class extends Be{constructor(){super(...arguments),this._events=[]}static getConfigElement(){return Le()}static getStubConfig(){return{type:"custom:librus-subject-time-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 3}get _dayCount(){return this._config?.show_saturday?6:5}connectedCallback(){super.connectedCallback(),this._refreshTimer=setInterval(()=>{this._fetch(!0)},18e5)}disconnectedCallback(){super.disconnectedCallback(),clearInterval(this._refreshTimer)}async _fetch(e=!1){if(!this.hass||!this._config)return;const t=this._resolveEntities();if("error"in t)return;const a=t.map.timetable;if(!a)return;const i=st(new Date),s=new Date(i);s.setDate(s.getDate()+this._dayCount);const r=`${a}:${i.toDateString()}:${this._dayCount}`;if(!e&&this._fetchedFor===r)return;this._fetchedFor=r;const n=this._beginFetch();try{const e=await Xe(this.hass,a,i,s);this._isCurrentFetch(n)&&(this._events=e)}catch{this._isCurrentFetch(n)&&(this._events=[])}}render(){if(!this._config||!this.hass)return q;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const t=this.hass;if(this._fetch(),0===this._events.length)return this._message("mdi:chart-bar",ze(t,"card.subject_time.empty"));const a=new Map;for(const e of this._events)e.summary&&a.set(e.summary,(a.get(e.summary)??0)+1);const i=[...a.entries()].sort((e,t)=>t[1]-e[1]).map(([e,t],a)=>({label:e,value:t,colorVar:Ca[a%Ca.length]}));return W`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:chart-bar"></ha-icon></div>
          <div class="title-block">
            <div class="title">${ze(t,"card.subject_time.title")}</div>
            <div class="subtitle">${ze(t,"card.subject_time.subtitle")}</div>
          </div>
        </div>
        ${Ke(i)}
      </ha-card>
    `}};Sa.styles=[Fe,Oe],e([me()],Sa.prototype,"_config",void 0),e([me()],Sa.prototype,"_events",void 0),Sa=e([he("librus-subject-time-card")],Sa);let Da=class extends Be{static getConfigElement(){return Le()}static getStubConfig(){return{type:"custom:librus-school-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 2}render(){if(!this._config||!this.hass)return q;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{map:t}=e,a=this.hass,i=t.school?a.states[t.school]:void 0,s=t.school_class?a.states[t.school_class]:void 0;if(!i)return this._message("mdi:school",ze(a,"empty.generic_error"));const r=i.attributes.town,n=i.attributes.street,o=i.attributes.head_teacher,c=s?.attributes.homeroom_teacher,d=s?.attributes.first_semester_end,l=s?.attributes.school_year_end;return W`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:school"></ha-icon></div>
          <div class="title-block">
            <div class="title">${i.state}</div>
            <div class="subtitle">${[r,n].filter(Boolean).join(", ")}</div>
          </div>
        </div>
        <div class="stats">
          ${s?W`<div class="stat"><div class="stat-value">${s.state}</div><div class="stat-label">Klasa</div></div>`:q}
          ${c?W`<div class="stat"><div class="stat-value" style="font-size:0.95rem;">${c}</div><div class="stat-label">${ze(a,"label.tutor")}</div></div>`:q}
        </div>
        ${o?W`<div class="item-text">${ze(a,"label.head_teacher")}: ${o}</div>`:q}
        ${d||l?W`
              <hr />
              <div class="chips">
                ${d?W`<span class="chip">${ze(a,"label.semester_ends")} <span class="n">${Re(d,a.language)}</span></span>`:q}
                ${l?W`<span class="chip">${ze(a,"label.year_ends")} <span class="n">${Re(l,a.language)}</span></span>`:q}
              </div>
            `:q}
      </ha-card>
    `}};Da.styles=[Fe,Oe],e([me()],Da.prototype,"_config",void 0),Da=e([he("librus-school-card")],Da);let Ta=class extends Be{static getConfigElement(){return Le()}static getStubConfig(){return{type:"custom:librus-school-year-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 2}connectedCallback(){super.connectedCallback(),this._tickTimer=setInterval(()=>this.requestUpdate(),36e5)}disconnectedCallback(){super.disconnectedCallback(),clearInterval(this._tickTimer)}render(){if(!this._config||!this.hass)return q;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{map:t}=e,a=this.hass,i=t.school_class?a.states[t.school_class]:void 0,s=i?.attributes.school_year_start,r=i?.attributes.first_semester_end,n=i?.attributes.school_year_end;if(!i||!s||!n)return this._message("mdi:party-popper",ze(a,"card.school_year.empty"));const o=new Date,c=new Date(`${s}T00:00:00`),d=new Date(`${n}T00:00:00`),l=Math.max(1,Ge(c,d)),h=Math.min(l,Math.max(0,Ge(c,o))),u=Math.round(h/l*100),p=Math.max(0,Ge(o,d)),g=!r||tt(o)<=r,m=g&&r?r:n,v=Math.max(0,Ge(o,new Date(`${m}T00:00:00`)));return W`
      <ha-card @click=${vt(this,this._config.tap_action,t.school_class)}>
        <div class="header">
          <div class="icon-badge amber"><ha-icon icon="mdi:party-popper"></ha-icon></div>
          <div class="title-block">
            <div class="title">${ze(a,"card.school_year.title")}</div>
            <div class="subtitle">${Re(n,a.language)}</div>
          </div>
        </div>
        <div class="ring-row">
          ${Ue(u,"var(--lc-brand)",68,7)}
          <div>
            <div class="ring-num">${p}</div>
            <div class="ring-label">${ze(a,"label.days_until_year_end")}</div>
          </div>
        </div>
        <hr />
        <div class="stats">
          <div class="stat">
            <div class="stat-value">${ze(a,"card.attendance.semester",{n:g?1:2})}</div>
            <div class="stat-label">${ze(a,"label.current_semester")}</div>
          </div>
          <div class="stat">
            <div class="stat-value">${v}</div>
            <div class="stat-label">${ze(a,"label.days_until_semester_end")}</div>
          </div>
          <div class="stat">
            <div class="stat-value">${u}<span class="unit">%</span></div>
            <div class="stat-label">${ze(a,"label.year_progress")}</div>
          </div>
        </div>
      </ha-card>
    `}};Ta.styles=[Fe,Oe,n`
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
    `],e([me()],Ta.prototype,"_config",void 0),Ta=e([he("librus-school-year-card")],Ta);let Ia=class extends Be{static getConfigElement(){return Le()}static getStubConfig(){return{type:"custom:librus-today-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 2}connectedCallback(){super.connectedCallback(),this._tickTimer=setInterval(()=>this.requestUpdate(),6e4)}disconnectedCallback(){super.disconnectedCallback(),clearInterval(this._tickTimer)}render(){if(!this._config||!this.hass)return q;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{map:t}=e,a=this.hass,i=e=>t[e]?a.states[t[e]]:void 0,s=i("lucky_number"),r=i("unread_messages"),n=i("unread_announcements"),o=i("timetable"),c=o?.attributes.message,d=o?.attributes.start_time,l="on"===o?.state;return W`
      <ha-card @click=${vt(this,this._config.tap_action,t.timetable)}>
        <div class="header">
          <div class="icon-badge amber"><ha-icon icon="mdi:white-balance-sunny"></ha-icon></div>
          <div class="title-block">
            <div class="title">${ze(a,"card.today.title")}</div>
            <div class="subtitle">${(new Date).toLocaleDateString(a.language,{weekday:"long",day:"numeric",month:"long"})}</div>
          </div>
        </div>
        <div class="stats">
          ${s&&!be.has(s.state)&&!1!==s.attributes.is_today?W`<div class="stat"><div class="stat-value">${s.state}</div><div class="stat-label">${ze(a,"stat.lucky_number")}</div></div>`:q}
          ${r&&!be.has(r.state)?W`<div class="stat"><div class="stat-value">${r.state}</div><div class="stat-label">${ze(a,"card.messages.title")}</div></div>`:q}
          ${n&&!be.has(n.state)?W`<div class="stat"><div class="stat-value">${n.state}</div><div class="stat-label">${ze(a,"card.announcements.title")}</div></div>`:q}
        </div>
        ${c&&d?W`
              <hr />
              <div class="list-item">
                <span class="dot ${l?"good":"neutral"}"></span>
                <div class="body">
                  <div class="row1">${c}</div>
                  ${l?q:W`<div class="item-text">${je(a,qe(new Date(d.replace(" ","T")),new Date))}</div>`}
                </div>
              </div>
            `:q}
      </ha-card>
    `}};function Ea(e){return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`}function Aa(e){const t=new Date(e);for(t.setHours(0,0,0,0),t.setDate(t.getDate()+1);0===t.getDay()||6===t.getDay();)t.setDate(t.getDate()+1);return t}Ia.styles=[Fe,Oe],e([me()],Ia.prototype,"_config",void 0),Ia=e([he("librus-today-card")],Ia);let Na=class extends Be{constructor(){super(...arguments),this._lessons=[]}static getConfigElement(){return Le()}static getStubConfig(){return{type:"custom:librus-tomorrow-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 3}connectedCallback(){super.connectedCallback(),this._refreshTimer=setInterval(()=>{this._fetch(!0)},18e5)}disconnectedCallback(){super.disconnectedCallback(),clearInterval(this._refreshTimer)}async _fetch(e=!1){if(!this.hass||!this._config)return;const t=this._resolveEntities();if("error"in t)return;const a=t.map.timetable;if(!a)return;const i=Aa(new Date),s=new Date(i);s.setDate(s.getDate()+1);const r=`${a}:${Ea(i)}`;if(!e&&this._fetchedFor===r)return;this._fetchedFor=r;const n=this._beginFetch();try{const e=(await Xe(this.hass,a,i,s)).filter(e=>!e.allDay).sort((e,t)=>e.start.localeCompare(t.start));this._isCurrentFetch(n)&&(this._lessons=e)}catch{this._isCurrentFetch(n)&&(this._lessons=[])}}render(){if(!this._config||!this.hass)return q;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{map:t}=e,a=this.hass;this._fetch();const i=Aa(new Date),s=Ea(i),r=new Date;r.setHours(0,0,0,0),r.setDate(r.getDate()+1);const n=s===Ea(r),o=t.homework_assignments?a.states[t.homework_assignments]:void 0,c=(o?.attributes.recent??[]).filter(e=>(e.due_date??"").slice(0,10)===s),d=t.next_exam?a.states[t.next_exam]:void 0,l=(d?.attributes.upcoming??[]).filter(e=>e.date===s);if(0===this._lessons.length&&0===c.length&&0===l.length)return this._message("mdi:calendar-arrow-right",ze(a,"card.tomorrow.empty"));const h=this._lessons[0],u=this._lessons[this._lessons.length-1];return W`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:calendar-arrow-right"></ha-icon></div>
          <div class="title-block">
            <div class="title">
              ${this._config.title??ze(a,n?"card.tomorrow.title":"card.tomorrow.title_next_school_day")}
            </div>
            <div class="subtitle">
              ${i.toLocaleDateString(a.language,{weekday:"long",day:"numeric",month:"long"})}
            </div>
          </div>
        </div>
        ${this._lessons.length?W`
              <div class="stats">
                <div class="stat">
                  <div class="stat-value">${this._lessons.length}</div>
                  <div class="stat-label">${ze(a,"card.tomorrow.lessons")}</div>
                </div>
                <div class="stat">
                  <div class="stat-value">${We(h.start)}</div>
                  <div class="stat-label">${ze(a,"card.tomorrow.starts")}</div>
                </div>
                <div class="stat">
                  <div class="stat-value">${We(u.end)}</div>
                  <div class="stat-label">${ze(a,"card.tomorrow.ends")}</div>
                </div>
              </div>
            `:q}
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
                        <span>${ze(a,"card.tomorrow.homework",{n:c.length})}</span>
                      </div>
                    `:q}
              </div>
            `:q}
        ${this._lessons.length?W`
              <hr />
              <div class="scroll-list">
                ${this._lessons.map(e=>W`
                    <div class="list-item">
                      <span class="lt">${We(e.start)}</span>
                      <div class="body">
                        <div class="row1">${e.summary}</div>
                        ${e.location||e.description?W`<div class="item-text">${[e.location,e.description].filter(Boolean).join(" · ")}</div>`:q}
                      </div>
                    </div>
                  `)}
              </div>
            `:q}
      </ha-card>
    `}};Na.styles=[Fe,Oe,n`
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
    `],e([me()],Na.prototype,"_config",void 0),e([me()],Na.prototype,"_lessons",void 0),Na=e([he("librus-tomorrow-card")],Na);const Ma=/\s*\((odwołane|zastępstwo)\)\s*$/i,La=["var(--lc-chart-1)","var(--lc-chart-2)","var(--lc-chart-3)","var(--lc-chart-7)","var(--lc-chart-8)","var(--lc-chart-10)"];function Pa(e){const t=new Date(e);for(t.setHours(0,0,0,0),t.setDate(t.getDate()+1);0===t.getDay()||6===t.getDay();)t.setDate(t.getDate()+1);return t}const Ba=e=>new Date(e).getTime();function Fa(e,t,a){if(void 0===e)return{skipped:0,free:!1,started:!1,unknown:!0};const i=e.filter(e=>!e.allDay&&e.start.slice(0,10)===t).sort((e,t)=>Ba(e.start)-Ba(t.start)),s=i.filter(e=>!/\(odwołane\)\s*$/i.test(e.summary)),r=s[0];return r?{lesson:{start:r.start,subject:r.summary.replace(Ma,""),room:r.location||void 0,substitution:/\(zastępstwo\)\s*$/i.test(r.summary)},skipped:i.filter(e=>Ba(e.start)<Ba(r.start)&&!s.includes(e)).length,free:!1,started:Ba(r.start)<=a.getTime(),unknown:!1}:{skipped:0,free:!0,started:!1,unknown:!1}}function Oa(e,t,a){if(a?.trim())return a.trim();const i=e.devices?.[t];if(i?.name_by_user)return i.name_by_user;return(i?.name??"").replace(/^e-dziennik\s+/i,"").trim().split(/\s+/)[0]||i?.name||t}let Ka=class extends Be{constructor(){super(...arguments),this._events=new Map}static getConfigElement(){return Le()}static getStubConfig(){return{type:"custom:librus-first-lesson-card"}}setConfig(e){this._config=e}getCardSize(){return 1+2*Math.max(1,this._events.size)}connectedCallback(){super.connectedCallback(),this._refreshTimer=setInterval(()=>{this._fetch(!0)},18e5),this._tickTimer=setInterval(()=>this.requestUpdate(),6e4)}disconnectedCallback(){super.disconnectedCallback(),clearInterval(this._refreshTimer),clearInterval(this._tickTimer)}_deviceIds(){const e=ye(this.hass),t=this._config?.devices;return t?.length?t.filter(t=>e.includes(t)):[...e].sort((e,t)=>Oa(this.hass,e,this._config?.names?.[e]).localeCompare(Oa(this.hass,t,this._config?.names?.[t])))}async _fetch(e=!1){if(!this.hass||!this._config)return;const t=this.hass,a=this._deviceIds(),i=new Date;i.setHours(0,0,0,0);const s=Pa(i);s.setDate(s.getDate()+1);const r=`${a.join(",")}:${tt(i)}`;if(!e&&this._fetchedFor===r)return;this._fetchedFor=r;const n=this._beginFetch(),o=await Promise.all(a.map(async e=>{const a=we(t,e).timetable;if(!a)return[e,void 0];try{return[e,await Xe(t,a,i,s)]}catch{return[e,void 0]}}));this._isCurrentFetch(n)&&(this._events=new Map(o))}render(){if(!this._config||!this.hass)return q;this._syncTheme();const e=this.hass,t=this._config,a=this._deviceIds();if(0===a.length)return this._message("mdi:alert-circle-outline",ze(e,"error.no_device"));if(this._fetch(),0===this._events.size)return this._message("mdi:alarm",ze(e,"empty.loading"));const i=new Date,s=tt(i),r=Pa(i),n=tt(r),o=new Date(i);o.setDate(o.getDate()+1);const c=n===tt(o),d=Boolean(t.only_tomorrow),l=a.map((a,r)=>({deviceId:a,name:Oa(e,a,t.names?.[a]),color:La[r%La.length],today:Fa(this._events.get(a),s,i),next:Fa(this._events.get(a),n,i)}));if(l.every(e=>(d||e.today.free)&&e.next.free))return this._message("mdi:alarm",ze(e,"card.first_lesson.empty"));const h=!d&&l.some(e=>e.today.lesson&&!e.today.started),u=h?"today":"next",p=l.filter(e=>e[u].lesson&&!e[u].started).reduce((e,t)=>!e||Ba(t[u].lesson.start)<Ba(e[u].lesson.start)?t:e,void 0),g=c?ze(e,"card.first_lesson.tomorrow"):r.toLocaleDateString(e.language,{weekday:"short"});let m="";if(p){const t=h?"card.first_lesson.earliest_today":c?"card.first_lesson.earliest_tomorrow":"card.first_lesson.earliest_on",[a,i]=ze(e,t,{day:r.toLocaleDateString(e.language,{weekday:"long"}),who:"\0"}).split("\0");m=W`${a}<b>${p.name} ${We(p[u].lesson.start)}</b>${i??""}`}return W`
      <ha-card class="static">
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:alarm"></ha-icon></div>
          <div class="title-block">
            <div class="title">${t.title??ze(e,"card.first_lesson.title")}</div>
            ${m?W`<div class="subtitle">${m}</div>`:q}
          </div>
        </div>
        <div class="kids">
          ${l.map((t,a)=>W`
              ${a>0?W`<hr />`:q}
              <div class="kid">
                <div class="avatar" style="background:${t.color}">${t.name.slice(0,1).toUpperCase()}</div>
                <div class="kname">${t.name}</div>
                <div class="lines">
                  ${d?q:this._line(ze(e,"card.first_lesson.today"),t.today,{on:h,first:h&&p===t,past:t.today.started||!h})}
                  ${this._line(g,t.next,{on:!h,first:!h&&p===t,past:!1})}
                </div>
              </div>
            `)}
        </div>
      </ha-card>
    `}_line(e,t,a){const i=this.hass,s=`line${a.first?" first":""}${a.past?" past":""}`,r=W`<span class="day ${a.on?"on":""}">${e}</span>`;if(t.unknown||t.free||!t.lesson){const e=t.unknown?ze(i,"card.first_lesson.no_data"):ze(i,"card.first_lesson.free");return W`<div class=${s}>${r}<span class="time">–</span><span class="subj muted">${e}</span></div>`}const n=t.lesson,o=[];return 1===t.skipped&&o.push(ze(i,"card.first_lesson.first_canceled")),t.skipped>1&&o.push(ze(i,"card.first_lesson.first_n_canceled",{n:t.skipped})),n.substitution&&o.push(ze(i,"card.first_lesson.substitution")),W`
      <div class=${s}>
        ${r}
        <span class="time">${We(n.start)}</span>
        <span class="subj"
          >${n.subject}${n.room&&!this._config?.hide_room?W`<span class="muted"> · ${n.room}</span>`:q}${o.map(e=>W` <span class="chip">${e}</span>`)}</span
        >
      </div>
    `}};Ka.styles=[Fe,Oe,n`
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
    `],e([me()],Ka.prototype,"_config",void 0),e([me()],Ka.prototype,"_events",void 0),Ka=e([he("librus-first-lesson-card")],Ka);let Ua=class extends Be{static getConfigElement(){return Le()}static getStubConfig(){return{type:"custom:librus-week-summary-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 2}render(){if(!this._config||!this.hass)return q;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{deviceId:t,map:a}=e,i=this.hass,s=a.attendance?i.states[a.attendance]:void 0,r=a.behaviour_notices?i.states[a.behaviour_notices]:void 0,n=a.agenda?i.states[a.agenda]:void 0,o=new Date;o.setDate(o.getDate()-7);const c=tt(o),d=this._resolveAllByTranslationKey(t,"subject_average").filter(e=>{const t=i.states[e.entityId]?.attributes.latest_grade_date;return t&&t>=c}).length,l=n?.attributes.message;return W`
      <ha-card @click=${vt(this,this._config.tap_action,a.overall_average)}>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:calendar-check-outline"></ha-icon></div>
          <div class="title-block">
            <div class="title">${ze(i,"card.week_summary.title")}</div>
          </div>
        </div>
        <div class="stats">
          <div class="stat">
            <div class="stat-value">${d}</div>
            <div class="stat-label">${ze(i,"stat.new_grades")}</div>
          </div>
          ${s&&!be.has(s.state)?(()=>{const e=s.attributes.unexcused_count??Number(s.state);return W`<div class="stat ${e>0?"bad":""}"><div class="stat-value">${e}</div><div class="stat-label">${ze(i,"stat.absences")}</div></div>`})():q}
          ${r&&!be.has(r.state)?W`<div class="stat"><div class="stat-value">${r.state}</div><div class="stat-label">${ze(i,"card.behaviour_notices.title")}</div></div>`:q}
        </div>
        ${l?(()=>{const{category:e,text:t}=Ve(l);return W`
                <hr />
                <div class="list-item">
                  <span class="dot neutral"></span>
                  <div class="body">
                    ${e?W`<div class="cat-label-row"><span class="cat-label">${e}</span></div>`:q}
                    <div class="row1">${t}</div>
                    ${n?.attributes.start_time?W`<div class="item-text">${Re(String(n.attributes.start_time),i.language)}</div>`:q}
                  </div>
                </div>
              `})():q}
      </ha-card>
    `}};Ua.styles=[Fe,Oe],e([me()],Ua.prototype,"_config",void 0),Ua=e([he("librus-week-summary-card")],Ua);let Ha=class extends Be{static getConfigElement(){return Le()}static getStubConfig(){return{type:"custom:librus-lucky-number-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 2}render(){if(!this._config||!this.hass)return q;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{map:t}=e,a=this.hass,i=t.lucky_number?a.states[t.lucky_number]:void 0;if(!i)return this._message("mdi:dice-5-outline",ze(a,"empty.generic_error"));if(be.has(i.state))return this._message("mdi:dice-5-outline",ze(a,"card.lucky_number.empty"));const s=i.attributes.is_today,r=i.attributes.day,n=i.attributes.is_yours,o=!1===s&&r,c=n?o?ze(a,"card.lucky_number.yours_for_date",{date:Re(r,a.language)}):ze(a,"card.lucky_number.yours_today"):o?ze(a,"card.lucky_number.subtitle_for_date",{date:Re(r,a.language)}):ze(a,"card.lucky_number.subtitle");return W`
      <ha-card
        class=${[bt(this._config.tap_action)?"":"static",n?"yours":""].filter(Boolean).join(" ")}
        @click=${vt(this,this._config.tap_action,t.lucky_number)}
      >
        <div class="header">
          <div class="icon-badge ${n?"good":"amber"}">
            <ha-icon icon=${n?"mdi:party-popper":"mdi:dice-5-outline"}></ha-icon>
          </div>
          <div class="title-block">
            <div class="title">${ze(a,"card.lucky_number.title")}</div>
            <div class="subtitle">${c}</div>
          </div>
        </div>
        <div class="number-wrap">
          <div class="number">${i.state}</div>
        </div>
      </ha-card>
    `}};Ha.styles=[Fe,Oe,n`
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
    `],e([me()],Ha.prototype,"_config",void 0),Ha=e([he("librus-lucky-number-card")],Ha);let Wa=class extends Be{static getConfigElement(){return Le()}static getStubConfig(){return{type:"custom:librus-student-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 3}render(){if(!this._config||!this.hass)return q;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{deviceId:t,map:a}=e,i=this.hass,s=i.devices?.[t]?.name_by_user||i.devices?.[t]?.name||"",r=a.school_class?i.states[a.school_class]?.state:void 0,n=[],o=a.attendance?i.states[a.attendance]:void 0,c=o?.attributes.total_records;if(o&&c){const e=Number(o.state)||0;n.push({key:"attendance",label:ze(i,"stat.attendance_score"),value:Math.round((c-e)/c*100),colorVar:"var(--lc-good)"})}const d=a.behaviour_notices?i.states[a.behaviour_notices]:void 0;d&&!be.has(d.state)&&n.push({key:"behaviour",label:ze(i,"stat.behaviour_score"),value:Math.max(0,100-10*Number(d.state)),colorVar:"var(--lc-brand)"});const l=a.overall_average?i.states[a.overall_average]:void 0;l&&!be.has(l.state)&&n.push({key:"grades",label:ze(i,"stat.grades_score"),value:Math.round(Number(l.state)/6*100),colorVar:"var(--lc-amber)"});const h=this._resolveAllByTranslationKey(t,"subject_average");if(h.length){const e=h.filter(e=>{const t=i.states[e.entityId]?.attributes.grade_count;return t&&t>0}).length;n.push({key:"activity",label:ze(i,"stat.activity_score"),value:Math.round(e/h.length*100),colorVar:"var(--lc-brand)"})}if(0===n.length)return this._message("mdi:cards-outline",ze(i,"empty.generic_error"));const u=Math.round(n.reduce((e,t)=>e+t.value,0)/n.length);return W`
      <ha-card class="tcard" @click=${vt(this,this._config.tap_action,a.overall_average)}>
        <div class="tcard-inner">
          <div class="tcard-head">
            <div>
              <div class="tcard-name">${s}</div>
              ${r?W`<div class="tcard-class">${r}</div>`:q}
            </div>
            <div class="tcard-rating">
              <div class="v">${u}</div>
              <div class="l">${ze(i,"stat.overall_rating")}</div>
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
    `}};Wa.styles=[Fe,Oe,n`
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
    `],e([me()],Wa.prototype,"_config",void 0),Wa=e([he("librus-student-card")],Wa);let Ra=class extends Be{static getConfigElement(){return Le()}static getStubConfig(){return{type:"custom:librus-streak-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 2}render(){if(!this._config||!this.hass)return q;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{map:t}=e,a=this.hass,i=ze(a,"label.days"),s=[],r=t.attendance_streak?a.states[t.attendance_streak]:void 0;if(r&&!be.has(r.state))s.push({key:"attendance",label:ze(a,"card.streak.attendance"),value:Number(r.state),unit:i});else{const e=t.attendance?a.states[t.attendance]:void 0,r=e?.attributes.last_absence_date,n=t.school_class?a.states[t.school_class]?.attributes.school_year_start:void 0,o=r?new Date(`${r}T00:00:00`):n?new Date(`${n}T00:00:00`):void 0;o&&s.push({key:"attendance",label:ze(a,"card.streak.attendance"),value:Math.max(0,Ge(o,new Date)),unit:i})}const n=t.behaviour_streak?a.states[t.behaviour_streak]:void 0;n&&!be.has(n.state)&&s.push({key:"behaviour",label:ze(a,"card.streak.behaviour"),value:Number(n.state),unit:i});const o=t.good_grade_streak?a.states[t.good_grade_streak]:void 0;return o&&!be.has(o.state)&&s.push({key:"grades",label:ze(a,"card.streak.grades"),value:Number(o.state)}),0===s.length?this._message("mdi:fire",ze(a,"empty.generic_error")):W`
      <ha-card
        class=${bt(this._config.tap_action)?"":"static"}
        @click=${vt(this,this._config.tap_action,t.attendance_streak??t.attendance)}
      >
        <div class="header">
          <div class="icon-badge amber"><ha-icon icon="mdi:fire"></ha-icon></div>
          <div class="title-block">
            <div class="title">${ze(a,"card.streak.title")}</div>
          </div>
        </div>
        <div class="stats">
          ${s.map(e=>W`
              <div class="stat">
                <div class="stat-value">${e.value}${e.unit?W`<span class="unit">${e.unit}</span>`:q}</div>
                <div class="stat-label">${e.label}</div>
              </div>
            `)}
        </div>
      </ha-card>
    `}};Ra.styles=[Fe,Oe],e([me()],Ra.prototype,"_config",void 0),Ra=e([he("librus-streak-card")],Ra);const Ga=["bronze","silver","gold","diamond"],qa={bronze:0,silver:3,gold:4,diamond:5},Ja={bronze:"var(--lc-bronze)",silver:"var(--lc-silver)",gold:"var(--lc-amber)",diamond:"var(--lc-diamond)"},Za={bronze:"bronze",silver:"silver",gold:"amber",diamond:"diamond"},Va={bronze:"mdi:medal-outline",silver:"mdi:trophy-outline",gold:"mdi:trophy",diamond:"mdi:diamond-stone"};let Ya=class extends Be{static getConfigElement(){return Le()}static getStubConfig(){return{type:"custom:librus-rank-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 2}render(){if(!this._config||!this.hass)return q;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{map:t}=e,a=this.hass,i=t.rank?a.states[t.rank]:void 0;if(!i)return this._message("mdi:alert-circle-outline",ze(a,"empty.generic_error"));if(be.has(i.state)||(s=i.state,!Ga.includes(s)))return this._message("mdi:trophy-outline",ze(a,"card.rank.empty"));var s;const r=i.state,n=i.attributes.average,o=i.attributes.points_to_next_tier,c=Ga.indexOf(r),d=Ga[c+1],l=qa[r],h=d?qa[d]:void 0,u=void 0!==n&&void 0!==h?(n-l)/(h-l)*100:100;return W`
      <ha-card @click=${vt(this,this._config.tap_action,t.rank)}>
        <div class="header">
          <div class="icon-badge ${Za[r]}">
            <ha-icon icon=${Va[r]}></ha-icon>
          </div>
          <div class="title-block">
            <div class="title">${this._config.title??ze(a,"card.rank.title")}</div>
          </div>
        </div>
        <div class="ring-row">
          ${Ue(Math.round(u),Ja[r],68,7)}
          <div>
            <div class="ring-num" style="color:${Ja[r]}">${ze(a,`rank.${r}`)}</div>
            <div class="ring-label">${void 0!==n?n.toFixed(2):"—"}</div>
          </div>
        </div>
        <div class="hint">
          ${null!=o?W`${o.toFixed(2)} ${ze(a,"label.to_next_rank")}`:ze(a,"label.top_rank")}
        </div>
      </ha-card>
    `}};Ya.styles=[Fe,Oe,n`
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
    `],e([me()],Ya.prototype,"_config",void 0),Ya=e([he("librus-rank-card")],Ya);const Xa=[{sensorKey:"good_grade_streak",idPrefix:"good_grade_streak",thresholds:[5,10,20]},{sensorKey:"attendance_streak",idPrefix:"attendance_streak",thresholds:[7,30,90]},{sensorKey:"behaviour_streak",idPrefix:"behaviour_streak",thresholds:[7,30,90]}];let Qa=class extends Be{constructor(){super(...arguments),this._unlocked=[],this._storageKey="",this._subscribeGeneration=0,this._torndown=!1}static getConfigElement(){return Le()}static getStubConfig(){return{type:"custom:librus-achievements-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 2}connectedCallback(){super.connectedCallback(),this._torndown=!1}disconnectedCallback(){super.disconnectedCallback(),this._torndown=!0,this._subscribeGeneration++,this._unsubscribe?.(),this._unsubscribe=void 0,this._subscribedDeviceId=void 0}_load(e){const t=`librus-achievements:${e}`;if(this._storageKey!==t){this._storageKey=t;try{const e=window.localStorage.getItem(t);this._unlocked=e?JSON.parse(e):[]}catch{this._unlocked=[]}}}_persist(){try{window.localStorage.setItem(this._storageKey,JSON.stringify(this._unlocked.slice(-50)))}catch{}}async _subscribe(e){if(this._subscribedDeviceId===e||!this.hass)return;this._subscribedDeviceId=e,this._unsubscribe?.(),this._unsubscribe=void 0;const t=++this._subscribeGeneration,a=this.hass.devices[e]?.config_entries??[],i=await this.hass.connection.subscribeEvents(e=>{const t=e.data;a.length&&t.entry_id&&!a.includes(t.entry_id)||this._unlocked.some(e=>e.id===t.id)||(this._unlocked=[...this._unlocked,{id:t.id,title:t.title,when:(new Date).toISOString()}],this._persist())},"librus_synergia_achievement_unlocked");this._torndown||t!==this._subscribeGeneration?i():this._unsubscribe=i}_nextMilestoneHint(e,t){let a;for(const i of Xa){const s=t[i.sensorKey],r=s?e.states[s]:void 0;if(!r||be.has(r.state))continue;const n=Number(r.state);if(Number.isFinite(n))for(const t of i.thresholds){if(n>=t)continue;const s=t-n;if(!a||s<a.gap){a={gap:s,remaining:s,title:ze(e,`achievement.${i.idPrefix}_${t}`)}}break}}return a?{remaining:a.remaining,title:a.title}:void 0}render(){if(!this._config||!this.hass)return q;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{deviceId:t,map:a}=e,i=this.hass;this._load(t),this._subscribe(t);const s=this._nextMilestoneHint(i,a);if(0===this._unlocked.length)return this._message("mdi:trophy-outline",ze(i,"card.achievements.empty"),s?ze(i,"card.achievements.next_hint",{n:s.remaining,title:s.title}):void 0);const r=[...this._unlocked].sort((e,t)=>t.when.localeCompare(e.when));return W`
      <ha-card>
        <div class="header">
          <div class="icon-badge amber"><ha-icon icon="mdi:trophy"></ha-icon></div>
          <div class="title-block">
            <div class="title">${this._config.title??ze(i,"card.achievements.title")}</div>
            <div class="subtitle">${ze(i,"card.achievements.count",{n:r.length})}</div>
          </div>
        </div>
        <div class="chips">
          ${r.map(e=>W`<span class="chip hot"><ha-icon icon="mdi:trophy-award"></ha-icon>${e.title}</span>`)}
        </div>
        ${s?W`
              <div class="next-hint">
                <ha-icon icon="mdi:target"></ha-icon>
                <span>${ze(i,"card.achievements.next_hint",{n:s.remaining,title:s.title})}</span>
              </div>
            `:q}
      </ha-card>
    `}};Qa.styles=[Fe,Oe,n`
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
    `],e([me()],Qa.prototype,"_config",void 0),e([me()],Qa.prototype,"_unlocked",void 0),Qa=e([he("librus-achievements-card")],Qa);let ei=class extends Be{static getConfigElement(){return Le()}static getStubConfig(){return{type:"custom:librus-teachers-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 2}render(){if(!this._config||!this.hass)return q;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{map:t}=e,a=this.hass,i=t.school?a.states[t.school]:void 0,s=i?.attributes.subject_teachers??{},r=Object.entries(s),n=t.school_class?a.states[t.school_class]:void 0,o=n?.attributes.homeroom_teacher;return o||0!==r.length?W`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:account-group-outline"></ha-icon></div>
          <div class="title-block">
            <div class="title">${this._config.title??ze(a,"card.teachers.title")}</div>
            <div class="subtitle">${ze(a,"card.teachers.count",{n:r.length})}</div>
          </div>
        </div>
        <div class="scroll-list">
          ${o?W`
                <div class="list-item">
                  <span class="dot warn"></span>
                  <div class="body">
                    <div class="row1"><span>${ze(a,"card.teachers.homeroom")}</span></div>
                    <div class="item-text">${o}</div>
                  </div>
                </div>
              `:q}
          ${r.map(([e,t])=>W`
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
    `:this._message("mdi:account-group-outline",ze(a,"card.teachers.empty"))}};ei.styles=[Fe,Oe],e([me()],ei.prototype,"_config",void 0),ei=e([he("librus-teachers-card")],ei);let ti=class extends Be{static getConfigElement(){return Le()}static getStubConfig(){return{type:"custom:librus-level-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 2}render(){if(!this._config||!this.hass)return q;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{deviceId:t,map:a}=e,i=this.hass;let s=0,r=0;for(const e of this._resolveAllByTranslationKey(t,"subject_average")){const t=i.states[e.entityId]?.attributes.grades??[];for(const e of t){s+=1;const t=/^([1-6])/.exec(e.value.trim())?.[1];t&&Number(t)>=4&&(r+=1)}}const n=a.attendance?i.states[a.attendance]:void 0,o=n?.attributes.total_records??0,c=n?.attributes.unexcused_count??0,d=n?.attributes.excused_count??0,l=8*s+7*r,h=1*Math.max(0,o-c-d),u=l+h,{level:p,into:g,span:m}=function(e){let t=1,a=0,i=100;for(;e>=a+i;)a+=i,t+=1,i+=100;return{level:t,into:e-a,span:i}}(u),v=g/m*100;return W`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:progress-star"></ha-icon></div>
          <div class="title-block">
            <div class="title">${this._config.title??ze(i,"card.level.title")}</div>
            <div class="subtitle">${ze(i,"card.level.subtitle")}</div>
          </div>
        </div>
        <div class="ring-row">
          ${Ue(Math.round(v),"var(--lc-brand)",68,7)}
          <div>
            <div class="ring-num">${ze(i,"label.level",{n:p})}</div>
            <div class="ring-label">${ze(i,"label.xp_to_next",{n:m-g})}</div>
          </div>
        </div>
        <div class="stats">
          <div class="stat">
            <div class="stat-value">${l}</div>
            <div class="stat-label">${ze(i,"label.xp_from_grades")}</div>
          </div>
          <div class="stat">
            <div class="stat-value">${h}</div>
            <div class="stat-label">${ze(i,"label.xp_from_attendance")}</div>
          </div>
          <div class="stat">
            <div class="stat-value">${u}</div>
            <div class="stat-label">${ze(i,"label.xp_total")}</div>
          </div>
        </div>
      </ha-card>
    `}};ti.styles=[Fe,Oe,n`
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
    `],e([me()],ti.prototype,"_config",void 0),ti=e([he("librus-level-card")],ti);const ai=[{id:"naukowiec",icon:"mdi:flask-outline",subjects:["Matematyka","Fizyka","Chemia","Informatyka","Biologia","Geografia"],avgChipKey:"hero.chip.avg_naukowiec"},{id:"humanista",icon:"mdi:book-open-page-variant-outline",subjects:["Język polski","Historia","Wiedza o społeczeństwie","Filozofia"],avgChipKey:"hero.chip.avg_humanista"},{id:"poliglota",icon:"mdi:translate",subjects:["Język angielski","Język niemiecki","Język francuski","Język hiszpański","Język rosyjski","Język włoski"],avgChipKey:"hero.chip.avg_poliglota"},{id:"artysta",icon:"mdi:palette-outline",subjects:["Plastyka","Muzyka"],avgChipKey:"hero.chip.avg_artysta"},{id:"sportowiec",icon:"mdi:run",subjects:["Wychowanie fizyczne"],avgChipKey:"hero.chip.avg_sportowiec"}],ii={wojownik:"mdi:shield-check-outline",meteor:"mdi:meteor",feniks:"mdi:fire",spolecznik:"mdi:hand-heart-outline",kolekcjoner:"mdi:trophy-outline",prymus:"mdi:crown-outline",wszechstronny:"mdi:scale-balance"};function si(e,t){return{icon:t,nameKey:{archetype:`hero.${e}.archetype_name`,hero:`hero.${e}.hero_name`},descKey:{archetype:`hero.${e}.archetype_desc`,hero:`hero.${e}.hero_desc`}}}const ri={};for(const e of ai)ri[e.id]=si(e.id,e.icon);for(const[e,t]of Object.entries(ii))ri[e]=si(e,t);function ni(e){return e.toFixed(1)}function oi(e,t){let a=0,i=0;for(const s of e)!t.includes(s.subject)||null===s.average||s.gradeCount<=0||(a+=s.average*s.gradeCount,i+=s.gradeCount);return i>0?{avg:a/i,count:i}:null}const ci="librus-hero-history:";function di(e){try{const t=window.localStorage.getItem(`librus-achievements:${e}`);if(!t)return 0;const a=JSON.parse(t);return Array.isArray(a)?a.length:0}catch{return 0}}let li=class extends Be{static getConfigElement(){return Le()}static getStubConfig(){return{type:"custom:librus-hero-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 2}updated(e){super.updated(e),this._pendingHistory&&function(e,t){try{const a=`${ci}${e}`,i=window.localStorage.getItem(a),s=i?JSON.parse(i):[],r=s[s.length-1];if(r&&r.id===t)return;s.push({id:t,when:(new Date).toISOString()}),window.localStorage.setItem(a,JSON.stringify(s.slice(-30)))}catch{}}(this._pendingHistory.deviceId,this._pendingHistory.resultId)}render(){if(!this._config||!this.hass)return q;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{deviceId:t,map:a}=e,i=this.hass,s="hero"===this._config.mode?"hero":"archetype",r=this._resolveAllByTranslationKey(t,"subject_average").map(e=>{const t=i.states[e.entityId],a=t?.attributes.grades??[];return{subject:e.subject,average:t?Je(t.state):null,gradeCount:a.length}}),n=a.overall_average?i.states[a.overall_average]:void 0,o=a.attendance?i.states[a.attendance]:void 0,c=a.attendance_streak?i.states[a.attendance_streak]:void 0,d=a.good_grade_streak?i.states[a.good_grade_streak]:void 0,l=a.behaviour_grade?i.states[a.behaviour_grade]:void 0,h=a.behaviour_notices?i.states[a.behaviour_notices]:void 0,u=h?.attributes.recent??[],p=function(e){const t=e.subjects.filter(e=>e.gradeCount>0);if(!(t.length>0||null!==e.attendanceStreak||null!==e.behaviourShortName))return null;if(null!==e.overallAverage&&e.overallAverage>=5.3&&t.length>=4)return{...ri.prymus,id:"prymus",evidence:[{key:"hero.chip.overall_avg_full",vars:{n:ni(e.overallAverage)}},{key:"hero.chip.subjects_count",vars:{n:t.length}}]};if(e.achievementCount>=5)return{...ri.kolekcjoner,id:"kolekcjoner",evidence:[{key:"hero.chip.badges",vars:{n:e.achievementCount}},{key:"hero.chip.various_categories"}]};if(null!==e.overallSemester1&&null!==e.overallSemester2&&e.overallSemester2-e.overallSemester1>=.5)return{...ri.feniks,id:"feniks",evidence:[{key:"hero.chip.semester1",vars:{n:ni(e.overallSemester1)}},{key:"hero.chip.semester2",vars:{n:ni(e.overallSemester2)}}]};if(null!==e.attendanceStreak&&e.attendanceStreak>=30&&0===e.unexcusedCount)return{...ri.wojownik,id:"wojownik",evidence:[{key:"hero.chip.streak_days",vars:{n:e.attendanceStreak}},{key:"hero.chip.unexcused",vars:{n:0}}]};if(null!==e.goodGradeStreak&&e.goodGradeStreak>=10)return{...ri.meteor,id:"meteor",evidence:[{key:"hero.chip.good_streak",vars:{n:e.goodGradeStreak}},null!==e.overallAverage?{key:"hero.chip.overall_avg",vars:{n:ni(e.overallAverage)}}:{key:"hero.chip.various_categories"}]};const a=e.recentNoteSentiments.filter(e=>"positive"===e).length,i=e.recentNoteSentiments.filter(e=>"negative"===e).length;if("wz"===e.behaviourShortName&&a>=2&&0===i)return{...ri.spolecznik,id:"spolecznik",evidence:[{key:"hero.chip.behaviour",vars:{name:e.behaviourShortName}},{key:"hero.chip.positive_notes",vars:{n:a}}]};const s=ai.map(t=>({cluster:t,result:oi(e.subjects,t.subjects)})).filter(e=>null!==e.result);if(s.length>0){s.sort((e,t)=>t.result.avg-e.result.avg);const e=s[0],t=s[1],a=t?e.result.avg-t.result.avg:e.result.avg;if(e.result.count>=2&&a>=.4)return{...ri[e.cluster.id],id:e.cluster.id,evidence:[{key:e.cluster.avgChipKey,vars:{n:ni(e.result.avg)}},{key:"hero.chip.grades",vars:{n:e.result.count}}]}}const r=s.length>=2?s[0].result.avg-s[s.length-1].result.avg:0;return{...ri.wszechstronny,id:"wszechstronny",evidence:[{key:"hero.chip.spread",vars:{n:ni(r)}},{key:"hero.chip.subjects_count",vars:{n:t.length}}]}}({subjects:r,overallAverage:Je(n?.state),overallSemester1:Je(n?.attributes.average_semester_1),overallSemester2:Je(n?.attributes.average_semester_2),attendanceStreak:Je(c?.state),unexcusedCount:Je(o?.attributes.unexcused_count),goodGradeStreak:Je(d?.state),behaviourShortName:l&&!["unknown","unavailable"].includes(l.state)?l.state:null,recentNoteSentiments:u.map(e=>e.sentiment),achievementCount:di(t)});return p?(this._pendingHistory={deviceId:t,resultId:p.id},W`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:creation-outline"></ha-icon></div>
          <div class="title-block">
            <div class="title">
              ${this._config.title??ze(i,"hero"===s?"card.hero.title_hero":"card.hero.title_archetype")}
            </div>
            <div class="subtitle">${ze(i,"card.hero.subtitle")}</div>
          </div>
        </div>
        <div class="result">
          <div class="result-badge"><ha-icon icon=${p.icon}></ha-icon></div>
          <div class="result-name">${ze(i,p.nameKey[s])}</div>
          <div class="result-desc">${ze(i,p.descKey[s])}</div>
        </div>
        <div class="evidence">
          ${p.evidence.map(e=>W`<span class="evidence-chip">${ze(i,e.key,e.vars)}</span>`)}
        </div>
      </ha-card>
    `):(this._pendingHistory=void 0,this._message("mdi:creation-outline",ze(i,"card.hero.empty")))}};li.styles=[Fe,Oe,n`
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
    `],e([me()],li.prototype,"_config",void 0),li=e([he("librus-hero-card")],li);const hi={wz:10,bdb:8,db:6,popr:4,ndp:2,ng:0},ui={diamond:10,gold:7.5,silver:5,bronze:2.5};function pi(e,t){const a=ai.find(e=>e.id===t);if(!a)return 0;const i=oi(e,a.subjects);return i?Math.round(10*(i.avg/6*10+Number.EPSILON))/10:0}const gi=10,mi=["1","2","3","4","5","7"],vi=260,bi=240;let _i=class extends Be{static getConfigElement(){return Le()}static getStubConfig(){return{type:"custom:librus-hero-stats-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 3}_renderStatRadar(e,t){const a=Math.min(vi,bi)/2-34,i=e.length,s=e=>-Math.PI/2+2*e*Math.PI/i,r=(e,t)=>{const i=Math.max(0,Math.min(gi,t))/gi*a;return[130+i*Math.cos(s(e)),116+i*Math.sin(s(e))]},n=[1/3,2/3,1].map(t=>e.map((e,a)=>r(a,gi*t).join(",")).join(" ")),o=e.map((e,t)=>r(t,gi)),c=e.map((e,t)=>r(t,e.value).join(",")).join(" "),d=e.map((e,t)=>r(t,Math.max(e.value,1.5)));return W`
      <svg width=${vi} height=${bi} viewBox="0 0 ${vi} ${bi}" class="radar-chart">
        ${n.map(e=>R`<polygon points=${e} class="radar-grid"></polygon>`)}
        ${o.map(([e,t])=>R`<line x1=${130} y1=${116} x2=${e} y2=${t} class="radar-axis"></line>`)}
        <polygon points=${c} class="radar-fill-polygon"></polygon>
        ${d.map(([t,a],i)=>{const s=`var(--lc-chart-${mi[i%mi.length]})`;return R`
            <circle cx=${t} cy=${a} r="11" class="vertex-badge" style="stroke:${s}"></circle>
            <foreignObject x=${t-9} y=${a-9} width="18" height="18">
              ${W`<div class="vertex-icon" style="color:${s}"><ha-icon icon=${e[i].icon}></ha-icon></div>`}
            </foreignObject>
          `})}
        ${e.map((e,a)=>{const[i,n]=r(a,1.14*gi),o=Math.cos(s(a)),c=Math.abs(o)<.3?"middle":o>0?"start":"end";return R`<text x=${i} y=${n+3} text-anchor=${c} class="radar-label">${ze(t,e.labelKey)}</text>`})}
      </svg>
    `}render(){if(!this._config||!this.hass)return q;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{deviceId:t,map:a}=e,i=this.hass,s=this._resolveAllByTranslationKey(t,"subject_average").map(e=>{const t=i.states[e.entityId],a=(t?.attributes.grades??[]).length;return{subject:e.subject,average:t?Je(t.state):null,gradeCount:a}}),r=a.attendance_streak?i.states[a.attendance_streak]:void 0,n=a.behaviour_grade?i.states[a.behaviour_grade]:void 0,o=a.rank?i.states[a.rank]:void 0,c=function(e){const t=null!==e.attendanceStreak?Math.round(100*Math.min(1,e.attendanceStreak/30))/10:0,a=e.behaviourShortName?hi[e.behaviourShortName]??5:0,i=e.rankTier?ui[e.rankTier]??0:0;return[{id:"sila",labelKey:"hero_stat.sila",icon:"mdi:arm-flex-outline",value:pi(e.subjects,"sportowiec")},{id:"intelekt",labelKey:"hero_stat.intelekt",icon:"mdi:flask-outline",value:pi(e.subjects,"naukowiec")},{id:"wiedza",labelKey:"hero_stat.wiedza",icon:"mdi:book-open-page-variant-outline",value:pi(e.subjects,"humanista")},{id:"charyzma",labelKey:"hero_stat.charyzma",icon:"mdi:hand-heart-outline",value:a},{id:"wytrwalosc",labelKey:"hero_stat.wytrwalosc",icon:"mdi:shield-check-outline",value:t},{id:"szczescie",labelKey:"hero_stat.szczescie",icon:"mdi:clover-outline",value:i}]}({subjects:s,attendanceStreak:Je(r?.state),behaviourShortName:n&&!["unknown","unavailable"].includes(n.state)?n.state:null,rankTier:o&&!["unknown","unavailable"].includes(o.state)?o.state:null});if(c.every(e=>0===e.value))return this._message("mdi:arm-flex-outline",ze(i,"card.hero_stats.empty"));const d=Math.round(c.reduce((e,t)=>e+t.value,0));return W`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:arm-flex-outline"></ha-icon></div>
          <div class="title-block">
            <div class="title">${this._config.title??ze(i,"card.hero_stats.title")}</div>
            <div class="subtitle">${ze(i,"card.hero_stats.subtitle")}</div>
          </div>
          <div class="power-badge">
            <div class="power-n">${d}</div>
            <div class="power-l">${ze(i,"card.hero_stats.power")}</div>
          </div>
        </div>
        <div class="chart-wrap glow">${this._renderStatRadar(c,i)}</div>
        <div class="stat-bars">
          ${c.map((e,t)=>{const a=`var(--lc-chart-${mi[t%mi.length]})`;return W`
              <div class="stat-row">
                <div class="stat-icon" style="background:color-mix(in srgb, ${a} 16%, transparent); color:${a}">
                  <ha-icon icon=${e.icon}></ha-icon>
                </div>
                <div class="stat-mid">
                  <span class="stat-name">${ze(i,e.labelKey)}</span>
                  <div class="stat-track">
                    <div class="stat-fill" style="width:${e.value/gi*100}%; background:${a}"></div>
                  </div>
                </div>
                <span class="stat-value" style="color:${a}">${e.value.toFixed(1)}</span>
              </div>
            `})}
        </div>
      </ha-card>
    `}};_i.styles=[Fe,Oe,n`
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
    `],e([me()],_i.prototype,"_config",void 0),_i=e([he("librus-hero-stats-card")],_i);let yi=class extends Be{static getConfigElement(){return Le()}static getStubConfig(){return{type:"custom:librus-hero-history-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 3}render(){if(!this._config||!this.hass)return q;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{deviceId:t}=e,a=this.hass,i="hero"===this._config.mode?"hero":"archetype",s=function(e){try{const t=window.localStorage.getItem(`${ci}${e}`);if(!t)return[];const a=JSON.parse(t);return Array.isArray(a)?a:[]}catch{return[]}}(t);if(0===s.length)return this._message("mdi:history",ze(a,"card.hero_history.empty"));const r=new Date,n=[...s].reverse().map((e,t)=>{const a=ri[e.id],i=new Date(e.when),n=0===t?r:new Date(s[s.length-t].when);return{entry:e,catalog:a,isCurrent:0===t,days:Math.max(0,Ge(i,n))}});return W`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:history"></ha-icon></div>
          <div class="title-block">
            <div class="title">${this._config.title??ze(a,"card.hero_history.title")}</div>
            <div class="subtitle">${ze(a,"card.hero_history.subtitle")}</div>
          </div>
        </div>
        <div class="scroll-list">
          ${n.map(e=>W`
              <div class="list-item">
                <div class="type-icon"><ha-icon icon=${e.catalog?.icon??"mdi:help-circle"}></ha-icon></div>
                <div class="body">
                  <div class="row1">
                    <span>${e.catalog?ze(a,e.catalog.nameKey[i]):e.entry.id}</span>
                    <time>${Re(e.entry.when,a.language)}</time>
                  </div>
                  <div class="item-text">
                    ${e.isCurrent?ze(a,"card.hero_history.current",{n:e.days}):`${e.days} ${ze(a,"label.days")}`}
                  </div>
                </div>
              </div>
            `)}
        </div>
      </ha-card>
    `}};yi.styles=[Fe,Oe,n`
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
    `],e([me()],yi.prototype,"_config",void 0),yi=e([he("librus-hero-history-card")],yi);const fi=["overall_average","attendance","school"];let wi=class extends Be{static getConfigElement(){return Le()}static getStubConfig(){return{type:"custom:librus-last-update-tile-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 1}connectedCallback(){super.connectedCallback(),this._tickTimer=setInterval(()=>this.requestUpdate(),3e4)}disconnectedCallback(){super.disconnectedCallback(),clearInterval(this._tickTimer)}render(){if(!this._config||!this.hass)return q;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{map:t}=e,a=this.hass,i=fi.map(e=>t[e]).find(e=>e&&a.states[e]),s=i?a.states[i]:void 0;if(!s)return this._message("mdi:clock-check-outline",ze(a,"empty.generic_error"));const r=s.last_reported??s.last_updated;return W`
      <ha-card class="tile">
        <div class="icon-badge"><ha-icon icon="mdi:clock-check-outline"></ha-icon></div>
        <div class="tile-body">
          <div class="subj">${function(e,t){if(!t)return"";const a=new Date(t).getTime();if(Number.isNaN(a))return"";const i=Math.max(0,Math.floor((Date.now()-a)/6e4));if(i<1)return ze(e,"label.just_now");if(i<60)return ze(e,"label.minutes_ago",{minutes:i});const s=Math.floor(i/60);return s<24?ze(e,"label.hours_ago",{hours:s}):ze(e,"label.days_ago",{days:Math.floor(s/24)})}(a,r)}</div>
          <div class="meta">${ze(a,"card.last_update.subtitle")}</div>
        </div>
      </ha-card>
    `}};wi.styles=[Fe,Oe,n`
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
    `],e([me()],wi.prototype,"_config",void 0),wi=e([he("librus-last-update-tile-card")],wi);const ki=["grades","attendance","behaviour","next_week","school_news"],xi={good:"good",ok:"ok",caution:"caution"};let $i=class extends Be{constructor(){super(...arguments),this._pressing=!1}static getConfigElement(){return Le()}static getStubConfig(){return{type:"custom:librus-ai-summary-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return this._config?.summary_only?4:8}render(){if(!this._config||!this.hass)return q;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const t=this.hass,a=e.map.weekly_summary,i=e.map.weekly_summary_generate,s=a?t.states[a]:void 0;if(!s)return this._message("mdi:creation-outline",ze(t,"card.ai_summary.setup"),ze(t,"card.ai_summary.setup_hint"));const r=s.attributes,n=Boolean(r.generating)||this._pressing,o=be.has(s.state)?void 0:s.state;if(!o)return W`
        <ha-card class="static">
          <div class="empty">
            <ha-icon icon="mdi:creation-outline"></ha-icon>
            <div class="t1">${ze(t,n?"card.ai_summary.generating":"card.ai_summary.waiting")}</div>
            <div class="t2">${r.error?String(r.error):this._nextRun(r)}</div>
          </div>
          ${this._footer(r,i,n,!1)}
        </ha-card>
      `;const c="string"==typeof r.status?r.status:void 0,d=r.sections??{},l=ki.filter(e=>d[e]?.text),h=Array.isArray(r.advice)?r.advice:[],u="string"==typeof r.warning&&r.warning?r.warning:void 0,p="string"==typeof r.summary&&r.summary?r.summary:void 0,g=this._tab&&l.includes(this._tab)?this._tab:l[0],m=!0===this._config.summary_only;return W`
      <ha-card class="static">
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:creation"></ha-icon></div>
          <div class="title-block">
            <div class="title">${this._config.title||ze(t,"card.ai_summary.title")}</div>
            <div class="subtitle">${this._subtitle(r)}</div>
          </div>
          ${c&&xi[c]?W`<span class="pill ${xi[c]}">${ze(t,`ai_summary.status.${c}`)}</span>`:q}
        </div>
        <div class="headline">${o}</div>
        ${u?W`<div class="warning"><ha-icon icon="mdi:alert"></ha-icon><div>${u}</div></div>`:q}
        ${m?q:l.length&&g?W`${this._tabs(d,l,g)} ${this._panel(g,d[g])}`:p?W`<div class="prose">${this._paragraphs(p)}</div>`:q}
        ${h.length?W`
              <div class="advice">
                <div class="label">${ze(t,"card.ai_summary.advice")}</div>
                <ol>
                  ${h.map(e=>W`<li>${e}</li>`)}
                </ol>
              </div>
            `:q}
        ${this._footer(r,i,n,!0)}
      </ha-card>
    `}_subtitle(e){const t=this.hass,a=[],i=new Intl.DateTimeFormat(t.language,{day:"numeric",month:"numeric"}),s="string"==typeof e.week_from?new Date(`${e.week_from}T12:00:00`):void 0,r="string"==typeof e.week_to?new Date(`${e.week_to}T12:00:00`):void 0;return s&&r&&!Number.isNaN(s.getTime())&&!Number.isNaN(r.getTime())&&a.push(`${i.format(s)} – ${i.format(r)}`),"student"!==e.audience&&"parent"!==e.audience||a.push(ze(t,`card.ai_summary.for_${e.audience}`)),a.join(" · ")}_nextRun(e){const t=this.hass;if(e.paused)return ze(t,"card.ai_summary.paused");const a="string"==typeof e.next_run?new Date(e.next_run):void 0;if(!a||Number.isNaN(a.getTime()))return"";return ze(t,"card.ai_summary.next_run",{when:new Intl.DateTimeFormat(t.language,{weekday:"short",day:"numeric",month:"numeric",hour:"2-digit",minute:"2-digit"}).format(a)})}_footer(e,t,a,i){const s=this.hass,r=t&&!0!==this._config?.hide_generate,n=this._pressError??(i&&e.error?String(e.error):void 0);return W`
      <div class="foot">
        <div class="foot-text">
          ${i?W`<span>${this._nextRun(e)}</span><span>${ze(s,"card.ai_summary.disclaimer")}</span>`:q}
          ${n?W`<span class="err">${n}</span>`:q}
        </div>
        ${r?W`<button class="gen" type="button" ?disabled=${a} @click=${()=>this._generate(t)}>
              <ha-icon icon=${a?"mdi:timer-sand":"mdi:refresh"}></ha-icon>
              ${ze(s,a?"card.ai_summary.generating":"card.ai_summary.generate")}
            </button>`:q}
      </div>
    `}async _generate(e){if(this.hass&&!this._pressing){this._pressing=!0,this._pressError=void 0;try{await this.hass.callService("button","press",{entity_id:e})}catch(e){this._pressError=e instanceof Error?e.message:String(e?.message??e)}finally{this._pressing=!1}}}_tabs(e,t,a){const i=this.hass;return W`
      <div class="tabs" role="tablist">
        ${t.map(t=>{const s=xi[e[t]?.status??""]??"none";return W`
            <button
              class="tab"
              type="button"
              role="tab"
              aria-selected=${t===a?"true":"false"}
              @click=${()=>this._tab=t}
            >
              <span class="sdot ${s}"></span>${ze(i,`ai_summary.section.${t}`)}
            </button>
          `})}
      </div>
    `}_panel(e,t){const a=this.hass,i=t.status?xi[t.status]:void 0;return W`
      <div class="panel" role="tabpanel">
        <div class="panel-head">
          <span>${ze(a,`ai_summary.section.${e}`)}</span>
          ${i?W`<span class="pill small ${i}">${ze(a,`ai_summary.status.${t.status}`)}</span>`:q}
        </div>
        <div class="prose">${this._paragraphs(t.text??"")}</div>
      </div>
    `}_paragraphs(e){return e.split(/\n\s*\n/).map(e=>e.trim()).filter(Boolean).map(e=>W`<p>${e}</p>`)}};$i.styles=[Fe,Oe,n`
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
    `],e([me()],$i.prototype,"_config",void 0),e([me()],$i.prototype,"_tab",void 0),e([me()],$i.prototype,"_pressing",void 0),e([me()],$i.prototype,"_pressError",void 0),$i=e([he("librus-ai-summary-card")],$i),window.customCards=window.customCards||[],window.customCards.push({type:"librus-grades-card",name:"Librus - Średnia ocen",description:"Średnia ogólna i średnie z każdego przedmiotu, z paskami porównawczymi.",preview:!0},{type:"librus-grade-log-card",name:"Librus - Dziennik ocen",description:"Wszystkie oceny ze wszystkich przedmiotów w jednej chronologicznej liście.",preview:!0},{type:"librus-subject-grades-card",name:"Librus - Oceny z przedmiotu",description:"Pełna lista ocen z JEDNEGO wybranego przedmiotu (wybór w konfiguracji karty).",preview:!0},{type:"librus-grade-trend-card",name:"Librus - Trend średniej",description:"Jak zmieniała się średnia (ogólna lub przedmiotu) w ostatnich 60 dniach.",preview:!0},{type:"librus-grade-goal-card",name:"Librus - Cel oceny",description:"Postęp do wybranej docelowej średniej (ogólnej lub z przedmiotu) + ile ocen brakuje.",preview:!0},{type:"librus-grade-simulator-card",name:"Librus - Symulator ocen",description:"A gdyby następna ocena to __ (waga __)? Zobacz, gdzie wylądowałaby średnia z przedmiotu.",preview:!0},{type:"librus-semester-comparison-card",name:"Librus - Porównanie semestrów",description:"Średnia z semestru 1 i 2 dla każdego przedmiotu obok siebie, ze zmianą.",preview:!0},{type:"librus-grade-distribution-card",name:"Librus - Rozkład ocen",description:"Histogram: ile było szóstek, piątek, czwórek itd. ze wszystkich przedmiotów.",preview:!0},{type:"librus-grades-radar-card",name:"Librus - Profil ocen (radar)",description:"Wykres pajęczynowy średnich wszystkich przedmiotów na jednym wykresie.",preview:!0},{type:"librus-grade-category-distribution-card",name:"Librus - Oceny wg kategorii",description:"Poziomy wykres słupkowy: ile ocen ze sprawdzianów, kartkówek, odpowiedzi itd.",preview:!0},{type:"librus-latest-grade-card",name:"Librus - Ostatnia ocena",description:"Najnowsza ocena ze wszystkich przedmiotów, wraz z komentarzem nauczyciela.",preview:!0},{type:"librus-behaviour-grade-card",name:"Librus - Ocena zachowania",description:"Formalna ocena zachowania, odrębna od uwag.",preview:!0},{type:"librus-descriptive-grades-card",name:"Librus - Oceny opisowe",description:"Oceny opisowe (nienumeryczne), jeśli szkoła je stosuje.",preview:!0},{type:"librus-subject-spotlight-card",name:"Librus - Najlepszy i najsłabszy przedmiot",description:"Dwa skrajne przedmioty wg średniej, obliczone z sensorów średnich per przedmiot.",preview:!0},{type:"librus-attendance-card",name:"Librus - Frekwencja",description:"Liczba realnych nieobecności i spóźnień, z rozbiciem na typy, % i podziałem na semestr.",preview:!0},{type:"librus-attendance-tile-card",name:"Librus - Frekwencja (kafelek)",description:"Kompaktowy kafelek z liczbą nieobecności i frekwencją %.",preview:!0},{type:"librus-attendance-heatmap-card",name:"Librus - Frekwencja (mapa roku)",description:"Mapa dni całego roku szkolnego kolorowana wg statusu frekwencji, w stylu GitHub contributions.",preview:!0},{type:"librus-attendance-weekday-card",name:"Librus - Nieobecności wg dnia tygodnia",description:"Słupek na każdy dzień tygodnia podzielony na usprawiedliwione/nieusprawiedliwione/spóźnienia.",preview:!0},{type:"librus-attendance-subject-card",name:"Librus - Nieobecności wg przedmiotu",description:"Ranking przedmiotów wg liczby nieobecności, podzielony na usprawiedliwione/nieusprawiedliwione.",preview:!0},{type:"librus-subject-attendance-card",name:"Librus - Frekwencja z przedmiotów",description:"Kafelki z procentem obecności na każdym przedmiocie, kolorem widać, gdzie jest problem.",preview:!0},{type:"librus-behaviour-notices-card",name:"Librus - Uwagi",description:"Lista uwag z kategorią i zabarwieniem (pozytywna/negatywna/neutralna).",preview:!0},{type:"librus-behaviour-notices-tile-card",name:"Librus - Uwagi (kafelek)",description:"Kompaktowy kafelek z liczbą uwag i ostatnią kategorią.",preview:!0},{type:"librus-messages-card",name:"Librus - Wiadomości",description:"Nieprzeczytane wiadomości ze wszystkich skrzynek i podgląd ostatnich z odebranych.",preview:!0},{type:"librus-messages-tile-card",name:"Librus - Wiadomości (kafelek)",description:"Kompaktowy kafelek z liczbą nieprzeczytanych i ostatnim nadawcą.",preview:!0},{type:"librus-substitutions-card",name:"Librus - Zastępstwa i alerty",description:"Pełna treść zastępstw i alertów - kliknij, by rozwinąć.",preview:!0},{type:"librus-announcements-card",name:"Librus - Ogłoszenia",description:"Nieprzeczytane ogłoszenia z tablicy szkolnej.",preview:!0},{type:"librus-announcements-tile-card",name:"Librus - Ogłoszenia (kafelek)",description:"Kompaktowy kafelek z liczbą nieprzeczytanych ogłoszeń.",preview:!0},{type:"librus-homework-assignments-card",name:"Librus - Zadania domowe",description:"Lista realnych zadań domowych z terminami.",preview:!0},{type:"librus-homework-checklist-card",name:"Librus - Zadania do odhaczenia",description:"Zadania domowe z polem wyboru - odhaczone lądują na dole (stan zapisany lokalnie w przeglądarce).",preview:!0},{type:"librus-recent-activity-card",name:"Librus - Co nowego",description:"Wspólny, chronologiczny feed najnowszych ocen, uwag, ogłoszeń i wiadomości.",preview:!0},{type:"librus-today-lessons-card",name:"Librus - Dzisiejszy plan lekcji",description:"Oś czasu dzisiejszych lekcji z podświetleniem aktualnej.",preview:!0},{type:"librus-next-lesson-tile-card",name:"Librus - Najbliższa lekcja",description:"Kompaktowy kafelek z najbliższą lub trwającą lekcją.",preview:!0},{type:"librus-agenda-card",name:"Librus - Terminarz",description:"Nadchodzące wydarzenia z terminarza, pogrupowane wg dnia.",preview:!0},{type:"librus-exam-countdown-card",name:"Librus - Najbliższy sprawdzian",description:"Odliczanie do najbliższego sprawdzianu z terminarza, wyodrębnione z ogólnej listy.",preview:!0},{type:"librus-free-days-card",name:"Librus - Dni wolne",description:"Odliczanie do najbliższej przerwy i lista kolejnych dni wolnych.",preview:!0},{type:"librus-free-days-tile-card",name:"Librus - Dni wolne (kafelek)",description:"Kompaktowy kafelek z odliczaniem do najbliższej przerwy.",preview:!0},{type:"librus-week-timetable-card",name:"Librus - Plan tygodniowy",description:"Siatka planu lekcji na cały tydzień.",preview:!0},{type:"librus-bell-schedule-card",name:"Librus - Plan dnia",description:"Rozkład dzwonków na dziś z podświetleniem bieżącej lekcji.",preview:!0},{type:"librus-subject-time-card",name:"Librus - Podział czasu lekcji",description:"Poziomy wykres słupkowy liczby lekcji w tygodniu na przedmiot, z planu lekcji.",preview:!0},{type:"librus-school-card",name:"Librus - Szkoła i klasa",description:"Nazwa i adres szkoły, klasa, wychowawca, terminy semestru.",preview:!0},{type:"librus-school-year-card",name:"Librus - Koniec roku szkolnego",description:"Odliczanie do końca roku szkolnego, pasek postępu roku i data końca semestru.",preview:!0},{type:"librus-today-card",name:"Librus - Dziś",description:"Szczęśliwy numerek, nieprzeczytane wiadomości/ogłoszenia i najbliższa lekcja w jednym miejscu.",preview:!0},{type:"librus-tomorrow-card",name:"Librus - Jutro",description:"Następny dzień nauki: lekcje, zadania na termin i sprawdziany (ogarnia weekend).",preview:!0},{type:"librus-first-lesson-card",name:"Librus - Pierwsza lekcja",description:"O której i od czego zaczyna każde dziecko dziś i w następny dzień nauki - wszystkie dzieci na jednej karcie.",preview:!0},{type:"librus-week-summary-card",name:"Librus - Tydzień w skrócie",description:"Nowe oceny, nieobecności, uwagi i najbliższe wydarzenie w tym tygodniu.",preview:!0},{type:"librus-lucky-number-card",name:"Librus - Szczęśliwy numerek",description:"Dzisiejszy szczęśliwy numerek w dużym formacie.",preview:!0},{type:"librus-student-card",name:"Librus - Karta ucznia",description:"Zabawowa karta w stylu trading-card, licząca ogólną ocenę z frekwencji/zachowania/ocen/aktywności.",preview:!0},{type:"librus-streak-card",name:"Librus - Passy",description:"Trzy serie: bez nieobecności, bez uwag, dobrych ocen z rzędu.",preview:!0},{type:"librus-rank-card",name:"Librus - Ranga",description:"Brąz/Srebro/Złoto/Diament wg średniej ocen, z pierścieniem postępu do kolejnej rangi.",preview:!0},{type:"librus-achievements-card",name:"Librus - Osiągnięcia",description:"Gablota trofeów - odblokowane odznaki grywalizacji (pierwsza szóstka, serie ocen/frekwencji/zachowania). Śledzi je na żywo od dodania karty.",preview:!0},{type:"librus-teachers-card",name:"Librus - Nauczyciele",description:"Wychowawca i nauczyciele przedmiotów, wyliczeni z planu lekcji.",preview:!0},{type:"librus-level-card",name:"Librus - Poziom",description:"Licznik XP za oceny i frekwencję z pierścieniem postępu - w przeciwieństwie do Rangi rośnie tylko w górę.",preview:!0},{type:"librus-hero-card",name:"Librus - Bohater",description:"Jeden wynik liczony z ocen, frekwencji, zachowania i serii - jako archetyp ucznia albo postać RPG (tryb w ustawieniach karty).",preview:!0},{type:"librus-hero-stats-card",name:"Librus - Statystyki bohatera",description:"Karta postaci RPG - sześć statystyk (Siła/Intelekt/Wiedza/Charyzma/Wytrwałość/Szczęście) na wykresie radarowym, liczonych z ocen, frekwencji, zachowania i rangi.",preview:!0},{type:"librus-hero-history-card",name:"Librus - Historia bohatera",description:"Oś czasu poprzednich wyników karty Bohater - kiedy się zmieniały i jak długo trwały (śledzone od dodania karty, lokalnie w przeglądarce).",preview:!0},{type:"librus-last-update-tile-card",name:"Librus - Ostatnia aktualizacja",description:"Ile czasu temu integracja ostatnio pobrała dane z Librusa.",preview:!0},{type:"librus-ai-summary-card",name:"Librus - Podsumowanie tygodnia (AI)",description:"Tygodniowe podsumowanie nauki napisane przez AI: oceny, frekwencja, zachowanie, następny tydzień i rady.",preview:!0}),console.info("%c LIBRUS-SYNERGIA-CARDS %c 53 cards loaded ","color: #fff; background: #4f46e5; font-weight: 700; border-radius: 3px 0 0 3px; padding: 2px 6px;","color: #4f46e5; background: transparent; font-weight: 500;");
