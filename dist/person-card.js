var ft=Object.defineProperty;var vt=Object.getOwnPropertyDescriptor;var p=(s,o,e,t)=>{for(var r=t>1?void 0:t?vt(o,e):o,i=s.length-1,a;i>=0;i--)(a=s[i])&&(r=(t?a(o,e,r):a(r))||r);return t&&r&&ft(o,e,r),r};var be=globalThis,ue=be.ShadowRoot&&(be.ShadyCSS===void 0||be.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,ke=Symbol(),Re=new WeakMap,te=class{constructor(o,e,t){if(this._$cssResult$=!0,t!==ke)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=o,this.t=e}get styleSheet(){let o=this.o,e=this.t;if(ue&&o===void 0){let t=e!==void 0&&e.length===1;t&&(o=Re.get(e)),o===void 0&&((this.o=o=new CSSStyleSheet).replaceSync(this.cssText),t&&Re.set(e,o))}return o}toString(){return this.cssText}},Ne=s=>new te(typeof s=="string"?s:s+"",void 0,ke),v=(s,...o)=>{let e=s.length===1?s[0]:o.reduce((t,r,i)=>t+(a=>{if(a._$cssResult$===!0)return a.cssText;if(typeof a=="number")return a;throw Error("Value passed to 'css' function must be a 'css' function result: "+a+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+s[i+1],s[0]);return new te(e,s,ke)},Ie=(s,o)=>{if(ue)s.adoptedStyleSheets=o.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of o){let t=document.createElement("style"),r=be.litNonce;r!==void 0&&t.setAttribute("nonce",r),t.textContent=e.cssText,s.appendChild(t)}},Ce=ue?s=>s:s=>s instanceof CSSStyleSheet?(o=>{let e="";for(let t of o.cssRules)e+=t.cssText;return Ne(e)})(s):s;var{is:yt,defineProperty:xt,getOwnPropertyDescriptor:_t,getOwnPropertyNames:wt,getOwnPropertySymbols:$t,getPrototypeOf:kt}=Object,L=globalThis,De=L.trustedTypes,Ct=De?De.emptyScript:"",zt=L.reactiveElementPolyfillSupport,re=(s,o)=>s,oe={toAttribute(s,o){switch(o){case Boolean:s=s?Ct:null;break;case Object:case Array:s=s==null?s:JSON.stringify(s)}return s},fromAttribute(s,o){let e=s;switch(o){case Boolean:e=s!==null;break;case Number:e=s===null?null:Number(s);break;case Object:case Array:try{e=JSON.parse(s)}catch{e=null}}return e}},fe=(s,o)=>!yt(s,o),Ue={attribute:!0,type:String,converter:oe,reflect:!1,useDefault:!1,hasChanged:fe};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),L.litPropertyMetadata??(L.litPropertyMetadata=new WeakMap);var A=class extends HTMLElement{static addInitializer(o){this._$Ei(),(this.l??(this.l=[])).push(o)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(o,e=Ue){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(o)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(o,e),!e.noAccessor){let t=Symbol(),r=this.getPropertyDescriptor(o,t,e);r!==void 0&&xt(this.prototype,o,r)}}static getPropertyDescriptor(o,e,t){let{get:r,set:i}=_t(this.prototype,o)??{get(){return this[e]},set(a){this[e]=a}};return{get:r,set(a){let c=r?.call(this);i?.call(this,a),this.requestUpdate(o,c,t)},configurable:!0,enumerable:!0}}static getPropertyOptions(o){return this.elementProperties.get(o)??Ue}static _$Ei(){if(this.hasOwnProperty(re("elementProperties")))return;let o=kt(this);o.finalize(),o.l!==void 0&&(this.l=[...o.l]),this.elementProperties=new Map(o.elementProperties)}static finalize(){if(this.hasOwnProperty(re("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(re("properties"))){let e=this.properties,t=[...wt(e),...$t(e)];for(let r of t)this.createProperty(r,e[r])}let o=this[Symbol.metadata];if(o!==null){let e=litPropertyMetadata.get(o);if(e!==void 0)for(let[t,r]of e)this.elementProperties.set(t,r)}this._$Eh=new Map;for(let[e,t]of this.elementProperties){let r=this._$Eu(e,t);r!==void 0&&this._$Eh.set(r,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(o){let e=[];if(Array.isArray(o)){let t=new Set(o.flat(1/0).reverse());for(let r of t)e.unshift(Ce(r))}else o!==void 0&&e.push(Ce(o));return e}static _$Eu(o,e){let t=e.attribute;return t===!1?void 0:typeof t=="string"?t:typeof o=="string"?o.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(o=>this.enableUpdating=o),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(o=>o(this))}addController(o){(this._$EO??(this._$EO=new Set)).add(o),this.renderRoot!==void 0&&this.isConnected&&o.hostConnected?.()}removeController(o){this._$EO?.delete(o)}_$E_(){let o=new Map,e=this.constructor.elementProperties;for(let t of e.keys())this.hasOwnProperty(t)&&(o.set(t,this[t]),delete this[t]);o.size>0&&(this._$Ep=o)}createRenderRoot(){let o=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Ie(o,this.constructor.elementStyles),o}connectedCallback(){this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),this._$EO?.forEach(o=>o.hostConnected?.())}enableUpdating(o){}disconnectedCallback(){this._$EO?.forEach(o=>o.hostDisconnected?.())}attributeChangedCallback(o,e,t){this._$AK(o,t)}_$ET(o,e){let t=this.constructor.elementProperties.get(o),r=this.constructor._$Eu(o,t);if(r!==void 0&&t.reflect===!0){let i=(t.converter?.toAttribute!==void 0?t.converter:oe).toAttribute(e,t.type);this._$Em=o,i==null?this.removeAttribute(r):this.setAttribute(r,i),this._$Em=null}}_$AK(o,e){let t=this.constructor,r=t._$Eh.get(o);if(r!==void 0&&this._$Em!==r){let i=t.getPropertyOptions(r),a=typeof i.converter=="function"?{fromAttribute:i.converter}:i.converter?.fromAttribute!==void 0?i.converter:oe;this._$Em=r;let c=a.fromAttribute(e,i.type);this[r]=c??this._$Ej?.get(r)??c,this._$Em=null}}requestUpdate(o,e,t,r=!1,i){if(o!==void 0){let a=this.constructor;if(r===!1&&(i=this[o]),t??(t=a.getPropertyOptions(o)),!((t.hasChanged??fe)(i,e)||t.useDefault&&t.reflect&&i===this._$Ej?.get(o)&&!this.hasAttribute(a._$Eu(o,t))))return;this.C(o,e,t)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(o,e,{useDefault:t,reflect:r,wrapped:i},a){t&&!(this._$Ej??(this._$Ej=new Map)).has(o)&&(this._$Ej.set(o,a??e??this[o]),i!==!0||a!==void 0)||(this._$AL.has(o)||(this.hasUpdated||t||(e=void 0),this._$AL.set(o,e)),r===!0&&this._$Em!==o&&(this._$Eq??(this._$Eq=new Set)).add(o))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let o=this.scheduleUpdate();return o!=null&&await o,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(let[r,i]of this._$Ep)this[r]=i;this._$Ep=void 0}let t=this.constructor.elementProperties;if(t.size>0)for(let[r,i]of t){let{wrapped:a}=i,c=this[r];a!==!0||this._$AL.has(r)||c===void 0||this.C(r,void 0,i,c)}}let o=!1,e=this._$AL;try{o=this.shouldUpdate(e),o?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(t){throw o=!1,this._$EM(),t}o&&this._$AE(e)}willUpdate(o){}_$AE(o){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(o)),this.updated(o)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(o){return!0}update(o){this._$Eq&&(this._$Eq=this._$Eq.forEach(e=>this._$ET(e,this[e]))),this._$EM()}updated(o){}firstUpdated(o){}};A.elementStyles=[],A.shadowRootOptions={mode:"open"},A[re("elementProperties")]=new Map,A[re("finalized")]=new Map,zt?.({ReactiveElement:A}),(L.reactiveElementVersions??(L.reactiveElementVersions=[])).push("2.1.2");var ae=globalThis,Oe=s=>s,ve=ae.trustedTypes,Ze=ve?ve.createPolicy("lit-html",{createHTML:s=>s}):void 0,Ve="$lit$",H=`lit$${Math.random().toFixed(9).slice(2)}$`,We="?"+H,St=`<${We}>`,q=document,se=()=>q.createComment(""),ne=s=>s===null||typeof s!="object"&&typeof s!="function",Me=Array.isArray,Et=s=>Me(s)||typeof s?.[Symbol.iterator]=="function",ze=`[ 	
\f\r]`,ie=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Be=/-->/g,je=/>/g,j=RegExp(`>|${ze}(?:([^\\s"'>=/]+)(${ze}*=${ze}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Fe=/'/g,qe=/"/g,Ke=/^(?:script|style|textarea|title)$/i,Le=s=>(o,...e)=>({_$litType$:s,strings:o,values:e}),n=Le(1),Wt=Le(2),Kt=Le(3),P=Symbol.for("lit-noChange"),_=Symbol.for("lit-nothing"),Ge=new WeakMap,F=q.createTreeWalker(q,129);function Ye(s,o){if(!Me(s)||!s.hasOwnProperty("raw"))throw Error("invalid template strings array");return Ze!==void 0?Ze.createHTML(o):o}var Tt=(s,o)=>{let e=s.length-1,t=[],r,i=o===2?"<svg>":o===3?"<math>":"",a=ie;for(let c=0;c<e;c++){let l=s[c],d,h,g=-1,u=0;for(;u<l.length&&(a.lastIndex=u,h=a.exec(l),h!==null);)u=a.lastIndex,a===ie?h[1]==="!--"?a=Be:h[1]!==void 0?a=je:h[2]!==void 0?(Ke.test(h[2])&&(r=RegExp("</"+h[2],"g")),a=j):h[3]!==void 0&&(a=j):a===j?h[0]===">"?(a=r??ie,g=-1):h[1]===void 0?g=-2:(g=a.lastIndex-h[2].length,d=h[1],a=h[3]===void 0?j:h[3]==='"'?qe:Fe):a===qe||a===Fe?a=j:a===Be||a===je?a=ie:(a=j,r=void 0);let x=a===j&&s[c+1].startsWith("/>")?" ":"";i+=a===ie?l+St:g>=0?(t.push(d),l.slice(0,g)+Ve+l.slice(g)+H+x):l+H+(g===-2?c:x)}return[Ye(s,i+(s[e]||"<?>")+(o===2?"</svg>":o===3?"</math>":"")),t]},le=class s{constructor({strings:o,_$litType$:e},t){let r;this.parts=[];let i=0,a=0,c=o.length-1,l=this.parts,[d,h]=Tt(o,e);if(this.el=s.createElement(d,t),F.currentNode=this.el.content,e===2||e===3){let g=this.el.content.firstChild;g.replaceWith(...g.childNodes)}for(;(r=F.nextNode())!==null&&l.length<c;){if(r.nodeType===1){if(r.hasAttributes())for(let g of r.getAttributeNames())if(g.endsWith(Ve)){let u=h[a++],x=r.getAttribute(g).split(H),f=/([.?@])?(.*)/.exec(u);l.push({type:1,index:i,name:f[2],strings:x,ctor:f[1]==="."?Ee:f[1]==="?"?Te:f[1]==="@"?Ae:J}),r.removeAttribute(g)}else g.startsWith(H)&&(l.push({type:6,index:i}),r.removeAttribute(g));if(Ke.test(r.tagName)){let g=r.textContent.split(H),u=g.length-1;if(u>0){r.textContent=ve?ve.emptyScript:"";for(let x=0;x<u;x++)r.append(g[x],se()),F.nextNode(),l.push({type:2,index:++i});r.append(g[u],se())}}}else if(r.nodeType===8)if(r.data===We)l.push({type:2,index:i});else{let g=-1;for(;(g=r.data.indexOf(H,g+1))!==-1;)l.push({type:7,index:i}),g+=H.length-1}i++}}static createElement(o,e){let t=q.createElement("template");return t.innerHTML=o,t}};function X(s,o,e=s,t){if(o===P)return o;let r=t!==void 0?e._$Co?.[t]:e._$Cl,i=ne(o)?void 0:o._$litDirective$;return r?.constructor!==i&&(r?._$AO?.(!1),i===void 0?r=void 0:(r=new i(s),r._$AT(s,e,t)),t!==void 0?(e._$Co??(e._$Co=[]))[t]=r:e._$Cl=r),r!==void 0&&(o=X(s,r._$AS(s,o.values),r,t)),o}var Se=class{constructor(o,e){this._$AV=[],this._$AN=void 0,this._$AD=o,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(o){let{el:{content:e},parts:t}=this._$AD,r=(o?.creationScope??q).importNode(e,!0);F.currentNode=r;let i=F.nextNode(),a=0,c=0,l=t[0];for(;l!==void 0;){if(a===l.index){let d;l.type===2?d=new ce(i,i.nextSibling,this,o):l.type===1?d=new l.ctor(i,l.name,l.strings,this,o):l.type===6&&(d=new Pe(i,this,o)),this._$AV.push(d),l=t[++c]}a!==l?.index&&(i=F.nextNode(),a++)}return F.currentNode=q,r}p(o){let e=0;for(let t of this._$AV)t!==void 0&&(t.strings!==void 0?(t._$AI(o,t,e),e+=t.strings.length-2):t._$AI(o[e])),e++}},ce=class s{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(o,e,t,r){this.type=2,this._$AH=_,this._$AN=void 0,this._$AA=o,this._$AB=e,this._$AM=t,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let o=this._$AA.parentNode,e=this._$AM;return e!==void 0&&o?.nodeType===11&&(o=e.parentNode),o}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(o,e=this){o=X(this,o,e),ne(o)?o===_||o==null||o===""?(this._$AH!==_&&this._$AR(),this._$AH=_):o!==this._$AH&&o!==P&&this._(o):o._$litType$!==void 0?this.$(o):o.nodeType!==void 0?this.T(o):Et(o)?this.k(o):this._(o)}O(o){return this._$AA.parentNode.insertBefore(o,this._$AB)}T(o){this._$AH!==o&&(this._$AR(),this._$AH=this.O(o))}_(o){this._$AH!==_&&ne(this._$AH)?this._$AA.nextSibling.data=o:this.T(q.createTextNode(o)),this._$AH=o}$(o){let{values:e,_$litType$:t}=o,r=typeof t=="number"?this._$AC(o):(t.el===void 0&&(t.el=le.createElement(Ye(t.h,t.h[0]),this.options)),t);if(this._$AH?._$AD===r)this._$AH.p(e);else{let i=new Se(r,this),a=i.u(this.options);i.p(e),this.T(a),this._$AH=i}}_$AC(o){let e=Ge.get(o.strings);return e===void 0&&Ge.set(o.strings,e=new le(o)),e}k(o){Me(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,t,r=0;for(let i of o)r===e.length?e.push(t=new s(this.O(se()),this.O(se()),this,this.options)):t=e[r],t._$AI(i),r++;r<e.length&&(this._$AR(t&&t._$AB.nextSibling,r),e.length=r)}_$AR(o=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);o!==this._$AB;){let t=Oe(o).nextSibling;Oe(o).remove(),o=t}}setConnected(o){this._$AM===void 0&&(this._$Cv=o,this._$AP?.(o))}},J=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(o,e,t,r,i){this.type=1,this._$AH=_,this._$AN=void 0,this.element=o,this.name=e,this._$AM=r,this.options=i,t.length>2||t[0]!==""||t[1]!==""?(this._$AH=Array(t.length-1).fill(new String),this.strings=t):this._$AH=_}_$AI(o,e=this,t,r){let i=this.strings,a=!1;if(i===void 0)o=X(this,o,e,0),a=!ne(o)||o!==this._$AH&&o!==P,a&&(this._$AH=o);else{let c=o,l,d;for(o=i[0],l=0;l<i.length-1;l++)d=X(this,c[t+l],e,l),d===P&&(d=this._$AH[l]),a||(a=!ne(d)||d!==this._$AH[l]),d===_?o=_:o!==_&&(o+=(d??"")+i[l+1]),this._$AH[l]=d}a&&!r&&this.j(o)}j(o){o===_?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,o??"")}},Ee=class extends J{constructor(){super(...arguments),this.type=3}j(o){this.element[this.name]=o===_?void 0:o}},Te=class extends J{constructor(){super(...arguments),this.type=4}j(o){this.element.toggleAttribute(this.name,!!o&&o!==_)}},Ae=class extends J{constructor(o,e,t,r,i){super(o,e,t,r,i),this.type=5}_$AI(o,e=this){if((o=X(this,o,e,0)??_)===P)return;let t=this._$AH,r=o===_&&t!==_||o.capture!==t.capture||o.once!==t.once||o.passive!==t.passive,i=o!==_&&(t===_||r);r&&this.element.removeEventListener(this.name,this,t),i&&this.element.addEventListener(this.name,this,o),this._$AH=o}handleEvent(o){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,o):this._$AH.handleEvent(o)}},Pe=class{constructor(o,e,t){this.element=o,this.type=6,this._$AN=void 0,this._$AM=e,this.options=t}get _$AU(){return this._$AM._$AU}_$AI(o){X(this,o)}};var At=ae.litHtmlPolyfillSupport;At?.(le,ce),(ae.litHtmlVersions??(ae.litHtmlVersions=[])).push("3.3.2");var Xe=(s,o,e)=>{let t=e?.renderBefore??o,r=t._$litPart$;if(r===void 0){let i=e?.renderBefore??null;t._$litPart$=r=new ce(o.insertBefore(se(),i),i,void 0,e??{})}return r._$AI(s),r};var de=globalThis,b=class extends A{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e;let o=super.createRenderRoot();return(e=this.renderOptions).renderBefore??(e.renderBefore=o.firstChild),o}update(o){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(o),this._$Do=Xe(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return P}};b._$litElement$=!0,b.finalized=!0,de.litElementHydrateSupport?.({LitElement:b});var Pt=de.litElementPolyfillSupport;Pt?.({LitElement:b});(de.litElementVersions??(de.litElementVersions=[])).push("4.2.2");var y=s=>(o,e)=>{e!==void 0?e.addInitializer(()=>{customElements.define(s,o)}):customElements.define(s,o)};var Mt={attribute:!0,type:String,converter:oe,reflect:!1,hasChanged:fe},Lt=(s=Mt,o,e)=>{let{kind:t,metadata:r}=e,i=globalThis.litPropertyMetadata.get(r);if(i===void 0&&globalThis.litPropertyMetadata.set(r,i=new Map),t==="setter"&&((s=Object.create(s)).wrapped=!0),i.set(e.name,s),t==="accessor"){let{name:a}=e;return{set(c){let l=o.get.call(this);o.set.call(this,c),this.requestUpdate(a,l,s,!0,c)},init(c){return c!==void 0&&this.C(a,void 0,s,c),c}}}if(t==="setter"){let{name:a}=e;return function(c){let l=this[a];o.call(this,c),this.requestUpdate(a,l,s,!0,c)}}throw Error("Unsupported decorator location: "+t)};function m(s){return(o,e)=>typeof e=="object"?Lt(s,o,e):((t,r,i)=>{let a=r.hasOwnProperty(i);return r.constructor.createProperty(i,t),a?Object.getOwnPropertyDescriptor(r,i):void 0})(s,o,e)}function w(s){return m({...s,state:!0,attribute:!1})}var Je=v`
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
`;function Qe(s,o){let e=o.states[s.entity];if(!e)return!1;let t=s.attribute!=null?e.attributes[s.attribute]:e.state,r=String(t??""),i=String(s.value),a=parseFloat(r),c=parseFloat(i),l=!isNaN(a)&&!isNaN(c);switch(s.operator){case"eq":return r===i;case"neq":return r!==i;case"lt":return l&&a<c;case"gt":return l&&a>c;case"lte":return l&&a<=c;case"gte":return l&&a>=c;case"contains":return r.includes(i);default:return!1}}function pe(s,o){let e={};for(let t of s){if(t.conditions.length===0)continue;(t.operator==="or"?t.conditions.some(i=>Qe(i,o)):t.conditions.every(i=>Qe(i,o)))&&(e={...e,...t.effect})}return e}function he(s){if(!s)return"\u2014";let o=Date.now()-new Date(s).getTime();if(o<0)return"\u2014";let e=Math.floor(o/6e4);if(e<1)return"< 1m";if(e<60)return`${e}m`;let t=Math.floor(e/60),r=e%60;if(t<24)return r>0?`${t}h ${r}m`:`${t}h`;let i=Math.floor(t/24),a=t%24;return a>0?`${i}d ${a}h`:`${i}d`}function He(s,o){let e=new Date(s);if(isNaN(e.getTime()))return"unknown";if(o==="absolute")return e.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit",hour12:!1});let t=Date.now()-e.getTime(),r=Math.floor(t/6e4);if(r<1)return"just now";if(r<60)return`${r} min ago`;let i=Math.floor(r/60);return i<24?`${i}h ago`:`${Math.floor(i/24)}d ago`}function G(s,o){if(o.battery_entity){let i=s.states[o.battery_entity];if(!i)return null;let a=parseFloat(i.state);return isNaN(a)?null:a}let e=s.states[o.entity];if(!e)return null;let t=e.attributes.battery_level;if(t==null)return null;let r=parseFloat(String(t));return isNaN(r)?null:r}function ge(s,o){if(o.connectivity_entity){let t=s.states[o.connectivity_entity];return t?t.state==="on"?"online":"offline":"unknown"}let e=s.states[o.entity];return e?e.state==="home"||e.state==="online"?"online":e.state==="not_home"||e.state==="offline"?"offline":"unknown":"unknown"}function xe(s,o,e){let t=s.states[e];if(!t||t.state==="unknown")return!0;for(let r of o){let i=G(s,r),a=r.battery_threshold??20;if(i!==null&&i<=a||ge(s,r)==="offline")return!0}return!1}function _e(s,o=20){return s<=o?"#f44336":s<50?"#ff9800":"#4caf50"}function et(s){if(s.eta_entity)return s;let o=s.devices?.find(e=>e.name==="__eta__");return o?{...s,eta_entity:o.entity,devices:s.devices?.filter(e=>e.name!=="__eta__")}:s}var z="person-card-theme-updated";function tt(s){(typeof window<"u"?window:globalThis).personCardTheme={zoneStyles:s},typeof window<"u"&&window.dispatchEvent(new CustomEvent(z))}function Ht(){return(typeof window<"u"?window:globalThis).personCardTheme}function S(s){let o=Ht()?.zoneStyles??[];if(s.length===0)return o;let e=new Map(o.map(t=>[t.zone,t]));return s.map(t=>{if(t.border_color&&t.background_color)return t;let r=e.get(t.zone);return r?{...r,...t,border_color:t.border_color??r.border_color,background_color:t.background_color??r.background_color}:t})}function rt(s){return s.toLowerCase().replace(/[\s-]+/g,"_").replace(/[^a-z0-9_]/g,"")}function E(s,o){let e=o.find(r=>r.zone===s);if(e)return e;let t=rt(s);return o.find(r=>rt(r.zone)===t)}function me(s,o,e=""){let t=E(s,o);return t?.label?t.label:s==="not_home"?e||"Away":s==="unknown"?"Unknown":s.replace(/_/g," ")}function we(s,o,e=!1){let t=E(s,o);return t?.icon?t.icon:s==="home"?"mdi:home":s==="not_home"?e?"mdi:map-marker":"mdi:map-marker-off":s==="unknown"?"mdi:help-circle":"mdi:map-marker"}function M(s,o){let e=s.replace("#",""),t=e.length===3?e.split("").map(c=>c+c).join(""):e,r=parseInt(t.slice(0,2),16),i=parseInt(t.slice(2,4),16),a=parseInt(t.slice(4,6),16);return isNaN(r)||isNaN(i)||isNaN(a)?`rgba(0, 0, 0, ${o})`:`rgba(${r}, ${i}, ${a}, ${o})`}var R=class extends b{constructor(){super(...arguments);this.zone="";this.zoneStyles=[];this.address=""}get zoneStyle(){return this.zoneStyles.find(e=>e.zone===this.zone)}get displayLabel(){let e=this.zoneStyle;return e?.label?e.label:this.zone==="not_home"?this.address||"Away":this.zone==="unknown"?"Unknown":this.zone.replace(/_/g," ")}get icon(){let e=this.zoneStyle;return e?.icon?e.icon:this.zone==="home"?"mdi:home":this.zone==="not_home"?this.address?"mdi:map-marker":"mdi:map-marker-off":this.zone==="unknown"?"mdi:help-circle":"mdi:map-marker"}render(){let e=this.displayLabel,t=this.zone==="not_home"&&!!this.address&&e.length>=20;return n`
      <ha-icon .icon=${this.icon}></ha-icon>
      ${t?n`
        <div class="label-ticker">
          <span class="ticker-inner">${e}&nbsp;&nbsp;&nbsp;&nbsp;${e}</span>
        </div>
      `:n`
        <span class="zone-label">${e}</span>
      `}
    `}};R.styles=v`
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
  `,p([m()],R.prototype,"zone",2),p([m({type:Array})],R.prototype,"zoneStyles",2),p([m()],R.prototype,"address",2),R=p([y("person-card-location-badge")],R);var N=class extends b{constructor(){super(...arguments);this.showLabels=!1}batteryColor(e){return _e(e,this.device.battery_threshold??20)}render(){if(!this.hass||!this.device)return n``;let e=G(this.hass,this.device),t=ge(this.hass,this.device),r=this.device.icon??"mdi:cellphone",i=this.device.name??this.device.entity.split(".")[1].replace(/_/g," ");return n`
      <ha-icon .icon=${r}></ha-icon>
      ${this.showLabels?n`<span class="name">${i}</span>`:""}
      ${e!==null?n`
        <div class="battery-bar-wrap">
          <div class="battery-bar-fill" style="width:${e}%;background:${this.batteryColor(e)}"></div>
        </div>
        <span class="battery-pct">${e}%</span>
      `:""}
      <div class="conn-dot ${t}"></div>
    `}};N.styles=v`
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
  `,p([m({attribute:!1})],N.prototype,"hass",2),p([m({type:Object})],N.prototype,"device",2),p([m({type:Boolean})],N.prototype,"showLabels",2),N=p([y("person-card-device-tile")],N);var ot={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},it=s=>(...o)=>({_$litDirective$:s,values:o}),$e=class{constructor(o){}get _$AU(){return this._$AM._$AU}_$AT(o,e,t){this._$Ct=o,this._$AM=e,this._$Ci=t}_$AS(o,e){return this.update(o,e)}update(o,e){return this.render(...e)}};var at="important",Rt=" !"+at,st=it(class extends $e{constructor(s){if(super(s),s.type!==ot.ATTRIBUTE||s.name!=="style"||s.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(s){return Object.keys(s).reduce((o,e)=>{let t=s[e];return t==null?o:o+`${e=e.includes("-")?e:e.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${t};`},"")}update(s,[o]){let{style:e}=s.element;if(this.ft===void 0)return this.ft=new Set(Object.keys(o)),this.render(o);for(let t of this.ft)o[t]==null&&(this.ft.delete(t),t.includes("-")?e.removeProperty(t):e[t]=null);for(let t in o){let r=o[t];if(r!=null){this.ft.add(t);let i=typeof r=="string"&&r.endsWith(Rt);t.includes("-")||i?e.setProperty(t,i?r.slice(0,-11):r,i?at:""):e[t]=r}}return P}});var V=class extends b{constructor(){super(...arguments);this.color="#f44336";this.icon="mdi:alert-circle"}render(){return n`
      <div class="badge" style=${st({"--badge-bg":this.color})}>
        <ha-icon .icon=${this.icon} style="color:#fff;--mdc-icon-size:14px"></ha-icon>
      </div>
    `}};V.styles=v`
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
  `,p([m()],V.prototype,"color",2),p([m()],V.prototype,"icon",2),V=p([y("person-card-notification-badge")],V);var I=class extends b{constructor(){super(...arguments);this.etaEntity="";this.personZone=""}render(){if(!this.etaEntity||this.personZone==="home")return n``;let e=this.hass.states[this.etaEntity];if(!e)return n``;let t=parseFloat(e.state);if(isNaN(t))return n``;let r=t<1?"arriving":`${Math.round(t)} min`;return n`
      <ha-icon .icon=${"mdi:clock-outline"}></ha-icon>
      <span>ETA home: ${r}</span>
    `}};I.styles=v`
    :host { display: flex; align-items: center; gap: 6px; font-size: 0.8rem; color: rgba(255,255,255,0.65); }
    ha-icon { --mdc-icon-size: 14px; }
  `,p([m({attribute:!1})],I.prototype,"hass",2),p([m()],I.prototype,"etaEntity",2),p([m()],I.prototype,"personZone",2),I=p([y("person-card-eta-display")],I);var D=class extends b{constructor(){super(...arguments);this.lastUpdated="";this.format="relative";this._tick=0}connectedCallback(){super.connectedCallback(),this.format==="relative"&&(this._interval=setInterval(()=>{this._tick++},6e4))}disconnectedCallback(){super.disconnectedCallback(),this._interval&&clearInterval(this._interval)}updated(e){e.has("format")&&(this._interval&&clearInterval(this._interval),this._interval=void 0,this.format==="relative"&&(this._interval=setInterval(()=>{this._tick++},6e4)))}render(){if(!this.lastUpdated)return n``;this._tick;let e=He(this.lastUpdated,this.format);return n`
      <ha-icon icon="mdi:clock-check-outline"></ha-icon>
      <span>Last seen: ${e}</span>
    `}};D.styles=v`
    :host { display: flex; align-items: center; gap: 6px; font-size: 0.78rem; color: rgba(255,255,255,0.45); }
    ha-icon { --mdc-icon-size: 13px; }
  `,p([m()],D.prototype,"lastUpdated",2),p([m()],D.prototype,"format",2),p([w()],D.prototype,"_tick",2),D=p([y("person-card-last-seen")],D);var T=[{name:"Midnight",bg:"#1c1c2e",border:"#4fc3f7"},{name:"Forest Walk",bg:"#1b2e1b",border:"#76c442"},{name:"Lava Flow",bg:"#2e1b1b",border:"#ff6d00"},{name:"Arctic Drift",bg:"#1a2332",border:"#80deea"},{name:"Twilight",bg:"#2e1b3c",border:"#ce93d8"},{name:"Emerald City",bg:"#1b2e28",border:"#ffd700"},{name:"Rose Gold",bg:"#2e1c24",border:"#f48fb1"},{name:"Neon Tokyo",bg:"#120d1f",border:"#e040fb"},{name:"Desert Night",bg:"#2e2416",border:"#ffb300"},{name:"Northern Lights",bg:"#0d1f1a",border:"#69f0ae"}];var W=class extends b{constructor(){super(...arguments);this.zoneStyles=[]}_fire(e){this.dispatchEvent(new CustomEvent("zone-styles-changed",{detail:{zoneStyles:e},bubbles:!0,composed:!0}))}_update(e,t){let r=[...this.zoneStyles];r[e]={...r[e],...t},this._fire(r)}_remove(e){let t=[...this.zoneStyles];t.splice(e,1),this._fire(t)}_add(){this._fire([...this.zoneStyles,{zone:""}])}_autoDetect(){if(!this.hass)return;let e=new Map(this.zoneStyles.map((a,c)=>[a.zone,c])),t=[...this.zoneStyles],r=0;t=t.map((a,c)=>{if(!a.border_color){let l=T[(c+r)%T.length];return r++,{...a,background_color:a.background_color??l.bg,border_color:l.border}}return a});let i=Object.entries(this.hass.states).filter(([a])=>a.startsWith("zone.")).map(([a,c])=>{let l=c.attributes.friendly_name??a.replace("zone.","");return{zone:a==="zone.home"?"home":l,label:l,icon:c.attributes.icon??"mdi:map-marker"}}).filter(a=>!e.has(a.zone));if(i.length>0){let a=t.length,c=i.map((l,d)=>{let h=T[(a+d)%T.length];return{...l,background_color:h.bg,border_color:h.border}});t=[...t,...c]}this._fire(t)}render(){return n`
      <button class="add-btn" style="margin-bottom:8px" @click=${()=>this._autoDetect()}>
        <ha-icon .icon=${"mdi:magnify"}></ha-icon> Auto-detect zones from HA
      </button>
      ${this.zoneStyles.map((e,t)=>n`
        <div class="zone-block">
          <div class="zone-row">
            <ha-textfield
              .value=${e.zone}
              label="Zone name"
              @input=${r=>this._update(t,{zone:r.target.value})}
            ></ha-textfield>
            <ha-textfield
              .value=${e.label??""}
              label="Display label"
              @input=${r=>this._update(t,{label:r.target.value||void 0})}
            ></ha-textfield>
            <div style="flex:1;min-width:0">
              <ha-icon-picker
                .value=${e.icon??""}
                label="Icon"
                @value-changed=${r=>this._update(t,{icon:r.detail.value||void 0})}
              ></ha-icon-picker>
            </div>
            <button class="delete-btn" @click=${()=>this._remove(t)}>
              <ha-icon .icon=${"mdi:delete"}></ha-icon>
            </button>
          </div>
          <div class="scheme-row">
            ${T.map(r=>n`
              <div class="scheme-swatch"
                title=${r.name}
                style="background:${r.bg};border:3px solid ${r.border}"
                @click=${()=>this._update(t,{background_color:r.bg,border_color:r.border})}
              ></div>
            `)}
            <div class="scheme-divider"></div>
            <div class="color-row">
              <label style="font-size:0.75rem">BG</label>
              <input type="color" .value=${e.background_color??"#1c1c2e"}
                @input=${r=>this._update(t,{background_color:r.target.value})} />
            </div>
            <div class="color-row">
              <label style="font-size:0.75rem">Border</label>
              <input type="color" .value=${e.border_color??"#ffffff"}
                @input=${r=>this._update(t,{border_color:r.target.value})} />
            </div>
          </div>
        </div>
      `)}
      <button class="add-btn" @click=${()=>this._add()}>
        <ha-icon .icon=${"mdi:plus-circle"}></ha-icon> Add Zone Style
      </button>
    `}};W.styles=v`
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
  `,p([m({attribute:!1})],W.prototype,"hass",2),p([m({type:Array})],W.prototype,"zoneStyles",2),W=p([y("person-card-zone-editor")],W);var Nt=[{value:"default",label:"Default",icon:"mdi:palette-outline"},{value:"glass",label:"Glass",icon:"mdi:blur"},{value:"scifi",label:"Sci-Fi",icon:"mdi:chip"},{value:"steampunk",label:"Steampunk",icon:"mdi:cog-outline"},{value:"terminal",label:"Terminal",icon:"mdi:console"},{value:"neon",label:"Neon",icon:"mdi:led-on"}],U=class extends b{constructor(){super(...arguments);this._activeTab="person"}setConfig(e){this._config=e}_fire(e){this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e},bubbles:!0,composed:!0})),this._config=e}_set(e){this._fire({...this._config,...e})}_renderPersonTab(){return n`
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
      ${e.map((t,r)=>n`
        <div class="device-block">
          <div class="device-header-row">
            <span class="device-label">Device entity</span>
            <button class="delete-btn" @click=${()=>this._removeDevice(r)}>
              <ha-icon .icon=${"mdi:delete"}></ha-icon>
            </button>
          </div>
          <ha-entity-picker
            .hass=${this.hass}
            .value=${t.entity}
            @value-changed=${i=>this._updateDevice(r,{entity:i.detail.value})}
          ></ha-entity-picker>
          <div class="device-row" style="margin-top:6px">
            <ha-textfield
              .value=${t.name??""}
              label="Name"
              @input=${i=>this._updateDevice(r,{name:i.target.value||void 0})}
            ></ha-textfield>
            <div style="flex:1;min-width:0">
              <ha-icon-picker
                .value=${t.icon??""}
                label="Icon"
                @value-changed=${i=>this._updateDevice(r,{icon:i.detail.value||void 0})}
              ></ha-icon-picker>
            </div>
          </div>
          <div style="margin-top:4px;opacity:0.75">
            <ha-entity-picker
              .hass=${this.hass}
              .value=${t.battery_entity??""}
              label="Battery entity (optional)"
              @value-changed=${i=>this._updateDevice(r,{battery_entity:i.detail.value||void 0})}
            ></ha-entity-picker>
            <ha-entity-picker
              .hass=${this.hass}
              .value=${t.connectivity_entity??""}
              label="Connectivity entity (optional)"
              style="margin-top:4px"
              @value-changed=${i=>this._updateDevice(r,{connectivity_entity:i.detail.value||void 0})}
            ></ha-entity-picker>
          </div>
          <div class="device-row" style="margin-top:4px;opacity:0.8">
            <ha-textfield
              .value=${String(t.battery_threshold??"")}
              label="Battery alert threshold % (default 20)"
              type="number"
              min="0"
              max="100"
              @input=${i=>this._updateDevice(r,{battery_threshold:parseInt(i.target.value)||void 0})}
            ></ha-textfield>
          </div>
        </div>
      `)}
      <button class="add-btn" @click=${()=>this._addDevice()}>
        <ha-icon .icon=${"mdi:plus-circle"}></ha-icon> Add Device
      </button>
    `}_updateDevice(e,t){let r=[...this._config.devices??[]];r[e]={...r[e],...t},this._set({devices:r})}_removeDevice(e){let t=[...this._config.devices??[]];t.splice(e,1),this._set({devices:t})}_addDevice(){let e=[...this._config.devices??[],{entity:""}];this._set({devices:e})}_renderAppearanceTab(){return n`
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
      ${e.map((t,r)=>this._renderRule(t,r))}
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
            @input=${r=>this._updateRule(t,{label:r.target.value||void 0})}
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

        ${e.conditions.map((r,i)=>n`
          <ha-entity-picker .hass=${this.hass} .value=${r.entity} label="Entity"
            style="display:block;width:100%;margin-bottom:4px"
            @value-changed=${a=>this._updateCondition(t,i,{entity:a.detail.value})}
          ></ha-entity-picker>
          <div class="condition-row">
            <ha-textfield .value=${r.attribute??""} label="Attribute (opt.)"
              @input=${a=>this._updateCondition(t,i,{attribute:a.target.value||void 0})}
            ></ha-textfield>
            <select @change=${a=>this._updateCondition(t,i,{operator:a.target.value})}
              style="padding:6px;border-radius:6px;border:1px solid var(--divider-color)">
              ${["eq","neq","lt","gt","lte","gte","contains"].map(a=>n`
                <option value=${a} ?selected=${r.operator===a}>${a}</option>
              `)}
            </select>
            <ha-textfield .value=${String(r.value)} label="Value"
              @input=${a=>{let c=a.target.value,l=["lt","gt","lte","gte"],d=parseFloat(c),h=l.includes(r.operator)&&!isNaN(d)?d:c;this._updateCondition(t,i,{value:h})}}
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
          ${T.map(r=>n`
            <div class="scheme-swatch"
              title=${r.name}
              style="background:${r.bg};border:3px solid ${r.border}"
              @click=${()=>this._updateEffect(t,{background_color:r.bg,border_color:r.border})}
            ></div>
          `)}
        </div>
        <div class="condition-row" style="flex-wrap:wrap;gap:6px">
          <div class="color-row"><label>Background</label>
            <input type="color" .value=${e.effect.background_color??"#1c1c2e"}
              @input=${r=>this._updateEffect(t,{background_color:r.target.value})} />
          </div>
          <div class="color-row"><label>Border</label>
            <input type="color" .value=${e.effect.border_color??"#ffffff"}
              @input=${r=>this._updateEffect(t,{border_color:r.target.value})} />
          </div>
          <ha-textfield .value=${String(e.effect.border_width??"")} label="Border width (px)"
            type="number" style="width:120px"
            @input=${r=>this._updateEffect(t,{border_width:parseInt(r.target.value)||void 0})}
          ></ha-textfield>
          <div class="color-row"><label>Badge color</label>
            <input type="color" .value=${e.effect.badge_color??"#f44336"}
              @input=${r=>this._updateEffect(t,{badge_color:r.target.value})} />
          </div>
          <ha-icon-picker .value=${e.effect.badge_icon??""} label="Badge icon"
            @value-changed=${r=>this._updateEffect(t,{badge_icon:r.detail.value||void 0})}
          ></ha-icon-picker>
        </div>
      </div>
    `}_updateRule(e,t){let r=[...this._config.conditions??[]];r[e]={...r[e],...t},this._set({conditions:r})}_removeRule(e){let t=[...this._config.conditions??[]];t.splice(e,1),this._set({conditions:t})}_addRule(){let e={id:crypto.randomUUID(),operator:"and",conditions:[{entity:"",operator:"eq",value:""}],effect:{}};this._set({conditions:[...this._config.conditions??[],e]})}_updateCondition(e,t,r){let i=[...this._config.conditions??[]],a=[...i[e].conditions];a[t]={...a[t],...r},i[e]={...i[e],conditions:a},this._set({conditions:i})}_removeCondition(e,t){let r=[...this._config.conditions??[]],i=[...r[e].conditions];i.splice(t,1),r[e]={...r[e],conditions:i},this._set({conditions:r})}_addCondition(e){let t=[...this._config.conditions??[]];t[e]={...t[e],conditions:[...t[e].conditions,{entity:"",operator:"eq",value:""}]},this._set({conditions:t})}_updateEffect(e,t){let r=[...this._config.conditions??[]];r[e]={...r[e],effect:{...r[e].effect,...t}},this._set({conditions:r})}_renderThemePicker(){let e=this._config.card_theme??"default";return n`
      <div class="row">
        <label>Card Theme</label>
        <div class="theme-grid">
          ${Nt.map(t=>n`
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
    `}};U.styles=v`
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
  `,p([m({attribute:!1})],U.prototype,"hass",2),p([w()],U.prototype,"_config",2),p([w()],U.prototype,"_activeTab",2),U=p([y("person-card-editor")],U);var nt=v`
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
`;var It=[{value:"legend",label:"Legend",description:"Coloured dots with labels in a wrapping row (default)"},{value:"compact",label:"Compact",description:"Smaller dots and tighter spacing"},{value:"pills",label:"Pills",description:"Filled pill/badge tags using zone colours"},{value:"list",label:"List",description:"Vertical list with swatch, icon, and label"},{value:"grid",label:"Grid",description:"Zone icon tiles in a responsive grid"},{value:"hidden",label:"Hidden",description:"Invisible \u2014 provides theme with no visual footprint"}],Dt={legend:"mdi:dots-horizontal",compact:"mdi:minus",pills:"mdi:label-multiple",list:"mdi:format-list-bulleted",grid:"mdi:view-grid",hidden:"mdi:eye-off"},Q=class extends b{setConfig(o){this._config=o}_fire(o){this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:o},bubbles:!0,composed:!0})),this._config=o}_set(o){this._fire({...this._config,...o})}render(){if(!this._config)return n``;let o=this._config.display_style??"legend";return n`
      <div class="row">
        <label>Display Style</label>
        <div class="style-grid">
          ${It.map(e=>n`
            <button
              class="style-btn ${o===e.value?"active":""}"
              @click=${()=>this._set({display_style:e.value})}
              title=${e.description}
            >
              <ha-icon class="style-icon" .icon=${Dt[e.value]}></ha-icon>
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
    `}};Q.styles=v`
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
  `,p([m({attribute:!1})],Q.prototype,"hass",2),Q=p([y("person-card-theme-editor")],Q);window.customCards=window.customCards??[];window.customCards.push({type:"person-card-theme",name:"Person Card Theme",description:"Shared zone colour scheme for Person Card and Family Card.",preview:!1});var Ut={legend:"Zone Legend",compact:"Zone Legend",pills:"Zone Legend",list:"Zone Legend",grid:"Zone Legend",hidden:""},ee=class extends b{static getConfigElement(){return document.createElement("person-card-theme-editor")}static getStubConfig(){return{zone_styles:[],display_style:"legend"}}setConfig(o){this._config={...o,zone_styles:o.zone_styles??[]},tt(this._config.zone_styles),this.classList.toggle("style-hidden",this._config.display_style==="hidden")}getCardSize(){return this._config?.display_style==="hidden"?0:1}_renderLegend(o){return n`
      <div class="legend-items">
        ${o.map(e=>n`
          <div class="legend-item">
            <div class="legend-dot"
              style="background:${e.border_color??"rgba(255,255,255,0.4)"};
                     box-shadow:0 0 4px ${e.border_color??"transparent"}66">
            </div>
            <span class="legend-label">${e.label??e.zone}</span>
          </div>
        `)}
      </div>
    `}_renderCompact(o){return n`
      <div class="compact-items">
        ${o.map(e=>n`
          <div class="compact-item">
            <div class="compact-dot"
              style="background:${e.border_color??"rgba(255,255,255,0.4)"}">
            </div>
            <span class="compact-label">${e.label??e.zone}</span>
          </div>
        `)}
      </div>
    `}_renderPills(o){return n`
      <div class="pills-items">
        ${o.map(e=>{let t=e.background_color??"rgba(255,255,255,0.08)",r=e.border_color??"rgba(255,255,255,0.2)";return n`
            <div class="pill" style="background:${t};border-color:${r}">
              <div class="pill-dot" style="background:${r}"></div>
              <span>${e.label??e.zone}</span>
            </div>
          `})}
      </div>
    `}_renderList(o){return n`
      <div class="list-items">
        ${o.map(e=>n`
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
    `}_renderGrid(o){return n`
      <div class="grid-items">
        ${o.map(e=>{let t=e.background_color??"rgba(255,255,255,0.06)",r=e.border_color??"rgba(255,255,255,0.2)";return n`
            <div class="grid-item" style="background:${t};border-color:${r}">
              <ha-icon class="grid-icon"
                .icon=${e.icon??"mdi:map-marker"}
                style="color:${r}">
              </ha-icon>
              <span class="grid-label">${e.label??e.zone}</span>
            </div>
          `})}
      </div>
    `}render(){let o=this._config?.display_style??"legend";if(o==="hidden")return n``;let e=this._config?.zone_styles??[],t=Ut[o],r=n`
      <div class="section-title">${t}</div>
      <div style="color:rgba(255,255,255,0.3);font-size:0.78rem">No zones configured</div>
    `;if(e.length===0)return r;let i=o==="compact"?this._renderCompact(e):o==="pills"?this._renderPills(e):o==="list"?this._renderList(e):o==="grid"?this._renderGrid(e):this._renderLegend(e);return n`
      <div class="section-title">${t}</div>
      ${i}
    `}};ee.styles=nt,p([m({attribute:!1})],ee.prototype,"hass",2),ee=p([y("person-card-theme")],ee);var lt=v`
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
`;function Ot(s,o){let e=s.states[o];if(!e)return[];let t=e.attributes.entity_id;return Array.isArray(t)?t:[]}function ct(s,o){return o.people&&o.people.length>0?o.people:o.group_entity?Ot(s,o.group_entity).map(e=>({entity:e})):[]}var Zt=[{value:"default",label:"Default",icon:"mdi:palette-outline"},{value:"glass",label:"Glass",icon:"mdi:blur"},{value:"scifi",label:"Sci-Fi",icon:"mdi:chip"},{value:"steampunk",label:"Steampunk",icon:"mdi:cog-outline"},{value:"terminal",label:"Terminal",icon:"mdi:console"},{value:"neon",label:"Neon",icon:"mdi:led-on"}],O=class extends b{constructor(){super(...arguments);this._activeTab="people"}setConfig(e){this._config=e}_fire(e){this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e},bubbles:!0,composed:!0})),this._config=e}_set(e){this._fire({...this._config,...e})}_renderPeopleTab(){let e=this._config.people??[];return n`
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
        ${e.map((t,r)=>n`
          <div class="person-block">
            <div class="person-header">
              <span class="person-label">Person entity</span>
              <button class="delete-btn" @click=${()=>{let i=[...e];i.splice(r,1),this._set({people:i})}}><ha-icon .icon=${"mdi:delete"}></ha-icon></button>
            </div>
            <div>
              <ha-entity-picker
                .hass=${this.hass}
                .value=${t.entity??""}
                .includeDomains=${["person"]}
                @value-changed=${i=>{let a=[...e];a[r]={...a[r],entity:i.detail.value},this._set({people:a})}}
              ></ha-entity-picker>
            </div>
            <div class="detail-row">
              <ha-textfield
                .value=${t.name??""}
                label="Display name (optional)"
                @input=${i=>{let a=[...e];a[r]={...a[r],name:i.target.value||void 0},this._set({people:a})}}
              ></ha-textfield>
            </div>
            <div class="detail-row">
              <div>
                <ha-entity-picker
                  .hass=${this.hass}
                  .value=${t.eta_entity??""}
                  .includeDomains=${["sensor"]}
                  label="ETA travel time sensor (optional)"
                  @value-changed=${i=>{let a=[...e];a[r]={...a[r],eta_entity:i.detail.value||void 0},this._set({people:a})}}
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
      ${e.map((t,r)=>n`
        <div class="rule-block">
          <div class="rule-header">
            <ha-textfield .value=${t.label??""} label="Rule label" style="flex:1"
              @input=${i=>{let a=[...e];a[r]={...a[r],label:i.target.value||void 0},this._set({conditions:a})}}></ha-textfield>
            <div class="segment-control">
              <button class="segment-btn ${t.operator==="and"?"active":""}"
                @click=${()=>{let i=[...e];i[r]={...i[r],operator:"and"},this._set({conditions:i})}}>AND</button>
              <button class="segment-btn ${t.operator==="or"?"active":""}"
                @click=${()=>{let i=[...e];i[r]={...i[r],operator:"or"},this._set({conditions:i})}}>OR</button>
            </div>
            <button class="delete-btn" @click=${()=>{let i=[...e];i.splice(r,1),this._set({conditions:i})}}>
              <ha-icon .icon=${"mdi:delete"}></ha-icon>
            </button>
          </div>
          ${t.conditions.map((i,a)=>n`
            <div style="margin-bottom:4px">
              <ha-entity-picker .hass=${this.hass} .value=${i.entity??""} label="Entity"
                style="display:block;width:100%"
                @value-changed=${c=>{let l=[...e],d=[...l[r].conditions];d[a]={...d[a],entity:c.detail.value},l[r]={...l[r],conditions:d},this._set({conditions:l})}}></ha-entity-picker>
            </div>
            <div class="condition-row">
              <ha-textfield .value=${i.attribute??""} label="Attribute (opt.)"
                @input=${c=>{let l=[...e],d=[...l[r].conditions];d[a]={...d[a],attribute:c.target.value||void 0},l[r]={...l[r],conditions:d},this._set({conditions:l})}}></ha-textfield>
              <select @change=${c=>{let l=[...e],d=[...l[r].conditions];d[a]={...d[a],operator:c.target.value},l[r]={...l[r],conditions:d},this._set({conditions:l})}} style="padding:6px;border-radius:6px;border:1px solid var(--divider-color)">
                ${["eq","neq","lt","gt","lte","gte","contains"].map(c=>n`
                  <option value=${c} ?selected=${i.operator===c}>${c}</option>
                `)}
              </select>
              <ha-textfield .value=${String(i.value)} label="Value"
                @input=${c=>{let l=[...e],d=[...l[r].conditions],h=c.target.value,g=["lt","gt","lte","gte"],u=parseFloat(h);d[a]={...d[a],value:g.includes(i.operator)&&!isNaN(u)?u:h},l[r]={...l[r],conditions:d},this._set({conditions:l})}}></ha-textfield>
              <button class="delete-btn" @click=${()=>{let c=[...e],l=[...c[r].conditions];l.splice(a,1),c[r]={...c[r],conditions:l},this._set({conditions:c})}}><ha-icon .icon=${"mdi:close"}></ha-icon></button>
            </div>
          `)}
          <button class="add-btn" @click=${()=>{let i=[...e];i[r]={...i[r],conditions:[...i[r].conditions,{entity:"",operator:"eq",value:""}]},this._set({conditions:i})}}><ha-icon .icon=${"mdi:plus"}></ha-icon> Add Condition</button>
          <div style="margin-top:10px;font-size:0.8rem;font-weight:600;color:var(--secondary-text-color)">Effect</div>
          <div class="scheme-row" style="margin-bottom:6px">
            ${T.map(i=>n`
              <div class="scheme-swatch" title=${i.name} style="background:${i.bg};border:3px solid ${i.border}"
                @click=${()=>{let a=[...e];a[r]={...a[r],effect:{...a[r].effect,background_color:i.bg,border_color:i.border}},this._set({conditions:a})}}></div>
            `)}
          </div>
          <div style="display:flex;gap:8px;flex-wrap:wrap">
            <div class="color-row"><label>Background</label>
              <input type="color" .value=${t.effect.background_color??"#1c1c2e"}
                @input=${i=>{let a=[...e];a[r]={...a[r],effect:{...a[r].effect,background_color:i.target.value}},this._set({conditions:a})}} /></div>
            <div class="color-row"><label>Border</label>
              <input type="color" .value=${t.effect.border_color??"#ffffff"}
                @input=${i=>{let a=[...e];a[r]={...a[r],effect:{...a[r].effect,border_color:i.target.value}},this._set({conditions:a})}} /></div>
          </div>
        </div>
      `)}
      <button class="add-btn" @click=${()=>{let t={id:crypto.randomUUID(),operator:"and",conditions:[{entity:"",operator:"eq",value:""}],effect:{}};this._set({conditions:[...e,t]})}}><ha-icon .icon=${"mdi:plus-circle"}></ha-icon> Add Rule</button>
    `}_renderThemePicker(){let e=this._config.card_theme??"default";return n`
      <div class="row">
        <label>Card Theme</label>
        <div class="theme-grid">
          ${Zt.map(t=>n`
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
    `}};O.styles=v`
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
  `,p([m({attribute:!1})],O.prototype,"hass",2),p([w()],O.prototype,"_config",2),p([w()],O.prototype,"_activeTab",2),O=p([y("family-card-editor")],O);window.customCards=window.customCards??[];window.customCards.push({type:"family-card",name:"Family Card",description:"At-a-glance status overview for multiple people.",preview:!0});var Z=class extends b{constructor(){super(...arguments);this._expandedEntity=null;this._onThemeUpdated=()=>{this.requestUpdate()}}static getStubConfig(e){return{people:e?Object.keys(e.states).filter(r=>r.startsWith("person.")).slice(0,6).map(r=>({entity:r})):[],density:"detailed",show_devices:!0,show_last_seen:!0,show_notification_badge:!0}}static getConfigElement(){return document.createElement("family-card-editor")}setConfig(e){this._config={density:"detailed",show_devices:!0,show_last_seen:!0,show_eta:!0,show_notification_badge:!0,zone_styles:[],conditions:[],...e},this.setAttribute("density",this._config.density??"detailed")}getCardSize(){return 4}connectedCallback(){super.connectedCallback(),window.addEventListener(z,this._onThemeUpdated)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener(z,this._onThemeUpdated)}updated(){if(!this._config||!this.hass)return;let e=this._config.conditions?.length?pe(this._config.conditions,this.hass):{},t=e.background_color;t?this.style.setProperty("--pc-background",t):this.style.removeProperty("--pc-background");let r=e.border_color;r?(this.style.setProperty("--pc-border-color",r),this.style.setProperty("--pc-border-width",`${e.border_width??2}px`),this.style.setProperty("--pc-glow-color",M(r,.25))):(this.style.removeProperty("--pc-border-color"),this.style.removeProperty("--pc-border-width"),this.style.removeProperty("--pc-glow-color")),this._config.background_image?this.style.setProperty("--pc-background-image",`url('${this._config.background_image}')`):this.style.removeProperty("--pc-background-image"),this.setAttribute("card-theme",this._config.card_theme??"default")}_zoneStyles(){return S(this._config.zone_styles??[])}_getPersonName(e){return e.name?e.name:this.hass.states[e.entity]?.attributes?.friendly_name??e.entity.split(".")[1].replace(/_/g," ")}_getPersonPhoto(e){return e.photo?e.photo:this.hass.states[e.entity]?.attributes?.entity_picture}_getPersonZone(e){return this.hass.states[e.entity]?.state??"unknown"}_isPersonStale(e){let t=e.offline_threshold??this._config.offline_threshold;if(!t||t<=0)return!1;let r=this.hass.states[e.entity]?.last_updated;return r?(Date.now()-new Date(r).getTime())/6e4>t:!1}_personShowsBadge(e){return this._config.show_notification_badge===!1||e.show_notification_badge===!1?!1:xe(this.hass,e.devices??[],e.entity)}_renderAvatar(e,t){let r=this._getPersonPhoto(e),i=this._getPersonName(e);return r?n`<img class="avatar ${t?"stale":""}" src=${r} alt=${i} />`:n`<div class="avatar-placeholder ${t?"stale":""}"><ha-icon icon="mdi:account"></ha-icon></div>`}_renderCompactRow(e){let t=this._getPersonZone(e),r=this._zoneStyles(),i=E(t,r),a=this._isPersonStale(e),c=this._personShowsBadge(e),l=e.devices??[],d=l.map(u=>G(this.hass,u)).filter(u=>u!==null),h=d.length>0?Math.min(...d):null,g=h!==null&&h<=(l[0]?.battery_threshold??20)?"#f44336":h!==null&&h<50?"#ff9800":"#4caf50";return n`
      <div class="person-row" style="--row-accent:${i?.border_color??"rgba(255,255,255,0.1)"}">
        <div class="person-row-inner">
          ${this._renderAvatar(e,a)}
          <div class="person-info">
            <div class="person-name">${this._getPersonName(e)}</div>
            <div class="person-zone">
              <person-card-location-badge
                .zone=${t}
                .zoneStyles=${r}
              ></person-card-location-badge>
            </div>
          </div>
          <div class="person-row-meta">
            ${h!==null?n`<div class="status-dot" style="background:${g}"></div>`:""}
            ${c?n`<person-card-notification-badge color="#f44336" icon="mdi:alert-circle"></person-card-notification-badge>`:""}
          </div>
        </div>
      </div>
    `}_renderMiniRow(e){let t=this._getPersonZone(e),r=this._zoneStyles(),i=E(t,r),a=this._isPersonStale(e),c=this._personShowsBadge(e),l=e.devices??[];return n`
      <div class="person-row" style="--row-accent:${i?.border_color??"rgba(255,255,255,0.1)"}">
        <div class="person-row-inner">
          ${this._renderAvatar(e,a)}
          <div class="person-info">
            <div class="person-name">${this._getPersonName(e)}</div>
            <div class="person-zone">
              <person-card-location-badge .zone=${t} .zoneStyles=${r}></person-card-location-badge>
            </div>
          </div>
          <div class="person-row-meta">
            ${l.slice(0,3).map(d=>{let h=G(this.hass,d),g=d.battery_threshold??20,u=h!==null?h<=g?"#f44336":h<50?"#ff9800":"#4caf50":"#888";return n`
                <div class="device-summary">
                  <ha-icon .icon=${d.icon??"mdi:devices"} style="--mdc-icon-size:14px;color:rgba(255,255,255,0.5)"></ha-icon>
                  ${h!==null?n`<span class="device-summary-pct" style="color:${u}">${Math.round(h)}%</span>`:""}
                  <div class="status-dot" style="background:${ge(this.hass,d)==="online"?"#4caf50":"#f44336"}"></div>
                </div>
              `})}
            ${c?n`<person-card-notification-badge color="#f44336" icon="mdi:alert-circle"></person-card-notification-badge>`:""}
          </div>
        </div>
      </div>
    `}_getZoneGroups(e){let t=new Map;for(let r of e){let i=this._getPersonZone(r);t.has(i)||t.set(i,[]),t.get(i).push(r)}return Array.from(t.entries()).sort(([r,i],[a,c])=>{let l=r.toLowerCase().replace(/\s+/g,"_"),d=a.toLowerCase().replace(/\s+/g,"_");return l==="home"?-1:d==="home"?1:c.length-i.length}).map(([r,i])=>({zone:r,people:i}))}_renderSummary(e){let t=this._zoneStyles(),r=new Map;for(let a of e){let c=this._getPersonZone(a);r.set(c,(r.get(c)??0)+1)}let i=Array.from(r.entries()).sort(([a],[c])=>{let l=a.toLowerCase().replace(/\s+/g,"_"),d=c.toLowerCase().replace(/\s+/g,"_");return l==="home"?-1:d==="home"?1:r.get(c)-r.get(a)});return n`
      <div class="summary-bar">
        ${i.map(([a,c])=>{let d=E(a,t)?.border_color??"rgba(255,255,255,0.3)",h=me(a,t);return n`
            <div class="summary-item">
              <div class="summary-dot"
                style="background:${d};box-shadow:0 0 5px ${d}88">
              </div>
              <span class="summary-count">${c}</span>
              <span class="summary-label">${h}</span>
            </div>
          `})}
      </div>
    `}_renderZoneGroup(e,t,r){let i=this._zoneStyles(),c=E(e,i)?.border_color??"rgba(255,255,255,0.2)",l=we(e,i),d=me(e,i),h=r==="mini";return n`
      <div class="zone-group">
        <div class="zone-group-header" style="--group-accent:${c}">
          <ha-icon class="group-icon" .icon=${l} style="color:${c}"></ha-icon>
          <span class="group-label">${d}</span>
          <span class="group-count">${t.length}</span>
        </div>
        <div class="person-rows ${h?"mini-grid":""}">
          ${t.map(g=>this._renderRow(g,r))}
        </div>
      </div>
    `}_renderRow(e,t){return t==="compact"?this._renderCompactRow(e):t==="mini"?this._renderMiniRow(e):this._renderDetailedRow(e)}render(){if(!this._config||!this.hass)return n``;let e=ct(this.hass,this._config),t=this._config.density??"detailed",r=this._config.group_by_zone??!1,i=this._config.show_summary??!1,c=r?n`${this._getZoneGroups(e).map(({zone:l,people:d})=>this._renderZoneGroup(l,d,t))}`:n`
          <div class="person-rows ${t==="mini"?"mini-grid":""}">
            ${e.map(l=>this._renderRow(l,t))}
          </div>
        `;return n`
      <div class="card-content">
        ${this._config.background_image?n`<div class="card-background"></div>`:""}
        ${i?this._renderSummary(e):""}
        ${c}
      </div>
    `}_renderDetailedRow(e){let t=this._getPersonZone(e),r=this._zoneStyles(),i=E(t,r),a=this._isPersonStale(e),c=this._personShowsBadge(e),l=e.devices??[],d=this._expandedEntity===e.entity,h=this.hass.states[e.entity],g=h?.last_changed?he(h.last_changed):"",u=i?.border_color??"rgba(255,255,255,0.1)",x=t==="not_home"&&e.address_entity?(()=>{let f=this.hass.states[e.address_entity];return f&&f.state!=="unavailable"&&f.state!=="unknown"?f.state:""})():"";return n`
      <div class="person-row" style="--row-accent:${u}"
        @click=${()=>{this._expandedEntity=d?null:e.entity}}>
        <div class="person-row-inner">
          ${this._renderAvatar(e,a)}
          <div class="person-info">
            <div class="person-name">${this._getPersonName(e)}</div>
            <div class="person-zone" style="display:flex;align-items:center;gap:6px">
              <person-card-location-badge .zone=${t} .zoneStyles=${r} .address=${x}></person-card-location-badge>
              ${g?n`<span style="font-size:0.7rem;color:rgba(255,255,255,0.35)">· ${g}</span>`:""}
            </div>
          </div>
          <div class="person-row-meta">
            ${l.slice(0,3).map(f=>{let $=G(this.hass,f),k=f.battery_threshold??20,C=$!==null?$<=k?"#f44336":$<50?"#ff9800":"#4caf50":"#888";return $!==null?n`
                <div class="device-summary">
                  <ha-icon .icon=${f.icon??"mdi:devices"} style="--mdc-icon-size:12px;color:rgba(255,255,255,0.4)"></ha-icon>
                  <span class="device-summary-pct" style="color:${C}">${Math.round($)}%</span>
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
              ${(e.show_last_seen??this._config.show_last_seen)&&h?.last_updated?n`
                <person-card-last-seen .lastUpdated=${h.last_updated} .format=${"relative"}></person-card-last-seen>
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
    `}};Z.styles=lt,p([m({attribute:!1})],Z.prototype,"hass",2),p([w()],Z.prototype,"_config",2),p([w()],Z.prototype,"_expandedEntity",2),Z=p([y("family-card")],Z);var dt=v`
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
`;var Bt={1:110,2:90,3:70,4:58,5:50,6:42};function pt(s){let o=Math.min(6,Math.max(1,Math.round(s)));return Bt[o]??70}function ht(s,o){let e=s?.trim();return e?e[0].toUpperCase():((o.includes(".")?o.split(".")[1]:o)?.[0]??"?").toUpperCase()}function gt(s,o){let e=0,t=0;for(let r of s)(o.states[r.entity]?.state??"unknown")==="home"?e++:t++;return{home:e,away:t}}var B=class extends b{constructor(){super(...arguments);this._activeTab="display"}setConfig(e){this._config=e}_fire(e){this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e},bubbles:!0,composed:!0})),this._config=e}_set(e){this._fire({...this._config,...e})}_renderDisplayTab(){return n`
      <div class="row">
        <label>Title (optional — shown above the grid with a home/away count)</label>
        <ha-textfield
          .value=${this._config.title??""}
          placeholder="Family"
          @input=${e=>{this._set({title:e.target.value||void 0})}}
        ></ha-textfield>
      </div>
      <div class="row">
        <label>Columns (1–6, default 3 — tiles resize automatically)</label>
        <ha-textfield
          type="number"
          .value=${String(this._config.columns??3)}
          min="1"
          max="6"
          @input=${e=>{let t=parseInt(e.target.value,10);t>=1&&t<=6&&this._set({columns:t})}}
        ></ha-textfield>
      </div>
    `}_renderPeopleTab(){let e=this._config.people??[];return n`
      <div class="row">
        <label>People</label>
        ${e.map((t,r)=>n`
          <div class="person-block">
            <div class="person-header">
              <span class="person-label">Person ${r+1}</span>
              <button class="delete-btn" @click=${()=>{let i=[...e];i.splice(r,1),this._set({people:i})}}>
                <ha-icon .icon=${"mdi:delete"}></ha-icon>
              </button>
            </div>
            <ha-entity-picker
              .hass=${this.hass}
              .value=${t.entity??""}
              .includeDomains=${["person"]}
              @value-changed=${i=>{let a=[...e];a[r]={...a[r],entity:i.detail.value},this._set({people:a})}}
            ></ha-entity-picker>
            <div class="detail-row">
              <ha-textfield
                .value=${t.name??""}
                label="Display name (optional)"
                @input=${i=>{let a=[...e];a[r]={...a[r],name:i.target.value||void 0},this._set({people:a})}}
              ></ha-textfield>
            </div>
          </div>
        `)}
        <button class="add-btn" @click=${()=>{this._set({people:[...e,{entity:""}]})}}>
          <ha-icon .icon=${"mdi:plus-circle"}></ha-icon> Add Person
        </button>
      </div>
    `}_renderZonesTab(){return n`
      <div class="row">
        <label>Zone Style Overrides (optional — falls back to Theme Card)</label>
        <person-card-zone-editor
          .hass=${this.hass}
          .zoneStyles=${this._config.zone_styles??[]}
          @zone-styles-changed=${e=>this._set({zone_styles:e.detail.zoneStyles})}
        ></person-card-zone-editor>
      </div>
    `}render(){if(!this._config)return n``;let e={display:"Display",people:"People",zones:"Zone Styles"};return n`
      <div class="tabs">
        ${["display","people","zones"].map(t=>n`
          <div class="tab ${this._activeTab===t?"active":""}"
            @click=${()=>{this._activeTab=t}}>
            ${e[t]}
          </div>
        `)}
      </div>
      ${this._activeTab==="display"?this._renderDisplayTab():""}
      ${this._activeTab==="people"?this._renderPeopleTab():""}
      ${this._activeTab==="zones"?this._renderZonesTab():""}
    `}};B.styles=v`
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
  `,p([m({attribute:!1})],B.prototype,"hass",2),p([w()],B.prototype,"_config",2),p([w()],B.prototype,"_activeTab",2),B=p([y("family-grid-card-editor")],B);window.customCards=window.customCards??[];window.customCards.push({type:"family-grid-card",name:"Family Grid Card",description:"Grid of family members with animated zone rings \u2014 readable from across a room.",preview:!0});var K=class extends b{constructor(){super(...arguments);this._onThemeUpdated=()=>{this.requestUpdate()}}static getStubConfig(e){return{people:e?Object.keys(e.states).filter(r=>r.startsWith("person.")).slice(0,6).map(r=>({entity:r})):[],columns:3}}static getConfigElement(){return document.createElement("family-grid-card-editor")}setConfig(e){this._config={columns:3,zone_styles:[],...e}}getCardSize(){return 3}connectedCallback(){super.connectedCallback(),window.addEventListener(z,this._onThemeUpdated)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener(z,this._onThemeUpdated)}_zoneStyles(){return S(this._config.zone_styles??[])}_renderTile(e,t){let r=this.hass.states[e.entity]?.state??"unknown",i=E(r,t),a=this.hass.states[e.entity],c=a?.attributes?.entity_picture,l=a?.attributes?.friendly_name,d=e.name||l||e.entity,h=ht(e.name||l,e.entity),g=i?.border_color,u=g??"rgba(255,255,255,0.25)",x=g?M(g,.3):"rgba(255,255,255,0.1)",f=g?M(g,.2):"#2d2d50",$=g?M(g,.18):"rgba(255,255,255,0.06)",k=g?M(g,.4):"rgba(255,255,255,0.15)",C=r==="home"?"3s":"1.8s",mt=[`--ring-color:${u}`,`--ring-glow:${x}`,`--ring-bg:${f}`,`--ring-bg-badge:${$}`,`--ring-border-badge:${k}`,`--fgc-speed:${C}`].join(";"),bt=me(r,t,""),ut=we(r,t,!1);return n`
      <div class="tile" style=${mt}>
        <div class="ring-wrap">
          ${c?n`<img class="avatar" src=${c} alt=${d}>`:n`<div class="avatar-initials">${h}</div>`}
        </div>
        <div class="tile-name">${d}</div>
        <div class="tile-badge">
          <ha-icon .icon=${ut}></ha-icon>
          ${bt}
        </div>
      </div>
    `}render(){if(!this._config||!this.hass)return n``;let e=this._config.people??[],t=Math.min(6,Math.max(1,this._config.columns??3)),r=pt(t),i=r-12,a=Math.round(i*.35),c=this._zoneStyles(),l=[`--fgc-cols:${t}`,`--fgc-ring-size:${r}px`,`--fgc-avatar-size:${i}px`,`--fgc-initial-size:${a}px`].join(";"),d=!!this._config.title,h=d?gt(e,this.hass):null;return n`
      <div class="card-content">
        ${d?n`
          <div class="card-header">
            <span class="card-title">${this._config.title}</span>
            <span class="card-summary">${h.home} home · ${h.away} away</span>
          </div>
        `:""}
        <div class="person-grid" style=${l}>
          ${e.map(g=>this._renderTile(g,c))}
        </div>
      </div>
    `}};K.styles=dt,p([m({attribute:!1})],K.prototype,"hass",2),p([w()],K.prototype,"_config",2),K=p([y("family-grid-card")],K);window.customCards=window.customCards??[];window.customCards.push({type:"person-card",name:"Person Card",description:"At-a-glance person status: location, devices, ETA, and conditional styling.",preview:!0});var Y=class extends b{constructor(){super(...arguments);this._sizeTier="medium";this._onThemeUpdated=()=>{this.requestUpdate()}}static getStubConfig(e){let t=e?Object.keys(e.states).find(i=>i.startsWith("person.")):void 0,r=[];if(e&&t){let i=e.states[t]?.attributes?.source?[e.states[t].attributes.source]:Object.keys(e.states).filter(a=>a.startsWith("device_tracker.")).slice(0,2);for(let a of i){let c=a.split(".")[1],d=[`sensor.${c}_battery_level`,`sensor.${c}_battery`].find(h=>e.states[h]);r.push({entity:a,...d?{battery_entity:d}:{}})}}return{person_entity:t??"person.example",devices:r,size:"auto",show_eta:!0,show_last_seen:!0,show_notification_badge:!0,zone_styles:[],conditions:[]}}setConfig(e){if(!e.person_entity)throw new Error("person_entity is required");this._config=et({size:"auto",show_eta:!0,show_last_seen:!0,show_notification_badge:!0,devices:[],zone_styles:[],conditions:[],...e}),this.isConnected&&this._setupResizeObserver()}getCardSize(){return 3}static getConfigElement(){return document.createElement("person-card-editor")}connectedCallback(){super.connectedCallback(),this._config&&this._setupResizeObserver(),window.addEventListener(z,this._onThemeUpdated)}disconnectedCallback(){super.disconnectedCallback(),this._resizeObserver?.disconnect(),window.removeEventListener(z,this._onThemeUpdated)}_setSizeTier(e){this._sizeTier!==e&&(this._sizeTier=e,this.setAttribute("size-tier",e),this.requestUpdate())}_setupResizeObserver(){this._resizeObserver?.disconnect(),this._resizeObserver=void 0,this._config.size==="auto"?(this._resizeObserver=new ResizeObserver(e=>{let t=e[0]?.contentRect.width??300;this._setSizeTier(t<200?"small":t<400?"medium":"large")}),this._resizeObserver.observe(this)):this._config.size&&this._setSizeTier(this._config.size)}get _personState(){return this.hass?.states[this._config.person_entity]}get _personZone(){return this._personState?.state??"unknown"}updated(){if(!this._config||!this.hass)return;let e=this._config.conditions?.length?pe(this._config.conditions,this.hass):{},t=S(this._config.zone_styles??[]).find(a=>a.zone===this._personZone),r=e.background_color??t?.background_color;r?this.style.setProperty("--pc-background",r):this.style.removeProperty("--pc-background");let i=e.border_color??t?.border_color;i?(this.style.setProperty("--pc-border-color",i),this.style.setProperty("--pc-border-width",`${e.border_width??2}px`),this.style.setProperty("--pc-glow-color",M(i,.25))):(this.style.removeProperty("--pc-border-color"),this.style.removeProperty("--pc-border-width"),this.style.removeProperty("--pc-glow-color")),this.setAttribute("card-theme",this._config.card_theme??"default"),this._config.background_image?this.style.setProperty("--pc-background-image",`url('${this._config.background_image}')`):this.style.removeProperty("--pc-background-image")}_renderHeroDevice(e){let t=e.battery_entity?this.hass.states[e.battery_entity]:void 0,r=t?parseFloat(t.state):NaN,i=e.battery_threshold??20,a=isNaN(r)?"#888":_e(r,i),c=e.connectivity_entity?this.hass.states[e.connectivity_entity]:void 0,l=c?c.state==="on":null,d=e.icon??"mdi:devices",h=e.name??e.entity.split(".")[1]?.replace(/_/g," ")??"";return n`
      <div class="hero-device-card">
        <div class="hero-device-icon"><ha-icon .icon=${d}></ha-icon></div>
        <div class="hero-device-name">${h}</div>
        ${isNaN(r)?"":n`
          <div class="hero-battery-bar">
            <div class="hero-battery-fill" style="width:${Math.min(r,100)}%;background:${a}"></div>
          </div>
          <div class="hero-battery-pct" style="color:${a}">${Math.round(r)}%</div>
        `}
        ${l!==null?n`
          <div class="hero-connectivity" style="background:${l?"#4caf50":"#f44336"}"></div>
        `:""}
      </div>
    `}_renderHero(e){let{name:t,photo:r,personState:i,effect:a,showBadge:c,isStale:l,address:d,devices:h}=e,g=S(this._config.zone_styles??[]).find(k=>k.zone===this._personZone),u=a.border_color??g?.border_color,x=u?`box-shadow: 0 0 0 4px ${u}66, 0 0 32px ${u}44;`:"box-shadow: 0 0 0 4px rgba(255,255,255,0.15), 0 0 20px rgba(255,255,255,0.05);",f=!!(this._config.show_last_seen&&i?.last_updated),$=h;return n`
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
          ${r?n`<img class="avatar ${l?"stale":""}" src=${r} alt=${t} style=${x} />`:n`<div class="avatar-placeholder ${l?"stale":""}" style=${x}><ha-icon icon="mdi:account"></ha-icon></div>`}
          ${l?n`<div class="stale-indicator"><ha-icon .icon=${"mdi:clock-alert-outline"}></ha-icon></div>`:""}
        </div>

        <!-- Name + Zone -->
        <div class="name">${t}</div>
        <div class="hero-zone">
          <person-card-location-badge
            .zone=${this._personZone}
            .zoneStyles=${S(this._config.zone_styles??[])}
            .address=${d}
          ></person-card-location-badge>
        </div>

        <!-- Device grid -->
        ${$.length>0?n`
          <div class="hero-devices">
            ${$.map(k=>this._renderHeroDevice(k))}
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
    `}_renderStats(e){let{name:t,photo:r,personState:i,effect:a,showBadge:c,isStale:l,address:d,devices:h}=e,g=i?.last_changed?he(i.last_changed):"\u2014",u=i?.last_updated?he(i.last_updated):"\u2014",x=h;return n`
      <div class="card-content">
        ${this._config.background_image?n`<div class="card-background"></div>`:""}

        <!-- Header -->
        <div class="header">
          <div class="avatar-wrapper">
            ${r?n`<img class="avatar ${l?"stale":""}" src=${r} alt=${t} />`:n`<div class="avatar-placeholder ${l?"stale":""}"><ha-icon icon="mdi:account"></ha-icon></div>`}
            ${l?n`<div class="stale-indicator"><ha-icon .icon=${"mdi:clock-alert-outline"}></ha-icon></div>`:""}
          </div>
          <div class="name-zone">
            <div class="name">${t}</div>
            <person-card-location-badge
              .zone=${this._personZone}
              .zoneStyles=${S(this._config.zone_styles??[])}
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
    `}render(){if(!this._config||!this.hass)return n``;let e=this._personState,t=this._config.name??e?.attributes?.friendly_name??this._config.person_entity.split(".")[1].replace(/_/g," "),r=this._config.photo??e?.attributes?.entity_picture,i=this._config.conditions?.length?pe(this._config.conditions,this.hass):{},a=this._config.show_notification_badge!==!1&&(i.badge_color||i.badge_icon?!0:xe(this.hass,this._config.devices??[],this._config.person_entity)),c=this._sizeTier==="small",l=this._sizeTier==="large",d=this._config.devices??[],h=e?.last_updated??"",g=this._config.eta_entity??"",u=!!(this._config.offline_threshold&&this._config.offline_threshold>0&&e?.last_updated)&&(Date.now()-new Date(e.last_updated).getTime())/6e4>this._config.offline_threshold,x=!c&&this._personZone==="not_home"&&this._config.address_entity?(()=>{let C=this.hass.states[this._config.address_entity];return C&&C.state!=="unavailable"&&C.state!=="unknown"?C.state:""})():"",f={name:t,photo:r,personState:e,effect:i,showBadge:a,isStale:u,address:x,devices:d};if(this._sizeTier==="hero")return this._renderHero(f);if(this._sizeTier==="stats")return this._renderStats(f);let $=!!(this._config.show_eta&&g),k=!!(this._config.show_last_seen&&h);return n`
      <div class="card-content">
        ${this._config.background_image?n`<div class="card-background"></div>`:""}

        <!-- Header -->
        <div class="header">
          <div class="avatar-wrapper">
            ${r?n`<img class="avatar ${u?"stale":""}" src=${r} alt=${t} />`:n`<div class="avatar-placeholder ${u?"stale":""}"><ha-icon icon="mdi:account"></ha-icon></div>`}
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
              .zoneStyles=${S(this._config.zone_styles??[])}
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
            ${d.map(C=>n`
              <person-card-device-tile
                .hass=${this.hass}
                .device=${C}
                .showLabels=${l}
              ></person-card-device-tile>
            `)}
          </div>
        `:""}

        <!-- Footer (large only) -->
        ${l&&($||k)?n`
          <div class="divider"></div>
          <div class="footer">
            ${$?n`
              <person-card-eta-display
                .hass=${this.hass}
                .etaEntity=${g}
                .personZone=${this._personZone}
              ></person-card-eta-display>
            `:""}
            ${k?n`
              <person-card-last-seen
                .lastUpdated=${h}
                .format=${"relative"}
              ></person-card-last-seen>
            `:""}
          </div>
        `:""}
      </div>
    `}};Y.styles=Je,p([m({attribute:!1})],Y.prototype,"hass",2),p([w()],Y.prototype,"_config",2),Y=p([y("person-card")],Y);export{Y as PersonCard};
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
