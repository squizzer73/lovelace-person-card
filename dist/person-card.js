var lt=Object.defineProperty;var ct=Object.getOwnPropertyDescriptor;var h=(s,r,e,t)=>{for(var o=t>1?void 0:t?ct(r,e):r,i=s.length-1,a;i>=0;i--)(a=s[i])&&(o=(t?a(r,e,o):a(o))||o);return t&&o&&lt(r,e,o),o};var pe=globalThis,he=pe.ShadowRoot&&(pe.ShadyCSS===void 0||pe.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,xe=Symbol(),Me=new WeakMap,J=class{constructor(r,e,t){if(this._$cssResult$=!0,t!==xe)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=r,this.t=e}get styleSheet(){let r=this.o,e=this.t;if(he&&r===void 0){let t=e!==void 0&&e.length===1;t&&(r=Me.get(e)),r===void 0&&((this.o=r=new CSSStyleSheet).replaceSync(this.cssText),t&&Me.set(e,r))}return r}toString(){return this.cssText}},Le=s=>new J(typeof s=="string"?s:s+"",void 0,xe),v=(s,...r)=>{let e=s.length===1?s[0]:r.reduce((t,o,i)=>t+(a=>{if(a._$cssResult$===!0)return a.cssText;if(typeof a=="number")return a;throw Error("Value passed to 'css' function must be a 'css' function result: "+a+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(o)+s[i+1],s[0]);return new J(e,s,xe)},He=(s,r)=>{if(he)s.adoptedStyleSheets=r.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of r){let t=document.createElement("style"),o=pe.litNonce;o!==void 0&&t.setAttribute("nonce",o),t.textContent=e.cssText,s.appendChild(t)}},_e=he?s=>s:s=>s instanceof CSSStyleSheet?(r=>{let e="";for(let t of r.cssRules)e+=t.cssText;return Le(e)})(s):s;var{is:dt,defineProperty:pt,getOwnPropertyDescriptor:ht,getOwnPropertyNames:gt,getOwnPropertySymbols:mt,getPrototypeOf:ut}=Object,T=globalThis,Re=T.trustedTypes,bt=Re?Re.emptyScript:"",ft=T.reactiveElementPolyfillSupport,Q=(s,r)=>s,ee={toAttribute(s,r){switch(r){case Boolean:s=s?bt:null;break;case Object:case Array:s=s==null?s:JSON.stringify(s)}return s},fromAttribute(s,r){let e=s;switch(r){case Boolean:e=s!==null;break;case Number:e=s===null?null:Number(s);break;case Object:case Array:try{e=JSON.parse(s)}catch{e=null}}return e}},ge=(s,r)=>!dt(s,r),Ne={attribute:!0,type:String,converter:ee,reflect:!1,useDefault:!1,hasChanged:ge};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),T.litPropertyMetadata??(T.litPropertyMetadata=new WeakMap);var C=class extends HTMLElement{static addInitializer(r){this._$Ei(),(this.l??(this.l=[])).push(r)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(r,e=Ne){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(r)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(r,e),!e.noAccessor){let t=Symbol(),o=this.getPropertyDescriptor(r,t,e);o!==void 0&&pt(this.prototype,r,o)}}static getPropertyDescriptor(r,e,t){let{get:o,set:i}=ht(this.prototype,r)??{get(){return this[e]},set(a){this[e]=a}};return{get:o,set(a){let c=o?.call(this);i?.call(this,a),this.requestUpdate(r,c,t)},configurable:!0,enumerable:!0}}static getPropertyOptions(r){return this.elementProperties.get(r)??Ne}static _$Ei(){if(this.hasOwnProperty(Q("elementProperties")))return;let r=ut(this);r.finalize(),r.l!==void 0&&(this.l=[...r.l]),this.elementProperties=new Map(r.elementProperties)}static finalize(){if(this.hasOwnProperty(Q("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(Q("properties"))){let e=this.properties,t=[...gt(e),...mt(e)];for(let o of t)this.createProperty(o,e[o])}let r=this[Symbol.metadata];if(r!==null){let e=litPropertyMetadata.get(r);if(e!==void 0)for(let[t,o]of e)this.elementProperties.set(t,o)}this._$Eh=new Map;for(let[e,t]of this.elementProperties){let o=this._$Eu(e,t);o!==void 0&&this._$Eh.set(o,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(r){let e=[];if(Array.isArray(r)){let t=new Set(r.flat(1/0).reverse());for(let o of t)e.unshift(_e(o))}else r!==void 0&&e.push(_e(r));return e}static _$Eu(r,e){let t=e.attribute;return t===!1?void 0:typeof t=="string"?t:typeof r=="string"?r.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(r=>this.enableUpdating=r),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(r=>r(this))}addController(r){(this._$EO??(this._$EO=new Set)).add(r),this.renderRoot!==void 0&&this.isConnected&&r.hostConnected?.()}removeController(r){this._$EO?.delete(r)}_$E_(){let r=new Map,e=this.constructor.elementProperties;for(let t of e.keys())this.hasOwnProperty(t)&&(r.set(t,this[t]),delete this[t]);r.size>0&&(this._$Ep=r)}createRenderRoot(){let r=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return He(r,this.constructor.elementStyles),r}connectedCallback(){this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),this._$EO?.forEach(r=>r.hostConnected?.())}enableUpdating(r){}disconnectedCallback(){this._$EO?.forEach(r=>r.hostDisconnected?.())}attributeChangedCallback(r,e,t){this._$AK(r,t)}_$ET(r,e){let t=this.constructor.elementProperties.get(r),o=this.constructor._$Eu(r,t);if(o!==void 0&&t.reflect===!0){let i=(t.converter?.toAttribute!==void 0?t.converter:ee).toAttribute(e,t.type);this._$Em=r,i==null?this.removeAttribute(o):this.setAttribute(o,i),this._$Em=null}}_$AK(r,e){let t=this.constructor,o=t._$Eh.get(r);if(o!==void 0&&this._$Em!==o){let i=t.getPropertyOptions(o),a=typeof i.converter=="function"?{fromAttribute:i.converter}:i.converter?.fromAttribute!==void 0?i.converter:ee;this._$Em=o;let c=a.fromAttribute(e,i.type);this[o]=c??this._$Ej?.get(o)??c,this._$Em=null}}requestUpdate(r,e,t,o=!1,i){if(r!==void 0){let a=this.constructor;if(o===!1&&(i=this[r]),t??(t=a.getPropertyOptions(r)),!((t.hasChanged??ge)(i,e)||t.useDefault&&t.reflect&&i===this._$Ej?.get(r)&&!this.hasAttribute(a._$Eu(r,t))))return;this.C(r,e,t)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(r,e,{useDefault:t,reflect:o,wrapped:i},a){t&&!(this._$Ej??(this._$Ej=new Map)).has(r)&&(this._$Ej.set(r,a??e??this[r]),i!==!0||a!==void 0)||(this._$AL.has(r)||(this.hasUpdated||t||(e=void 0),this._$AL.set(r,e)),o===!0&&this._$Em!==r&&(this._$Eq??(this._$Eq=new Set)).add(r))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let r=this.scheduleUpdate();return r!=null&&await r,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(let[o,i]of this._$Ep)this[o]=i;this._$Ep=void 0}let t=this.constructor.elementProperties;if(t.size>0)for(let[o,i]of t){let{wrapped:a}=i,c=this[o];a!==!0||this._$AL.has(o)||c===void 0||this.C(o,void 0,i,c)}}let r=!1,e=this._$AL;try{r=this.shouldUpdate(e),r?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(t){throw r=!1,this._$EM(),t}r&&this._$AE(e)}willUpdate(r){}_$AE(r){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(r)),this.updated(r)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(r){return!0}update(r){this._$Eq&&(this._$Eq=this._$Eq.forEach(e=>this._$ET(e,this[e]))),this._$EM()}updated(r){}firstUpdated(r){}};C.elementStyles=[],C.shadowRootOptions={mode:"open"},C[Q("elementProperties")]=new Map,C[Q("finalized")]=new Map,ft?.({ReactiveElement:C}),(T.reactiveElementVersions??(T.reactiveElementVersions=[])).push("2.1.2");var re=globalThis,Ie=s=>s,me=re.trustedTypes,De=me?me.createPolicy("lit-html",{createHTML:s=>s}):void 0,Fe="$lit$",A=`lit$${Math.random().toFixed(9).slice(2)}$`,qe="?"+A,vt=`<${qe}>`,B=document,oe=()=>B.createComment(""),ie=s=>s===null||typeof s!="object"&&typeof s!="function",Ee=Array.isArray,yt=s=>Ee(s)||typeof s?.[Symbol.iterator]=="function",we=`[ 	
\f\r]`,te=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Oe=/-->/g,Ue=/>/g,U=RegExp(`>|${we}(?:([^\\s"'>=/]+)(${we}*=${we}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Ze=/'/g,Be=/"/g,Ve=/^(?:script|style|textarea|title)$/i,Te=s=>(r,...e)=>({_$litType$:s,strings:r,values:e}),n=Te(1),Dt=Te(2),Ot=Te(3),S=Symbol.for("lit-noChange"),_=Symbol.for("lit-nothing"),je=new WeakMap,Z=B.createTreeWalker(B,129);function Ge(s,r){if(!Ee(s)||!s.hasOwnProperty("raw"))throw Error("invalid template strings array");return De!==void 0?De.createHTML(r):r}var xt=(s,r)=>{let e=s.length-1,t=[],o,i=r===2?"<svg>":r===3?"<math>":"",a=te;for(let c=0;c<e;c++){let l=s[c],d,p,g=-1,u=0;for(;u<l.length&&(a.lastIndex=u,p=a.exec(l),p!==null);)u=a.lastIndex,a===te?p[1]==="!--"?a=Oe:p[1]!==void 0?a=Ue:p[2]!==void 0?(Ve.test(p[2])&&(o=RegExp("</"+p[2],"g")),a=U):p[3]!==void 0&&(a=U):a===U?p[0]===">"?(a=o??te,g=-1):p[1]===void 0?g=-2:(g=a.lastIndex-p[2].length,d=p[1],a=p[3]===void 0?U:p[3]==='"'?Be:Ze):a===Be||a===Ze?a=U:a===Oe||a===Ue?a=te:(a=U,o=void 0);let x=a===U&&s[c+1].startsWith("/>")?" ":"";i+=a===te?l+vt:g>=0?(t.push(d),l.slice(0,g)+Fe+l.slice(g)+A+x):l+A+(g===-2?c:x)}return[Ge(s,i+(s[e]||"<?>")+(r===2?"</svg>":r===3?"</math>":"")),t]},ae=class s{constructor({strings:r,_$litType$:e},t){let o;this.parts=[];let i=0,a=0,c=r.length-1,l=this.parts,[d,p]=xt(r,e);if(this.el=s.createElement(d,t),Z.currentNode=this.el.content,e===2||e===3){let g=this.el.content.firstChild;g.replaceWith(...g.childNodes)}for(;(o=Z.nextNode())!==null&&l.length<c;){if(o.nodeType===1){if(o.hasAttributes())for(let g of o.getAttributeNames())if(g.endsWith(Fe)){let u=p[a++],x=o.getAttribute(g).split(A),f=/([.?@])?(.*)/.exec(u);l.push({type:1,index:i,name:f[2],strings:x,ctor:f[1]==="."?ke:f[1]==="?"?Ce:f[1]==="@"?Se:K}),o.removeAttribute(g)}else g.startsWith(A)&&(l.push({type:6,index:i}),o.removeAttribute(g));if(Ve.test(o.tagName)){let g=o.textContent.split(A),u=g.length-1;if(u>0){o.textContent=me?me.emptyScript:"";for(let x=0;x<u;x++)o.append(g[x],oe()),Z.nextNode(),l.push({type:2,index:++i});o.append(g[u],oe())}}}else if(o.nodeType===8)if(o.data===qe)l.push({type:2,index:i});else{let g=-1;for(;(g=o.data.indexOf(A,g+1))!==-1;)l.push({type:7,index:i}),g+=A.length-1}i++}}static createElement(r,e){let t=B.createElement("template");return t.innerHTML=r,t}};function W(s,r,e=s,t){if(r===S)return r;let o=t!==void 0?e._$Co?.[t]:e._$Cl,i=ie(r)?void 0:r._$litDirective$;return o?.constructor!==i&&(o?._$AO?.(!1),i===void 0?o=void 0:(o=new i(s),o._$AT(s,e,t)),t!==void 0?(e._$Co??(e._$Co=[]))[t]=o:e._$Cl=o),o!==void 0&&(r=W(s,o._$AS(s,r.values),o,t)),r}var $e=class{constructor(r,e){this._$AV=[],this._$AN=void 0,this._$AD=r,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(r){let{el:{content:e},parts:t}=this._$AD,o=(r?.creationScope??B).importNode(e,!0);Z.currentNode=o;let i=Z.nextNode(),a=0,c=0,l=t[0];for(;l!==void 0;){if(a===l.index){let d;l.type===2?d=new se(i,i.nextSibling,this,r):l.type===1?d=new l.ctor(i,l.name,l.strings,this,r):l.type===6&&(d=new ze(i,this,r)),this._$AV.push(d),l=t[++c]}a!==l?.index&&(i=Z.nextNode(),a++)}return Z.currentNode=B,o}p(r){let e=0;for(let t of this._$AV)t!==void 0&&(t.strings!==void 0?(t._$AI(r,t,e),e+=t.strings.length-2):t._$AI(r[e])),e++}},se=class s{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(r,e,t,o){this.type=2,this._$AH=_,this._$AN=void 0,this._$AA=r,this._$AB=e,this._$AM=t,this.options=o,this._$Cv=o?.isConnected??!0}get parentNode(){let r=this._$AA.parentNode,e=this._$AM;return e!==void 0&&r?.nodeType===11&&(r=e.parentNode),r}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(r,e=this){r=W(this,r,e),ie(r)?r===_||r==null||r===""?(this._$AH!==_&&this._$AR(),this._$AH=_):r!==this._$AH&&r!==S&&this._(r):r._$litType$!==void 0?this.$(r):r.nodeType!==void 0?this.T(r):yt(r)?this.k(r):this._(r)}O(r){return this._$AA.parentNode.insertBefore(r,this._$AB)}T(r){this._$AH!==r&&(this._$AR(),this._$AH=this.O(r))}_(r){this._$AH!==_&&ie(this._$AH)?this._$AA.nextSibling.data=r:this.T(B.createTextNode(r)),this._$AH=r}$(r){let{values:e,_$litType$:t}=r,o=typeof t=="number"?this._$AC(r):(t.el===void 0&&(t.el=ae.createElement(Ge(t.h,t.h[0]),this.options)),t);if(this._$AH?._$AD===o)this._$AH.p(e);else{let i=new $e(o,this),a=i.u(this.options);i.p(e),this.T(a),this._$AH=i}}_$AC(r){let e=je.get(r.strings);return e===void 0&&je.set(r.strings,e=new ae(r)),e}k(r){Ee(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,t,o=0;for(let i of r)o===e.length?e.push(t=new s(this.O(oe()),this.O(oe()),this,this.options)):t=e[o],t._$AI(i),o++;o<e.length&&(this._$AR(t&&t._$AB.nextSibling,o),e.length=o)}_$AR(r=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);r!==this._$AB;){let t=Ie(r).nextSibling;Ie(r).remove(),r=t}}setConnected(r){this._$AM===void 0&&(this._$Cv=r,this._$AP?.(r))}},K=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(r,e,t,o,i){this.type=1,this._$AH=_,this._$AN=void 0,this.element=r,this.name=e,this._$AM=o,this.options=i,t.length>2||t[0]!==""||t[1]!==""?(this._$AH=Array(t.length-1).fill(new String),this.strings=t):this._$AH=_}_$AI(r,e=this,t,o){let i=this.strings,a=!1;if(i===void 0)r=W(this,r,e,0),a=!ie(r)||r!==this._$AH&&r!==S,a&&(this._$AH=r);else{let c=r,l,d;for(r=i[0],l=0;l<i.length-1;l++)d=W(this,c[t+l],e,l),d===S&&(d=this._$AH[l]),a||(a=!ie(d)||d!==this._$AH[l]),d===_?r=_:r!==_&&(r+=(d??"")+i[l+1]),this._$AH[l]=d}a&&!o&&this.j(r)}j(r){r===_?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,r??"")}},ke=class extends K{constructor(){super(...arguments),this.type=3}j(r){this.element[this.name]=r===_?void 0:r}},Ce=class extends K{constructor(){super(...arguments),this.type=4}j(r){this.element.toggleAttribute(this.name,!!r&&r!==_)}},Se=class extends K{constructor(r,e,t,o,i){super(r,e,t,o,i),this.type=5}_$AI(r,e=this){if((r=W(this,r,e,0)??_)===S)return;let t=this._$AH,o=r===_&&t!==_||r.capture!==t.capture||r.once!==t.once||r.passive!==t.passive,i=r!==_&&(t===_||o);o&&this.element.removeEventListener(this.name,this,t),i&&this.element.addEventListener(this.name,this,r),this._$AH=r}handleEvent(r){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,r):this._$AH.handleEvent(r)}},ze=class{constructor(r,e,t){this.element=r,this.type=6,this._$AN=void 0,this._$AM=e,this.options=t}get _$AU(){return this._$AM._$AU}_$AI(r){W(this,r)}};var _t=re.litHtmlPolyfillSupport;_t?.(ae,se),(re.litHtmlVersions??(re.litHtmlVersions=[])).push("3.3.2");var We=(s,r,e)=>{let t=e?.renderBefore??r,o=t._$litPart$;if(o===void 0){let i=e?.renderBefore??null;t._$litPart$=o=new se(r.insertBefore(oe(),i),i,void 0,e??{})}return o._$AI(s),o};var ne=globalThis,b=class extends C{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e;let r=super.createRenderRoot();return(e=this.renderOptions).renderBefore??(e.renderBefore=r.firstChild),r}update(r){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(r),this._$Do=We(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return S}};b._$litElement$=!0,b.finalized=!0,ne.litElementHydrateSupport?.({LitElement:b});var wt=ne.litElementPolyfillSupport;wt?.({LitElement:b});(ne.litElementVersions??(ne.litElementVersions=[])).push("4.2.2");var y=s=>(r,e)=>{e!==void 0?e.addInitializer(()=>{customElements.define(s,r)}):customElements.define(s,r)};var $t={attribute:!0,type:String,converter:ee,reflect:!1,hasChanged:ge},kt=(s=$t,r,e)=>{let{kind:t,metadata:o}=e,i=globalThis.litPropertyMetadata.get(o);if(i===void 0&&globalThis.litPropertyMetadata.set(o,i=new Map),t==="setter"&&((s=Object.create(s)).wrapped=!0),i.set(e.name,s),t==="accessor"){let{name:a}=e;return{set(c){let l=r.get.call(this);r.set.call(this,c),this.requestUpdate(a,l,s,!0,c)},init(c){return c!==void 0&&this.C(a,void 0,s,c),c}}}if(t==="setter"){let{name:a}=e;return function(c){let l=this[a];r.call(this,c),this.requestUpdate(a,l,s,!0,c)}}throw Error("Unsupported decorator location: "+t)};function m(s){return(r,e)=>typeof e=="object"?kt(s,r,e):((t,o,i)=>{let a=o.hasOwnProperty(i);return o.constructor.createProperty(i,t),a?Object.getOwnPropertyDescriptor(o,i):void 0})(s,r,e)}function w(s){return m({...s,state:!0,attribute:!1})}var Ke=v`
  :host {
    display: block;
    font-family: var(--person-card-font-family, 'Segoe UI', system-ui, sans-serif);
    border-radius: var(--person-card-border-radius, 16px);
    overflow: hidden;
    position: relative;
    background: var(--pc-background, #1c1c2e);
    color: #ffffff;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.4);
    transition: background 0.4s ease, border-color 0.4s ease, box-shadow 0.3s ease;
    border: var(--pc-border-width, 0px) solid var(--pc-border-color, transparent);
  }

  .card-background {
    position: absolute;
    inset: 0;
    background-image: var(--pc-background-image, none);
    background-size: cover;
    background-position: center;
    opacity: 0.25;
    pointer-events: none;
    border-radius: inherit;
  }

  .card-content {
    position: relative;
    z-index: 1;
    padding: 16px;
  }

  :host([size-tier='small']) .card-content {
    padding: 10px 12px;
  }

  .header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 10px;
  }

  .avatar-wrapper {
    position: relative;
    flex-shrink: 0;
  }

  .stale-indicator {
    position: absolute;
    bottom: -2px;
    right: -2px;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #555;
    border: 2px solid var(--pc-background, #1c1c2e);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .stale-indicator ha-icon {
    --mdc-icon-size: 10px;
    color: rgba(255,255,255,0.7);
  }

  .avatar.stale { opacity: 0.55; filter: grayscale(60%); }
  .avatar-placeholder.stale { opacity: 0.55; filter: grayscale(60%); }

  .avatar {
    width: var(--person-card-avatar-size, 48px);
    height: var(--person-card-avatar-size, 48px);
    border-radius: 50%;
    object-fit: cover;
    background: #2d2d50;
    border: 2px solid rgba(255,255,255,0.15);
  }

  :host([size-tier='small']) .avatar {
    width: 36px;
    height: 36px;
  }

  :host([size-tier='large']) .avatar {
    width: 64px;
    height: 64px;
  }

  :host([size-tier='small']) .avatar-placeholder {
    width: 36px;
    height: 36px;
  }

  :host([size-tier='large']) .avatar-placeholder {
    width: 64px;
    height: 64px;
  }

  .avatar-placeholder {
    width: var(--person-card-avatar-size, 48px);
    height: var(--person-card-avatar-size, 48px);
    border-radius: 50%;
    background: #2d2d50;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .avatar-placeholder ha-icon {
    --mdc-icon-size: 28px;
    color: rgba(255,255,255,0.5);
  }

  .name-zone {
    flex: 1;
    min-width: 0;
  }

  .name {
    font-size: 1.1rem;
    font-weight: 700;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    letter-spacing: 0.02em;
  }

  :host([size-tier='large']) .name {
    font-size: 1.3rem;
  }

  .divider {
    height: 1px;
    background: rgba(255,255,255,0.1);
    margin: 10px 0;
  }

  .devices {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .footer {
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    gap: 4px;
    font-size: 0.78rem;
    color: rgba(255,255,255,0.55);
  }

  /* ─── Hero tier ──────────────────────────────────────── */

  :host([size-tier='hero']) .card-content {
    padding: 28px 20px 22px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  :host([size-tier='hero']) .avatar-wrapper {
    margin-bottom: 14px;
  }

  :host([size-tier='hero']) .avatar,
  :host([size-tier='hero']) .avatar-placeholder {
    width: 120px;
    height: 120px;
    border: 3px solid rgba(255,255,255,0.2);
  }

  :host([size-tier='hero']) .avatar-placeholder ha-icon {
    --mdc-icon-size: 56px;
  }

  :host([size-tier='hero']) .name {
    font-size: 1.6rem;
    font-weight: 800;
    letter-spacing: 0.01em;
    margin-bottom: 6px;
  }

  :host([size-tier='hero']) .hero-zone {
    margin-bottom: 18px;
  }

  .hero-devices {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
    width: 100%;
  }

  .hero-device-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    background: rgba(255,255,255,0.07);
    border-radius: 10px;
    padding: 10px 14px;
    min-width: 68px;
  }

  .hero-device-icon ha-icon {
    --mdc-icon-size: 28px;
    color: rgba(255,255,255,0.85);
  }

  .hero-device-name {
    font-size: 0.68rem;
    color: rgba(255,255,255,0.55);
    white-space: nowrap;
    max-width: 80px;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .hero-battery-bar {
    width: 48px;
    height: 4px;
    background: rgba(255,255,255,0.15);
    border-radius: 2px;
    overflow: hidden;
  }

  .hero-battery-fill {
    height: 100%;
    border-radius: 2px;
    transition: width 0.3s ease;
  }

  .hero-battery-pct {
    font-size: 0.68rem;
    font-weight: 600;
  }

  .hero-connectivity {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    margin-top: 1px;
  }

  :host([size-tier='hero']) .footer {
    margin-top: 16px;
    flex-direction: row;
    justify-content: center;
  }

  /* ─── Stats tier ─────────────────────────────────────── */

  :host([size-tier='stats']) .card-background {
    opacity: 0.55;
  }

  :host([size-tier='stats']) .card-content {
    padding: 16px;
  }

  :host([size-tier='stats']) .avatar,
  :host([size-tier='stats']) .avatar-placeholder {
    width: 80px;
    height: 80px;
  }

  :host([size-tier='stats']) .avatar-placeholder ha-icon {
    --mdc-icon-size: 38px;
  }

  :host([size-tier='stats']) .name {
    font-size: 1.25rem;
  }

  .stats-since {
    font-size: 0.72rem;
    color: rgba(255,255,255,0.5);
    margin-top: 3px;
  }

  .stats-boxes {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
    margin: 12px 0;
  }

  .stats-box {
    background: rgba(0,0,0,0.3);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    border-radius: 10px;
    padding: 10px 14px;
    display: flex;
    flex-direction: column;
    gap: 3px;
  }

  .stats-box-label {
    font-size: 0.68rem;
    color: rgba(255,255,255,0.45);
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }

  .stats-box-value {
    font-size: 1.3rem;
    font-weight: 700;
    color: rgba(255,255,255,0.92);
  }

  :host([size-tier='stats']) .devices {
    background: rgba(0,0,0,0.25);
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);
    border-radius: 10px;
    padding: 8px;
  }

  /* ══════════════════════════════════════════════════
     CARD THEMES
     All blocks follow the same pattern:
     - :host([card-theme="X"]) sets structural chrome
     - Zone colours flow in via --pc-border-color (accent)
       and --pc-glow-color (rgba version for box-shadow)
     - Signature defaults are shown when no zone matched
  ══════════════════════════════════════════════════ */

  /* ── Glass ──────────────────────────────────────── */
  :host([card-theme="glass"]) {
    background: rgba(255, 255, 255, 0.10);
    backdrop-filter: blur(28px) saturate(180%) brightness(1.05);
    -webkit-backdrop-filter: blur(28px) saturate(180%) brightness(1.05);
    border: 1px solid rgba(255, 255, 255, 0.38);
    box-shadow:
      0 12px 40px rgba(0, 0, 0, 0.45),
      inset 0 1px 0 rgba(255, 255, 255, 0.35),
      inset 0 -1px 0 rgba(255, 255, 255, 0.08),
      inset 1px 0 0 rgba(255, 255, 255, 0.12),
      inset -1px 0 0 rgba(255, 255, 255, 0.12),
      0 0 0 1px rgba(255, 255, 255, 0.06);
    border-radius: var(--person-card-border-radius, 20px);
    color: rgba(255, 255, 255, 0.92);
  }
  :host([card-theme="glass"]) .avatar {
    border-color: rgba(255, 255, 255, 0.5);
    background: rgba(255, 255, 255, 0.15);
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.35);
  }
  :host([card-theme="glass"]) .avatar-placeholder {
    background: rgba(255, 255, 255, 0.12);
    border: 2px solid rgba(255, 255, 255, 0.45);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.3);
  }
  :host([card-theme="glass"]) .divider {
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.15), transparent);
  }
  :host([card-theme="glass"]) .stale-indicator {
    border-color: transparent;
    background: rgba(80, 80, 80, 0.5);
  }
  :host([card-theme="glass"]) .zone-label {
    color: rgba(255, 255, 255, 0.65);
  }

  /* ── Sci-Fi ─────────────────────────────────────── */
  :host([card-theme="scifi"]) {
    background: linear-gradient(160deg, #030f22 0%, #010810 100%);
    border: 1px solid var(--pc-border-color, #00c8f0);
    border-radius: 2px;
    box-shadow:
      0 0 0 1px rgba(0, 200, 240, 0.12),
      0 0 20px var(--pc-glow-color, rgba(0, 200, 240, 0.2)),
      0 0 50px var(--pc-glow-color, rgba(0, 200, 240, 0.08)),
      inset 0 0 40px rgba(0, 60, 100, 0.12);
    font-family: 'Courier New', 'Consolas', monospace;
  }
  /* TL + BR corner brackets */
  :host([card-theme="scifi"])::before {
    content: '';
    position: absolute;
    top: 5px;
    left: 5px;
    width: 20px;
    height: 20px;
    border-top: 2px solid var(--pc-border-color, #00c8f0);
    border-left: 2px solid var(--pc-border-color, #00c8f0);
    pointer-events: none;
    z-index: 10;
    filter: drop-shadow(0 0 4px var(--pc-glow-color, rgba(0, 200, 240, 0.8)));
  }
  /* TR + BL corner brackets */
  :host([card-theme="scifi"])::after {
    content: '';
    position: absolute;
    bottom: 5px;
    right: 5px;
    width: 20px;
    height: 20px;
    border-bottom: 2px solid var(--pc-border-color, #00c8f0);
    border-right: 2px solid var(--pc-border-color, #00c8f0);
    pointer-events: none;
    z-index: 10;
    filter: drop-shadow(0 0 4px var(--pc-glow-color, rgba(0, 200, 240, 0.8)));
  }
  :host([card-theme="scifi"]) .card-content::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      linear-gradient(160deg, rgba(0, 200, 240, 0.04) 0%, transparent 40%),
      repeating-linear-gradient(
        0deg,
        transparent,
        transparent 3px,
        rgba(0, 0, 0, 0.14) 3px,
        rgba(0, 0, 0, 0.14) 4px
      );
    pointer-events: none;
    z-index: 1;
    border-radius: inherit;
  }
  :host([card-theme="scifi"]) .avatar {
    border-radius: 2px;
    border-color: var(--pc-border-color, #00c8f0);
    background: #010d1e;
    box-shadow: 0 0 12px var(--pc-glow-color, rgba(0, 200, 240, 0.35)),
      inset 0 0 8px rgba(0, 200, 240, 0.05);
  }
  :host([card-theme="scifi"]) .avatar-placeholder {
    background: #010d1e;
    border-radius: 2px;
    border: 1px solid var(--pc-border-color, #00c8f0);
    box-shadow: 0 0 12px var(--pc-glow-color, rgba(0, 200, 240, 0.35));
  }
  :host([card-theme="scifi"]) .name {
    color: var(--pc-border-color, #00c8f0);
    letter-spacing: 0.1em;
    text-transform: uppercase;
    font-size: 0.85em;
    text-shadow: 0 0 8px var(--pc-glow-color, rgba(0, 200, 240, 0.8));
  }
  :host([card-theme="scifi"]) .zone-label {
    color: rgba(0, 200, 240, 0.5);
    letter-spacing: 0.08em;
  }
  :host([card-theme="scifi"]) .divider {
    background: linear-gradient(90deg, transparent, var(--pc-border-color, rgba(0, 200, 240, 0.3)), transparent);
  }
  :host([card-theme="scifi"]) .footer {
    color: rgba(0, 200, 240, 0.3);
    letter-spacing: 0.08em;
    font-size: 0.75em;
  }

  /* ── Steampunk ──────────────────────────────────── */
  :host([card-theme="steampunk"]) {
    background: linear-gradient(160deg, #1a0f00 0%, #0e0800 60%, #060400 100%);
    border: 3px solid var(--pc-border-color, #8a5a1e);
    border-radius: 3px;
    box-shadow:
      0 0 0 1px #2a1a08,
      0 0 0 5px #110a00,
      0 0 0 7px var(--pc-border-color, #6a4418),
      inset 0 0 30px rgba(150, 90, 20, 0.06),
      inset 0 1px 0 rgba(255, 200, 80, 0.08),
      0 8px 40px rgba(0, 0, 0, 0.7);
    font-family: Georgia, 'Times New Roman', serif;
    color: #d4a84b;
  }
  /* Rivet: top-left */
  :host([card-theme="steampunk"])::before {
    content: '';
    position: absolute;
    top: 7px;
    left: 7px;
    width: 11px;
    height: 11px;
    border-radius: 50%;
    background: radial-gradient(circle at 35% 35%, #d4922a, #5a3810);
    border: 1px solid #9a6a20;
    box-shadow: inset 0 1px 2px rgba(255, 220, 100, 0.3), 0 1px 3px rgba(0, 0, 0, 0.6);
    pointer-events: none;
    z-index: 10;
  }
  /* Rivet: bottom-right */
  :host([card-theme="steampunk"])::after {
    content: '';
    position: absolute;
    bottom: 7px;
    right: 7px;
    width: 11px;
    height: 11px;
    border-radius: 50%;
    background: radial-gradient(circle at 35% 35%, #d4922a, #5a3810);
    border: 1px solid #9a6a20;
    box-shadow: inset 0 1px 2px rgba(255, 220, 100, 0.3), 0 1px 3px rgba(0, 0, 0, 0.6);
    pointer-events: none;
    z-index: 10;
  }
  :host([card-theme="steampunk"]) .avatar {
    border-color: var(--pc-border-color, #a0682a);
    background: radial-gradient(circle, #1e1000, #0e0800);
    box-shadow: 0 0 12px var(--pc-glow-color, rgba(160, 104, 42, 0.35)),
      inset 0 1px 2px rgba(255, 200, 80, 0.08);
  }
  :host([card-theme="steampunk"]) .avatar-placeholder {
    background: radial-gradient(circle, #1e1000, #0e0800);
    border: 2px solid var(--pc-border-color, #a0682a);
    box-shadow: 0 0 12px var(--pc-glow-color, rgba(160, 104, 42, 0.35));
  }
  :host([card-theme="steampunk"]) .name {
    color: #e8c878;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
  }
  :host([card-theme="steampunk"]) .zone-label {
    color: rgba(200, 160, 80, 0.55);
  }
  :host([card-theme="steampunk"]) .divider {
    background: linear-gradient(90deg, transparent, var(--pc-border-color, rgba(160, 104, 42, 0.5)), transparent);
  }
  :host([card-theme="steampunk"]) .footer {
    color: rgba(160, 104, 42, 0.45);
    font-style: italic;
  }

  /* ── Terminal ───────────────────────────────────── */
  @keyframes pc-terminal-scroll {
    from { background-position: 0 0; }
    to   { background-position: 0 -120px; }
  }
  :host([card-theme="terminal"]) {
    background: #000;
    border: 1px solid var(--pc-border-color, #00ff41);
    border-radius: 0;
    box-shadow:
      0 0 8px var(--pc-glow-color, rgba(0, 255, 65, 0.35)),
      0 0 30px var(--pc-glow-color, rgba(0, 255, 65, 0.12)),
      inset 0 0 40px rgba(0, 20, 0, 0.6);
    font-family: 'Courier New', 'Consolas', monospace;
    color: var(--pc-border-color, #00ff41);
  }
  /* Scrolling code-line background */
  :host([card-theme="terminal"]) .card-content::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image:
      repeating-linear-gradient(
        0deg,
        rgba(0, 255, 65, 0.028) 0px,
        rgba(0, 255, 65, 0.028) 10px,
        transparent 10px,
        transparent 12px
      );
    background-size: 100% 12px;
    animation: pc-terminal-scroll 2.5s linear infinite;
    pointer-events: none;
    z-index: 1;
  }
  /* Scanlines + vignette overlay */
  :host([card-theme="terminal"]) .card-content::after {
    content: '';
    position: absolute;
    inset: 0;
    background:
      repeating-linear-gradient(
        0deg,
        transparent,
        transparent 3px,
        rgba(0, 0, 0, 0.18) 3px,
        rgba(0, 0, 0, 0.18) 4px
      ),
      radial-gradient(ellipse at center, transparent 45%, rgba(0, 0, 0, 0.55) 100%);
    pointer-events: none;
    z-index: 2;
  }
  :host([card-theme="terminal"]) .avatar {
    border-radius: 0;
    border-color: var(--pc-border-color, #00ff41);
    background: #001500;
    box-shadow: 0 0 10px var(--pc-glow-color, rgba(0, 255, 65, 0.3)),
      inset 0 0 6px rgba(0, 255, 65, 0.05);
  }
  :host([card-theme="terminal"]) .avatar-placeholder {
    background: #001500;
    border-radius: 0;
    border: 1px solid var(--pc-border-color, #00ff41);
    box-shadow: 0 0 10px var(--pc-glow-color, rgba(0, 255, 65, 0.3));
  }
  :host([card-theme="terminal"]) .name {
    color: var(--pc-border-color, #00ff41);
    letter-spacing: 0.08em;
    text-shadow: 0 0 8px var(--pc-glow-color, rgba(0, 255, 65, 0.7));
  }
  :host([card-theme="terminal"]) .zone-label {
    color: rgba(0, 255, 65, 0.45);
  }
  :host([card-theme="terminal"]) .divider {
    background: linear-gradient(90deg, transparent, var(--pc-border-color, rgba(0, 255, 65, 0.25)), transparent);
  }
  :host([card-theme="terminal"]) .footer {
    color: rgba(0, 255, 65, 0.3);
    letter-spacing: 0.08em;
  }

  /* ── Neon Noir ──────────────────────────────────── */
  :host([card-theme="neon"]) {
    background: linear-gradient(160deg, #0a0018 0%, #060010 100%);
    border: 2px solid var(--pc-border-color, #e000ff);
    border-radius: 14px;
    box-shadow:
      0 0 6px var(--pc-border-color, #e000ff),
      0 0 20px var(--pc-glow-color, rgba(224, 0, 255, 0.45)),
      0 0 60px var(--pc-glow-color, rgba(224, 0, 255, 0.18)),
      inset 0 0 20px rgba(200, 0, 255, 0.04);
  }
  /* Top neon tube streak */
  :host([card-theme="neon"])::before {
    content: '';
    position: absolute;
    top: -2px;
    left: 12%;
    right: 12%;
    height: 2px;
    background: var(--pc-border-color, #e000ff);
    box-shadow:
      0 0 6px 1px var(--pc-border-color, #e000ff),
      0 0 18px 4px var(--pc-glow-color, rgba(224, 0, 255, 0.6));
    border-radius: 2px;
    pointer-events: none;
    z-index: 2;
  }
  /* Bottom neon tube streak */
  :host([card-theme="neon"])::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 12%;
    right: 12%;
    height: 2px;
    background: var(--pc-border-color, #e000ff);
    box-shadow:
      0 0 6px 1px var(--pc-border-color, #e000ff),
      0 0 18px 4px var(--pc-glow-color, rgba(224, 0, 255, 0.6));
    border-radius: 2px;
    pointer-events: none;
    z-index: 2;
  }
  :host([card-theme="neon"]) .avatar {
    border-color: var(--pc-border-color, #e000ff);
    background: linear-gradient(135deg, #2a0050, #580078);
    box-shadow:
      0 0 14px var(--pc-glow-color, rgba(224, 0, 255, 0.5)),
      inset 0 0 10px rgba(200, 0, 255, 0.08);
  }
  :host([card-theme="neon"]) .avatar-placeholder {
    background: linear-gradient(135deg, #2a0050, #580078);
    border: 2px solid var(--pc-border-color, #e000ff);
    box-shadow: 0 0 14px var(--pc-glow-color, rgba(224, 0, 255, 0.5));
  }
  :host([card-theme="neon"]) .name {
    color: #fff;
    font-weight: 700;
    text-shadow:
      0 0 8px var(--pc-border-color, #e000ff),
      0 0 20px var(--pc-glow-color, rgba(224, 0, 255, 0.5));
  }
  :host([card-theme="neon"]) .zone-label {
    color: rgba(224, 0, 255, 0.45);
  }
  :host([card-theme="neon"]) .divider {
    background: linear-gradient(90deg, transparent, var(--pc-border-color, rgba(224, 0, 255, 0.3)), transparent);
    box-shadow: 0 0 6px var(--pc-glow-color, rgba(224, 0, 255, 0.2));
  }
  :host([card-theme="neon"]) .footer {
    color: rgba(224, 0, 255, 0.35);
  }
`;function Ye(s,r){let e=r.states[s.entity];if(!e)return!1;let t=s.attribute!=null?e.attributes[s.attribute]:e.state,o=String(t??""),i=String(s.value),a=parseFloat(o),c=parseFloat(i),l=!isNaN(a)&&!isNaN(c);switch(s.operator){case"eq":return o===i;case"neq":return o!==i;case"lt":return l&&a<c;case"gt":return l&&a>c;case"lte":return l&&a<=c;case"gte":return l&&a>=c;case"contains":return o.includes(i);default:return!1}}function le(s,r){let e={};for(let t of s){if(t.conditions.length===0)continue;(t.operator==="or"?t.conditions.some(i=>Ye(i,r)):t.conditions.every(i=>Ye(i,r)))&&(e={...e,...t.effect})}return e}function ce(s){if(!s)return"\u2014";let r=Date.now()-new Date(s).getTime();if(r<0)return"\u2014";let e=Math.floor(r/6e4);if(e<1)return"< 1m";if(e<60)return`${e}m`;let t=Math.floor(e/60),o=e%60;if(t<24)return o>0?`${t}h ${o}m`:`${t}h`;let i=Math.floor(t/24),a=t%24;return a>0?`${i}d ${a}h`:`${i}d`}function Ae(s,r){let e=new Date(s);if(isNaN(e.getTime()))return"unknown";if(r==="absolute")return e.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit",hour12:!1});let t=Date.now()-e.getTime(),o=Math.floor(t/6e4);if(o<1)return"just now";if(o<60)return`${o} min ago`;let i=Math.floor(o/60);return i<24?`${i}h ago`:`${Math.floor(i/24)}d ago`}function j(s,r){if(r.battery_entity){let i=s.states[r.battery_entity];if(!i)return null;let a=parseFloat(i.state);return isNaN(a)?null:a}let e=s.states[r.entity];if(!e)return null;let t=e.attributes.battery_level;if(t==null)return null;let o=parseFloat(String(t));return isNaN(o)?null:o}function de(s,r){if(r.connectivity_entity){let t=s.states[r.connectivity_entity];return t?t.state==="on"?"online":"offline":"unknown"}let e=s.states[r.entity];return e?e.state==="home"||e.state==="online"?"online":e.state==="not_home"||e.state==="offline"?"offline":"unknown":"unknown"}function be(s,r,e){let t=s.states[e];if(!t||t.state==="unknown")return!0;for(let o of r){let i=j(s,o),a=o.battery_threshold??20;if(i!==null&&i<=a||de(s,o)==="offline")return!0}return!1}function fe(s,r=20){return s<=r?"#f44336":s<50?"#ff9800":"#4caf50"}function Xe(s){if(s.eta_entity)return s;let r=s.devices?.find(e=>e.name==="__eta__");return r?{...s,eta_entity:r.entity,devices:s.devices?.filter(e=>e.name!=="__eta__")}:s}var F="person-card-theme-updated";function Je(s){(typeof window<"u"?window:globalThis).personCardTheme={zoneStyles:s},typeof window<"u"&&window.dispatchEvent(new CustomEvent(F))}function Ct(){return(typeof window<"u"?window:globalThis).personCardTheme}function P(s){let r=Ct()?.zoneStyles??[];if(s.length===0)return r;let e=new Map(r.map(t=>[t.zone,t]));return s.map(t=>{if(t.border_color&&t.background_color)return t;let o=e.get(t.zone);return o?{...o,...t,border_color:t.border_color??o.border_color,background_color:t.background_color??o.background_color}:t})}function Qe(s){return s.toLowerCase().replace(/[\s-]+/g,"_").replace(/[^a-z0-9_]/g,"")}function M(s,r){let e=r.find(o=>o.zone===s);if(e)return e;let t=Qe(s);return r.find(o=>Qe(o.zone)===t)}function Pe(s,r,e=""){let t=M(s,r);return t?.label?t.label:s==="not_home"?e||"Away":s==="unknown"?"Unknown":s.replace(/_/g," ")}function et(s,r,e=!1){let t=M(s,r);return t?.icon?t.icon:s==="home"?"mdi:home":s==="not_home"?e?"mdi:map-marker":"mdi:map-marker-off":s==="unknown"?"mdi:help-circle":"mdi:map-marker"}function ve(s,r){let e=s.replace("#",""),t=e.length===3?e.split("").map(c=>c+c).join(""):e,o=parseInt(t.slice(0,2),16),i=parseInt(t.slice(2,4),16),a=parseInt(t.slice(4,6),16);return isNaN(o)||isNaN(i)||isNaN(a)?`rgba(0, 0, 0, ${r})`:`rgba(${o}, ${i}, ${a}, ${r})`}var L=class extends b{constructor(){super(...arguments);this.zone="";this.zoneStyles=[];this.address=""}get zoneStyle(){return this.zoneStyles.find(e=>e.zone===this.zone)}get displayLabel(){let e=this.zoneStyle;return e?.label?e.label:this.zone==="not_home"?this.address||"Away":this.zone==="unknown"?"Unknown":this.zone.replace(/_/g," ")}get icon(){let e=this.zoneStyle;return e?.icon?e.icon:this.zone==="home"?"mdi:home":this.zone==="not_home"?this.address?"mdi:map-marker":"mdi:map-marker-off":this.zone==="unknown"?"mdi:help-circle":"mdi:map-marker"}render(){let e=this.displayLabel,t=this.zone==="not_home"&&!!this.address&&e.length>=20;return n`
      <ha-icon .icon=${this.icon}></ha-icon>
      ${t?n`
        <div class="label-ticker">
          <span class="ticker-inner">${e}&nbsp;&nbsp;&nbsp;&nbsp;${e}</span>
        </div>
      `:n`
        <span class="zone-label">${e}</span>
      `}
    `}};L.styles=v`
    :host {
      display: flex;
      align-items: center;
      gap: 4px;
      min-width: 0;
      overflow: hidden;
    }
    ha-icon {
      --mdc-icon-size: 16px;
      color: rgba(255,255,255,0.7);
      flex-shrink: 0;
    }
    .zone-label {
      font-size: 0.85rem;
      font-weight: 600;
      color: rgba(255,255,255,0.8);
      text-transform: capitalize;
      letter-spacing: 0.04em;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      min-width: 0;
    }
    /* Ticker for long addresses */
    .label-ticker {
      overflow: hidden;
      min-width: 0;
      flex: 1;
    }
    .ticker-inner {
      display: inline-block;
      white-space: nowrap;
      font-size: 0.85rem;
      font-weight: 600;
      color: rgba(255,255,255,0.8);
      letter-spacing: 0.04em;
      animation: ticker-scroll 14s linear infinite;
    }
    @keyframes ticker-scroll {
      0%, 12% { transform: translateX(0); }
      88%, 100% { transform: translateX(-50%); }
    }
  `,h([m()],L.prototype,"zone",2),h([m({type:Array})],L.prototype,"zoneStyles",2),h([m()],L.prototype,"address",2),L=h([y("person-card-location-badge")],L);var H=class extends b{constructor(){super(...arguments);this.showLabels=!1}batteryColor(e){return fe(e,this.device.battery_threshold??20)}render(){if(!this.hass||!this.device)return n``;let e=j(this.hass,this.device),t=de(this.hass,this.device),o=this.device.icon??"mdi:cellphone",i=this.device.name??this.device.entity.split(".")[1].replace(/_/g," ");return n`
      <ha-icon .icon=${o}></ha-icon>
      ${this.showLabels?n`<span class="name">${i}</span>`:""}
      ${e!==null?n`
        <div class="battery-bar-wrap">
          <div class="battery-bar-fill" style="width:${e}%;background:${this.batteryColor(e)}"></div>
        </div>
        <span class="battery-pct">${e}%</span>
      `:""}
      <div class="conn-dot ${t}"></div>
    `}};H.styles=v`
    :host { display: flex; align-items: center; gap: 8px; }

    ha-icon {
      --mdc-icon-size: 18px;
      color: rgba(255,255,255,0.7);
      flex-shrink: 0;
    }

    .name {
      font-size: 0.82rem;
      color: rgba(255,255,255,0.75);
      min-width: 60px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .battery-bar-wrap {
      flex: 1;
      height: 4px;
      background: rgba(255,255,255,0.1);
      border-radius: 2px;
      overflow: hidden;
    }

    .battery-bar-fill {
      height: 100%;
      border-radius: 2px;
      transition: width 0.3s ease, background 0.3s ease;
    }

    .battery-pct {
      font-size: 0.75rem;
      color: rgba(255,255,255,0.55);
      min-width: 30px;
      text-align: right;
    }

    .conn-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      flex-shrink: 0;
    }
    .conn-dot.online  { background: #4caf50; }
    .conn-dot.offline { background: rgba(255,255,255,0.2); }
    .conn-dot.unknown { background: #ff9800; }
  `,h([m({attribute:!1})],H.prototype,"hass",2),h([m({type:Object})],H.prototype,"device",2),h([m({type:Boolean})],H.prototype,"showLabels",2),H=h([y("person-card-device-tile")],H);var tt={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},rt=s=>(...r)=>({_$litDirective$:s,values:r}),ye=class{constructor(r){}get _$AU(){return this._$AM._$AU}_$AT(r,e,t){this._$Ct=r,this._$AM=e,this._$Ci=t}_$AS(r,e){return this.update(r,e)}update(r,e){return this.render(...e)}};var ot="important",St=" !"+ot,it=rt(class extends ye{constructor(s){if(super(s),s.type!==tt.ATTRIBUTE||s.name!=="style"||s.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(s){return Object.keys(s).reduce((r,e)=>{let t=s[e];return t==null?r:r+`${e=e.includes("-")?e:e.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${t};`},"")}update(s,[r]){let{style:e}=s.element;if(this.ft===void 0)return this.ft=new Set(Object.keys(r)),this.render(r);for(let t of this.ft)r[t]==null&&(this.ft.delete(t),t.includes("-")?e.removeProperty(t):e[t]=null);for(let t in r){let o=r[t];if(o!=null){this.ft.add(t);let i=typeof o=="string"&&o.endsWith(St);t.includes("-")||i?e.setProperty(t,i?o.slice(0,-11):o,i?ot:""):e[t]=o}}return S}});var q=class extends b{constructor(){super(...arguments);this.color="#f44336";this.icon="mdi:alert-circle"}render(){return n`
      <div class="badge" style=${it({"--badge-bg":this.color})}>
        <ha-icon .icon=${this.icon} style="color:#fff;--mdc-icon-size:14px"></ha-icon>
      </div>
    `}};q.styles=v`
    :host {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .badge {
      width: 22px;
      height: 22px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--badge-bg, #f44336);
      box-shadow: 0 0 8px var(--badge-bg, #f44336);
    }
  `,h([m()],q.prototype,"color",2),h([m()],q.prototype,"icon",2),q=h([y("person-card-notification-badge")],q);var R=class extends b{constructor(){super(...arguments);this.etaEntity="";this.personZone=""}render(){if(!this.etaEntity||this.personZone==="home")return n``;let e=this.hass.states[this.etaEntity];if(!e)return n``;let t=parseFloat(e.state);if(isNaN(t))return n``;let o=t<1?"arriving":`${Math.round(t)} min`;return n`
      <ha-icon .icon=${"mdi:clock-outline"}></ha-icon>
      <span>ETA home: ${o}</span>
    `}};R.styles=v`
    :host { display: flex; align-items: center; gap: 6px; font-size: 0.8rem; color: rgba(255,255,255,0.65); }
    ha-icon { --mdc-icon-size: 14px; }
  `,h([m({attribute:!1})],R.prototype,"hass",2),h([m()],R.prototype,"etaEntity",2),h([m()],R.prototype,"personZone",2),R=h([y("person-card-eta-display")],R);var N=class extends b{constructor(){super(...arguments);this.lastUpdated="";this.format="relative";this._tick=0}connectedCallback(){super.connectedCallback(),this.format==="relative"&&(this._interval=setInterval(()=>{this._tick++},6e4))}disconnectedCallback(){super.disconnectedCallback(),this._interval&&clearInterval(this._interval)}updated(e){e.has("format")&&(this._interval&&clearInterval(this._interval),this._interval=void 0,this.format==="relative"&&(this._interval=setInterval(()=>{this._tick++},6e4)))}render(){if(!this.lastUpdated)return n``;this._tick;let e=Ae(this.lastUpdated,this.format);return n`
      <ha-icon icon="mdi:clock-check-outline"></ha-icon>
      <span>Last seen: ${e}</span>
    `}};N.styles=v`
    :host { display: flex; align-items: center; gap: 6px; font-size: 0.78rem; color: rgba(255,255,255,0.45); }
    ha-icon { --mdc-icon-size: 13px; }
  `,h([m()],N.prototype,"lastUpdated",2),h([m()],N.prototype,"format",2),h([w()],N.prototype,"_tick",2),N=h([y("person-card-last-seen")],N);var k=[{name:"Midnight",bg:"#1c1c2e",border:"#4fc3f7"},{name:"Forest Walk",bg:"#1b2e1b",border:"#76c442"},{name:"Lava Flow",bg:"#2e1b1b",border:"#ff6d00"},{name:"Arctic Drift",bg:"#1a2332",border:"#80deea"},{name:"Twilight",bg:"#2e1b3c",border:"#ce93d8"},{name:"Emerald City",bg:"#1b2e28",border:"#ffd700"},{name:"Rose Gold",bg:"#2e1c24",border:"#f48fb1"},{name:"Neon Tokyo",bg:"#120d1f",border:"#e040fb"},{name:"Desert Night",bg:"#2e2416",border:"#ffb300"},{name:"Northern Lights",bg:"#0d1f1a",border:"#69f0ae"}];var V=class extends b{constructor(){super(...arguments);this.zoneStyles=[]}_fire(e){this.dispatchEvent(new CustomEvent("zone-styles-changed",{detail:{zoneStyles:e},bubbles:!0,composed:!0}))}_update(e,t){let o=[...this.zoneStyles];o[e]={...o[e],...t},this._fire(o)}_remove(e){let t=[...this.zoneStyles];t.splice(e,1),this._fire(t)}_add(){this._fire([...this.zoneStyles,{zone:""}])}_autoDetect(){if(!this.hass)return;let e=new Map(this.zoneStyles.map((a,c)=>[a.zone,c])),t=[...this.zoneStyles],o=0;t=t.map((a,c)=>{if(!a.border_color){let l=k[(c+o)%k.length];return o++,{...a,background_color:a.background_color??l.bg,border_color:l.border}}return a});let i=Object.entries(this.hass.states).filter(([a])=>a.startsWith("zone.")).map(([a,c])=>{let l=c.attributes.friendly_name??a.replace("zone.","");return{zone:a==="zone.home"?"home":l,label:l,icon:c.attributes.icon??"mdi:map-marker"}}).filter(a=>!e.has(a.zone));if(i.length>0){let a=t.length,c=i.map((l,d)=>{let p=k[(a+d)%k.length];return{...l,background_color:p.bg,border_color:p.border}});t=[...t,...c]}this._fire(t)}render(){return n`
      <button class="add-btn" style="margin-bottom:8px" @click=${()=>this._autoDetect()}>
        <ha-icon .icon=${"mdi:magnify"}></ha-icon> Auto-detect zones from HA
      </button>
      ${this.zoneStyles.map((e,t)=>n`
        <div class="zone-block">
          <div class="zone-row">
            <ha-textfield
              .value=${e.zone}
              label="Zone name"
              @input=${o=>this._update(t,{zone:o.target.value})}
            ></ha-textfield>
            <ha-textfield
              .value=${e.label??""}
              label="Display label"
              @input=${o=>this._update(t,{label:o.target.value||void 0})}
            ></ha-textfield>
            <div style="flex:1;min-width:0">
              <ha-icon-picker
                .value=${e.icon??""}
                label="Icon"
                @value-changed=${o=>this._update(t,{icon:o.detail.value||void 0})}
              ></ha-icon-picker>
            </div>
            <button class="delete-btn" @click=${()=>this._remove(t)}>
              <ha-icon .icon=${"mdi:delete"}></ha-icon>
            </button>
          </div>
          <div class="scheme-row">
            ${k.map(o=>n`
              <div class="scheme-swatch"
                title=${o.name}
                style="background:${o.bg};border:3px solid ${o.border}"
                @click=${()=>this._update(t,{background_color:o.bg,border_color:o.border})}
              ></div>
            `)}
            <div class="scheme-divider"></div>
            <div class="color-row">
              <label style="font-size:0.75rem">BG</label>
              <input type="color" .value=${e.background_color??"#1c1c2e"}
                @input=${o=>this._update(t,{background_color:o.target.value})} />
            </div>
            <div class="color-row">
              <label style="font-size:0.75rem">Border</label>
              <input type="color" .value=${e.border_color??"#ffffff"}
                @input=${o=>this._update(t,{border_color:o.target.value})} />
            </div>
          </div>
        </div>
      `)}
      <button class="add-btn" @click=${()=>this._add()}>
        <ha-icon .icon=${"mdi:plus-circle"}></ha-icon> Add Zone Style
      </button>
    `}};V.styles=v`
    .zone-block {
      border: 1px solid var(--divider-color, rgba(0,0,0,0.15));
      border-radius: 8px; padding: 8px; margin-bottom: 8px;
    }
    .zone-row { display: flex; align-items: center; gap: 8px; margin-bottom: 6px; }
    .zone-row > * { flex: 1; min-width: 0; }
    .scheme-row {
      display: flex; align-items: center; flex-wrap: wrap; gap: 6px;
      margin: 2px 0 4px;
    }
    .scheme-swatch {
      width: 26px; height: 26px; border-radius: 5px;
      cursor: pointer; flex-shrink: 0;
      transition: transform 0.1s, box-shadow 0.1s;
    }
    .scheme-swatch:hover { transform: scale(1.2); box-shadow: 0 2px 6px rgba(0,0,0,0.4); }
    .scheme-divider { width: 1px; height: 24px; background: var(--divider-color, #e0e0e0); flex-shrink: 0; }
    .add-btn {
      display: inline-flex; align-items: center; gap: 4px;
      font-size: 0.82rem; cursor: pointer;
      color: var(--primary-color); padding: 6px 0; background: none; border: none;
    }
    .delete-btn {
      cursor: pointer; color: var(--error-color, #f44336);
      background: none; border: none; flex: 0 0 auto;
    }
    .color-row { display: flex; align-items: center; gap: 8px; }
    ha-textfield, ha-icon-picker { display: block; width: 100%; }
  `,h([m({attribute:!1})],V.prototype,"hass",2),h([m({type:Array})],V.prototype,"zoneStyles",2),V=h([y("person-card-zone-editor")],V);var zt=[{value:"default",label:"Default",icon:"mdi:palette-outline"},{value:"glass",label:"Glass",icon:"mdi:blur"},{value:"scifi",label:"Sci-Fi",icon:"mdi:chip"},{value:"steampunk",label:"Steampunk",icon:"mdi:cog-outline"},{value:"terminal",label:"Terminal",icon:"mdi:console"},{value:"neon",label:"Neon",icon:"mdi:led-on"}],I=class extends b{constructor(){super(...arguments);this._activeTab="person"}setConfig(e){this._config=e}_fire(e){this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e},bubbles:!0,composed:!0})),this._config=e}_set(e){this._fire({...this._config,...e})}_renderPersonTab(){return n`
      <div class="row">
        <label>Person Entity</label>
        <div>
          <ha-entity-picker
            .hass=${this.hass}
            .value=${this._config.person_entity??""}
            .includeDomains=${["person"]}
            @value-changed=${e=>this._set({person_entity:e.detail.value})}
          ></ha-entity-picker>
        </div>
      </div>
      <div class="row">
        <label>Display Name (optional)</label>
        <ha-textfield
          .value=${this._config.name??""}
          placeholder="Leave blank to use entity name"
          @input=${e=>this._set({name:e.target.value||void 0})}
        ></ha-textfield>
      </div>
      <div class="row">
        <label>Photo URL (optional — overrides entity photo)</label>
        <ha-textfield
          .value=${this._config.photo??""}
          placeholder="https://..."
          @input=${e=>this._set({photo:e.target.value||void 0})}
        ></ha-textfield>
      </div>
    `}_renderDevicesTab(){let e=this._config.devices??[];return n`
      ${e.map((t,o)=>n`
        <div class="device-block">
          <div class="device-header-row">
            <span class="device-label">Device entity</span>
            <button class="delete-btn" @click=${()=>this._removeDevice(o)}>
              <ha-icon .icon=${"mdi:delete"}></ha-icon>
            </button>
          </div>
          <ha-entity-picker
            .hass=${this.hass}
            .value=${t.entity}
            @value-changed=${i=>this._updateDevice(o,{entity:i.detail.value})}
          ></ha-entity-picker>
          <div class="device-row" style="margin-top:6px">
            <ha-textfield
              .value=${t.name??""}
              label="Name"
              @input=${i=>this._updateDevice(o,{name:i.target.value||void 0})}
            ></ha-textfield>
            <div style="flex:1;min-width:0">
              <ha-icon-picker
                .value=${t.icon??""}
                label="Icon"
                @value-changed=${i=>this._updateDevice(o,{icon:i.detail.value||void 0})}
              ></ha-icon-picker>
            </div>
          </div>
          <div style="margin-top:4px;opacity:0.75">
            <ha-entity-picker
              .hass=${this.hass}
              .value=${t.battery_entity??""}
              label="Battery entity (optional)"
              @value-changed=${i=>this._updateDevice(o,{battery_entity:i.detail.value||void 0})}
            ></ha-entity-picker>
            <ha-entity-picker
              .hass=${this.hass}
              .value=${t.connectivity_entity??""}
              label="Connectivity entity (optional)"
              style="margin-top:4px"
              @value-changed=${i=>this._updateDevice(o,{connectivity_entity:i.detail.value||void 0})}
            ></ha-entity-picker>
          </div>
          <div class="device-row" style="margin-top:4px;opacity:0.8">
            <ha-textfield
              .value=${String(t.battery_threshold??"")}
              label="Battery alert threshold % (default 20)"
              type="number"
              min="0"
              max="100"
              @input=${i=>this._updateDevice(o,{battery_threshold:parseInt(i.target.value)||void 0})}
            ></ha-textfield>
          </div>
        </div>
      `)}
      <button class="add-btn" @click=${()=>this._addDevice()}>
        <ha-icon .icon=${"mdi:plus-circle"}></ha-icon> Add Device
      </button>
    `}_updateDevice(e,t){let o=[...this._config.devices??[]];o[e]={...o[e],...t},this._set({devices:o})}_removeDevice(e){let t=[...this._config.devices??[]];t.splice(e,1),this._set({devices:t})}_addDevice(){let e=[...this._config.devices??[],{entity:""}];this._set({devices:e})}_renderAppearanceTab(){return n`
      <div class="row">
        <label>Card Size</label>
        <div class="segment-control">
          ${[{value:"auto",label:"Auto"},{value:"small",label:"Small"},{value:"medium",label:"Medium"},{value:"large",label:"Large"},{value:"hero",label:"Hero"},{value:"stats",label:"Stats"}].map(e=>n`
            <button class="segment-btn ${this._config.size===e.value?"active":""}"
              @click=${()=>this._set({size:e.value})}>
              ${e.label}
            </button>
          `)}
        </div>
        <p style="font-size:0.75rem;color:var(--secondary-text-color);margin:6px 0 0;line-height:1.4">
          <strong>Hero</strong> — centred portrait with large avatar, glow ring, and device icon grid.<br>
          <strong>Stats</strong> — immersive background with zone duration and last-seen stat boxes.
        </p>
      </div>
      <div class="row">
        <label>Background Image URL (optional)</label>
        <ha-textfield
          .value=${this._config.background_image??""}
          placeholder="https://..."
          @input=${e=>this._set({background_image:e.target.value||void 0})}
        ></ha-textfield>
      </div>
      <div class="row">
        <label>Zone Styles</label>
        <person-card-zone-editor
          .hass=${this.hass}
          .zoneStyles=${this._config.zone_styles??[]}
          @zone-styles-changed=${e=>this._set({zone_styles:e.detail.zoneStyles})}
        ></person-card-zone-editor>
      </div>
    `}_renderConditionsTab(){let e=this._config.conditions??[];return n`
      <p style="font-size:0.8rem;color:var(--secondary-text-color);margin:0 0 12px">
        Rules are evaluated top-to-bottom. The last matching rule wins.
      </p>
      ${e.map((t,o)=>this._renderRule(t,o))}
      <button class="add-btn" @click=${()=>this._addRule()}>
        <ha-icon .icon=${"mdi:plus-circle"}></ha-icon> Add Rule
      </button>
    `}_renderRule(e,t){return n`
      <div class="rule-block">
        <div class="rule-header">
          <ha-textfield
            .value=${e.label??""}
            label="Rule label"
            style="flex:1"
            @input=${o=>this._updateRule(t,{label:o.target.value||void 0})}
          ></ha-textfield>
          <div class="segment-control">
            <button class="segment-btn ${e.operator==="and"?"active":""}"
              @click=${()=>this._updateRule(t,{operator:"and"})}>AND</button>
            <button class="segment-btn ${e.operator==="or"?"active":""}"
              @click=${()=>this._updateRule(t,{operator:"or"})}>OR</button>
          </div>
          <button class="delete-btn" @click=${()=>this._removeRule(t)}>
            <ha-icon .icon=${"mdi:delete"}></ha-icon>
          </button>
        </div>

        ${e.conditions.map((o,i)=>n`
          <ha-entity-picker .hass=${this.hass} .value=${o.entity} label="Entity"
            style="display:block;width:100%;margin-bottom:4px"
            @value-changed=${a=>this._updateCondition(t,i,{entity:a.detail.value})}
          ></ha-entity-picker>
          <div class="condition-row">
            <ha-textfield .value=${o.attribute??""} label="Attribute (opt.)"
              @input=${a=>this._updateCondition(t,i,{attribute:a.target.value||void 0})}
            ></ha-textfield>
            <select @change=${a=>this._updateCondition(t,i,{operator:a.target.value})}
              style="padding:6px;border-radius:6px;border:1px solid var(--divider-color)">
              ${["eq","neq","lt","gt","lte","gte","contains"].map(a=>n`
                <option value=${a} ?selected=${o.operator===a}>${a}</option>
              `)}
            </select>
            <ha-textfield .value=${String(o.value)} label="Value"
              @input=${a=>{let c=a.target.value,l=["lt","gt","lte","gte"],d=parseFloat(c),p=l.includes(o.operator)&&!isNaN(d)?d:c;this._updateCondition(t,i,{value:p})}}
            ></ha-textfield>
            <button class="delete-btn" @click=${()=>this._removeCondition(t,i)}>
              <ha-icon .icon=${"mdi:close"}></ha-icon>
            </button>
          </div>
        `)}
        <button class="add-btn" @click=${()=>this._addCondition(t)}>
          <ha-icon .icon=${"mdi:plus"}></ha-icon> Add Condition
        </button>

        <div style="margin-top:10px;font-size:0.8rem;font-weight:600;color:var(--secondary-text-color)">Effect</div>
        <div class="scheme-row" style="margin-bottom:6px">
          ${k.map(o=>n`
            <div class="scheme-swatch"
              title=${o.name}
              style="background:${o.bg};border:3px solid ${o.border}"
              @click=${()=>this._updateEffect(t,{background_color:o.bg,border_color:o.border})}
            ></div>
          `)}
        </div>
        <div class="condition-row" style="flex-wrap:wrap;gap:6px">
          <div class="color-row"><label>Background</label>
            <input type="color" .value=${e.effect.background_color??"#1c1c2e"}
              @input=${o=>this._updateEffect(t,{background_color:o.target.value})} />
          </div>
          <div class="color-row"><label>Border</label>
            <input type="color" .value=${e.effect.border_color??"#ffffff"}
              @input=${o=>this._updateEffect(t,{border_color:o.target.value})} />
          </div>
          <ha-textfield .value=${String(e.effect.border_width??"")} label="Border width (px)"
            type="number" style="width:120px"
            @input=${o=>this._updateEffect(t,{border_width:parseInt(o.target.value)||void 0})}
          ></ha-textfield>
          <div class="color-row"><label>Badge color</label>
            <input type="color" .value=${e.effect.badge_color??"#f44336"}
              @input=${o=>this._updateEffect(t,{badge_color:o.target.value})} />
          </div>
          <ha-icon-picker .value=${e.effect.badge_icon??""} label="Badge icon"
            @value-changed=${o=>this._updateEffect(t,{badge_icon:o.detail.value||void 0})}
          ></ha-icon-picker>
        </div>
      </div>
    `}_updateRule(e,t){let o=[...this._config.conditions??[]];o[e]={...o[e],...t},this._set({conditions:o})}_removeRule(e){let t=[...this._config.conditions??[]];t.splice(e,1),this._set({conditions:t})}_addRule(){let e={id:crypto.randomUUID(),operator:"and",conditions:[{entity:"",operator:"eq",value:""}],effect:{}};this._set({conditions:[...this._config.conditions??[],e]})}_updateCondition(e,t,o){let i=[...this._config.conditions??[]],a=[...i[e].conditions];a[t]={...a[t],...o},i[e]={...i[e],conditions:a},this._set({conditions:i})}_removeCondition(e,t){let o=[...this._config.conditions??[]],i=[...o[e].conditions];i.splice(t,1),o[e]={...o[e],conditions:i},this._set({conditions:o})}_addCondition(e){let t=[...this._config.conditions??[]];t[e]={...t[e],conditions:[...t[e].conditions,{entity:"",operator:"eq",value:""}]},this._set({conditions:t})}_updateEffect(e,t){let o=[...this._config.conditions??[]];o[e]={...o[e],effect:{...o[e].effect,...t}},this._set({conditions:o})}_renderThemePicker(){let e=this._config.card_theme??"default";return n`
      <div class="row">
        <label>Card Theme</label>
        <div class="theme-grid">
          ${zt.map(t=>n`
            <button
              class="theme-btn ${e===t.value?"active":""}"
              @click=${()=>this._set({card_theme:t.value==="default"?void 0:t.value})}
              title=${t.label}
            >
              <ha-icon class="theme-icon" .icon=${t.icon}></ha-icon>
              <span class="theme-btn-label">${t.label}</span>
            </button>
          `)}
        </div>
      </div>
    `}_renderDisplayTab(){return n`
      ${this._renderThemePicker()}
      <div class="row">
        <ha-formfield label="Show ETA when away">
          <ha-switch
            .checked=${this._config.show_eta!==!1}
            @change=${e=>this._set({show_eta:e.target.checked})}
          ></ha-switch>
        </ha-formfield>
      </div>
      <div class="row">
        <label>ETA Travel Time Sensor (optional)</label>
        <div>
          <ha-entity-picker
            .hass=${this.hass}
            .value=${this._config.eta_entity??""}
            .includeDomains=${["sensor"]}
            label="Travel time sensor"
            @value-changed=${e=>{this._set({eta_entity:e.detail.value||void 0})}}
          ></ha-entity-picker>
        </div>
      </div>
      <div class="row">
        <label>Geocoded Address Entity (optional)</label>
        <div>
          <ha-entity-picker
            .hass=${this.hass}
            .value=${this._config.address_entity??""}
            label="Address sensor"
            @value-changed=${e=>this._set({address_entity:e.detail.value||void 0})}
          ></ha-entity-picker>
        </div>
        <p style="font-size:0.75rem;color:var(--secondary-text-color);margin:4px 0 0;line-height:1.4">
          Shown on medium &amp; large when the person is outside all zones.
          Falls back to "Away" if unavailable. Long addresses scroll automatically.
        </p>
      </div>
      <div class="row">
        <ha-formfield label="Show last seen">
          <ha-switch
            .checked=${this._config.show_last_seen!==!1}
            @change=${e=>this._set({show_last_seen:e.target.checked})}
          ></ha-switch>
        </ha-formfield>
      </div>
      <div class="row">
        <ha-formfield label="Show notification badge">
          <ha-switch
            .checked=${this._config.show_notification_badge!==!1}
            @change=${e=>this._set({show_notification_badge:e.target.checked})}
          ></ha-switch>
        </ha-formfield>
      </div>
      <div class="row">
        <label>Offline threshold (minutes, 0 = disabled)</label>
        <ha-textfield
          .value=${String(this._config.offline_threshold??0)}
          type="number"
          min="0"
          placeholder="0"
          @input=${e=>{let t=parseInt(e.target.value);this._set({offline_threshold:t>0?t:void 0})}}
        ></ha-textfield>
        <p style="font-size:0.75rem;color:var(--secondary-text-color);margin:4px 0 0;line-height:1.4">
          Show a stale indicator on the avatar if the person entity hasn't updated within this many minutes.
        </p>
      </div>
    `}render(){return!this._config||!this.hass?n``:n`
      <div class="tabs">
        ${[{key:"person",label:"Person"},{key:"devices",label:"Devices"},{key:"appearance",label:"Appearance"},{key:"conditions",label:"Conditions"},{key:"display",label:"Display"}].map(t=>n`
          <div class="tab ${this._activeTab===t.key?"active":""}"
            @click=${()=>{this._activeTab=t.key}}>
            ${t.label}
          </div>
        `)}
      </div>
      ${this._activeTab==="person"?this._renderPersonTab():""}
      ${this._activeTab==="devices"?this._renderDevicesTab():""}
      ${this._activeTab==="appearance"?this._renderAppearanceTab():""}
      ${this._activeTab==="conditions"?this._renderConditionsTab():""}
      ${this._activeTab==="display"?this._renderDisplayTab():""}
    `}};I.styles=v`
    .tabs {
      display: flex;
      border-bottom: 1px solid var(--divider-color, #e0e0e0);
      margin-bottom: 16px;
      gap: 0;
    }
    .tab {
      padding: 8px 14px;
      font-size: 0.82rem;
      font-weight: 600;
      cursor: pointer;
      border-bottom: 2px solid transparent;
      color: var(--secondary-text-color);
      user-select: none;
      transition: color 0.2s, border-color 0.2s;
    }
    .tab.active {
      color: var(--primary-color);
      border-bottom-color: var(--primary-color);
    }
    .row { margin-bottom: 12px; }
    .row label { display: block; font-size: 0.8rem; color: var(--secondary-text-color); margin-bottom: 4px; }
    .device-block, .zone-block {
      border: 1px solid var(--divider-color, rgba(0,0,0,0.15));
      border-radius: 8px; padding: 8px; margin-bottom: 8px;
    }
    .device-block ha-entity-picker { display: block; width: 100%; }
    .device-header-row {
      display: flex; align-items: center; justify-content: space-between;
      margin-bottom: 4px;
    }
    .device-label { font-size: 0.78rem; color: var(--secondary-text-color); }
    .device-row, .zone-row, .condition-row {
      display: flex; align-items: center; gap: 8px;
      margin-bottom: 6px;
    }
    .device-block .device-row, .zone-block .device-row { margin-bottom: 4px; }
    .device-block .device-row:last-child, .zone-block .device-row:last-child { margin-bottom: 0; }
    .device-row > *, .zone-row > * { flex: 1; min-width: 0; }
    .condition-row {
      border: 1px solid var(--divider-color, rgba(0,0,0,0.15));
      padding: 8px; border-radius: 8px;
    }
    .scheme-row {
      display: flex; align-items: center; flex-wrap: wrap; gap: 6px;
      margin: 2px 0 4px;
    }
    .scheme-swatch {
      width: 26px; height: 26px; border-radius: 5px;
      cursor: pointer; flex-shrink: 0;
      transition: transform 0.1s, box-shadow 0.1s;
    }
    .scheme-swatch:hover { transform: scale(1.2); box-shadow: 0 2px 6px rgba(0,0,0,0.4); }
    .scheme-divider { width: 1px; height: 24px; background: var(--divider-color, #e0e0e0); flex-shrink: 0; }
    .add-btn {
      display: inline-flex; align-items: center; gap: 4px;
      font-size: 0.82rem; cursor: pointer;
      color: var(--primary-color); padding: 6px 0; background: none; border: none;
    }
    .delete-btn {
      cursor: pointer; color: var(--error-color, #f44336);
      background: none; border: none; flex: 0 0 auto;
    }
    .rule-block {
      border: 1px solid var(--divider-color, rgba(0,0,0,0.15));
      border-radius: 8px; padding: 10px; margin-bottom: 8px;
    }
    .rule-header { display: flex; align-items: center; gap: 8px; margin-bottom: 8px; }
    .segment-control { display: flex; gap: 4px; flex-wrap: wrap; }
    .segment-btn {
      padding: 4px 12px; border-radius: 6px; font-size: 0.8rem; cursor: pointer;
      border: 1px solid var(--divider-color); background: none;
    }
    .segment-btn.active { background: var(--primary-color); color: #fff; border-color: var(--primary-color); }
    ha-textfield, ha-entity-picker, ha-icon-picker { display: block; width: 100%; }
    .color-row { display: flex; align-items: center; gap: 8px; }
    .theme-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 8px;
    }
    .theme-btn {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
      padding: 10px 6px 8px;
      border-radius: 10px;
      border: 2px solid var(--divider-color, rgba(0,0,0,0.15));
      background: none;
      cursor: pointer;
      transition: border-color 0.15s, background 0.15s;
      text-align: center;
    }
    .theme-btn:hover {
      background: rgba(var(--rgb-primary-color, 33,150,243), 0.06);
    }
    .theme-btn.active {
      border-color: var(--primary-color);
      background: rgba(var(--rgb-primary-color, 33,150,243), 0.1);
    }
    .theme-btn-label {
      font-size: 0.8rem;
      font-weight: 600;
      color: var(--primary-text-color);
    }
    .theme-icon {
      --mdc-icon-size: 22px;
      color: var(--secondary-text-color);
    }
    .theme-btn.active .theme-icon {
      color: var(--primary-color);
    }
  `,h([m({attribute:!1})],I.prototype,"hass",2),h([w()],I.prototype,"_config",2),h([w()],I.prototype,"_activeTab",2),I=h([y("person-card-editor")],I);var at=v`
  :host {
    display: block;
    font-family: var(--person-card-font-family, 'Segoe UI', system-ui, sans-serif);
    border-radius: var(--person-card-border-radius, 16px);
    overflow: hidden;
    background: var(--pc-background, #1c1c2e);
    color: #ffffff;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.4);
    padding: 10px 14px;
  }

  /* hidden style — card takes no space */
  :host(.style-hidden) {
    display: none;
  }

  .section-title {
    font-size: 0.68rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.35);
    margin-bottom: 8px;
  }

  /* ── legend (default) ───────────────────────────────── */
  .legend-items {
    display: flex;
    flex-wrap: wrap;
    gap: 10px 16px;
    align-items: center;
  }

  .legend-item {
    display: flex;
    align-items: center;
    gap: 5px;
  }

  .legend-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  .legend-label {
    font-size: 0.78rem;
    color: rgba(255,255,255,0.7);
    white-space: nowrap;
  }

  /* ── compact ────────────────────────────────────────── */
  .compact-items {
    display: flex;
    flex-wrap: wrap;
    gap: 6px 12px;
    align-items: center;
  }

  .compact-item {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .compact-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  .compact-label {
    font-size: 0.68rem;
    color: rgba(255,255,255,0.6);
    white-space: nowrap;
  }

  /* ── pills ──────────────────────────────────────────── */
  .pills-items {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }

  .pill {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    padding: 3px 10px 3px 7px;
    border-radius: 20px;
    font-size: 0.75rem;
    font-weight: 600;
    white-space: nowrap;
    border: 1.5px solid transparent;
  }

  .pill-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  /* ── list ───────────────────────────────────────────── */
  .list-items {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .list-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 5px 8px;
    border-radius: 8px;
    background: rgba(255,255,255,0.04);
    border-left: 3px solid transparent;
  }

  .list-swatch {
    width: 12px;
    height: 12px;
    border-radius: 3px;
    flex-shrink: 0;
  }

  .list-icon {
    --mdc-icon-size: 15px;
    color: rgba(255,255,255,0.55);
    flex-shrink: 0;
  }

  .list-label {
    font-size: 0.8rem;
    color: rgba(255,255,255,0.8);
    flex: 1;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  /* ── grid ───────────────────────────────────────────── */
  .grid-items {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(72px, 1fr));
    gap: 8px;
  }

  .grid-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
    padding: 8px 4px 6px;
    border-radius: 10px;
    border: 1.5px solid transparent;
    text-align: center;
  }

  .grid-icon {
    --mdc-icon-size: 20px;
  }

  .grid-label {
    font-size: 0.65rem;
    font-weight: 600;
    color: rgba(255,255,255,0.8);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
    text-align: center;
  }
`;var Et=[{value:"legend",label:"Legend",description:"Coloured dots with labels in a wrapping row (default)"},{value:"compact",label:"Compact",description:"Smaller dots and tighter spacing"},{value:"pills",label:"Pills",description:"Filled pill/badge tags using zone colours"},{value:"list",label:"List",description:"Vertical list with swatch, icon, and label"},{value:"grid",label:"Grid",description:"Zone icon tiles in a responsive grid"},{value:"hidden",label:"Hidden",description:"Invisible \u2014 provides theme with no visual footprint"}],Tt={legend:"mdi:dots-horizontal",compact:"mdi:minus",pills:"mdi:label-multiple",list:"mdi:format-list-bulleted",grid:"mdi:view-grid",hidden:"mdi:eye-off"},Y=class extends b{setConfig(r){this._config=r}_fire(r){this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:r},bubbles:!0,composed:!0})),this._config=r}_set(r){this._fire({...this._config,...r})}render(){if(!this._config)return n``;let r=this._config.display_style??"legend";return n`
      <div class="row">
        <label>Display Style</label>
        <div class="style-grid">
          ${Et.map(e=>n`
            <button
              class="style-btn ${r===e.value?"active":""}"
              @click=${()=>this._set({display_style:e.value})}
              title=${e.description}
            >
              <ha-icon class="style-icon" .icon=${Tt[e.value]}></ha-icon>
              <span class="style-btn-label">${e.label}</span>
              <span class="style-btn-desc">${e.description}</span>
            </button>
          `)}
        </div>
      </div>

      <div class="row">
        <label>Zone Styles</label>
        <person-card-zone-editor
          .hass=${this.hass}
          .zoneStyles=${this._config.zone_styles??[]}
          @zone-styles-changed=${e=>this._set({zone_styles:e.detail.zoneStyles})}
        ></person-card-zone-editor>
      </div>
    `}};Y.styles=v`
    .row { margin-bottom: 16px; }
    .row label {
      display: block;
      font-size: 0.8rem;
      color: var(--secondary-text-color);
      margin-bottom: 6px;
    }
    .style-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 8px;
    }
    .style-btn {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
      padding: 10px 6px 8px;
      border-radius: 10px;
      border: 2px solid var(--divider-color, rgba(0,0,0,0.15));
      background: none;
      cursor: pointer;
      transition: border-color 0.15s, background 0.15s;
      text-align: center;
    }
    .style-btn:hover {
      background: rgba(var(--rgb-primary-color, 33,150,243), 0.06);
    }
    .style-btn.active {
      border-color: var(--primary-color);
      background: rgba(var(--rgb-primary-color, 33,150,243), 0.1);
    }
    .style-btn-label {
      font-size: 0.8rem;
      font-weight: 600;
      color: var(--primary-text-color);
    }
    .style-btn-desc {
      font-size: 0.68rem;
      color: var(--secondary-text-color);
      line-height: 1.3;
    }
    .style-icon {
      --mdc-icon-size: 22px;
      color: var(--secondary-text-color);
    }
    .style-btn.active .style-icon {
      color: var(--primary-color);
    }
  `,h([m({attribute:!1})],Y.prototype,"hass",2),Y=h([y("person-card-theme-editor")],Y);window.customCards=window.customCards??[];window.customCards.push({type:"person-card-theme",name:"Person Card Theme",description:"Shared zone colour scheme for Person Card and Family Card.",preview:!1});var At={legend:"Zone Legend",compact:"Zone Legend",pills:"Zone Legend",list:"Zone Legend",grid:"Zone Legend",hidden:""},X=class extends b{static getConfigElement(){return document.createElement("person-card-theme-editor")}static getStubConfig(){return{zone_styles:[],display_style:"legend"}}setConfig(r){this._config={...r,zone_styles:r.zone_styles??[]},Je(this._config.zone_styles),this.classList.toggle("style-hidden",this._config.display_style==="hidden")}getCardSize(){return this._config?.display_style==="hidden"?0:1}_renderLegend(r){return n`
      <div class="legend-items">
        ${r.map(e=>n`
          <div class="legend-item">
            <div class="legend-dot"
              style="background:${e.border_color??"rgba(255,255,255,0.4)"};
                     box-shadow:0 0 4px ${e.border_color??"transparent"}66">
            </div>
            <span class="legend-label">${e.label??e.zone}</span>
          </div>
        `)}
      </div>
    `}_renderCompact(r){return n`
      <div class="compact-items">
        ${r.map(e=>n`
          <div class="compact-item">
            <div class="compact-dot"
              style="background:${e.border_color??"rgba(255,255,255,0.4)"}">
            </div>
            <span class="compact-label">${e.label??e.zone}</span>
          </div>
        `)}
      </div>
    `}_renderPills(r){return n`
      <div class="pills-items">
        ${r.map(e=>{let t=e.background_color??"rgba(255,255,255,0.08)",o=e.border_color??"rgba(255,255,255,0.2)";return n`
            <div class="pill" style="background:${t};border-color:${o}">
              <div class="pill-dot" style="background:${o}"></div>
              <span>${e.label??e.zone}</span>
            </div>
          `})}
      </div>
    `}_renderList(r){return n`
      <div class="list-items">
        ${r.map(e=>n`
          <div class="list-item"
            style="border-left-color:${e.border_color??"rgba(255,255,255,0.2)"}">
            <div class="list-swatch"
              style="background:${e.border_color??"rgba(255,255,255,0.4)"}">
            </div>
            <ha-icon class="list-icon"
              .icon=${e.icon??"mdi:map-marker"}
              style="color:${e.border_color??"rgba(255,255,255,0.5)"}">
            </ha-icon>
            <span class="list-label">${e.label??e.zone}</span>
          </div>
        `)}
      </div>
    `}_renderGrid(r){return n`
      <div class="grid-items">
        ${r.map(e=>{let t=e.background_color??"rgba(255,255,255,0.06)",o=e.border_color??"rgba(255,255,255,0.2)";return n`
            <div class="grid-item" style="background:${t};border-color:${o}">
              <ha-icon class="grid-icon"
                .icon=${e.icon??"mdi:map-marker"}
                style="color:${o}">
              </ha-icon>
              <span class="grid-label">${e.label??e.zone}</span>
            </div>
          `})}
      </div>
    `}render(){let r=this._config?.display_style??"legend";if(r==="hidden")return n``;let e=this._config?.zone_styles??[],t=At[r],o=n`
      <div class="section-title">${t}</div>
      <div style="color:rgba(255,255,255,0.3);font-size:0.78rem">No zones configured</div>
    `;if(e.length===0)return o;let i=r==="compact"?this._renderCompact(e):r==="pills"?this._renderPills(e):r==="list"?this._renderList(e):r==="grid"?this._renderGrid(e):this._renderLegend(e);return n`
      <div class="section-title">${t}</div>
      ${i}
    `}};X.styles=at,h([m({attribute:!1})],X.prototype,"hass",2),X=h([y("person-card-theme")],X);var st=v`
  :host {
    display: block;
    font-family: var(--person-card-font-family, 'Segoe UI', system-ui, sans-serif);
    border-radius: var(--person-card-border-radius, 16px);
    overflow: hidden;
    position: relative;
    background: var(--pc-background, #1c1c2e);
    color: #ffffff;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.4);
    border: var(--pc-border-width, 0px) solid var(--pc-border-color, transparent);
  }

  .card-background {
    position: absolute; inset: 0;
    background-image: var(--pc-background-image, none);
    background-size: cover; background-position: center;
    opacity: 0.25; pointer-events: none; border-radius: inherit;
  }

  .card-content { position: relative; z-index: 1; padding: 12px 14px; }

  /* ── Summary bar ─────────────────────────────────────── */
  .summary-bar {
    display: flex;
    flex-wrap: wrap;
    gap: 4px 14px;
    padding-bottom: 10px;
    margin-bottom: 6px;
    border-bottom: 1px solid rgba(255,255,255,0.08);
  }

  .summary-item {
    display: flex;
    align-items: center;
    gap: 5px;
  }

  .summary-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  .summary-count {
    font-size: 0.85rem;
    font-weight: 700;
    color: rgba(255,255,255,0.9);
  }

  .summary-label {
    font-size: 0.75rem;
    color: rgba(255,255,255,0.45);
    white-space: nowrap;
  }

  /* ── Zone group header ───────────────────────────────── */
  .zone-group {
    margin-bottom: 4px;
  }

  .zone-group + .zone-group {
    margin-top: 10px;
  }

  .zone-group-header {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 5px 2px 4px;
    margin-bottom: 4px;
    border-bottom: 1px solid var(--group-accent, rgba(255,255,255,0.1));
  }

  .group-icon {
    --mdc-icon-size: 13px;
    flex-shrink: 0;
  }

  .group-label {
    flex: 1;
    font-size: 0.66rem;
    font-weight: 700;
    letter-spacing: 0.07em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.45);
  }

  .group-count {
    font-size: 0.66rem;
    font-weight: 700;
    color: rgba(255,255,255,0.3);
    background: rgba(255,255,255,0.07);
    border-radius: 8px;
    padding: 1px 6px;
  }

  /* ── Person row — all tiers ──────────────────────────── */
  .person-row {
    border-radius: 10px;
    margin-bottom: 6px;
    overflow: hidden;
    border-left: 3px solid var(--row-accent, rgba(255,255,255,0.1));
    background: rgba(255,255,255,0.05);
    cursor: pointer;
    transition: background 0.15s;
  }
  .person-row:last-child { margin-bottom: 0; }
  .person-row:hover { background: rgba(255,255,255,0.08); }

  .person-row-inner {
    display: flex; align-items: center; gap: 10px; padding: 9px 10px;
  }

  .avatar {
    width: 36px; height: 36px; border-radius: 50%; object-fit: cover;
    background: #2d2d50; border: 2px solid rgba(255,255,255,0.1); flex-shrink: 0;
  }
  .avatar-placeholder {
    width: 36px; height: 36px; border-radius: 50%; background: #2d2d50;
    display: flex; align-items: center; justify-content: center; flex-shrink: 0;
  }
  .avatar-placeholder ha-icon { --mdc-icon-size: 18px; color: rgba(255,255,255,0.4); }
  .avatar.stale, .avatar-placeholder.stale { opacity: 0.55; filter: grayscale(60%); }

  :host([density='compact']) .avatar,
  :host([density='compact']) .avatar-placeholder { width: 32px; height: 32px; }

  :host([density='detailed']) .avatar,
  :host([density='detailed']) .avatar-placeholder { width: 46px; height: 46px; }
  :host([density='detailed']) .avatar-placeholder ha-icon { --mdc-icon-size: 22px; }

  .person-info { flex: 1; min-width: 0; }
  .person-name { font-size: 0.9rem; font-weight: 700; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  :host([density='detailed']) .person-name { font-size: 1.0rem; }
  .person-zone { font-size: 0.72rem; color: rgba(255,255,255,0.55); margin-top: 1px; }
  :host([density='detailed']) .person-zone { font-size: 0.78rem; }

  .person-row-meta { display: flex; align-items: center; gap: 6px; flex-shrink: 0; }

  .device-summary { display: flex; align-items: center; gap: 4px; }
  .device-summary-pct { font-size: 0.72rem; font-weight: 600; }

  .status-dot { width: 8px; height: 8px; border-radius: 50%; }

  .chevron { color: rgba(255,255,255,0.3); font-size: 0.75rem; flex-shrink: 0; transition: transform 0.2s; }
  .chevron.open { transform: rotate(180deg); }

  /* ── Expanded panel ──────────────────────────────────── */
  .expanded-panel {
    padding: 0 10px 10px 10px;
    margin-left: 46px;
    border-top: 1px solid rgba(255,255,255,0.08);
    padding-top: 8px;
  }

  .device-list { display: flex; flex-direction: column; gap: 5px; margin-bottom: 8px; }

  .expanded-footer {
    display: flex; gap: 14px; flex-wrap: wrap;
    font-size: 0.72rem; color: rgba(255,255,255,0.4);
    margin-top: 6px;
  }

  .view-full-link {
    font-size: 0.72rem; cursor: pointer;
    text-align: right; margin-top: 6px;
    color: var(--row-accent, #80deea);
    text-decoration: none;
  }

  /* ── Mini tier grid ──────────────────────────────────── */
  .person-rows.mini-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    gap: 8px;
  }
  .person-rows.mini-grid .person-row { margin-bottom: 0; }

  /* ══════════════════════════════════════════════════
     CARD THEMES — Family Card
     Same five themes as Person Card.
     Per-person row accents (--row-accent) are zone-driven
     inline styles and continue to work unchanged within
     each theme.
  ══════════════════════════════════════════════════ */

  /* ── Glass ──────────────────────────────────────── */
  :host([card-theme="glass"]) {
    background: rgba(255, 255, 255, 0.10);
    backdrop-filter: blur(28px) saturate(180%) brightness(1.05);
    -webkit-backdrop-filter: blur(28px) saturate(180%) brightness(1.05);
    border: 1px solid rgba(255, 255, 255, 0.38);
    box-shadow:
      0 12px 40px rgba(0, 0, 0, 0.45),
      inset 0 1px 0 rgba(255, 255, 255, 0.35),
      inset 0 -1px 0 rgba(255, 255, 255, 0.08),
      inset 1px 0 0 rgba(255, 255, 255, 0.12),
      inset -1px 0 0 rgba(255, 255, 255, 0.12);
    border-radius: var(--person-card-border-radius, 20px);
    color: rgba(255, 255, 255, 0.92);
  }
  :host([card-theme="glass"]) .avatar {
    border-color: rgba(255, 255, 255, 0.5);
    background: rgba(255, 255, 255, 0.15);
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.35);
  }
  :host([card-theme="glass"]) .avatar-placeholder {
    background: rgba(255, 255, 255, 0.12);
    border: 2px solid rgba(255, 255, 255, 0.45);
  }
  :host([card-theme="glass"]) .person-row {
    background: rgba(255, 255, 255, 0.07);
    border-left-color: var(--row-accent, rgba(255, 255, 255, 0.25));
  }
  :host([card-theme="glass"]) .person-row:hover {
    background: rgba(255, 255, 255, 0.12);
  }
  :host([card-theme="glass"]) .summary-bar {
    border-bottom-color: rgba(255, 255, 255, 0.1);
  }
  :host([card-theme="glass"]) .zone-group-header {
    border-bottom-color: rgba(255, 255, 255, 0.1);
  }

  /* ── Sci-Fi ─────────────────────────────────────── */
  :host([card-theme="scifi"]) {
    background: linear-gradient(160deg, #030f22 0%, #010810 100%);
    border: 1px solid var(--pc-border-color, #00c8f0);
    border-radius: 2px;
    box-shadow:
      0 0 0 1px rgba(0, 200, 240, 0.12),
      0 0 20px var(--pc-glow-color, rgba(0, 200, 240, 0.2)),
      0 0 50px var(--pc-glow-color, rgba(0, 200, 240, 0.08)),
      inset 0 0 40px rgba(0, 60, 100, 0.12);
    font-family: 'Courier New', 'Consolas', monospace;
  }
  :host([card-theme="scifi"])::before {
    content: '';
    position: absolute;
    top: 5px; left: 5px;
    width: 20px; height: 20px;
    border-top: 2px solid var(--pc-border-color, #00c8f0);
    border-left: 2px solid var(--pc-border-color, #00c8f0);
    pointer-events: none;
    z-index: 10;
    filter: drop-shadow(0 0 4px var(--pc-glow-color, rgba(0, 200, 240, 0.8)));
  }
  :host([card-theme="scifi"])::after {
    content: '';
    position: absolute;
    bottom: 5px; right: 5px;
    width: 20px; height: 20px;
    border-bottom: 2px solid var(--pc-border-color, #00c8f0);
    border-right: 2px solid var(--pc-border-color, #00c8f0);
    pointer-events: none;
    z-index: 10;
    filter: drop-shadow(0 0 4px var(--pc-glow-color, rgba(0, 200, 240, 0.8)));
  }
  :host([card-theme="scifi"]) .card-content::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      linear-gradient(160deg, rgba(0, 200, 240, 0.04) 0%, transparent 40%),
      repeating-linear-gradient(
        0deg,
        transparent,
        transparent 3px,
        rgba(0, 0, 0, 0.14) 3px,
        rgba(0, 0, 0, 0.14) 4px
      );
    pointer-events: none;
    z-index: 1;
  }
  :host([card-theme="scifi"]) .avatar {
    border-radius: 2px;
    border-color: var(--row-accent, #00c8f0);
    background: #010d1e;
    box-shadow: 0 0 10px rgba(0, 200, 240, 0.25);
  }
  :host([card-theme="scifi"]) .avatar-placeholder {
    background: #010d1e;
    border-radius: 2px;
    border: 1px solid var(--row-accent, #00c8f0);
  }
  :host([card-theme="scifi"]) .person-name {
    color: var(--row-accent, #00c8f0);
    letter-spacing: 0.06em;
    text-transform: uppercase;
    font-size: 0.85em;
    text-shadow: 0 0 6px rgba(0, 200, 240, 0.5);
  }
  :host([card-theme="scifi"]) .person-row {
    background: rgba(0, 200, 240, 0.04);
    border-radius: 2px;
  }
  :host([card-theme="scifi"]) .zone-group-header {
    border-bottom-color: rgba(0, 200, 240, 0.2);
  }
  :host([card-theme="scifi"]) .group-label {
    letter-spacing: 0.1em;
    color: rgba(0, 200, 240, 0.5);
  }
  :host([card-theme="scifi"]) .summary-bar {
    border-bottom-color: rgba(0, 200, 240, 0.2);
  }

  /* ── Steampunk ──────────────────────────────────── */
  :host([card-theme="steampunk"]) {
    background: linear-gradient(160deg, #1a0f00 0%, #0e0800 60%, #060400 100%);
    border: 3px solid var(--pc-border-color, #8a5a1e);
    border-radius: 3px;
    box-shadow:
      0 0 0 1px #2a1a08,
      0 0 0 5px #110a00,
      0 0 0 7px var(--pc-border-color, #6a4418),
      inset 0 0 30px rgba(150, 90, 20, 0.06),
      inset 0 1px 0 rgba(255, 200, 80, 0.08),
      0 8px 40px rgba(0, 0, 0, 0.7);
    font-family: Georgia, 'Times New Roman', serif;
    color: #d4a84b;
  }
  :host([card-theme="steampunk"])::before {
    content: '';
    position: absolute;
    top: 7px; left: 7px;
    width: 11px; height: 11px;
    border-radius: 50%;
    background: radial-gradient(circle at 35% 35%, #d4922a, #5a3810);
    border: 1px solid #9a6a20;
    box-shadow: inset 0 1px 2px rgba(255, 220, 100, 0.3), 0 1px 3px rgba(0, 0, 0, 0.6);
    pointer-events: none;
    z-index: 10;
  }
  :host([card-theme="steampunk"])::after {
    content: '';
    position: absolute;
    bottom: 7px; right: 7px;
    width: 11px; height: 11px;
    border-radius: 50%;
    background: radial-gradient(circle at 35% 35%, #d4922a, #5a3810);
    border: 1px solid #9a6a20;
    box-shadow: inset 0 1px 2px rgba(255, 220, 100, 0.3), 0 1px 3px rgba(0, 0, 0, 0.6);
    pointer-events: none;
    z-index: 10;
  }
  :host([card-theme="steampunk"]) .avatar {
    border-color: var(--row-accent, #a0682a);
    background: radial-gradient(circle, #1e1000, #0e0800);
    box-shadow: 0 0 10px rgba(160, 104, 42, 0.3);
  }
  :host([card-theme="steampunk"]) .avatar-placeholder {
    background: radial-gradient(circle, #1e1000, #0e0800);
    border: 2px solid var(--row-accent, #a0682a);
  }
  :host([card-theme="steampunk"]) .person-name {
    color: #e8c878;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
  }
  :host([card-theme="steampunk"]) .person-row {
    background: rgba(160, 104, 42, 0.06);
    border-radius: 2px;
  }
  :host([card-theme="steampunk"]) .zone-group-header {
    border-bottom-color: rgba(160, 104, 42, 0.3);
  }
  :host([card-theme="steampunk"]) .group-label {
    color: rgba(232, 192, 112, 0.5);
    font-style: italic;
  }
  :host([card-theme="steampunk"]) .summary-bar {
    border-bottom-color: rgba(160, 104, 42, 0.25);
  }

  /* ── Terminal ───────────────────────────────────── */
  @keyframes fc-terminal-scroll {
    from { background-position: 0 0; }
    to   { background-position: 0 -120px; }
  }
  :host([card-theme="terminal"]) {
    background: #000;
    border: 1px solid var(--pc-border-color, #00ff41);
    border-radius: 0;
    box-shadow:
      0 0 8px var(--pc-glow-color, rgba(0, 255, 65, 0.35)),
      0 0 30px var(--pc-glow-color, rgba(0, 255, 65, 0.12)),
      inset 0 0 40px rgba(0, 20, 0, 0.6);
    font-family: 'Courier New', 'Consolas', monospace;
    color: var(--pc-border-color, #00ff41);
  }
  :host([card-theme="terminal"]) .card-content::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image:
      repeating-linear-gradient(
        0deg,
        rgba(0, 255, 65, 0.028) 0px,
        rgba(0, 255, 65, 0.028) 10px,
        transparent 10px,
        transparent 12px
      );
    background-size: 100% 12px;
    animation: fc-terminal-scroll 2.5s linear infinite;
    pointer-events: none;
    z-index: 1;
  }
  :host([card-theme="terminal"]) .card-content::after {
    content: '';
    position: absolute;
    inset: 0;
    background:
      repeating-linear-gradient(
        0deg,
        transparent,
        transparent 3px,
        rgba(0, 0, 0, 0.18) 3px,
        rgba(0, 0, 0, 0.18) 4px
      ),
      radial-gradient(ellipse at center, transparent 45%, rgba(0, 0, 0, 0.55) 100%);
    pointer-events: none;
    z-index: 2;
  }
  :host([card-theme="terminal"]) .avatar {
    border-radius: 0;
    border-color: var(--row-accent, #00ff41);
    background: #001500;
    box-shadow: 0 0 8px rgba(0, 255, 65, 0.25);
  }
  :host([card-theme="terminal"]) .avatar-placeholder {
    background: #001500;
    border-radius: 0;
    border: 1px solid var(--row-accent, #00ff41);
  }
  :host([card-theme="terminal"]) .person-name {
    color: var(--row-accent, #00ff41);
    letter-spacing: 0.08em;
    text-shadow: 0 0 6px rgba(0, 255, 65, 0.5);
  }
  :host([card-theme="terminal"]) .person-row {
    background: rgba(0, 255, 65, 0.03);
    border-radius: 0;
  }
  :host([card-theme="terminal"]) .zone-group-header {
    border-bottom-color: rgba(0, 255, 65, 0.2);
  }
  :host([card-theme="terminal"]) .group-label {
    color: rgba(0, 255, 65, 0.4);
    letter-spacing: 0.1em;
  }
  :host([card-theme="terminal"]) .summary-bar {
    border-bottom-color: rgba(0, 255, 65, 0.2);
  }

  /* ── Neon Noir ──────────────────────────────────── */
  :host([card-theme="neon"]) {
    background: linear-gradient(160deg, #0a0018 0%, #060010 100%);
    border: 2px solid var(--pc-border-color, #e000ff);
    border-radius: 14px;
    box-shadow:
      0 0 6px var(--pc-border-color, #e000ff),
      0 0 20px var(--pc-glow-color, rgba(224, 0, 255, 0.45)),
      0 0 60px var(--pc-glow-color, rgba(224, 0, 255, 0.18)),
      inset 0 0 20px rgba(200, 0, 255, 0.04);
  }
  :host([card-theme="neon"])::before {
    content: '';
    position: absolute;
    top: -2px; left: 12%; right: 12%;
    height: 2px;
    background: var(--pc-border-color, #e000ff);
    box-shadow:
      0 0 6px 1px var(--pc-border-color, #e000ff),
      0 0 18px 4px var(--pc-glow-color, rgba(224, 0, 255, 0.6));
    border-radius: 2px;
    pointer-events: none;
    z-index: 2;
  }
  :host([card-theme="neon"])::after {
    content: '';
    position: absolute;
    bottom: -2px; left: 12%; right: 12%;
    height: 2px;
    background: var(--pc-border-color, #e000ff);
    box-shadow:
      0 0 6px 1px var(--pc-border-color, #e000ff),
      0 0 18px 4px var(--pc-glow-color, rgba(224, 0, 255, 0.6));
    border-radius: 2px;
    pointer-events: none;
    z-index: 2;
  }
  :host([card-theme="neon"]) .avatar {
    border-color: var(--row-accent, #e000ff);
    background: linear-gradient(135deg, #2a0050, #580078);
    box-shadow: 0 0 12px rgba(224, 0, 255, 0.45);
  }
  :host([card-theme="neon"]) .avatar-placeholder {
    background: linear-gradient(135deg, #2a0050, #580078);
    border: 2px solid var(--row-accent, #e000ff);
    box-shadow: 0 0 12px rgba(224, 0, 255, 0.45);
  }
  :host([card-theme="neon"]) .person-name {
    color: #fff;
    font-weight: 700;
    text-shadow: 0 0 8px var(--row-accent, #e000ff), 0 0 20px rgba(224, 0, 255, 0.4);
  }
  :host([card-theme="neon"]) .person-row {
    background: rgba(200, 0, 255, 0.05);
  }
  :host([card-theme="neon"]) .zone-group-header {
    border-bottom-color: rgba(200, 0, 255, 0.2);
  }
  :host([card-theme="neon"]) .summary-bar {
    border-bottom-color: rgba(200, 0, 255, 0.15);
  }
`;function Pt(s,r){let e=s.states[r];if(!e)return[];let t=e.attributes.entity_id;return Array.isArray(t)?t:[]}function nt(s,r){return r.people&&r.people.length>0?r.people:r.group_entity?Pt(s,r.group_entity).map(e=>({entity:e})):[]}var Mt=[{value:"default",label:"Default",icon:"mdi:palette-outline"},{value:"glass",label:"Glass",icon:"mdi:blur"},{value:"scifi",label:"Sci-Fi",icon:"mdi:chip"},{value:"steampunk",label:"Steampunk",icon:"mdi:cog-outline"},{value:"terminal",label:"Terminal",icon:"mdi:console"},{value:"neon",label:"Neon",icon:"mdi:led-on"}],D=class extends b{constructor(){super(...arguments);this._activeTab="people"}setConfig(e){this._config=e}_fire(e){this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e},bubbles:!0,composed:!0})),this._config=e}_set(e){this._fire({...this._config,...e})}_renderPeopleTab(){let e=this._config.people??[];return n`
      <div class="row">
        <label>Density</label>
        <div class="segment-control">
          ${["compact","mini","detailed"].map(t=>n`
            <button class="segment-btn ${this._config.density===t?"active":""}"
              @click=${()=>this._set({density:t})}>${t.charAt(0).toUpperCase()+t.slice(1)}</button>
          `)}
        </div>
      </div>
      <div class="row">
        <label>Group Entity (optional — overridden by people list)</label>
        <div>
          <ha-entity-picker
            .hass=${this.hass}
            .value=${this._config.group_entity??""}
            @value-changed=${t=>this._set({group_entity:t.detail.value||void 0})}
          ></ha-entity-picker>
        </div>
      </div>
      <div class="row">
        <label>People</label>
        ${e.map((t,o)=>n`
          <div class="person-block">
            <div class="person-header">
              <span class="person-label">Person entity</span>
              <button class="delete-btn" @click=${()=>{let i=[...e];i.splice(o,1),this._set({people:i})}}><ha-icon .icon=${"mdi:delete"}></ha-icon></button>
            </div>
            <div>
              <ha-entity-picker
                .hass=${this.hass}
                .value=${t.entity??""}
                .includeDomains=${["person"]}
                @value-changed=${i=>{let a=[...e];a[o]={...a[o],entity:i.detail.value},this._set({people:a})}}
              ></ha-entity-picker>
            </div>
            <div class="detail-row">
              <ha-textfield
                .value=${t.name??""}
                label="Display name (optional)"
                @input=${i=>{let a=[...e];a[o]={...a[o],name:i.target.value||void 0},this._set({people:a})}}
              ></ha-textfield>
            </div>
            <div class="detail-row">
              <div>
                <ha-entity-picker
                  .hass=${this.hass}
                  .value=${t.eta_entity??""}
                  .includeDomains=${["sensor"]}
                  label="ETA travel time sensor (optional)"
                  @value-changed=${i=>{let a=[...e];a[o]={...a[o],eta_entity:i.detail.value||void 0},this._set({people:a})}}
                ></ha-entity-picker>
              </div>
            </div>
          </div>
        `)}
        <button class="add-btn" @click=${()=>this._set({people:[...e,{entity:""}]})}>
          <ha-icon .icon=${"mdi:plus-circle"}></ha-icon> Add Person
        </button>
      </div>
    `}_renderAppearanceTab(){return n`
      <div class="row">
        <label>Background Image URL (optional)</label>
        <ha-textfield
          .value=${this._config.background_image??""}
          placeholder="https://..."
          @input=${e=>this._set({background_image:e.target.value||void 0})}
        ></ha-textfield>
      </div>
      <div class="row">
        <label>Zone Style Overrides (optional — falls back to Theme Card)</label>
        <person-card-zone-editor
          .hass=${this.hass}
          .zoneStyles=${this._config.zone_styles??[]}
          @zone-styles-changed=${e=>this._set({zone_styles:e.detail.zoneStyles})}
        ></person-card-zone-editor>
      </div>
    `}_renderConditionsTab(){let e=this._config.conditions??[];return n`
      <p style="font-size:0.8rem;color:var(--secondary-text-color);margin:0 0 12px">
        Rules are evaluated top-to-bottom. The last matching rule wins.
      </p>
      ${e.map((t,o)=>n`
        <div class="rule-block">
          <div class="rule-header">
            <ha-textfield .value=${t.label??""} label="Rule label" style="flex:1"
              @input=${i=>{let a=[...e];a[o]={...a[o],label:i.target.value||void 0},this._set({conditions:a})}}></ha-textfield>
            <div class="segment-control">
              <button class="segment-btn ${t.operator==="and"?"active":""}"
                @click=${()=>{let i=[...e];i[o]={...i[o],operator:"and"},this._set({conditions:i})}}>AND</button>
              <button class="segment-btn ${t.operator==="or"?"active":""}"
                @click=${()=>{let i=[...e];i[o]={...i[o],operator:"or"},this._set({conditions:i})}}>OR</button>
            </div>
            <button class="delete-btn" @click=${()=>{let i=[...e];i.splice(o,1),this._set({conditions:i})}}>
              <ha-icon .icon=${"mdi:delete"}></ha-icon>
            </button>
          </div>
          ${t.conditions.map((i,a)=>n`
            <div style="margin-bottom:4px">
              <ha-entity-picker .hass=${this.hass} .value=${i.entity??""} label="Entity"
                style="display:block;width:100%"
                @value-changed=${c=>{let l=[...e],d=[...l[o].conditions];d[a]={...d[a],entity:c.detail.value},l[o]={...l[o],conditions:d},this._set({conditions:l})}}></ha-entity-picker>
            </div>
            <div class="condition-row">
              <ha-textfield .value=${i.attribute??""} label="Attribute (opt.)"
                @input=${c=>{let l=[...e],d=[...l[o].conditions];d[a]={...d[a],attribute:c.target.value||void 0},l[o]={...l[o],conditions:d},this._set({conditions:l})}}></ha-textfield>
              <select @change=${c=>{let l=[...e],d=[...l[o].conditions];d[a]={...d[a],operator:c.target.value},l[o]={...l[o],conditions:d},this._set({conditions:l})}} style="padding:6px;border-radius:6px;border:1px solid var(--divider-color)">
                ${["eq","neq","lt","gt","lte","gte","contains"].map(c=>n`
                  <option value=${c} ?selected=${i.operator===c}>${c}</option>
                `)}
              </select>
              <ha-textfield .value=${String(i.value)} label="Value"
                @input=${c=>{let l=[...e],d=[...l[o].conditions],p=c.target.value,g=["lt","gt","lte","gte"],u=parseFloat(p);d[a]={...d[a],value:g.includes(i.operator)&&!isNaN(u)?u:p},l[o]={...l[o],conditions:d},this._set({conditions:l})}}></ha-textfield>
              <button class="delete-btn" @click=${()=>{let c=[...e],l=[...c[o].conditions];l.splice(a,1),c[o]={...c[o],conditions:l},this._set({conditions:c})}}><ha-icon .icon=${"mdi:close"}></ha-icon></button>
            </div>
          `)}
          <button class="add-btn" @click=${()=>{let i=[...e];i[o]={...i[o],conditions:[...i[o].conditions,{entity:"",operator:"eq",value:""}]},this._set({conditions:i})}}><ha-icon .icon=${"mdi:plus"}></ha-icon> Add Condition</button>
          <div style="margin-top:10px;font-size:0.8rem;font-weight:600;color:var(--secondary-text-color)">Effect</div>
          <div class="scheme-row" style="margin-bottom:6px">
            ${k.map(i=>n`
              <div class="scheme-swatch" title=${i.name} style="background:${i.bg};border:3px solid ${i.border}"
                @click=${()=>{let a=[...e];a[o]={...a[o],effect:{...a[o].effect,background_color:i.bg,border_color:i.border}},this._set({conditions:a})}}></div>
            `)}
          </div>
          <div style="display:flex;gap:8px;flex-wrap:wrap">
            <div class="color-row"><label>Background</label>
              <input type="color" .value=${t.effect.background_color??"#1c1c2e"}
                @input=${i=>{let a=[...e];a[o]={...a[o],effect:{...a[o].effect,background_color:i.target.value}},this._set({conditions:a})}} /></div>
            <div class="color-row"><label>Border</label>
              <input type="color" .value=${t.effect.border_color??"#ffffff"}
                @input=${i=>{let a=[...e];a[o]={...a[o],effect:{...a[o].effect,border_color:i.target.value}},this._set({conditions:a})}} /></div>
          </div>
        </div>
      `)}
      <button class="add-btn" @click=${()=>{let t={id:crypto.randomUUID(),operator:"and",conditions:[{entity:"",operator:"eq",value:""}],effect:{}};this._set({conditions:[...e,t]})}}><ha-icon .icon=${"mdi:plus-circle"}></ha-icon> Add Rule</button>
    `}_renderThemePicker(){let e=this._config.card_theme??"default";return n`
      <div class="row">
        <label>Card Theme</label>
        <div class="theme-grid">
          ${Mt.map(t=>n`
            <button
              class="theme-btn ${e===t.value?"active":""}"
              @click=${()=>this._set({card_theme:t.value==="default"?void 0:t.value})}
              title=${t.label}
            >
              <ha-icon class="theme-icon" .icon=${t.icon}></ha-icon>
              <span class="theme-btn-label">${t.label}</span>
            </button>
          `)}
        </div>
      </div>
    `}_renderDisplayTab(){return n`
      ${this._renderThemePicker()}
      <div class="row"><ha-formfield label="Group people by zone">
        <ha-switch .checked=${this._config.group_by_zone===!0}
          @change=${e=>this._set({group_by_zone:e.target.checked})}></ha-switch>
      </ha-formfield></div>
      <div class="row"><ha-formfield label="Show zone summary">
        <ha-switch .checked=${this._config.show_summary===!0}
          @change=${e=>this._set({show_summary:e.target.checked})}></ha-switch>
      </ha-formfield></div>
      <div class="row"><ha-formfield label="Show devices">
        <ha-switch .checked=${this._config.show_devices!==!1}
          @change=${e=>this._set({show_devices:e.target.checked})}></ha-switch>
      </ha-formfield></div>
      <div class="row"><ha-formfield label="Show last seen">
        <ha-switch .checked=${this._config.show_last_seen!==!1}
          @change=${e=>this._set({show_last_seen:e.target.checked})}></ha-switch>
      </ha-formfield></div>
      <div class="row"><ha-formfield label="Show ETA when away">
        <ha-switch .checked=${this._config.show_eta!==!1}
          @change=${e=>this._set({show_eta:e.target.checked})}></ha-switch>
      </ha-formfield></div>
      <div class="row"><ha-formfield label="Show notification badge">
        <ha-switch .checked=${this._config.show_notification_badge!==!1}
          @change=${e=>this._set({show_notification_badge:e.target.checked})}></ha-switch>
      </ha-formfield></div>
      <div class="row">
        <label>Offline threshold (minutes, 0 = disabled)</label>
        <ha-textfield
          .value=${String(this._config.offline_threshold??0)}
          type="number" min="0" placeholder="0"
          @input=${e=>{let t=parseInt(e.target.value);this._set({offline_threshold:t>0?t:void 0})}}></ha-textfield>
      </div>
    `}render(){return!this._config||!this.hass?n``:n`
      <div class="tabs">
        ${[{key:"people",label:"People"},{key:"appearance",label:"Appearance"},{key:"conditions",label:"Conditions"},{key:"display",label:"Display"}].map(t=>n`
          <div class="tab ${this._activeTab===t.key?"active":""}"
            @click=${()=>{this._activeTab=t.key}}>${t.label}</div>
        `)}
      </div>
      ${this._activeTab==="people"?this._renderPeopleTab():""}
      ${this._activeTab==="appearance"?this._renderAppearanceTab():""}
      ${this._activeTab==="conditions"?this._renderConditionsTab():""}
      ${this._activeTab==="display"?this._renderDisplayTab():""}
    `}};D.styles=v`
    .tabs { display: flex; border-bottom: 1px solid var(--divider-color, #e0e0e0); margin-bottom: 16px; }
    .tab { padding: 8px 14px; font-size: 0.82rem; font-weight: 600; cursor: pointer;
      border-bottom: 2px solid transparent; color: var(--secondary-text-color); user-select: none; }
    .tab.active { color: var(--primary-color); border-bottom-color: var(--primary-color); }
    .row { margin-bottom: 12px; }
    .row label { display: block; font-size: 0.8rem; color: var(--secondary-text-color); margin-bottom: 4px; }
    .person-block { border: 1px solid var(--divider-color, rgba(0,0,0,0.15)); border-radius: 8px; padding: 8px; margin-bottom: 8px; }
    .person-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px; }
    .person-label { font-size: 0.78rem; color: var(--secondary-text-color); }
    .add-btn { display: inline-flex; align-items: center; gap: 4px; font-size: 0.82rem; cursor: pointer;
      color: var(--primary-color); padding: 6px 0; background: none; border: none; }
    .delete-btn { cursor: pointer; color: var(--error-color, #f44336); background: none; border: none; }
    .segment-control { display: flex; gap: 4px; flex-wrap: wrap; }
    .segment-btn { padding: 4px 12px; border-radius: 6px; font-size: 0.8rem; cursor: pointer;
      border: 1px solid var(--divider-color); background: none; }
    .segment-btn.active { background: var(--primary-color); color: #fff; border-color: var(--primary-color); }
    ha-textfield, ha-entity-picker { display: block; width: 100%; }
    .detail-row { margin-top: 4px; opacity: 0.8; }
    .rule-block { border: 1px solid var(--divider-color, rgba(0,0,0,0.15)); border-radius: 8px; padding: 10px; margin-bottom: 8px; }
    .rule-header { display: flex; align-items: center; gap: 8px; margin-bottom: 8px; }
    .condition-row { display: flex; align-items: center; gap: 8px; border: 1px solid var(--divider-color, rgba(0,0,0,0.15)); padding: 8px; border-radius: 8px; margin-bottom: 6px; }
    .scheme-row { display: flex; align-items: center; flex-wrap: wrap; gap: 6px; margin: 2px 0 4px; }
    .scheme-swatch { width: 26px; height: 26px; border-radius: 5px; cursor: pointer; flex-shrink: 0; }
    .color-row { display: flex; align-items: center; gap: 8px; }
    .theme-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 8px;
    }
    .theme-btn {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
      padding: 10px 6px 8px;
      border-radius: 10px;
      border: 2px solid var(--divider-color, rgba(0,0,0,0.15));
      background: none;
      cursor: pointer;
      transition: border-color 0.15s, background 0.15s;
      text-align: center;
    }
    .theme-btn:hover {
      background: rgba(var(--rgb-primary-color, 33,150,243), 0.06);
    }
    .theme-btn.active {
      border-color: var(--primary-color);
      background: rgba(var(--rgb-primary-color, 33,150,243), 0.1);
    }
    .theme-btn-label {
      font-size: 0.8rem;
      font-weight: 600;
      color: var(--primary-text-color);
    }
    .theme-icon {
      --mdc-icon-size: 22px;
      color: var(--secondary-text-color);
    }
    .theme-btn.active .theme-icon {
      color: var(--primary-color);
    }
  `,h([m({attribute:!1})],D.prototype,"hass",2),h([w()],D.prototype,"_config",2),h([w()],D.prototype,"_activeTab",2),D=h([y("family-card-editor")],D);window.customCards=window.customCards??[];window.customCards.push({type:"family-card",name:"Family Card",description:"At-a-glance status overview for multiple people.",preview:!0});var O=class extends b{constructor(){super(...arguments);this._expandedEntity=null;this._onThemeUpdated=()=>{this.requestUpdate()}}static getStubConfig(e){return{people:e?Object.keys(e.states).filter(o=>o.startsWith("person.")).slice(0,6).map(o=>({entity:o})):[],density:"detailed",show_devices:!0,show_last_seen:!0,show_notification_badge:!0}}static getConfigElement(){return document.createElement("family-card-editor")}setConfig(e){this._config={density:"detailed",show_devices:!0,show_last_seen:!0,show_eta:!0,show_notification_badge:!0,zone_styles:[],conditions:[],...e},this.setAttribute("density",this._config.density??"detailed")}getCardSize(){return 4}connectedCallback(){super.connectedCallback(),window.addEventListener(F,this._onThemeUpdated)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener(F,this._onThemeUpdated)}updated(){if(!this._config||!this.hass)return;let e=this._config.conditions?.length?le(this._config.conditions,this.hass):{},t=e.background_color;t?this.style.setProperty("--pc-background",t):this.style.removeProperty("--pc-background");let o=e.border_color;o?(this.style.setProperty("--pc-border-color",o),this.style.setProperty("--pc-border-width",`${e.border_width??2}px`),this.style.setProperty("--pc-glow-color",ve(o,.25))):(this.style.removeProperty("--pc-border-color"),this.style.removeProperty("--pc-border-width"),this.style.removeProperty("--pc-glow-color")),this._config.background_image?this.style.setProperty("--pc-background-image",`url('${this._config.background_image}')`):this.style.removeProperty("--pc-background-image"),this.setAttribute("card-theme",this._config.card_theme??"default")}_zoneStyles(){return P(this._config.zone_styles??[])}_getPersonName(e){return e.name?e.name:this.hass.states[e.entity]?.attributes?.friendly_name??e.entity.split(".")[1].replace(/_/g," ")}_getPersonPhoto(e){return e.photo?e.photo:this.hass.states[e.entity]?.attributes?.entity_picture}_getPersonZone(e){return this.hass.states[e.entity]?.state??"unknown"}_isPersonStale(e){let t=e.offline_threshold??this._config.offline_threshold;if(!t||t<=0)return!1;let o=this.hass.states[e.entity]?.last_updated;return o?(Date.now()-new Date(o).getTime())/6e4>t:!1}_personShowsBadge(e){return this._config.show_notification_badge===!1||e.show_notification_badge===!1?!1:be(this.hass,e.devices??[],e.entity)}_renderAvatar(e,t){let o=this._getPersonPhoto(e),i=this._getPersonName(e);return o?n`<img class="avatar ${t?"stale":""}" src=${o} alt=${i} />`:n`<div class="avatar-placeholder ${t?"stale":""}"><ha-icon icon="mdi:account"></ha-icon></div>`}_renderCompactRow(e){let t=this._getPersonZone(e),o=this._zoneStyles(),i=M(t,o),a=this._isPersonStale(e),c=this._personShowsBadge(e),l=e.devices??[],d=l.map(u=>j(this.hass,u)).filter(u=>u!==null),p=d.length>0?Math.min(...d):null,g=p!==null&&p<=(l[0]?.battery_threshold??20)?"#f44336":p!==null&&p<50?"#ff9800":"#4caf50";return n`
      <div class="person-row" style="--row-accent:${i?.border_color??"rgba(255,255,255,0.1)"}">
        <div class="person-row-inner">
          ${this._renderAvatar(e,a)}
          <div class="person-info">
            <div class="person-name">${this._getPersonName(e)}</div>
            <div class="person-zone">
              <person-card-location-badge
                .zone=${t}
                .zoneStyles=${o}
              ></person-card-location-badge>
            </div>
          </div>
          <div class="person-row-meta">
            ${p!==null?n`<div class="status-dot" style="background:${g}"></div>`:""}
            ${c?n`<person-card-notification-badge color="#f44336" icon="mdi:alert-circle"></person-card-notification-badge>`:""}
          </div>
        </div>
      </div>
    `}_renderMiniRow(e){let t=this._getPersonZone(e),o=this._zoneStyles(),i=M(t,o),a=this._isPersonStale(e),c=this._personShowsBadge(e),l=e.devices??[];return n`
      <div class="person-row" style="--row-accent:${i?.border_color??"rgba(255,255,255,0.1)"}">
        <div class="person-row-inner">
          ${this._renderAvatar(e,a)}
          <div class="person-info">
            <div class="person-name">${this._getPersonName(e)}</div>
            <div class="person-zone">
              <person-card-location-badge .zone=${t} .zoneStyles=${o}></person-card-location-badge>
            </div>
          </div>
          <div class="person-row-meta">
            ${l.slice(0,3).map(d=>{let p=j(this.hass,d),g=d.battery_threshold??20,u=p!==null?p<=g?"#f44336":p<50?"#ff9800":"#4caf50":"#888";return n`
                <div class="device-summary">
                  <ha-icon .icon=${d.icon??"mdi:devices"} style="--mdc-icon-size:14px;color:rgba(255,255,255,0.5)"></ha-icon>
                  ${p!==null?n`<span class="device-summary-pct" style="color:${u}">${Math.round(p)}%</span>`:""}
                  <div class="status-dot" style="background:${de(this.hass,d)==="online"?"#4caf50":"#f44336"}"></div>
                </div>
              `})}
            ${c?n`<person-card-notification-badge color="#f44336" icon="mdi:alert-circle"></person-card-notification-badge>`:""}
          </div>
        </div>
      </div>
    `}_getZoneGroups(e){let t=new Map;for(let o of e){let i=this._getPersonZone(o);t.has(i)||t.set(i,[]),t.get(i).push(o)}return Array.from(t.entries()).sort(([o,i],[a,c])=>{let l=o.toLowerCase().replace(/\s+/g,"_"),d=a.toLowerCase().replace(/\s+/g,"_");return l==="home"?-1:d==="home"?1:c.length-i.length}).map(([o,i])=>({zone:o,people:i}))}_renderSummary(e){let t=this._zoneStyles(),o=new Map;for(let a of e){let c=this._getPersonZone(a);o.set(c,(o.get(c)??0)+1)}let i=Array.from(o.entries()).sort(([a],[c])=>{let l=a.toLowerCase().replace(/\s+/g,"_"),d=c.toLowerCase().replace(/\s+/g,"_");return l==="home"?-1:d==="home"?1:o.get(c)-o.get(a)});return n`
      <div class="summary-bar">
        ${i.map(([a,c])=>{let d=M(a,t)?.border_color??"rgba(255,255,255,0.3)",p=Pe(a,t);return n`
            <div class="summary-item">
              <div class="summary-dot"
                style="background:${d};box-shadow:0 0 5px ${d}88">
              </div>
              <span class="summary-count">${c}</span>
              <span class="summary-label">${p}</span>
            </div>
          `})}
      </div>
    `}_renderZoneGroup(e,t,o){let i=this._zoneStyles(),c=M(e,i)?.border_color??"rgba(255,255,255,0.2)",l=et(e,i),d=Pe(e,i),p=o==="mini";return n`
      <div class="zone-group">
        <div class="zone-group-header" style="--group-accent:${c}">
          <ha-icon class="group-icon" .icon=${l} style="color:${c}"></ha-icon>
          <span class="group-label">${d}</span>
          <span class="group-count">${t.length}</span>
        </div>
        <div class="person-rows ${p?"mini-grid":""}">
          ${t.map(g=>this._renderRow(g,o))}
        </div>
      </div>
    `}_renderRow(e,t){return t==="compact"?this._renderCompactRow(e):t==="mini"?this._renderMiniRow(e):this._renderDetailedRow(e)}render(){if(!this._config||!this.hass)return n``;let e=nt(this.hass,this._config),t=this._config.density??"detailed",o=this._config.group_by_zone??!1,i=this._config.show_summary??!1,c=o?n`${this._getZoneGroups(e).map(({zone:l,people:d})=>this._renderZoneGroup(l,d,t))}`:n`
          <div class="person-rows ${t==="mini"?"mini-grid":""}">
            ${e.map(l=>this._renderRow(l,t))}
          </div>
        `;return n`
      <div class="card-content">
        ${this._config.background_image?n`<div class="card-background"></div>`:""}
        ${i?this._renderSummary(e):""}
        ${c}
      </div>
    `}_renderDetailedRow(e){let t=this._getPersonZone(e),o=this._zoneStyles(),i=M(t,o),a=this._isPersonStale(e),c=this._personShowsBadge(e),l=e.devices??[],d=this._expandedEntity===e.entity,p=this.hass.states[e.entity],g=p?.last_changed?ce(p.last_changed):"",u=i?.border_color??"rgba(255,255,255,0.1)",x=t==="not_home"&&e.address_entity?(()=>{let f=this.hass.states[e.address_entity];return f&&f.state!=="unavailable"&&f.state!=="unknown"?f.state:""})():"";return n`
      <div class="person-row" style="--row-accent:${u}"
        @click=${()=>{this._expandedEntity=d?null:e.entity}}>
        <div class="person-row-inner">
          ${this._renderAvatar(e,a)}
          <div class="person-info">
            <div class="person-name">${this._getPersonName(e)}</div>
            <div class="person-zone" style="display:flex;align-items:center;gap:6px">
              <person-card-location-badge .zone=${t} .zoneStyles=${o} .address=${x}></person-card-location-badge>
              ${g?n`<span style="font-size:0.7rem;color:rgba(255,255,255,0.35)">· ${g}</span>`:""}
            </div>
          </div>
          <div class="person-row-meta">
            ${l.slice(0,3).map(f=>{let $=j(this.hass,f),z=f.battery_threshold??20,E=$!==null?$<=z?"#f44336":$<50?"#ff9800":"#4caf50":"#888";return $!==null?n`
                <div class="device-summary">
                  <ha-icon .icon=${f.icon??"mdi:devices"} style="--mdc-icon-size:12px;color:rgba(255,255,255,0.4)"></ha-icon>
                  <span class="device-summary-pct" style="color:${E}">${Math.round($)}%</span>
                </div>`:""})}
            ${c?n`<person-card-notification-badge color="#f44336" icon="mdi:alert-circle"></person-card-notification-badge>`:""}
            <span class="chevron ${d?"open":""}">▾</span>
          </div>
        </div>

        ${d?n`
          <div class="expanded-panel" @click=${f=>f.stopPropagation()}>
            ${l.length>0?n`
              <div class="device-list">
                ${l.map(f=>n`
                  <person-card-device-tile
                    .hass=${this.hass}
                    .device=${f}
                    .showLabels=${!0}
                  ></person-card-device-tile>
                `)}
              </div>
            `:""}
            <div class="expanded-footer">
              ${(e.show_last_seen??this._config.show_last_seen)&&p?.last_updated?n`
                <person-card-last-seen .lastUpdated=${p.last_updated} .format=${"relative"}></person-card-last-seen>
              `:""}
              ${(e.show_eta??this._config.show_eta)&&e.eta_entity?n`
                <person-card-eta-display
                  .hass=${this.hass}
                  .etaEntity=${e.eta_entity}
                  .personZone=${t}
                ></person-card-eta-display>
              `:""}
            </div>
            <div class="view-full-link"
              @click=${()=>{let f=e.tap_action;f&&"navigation_path"in f?(history.pushState(null,"",f.navigation_path),window.dispatchEvent(new PopStateEvent("popstate"))):this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:e.entity},bubbles:!0,composed:!0}))}}>
              View full card →
            </div>
          </div>
        `:""}
      </div>
    `}};O.styles=st,h([m({attribute:!1})],O.prototype,"hass",2),h([w()],O.prototype,"_config",2),h([w()],O.prototype,"_expandedEntity",2),O=h([y("family-card")],O);window.customCards=window.customCards??[];window.customCards.push({type:"person-card",name:"Person Card",description:"At-a-glance person status: location, devices, ETA, and conditional styling.",preview:!0});var G=class extends b{constructor(){super(...arguments);this._sizeTier="medium";this._onThemeUpdated=()=>{this.requestUpdate()}}static getStubConfig(e){let t=e?Object.keys(e.states).find(i=>i.startsWith("person.")):void 0,o=[];if(e&&t){let i=e.states[t]?.attributes?.source?[e.states[t].attributes.source]:Object.keys(e.states).filter(a=>a.startsWith("device_tracker.")).slice(0,2);for(let a of i){let c=a.split(".")[1],d=[`sensor.${c}_battery_level`,`sensor.${c}_battery`].find(p=>e.states[p]);o.push({entity:a,...d?{battery_entity:d}:{}})}}return{person_entity:t??"person.example",devices:o,size:"auto",show_eta:!0,show_last_seen:!0,show_notification_badge:!0,zone_styles:[],conditions:[]}}setConfig(e){if(!e.person_entity)throw new Error("person_entity is required");this._config=Xe({size:"auto",show_eta:!0,show_last_seen:!0,show_notification_badge:!0,devices:[],zone_styles:[],conditions:[],...e}),this.isConnected&&this._setupResizeObserver()}getCardSize(){return 3}static getConfigElement(){return document.createElement("person-card-editor")}connectedCallback(){super.connectedCallback(),this._config&&this._setupResizeObserver(),window.addEventListener(F,this._onThemeUpdated)}disconnectedCallback(){super.disconnectedCallback(),this._resizeObserver?.disconnect(),window.removeEventListener(F,this._onThemeUpdated)}_setSizeTier(e){this._sizeTier!==e&&(this._sizeTier=e,this.setAttribute("size-tier",e),this.requestUpdate())}_setupResizeObserver(){this._resizeObserver?.disconnect(),this._resizeObserver=void 0,this._config.size==="auto"?(this._resizeObserver=new ResizeObserver(e=>{let t=e[0]?.contentRect.width??300;this._setSizeTier(t<200?"small":t<400?"medium":"large")}),this._resizeObserver.observe(this)):this._config.size&&this._setSizeTier(this._config.size)}get _personState(){return this.hass?.states[this._config.person_entity]}get _personZone(){return this._personState?.state??"unknown"}updated(){if(!this._config||!this.hass)return;let e=this._config.conditions?.length?le(this._config.conditions,this.hass):{},t=P(this._config.zone_styles??[]).find(a=>a.zone===this._personZone),o=e.background_color??t?.background_color;o?this.style.setProperty("--pc-background",o):this.style.removeProperty("--pc-background");let i=e.border_color??t?.border_color;i?(this.style.setProperty("--pc-border-color",i),this.style.setProperty("--pc-border-width",`${e.border_width??2}px`),this.style.setProperty("--pc-glow-color",ve(i,.25))):(this.style.removeProperty("--pc-border-color"),this.style.removeProperty("--pc-border-width"),this.style.removeProperty("--pc-glow-color")),this.setAttribute("card-theme",this._config.card_theme??"default"),this._config.background_image?this.style.setProperty("--pc-background-image",`url('${this._config.background_image}')`):this.style.removeProperty("--pc-background-image")}_renderHeroDevice(e){let t=e.battery_entity?this.hass.states[e.battery_entity]:void 0,o=t?parseFloat(t.state):NaN,i=e.battery_threshold??20,a=isNaN(o)?"#888":fe(o,i),c=e.connectivity_entity?this.hass.states[e.connectivity_entity]:void 0,l=c?c.state==="on":null,d=e.icon??"mdi:devices",p=e.name??e.entity.split(".")[1]?.replace(/_/g," ")??"";return n`
      <div class="hero-device-card">
        <div class="hero-device-icon"><ha-icon .icon=${d}></ha-icon></div>
        <div class="hero-device-name">${p}</div>
        ${isNaN(o)?"":n`
          <div class="hero-battery-bar">
            <div class="hero-battery-fill" style="width:${Math.min(o,100)}%;background:${a}"></div>
          </div>
          <div class="hero-battery-pct" style="color:${a}">${Math.round(o)}%</div>
        `}
        ${l!==null?n`
          <div class="hero-connectivity" style="background:${l?"#4caf50":"#f44336"}"></div>
        `:""}
      </div>
    `}_renderHero(e){let{name:t,photo:o,personState:i,effect:a,showBadge:c,isStale:l,address:d,devices:p}=e,g=P(this._config.zone_styles??[]).find(z=>z.zone===this._personZone),u=a.border_color??g?.border_color,x=u?`box-shadow: 0 0 0 4px ${u}66, 0 0 32px ${u}44;`:"box-shadow: 0 0 0 4px rgba(255,255,255,0.15), 0 0 20px rgba(255,255,255,0.05);",f=!!(this._config.show_last_seen&&i?.last_updated),$=p;return n`
      <div class="card-content">
        ${this._config.background_image?n`<div class="card-background"></div>`:""}

        ${c?n`
          <div style="position:absolute;top:12px;right:12px;z-index:2">
            <person-card-notification-badge
              .color=${a.badge_color??"#f44336"}
              .icon=${a.badge_icon??"mdi:alert-circle"}
            ></person-card-notification-badge>
          </div>
        `:""}

        <!-- Avatar -->
        <div class="avatar-wrapper">
          ${o?n`<img class="avatar ${l?"stale":""}" src=${o} alt=${t} style=${x} />`:n`<div class="avatar-placeholder ${l?"stale":""}" style=${x}><ha-icon icon="mdi:account"></ha-icon></div>`}
          ${l?n`<div class="stale-indicator"><ha-icon .icon=${"mdi:clock-alert-outline"}></ha-icon></div>`:""}
        </div>

        <!-- Name + Zone -->
        <div class="name">${t}</div>
        <div class="hero-zone">
          <person-card-location-badge
            .zone=${this._personZone}
            .zoneStyles=${P(this._config.zone_styles??[])}
            .address=${d}
          ></person-card-location-badge>
        </div>

        <!-- Device grid -->
        ${$.length>0?n`
          <div class="hero-devices">
            ${$.map(z=>this._renderHeroDevice(z))}
          </div>
        `:""}

        <!-- Last seen -->
        ${f?n`
          <div class="footer">
            <person-card-last-seen
              .lastUpdated=${i.last_updated}
              .format=${"relative"}
            ></person-card-last-seen>
          </div>
        `:""}
      </div>
    `}_renderStats(e){let{name:t,photo:o,personState:i,effect:a,showBadge:c,isStale:l,address:d,devices:p}=e,g=i?.last_changed?ce(i.last_changed):"\u2014",u=i?.last_updated?ce(i.last_updated):"\u2014",x=p;return n`
      <div class="card-content">
        ${this._config.background_image?n`<div class="card-background"></div>`:""}

        <!-- Header -->
        <div class="header">
          <div class="avatar-wrapper">
            ${o?n`<img class="avatar ${l?"stale":""}" src=${o} alt=${t} />`:n`<div class="avatar-placeholder ${l?"stale":""}"><ha-icon icon="mdi:account"></ha-icon></div>`}
            ${l?n`<div class="stale-indicator"><ha-icon .icon=${"mdi:clock-alert-outline"}></ha-icon></div>`:""}
          </div>
          <div class="name-zone">
            <div class="name">${t}</div>
            <person-card-location-badge
              .zone=${this._personZone}
              .zoneStyles=${P(this._config.zone_styles??[])}
              .address=${d}
            ></person-card-location-badge>
            <div class="stats-since">In zone ${g}</div>
          </div>
          ${c?n`
            <person-card-notification-badge
              .color=${a.badge_color??"#f44336"}
              .icon=${a.badge_icon??"mdi:alert-circle"}
            ></person-card-notification-badge>
          `:""}
        </div>

        <!-- Stat boxes -->
        <div class="stats-boxes">
          <div class="stats-box">
            <div class="stats-box-label">In zone</div>
            <div class="stats-box-value">${g}</div>
          </div>
          <div class="stats-box">
            <div class="stats-box-label">Last seen</div>
            <div class="stats-box-value">${u}</div>
          </div>
        </div>

        <!-- Devices -->
        ${x.length>0?n`
          <div class="divider"></div>
          <div class="devices">
            ${x.map(f=>n`
              <person-card-device-tile
                .hass=${this.hass}
                .device=${f}
                .showLabels=${!0}
              ></person-card-device-tile>
            `)}
          </div>
        `:""}
      </div>
    `}render(){if(!this._config||!this.hass)return n``;let e=this._personState,t=this._config.name??e?.attributes?.friendly_name??this._config.person_entity.split(".")[1].replace(/_/g," "),o=this._config.photo??e?.attributes?.entity_picture,i=this._config.conditions?.length?le(this._config.conditions,this.hass):{},a=this._config.show_notification_badge!==!1&&(i.badge_color||i.badge_icon?!0:be(this.hass,this._config.devices??[],this._config.person_entity)),c=this._sizeTier==="small",l=this._sizeTier==="large",d=this._config.devices??[],p=e?.last_updated??"",g=this._config.eta_entity??"",u=!!(this._config.offline_threshold&&this._config.offline_threshold>0&&e?.last_updated)&&(Date.now()-new Date(e.last_updated).getTime())/6e4>this._config.offline_threshold,x=!c&&this._personZone==="not_home"&&this._config.address_entity?(()=>{let E=this.hass.states[this._config.address_entity];return E&&E.state!=="unavailable"&&E.state!=="unknown"?E.state:""})():"",f={name:t,photo:o,personState:e,effect:i,showBadge:a,isStale:u,address:x,devices:d};if(this._sizeTier==="hero")return this._renderHero(f);if(this._sizeTier==="stats")return this._renderStats(f);let $=!!(this._config.show_eta&&g),z=!!(this._config.show_last_seen&&p);return n`
      <div class="card-content">
        ${this._config.background_image?n`<div class="card-background"></div>`:""}

        <!-- Header -->
        <div class="header">
          <div class="avatar-wrapper">
            ${o?n`<img class="avatar ${u?"stale":""}" src=${o} alt=${t} />`:n`<div class="avatar-placeholder ${u?"stale":""}"><ha-icon icon="mdi:account"></ha-icon></div>`}
            ${u?n`
              <div class="stale-indicator">
                <ha-icon .icon=${"mdi:clock-alert-outline"}></ha-icon>
              </div>
            `:""}
          </div>
          <div class="name-zone">
            <div class="name">${t}</div>
            <person-card-location-badge
              .zone=${this._personZone}
              .zoneStyles=${P(this._config.zone_styles??[])}
              .address=${x}
            ></person-card-location-badge>
          </div>
          ${a?n`
            <person-card-notification-badge
              .color=${i.badge_color??"#f44336"}
              .icon=${i.badge_icon??"mdi:alert-circle"}
            ></person-card-notification-badge>
          `:""}
        </div>

        <!-- Devices (medium + large) -->
        ${!c&&d.length>0?n`
          <div class="divider"></div>
          <div class="devices">
            ${d.map(E=>n`
              <person-card-device-tile
                .hass=${this.hass}
                .device=${E}
                .showLabels=${l}
              ></person-card-device-tile>
            `)}
          </div>
        `:""}

        <!-- Footer (large only) -->
        ${l&&($||z)?n`
          <div class="divider"></div>
          <div class="footer">
            ${$?n`
              <person-card-eta-display
                .hass=${this.hass}
                .etaEntity=${g}
                .personZone=${this._personZone}
              ></person-card-eta-display>
            `:""}
            ${z?n`
              <person-card-last-seen
                .lastUpdated=${p}
                .format=${"relative"}
              ></person-card-last-seen>
            `:""}
          </div>
        `:""}
      </div>
    `}};G.styles=Ke,h([m({attribute:!1})],G.prototype,"hass",2),h([w()],G.prototype,"_config",2),G=h([y("person-card")],G);export{G as PersonCard};
/*! Bundled license information:

@lit/reactive-element/css-tag.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/reactive-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/lit-html.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-element/lit-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/is-server.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/custom-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/property.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/state.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/event-options.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/base.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-all.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-async.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-assigned-elements.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-assigned-nodes.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directive.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directives/style-map.js:
  (**
   * @license
   * Copyright 2018 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
