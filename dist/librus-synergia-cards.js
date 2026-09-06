function e(e,t,s,i){var a,r=arguments.length,n=r<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,s):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,s,i);else for(var o=e.length-1;o>=0;o--)(a=e[o])&&(n=(r<3?a(n):r>3?a(t,s,n):a(t,s))||n);return r>3&&n&&Object.defineProperty(t,s,n),n}"function"==typeof SuppressedError&&SuppressedError;
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=globalThis,s=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),a=new WeakMap;let r=class{constructor(e,t,s){if(this._$cssResult$=!0,s!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(s&&void 0===e){const s=void 0!==t&&1===t.length;s&&(e=a.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),s&&a.set(t,e))}return e}toString(){return this.cssText}};const n=(e,...t)=>{const s=1===e.length?e[0]:t.reduce((t,s,i)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+e[i+1],e[0]);return new r(s,e,i)},o=s?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const s of e.cssRules)t+=s.cssText;return(e=>new r("string"==typeof e?e:e+"",void 0,i))(t)})(e):e,{is:c,defineProperty:d,getOwnPropertyDescriptor:l,getOwnPropertyNames:h,getOwnPropertySymbols:u,getPrototypeOf:v}=Object,g=globalThis,p=g.trustedTypes,m=p?p.emptyScript:"",b=g.reactiveElementPolyfillSupport,f=(e,t)=>e,_={toAttribute(e,t){switch(t){case Boolean:e=e?m:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let s=e;switch(t){case Boolean:s=null!==e;break;case Number:s=null===e?null:Number(e);break;case Object:case Array:try{s=JSON.parse(e)}catch(e){s=null}}return s}},y=(e,t)=>!c(e,t),$={attribute:!0,type:String,converter:_,reflect:!1,useDefault:!1,hasChanged:y};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),g.litPropertyMetadata??=new WeakMap;let w=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=$){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const s=Symbol(),i=this.getPropertyDescriptor(e,s,t);void 0!==i&&d(this.prototype,e,i)}}static getPropertyDescriptor(e,t,s){const{get:i,set:a}=l(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:i,set(t){const r=i?.call(this);a?.call(this,t),this.requestUpdate(e,r,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??$}static _$Ei(){if(this.hasOwnProperty(f("elementProperties")))return;const e=v(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(f("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(f("properties"))){const e=this.properties,t=[...h(e),...u(e)];for(const s of t)this.createProperty(s,e[s])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,s]of t)this.elementProperties.set(e,s)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const s=this._$Eu(e,t);void 0!==s&&this._$Eh.set(s,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const s=new Set(e.flat(1/0).reverse());for(const e of s)t.unshift(o(e))}else void 0!==e&&t.push(o(e));return t}static _$Eu(e,t){const s=t.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const s of t.keys())this.hasOwnProperty(s)&&(e.set(s,this[s]),delete this[s]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((e,i)=>{if(s)e.adoptedStyleSheets=i.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const s of i){const i=document.createElement("style"),a=t.litNonce;void 0!==a&&i.setAttribute("nonce",a),i.textContent=s.cssText,e.appendChild(i)}})(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,s){this._$AK(e,s)}_$ET(e,t){const s=this.constructor.elementProperties.get(e),i=this.constructor._$Eu(e,s);if(void 0!==i&&!0===s.reflect){const a=(void 0!==s.converter?.toAttribute?s.converter:_).toAttribute(t,s.type);this._$Em=e,null==a?this.removeAttribute(i):this.setAttribute(i,a),this._$Em=null}}_$AK(e,t){const s=this.constructor,i=s._$Eh.get(e);if(void 0!==i&&this._$Em!==i){const e=s.getPropertyOptions(i),a="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:_;this._$Em=i;const r=a.fromAttribute(t,e.type);this[i]=r??this._$Ej?.get(i)??r,this._$Em=null}}requestUpdate(e,t,s,i=!1,a){if(void 0!==e){const r=this.constructor;if(!1===i&&(a=this[e]),s??=r.getPropertyOptions(e),!((s.hasChanged??y)(a,t)||s.useDefault&&s.reflect&&a===this._$Ej?.get(e)&&!this.hasAttribute(r._$Eu(e,s))))return;this.C(e,t,s)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:s,reflect:i,wrapped:a},r){s&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,r??t??this[e]),!0!==a||void 0!==r)||(this._$AL.has(e)||(this.hasUpdated||s||(t=void 0),this._$AL.set(e,t)),!0===i&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,s]of e){const{wrapped:e}=s,i=this[t];!0!==e||this._$AL.has(t)||void 0===i||this.C(t,void 0,s,i)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};w.elementStyles=[],w.shadowRootOptions={mode:"open"},w[f("elementProperties")]=new Map,w[f("finalized")]=new Map,b?.({ReactiveElement:w}),(g.reactiveElementVersions??=[]).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const x=globalThis,k=e=>e,z=x.trustedTypes,C=z?z.createPolicy("lit-html",{createHTML:e=>e}):void 0,S="$lit$",E=`lit$${Math.random().toFixed(9).slice(2)}$`,A="?"+E,j=`<${A}>`,D=document,T=()=>D.createComment(""),N=e=>null===e||"object"!=typeof e&&"function"!=typeof e,I=Array.isArray,O="[ \t\n\f\r]",M=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,P=/-->/g,U=/>/g,L=RegExp(`>|${O}(?:([^\\s"'>=/]+)(${O}*=${O}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),H=/'/g,R=/"/g,B=/^(?:script|style|textarea|title)$/i,q=(e=>(t,...s)=>({_$litType$:e,strings:t,values:s}))(1),F=Symbol.for("lit-noChange"),W=Symbol.for("lit-nothing"),V=new WeakMap,K=D.createTreeWalker(D,129);function G(e,t){if(!I(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==C?C.createHTML(t):t}const Z=(e,t)=>{const s=e.length-1,i=[];let a,r=2===t?"<svg>":3===t?"<math>":"",n=M;for(let t=0;t<s;t++){const s=e[t];let o,c,d=-1,l=0;for(;l<s.length&&(n.lastIndex=l,c=n.exec(s),null!==c);)l=n.lastIndex,n===M?"!--"===c[1]?n=P:void 0!==c[1]?n=U:void 0!==c[2]?(B.test(c[2])&&(a=RegExp("</"+c[2],"g")),n=L):void 0!==c[3]&&(n=L):n===L?">"===c[0]?(n=a??M,d=-1):void 0===c[1]?d=-2:(d=n.lastIndex-c[2].length,o=c[1],n=void 0===c[3]?L:'"'===c[3]?R:H):n===R||n===H?n=L:n===P||n===U?n=M:(n=L,a=void 0);const h=n===L&&e[t+1].startsWith("/>")?" ":"";r+=n===M?s+j:d>=0?(i.push(o),s.slice(0,d)+S+s.slice(d)+E+h):s+E+(-2===d?t:h)}return[G(e,r+(e[s]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),i]};class J{constructor({strings:e,_$litType$:t},s){let i;this.parts=[];let a=0,r=0;const n=e.length-1,o=this.parts,[c,d]=Z(e,t);if(this.el=J.createElement(c,s),K.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(i=K.nextNode())&&o.length<n;){if(1===i.nodeType){if(i.hasAttributes())for(const e of i.getAttributeNames())if(e.endsWith(S)){const t=d[r++],s=i.getAttribute(e).split(E),n=/([.?@])?(.*)/.exec(t);o.push({type:1,index:a,name:n[2],strings:s,ctor:"."===n[1]?te:"?"===n[1]?se:"@"===n[1]?ie:ee}),i.removeAttribute(e)}else e.startsWith(E)&&(o.push({type:6,index:a}),i.removeAttribute(e));if(B.test(i.tagName)){const e=i.textContent.split(E),t=e.length-1;if(t>0){i.textContent=z?z.emptyScript:"";for(let s=0;s<t;s++)i.append(e[s],T()),K.nextNode(),o.push({type:2,index:++a});i.append(e[t],T())}}}else if(8===i.nodeType)if(i.data===A)o.push({type:2,index:a});else{let e=-1;for(;-1!==(e=i.data.indexOf(E,e+1));)o.push({type:7,index:a}),e+=E.length-1}a++}}static createElement(e,t){const s=D.createElement("template");return s.innerHTML=e,s}}function Y(e,t,s=e,i){if(t===F)return t;let a=void 0!==i?s._$Co?.[i]:s._$Cl;const r=N(t)?void 0:t._$litDirective$;return a?.constructor!==r&&(a?._$AO?.(!1),void 0===r?a=void 0:(a=new r(e),a._$AT(e,s,i)),void 0!==i?(s._$Co??=[])[i]=a:s._$Cl=a),void 0!==a&&(t=Y(e,a._$AS(e,t.values),a,i)),t}class Q{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:s}=this._$AD,i=(e?.creationScope??D).importNode(t,!0);K.currentNode=i;let a=K.nextNode(),r=0,n=0,o=s[0];for(;void 0!==o;){if(r===o.index){let t;2===o.type?t=new X(a,a.nextSibling,this,e):1===o.type?t=new o.ctor(a,o.name,o.strings,this,e):6===o.type&&(t=new ae(a,this,e)),this._$AV.push(t),o=s[++n]}r!==o?.index&&(a=K.nextNode(),r++)}return K.currentNode=D,i}p(e){let t=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(e,s,t),t+=s.strings.length-2):s._$AI(e[t])),t++}}class X{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,s,i){this.type=2,this._$AH=W,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=Y(this,e,t),N(e)?e===W||null==e||""===e?(this._$AH!==W&&this._$AR(),this._$AH=W):e!==this._$AH&&e!==F&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>I(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==W&&N(this._$AH)?this._$AA.nextSibling.data=e:this.T(D.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:s}=e,i="number"==typeof s?this._$AC(e):(void 0===s.el&&(s.el=J.createElement(G(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(t);else{const e=new Q(i,this),s=e.u(this.options);e.p(t),this.T(s),this._$AH=e}}_$AC(e){let t=V.get(e.strings);return void 0===t&&V.set(e.strings,t=new J(e)),t}k(e){I(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let s,i=0;for(const a of e)i===t.length?t.push(s=new X(this.O(T()),this.O(T()),this,this.options)):s=t[i],s._$AI(a),i++;i<t.length&&(this._$AR(s&&s._$AB.nextSibling,i),t.length=i)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=k(e).nextSibling;k(e).remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class ee{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,s,i,a){this.type=1,this._$AH=W,this._$AN=void 0,this.element=e,this.name=t,this._$AM=i,this.options=a,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=W}_$AI(e,t=this,s,i){const a=this.strings;let r=!1;if(void 0===a)e=Y(this,e,t,0),r=!N(e)||e!==this._$AH&&e!==F,r&&(this._$AH=e);else{const i=e;let n,o;for(e=a[0],n=0;n<a.length-1;n++)o=Y(this,i[s+n],t,n),o===F&&(o=this._$AH[n]),r||=!N(o)||o!==this._$AH[n],o===W?e=W:e!==W&&(e+=(o??"")+a[n+1]),this._$AH[n]=o}r&&!i&&this.j(e)}j(e){e===W?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class te extends ee{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===W?void 0:e}}class se extends ee{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==W)}}class ie extends ee{constructor(e,t,s,i,a){super(e,t,s,i,a),this.type=5}_$AI(e,t=this){if((e=Y(this,e,t,0)??W)===F)return;const s=this._$AH,i=e===W&&s!==W||e.capture!==s.capture||e.once!==s.once||e.passive!==s.passive,a=e!==W&&(s===W||i);i&&this.element.removeEventListener(this.name,this,s),a&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class ae{constructor(e,t,s){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(e){Y(this,e)}}const re=x.litHtmlPolyfillSupport;re?.(J,X),(x.litHtmlVersions??=[]).push("3.3.3");const ne=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class oe extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,s)=>{const i=s?.renderBefore??t;let a=i._$litPart$;if(void 0===a){const e=s?.renderBefore??null;i._$litPart$=a=new X(t.insertBefore(T(),e),e,void 0,s??{})}return a._$AI(e),a})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return F}}oe._$litElement$=!0,oe.finalized=!0,ne.litElementHydrateSupport?.({LitElement:oe});const ce=ne.litElementPolyfillSupport;ce?.({LitElement:oe}),(ne.litElementVersions??=[]).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const de=e=>(t,s)=>{void 0!==s?s.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)},le={attribute:!0,type:String,converter:_,reflect:!1,hasChanged:y},he=(e=le,t,s)=>{const{kind:i,metadata:a}=s;let r=globalThis.litPropertyMetadata.get(a);if(void 0===r&&globalThis.litPropertyMetadata.set(a,r=new Map),"setter"===i&&((e=Object.create(e)).wrapped=!0),r.set(s.name,e),"accessor"===i){const{name:i}=s;return{set(s){const a=t.get.call(this);t.set.call(this,s),this.requestUpdate(i,a,e,!0,s)},init(t){return void 0!==t&&this.C(i,void 0,e,t),t}}}if("setter"===i){const{name:i}=s;return function(s){const a=this[i];t.call(this,s),this.requestUpdate(i,a,e,!0,s)}}throw Error("Unsupported decorator location: "+i)};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function ue(e){return(t,s)=>"object"==typeof s?he(e,t,s):((e,t,s)=>{const i=t.hasOwnProperty(s);return t.constructor.createProperty(s,e),i?Object.getOwnPropertyDescriptor(t,s):void 0})(e,t,s)}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function ve(e){return ue({...e,state:!0,attribute:!1})}const ge="librus_synergia";class pe extends Error{constructor(e,t){super(e),this.code=e,this.deviceId=t}}function me(e){const t=new Set;for(const s of Object.values(e.entities??{}))s.platform===ge&&s.device_id&&t.add(s.device_id);return[...t]}function be(e,t){const s=me(e);if(t){if(!s.includes(t))throw new pe("device_missing",t);return t}if(1===s.length)return s[0];if(0===s.length)throw new pe("no_device");throw new pe("multiple_devices")}function fe(e,t){const s={};for(const i of Object.values(e.entities??{}))i.device_id===t&&i.platform===ge&&i.translation_key&&(s[i.translation_key]=i.entity_id);return s}function _e(e,t,s){const i=[];for(const a of Object.values(e.entities??{}))if(a.device_id===t&&a.platform===ge&&a.translation_key===s){const t=e.states[a.entity_id],s=t?.attributes;i.push({entityId:a.entity_id,subject:s?.subject||a.entity_id,subjectId:s?.subject_id})}return i.sort((e,t)=>e.subject.localeCompare(t.subject))}let ye=class extends oe{setConfig(e){this._config=e}render(){if(!this.hass||!this._config)return W;const e=me(this.hass);return e.length<2?W:q`
      <ha-select
        label="Uczeń / Student"
        .value=${this._config.device_id??""}
        @selected=${this._onSelected}
        @closed=${e=>e.stopPropagation()}
      >
        ${e.map(e=>{const t=this.hass.devices?.[e];return q`<ha-list-item .value=${e}>${t?.name_by_user||t?.name||e}</ha-list-item>`})}
      </ha-select>
    `}_onSelected(e){const t=me(this.hass)[e.detail.index];if(!t||!this._config)return;const s={...this._config,device_id:t};this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:s},bubbles:!0,composed:!0}))}};e([ue({attribute:!1})],ye.prototype,"hass",void 0),e([ve()],ye.prototype,"_config",void 0),ye=e([de("librus-device-editor")],ye);let $e=class extends oe{setConfig(e){this._config=e}render(){if(!this.hass||!this._config)return W;const e=me(this.hass);let t;try{t=be(this.hass,this._config.device_id)}catch{t=void 0}const s=t?_e(this.hass,t,"subject_average"):[];return q`
      <div class="editor">
        ${e.length>1?q`
              <ha-select
                label="Uczeń / Student"
                .value=${this._config.device_id??""}
                @selected=${this._onDeviceSelected}
                @closed=${e=>e.stopPropagation()}
              >
                ${e.map(e=>{const t=this.hass.devices?.[e];return q`<ha-list-item .value=${e}>${t?.name_by_user||t?.name||e}</ha-list-item>`})}
              </ha-select>
            `:W}
        <ha-select
          label="Przedmiot / Subject"
          .value=${void 0!==this._config.subject_id?String(this._config.subject_id):""}
          @selected=${this._onSubjectSelected}
          @closed=${e=>e.stopPropagation()}
        >
          ${s.map(e=>void 0!==e.subjectId?q`<ha-list-item .value=${String(e.subjectId)}>${e.subject}</ha-list-item>`:W)}
        </ha-select>
      </div>
    `}_onDeviceSelected(e){const t=me(this.hass)[e.detail.index];t&&this._config&&this._emit({...this._config,device_id:t})}_onSubjectSelected(e){if(!this._config||!this.hass)return;let t;try{t=be(this.hass,this._config.device_id)}catch{return}const s=_e(this.hass,t,"subject_average"),i=s[e.detail.index]?.subjectId;void 0!==i&&this._emit({...this._config,subject_id:i})}_emit(e){this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e},bubbles:!0,composed:!0}))}};$e.styles=n`
    .editor {
      display: flex;
      flex-direction: column;
      gap: 12px;
      padding: 4px 0;
    }
    ha-select {
      width: 100%;
    }
  `,e([ue({attribute:!1})],$e.prototype,"hass",void 0),e([ve()],$e.prototype,"_config",void 0),$e=e([de("librus-subject-picker-editor")],$e);const we={"error.device_missing":"Device {device} not found","error.multiple_devices":"Multiple students found - set device_id","error.no_device":"No Librus Synergia device found","empty.loading":"Loading…","empty.generic_error":"Something went wrong","card.grades.title":"Grade average","card.grades.subtitle":"All subjects","card.grades.empty":"No grades yet this year","card.grade_log.title":"Grade log","card.grade_log.subtitle":"All subjects","card.latest_grade.title":"Latest grade","card.latest_grade.empty":"No grades yet","card.behaviour_grade.title":"Behaviour grade","card.behaviour_grade.subtitle":"Semester grade","card.behaviour_grade.empty":"No behaviour grade yet","card.descriptive_grades.title":"Descriptive grades","card.descriptive_grades.subtitle":"Non-numeric assessment","card.descriptive_grades.empty":"No descriptive grades yet","card.attendance.title":"Attendance","card.attendance.subtitle":"This school year","stat.absences":"Absences","stat.late":"Late","stat.records":"Records","card.behaviour_notices.title":"Behaviour notices","card.behaviour_notices.empty":"No notices","card.messages.title":"Messages","card.messages.unavailable":"Messages module not enabled","mailbox.inbox":"Inbox","mailbox.notes":"Notes","mailbox.alerts":"Alerts","mailbox.substitutions":"Substitutions","mailbox.absences":"Absences","mailbox.justifications":"Justifications","mailbox.trash":"Trash","card.announcements.title":"Announcements","card.announcements.empty":"No announcements","card.homework_assignments.title":"Homework assignments","card.homework_assignments.empty":"No homework assignments","label.due":"Due","card.today_lessons.title":"Today's lessons","card.today_lessons.subtitle":"Timetable","card.today_lessons.empty":"No lessons today","label.now":"now","card.next_lesson.title":"Next lesson","card.next_lesson.empty":"No more lessons today","label.in_minutes":"in {minutes} min","card.agenda.title":"Agenda","card.agenda.subtitle":"Upcoming","card.agenda.empty":"Nothing scheduled","card.free_days.title":"Free days","card.free_days.empty":"No upcoming free days","label.days_until":"days until","card.week_timetable.title":"Week timetable","card.week_timetable.subtitle":"This week","card.school.title":"School","label.head_teacher":"Head teacher","label.tutor":"Homeroom teacher","label.semester_ends":"Semester ends","label.year_ends":"Year ends","card.today.title":"Today","stat.lucky_number":"Lucky number","stat.unread_messages":"Unread","stat.new_announcements":"New","card.week_summary.title":"Week in review","stat.new_grades":"New grades","card.lucky_number.title":"Lucky number","card.lucky_number.subtitle":"Today in the register","card.student.title":"Student card","stat.overall_rating":"overall","stat.attendance_score":"Attendance","stat.behaviour_score":"Behaviour","stat.grades_score":"Grades","stat.activity_score":"Activity","card.streak.title":"Absence-free streak","card.streak.subtitle":"Current streak","label.days":"days"},xe={en:we,pl:{"error.device_missing":"Nie znaleziono urządzenia {device}","error.multiple_devices":"Znaleziono kilkoro uczniów - ustaw device_id","error.no_device":"Nie znaleziono urządzenia Librus Synergia","empty.loading":"Wczytywanie…","empty.generic_error":"Coś poszło nie tak","card.grades.title":"Średnia ocen","card.grades.subtitle":"Wszystkie przedmioty","card.grades.empty":"Brak ocen w tym roku szkolnym","card.grade_log.title":"Dziennik ocen","card.grade_log.subtitle":"Wszystkie przedmioty","card.latest_grade.title":"Ostatnia ocena","card.latest_grade.empty":"Brak ocen","card.behaviour_grade.title":"Ocena zachowania","card.behaviour_grade.subtitle":"Ocena semestralna","card.behaviour_grade.empty":"Brak jeszcze oceny zachowania","card.descriptive_grades.title":"Oceny opisowe","card.descriptive_grades.subtitle":"Ocenianie opisowe","card.descriptive_grades.empty":"Brak jeszcze ocen opisowych","card.attendance.title":"Frekwencja","card.attendance.subtitle":"W tym roku szkolnym","stat.absences":"Nieobecności","stat.late":"Spóźnienia","stat.records":"Rekordów","card.behaviour_notices.title":"Uwagi","card.behaviour_notices.empty":"Brak uwag","card.messages.title":"Wiadomości","card.messages.unavailable":"Moduł wiadomości nie jest włączony","mailbox.inbox":"Odebrane","mailbox.notes":"Uwagi","mailbox.alerts":"Alerty","mailbox.substitutions":"Zastępstwa","mailbox.absences":"Nieobecności","mailbox.justifications":"Usprawiedliwienia","mailbox.trash":"Kosz","card.announcements.title":"Ogłoszenia","card.announcements.empty":"Brak ogłoszeń","card.homework_assignments.title":"Zadania domowe","card.homework_assignments.empty":"Brak zadań domowych","label.due":"Termin","card.today_lessons.title":"Dzisiejszy plan lekcji","card.today_lessons.subtitle":"Plan lekcji","card.today_lessons.empty":"Brak lekcji dzisiaj","label.now":"teraz","card.next_lesson.title":"Najbliższa lekcja","card.next_lesson.empty":"Koniec lekcji na dziś","label.in_minutes":"za {minutes} min","card.agenda.title":"Terminarz","card.agenda.subtitle":"Nadchodzące","card.agenda.empty":"Brak zaplanowanych wydarzeń","card.free_days.title":"Dni wolne","card.free_days.empty":"Brak nadchodzących dni wolnych","label.days_until":"dni do","card.week_timetable.title":"Plan tygodniowy","card.week_timetable.subtitle":"Ten tydzień","card.school.title":"Szkoła","label.head_teacher":"Dyrektor","label.tutor":"Wychowawca","label.semester_ends":"Koniec semestru","label.year_ends":"Koniec roku szkolnego","card.today.title":"Dziś","stat.lucky_number":"Numerek","stat.unread_messages":"Nieprzeczytane","stat.new_announcements":"Nowe","card.week_summary.title":"Tydzień w skrócie","stat.new_grades":"Nowe oceny","card.lucky_number.title":"Szczęśliwy numerek","card.lucky_number.subtitle":"Dziś w dzienniku","card.student.title":"Karta ucznia","stat.overall_rating":"ocena ogólna","stat.attendance_score":"Frekwencja","stat.behaviour_score":"Zachowanie","stat.grades_score":"Oceny","stat.activity_score":"Aktywność","card.streak.title":"Seria bez nieobecności","card.streak.subtitle":"Aktualna passa","label.days":"dni"}};function ke(e,t,s){let i=function(e){const t=e?.language??"en",s=t.split("-")[0]?.toLowerCase();return xe[s]??we}(e)[t]??we[t];if(s)for(const[e,t]of Object.entries(s))i=i.replace(`{${e}}`,String(t));return i}class ze extends oe{_syncTheme(){this.classList.toggle("dark",Boolean(this.hass?.themes?.darkMode))}_resolveEntities(){if(!this.hass)return{error:this._message("mdi:alert-circle-outline",ke(this.hass,"empty.loading"))};try{const e=be(this.hass,this._configuredDeviceId);return{deviceId:e,map:fe(this.hass,e)}}catch(e){return{error:this._message("mdi:alert-circle-outline",this._configErrorMessage(e))}}}_configErrorMessage(e){return e instanceof pe?"device_missing"===e.code?ke(this.hass,"error.device_missing",{device:e.deviceId??""}):"multiple_devices"===e.code?ke(this.hass,"error.multiple_devices"):ke(this.hass,"error.no_device"):ke(this.hass,"empty.generic_error")}_message(e,t,s){return q`
      <ha-card class="static">
        <div class="empty">
          <ha-icon .icon=${e}></ha-icon>
          <div class="t1">${t}</div>
          ${s?q`<div class="t2">${s}</div>`:W}
        </div>
      </ha-card>
    `}}e([ue({attribute:!1})],ze.prototype,"hass",void 0);const Ce=n`
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

  .scroll-list {
    display: flex;
    flex-direction: column;
    gap: 9px;
    max-height: 320px;
    overflow-y: auto;
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
`;const Ee=new Set(["unknown","unavailable",""]);let Ae=class extends ze{static getConfigElement(){return document.createElement("librus-device-editor")}static getStubConfig(){return{type:"custom:librus-grades-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 3}render(){if(!this._config||!this.hass)return W;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{deviceId:t,map:s}=e,i=this.hass,a=s.overall_average?i.states[s.overall_average]:void 0,r=_e(i,t,"subject_average").map(e=>({...e,state:i.states[e.entityId]})).filter(e=>e.state&&!Ee.has(e.state.state));if((!a||Ee.has(a.state))&&0===r.length)return this._message("mdi:school-outline",ke(i,"card.grades.empty"));const n=a&&!Ee.has(a.state)?Number(a.state):void 0,o=r.length?Math.max(...r.map(e=>Number(e.state.state))):6;return q`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:school-outline"></ha-icon></div>
          <div class="title-block">
            <div class="title">${ke(i,"card.grades.title")}</div>
            <div class="subtitle">${ke(i,"card.grades.subtitle")}</div>
          </div>
        </div>

        ${void 0!==n?q`
              <div class="ring-row">
                ${function(e,t,s=64,i=6){const a=Math.max(0,Math.min(100,e)),r=(s-i)/2,n=2*Math.PI*r,o=s/2;return q`
    <svg width=${s} height=${s} viewBox="0 0 ${s} ${s}" class="ring">
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
        stroke-dashoffset=${n-a/100*n}
        transform="rotate(-90 ${o} ${o})"
      ></circle>
    </svg>
  `}(n/6*100,"var(--lc-brand)",68,7)}
                <div>
                  <div class="ring-num">${n.toLocaleString(i.language,{maximumFractionDigits:2})}</div>
                  <div class="ring-label">${ke(i,"card.grades.subtitle")}</div>
                </div>
              </div>
            `:W}
        ${r.length?q`
              <div class="sub-list">
                ${r.map(e=>{const t=Number(e.state.state);return q`
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
            `:W}
      </ha-card>
    `}};function je(e){const t=new Date(e);return Number.isNaN(t.getTime())?"":t.toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"})}function De(e,t){const s=new Date(`${e.slice(0,10)}T00:00:00`);return Number.isNaN(s.getTime())?e:s.toLocaleDateString(t,{day:"numeric",month:"short"})}function Te(e,t){const s=Date.UTC(e.getFullYear(),e.getMonth(),e.getDate()),i=Date.UTC(t.getFullYear(),t.getMonth(),t.getDate());return Math.round((i-s)/864e5)}function Ne(e,t){return Math.max(0,Math.floor((e.getTime()-t.getTime())/6e4))}Ae.styles=[Ce,Se,n`
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
    `],e([ve()],Ae.prototype,"_config",void 0),Ae=e([de("librus-grades-card")],Ae);let Ie=class extends ze{static getConfigElement(){return document.createElement("librus-device-editor")}static getStubConfig(){return{type:"custom:librus-grade-log-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 4}render(){if(!this._config||!this.hass)return W;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{deviceId:t}=e,s=this.hass,i=[];for(const e of _e(s,t,"subject_average")){const t=s.states[e.entityId]?.attributes.grades??[];for(const s of t)i.push({...s,subject:e.subject})}return i.sort((e,t)=>(t.date??"").localeCompare(e.date??"")),0===i.length?this._message("mdi:notebook-multiple-outline",ke(s,"card.grades.empty")):q`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:notebook-multiple-outline"></ha-icon></div>
          <div class="title-block">
            <div class="title">${ke(s,"card.grade_log.title")}</div>
            <div class="subtitle">${ke(s,"card.grade_log.subtitle")}</div>
          </div>
        </div>
        <div class="scroll-list">
          ${i.slice(0,25).map(e=>q`
              <div class="list-item">
                <div class="grade-chip">${e.value}</div>
                <div class="body">
                  <div class="row1">
                    <span>${e.subject}${e.category?q` · <span class="cat-label">${e.category}</span>`:W}</span>
                    ${e.date?q`<time>${De(e.date,s.language)}</time>`:W}
                  </div>
                  ${e.comments.length?q`<div class="quote">${e.comments.join(" · ")}</div>`:W}
                </div>
              </div>
            `)}
        </div>
      </ha-card>
    `}};Ie.styles=[Ce,Se,n`
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
    `],e([ve()],Ie.prototype,"_config",void 0),Ie=e([de("librus-grade-log-card")],Ie);let Oe=class extends ze{static getConfigElement(){return document.createElement("librus-subject-picker-editor")}static getStubConfig(){return{type:"custom:librus-subject-grades-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 3}render(){if(!this._config||!this.hass)return W;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{deviceId:t}=e,s=this.hass,i=_e(s,t,"subject_average"),a=void 0!==this._config.subject_id?i.find(e=>e.subjectId===this._config.subject_id):i[0];if(!a)return this._message("mdi:notebook-outline",ke(s,"card.grades.empty"));const r=s.states[a.entityId],n=r?.attributes.grades??[];return 0===n.length?this._message("mdi:notebook-outline",ke(s,"card.grades.empty")):q`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:notebook-outline"></ha-icon></div>
          <div class="title-block">
            <div class="title">${a.subject}</div>
            <div class="subtitle">${r.state}</div>
          </div>
        </div>
        <div class="scroll-list">
          ${n.map(e=>q`
              <div class="list-item">
                <div class="grade-chip">${e.value}</div>
                <div class="body">
                  <div class="row1">
                    <span class="cat-label">${e.category??""}</span>
                    ${e.date?q`<time>${De(e.date,s.language)}</time>`:W}
                  </div>
                  ${e.comments.length?q`<div class="quote">${e.comments.join(" · ")}</div>`:W}
                </div>
              </div>
            `)}
        </div>
      </ha-card>
    `}};Oe.styles=[Ce,Se,n`
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
    `],e([ve()],Oe.prototype,"_config",void 0),Oe=e([de("librus-subject-grades-card")],Oe);let Me=class extends ze{static getConfigElement(){return document.createElement("librus-device-editor")}static getStubConfig(){return{type:"custom:librus-latest-grade-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 2}render(){if(!this._config||!this.hass)return W;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{deviceId:t}=e,s=this.hass,i=function(e,t){let s=null;for(const i of _e(e,t,"subject_average")){const t=e.states[i.entityId]?.attributes;t?.latest_grade&&t.latest_grade_date&&(!s||t.latest_grade_date>s.date)&&(s={subject:i.subject,grade:t.latest_grade,date:t.latest_grade_date,comments:t.latest_grade_comments??[]})}return s}(s,t);return i?q`
      <ha-card>
        <div class="header">
          <div class="icon-badge amber"><ha-icon icon="mdi:star-outline"></ha-icon></div>
          <div class="title-block">
            <div class="title">${ke(s,"card.latest_grade.title")}</div>
            <div class="subtitle">${i.subject} &middot; ${De(i.date,s.language)}</div>
          </div>
          <div class="grade-badge">${i.grade}</div>
        </div>
        ${i.comments.length?q`
              <hr />
              ${i.comments.map(e=>q`<div class="quote">${e}</div>`)}
            `:W}
      </ha-card>
    `:this._message("mdi:star-outline",ke(s,"card.latest_grade.empty"))}};Me.styles=[Ce,Se,n`
      .grade-badge {
        font-size: 1.5rem;
        font-weight: 800;
        color: var(--lc-brand);
        flex: none;
      }
    `],e([ve()],Me.prototype,"_config",void 0),Me=e([de("librus-latest-grade-card")],Me);let Pe=class extends ze{static getConfigElement(){return document.createElement("librus-device-editor")}static getStubConfig(){return{type:"custom:librus-behaviour-grade-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 2}render(){if(!this._config||!this.hass)return W;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{map:t}=e,s=this.hass,i=t.behaviour_grade?s.states[t.behaviour_grade]:void 0,a=(i?.attributes.recent??[])[0];return a?q`
      <ha-card>
        <div class="header">
          <div class="icon-badge good"><ha-icon icon="mdi:medal-outline"></ha-icon></div>
          <div class="title-block">
            <div class="title">${ke(s,"card.behaviour_grade.title")}</div>
            <div class="subtitle">${a.category??ke(s,"card.behaviour_grade.subtitle")}</div>
          </div>
          <div class="grade-badge">${a.short_name}</div>
        </div>
        ${null!==a.value?q`<div class="stats"><div class="stat good"><div class="stat-value">${a.value>0?"+":""}${a.value}</div><div class="stat-label">pkt</div></div></div>`:W}
        ${a.text?q`<div class="quote">${a.text}</div>`:W}
      </ha-card>
    `:this._message("mdi:medal-outline",ke(s,"card.behaviour_grade.empty"))}};Pe.styles=[Ce,Se,n`
      .grade-badge {
        font-size: 1.5rem;
        font-weight: 800;
        color: var(--lc-good);
        flex: none;
      }
    `],e([ve()],Pe.prototype,"_config",void 0),Pe=e([de("librus-behaviour-grade-card")],Pe);let Ue=class extends ze{static getConfigElement(){return document.createElement("librus-device-editor")}static getStubConfig(){return{type:"custom:librus-descriptive-grades-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 2}render(){if(!this._config||!this.hass)return W;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{map:t}=e,s=this.hass,i=t.descriptive_grades?s.states[t.descriptive_grades]:void 0,a=i?.attributes.recent??[];return i&&0!==a.length?q`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:text-box-outline"></ha-icon></div>
          <div class="title-block">
            <div class="title">${ke(s,"card.descriptive_grades.title")}</div>
            <div class="subtitle">${ke(s,"card.descriptive_grades.subtitle")}</div>
          </div>
        </div>
        <div class="scroll-list">
          ${a.map(e=>q`
              <div class="list-item">
                <span class="dot neutral"></span>
                <div class="body">
                  <div class="row1">
                    <span>${e.subject??""}</span>
                    ${e.date?q`<time>${De(e.date,s.language)}</time>`:W}
                  </div>
                  <div class="item-text">${e.value}</div>
                </div>
              </div>
            `)}
        </div>
      </ha-card>
    `:this._message("mdi:text-box-outline",ke(s,"card.descriptive_grades.empty"))}};Ue.styles=[Ce,Se],e([ve()],Ue.prototype,"_config",void 0),Ue=e([de("librus-descriptive-grades-card")],Ue);const Le=/obecno|present/i;let He=class extends ze{static getConfigElement(){return document.createElement("librus-device-editor")}static getStubConfig(){return{type:"custom:librus-attendance-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 2}render(){if(!this._config||!this.hass)return W;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{map:t}=e,s=this.hass,i=t.attendance?s.states[t.attendance]:void 0;if(!i)return this._message("mdi:calendar-remove",ke(s,"empty.generic_error"));const a=i.attributes.breakdown??{},r=i.attributes.total_records??0,n=Number(i.state)||0,o=Object.entries(a),c=o.map(([e,t])=>({flexGrow:Math.max(t,.001),colorVar:Le.test(e)?"var(--lc-good)":"var(--lc-bad)",title:`${e}: ${t}`}));return q`
      <ha-card>
        <div class="header">
          <div class="icon-badge bad"><ha-icon icon="mdi:calendar-remove"></ha-icon></div>
          <div class="title-block">
            <div class="title">${ke(s,"card.attendance.title")}</div>
            <div class="subtitle">${ke(s,"card.attendance.subtitle")}</div>
          </div>
        </div>
        <div class="stats">
          <div class="stat bad">
            <div class="stat-value">${n}</div>
            <div class="stat-label">${ke(s,"stat.absences")}</div>
          </div>
          <div class="stat">
            <div class="stat-value">${r}</div>
            <div class="stat-label">${ke(s,"stat.records")}</div>
          </div>
        </div>
        ${c.length?function(e){return q`
    <div class="bar">
      ${e.map(e=>q`<div
            class="seg"
            style="flex-grow:${e.flexGrow};background:${e.colorVar}"
            title=${e.title??""}
          ></div>`)}
    </div>
  `}(c):W}
        ${o.length?q`
              <div class="legend">
                ${o.map(([e,t])=>q`
                    <span class="legend-item">
                      <span class="legend-dot ${Le.test(e)?"good":"bad"}"></span>${e}
                      <b>${t}</b>
                    </span>
                  `)}
              </div>
            `:W}
      </ha-card>
    `}};He.styles=[Ce,Se,n`
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
    `],e([ve()],He.prototype,"_config",void 0),He=e([de("librus-attendance-card")],He);const Re={positive:"good",negative:"bad",neutral:"neutral"};let Be=class extends ze{static getConfigElement(){return document.createElement("librus-device-editor")}static getStubConfig(){return{type:"custom:librus-behaviour-notices-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 2}render(){if(!this._config||!this.hass)return W;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{map:t}=e,s=this.hass,i=t.behaviour_notices?s.states[t.behaviour_notices]:void 0,a=i?.attributes.recent??[],r=i&&Number(i.state)||0;return i&&0!==a.length?q`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:alert-circle-outline"></ha-icon></div>
          <div class="title-block">
            <div class="title">${ke(s,"card.behaviour_notices.title")}</div>
            <div class="subtitle">${r}</div>
          </div>
        </div>
        <div class="scroll-list">
          ${a.map(e=>q`
              <div class="list-item">
                <span class="dot ${Re[e.sentiment??"neutral"]}"></span>
                <div class="body">
                  <div class="row1">
                    <span class="cat-label">${e.category??""}</span>
                    ${e.date?q`<time>${De(e.date,s.language)}</time>`:W}
                  </div>
                  <div class="item-text">${e.text}</div>
                </div>
              </div>
            `)}
        </div>
      </ha-card>
    `:this._message("mdi:alert-circle-outline",ke(s,"card.behaviour_notices.empty"))}};Be.styles=[Ce,Se],e([ve()],Be.prototype,"_config",void 0),Be=e([de("librus-behaviour-notices-card")],Be);const qe=[{key:"inbox",label:"mailbox.inbox"},{key:"notes",label:"mailbox.notes"},{key:"alerts",label:"mailbox.alerts"},{key:"substitutions",label:"mailbox.substitutions"},{key:"absences",label:"mailbox.absences"},{key:"justifications",label:"mailbox.justifications"},{key:"trash",label:"mailbox.trash"}];let Fe=class extends ze{static getConfigElement(){return document.createElement("librus-device-editor")}static getStubConfig(){return{type:"custom:librus-messages-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 3}render(){if(!this._config||!this.hass)return W;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{map:t}=e,s=this.hass,i=t.unread_messages?s.states[t.unread_messages]:void 0;if(!i||"unavailable"===i.state)return this._message("mdi:email-outline",ke(s,"card.messages.unavailable"));const a=i.attributes.mailbox_breakdown??{},r=i.attributes.recent??[],n=Number(i.state)||0;return q`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:email-outline"></ha-icon></div>
          <div class="title-block">
            <div class="title">${ke(s,"card.messages.title")}</div>
            <div class="subtitle">${ke(s,"mailbox.inbox")}</div>
          </div>
        </div>
        <div class="chips">
          ${qe.map(({key:e,label:t})=>q`
              <span class="chip ${"inbox"===e&&n>0?"hot":""}"
                >${ke(s,t)} <span class="n">${a[e]??0}</span></span
              >
            `)}
        </div>
        ${r.length?q`
              <hr />
              <div class="scroll-list">
                ${r.slice(0,6).map(e=>q`
                    <div class="list-item">
                      <span class="dot ${e.unread?"good":"neutral"}"></span>
                      <div class="body">
                        <div class="row1">
                          <span>${e.sender}</span>
                          ${e.date?q`<time>${De(e.date,s.language)}</time>`:W}
                        </div>
                        <div class="item-text"><b>${e.topic}</b> - ${e.content}</div>
                      </div>
                    </div>
                  `)}
              </div>
            `:W}
      </ha-card>
    `}};Fe.styles=[Ce,Se],e([ve()],Fe.prototype,"_config",void 0),Fe=e([de("librus-messages-card")],Fe);let We=class extends ze{static getConfigElement(){return document.createElement("librus-device-editor")}static getStubConfig(){return{type:"custom:librus-announcements-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 2}render(){if(!this._config||!this.hass)return W;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{map:t}=e,s=this.hass,i=t.unread_announcements?s.states[t.unread_announcements]:void 0,a=i?.attributes.recent??[];return i&&0!==a.length?q`
      <ha-card>
        <div class="header">
          <div class="icon-badge amber"><ha-icon icon="mdi:bullhorn-outline"></ha-icon></div>
          <div class="title-block">
            <div class="title">${ke(s,"card.announcements.title")}</div>
            <div class="subtitle">${i.state}</div>
          </div>
        </div>
        <div class="scroll-list">
          ${a.map(e=>q`
              <div class="list-item">
                <span class="dot neutral"></span>
                <div class="body">
                  <div class="row1">${e.subject}</div>
                  ${e.start_date&&e.end_date?q`<div class="item-text">
                        ${De(e.start_date,s.language)} –
                        ${De(e.end_date,s.language)}
                      </div>`:W}
                </div>
              </div>
            `)}
        </div>
      </ha-card>
    `:this._message("mdi:bullhorn-outline",ke(s,"card.announcements.empty"))}};We.styles=[Ce,Se],e([ve()],We.prototype,"_config",void 0),We=e([de("librus-announcements-card")],We);let Ve=class extends ze{static getConfigElement(){return document.createElement("librus-device-editor")}static getStubConfig(){return{type:"custom:librus-homework-assignments-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 2}render(){if(!this._config||!this.hass)return W;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{map:t}=e,s=this.hass,i=t.homework_assignments?s.states[t.homework_assignments]:void 0,a=i?.attributes.recent??[];return i&&0!==a.length?q`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:notebook-edit-outline"></ha-icon></div>
          <div class="title-block">
            <div class="title">${ke(s,"card.homework_assignments.title")}</div>
            <div class="subtitle">${i.state}</div>
          </div>
        </div>
        <div class="scroll-list">
          ${a.map(e=>q`
              <div class="list-item">
                <span class="dot neutral"></span>
                <div class="body">
                  <div class="row1">
                    <span>${e.topic}</span>
                    ${e.due_date?q`<time>${ke(s,"label.due")} ${De(e.due_date,s.language)}</time>`:W}
                  </div>
                  <div class="item-text">${e.text}${e.teacher?q` - ${e.teacher}`:W}</div>
                </div>
              </div>
            `)}
        </div>
      </ha-card>
    `:this._message("mdi:notebook-edit-outline",ke(s,"card.homework_assignments.empty"))}};function Ke(e){return"string"==typeof e?{value:e,allDay:e.length<=10}:e.date?{value:e.date,allDay:!0}:{value:e.dateTime??"",allDay:!1}}async function Ge(e,t,s,i){const a=`calendars/${t}?start=${encodeURIComponent(s.toISOString())}&end=${encodeURIComponent(i.toISOString())}`,r=await e.callApi("GET",a);return Array.isArray(r)?r.map(e=>{const t=Ke(e.start),s=Ke(e.end);return{start:t.value,end:s.value,allDay:t.allDay,summary:e.summary??"",description:e.description,location:e.location}}):[]}Ve.styles=[Ce,Se],e([ve()],Ve.prototype,"_config",void 0),Ve=e([de("librus-homework-assignments-card")],Ve);let Ze=class extends ze{constructor(){super(...arguments),this._events=[]}static getConfigElement(){return document.createElement("librus-device-editor")}static getStubConfig(){return{type:"custom:librus-today-lessons-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 4}connectedCallback(){super.connectedCallback(),this._refreshTimer=setInterval(()=>{this._fetch(!0)},3e5),this._tickTimer=setInterval(()=>this.requestUpdate(),6e4)}disconnectedCallback(){super.disconnectedCallback(),clearInterval(this._refreshTimer),clearInterval(this._tickTimer)}async _fetch(e=!1){if(!this.hass||!this._config)return;const t=this._resolveEntities();if("error"in t)return;const s=t.map.timetable;if(!s)return;const i=new Date;i.setHours(0,0,0,0);const a=new Date(i);a.setDate(a.getDate()+1);const r=`${s}:${i.toDateString()}`;if(e||this._fetchedFor!==r){this._fetchedFor=r;try{const e=await Ge(this.hass,s,i,a);this._events=e.filter(e=>!e.allDay).sort((e,t)=>e.start.localeCompare(t.start))}catch{this._events=[]}}}render(){if(!this._config||!this.hass)return W;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const t=this.hass;if(this._fetch(),0===this._events.length)return this._message("mdi:calendar-clock",ke(t,"card.today_lessons.empty"));const s=new Date;return q`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:calendar-clock"></ha-icon></div>
          <div class="title-block">
            <div class="title">${ke(t,"card.today_lessons.title")}</div>
            <div class="subtitle">${ke(t,"card.today_lessons.subtitle")}</div>
          </div>
        </div>
        <div class="timeline">
          ${this._events.map(e=>{const i=function(e,t){if(e.allDay)return!1;const s=new Date(e.start).getTime(),i=new Date(e.end).getTime(),a=t.getTime();return a>=s&&a<i}(e,s),a=function(e,t){return(e.allDay?new Date(`${e.end}T23:59:59`):new Date(e.end)).getTime()<t.getTime()}(e,s);return q`
              <div class="tl-item ${i?"now":""} ${a?"done":""}">
                <span class="tl-time">${je(e.start)}</span>
                <span class="tl-dot"></span>
                <div class="tl-body">
                  <div class="subj">
                    ${e.summary} ${i?q`<span class="pill-now">${ke(t,"label.now")}</span>`:W}
                  </div>
                  ${e.location||e.description?q`<div class="meta">${[e.location,e.description].filter(Boolean).join(" · ")}</div>`:W}
                </div>
              </div>
            `})}
        </div>
      </ha-card>
    `}};Ze.styles=[Ce,Se,n`
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
    `],e([ve()],Ze.prototype,"_config",void 0),e([ve()],Ze.prototype,"_events",void 0),Ze=e([de("librus-today-lessons-card")],Ze);let Je=class extends ze{static getConfigElement(){return document.createElement("librus-device-editor")}static getStubConfig(){return{type:"custom:librus-next-lesson-tile-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 1}connectedCallback(){super.connectedCallback(),this._tickTimer=setInterval(()=>this.requestUpdate(),3e4)}disconnectedCallback(){super.disconnectedCallback(),clearInterval(this._tickTimer)}render(){if(!this._config||!this.hass)return W;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{map:t}=e,s=this.hass,i=t.timetable?s.states[t.timetable]:void 0,a=i?.attributes.message,r=i?.attributes.start_time;if(!i||!a||!r)return this._message("mdi:clock-outline",ke(s,"card.next_lesson.empty"));const n=new Date(r.replace(" ","T")),o=new Date,c="on"===i.state,d=Ne(n,o),l=i.attributes.location,h=i.attributes.description;return q`
      <ha-card class="tile">
        <div class="icon-badge ${c?"good":""}"><ha-icon icon="mdi:clock-outline"></ha-icon></div>
        <div class="tile-body">
          <div class="subj">${a}</div>
          <div class="meta">
            ${c?ke(s,"label.now"):`${je(r.replace(" ","T"))} · ${ke(s,"label.in_minutes",{minutes:d})}`}
            ${l?` · ${l}`:""}${h?` · ${h}`:""}
          </div>
        </div>
      </ha-card>
    `}};Je.styles=[Ce,Se,n`
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
    `],e([ve()],Je.prototype,"_config",void 0),Je=e([de("librus-next-lesson-tile-card")],Je);let Ye=class extends ze{constructor(){super(...arguments),this._events=[]}static getConfigElement(){return document.createElement("librus-device-editor")}static getStubConfig(){return{type:"custom:librus-agenda-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 4}connectedCallback(){super.connectedCallback(),this._refreshTimer=setInterval(()=>{this._fetch(!0)},9e5)}disconnectedCallback(){super.disconnectedCallback(),clearInterval(this._refreshTimer)}async _fetch(e=!1){if(!this.hass||!this._config)return;const t=this._resolveEntities();if("error"in t)return;const s=t.map.agenda;if(!s)return;const i=new Date;i.setHours(0,0,0,0);const a=new Date(i);a.setDate(a.getDate()+14);const r=`${s}:${i.toDateString()}`;if(e||this._fetchedFor!==r){this._fetchedFor=r;try{const e=await Ge(this.hass,s,i,a);this._events=e.sort((e,t)=>e.start.localeCompare(t.start))}catch{this._events=[]}}}render(){if(!this._config||!this.hass)return W;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const t=this.hass;if(this._fetch(),0===this._events.length)return this._message("mdi:calendar-text-outline",ke(t,"card.agenda.empty"));const s=new Map;for(const e of this._events){const t=e.start.slice(0,10);s.has(t)||s.set(t,[]),s.get(t).push(e)}return q`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:calendar-text-outline"></ha-icon></div>
          <div class="title-block">
            <div class="title">${ke(t,"card.agenda.title")}</div>
            <div class="subtitle">${ke(t,"card.agenda.subtitle")}</div>
          </div>
        </div>
        <div class="scroll-list">
          ${[...s.entries()].map(([e,s])=>q`
              <div class="day-group">
                <div class="day-label">${De(e,t.language)}</div>
                ${s.map(e=>q`
                    <div class="list-item">
                      <span class="dot neutral"></span>
                      <div class="body">
                        <div class="row1">${e.summary}</div>
                        ${e.description?q`<div class="item-text">${e.description}</div>`:W}
                      </div>
                    </div>
                  `)}
              </div>
            `)}
        </div>
      </ha-card>
    `}};Ye.styles=[Ce,Se,n`
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
    `],e([ve()],Ye.prototype,"_config",void 0),e([ve()],Ye.prototype,"_events",void 0),Ye=e([de("librus-agenda-card")],Ye);let Qe=class extends ze{constructor(){super(...arguments),this._events=[]}static getConfigElement(){return document.createElement("librus-device-editor")}static getStubConfig(){return{type:"custom:librus-free-days-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 2}connectedCallback(){super.connectedCallback(),this._refreshTimer=setInterval(()=>{this._fetch(!0)},36e5)}disconnectedCallback(){super.disconnectedCallback(),clearInterval(this._refreshTimer)}async _fetch(e=!1){if(!this.hass||!this._config)return;const t=this._resolveEntities();if("error"in t)return;const s=t.map.free_days;if(!s)return;const i=new Date;i.setHours(0,0,0,0);const a=new Date(i);a.setDate(a.getDate()+240);const r=`${s}:${i.toDateString()}`;if(e||this._fetchedFor!==r){this._fetchedFor=r;try{const e=await Ge(this.hass,s,i,a);this._events=e.sort((e,t)=>e.start.localeCompare(t.start))}catch{this._events=[]}}}render(){if(!this._config||!this.hass)return W;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const t=this.hass;if(this._fetch(),0===this._events.length)return this._message("mdi:beach",ke(t,"card.free_days.empty"));const s=new Date,[i,...a]=this._events,r=Te(s,new Date(`${i.start}T00:00:00`));return q`
      <ha-card>
        <div class="header">
          <div class="icon-badge amber"><ha-icon icon="mdi:beach"></ha-icon></div>
          <div class="title-block">
            <div class="title">${ke(t,"card.free_days.title")}</div>
            <div class="subtitle">${i.summary}</div>
          </div>
        </div>
        <div class="countdown">
          <span class="big">${r}</span>
          <span class="unit">${ke(t,"label.days_until")}<br /><b>${i.summary}</b></span>
        </div>
        ${a.length?q`
              <hr />
              <div class="chips">
                ${a.slice(0,4).map(e=>q`<span class="chip">${e.summary} <span class="n">${De(e.start,t.language)}</span></span>`)}
              </div>
            `:W}
      </ha-card>
    `}};Qe.styles=[Ce,Se,n`
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
    `],e([ve()],Qe.prototype,"_config",void 0),e([ve()],Qe.prototype,"_events",void 0),Qe=e([de("librus-free-days-card")],Qe);const Xe=[1,2,3,4,5];function et(e){const t=new Date(e).getDay();return 0===t?7:t}let tt=class extends ze{constructor(){super(...arguments),this._events=[]}static getConfigElement(){return document.createElement("librus-device-editor")}static getStubConfig(){return{type:"custom:librus-week-timetable-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 4}connectedCallback(){super.connectedCallback(),this._refreshTimer=setInterval(()=>{this._fetch(!0)},18e5)}disconnectedCallback(){super.disconnectedCallback(),clearInterval(this._refreshTimer)}async _fetch(e=!1){if(!this.hass||!this._config)return;const t=this._resolveEntities();if("error"in t)return;const s=t.map.timetable;if(!s)return;const i=function(e){const t=new Date(e),s=et(e.toISOString());return t.setDate(t.getDate()-(s-1)),t.setHours(0,0,0,0),t}(new Date),a=new Date(i);a.setDate(a.getDate()+5);const r=`${s}:${i.toDateString()}`;if(e||this._fetchedFor!==r){this._fetchedFor=r;try{this._events=await Ge(this.hass,s,i,a)}catch{this._events=[]}}}render(){if(!this._config||!this.hass)return W;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const t=this.hass;if(this._fetch(),0===this._events.length)return this._message("mdi:calendar-week-outline",ke(t,"empty.generic_error"));const s=[[],[],[],[],[]];for(const e of this._events){const t=et(e.start);t>=1&&t<=5&&s[t-1].push(e)}s.forEach(e=>e.sort((e,t)=>e.start.localeCompare(t.start)));const i=Math.max(...s.map(e=>e.length),1),a=Xe.map(e=>new Date(2026,0,e+4).toLocaleDateString(t.language,{weekday:"short"}));return q`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:calendar-week-outline"></ha-icon></div>
          <div class="title-block">
            <div class="title">${ke(t,"card.week_timetable.title")}</div>
            <div class="subtitle">${ke(t,"card.week_timetable.subtitle")}</div>
          </div>
        </div>
        <div class="week-grid" style="grid-template-rows: auto repeat(${i}, 1fr);">
          <span class="h"></span>
          ${a.map(e=>q`<span class="h">${e}</span>`)}
          ${Array.from({length:i},(e,t)=>q`
            <span class="n">${t+1}</span>
            ${s.map(e=>{const s=e[t];return s?q`<div class="cell on" title=${s.summary}>${function(e){const t=e.replace(/\(.*\)/,"").trim();return t.length<=4?t:t.slice(0,3)}(s.summary)}</div>`:q`<div class="cell empty"></div>`})}
          `)}
        </div>
      </ha-card>
    `}};tt.styles=[Ce,Se,n`
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
      .cell.empty {
        background: transparent;
      }
    `],e([ve()],tt.prototype,"_config",void 0),e([ve()],tt.prototype,"_events",void 0),tt=e([de("librus-week-timetable-card")],tt);let st=class extends ze{static getConfigElement(){return document.createElement("librus-device-editor")}static getStubConfig(){return{type:"custom:librus-school-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 2}render(){if(!this._config||!this.hass)return W;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{map:t}=e,s=this.hass,i=t.school?s.states[t.school]:void 0,a=t.school_class?s.states[t.school_class]:void 0;if(!i)return this._message("mdi:school",ke(s,"empty.generic_error"));const r=i.attributes.town,n=i.attributes.street,o=i.attributes.head_teacher,c=a?.attributes.homeroom_teacher,d=a?.attributes.first_semester_end,l=a?.attributes.school_year_end;return q`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:school"></ha-icon></div>
          <div class="title-block">
            <div class="title">${i.state}</div>
            <div class="subtitle">${[r,n].filter(Boolean).join(", ")}</div>
          </div>
        </div>
        <div class="stats">
          ${a?q`<div class="stat"><div class="stat-value">${a.state}</div><div class="stat-label">Klasa</div></div>`:W}
          ${c?q`<div class="stat"><div class="stat-value" style="font-size:0.95rem;">${c}</div><div class="stat-label">${ke(s,"label.tutor")}</div></div>`:W}
        </div>
        ${o?q`<div class="item-text">${ke(s,"label.head_teacher")}: ${o}</div>`:W}
        ${d||l?q`
              <hr />
              <div class="chips">
                ${d?q`<span class="chip">${ke(s,"label.semester_ends")} <span class="n">${De(d,s.language)}</span></span>`:W}
                ${l?q`<span class="chip">${ke(s,"label.year_ends")} <span class="n">${De(l,s.language)}</span></span>`:W}
              </div>
            `:W}
      </ha-card>
    `}};st.styles=[Ce,Se],e([ve()],st.prototype,"_config",void 0),st=e([de("librus-school-card")],st);const it=new Set(["unknown","unavailable",""]);let at=class extends ze{static getConfigElement(){return document.createElement("librus-device-editor")}static getStubConfig(){return{type:"custom:librus-today-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 2}connectedCallback(){super.connectedCallback(),this._tickTimer=setInterval(()=>this.requestUpdate(),6e4)}disconnectedCallback(){super.disconnectedCallback(),clearInterval(this._tickTimer)}render(){if(!this._config||!this.hass)return W;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{map:t}=e,s=this.hass,i=e=>t[e]?s.states[t[e]]:void 0,a=i("lucky_number"),r=i("unread_messages"),n=i("unread_announcements"),o=i("timetable"),c=o?.attributes.message,d=o?.attributes.start_time,l="on"===o?.state;return q`
      <ha-card>
        <div class="header">
          <div class="icon-badge amber"><ha-icon icon="mdi:white-balance-sunny"></ha-icon></div>
          <div class="title-block">
            <div class="title">${ke(s,"card.today.title")}</div>
            <div class="subtitle">${(new Date).toLocaleDateString(s.language,{weekday:"long",day:"numeric",month:"long"})}</div>
          </div>
        </div>
        <div class="stats">
          ${a&&!it.has(a.state)?q`<div class="stat"><div class="stat-value">${a.state}</div><div class="stat-label">${ke(s,"stat.lucky_number")}</div></div>`:W}
          ${r&&!it.has(r.state)?q`<div class="stat"><div class="stat-value">${r.state}</div><div class="stat-label">${ke(s,"stat.unread_messages")}</div></div>`:W}
          ${n&&!it.has(n.state)?q`<div class="stat"><div class="stat-value">${n.state}</div><div class="stat-label">${ke(s,"stat.new_announcements")}</div></div>`:W}
        </div>
        ${c&&d?q`
              <hr />
              <div class="list-item">
                <span class="dot ${l?"good":"neutral"}"></span>
                <div class="body">
                  <div class="row1">${c}</div>
                  ${l?W:q`<div class="item-text">${ke(s,"label.in_minutes",{minutes:Ne(new Date(d.replace(" ","T")),new Date)})}</div>`}
                </div>
              </div>
            `:W}
      </ha-card>
    `}};at.styles=[Ce,Se],e([ve()],at.prototype,"_config",void 0),at=e([de("librus-today-card")],at);const rt=new Set(["unknown","unavailable",""]);let nt=class extends ze{static getConfigElement(){return document.createElement("librus-device-editor")}static getStubConfig(){return{type:"custom:librus-week-summary-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 2}render(){if(!this._config||!this.hass)return W;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{deviceId:t,map:s}=e,i=this.hass,a=s.attendance?i.states[s.attendance]:void 0,r=s.behaviour_notices?i.states[s.behaviour_notices]:void 0,n=s.agenda?i.states[s.agenda]:void 0,o=new Date;o.setDate(o.getDate()-7);const c=o.toISOString().slice(0,10),d=_e(i,t,"subject_average").filter(e=>{const t=i.states[e.entityId]?.attributes.latest_grade_date;return t&&t>=c}).length,l=n?.attributes.message;return q`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:calendar-check-outline"></ha-icon></div>
          <div class="title-block">
            <div class="title">${ke(i,"card.week_summary.title")}</div>
          </div>
        </div>
        <div class="stats">
          <div class="stat">
            <div class="stat-value">${d}</div>
            <div class="stat-label">${ke(i,"stat.new_grades")}</div>
          </div>
          ${a&&!rt.has(a.state)?q`<div class="stat ${Number(a.state)>0?"bad":""}"><div class="stat-value">${a.state}</div><div class="stat-label">${ke(i,"stat.absences")}</div></div>`:W}
          ${r&&!rt.has(r.state)?q`<div class="stat"><div class="stat-value">${r.state}</div><div class="stat-label">${ke(i,"card.behaviour_notices.title")}</div></div>`:W}
        </div>
        ${l?q`
              <hr />
              <div class="list-item">
                <span class="dot neutral"></span>
                <div class="body">
                  <div class="row1">${l}</div>
                  ${n?.attributes.start_time?q`<div class="item-text">${De(String(n.attributes.start_time),i.language)}</div>`:W}
                </div>
              </div>
            `:W}
      </ha-card>
    `}};nt.styles=[Ce,Se],e([ve()],nt.prototype,"_config",void 0),nt=e([de("librus-week-summary-card")],nt);const ot=new Set(["unknown","unavailable",""]);let ct=class extends ze{static getConfigElement(){return document.createElement("librus-device-editor")}static getStubConfig(){return{type:"custom:librus-lucky-number-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 2}render(){if(!this._config||!this.hass)return W;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{map:t}=e,s=this.hass,i=t.lucky_number?s.states[t.lucky_number]:void 0;return!i||ot.has(i.state)?this._message("mdi:dice-5-outline",ke(s,"empty.generic_error")):q`
      <ha-card class="static">
        <div class="header">
          <div class="icon-badge amber"><ha-icon icon="mdi:dice-5-outline"></ha-icon></div>
          <div class="title-block">
            <div class="title">${ke(s,"card.lucky_number.title")}</div>
            <div class="subtitle">${ke(s,"card.lucky_number.subtitle")}</div>
          </div>
        </div>
        <div class="number-wrap">
          <div class="number">${i.state}</div>
        </div>
      </ha-card>
    `}};ct.styles=[Ce,Se,n`
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
    `],e([ve()],ct.prototype,"_config",void 0),ct=e([de("librus-lucky-number-card")],ct);const dt=new Set(["unknown","unavailable",""]);let lt=class extends ze{static getConfigElement(){return document.createElement("librus-device-editor")}static getStubConfig(){return{type:"custom:librus-student-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 3}render(){if(!this._config||!this.hass)return W;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{deviceId:t,map:s}=e,i=this.hass,a=i.devices?.[t]?.name_by_user||i.devices?.[t]?.name||"",r=s.school_class?i.states[s.school_class]?.state:void 0,n=[],o=s.attendance?i.states[s.attendance]:void 0,c=o?.attributes.total_records;if(o&&c){const e=Number(o.state)||0;n.push({key:"attendance",label:ke(i,"stat.attendance_score"),value:Math.round((c-e)/c*100),colorVar:"var(--lc-good)"})}const d=s.behaviour_notices?i.states[s.behaviour_notices]:void 0;d&&!dt.has(d.state)&&n.push({key:"behaviour",label:ke(i,"stat.behaviour_score"),value:Math.max(0,100-10*Number(d.state)),colorVar:"var(--lc-brand)"});const l=s.overall_average?i.states[s.overall_average]:void 0;l&&!dt.has(l.state)&&n.push({key:"grades",label:ke(i,"stat.grades_score"),value:Math.round(Number(l.state)/6*100),colorVar:"var(--lc-amber)"});const h=_e(i,t,"subject_average");if(h.length){const e=h.filter(e=>{const t=i.states[e.entityId]?.attributes.grade_count;return t&&t>0}).length;n.push({key:"activity",label:ke(i,"stat.activity_score"),value:Math.round(e/h.length*100),colorVar:"var(--lc-brand)"})}if(0===n.length)return this._message("mdi:cards-outline",ke(i,"empty.generic_error"));const u=Math.round(n.reduce((e,t)=>e+t.value,0)/n.length);return q`
      <ha-card class="tcard">
        <div class="tcard-inner">
          <div class="tcard-head">
            <div>
              <div class="tcard-name">${a}</div>
              ${r?q`<div class="tcard-class">${r}</div>`:W}
            </div>
            <div class="tcard-rating">
              <div class="v">${u}</div>
              <div class="l">${ke(i,"stat.overall_rating")}</div>
            </div>
          </div>
          <div class="tcard-bars">
            ${n.map(e=>q`
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
    `}};lt.styles=[Ce,Se,n`
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
    `],e([ve()],lt.prototype,"_config",void 0),lt=e([de("librus-student-card")],lt);let ht=class extends ze{static getConfigElement(){return document.createElement("librus-device-editor")}static getStubConfig(){return{type:"custom:librus-streak-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 2}render(){if(!this._config||!this.hass)return W;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{map:t}=e,s=this.hass,i=t.attendance?s.states[t.attendance]:void 0,a=i?.attributes.last_absence_date,r=t.school_class?s.states[t.school_class]?.attributes.school_year_start:void 0;if(!i)return this._message("mdi:fire",ke(s,"empty.generic_error"));const n=a?new Date(`${a}T00:00:00`):r?new Date(`${r}T00:00:00`):void 0,o=n?Math.max(0,Te(n,new Date)):0,c=Math.min(10,Math.ceil(o/3));return q`
      <ha-card class="static">
        <div class="header">
          <div class="icon-badge amber"><ha-icon icon="mdi:fire"></ha-icon></div>
          <div class="title-block">
            <div class="title">${ke(s,"card.streak.title")}</div>
            <div class="subtitle">${ke(s,"card.streak.subtitle")}</div>
          </div>
        </div>
        <div class="streak-num">${o} ${ke(s,"label.days")}</div>
        <div class="flames">
          ${Array.from({length:10},(e,t)=>q`<span class="flame ${t<c?"on":""}"></span>`)}
        </div>
      </ha-card>
    `}};ht.styles=[Ce,Se,n`
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
    `],e([ve()],ht.prototype,"_config",void 0),ht=e([de("librus-streak-card")],ht),window.customCards=window.customCards||[],window.customCards.push({type:"librus-grades-card",name:"Librus - Średnia ocen",description:"Średnia ogólna i średnie z każdego przedmiotu, z paskami porównawczymi.",preview:!0},{type:"librus-grade-log-card",name:"Librus - Dziennik ocen",description:"Wszystkie oceny ze wszystkich przedmiotów w jednej chronologicznej liście.",preview:!0},{type:"librus-subject-grades-card",name:"Librus - Oceny z przedmiotu",description:"Pełna lista ocen z JEDNEGO wybranego przedmiotu (wybór w konfiguracji karty).",preview:!0},{type:"librus-latest-grade-card",name:"Librus - Ostatnia ocena",description:"Najnowsza ocena ze wszystkich przedmiotów, wraz z komentarzem nauczyciela.",preview:!0},{type:"librus-behaviour-grade-card",name:"Librus - Ocena zachowania",description:"Formalna ocena zachowania, odrębna od uwag.",preview:!0},{type:"librus-descriptive-grades-card",name:"Librus - Oceny opisowe",description:"Oceny opisowe (nienumeryczne), jeśli szkoła je stosuje.",preview:!0},{type:"librus-attendance-card",name:"Librus - Frekwencja",description:"Liczba realnych nieobecności i spóźnień, z rozbiciem na typy.",preview:!0},{type:"librus-behaviour-notices-card",name:"Librus - Uwagi",description:"Lista uwag z kategorią i zabarwieniem (pozytywna/negatywna/neutralna).",preview:!0},{type:"librus-messages-card",name:"Librus - Wiadomości",description:"Nieprzeczytane wiadomości ze wszystkich skrzynek i podgląd ostatnich z odebranych.",preview:!0},{type:"librus-announcements-card",name:"Librus - Ogłoszenia",description:"Nieprzeczytane ogłoszenia z tablicy szkolnej.",preview:!0},{type:"librus-homework-assignments-card",name:"Librus - Zadania domowe",description:"Lista realnych zadań domowych z terminami.",preview:!0},{type:"librus-today-lessons-card",name:"Librus - Dzisiejszy plan lekcji",description:"Oś czasu dzisiejszych lekcji z podświetleniem aktualnej.",preview:!0},{type:"librus-next-lesson-tile-card",name:"Librus - Najbliższa lekcja",description:"Kompaktowy kafelek z najbliższą lub trwającą lekcją.",preview:!0},{type:"librus-agenda-card",name:"Librus - Terminarz",description:"Nadchodzące wydarzenia z terminarza, pogrupowane wg dnia.",preview:!0},{type:"librus-free-days-card",name:"Librus - Dni wolne",description:"Odliczanie do najbliższej przerwy i lista kolejnych dni wolnych.",preview:!0},{type:"librus-week-timetable-card",name:"Librus - Plan tygodniowy",description:"Siatka planu lekcji na cały tydzień.",preview:!0},{type:"librus-school-card",name:"Librus - Szkoła i klasa",description:"Nazwa i adres szkoły, klasa, wychowawca, terminy semestru.",preview:!0},{type:"librus-today-card",name:"Librus - Dziś",description:"Szczęśliwy numerek, nieprzeczytane wiadomości/ogłoszenia i najbliższa lekcja w jednym miejscu.",preview:!0},{type:"librus-week-summary-card",name:"Librus - Tydzień w skrócie",description:"Nowe oceny, nieobecności, uwagi i najbliższe wydarzenie w tym tygodniu.",preview:!0},{type:"librus-lucky-number-card",name:"Librus - Szczęśliwy numerek",description:"Dzisiejszy szczęśliwy numerek w dużym formacie.",preview:!0},{type:"librus-student-card",name:"Librus - Karta ucznia",description:"Zabawowa karta w stylu trading-card, licząca ogólną ocenę z frekwencji/zachowania/ocen/aktywności.",preview:!0},{type:"librus-streak-card",name:"Librus - Seria bez nieobecności",description:"Licznik kolejnych dni bez nieobecności.",preview:!0}),console.info("%c LIBRUS-SYNERGIA-CARDS %c 22 cards loaded ","color: #fff; background: #4f46e5; font-weight: 700; border-radius: 3px 0 0 3px; padding: 2px 6px;","color: #4f46e5; background: transparent; font-weight: 500;");
