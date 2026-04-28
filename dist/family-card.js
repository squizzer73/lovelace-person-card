var et=Object.defineProperty;var tt=Object.getOwnPropertyDescriptor;var h=(s,t,e,r)=>{for(var o=r>1?void 0:r?tt(t,e):t,n=s.length-1,i;n>=0;n--)(i=s[n])&&(o=(r?i(t,e,o):i(o))||o);return r&&o&&et(t,e,o),o};var te=globalThis,re=te.ShadowRoot&&(te.ShadyCSS===void 0||te.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,ae=Symbol(),xe=new WeakMap,B=class{constructor(t,e,r){if(this._$cssResult$=!0,r!==ae)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(re&&t===void 0){let r=e!==void 0&&e.length===1;r&&(t=xe.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),r&&xe.set(e,t))}return t}toString(){return this.cssText}},_e=s=>new B(typeof s=="string"?s:s+"",void 0,ae),y=(s,...t)=>{let e=s.length===1?s[0]:t.reduce((r,o,n)=>r+(i=>{if(i._$cssResult$===!0)return i.cssText;if(typeof i=="number")return i;throw Error("Value passed to 'css' function must be a 'css' function result: "+i+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(o)+s[n+1],s[0]);return new B(e,s,ae)},$e=(s,t)=>{if(re)s.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let r=document.createElement("style"),o=te.litNonce;o!==void 0&&r.setAttribute("nonce",o),r.textContent=e.cssText,s.appendChild(r)}},le=re?s=>s:s=>s instanceof CSSStyleSheet?(t=>{let e="";for(let r of t.cssRules)e+=r.cssText;return _e(e)})(s):s;var{is:rt,defineProperty:ot,getOwnPropertyDescriptor:nt,getOwnPropertyNames:st,getOwnPropertySymbols:it,getPrototypeOf:at}=Object,k=globalThis,we=k.trustedTypes,lt=we?we.emptyScript:"",ct=k.reactiveElementPolyfillSupport,q=(s,t)=>s,V={toAttribute(s,t){switch(t){case Boolean:s=s?lt:null;break;case Object:case Array:s=s==null?s:JSON.stringify(s)}return s},fromAttribute(s,t){let e=s;switch(t){case Boolean:e=s!==null;break;case Number:e=s===null?null:Number(s);break;case Object:case Array:try{e=JSON.parse(s)}catch{e=null}}return e}},oe=(s,t)=>!rt(s,t),ke={attribute:!0,type:String,converter:V,reflect:!1,useDefault:!1,hasChanged:oe};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),k.litPropertyMetadata??(k.litPropertyMetadata=new WeakMap);var $=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??(this.l=[])).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=ke){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let r=Symbol(),o=this.getPropertyDescriptor(t,r,e);o!==void 0&&ot(this.prototype,t,o)}}static getPropertyDescriptor(t,e,r){let{get:o,set:n}=nt(this.prototype,t)??{get(){return this[e]},set(i){this[e]=i}};return{get:o,set(i){let l=o?.call(this);n?.call(this,i),this.requestUpdate(t,l,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??ke}static _$Ei(){if(this.hasOwnProperty(q("elementProperties")))return;let t=at(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(q("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(q("properties"))){let e=this.properties,r=[...st(e),...it(e)];for(let o of r)this.createProperty(o,e[o])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[r,o]of e)this.elementProperties.set(r,o)}this._$Eh=new Map;for(let[e,r]of this.elementProperties){let o=this._$Eu(e,r);o!==void 0&&this._$Eh.set(o,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let r=new Set(t.flat(1/0).reverse());for(let o of r)e.unshift(le(o))}else t!==void 0&&e.push(le(t));return e}static _$Eu(t,e){let r=e.attribute;return r===!1?void 0:typeof r=="string"?r:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??(this._$EO=new Set)).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let r of e.keys())this.hasOwnProperty(r)&&(t.set(r,this[r]),delete this[r]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return $e(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,r){this._$AK(t,r)}_$ET(t,e){let r=this.constructor.elementProperties.get(t),o=this.constructor._$Eu(t,r);if(o!==void 0&&r.reflect===!0){let n=(r.converter?.toAttribute!==void 0?r.converter:V).toAttribute(e,r.type);this._$Em=t,n==null?this.removeAttribute(o):this.setAttribute(o,n),this._$Em=null}}_$AK(t,e){let r=this.constructor,o=r._$Eh.get(t);if(o!==void 0&&this._$Em!==o){let n=r.getPropertyOptions(o),i=typeof n.converter=="function"?{fromAttribute:n.converter}:n.converter?.fromAttribute!==void 0?n.converter:V;this._$Em=o;let l=i.fromAttribute(e,n.type);this[o]=l??this._$Ej?.get(o)??l,this._$Em=null}}requestUpdate(t,e,r,o=!1,n){if(t!==void 0){let i=this.constructor;if(o===!1&&(n=this[t]),r??(r=i.getPropertyOptions(t)),!((r.hasChanged??oe)(n,e)||r.useDefault&&r.reflect&&n===this._$Ej?.get(t)&&!this.hasAttribute(i._$Eu(t,r))))return;this.C(t,e,r)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:r,reflect:o,wrapped:n},i){r&&!(this._$Ej??(this._$Ej=new Map)).has(t)&&(this._$Ej.set(t,i??e??this[t]),n!==!0||i!==void 0)||(this._$AL.has(t)||(this.hasUpdated||r||(e=void 0),this._$AL.set(t,e)),o===!0&&this._$Em!==t&&(this._$Eq??(this._$Eq=new Set)).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(let[o,n]of this._$Ep)this[o]=n;this._$Ep=void 0}let r=this.constructor.elementProperties;if(r.size>0)for(let[o,n]of r){let{wrapped:i}=n,l=this[o];i!==!0||this._$AL.has(o)||l===void 0||this.C(o,void 0,n,l)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(r=>r.hostUpdate?.()),this.update(e)):this._$EM()}catch(r){throw t=!1,this._$EM(),r}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&(this._$Eq=this._$Eq.forEach(e=>this._$ET(e,this[e]))),this._$EM()}updated(t){}firstUpdated(t){}};$.elementStyles=[],$.shadowRootOptions={mode:"open"},$[q("elementProperties")]=new Map,$[q("finalized")]=new Map,ct?.({ReactiveElement:$}),(k.reactiveElementVersions??(k.reactiveElementVersions=[])).push("2.1.2");var G=globalThis,Ce=s=>s,ne=G.trustedTypes,Ee=ne?ne.createPolicy("lit-html",{createHTML:s=>s}):void 0,Me="$lit$",C=`lit$${Math.random().toFixed(9).slice(2)}$`,He="?"+C,dt=`<${He}>`,U=document,K=()=>U.createComment(""),J=s=>s===null||typeof s!="object"&&typeof s!="function",fe=Array.isArray,pt=s=>fe(s)||typeof s?.[Symbol.iterator]=="function",ce=`[ 	
\f\r]`,W=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Se=/-->/g,Ae=/>/g,N=RegExp(`>|${ce}(?:([^\\s"'>=/]+)(${ce}*=${ce}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ze=/'/g,Te=/"/g,Le=/^(?:script|style|textarea|title)$/i,ge=s=>(t,...e)=>({_$litType$:s,strings:t,values:e}),c=ge(1),Et=ge(2),St=ge(3),w=Symbol.for("lit-noChange"),v=Symbol.for("lit-nothing"),Pe=new WeakMap,R=U.createTreeWalker(U,129);function Ne(s,t){if(!fe(s)||!s.hasOwnProperty("raw"))throw Error("invalid template strings array");return Ee!==void 0?Ee.createHTML(t):t}var ht=(s,t)=>{let e=s.length-1,r=[],o,n=t===2?"<svg>":t===3?"<math>":"",i=W;for(let l=0;l<e;l++){let a=s[l],d,p,u=-1,b=0;for(;b<a.length&&(i.lastIndex=b,p=i.exec(a),p!==null);)b=i.lastIndex,i===W?p[1]==="!--"?i=Se:p[1]!==void 0?i=Ae:p[2]!==void 0?(Le.test(p[2])&&(o=RegExp("</"+p[2],"g")),i=N):p[3]!==void 0&&(i=N):i===N?p[0]===">"?(i=o??W,u=-1):p[1]===void 0?u=-2:(u=i.lastIndex-p[2].length,d=p[1],i=p[3]===void 0?N:p[3]==='"'?Te:ze):i===Te||i===ze?i=N:i===Se||i===Ae?i=W:(i=N,o=void 0);let _=i===N&&s[l+1].startsWith("/>")?" ":"";n+=i===W?a+dt:u>=0?(r.push(d),a.slice(0,u)+Me+a.slice(u)+C+_):a+C+(u===-2?l:_)}return[Ne(s,n+(s[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),r]},X=class s{constructor({strings:t,_$litType$:e},r){let o;this.parts=[];let n=0,i=0,l=t.length-1,a=this.parts,[d,p]=ht(t,e);if(this.el=s.createElement(d,r),R.currentNode=this.el.content,e===2||e===3){let u=this.el.content.firstChild;u.replaceWith(...u.childNodes)}for(;(o=R.nextNode())!==null&&a.length<l;){if(o.nodeType===1){if(o.hasAttributes())for(let u of o.getAttributeNames())if(u.endsWith(Me)){let b=p[i++],_=o.getAttribute(u).split(C),g=/([.?@])?(.*)/.exec(b);a.push({type:1,index:n,name:g[2],strings:_,ctor:g[1]==="."?pe:g[1]==="?"?he:g[1]==="@"?ue:j}),o.removeAttribute(u)}else u.startsWith(C)&&(a.push({type:6,index:n}),o.removeAttribute(u));if(Le.test(o.tagName)){let u=o.textContent.split(C),b=u.length-1;if(b>0){o.textContent=ne?ne.emptyScript:"";for(let _=0;_<b;_++)o.append(u[_],K()),R.nextNode(),a.push({type:2,index:++n});o.append(u[b],K())}}}else if(o.nodeType===8)if(o.data===He)a.push({type:2,index:n});else{let u=-1;for(;(u=o.data.indexOf(C,u+1))!==-1;)a.push({type:7,index:n}),u+=C.length-1}n++}}static createElement(t,e){let r=U.createElement("template");return r.innerHTML=t,r}};function Z(s,t,e=s,r){if(t===w)return t;let o=r!==void 0?e._$Co?.[r]:e._$Cl,n=J(t)?void 0:t._$litDirective$;return o?.constructor!==n&&(o?._$AO?.(!1),n===void 0?o=void 0:(o=new n(s),o._$AT(s,e,r)),r!==void 0?(e._$Co??(e._$Co=[]))[r]=o:e._$Cl=o),o!==void 0&&(t=Z(s,o._$AS(s,t.values),o,r)),t}var de=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:r}=this._$AD,o=(t?.creationScope??U).importNode(e,!0);R.currentNode=o;let n=R.nextNode(),i=0,l=0,a=r[0];for(;a!==void 0;){if(i===a.index){let d;a.type===2?d=new Y(n,n.nextSibling,this,t):a.type===1?d=new a.ctor(n,a.name,a.strings,this,t):a.type===6&&(d=new me(n,this,t)),this._$AV.push(d),a=r[++l]}i!==a?.index&&(n=R.nextNode(),i++)}return R.currentNode=U,o}p(t){let e=0;for(let r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(t,r,e),e+=r.strings.length-2):r._$AI(t[e])),e++}},Y=class s{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,r,o){this.type=2,this._$AH=v,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=r,this.options=o,this._$Cv=o?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Z(this,t,e),J(t)?t===v||t==null||t===""?(this._$AH!==v&&this._$AR(),this._$AH=v):t!==this._$AH&&t!==w&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):pt(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==v&&J(this._$AH)?this._$AA.nextSibling.data=t:this.T(U.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:r}=t,o=typeof r=="number"?this._$AC(t):(r.el===void 0&&(r.el=X.createElement(Ne(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===o)this._$AH.p(e);else{let n=new de(o,this),i=n.u(this.options);n.p(e),this.T(i),this._$AH=n}}_$AC(t){let e=Pe.get(t.strings);return e===void 0&&Pe.set(t.strings,e=new X(t)),e}k(t){fe(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,r,o=0;for(let n of t)o===e.length?e.push(r=new s(this.O(K()),this.O(K()),this,this.options)):r=e[o],r._$AI(n),o++;o<e.length&&(this._$AR(r&&r._$AB.nextSibling,o),e.length=o)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let r=Ce(t).nextSibling;Ce(t).remove(),t=r}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},j=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,r,o,n){this.type=1,this._$AH=v,this._$AN=void 0,this.element=t,this.name=e,this._$AM=o,this.options=n,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=v}_$AI(t,e=this,r,o){let n=this.strings,i=!1;if(n===void 0)t=Z(this,t,e,0),i=!J(t)||t!==this._$AH&&t!==w,i&&(this._$AH=t);else{let l=t,a,d;for(t=n[0],a=0;a<n.length-1;a++)d=Z(this,l[r+a],e,a),d===w&&(d=this._$AH[a]),i||(i=!J(d)||d!==this._$AH[a]),d===v?t=v:t!==v&&(t+=(d??"")+n[a+1]),this._$AH[a]=d}i&&!o&&this.j(t)}j(t){t===v?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},pe=class extends j{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===v?void 0:t}},he=class extends j{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==v)}},ue=class extends j{constructor(t,e,r,o,n){super(t,e,r,o,n),this.type=5}_$AI(t,e=this){if((t=Z(this,t,e,0)??v)===w)return;let r=this._$AH,o=t===v&&r!==v||t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive,n=t!==v&&(r===v||o);o&&this.element.removeEventListener(this.name,this,r),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},me=class{constructor(t,e,r){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(t){Z(this,t)}};var ut=G.litHtmlPolyfillSupport;ut?.(X,Y),(G.litHtmlVersions??(G.litHtmlVersions=[])).push("3.3.2");var Re=(s,t,e)=>{let r=e?.renderBefore??t,o=r._$litPart$;if(o===void 0){let n=e?.renderBefore??null;r._$litPart$=o=new Y(t.insertBefore(K(),n),n,void 0,e??{})}return o._$AI(s),o};var Q=globalThis,f=class extends ${constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e;let t=super.createRenderRoot();return(e=this.renderOptions).renderBefore??(e.renderBefore=t.firstChild),t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Re(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return w}};f._$litElement$=!0,f.finalized=!0,Q.litElementHydrateSupport?.({LitElement:f});var mt=Q.litElementPolyfillSupport;mt?.({LitElement:f});(Q.litElementVersions??(Q.litElementVersions=[])).push("4.2.2");var x=s=>(t,e)=>{e!==void 0?e.addInitializer(()=>{customElements.define(s,t)}):customElements.define(s,t)};var ft={attribute:!0,type:String,converter:V,reflect:!1,hasChanged:oe},gt=(s=ft,t,e)=>{let{kind:r,metadata:o}=e,n=globalThis.litPropertyMetadata.get(o);if(n===void 0&&globalThis.litPropertyMetadata.set(o,n=new Map),r==="setter"&&((s=Object.create(s)).wrapped=!0),n.set(e.name,s),r==="accessor"){let{name:i}=e;return{set(l){let a=t.get.call(this);t.set.call(this,l),this.requestUpdate(i,a,s,!0,l)},init(l){return l!==void 0&&this.C(i,void 0,s,l),l}}}if(r==="setter"){let{name:i}=e;return function(l){let a=this[i];t.call(this,l),this.requestUpdate(i,a,s,!0,l)}}throw Error("Unsupported decorator location: "+r)};function m(s){return(t,e)=>typeof e=="object"?gt(s,t,e):((r,o,n)=>{let i=o.hasOwnProperty(n);return o.constructor.createProperty(n,r),i?Object.getOwnPropertyDescriptor(o,n):void 0})(s,t,e)}function E(s){return m({...s,state:!0,attribute:!1})}var Ue=y`
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
`;function bt(s,t){let e=s.states[t];if(!e)return[];let r=e.attributes.entity_id;return Array.isArray(r)?r:[]}function Ie(s,t){return t.people&&t.people.length>0?t.people:t.group_entity?bt(s,t.group_entity).map(e=>({entity:e})):[]}var be="person-card-theme-updated";function vt(){return(typeof window<"u"?window:globalThis).personCardTheme}function Oe(s){let t=vt()?.zoneStyles??[];if(s.length===0)return t;let e=new Map(t.map(r=>[r.zone,r]));return s.map(r=>{if(r.border_color&&r.background_color)return r;let o=e.get(r.zone);return o?{...o,...r,border_color:r.border_color??o.border_color,background_color:r.background_color??o.background_color}:r})}function De(s,t){let e=t.states[s.entity];if(!e)return!1;let r=s.attribute!=null?e.attributes[s.attribute]:e.state,o=String(r??""),n=String(s.value),i=parseFloat(o),l=parseFloat(n),a=!isNaN(i)&&!isNaN(l);switch(s.operator){case"eq":return o===n;case"neq":return o!==n;case"lt":return a&&i<l;case"gt":return a&&i>l;case"lte":return a&&i<=l;case"gte":return a&&i>=l;case"contains":return o.includes(n);default:return!1}}function Ze(s,t){let e={};for(let r of s){if(r.conditions.length===0)continue;(r.operator==="or"?r.conditions.some(n=>De(n,t)):r.conditions.every(n=>De(n,t)))&&(e={...e,...r.effect})}return e}function je(s){if(!s)return"\u2014";let t=Date.now()-new Date(s).getTime();if(t<0)return"\u2014";let e=Math.floor(t/6e4);if(e<1)return"< 1m";if(e<60)return`${e}m`;let r=Math.floor(e/60),o=e%60;if(r<24)return o>0?`${r}h ${o}m`:`${r}h`;let n=Math.floor(r/24),i=r%24;return i>0?`${n}d ${i}h`:`${n}d`}function ve(s,t){let e=new Date(s);if(isNaN(e.getTime()))return"unknown";if(t==="absolute")return e.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit",hour12:!1});let r=Date.now()-e.getTime(),o=Math.floor(r/6e4);if(o<1)return"just now";if(o<60)return`${o} min ago`;let n=Math.floor(o/60);return n<24?`${n}h ago`:`${Math.floor(n/24)}d ago`}function I(s,t){if(t.battery_entity){let n=s.states[t.battery_entity];if(!n)return null;let i=parseFloat(n.state);return isNaN(i)?null:i}let e=s.states[t.entity];if(!e)return null;let r=e.attributes.battery_level;if(r==null)return null;let o=parseFloat(String(r));return isNaN(o)?null:o}function ee(s,t){if(t.connectivity_entity){let r=s.states[t.connectivity_entity];return r?r.state==="on"?"online":"offline":"unknown"}let e=s.states[t.entity];return e?e.state==="home"||e.state==="online"?"online":e.state==="not_home"||e.state==="offline"?"offline":"unknown":"unknown"}function Fe(s,t,e){let r=s.states[e];if(!r||r.state==="unknown")return!0;for(let o of t){let n=I(s,o),i=o.battery_threshold??20;if(n!==null&&n<=i||ee(s,o)==="offline")return!0}return!1}function Be(s){return s.toLowerCase().replace(/[\s-]+/g,"_").replace(/[^a-z0-9_]/g,"")}function S(s,t){let e=t.find(o=>o.zone===s);if(e)return e;let r=Be(s);return t.find(o=>Be(o.zone)===r)}function ye(s,t,e=""){let r=S(s,t);return r?.label?r.label:s==="not_home"?e||"Away":s==="unknown"?"Unknown":s.replace(/_/g," ")}function qe(s,t,e=!1){let r=S(s,t);return r?.icon?r.icon:s==="home"?"mdi:home":s==="not_home"?e?"mdi:map-marker":"mdi:map-marker-off":s==="unknown"?"mdi:help-circle":"mdi:map-marker"}function Ve(s,t){let e=s.replace("#",""),r=e.length===3?e.split("").map(l=>l+l).join(""):e,o=parseInt(r.slice(0,2),16),n=parseInt(r.slice(2,4),16),i=parseInt(r.slice(4,6),16);return isNaN(o)||isNaN(n)||isNaN(i)?`rgba(0, 0, 0, ${t})`:`rgba(${o}, ${n}, ${i}, ${t})`}function We(s,t=20){return s<=t?"#f44336":s<50?"#ff9800":"#4caf50"}var A=class extends f{constructor(){super(...arguments);this.showLabels=!1}batteryColor(e){return We(e,this.device.battery_threshold??20)}render(){if(!this.hass||!this.device)return c``;let e=I(this.hass,this.device),r=ee(this.hass,this.device),o=this.device.icon??"mdi:cellphone",n=this.device.name??this.device.entity.split(".")[1].replace(/_/g," ");return c`
      <ha-icon .icon=${o}></ha-icon>
      ${this.showLabels?c`<span class="name">${n}</span>`:""}
      ${e!==null?c`
        <div class="battery-bar-wrap">
          <div class="battery-bar-fill" style="width:${e}%;background:${this.batteryColor(e)}"></div>
        </div>
        <span class="battery-pct">${e}%</span>
      `:""}
      <div class="conn-dot ${r}"></div>
    `}};A.styles=y`
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
  `,h([m({attribute:!1})],A.prototype,"hass",2),h([m({type:Object})],A.prototype,"device",2),h([m({type:Boolean})],A.prototype,"showLabels",2),A=h([x("person-card-device-tile")],A);var z=class extends f{constructor(){super(...arguments);this.zone="";this.zoneStyles=[];this.address=""}get zoneStyle(){return this.zoneStyles.find(e=>e.zone===this.zone)}get displayLabel(){let e=this.zoneStyle;return e?.label?e.label:this.zone==="not_home"?this.address||"Away":this.zone==="unknown"?"Unknown":this.zone.replace(/_/g," ")}get icon(){let e=this.zoneStyle;return e?.icon?e.icon:this.zone==="home"?"mdi:home":this.zone==="not_home"?this.address?"mdi:map-marker":"mdi:map-marker-off":this.zone==="unknown"?"mdi:help-circle":"mdi:map-marker"}render(){let e=this.displayLabel,r=this.zone==="not_home"&&!!this.address&&e.length>=20;return c`
      <ha-icon .icon=${this.icon}></ha-icon>
      ${r?c`
        <div class="label-ticker">
          <span class="ticker-inner">${e}&nbsp;&nbsp;&nbsp;&nbsp;${e}</span>
        </div>
      `:c`
        <span class="zone-label">${e}</span>
      `}
    `}};z.styles=y`
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
  `,h([m()],z.prototype,"zone",2),h([m({type:Array})],z.prototype,"zoneStyles",2),h([m()],z.prototype,"address",2),z=h([x("person-card-location-badge")],z);var Ge={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Ke=s=>(...t)=>({_$litDirective$:s,values:t}),ie=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,r){this._$Ct=t,this._$AM=e,this._$Ci=r}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};var Je="important",yt=" !"+Je,Xe=Ke(class extends ie{constructor(s){if(super(s),s.type!==Ge.ATTRIBUTE||s.name!=="style"||s.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(s){return Object.keys(s).reduce((t,e)=>{let r=s[e];return r==null?t:t+`${e=e.includes("-")?e:e.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${r};`},"")}update(s,[t]){let{style:e}=s.element;if(this.ft===void 0)return this.ft=new Set(Object.keys(t)),this.render(t);for(let r of this.ft)t[r]==null&&(this.ft.delete(r),r.includes("-")?e.removeProperty(r):e[r]=null);for(let r in t){let o=t[r];if(o!=null){this.ft.add(r);let n=typeof o=="string"&&o.endsWith(yt);r.includes("-")||n?e.setProperty(r,n?o.slice(0,-11):o,n?Je:""):e[r]=o}}return w}});var O=class extends f{constructor(){super(...arguments);this.color="#f44336";this.icon="mdi:alert-circle"}render(){return c`
      <div class="badge" style=${Xe({"--badge-bg":this.color})}>
        <ha-icon .icon=${this.icon} style="color:#fff;--mdc-icon-size:14px"></ha-icon>
      </div>
    `}};O.styles=y`
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
  `,h([m()],O.prototype,"color",2),h([m()],O.prototype,"icon",2),O=h([x("person-card-notification-badge")],O);var T=class extends f{constructor(){super(...arguments);this.lastUpdated="";this.format="relative";this._tick=0}connectedCallback(){super.connectedCallback(),this.format==="relative"&&(this._interval=setInterval(()=>{this._tick++},6e4))}disconnectedCallback(){super.disconnectedCallback(),this._interval&&clearInterval(this._interval)}updated(e){e.has("format")&&(this._interval&&clearInterval(this._interval),this._interval=void 0,this.format==="relative"&&(this._interval=setInterval(()=>{this._tick++},6e4)))}render(){if(!this.lastUpdated)return c``;this._tick;let e=ve(this.lastUpdated,this.format);return c`
      <ha-icon icon="mdi:clock-check-outline"></ha-icon>
      <span>Last seen: ${e}</span>
    `}};T.styles=y`
    :host { display: flex; align-items: center; gap: 6px; font-size: 0.78rem; color: rgba(255,255,255,0.45); }
    ha-icon { --mdc-icon-size: 13px; }
  `,h([m()],T.prototype,"lastUpdated",2),h([m()],T.prototype,"format",2),h([E()],T.prototype,"_tick",2),T=h([x("person-card-last-seen")],T);var P=class extends f{constructor(){super(...arguments);this.etaEntity="";this.personZone=""}render(){if(!this.etaEntity||this.personZone==="home")return c``;let e=this.hass.states[this.etaEntity];if(!e)return c``;let r=parseFloat(e.state);if(isNaN(r))return c``;let o=r<1?"arriving":`${Math.round(r)} min`;return c`
      <ha-icon .icon=${"mdi:clock-outline"}></ha-icon>
      <span>ETA home: ${o}</span>
    `}};P.styles=y`
    :host { display: flex; align-items: center; gap: 6px; font-size: 0.8rem; color: rgba(255,255,255,0.65); }
    ha-icon { --mdc-icon-size: 14px; }
  `,h([m({attribute:!1})],P.prototype,"hass",2),h([m()],P.prototype,"etaEntity",2),h([m()],P.prototype,"personZone",2),P=h([x("person-card-eta-display")],P);var M=[{name:"Midnight",bg:"#1c1c2e",border:"#4fc3f7"},{name:"Forest Walk",bg:"#1b2e1b",border:"#76c442"},{name:"Lava Flow",bg:"#2e1b1b",border:"#ff6d00"},{name:"Arctic Drift",bg:"#1a2332",border:"#80deea"},{name:"Twilight",bg:"#2e1b3c",border:"#ce93d8"},{name:"Emerald City",bg:"#1b2e28",border:"#ffd700"},{name:"Rose Gold",bg:"#2e1c24",border:"#f48fb1"},{name:"Neon Tokyo",bg:"#120d1f",border:"#e040fb"},{name:"Desert Night",bg:"#2e2416",border:"#ffb300"},{name:"Northern Lights",bg:"#0d1f1a",border:"#69f0ae"}];var D=class extends f{constructor(){super(...arguments);this.zoneStyles=[]}_fire(e){this.dispatchEvent(new CustomEvent("zone-styles-changed",{detail:{zoneStyles:e},bubbles:!0,composed:!0}))}_update(e,r){let o=[...this.zoneStyles];o[e]={...o[e],...r},this._fire(o)}_remove(e){let r=[...this.zoneStyles];r.splice(e,1),this._fire(r)}_add(){this._fire([...this.zoneStyles,{zone:""}])}_autoDetect(){if(!this.hass)return;let e=new Map(this.zoneStyles.map((i,l)=>[i.zone,l])),r=[...this.zoneStyles],o=0;r=r.map((i,l)=>{if(!i.border_color){let a=M[(l+o)%M.length];return o++,{...i,background_color:i.background_color??a.bg,border_color:a.border}}return i});let n=Object.entries(this.hass.states).filter(([i])=>i.startsWith("zone.")).map(([i,l])=>{let a=l.attributes.friendly_name??i.replace("zone.","");return{zone:i==="zone.home"?"home":a,label:a,icon:l.attributes.icon??"mdi:map-marker"}}).filter(i=>!e.has(i.zone));if(n.length>0){let i=r.length,l=n.map((a,d)=>{let p=M[(i+d)%M.length];return{...a,background_color:p.bg,border_color:p.border}});r=[...r,...l]}this._fire(r)}render(){return c`
      <button class="add-btn" style="margin-bottom:8px" @click=${()=>this._autoDetect()}>
        <ha-icon .icon=${"mdi:magnify"}></ha-icon> Auto-detect zones from HA
      </button>
      ${this.zoneStyles.map((e,r)=>c`
        <div class="zone-block">
          <div class="zone-row">
            <ha-textfield
              .value=${e.zone}
              label="Zone name"
              @input=${o=>this._update(r,{zone:o.target.value})}
            ></ha-textfield>
            <ha-textfield
              .value=${e.label??""}
              label="Display label"
              @input=${o=>this._update(r,{label:o.target.value||void 0})}
            ></ha-textfield>
            <div style="flex:1;min-width:0">
              <ha-icon-picker
                .value=${e.icon??""}
                label="Icon"
                @value-changed=${o=>this._update(r,{icon:o.detail.value||void 0})}
              ></ha-icon-picker>
            </div>
            <button class="delete-btn" @click=${()=>this._remove(r)}>
              <ha-icon .icon=${"mdi:delete"}></ha-icon>
            </button>
          </div>
          <div class="scheme-row">
            ${M.map(o=>c`
              <div class="scheme-swatch"
                title=${o.name}
                style="background:${o.bg};border:3px solid ${o.border}"
                @click=${()=>this._update(r,{background_color:o.bg,border_color:o.border})}
              ></div>
            `)}
            <div class="scheme-divider"></div>
            <div class="color-row">
              <label style="font-size:0.75rem">BG</label>
              <input type="color" .value=${e.background_color??"#1c1c2e"}
                @input=${o=>this._update(r,{background_color:o.target.value})} />
            </div>
            <div class="color-row">
              <label style="font-size:0.75rem">Border</label>
              <input type="color" .value=${e.border_color??"#ffffff"}
                @input=${o=>this._update(r,{border_color:o.target.value})} />
            </div>
          </div>
        </div>
      `)}
      <button class="add-btn" @click=${()=>this._add()}>
        <ha-icon .icon=${"mdi:plus-circle"}></ha-icon> Add Zone Style
      </button>
    `}};D.styles=y`
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
  `,h([m({attribute:!1})],D.prototype,"hass",2),h([m({type:Array})],D.prototype,"zoneStyles",2),D=h([x("person-card-zone-editor")],D);var xt=[{value:"default",label:"Default",icon:"mdi:palette-outline"},{value:"glass",label:"Glass",icon:"mdi:blur"},{value:"scifi",label:"Sci-Fi",icon:"mdi:chip"},{value:"steampunk",label:"Steampunk",icon:"mdi:cog-outline"},{value:"terminal",label:"Terminal",icon:"mdi:console"},{value:"neon",label:"Neon",icon:"mdi:led-on"}],H=class extends f{constructor(){super(...arguments);this._activeTab="people"}setConfig(e){this._config=e}_fire(e){this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e},bubbles:!0,composed:!0})),this._config=e}_set(e){this._fire({...this._config,...e})}_renderPeopleTab(){let e=this._config.people??[];return c`
      <div class="row">
        <label>Density</label>
        <div class="segment-control">
          ${["compact","mini","detailed"].map(r=>c`
            <button class="segment-btn ${this._config.density===r?"active":""}"
              @click=${()=>this._set({density:r})}>${r.charAt(0).toUpperCase()+r.slice(1)}</button>
          `)}
        </div>
      </div>
      <div class="row">
        <label>Group Entity (optional — overridden by people list)</label>
        <div>
          <ha-entity-picker
            .hass=${this.hass}
            .value=${this._config.group_entity??""}
            @value-changed=${r=>this._set({group_entity:r.detail.value||void 0})}
          ></ha-entity-picker>
        </div>
      </div>
      <div class="row">
        <label>People</label>
        ${e.map((r,o)=>c`
          <div class="person-block">
            <div class="person-header">
              <span class="person-label">Person entity</span>
              <button class="delete-btn" @click=${()=>{let n=[...e];n.splice(o,1),this._set({people:n})}}><ha-icon .icon=${"mdi:delete"}></ha-icon></button>
            </div>
            <div>
              <ha-entity-picker
                .hass=${this.hass}
                .value=${r.entity??""}
                .includeDomains=${["person"]}
                @value-changed=${n=>{let i=[...e];i[o]={...i[o],entity:n.detail.value},this._set({people:i})}}
              ></ha-entity-picker>
            </div>
            <div class="detail-row">
              <ha-textfield
                .value=${r.name??""}
                label="Display name (optional)"
                @input=${n=>{let i=[...e];i[o]={...i[o],name:n.target.value||void 0},this._set({people:i})}}
              ></ha-textfield>
            </div>
            <div class="detail-row">
              <div>
                <ha-entity-picker
                  .hass=${this.hass}
                  .value=${r.eta_entity??""}
                  .includeDomains=${["sensor"]}
                  label="ETA travel time sensor (optional)"
                  @value-changed=${n=>{let i=[...e];i[o]={...i[o],eta_entity:n.detail.value||void 0},this._set({people:i})}}
                ></ha-entity-picker>
              </div>
            </div>
          </div>
        `)}
        <button class="add-btn" @click=${()=>this._set({people:[...e,{entity:""}]})}>
          <ha-icon .icon=${"mdi:plus-circle"}></ha-icon> Add Person
        </button>
      </div>
    `}_renderAppearanceTab(){return c`
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
    `}_renderConditionsTab(){let e=this._config.conditions??[];return c`
      <p style="font-size:0.8rem;color:var(--secondary-text-color);margin:0 0 12px">
        Rules are evaluated top-to-bottom. The last matching rule wins.
      </p>
      ${e.map((r,o)=>c`
        <div class="rule-block">
          <div class="rule-header">
            <ha-textfield .value=${r.label??""} label="Rule label" style="flex:1"
              @input=${n=>{let i=[...e];i[o]={...i[o],label:n.target.value||void 0},this._set({conditions:i})}}></ha-textfield>
            <div class="segment-control">
              <button class="segment-btn ${r.operator==="and"?"active":""}"
                @click=${()=>{let n=[...e];n[o]={...n[o],operator:"and"},this._set({conditions:n})}}>AND</button>
              <button class="segment-btn ${r.operator==="or"?"active":""}"
                @click=${()=>{let n=[...e];n[o]={...n[o],operator:"or"},this._set({conditions:n})}}>OR</button>
            </div>
            <button class="delete-btn" @click=${()=>{let n=[...e];n.splice(o,1),this._set({conditions:n})}}>
              <ha-icon .icon=${"mdi:delete"}></ha-icon>
            </button>
          </div>
          ${r.conditions.map((n,i)=>c`
            <div style="margin-bottom:4px">
              <ha-entity-picker .hass=${this.hass} .value=${n.entity??""} label="Entity"
                style="display:block;width:100%"
                @value-changed=${l=>{let a=[...e],d=[...a[o].conditions];d[i]={...d[i],entity:l.detail.value},a[o]={...a[o],conditions:d},this._set({conditions:a})}}></ha-entity-picker>
            </div>
            <div class="condition-row">
              <ha-textfield .value=${n.attribute??""} label="Attribute (opt.)"
                @input=${l=>{let a=[...e],d=[...a[o].conditions];d[i]={...d[i],attribute:l.target.value||void 0},a[o]={...a[o],conditions:d},this._set({conditions:a})}}></ha-textfield>
              <select @change=${l=>{let a=[...e],d=[...a[o].conditions];d[i]={...d[i],operator:l.target.value},a[o]={...a[o],conditions:d},this._set({conditions:a})}} style="padding:6px;border-radius:6px;border:1px solid var(--divider-color)">
                ${["eq","neq","lt","gt","lte","gte","contains"].map(l=>c`
                  <option value=${l} ?selected=${n.operator===l}>${l}</option>
                `)}
              </select>
              <ha-textfield .value=${String(n.value)} label="Value"
                @input=${l=>{let a=[...e],d=[...a[o].conditions],p=l.target.value,u=["lt","gt","lte","gte"],b=parseFloat(p);d[i]={...d[i],value:u.includes(n.operator)&&!isNaN(b)?b:p},a[o]={...a[o],conditions:d},this._set({conditions:a})}}></ha-textfield>
              <button class="delete-btn" @click=${()=>{let l=[...e],a=[...l[o].conditions];a.splice(i,1),l[o]={...l[o],conditions:a},this._set({conditions:l})}}><ha-icon .icon=${"mdi:close"}></ha-icon></button>
            </div>
          `)}
          <button class="add-btn" @click=${()=>{let n=[...e];n[o]={...n[o],conditions:[...n[o].conditions,{entity:"",operator:"eq",value:""}]},this._set({conditions:n})}}><ha-icon .icon=${"mdi:plus"}></ha-icon> Add Condition</button>
          <div style="margin-top:10px;font-size:0.8rem;font-weight:600;color:var(--secondary-text-color)">Effect</div>
          <div class="scheme-row" style="margin-bottom:6px">
            ${M.map(n=>c`
              <div class="scheme-swatch" title=${n.name} style="background:${n.bg};border:3px solid ${n.border}"
                @click=${()=>{let i=[...e];i[o]={...i[o],effect:{...i[o].effect,background_color:n.bg,border_color:n.border}},this._set({conditions:i})}}></div>
            `)}
          </div>
          <div style="display:flex;gap:8px;flex-wrap:wrap">
            <div class="color-row"><label>Background</label>
              <input type="color" .value=${r.effect.background_color??"#1c1c2e"}
                @input=${n=>{let i=[...e];i[o]={...i[o],effect:{...i[o].effect,background_color:n.target.value}},this._set({conditions:i})}} /></div>
            <div class="color-row"><label>Border</label>
              <input type="color" .value=${r.effect.border_color??"#ffffff"}
                @input=${n=>{let i=[...e];i[o]={...i[o],effect:{...i[o].effect,border_color:n.target.value}},this._set({conditions:i})}} /></div>
          </div>
        </div>
      `)}
      <button class="add-btn" @click=${()=>{let r={id:crypto.randomUUID(),operator:"and",conditions:[{entity:"",operator:"eq",value:""}],effect:{}};this._set({conditions:[...e,r]})}}><ha-icon .icon=${"mdi:plus-circle"}></ha-icon> Add Rule</button>
    `}_renderThemePicker(){let e=this._config.card_theme??"default";return c`
      <div class="row">
        <label>Card Theme</label>
        <div class="theme-grid">
          ${xt.map(r=>c`
            <button
              class="theme-btn ${e===r.value?"active":""}"
              @click=${()=>this._set({card_theme:r.value==="default"?void 0:r.value})}
              title=${r.label}
            >
              <ha-icon class="theme-icon" .icon=${r.icon}></ha-icon>
              <span class="theme-btn-label">${r.label}</span>
            </button>
          `)}
        </div>
      </div>
    `}_renderDisplayTab(){return c`
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
          @input=${e=>{let r=parseInt(e.target.value);this._set({offline_threshold:r>0?r:void 0})}}></ha-textfield>
      </div>
    `}render(){return!this._config||!this.hass?c``:c`
      <div class="tabs">
        ${[{key:"people",label:"People"},{key:"appearance",label:"Appearance"},{key:"conditions",label:"Conditions"},{key:"display",label:"Display"}].map(r=>c`
          <div class="tab ${this._activeTab===r.key?"active":""}"
            @click=${()=>{this._activeTab=r.key}}>${r.label}</div>
        `)}
      </div>
      ${this._activeTab==="people"?this._renderPeopleTab():""}
      ${this._activeTab==="appearance"?this._renderAppearanceTab():""}
      ${this._activeTab==="conditions"?this._renderConditionsTab():""}
      ${this._activeTab==="display"?this._renderDisplayTab():""}
    `}};H.styles=y`
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
  `,h([m({attribute:!1})],H.prototype,"hass",2),h([E()],H.prototype,"_config",2),h([E()],H.prototype,"_activeTab",2),H=h([x("family-card-editor")],H);window.customCards=window.customCards??[];window.customCards.push({type:"family-card",name:"Family Card",description:"At-a-glance status overview for multiple people.",preview:!0});var L=class extends f{constructor(){super(...arguments);this._expandedEntity=null;this._onThemeUpdated=()=>{this.requestUpdate()}}static getStubConfig(e){return{people:e?Object.keys(e.states).filter(o=>o.startsWith("person.")).slice(0,6).map(o=>({entity:o})):[],density:"detailed",show_devices:!0,show_last_seen:!0,show_notification_badge:!0}}static getConfigElement(){return document.createElement("family-card-editor")}setConfig(e){this._config={density:"detailed",show_devices:!0,show_last_seen:!0,show_eta:!0,show_notification_badge:!0,zone_styles:[],conditions:[],...e},this.setAttribute("density",this._config.density??"detailed")}getCardSize(){return 4}connectedCallback(){super.connectedCallback(),window.addEventListener(be,this._onThemeUpdated)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener(be,this._onThemeUpdated)}updated(){if(!this._config||!this.hass)return;let e=this._config.conditions?.length?Ze(this._config.conditions,this.hass):{},r=e.background_color;r?this.style.setProperty("--pc-background",r):this.style.removeProperty("--pc-background");let o=e.border_color;o?(this.style.setProperty("--pc-border-color",o),this.style.setProperty("--pc-border-width",`${e.border_width??2}px`),this.style.setProperty("--pc-glow-color",Ve(o,.25))):(this.style.removeProperty("--pc-border-color"),this.style.removeProperty("--pc-border-width"),this.style.removeProperty("--pc-glow-color")),this._config.background_image?this.style.setProperty("--pc-background-image",`url('${this._config.background_image}')`):this.style.removeProperty("--pc-background-image"),this.setAttribute("card-theme",this._config.card_theme??"default")}_zoneStyles(){return Oe(this._config.zone_styles??[])}_getPersonName(e){return e.name?e.name:this.hass.states[e.entity]?.attributes?.friendly_name??e.entity.split(".")[1].replace(/_/g," ")}_getPersonPhoto(e){return e.photo?e.photo:this.hass.states[e.entity]?.attributes?.entity_picture}_getPersonZone(e){return this.hass.states[e.entity]?.state??"unknown"}_isPersonStale(e){let r=e.offline_threshold??this._config.offline_threshold;if(!r||r<=0)return!1;let o=this.hass.states[e.entity]?.last_updated;return o?(Date.now()-new Date(o).getTime())/6e4>r:!1}_personShowsBadge(e){return this._config.show_notification_badge===!1||e.show_notification_badge===!1?!1:Fe(this.hass,e.devices??[],e.entity)}_renderAvatar(e,r){let o=this._getPersonPhoto(e),n=this._getPersonName(e);return o?c`<img class="avatar ${r?"stale":""}" src=${o} alt=${n} />`:c`<div class="avatar-placeholder ${r?"stale":""}"><ha-icon icon="mdi:account"></ha-icon></div>`}_renderCompactRow(e){let r=this._getPersonZone(e),o=this._zoneStyles(),n=S(r,o),i=this._isPersonStale(e),l=this._personShowsBadge(e),a=e.devices??[],d=a.map(b=>I(this.hass,b)).filter(b=>b!==null),p=d.length>0?Math.min(...d):null,u=p!==null&&p<=(a[0]?.battery_threshold??20)?"#f44336":p!==null&&p<50?"#ff9800":"#4caf50";return c`
      <div class="person-row" style="--row-accent:${n?.border_color??"rgba(255,255,255,0.1)"}">
        <div class="person-row-inner">
          ${this._renderAvatar(e,i)}
          <div class="person-info">
            <div class="person-name">${this._getPersonName(e)}</div>
            <div class="person-zone">
              <person-card-location-badge
                .zone=${r}
                .zoneStyles=${o}
              ></person-card-location-badge>
            </div>
          </div>
          <div class="person-row-meta">
            ${p!==null?c`<div class="status-dot" style="background:${u}"></div>`:""}
            ${l?c`<person-card-notification-badge color="#f44336" icon="mdi:alert-circle"></person-card-notification-badge>`:""}
          </div>
        </div>
      </div>
    `}_renderMiniRow(e){let r=this._getPersonZone(e),o=this._zoneStyles(),n=S(r,o),i=this._isPersonStale(e),l=this._personShowsBadge(e),a=e.devices??[];return c`
      <div class="person-row" style="--row-accent:${n?.border_color??"rgba(255,255,255,0.1)"}">
        <div class="person-row-inner">
          ${this._renderAvatar(e,i)}
          <div class="person-info">
            <div class="person-name">${this._getPersonName(e)}</div>
            <div class="person-zone">
              <person-card-location-badge .zone=${r} .zoneStyles=${o}></person-card-location-badge>
            </div>
          </div>
          <div class="person-row-meta">
            ${a.slice(0,3).map(d=>{let p=I(this.hass,d),u=d.battery_threshold??20,b=p!==null?p<=u?"#f44336":p<50?"#ff9800":"#4caf50":"#888";return c`
                <div class="device-summary">
                  <ha-icon .icon=${d.icon??"mdi:devices"} style="--mdc-icon-size:14px;color:rgba(255,255,255,0.5)"></ha-icon>
                  ${p!==null?c`<span class="device-summary-pct" style="color:${b}">${Math.round(p)}%</span>`:""}
                  <div class="status-dot" style="background:${ee(this.hass,d)==="online"?"#4caf50":"#f44336"}"></div>
                </div>
              `})}
            ${l?c`<person-card-notification-badge color="#f44336" icon="mdi:alert-circle"></person-card-notification-badge>`:""}
          </div>
        </div>
      </div>
    `}_getZoneGroups(e){let r=new Map;for(let o of e){let n=this._getPersonZone(o);r.has(n)||r.set(n,[]),r.get(n).push(o)}return Array.from(r.entries()).sort(([o,n],[i,l])=>{let a=o.toLowerCase().replace(/\s+/g,"_"),d=i.toLowerCase().replace(/\s+/g,"_");return a==="home"?-1:d==="home"?1:l.length-n.length}).map(([o,n])=>({zone:o,people:n}))}_renderSummary(e){let r=this._zoneStyles(),o=new Map;for(let i of e){let l=this._getPersonZone(i);o.set(l,(o.get(l)??0)+1)}let n=Array.from(o.entries()).sort(([i],[l])=>{let a=i.toLowerCase().replace(/\s+/g,"_"),d=l.toLowerCase().replace(/\s+/g,"_");return a==="home"?-1:d==="home"?1:o.get(l)-o.get(i)});return c`
      <div class="summary-bar">
        ${n.map(([i,l])=>{let d=S(i,r)?.border_color??"rgba(255,255,255,0.3)",p=ye(i,r);return c`
            <div class="summary-item">
              <div class="summary-dot"
                style="background:${d};box-shadow:0 0 5px ${d}88">
              </div>
              <span class="summary-count">${l}</span>
              <span class="summary-label">${p}</span>
            </div>
          `})}
      </div>
    `}_renderZoneGroup(e,r,o){let n=this._zoneStyles(),l=S(e,n)?.border_color??"rgba(255,255,255,0.2)",a=qe(e,n),d=ye(e,n),p=o==="mini";return c`
      <div class="zone-group">
        <div class="zone-group-header" style="--group-accent:${l}">
          <ha-icon class="group-icon" .icon=${a} style="color:${l}"></ha-icon>
          <span class="group-label">${d}</span>
          <span class="group-count">${r.length}</span>
        </div>
        <div class="person-rows ${p?"mini-grid":""}">
          ${r.map(u=>this._renderRow(u,o))}
        </div>
      </div>
    `}_renderRow(e,r){return r==="compact"?this._renderCompactRow(e):r==="mini"?this._renderMiniRow(e):this._renderDetailedRow(e)}render(){if(!this._config||!this.hass)return c``;let e=Ie(this.hass,this._config),r=this._config.density??"detailed",o=this._config.group_by_zone??!1,n=this._config.show_summary??!1,l=o?c`${this._getZoneGroups(e).map(({zone:a,people:d})=>this._renderZoneGroup(a,d,r))}`:c`
          <div class="person-rows ${r==="mini"?"mini-grid":""}">
            ${e.map(a=>this._renderRow(a,r))}
          </div>
        `;return c`
      <div class="card-content">
        ${this._config.background_image?c`<div class="card-background"></div>`:""}
        ${n?this._renderSummary(e):""}
        ${l}
      </div>
    `}_renderDetailedRow(e){let r=this._getPersonZone(e),o=this._zoneStyles(),n=S(r,o),i=this._isPersonStale(e),l=this._personShowsBadge(e),a=e.devices??[],d=this._expandedEntity===e.entity,p=this.hass.states[e.entity],u=p?.last_changed?je(p.last_changed):"",b=n?.border_color??"rgba(255,255,255,0.1)",_=r==="not_home"&&e.address_entity?(()=>{let g=this.hass.states[e.address_entity];return g&&g.state!=="unavailable"&&g.state!=="unknown"?g.state:""})():"";return c`
      <div class="person-row" style="--row-accent:${b}"
        @click=${()=>{this._expandedEntity=d?null:e.entity}}>
        <div class="person-row-inner">
          ${this._renderAvatar(e,i)}
          <div class="person-info">
            <div class="person-name">${this._getPersonName(e)}</div>
            <div class="person-zone" style="display:flex;align-items:center;gap:6px">
              <person-card-location-badge .zone=${r} .zoneStyles=${o} .address=${_}></person-card-location-badge>
              ${u?c`<span style="font-size:0.7rem;color:rgba(255,255,255,0.35)">· ${u}</span>`:""}
            </div>
          </div>
          <div class="person-row-meta">
            ${a.slice(0,3).map(g=>{let F=I(this.hass,g),Ye=g.battery_threshold??20,Qe=F!==null?F<=Ye?"#f44336":F<50?"#ff9800":"#4caf50":"#888";return F!==null?c`
                <div class="device-summary">
                  <ha-icon .icon=${g.icon??"mdi:devices"} style="--mdc-icon-size:12px;color:rgba(255,255,255,0.4)"></ha-icon>
                  <span class="device-summary-pct" style="color:${Qe}">${Math.round(F)}%</span>
                </div>`:""})}
            ${l?c`<person-card-notification-badge color="#f44336" icon="mdi:alert-circle"></person-card-notification-badge>`:""}
            <span class="chevron ${d?"open":""}">▾</span>
          </div>
        </div>

        ${d?c`
          <div class="expanded-panel" @click=${g=>g.stopPropagation()}>
            ${a.length>0?c`
              <div class="device-list">
                ${a.map(g=>c`
                  <person-card-device-tile
                    .hass=${this.hass}
                    .device=${g}
                    .showLabels=${!0}
                  ></person-card-device-tile>
                `)}
              </div>
            `:""}
            <div class="expanded-footer">
              ${(e.show_last_seen??this._config.show_last_seen)&&p?.last_updated?c`
                <person-card-last-seen .lastUpdated=${p.last_updated} .format=${"relative"}></person-card-last-seen>
              `:""}
              ${(e.show_eta??this._config.show_eta)&&e.eta_entity?c`
                <person-card-eta-display
                  .hass=${this.hass}
                  .etaEntity=${e.eta_entity}
                  .personZone=${r}
                ></person-card-eta-display>
              `:""}
            </div>
            <div class="view-full-link"
              @click=${()=>{let g=e.tap_action;g&&"navigation_path"in g?(history.pushState(null,"",g.navigation_path),window.dispatchEvent(new PopStateEvent("popstate"))):this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:e.entity},bubbles:!0,composed:!0}))}}>
              View full card →
            </div>
          </div>
        `:""}
      </div>
    `}};L.styles=Ue,h([m({attribute:!1})],L.prototype,"hass",2),h([E()],L.prototype,"_config",2),h([E()],L.prototype,"_expandedEntity",2),L=h([x("family-card")],L);export{L as FamilyCard};
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
