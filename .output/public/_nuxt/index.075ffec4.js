import{a as q,Y as se,k as Y,$ as J,v as R,o as c,b as d,u as e,f as s,w as A,j as k,x as T,y,z as S,B as V,p as K,i as Q,T as oe,l as g,a0 as P,s as D,a1 as ae,e as le,m as ne,q as N,a2 as ie,A as G,F as re,r as ce,C as de,a3 as ue,t as _e,c as ve,h as pe}from"./entry.25c73aa7.js";import{g as me}from"./generatorImages.9f8426e4.js";import{_ as ge}from"./boxes.593fab11.js";import{m as H,a as fe,l as he,s as we,b as ke}from"./seoConfig.3afd89af.js";const j=l=>(K("data-v-ecab4f78"),l=l(),Q(),l),be={class:"photo-grid"},Ce={key:0,class:"photo-wrapper"},xe=["src"],ye=["href"],$e=j(()=>s("img",{src:oe,alt:""},null,-1)),Ie=j(()=>s("svg",{viewBox:"0 0 24 24",fill:"none"},[s("path",{d:"M16 6V5.2C16 4.0799 16 3.51984 15.782 3.09202C15.5903 2.71569 15.2843 2.40973 14.908 2.21799C14.4802 2 13.9201 2 12.8 2H11.2C10.0799 2 9.51984 2 9.09202 2.21799C8.71569 2.40973 8.40973 2.71569 8.21799 3.09202C8 3.51984 8 4.0799 8 5.2V6M10 11.5V16.5M14 11.5V16.5M3 6H21M19 6V17.2C19 18.8802 19 19.7202 18.673 20.362C18.3854 20.9265 17.9265 21.3854 17.362 21.673C16.7202 22 15.8802 22 14.2 22H9.8C8.11984 22 7.27976 22 6.63803 21.673C6.07354 21.3854 5.6146 20.9265 5.32698 20.362C5 19.7202 5 18.8802 5 17.2V6",stroke:"black","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"})],-1)),Ve=j(()=>s("path",{d:"M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"},null,-1)),Se=[Ve],Be={__name:"ImageElement",props:{image:{}},setup(l){const b=l,{image:o}=se(b);Y();const f=J(),{toggleImageDetails:u}=f,{likeImage:_,deleteImage:t}=me();async function C(B){const v=await(await fetch(B)).blob(),p=URL.createObjectURL(v),a=document.createElement("a");a.href=p,a.download="image",document.body.appendChild(a),a.click(),document.body.removeChild(a),window.URL.revokeObjectURL(p)}return(B,i)=>{const v=R("v-tooltip");return c(),d("div",be,[e(o).url?(c(),d("div",Ce,[s("img",{class:"main-image",src:e(o).url,alt:"image example",onClick:i[0]||(i[0]=A(p=>e(u)({isOpen:!0,image:e(o)}),["prevent"]))},null,8,xe),s("a",{class:"wrapper-download",href:e(o).url,onClick:i[1]||(i[1]=A(p=>C(e(o).url),["prevent"]))},[$e,k(v,{activator:"parent",location:"bottom"},{default:T(()=>[y("Скачать")]),_:1})],8,ye),s("div",{class:"wrapper-bin",onClick:i[2]||(i[2]=p=>e(t)(e(o).id))},[Ie,k(v,{activator:"parent",location:"bottom"},{default:T(()=>[y("Удалить")]),_:1})]),s("div",{class:"wrapper-like",onClick:i[3]||(i[3]=p=>e(_)(e(o).id))},[(c(),d("svg",{class:S(["like",{"like-active":e(o).is_liked}]),xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"},Se,2)),k(v,{activator:"parent",location:"bottom"},{default:T(()=>[y("Добавить в избранное")]),_:1})])])):V("",!0)])}}},Me=q(Be,[["__scopeId","data-v-ecab4f78"]]);const W=l=>(K("data-v-6ef28f99"),l=l(),Q(),l),Le={class:"wrapper-navigation"},Te=W(()=>s("img",{class:"edit",src:ge,alt:""},null,-1)),De=W(()=>s("svg",{class:"like",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"},[s("path",{d:"M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"})],-1)),Ne={__name:"NavigationBlock",emits:["changeFilters"],setup(l,{emit:b}){let o=g("generated");function f(u){o.value=u,b("changeFilters",u)}return(u,_)=>(c(),d("div",Le,[s("nav",null,[s("button",{class:S({"active-left":e(o)==="generated"}),onClick:_[0]||(_[0]=t=>f("generated"))},[Te,y(" Все ")],2),s("button",{class:S({"active-right":e(o)==="like"}),onClick:_[1]||(_[1]=t=>f("like"))},[De,y(" Избранные ")],2)])]))}},Re=q(Ne,[["__scopeId","data-v-6ef28f99"]]);const je={class:"wrapper-gallery"},Ee={class:"wrapper-search"},Fe={class:"main-block"},Ue={key:0,class:"wrapper-images"},Oe={class:"wrapper-loader"},ze=pe('<div class="loader"><div class="circle"></div><div class="circle"></div><div class="circle"></div><div class="shadow"></div><div class="shadow"></div><div class="shadow"></div></div>',1),Ae=[ze],Pe={key:1,class:"info-message"},Ge={key:2,class:"wrapper-text"},Ke={__name:"index",setup(l){const{setProperty:b}=ke();b(H.title,[...fe,...H.meta],he,we);const{getPersonGallery:o}=P(),f=Y();P();const{person:u}=D(f),_=ae(),{images:t,isShowMainLoader:C,inProgressMoreImages:B,isShowButtonMoreImages:i}=D(_);le();const v=J(),{isOpenAcceptDialog:p}=D(v);let a=g([]),$=g("generated"),h=g(""),I=g("Сначала новые"),w=g(""),M=g(null),X;ne(()=>{u._value.id&&!p.value&&(t.value.length?a.value=t.value:E())}),N(u,n=>{n.id&&!t.value.length&&!v.isOpenAcceptDialog&&E()}),N(t,n=>{F()}),N(h,n=>{t.value&&Z()});let L;function E(){clearTimeout(L),L=setTimeout(()=>{o()},500)}function Z(){M&&clearTimeout(M),M=setTimeout(()=>{ee(h.value)},500)}function ee(n){let r;n?r=t==null?void 0:t.value.filter(x=>{if(x.filters.description.includes(n)||x.filters.exception.includes(n))return x}):r=a._value.images,t.value=r,w.value=t!=null&&t.value.length?w.value:"Изображение не найдено"}function F(n){window.scrollTo({top:0,behavior:"smooth"}),$.value=n||$.value,$.value==="generated"?(a.value=t.value,w.value="У вас нет сгенерированных изображений"):$.value==="like"&&(a.value=t.value.filter(r=>r.is_liked),w.value="У вас нет избранных изображений")}return ie(()=>{removeEventListener("scroll",X),clearTimeout(L)}),(n,r)=>{var U,O,z;const x=R("v-select"),te=R("v-text-field");return c(),d("div",je,[s("div",Ee,[k(x,{class:S(["drop-down","rounded-lg"]),modelValue:e(I),"onUpdate:modelValue":r[0]||(r[0]=m=>G(I)?I.value=m:I=m),items:["Сначала новые","Сначала старые"],variant:"outlined","return-object":"","persistent-hint":"",label:"Поиск"},null,8,["modelValue"]),k(te,{modelValue:e(h),"onUpdate:modelValue":r[1]||(r[1]=m=>G(h)?h.value=m:h=m),modelModifiers:{trim:!0},density:"compact",variant:"solo",label:"Поиск","append-inner-icon":"mdi-magnify","single-line":"","hide-details":""},null,8,["modelValue"])]),s("div",Fe,[k(e(Re),{onChangeFilters:F}),(U=e(a))!=null&&U.length?(c(),d("div",Ue,[(c(!0),d(re,null,ce(e(a),m=>(c(),ve(e(Me),{key:m.id,image:m},null,8,["image"]))),128))])):V("",!0),de(s("div",Oe,Ae,512),[[ue,e(C)]]),!((O=e(t))!=null&&O.length)&&!e(C)?(c(),d("span",Pe," У вас пока нет сгенерированных изображений. ")):V("",!0),e(w)&&!e(a).length&&!e(C)&&((z=e(t))!=null&&z.length)?(c(),d("div",Ge,[s("p",null,_e(e(w)),1)])):V("",!0)])])}}};export{Ke as default};
