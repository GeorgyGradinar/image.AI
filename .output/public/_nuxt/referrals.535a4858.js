import{l as n,v as m,b as v,f as e,j as _,u as l,A as u,y as k,F as x,J as y,o as h,ag as b}from"./entry.e9e83efc.js";import{j as i,a as B,l as V,s as g,b as C}from"./seoConfig.f5d67b58.js";const S={class:"wrapper-referrals"},F={class:"referrals"},N=e("h1",null,"Приглашай друзей и зарабатывай краски",-1),j=e("p",null,"Каждый зарегистрировавшийся по ваше ссылке становится вашим рефералом.",-1),w=e("h3",null,"Получай 20% красок с каждой покупки твоего реферала",-1),L=e("p",null,"Каждый раз, когда твой реферал покупает краски, на твой баланс будет добавляться 20% от красок, которые он купил.",-1),R=e("p",null,"Скопируйте свою реферальную ссылку и поделитесь ей с друзьями и подписчиками!",-1),$={class:"wrapper-input"},A=e("img",{src:y,alt:"copy"},null,-1),O={__name:"referrals",setup(D){const r=n(null),{setProperty:p}=C();p(i.title,[...B,...i.meta],V,g);let s=n(!1),c=n(""),a=n("https://neuro-holst.ru?ref=1521");function f(){c.value="Ссылка скопирована",s.value=!0,r.value.select(),document.execCommand("copy")}return(E,t)=>{const d=m("v-text-field");return h(),v(x,null,[e("div",S,[e("section",F,[N,j,w,L,R,e("div",$,[_(d,{readonly:"",modelValue:l(a),"onUpdate:modelValue":t[0]||(t[0]=o=>u(a)?a.value=o:a=o),label:"Реферальная ссылка",ref_key:"referral",ref:r},null,8,["modelValue"]),e("button",{class:"button-copy",onClick:t[1]||(t[1]=o=>f(l(a)))},[A,k(" Скопировать ")])])])]),_(l(b),{openSnackBar:l(s),"text-snack-bar":l(c),onClose:t[2]||(t[2]=o=>u(s)?s.value=!1:s=!1)},null,8,["openSnackBar","text-snack-bar"])],64)}}};export{O as default};