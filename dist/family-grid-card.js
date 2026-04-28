var De=Object.defineProperty;var Ze=Object.getOwnPropertyDescriptor;var m=(s,e,t,r)=>{for(var o=r>1?void 0:r?Ze(e,t):e,n=s.length-1,i;n>=0;n--)(i=s[n])&&(o=(r?i(e,t,o):i(o))||o);return r&&o&&De(e,t,o),o};var V=globalThis,G=V.ShadowRoot&&(V.ShadyCSS===void 0||V.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Y=Symbol(),de=new WeakMap,U=class{constructor(e,t,r){if(this._$cssResult$=!0,r!==Y)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,t=this.t;if(G&&e===void 0){let r=t!==void 0&&t.length===1;r&&(e=de.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),r&&de.set(t,e))}return e}toString(){return this.cssText}},pe=s=>new U(typeof s=="string"?s:s+"",void 0,Y),w=(s,...e)=>{let t=s.length===1?s[0]:e.reduce((r,o,n)=>r+(i=>{if(i._$cssResult$===!0)return i.cssText;if(typeof i=="number")return i;throw Error("Value passed to 'css' function must be a 'css' function result: "+i+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(o)+s[n+1],s[0]);return new U(t,s,Y)},he=(s,e)=>{if(G)s.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(let t of e){let r=document.createElement("style"),o=V.litNonce;o!==void 0&&r.setAttribute("nonce",o),r.textContent=t.cssText,s.appendChild(r)}},ee=G?s=>s:s=>s instanceof CSSStyleSheet?(e=>{let t="";for(let r of e.cssRules)t+=r.cssText;return pe(t)})(s):s;var{is:Be,defineProperty:qe,getOwnPropertyDescriptor:We,getOwnPropertyNames:Fe,getOwnPropertySymbols:Ve,getPrototypeOf:Ge}=Object,_=globalThis,ue=_.trustedTypes,Ke=ue?ue.emptyScript:"",Je=_.reactiveElementPolyfillSupport,O=(s,e)=>s,R={toAttribute(s,e){switch(e){case Boolean:s=s?Ke:null;break;case Object:case Array:s=s==null?s:JSON.stringify(s)}return s},fromAttribute(s,e){let t=s;switch(e){case Boolean:t=s!==null;break;case Number:t=s===null?null:Number(s);break;case Object:case Array:try{t=JSON.parse(s)}catch{t=null}}return t}},K=(s,e)=>!Be(s,e),me={attribute:!0,type:String,converter:R,reflect:!1,useDefault:!1,hasChanged:K};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),_.litPropertyMetadata??(_.litPropertyMetadata=new WeakMap);var y=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??(this.l=[])).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=me){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){let r=Symbol(),o=this.getPropertyDescriptor(e,r,t);o!==void 0&&qe(this.prototype,e,o)}}static getPropertyDescriptor(e,t,r){let{get:o,set:n}=We(this.prototype,e)??{get(){return this[t]},set(i){this[t]=i}};return{get:o,set(i){let l=o?.call(this);n?.call(this,i),this.requestUpdate(e,l,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??me}static _$Ei(){if(this.hasOwnProperty(O("elementProperties")))return;let e=Ge(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(O("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(O("properties"))){let t=this.properties,r=[...Fe(t),...Ve(t)];for(let o of r)this.createProperty(o,t[o])}let e=this[Symbol.metadata];if(e!==null){let t=litPropertyMetadata.get(e);if(t!==void 0)for(let[r,o]of t)this.elementProperties.set(r,o)}this._$Eh=new Map;for(let[t,r]of this.elementProperties){let o=this._$Eu(t,r);o!==void 0&&this._$Eh.set(o,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let r=new Set(e.flat(1/0).reverse());for(let o of r)t.unshift(ee(o))}else e!==void 0&&t.push(ee(e));return t}static _$Eu(e,t){let r=t.attribute;return r===!1?void 0:typeof r=="string"?r:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??(this._$EO=new Set)).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,t=this.constructor.elementProperties;for(let r of t.keys())this.hasOwnProperty(r)&&(e.set(r,this[r]),delete this[r]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return he(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,r){this._$AK(e,r)}_$ET(e,t){let r=this.constructor.elementProperties.get(e),o=this.constructor._$Eu(e,r);if(o!==void 0&&r.reflect===!0){let n=(r.converter?.toAttribute!==void 0?r.converter:R).toAttribute(t,r.type);this._$Em=e,n==null?this.removeAttribute(o):this.setAttribute(o,n),this._$Em=null}}_$AK(e,t){let r=this.constructor,o=r._$Eh.get(e);if(o!==void 0&&this._$Em!==o){let n=r.getPropertyOptions(o),i=typeof n.converter=="function"?{fromAttribute:n.converter}:n.converter?.fromAttribute!==void 0?n.converter:R;this._$Em=o;let l=i.fromAttribute(t,n.type);this[o]=l??this._$Ej?.get(o)??l,this._$Em=null}}requestUpdate(e,t,r,o=!1,n){if(e!==void 0){let i=this.constructor;if(o===!1&&(n=this[e]),r??(r=i.getPropertyOptions(e)),!((r.hasChanged??K)(n,t)||r.useDefault&&r.reflect&&n===this._$Ej?.get(e)&&!this.hasAttribute(i._$Eu(e,r))))return;this.C(e,t,r)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:r,reflect:o,wrapped:n},i){r&&!(this._$Ej??(this._$Ej=new Map)).has(e)&&(this._$Ej.set(e,i??t??this[e]),n!==!0||i!==void 0)||(this._$AL.has(e)||(this.hasUpdated||r||(t=void 0),this._$AL.set(e,t)),o===!0&&this._$Em!==e&&(this._$Eq??(this._$Eq=new Set)).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(let[o,n]of this._$Ep)this[o]=n;this._$Ep=void 0}let r=this.constructor.elementProperties;if(r.size>0)for(let[o,n]of r){let{wrapped:i}=n,l=this[o];i!==!0||this._$AL.has(o)||l===void 0||this.C(o,void 0,n,l)}}let e=!1,t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(r=>r.hostUpdate?.()),this.update(t)):this._$EM()}catch(r){throw e=!1,this._$EM(),r}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&(this._$Eq=this._$Eq.forEach(t=>this._$ET(t,this[t]))),this._$EM()}updated(e){}firstUpdated(e){}};y.elementStyles=[],y.shadowRootOptions={mode:"open"},y[O("elementProperties")]=new Map,y[O("finalized")]=new Map,Je?.({ReactiveElement:y}),(_.reactiveElementVersions??(_.reactiveElementVersions=[])).push("2.1.2");var I=globalThis,fe=s=>s,J=I.trustedTypes,ge=J?J.createPolicy("lit-html",{createHTML:s=>s}):void 0,xe="$lit$",$=`lit$${Math.random().toFixed(9).slice(2)}$`,we="?"+$,Qe=`<${we}>`,E=document,j=()=>E.createComment(""),D=s=>s===null||typeof s!="object"&&typeof s!="function",ae=Array.isArray,Xe=s=>ae(s)||typeof s?.[Symbol.iterator]=="function",te=`[ 	
\f\r]`,L=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,be=/-->/g,ye=/>/g,A=RegExp(`>|${te}(?:([^\\s"'>=/]+)(${te}*=${te}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ve=/'/g,_e=/"/g,Ae=/^(?:script|style|textarea|title)$/i,le=s=>(e,...t)=>({_$litType$:s,strings:e,values:t}),h=le(1),pt=le(2),ht=le(3),C=Symbol.for("lit-noChange"),u=Symbol.for("lit-nothing"),$e=new WeakMap,S=E.createTreeWalker(E,129);function Se(s,e){if(!ae(s)||!s.hasOwnProperty("raw"))throw Error("invalid template strings array");return ge!==void 0?ge.createHTML(e):e}var Ye=(s,e)=>{let t=s.length-1,r=[],o,n=e===2?"<svg>":e===3?"<math>":"",i=L;for(let l=0;l<t;l++){let a=s[l],d,p,c=-1,g=0;for(;g<a.length&&(i.lastIndex=g,p=i.exec(a),p!==null);)g=i.lastIndex,i===L?p[1]==="!--"?i=be:p[1]!==void 0?i=ye:p[2]!==void 0?(Ae.test(p[2])&&(o=RegExp("</"+p[2],"g")),i=A):p[3]!==void 0&&(i=A):i===A?p[0]===">"?(i=o??L,c=-1):p[1]===void 0?c=-2:(c=i.lastIndex-p[2].length,d=p[1],i=p[3]===void 0?A:p[3]==='"'?_e:ve):i===_e||i===ve?i=A:i===be||i===ye?i=L:(i=A,o=void 0);let b=i===A&&s[l+1].startsWith("/>")?" ":"";n+=i===L?a+Qe:c>=0?(r.push(d),a.slice(0,c)+xe+a.slice(c)+$+b):a+$+(c===-2?l:b)}return[Se(s,n+(s[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),r]},Z=class s{constructor({strings:e,_$litType$:t},r){let o;this.parts=[];let n=0,i=0,l=e.length-1,a=this.parts,[d,p]=Ye(e,t);if(this.el=s.createElement(d,r),S.currentNode=this.el.content,t===2||t===3){let c=this.el.content.firstChild;c.replaceWith(...c.childNodes)}for(;(o=S.nextNode())!==null&&a.length<l;){if(o.nodeType===1){if(o.hasAttributes())for(let c of o.getAttributeNames())if(c.endsWith(xe)){let g=p[i++],b=o.getAttribute(c).split($),z=/([.?@])?(.*)/.exec(g);a.push({type:1,index:n,name:z[2],strings:b,ctor:z[1]==="."?oe:z[1]==="?"?se:z[1]==="@"?ie:M}),o.removeAttribute(c)}else c.startsWith($)&&(a.push({type:6,index:n}),o.removeAttribute(c));if(Ae.test(o.tagName)){let c=o.textContent.split($),g=c.length-1;if(g>0){o.textContent=J?J.emptyScript:"";for(let b=0;b<g;b++)o.append(c[b],j()),S.nextNode(),a.push({type:2,index:++n});o.append(c[g],j())}}}else if(o.nodeType===8)if(o.data===we)a.push({type:2,index:n});else{let c=-1;for(;(c=o.data.indexOf($,c+1))!==-1;)a.push({type:7,index:n}),c+=$.length-1}n++}}static createElement(e,t){let r=E.createElement("template");return r.innerHTML=e,r}};function P(s,e,t=s,r){if(e===C)return e;let o=r!==void 0?t._$Co?.[r]:t._$Cl,n=D(e)?void 0:e._$litDirective$;return o?.constructor!==n&&(o?._$AO?.(!1),n===void 0?o=void 0:(o=new n(s),o._$AT(s,t,r)),r!==void 0?(t._$Co??(t._$Co=[]))[r]=o:t._$Cl=o),o!==void 0&&(e=P(s,o._$AS(s,e.values),o,r)),e}var re=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:r}=this._$AD,o=(e?.creationScope??E).importNode(t,!0);S.currentNode=o;let n=S.nextNode(),i=0,l=0,a=r[0];for(;a!==void 0;){if(i===a.index){let d;a.type===2?d=new B(n,n.nextSibling,this,e):a.type===1?d=new a.ctor(n,a.name,a.strings,this,e):a.type===6&&(d=new ne(n,this,e)),this._$AV.push(d),a=r[++l]}i!==a?.index&&(n=S.nextNode(),i++)}return S.currentNode=E,o}p(e){let t=0;for(let r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(e,r,t),t+=r.strings.length-2):r._$AI(e[t])),t++}},B=class s{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,r,o){this.type=2,this._$AH=u,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=r,this.options=o,this._$Cv=o?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=P(this,e,t),D(e)?e===u||e==null||e===""?(this._$AH!==u&&this._$AR(),this._$AH=u):e!==this._$AH&&e!==C&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):Xe(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==u&&D(this._$AH)?this._$AA.nextSibling.data=e:this.T(E.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:r}=e,o=typeof r=="number"?this._$AC(e):(r.el===void 0&&(r.el=Z.createElement(Se(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===o)this._$AH.p(t);else{let n=new re(o,this),i=n.u(this.options);n.p(t),this.T(i),this._$AH=n}}_$AC(e){let t=$e.get(e.strings);return t===void 0&&$e.set(e.strings,t=new Z(e)),t}k(e){ae(this._$AH)||(this._$AH=[],this._$AR());let t=this._$AH,r,o=0;for(let n of e)o===t.length?t.push(r=new s(this.O(j()),this.O(j()),this,this.options)):r=t[o],r._$AI(n),o++;o<t.length&&(this._$AR(r&&r._$AB.nextSibling,o),t.length=o)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let r=fe(e).nextSibling;fe(e).remove(),e=r}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},M=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,r,o,n){this.type=1,this._$AH=u,this._$AN=void 0,this.element=e,this.name=t,this._$AM=o,this.options=n,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=u}_$AI(e,t=this,r,o){let n=this.strings,i=!1;if(n===void 0)e=P(this,e,t,0),i=!D(e)||e!==this._$AH&&e!==C,i&&(this._$AH=e);else{let l=e,a,d;for(e=n[0],a=0;a<n.length-1;a++)d=P(this,l[r+a],t,a),d===C&&(d=this._$AH[a]),i||(i=!D(d)||d!==this._$AH[a]),d===u?e=u:e!==u&&(e+=(d??"")+n[a+1]),this._$AH[a]=d}i&&!o&&this.j(e)}j(e){e===u?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},oe=class extends M{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===u?void 0:e}},se=class extends M{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==u)}},ie=class extends M{constructor(e,t,r,o,n){super(e,t,r,o,n),this.type=5}_$AI(e,t=this){if((e=P(this,e,t,0)??u)===C)return;let r=this._$AH,o=e===u&&r!==u||e.capture!==r.capture||e.once!==r.once||e.passive!==r.passive,n=e!==u&&(r===u||o);o&&this.element.removeEventListener(this.name,this,r),n&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},ne=class{constructor(e,t,r){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(e){P(this,e)}};var et=I.litHtmlPolyfillSupport;et?.(Z,B),(I.litHtmlVersions??(I.litHtmlVersions=[])).push("3.3.2");var Ee=(s,e,t)=>{let r=t?.renderBefore??e,o=r._$litPart$;if(o===void 0){let n=t?.renderBefore??null;r._$litPart$=o=new B(e.insertBefore(j(),n),n,void 0,t??{})}return o._$AI(s),o};var q=globalThis,f=class extends y{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t;let e=super.createRenderRoot();return(t=this.renderOptions).renderBefore??(t.renderBefore=e.firstChild),e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Ee(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return C}};f._$litElement$=!0,f.finalized=!0,q.litElementHydrateSupport?.({LitElement:f});var tt=q.litElementPolyfillSupport;tt?.({LitElement:f});(q.litElementVersions??(q.litElementVersions=[])).push("4.2.2");var H=s=>(e,t)=>{t!==void 0?t.addInitializer(()=>{customElements.define(s,e)}):customElements.define(s,e)};var rt={attribute:!0,type:String,converter:R,reflect:!1,hasChanged:K},ot=(s=rt,e,t)=>{let{kind:r,metadata:o}=t,n=globalThis.litPropertyMetadata.get(o);if(n===void 0&&globalThis.litPropertyMetadata.set(o,n=new Map),r==="setter"&&((s=Object.create(s)).wrapped=!0),n.set(t.name,s),r==="accessor"){let{name:i}=t;return{set(l){let a=e.get.call(this);e.set.call(this,l),this.requestUpdate(i,a,s,!0,l)},init(l){return l!==void 0&&this.C(i,void 0,s,l),l}}}if(r==="setter"){let{name:i}=t;return function(l){let a=this[i];e.call(this,l),this.requestUpdate(i,a,s,!0,l)}}throw Error("Unsupported decorator location: "+r)};function v(s){return(e,t)=>typeof t=="object"?ot(s,e,t):((r,o,n)=>{let i=o.hasOwnProperty(n);return o.constructor.createProperty(n,r),i?Object.getOwnPropertyDescriptor(o,n):void 0})(s,e,t)}function W(s){return v({...s,state:!0,attribute:!1})}var Ce=w`
  :host {
    display: block;
    font-family: var(--person-card-font-family, 'Segoe UI', system-ui, sans-serif);
    border-radius: var(--person-card-border-radius, 16px);
    overflow: hidden;
    background: var(--ha-card-background, #1c1c2e);
    color: #ffffff;
    box-shadow: 0 4px 24px rgba(0,0,0,0.4);
  }

  .card-content {
    padding: 14px;
  }

  /* ── Optional header ─────────────────────────────────────── */
  .card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 14px;
    padding-bottom: 10px;
    border-bottom: 1px solid rgba(255,255,255,0.07);
  }
  .card-title {
    font-size: 0.82rem;
    font-weight: 600;
    color: rgba(255,255,255,0.5);
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }
  .card-summary {
    font-size: 0.75rem;
    color: rgba(255,255,255,0.3);
  }

  /* ── Grid ────────────────────────────────────────────────── */
  .person-grid {
    display: grid;
    grid-template-columns: repeat(var(--fgc-cols, 3), 1fr);
    gap: 12px;
  }

  /* ── Tile ────────────────────────────────────────────────── */
  .tile {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    padding: 12px 6px 10px;
    border-radius: 12px;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.05);
  }

  /* ── Ring wrapper ────────────────────────────────────────── */
  .ring-wrap {
    position: relative;
    width: var(--fgc-ring-size, 70px);
    height: var(--fgc-ring-size, 70px);
    flex-shrink: 0;
  }

  /* Main ring: border + animated glow */
  .ring-wrap::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 50%;
    border: 4px solid var(--ring-color, rgba(255,255,255,0.25));
    box-shadow:
      0 0 10px 2px var(--ring-color, rgba(255,255,255,0.25)),
      0 0 22px 5px var(--ring-glow, rgba(255,255,255,0.1));
    z-index: 1;
    animation: fgc-breathe var(--fgc-speed, 3s) ease-in-out infinite;
  }

  /* Ripple ring: expands and fades out */
  .ring-wrap::after {
    content: '';
    position: absolute;
    inset: -6px;
    border-radius: 50%;
    border: 2px solid var(--ring-color, rgba(255,255,255,0.25));
    opacity: 0;
    animation: fgc-ripple var(--fgc-speed, 3s) ease-in-out infinite;
    z-index: 0;
  }

  @keyframes fgc-breathe {
    0%, 100% {
      box-shadow:
        0 0 10px 2px var(--ring-color, rgba(255,255,255,0.25)),
        0 0 22px 5px var(--ring-glow, rgba(255,255,255,0.1));
    }
    50% {
      box-shadow:
        0 0 18px 6px var(--ring-color, rgba(255,255,255,0.25)),
        0 0 36px 12px var(--ring-glow, rgba(255,255,255,0.15));
    }
  }

  @keyframes fgc-ripple {
    0%   { opacity: 0.5; transform: scale(1); }
    100% { opacity: 0; transform: scale(1.35); }
  }

  /* ── Avatar (photo) ──────────────────────────────────────── */
  .avatar {
    width: var(--fgc-avatar-size, 58px);
    height: var(--fgc-avatar-size, 58px);
    border-radius: 50%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    object-fit: cover;
    z-index: 2;
  }

  /* ── Avatar (initials fallback) ──────────────────────────── */
  .avatar-initials {
    width: var(--fgc-avatar-size, 58px);
    height: var(--fgc-avatar-size, 58px);
    border-radius: 50%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--ring-bg, #2d2d50);
    font-weight: 700;
    color: rgba(255,255,255,0.9);
    font-size: var(--fgc-initial-size, 20px);
    z-index: 2;
  }

  /* ── Tile text ───────────────────────────────────────────── */
  .tile-name {
    font-size: 0.78rem;
    font-weight: 700;
    color: rgba(255,255,255,0.9);
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
  }

  .tile-badge {
    display: flex;
    align-items: center;
    gap: 4px;
    background: var(--ring-bg-badge, rgba(255,255,255,0.06));
    border: 1px solid var(--ring-border-badge, rgba(255,255,255,0.15));
    border-radius: 20px;
    padding: 2px 8px;
    font-size: 0.6rem;
    font-weight: 600;
    color: var(--ring-color, rgba(255,255,255,0.7));
    white-space: nowrap;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .tile-badge ha-icon {
    --mdc-icon-size: 11px;
    flex-shrink: 0;
  }
`;var ce="person-card-theme-updated";function st(){return(typeof window<"u"?window:globalThis).personCardTheme}function Te(s){let e=st()?.zoneStyles??[];if(s.length===0)return e;let t=new Map(e.map(r=>[r.zone,r]));return s.map(r=>{if(r.border_color&&r.background_color)return r;let o=t.get(r.zone);return o?{...o,...r,border_color:r.border_color??o.border_color,background_color:r.background_color??o.background_color}:r})}function ke(s){return s.toLowerCase().replace(/[\s-]+/g,"_").replace(/[^a-z0-9_]/g,"")}function X(s,e){let t=e.find(o=>o.zone===s);if(t)return t;let r=ke(s);return e.find(o=>ke(o.zone)===r)}function ze(s,e,t=""){let r=X(s,e);return r?.label?r.label:s==="not_home"?t||"Away":s==="unknown"?"Unknown":s.replace(/_/g," ")}function Pe(s,e,t=!1){let r=X(s,e);return r?.icon?r.icon:s==="home"?"mdi:home":s==="not_home"?t?"mdi:map-marker":"mdi:map-marker-off":s==="unknown"?"mdi:help-circle":"mdi:map-marker"}function F(s,e){let t=s.replace("#",""),r=t.length===3?t.split("").map(l=>l+l).join(""):t,o=parseInt(r.slice(0,2),16),n=parseInt(r.slice(2,4),16),i=parseInt(r.slice(4,6),16);return isNaN(o)||isNaN(n)||isNaN(i)?`rgba(0, 0, 0, ${e})`:`rgba(${o}, ${n}, ${i}, ${e})`}var it={1:110,2:90,3:70,4:58,5:50,6:42};function Me(s){let e=Math.min(6,Math.max(1,Math.round(s)));return it[e]??70}function He(s,e){let t=s?.trim();return t?t[0].toUpperCase():((e.includes(".")?e.split(".")[1]:e)?.[0]??"?").toUpperCase()}function Ne(s,e){let t=0,r=0;for(let o of s)(e.states[o.entity]?.state??"unknown")==="home"?t++:r++;return{home:t,away:r}}var N=[{name:"Midnight",bg:"#1c1c2e",border:"#4fc3f7"},{name:"Forest Walk",bg:"#1b2e1b",border:"#76c442"},{name:"Lava Flow",bg:"#2e1b1b",border:"#ff6d00"},{name:"Arctic Drift",bg:"#1a2332",border:"#80deea"},{name:"Twilight",bg:"#2e1b3c",border:"#ce93d8"},{name:"Emerald City",bg:"#1b2e28",border:"#ffd700"},{name:"Rose Gold",bg:"#2e1c24",border:"#f48fb1"},{name:"Neon Tokyo",bg:"#120d1f",border:"#e040fb"},{name:"Desert Night",bg:"#2e2416",border:"#ffb300"},{name:"Northern Lights",bg:"#0d1f1a",border:"#69f0ae"}];var T=class extends f{constructor(){super(...arguments);this.zoneStyles=[]}_fire(t){this.dispatchEvent(new CustomEvent("zone-styles-changed",{detail:{zoneStyles:t},bubbles:!0,composed:!0}))}_update(t,r){let o=[...this.zoneStyles];o[t]={...o[t],...r},this._fire(o)}_remove(t){let r=[...this.zoneStyles];r.splice(t,1),this._fire(r)}_add(){this._fire([...this.zoneStyles,{zone:""}])}_autoDetect(){if(!this.hass)return;let t=new Map(this.zoneStyles.map((i,l)=>[i.zone,l])),r=[...this.zoneStyles],o=0;r=r.map((i,l)=>{if(!i.border_color){let a=N[(l+o)%N.length];return o++,{...i,background_color:i.background_color??a.bg,border_color:a.border}}return i});let n=Object.entries(this.hass.states).filter(([i])=>i.startsWith("zone.")).map(([i,l])=>{let a=l.attributes.friendly_name??i.replace("zone.","");return{zone:i==="zone.home"?"home":a,label:a,icon:l.attributes.icon??"mdi:map-marker"}}).filter(i=>!t.has(i.zone));if(n.length>0){let i=r.length,l=n.map((a,d)=>{let p=N[(i+d)%N.length];return{...a,background_color:p.bg,border_color:p.border}});r=[...r,...l]}this._fire(r)}render(){return h`
      <button class="add-btn" style="margin-bottom:8px" @click=${()=>this._autoDetect()}>
        <ha-icon .icon=${"mdi:magnify"}></ha-icon> Auto-detect zones from HA
      </button>
      ${this.zoneStyles.map((t,r)=>h`
        <div class="zone-block">
          <div class="zone-row">
            <ha-textfield
              .value=${t.zone}
              label="Zone name"
              @input=${o=>this._update(r,{zone:o.target.value})}
            ></ha-textfield>
            <ha-textfield
              .value=${t.label??""}
              label="Display label"
              @input=${o=>this._update(r,{label:o.target.value||void 0})}
            ></ha-textfield>
            <div style="flex:1;min-width:0">
              <ha-icon-picker
                .value=${t.icon??""}
                label="Icon"
                @value-changed=${o=>this._update(r,{icon:o.detail.value||void 0})}
              ></ha-icon-picker>
            </div>
            <button class="delete-btn" @click=${()=>this._remove(r)}>
              <ha-icon .icon=${"mdi:delete"}></ha-icon>
            </button>
          </div>
          <div class="scheme-row">
            ${N.map(o=>h`
              <div class="scheme-swatch"
                title=${o.name}
                style="background:${o.bg};border:3px solid ${o.border}"
                @click=${()=>this._update(r,{background_color:o.bg,border_color:o.border})}
              ></div>
            `)}
            <div class="scheme-divider"></div>
            <div class="color-row">
              <label style="font-size:0.75rem">BG</label>
              <input type="color" .value=${t.background_color??"#1c1c2e"}
                @input=${o=>this._update(r,{background_color:o.target.value})} />
            </div>
            <div class="color-row">
              <label style="font-size:0.75rem">Border</label>
              <input type="color" .value=${t.border_color??"#ffffff"}
                @input=${o=>this._update(r,{border_color:o.target.value})} />
            </div>
          </div>
        </div>
      `)}
      <button class="add-btn" @click=${()=>this._add()}>
        <ha-icon .icon=${"mdi:plus-circle"}></ha-icon> Add Zone Style
      </button>
    `}};T.styles=w`
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
  `,m([v({attribute:!1})],T.prototype,"hass",2),m([v({type:Array})],T.prototype,"zoneStyles",2),T=m([H("person-card-zone-editor")],T);var x=class extends f{constructor(){super(...arguments);this._activeTab="display"}setConfig(t){this._config=t}_fire(t){this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t},bubbles:!0,composed:!0})),this._config=t}_set(t){this._fire({...this._config,...t})}_renderDisplayTab(){return h`
      <div class="row">
        <label>Title (optional — shown above the grid with a home/away count)</label>
        <ha-textfield
          .value=${this._config.title??""}
          placeholder="Family"
          @input=${t=>{this._set({title:t.target.value||void 0})}}
        ></ha-textfield>
      </div>
      <div class="row">
        <label>Columns (1–6, default 3 — tiles resize automatically)</label>
        <ha-textfield
          type="number"
          .value=${String(this._config.columns??3)}
          min="1"
          max="6"
          @input=${t=>{let r=parseInt(t.target.value,10);r>=1&&r<=6&&this._set({columns:r})}}
        ></ha-textfield>
      </div>
    `}_renderPeopleTab(){let t=this._config.people??[];return h`
      <div class="row">
        <label>People</label>
        ${t.map((r,o)=>h`
          <div class="person-block">
            <div class="person-header">
              <span class="person-label">Person ${o+1}</span>
              <button class="delete-btn" @click=${()=>{let n=[...t];n.splice(o,1),this._set({people:n})}}>
                <ha-icon .icon=${"mdi:delete"}></ha-icon>
              </button>
            </div>
            <ha-entity-picker
              .hass=${this.hass}
              .value=${r.entity??""}
              .includeDomains=${["person"]}
              @value-changed=${n=>{let i=[...t];i[o]={...i[o],entity:n.detail.value},this._set({people:i})}}
            ></ha-entity-picker>
            <div class="detail-row">
              <ha-textfield
                .value=${r.name??""}
                label="Display name (optional)"
                @input=${n=>{let i=[...t];i[o]={...i[o],name:n.target.value||void 0},this._set({people:i})}}
              ></ha-textfield>
            </div>
          </div>
        `)}
        <button class="add-btn" @click=${()=>{this._set({people:[...t,{entity:""}]})}}>
          <ha-icon .icon=${"mdi:plus-circle"}></ha-icon> Add Person
        </button>
      </div>
    `}_renderZonesTab(){return h`
      <div class="row">
        <label>Zone Style Overrides (optional — falls back to Theme Card)</label>
        <person-card-zone-editor
          .hass=${this.hass}
          .zoneStyles=${this._config.zone_styles??[]}
          @zone-styles-changed=${t=>this._set({zone_styles:t.detail.zoneStyles})}
        ></person-card-zone-editor>
      </div>
    `}render(){if(!this._config)return h``;let t={display:"Display",people:"People",zones:"Zone Styles"};return h`
      <div class="tabs">
        ${["display","people","zones"].map(r=>h`
          <div class="tab ${this._activeTab===r?"active":""}"
            @click=${()=>{this._activeTab=r}}>
            ${t[r]}
          </div>
        `)}
      </div>
      ${this._activeTab==="display"?this._renderDisplayTab():""}
      ${this._activeTab==="people"?this._renderPeopleTab():""}
      ${this._activeTab==="zones"?this._renderZonesTab():""}
    `}};x.styles=w`
    .tabs { display: flex; border-bottom: 1px solid var(--divider-color, #e0e0e0); margin-bottom: 16px; }
    .tab { padding: 8px 14px; font-size: 0.82rem; font-weight: 600; cursor: pointer;
      border-bottom: 2px solid transparent; color: var(--secondary-text-color); user-select: none; }
    .tab.active { color: var(--primary-color); border-bottom-color: var(--primary-color); }
    .row { margin-bottom: 12px; }
    .row label { display: block; font-size: 0.8rem; color: var(--secondary-text-color); margin-bottom: 4px; }
    .person-block { border: 1px solid var(--divider-color, rgba(0,0,0,0.15)); border-radius: 8px;
      padding: 8px; margin-bottom: 8px; }
    .person-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px; }
    .person-label { font-size: 0.78rem; color: var(--secondary-text-color); }
    .add-btn { display: inline-flex; align-items: center; gap: 4px; font-size: 0.82rem; cursor: pointer;
      color: var(--primary-color); padding: 6px 0; background: none; border: none; }
    .delete-btn { cursor: pointer; color: var(--error-color, #f44336); background: none; border: none; }
    .detail-row { margin-top: 6px; }
    ha-textfield, ha-entity-picker { display: block; width: 100%; }
  `,m([v({attribute:!1})],x.prototype,"hass",2),m([W()],x.prototype,"_config",2),m([W()],x.prototype,"_activeTab",2),x=m([H("family-grid-card-editor")],x);window.customCards=window.customCards??[];window.customCards.push({type:"family-grid-card",name:"Family Grid Card",description:"Grid of family members with animated zone rings \u2014 readable from across a room.",preview:!0});var k=class extends f{constructor(){super(...arguments);this._onThemeUpdated=()=>{this.requestUpdate()}}static getStubConfig(t){return{people:t?Object.keys(t.states).filter(o=>o.startsWith("person.")).slice(0,6).map(o=>({entity:o})):[],columns:3}}static getConfigElement(){return document.createElement("family-grid-card-editor")}setConfig(t){this._config={columns:3,zone_styles:[],...t}}getCardSize(){return 3}connectedCallback(){super.connectedCallback(),window.addEventListener(ce,this._onThemeUpdated)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener(ce,this._onThemeUpdated)}_zoneStyles(){return Te(this._config.zone_styles??[])}_renderTile(t,r){let o=this.hass.states[t.entity]?.state??"unknown",n=X(o,r),i=this.hass.states[t.entity],l=i?.attributes?.entity_picture,a=i?.attributes?.friendly_name,d=t.name||a||t.entity,p=He(t.name||a,t.entity),c=n?.border_color,g=c??"rgba(255,255,255,0.25)",b=c?F(c,.3):"rgba(255,255,255,0.1)",z=c?F(c,.2):"#2d2d50",Ue=c?F(c,.18):"rgba(255,255,255,0.06)",Oe=c?F(c,.4):"rgba(255,255,255,0.15)",Re=o==="home"?"3s":"1.8s",Le=[`--ring-color:${g}`,`--ring-glow:${b}`,`--ring-bg:${z}`,`--ring-bg-badge:${Ue}`,`--ring-border-badge:${Oe}`,`--fgc-speed:${Re}`].join(";"),Ie=ze(o,r,""),je=Pe(o,r,!1);return h`
      <div class="tile" style=${Le}>
        <div class="ring-wrap">
          ${l?h`<img class="avatar" src=${l} alt=${d}>`:h`<div class="avatar-initials">${p}</div>`}
        </div>
        <div class="tile-name">${d}</div>
        <div class="tile-badge">
          <ha-icon .icon=${je}></ha-icon>
          ${Ie}
        </div>
      </div>
    `}render(){if(!this._config||!this.hass)return h``;let t=this._config.people??[],r=Math.min(6,Math.max(1,this._config.columns??3)),o=Me(r),n=o-12,i=Math.round(n*.35),l=this._zoneStyles(),a=[`--fgc-cols:${r}`,`--fgc-ring-size:${o}px`,`--fgc-avatar-size:${n}px`,`--fgc-initial-size:${i}px`].join(";"),d=!!this._config.title,p=d?Ne(t,this.hass):null;return h`
      <div class="card-content">
        ${d?h`
          <div class="card-header">
            <span class="card-title">${this._config.title}</span>
            <span class="card-summary">${p.home} home · ${p.away} away</span>
          </div>
        `:""}
        <div class="person-grid" style=${a}>
          ${t.map(c=>this._renderTile(c,l))}
        </div>
      </div>
    `}};k.styles=Ce,m([v({attribute:!1})],k.prototype,"hass",2),m([W()],k.prototype,"_config",2),k=m([H("family-grid-card")],k);export{k as FamilyGridCard};
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
*/
