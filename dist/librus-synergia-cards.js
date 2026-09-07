function e(e,t,i,s){var a,r=arguments.length,n=r<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,s);else for(var o=e.length-1;o>=0;o--)(a=e[o])&&(n=(r<3?a(n):r>3?a(t,i,n):a(t,i))||n);return r>3&&n&&Object.defineProperty(t,i,n),n}"function"==typeof SuppressedError&&SuppressedError;
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=globalThis,i=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),a=new WeakMap;let r=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(i&&void 0===e){const i=void 0!==t&&1===t.length;i&&(e=a.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&a.set(t,e))}return e}toString(){return this.cssText}};const n=(e,...t)=>{const i=1===e.length?e[0]:t.reduce((t,i,s)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[s+1],e[0]);return new r(i,e,s)},o=i?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return(e=>new r("string"==typeof e?e:e+"",void 0,s))(t)})(e):e,{is:c,defineProperty:d,getOwnPropertyDescriptor:l,getOwnPropertyNames:u,getOwnPropertySymbols:h,getPrototypeOf:g}=Object,v=globalThis,p=v.trustedTypes,m=p?p.emptyScript:"",b=v.reactiveElementPolyfillSupport,f=(e,t)=>e,_={toAttribute(e,t){switch(t){case Boolean:e=e?m:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(e){i=null}}return i}},y=(e,t)=>!c(e,t),w={attribute:!0,type:String,converter:_,reflect:!1,useDefault:!1,hasChanged:y};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),v.litPropertyMetadata??=new WeakMap;let $=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=w){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(e,i,t);void 0!==s&&d(this.prototype,e,s)}}static getPropertyDescriptor(e,t,i){const{get:s,set:a}=l(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:s,set(t){const r=s?.call(this);a?.call(this,t),this.requestUpdate(e,r,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??w}static _$Ei(){if(this.hasOwnProperty(f("elementProperties")))return;const e=g(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(f("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(f("properties"))){const e=this.properties,t=[...u(e),...h(e)];for(const i of t)this.createProperty(i,e[i])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,i]of t)this.elementProperties.set(e,i)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const i=this._$Eu(e,t);void 0!==i&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const e of i)t.unshift(o(e))}else void 0!==e&&t.push(o(e));return t}static _$Eu(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((e,s)=>{if(i)e.adoptedStyleSheets=s.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const i of s){const s=document.createElement("style"),a=t.litNonce;void 0!==a&&s.setAttribute("nonce",a),s.textContent=i.cssText,e.appendChild(s)}})(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){const i=this.constructor.elementProperties.get(e),s=this.constructor._$Eu(e,i);if(void 0!==s&&!0===i.reflect){const a=(void 0!==i.converter?.toAttribute?i.converter:_).toAttribute(t,i.type);this._$Em=e,null==a?this.removeAttribute(s):this.setAttribute(s,a),this._$Em=null}}_$AK(e,t){const i=this.constructor,s=i._$Eh.get(e);if(void 0!==s&&this._$Em!==s){const e=i.getPropertyOptions(s),a="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:_;this._$Em=s;const r=a.fromAttribute(t,e.type);this[s]=r??this._$Ej?.get(s)??r,this._$Em=null}}requestUpdate(e,t,i,s=!1,a){if(void 0!==e){const r=this.constructor;if(!1===s&&(a=this[e]),i??=r.getPropertyOptions(e),!((i.hasChanged??y)(a,t)||i.useDefault&&i.reflect&&a===this._$Ej?.get(e)&&!this.hasAttribute(r._$Eu(e,i))))return;this.C(e,t,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:s,wrapped:a},r){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,r??t??this[e]),!0!==a||void 0!==r)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),!0===s&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,i]of e){const{wrapped:e}=i,s=this[t];!0!==e||this._$AL.has(t)||void 0===s||this.C(t,void 0,i,s)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};$.elementStyles=[],$.shadowRootOptions={mode:"open"},$[f("elementProperties")]=new Map,$[f("finalized")]=new Map,b?.({ReactiveElement:$}),(v.reactiveElementVersions??=[]).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const x=globalThis,k=e=>e,z=x.trustedTypes,C=z?z.createPolicy("lit-html",{createHTML:e=>e}):void 0,j="$lit$",S=`lit$${Math.random().toFixed(9).slice(2)}$`,E="?"+S,D=`<${E}>`,I=document,A=()=>I.createComment(""),T=e=>null===e||"object"!=typeof e&&"function"!=typeof e,N=Array.isArray,M="[ \t\n\f\r]",L=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,O=/-->/g,P=/>/g,U=RegExp(`>|${M}(?:([^\\s"'>=/]+)(${M}*=${M}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),B=/'/g,H=/"/g,R=/^(?:script|style|textarea|title)$/i,F=(e=>(t,...i)=>({_$litType$:e,strings:t,values:i}))(1),K=Symbol.for("lit-noChange"),W=Symbol.for("lit-nothing"),V=new WeakMap,q=I.createTreeWalker(I,129);function G(e,t){if(!N(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==C?C.createHTML(t):t}const Z=(e,t)=>{const i=e.length-1,s=[];let a,r=2===t?"<svg>":3===t?"<math>":"",n=L;for(let t=0;t<i;t++){const i=e[t];let o,c,d=-1,l=0;for(;l<i.length&&(n.lastIndex=l,c=n.exec(i),null!==c);)l=n.lastIndex,n===L?"!--"===c[1]?n=O:void 0!==c[1]?n=P:void 0!==c[2]?(R.test(c[2])&&(a=RegExp("</"+c[2],"g")),n=U):void 0!==c[3]&&(n=U):n===U?">"===c[0]?(n=a??L,d=-1):void 0===c[1]?d=-2:(d=n.lastIndex-c[2].length,o=c[1],n=void 0===c[3]?U:'"'===c[3]?H:B):n===H||n===B?n=U:n===O||n===P?n=L:(n=U,a=void 0);const u=n===U&&e[t+1].startsWith("/>")?" ":"";r+=n===L?i+D:d>=0?(s.push(o),i.slice(0,d)+j+i.slice(d)+S+u):i+S+(-2===d?t:u)}return[G(e,r+(e[i]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),s]};class J{constructor({strings:e,_$litType$:t},i){let s;this.parts=[];let a=0,r=0;const n=e.length-1,o=this.parts,[c,d]=Z(e,t);if(this.el=J.createElement(c,i),q.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(s=q.nextNode())&&o.length<n;){if(1===s.nodeType){if(s.hasAttributes())for(const e of s.getAttributeNames())if(e.endsWith(j)){const t=d[r++],i=s.getAttribute(e).split(S),n=/([.?@])?(.*)/.exec(t);o.push({type:1,index:a,name:n[2],strings:i,ctor:"."===n[1]?te:"?"===n[1]?ie:"@"===n[1]?se:ee}),s.removeAttribute(e)}else e.startsWith(S)&&(o.push({type:6,index:a}),s.removeAttribute(e));if(R.test(s.tagName)){const e=s.textContent.split(S),t=e.length-1;if(t>0){s.textContent=z?z.emptyScript:"";for(let i=0;i<t;i++)s.append(e[i],A()),q.nextNode(),o.push({type:2,index:++a});s.append(e[t],A())}}}else if(8===s.nodeType)if(s.data===E)o.push({type:2,index:a});else{let e=-1;for(;-1!==(e=s.data.indexOf(S,e+1));)o.push({type:7,index:a}),e+=S.length-1}a++}}static createElement(e,t){const i=I.createElement("template");return i.innerHTML=e,i}}function Y(e,t,i=e,s){if(t===K)return t;let a=void 0!==s?i._$Co?.[s]:i._$Cl;const r=T(t)?void 0:t._$litDirective$;return a?.constructor!==r&&(a?._$AO?.(!1),void 0===r?a=void 0:(a=new r(e),a._$AT(e,i,s)),void 0!==s?(i._$Co??=[])[s]=a:i._$Cl=a),void 0!==a&&(t=Y(e,a._$AS(e,t.values),a,s)),t}class Q{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:i}=this._$AD,s=(e?.creationScope??I).importNode(t,!0);q.currentNode=s;let a=q.nextNode(),r=0,n=0,o=i[0];for(;void 0!==o;){if(r===o.index){let t;2===o.type?t=new X(a,a.nextSibling,this,e):1===o.type?t=new o.ctor(a,o.name,o.strings,this,e):6===o.type&&(t=new ae(a,this,e)),this._$AV.push(t),o=i[++n]}r!==o?.index&&(a=q.nextNode(),r++)}return q.currentNode=I,s}p(e){let t=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class X{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,i,s){this.type=2,this._$AH=W,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=Y(this,e,t),T(e)?e===W||null==e||""===e?(this._$AH!==W&&this._$AR(),this._$AH=W):e!==this._$AH&&e!==K&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>N(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==W&&T(this._$AH)?this._$AA.nextSibling.data=e:this.T(I.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:i}=e,s="number"==typeof i?this._$AC(e):(void 0===i.el&&(i.el=J.createElement(G(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(t);else{const e=new Q(s,this),i=e.u(this.options);e.p(t),this.T(i),this._$AH=e}}_$AC(e){let t=V.get(e.strings);return void 0===t&&V.set(e.strings,t=new J(e)),t}k(e){N(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,s=0;for(const a of e)s===t.length?t.push(i=new X(this.O(A()),this.O(A()),this,this.options)):i=t[s],i._$AI(a),s++;s<t.length&&(this._$AR(i&&i._$AB.nextSibling,s),t.length=s)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=k(e).nextSibling;k(e).remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class ee{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,s,a){this.type=1,this._$AH=W,this._$AN=void 0,this.element=e,this.name=t,this._$AM=s,this.options=a,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=W}_$AI(e,t=this,i,s){const a=this.strings;let r=!1;if(void 0===a)e=Y(this,e,t,0),r=!T(e)||e!==this._$AH&&e!==K,r&&(this._$AH=e);else{const s=e;let n,o;for(e=a[0],n=0;n<a.length-1;n++)o=Y(this,s[i+n],t,n),o===K&&(o=this._$AH[n]),r||=!T(o)||o!==this._$AH[n],o===W?e=W:e!==W&&(e+=(o??"")+a[n+1]),this._$AH[n]=o}r&&!s&&this.j(e)}j(e){e===W?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class te extends ee{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===W?void 0:e}}class ie extends ee{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==W)}}class se extends ee{constructor(e,t,i,s,a){super(e,t,i,s,a),this.type=5}_$AI(e,t=this){if((e=Y(this,e,t,0)??W)===K)return;const i=this._$AH,s=e===W&&i!==W||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,a=e!==W&&(i===W||s);s&&this.element.removeEventListener(this.name,this,i),a&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class ae{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){Y(this,e)}}const re=x.litHtmlPolyfillSupport;re?.(J,X),(x.litHtmlVersions??=[]).push("3.3.3");const ne=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class oe extends ${constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,i)=>{const s=i?.renderBefore??t;let a=s._$litPart$;if(void 0===a){const e=i?.renderBefore??null;s._$litPart$=a=new X(t.insertBefore(A(),e),e,void 0,i??{})}return a._$AI(e),a})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return K}}oe._$litElement$=!0,oe.finalized=!0,ne.litElementHydrateSupport?.({LitElement:oe});const ce=ne.litElementPolyfillSupport;ce?.({LitElement:oe}),(ne.litElementVersions??=[]).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const de=e=>(t,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)},le={attribute:!0,type:String,converter:_,reflect:!1,hasChanged:y},ue=(e=le,t,i)=>{const{kind:s,metadata:a}=i;let r=globalThis.litPropertyMetadata.get(a);if(void 0===r&&globalThis.litPropertyMetadata.set(a,r=new Map),"setter"===s&&((e=Object.create(e)).wrapped=!0),r.set(i.name,e),"accessor"===s){const{name:s}=i;return{set(i){const a=t.get.call(this);t.set.call(this,i),this.requestUpdate(s,a,e,!0,i)},init(t){return void 0!==t&&this.C(s,void 0,e,t),t}}}if("setter"===s){const{name:s}=i;return function(i){const a=this[s];t.call(this,i),this.requestUpdate(s,a,e,!0,i)}}throw Error("Unsupported decorator location: "+s)};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function he(e){return(t,i)=>"object"==typeof i?ue(e,t,i):((e,t,i)=>{const s=t.hasOwnProperty(i);return t.constructor.createProperty(i,e),s?Object.getOwnPropertyDescriptor(t,i):void 0})(e,t,i)}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function ge(e){return he({...e,state:!0,attribute:!1})}const ve="librus_synergia";class pe extends Error{constructor(e,t){super(e),this.code=e,this.deviceId=t}}function me(e){const t=new Set;for(const i of Object.values(e.entities??{}))i.platform===ve&&i.device_id&&t.add(i.device_id);return[...t]}function be(e,t){const i=me(e);if(t){if(!i.includes(t))throw new pe("device_missing",t);return t}if(1===i.length)return i[0];if(0===i.length)throw new pe("no_device");throw new pe("multiple_devices")}function fe(e,t){const i={};for(const s of Object.values(e.entities??{}))s.device_id===t&&s.platform===ve&&s.translation_key&&(i[s.translation_key]=s.entity_id);return i}function _e(e,t,i){const s=[];for(const a of Object.values(e.entities??{}))if(a.device_id===t&&a.platform===ve&&a.translation_key===i){const t=e.states[a.entity_id],i=t?.attributes;s.push({entityId:a.entity_id,subject:i?.subject||a.entity_id,subjectId:i?.subject_id})}return s.sort((e,t)=>e.subject.localeCompare(t.subject))}let ye=class extends oe{setConfig(e){this._config=e}render(){if(!this.hass||!this._config)return W;const e=me(this.hass);return e.length<2?W:F`
      <ha-select
        label="Uczeń / Student"
        .value=${this._config.device_id??""}
        @selected=${this._onSelected}
        @closed=${e=>e.stopPropagation()}
      >
        ${e.map(e=>{const t=this.hass.devices?.[e];return F`<ha-list-item .value=${e}>${t?.name_by_user||t?.name||e}</ha-list-item>`})}
      </ha-select>
    `}_onSelected(e){const t=me(this.hass)[e.detail.index];if(!t||!this._config)return;const i={...this._config,device_id:t};this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:i},bubbles:!0,composed:!0}))}};e([he({attribute:!1})],ye.prototype,"hass",void 0),e([ge()],ye.prototype,"_config",void 0),ye=e([de("librus-device-editor")],ye);let we=class extends oe{setConfig(e){this._config=e}render(){if(!this.hass||!this._config)return W;const e=me(this.hass);let t;try{t=be(this.hass,this._config.device_id)}catch{t=void 0}const i=t?_e(this.hass,t,"subject_average"):[];return F`
      <div class="editor">
        ${e.length>1?F`
              <ha-select
                label="Uczeń / Student"
                .value=${this._config.device_id??""}
                @selected=${this._onDeviceSelected}
                @closed=${e=>e.stopPropagation()}
              >
                ${e.map(e=>{const t=this.hass.devices?.[e];return F`<ha-list-item .value=${e}>${t?.name_by_user||t?.name||e}</ha-list-item>`})}
              </ha-select>
            `:W}
        <ha-select
          label="Przedmiot / Subject"
          .value=${void 0!==this._config.subject_id?String(this._config.subject_id):""}
          @selected=${this._onSubjectSelected}
          @closed=${e=>e.stopPropagation()}
        >
          ${i.map(e=>void 0!==e.subjectId?F`<ha-list-item .value=${String(e.subjectId)}>${e.subject}</ha-list-item>`:W)}
        </ha-select>
      </div>
    `}_onDeviceSelected(e){const t=me(this.hass)[e.detail.index];t&&this._config&&this._emit({...this._config,device_id:t})}_onSubjectSelected(e){if(!this._config||!this.hass)return;let t;try{t=be(this.hass,this._config.device_id)}catch{return}const i=_e(this.hass,t,"subject_average"),s=i[e.detail.index]?.subjectId;void 0!==s&&this._emit({...this._config,subject_id:s})}_emit(e){this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e},bubbles:!0,composed:!0}))}};we.styles=n`
    .editor {
      display: flex;
      flex-direction: column;
      gap: 12px;
      padding: 4px 0;
    }
    ha-select {
      width: 100%;
    }
  `,e([he({attribute:!1})],we.prototype,"hass",void 0),e([ge()],we.prototype,"_config",void 0),we=e([de("librus-subject-picker-editor")],we);const $e={"error.device_missing":"Device {device} not found","error.multiple_devices":"Multiple students found - set device_id","error.no_device":"No Librus Synergia device found","empty.loading":"Loading…","empty.generic_error":"Something went wrong","card.grades.title":"Grade average","card.grades.subtitle":"All subjects","card.grades.empty":"No grades yet this year","card.subject_spotlight.title":"Best & weakest subject","card.subject_spotlight.subtitle":"By average","card.subject_spotlight.empty":"Not enough graded subjects to compare yet","card.subject_spotlight.best":"Top subject","card.subject_spotlight.weakest":"Room to grow","card.grade_trend.title":"Grade trend","card.grade_trend.subtitle":"Last {days} days","card.grade_trend.empty":"Not enough history yet","card.grade_distribution.title":"Grade distribution","card.grade_distribution.subtitle":"{count} grades, all subjects","card.grade_distribution.other":"other","card.grades_radar.title":"Grade profile","card.grades_radar.subtitle":"By subject","card.grades_radar.empty":"Not enough subjects with grades yet","label.average":"Average","card.grade_category_distribution.title":"Grades by category","card.grade_category_distribution.subtitle":"Tests, quizzes, answers…","card.grade_category_distribution.empty":"No categorized grades yet","unit.grades":"grades","card.grade_category_distribution.uncategorized":"Uncategorized","card.subject_time.title":"Lesson time split","card.subject_time.subtitle":"Lessons per week, by subject","card.subject_time.empty":"No lessons found for this week","unit.lessons_per_week":"lessons/wk","card.attendance_weekday.title":"Absences by weekday","card.attendance_weekday.subtitle":"This school year","card.attendance_weekday.empty":"No absences or lates recorded","card.recent_activity.title":"What's new","card.recent_activity.subtitle":"Grades, notices, announcements & messages","card.recent_activity.empty":"Nothing new yet","card.grade_log.title":"Grade log","card.grade_log.subtitle":"All subjects","card.latest_grade.title":"Latest grade","card.latest_grade.empty":"No grades yet","card.behaviour_grade.title":"Behaviour grade","card.behaviour_grade.subtitle":"Semester grade","card.behaviour_grade.empty":"No behaviour grade yet","card.descriptive_grades.title":"Descriptive grades","card.descriptive_grades.subtitle":"Non-numeric assessment","card.descriptive_grades.empty":"No descriptive grades yet","card.attendance.title":"Attendance","card.attendance.subtitle":"This school year","card.attendance.by_semester":"By semester","card.attendance_heatmap.title":"Attendance - year map","card.attendance_heatmap.subtitle":"This school year","card.attendance_heatmap.empty":"No attendance data","card.attendance_heatmap.status.good":"Present","card.attendance_heatmap.status.warn":"Excused","card.attendance_heatmap.status.bad":"Unexcused","card.attendance_heatmap.no_data":"No data","card.attendance.semester":"Semester {n}","stat.absences":"Absences","stat.unexcused":"Unexcused","stat.excused":"Excused","stat.late":"Late","stat.records":"Records","stat.percentage":"Attendance","card.behaviour_notices.title":"Behaviour notices","card.behaviour_notices.empty":"No notices","card.messages.title":"Messages","card.messages.unavailable":"Messages module not enabled","card.messages.read_notice":"Opening marks it as read in Librus","card.messages.fetch_failed":"Couldn't load the full message","card.substitutions.title":"Substitutions, alerts & justifications","card.substitutions.subtitle":"Zastępstwa, alerty i usprawiedliwienia","card.substitutions.empty":"No substitutions, alerts, or justifications","mailbox.inbox":"Inbox","mailbox.notes":"Notes","mailbox.alerts":"Alerts","mailbox.substitutions":"Substitutions","mailbox.absences":"Absences","mailbox.justifications":"Justifications","mailbox.trash":"Trash","card.announcements.title":"Announcements","card.announcements.empty":"No announcements","card.homework_assignments.title":"Homework assignments","card.homework_assignments.empty":"No homework assignments","label.due":"Due","card.today_lessons.title":"Today's lessons","card.today_lessons.subtitle":"Timetable","card.today_lessons.empty":"No lessons today","label.now":"now","card.next_lesson.title":"Next lesson","card.next_lesson.empty":"No more lessons today","label.in_minutes":"in {minutes} min","label.in_hours":"in {hours}h","label.in_hours_minutes":"in {hours}h {minutes}m","label.in_days":"in {days}d","label.in_days_hours":"in {days}d {hours}h","card.agenda.title":"Agenda","card.agenda.subtitle":"Upcoming","card.agenda.empty":"Nothing scheduled","card.free_days.title":"Free days","card.free_days.empty":"No upcoming free days","label.days_until":"days until","card.school_year.title":"End of school year","card.school_year.empty":"No school year data","label.days_until_year_end":"days until year end","label.current_semester":"Current semester","label.days_until_semester_end":"days until semester end","label.year_progress":"School year","card.exam_countdown.title":"Next exam","card.exam_countdown.empty":"No upcoming exams","card.week_timetable.title":"Week timetable","card.week_timetable.subtitle":"This week","card.week_timetable.subtitle_upcoming":"Upcoming week","card.week_timetable.empty":"No lessons found for this week","card.school.title":"School","label.head_teacher":"Head teacher","label.tutor":"Homeroom teacher","label.semester_ends":"Semester ends","label.year_ends":"Year ends","card.today.title":"Today","stat.lucky_number":"Lucky number","card.week_summary.title":"Week in review","stat.new_grades":"New grades","card.lucky_number.title":"Lucky number","card.lucky_number.subtitle":"Today in the register","card.lucky_number.subtitle_for_date":"For {date}","card.student.title":"Student card","stat.overall_rating":"overall","stat.attendance_score":"Attendance","stat.behaviour_score":"Behaviour","stat.grades_score":"Grades","stat.activity_score":"Activity","card.streak.title":"Absence-free streak","card.streak.subtitle":"Current streak","label.days":"days"},xe={en:$e,pl:{"error.device_missing":"Nie znaleziono urządzenia {device}","error.multiple_devices":"Znaleziono kilkoro uczniów - ustaw device_id","error.no_device":"Nie znaleziono urządzenia Librus Synergia","empty.loading":"Wczytywanie…","empty.generic_error":"Coś poszło nie tak","card.grades.title":"Średnia ocen","card.grades.subtitle":"Wszystkie przedmioty","card.grades.empty":"Brak ocen w tym roku szkolnym","card.subject_spotlight.title":"Najlepszy i najsłabszy przedmiot","card.subject_spotlight.subtitle":"Wg średniej","card.subject_spotlight.empty":"Za mało przedmiotów z ocenami, by porównać","card.subject_spotlight.best":"Najlepszy","card.subject_spotlight.weakest":"Do przećwiczenia","card.grade_trend.title":"Trend średniej","card.grade_trend.subtitle":"Ostatnie {days} dni","card.grade_trend.empty":"Za mało historii","card.grade_distribution.title":"Rozkład ocen","card.grade_distribution.subtitle":"{count} ocen, wszystkie przedmioty","card.grade_distribution.other":"inne","card.grades_radar.title":"Profil ocen","card.grades_radar.subtitle":"Wg przedmiotu","card.grades_radar.empty":"Za mało przedmiotów z ocenami","label.average":"Średnia","card.grade_category_distribution.title":"Oceny wg kategorii","card.grade_category_distribution.subtitle":"Sprawdziany, kartkówki, odpowiedzi…","card.grade_category_distribution.empty":"Brak ocen z przypisaną kategorią","unit.grades":"ocen","card.grade_category_distribution.uncategorized":"Bez kategorii","card.subject_time.title":"Podział czasu lekcji","card.subject_time.subtitle":"Lekcje w tygodniu, wg przedmiotu","card.subject_time.empty":"Brak lekcji w tym tygodniu","unit.lessons_per_week":"lekcji/tydz.","card.attendance_weekday.title":"Nieobecności wg dnia tygodnia","card.attendance_weekday.subtitle":"Ten rok szkolny","card.attendance_weekday.empty":"Brak nieobecności ani spóźnień","card.recent_activity.title":"Co nowego","card.recent_activity.subtitle":"Oceny, uwagi, ogłoszenia i wiadomości","card.recent_activity.empty":"Nic nowego","card.grade_log.title":"Dziennik ocen","card.grade_log.subtitle":"Wszystkie przedmioty","card.latest_grade.title":"Ostatnia ocena","card.latest_grade.empty":"Brak ocen","card.behaviour_grade.title":"Ocena zachowania","card.behaviour_grade.subtitle":"Ocena semestralna","card.behaviour_grade.empty":"Brak jeszcze oceny zachowania","card.descriptive_grades.title":"Oceny opisowe","card.descriptive_grades.subtitle":"Ocenianie opisowe","card.descriptive_grades.empty":"Brak jeszcze ocen opisowych","card.attendance.title":"Frekwencja","card.attendance.subtitle":"W tym roku szkolnym","card.attendance.by_semester":"Wg semestru","card.attendance_heatmap.title":"Frekwencja - mapa roku","card.attendance_heatmap.subtitle":"Ten rok szkolny","card.attendance_heatmap.empty":"Brak danych o frekwencji","card.attendance_heatmap.status.good":"Obecność","card.attendance_heatmap.status.warn":"Usprawiedliwiona","card.attendance_heatmap.status.bad":"Nieusprawiedliwiona","card.attendance_heatmap.no_data":"Brak danych","card.attendance.semester":"Semestr {n}","stat.absences":"Nieobecności","stat.unexcused":"Nieusprawiedliwione","stat.excused":"Usprawiedliwione","stat.late":"Spóźnienia","stat.records":"Rekordów","stat.percentage":"Frekwencja","card.behaviour_notices.title":"Uwagi","card.behaviour_notices.empty":"Brak uwag","card.messages.title":"Wiadomości","card.messages.unavailable":"Moduł wiadomości nie jest włączony","card.messages.read_notice":"Otwarcie oznaczy jako przeczytane w Librusie","card.messages.fetch_failed":"Nie udało się pobrać pełnej treści","card.substitutions.title":"Zastępstwa, alerty i usprawiedliwienia","card.substitutions.subtitle":"Wiadomości specjalne","card.substitutions.empty":"Brak zastępstw, alertów ani usprawiedliwień","mailbox.inbox":"Odebrane","mailbox.notes":"Uwagi","mailbox.alerts":"Alerty","mailbox.substitutions":"Zastępstwa","mailbox.absences":"Nieobecności","mailbox.justifications":"Usprawiedliwienia","mailbox.trash":"Kosz","card.announcements.title":"Ogłoszenia","card.announcements.empty":"Brak ogłoszeń","card.homework_assignments.title":"Zadania domowe","card.homework_assignments.empty":"Brak zadań domowych","label.due":"Termin","card.today_lessons.title":"Dzisiejszy plan lekcji","card.today_lessons.subtitle":"Plan lekcji","card.today_lessons.empty":"Brak lekcji dzisiaj","label.now":"teraz","card.next_lesson.title":"Najbliższa lekcja","card.next_lesson.empty":"Koniec lekcji na dziś","label.in_minutes":"za {minutes} min","label.in_hours":"za {hours} godz.","label.in_hours_minutes":"za {hours} godz. {minutes} min","label.in_days":"za {days} dni","label.in_days_hours":"za {days} dni {hours} godz.","card.agenda.title":"Terminarz","card.agenda.subtitle":"Nadchodzące","card.agenda.empty":"Brak zaplanowanych wydarzeń","card.free_days.title":"Dni wolne","card.free_days.empty":"Brak nadchodzących dni wolnych","label.days_until":"dni do","card.school_year.title":"Koniec roku szkolnego","card.school_year.empty":"Brak danych o roku szkolnym","label.days_until_year_end":"dni do końca roku","label.current_semester":"Aktualny semestr","label.days_until_semester_end":"dni do końca semestru","label.year_progress":"Rok szkolny","card.exam_countdown.title":"Najbliższy sprawdzian","card.exam_countdown.empty":"Brak nadchodzących sprawdzianów","card.week_timetable.title":"Plan tygodniowy","card.week_timetable.subtitle":"Ten tydzień","card.week_timetable.subtitle_upcoming":"Nadchodzący tydzień","card.week_timetable.empty":"Brak lekcji w tym tygodniu","card.school.title":"Szkoła","label.head_teacher":"Dyrektor","label.tutor":"Wychowawca","label.semester_ends":"Koniec semestru","label.year_ends":"Koniec roku szkolnego","card.today.title":"Dziś","stat.lucky_number":"Numerek","card.week_summary.title":"Tydzień w skrócie","stat.new_grades":"Nowe oceny","card.lucky_number.title":"Szczęśliwy numerek","card.lucky_number.subtitle":"Dziś w dzienniku","card.lucky_number.subtitle_for_date":"Na {date}","card.student.title":"Karta ucznia","stat.overall_rating":"ocena ogólna","stat.attendance_score":"Frekwencja","stat.behaviour_score":"Zachowanie","stat.grades_score":"Oceny","stat.activity_score":"Aktywność","card.streak.title":"Seria bez nieobecności","card.streak.subtitle":"Aktualna passa","label.days":"dni"}};function ke(e,t,i){let s=function(e){const t=e?.language??"en",i=t.split("-")[0]?.toLowerCase();return xe[i]??$e}(e)[t]??$e[t];if(i)for(const[e,t]of Object.entries(i))s=s.replace(`{${e}}`,String(t));return s}function ze(e,t){const i=Math.max(0,Math.round(t));if(i<60)return ke(e,"label.in_minutes",{minutes:i});if(i<1440){const t=Math.floor(i/60),s=i%60;return 0===s?ke(e,"label.in_hours",{hours:t}):ke(e,"label.in_hours_minutes",{hours:t,minutes:s})}const s=Math.floor(i/1440),a=Math.floor(i%1440/60);return 0===a?ke(e,"label.in_days",{days:s}):ke(e,"label.in_days_hours",{days:s,hours:a})}class Ce extends oe{_syncTheme(){this.classList.toggle("dark",Boolean(this.hass?.themes?.darkMode))}_resolveEntities(){if(!this.hass)return{error:this._message("mdi:alert-circle-outline",ke(this.hass,"empty.loading"))};const e=this._resolvedCache;if(e&&e.entities===this.hass.entities&&e.configuredDeviceId===this._configuredDeviceId)return e.result;let t;try{const e=be(this.hass,this._configuredDeviceId);t={deviceId:e,map:fe(this.hass,e)}}catch(e){t={error:this._message("mdi:alert-circle-outline",this._configErrorMessage(e))}}return this._resolvedCache={entities:this.hass.entities,configuredDeviceId:this._configuredDeviceId,result:t},t}_configErrorMessage(e){return e instanceof pe?"device_missing"===e.code?ke(this.hass,"error.device_missing",{device:e.deviceId??""}):"multiple_devices"===e.code?ke(this.hass,"error.multiple_devices"):ke(this.hass,"error.no_device"):ke(this.hass,"empty.generic_error")}_message(e,t,i){return F`
      <ha-card class="static">
        <div class="empty">
          <ha-icon .icon=${e}></ha-icon>
          <div class="t1">${t}</div>
          ${i?F`<div class="t2">${i}</div>`:W}
        </div>
      </ha-card>
    `}}e([he({attribute:!1})],Ce.prototype,"hass",void 0);const je=n`
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
  }
`,Se=n`
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
`;function Ee(e,t,i=64,s=6){const a=Math.max(0,Math.min(100,e)),r=(i-s)/2,n=2*Math.PI*r,o=i/2;return F`
    <svg width=${i} height=${i} viewBox="0 0 ${i} ${i}" class="ring">
      <circle
        cx=${o}
        cy=${o}
        r=${r}
        fill="none"
        stroke="var(--lc-ring-track)"
        stroke-width=${s}
      ></circle>
      <circle
        cx=${o}
        cy=${o}
        r=${r}
        fill="none"
        stroke=${t}
        stroke-width=${s}
        stroke-linecap="round"
        stroke-dasharray=${n}
        stroke-dashoffset=${n-a/100*n}
        transform="rotate(-90 ${o} ${o})"
      ></circle>
    </svg>
  `}function De(e,t={}){const i=t.size??160,s=t.stroke??20,a=i/2,r=i/2,n=(i-s)/2,o=2*Math.PI*n,c=e.reduce((e,t)=>e+t.value,0);let d=0;const l=c>0?e.filter(e=>e.value>0).map(e=>{const t=e.value/c*o,i=F`
              <circle
                cx=${a}
                cy=${r}
                r=${n}
                fill="none"
                stroke=${e.colorVar}
                stroke-width=${s}
                stroke-dasharray="${t} ${o-t}"
                stroke-dashoffset=${-d}
                transform="rotate(-90 ${a} ${r})"
              >
                <title>${e.label??""}</title>
              </circle>
            `;return d+=t,i}):[],u=t.centerValue??c;return F`
    <svg width=${i} height=${i} viewBox="0 0 ${i} ${i}" class="donut-chart">
      <circle cx=${a} cy=${r} r=${n} fill="none" stroke="var(--divider-color)" stroke-width=${s}></circle>
      ${l}
      ${c>0?F`
            <text x=${a} y=${r-2} text-anchor="middle" class="donut-total" fill="var(--primary-text-color)">
              ${u}
            </text>
            ${t.centerLabel?F`<text x=${a} y=${r+14} text-anchor="middle" class="donut-unit" fill="var(--secondary-text-color)">
                  ${t.centerLabel}
                </text>`:W}
          `:W}
    </svg>
  `}const Ie=new Set(["unknown","unavailable",""]);let Ae=class extends Ce{static getConfigElement(){return document.createElement("librus-device-editor")}static getStubConfig(){return{type:"custom:librus-grades-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 3}render(){if(!this._config||!this.hass)return W;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{deviceId:t,map:i}=e,s=this.hass,a=i.overall_average?s.states[i.overall_average]:void 0,r=_e(s,t,"subject_average").map(e=>({...e,state:s.states[e.entityId]})).filter(e=>e.state&&!Ie.has(e.state.state));if((!a||Ie.has(a.state))&&0===r.length)return this._message("mdi:school-outline",ke(s,"card.grades.empty"));const n=a&&!Ie.has(a.state)?Number(a.state):void 0,o=r.length?Math.max(...r.map(e=>Number(e.state.state))):6;return F`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:school-outline"></ha-icon></div>
          <div class="title-block">
            <div class="title">${ke(s,"card.grades.title")}</div>
            <div class="subtitle">${ke(s,"card.grades.subtitle")}</div>
          </div>
        </div>

        ${void 0!==n?F`
              <div class="ring-row">
                ${Ee(n/6*100,"var(--lc-brand)",68,7)}
                <div>
                  <div class="ring-num">${n.toLocaleString(s.language,{maximumFractionDigits:2})}</div>
                  <div class="ring-label">${ke(s,"card.grades.subtitle")}</div>
                </div>
              </div>
            `:W}
        ${r.length?F`
              <div class="sub-list">
                ${r.map(e=>{const t=Number(e.state.state);return F`
                    <div class="sub-row">
                      <span class="name" title=${e.subject}>${e.subject}</span>
                      <span class="bar"
                        ><span
                          style="width:${Math.min(100,t/o*100)}%"
                        ></span
                      ></span>
                      <span class="val">${t.toLocaleString(s.language,{maximumFractionDigits:2})}</span>
                    </div>
                  `})}
              </div>
            `:W}
      </ha-card>
    `}};function Te(e){const t=new Date(e);return Number.isNaN(t.getTime())?"":t.toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"})}function Ne(e,t){const i=new Date(`${e.slice(0,10)}T00:00:00`);return Number.isNaN(i.getTime())?e:i.toLocaleDateString(t,{day:"numeric",month:"short"})}function Me(e,t){const i=Date.UTC(e.getFullYear(),e.getMonth(),e.getDate()),s=Date.UTC(t.getFullYear(),t.getMonth(),t.getDate());return Math.round((s-i)/864e5)}function Le(e,t){return Math.max(0,Math.floor((e.getTime()-t.getTime())/6e4))}Ae.styles=[je,Se,n`
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
    `],e([ge()],Ae.prototype,"_config",void 0),Ae=e([de("librus-grades-card")],Ae);const Oe=/^\[([^\]]+)\]\s*/;function Pe(e){const t=Oe.exec(e);return t?{category:t[1],text:e.slice(t[0].length)}:{category:null,text:e}}let Ue=class extends Ce{static getConfigElement(){return document.createElement("librus-device-editor")}static getStubConfig(){return{type:"custom:librus-grade-log-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 4}render(){if(!this._config||!this.hass)return W;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{deviceId:t}=e,i=this.hass,s=[];for(const e of _e(i,t,"subject_average")){const t=i.states[e.entityId]?.attributes.grades??[];for(const i of t)s.push({...i,subject:e.subject})}return s.sort((e,t)=>(t.date??"").localeCompare(e.date??"")),0===s.length?this._message("mdi:notebook-multiple",ke(i,"card.grades.empty")):F`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:notebook-multiple"></ha-icon></div>
          <div class="title-block">
            <div class="title">${ke(i,"card.grade_log.title")}</div>
            <div class="subtitle">${ke(i,"card.grade_log.subtitle")}</div>
          </div>
        </div>
        <div class="scroll-list">
          ${s.slice(0,25).map(e=>F`
              <div class="list-item">
                <div class="grade-chip">${e.value}</div>
                <div class="body">
                  <div class="row1">
                    <span>${e.subject}${e.category?F` · <span class="cat-label">${e.category}</span>`:W}</span>
                    ${e.date?F`<time>${Ne(e.date,i.language)}</time>`:W}
                  </div>
                  ${e.comments.length?F`<div class="quote">${e.comments.join(" · ")}</div>`:W}
                </div>
              </div>
            `)}
        </div>
      </ha-card>
    `}};Ue.styles=[je,Se,n`
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
    `],e([ge()],Ue.prototype,"_config",void 0),Ue=e([de("librus-grade-log-card")],Ue);let Be=class extends Ce{static getConfigElement(){return document.createElement("librus-subject-picker-editor")}static getStubConfig(){return{type:"custom:librus-subject-grades-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 3}render(){if(!this._config||!this.hass)return W;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{deviceId:t}=e,i=this.hass,s=_e(i,t,"subject_average"),a=void 0!==this._config.subject_id?s.find(e=>e.subjectId===this._config.subject_id):s[0];if(!a)return this._message("mdi:notebook-outline",ke(i,"card.grades.empty"));const r=i.states[a.entityId],n=r?.attributes.grades??[];return 0===n.length?this._message("mdi:notebook-outline",ke(i,"card.grades.empty")):F`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:notebook-outline"></ha-icon></div>
          <div class="title-block">
            <div class="title">${a.subject}</div>
            <div class="subtitle">${r.state}</div>
          </div>
        </div>
        <div class="scroll-list">
          ${n.map(e=>F`
              <div class="list-item">
                <div class="grade-chip">${e.value}</div>
                <div class="body">
                  <div class="row1">
                    <span class="cat-label">${e.category??""}</span>
                    ${e.date?F`<time>${Ne(e.date,i.language)}</time>`:W}
                  </div>
                  ${e.comments.length?F`<div class="quote">${e.comments.join(" · ")}</div>`:W}
                </div>
              </div>
            `)}
        </div>
      </ha-card>
    `}};Be.styles=[je,Se,n`
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
    `],e([ge()],Be.prototype,"_config",void 0),Be=e([de("librus-subject-grades-card")],Be);let He=class extends Ce{constructor(){super(...arguments),this._points=[]}static getConfigElement(){return document.createElement("librus-subject-picker-editor")}static getStubConfig(){return{type:"custom:librus-grade-trend-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 3}connectedCallback(){super.connectedCallback(),this._refreshTimer=setInterval(()=>{this._fetch(!0)},18e5)}disconnectedCallback(){super.disconnectedCallback(),clearInterval(this._refreshTimer)}_resolveEntityId(){if(!this.hass||!this._config)return;const e=this._resolveEntities();if("error"in e)return;const{deviceId:t,map:i}=e;if(void 0!==this._config.subject_id){const e=_e(this.hass,t,"subject_average");return e.find(e=>e.subjectId===this._config.subject_id)?.entityId}return i.overall_average}async _fetch(e=!1){const t=this._resolveEntityId();if(!this.hass||!t)return;const i=new Date,s=new Date(i.getTime()-5184e6),a=`${t}:${i.toDateString()}`;if(e||this._fetchedFor!==a){this._fetchedFor=a;try{this._points=await async function(e,t,i,s){const a=`history/period/${encodeURIComponent(i.toISOString())}?filter_entity_id=${encodeURIComponent(t)}&end_time=${encodeURIComponent(s.toISOString())}`,r=await e.callApi("GET",a),n=r?.[0]??[],o=[];for(const e of n){const t=Number(e.state);if(!Number.isFinite(t))continue;const i=new Date(e.last_changed).getTime();if(Number.isNaN(i))continue;const s=o[o.length-1];s&&s.value===t||o.push({timestamp:i,value:t})}return o}(this.hass,t,s,i)}catch{this._points=[]}}}render(){if(!this._config||!this.hass)return W;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const t=this.hass;this._fetch();const i=this._resolveEntityId(),s=void 0!==this._config.subject_id?_e(t,e.deviceId,"subject_average").find(e=>e.subjectId===this._config.subject_id)?.subject:void 0;if(!i||this._points.length<2)return this._message("mdi:chart-line",ke(t,"card.grade_trend.empty"));const a=this._points[0],r=this._points[this._points.length-1],n=Math.round(100*(r.value-a.value))/100,o=n>0?"mdi:trending-up":n<0?"mdi:trending-down":"mdi:trending-neutral",c=n>0?"good":n<0?"bad":"";return F`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:chart-line"></ha-icon></div>
          <div class="title-block">
            <div class="title">${s??ke(t,"card.grade_trend.title")}</div>
            <div class="subtitle">${ke(t,"card.grade_trend.subtitle",{days:60})}</div>
          </div>
          <div class="trend ${c}">
            <ha-icon icon=${o}></ha-icon>
            <span>${n>0?"+":""}${n}</span>
          </div>
        </div>
        <div class="chart-row">
          <div class="current-value">${r.value.toFixed(2)}</div>
          ${function(e,t={}){const i=t.width??280,s=t.height??72,a=t.colorVar??"var(--lc-brand)";if(e.length<2)return F`<svg width=${i} height=${s} viewBox="0 0 ${i} ${s}" class="line-chart"></svg>`;const r=e.map(e=>e.timestamp),n=e.map(e=>e.value),o=Math.min(...r),c=Math.max(...r),d=t.min??Math.min(...n),l=t.max??Math.max(...n),u=c-o||1,h=l-d||1,g=e=>6+(e-o)/u*(i-12),v=e=>s-6-(e-d)/h*(s-12),p=e.map(e=>`${g(e.timestamp).toFixed(1)},${v(e.value).toFixed(1)}`).join(" "),m=e[0],b=e[e.length-1],f=`${g(m.timestamp).toFixed(1)},${(s-6).toFixed(1)} ${p} ${g(b.timestamp).toFixed(1)},${(s-6).toFixed(1)}`;return F`
    <svg width=${i} height=${s} viewBox="0 0 ${i} ${s}" class="line-chart">
      <polygon points=${f} fill=${a} opacity="0.12"></polygon>
      <polyline
        points=${p}
        fill="none"
        stroke=${a}
        stroke-width="2"
        stroke-linejoin="round"
        stroke-linecap="round"
      ></polyline>
      <circle cx=${g(b.timestamp)} cy=${v(b.value)} r="3" fill=${a}></circle>
    </svg>
  `}(this._points,{colorVar:"var(--lc-brand)"})}
        </div>
      </ha-card>
    `}};He.styles=[je,Se,n`
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
    `],e([ge()],He.prototype,"_config",void 0),e([ge()],He.prototype,"_points",void 0),He=e([de("librus-grade-trend-card")],He);const Re=["1","2","3","4","5","6"],Fe={1:"var(--lc-bad)",2:"var(--lc-bad)",3:"var(--lc-warn)",4:"var(--lc-good)",5:"var(--lc-good)",6:"var(--lc-good)",other:"var(--lc-neutral-dot)"};let Ke=class extends Ce{static getConfigElement(){return document.createElement("librus-device-editor")}static getStubConfig(){return{type:"custom:librus-grade-distribution-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 2}render(){if(!this._config||!this.hass)return W;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{deviceId:t}=e,i=this.hass,s={1:0,2:0,3:0,4:0,5:0,6:0,other:0};let a=0;for(const e of _e(i,t,"subject_average")){const t=i.states[e.entityId]?.attributes.grades??[];for(const e of t){const t=/^([1-6])/.exec(e.value.trim())?.[1];s[t??"other"]+=1,a+=1}}if(0===a)return this._message("mdi:chart-bar",ke(i,"card.grades.empty"));const r=Math.max(...Object.values(s),1),n=[...Re,"other"];return F`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:chart-bar"></ha-icon></div>
          <div class="title-block">
            <div class="title">${ke(i,"card.grade_distribution.title")}</div>
            <div class="subtitle">${ke(i,"card.grade_distribution.subtitle",{count:a})}</div>
          </div>
        </div>
        <div class="histogram">
          ${n.map(e=>{const t=s[e];return F`
              <div class="col">
                <div class="col-count">${t>0?t:""}</div>
                <div class="col-bar-track">
                  <div
                    class="col-bar"
                    style="height:${t/r*100}%;background:${Fe[e]}"
                  ></div>
                </div>
                <div class="col-label">${"other"===e?ke(i,"card.grade_distribution.other"):e}</div>
              </div>
            `})}
        </div>
      </ha-card>
    `}};Ke.styles=[je,Se,n`
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
    `],e([ge()],Ke.prototype,"_config",void 0),Ke=e([de("librus-grade-distribution-card")],Ke);let We=class extends Ce{static getConfigElement(){return document.createElement("librus-device-editor")}static getStubConfig(){return{type:"custom:librus-grades-radar-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 3}render(){if(!this._config||!this.hass)return W;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{deviceId:t}=e,i=this.hass,s=[];for(const e of _e(i,t,"subject_average")){const t=i.states[e.entityId]?.state,a=void 0!==t?Number(t):NaN;Number.isFinite(a)&&s.push({label:e.subject,value:a})}if(s.length<3)return this._message("mdi:chart-timeline-variant",ke(i,"card.grades_radar.empty"));const a=s.reduce((e,t)=>e+t.value,0)/s.length;return F`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:chart-timeline-variant"></ha-icon></div>
          <div class="title-block">
            <div class="title">${ke(i,"card.grades_radar.title")}</div>
            <div class="subtitle">${ke(i,"card.grades_radar.subtitle")}</div>
          </div>
        </div>
        <div class="chart-wrap">${function(e,t={}){const i=t.width??220,s=t.height??200,a=t.max??6,r=t.colorVar??"var(--lc-brand)",n=t.ringCount??3,o=i/2,c=s/2-4,d=Math.min(i,s)/2-32,l=e.length;if(l<3)return F`<svg width=${i} height=${s} viewBox="0 0 ${i} ${s}" class="radar-chart"></svg>`;const u=e=>-Math.PI/2+2*e*Math.PI/l,h=(e,t)=>{const i=Math.max(0,Math.min(a,t))/a*d;return[o+i*Math.cos(u(e)),c+i*Math.sin(u(e))]},g=Array.from({length:n},(e,t)=>a*(t+1)/n),v=e.map((e,t)=>h(t,a)),p=e.map((e,t)=>h(t,e.value)),m=p.map(e=>e.join(",")).join(" ");return F`
    <svg width=${i} height=${s} viewBox="0 0 ${i} ${s}" class="radar-chart">
      ${g.map(t=>F`<polygon
            points=${e.map((e,i)=>h(i,t).join(",")).join(" ")}
            class="radar-grid"
          ></polygon>`)}
      ${v.map(([e,t])=>F`<line x1=${o} y1=${c} x2=${e} y2=${t} class="radar-axis"></line>`)}
      <polygon
        points=${m}
        fill=${r}
        fill-opacity="0.22"
        stroke=${r}
        stroke-width="2"
        stroke-linejoin="round"
      ></polygon>
      ${p.map(([e,t])=>F`<circle cx=${e} cy=${t} r="3.2" fill=${r}></circle>`)}
      ${e.map((e,t)=>{const[i,s]=h(t,1.18*a),r=Math.cos(u(t)),n=Math.abs(r)<.3?"middle":r>0?"start":"end";return F`<text x=${i} y=${s+3} text-anchor=${n} class="radar-label">${e.label}</text>`})}
    </svg>
  `}(s,{max:6})}</div>
        <div class="legend">
          <span class="legend-item">
            <span class="dot" style="background:var(--lc-brand)"></span>
            ${ke(i,"label.average")} <b>${a.toFixed(2)}</b>
          </span>
        </div>
      </ha-card>
    `}};We.styles=[je,Se],e([ge()],We.prototype,"_config",void 0),We=e([de("librus-grades-radar-card")],We);const Ve=["var(--lc-brand)","var(--lc-good)","var(--lc-warn)","var(--lc-bad)","var(--lc-amber)","var(--lc-brand-strong)","var(--lc-neutral-dot)"];let qe=class extends Ce{static getConfigElement(){return document.createElement("librus-device-editor")}static getStubConfig(){return{type:"custom:librus-grade-category-distribution-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 3}render(){if(!this._config||!this.hass)return W;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{deviceId:t}=e,i=this.hass,s=new Map;for(const e of _e(i,t,"subject_average")){const t=i.states[e.entityId]?.attributes.grades??[];for(const e of t){const t=e.category??"__uncategorized";s.set(t,(s.get(t)??0)+1)}}const a=[...s.values()].reduce((e,t)=>e+t,0);if(0===a)return this._message("mdi:chart-donut",ke(i,"card.grade_category_distribution.empty"));const r=[...s.entries()].sort((e,t)=>t[1]-e[1]),n=r.map(([e,t],s)=>({value:t,colorVar:Ve[s%Ve.length],label:"__uncategorized"===e?ke(i,"card.grade_category_distribution.uncategorized"):e}));return F`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:chart-donut"></ha-icon></div>
          <div class="title-block">
            <div class="title">${ke(i,"card.grade_category_distribution.title")}</div>
            <div class="subtitle">${ke(i,"card.grade_category_distribution.subtitle")}</div>
          </div>
        </div>
        <div class="chart-wrap">${De(n,{centerLabel:ke(i,"unit.grades")})}</div>
        <div class="legend">
          ${n.map(e=>F`
              <span class="legend-item">
                <span class="dot" style="background:${e.colorVar}"></span>${e.label} <b>${e.value}</b>
              </span>
            `)}
        </div>
      </ha-card>
    `}};qe.styles=[je,Se],e([ge()],qe.prototype,"_config",void 0),qe=e([de("librus-grade-category-distribution-card")],qe);let Ge=class extends Ce{static getConfigElement(){return document.createElement("librus-device-editor")}static getStubConfig(){return{type:"custom:librus-latest-grade-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 2}render(){if(!this._config||!this.hass)return W;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{deviceId:t}=e,i=this.hass,s=function(e,t){let i=null;for(const s of _e(e,t,"subject_average")){const t=e.states[s.entityId]?.attributes;t?.latest_grade&&t.latest_grade_date&&(!i||t.latest_grade_date>i.date)&&(i={subject:s.subject,grade:t.latest_grade,date:t.latest_grade_date,comments:t.latest_grade_comments??[]})}return i}(i,t);return s?F`
      <ha-card>
        <div class="header">
          <div class="icon-badge amber"><ha-icon icon="mdi:star-outline"></ha-icon></div>
          <div class="title-block">
            <div class="title">${ke(i,"card.latest_grade.title")}</div>
            <div class="subtitle">${s.subject} &middot; ${Ne(s.date,i.language)}</div>
          </div>
          <div class="grade-badge">${s.grade}</div>
        </div>
        ${s.comments.length?F`
              <hr />
              ${s.comments.map(e=>F`<div class="quote">${e}</div>`)}
            `:W}
      </ha-card>
    `:this._message("mdi:star-outline",ke(i,"card.latest_grade.empty"))}};Ge.styles=[je,Se,n`
      .grade-badge {
        font-size: 1.5rem;
        font-weight: 800;
        color: var(--lc-brand);
        flex: none;
      }
    `],e([ge()],Ge.prototype,"_config",void 0),Ge=e([de("librus-latest-grade-card")],Ge);let Ze=class extends Ce{static getConfigElement(){return document.createElement("librus-device-editor")}static getStubConfig(){return{type:"custom:librus-behaviour-grade-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 2}render(){if(!this._config||!this.hass)return W;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{map:t}=e,i=this.hass,s=t.behaviour_grade?i.states[t.behaviour_grade]:void 0,a=(s?.attributes.recent??[])[0];return a?F`
      <ha-card>
        <div class="header">
          <div class="icon-badge good"><ha-icon icon="mdi:medal-outline"></ha-icon></div>
          <div class="title-block">
            <div class="title">${ke(i,"card.behaviour_grade.title")}</div>
            <div class="subtitle">${a.category??ke(i,"card.behaviour_grade.subtitle")}</div>
          </div>
          <div class="grade-badge">${a.short_name}</div>
        </div>
        ${null!==a.value?F`<div class="stats"><div class="stat good"><div class="stat-value">${a.value>0?"+":""}${a.value}</div><div class="stat-label">pkt</div></div></div>`:W}
        ${a.text?F`<div class="quote">${a.text}</div>`:W}
      </ha-card>
    `:this._message("mdi:medal-outline",ke(i,"card.behaviour_grade.empty"))}};Ze.styles=[je,Se,n`
      .grade-badge {
        font-size: 1.5rem;
        font-weight: 800;
        color: var(--lc-good);
        flex: none;
      }
    `],e([ge()],Ze.prototype,"_config",void 0),Ze=e([de("librus-behaviour-grade-card")],Ze);let Je=class extends Ce{static getConfigElement(){return document.createElement("librus-device-editor")}static getStubConfig(){return{type:"custom:librus-descriptive-grades-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 2}render(){if(!this._config||!this.hass)return W;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{map:t}=e,i=this.hass,s=t.descriptive_grades?i.states[t.descriptive_grades]:void 0,a=s?.attributes.recent??[];return s&&0!==a.length?F`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:text-box-outline"></ha-icon></div>
          <div class="title-block">
            <div class="title">${ke(i,"card.descriptive_grades.title")}</div>
            <div class="subtitle">${ke(i,"card.descriptive_grades.subtitle")}</div>
          </div>
        </div>
        <div class="scroll-list">
          ${a.map(e=>F`
              <div class="list-item">
                <span class="dot neutral"></span>
                <div class="body">
                  <div class="row1">
                    <span>${e.subject??""}</span>
                    ${e.date?F`<time>${Ne(e.date,i.language)}</time>`:W}
                  </div>
                  <div class="item-text">${e.value}</div>
                </div>
              </div>
            `)}
        </div>
      </ha-card>
    `:this._message("mdi:text-box-outline",ke(i,"card.descriptive_grades.empty"))}};Je.styles=[je,Se],e([ge()],Je.prototype,"_config",void 0),Je=e([de("librus-descriptive-grades-card")],Je);const Ye=new Set(["unknown","unavailable",""]);let Qe=class extends Ce{static getConfigElement(){return document.createElement("librus-device-editor")}static getStubConfig(){return{type:"custom:librus-subject-spotlight-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 2}render(){if(!this._config||!this.hass)return W;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{deviceId:t}=e,i=this.hass,s=_e(i,t,"subject_average").map(e=>({subject:e.subject,state:i.states[e.entityId]})).filter(e=>e.state&&!Ye.has(e.state.state)).map(e=>({subject:e.subject,value:Number(e.state.state)})).filter(e=>!Number.isNaN(e.value));if(s.length<2)return this._message("mdi:podium-gold",ke(i,"card.subject_spotlight.empty"));const a=s.reduce((e,t)=>t.value>e.value?t:e),r=s.reduce((e,t)=>t.value<e.value?t:e),n=e=>e.toLocaleString(i.language,{maximumFractionDigits:2});return F`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:podium-gold"></ha-icon></div>
          <div class="title-block">
            <div class="title">${ke(i,"card.subject_spotlight.title")}</div>
            <div class="subtitle">${ke(i,"card.subject_spotlight.subtitle")}</div>
          </div>
        </div>
        <div class="spotlight-row">
          <div class="spotlight-tile good">
            <ha-icon icon="mdi:trophy-outline"></ha-icon>
            <div class="spotlight-value">${n(a.value)}</div>
            <div class="spotlight-subject">${a.subject}</div>
            <div class="spotlight-label">${ke(i,"card.subject_spotlight.best")}</div>
          </div>
          <div class="spotlight-tile warn">
            <ha-icon icon="mdi:book-open-page-variant-outline"></ha-icon>
            <div class="spotlight-value">${n(r.value)}</div>
            <div class="spotlight-subject">${r.subject}</div>
            <div class="spotlight-label">${ke(i,"card.subject_spotlight.weakest")}</div>
          </div>
        </div>
      </ha-card>
    `}};Qe.styles=[je,Se,n`
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
    `],e([ge()],Qe.prototype,"_config",void 0),Qe=e([de("librus-subject-spotlight-card")],Qe);const Xe=/^obecno|^present/i,et=/uspr\.?/i;function tt(e,t){return t?.[e]??Xe.test(e)?"good":et.test(e)?"warn":"bad"}let it=class extends Ce{static getConfigElement(){return document.createElement("librus-device-editor")}static getStubConfig(){return{type:"custom:librus-attendance-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 2}render(){if(!this._config||!this.hass)return W;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{map:t}=e,i=this.hass,s=t.attendance?i.states[t.attendance]:void 0;if(!s)return this._message("mdi:calendar-remove",ke(i,"empty.generic_error"));const a=s.attributes.breakdown??{},r=s.attributes.presence_by_type,n=s.attributes.total_records??0,o=s.attributes.percentage,c=s.attributes.by_semester??{},d=Object.entries(c).sort(([e],[t])=>Number(e)-Number(t)),l=Number(s.state)||0,u=s.attributes.unexcused_count,h=s.attributes.excused_count,g=void 0!==u,v=Object.entries(a),p={good:"var(--lc-good)",warn:"var(--lc-warn)",bad:"var(--lc-bad)"},m=v.map(([e,t])=>({flexGrow:Math.max(t,.001),colorVar:p[tt(e,r)],title:`${e}: ${t}`}));return F`
      <ha-card>
        <div class="header">
          <div class="icon-badge bad"><ha-icon icon="mdi:calendar-remove"></ha-icon></div>
          <div class="title-block">
            <div class="title">${ke(i,"card.attendance.title")}</div>
            <div class="subtitle">${ke(i,"card.attendance.subtitle")}</div>
          </div>
        </div>
        <div class="stats">
          ${null!=o?F`
                <div class="stat ${o>=90?"good":o<75?"bad":""}">
                  <div class="stat-value">${o}<span class="unit">%</span></div>
                  <div class="stat-label">${ke(i,"stat.percentage")}</div>
                </div>
              `:W}
          ${g?F`
                <div class="stat ${u>0?"bad":""}">
                  <div class="stat-value">${u}</div>
                  <div class="stat-label">${ke(i,"stat.unexcused")}</div>
                </div>
                <div class="stat ${h>0?"warn":""}">
                  <div class="stat-value">${h}</div>
                  <div class="stat-label">${ke(i,"stat.excused")}</div>
                </div>
              `:F`
                <div class="stat bad">
                  <div class="stat-value">${l}</div>
                  <div class="stat-label">${ke(i,"stat.absences")}</div>
                </div>
              `}
          <div class="stat">
            <div class="stat-value">${n}</div>
            <div class="stat-label">${ke(i,"stat.records")}</div>
          </div>
        </div>
        ${m.length?function(e){return F`
    <div class="bar">
      ${e.map(e=>F`<div
            class="seg"
            style="flex-grow:${e.flexGrow};background:${e.colorVar}"
            title=${e.title??""}
          ></div>`)}
    </div>
  `}(m):W}
        ${v.length?F`
              <div class="legend">
                ${v.map(([e,t])=>F`
                    <span class="legend-item">
                      <span class="legend-dot ${tt(e,r)}"></span>${e}
                      <b>${t}</b>
                    </span>
                  `)}
              </div>
            `:W}
        ${d.length>1?F`
              <hr />
              <div class="semester-block">
                <div class="semester-title">${ke(i,"card.attendance.by_semester")}</div>
                ${d.map(([e,t])=>F`
                    <div class="semester-row">
                      <span>${ke(i,"card.attendance.semester",{n:e})}</span>
                      <span class="semester-pct">${null!=t.percentage?`${t.percentage}%`:"–"}</span>
                    </div>
                  `)}
              </div>
            `:W}
      </ha-card>
    `}};it.styles=[je,Se,n`
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
    `],e([ge()],it.prototype,"_config",void 0),it=e([de("librus-attendance-card")],it);let st=class extends Ce{static getConfigElement(){return document.createElement("librus-device-editor")}static getStubConfig(){return{type:"custom:librus-attendance-tile-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 1}render(){if(!this._config||!this.hass)return W;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{map:t}=e,i=this.hass,s=t.attendance?i.states[t.attendance]:void 0;if(!s)return this._message("mdi:calendar-remove",ke(i,"empty.generic_error"));const a=s.attributes.percentage,r=s.attributes.unexcused_count??(Number(s.state)||0),n=s.attributes.excused_count;return F`
      <ha-card class="tile">
        <div class="icon-badge ${0===r?"good":"bad"}">
          <ha-icon icon="mdi:calendar-remove"></ha-icon>
        </div>
        <div class="tile-body">
          <div class="subj">
            ${r} ${ke(i,"stat.absences").toLowerCase()}
          </div>
          ${null!=a||n?F`
                <div class="meta">
                  ${null!=a?F`${ke(i,"stat.percentage")}: ${a}%`:W}
                  ${n?F`${null!=a?" · ":""}${n} ${ke(i,"stat.excused").toLowerCase()}`:W}
                </div>
              `:W}
        </div>
      </ha-card>
    `}};function at(e){const t=new Date(e);return t.setDate(t.getDate()-(function(e){const t=e.getDay();return 0===t?7:t}(e)-1)),t.setHours(0,0,0,0),t}st.styles=[je,Se,n`
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
    `],e([ge()],st.prototype,"_config",void 0),st=e([de("librus-attendance-tile-card")],st);const rt=[0,1,2,3,4];let nt=class extends Ce{static getConfigElement(){return document.createElement("librus-device-editor")}static getStubConfig(){return{type:"custom:librus-attendance-heatmap-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 2}render(){if(!this._config||!this.hass)return W;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{map:t}=e,i=this.hass,s=t.attendance?i.states[t.attendance]:void 0,a=s?.attributes.by_date;if(!s||!a||0===Object.keys(a).length)return this._message("mdi:calendar-blank-outline",ke(i,"card.attendance_heatmap.empty"));const r=t.school_class?i.states[t.school_class]:void 0,n=r?.attributes.school_year_start,o=new Date,c=at(o),d=n?at(new Date(`${n}T00:00:00`)):new Date(c.getTime()-96768e5),l=[];for(let e=new Date(d);e<=c;e.setDate(e.getDate()+7))l.push(new Date(e));return F`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:calendar-blank-outline"></ha-icon></div>
          <div class="title-block">
            <div class="title">${ke(i,"card.attendance_heatmap.title")}</div>
            <div class="subtitle">${ke(i,"card.attendance_heatmap.subtitle")}</div>
          </div>
        </div>
        <div class="heatmap-scroll">
          <div class="heatmap" style="grid-template-columns: repeat(${l.length}, 11px);">
            ${l.map(e=>F`
                <div class="heatmap-col">
                  ${rt.map(t=>{const s=new Date(e);if(s.setDate(s.getDate()+t),s>o)return F`<span class="cell future"></span>`;const r=function(e){return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`}(s),n=a[r];return F`<span class="cell ${n??"none"}" title=${`${r}${n?` - ${ke(i,`card.attendance_heatmap.status.${n}`)}`:""}`}></span>`})}
                </div>
              `)}
          </div>
        </div>
        <div class="heatmap-legend">
          <span class="legend-item"><span class="cell good"></span>${ke(i,"card.attendance_heatmap.status.good")}</span>
          <span class="legend-item"><span class="cell warn"></span>${ke(i,"card.attendance_heatmap.status.warn")}</span>
          <span class="legend-item"><span class="cell bad"></span>${ke(i,"card.attendance_heatmap.status.bad")}</span>
          <span class="legend-item"><span class="cell none"></span>${ke(i,"card.attendance_heatmap.no_data")}</span>
        </div>
      </ha-card>
    `}};nt.styles=[je,Se,n`
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
    `],e([ge()],nt.prototype,"_config",void 0),nt=e([de("librus-attendance-heatmap-card")],nt);const ot=[1,2,3,4,5],ct=["excused","unexcused","late"],dt={excused:"var(--lc-warn)",unexcused:"var(--lc-bad)",late:"var(--lc-brand)"},lt={excused:"stat.excused",unexcused:"stat.unexcused",late:"stat.late"};let ut=class extends Ce{static getConfigElement(){return document.createElement("librus-device-editor")}static getStubConfig(){return{type:"custom:librus-attendance-weekday-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 3}render(){if(!this._config||!this.hass)return W;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{map:t}=e,i=this.hass,s=t.attendance?i.states[t.attendance]:void 0,a=s?.attributes.by_weekday,r=ot.map(e=>{const t=a?.[String(e)];return(t?.excused??0)+(t?.unexcused??0)+(t?.late??0)}),n=r.reduce((e,t)=>e+t,0);if(!a||0===n)return this._message("mdi:chart-bar-stacked",ke(i,"card.attendance_weekday.empty"));const o=Math.max(...r,1),c={excused:0,unexcused:0,late:0};for(const e of ot){const t=a[String(e)];t&&(c.excused+=t.excused,c.unexcused+=t.unexcused,c.late+=t.late)}const d=ot.map(e=>new Date(2026,0,e+4).toLocaleDateString(i.language,{weekday:"short"}));return F`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:chart-bar-stacked"></ha-icon></div>
          <div class="title-block">
            <div class="title">${ke(i,"card.attendance_weekday.title")}</div>
            <div class="subtitle">${ke(i,"card.attendance_weekday.subtitle")}</div>
          </div>
        </div>
        <div class="weekday-bars">
          ${ot.map((e,t)=>{const s=a[String(e)],n=r[t],c=n>0?Math.max(22,n/o*84):4;return F`
              <div class="weekday-col">
                <div class="weekday-total">${n||""}</div>
                <div class="weekday-bar-stack" style="height:${c}px;${0===n?"background:var(--divider-color);":""}">
                  ${ct.filter(e=>s&&s[e]>0).map(e=>F`
                      <div
                        class="seg"
                        style="height:${(s[e]/n*c).toFixed(1)}px;background:${dt[e]}"
                        title="${ke(i,lt[e])}: ${s[e]}"
                      ></div>
                    `)}
                </div>
                <div class="weekday-label">${d[t]}</div>
              </div>
            `})}
        </div>
        <div class="legend">
          ${ct.map(e=>F`
              <span class="legend-item">
                <span class="dot" style="background:${dt[e]}"></span>${ke(i,lt[e])} <b>${c[e]}</b>
              </span>
            `)}
        </div>
      </ha-card>
    `}};ut.styles=[je,Se,n`
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
    `],e([ge()],ut.prototype,"_config",void 0),ut=e([de("librus-attendance-weekday-card")],ut);const ht={positive:"good",negative:"bad",neutral:"neutral"};let gt=class extends Ce{static getConfigElement(){return document.createElement("librus-device-editor")}static getStubConfig(){return{type:"custom:librus-behaviour-notices-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 2}render(){if(!this._config||!this.hass)return W;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{map:t}=e,i=this.hass,s=t.behaviour_notices?i.states[t.behaviour_notices]:void 0,a=s?.attributes.recent??[],r=s&&Number(s.state)||0;return s&&0!==a.length?F`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:alert-circle-outline"></ha-icon></div>
          <div class="title-block">
            <div class="title">${ke(i,"card.behaviour_notices.title")}</div>
            <div class="subtitle">${r}</div>
          </div>
        </div>
        <div class="scroll-list">
          ${a.map(e=>F`
              <div class="list-item">
                <span class="dot ${ht[e.sentiment??"neutral"]}"></span>
                <div class="body">
                  <div class="row1">
                    <span class="cat-label">${e.category??""}</span>
                    ${e.date?F`<time>${Ne(e.date,i.language)}</time>`:W}
                  </div>
                  <div class="item-text">${e.text}</div>
                </div>
              </div>
            `)}
        </div>
      </ha-card>
    `:this._message("mdi:alert-circle-outline",ke(i,"card.behaviour_notices.empty"))}};gt.styles=[je,Se],e([ge()],gt.prototype,"_config",void 0),gt=e([de("librus-behaviour-notices-card")],gt);let vt=class extends Ce{static getConfigElement(){return document.createElement("librus-device-editor")}static getStubConfig(){return{type:"custom:librus-behaviour-notices-tile-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 1}render(){if(!this._config||!this.hass)return W;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{map:t}=e,i=this.hass,s=t.behaviour_notices?i.states[t.behaviour_notices]:void 0;if(!s)return this._message("mdi:alert-circle-outline",ke(i,"empty.generic_error"));const a=Number(s.state)||0,r=(s.attributes.recent??[])[0];return F`
      <ha-card class="tile">
        <div class="icon-badge ${"negative"===r?.sentiment?"bad":"positive"===r?.sentiment?"good":""}"><ha-icon icon="mdi:alert-circle-outline"></ha-icon></div>
        <div class="tile-body">
          <div class="subj">${a} ${ke(i,"card.behaviour_notices.title").toLowerCase()}</div>
          ${r?.category?F`<div class="meta">${r.category}</div>`:W}
        </div>
      </ha-card>
    `}};async function pt(e,t,i,s="inbox"){return(await e.callWS({type:"call_service",domain:"librus_synergia",service:"get_message",service_data:{device_id:t,message_id:i,mailbox:s},return_response:!0})).response}vt.styles=[je,Se,n`
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
    `],e([ge()],vt.prototype,"_config",void 0),vt=e([de("librus-behaviour-notices-tile-card")],vt);const mt=[{key:"inbox",label:"mailbox.inbox"},{key:"notes",label:"mailbox.notes"},{key:"alerts",label:"mailbox.alerts"},{key:"substitutions",label:"mailbox.substitutions"},{key:"absences",label:"mailbox.absences"},{key:"justifications",label:"mailbox.justifications"},{key:"trash",label:"mailbox.trash"}];let bt=class extends Ce{constructor(){super(...arguments),this._fullById={},this._pendingIds=new Set,this._errorIds=new Set}static getConfigElement(){return document.createElement("librus-device-editor")}static getStubConfig(){return{type:"custom:librus-messages-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 3}async _onMessageClick(e){if(this._expandedId===e.id)return void(this._expandedId=void 0);if(this._expandedId=e.id,this._fullById[e.id]||this._pendingIds.has(e.id))return;const t=this._resolveEntities();if("error"in t||!this.hass)return;this._pendingIds=new Set(this._pendingIds).add(e.id);const i=new Set(this._errorIds);i.delete(e.id),this._errorIds=i;try{const i=await pt(this.hass,t.deviceId,e.id);this._fullById={...this._fullById,[e.id]:i}}catch{this._errorIds=new Set(this._errorIds).add(e.id)}finally{const t=new Set(this._pendingIds);t.delete(e.id),this._pendingIds=t}}_renderMessageBody(e){const t=this.hass;if(this._expandedId!==e.id)return F`<div class="item-text"><b>${e.topic}</b> - ${e.content}</div>`;const i=this._fullById[e.id];return i?F`
        <div class="item-text"><b>${i.topic}</b></div>
        <div class="full-text">${i.content}</div>
        <div class="read-notice">${ke(t,"card.messages.read_notice")}</div>
      `:this._errorIds.has(e.id)?F`<div class="item-text"><b>${e.topic}</b> - ${ke(t,"card.messages.fetch_failed")}</div>`:F`<div class="item-text"><b>${e.topic}</b> - ${ke(t,"empty.loading")}</div>`}render(){if(!this._config||!this.hass)return W;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{map:t}=e,i=this.hass,s=t.unread_messages?i.states[t.unread_messages]:void 0;if(!s||"unavailable"===s.state)return this._message("mdi:email-outline",ke(i,"card.messages.unavailable"));const a=s.attributes.mailbox_breakdown??{},r=s.attributes.recent??[],n=Number(s.state)||0;return F`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:email-outline"></ha-icon></div>
          <div class="title-block">
            <div class="title">${ke(i,"card.messages.title")}</div>
            <div class="subtitle">${ke(i,"mailbox.inbox")}</div>
          </div>
        </div>
        <div class="chips">
          ${mt.map(({key:e,label:t})=>F`
              <span class="chip ${"inbox"===e&&n>0?"hot":""}"
                >${ke(i,t)} <span class="n">${a[e]??0}</span></span
              >
            `)}
        </div>
        ${r.length?F`
              <hr />
              <div class="scroll-list">
                ${r.slice(0,6).map(e=>F`
                    <div class="list-item clickable" @click=${()=>this._onMessageClick(e)}>
                      <span class="dot ${e.unread?"good":"neutral"}"></span>
                      <div class="body">
                        <div class="row1">
                          <span>${e.sender}</span>
                          ${e.date?F`<time>${Ne(e.date,i.language)}</time>`:W}
                        </div>
                        ${this._renderMessageBody(e)}
                      </div>
                    </div>
                  `)}
              </div>
            `:W}
      </ha-card>
    `}};bt.styles=[je,Se,n`
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
    `],e([ge()],bt.prototype,"_config",void 0),e([ge()],bt.prototype,"_expandedId",void 0),e([ge()],bt.prototype,"_fullById",void 0),e([ge()],bt.prototype,"_pendingIds",void 0),e([ge()],bt.prototype,"_errorIds",void 0),bt=e([de("librus-messages-card")],bt);let ft=class extends Ce{static getConfigElement(){return document.createElement("librus-device-editor")}static getStubConfig(){return{type:"custom:librus-messages-tile-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 1}render(){if(!this._config||!this.hass)return W;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{map:t}=e,i=this.hass,s=t.unread_messages?i.states[t.unread_messages]:void 0;if(!s||"unavailable"===s.state)return this._message("mdi:email-outline",ke(i,"card.messages.unavailable"));const a=Number(s.state)||0,r=(s.attributes.recent??[])[0];return F`
      <ha-card class="tile">
        <div class="icon-badge ${a>0?"amber":""}">
          <ha-icon icon="mdi:email-outline"></ha-icon>
        </div>
        <div class="tile-body">
          <div class="subj">${a} ${ke(i,"mailbox.inbox").toLowerCase()}</div>
          ${r?F`<div class="meta">${r.sender} · ${r.topic}</div>`:W}
        </div>
      </ha-card>
    `}};function _t(e){return`${e.mailbox}:${e.id}`}ft.styles=[je,Se,n`
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
    `],e([ge()],ft.prototype,"_config",void 0),ft=e([de("librus-messages-tile-card")],ft);let yt=class extends Ce{constructor(){super(...arguments),this._fullByKey={},this._pendingKeys=new Set,this._errorKeys=new Set}static getConfigElement(){return document.createElement("librus-device-editor")}static getStubConfig(){return{type:"custom:librus-substitutions-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 2}async _onClick(e){const t=_t(e);if(this._expandedKey===t)return void(this._expandedKey=void 0);if(this._expandedKey=t,this._fullByKey[t]||this._pendingKeys.has(t))return;const i=this._resolveEntities();if("error"in i||!this.hass)return;this._pendingKeys=new Set(this._pendingKeys).add(t);const s=new Set(this._errorKeys);s.delete(t),this._errorKeys=s;try{const s=await pt(this.hass,i.deviceId,e.id,e.mailbox);this._fullByKey={...this._fullByKey,[t]:s}}catch{this._errorKeys=new Set(this._errorKeys).add(t)}finally{const e=new Set(this._pendingKeys);e.delete(t),this._pendingKeys=e}}_renderBody(e){const t=this.hass,i=_t(e);if(this._expandedKey!==i)return F`<div class="item-text"><b>${e.topic}</b> - ${e.content}</div>`;const s=this._fullByKey[i];return s?F`
        <div class="item-text"><b>${s.topic}</b></div>
        <div class="full-text">${s.content}</div>
        <div class="read-notice">${ke(t,"card.messages.read_notice")}</div>
      `:this._errorKeys.has(i)?F`<div class="item-text"><b>${e.topic}</b> - ${ke(t,"card.messages.fetch_failed")}</div>`:F`<div class="item-text"><b>${e.topic}</b> - ${ke(t,"empty.loading")}</div>`}_renderSection(e,t){if(0===t.length)return W;const i=this.hass;return F`
      <div class="section-title">${e}</div>
      <div class="scroll-list">
        ${t.map(e=>F`
            <div class="list-item clickable" @click=${()=>this._onClick(e)}>
              <span class="dot ${e.unread?"good":"neutral"}"></span>
              <div class="body">
                <div class="row1">
                  <span>${e.sender}</span>
                  ${e.date?F`<time>${Ne(e.date,i.language)}</time>`:W}
                </div>
                ${this._renderBody(e)}
              </div>
            </div>
          `)}
      </div>
    `}render(){if(!this._config||!this.hass)return W;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{map:t}=e,i=this.hass,s=t.unread_messages?i.states[t.unread_messages]:void 0,a=s?.attributes.substitutions_recent??[],r=s?.attributes.alerts_recent??[],n=s?.attributes.justifications_recent??[];return!s||0===a.length&&0===r.length&&0===n.length?this._message("mdi:bell-alert-outline",ke(i,"card.substitutions.empty")):F`
      <ha-card>
        <div class="header">
          <div class="icon-badge amber"><ha-icon icon="mdi:bell-alert-outline"></ha-icon></div>
          <div class="title-block">
            <div class="title">${ke(i,"card.substitutions.title")}</div>
            <div class="subtitle">${ke(i,"card.substitutions.subtitle")}</div>
          </div>
        </div>
        ${this._renderSection(ke(i,"mailbox.substitutions"),a)}
        ${this._renderSection(ke(i,"mailbox.alerts"),r)}
        ${this._renderSection(ke(i,"mailbox.justifications"),n)}
      </ha-card>
    `}};yt.styles=[je,Se,n`
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
    `],e([ge()],yt.prototype,"_config",void 0),e([ge()],yt.prototype,"_expandedKey",void 0),e([ge()],yt.prototype,"_fullByKey",void 0),e([ge()],yt.prototype,"_pendingKeys",void 0),e([ge()],yt.prototype,"_errorKeys",void 0),yt=e([de("librus-substitutions-card")],yt);let wt=class extends Ce{static getConfigElement(){return document.createElement("librus-device-editor")}static getStubConfig(){return{type:"custom:librus-announcements-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 2}_toggleExpanded(e){this._expandedId=this._expandedId===e?void 0:e}render(){if(!this._config||!this.hass)return W;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{map:t}=e,i=this.hass,s=t.unread_announcements?i.states[t.unread_announcements]:void 0,a=s?.attributes.recent??[];return s&&0!==a.length?F`
      <ha-card>
        <div class="header">
          <div class="icon-badge amber"><ha-icon icon="mdi:bullhorn-outline"></ha-icon></div>
          <div class="title-block">
            <div class="title">${ke(i,"card.announcements.title")}</div>
            <div class="subtitle">${s.state}</div>
          </div>
        </div>
        <div class="scroll-list">
          ${a.map((e,t)=>{const s=e.id??String(t);return F`
              <div class="list-item clickable" @click=${()=>this._toggleExpanded(s)}>
                <span class="dot neutral"></span>
                <div class="body">
                  <div class="row1">${e.subject}</div>
                  ${e.start_date&&e.end_date?F`<div class="item-text">
                        ${Ne(e.start_date,i.language)} –
                        ${Ne(e.end_date,i.language)}
                      </div>`:W}
                  ${this._expandedId===s?F`<div class="full-text">${e.content}</div>`:W}
                </div>
              </div>
            `})}
        </div>
      </ha-card>
    `:this._message("mdi:bullhorn-outline",ke(i,"card.announcements.empty"))}};wt.styles=[je,Se,n`
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
    `],e([ge()],wt.prototype,"_config",void 0),e([ge()],wt.prototype,"_expandedId",void 0),wt=e([de("librus-announcements-card")],wt);let $t=class extends Ce{static getConfigElement(){return document.createElement("librus-device-editor")}static getStubConfig(){return{type:"custom:librus-announcements-tile-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 1}render(){if(!this._config||!this.hass)return W;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{map:t}=e,i=this.hass,s=t.unread_announcements?i.states[t.unread_announcements]:void 0;if(!s)return this._message("mdi:bullhorn-outline",ke(i,"empty.generic_error"));const a=Number(s.state)||0,r=(s.attributes.recent??[])[0];return F`
      <ha-card class="tile">
        <div class="icon-badge ${a>0?"amber":""}">
          <ha-icon icon="mdi:bullhorn-outline"></ha-icon>
        </div>
        <div class="tile-body">
          <div class="subj">${a} ${ke(i,"card.announcements.title").toLowerCase()}</div>
          ${r?F`<div class="meta">${r.subject}</div>`:W}
        </div>
      </ha-card>
    `}};$t.styles=[je,Se,n`
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
    `],e([ge()],$t.prototype,"_config",void 0),$t=e([de("librus-announcements-tile-card")],$t);let xt=class extends Ce{static getConfigElement(){return document.createElement("librus-device-editor")}static getStubConfig(){return{type:"custom:librus-homework-assignments-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 2}render(){if(!this._config||!this.hass)return W;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{map:t}=e,i=this.hass,s=t.homework_assignments?i.states[t.homework_assignments]:void 0,a=s?.attributes.recent??[];return s&&0!==a.length?F`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:notebook-edit-outline"></ha-icon></div>
          <div class="title-block">
            <div class="title">${ke(i,"card.homework_assignments.title")}</div>
            <div class="subtitle">${s.state}</div>
          </div>
        </div>
        <div class="scroll-list">
          ${a.map(e=>F`
              <div class="list-item">
                <span class="dot neutral"></span>
                <div class="body">
                  <div class="row1">
                    <span>${e.topic}</span>
                    ${e.due_date?F`<time>${ke(i,"label.due")} ${Ne(e.due_date,i.language)}</time>`:W}
                  </div>
                  <div class="item-text">${e.text}${e.teacher?F` - ${e.teacher}`:W}</div>
                </div>
              </div>
            `)}
        </div>
      </ha-card>
    `:this._message("mdi:notebook-edit-outline",ke(i,"card.homework_assignments.empty"))}};xt.styles=[je,Se],e([ge()],xt.prototype,"_config",void 0),xt=e([de("librus-homework-assignments-card")],xt);function kt(e){return e.length<=10?`${e}T00:00:00`:e}let zt=class extends Ce{static getConfigElement(){return document.createElement("librus-device-editor")}static getStubConfig(){return{type:"custom:librus-recent-activity-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 4}render(){if(!this._config||!this.hass)return W;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{deviceId:t,map:i}=e,s=this.hass,a=[];for(const e of _e(s,t,"subject_average")){const t=s.states[e.entityId]?.attributes.grades??[];for(const i of t)i.date&&a.push({date:i.date,icon:"mdi:notebook-outline",title:`${i.value} · ${e.subject}`,text:i.category??""})}const r=i.behaviour_notices?s.states[i.behaviour_notices]:void 0;for(const e of r?.attributes.recent??[])e.date&&a.push({date:e.date,icon:"mdi:alert-circle-outline",title:e.category??"",text:e.text});const n=i.unread_announcements?s.states[i.unread_announcements]:void 0;for(const e of n?.attributes.recent??[])e.creation_date&&a.push({date:e.creation_date,icon:"mdi:bullhorn-outline",title:e.subject,text:""});const o=i.unread_messages?s.states[i.unread_messages]:void 0;for(const e of o?.attributes.recent??[])e.date&&a.push({date:e.date,icon:"mdi:email-outline",title:`${e.sender} · ${e.topic}`,text:e.content});a.sort((e,t)=>kt(t.date).localeCompare(kt(e.date)));const c=a.slice(0,15);return 0===c.length?this._message("mdi:bell-outline",ke(s,"card.recent_activity.empty")):F`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:bell-outline"></ha-icon></div>
          <div class="title-block">
            <div class="title">${ke(s,"card.recent_activity.title")}</div>
            <div class="subtitle">${ke(s,"card.recent_activity.subtitle")}</div>
          </div>
        </div>
        <div class="scroll-list">
          ${c.map(e=>F`
              <div class="list-item">
                <div class="type-icon"><ha-icon icon=${e.icon}></ha-icon></div>
                <div class="body">
                  <div class="row1">
                    <span>${e.title}</span>
                    <time>${Ne(e.date,s.language)}</time>
                  </div>
                  ${e.text?F`<div class="item-text">${e.text}</div>`:W}
                </div>
              </div>
            `)}
        </div>
      </ha-card>
    `}};function Ct(e){return"string"==typeof e?{value:e,allDay:e.length<=10}:e.date?{value:e.date,allDay:!0}:{value:e.dateTime??"",allDay:!1}}async function jt(e,t,i,s){const a=`calendars/${t}?start=${encodeURIComponent(i.toISOString())}&end=${encodeURIComponent(s.toISOString())}`,r=await e.callApi("GET",a);return Array.isArray(r)?r.map(e=>{const t=Ct(e.start),i=Ct(e.end);return{start:t.value,end:i.value,allDay:t.allDay,summary:e.summary??"",description:e.description,location:e.location}}):[]}function St(e,t){if(e.allDay)return!1;const i=new Date(e.start).getTime(),s=new Date(e.end).getTime(),a=t.getTime();return a>=i&&a<s}zt.styles=[je,Se,n`
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
    `],e([ge()],zt.prototype,"_config",void 0),zt=e([de("librus-recent-activity-card")],zt);let Et=class extends Ce{constructor(){super(...arguments),this._events=[]}static getConfigElement(){return document.createElement("librus-device-editor")}static getStubConfig(){return{type:"custom:librus-today-lessons-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 4}connectedCallback(){super.connectedCallback(),this._refreshTimer=setInterval(()=>{this._fetch(!0)},3e5),this._tickTimer=setInterval(()=>this.requestUpdate(),6e4)}disconnectedCallback(){super.disconnectedCallback(),clearInterval(this._refreshTimer),clearInterval(this._tickTimer)}async _fetch(e=!1){if(!this.hass||!this._config)return;const t=this._resolveEntities();if("error"in t)return;const i=t.map.timetable;if(!i)return;const s=new Date;s.setHours(0,0,0,0);const a=new Date(s);a.setDate(a.getDate()+1);const r=`${i}:${s.toDateString()}`;if(e||this._fetchedFor!==r){this._fetchedFor=r;try{const e=await jt(this.hass,i,s,a);this._events=e.filter(e=>!e.allDay).sort((e,t)=>e.start.localeCompare(t.start))}catch{this._events=[]}}}render(){if(!this._config||!this.hass)return W;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const t=this.hass;if(this._fetch(),0===this._events.length)return this._message("mdi:calendar-clock",ke(t,"card.today_lessons.empty"));const i=new Date;return F`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:calendar-clock"></ha-icon></div>
          <div class="title-block">
            <div class="title">${ke(t,"card.today_lessons.title")}</div>
            <div class="subtitle">${ke(t,"card.today_lessons.subtitle")}</div>
          </div>
        </div>
        <div class="timeline">
          ${this._events.map(e=>{const s=St(e,i),a=function(e,t){return(e.allDay?new Date(`${e.end}T23:59:59`):new Date(e.end)).getTime()<t.getTime()}(e,i);return F`
              <div class="tl-item ${s?"now":""} ${a?"done":""}">
                <span class="tl-time">${Te(e.start)}</span>
                <span class="tl-dot"></span>
                <div class="tl-body">
                  <div class="subj">
                    ${e.summary} ${s?F`<span class="pill-now">${ke(t,"label.now")}</span>`:W}
                  </div>
                  ${e.location||e.description?F`<div class="meta">${[e.location,e.description].filter(Boolean).join(" · ")}</div>`:W}
                </div>
              </div>
            `})}
        </div>
      </ha-card>
    `}};Et.styles=[je,Se,n`
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
    `],e([ge()],Et.prototype,"_config",void 0),e([ge()],Et.prototype,"_events",void 0),Et=e([de("librus-today-lessons-card")],Et);let Dt=class extends Ce{static getConfigElement(){return document.createElement("librus-device-editor")}static getStubConfig(){return{type:"custom:librus-next-lesson-tile-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 1}connectedCallback(){super.connectedCallback(),this._tickTimer=setInterval(()=>this.requestUpdate(),3e4)}disconnectedCallback(){super.disconnectedCallback(),clearInterval(this._tickTimer)}render(){if(!this._config||!this.hass)return W;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{map:t}=e,i=this.hass,s=t.timetable?i.states[t.timetable]:void 0,a=s?.attributes.message,r=s?.attributes.start_time;if(!s||!a||!r)return this._message("mdi:clock-outline",ke(i,"card.next_lesson.empty"));const n=new Date(r.replace(" ","T")),o=new Date,c="on"===s.state,d=Le(n,o),l=s.attributes.location,u=s.attributes.description;return F`
      <ha-card class="tile">
        <div class="icon-badge ${c?"good":""}"><ha-icon icon="mdi:clock-outline"></ha-icon></div>
        <div class="tile-body">
          <div class="subj">${a}</div>
          <div class="meta">
            ${c?ke(i,"label.now"):`${Te(r.replace(" ","T"))} · ${ze(i,d)}`}
            ${l?` · ${l}`:""}${u?` · ${u}`:""}
          </div>
        </div>
      </ha-card>
    `}};Dt.styles=[je,Se,n`
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
    `],e([ge()],Dt.prototype,"_config",void 0),Dt=e([de("librus-next-lesson-tile-card")],Dt);let It=class extends Ce{constructor(){super(...arguments),this._events=[]}static getConfigElement(){return document.createElement("librus-device-editor")}static getStubConfig(){return{type:"custom:librus-agenda-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 4}connectedCallback(){super.connectedCallback(),this._refreshTimer=setInterval(()=>{this._fetch(!0)},9e5)}disconnectedCallback(){super.disconnectedCallback(),clearInterval(this._refreshTimer)}async _fetch(e=!1){if(!this.hass||!this._config)return;const t=this._resolveEntities();if("error"in t)return;const i=t.map.agenda;if(!i)return;const s=new Date;s.setHours(0,0,0,0);const a=new Date(s);a.setDate(a.getDate()+14);const r=`${i}:${s.toDateString()}`;if(e||this._fetchedFor!==r){this._fetchedFor=r;try{const e=await jt(this.hass,i,s,a);this._events=e.sort((e,t)=>e.start.localeCompare(t.start))}catch{this._events=[]}}}render(){if(!this._config||!this.hass)return W;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const t=this.hass;if(this._fetch(),0===this._events.length)return this._message("mdi:calendar-text-outline",ke(t,"card.agenda.empty"));const i=new Map;for(const e of this._events){const t=e.start.slice(0,10);i.has(t)||i.set(t,[]),i.get(t).push(e)}return F`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:calendar-text-outline"></ha-icon></div>
          <div class="title-block">
            <div class="title">${ke(t,"card.agenda.title")}</div>
            <div class="subtitle">${ke(t,"card.agenda.subtitle")}</div>
          </div>
        </div>
        <div class="scroll-list">
          ${[...i.entries()].map(([e,i])=>F`
              <div class="day-group">
                <div class="day-label">${Ne(e,t.language)}</div>
                ${i.map(e=>{const{category:t,text:i}=Pe(e.summary);return F`
                    <div class="list-item">
                      <span class="dot neutral"></span>
                      <div class="body">
                        <div class="row1">
                          ${t?F`<span class="cat-label">${t}</span> ${i}`:i}
                        </div>
                        ${e.description?F`<div class="item-text">${e.description}</div>`:W}
                      </div>
                    </div>
                  `})}
              </div>
            `)}
        </div>
      </ha-card>
    `}};It.styles=[je,Se,n`
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
    `],e([ge()],It.prototype,"_config",void 0),e([ge()],It.prototype,"_events",void 0),It=e([de("librus-agenda-card")],It);const At=/sprawdzian/i;function Tt(e){const{category:t}=Pe(e.summary);return null!==t&&At.test(t)}let Nt=class extends Ce{constructor(){super(...arguments),this._events=[]}static getConfigElement(){return document.createElement("librus-device-editor")}static getStubConfig(){return{type:"custom:librus-exam-countdown-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 2}connectedCallback(){super.connectedCallback(),this._refreshTimer=setInterval(()=>{this._fetch(!0)},9e5)}disconnectedCallback(){super.disconnectedCallback(),clearInterval(this._refreshTimer)}async _fetch(e=!1){if(!this.hass||!this._config)return;const t=this._resolveEntities();if("error"in t)return;const i=t.map.agenda;if(!i)return;const s=new Date;s.setHours(0,0,0,0);const a=new Date(s);a.setDate(a.getDate()+90);const r=`${i}:${s.toDateString()}`;if(e||this._fetchedFor!==r){this._fetchedFor=r;try{const e=await jt(this.hass,i,s,a);this._events=e.filter(Tt).sort((e,t)=>e.start.localeCompare(t.start))}catch{this._events=[]}}}render(){if(!this._config||!this.hass)return W;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const t=this.hass;if(this._fetch(),0===this._events.length)return this._message("mdi:clipboard-text-outline",ke(t,"card.exam_countdown.empty"));const[i,...s]=this._events,a=Me(new Date,new Date(`${i.start}T00:00:00`)),r=Pe(i.summary).text;return F`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:clipboard-text-outline"></ha-icon></div>
          <div class="title-block">
            <div class="title">${ke(t,"card.exam_countdown.title")}</div>
            <div class="subtitle">${Ne(i.start,t.language)}</div>
          </div>
        </div>
        <div class="countdown">
          <span class="big">${a}</span>
          <span class="unit">${ke(t,"label.days_until")}<br /><b>${r}</b></span>
        </div>
        ${s.length?F`
              <hr />
              <div class="chips">
                ${s.slice(0,4).map(e=>F`<span class="chip">${Pe(e.summary).text} <span class="n">${Ne(e.start,t.language)}</span></span>`)}
              </div>
            `:W}
      </ha-card>
    `}};Nt.styles=[je,Se,n`
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
    `],e([ge()],Nt.prototype,"_config",void 0),e([ge()],Nt.prototype,"_events",void 0),Nt=e([de("librus-exam-countdown-card")],Nt);let Mt=class extends Ce{constructor(){super(...arguments),this._events=[]}static getConfigElement(){return document.createElement("librus-device-editor")}static getStubConfig(){return{type:"custom:librus-free-days-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 2}connectedCallback(){super.connectedCallback(),this._refreshTimer=setInterval(()=>{this._fetch(!0)},36e5)}disconnectedCallback(){super.disconnectedCallback(),clearInterval(this._refreshTimer)}async _fetch(e=!1){if(!this.hass||!this._config)return;const t=this._resolveEntities();if("error"in t)return;const i=t.map.free_days;if(!i)return;const s=new Date;s.setHours(0,0,0,0);const a=new Date(s);a.setDate(a.getDate()+240);const r=`${i}:${s.toDateString()}`;if(e||this._fetchedFor!==r){this._fetchedFor=r;try{const e=await jt(this.hass,i,s,a);this._events=e.sort((e,t)=>e.start.localeCompare(t.start))}catch{this._events=[]}}}render(){if(!this._config||!this.hass)return W;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const t=this.hass;if(this._fetch(),0===this._events.length)return this._message("mdi:beach",ke(t,"card.free_days.empty"));const i=new Date,[s,...a]=this._events,r=Me(i,new Date(`${s.start}T00:00:00`));return F`
      <ha-card>
        <div class="header">
          <div class="icon-badge amber"><ha-icon icon="mdi:beach"></ha-icon></div>
          <div class="title-block">
            <div class="title">${ke(t,"card.free_days.title")}</div>
            <div class="subtitle">${s.summary}</div>
          </div>
        </div>
        <div class="countdown">
          <span class="big">${r}</span>
          <span class="unit">${ke(t,"label.days_until")}<br /><b>${s.summary}</b></span>
        </div>
        ${a.length?F`
              <hr />
              <div class="chips">
                ${a.slice(0,4).map(e=>F`<span class="chip">${e.summary} <span class="n">${Ne(e.start,t.language)}</span></span>`)}
              </div>
            `:W}
      </ha-card>
    `}};Mt.styles=[je,Se,n`
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
    `],e([ge()],Mt.prototype,"_config",void 0),e([ge()],Mt.prototype,"_events",void 0),Mt=e([de("librus-free-days-card")],Mt);let Lt=class extends Ce{constructor(){super(...arguments),this._events=[]}static getConfigElement(){return document.createElement("librus-device-editor")}static getStubConfig(){return{type:"custom:librus-free-days-tile-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 1}connectedCallback(){super.connectedCallback(),this._refreshTimer=setInterval(()=>{this._fetch(!0)},36e5)}disconnectedCallback(){super.disconnectedCallback(),clearInterval(this._refreshTimer)}async _fetch(e=!1){if(!this.hass||!this._config)return;const t=this._resolveEntities();if("error"in t)return;const i=t.map.free_days;if(!i)return;const s=new Date;s.setHours(0,0,0,0);const a=new Date(s);a.setDate(a.getDate()+240);const r=`${i}:${s.toDateString()}`;if(e||this._fetchedFor!==r){this._fetchedFor=r;try{const e=await jt(this.hass,i,s,a);this._events=e.sort((e,t)=>e.start.localeCompare(t.start))}catch{this._events=[]}}}render(){if(!this._config||!this.hass)return W;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const t=this.hass;if(this._fetch(),0===this._events.length)return this._message("mdi:beach",ke(t,"card.free_days.empty"));const[i]=this._events,s=Me(new Date,new Date(`${i.start}T00:00:00`));return F`
      <ha-card class="tile">
        <div class="icon-badge amber"><ha-icon icon="mdi:beach"></ha-icon></div>
        <div class="tile-body">
          <div class="subj">${s} ${ke(t,"label.days").toLowerCase()}</div>
          <div class="meta">${i.summary}</div>
        </div>
      </ha-card>
    `}};Lt.styles=[je,Se,n`
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
    `],e([ge()],Lt.prototype,"_config",void 0),e([ge()],Lt.prototype,"_events",void 0),Lt=e([de("librus-free-days-tile-card")],Lt);const Ot=[1,2,3,4,5];function Pt(e){const t=new Date(e).getDay();return 0===t?7:t}let Ut=class extends Ce{constructor(){super(...arguments),this._events=[]}static getConfigElement(){return document.createElement("librus-device-editor")}static getStubConfig(){return{type:"custom:librus-week-timetable-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 4}connectedCallback(){super.connectedCallback(),this._refreshTimer=setInterval(()=>{this._fetch(!0)},18e5),this._tickTimer=setInterval(()=>this.requestUpdate(),3e4)}disconnectedCallback(){super.disconnectedCallback(),clearInterval(this._refreshTimer),clearInterval(this._tickTimer)}async _fetch(e=!1){if(!this.hass||!this._config)return;const t=this._resolveEntities();if("error"in t)return;const i=t.map.timetable;if(!i)return;const s=function(e){const t=new Date(e),i=Pt(e.toISOString()),s=i>=6?8-i:1-i;return t.setDate(t.getDate()+s),t.setHours(0,0,0,0),t}(new Date),a=new Date(s);a.setDate(a.getDate()+5);const r=`${i}:${s.toDateString()}`;if(e||this._fetchedFor!==r){this._fetchedFor=r;try{this._events=await jt(this.hass,i,s,a)}catch{this._events=[]}}}render(){if(!this._config||!this.hass)return W;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const t=this.hass;if(this._fetch(),0===this._events.length)return this._message("mdi:calendar-week-outline",ke(t,"card.week_timetable.empty"));const i=[[],[],[],[],[]];for(const e of this._events){const t=Pt(e.start);t>=1&&t<=5&&i[t-1].push(e)}i.forEach(e=>e.sort((e,t)=>e.start.localeCompare(t.start)));const s=Math.max(...i.map(e=>e.length),1),a=Ot.map(e=>new Date(2026,0,e+4).toLocaleDateString(t.language,{weekday:"short"})),r=new Date,n=Pt(r.toISOString())-1;return F`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:calendar-week-outline"></ha-icon></div>
          <div class="title-block">
            <div class="title">${ke(t,"card.week_timetable.title")}</div>
            <div class="subtitle">
              ${ke(t,function(e){return Pt(e.toISOString())>=6}(new Date)?"card.week_timetable.subtitle_upcoming":"card.week_timetable.subtitle")}
            </div>
          </div>
        </div>
        <div class="week-grid" style="grid-template-rows: auto repeat(${s}, 1fr);">
          <span class="h"></span>
          ${a.map(e=>F`<span class="h">${e}</span>`)}
          ${Array.from({length:s},(e,t)=>F`
            <span class="n">${t+1}</span>
            ${i.map((e,i)=>{const s=e[t];if(!s)return F`<div class="cell empty"></div>`;const a=i===n&&St(s,r);return F`<div class="cell on ${a?"current":""}" title=${s.summary}>${function(e){const t=e.replace(/\(.*\)/,"").trim();return t.length<=4?t:t.slice(0,3)}(s.summary)}</div>`})}
          `)}
        </div>
      </ha-card>
    `}};function Bt(e){const t=new Date(e),i=function(e){const t=new Date(e).getDay();return 0===t?7:t}(e.toISOString()),s=i>=6?8-i:1-i;return t.setDate(t.getDate()+s),t.setHours(0,0,0,0),t}Ut.styles=[je,Se,n`
      .week-grid {
        display: grid;
        grid-template-columns: 24px repeat(5, 1fr);
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
      .cell.empty {
        background: transparent;
      }
    `],e([ge()],Ut.prototype,"_config",void 0),e([ge()],Ut.prototype,"_events",void 0),Ut=e([de("librus-week-timetable-card")],Ut);const Ht=["var(--lc-brand)","var(--lc-good)","var(--lc-warn)","var(--lc-bad)","var(--lc-amber)","var(--lc-brand-strong)","var(--lc-neutral-dot)"];let Rt=class extends Ce{constructor(){super(...arguments),this._events=[]}static getConfigElement(){return document.createElement("librus-device-editor")}static getStubConfig(){return{type:"custom:librus-subject-time-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 3}connectedCallback(){super.connectedCallback(),this._refreshTimer=setInterval(()=>{this._fetch(!0)},18e5)}disconnectedCallback(){super.disconnectedCallback(),clearInterval(this._refreshTimer)}async _fetch(e=!1){if(!this.hass||!this._config)return;const t=this._resolveEntities();if("error"in t)return;const i=t.map.timetable;if(!i)return;const s=Bt(new Date),a=new Date(s);a.setDate(a.getDate()+5);const r=`${i}:${s.toDateString()}`;if(e||this._fetchedFor!==r){this._fetchedFor=r;try{this._events=await jt(this.hass,i,s,a)}catch{this._events=[]}}}render(){if(!this._config||!this.hass)return W;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const t=this.hass;if(this._fetch(),0===this._events.length)return this._message("mdi:chart-donut-variant",ke(t,"card.subject_time.empty"));const i=new Map;for(const e of this._events)e.summary&&i.set(e.summary,(i.get(e.summary)??0)+1);const s=[...i.entries()].sort((e,t)=>t[1]-e[1]),a=s.map(([e,t],i)=>({value:t,colorVar:Ht[i%Ht.length],label:e}));return F`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:chart-donut-variant"></ha-icon></div>
          <div class="title-block">
            <div class="title">${ke(t,"card.subject_time.title")}</div>
            <div class="subtitle">${ke(t,"card.subject_time.subtitle")}</div>
          </div>
        </div>
        <div class="chart-wrap">${De(a,{centerLabel:ke(t,"unit.lessons_per_week")})}</div>
        <div class="legend">
          ${a.map(e=>F`
              <span class="legend-item">
                <span class="dot" style="background:${e.colorVar}"></span>${e.label} <b>${e.value}</b>
              </span>
            `)}
        </div>
      </ha-card>
    `}};Rt.styles=[je,Se],e([ge()],Rt.prototype,"_config",void 0),e([ge()],Rt.prototype,"_events",void 0),Rt=e([de("librus-subject-time-card")],Rt);let Ft=class extends Ce{static getConfigElement(){return document.createElement("librus-device-editor")}static getStubConfig(){return{type:"custom:librus-school-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 2}render(){if(!this._config||!this.hass)return W;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{map:t}=e,i=this.hass,s=t.school?i.states[t.school]:void 0,a=t.school_class?i.states[t.school_class]:void 0;if(!s)return this._message("mdi:school",ke(i,"empty.generic_error"));const r=s.attributes.town,n=s.attributes.street,o=s.attributes.head_teacher,c=a?.attributes.homeroom_teacher,d=a?.attributes.first_semester_end,l=a?.attributes.school_year_end;return F`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:school"></ha-icon></div>
          <div class="title-block">
            <div class="title">${s.state}</div>
            <div class="subtitle">${[r,n].filter(Boolean).join(", ")}</div>
          </div>
        </div>
        <div class="stats">
          ${a?F`<div class="stat"><div class="stat-value">${a.state}</div><div class="stat-label">Klasa</div></div>`:W}
          ${c?F`<div class="stat"><div class="stat-value" style="font-size:0.95rem;">${c}</div><div class="stat-label">${ke(i,"label.tutor")}</div></div>`:W}
        </div>
        ${o?F`<div class="item-text">${ke(i,"label.head_teacher")}: ${o}</div>`:W}
        ${d||l?F`
              <hr />
              <div class="chips">
                ${d?F`<span class="chip">${ke(i,"label.semester_ends")} <span class="n">${Ne(d,i.language)}</span></span>`:W}
                ${l?F`<span class="chip">${ke(i,"label.year_ends")} <span class="n">${Ne(l,i.language)}</span></span>`:W}
              </div>
            `:W}
      </ha-card>
    `}};Ft.styles=[je,Se],e([ge()],Ft.prototype,"_config",void 0),Ft=e([de("librus-school-card")],Ft);let Kt=class extends Ce{static getConfigElement(){return document.createElement("librus-device-editor")}static getStubConfig(){return{type:"custom:librus-school-year-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 2}connectedCallback(){super.connectedCallback(),this._tickTimer=setInterval(()=>this.requestUpdate(),36e5)}disconnectedCallback(){super.disconnectedCallback(),clearInterval(this._tickTimer)}render(){if(!this._config||!this.hass)return W;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{map:t}=e,i=this.hass,s=t.school_class?i.states[t.school_class]:void 0,a=s?.attributes.school_year_start,r=s?.attributes.first_semester_end,n=s?.attributes.school_year_end;if(!s||!a||!n)return this._message("mdi:party-popper",ke(i,"card.school_year.empty"));const o=new Date,c=new Date(`${a}T00:00:00`),d=new Date(`${n}T00:00:00`),l=Math.max(1,Me(c,d)),u=Math.min(l,Math.max(0,Me(c,o))),h=Math.round(u/l*100),g=Math.max(0,Me(o,d)),v=!r||o<new Date(`${r}T00:00:00`),p=v&&r?r:n,m=Math.max(0,Me(o,new Date(`${p}T00:00:00`)));return F`
      <ha-card>
        <div class="header">
          <div class="icon-badge amber"><ha-icon icon="mdi:party-popper"></ha-icon></div>
          <div class="title-block">
            <div class="title">${ke(i,"card.school_year.title")}</div>
            <div class="subtitle">${Ne(n,i.language)}</div>
          </div>
        </div>
        <div class="ring-row">
          ${Ee(h,"var(--lc-brand)",68,7)}
          <div>
            <div class="ring-num">${g}</div>
            <div class="ring-label">${ke(i,"label.days_until_year_end")}</div>
          </div>
        </div>
        <hr />
        <div class="stats">
          <div class="stat">
            <div class="stat-value">${ke(i,"card.attendance.semester",{n:v?1:2})}</div>
            <div class="stat-label">${ke(i,"label.current_semester")}</div>
          </div>
          <div class="stat">
            <div class="stat-value">${m}</div>
            <div class="stat-label">${ke(i,"label.days_until_semester_end")}</div>
          </div>
          <div class="stat">
            <div class="stat-value">${h}<span class="unit">%</span></div>
            <div class="stat-label">${ke(i,"label.year_progress")}</div>
          </div>
        </div>
      </ha-card>
    `}};Kt.styles=[je,Se,n`
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
    `],e([ge()],Kt.prototype,"_config",void 0),Kt=e([de("librus-school-year-card")],Kt);const Wt=new Set(["unknown","unavailable",""]);let Vt=class extends Ce{static getConfigElement(){return document.createElement("librus-device-editor")}static getStubConfig(){return{type:"custom:librus-today-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 2}connectedCallback(){super.connectedCallback(),this._tickTimer=setInterval(()=>this.requestUpdate(),6e4)}disconnectedCallback(){super.disconnectedCallback(),clearInterval(this._tickTimer)}render(){if(!this._config||!this.hass)return W;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{map:t}=e,i=this.hass,s=e=>t[e]?i.states[t[e]]:void 0,a=s("lucky_number"),r=s("unread_messages"),n=s("unread_announcements"),o=s("timetable"),c=o?.attributes.message,d=o?.attributes.start_time,l="on"===o?.state;return F`
      <ha-card>
        <div class="header">
          <div class="icon-badge amber"><ha-icon icon="mdi:white-balance-sunny"></ha-icon></div>
          <div class="title-block">
            <div class="title">${ke(i,"card.today.title")}</div>
            <div class="subtitle">${(new Date).toLocaleDateString(i.language,{weekday:"long",day:"numeric",month:"long"})}</div>
          </div>
        </div>
        <div class="stats">
          ${a&&!Wt.has(a.state)&&!1!==a.attributes.is_today?F`<div class="stat"><div class="stat-value">${a.state}</div><div class="stat-label">${ke(i,"stat.lucky_number")}</div></div>`:W}
          ${r&&!Wt.has(r.state)?F`<div class="stat"><div class="stat-value">${r.state}</div><div class="stat-label">${ke(i,"card.messages.title")}</div></div>`:W}
          ${n&&!Wt.has(n.state)?F`<div class="stat"><div class="stat-value">${n.state}</div><div class="stat-label">${ke(i,"card.announcements.title")}</div></div>`:W}
        </div>
        ${c&&d?F`
              <hr />
              <div class="list-item">
                <span class="dot ${l?"good":"neutral"}"></span>
                <div class="body">
                  <div class="row1">${c}</div>
                  ${l?W:F`<div class="item-text">${ze(i,Le(new Date(d.replace(" ","T")),new Date))}</div>`}
                </div>
              </div>
            `:W}
      </ha-card>
    `}};Vt.styles=[je,Se],e([ge()],Vt.prototype,"_config",void 0),Vt=e([de("librus-today-card")],Vt);const qt=new Set(["unknown","unavailable",""]);let Gt=class extends Ce{static getConfigElement(){return document.createElement("librus-device-editor")}static getStubConfig(){return{type:"custom:librus-week-summary-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 2}render(){if(!this._config||!this.hass)return W;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{deviceId:t,map:i}=e,s=this.hass,a=i.attendance?s.states[i.attendance]:void 0,r=i.behaviour_notices?s.states[i.behaviour_notices]:void 0,n=i.agenda?s.states[i.agenda]:void 0,o=new Date;o.setDate(o.getDate()-7);const c=o.toISOString().slice(0,10),d=_e(s,t,"subject_average").filter(e=>{const t=s.states[e.entityId]?.attributes.latest_grade_date;return t&&t>=c}).length,l=n?.attributes.message;return F`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:calendar-check-outline"></ha-icon></div>
          <div class="title-block">
            <div class="title">${ke(s,"card.week_summary.title")}</div>
          </div>
        </div>
        <div class="stats">
          <div class="stat">
            <div class="stat-value">${d}</div>
            <div class="stat-label">${ke(s,"stat.new_grades")}</div>
          </div>
          ${a&&!qt.has(a.state)?(()=>{const e=a.attributes.unexcused_count??Number(a.state);return F`<div class="stat ${e>0?"bad":""}"><div class="stat-value">${e}</div><div class="stat-label">${ke(s,"stat.absences")}</div></div>`})():W}
          ${r&&!qt.has(r.state)?F`<div class="stat"><div class="stat-value">${r.state}</div><div class="stat-label">${ke(s,"card.behaviour_notices.title")}</div></div>`:W}
        </div>
        ${l?(()=>{const{category:e,text:t}=Pe(l);return F`
                <hr />
                <div class="list-item">
                  <span class="dot neutral"></span>
                  <div class="body">
                    <div class="row1">
                      ${e?F`<span class="cat-label">${e}</span> ${t}`:t}
                    </div>
                    ${n?.attributes.start_time?F`<div class="item-text">${Ne(String(n.attributes.start_time),s.language)}</div>`:W}
                  </div>
                </div>
              `})():W}
      </ha-card>
    `}};Gt.styles=[je,Se],e([ge()],Gt.prototype,"_config",void 0),Gt=e([de("librus-week-summary-card")],Gt);const Zt=new Set(["unknown","unavailable",""]);let Jt=class extends Ce{static getConfigElement(){return document.createElement("librus-device-editor")}static getStubConfig(){return{type:"custom:librus-lucky-number-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 2}render(){if(!this._config||!this.hass)return W;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{map:t}=e,i=this.hass,s=t.lucky_number?i.states[t.lucky_number]:void 0;if(!s||Zt.has(s.state))return this._message("mdi:dice-5-outline",ke(i,"empty.generic_error"));const a=s.attributes.is_today,r=s.attributes.day,n=!1===a&&r?ke(i,"card.lucky_number.subtitle_for_date",{date:Ne(r,i.language)}):ke(i,"card.lucky_number.subtitle");return F`
      <ha-card class="static">
        <div class="header">
          <div class="icon-badge amber"><ha-icon icon="mdi:dice-5-outline"></ha-icon></div>
          <div class="title-block">
            <div class="title">${ke(i,"card.lucky_number.title")}</div>
            <div class="subtitle">${n}</div>
          </div>
        </div>
        <div class="number-wrap">
          <div class="number">${s.state}</div>
        </div>
      </ha-card>
    `}};Jt.styles=[je,Se,n`
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
    `],e([ge()],Jt.prototype,"_config",void 0),Jt=e([de("librus-lucky-number-card")],Jt);const Yt=new Set(["unknown","unavailable",""]);let Qt=class extends Ce{static getConfigElement(){return document.createElement("librus-device-editor")}static getStubConfig(){return{type:"custom:librus-student-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 3}render(){if(!this._config||!this.hass)return W;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{deviceId:t,map:i}=e,s=this.hass,a=s.devices?.[t]?.name_by_user||s.devices?.[t]?.name||"",r=i.school_class?s.states[i.school_class]?.state:void 0,n=[],o=i.attendance?s.states[i.attendance]:void 0,c=o?.attributes.total_records;if(o&&c){const e=Number(o.state)||0;n.push({key:"attendance",label:ke(s,"stat.attendance_score"),value:Math.round((c-e)/c*100),colorVar:"var(--lc-good)"})}const d=i.behaviour_notices?s.states[i.behaviour_notices]:void 0;d&&!Yt.has(d.state)&&n.push({key:"behaviour",label:ke(s,"stat.behaviour_score"),value:Math.max(0,100-10*Number(d.state)),colorVar:"var(--lc-brand)"});const l=i.overall_average?s.states[i.overall_average]:void 0;l&&!Yt.has(l.state)&&n.push({key:"grades",label:ke(s,"stat.grades_score"),value:Math.round(Number(l.state)/6*100),colorVar:"var(--lc-amber)"});const u=_e(s,t,"subject_average");if(u.length){const e=u.filter(e=>{const t=s.states[e.entityId]?.attributes.grade_count;return t&&t>0}).length;n.push({key:"activity",label:ke(s,"stat.activity_score"),value:Math.round(e/u.length*100),colorVar:"var(--lc-brand)"})}if(0===n.length)return this._message("mdi:cards-outline",ke(s,"empty.generic_error"));const h=Math.round(n.reduce((e,t)=>e+t.value,0)/n.length);return F`
      <ha-card class="tcard">
        <div class="tcard-inner">
          <div class="tcard-head">
            <div>
              <div class="tcard-name">${a}</div>
              ${r?F`<div class="tcard-class">${r}</div>`:W}
            </div>
            <div class="tcard-rating">
              <div class="v">${h}</div>
              <div class="l">${ke(s,"stat.overall_rating")}</div>
            </div>
          </div>
          <div class="tcard-bars">
            ${n.map(e=>F`
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
    `}};Qt.styles=[je,Se,n`
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
    `],e([ge()],Qt.prototype,"_config",void 0),Qt=e([de("librus-student-card")],Qt);let Xt=class extends Ce{static getConfigElement(){return document.createElement("librus-device-editor")}static getStubConfig(){return{type:"custom:librus-streak-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 2}render(){if(!this._config||!this.hass)return W;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{map:t}=e,i=this.hass,s=t.attendance?i.states[t.attendance]:void 0,a=s?.attributes.last_absence_date,r=t.school_class?i.states[t.school_class]?.attributes.school_year_start:void 0;if(!s)return this._message("mdi:fire",ke(i,"empty.generic_error"));const n=a?new Date(`${a}T00:00:00`):r?new Date(`${r}T00:00:00`):void 0,o=n?Math.max(0,Me(n,new Date)):0,c=Math.min(10,Math.ceil(o/3));return F`
      <ha-card class="static">
        <div class="header">
          <div class="icon-badge amber"><ha-icon icon="mdi:fire"></ha-icon></div>
          <div class="title-block">
            <div class="title">${ke(i,"card.streak.title")}</div>
            <div class="subtitle">${ke(i,"card.streak.subtitle")}</div>
          </div>
        </div>
        <div class="streak-num">${o} ${ke(i,"label.days")}</div>
        <div class="flames">
          ${Array.from({length:10},(e,t)=>F`<span class="flame ${t<c?"on":""}"></span>`)}
        </div>
      </ha-card>
    `}};Xt.styles=[je,Se,n`
      .streak-num {
        font-size: 2rem;
        font-weight: 800;
        color: var(--lc-amber);
        line-height: 1;
        font-variant-numeric: tabular-nums;
      }
      .flames {
        display: flex;
        gap: 3px;
      }
      .flame {
        width: 15px;
        height: 15px;
        border-radius: 3px;
        background: var(--divider-color);
      }
      .flame.on {
        background: var(--lc-amber);
      }
    `],e([ge()],Xt.prototype,"_config",void 0),Xt=e([de("librus-streak-card")],Xt),window.customCards=window.customCards||[],window.customCards.push({type:"librus-grades-card",name:"Librus - Średnia ocen",description:"Średnia ogólna i średnie z każdego przedmiotu, z paskami porównawczymi.",preview:!0},{type:"librus-grade-log-card",name:"Librus - Dziennik ocen",description:"Wszystkie oceny ze wszystkich przedmiotów w jednej chronologicznej liście.",preview:!0},{type:"librus-subject-grades-card",name:"Librus - Oceny z przedmiotu",description:"Pełna lista ocen z JEDNEGO wybranego przedmiotu (wybór w konfiguracji karty).",preview:!0},{type:"librus-grade-trend-card",name:"Librus - Trend średniej",description:"Jak zmieniała się średnia (ogólna lub przedmiotu) w ostatnich 60 dniach.",preview:!0},{type:"librus-grade-distribution-card",name:"Librus - Rozkład ocen",description:"Histogram: ile było szóstek, piątek, czwórek itd. ze wszystkich przedmiotów.",preview:!0},{type:"librus-grades-radar-card",name:"Librus - Profil ocen (radar)",description:"Wykres pajęczynowy średnich wszystkich przedmiotów na jednym wykresie.",preview:!0},{type:"librus-grade-category-distribution-card",name:"Librus - Oceny wg kategorii",description:"Pierścieniowy wykres: ile ocen ze sprawdzianów, kartkówek, odpowiedzi itd.",preview:!0},{type:"librus-latest-grade-card",name:"Librus - Ostatnia ocena",description:"Najnowsza ocena ze wszystkich przedmiotów, wraz z komentarzem nauczyciela.",preview:!0},{type:"librus-behaviour-grade-card",name:"Librus - Ocena zachowania",description:"Formalna ocena zachowania, odrębna od uwag.",preview:!0},{type:"librus-descriptive-grades-card",name:"Librus - Oceny opisowe",description:"Oceny opisowe (nienumeryczne), jeśli szkoła je stosuje.",preview:!0},{type:"librus-subject-spotlight-card",name:"Librus - Najlepszy i najsłabszy przedmiot",description:"Dwa skrajne przedmioty wg średniej, obliczone z sensorów średnich per przedmiot.",preview:!0},{type:"librus-attendance-card",name:"Librus - Frekwencja",description:"Liczba realnych nieobecności i spóźnień, z rozbiciem na typy, % i podziałem na semestr.",preview:!0},{type:"librus-attendance-tile-card",name:"Librus - Frekwencja (kafelek)",description:"Kompaktowy kafelek z liczbą nieobecności i frekwencją %.",preview:!0},{type:"librus-attendance-heatmap-card",name:"Librus - Frekwencja (mapa roku)",description:"Mapa dni całego roku szkolnego kolorowana wg statusu frekwencji, w stylu GitHub contributions.",preview:!0},{type:"librus-attendance-weekday-card",name:"Librus - Nieobecności wg dnia tygodnia",description:"Słupek na każdy dzień tygodnia podzielony na usprawiedliwione/nieusprawiedliwione/spóźnienia.",preview:!0},{type:"librus-behaviour-notices-card",name:"Librus - Uwagi",description:"Lista uwag z kategorią i zabarwieniem (pozytywna/negatywna/neutralna).",preview:!0},{type:"librus-behaviour-notices-tile-card",name:"Librus - Uwagi (kafelek)",description:"Kompaktowy kafelek z liczbą uwag i ostatnią kategorią.",preview:!0},{type:"librus-messages-card",name:"Librus - Wiadomości",description:"Nieprzeczytane wiadomości ze wszystkich skrzynek i podgląd ostatnich z odebranych.",preview:!0},{type:"librus-messages-tile-card",name:"Librus - Wiadomości (kafelek)",description:"Kompaktowy kafelek z liczbą nieprzeczytanych i ostatnim nadawcą.",preview:!0},{type:"librus-substitutions-card",name:"Librus - Zastępstwa i alerty",description:"Pełna treść zastępstw i alertów - kliknij, by rozwinąć.",preview:!0},{type:"librus-announcements-card",name:"Librus - Ogłoszenia",description:"Nieprzeczytane ogłoszenia z tablicy szkolnej.",preview:!0},{type:"librus-announcements-tile-card",name:"Librus - Ogłoszenia (kafelek)",description:"Kompaktowy kafelek z liczbą nieprzeczytanych ogłoszeń.",preview:!0},{type:"librus-homework-assignments-card",name:"Librus - Zadania domowe",description:"Lista realnych zadań domowych z terminami.",preview:!0},{type:"librus-recent-activity-card",name:"Librus - Co nowego",description:"Wspólny, chronologiczny feed najnowszych ocen, uwag, ogłoszeń i wiadomości.",preview:!0},{type:"librus-today-lessons-card",name:"Librus - Dzisiejszy plan lekcji",description:"Oś czasu dzisiejszych lekcji z podświetleniem aktualnej.",preview:!0},{type:"librus-next-lesson-tile-card",name:"Librus - Najbliższa lekcja",description:"Kompaktowy kafelek z najbliższą lub trwającą lekcją.",preview:!0},{type:"librus-agenda-card",name:"Librus - Terminarz",description:"Nadchodzące wydarzenia z terminarza, pogrupowane wg dnia.",preview:!0},{type:"librus-exam-countdown-card",name:"Librus - Najbliższy sprawdzian",description:"Odliczanie do najbliższego sprawdzianu z terminarza, wyodrębnione z ogólnej listy.",preview:!0},{type:"librus-free-days-card",name:"Librus - Dni wolne",description:"Odliczanie do najbliższej przerwy i lista kolejnych dni wolnych.",preview:!0},{type:"librus-free-days-tile-card",name:"Librus - Dni wolne (kafelek)",description:"Kompaktowy kafelek z odliczaniem do najbliższej przerwy.",preview:!0},{type:"librus-week-timetable-card",name:"Librus - Plan tygodniowy",description:"Siatka planu lekcji na cały tydzień.",preview:!0},{type:"librus-subject-time-card",name:"Librus - Podział czasu lekcji",description:"Pierścieniowy wykres liczby lekcji w tygodniu na przedmiot, z planu lekcji.",preview:!0},{type:"librus-school-card",name:"Librus - Szkoła i klasa",description:"Nazwa i adres szkoły, klasa, wychowawca, terminy semestru.",preview:!0},{type:"librus-school-year-card",name:"Librus - Koniec roku szkolnego",description:"Odliczanie do końca roku szkolnego, pasek postępu roku i data końca semestru.",preview:!0},{type:"librus-today-card",name:"Librus - Dziś",description:"Szczęśliwy numerek, nieprzeczytane wiadomości/ogłoszenia i najbliższa lekcja w jednym miejscu.",preview:!0},{type:"librus-week-summary-card",name:"Librus - Tydzień w skrócie",description:"Nowe oceny, nieobecności, uwagi i najbliższe wydarzenie w tym tygodniu.",preview:!0},{type:"librus-lucky-number-card",name:"Librus - Szczęśliwy numerek",description:"Dzisiejszy szczęśliwy numerek w dużym formacie.",preview:!0},{type:"librus-student-card",name:"Librus - Karta ucznia",description:"Zabawowa karta w stylu trading-card, licząca ogólną ocenę z frekwencji/zachowania/ocen/aktywności.",preview:!0},{type:"librus-streak-card",name:"Librus - Seria bez nieobecności",description:"Licznik kolejnych dni bez nieobecności.",preview:!0}),console.info("%c LIBRUS-SYNERGIA-CARDS %c 39 cards loaded ","color: #fff; background: #4f46e5; font-weight: 700; border-radius: 3px 0 0 3px; padding: 2px 6px;","color: #4f46e5; background: transparent; font-weight: 500;");
