function e(e,t,i,s){var a,r=arguments.length,n=r<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,s);else for(var o=e.length-1;o>=0;o--)(a=e[o])&&(n=(r<3?a(n):r>3?a(t,i,n):a(t,i))||n);return r>3&&n&&Object.defineProperty(t,i,n),n}"function"==typeof SuppressedError&&SuppressedError;
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=globalThis,i=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),a=new WeakMap;let r=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(i&&void 0===e){const i=void 0!==t&&1===t.length;i&&(e=a.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&a.set(t,e))}return e}toString(){return this.cssText}};const n=(e,...t)=>{const i=1===e.length?e[0]:t.reduce((t,i,s)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[s+1],e[0]);return new r(i,e,s)},o=i?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return(e=>new r("string"==typeof e?e:e+"",void 0,s))(t)})(e):e,{is:c,defineProperty:d,getOwnPropertyDescriptor:l,getOwnPropertyNames:u,getOwnPropertySymbols:h,getPrototypeOf:g}=Object,m=globalThis,p=m.trustedTypes,v=p?p.emptyScript:"",b=m.reactiveElementPolyfillSupport,_=(e,t)=>e,f={toAttribute(e,t){switch(t){case Boolean:e=e?v:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(e){i=null}}return i}},y=(e,t)=>!c(e,t),w={attribute:!0,type:String,converter:f,reflect:!1,useDefault:!1,hasChanged:y};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),m.litPropertyMetadata??=new WeakMap;let x=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=w){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(e,i,t);void 0!==s&&d(this.prototype,e,s)}}static getPropertyDescriptor(e,t,i){const{get:s,set:a}=l(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:s,set(t){const r=s?.call(this);a?.call(this,t),this.requestUpdate(e,r,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??w}static _$Ei(){if(this.hasOwnProperty(_("elementProperties")))return;const e=g(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(_("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(_("properties"))){const e=this.properties,t=[...u(e),...h(e)];for(const i of t)this.createProperty(i,e[i])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,i]of t)this.elementProperties.set(e,i)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const i=this._$Eu(e,t);void 0!==i&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const e of i)t.unshift(o(e))}else void 0!==e&&t.push(o(e));return t}static _$Eu(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((e,s)=>{if(i)e.adoptedStyleSheets=s.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const i of s){const s=document.createElement("style"),a=t.litNonce;void 0!==a&&s.setAttribute("nonce",a),s.textContent=i.cssText,e.appendChild(s)}})(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){const i=this.constructor.elementProperties.get(e),s=this.constructor._$Eu(e,i);if(void 0!==s&&!0===i.reflect){const a=(void 0!==i.converter?.toAttribute?i.converter:f).toAttribute(t,i.type);this._$Em=e,null==a?this.removeAttribute(s):this.setAttribute(s,a),this._$Em=null}}_$AK(e,t){const i=this.constructor,s=i._$Eh.get(e);if(void 0!==s&&this._$Em!==s){const e=i.getPropertyOptions(s),a="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:f;this._$Em=s;const r=a.fromAttribute(t,e.type);this[s]=r??this._$Ej?.get(s)??r,this._$Em=null}}requestUpdate(e,t,i,s=!1,a){if(void 0!==e){const r=this.constructor;if(!1===s&&(a=this[e]),i??=r.getPropertyOptions(e),!((i.hasChanged??y)(a,t)||i.useDefault&&i.reflect&&a===this._$Ej?.get(e)&&!this.hasAttribute(r._$Eu(e,i))))return;this.C(e,t,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:s,wrapped:a},r){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,r??t??this[e]),!0!==a||void 0!==r)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),!0===s&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,i]of e){const{wrapped:e}=i,s=this[t];!0!==e||this._$AL.has(t)||void 0===s||this.C(t,void 0,i,s)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};x.elementStyles=[],x.shadowRootOptions={mode:"open"},x[_("elementProperties")]=new Map,x[_("finalized")]=new Map,b?.({ReactiveElement:x}),(m.reactiveElementVersions??=[]).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const $=globalThis,k=e=>e,z=$.trustedTypes,C=z?z.createPolicy("lit-html",{createHTML:e=>e}):void 0,j="$lit$",S=`lit$${Math.random().toFixed(9).slice(2)}$`,E="?"+S,D=`<${E}>`,I=document,T=()=>I.createComment(""),A=e=>null===e||"object"!=typeof e&&"function"!=typeof e,N=Array.isArray,M="[ \t\n\f\r]",L=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,O=/-->/g,P=/>/g,B=RegExp(`>|${M}(?:([^\\s"'>=/]+)(${M}*=${M}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),U=/'/g,F=/"/g,R=/^(?:script|style|textarea|title)$/i,H=e=>(t,...i)=>({_$litType$:e,strings:t,values:i}),K=H(1),W=H(2),q=Symbol.for("lit-noChange"),V=Symbol.for("lit-nothing"),G=new WeakMap,Z=I.createTreeWalker(I,129);function J(e,t){if(!N(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==C?C.createHTML(t):t}const Y=(e,t)=>{const i=e.length-1,s=[];let a,r=2===t?"<svg>":3===t?"<math>":"",n=L;for(let t=0;t<i;t++){const i=e[t];let o,c,d=-1,l=0;for(;l<i.length&&(n.lastIndex=l,c=n.exec(i),null!==c);)l=n.lastIndex,n===L?"!--"===c[1]?n=O:void 0!==c[1]?n=P:void 0!==c[2]?(R.test(c[2])&&(a=RegExp("</"+c[2],"g")),n=B):void 0!==c[3]&&(n=B):n===B?">"===c[0]?(n=a??L,d=-1):void 0===c[1]?d=-2:(d=n.lastIndex-c[2].length,o=c[1],n=void 0===c[3]?B:'"'===c[3]?F:U):n===F||n===U?n=B:n===O||n===P?n=L:(n=B,a=void 0);const u=n===B&&e[t+1].startsWith("/>")?" ":"";r+=n===L?i+D:d>=0?(s.push(o),i.slice(0,d)+j+i.slice(d)+S+u):i+S+(-2===d?t:u)}return[J(e,r+(e[i]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),s]};class Q{constructor({strings:e,_$litType$:t},i){let s;this.parts=[];let a=0,r=0;const n=e.length-1,o=this.parts,[c,d]=Y(e,t);if(this.el=Q.createElement(c,i),Z.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(s=Z.nextNode())&&o.length<n;){if(1===s.nodeType){if(s.hasAttributes())for(const e of s.getAttributeNames())if(e.endsWith(j)){const t=d[r++],i=s.getAttribute(e).split(S),n=/([.?@])?(.*)/.exec(t);o.push({type:1,index:a,name:n[2],strings:i,ctor:"."===n[1]?se:"?"===n[1]?ae:"@"===n[1]?re:ie}),s.removeAttribute(e)}else e.startsWith(S)&&(o.push({type:6,index:a}),s.removeAttribute(e));if(R.test(s.tagName)){const e=s.textContent.split(S),t=e.length-1;if(t>0){s.textContent=z?z.emptyScript:"";for(let i=0;i<t;i++)s.append(e[i],T()),Z.nextNode(),o.push({type:2,index:++a});s.append(e[t],T())}}}else if(8===s.nodeType)if(s.data===E)o.push({type:2,index:a});else{let e=-1;for(;-1!==(e=s.data.indexOf(S,e+1));)o.push({type:7,index:a}),e+=S.length-1}a++}}static createElement(e,t){const i=I.createElement("template");return i.innerHTML=e,i}}function X(e,t,i=e,s){if(t===q)return t;let a=void 0!==s?i._$Co?.[s]:i._$Cl;const r=A(t)?void 0:t._$litDirective$;return a?.constructor!==r&&(a?._$AO?.(!1),void 0===r?a=void 0:(a=new r(e),a._$AT(e,i,s)),void 0!==s?(i._$Co??=[])[s]=a:i._$Cl=a),void 0!==a&&(t=X(e,a._$AS(e,t.values),a,s)),t}class ee{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:i}=this._$AD,s=(e?.creationScope??I).importNode(t,!0);Z.currentNode=s;let a=Z.nextNode(),r=0,n=0,o=i[0];for(;void 0!==o;){if(r===o.index){let t;2===o.type?t=new te(a,a.nextSibling,this,e):1===o.type?t=new o.ctor(a,o.name,o.strings,this,e):6===o.type&&(t=new ne(a,this,e)),this._$AV.push(t),o=i[++n]}r!==o?.index&&(a=Z.nextNode(),r++)}return Z.currentNode=I,s}p(e){let t=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class te{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,i,s){this.type=2,this._$AH=V,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=X(this,e,t),A(e)?e===V||null==e||""===e?(this._$AH!==V&&this._$AR(),this._$AH=V):e!==this._$AH&&e!==q&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>N(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==V&&A(this._$AH)?this._$AA.nextSibling.data=e:this.T(I.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:i}=e,s="number"==typeof i?this._$AC(e):(void 0===i.el&&(i.el=Q.createElement(J(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(t);else{const e=new ee(s,this),i=e.u(this.options);e.p(t),this.T(i),this._$AH=e}}_$AC(e){let t=G.get(e.strings);return void 0===t&&G.set(e.strings,t=new Q(e)),t}k(e){N(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,s=0;for(const a of e)s===t.length?t.push(i=new te(this.O(T()),this.O(T()),this,this.options)):i=t[s],i._$AI(a),s++;s<t.length&&(this._$AR(i&&i._$AB.nextSibling,s),t.length=s)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=k(e).nextSibling;k(e).remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class ie{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,s,a){this.type=1,this._$AH=V,this._$AN=void 0,this.element=e,this.name=t,this._$AM=s,this.options=a,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=V}_$AI(e,t=this,i,s){const a=this.strings;let r=!1;if(void 0===a)e=X(this,e,t,0),r=!A(e)||e!==this._$AH&&e!==q,r&&(this._$AH=e);else{const s=e;let n,o;for(e=a[0],n=0;n<a.length-1;n++)o=X(this,s[i+n],t,n),o===q&&(o=this._$AH[n]),r||=!A(o)||o!==this._$AH[n],o===V?e=V:e!==V&&(e+=(o??"")+a[n+1]),this._$AH[n]=o}r&&!s&&this.j(e)}j(e){e===V?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class se extends ie{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===V?void 0:e}}class ae extends ie{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==V)}}class re extends ie{constructor(e,t,i,s,a){super(e,t,i,s,a),this.type=5}_$AI(e,t=this){if((e=X(this,e,t,0)??V)===q)return;const i=this._$AH,s=e===V&&i!==V||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,a=e!==V&&(i===V||s);s&&this.element.removeEventListener(this.name,this,i),a&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}let ne=class{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){X(this,e)}};const oe=$.litHtmlPolyfillSupport;oe?.(Q,te),($.litHtmlVersions??=[]).push("3.3.3");const ce=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class de extends x{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,i)=>{const s=i?.renderBefore??t;let a=s._$litPart$;if(void 0===a){const e=i?.renderBefore??null;s._$litPart$=a=new te(t.insertBefore(T(),e),e,void 0,i??{})}return a._$AI(e),a})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return q}}de._$litElement$=!0,de.finalized=!0,ce.litElementHydrateSupport?.({LitElement:de});const le=ce.litElementPolyfillSupport;le?.({LitElement:de}),(ce.litElementVersions??=[]).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ue=e=>(t,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)},he={attribute:!0,type:String,converter:f,reflect:!1,hasChanged:y},ge=(e=he,t,i)=>{const{kind:s,metadata:a}=i;let r=globalThis.litPropertyMetadata.get(a);if(void 0===r&&globalThis.litPropertyMetadata.set(a,r=new Map),"setter"===s&&((e=Object.create(e)).wrapped=!0),r.set(i.name,e),"accessor"===s){const{name:s}=i;return{set(i){const a=t.get.call(this);t.set.call(this,i),this.requestUpdate(s,a,e,!0,i)},init(t){return void 0!==t&&this.C(s,void 0,e,t),t}}}if("setter"===s){const{name:s}=i;return function(i){const a=this[s];t.call(this,i),this.requestUpdate(s,a,e,!0,i)}}throw Error("Unsupported decorator location: "+s)};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function me(e){return(t,i)=>"object"==typeof i?ge(e,t,i):((e,t,i)=>{const s=t.hasOwnProperty(i);return t.constructor.createProperty(i,e),s?Object.getOwnPropertyDescriptor(t,i):void 0})(e,t,i)}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function pe(e){return me({...e,state:!0,attribute:!1})}const ve="librus_synergia";class be extends Error{constructor(e,t){super(e),this.code=e,this.deviceId=t}}function _e(e){const t=new Set;for(const i of Object.values(e.entities??{}))i.platform===ve&&i.device_id&&t.add(i.device_id);return[...t]}function fe(e,t){const i=_e(e);if(t){if(!i.includes(t))throw new be("device_missing",t);return t}if(1===i.length)return i[0];if(0===i.length)throw new be("no_device");throw new be("multiple_devices")}function ye(e,t){const i={};for(const s of Object.values(e.entities??{}))s.device_id===t&&s.platform===ve&&s.translation_key&&(i[s.translation_key]=s.entity_id);return i}function we(e,t,i){const s=[];for(const a of Object.values(e.entities??{}))if(a.device_id===t&&a.platform===ve&&a.translation_key===i){const t=e.states[a.entity_id],i=t?.attributes;s.push({entityId:a.entity_id,subject:i?.subject||a.entity_id,subjectId:i?.subject_id})}return s.sort((e,t)=>e.subject.localeCompare(t.subject))}let xe=class extends de{setConfig(e){this._config=e}render(){if(!this.hass||!this._config)return V;const e=_e(this.hass);return e.length<2?V:K`
      <ha-select
        label="Uczeń / Student"
        .value=${this._config.device_id??""}
        naturalMenuWidth
        fixedMenuPosition
        @selected=${e=>this._onSelected(e)}
        @closed=${e=>{e.stopPropagation(),this._onSelected(e)}}
      >
        ${e.map(e=>{const t=this.hass.devices?.[e];return K`<ha-list-item .value=${e}>${t?.name_by_user||t?.name||e}</ha-list-item>`})}
      </ha-select>
    `}_onSelected(e){const t=e.currentTarget?.value;if(!t||!this._config||t===this._config.device_id)return;const i={...this._config,device_id:t};this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:i},bubbles:!0,composed:!0}))}};e([me({attribute:!1})],xe.prototype,"hass",void 0),e([pe()],xe.prototype,"_config",void 0),xe=e([ue("librus-device-editor")],xe);const $e={"error.device_missing":"Device {device} not found","error.multiple_devices":"Multiple students found - set device_id","error.no_device":"No Librus Synergia device found","empty.loading":"Loading…","empty.generic_error":"Something went wrong","editor.student":"Student","editor.subject":"Subject","editor.subject_auto":"Overall / all subjects","editor.title":"Card title (optional)","editor.max_items":"Max rows shown","editor.days_ahead":"Days ahead","editor.days_back":"Days of history","editor.target":"Target average","editor.mailbox":"Mailbox","editor.show_saturday":"Show Saturday","editor.exam_keywords":"Exam category keywords (comma-separated)","card.grades.title":"Grade average","card.grades.subtitle":"All subjects","card.grades.empty":"No grades yet this year","card.subject_spotlight.title":"Best & weakest subject","card.subject_spotlight.subtitle":"By average","card.subject_spotlight.empty":"Not enough graded subjects to compare yet","card.subject_spotlight.best":"Top subject","card.subject_spotlight.weakest":"Room to grow","card.grade_trend.title":"Grade trend","card.grade_trend.subtitle":"Last {days} days","card.grade_trend.empty":"Not enough history yet","card.grade_distribution.title":"Grade distribution","card.grade_distribution.subtitle":"{count} grades, all subjects","card.grade_distribution.other":"other","card.grades_radar.title":"Grade profile","card.grades_radar.subtitle":"By subject","card.grades_radar.empty":"Not enough subjects with grades yet","label.average":"Average","card.grade_category_distribution.title":"Grades by category","card.grade_category_distribution.subtitle":"Tests, quizzes, answers…","card.grade_category_distribution.empty":"No categorized grades yet","unit.grades":"grades","card.grade_category_distribution.uncategorized":"Uncategorized","card.subject_time.title":"Lesson time split","card.subject_time.subtitle":"Lessons per week, by subject","card.subject_time.empty":"No lessons found for this week","unit.lessons_per_week":"lessons/wk","card.attendance_weekday.title":"Absences by weekday","card.attendance_weekday.subtitle":"This school year","card.attendance_weekday.empty":"No absences or lates recorded","card.recent_activity.title":"What's new","card.recent_activity.subtitle":"Grades, notices, announcements & messages","card.recent_activity.empty":"Nothing new yet","card.grade_log.title":"Grade log","card.grade_log.subtitle":"All subjects","card.latest_grade.title":"Latest grade","card.latest_grade.empty":"No grades yet","card.behaviour_grade.title":"Behaviour grade","card.behaviour_grade.subtitle":"Semester grade","card.behaviour_grade.empty":"No behaviour grade yet","card.descriptive_grades.title":"Descriptive grades","card.descriptive_grades.subtitle":"Non-numeric assessment","card.descriptive_grades.empty":"No descriptive grades yet","card.attendance.title":"Attendance","card.attendance.subtitle":"This school year","card.attendance.by_semester":"By semester","card.attendance_heatmap.title":"Attendance - year map","card.attendance_heatmap.subtitle":"This school year","card.attendance_heatmap.empty":"No attendance data","card.attendance_heatmap.status.good":"Present","card.attendance_heatmap.status.warn":"Excused","card.attendance_heatmap.status.bad":"Unexcused","card.attendance_heatmap.no_data":"No data","card.attendance.semester":"Semester {n}","stat.absences":"Absences","stat.unexcused":"Unexcused","stat.excused":"Excused","stat.late":"Late","stat.records":"Records","stat.percentage":"Attendance","card.behaviour_notices.title":"Behaviour notices","card.behaviour_notices.empty":"No notices","card.messages.title":"Messages","card.messages.unavailable":"Messages module not enabled","card.messages.read_notice":"Opening marks it as read in Librus","card.messages.fetch_failed":"Couldn't load the full message","card.substitutions.title":"Substitutions, alerts & justifications","card.substitutions.subtitle":"Zastępstwa, alerty i usprawiedliwienia","card.substitutions.empty":"No substitutions, alerts, or justifications","mailbox.inbox":"Inbox","mailbox.notes":"Notes","mailbox.alerts":"Alerts","mailbox.substitutions":"Substitutions","mailbox.absences":"Absences","mailbox.justifications":"Justifications","mailbox.trash":"Trash","card.announcements.title":"Announcements","card.announcements.empty":"No announcements","card.homework_assignments.title":"Homework assignments","card.homework_assignments.empty":"No homework assignments","label.due":"Due","card.today_lessons.title":"Today's lessons","card.today_lessons.subtitle":"Timetable","card.today_lessons.empty":"No lessons today","label.now":"now","card.next_lesson.title":"Next lesson","card.next_lesson.empty":"No more lessons today","label.in_minutes":"in {minutes} min","label.in_hours":"in {hours}h","label.in_hours_minutes":"in {hours}h {minutes}m","label.in_days":"in {days}d","label.in_days_hours":"in {days}d {hours}h","card.agenda.title":"Agenda","card.agenda.subtitle":"Upcoming","card.agenda.empty":"Nothing scheduled","card.free_days.title":"Free days","card.free_days.empty":"No upcoming free days","label.days_until":"days until","card.school_year.title":"End of school year","card.school_year.empty":"No school year data","label.days_until_year_end":"days until year end","label.current_semester":"Current semester","label.days_until_semester_end":"days until semester end","label.year_progress":"School year","card.exam_countdown.title":"Next exam","card.exam_countdown.empty":"No upcoming exams","card.week_timetable.title":"Week timetable","card.week_timetable.subtitle":"This week","card.week_timetable.subtitle_upcoming":"Upcoming week","card.week_timetable.break_now":"Break — next lesson in {minutes} min","card.week_timetable.empty":"No lessons found for this week","card.school.title":"School","label.head_teacher":"Head teacher","label.tutor":"Homeroom teacher","label.semester_ends":"Semester ends","label.year_ends":"Year ends","card.today.title":"Today","stat.lucky_number":"Lucky number","card.week_summary.title":"Week in review","stat.new_grades":"New grades","card.lucky_number.title":"Lucky number","card.lucky_number.subtitle":"Today in the register","card.lucky_number.subtitle_for_date":"For {date}","card.student.title":"Student card","stat.overall_rating":"overall","stat.attendance_score":"Attendance","stat.behaviour_score":"Behaviour","stat.grades_score":"Grades","stat.activity_score":"Activity","card.streak.title":"Streaks","card.streak.attendance":"No absences","card.streak.behaviour":"Good behaviour","card.streak.grades":"Good grades","label.days":"days","card.rank.title":"Rank","rank.bronze":"Bronze","rank.silver":"Silver","rank.gold":"Gold","rank.diamond":"Diamond","label.to_next_rank":"to next rank","label.top_rank":"Top rank reached","card.grade_goal.title":"Grade goal","card.grade_goal.subtitle_overall":"Overall average","card.grade_goal.empty":"No grades yet to track a goal against","card.grade_goal.reached":"Goal reached 🎉","label.current":"Now","label.target":"Target","label.to_go":"to go","label.sixes_needed":"≈ {n} more top grades","card.bell_schedule.title":"Today's schedule","card.bell_schedule.empty":"No bell schedule yet — needs ha-librus-synergia with the bell_schedule attribute","label.lesson_short":"L{n}","label.after_school":"School's out for today","card.tomorrow.title":"Tomorrow","card.tomorrow.empty":"Nothing scheduled for the next school day","card.tomorrow.lessons":"lessons","card.tomorrow.starts":"Starts","card.tomorrow.ends":"Ends","card.tomorrow.homework":"Homework due: {n}","card.grade_simulator.subtitle":"What if… (rough estimate)","card.grade_simulator.empty":"Pick a subject that has grades","label.weight":"Weight","card.homework_checklist.title":"Homework checklist","card.homework_checklist.progress":"{done}/{total} done","card.semester_comparison.title":"Semester comparison","card.semester_comparison.subtitle":"Semester 1 vs 2, by subject","card.semester_comparison.empty":"No semester averages yet","card.semester_comparison.s1":"Sem 1","card.semester_comparison.s2":"Sem 2"},ke={en:$e,pl:{"error.device_missing":"Nie znaleziono urządzenia {device}","error.multiple_devices":"Znaleziono kilkoro uczniów - ustaw device_id","error.no_device":"Nie znaleziono urządzenia Librus Synergia","empty.loading":"Wczytywanie…","empty.generic_error":"Coś poszło nie tak","editor.student":"Uczeń","editor.subject":"Przedmiot","editor.subject_auto":"Ogólna / wszystkie przedmioty","editor.title":"Tytuł karty (opcjonalnie)","editor.max_items":"Maks. liczba wierszy","editor.days_ahead":"Dni do przodu","editor.days_back":"Dni historii","editor.target":"Docelowa średnia","editor.mailbox":"Skrzynka","editor.show_saturday":"Pokaż sobotę","editor.exam_keywords":"Słowa-klucze kategorii sprawdzianów (po przecinku)","card.grades.title":"Średnia ocen","card.grades.subtitle":"Wszystkie przedmioty","card.grades.empty":"Brak ocen w tym roku szkolnym","card.subject_spotlight.title":"Najlepszy i najsłabszy przedmiot","card.subject_spotlight.subtitle":"Wg średniej","card.subject_spotlight.empty":"Za mało przedmiotów z ocenami, by porównać","card.subject_spotlight.best":"Najlepszy","card.subject_spotlight.weakest":"Do przećwiczenia","card.grade_trend.title":"Trend średniej","card.grade_trend.subtitle":"Ostatnie {days} dni","card.grade_trend.empty":"Za mało historii","card.grade_distribution.title":"Rozkład ocen","card.grade_distribution.subtitle":"{count} ocen, wszystkie przedmioty","card.grade_distribution.other":"inne","card.grades_radar.title":"Profil ocen","card.grades_radar.subtitle":"Wg przedmiotu","card.grades_radar.empty":"Za mało przedmiotów z ocenami","label.average":"Średnia","card.grade_category_distribution.title":"Oceny wg kategorii","card.grade_category_distribution.subtitle":"Sprawdziany, kartkówki, odpowiedzi…","card.grade_category_distribution.empty":"Brak ocen z przypisaną kategorią","unit.grades":"ocen","card.grade_category_distribution.uncategorized":"Bez kategorii","card.subject_time.title":"Podział czasu lekcji","card.subject_time.subtitle":"Lekcje w tygodniu, wg przedmiotu","card.subject_time.empty":"Brak lekcji w tym tygodniu","unit.lessons_per_week":"lekcji/tydz.","card.attendance_weekday.title":"Nieobecności wg dnia tygodnia","card.attendance_weekday.subtitle":"Ten rok szkolny","card.attendance_weekday.empty":"Brak nieobecności ani spóźnień","card.recent_activity.title":"Co nowego","card.recent_activity.subtitle":"Oceny, uwagi, ogłoszenia i wiadomości","card.recent_activity.empty":"Nic nowego","card.grade_log.title":"Dziennik ocen","card.grade_log.subtitle":"Wszystkie przedmioty","card.latest_grade.title":"Ostatnia ocena","card.latest_grade.empty":"Brak ocen","card.behaviour_grade.title":"Ocena zachowania","card.behaviour_grade.subtitle":"Ocena semestralna","card.behaviour_grade.empty":"Brak jeszcze oceny zachowania","card.descriptive_grades.title":"Oceny opisowe","card.descriptive_grades.subtitle":"Ocenianie opisowe","card.descriptive_grades.empty":"Brak jeszcze ocen opisowych","card.attendance.title":"Frekwencja","card.attendance.subtitle":"W tym roku szkolnym","card.attendance.by_semester":"Wg semestru","card.attendance_heatmap.title":"Frekwencja - mapa roku","card.attendance_heatmap.subtitle":"Ten rok szkolny","card.attendance_heatmap.empty":"Brak danych o frekwencji","card.attendance_heatmap.status.good":"Obecność","card.attendance_heatmap.status.warn":"Usprawiedliwiona","card.attendance_heatmap.status.bad":"Nieusprawiedliwiona","card.attendance_heatmap.no_data":"Brak danych","card.attendance.semester":"Semestr {n}","stat.absences":"Nieobecności","stat.unexcused":"Nieusprawiedliwione","stat.excused":"Usprawiedliwione","stat.late":"Spóźnienia","stat.records":"Rekordów","stat.percentage":"Frekwencja","card.behaviour_notices.title":"Uwagi","card.behaviour_notices.empty":"Brak uwag","card.messages.title":"Wiadomości","card.messages.unavailable":"Moduł wiadomości nie jest włączony","card.messages.read_notice":"Otwarcie oznaczy jako przeczytane w Librusie","card.messages.fetch_failed":"Nie udało się pobrać pełnej treści","card.substitutions.title":"Zastępstwa, alerty i usprawiedliwienia","card.substitutions.subtitle":"Wiadomości specjalne","card.substitutions.empty":"Brak zastępstw, alertów ani usprawiedliwień","mailbox.inbox":"Odebrane","mailbox.notes":"Uwagi","mailbox.alerts":"Alerty","mailbox.substitutions":"Zastępstwa","mailbox.absences":"Nieobecności","mailbox.justifications":"Usprawiedliwienia","mailbox.trash":"Kosz","card.announcements.title":"Ogłoszenia","card.announcements.empty":"Brak ogłoszeń","card.homework_assignments.title":"Zadania domowe","card.homework_assignments.empty":"Brak zadań domowych","label.due":"Termin","card.today_lessons.title":"Dzisiejszy plan lekcji","card.today_lessons.subtitle":"Plan lekcji","card.today_lessons.empty":"Brak lekcji dzisiaj","label.now":"teraz","card.next_lesson.title":"Najbliższa lekcja","card.next_lesson.empty":"Koniec lekcji na dziś","label.in_minutes":"za {minutes} min","label.in_hours":"za {hours} godz.","label.in_hours_minutes":"za {hours} godz. {minutes} min","label.in_days":"za {days} dni","label.in_days_hours":"za {days} dni {hours} godz.","card.agenda.title":"Terminarz","card.agenda.subtitle":"Nadchodzące","card.agenda.empty":"Brak zaplanowanych wydarzeń","card.free_days.title":"Dni wolne","card.free_days.empty":"Brak nadchodzących dni wolnych","label.days_until":"dni do","card.school_year.title":"Koniec roku szkolnego","card.school_year.empty":"Brak danych o roku szkolnym","label.days_until_year_end":"dni do końca roku","label.current_semester":"Aktualny semestr","label.days_until_semester_end":"dni do końca semestru","label.year_progress":"Rok szkolny","card.exam_countdown.title":"Najbliższy sprawdzian","card.exam_countdown.empty":"Brak nadchodzących sprawdzianów","card.week_timetable.title":"Plan tygodniowy","card.week_timetable.subtitle":"Ten tydzień","card.week_timetable.subtitle_upcoming":"Nadchodzący tydzień","card.week_timetable.break_now":"Przerwa — następna lekcja za {minutes} min","card.week_timetable.empty":"Brak lekcji w tym tygodniu","card.school.title":"Szkoła","label.head_teacher":"Dyrektor","label.tutor":"Wychowawca","label.semester_ends":"Koniec semestru","label.year_ends":"Koniec roku szkolnego","card.today.title":"Dziś","stat.lucky_number":"Numerek","card.week_summary.title":"Tydzień w skrócie","stat.new_grades":"Nowe oceny","card.lucky_number.title":"Szczęśliwy numerek","card.lucky_number.subtitle":"Dziś w dzienniku","card.lucky_number.subtitle_for_date":"Na {date}","card.student.title":"Karta ucznia","stat.overall_rating":"ocena ogólna","stat.attendance_score":"Frekwencja","stat.behaviour_score":"Zachowanie","stat.grades_score":"Oceny","stat.activity_score":"Aktywność","card.streak.title":"Passy","card.streak.attendance":"Bez nieobecności","card.streak.behaviour":"Dobre zachowanie","card.streak.grades":"Dobre oceny","label.days":"dni","card.rank.title":"Ranga","rank.bronze":"Brąz","rank.silver":"Srebro","rank.gold":"Złoto","rank.diamond":"Diament","label.to_next_rank":"do kolejnej rangi","label.top_rank":"Osiągnięto najwyższą rangę","card.grade_goal.title":"Cel oceny","card.grade_goal.subtitle_overall":"Średnia ogólna","card.grade_goal.empty":"Brak ocen, na których można oprzeć cel","card.grade_goal.reached":"Cel osiągnięty 🎉","label.current":"Teraz","label.target":"Cel","label.to_go":"do celu","label.sixes_needed":"≈ jeszcze {n}× ocena maksymalna","card.bell_schedule.title":"Plan dnia","card.bell_schedule.empty":"Brak rozkładu dzwonków — wymaga ha-librus-synergia z atrybutem bell_schedule","label.lesson_short":"L{n}","label.after_school":"Lekcje na dziś zakończone","card.tomorrow.title":"Jutro","card.tomorrow.empty":"Nic zaplanowanego na następny dzień nauki","card.tomorrow.lessons":"lekcji","card.tomorrow.starts":"Początek","card.tomorrow.ends":"Koniec","card.tomorrow.homework":"Zadania na termin: {n}","card.grade_simulator.subtitle":"A gdyby… (szacunkowo)","card.grade_simulator.empty":"Wybierz przedmiot, który ma oceny","label.weight":"Waga","card.homework_checklist.title":"Zadania do odhaczenia","card.homework_checklist.progress":"{done}/{total} zrobione","card.semester_comparison.title":"Porównanie semestrów","card.semester_comparison.subtitle":"Semestr 1 vs 2, wg przedmiotu","card.semester_comparison.empty":"Brak średnich semestralnych","card.semester_comparison.s1":"Sem 1","card.semester_comparison.s2":"Sem 2"}};function ze(e,t,i){let s=function(e){const t=e?.language??"en",i=t.split("-")[0]?.toLowerCase();return ke[i]??$e}(e)[t]??$e[t];if(i)for(const[e,t]of Object.entries(i))s=s.replace(`{${e}}`,String(t));return s}function Ce(e,t){const i=Math.max(0,Math.round(t));if(i<60)return ze(e,"label.in_minutes",{minutes:i});if(i<1440){const t=Math.floor(i/60),s=i%60;return 0===s?ze(e,"label.in_hours",{hours:t}):ze(e,"label.in_hours_minutes",{hours:t,minutes:s})}const s=Math.floor(i/1440),a=Math.floor(i%1440/60);return 0===a?ze(e,"label.in_days",{days:s}):ze(e,"label.in_days_hours",{days:s,hours:a})}var je;const Se={kind:"text",key:"title",label:"editor.title"},Ee=e=>({kind:"number",key:"max_items",label:"editor.max_items",min:1,max:e}),De={"custom:librus-grade-log-card":[Se,Ee(100)],"custom:librus-recent-activity-card":[Se,Ee(50)],"custom:librus-homework-checklist-card":[Se,Ee(30)],"custom:librus-announcements-card":[Se,Ee(20)],"custom:librus-agenda-card":[Se,{kind:"number",key:"days_ahead",label:"editor.days_ahead",min:1,max:60}],"custom:librus-messages-card":[Se,{kind:"select",key:"mailbox",label:"editor.mailbox",options:[{value:"inbox",label:"mailbox.inbox"},{value:"substitutions",label:"mailbox.substitutions"},{value:"alerts",label:"mailbox.alerts"},{value:"justifications",label:"mailbox.justifications"}]},Ee(20)],"custom:librus-grade-trend-card":[{kind:"subject"},{kind:"number",key:"days",label:"editor.days_back",min:7,max:180}],"custom:librus-subject-grades-card":[{kind:"subject"}],"custom:librus-grade-goal-card":[{kind:"subject"},{kind:"number",key:"target",label:"editor.target",min:1,max:6,float:!0},Se],"custom:librus-bell-schedule-card":[Se],"custom:librus-tomorrow-card":[Se],"custom:librus-grade-simulator-card":[{kind:"subject"}],"custom:librus-semester-comparison-card":[Se],"custom:librus-week-timetable-card":[{kind:"boolean",key:"show_saturday",label:"editor.show_saturday"}],"custom:librus-subject-time-card":[{kind:"boolean",key:"show_saturday",label:"editor.show_saturday"}],"custom:librus-exam-countdown-card":[Se,{kind:"text",key:"exam_keywords",label:"editor.exam_keywords"}]};function Ie(){return document.createElement("librus-card-editor")}let Te=je=class extends de{setConfig(e){this._config=e}async firstUpdated(){await this.updateComplete,this.renderRoot.querySelectorAll("ha-select").forEach(e=>{const t=e.value;t&&(e.value="",e.value=t)})}get _fields(){return this._config&&De[this._config.type]||[]}render(){if(!this.hass||!this._config)return V;const e=this.hass,t=this._config,i=_e(e),s=this._fields,a=s.some(e=>"subject"===e.kind);let r;try{r=fe(e,t.device_id)}catch{r=void 0}const n=a&&r?we(e,r,"subject_average"):[];return K`
      <div class="form">
        ${i.length>1?K`
              <ha-select
                label=${ze(e,"editor.student")}
                .value=${t.device_id??""}
                naturalMenuWidth
                fixedMenuPosition
                @selected=${e=>this._pickDevice(e)}
                @closed=${e=>{e.stopPropagation(),this._pickDevice(e)}}
              >
                ${i.map(t=>{const i=e.devices?.[t];return K`<ha-list-item .value=${t}>${i?.name_by_user||i?.name||t}</ha-list-item>`})}
              </ha-select>
            `:V}
        ${a?K`
              <ha-select
                label=${ze(e,"editor.subject")}
                .value=${void 0!==t.subject_id?String(t.subject_id):""}
                naturalMenuWidth
                fixedMenuPosition
                @selected=${e=>this._pickSubject(e)}
                @closed=${e=>{e.stopPropagation(),this._pickSubject(e)}}
              >
                <ha-list-item .value=${""}>${ze(e,"editor.subject_auto")}</ha-list-item>
                ${n.map(e=>void 0!==e.subjectId?K`<ha-list-item .value=${String(e.subjectId)}>${e.subject}</ha-list-item>`:V)}
              </ha-select>
            `:V}
        ${s.map(e=>this._renderField(e))}
      </div>
    `}_renderField(e){if("subject"===e.kind)return V;const t=this.hass,i=this._config;return"text"===e.kind?K`
        <ha-textfield
          label=${ze(t,e.label)}
          .value=${i[e.key]??""}
          @change=${t=>this._onText(e.key,t.target.value)}
        ></ha-textfield>
      `:"boolean"===e.kind?K`
        <ha-formfield label=${ze(t,e.label)}>
          <ha-switch
            .checked=${Boolean(i[e.key])}
            @change=${t=>this._patch({[e.key]:t.target.checked||void 0})}
          ></ha-switch>
        </ha-formfield>
      `:"number"===e.kind?K`
        <ha-textfield
          type="number"
          no-spinner
          label=${ze(t,e.label)}
          min=${e.min}
          max=${e.max}
          step=${e.float?"0.05":"1"}
          .value=${void 0!==i[e.key]?String(i[e.key]):""}
          @change=${t=>this._onNumber(e,t.target.value)}
        ></ha-textfield>
      `:K`
      <ha-select
        label=${ze(t,e.label)}
        .value=${i[e.key]??e.options[0].value}
        naturalMenuWidth
        fixedMenuPosition
        @selected=${t=>this._pickSelect(e,t)}
        @closed=${t=>{t.stopPropagation(),this._pickSelect(e,t)}}
      >
        ${e.options.map(e=>K`<ha-list-item .value=${e.value}>${ze(t,e.label)}</ha-list-item>`)}
      </ha-select>
    `}static _selectValue(e){const t=e.currentTarget;return t?.value??""}_pickDevice(e){const t=je._selectValue(e);t&&t!==this._config?.device_id&&this._patch({device_id:t})}_pickSubject(e){const t=je._selectValue(e),i=""===t?void 0:Number(t);i!==this._config?.subject_id&&this._patch({subject_id:Number.isNaN(i)?void 0:i})}_pickSelect(e,t){const i=je._selectValue(t);if(!i)return;i!==(this._config?.[e.key]??e.options[0].value)&&this._patch({[e.key]:i===e.options[0].value?void 0:i})}_onText(e,t){this._patch({[e]:t.trim()||void 0})}_onNumber(e,t){const i=e.float?Number.parseFloat(t):Number.parseInt(t,10);if(Number.isNaN(i))return void this._patch({[e.key]:void 0});const s=Math.min(e.max,Math.max(e.min,i));this._patch({[e.key]:e.float?Math.round(100*s)/100:s})}_patch(e){if(!this._config)return;const t={...this._config,...e};for(const[i,s]of Object.entries(e))void 0===s&&delete t[i];this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t},bubbles:!0,composed:!0}))}};Te.styles=n`
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
  `,e([me({attribute:!1})],Te.prototype,"hass",void 0),e([pe()],Te.prototype,"_config",void 0),Te=je=e([ue("librus-card-editor")],Te);class Ae extends de{_syncTheme(){this.classList.toggle("dark",Boolean(this.hass?.themes?.darkMode))}_resolveEntities(){if(!this.hass)return{error:this._message("mdi:alert-circle-outline",ze(this.hass,"empty.loading"))};const e=this._resolvedCache;if(e&&e.entities===this.hass.entities&&e.configuredDeviceId===this._configuredDeviceId)return e.result;let t;try{const e=fe(this.hass,this._configuredDeviceId);t={deviceId:e,map:ye(this.hass,e)}}catch(e){t={error:this._message("mdi:alert-circle-outline",this._configErrorMessage(e))}}return this._resolvedCache={entities:this.hass.entities,configuredDeviceId:this._configuredDeviceId,result:t},t}_configErrorMessage(e){return e instanceof be?"device_missing"===e.code?ze(this.hass,"error.device_missing",{device:e.deviceId??""}):"multiple_devices"===e.code?ze(this.hass,"error.multiple_devices"):ze(this.hass,"error.no_device"):ze(this.hass,"empty.generic_error")}_message(e,t,i){return K`
      <ha-card class="static">
        <div class="empty">
          <ha-icon .icon=${e}></ha-icon>
          <div class="t1">${t}</div>
          ${i?K`<div class="t2">${i}</div>`:V}
        </div>
      </ha-card>
    `}}e([me({attribute:!1})],Ae.prototype,"hass",void 0);const Ne=n`
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
`,Me=n`
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
`;function Le(e){const t=Math.max(1,...e.map(e=>e.value));return K`
    <div class="hbar-chart">
      ${e.map(e=>K`
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
  `}function Oe(e,t,i=64,s=6){const a=Math.max(0,Math.min(100,e)),r=(i-s)/2,n=2*Math.PI*r,o=i/2;return K`
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
  `}const Pe=new Set(["unknown","unavailable",""]);let Be=class extends Ae{static getConfigElement(){return document.createElement("librus-device-editor")}static getStubConfig(){return{type:"custom:librus-grades-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 3}render(){if(!this._config||!this.hass)return V;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{deviceId:t,map:i}=e,s=this.hass,a=i.overall_average?s.states[i.overall_average]:void 0,r=we(s,t,"subject_average").map(e=>({...e,state:s.states[e.entityId]})).filter(e=>e.state&&!Pe.has(e.state.state));if((!a||Pe.has(a.state))&&0===r.length)return this._message("mdi:school-outline",ze(s,"card.grades.empty"));const n=a&&!Pe.has(a.state)?Number(a.state):void 0,o=r.length?Math.max(...r.map(e=>Number(e.state.state))):6;return K`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:school-outline"></ha-icon></div>
          <div class="title-block">
            <div class="title">${ze(s,"card.grades.title")}</div>
            <div class="subtitle">${ze(s,"card.grades.subtitle")}</div>
          </div>
        </div>

        ${void 0!==n?K`
              <div class="ring-row">
                ${Oe(n/6*100,"var(--lc-brand)",68,7)}
                <div>
                  <div class="ring-num">${n.toLocaleString(s.language,{maximumFractionDigits:2})}</div>
                  <div class="ring-label">${ze(s,"card.grades.subtitle")}</div>
                </div>
              </div>
            `:V}
        ${r.length?K`
              <div class="sub-list">
                ${r.map(e=>{const t=Number(e.state.state);return K`
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
            `:V}
      </ha-card>
    `}};function Ue(e){const t=new Date(e);return Number.isNaN(t.getTime())?"":t.toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"})}function Fe(e,t){const i=new Date(`${e.slice(0,10)}T00:00:00`);return Number.isNaN(i.getTime())?e:i.toLocaleDateString(t,{day:"numeric",month:"short"})}function Re(e,t){const i=Date.UTC(e.getFullYear(),e.getMonth(),e.getDate()),s=Date.UTC(t.getFullYear(),t.getMonth(),t.getDate());return Math.round((s-i)/864e5)}function He(e,t){return Math.max(0,Math.floor((e.getTime()-t.getTime())/6e4))}Be.styles=[Ne,Me,n`
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
    `],e([pe()],Be.prototype,"_config",void 0),Be=e([ue("librus-grades-card")],Be);const Ke=/^\[([^\]]+)\]\s*/;function We(e){const t=Ke.exec(e);return t?{category:t[1],text:e.slice(t[0].length)}:{category:null,text:e}}let qe=class extends Ae{static getConfigElement(){return Ie()}static getStubConfig(){return{type:"custom:librus-grade-log-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 4}render(){if(!this._config||!this.hass)return V;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{deviceId:t}=e,i=this.hass,s=[];for(const e of we(i,t,"subject_average")){const t=i.states[e.entityId]?.attributes.grades??[];for(const i of t)s.push({...i,subject:e.subject})}if(s.sort((e,t)=>(t.date??"").localeCompare(e.date??"")),0===s.length)return this._message("mdi:notebook-multiple",ze(i,"card.grades.empty"));const a=this._config.max_items??25;return K`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:notebook-multiple"></ha-icon></div>
          <div class="title-block">
            <div class="title">${this._config.title??ze(i,"card.grade_log.title")}</div>
            <div class="subtitle">${ze(i,"card.grade_log.subtitle")}</div>
          </div>
        </div>
        <div class="scroll-list">
          ${s.slice(0,a).map(e=>K`
              <div class="list-item">
                <div class="grade-chip">${e.value}</div>
                <div class="body">
                  <div class="row1">
                    <span>${e.subject}${e.category?K` · <span class="cat-label">${e.category}</span>`:V}</span>
                    ${e.date?K`<time>${Fe(e.date,i.language)}</time>`:V}
                  </div>
                  ${e.comments.length?K`<div class="quote">${e.comments.join(" · ")}</div>`:V}
                </div>
              </div>
            `)}
        </div>
      </ha-card>
    `}};qe.styles=[Ne,Me,n`
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
    `],e([pe()],qe.prototype,"_config",void 0),qe=e([ue("librus-grade-log-card")],qe);let Ve=class extends Ae{static getConfigElement(){return Ie()}static getStubConfig(){return{type:"custom:librus-subject-grades-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 3}render(){if(!this._config||!this.hass)return V;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{deviceId:t}=e,i=this.hass,s=we(i,t,"subject_average"),a=void 0!==this._config.subject_id?s.find(e=>e.subjectId===this._config.subject_id):s[0];if(!a)return this._message("mdi:notebook-outline",ze(i,"card.grades.empty"));const r=i.states[a.entityId],n=r?.attributes.grades??[];return 0===n.length?this._message("mdi:notebook-outline",ze(i,"card.grades.empty")):K`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:notebook-outline"></ha-icon></div>
          <div class="title-block">
            <div class="title">${a.subject}</div>
            <div class="subtitle">${r.state}</div>
          </div>
        </div>
        <div class="scroll-list">
          ${n.map(e=>K`
              <div class="list-item">
                <div class="grade-chip">${e.value}</div>
                <div class="body">
                  <div class="row1">
                    <span class="cat-label">${e.category??""}</span>
                    ${e.date?K`<time>${Fe(e.date,i.language)}</time>`:V}
                  </div>
                  ${e.comments.length?K`<div class="quote">${e.comments.join(" · ")}</div>`:V}
                </div>
              </div>
            `)}
        </div>
      </ha-card>
    `}};Ve.styles=[Ne,Me,n`
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
    `],e([pe()],Ve.prototype,"_config",void 0),Ve=e([ue("librus-subject-grades-card")],Ve);let Ge=class extends Ae{constructor(){super(...arguments),this._points=[]}static getConfigElement(){return Ie()}static getStubConfig(){return{type:"custom:librus-grade-trend-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}get _historyDays(){return this._config?.days??60}getCardSize(){return 3}connectedCallback(){super.connectedCallback(),this._refreshTimer=setInterval(()=>{this._fetch(!0)},18e5)}disconnectedCallback(){super.disconnectedCallback(),clearInterval(this._refreshTimer)}_resolveEntityId(){if(!this.hass||!this._config)return;const e=this._resolveEntities();if("error"in e)return;const{deviceId:t,map:i}=e;if(void 0!==this._config.subject_id){const e=we(this.hass,t,"subject_average");return e.find(e=>e.subjectId===this._config.subject_id)?.entityId}return i.overall_average}async _fetch(e=!1){const t=this._resolveEntityId();if(!this.hass||!t)return;const i=new Date,s=new Date(i.getTime()-864e5*this._historyDays),a=`${t}:${i.toDateString()}:${this._historyDays}`;if(e||this._fetchedFor!==a){this._fetchedFor=a;try{this._points=await async function(e,t,i,s){const a=`history/period/${encodeURIComponent(i.toISOString())}?filter_entity_id=${encodeURIComponent(t)}&end_time=${encodeURIComponent(s.toISOString())}`,r=await e.callApi("GET",a),n=r?.[0]??[],o=[];for(const e of n){const t=Number(e.state);if(!Number.isFinite(t))continue;const i=new Date(e.last_changed).getTime();if(Number.isNaN(i))continue;const s=o[o.length-1];s&&s.value===t||o.push({timestamp:i,value:t})}return o}(this.hass,t,s,i)}catch{this._points=[]}}}render(){if(!this._config||!this.hass)return V;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const t=this.hass;this._fetch();const i=this._resolveEntityId(),s=void 0!==this._config.subject_id?we(t,e.deviceId,"subject_average").find(e=>e.subjectId===this._config.subject_id)?.subject:void 0;if(!i||this._points.length<2)return this._message("mdi:chart-line",ze(t,"card.grade_trend.empty"));const a=this._points[0],r=this._points[this._points.length-1],n=Math.round(100*(r.value-a.value))/100,o=n>0?"mdi:trending-up":n<0?"mdi:trending-down":"mdi:trending-neutral",c=n>0?"good":n<0?"bad":"";return K`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:chart-line"></ha-icon></div>
          <div class="title-block">
            <div class="title">${this._config.title??s??ze(t,"card.grade_trend.title")}</div>
            <div class="subtitle">${ze(t,"card.grade_trend.subtitle",{days:this._historyDays})}</div>
          </div>
          <div class="trend ${c}">
            <ha-icon icon=${o}></ha-icon>
            <span>${n>0?"+":""}${n}</span>
          </div>
        </div>
        <div class="chart-row">
          <div class="current-value">${r.value.toFixed(2)}</div>
          ${function(e,t={}){const i=t.width??280,s=t.height??72,a=t.colorVar??"var(--lc-brand)";if(e.length<2)return K`<svg width=${i} height=${s} viewBox="0 0 ${i} ${s}" class="line-chart"></svg>`;const r=e.map(e=>e.timestamp),n=e.map(e=>e.value),o=Math.min(...r),c=Math.max(...r),d=t.min??Math.min(...n),l=t.max??Math.max(...n),u=c-o||1,h=l-d||1,g=e=>6+(e-o)/u*(i-12),m=e=>s-6-(e-d)/h*(s-12),p=e.map(e=>`${g(e.timestamp).toFixed(1)},${m(e.value).toFixed(1)}`).join(" "),v=e[0],b=e[e.length-1],_=`${g(v.timestamp).toFixed(1)},${(s-6).toFixed(1)} ${p} ${g(b.timestamp).toFixed(1)},${(s-6).toFixed(1)}`;return K`
    <svg width=${i} height=${s} viewBox="0 0 ${i} ${s}" class="line-chart">
      <polygon points=${_} fill=${a} opacity="0.12"></polygon>
      <polyline
        points=${p}
        fill="none"
        stroke=${a}
        stroke-width="2"
        stroke-linejoin="round"
        stroke-linecap="round"
      ></polyline>
      <circle cx=${g(b.timestamp)} cy=${m(b.value)} r="3" fill=${a}></circle>
    </svg>
  `}(this._points,{colorVar:"var(--lc-brand)"})}
        </div>
      </ha-card>
    `}};var Ze,Je;Ge.styles=[Ne,Me,n`
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
    `],e([pe()],Ge.prototype,"_config",void 0),e([pe()],Ge.prototype,"_points",void 0),Ge=e([ue("librus-grade-trend-card")],Ge),function(e){e.language="language",e.system="system",e.comma_decimal="comma_decimal",e.decimal_comma="decimal_comma",e.space_comma="space_comma",e.none="none"}(Ze||(Ze={})),function(e){e.language="language",e.system="system",e.am_pm="12",e.twenty_four="24"}(Je||(Je={}));var Ye=["closed","locked","off"],Qe=function(e,t,i,s){s=s||{},i=null==i?{}:i;var a=new Event(t,{bubbles:void 0===s.bubbles||s.bubbles,cancelable:Boolean(s.cancelable),composed:void 0===s.composed||s.composed});return a.detail=i,e.dispatchEvent(a),a},Xe=function(e){Qe(window,"haptic",e)},et=function(e,t,i,s){if(s||(s={action:"more-info"}),!s.confirmation||s.confirmation.exemptions&&s.confirmation.exemptions.some(function(e){return e.user===t.user.id})||(Xe("warning"),confirm(s.confirmation.text||"Are you sure you want to "+s.action+"?")))switch(s.action){case"more-info":(i.entity||i.camera_image)&&Qe(e,"hass-more-info",{entityId:i.entity?i.entity:i.camera_image});break;case"navigate":s.navigation_path&&function(e,t,i){void 0===i&&(i=!1),i?history.replaceState(null,"",t):history.pushState(null,"",t),Qe(window,"location-changed",{replace:i})}(0,s.navigation_path);break;case"url":s.url_path&&window.open(s.url_path);break;case"toggle":i.entity&&(function(e,t){(function(e,t,i){void 0===i&&(i=!0);var s,a=function(e){return e.substr(0,e.indexOf("."))}(t),r="group"===a?"homeassistant":a;switch(a){case"lock":s=i?"unlock":"lock";break;case"cover":s=i?"open_cover":"close_cover";break;default:s=i?"turn_on":"turn_off"}e.callService(r,s,{entity_id:t})})(e,t,Ye.includes(e.states[t].state))}(t,i.entity),Xe("success"));break;case"call-service":if(!s.service)return void Xe("failure");var a=s.service.split(".",2);t.callService(a[0],a[1],s.service_data,s.target),Xe("success");break;case"fire-dom-event":Qe(e,"ll-custom",s)}};function tt(e){return void 0!==e&&"none"!==e.action}function it(e,t,i){if(t&&tt(t))return s=>{e.hass&&(s.stopPropagation(),function(e,t,i){var s;i.tap_action&&(s=i.tap_action),et(e,t,i,s)}(e,e.hass,{tap_action:t,entity:i}))}}function st(e){return tt(e)}let at=class extends Ae{static getConfigElement(){return Ie()}static getStubConfig(){return{type:"custom:librus-grade-goal-card",target:4.5}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 2}render(){if(!this._config||!this.hass)return V;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{deviceId:t,map:i}=e,s=this.hass,a=we(s,t,"subject_average"),r=void 0!==this._config.subject_id?a.find(e=>e.subjectId===this._config.subject_id):void 0,n=r?r.entityId:i.overall_average,o=n?s.states[n]:void 0,c=Number(o?.state);if(!o||Number.isNaN(c))return this._message("mdi:target",ze(s,"card.grade_goal.empty"));const d=this._config.target??4.5,l=r?Number(o.attributes.grade_count)||0:a.reduce((e,t)=>e+(s.states[t.entityId]?.attributes.grades?.length??0),0),u=c>=d,h=d<=1?u?100:0:Math.max(0,Math.min(100,(c-1)/(d-1)*100)),g=!u&&d<6&&l>0?Math.ceil(l*(d-c)/(6-d)):null;return K`
      <ha-card @click=${it(this,this._config.tap_action,n)}>
        <div class="header">
          <div class="icon-badge ${u?"good":""}">
            <ha-icon icon=${u?"mdi:flag-checkered":"mdi:target"}></ha-icon>
          </div>
          <div class="title-block">
            <div class="title">${this._config.title??r?.subject??ze(s,"card.grade_goal.title")}</div>
            <div class="subtitle">
              ${ze(s,r?"card.grade_goal.title":"card.grade_goal.subtitle_overall")}
            </div>
          </div>
        </div>
        <div class="ring-row">
          ${Oe(Math.round(h),u?"var(--lc-good)":"var(--lc-brand)",68,7)}
          <div>
            <div class="ring-num">${c.toFixed(2)}</div>
            <div class="ring-label">${ze(s,"label.current")}</div>
          </div>
        </div>
        <hr />
        <div class="stats">
          <div class="stat">
            <div class="stat-value">${d.toFixed(2)}</div>
            <div class="stat-label">${ze(s,"label.target")}</div>
          </div>
          <div class="stat ${u?"good":""}">
            <div class="stat-value">
              ${u?ze(s,"card.grade_goal.reached"):null!==g?ze(s,"label.sixes_needed",{n:g}):"—"}
            </div>
            <div class="stat-label">${u||null===g?"":ze(s,"label.to_go")}</div>
          </div>
        </div>
      </ha-card>
    `}};at.styles=[Ne,Me,n`
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
    `],e([pe()],at.prototype,"_config",void 0),at=e([ue("librus-grade-goal-card")],at);const rt=[1,2,3,4,5,6];let nt=class extends Ae{constructor(){super(...arguments),this._grade=5,this._weight=1}static getConfigElement(){return Ie()}static getStubConfig(){return{type:"custom:librus-grade-simulator-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 2}render(){if(!this._config||!this.hass)return V;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{deviceId:t}=e,i=this.hass,s=we(i,t,"subject_average"),a=void 0!==this._config.subject_id?s.find(e=>e.subjectId===this._config.subject_id):s[0],r=a?i.states[a.entityId]:void 0,n=Number(r?.state),o=Number(r?.attributes.grade_count)||0;if(!a||Number.isNaN(n))return this._message("mdi:calculator-variant-outline",ze(i,"card.grade_simulator.empty"));const c=(n*o+this._grade*this._weight)/(o+this._weight),d=Math.round(100*(c-n))/100,l=d>0?"good":d<0?"bad":"";return K`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:calculator-variant-outline"></ha-icon></div>
          <div class="title-block">
            <div class="title">${a.subject}</div>
            <div class="subtitle">${ze(i,"card.grade_simulator.subtitle")}</div>
          </div>
        </div>
        <div class="projection">
          <span class="from">${n.toFixed(2)}</span>
          <ha-icon icon="mdi:arrow-right-thin"></ha-icon>
          <span class="to ${l}">${c.toFixed(2)}</span>
          ${0!==d?K`<span class="delta ${l}">${d>0?"+":""}${d}</span>`:V}
        </div>
        <div class="grade-row">
          ${rt.map(e=>K`
              <button
                class="gbtn ${e===this._grade?"active":""}"
                @click=${()=>{this._grade=e}}
              >
                ${e}
              </button>
            `)}
        </div>
        <div class="weight-row">
          <span class="wlabel">${ze(i,"label.weight")}</span>
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
    `}};nt.styles=[Ne,Me,n`
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
    `],e([pe()],nt.prototype,"_config",void 0),e([pe()],nt.prototype,"_grade",void 0),e([pe()],nt.prototype,"_weight",void 0),nt=e([ue("librus-grade-simulator-card")],nt);let ot=class extends Ae{static getConfigElement(){return Ie()}static getStubConfig(){return{type:"custom:librus-semester-comparison-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 3}render(){if(!this._config||!this.hass)return V;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{deviceId:t}=e,i=this.hass,s=e=>{const t=Number(e);return Number.isFinite(t)?t:null},a=we(i,t,"subject_average").map(e=>{const t=i.states[e.entityId]?.attributes??{};return{subject:e.subject,s1:s(t.average_semester_1),s2:s(t.average_semester_2)}}).filter(e=>null!==e.s1||null!==e.s2).sort((e,t)=>e.subject.localeCompare(t.subject));return 0===a.length?this._message("mdi:swap-horizontal",ze(i,"card.semester_comparison.empty")):K`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:swap-horizontal"></ha-icon></div>
          <div class="title-block">
            <div class="title">${this._config.title??ze(i,"card.semester_comparison.title")}</div>
            <div class="subtitle">${ze(i,"card.semester_comparison.subtitle")}</div>
          </div>
        </div>
        <div class="rows">
          <div class="row head">
            <span class="subj"></span>
            <span class="val">${ze(i,"card.semester_comparison.s1")}</span>
            <span class="val">${ze(i,"card.semester_comparison.s2")}</span>
            <span class="delta"></span>
          </div>
          ${a.map(e=>{const t=null!==e.s1&&null!==e.s2?Math.round(100*(e.s2-e.s1))/100:null,i=null===t?"":t>0?"good":t<0?"bad":"";return K`
              <div class="row">
                <span class="subj" title=${e.subject}>${e.subject}</span>
                <span class="val">${null!==e.s1?e.s1.toFixed(2):"—"}</span>
                <span class="val strong">${null!==e.s2?e.s2.toFixed(2):"—"}</span>
                <span class="delta ${i}">
                  ${null===t?"":K`<ha-icon
                          icon=${t>0?"mdi:menu-up":t<0?"mdi:menu-down":"mdi:minus"}
                        ></ha-icon>${0!==t?Math.abs(t).toFixed(2):""}`}
                </span>
              </div>
            `})}
        </div>
      </ha-card>
    `}};ot.styles=[Ne,Me,n`
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
    `],e([pe()],ot.prototype,"_config",void 0),ot=e([ue("librus-semester-comparison-card")],ot);const ct=["1","2","3","4","5","6"],dt={1:"var(--lc-bad)",2:"var(--lc-bad)",3:"var(--lc-warn)",4:"var(--lc-good)",5:"var(--lc-good)",6:"var(--lc-good)",other:"var(--lc-neutral-dot)"};let lt=class extends Ae{static getConfigElement(){return document.createElement("librus-device-editor")}static getStubConfig(){return{type:"custom:librus-grade-distribution-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 2}render(){if(!this._config||!this.hass)return V;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{deviceId:t}=e,i=this.hass,s={1:0,2:0,3:0,4:0,5:0,6:0,other:0};let a=0;for(const e of we(i,t,"subject_average")){const t=i.states[e.entityId]?.attributes.grades??[];for(const e of t){const t=/^([1-6])/.exec(e.value.trim())?.[1];s[t??"other"]+=1,a+=1}}if(0===a)return this._message("mdi:chart-bar",ze(i,"card.grades.empty"));const r=Math.max(...Object.values(s),1),n=[...ct,"other"];return K`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:chart-bar"></ha-icon></div>
          <div class="title-block">
            <div class="title">${ze(i,"card.grade_distribution.title")}</div>
            <div class="subtitle">${ze(i,"card.grade_distribution.subtitle",{count:a})}</div>
          </div>
        </div>
        <div class="histogram">
          ${n.map(e=>{const t=s[e];return K`
              <div class="col">
                <div class="col-count">${t>0?t:""}</div>
                <div class="col-bar-track">
                  <div
                    class="col-bar"
                    style="height:${t/r*100}%;background:${dt[e]}"
                  ></div>
                </div>
                <div class="col-label">${"other"===e?ze(i,"card.grade_distribution.other"):e}</div>
              </div>
            `})}
        </div>
      </ha-card>
    `}};lt.styles=[Ne,Me,n`
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
    `],e([pe()],lt.prototype,"_config",void 0),lt=e([ue("librus-grade-distribution-card")],lt);let ut=class extends Ae{static getConfigElement(){return document.createElement("librus-device-editor")}static getStubConfig(){return{type:"custom:librus-grades-radar-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 3}render(){if(!this._config||!this.hass)return V;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{deviceId:t}=e,i=this.hass,s=[];for(const e of we(i,t,"subject_average")){const t=i.states[e.entityId]?.state,a=void 0!==t?Number(t):NaN;Number.isFinite(a)&&s.push({label:e.subject,value:a})}if(s.length<3)return this._message("mdi:chart-timeline-variant",ze(i,"card.grades_radar.empty"));const a=s.reduce((e,t)=>e+t.value,0)/s.length;return K`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:chart-timeline-variant"></ha-icon></div>
          <div class="title-block">
            <div class="title">${ze(i,"card.grades_radar.title")}</div>
            <div class="subtitle">${ze(i,"card.grades_radar.subtitle")}</div>
          </div>
        </div>
        <div class="chart-wrap">${function(e,t={}){const i=t.width??220,s=t.height??200,a=t.max??6,r=t.colorVar??"var(--lc-brand)",n=t.ringCount??3,o=i/2,c=s/2-4,d=Math.min(i,s)/2-32,l=e.length;if(l<3)return K`<svg width=${i} height=${s} viewBox="0 0 ${i} ${s}" class="radar-chart"></svg>`;const u=e=>-Math.PI/2+2*e*Math.PI/l,h=(e,t)=>{const i=Math.max(0,Math.min(a,t))/a*d;return[o+i*Math.cos(u(e)),c+i*Math.sin(u(e))]},g=Array.from({length:n},(e,t)=>a*(t+1)/n),m=e.map((e,t)=>h(t,a)),p=e.map((e,t)=>h(t,e.value)),v=p.map(e=>e.join(",")).join(" ");return K`
    <svg width=${i} height=${s} viewBox="0 0 ${i} ${s}" class="radar-chart">
      ${g.map(t=>W`<polygon
            points=${e.map((e,i)=>h(i,t).join(",")).join(" ")}
            class="radar-grid"
          ></polygon>`)}
      ${m.map(([e,t])=>W`<line x1=${o} y1=${c} x2=${e} y2=${t} class="radar-axis"></line>`)}
      <polygon
        points=${v}
        fill=${r}
        fill-opacity="0.22"
        stroke=${r}
        stroke-width="2"
        stroke-linejoin="round"
      ></polygon>
      ${p.map(([e,t])=>W`<circle cx=${e} cy=${t} r="3.2" fill=${r}></circle>`)}
      ${e.map((e,t)=>{const[i,s]=h(t,1.18*a),r=Math.cos(u(t)),n=Math.abs(r)<.3?"middle":r>0?"start":"end";return W`<text x=${i} y=${s+3} text-anchor=${n} class="radar-label">${e.label}</text>`})}
    </svg>
  `}(s,{max:6})}</div>
        <div class="legend">
          <span class="legend-item">
            <span class="dot" style="background:var(--lc-brand)"></span>
            ${ze(i,"label.average")} <b>${a.toFixed(2)}</b>
          </span>
        </div>
      </ha-card>
    `}};ut.styles=[Ne,Me],e([pe()],ut.prototype,"_config",void 0),ut=e([ue("librus-grades-radar-card")],ut);const ht=Array.from({length:16},(e,t)=>`var(--lc-chart-${t+1})`);let gt=class extends Ae{static getConfigElement(){return document.createElement("librus-device-editor")}static getStubConfig(){return{type:"custom:librus-grade-category-distribution-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 3}render(){if(!this._config||!this.hass)return V;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{deviceId:t}=e,i=this.hass,s=new Map;for(const e of we(i,t,"subject_average")){const t=i.states[e.entityId]?.attributes.grades??[];for(const e of t){const t=e.category??"__uncategorized";s.set(t,(s.get(t)??0)+1)}}const a=[...s.values()].reduce((e,t)=>e+t,0);if(0===a)return this._message("mdi:chart-donut",ze(i,"card.grade_category_distribution.empty"));const r=[...s.entries()].sort((e,t)=>t[1]-e[1]).map(([e,t],s)=>({label:"__uncategorized"===e?ze(i,"card.grade_category_distribution.uncategorized"):e,value:t,colorVar:ht[s%ht.length]}));return K`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:chart-bar"></ha-icon></div>
          <div class="title-block">
            <div class="title">${ze(i,"card.grade_category_distribution.title")}</div>
            <div class="subtitle">${ze(i,"card.grade_category_distribution.subtitle")}</div>
          </div>
        </div>
        ${Le(r)}
      </ha-card>
    `}};gt.styles=[Ne,Me],e([pe()],gt.prototype,"_config",void 0),gt=e([ue("librus-grade-category-distribution-card")],gt);let mt=class extends Ae{static getConfigElement(){return document.createElement("librus-device-editor")}static getStubConfig(){return{type:"custom:librus-latest-grade-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 2}render(){if(!this._config||!this.hass)return V;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{deviceId:t}=e,i=this.hass,s=function(e,t){let i=null;for(const s of we(e,t,"subject_average")){const t=e.states[s.entityId]?.attributes;t?.latest_grade&&t.latest_grade_date&&(!i||t.latest_grade_date>i.date)&&(i={subject:s.subject,grade:t.latest_grade,date:t.latest_grade_date,comments:t.latest_grade_comments??[]})}return i}(i,t);return s?K`
      <ha-card>
        <div class="header">
          <div class="icon-badge amber"><ha-icon icon="mdi:star-outline"></ha-icon></div>
          <div class="title-block">
            <div class="title">${ze(i,"card.latest_grade.title")}</div>
            <div class="subtitle">${s.subject} &middot; ${Fe(s.date,i.language)}</div>
          </div>
          <div class="grade-badge">${s.grade}</div>
        </div>
        ${s.comments.length?K`
              <hr />
              ${s.comments.map(e=>K`<div class="quote">${e}</div>`)}
            `:V}
      </ha-card>
    `:this._message("mdi:star-outline",ze(i,"card.latest_grade.empty"))}};mt.styles=[Ne,Me,n`
      .grade-badge {
        font-size: 1.5rem;
        font-weight: 800;
        color: var(--lc-brand);
        flex: none;
      }
    `],e([pe()],mt.prototype,"_config",void 0),mt=e([ue("librus-latest-grade-card")],mt);let pt=class extends Ae{static getConfigElement(){return document.createElement("librus-device-editor")}static getStubConfig(){return{type:"custom:librus-behaviour-grade-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 2}render(){if(!this._config||!this.hass)return V;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{map:t}=e,i=this.hass,s=t.behaviour_grade?i.states[t.behaviour_grade]:void 0,a=(s?.attributes.recent??[])[0];return a?K`
      <ha-card>
        <div class="header">
          <div class="icon-badge good"><ha-icon icon="mdi:medal-outline"></ha-icon></div>
          <div class="title-block">
            <div class="title">${ze(i,"card.behaviour_grade.title")}</div>
            <div class="subtitle">${a.category??ze(i,"card.behaviour_grade.subtitle")}</div>
          </div>
          <div class="grade-badge">${a.short_name}</div>
        </div>
        ${null!==a.value?K`<div class="stats"><div class="stat good"><div class="stat-value">${a.value>0?"+":""}${a.value}</div><div class="stat-label">pkt</div></div></div>`:V}
        ${a.text?K`<div class="quote">${a.text}</div>`:V}
      </ha-card>
    `:this._message("mdi:medal-outline",ze(i,"card.behaviour_grade.empty"))}};pt.styles=[Ne,Me,n`
      .grade-badge {
        font-size: 1.5rem;
        font-weight: 800;
        color: var(--lc-good);
        flex: none;
      }
    `],e([pe()],pt.prototype,"_config",void 0),pt=e([ue("librus-behaviour-grade-card")],pt);let vt=class extends Ae{static getConfigElement(){return document.createElement("librus-device-editor")}static getStubConfig(){return{type:"custom:librus-descriptive-grades-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 2}render(){if(!this._config||!this.hass)return V;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{map:t}=e,i=this.hass,s=t.descriptive_grades?i.states[t.descriptive_grades]:void 0,a=s?.attributes.recent??[];return s&&0!==a.length?K`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:text-box-outline"></ha-icon></div>
          <div class="title-block">
            <div class="title">${ze(i,"card.descriptive_grades.title")}</div>
            <div class="subtitle">${ze(i,"card.descriptive_grades.subtitle")}</div>
          </div>
        </div>
        <div class="scroll-list">
          ${a.map(e=>K`
              <div class="list-item">
                <span class="dot neutral"></span>
                <div class="body">
                  <div class="row1">
                    <span>${e.subject??""}</span>
                    ${e.date?K`<time>${Fe(e.date,i.language)}</time>`:V}
                  </div>
                  <div class="item-text">${e.value}</div>
                </div>
              </div>
            `)}
        </div>
      </ha-card>
    `:this._message("mdi:text-box-outline",ze(i,"card.descriptive_grades.empty"))}};vt.styles=[Ne,Me],e([pe()],vt.prototype,"_config",void 0),vt=e([ue("librus-descriptive-grades-card")],vt);const bt=new Set(["unknown","unavailable",""]);let _t=class extends Ae{static getConfigElement(){return document.createElement("librus-device-editor")}static getStubConfig(){return{type:"custom:librus-subject-spotlight-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 2}render(){if(!this._config||!this.hass)return V;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{deviceId:t}=e,i=this.hass,s=we(i,t,"subject_average").map(e=>({subject:e.subject,state:i.states[e.entityId]})).filter(e=>e.state&&!bt.has(e.state.state)).map(e=>({subject:e.subject,value:Number(e.state.state)})).filter(e=>!Number.isNaN(e.value));if(s.length<2)return this._message("mdi:podium-gold",ze(i,"card.subject_spotlight.empty"));const a=s.reduce((e,t)=>t.value>e.value?t:e),r=s.reduce((e,t)=>t.value<e.value?t:e),n=e=>e.toLocaleString(i.language,{maximumFractionDigits:2});return K`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:podium-gold"></ha-icon></div>
          <div class="title-block">
            <div class="title">${ze(i,"card.subject_spotlight.title")}</div>
            <div class="subtitle">${ze(i,"card.subject_spotlight.subtitle")}</div>
          </div>
        </div>
        <div class="spotlight-row">
          <div class="spotlight-tile good">
            <ha-icon icon="mdi:trophy-outline"></ha-icon>
            <div class="spotlight-value">${n(a.value)}</div>
            <div class="spotlight-subject">${a.subject}</div>
            <div class="spotlight-label">${ze(i,"card.subject_spotlight.best")}</div>
          </div>
          <div class="spotlight-tile warn">
            <ha-icon icon="mdi:book-open-page-variant-outline"></ha-icon>
            <div class="spotlight-value">${n(r.value)}</div>
            <div class="spotlight-subject">${r.subject}</div>
            <div class="spotlight-label">${ze(i,"card.subject_spotlight.weakest")}</div>
          </div>
        </div>
      </ha-card>
    `}};_t.styles=[Ne,Me,n`
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
    `],e([pe()],_t.prototype,"_config",void 0),_t=e([ue("librus-subject-spotlight-card")],_t);const ft=/^obecno|^present/i,yt=/uspr\.?/i;function wt(e,t){return t?.[e]??ft.test(e)?"good":yt.test(e)?"warn":"bad"}let xt=class extends Ae{static getConfigElement(){return document.createElement("librus-device-editor")}static getStubConfig(){return{type:"custom:librus-attendance-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 2}render(){if(!this._config||!this.hass)return V;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{map:t}=e,i=this.hass,s=t.attendance?i.states[t.attendance]:void 0;if(!s)return this._message("mdi:calendar-remove",ze(i,"empty.generic_error"));const a=s.attributes.breakdown??{},r=s.attributes.presence_by_type,n=s.attributes.total_records??0,o=s.attributes.percentage,c=s.attributes.by_semester??{},d=Object.entries(c).sort(([e],[t])=>Number(e)-Number(t)),l=Number(s.state)||0,u=s.attributes.unexcused_count,h=s.attributes.excused_count,g=void 0!==u,m=Object.entries(a),p={good:"var(--lc-good)",warn:"var(--lc-warn)",bad:"var(--lc-bad)"},v=m.map(([e,t])=>({flexGrow:Math.max(t,.001),colorVar:p[wt(e,r)],title:`${e}: ${t}`}));return K`
      <ha-card>
        <div class="header">
          <div class="icon-badge bad"><ha-icon icon="mdi:calendar-remove"></ha-icon></div>
          <div class="title-block">
            <div class="title">${ze(i,"card.attendance.title")}</div>
            <div class="subtitle">${ze(i,"card.attendance.subtitle")}</div>
          </div>
        </div>
        <div class="stats">
          ${null!=o?K`
                <div class="stat ${o>=90?"good":o<75?"bad":""}">
                  <div class="stat-value">${o}<span class="unit">%</span></div>
                  <div class="stat-label">${ze(i,"stat.percentage")}</div>
                </div>
              `:V}
          ${g?K`
                <div class="stat ${u>0?"bad":""}">
                  <div class="stat-value">${u}</div>
                  <div class="stat-label">${ze(i,"stat.unexcused")}</div>
                </div>
                <div class="stat ${h>0?"warn":""}">
                  <div class="stat-value">${h}</div>
                  <div class="stat-label">${ze(i,"stat.excused")}</div>
                </div>
              `:K`
                <div class="stat bad">
                  <div class="stat-value">${l}</div>
                  <div class="stat-label">${ze(i,"stat.absences")}</div>
                </div>
              `}
          <div class="stat">
            <div class="stat-value">${n}</div>
            <div class="stat-label">${ze(i,"stat.records")}</div>
          </div>
        </div>
        ${v.length?function(e){return K`
    <div class="bar">
      ${e.map(e=>K`<div
            class="seg"
            style="flex-grow:${e.flexGrow};background:${e.colorVar}"
            title=${e.title??""}
          ></div>`)}
    </div>
  `}(v):V}
        ${m.length?K`
              <div class="legend">
                ${m.map(([e,t])=>K`
                    <span class="legend-item">
                      <span class="legend-dot ${wt(e,r)}"></span>${e}
                      <b>${t}</b>
                    </span>
                  `)}
              </div>
            `:V}
        ${d.length>1?K`
              <hr />
              <div class="semester-block">
                <div class="semester-title">${ze(i,"card.attendance.by_semester")}</div>
                ${d.map(([e,t])=>K`
                    <div class="semester-row">
                      <span>${ze(i,"card.attendance.semester",{n:e})}</span>
                      <span class="semester-pct">${null!=t.percentage?`${t.percentage}%`:"–"}</span>
                    </div>
                  `)}
              </div>
            `:V}
      </ha-card>
    `}};xt.styles=[Ne,Me,n`
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
    `],e([pe()],xt.prototype,"_config",void 0),xt=e([ue("librus-attendance-card")],xt);let $t=class extends Ae{static getConfigElement(){return document.createElement("librus-device-editor")}static getStubConfig(){return{type:"custom:librus-attendance-tile-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 1}render(){if(!this._config||!this.hass)return V;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{map:t}=e,i=this.hass,s=t.attendance?i.states[t.attendance]:void 0;if(!s)return this._message("mdi:calendar-remove",ze(i,"empty.generic_error"));const a=s.attributes.percentage,r=s.attributes.unexcused_count??(Number(s.state)||0),n=s.attributes.excused_count;return K`
      <ha-card class="tile" @click=${it(this,this._config.tap_action,t.attendance)}>
        <div class="icon-badge ${0===r?"good":"bad"}">
          <ha-icon icon="mdi:calendar-remove"></ha-icon>
        </div>
        <div class="tile-body">
          <div class="subj">
            ${r} ${ze(i,"stat.absences").toLowerCase()}
          </div>
          ${null!=a||n?K`
                <div class="meta">
                  ${null!=a?K`${ze(i,"stat.percentage")}: ${a}%`:V}
                  ${n?K`${null!=a?" · ":""}${n} ${ze(i,"stat.excused").toLowerCase()}`:V}
                </div>
              `:V}
        </div>
      </ha-card>
    `}};function kt(e){const t=new Date(e);return t.setDate(t.getDate()-(function(e){const t=e.getDay();return 0===t?7:t}(e)-1)),t.setHours(0,0,0,0),t}$t.styles=[Ne,Me,n`
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
    `],e([pe()],$t.prototype,"_config",void 0),$t=e([ue("librus-attendance-tile-card")],$t);const zt=[0,1,2,3,4];let Ct=class extends Ae{static getConfigElement(){return document.createElement("librus-device-editor")}static getStubConfig(){return{type:"custom:librus-attendance-heatmap-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 2}render(){if(!this._config||!this.hass)return V;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{map:t}=e,i=this.hass,s=t.attendance?i.states[t.attendance]:void 0,a=s?.attributes.by_date;if(!s||!a||0===Object.keys(a).length)return this._message("mdi:calendar-blank-outline",ze(i,"card.attendance_heatmap.empty"));const r=t.school_class?i.states[t.school_class]:void 0,n=r?.attributes.school_year_start,o=new Date,c=kt(o),d=n?kt(new Date(`${n}T00:00:00`)):new Date(c.getTime()-96768e5),l=[];for(let e=new Date(d);e<=c;e.setDate(e.getDate()+7))l.push(new Date(e));return K`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:calendar-blank-outline"></ha-icon></div>
          <div class="title-block">
            <div class="title">${ze(i,"card.attendance_heatmap.title")}</div>
            <div class="subtitle">${ze(i,"card.attendance_heatmap.subtitle")}</div>
          </div>
        </div>
        <div class="heatmap-scroll">
          <div class="heatmap" style="grid-template-columns: repeat(${l.length}, 11px);">
            ${l.map(e=>K`
                <div class="heatmap-col">
                  ${zt.map(t=>{const s=new Date(e);if(s.setDate(s.getDate()+t),s>o)return K`<span class="cell future"></span>`;const r=function(e){return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`}(s),n=a[r];return K`<span class="cell ${n??"none"}" title=${`${r}${n?` - ${ze(i,`card.attendance_heatmap.status.${n}`)}`:""}`}></span>`})}
                </div>
              `)}
          </div>
        </div>
        <div class="heatmap-legend">
          <span class="legend-item"><span class="cell good"></span>${ze(i,"card.attendance_heatmap.status.good")}</span>
          <span class="legend-item"><span class="cell warn"></span>${ze(i,"card.attendance_heatmap.status.warn")}</span>
          <span class="legend-item"><span class="cell bad"></span>${ze(i,"card.attendance_heatmap.status.bad")}</span>
          <span class="legend-item"><span class="cell none"></span>${ze(i,"card.attendance_heatmap.no_data")}</span>
        </div>
      </ha-card>
    `}};Ct.styles=[Ne,Me,n`
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
    `],e([pe()],Ct.prototype,"_config",void 0),Ct=e([ue("librus-attendance-heatmap-card")],Ct);const jt=[1,2,3,4,5],St=["excused","unexcused","late"],Et={excused:"var(--lc-warn)",unexcused:"var(--lc-bad)",late:"var(--lc-brand)"},Dt={excused:"stat.excused",unexcused:"stat.unexcused",late:"stat.late"};let It=class extends Ae{static getConfigElement(){return document.createElement("librus-device-editor")}static getStubConfig(){return{type:"custom:librus-attendance-weekday-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 3}render(){if(!this._config||!this.hass)return V;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{map:t}=e,i=this.hass,s=t.attendance?i.states[t.attendance]:void 0,a=s?.attributes.by_weekday,r=jt.map(e=>{const t=a?.[String(e)];return(t?.excused??0)+(t?.unexcused??0)+(t?.late??0)}),n=r.reduce((e,t)=>e+t,0);if(!a||0===n)return this._message("mdi:chart-bar-stacked",ze(i,"card.attendance_weekday.empty"));const o=Math.max(...r,1),c={excused:0,unexcused:0,late:0};for(const e of jt){const t=a[String(e)];t&&(c.excused+=t.excused,c.unexcused+=t.unexcused,c.late+=t.late)}const d=jt.map(e=>new Date(2026,0,e+4).toLocaleDateString(i.language,{weekday:"short"}));return K`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:chart-bar-stacked"></ha-icon></div>
          <div class="title-block">
            <div class="title">${ze(i,"card.attendance_weekday.title")}</div>
            <div class="subtitle">${ze(i,"card.attendance_weekday.subtitle")}</div>
          </div>
        </div>
        <div class="weekday-bars">
          ${jt.map((e,t)=>{const s=a[String(e)],n=r[t],c=n>0?Math.max(22,n/o*84):4;return K`
              <div class="weekday-col">
                <div class="weekday-total">${n||""}</div>
                <div class="weekday-bar-stack" style="height:${c}px;${0===n?"background:var(--divider-color);":""}">
                  ${St.filter(e=>s&&s[e]>0).map(e=>K`
                      <div
                        class="seg"
                        style="height:${(s[e]/n*c).toFixed(1)}px;background:${Et[e]}"
                        title="${ze(i,Dt[e])}: ${s[e]}"
                      ></div>
                    `)}
                </div>
                <div class="weekday-label">${d[t]}</div>
              </div>
            `})}
        </div>
        <div class="legend">
          ${St.map(e=>K`
              <span class="legend-item">
                <span class="dot" style="background:${Et[e]}"></span>${ze(i,Dt[e])} <b>${c[e]}</b>
              </span>
            `)}
        </div>
      </ha-card>
    `}};It.styles=[Ne,Me,n`
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
    `],e([pe()],It.prototype,"_config",void 0),It=e([ue("librus-attendance-weekday-card")],It);const Tt={positive:"good",negative:"bad",neutral:"neutral"};let At=class extends Ae{static getConfigElement(){return document.createElement("librus-device-editor")}static getStubConfig(){return{type:"custom:librus-behaviour-notices-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 2}render(){if(!this._config||!this.hass)return V;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{map:t}=e,i=this.hass,s=t.behaviour_notices?i.states[t.behaviour_notices]:void 0,a=s?.attributes.recent??[],r=s&&Number(s.state)||0;return s&&0!==a.length?K`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:alert-circle-outline"></ha-icon></div>
          <div class="title-block">
            <div class="title">${ze(i,"card.behaviour_notices.title")}</div>
            <div class="subtitle">${r}</div>
          </div>
        </div>
        <div class="scroll-list">
          ${a.map(e=>K`
              <div class="list-item">
                <span class="dot ${Tt[e.sentiment??"neutral"]}"></span>
                <div class="body">
                  <div class="row1">
                    <span class="cat-label">${e.category??""}</span>
                    ${e.date?K`<time>${Fe(e.date,i.language)}</time>`:V}
                  </div>
                  <div class="item-text">${e.text}</div>
                </div>
              </div>
            `)}
        </div>
      </ha-card>
    `:this._message("mdi:alert-circle-outline",ze(i,"card.behaviour_notices.empty"))}};At.styles=[Ne,Me],e([pe()],At.prototype,"_config",void 0),At=e([ue("librus-behaviour-notices-card")],At);let Nt=class extends Ae{static getConfigElement(){return document.createElement("librus-device-editor")}static getStubConfig(){return{type:"custom:librus-behaviour-notices-tile-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 1}render(){if(!this._config||!this.hass)return V;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{map:t}=e,i=this.hass,s=t.behaviour_notices?i.states[t.behaviour_notices]:void 0;if(!s)return this._message("mdi:alert-circle-outline",ze(i,"empty.generic_error"));const a=Number(s.state)||0,r=(s.attributes.recent??[])[0],n="negative"===r?.sentiment?"bad":"positive"===r?.sentiment?"good":"";return K`
      <ha-card class="tile" @click=${it(this,this._config.tap_action,t.behaviour_notices)}>
        <div class="icon-badge ${n}"><ha-icon icon="mdi:alert-circle-outline"></ha-icon></div>
        <div class="tile-body">
          <div class="subj">${a} ${ze(i,"card.behaviour_notices.title").toLowerCase()}</div>
          ${r?.category?K`<div class="meta">${r.category}</div>`:V}
        </div>
      </ha-card>
    `}};async function Mt(e,t,i,s="inbox"){return(await e.callWS({type:"call_service",domain:"librus_synergia",service:"get_message",service_data:{device_id:t,message_id:i,mailbox:s},return_response:!0})).response}Nt.styles=[Ne,Me,n`
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
    `],e([pe()],Nt.prototype,"_config",void 0),Nt=e([ue("librus-behaviour-notices-tile-card")],Nt);const Lt={inbox:"recent",substitutions:"substitutions_recent",alerts:"alerts_recent",justifications:"justifications_recent"},Ot=[{key:"inbox",label:"mailbox.inbox"},{key:"notes",label:"mailbox.notes"},{key:"alerts",label:"mailbox.alerts"},{key:"substitutions",label:"mailbox.substitutions"},{key:"absences",label:"mailbox.absences"},{key:"justifications",label:"mailbox.justifications"},{key:"trash",label:"mailbox.trash"}];let Pt=class extends Ae{constructor(){super(...arguments),this._fullById={},this._pendingIds=new Set,this._errorIds=new Set}static getConfigElement(){return Ie()}static getStubConfig(){return{type:"custom:librus-messages-card"}}get _mailbox(){return this._config?.mailbox&&Lt[this._config.mailbox]?this._config.mailbox:"inbox"}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 3}async _onMessageClick(e){if(this._expandedId===e.id)return void(this._expandedId=void 0);if(this._expandedId=e.id,this._fullById[e.id]||this._pendingIds.has(e.id))return;const t=this._resolveEntities();if("error"in t||!this.hass)return;const i=e.mailbox??this._mailbox;this._pendingIds=new Set(this._pendingIds).add(e.id);const s=new Set(this._errorIds);s.delete(e.id),this._errorIds=s;try{const s=await Mt(this.hass,t.deviceId,e.id,i);this._fullById={...this._fullById,[e.id]:s}}catch{this._errorIds=new Set(this._errorIds).add(e.id)}finally{const t=new Set(this._pendingIds);t.delete(e.id),this._pendingIds=t}}_renderMessageBody(e){const t=this.hass;if(this._expandedId!==e.id)return K`<div class="item-text"><b>${e.topic}</b> - ${e.content}</div>`;const i=this._fullById[e.id];return i?K`
        <div class="item-text"><b>${i.topic}</b></div>
        <div class="full-text">${i.content}</div>
        <div class="read-notice">${ze(t,"card.messages.read_notice")}</div>
      `:this._errorIds.has(e.id)?K`<div class="item-text"><b>${e.topic}</b> - ${ze(t,"card.messages.fetch_failed")}</div>`:K`<div class="item-text"><b>${e.topic}</b> - ${ze(t,"empty.loading")}</div>`}render(){if(!this._config||!this.hass)return V;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{map:t}=e,i=this.hass,s=t.unread_messages?i.states[t.unread_messages]:void 0;if(!s||"unavailable"===s.state)return this._message("mdi:email-outline",ze(i,"card.messages.unavailable"));const a=this._mailbox,r=s.attributes.mailbox_breakdown??{},n=s.attributes[Lt[a]]??[];Number(s.state);const o=this._config.max_items??6;return K`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:email-outline"></ha-icon></div>
          <div class="title-block">
            <div class="title">${this._config.title??ze(i,"card.messages.title")}</div>
            <div class="subtitle">${ze(i,`mailbox.${a}`)}</div>
          </div>
        </div>
        <div class="chips">
          ${Ot.map(({key:e,label:t})=>K`
              <span class="chip ${e===a?"hot":""}"
                >${ze(i,t)} <span class="n">${r[e]??0}</span></span
              >
            `)}
        </div>
        ${n.length?K`
              <hr />
              <div class="scroll-list">
                ${n.slice(0,o).map(e=>K`
                    <div class="list-item clickable" @click=${()=>this._onMessageClick(e)}>
                      <span class="dot ${e.unread?"good":"neutral"}"></span>
                      <div class="body">
                        <div class="row1">
                          <span>${e.sender}</span>
                          ${e.date?K`<time>${Fe(e.date,i.language)}</time>`:V}
                        </div>
                        ${this._renderMessageBody(e)}
                      </div>
                    </div>
                  `)}
              </div>
            `:V}
      </ha-card>
    `}};Pt.styles=[Ne,Me,n`
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
    `],e([pe()],Pt.prototype,"_config",void 0),e([pe()],Pt.prototype,"_expandedId",void 0),e([pe()],Pt.prototype,"_fullById",void 0),e([pe()],Pt.prototype,"_pendingIds",void 0),e([pe()],Pt.prototype,"_errorIds",void 0),Pt=e([ue("librus-messages-card")],Pt);let Bt=class extends Ae{static getConfigElement(){return document.createElement("librus-device-editor")}static getStubConfig(){return{type:"custom:librus-messages-tile-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 1}render(){if(!this._config||!this.hass)return V;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{map:t}=e,i=this.hass,s=t.unread_messages?i.states[t.unread_messages]:void 0;if(!s||"unavailable"===s.state)return this._message("mdi:email-outline",ze(i,"card.messages.unavailable"));const a=Number(s.state)||0,r=(s.attributes.recent??[])[0];return K`
      <ha-card class="tile" @click=${it(this,this._config.tap_action,t.unread_messages)}>
        <div class="icon-badge ${a>0?"amber":""}">
          <ha-icon icon="mdi:email-outline"></ha-icon>
        </div>
        <div class="tile-body">
          <div class="subj">${a} ${ze(i,"mailbox.inbox").toLowerCase()}</div>
          ${r?K`<div class="meta">${r.sender} · ${r.topic}</div>`:V}
        </div>
      </ha-card>
    `}};function Ut(e){return`${e.mailbox}:${e.id}`}Bt.styles=[Ne,Me,n`
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
    `],e([pe()],Bt.prototype,"_config",void 0),Bt=e([ue("librus-messages-tile-card")],Bt);let Ft=class extends Ae{constructor(){super(...arguments),this._fullByKey={},this._pendingKeys=new Set,this._errorKeys=new Set}static getConfigElement(){return document.createElement("librus-device-editor")}static getStubConfig(){return{type:"custom:librus-substitutions-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 2}async _onClick(e){const t=Ut(e);if(this._expandedKey===t)return void(this._expandedKey=void 0);if(this._expandedKey=t,this._fullByKey[t]||this._pendingKeys.has(t))return;const i=this._resolveEntities();if("error"in i||!this.hass)return;this._pendingKeys=new Set(this._pendingKeys).add(t);const s=new Set(this._errorKeys);s.delete(t),this._errorKeys=s;try{const s=await Mt(this.hass,i.deviceId,e.id,e.mailbox);this._fullByKey={...this._fullByKey,[t]:s}}catch{this._errorKeys=new Set(this._errorKeys).add(t)}finally{const e=new Set(this._pendingKeys);e.delete(t),this._pendingKeys=e}}_renderBody(e){const t=this.hass,i=Ut(e);if(this._expandedKey!==i)return K`<div class="item-text"><b>${e.topic}</b> - ${e.content}</div>`;const s=this._fullByKey[i];return s?K`
        <div class="item-text"><b>${s.topic}</b></div>
        <div class="full-text">${s.content}</div>
        <div class="read-notice">${ze(t,"card.messages.read_notice")}</div>
      `:this._errorKeys.has(i)?K`<div class="item-text"><b>${e.topic}</b> - ${ze(t,"card.messages.fetch_failed")}</div>`:K`<div class="item-text"><b>${e.topic}</b> - ${ze(t,"empty.loading")}</div>`}_renderSection(e,t){if(0===t.length)return V;const i=this.hass;return K`
      <div class="section-title">${e}</div>
      <div class="scroll-list">
        ${t.map(e=>K`
            <div class="list-item clickable" @click=${()=>this._onClick(e)}>
              <span class="dot ${e.unread?"good":"neutral"}"></span>
              <div class="body">
                <div class="row1">
                  <span>${e.sender}</span>
                  ${e.date?K`<time>${Fe(e.date,i.language)}</time>`:V}
                </div>
                ${this._renderBody(e)}
              </div>
            </div>
          `)}
      </div>
    `}render(){if(!this._config||!this.hass)return V;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{map:t}=e,i=this.hass,s=t.unread_messages?i.states[t.unread_messages]:void 0,a=s?.attributes.substitutions_recent??[],r=s?.attributes.alerts_recent??[],n=s?.attributes.justifications_recent??[];return!s||0===a.length&&0===r.length&&0===n.length?this._message("mdi:bell-alert-outline",ze(i,"card.substitutions.empty")):K`
      <ha-card>
        <div class="header">
          <div class="icon-badge amber"><ha-icon icon="mdi:bell-alert-outline"></ha-icon></div>
          <div class="title-block">
            <div class="title">${ze(i,"card.substitutions.title")}</div>
            <div class="subtitle">${ze(i,"card.substitutions.subtitle")}</div>
          </div>
        </div>
        ${this._renderSection(ze(i,"mailbox.substitutions"),a)}
        ${this._renderSection(ze(i,"mailbox.alerts"),r)}
        ${this._renderSection(ze(i,"mailbox.justifications"),n)}
      </ha-card>
    `}};Ft.styles=[Ne,Me,n`
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
    `],e([pe()],Ft.prototype,"_config",void 0),e([pe()],Ft.prototype,"_expandedKey",void 0),e([pe()],Ft.prototype,"_fullByKey",void 0),e([pe()],Ft.prototype,"_pendingKeys",void 0),e([pe()],Ft.prototype,"_errorKeys",void 0),Ft=e([ue("librus-substitutions-card")],Ft);let Rt=class extends Ae{static getConfigElement(){return Ie()}static getStubConfig(){return{type:"custom:librus-announcements-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 2}_toggleExpanded(e){this._expandedId=this._expandedId===e?void 0:e}render(){if(!this._config||!this.hass)return V;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{map:t}=e,i=this.hass,s=t.unread_announcements?i.states[t.unread_announcements]:void 0,a=s?.attributes.recent??[];if(!s||0===a.length)return this._message("mdi:bullhorn-outline",ze(i,"card.announcements.empty"));const r=a.slice(0,this._config.max_items??10);return K`
      <ha-card>
        <div class="header">
          <div class="icon-badge amber"><ha-icon icon="mdi:bullhorn-outline"></ha-icon></div>
          <div class="title-block">
            <div class="title">${this._config.title??ze(i,"card.announcements.title")}</div>
            <div class="subtitle">${s.state}</div>
          </div>
        </div>
        <div class="scroll-list">
          ${r.map((e,t)=>{const s=e.id??String(t);return K`
              <div class="list-item clickable" @click=${()=>this._toggleExpanded(s)}>
                <span class="dot neutral"></span>
                <div class="body">
                  <div class="row1">${e.subject}</div>
                  ${e.start_date&&e.end_date?K`<div class="item-text">
                        ${Fe(e.start_date,i.language)} –
                        ${Fe(e.end_date,i.language)}
                      </div>`:V}
                  ${this._expandedId===s?K`<div class="full-text">${e.content}</div>`:V}
                </div>
              </div>
            `})}
        </div>
      </ha-card>
    `}};Rt.styles=[Ne,Me,n`
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
    `],e([pe()],Rt.prototype,"_config",void 0),e([pe()],Rt.prototype,"_expandedId",void 0),Rt=e([ue("librus-announcements-card")],Rt);let Ht=class extends Ae{static getConfigElement(){return document.createElement("librus-device-editor")}static getStubConfig(){return{type:"custom:librus-announcements-tile-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 1}render(){if(!this._config||!this.hass)return V;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{map:t}=e,i=this.hass,s=t.unread_announcements?i.states[t.unread_announcements]:void 0;if(!s)return this._message("mdi:bullhorn-outline",ze(i,"empty.generic_error"));const a=Number(s.state)||0,r=(s.attributes.recent??[])[0];return K`
      <ha-card class="tile" @click=${it(this,this._config.tap_action,t.unread_announcements)}>
        <div class="icon-badge ${a>0?"amber":""}">
          <ha-icon icon="mdi:bullhorn-outline"></ha-icon>
        </div>
        <div class="tile-body">
          <div class="subj">${a} ${ze(i,"card.announcements.title").toLowerCase()}</div>
          ${r?K`<div class="meta">${r.subject}</div>`:V}
        </div>
      </ha-card>
    `}};Ht.styles=[Ne,Me,n`
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
    `],e([pe()],Ht.prototype,"_config",void 0),Ht=e([ue("librus-announcements-tile-card")],Ht);let Kt=class extends Ae{static getConfigElement(){return document.createElement("librus-device-editor")}static getStubConfig(){return{type:"custom:librus-homework-assignments-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 2}render(){if(!this._config||!this.hass)return V;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{map:t}=e,i=this.hass,s=t.homework_assignments?i.states[t.homework_assignments]:void 0,a=s?.attributes.recent??[];return s&&0!==a.length?K`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:notebook-edit-outline"></ha-icon></div>
          <div class="title-block">
            <div class="title">${ze(i,"card.homework_assignments.title")}</div>
            <div class="subtitle">${s.state}</div>
          </div>
        </div>
        <div class="scroll-list">
          ${a.map(e=>K`
              <div class="list-item">
                <span class="dot neutral"></span>
                <div class="body">
                  <div class="row1">
                    <span>${e.topic}</span>
                    ${e.due_date?K`<time>${ze(i,"label.due")} ${Fe(e.due_date,i.language)}</time>`:V}
                  </div>
                  <div class="item-text">${e.text}${e.teacher?K` - ${e.teacher}`:V}</div>
                </div>
              </div>
            `)}
        </div>
      </ha-card>
    `:this._message("mdi:notebook-edit-outline",ze(i,"card.homework_assignments.empty"))}};Kt.styles=[Ne,Me],e([pe()],Kt.prototype,"_config",void 0),Kt=e([ue("librus-homework-assignments-card")],Kt);let Wt=class extends Ae{constructor(){super(...arguments),this._done=new Set,this._storageKey=""}static getConfigElement(){return Ie()}static getStubConfig(){return{type:"custom:librus-homework-checklist-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 3}_load(e){const t=`librus-hw-done:${e}`;if(this._storageKey!==t){this._storageKey=t;try{const e=window.localStorage.getItem(t);this._done=new Set(e?JSON.parse(e):[])}catch{this._done=new Set}}}_persist(e){const t=[...this._done].filter(t=>e.has(t));try{window.localStorage.setItem(this._storageKey,JSON.stringify(t))}catch{}}_toggle(e,t){const i=new Set(this._done);i.has(e)?i.delete(e):i.add(e),this._done=i,this._persist(t)}render(){if(!this._config||!this.hass)return V;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{deviceId:t,map:i}=e,s=this.hass;this._load(t);const a=i.homework_assignments?s.states[i.homework_assignments]:void 0,r=(a?.attributes.recent??[]).map((e,t)=>({...e,key:void 0!==e.id?String(e.id):`${e.topic}|${e.due_date??t}`}));if(0===r.length)return this._message("mdi:notebook-edit-outline",ze(s,"card.homework_assignments.empty"));const n=new Set(r.map(e=>e.key)),o=this._config.max_items??12,c=[...r].sort((e,t)=>{const i=this._done.has(e.key)?1:0,s=this._done.has(t.key)?1:0;return i!==s?i-s:(e.due_date??"").localeCompare(t.due_date??"")}),d=r.filter(e=>this._done.has(e.key)).length;return K`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:notebook-edit-outline"></ha-icon></div>
          <div class="title-block">
            <div class="title">${this._config.title??ze(s,"card.homework_checklist.title")}</div>
            <div class="subtitle">
              ${ze(s,"card.homework_checklist.progress",{done:d,total:r.length})}
            </div>
          </div>
        </div>
        <div class="scroll-list">
          ${c.slice(0,o).map(e=>{const t=this._done.has(e.key);return K`
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
                    ${e.due_date?K`<time>${Fe(e.due_date,s.language)}</time>`:V}
                  </div>
                  ${e.text&&e.text!==e.topic?K`<div class="item-text">${e.text}</div>`:V}
                </div>
              </div>
            `})}
        </div>
      </ha-card>
    `}};Wt.styles=[Ne,Me,n`
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
    `],e([pe()],Wt.prototype,"_config",void 0),e([pe()],Wt.prototype,"_done",void 0),Wt=e([ue("librus-homework-checklist-card")],Wt);function qt(e){return e.length<=10?`${e}T00:00:00`:e}let Vt=class extends Ae{static getConfigElement(){return Ie()}static getStubConfig(){return{type:"custom:librus-recent-activity-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 4}render(){if(!this._config||!this.hass)return V;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{deviceId:t,map:i}=e,s=this.hass,a=[];for(const e of we(s,t,"subject_average")){const t=s.states[e.entityId]?.attributes.grades??[];for(const i of t)i.date&&a.push({date:i.date,icon:"mdi:notebook-outline",title:`${i.value} · ${e.subject}`,text:i.category??""})}const r=i.behaviour_notices?s.states[i.behaviour_notices]:void 0;for(const e of r?.attributes.recent??[])e.date&&a.push({date:e.date,icon:"mdi:alert-circle-outline",title:e.category??"",text:e.text});const n=i.unread_announcements?s.states[i.unread_announcements]:void 0;for(const e of n?.attributes.recent??[])e.creation_date&&a.push({date:e.creation_date,icon:"mdi:bullhorn-outline",title:e.subject,text:""});const o=i.unread_messages?s.states[i.unread_messages]:void 0;for(const e of o?.attributes.recent??[])e.date&&a.push({date:e.date,icon:"mdi:email-outline",title:`${e.sender} · ${e.topic}`,text:e.content});a.sort((e,t)=>qt(t.date).localeCompare(qt(e.date)));const c=a.slice(0,this._config.max_items??15);return 0===c.length?this._message("mdi:bell-outline",ze(s,"card.recent_activity.empty")):K`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:bell-outline"></ha-icon></div>
          <div class="title-block">
            <div class="title">${this._config.title??ze(s,"card.recent_activity.title")}</div>
            <div class="subtitle">${ze(s,"card.recent_activity.subtitle")}</div>
          </div>
        </div>
        <div class="scroll-list">
          ${c.map(e=>K`
              <div class="list-item">
                <div class="type-icon"><ha-icon icon=${e.icon}></ha-icon></div>
                <div class="body">
                  <div class="row1">
                    <span>${e.title}</span>
                    <time>${Fe(e.date,s.language)}</time>
                  </div>
                  ${e.text?K`<div class="item-text">${e.text}</div>`:V}
                </div>
              </div>
            `)}
        </div>
      </ha-card>
    `}};function Gt(e){return"string"==typeof e?{value:e,allDay:e.length<=10}:e.date?{value:e.date,allDay:!0}:{value:e.dateTime??"",allDay:!1}}async function Zt(e,t,i,s){const a=`calendars/${t}?start=${encodeURIComponent(i.toISOString())}&end=${encodeURIComponent(s.toISOString())}`,r=await e.callApi("GET",a);return Array.isArray(r)?r.map(e=>{const t=Gt(e.start),i=Gt(e.end);return{start:t.value,end:i.value,allDay:t.allDay,summary:e.summary??"",description:e.description,location:e.location}}):[]}function Jt(e,t){if(e.allDay)return!1;const i=new Date(e.start).getTime(),s=new Date(e.end).getTime(),a=t.getTime();return a>=i&&a<s}function Yt(e,t){return(e.allDay?new Date(`${e.end}T23:59:59`):new Date(e.end)).getTime()<t.getTime()}Vt.styles=[Ne,Me,n`
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
    `],e([pe()],Vt.prototype,"_config",void 0),Vt=e([ue("librus-recent-activity-card")],Vt);let Qt=class extends Ae{constructor(){super(...arguments),this._events=[]}static getConfigElement(){return document.createElement("librus-device-editor")}static getStubConfig(){return{type:"custom:librus-today-lessons-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 4}connectedCallback(){super.connectedCallback(),this._refreshTimer=setInterval(()=>{this._fetch(!0)},3e5),this._tickTimer=setInterval(()=>this.requestUpdate(),6e4)}disconnectedCallback(){super.disconnectedCallback(),clearInterval(this._refreshTimer),clearInterval(this._tickTimer)}async _fetch(e=!1){if(!this.hass||!this._config)return;const t=this._resolveEntities();if("error"in t)return;const i=t.map.timetable;if(!i)return;const s=new Date;s.setHours(0,0,0,0);const a=new Date(s);a.setDate(a.getDate()+1);const r=`${i}:${s.toDateString()}`;if(e||this._fetchedFor!==r){this._fetchedFor=r;try{const e=await Zt(this.hass,i,s,a);this._events=e.filter(e=>!e.allDay).sort((e,t)=>e.start.localeCompare(t.start))}catch{this._events=[]}}}render(){if(!this._config||!this.hass)return V;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const t=this.hass;if(this._fetch(),0===this._events.length)return this._message("mdi:calendar-clock",ze(t,"card.today_lessons.empty"));const i=new Date;return K`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:calendar-clock"></ha-icon></div>
          <div class="title-block">
            <div class="title">${ze(t,"card.today_lessons.title")}</div>
            <div class="subtitle">${ze(t,"card.today_lessons.subtitle")}</div>
          </div>
        </div>
        <div class="timeline">
          ${this._events.map(e=>{const s=Jt(e,i),a=Yt(e,i);return K`
              <div class="tl-item ${s?"now":""} ${a?"done":""}">
                <span class="tl-time">${Ue(e.start)}</span>
                <span class="tl-dot"></span>
                <div class="tl-body">
                  <div class="subj">
                    ${e.summary} ${s?K`<span class="pill-now">${ze(t,"label.now")}</span>`:V}
                  </div>
                  ${e.location||e.description?K`<div class="meta">${[e.location,e.description].filter(Boolean).join(" · ")}</div>`:V}
                </div>
              </div>
            `})}
        </div>
      </ha-card>
    `}};Qt.styles=[Ne,Me,n`
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
    `],e([pe()],Qt.prototype,"_config",void 0),e([pe()],Qt.prototype,"_events",void 0),Qt=e([ue("librus-today-lessons-card")],Qt);let Xt=class extends Ae{static getConfigElement(){return document.createElement("librus-device-editor")}static getStubConfig(){return{type:"custom:librus-next-lesson-tile-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 1}connectedCallback(){super.connectedCallback(),this._tickTimer=setInterval(()=>this.requestUpdate(),3e4)}disconnectedCallback(){super.disconnectedCallback(),clearInterval(this._tickTimer)}render(){if(!this._config||!this.hass)return V;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{map:t}=e,i=this.hass,s=t.timetable?i.states[t.timetable]:void 0,a=s?.attributes.message,r=s?.attributes.start_time;if(!s||!a||!r)return this._message("mdi:clock-outline",ze(i,"card.next_lesson.empty"));const n=new Date(r.replace(" ","T")),o=new Date,c="on"===s.state,d=He(n,o),l=s.attributes.location,u=s.attributes.description;return K`
      <ha-card class="tile" @click=${it(this,this._config.tap_action,t.timetable)}>
        <div class="icon-badge ${c?"good":""}"><ha-icon icon="mdi:clock-outline"></ha-icon></div>
        <div class="tile-body">
          <div class="subj">${a}</div>
          <div class="meta">
            ${c?ze(i,"label.now"):`${Ue(r.replace(" ","T"))} · ${Ce(i,d)}`}
            ${l?` · ${l}`:""}${u?` · ${u}`:""}
          </div>
        </div>
      </ha-card>
    `}};Xt.styles=[Ne,Me,n`
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
    `],e([pe()],Xt.prototype,"_config",void 0),Xt=e([ue("librus-next-lesson-tile-card")],Xt);let ei=class extends Ae{constructor(){super(...arguments),this._events=[]}static getConfigElement(){return Ie()}static getStubConfig(){return{type:"custom:librus-agenda-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 4}connectedCallback(){super.connectedCallback(),this._refreshTimer=setInterval(()=>{this._fetch(!0)},9e5)}disconnectedCallback(){super.disconnectedCallback(),clearInterval(this._refreshTimer)}async _fetch(e=!1){if(!this.hass||!this._config)return;const t=this._resolveEntities();if("error"in t)return;const i=t.map.agenda;if(!i)return;const s=this._config.days_ahead??14,a=new Date;a.setHours(0,0,0,0);const r=new Date(a);r.setDate(r.getDate()+s);const n=`${i}:${a.toDateString()}:${s}`;if(e||this._fetchedFor!==n){this._fetchedFor=n;try{const e=await Zt(this.hass,i,a,r);this._events=e.sort((e,t)=>e.start.localeCompare(t.start))}catch{this._events=[]}}}render(){if(!this._config||!this.hass)return V;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const t=this.hass;if(this._fetch(),0===this._events.length)return this._message("mdi:calendar-text-outline",ze(t,"card.agenda.empty"));const i=new Map;for(const e of this._events){const t=e.start.slice(0,10);i.has(t)||i.set(t,[]),i.get(t).push(e)}return K`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:calendar-text-outline"></ha-icon></div>
          <div class="title-block">
            <div class="title">${this._config.title??ze(t,"card.agenda.title")}</div>
            <div class="subtitle">${ze(t,"card.agenda.subtitle")}</div>
          </div>
        </div>
        <div class="scroll-list">
          ${[...i.entries()].map(([e,i])=>K`
              <div class="day-group">
                <div class="day-label">${Fe(e,t.language)}</div>
                ${i.map(e=>{const{category:t,text:i}=We(e.summary);return K`
                    <div class="list-item">
                      <span class="dot neutral"></span>
                      <div class="body">
                        ${t?K`<div class="cat-label-row"><span class="cat-label">${t}</span></div>`:V}
                        <div class="row1">${i}</div>
                        ${e.description?K`<div class="item-text">${e.description}</div>`:V}
                      </div>
                    </div>
                  `})}
              </div>
            `)}
        </div>
      </ha-card>
    `}};ei.styles=[Ne,Me,n`
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
    `],e([pe()],ei.prototype,"_config",void 0),e([pe()],ei.prototype,"_events",void 0),ei=e([ue("librus-agenda-card")],ei);const ti=new Set(["unknown","unavailable",""]),ii="sprawdzian";let si=class extends Ae{constructor(){super(...arguments),this._events=[]}static getConfigElement(){return Ie()}static getStubConfig(){return{type:"custom:librus-exam-countdown-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 2}connectedCallback(){super.connectedCallback(),this._refreshTimer=setInterval(()=>{this._fetch(!0)},9e5)}disconnectedCallback(){super.disconnectedCallback(),clearInterval(this._refreshTimer)}_sensorExams(){if(!this.hass)return;const e=this._resolveEntities();if("error"in e)return;const t=e.map.next_exam?this.hass.states[e.map.next_exam]:void 0;if(!t||ti.has(t.state))return;const i=(new Date).toLocaleDateString("en-CA"),s=(t.attributes.upcoming??[]).filter(e=>e.date>=i).sort((e,t)=>e.date.localeCompare(t.date)).map(e=>({date:e.date,text:[e.subject,e.content].filter(Boolean).join(" — ")||e.category||""}));return 0===s.length?[{date:t.state,text:t.attributes.subject??""}]:s}async _fetch(e=!1){if(!this.hass||!this._config)return;const t=this._resolveEntities();if("error"in t)return;if(void 0!==this._sensorExams())return;const i=t.map.agenda;if(!i)return;const s=new Date;s.setHours(0,0,0,0);const a=new Date(s);a.setDate(a.getDate()+90);const r=this._config.exam_keywords||ii,n=`${i}:${s.toDateString()}:${r}`;if(!e&&this._fetchedFor===n)return;this._fetchedFor=n;const o=function(e){const t=(e||ii).split(",").map(e=>e.trim()).filter(Boolean).map(e=>e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"));return new RegExp(t.length?t.join("|"):ii,"i")}(this._config.exam_keywords);try{const e=await Zt(this.hass,i,s,a);this._events=e.filter(e=>{const{category:t}=We(e.summary);return null!==t&&o.test(t)}).sort((e,t)=>e.start.localeCompare(t.start))}catch{this._events=[]}}render(){if(!this._config||!this.hass)return V;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const t=this.hass;this._fetch();const i=this._sensorExams()??this._events.map(e=>({date:e.start,text:We(e.summary).text}));if(0===i.length)return this._message("mdi:clipboard-text-outline",ze(t,"card.exam_countdown.empty"));const[s,...a]=i,r=Re(new Date,new Date(`${s.date.slice(0,10)}T00:00:00`));return K`
      <ha-card @click=${it(this,this._config.tap_action,e.map.next_exam||e.map.agenda)}>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:clipboard-text-outline"></ha-icon></div>
          <div class="title-block">
            <div class="title">${ze(t,"card.exam_countdown.title")}</div>
            <div class="subtitle">${Fe(s.date,t.language)}</div>
          </div>
        </div>
        <div class="countdown">
          <span class="big">${r}</span>
          <span class="unit">${ze(t,"label.days_until")}<br /><b>${s.text}</b></span>
        </div>
        ${a.length?K`
              <hr />
              <div class="chips">
                ${a.slice(0,4).map(e=>K`<span class="chip">${e.text} <span class="n">${Fe(e.date,t.language)}</span></span>`)}
              </div>
            `:V}
      </ha-card>
    `}};si.styles=[Ne,Me,n`
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
    `],e([pe()],si.prototype,"_config",void 0),e([pe()],si.prototype,"_events",void 0),si=e([ue("librus-exam-countdown-card")],si);let ai=class extends Ae{constructor(){super(...arguments),this._events=[]}static getConfigElement(){return document.createElement("librus-device-editor")}static getStubConfig(){return{type:"custom:librus-free-days-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 2}connectedCallback(){super.connectedCallback(),this._refreshTimer=setInterval(()=>{this._fetch(!0)},36e5)}disconnectedCallback(){super.disconnectedCallback(),clearInterval(this._refreshTimer)}async _fetch(e=!1){if(!this.hass||!this._config)return;const t=this._resolveEntities();if("error"in t)return;const i=t.map.free_days;if(!i)return;const s=new Date;s.setHours(0,0,0,0);const a=new Date(s);a.setDate(a.getDate()+240);const r=`${i}:${s.toDateString()}`;if(e||this._fetchedFor!==r){this._fetchedFor=r;try{const e=await Zt(this.hass,i,s,a);this._events=e.sort((e,t)=>e.start.localeCompare(t.start))}catch{this._events=[]}}}render(){if(!this._config||!this.hass)return V;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const t=this.hass;if(this._fetch(),0===this._events.length)return this._message("mdi:beach",ze(t,"card.free_days.empty"));const i=new Date,[s,...a]=this._events,r=Re(i,new Date(`${s.start}T00:00:00`));return K`
      <ha-card>
        <div class="header">
          <div class="icon-badge amber"><ha-icon icon="mdi:beach"></ha-icon></div>
          <div class="title-block">
            <div class="title">${ze(t,"card.free_days.title")}</div>
            <div class="subtitle">${s.summary}</div>
          </div>
        </div>
        <div class="countdown">
          <span class="big">${r}</span>
          <span class="unit">${ze(t,"label.days_until")}<br /><b>${s.summary}</b></span>
        </div>
        ${a.length?K`
              <hr />
              <div class="chips">
                ${a.slice(0,4).map(e=>K`<span class="chip">${e.summary} <span class="n">${Fe(e.start,t.language)}</span></span>`)}
              </div>
            `:V}
      </ha-card>
    `}};ai.styles=[Ne,Me,n`
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
    `],e([pe()],ai.prototype,"_config",void 0),e([pe()],ai.prototype,"_events",void 0),ai=e([ue("librus-free-days-card")],ai);let ri=class extends Ae{constructor(){super(...arguments),this._events=[]}static getConfigElement(){return document.createElement("librus-device-editor")}static getStubConfig(){return{type:"custom:librus-free-days-tile-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 1}connectedCallback(){super.connectedCallback(),this._refreshTimer=setInterval(()=>{this._fetch(!0)},36e5)}disconnectedCallback(){super.disconnectedCallback(),clearInterval(this._refreshTimer)}async _fetch(e=!1){if(!this.hass||!this._config)return;const t=this._resolveEntities();if("error"in t)return;const i=t.map.free_days;if(!i)return;const s=new Date;s.setHours(0,0,0,0);const a=new Date(s);a.setDate(a.getDate()+240);const r=`${i}:${s.toDateString()}`;if(e||this._fetchedFor!==r){this._fetchedFor=r;try{const e=await Zt(this.hass,i,s,a);this._events=e.sort((e,t)=>e.start.localeCompare(t.start))}catch{this._events=[]}}}render(){if(!this._config||!this.hass)return V;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const t=this.hass;if(this._fetch(),0===this._events.length)return this._message("mdi:beach",ze(t,"card.free_days.empty"));const[i]=this._events,s=Re(new Date,new Date(`${i.start}T00:00:00`));return K`
      <ha-card class="tile" @click=${it(this,this._config.tap_action,e.map.free_days)}>
        <div class="icon-badge amber"><ha-icon icon="mdi:beach"></ha-icon></div>
        <div class="tile-body">
          <div class="subj">${s} ${ze(t,"label.days").toLowerCase()}</div>
          <div class="meta">${i.summary}</div>
        </div>
      </ha-card>
    `}};function ni(e){const t=new Date(e).getDay();return 0===t?7:t}ri.styles=[Ne,Me,n`
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
    `],e([pe()],ri.prototype,"_config",void 0),e([pe()],ri.prototype,"_events",void 0),ri=e([ue("librus-free-days-tile-card")],ri);let oi=class extends Ae{constructor(){super(...arguments),this._events=[]}static getConfigElement(){return Ie()}static getStubConfig(){return{type:"custom:librus-week-timetable-card"}}get _dayCount(){return this._config?.show_saturday?6:5}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 4}connectedCallback(){super.connectedCallback(),this._refreshTimer=setInterval(()=>{this._fetch(!0)},18e5),this._tickTimer=setInterval(()=>this.requestUpdate(),3e4)}disconnectedCallback(){super.disconnectedCallback(),clearInterval(this._refreshTimer),clearInterval(this._tickTimer)}async _fetch(e=!1){if(!this.hass||!this._config)return;const t=this._resolveEntities();if("error"in t)return;const i=t.map.timetable;if(!i)return;const s=function(e){const t=new Date(e),i=ni(e.toISOString()),s=i>=6?8-i:1-i;return t.setDate(t.getDate()+s),t.setHours(0,0,0,0),t}(new Date),a=new Date(s);a.setDate(a.getDate()+this._dayCount);const r=`${i}:${s.toDateString()}:${this._dayCount}`;if(e||this._fetchedFor!==r){this._fetchedFor=r;try{this._events=await Zt(this.hass,i,s,a)}catch{this._events=[]}}}render(){if(!this._config||!this.hass)return V;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const t=this.hass;if(this._fetch(),0===this._events.length)return this._message("mdi:calendar-week-outline",ze(t,"card.week_timetable.empty"));const i=this._dayCount,s=Array.from({length:i},()=>[]);for(const e of this._events){const t=ni(e.start);t>=1&&t<=i&&s[t-1].push(e)}s.forEach(e=>e.sort((e,t)=>e.start.localeCompare(t.start)));const a=Math.max(...s.map(e=>e.length),1),r=Array.from({length:i},(e,i)=>new Date(2026,0,i+5).toLocaleDateString(t.language,{weekday:"short"})),n=new Date,o=ni(n.toISOString())-1,c=o>=0&&o<i?s[o]:[],d=c.find(e=>Jt(e,n)),l=c.find(e=>new Date(e.start)>n),u=!d&&!!l&&c.some(e=>Yt(e,n));return K`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:calendar-week-outline"></ha-icon></div>
          <div class="title-block">
            <div class="title">${ze(t,"card.week_timetable.title")}</div>
            <div class="subtitle">
              ${u?ze(t,"card.week_timetable.break_now",{minutes:He(new Date(l.start),n)}):ze(t,function(e){return ni(e.toISOString())>=6}(new Date)?"card.week_timetable.subtitle_upcoming":"card.week_timetable.subtitle")}
            </div>
          </div>
        </div>
        <div
          class="week-grid"
          style="grid-template-columns: 24px repeat(${i}, 1fr); grid-template-rows: auto repeat(${a}, 1fr);"
        >
          <span class="h"></span>
          ${r.map(e=>K`<span class="h">${e}</span>`)}
          ${Array.from({length:a},(e,t)=>K`
            <span class="n">${t+1}</span>
            ${s.map((e,i)=>{const s=e[t];if(!s)return K`<div class="cell empty"></div>`;const a=i===o&&Jt(s,n);return K`<div
                class="cell on ${a?"current":""} ${u&&i===o&&s===l?"next":""}"
                title=${s.summary}
              >${function(e){const t=e.replace(/\(.*\)/,"").trim();return t.length<=4?t:t.slice(0,3)}(s.summary)}</div>`})}
          `)}
        </div>
      </ha-card>
    `}};oi.styles=[Ne,Me,n`
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
    `],e([pe()],oi.prototype,"_config",void 0),e([pe()],oi.prototype,"_events",void 0),oi=e([ue("librus-week-timetable-card")],oi);const ci=new Set(["unknown","unavailable",""]);function di(e){return e.toLocaleTimeString("en-GB",{hour:"2-digit",minute:"2-digit",hour12:!1})}function li(e){return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`}let ui=class extends Ae{constructor(){super(...arguments),this._events=[]}static getConfigElement(){return Ie()}static getStubConfig(){return{type:"custom:librus-bell-schedule-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 3}connectedCallback(){super.connectedCallback(),this._refreshTimer=setInterval(()=>{this._fetch(!0)},9e5),this._tickTimer=setInterval(()=>this.requestUpdate(),3e4)}disconnectedCallback(){super.disconnectedCallback(),clearInterval(this._refreshTimer),clearInterval(this._tickTimer)}_targetDay(){const e=this._nextLessonDateIso();if(e){const t=new Date(`${e}T00:00:00`);if(!Number.isNaN(t.getTime()))return t}const t=new Date;return t.setHours(0,0,0,0),t}_nextLessonDateIso(){if(!this.hass)return;const e=this._resolveEntities();if("error"in e)return;const t=e.map.next_lesson?this.hass.states[e.map.next_lesson]:void 0,i=t?.attributes.date;return i&&!ci.has(t?.state??"")?i:void 0}async _fetch(e=!1){if(!this.hass||!this._config)return;const t=this._resolveEntities();if("error"in t)return;const i=t.map.timetable;if(!i)return;const s=this._targetDay(),a=new Date(s);a.setDate(a.getDate()+1);const r=`${i}:${li(s)}`;if(e||this._fetchedFor!==r){this._fetchedFor=r;try{this._events=(await Zt(this.hass,i,s,a)).filter(e=>!e.allDay)}catch{this._events=[]}}}render(){if(!this._config||!this.hass)return V;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{map:t}=e,i=this.hass;this._fetch();const s=t.school?i.states[t.school]:void 0,a=s?.attributes.bell_schedule??[];if(0===a.length)return this._message("mdi:bell-outline",ze(i,"card.bell_schedule.empty"));const r=new Map;for(const e of this._events){const t=di(new Date(e.start));!r.has(t)&&e.summary&&r.set(t,{subject:e.summary,room:e.location||void 0})}const n=li(this._targetDay())===li(new Date),o=di(new Date),c=t.current_lesson?i.states[t.current_lesson]:void 0,d=t.next_lesson?i.states[t.next_lesson]:void 0,l=c&&!ci.has(c.state)?c.state:void 0,u=d&&!ci.has(d.state)?d.state:void 0;let h;if(l)h=`${l} · ${ze(i,"label.now")}`;else if(u){const e=Number(d?.attributes.minutes_until);h=Number.isNaN(e)?u:`${u} · ${Ce(i,e)}`}else h=ze(i,"label.after_school");return K`
      <ha-card @click=${it(this,this._config.tap_action,t.school)}>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:bell-outline"></ha-icon></div>
          <div class="title-block">
            <div class="title">${this._config.title??ze(i,"card.bell_schedule.title")}</div>
            <div class="subtitle">${h}</div>
          </div>
        </div>
        <div class="periods">
          ${a.map(e=>{const t=r.get(e.start),s=n&&e.start<=o&&o<=e.end,a=n&&o>e.end;return K`
              <div class="period ${s?"current":""} ${a?"past":""} ${t?"":"free"}">
                <span class="pnum">${ze(i,"label.lesson_short",{n:e.lesson_no})}</span>
                <span class="ptime">${e.start}<span class="dash">–</span>${e.end}</span>
                ${t?K`<span class="psubj"
                      >${t.subject}${t.room?K` <span class="proom">${t.room}</span>`:V}</span
                    >`:V}
              </div>
            `})}
        </div>
      </ha-card>
    `}};function hi(e){const t=new Date(e),i=function(e){const t=new Date(e).getDay();return 0===t?7:t}(e.toISOString()),s=i>=6?8-i:1-i;return t.setDate(t.getDate()+s),t.setHours(0,0,0,0),t}ui.styles=[Ne,Me,n`
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
    `],e([pe()],ui.prototype,"_config",void 0),e([pe()],ui.prototype,"_events",void 0),ui=e([ue("librus-bell-schedule-card")],ui);const gi=Array.from({length:16},(e,t)=>`var(--lc-chart-${t+1})`);let mi=class extends Ae{constructor(){super(...arguments),this._events=[]}static getConfigElement(){return document.createElement("librus-device-editor")}static getStubConfig(){return{type:"custom:librus-subject-time-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 3}connectedCallback(){super.connectedCallback(),this._refreshTimer=setInterval(()=>{this._fetch(!0)},18e5)}disconnectedCallback(){super.disconnectedCallback(),clearInterval(this._refreshTimer)}async _fetch(e=!1){if(!this.hass||!this._config)return;const t=this._resolveEntities();if("error"in t)return;const i=t.map.timetable;if(!i)return;const s=hi(new Date),a=new Date(s);a.setDate(a.getDate()+5);const r=`${i}:${s.toDateString()}`;if(e||this._fetchedFor!==r){this._fetchedFor=r;try{this._events=await Zt(this.hass,i,s,a)}catch{this._events=[]}}}render(){if(!this._config||!this.hass)return V;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const t=this.hass;if(this._fetch(),0===this._events.length)return this._message("mdi:chart-bar",ze(t,"card.subject_time.empty"));const i=new Map;for(const e of this._events)e.summary&&i.set(e.summary,(i.get(e.summary)??0)+1);const s=[...i.entries()].sort((e,t)=>t[1]-e[1]).map(([e,t],i)=>({label:e,value:t,colorVar:gi[i%gi.length]}));return K`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:chart-bar"></ha-icon></div>
          <div class="title-block">
            <div class="title">${ze(t,"card.subject_time.title")}</div>
            <div class="subtitle">${ze(t,"card.subject_time.subtitle")}</div>
          </div>
        </div>
        ${Le(s)}
      </ha-card>
    `}};mi.styles=[Ne,Me],e([pe()],mi.prototype,"_config",void 0),e([pe()],mi.prototype,"_events",void 0),mi=e([ue("librus-subject-time-card")],mi);let pi=class extends Ae{static getConfigElement(){return document.createElement("librus-device-editor")}static getStubConfig(){return{type:"custom:librus-school-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 2}render(){if(!this._config||!this.hass)return V;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{map:t}=e,i=this.hass,s=t.school?i.states[t.school]:void 0,a=t.school_class?i.states[t.school_class]:void 0;if(!s)return this._message("mdi:school",ze(i,"empty.generic_error"));const r=s.attributes.town,n=s.attributes.street,o=s.attributes.head_teacher,c=a?.attributes.homeroom_teacher,d=a?.attributes.first_semester_end,l=a?.attributes.school_year_end;return K`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:school"></ha-icon></div>
          <div class="title-block">
            <div class="title">${s.state}</div>
            <div class="subtitle">${[r,n].filter(Boolean).join(", ")}</div>
          </div>
        </div>
        <div class="stats">
          ${a?K`<div class="stat"><div class="stat-value">${a.state}</div><div class="stat-label">Klasa</div></div>`:V}
          ${c?K`<div class="stat"><div class="stat-value" style="font-size:0.95rem;">${c}</div><div class="stat-label">${ze(i,"label.tutor")}</div></div>`:V}
        </div>
        ${o?K`<div class="item-text">${ze(i,"label.head_teacher")}: ${o}</div>`:V}
        ${d||l?K`
              <hr />
              <div class="chips">
                ${d?K`<span class="chip">${ze(i,"label.semester_ends")} <span class="n">${Fe(d,i.language)}</span></span>`:V}
                ${l?K`<span class="chip">${ze(i,"label.year_ends")} <span class="n">${Fe(l,i.language)}</span></span>`:V}
              </div>
            `:V}
      </ha-card>
    `}};pi.styles=[Ne,Me],e([pe()],pi.prototype,"_config",void 0),pi=e([ue("librus-school-card")],pi);let vi=class extends Ae{static getConfigElement(){return document.createElement("librus-device-editor")}static getStubConfig(){return{type:"custom:librus-school-year-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 2}connectedCallback(){super.connectedCallback(),this._tickTimer=setInterval(()=>this.requestUpdate(),36e5)}disconnectedCallback(){super.disconnectedCallback(),clearInterval(this._tickTimer)}render(){if(!this._config||!this.hass)return V;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{map:t}=e,i=this.hass,s=t.school_class?i.states[t.school_class]:void 0,a=s?.attributes.school_year_start,r=s?.attributes.first_semester_end,n=s?.attributes.school_year_end;if(!s||!a||!n)return this._message("mdi:party-popper",ze(i,"card.school_year.empty"));const o=new Date,c=new Date(`${a}T00:00:00`),d=new Date(`${n}T00:00:00`),l=Math.max(1,Re(c,d)),u=Math.min(l,Math.max(0,Re(c,o))),h=Math.round(u/l*100),g=Math.max(0,Re(o,d)),m=!r||o<new Date(`${r}T00:00:00`),p=m&&r?r:n,v=Math.max(0,Re(o,new Date(`${p}T00:00:00`)));return K`
      <ha-card @click=${it(this,this._config.tap_action,t.school_class)}>
        <div class="header">
          <div class="icon-badge amber"><ha-icon icon="mdi:party-popper"></ha-icon></div>
          <div class="title-block">
            <div class="title">${ze(i,"card.school_year.title")}</div>
            <div class="subtitle">${Fe(n,i.language)}</div>
          </div>
        </div>
        <div class="ring-row">
          ${Oe(h,"var(--lc-brand)",68,7)}
          <div>
            <div class="ring-num">${g}</div>
            <div class="ring-label">${ze(i,"label.days_until_year_end")}</div>
          </div>
        </div>
        <hr />
        <div class="stats">
          <div class="stat">
            <div class="stat-value">${ze(i,"card.attendance.semester",{n:m?1:2})}</div>
            <div class="stat-label">${ze(i,"label.current_semester")}</div>
          </div>
          <div class="stat">
            <div class="stat-value">${v}</div>
            <div class="stat-label">${ze(i,"label.days_until_semester_end")}</div>
          </div>
          <div class="stat">
            <div class="stat-value">${h}<span class="unit">%</span></div>
            <div class="stat-label">${ze(i,"label.year_progress")}</div>
          </div>
        </div>
      </ha-card>
    `}};vi.styles=[Ne,Me,n`
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
    `],e([pe()],vi.prototype,"_config",void 0),vi=e([ue("librus-school-year-card")],vi);const bi=new Set(["unknown","unavailable",""]);let _i=class extends Ae{static getConfigElement(){return document.createElement("librus-device-editor")}static getStubConfig(){return{type:"custom:librus-today-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 2}connectedCallback(){super.connectedCallback(),this._tickTimer=setInterval(()=>this.requestUpdate(),6e4)}disconnectedCallback(){super.disconnectedCallback(),clearInterval(this._tickTimer)}render(){if(!this._config||!this.hass)return V;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{map:t}=e,i=this.hass,s=e=>t[e]?i.states[t[e]]:void 0,a=s("lucky_number"),r=s("unread_messages"),n=s("unread_announcements"),o=s("timetable"),c=o?.attributes.message,d=o?.attributes.start_time,l="on"===o?.state;return K`
      <ha-card @click=${it(this,this._config.tap_action,t.timetable)}>
        <div class="header">
          <div class="icon-badge amber"><ha-icon icon="mdi:white-balance-sunny"></ha-icon></div>
          <div class="title-block">
            <div class="title">${ze(i,"card.today.title")}</div>
            <div class="subtitle">${(new Date).toLocaleDateString(i.language,{weekday:"long",day:"numeric",month:"long"})}</div>
          </div>
        </div>
        <div class="stats">
          ${a&&!bi.has(a.state)&&!1!==a.attributes.is_today?K`<div class="stat"><div class="stat-value">${a.state}</div><div class="stat-label">${ze(i,"stat.lucky_number")}</div></div>`:V}
          ${r&&!bi.has(r.state)?K`<div class="stat"><div class="stat-value">${r.state}</div><div class="stat-label">${ze(i,"card.messages.title")}</div></div>`:V}
          ${n&&!bi.has(n.state)?K`<div class="stat"><div class="stat-value">${n.state}</div><div class="stat-label">${ze(i,"card.announcements.title")}</div></div>`:V}
        </div>
        ${c&&d?K`
              <hr />
              <div class="list-item">
                <span class="dot ${l?"good":"neutral"}"></span>
                <div class="body">
                  <div class="row1">${c}</div>
                  ${l?V:K`<div class="item-text">${Ce(i,He(new Date(d.replace(" ","T")),new Date))}</div>`}
                </div>
              </div>
            `:V}
      </ha-card>
    `}};function fi(e){return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`}function yi(e){const t=new Date(e);for(t.setHours(0,0,0,0),t.setDate(t.getDate()+1);0===t.getDay()||6===t.getDay();)t.setDate(t.getDate()+1);return t}_i.styles=[Ne,Me],e([pe()],_i.prototype,"_config",void 0),_i=e([ue("librus-today-card")],_i);let wi=class extends Ae{constructor(){super(...arguments),this._lessons=[]}static getConfigElement(){return Ie()}static getStubConfig(){return{type:"custom:librus-tomorrow-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 3}connectedCallback(){super.connectedCallback(),this._refreshTimer=setInterval(()=>{this._fetch(!0)},18e5)}disconnectedCallback(){super.disconnectedCallback(),clearInterval(this._refreshTimer)}async _fetch(e=!1){if(!this.hass||!this._config)return;const t=this._resolveEntities();if("error"in t)return;const i=t.map.timetable;if(!i)return;const s=yi(new Date),a=new Date(s);a.setDate(a.getDate()+1);const r=`${i}:${fi(s)}`;if(e||this._fetchedFor!==r){this._fetchedFor=r;try{const e=await Zt(this.hass,i,s,a);this._lessons=e.filter(e=>!e.allDay).sort((e,t)=>e.start.localeCompare(t.start))}catch{this._lessons=[]}}}render(){if(!this._config||!this.hass)return V;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{map:t}=e,i=this.hass;this._fetch();const s=yi(new Date),a=fi(s),r=t.homework_assignments?i.states[t.homework_assignments]:void 0,n=(r?.attributes.recent??[]).filter(e=>(e.due_date??"").slice(0,10)===a),o=t.next_exam?i.states[t.next_exam]:void 0,c=(o?.attributes.upcoming??[]).filter(e=>e.date===a);if(0===this._lessons.length&&0===n.length&&0===c.length)return this._message("mdi:calendar-arrow-right",ze(i,"card.tomorrow.empty"));const d=this._lessons[0],l=this._lessons[this._lessons.length-1];return K`
      <ha-card>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:calendar-arrow-right"></ha-icon></div>
          <div class="title-block">
            <div class="title">${this._config.title??ze(i,"card.tomorrow.title")}</div>
            <div class="subtitle">
              ${s.toLocaleDateString(i.language,{weekday:"long",day:"numeric",month:"long"})}
            </div>
          </div>
        </div>
        ${this._lessons.length?K`
              <div class="stats">
                <div class="stat">
                  <div class="stat-value">${this._lessons.length}</div>
                  <div class="stat-label">${ze(i,"card.tomorrow.lessons")}</div>
                </div>
                <div class="stat">
                  <div class="stat-value">${Ue(d.start)}</div>
                  <div class="stat-label">${ze(i,"card.tomorrow.starts")}</div>
                </div>
                <div class="stat">
                  <div class="stat-value">${Ue(l.end)}</div>
                  <div class="stat-label">${ze(i,"card.tomorrow.ends")}</div>
                </div>
              </div>
            `:V}
        ${c.length||n.length?K`
              <div class="alerts">
                ${c.map(e=>K`
                    <div class="alert-row">
                      <span class="dot bad"></span>
                      <span>${e.category?`${e.category}: `:""}${e.subject??""}</span>
                    </div>
                  `)}
                ${n.length?K`
                      <div class="alert-row">
                        <span class="dot warn"></span>
                        <span>${ze(i,"card.tomorrow.homework",{n:n.length})}</span>
                      </div>
                    `:V}
              </div>
            `:V}
        ${this._lessons.length?K`
              <hr />
              <div class="scroll-list">
                ${this._lessons.map(e=>K`
                    <div class="list-item">
                      <span class="lt">${Ue(e.start)}</span>
                      <div class="body">
                        <div class="row1">${e.summary}</div>
                        ${e.location||e.description?K`<div class="item-text">${[e.location,e.description].filter(Boolean).join(" · ")}</div>`:V}
                      </div>
                    </div>
                  `)}
              </div>
            `:V}
      </ha-card>
    `}};wi.styles=[Ne,Me,n`
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
    `],e([pe()],wi.prototype,"_config",void 0),e([pe()],wi.prototype,"_lessons",void 0),wi=e([ue("librus-tomorrow-card")],wi);const xi=new Set(["unknown","unavailable",""]);let $i=class extends Ae{static getConfigElement(){return document.createElement("librus-device-editor")}static getStubConfig(){return{type:"custom:librus-week-summary-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 2}render(){if(!this._config||!this.hass)return V;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{deviceId:t,map:i}=e,s=this.hass,a=i.attendance?s.states[i.attendance]:void 0,r=i.behaviour_notices?s.states[i.behaviour_notices]:void 0,n=i.agenda?s.states[i.agenda]:void 0,o=new Date;o.setDate(o.getDate()-7);const c=o.toISOString().slice(0,10),d=we(s,t,"subject_average").filter(e=>{const t=s.states[e.entityId]?.attributes.latest_grade_date;return t&&t>=c}).length,l=n?.attributes.message;return K`
      <ha-card @click=${it(this,this._config.tap_action,i.overall_average)}>
        <div class="header">
          <div class="icon-badge"><ha-icon icon="mdi:calendar-check-outline"></ha-icon></div>
          <div class="title-block">
            <div class="title">${ze(s,"card.week_summary.title")}</div>
          </div>
        </div>
        <div class="stats">
          <div class="stat">
            <div class="stat-value">${d}</div>
            <div class="stat-label">${ze(s,"stat.new_grades")}</div>
          </div>
          ${a&&!xi.has(a.state)?(()=>{const e=a.attributes.unexcused_count??Number(a.state);return K`<div class="stat ${e>0?"bad":""}"><div class="stat-value">${e}</div><div class="stat-label">${ze(s,"stat.absences")}</div></div>`})():V}
          ${r&&!xi.has(r.state)?K`<div class="stat"><div class="stat-value">${r.state}</div><div class="stat-label">${ze(s,"card.behaviour_notices.title")}</div></div>`:V}
        </div>
        ${l?(()=>{const{category:e,text:t}=We(l);return K`
                <hr />
                <div class="list-item">
                  <span class="dot neutral"></span>
                  <div class="body">
                    ${e?K`<div class="cat-label-row"><span class="cat-label">${e}</span></div>`:V}
                    <div class="row1">${t}</div>
                    ${n?.attributes.start_time?K`<div class="item-text">${Fe(String(n.attributes.start_time),s.language)}</div>`:V}
                  </div>
                </div>
              `})():V}
      </ha-card>
    `}};$i.styles=[Ne,Me],e([pe()],$i.prototype,"_config",void 0),$i=e([ue("librus-week-summary-card")],$i);const ki=new Set(["unknown","unavailable",""]);let zi=class extends Ae{static getConfigElement(){return document.createElement("librus-device-editor")}static getStubConfig(){return{type:"custom:librus-lucky-number-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 2}render(){if(!this._config||!this.hass)return V;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{map:t}=e,i=this.hass,s=t.lucky_number?i.states[t.lucky_number]:void 0;if(!s||ki.has(s.state))return this._message("mdi:dice-5-outline",ze(i,"empty.generic_error"));const a=s.attributes.is_today,r=s.attributes.day,n=!1===a&&r?ze(i,"card.lucky_number.subtitle_for_date",{date:Fe(r,i.language)}):ze(i,"card.lucky_number.subtitle");return K`
      <ha-card
        class=${st(this._config.tap_action)?"":"static"}
        @click=${it(this,this._config.tap_action,t.lucky_number)}
      >
        <div class="header">
          <div class="icon-badge amber"><ha-icon icon="mdi:dice-5-outline"></ha-icon></div>
          <div class="title-block">
            <div class="title">${ze(i,"card.lucky_number.title")}</div>
            <div class="subtitle">${n}</div>
          </div>
        </div>
        <div class="number-wrap">
          <div class="number">${s.state}</div>
        </div>
      </ha-card>
    `}};zi.styles=[Ne,Me,n`
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
    `],e([pe()],zi.prototype,"_config",void 0),zi=e([ue("librus-lucky-number-card")],zi);const Ci=new Set(["unknown","unavailable",""]);let ji=class extends Ae{static getConfigElement(){return document.createElement("librus-device-editor")}static getStubConfig(){return{type:"custom:librus-student-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 3}render(){if(!this._config||!this.hass)return V;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{deviceId:t,map:i}=e,s=this.hass,a=s.devices?.[t]?.name_by_user||s.devices?.[t]?.name||"",r=i.school_class?s.states[i.school_class]?.state:void 0,n=[],o=i.attendance?s.states[i.attendance]:void 0,c=o?.attributes.total_records;if(o&&c){const e=Number(o.state)||0;n.push({key:"attendance",label:ze(s,"stat.attendance_score"),value:Math.round((c-e)/c*100),colorVar:"var(--lc-good)"})}const d=i.behaviour_notices?s.states[i.behaviour_notices]:void 0;d&&!Ci.has(d.state)&&n.push({key:"behaviour",label:ze(s,"stat.behaviour_score"),value:Math.max(0,100-10*Number(d.state)),colorVar:"var(--lc-brand)"});const l=i.overall_average?s.states[i.overall_average]:void 0;l&&!Ci.has(l.state)&&n.push({key:"grades",label:ze(s,"stat.grades_score"),value:Math.round(Number(l.state)/6*100),colorVar:"var(--lc-amber)"});const u=we(s,t,"subject_average");if(u.length){const e=u.filter(e=>{const t=s.states[e.entityId]?.attributes.grade_count;return t&&t>0}).length;n.push({key:"activity",label:ze(s,"stat.activity_score"),value:Math.round(e/u.length*100),colorVar:"var(--lc-brand)"})}if(0===n.length)return this._message("mdi:cards-outline",ze(s,"empty.generic_error"));const h=Math.round(n.reduce((e,t)=>e+t.value,0)/n.length);return K`
      <ha-card class="tcard" @click=${it(this,this._config.tap_action,i.overall_average)}>
        <div class="tcard-inner">
          <div class="tcard-head">
            <div>
              <div class="tcard-name">${a}</div>
              ${r?K`<div class="tcard-class">${r}</div>`:V}
            </div>
            <div class="tcard-rating">
              <div class="v">${h}</div>
              <div class="l">${ze(s,"stat.overall_rating")}</div>
            </div>
          </div>
          <div class="tcard-bars">
            ${n.map(e=>K`
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
    `}};ji.styles=[Ne,Me,n`
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
    `],e([pe()],ji.prototype,"_config",void 0),ji=e([ue("librus-student-card")],ji);const Si=new Set(["unknown","unavailable",""]);let Ei=class extends Ae{static getConfigElement(){return document.createElement("librus-device-editor")}static getStubConfig(){return{type:"custom:librus-streak-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 2}render(){if(!this._config||!this.hass)return V;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{map:t}=e,i=this.hass,s=ze(i,"label.days"),a=[],r=t.attendance_streak?i.states[t.attendance_streak]:void 0;if(r&&!Si.has(r.state))a.push({key:"attendance",label:ze(i,"card.streak.attendance"),value:Number(r.state),unit:s});else{const e=t.attendance?i.states[t.attendance]:void 0,r=e?.attributes.last_absence_date,n=t.school_class?i.states[t.school_class]?.attributes.school_year_start:void 0,o=r?new Date(`${r}T00:00:00`):n?new Date(`${n}T00:00:00`):void 0;o&&a.push({key:"attendance",label:ze(i,"card.streak.attendance"),value:Math.max(0,Re(o,new Date)),unit:s})}const n=t.behaviour_streak?i.states[t.behaviour_streak]:void 0;n&&!Si.has(n.state)&&a.push({key:"behaviour",label:ze(i,"card.streak.behaviour"),value:Number(n.state),unit:s});const o=t.good_grade_streak?i.states[t.good_grade_streak]:void 0;return o&&!Si.has(o.state)&&a.push({key:"grades",label:ze(i,"card.streak.grades"),value:Number(o.state)}),0===a.length?this._message("mdi:fire",ze(i,"empty.generic_error")):K`
      <ha-card
        class=${st(this._config.tap_action)?"":"static"}
        @click=${it(this,this._config.tap_action,t.attendance_streak??t.attendance)}
      >
        <div class="header">
          <div class="icon-badge amber"><ha-icon icon="mdi:fire"></ha-icon></div>
          <div class="title-block">
            <div class="title">${ze(i,"card.streak.title")}</div>
          </div>
        </div>
        <div class="stats">
          ${a.map(e=>K`
              <div class="stat">
                <div class="stat-value">${e.value}${e.unit?K`<span class="unit">${e.unit}</span>`:V}</div>
                <div class="stat-label">${e.label}</div>
              </div>
            `)}
        </div>
      </ha-card>
    `}};Ei.styles=[Ne,Me],e([pe()],Ei.prototype,"_config",void 0),Ei=e([ue("librus-streak-card")],Ei);const Di=new Set(["unknown","unavailable",""]),Ii=["bronze","silver","gold","diamond"],Ti={bronze:0,silver:3,gold:4,diamond:5},Ai={bronze:"var(--lc-bronze)",silver:"var(--lc-silver)",gold:"var(--lc-amber)",diamond:"var(--lc-diamond)"},Ni={bronze:"bronze",silver:"silver",gold:"amber",diamond:"diamond"},Mi={bronze:"mdi:medal-outline",silver:"mdi:trophy-outline",gold:"mdi:trophy",diamond:"mdi:diamond-stone"};let Li=class extends Ae{static getConfigElement(){return document.createElement("librus-device-editor")}static getStubConfig(){return{type:"custom:librus-rank-card"}}setConfig(e){this._config=e,this._configuredDeviceId=e.device_id}getCardSize(){return 2}render(){if(!this._config||!this.hass)return V;this._syncTheme();const e=this._resolveEntities();if("error"in e)return e.error;const{map:t}=e,i=this.hass,s=t.rank?i.states[t.rank]:void 0;if(!s||Di.has(s.state)||(a=s.state,!Ii.includes(a)))return this._message("mdi:trophy-outline",ze(i,"empty.generic_error"));var a;const r=s.state,n=s.attributes.average,o=s.attributes.points_to_next_tier,c=Ii.indexOf(r),d=Ii[c+1],l=Ti[r],u=d?Ti[d]:void 0,h=void 0!==n&&void 0!==u?(n-l)/(u-l)*100:100;return K`
      <ha-card @click=${it(this,this._config.tap_action,t.rank)}>
        <div class="header">
          <div class="icon-badge ${Ni[r]}">
            <ha-icon icon=${Mi[r]}></ha-icon>
          </div>
          <div class="title-block">
            <div class="title">${this._config.title??ze(i,"card.rank.title")}</div>
          </div>
        </div>
        <div class="ring-row">
          ${Oe(Math.round(h),Ai[r],68,7)}
          <div>
            <div class="ring-num" style="color:${Ai[r]}">${ze(i,`rank.${r}`)}</div>
            <div class="ring-label">${void 0!==n?n.toFixed(2):"—"}</div>
          </div>
        </div>
        <div class="hint">
          ${null!=o?K`${o.toFixed(2)} ${ze(i,"label.to_next_rank")}`:ze(i,"label.top_rank")}
        </div>
      </ha-card>
    `}};Li.styles=[Ne,Me,n`
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
    `],e([pe()],Li.prototype,"_config",void 0),Li=e([ue("librus-rank-card")],Li),window.customCards=window.customCards||[],window.customCards.push({type:"librus-grades-card",name:"Librus - Średnia ocen",description:"Średnia ogólna i średnie z każdego przedmiotu, z paskami porównawczymi.",preview:!0},{type:"librus-grade-log-card",name:"Librus - Dziennik ocen",description:"Wszystkie oceny ze wszystkich przedmiotów w jednej chronologicznej liście.",preview:!0},{type:"librus-subject-grades-card",name:"Librus - Oceny z przedmiotu",description:"Pełna lista ocen z JEDNEGO wybranego przedmiotu (wybór w konfiguracji karty).",preview:!0},{type:"librus-grade-trend-card",name:"Librus - Trend średniej",description:"Jak zmieniała się średnia (ogólna lub przedmiotu) w ostatnich 60 dniach.",preview:!0},{type:"librus-grade-goal-card",name:"Librus - Cel oceny",description:"Postęp do wybranej docelowej średniej (ogólnej lub z przedmiotu) + ile ocen brakuje.",preview:!0},{type:"librus-grade-simulator-card",name:"Librus - Symulator ocen",description:"A gdyby następna ocena to __ (waga __)? Zobacz, gdzie wylądowałaby średnia z przedmiotu.",preview:!0},{type:"librus-semester-comparison-card",name:"Librus - Porównanie semestrów",description:"Średnia z semestru 1 i 2 dla każdego przedmiotu obok siebie, ze zmianą.",preview:!0},{type:"librus-grade-distribution-card",name:"Librus - Rozkład ocen",description:"Histogram: ile było szóstek, piątek, czwórek itd. ze wszystkich przedmiotów.",preview:!0},{type:"librus-grades-radar-card",name:"Librus - Profil ocen (radar)",description:"Wykres pajęczynowy średnich wszystkich przedmiotów na jednym wykresie.",preview:!0},{type:"librus-grade-category-distribution-card",name:"Librus - Oceny wg kategorii",description:"Poziomy wykres słupkowy: ile ocen ze sprawdzianów, kartkówek, odpowiedzi itd.",preview:!0},{type:"librus-latest-grade-card",name:"Librus - Ostatnia ocena",description:"Najnowsza ocena ze wszystkich przedmiotów, wraz z komentarzem nauczyciela.",preview:!0},{type:"librus-behaviour-grade-card",name:"Librus - Ocena zachowania",description:"Formalna ocena zachowania, odrębna od uwag.",preview:!0},{type:"librus-descriptive-grades-card",name:"Librus - Oceny opisowe",description:"Oceny opisowe (nienumeryczne), jeśli szkoła je stosuje.",preview:!0},{type:"librus-subject-spotlight-card",name:"Librus - Najlepszy i najsłabszy przedmiot",description:"Dwa skrajne przedmioty wg średniej, obliczone z sensorów średnich per przedmiot.",preview:!0},{type:"librus-attendance-card",name:"Librus - Frekwencja",description:"Liczba realnych nieobecności i spóźnień, z rozbiciem na typy, % i podziałem na semestr.",preview:!0},{type:"librus-attendance-tile-card",name:"Librus - Frekwencja (kafelek)",description:"Kompaktowy kafelek z liczbą nieobecności i frekwencją %.",preview:!0},{type:"librus-attendance-heatmap-card",name:"Librus - Frekwencja (mapa roku)",description:"Mapa dni całego roku szkolnego kolorowana wg statusu frekwencji, w stylu GitHub contributions.",preview:!0},{type:"librus-attendance-weekday-card",name:"Librus - Nieobecności wg dnia tygodnia",description:"Słupek na każdy dzień tygodnia podzielony na usprawiedliwione/nieusprawiedliwione/spóźnienia.",preview:!0},{type:"librus-behaviour-notices-card",name:"Librus - Uwagi",description:"Lista uwag z kategorią i zabarwieniem (pozytywna/negatywna/neutralna).",preview:!0},{type:"librus-behaviour-notices-tile-card",name:"Librus - Uwagi (kafelek)",description:"Kompaktowy kafelek z liczbą uwag i ostatnią kategorią.",preview:!0},{type:"librus-messages-card",name:"Librus - Wiadomości",description:"Nieprzeczytane wiadomości ze wszystkich skrzynek i podgląd ostatnich z odebranych.",preview:!0},{type:"librus-messages-tile-card",name:"Librus - Wiadomości (kafelek)",description:"Kompaktowy kafelek z liczbą nieprzeczytanych i ostatnim nadawcą.",preview:!0},{type:"librus-substitutions-card",name:"Librus - Zastępstwa i alerty",description:"Pełna treść zastępstw i alertów - kliknij, by rozwinąć.",preview:!0},{type:"librus-announcements-card",name:"Librus - Ogłoszenia",description:"Nieprzeczytane ogłoszenia z tablicy szkolnej.",preview:!0},{type:"librus-announcements-tile-card",name:"Librus - Ogłoszenia (kafelek)",description:"Kompaktowy kafelek z liczbą nieprzeczytanych ogłoszeń.",preview:!0},{type:"librus-homework-assignments-card",name:"Librus - Zadania domowe",description:"Lista realnych zadań domowych z terminami.",preview:!0},{type:"librus-homework-checklist-card",name:"Librus - Zadania do odhaczenia",description:"Zadania domowe z polem wyboru - odhaczone lądują na dole (stan zapisany lokalnie w przeglądarce).",preview:!0},{type:"librus-recent-activity-card",name:"Librus - Co nowego",description:"Wspólny, chronologiczny feed najnowszych ocen, uwag, ogłoszeń i wiadomości.",preview:!0},{type:"librus-today-lessons-card",name:"Librus - Dzisiejszy plan lekcji",description:"Oś czasu dzisiejszych lekcji z podświetleniem aktualnej.",preview:!0},{type:"librus-next-lesson-tile-card",name:"Librus - Najbliższa lekcja",description:"Kompaktowy kafelek z najbliższą lub trwającą lekcją.",preview:!0},{type:"librus-agenda-card",name:"Librus - Terminarz",description:"Nadchodzące wydarzenia z terminarza, pogrupowane wg dnia.",preview:!0},{type:"librus-exam-countdown-card",name:"Librus - Najbliższy sprawdzian",description:"Odliczanie do najbliższego sprawdzianu z terminarza, wyodrębnione z ogólnej listy.",preview:!0},{type:"librus-free-days-card",name:"Librus - Dni wolne",description:"Odliczanie do najbliższej przerwy i lista kolejnych dni wolnych.",preview:!0},{type:"librus-free-days-tile-card",name:"Librus - Dni wolne (kafelek)",description:"Kompaktowy kafelek z odliczaniem do najbliższej przerwy.",preview:!0},{type:"librus-week-timetable-card",name:"Librus - Plan tygodniowy",description:"Siatka planu lekcji na cały tydzień.",preview:!0},{type:"librus-bell-schedule-card",name:"Librus - Plan dnia",description:"Rozkład dzwonków na dziś z podświetleniem bieżącej lekcji.",preview:!0},{type:"librus-subject-time-card",name:"Librus - Podział czasu lekcji",description:"Poziomy wykres słupkowy liczby lekcji w tygodniu na przedmiot, z planu lekcji.",preview:!0},{type:"librus-school-card",name:"Librus - Szkoła i klasa",description:"Nazwa i adres szkoły, klasa, wychowawca, terminy semestru.",preview:!0},{type:"librus-school-year-card",name:"Librus - Koniec roku szkolnego",description:"Odliczanie do końca roku szkolnego, pasek postępu roku i data końca semestru.",preview:!0},{type:"librus-today-card",name:"Librus - Dziś",description:"Szczęśliwy numerek, nieprzeczytane wiadomości/ogłoszenia i najbliższa lekcja w jednym miejscu.",preview:!0},{type:"librus-tomorrow-card",name:"Librus - Jutro",description:"Następny dzień nauki: lekcje, zadania na termin i sprawdziany (ogarnia weekend).",preview:!0},{type:"librus-week-summary-card",name:"Librus - Tydzień w skrócie",description:"Nowe oceny, nieobecności, uwagi i najbliższe wydarzenie w tym tygodniu.",preview:!0},{type:"librus-lucky-number-card",name:"Librus - Szczęśliwy numerek",description:"Dzisiejszy szczęśliwy numerek w dużym formacie.",preview:!0},{type:"librus-student-card",name:"Librus - Karta ucznia",description:"Zabawowa karta w stylu trading-card, licząca ogólną ocenę z frekwencji/zachowania/ocen/aktywności.",preview:!0},{type:"librus-streak-card",name:"Librus - Passy",description:"Trzy serie: bez nieobecności, bez uwag, dobrych ocen z rzędu.",preview:!0},{type:"librus-rank-card",name:"Librus - Ranga",description:"Brąz/Srebro/Złoto/Diament wg średniej ocen, z pierścieniem postępu do kolejnej rangi.",preview:!0}),console.info("%c LIBRUS-SYNERGIA-CARDS %c 46 cards loaded ","color: #fff; background: #4f46e5; font-weight: 700; border-radius: 3px 0 0 3px; padding: 2px 6px;","color: #4f46e5; background: transparent; font-weight: 500;");
