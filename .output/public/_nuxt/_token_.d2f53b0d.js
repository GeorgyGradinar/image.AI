import{a7 as y,a4 as $,l as i,a8 as g,a9 as k,v as V,b,f as l,j as m,u as e,A as c,o as h,aa as x,ab as w,ac as B,ad as I}from"./entry.c06b1dca.js";const C={class:"password-reset-page"},A={class:"wrapper-password-reset"},E=l("h1",null,"Сбросить пароль",-1),N=l("p",null,"Укажите новый пароль для аккаунта",-1),L={__name:"[token]",setup(R){const{mapErrors:d}=x(),{resetPassword:f}=y(),u=$();let a=i(!1),t=i(!1),s=i({newPassword:null,confirmation:null});const _=g(()=>s.value.newPassword),v={newPassword:{required:w,minLengthEight:B(8)},confirmation:{required:w,sameAs:I(_)}},o=k(v,s);function P(){o.value.$validate(),o.value.$error||f({token:u.params.token,email:u.query.email,newPassword:s.value.newPassword,confirmation:s.value.confirmation})}return(S,n)=>{const p=V("v-text-field");return h(),b("section",C,[l("div",A,[E,N,m(p,{modelValue:e(s).newPassword,"onUpdate:modelValue":n[0]||(n[0]=r=>e(s).newPassword=r),label:"Новый пароль","error-messages":e(d)(e(o).newPassword.$errors),"append-inner-icon":e(a)?"mdi-eye":"mdi-eye-off",type:e(a)?"text":"password","onClick:appendInner":n[1]||(n[1]=r=>c(a)?a.value=!e(a):a=!e(a)),onInput:e(o).newPassword.$touch,onBlur:e(o).newPassword.$touch},null,8,["modelValue","error-messages","append-inner-icon","type","onInput","onBlur"]),m(p,{modelValue:e(s).confirmation,"onUpdate:modelValue":n[2]||(n[2]=r=>e(s).confirmation=r),label:"Повторите новый пароль","error-messages":e(d)(e(o).confirmation.$errors),"append-inner-icon":e(t)?"mdi-eye":"mdi-eye-off",type:e(t)?"text":"password","onClick:appendInner":n[3]||(n[3]=r=>c(t)?t.value=!e(t):t=!e(t)),onInput:e(o).confirmation.$touch,onBlur:e(o).confirmation.$touch},null,8,["modelValue","error-messages","append-inner-icon","type","onInput","onBlur"]),l("div",{class:"wrapper-button"},[l("button",{class:"secondary",onClick:P},"Сохранить")])])])}}};export{L as default};
