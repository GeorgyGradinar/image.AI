(function(){"use strict";var e={5739:function(e,t,a){a.d(t,{m:function(){return n}});const n="account"},4193:function(e,t,a){var n=a(9242),o=a(3396);const r={class:"pages"};function i(e,t,a,n,i,l){const s=(0,o.up)("Header"),u=(0,o.up)("router-view"),c=(0,o.up)("Footer");return(0,o.wg)(),(0,o.iD)("section",r,[(0,o.Wm)(s),(0,o._)("main",null,[(0,o.Wm)(u)]),(0,o.Wm)(c)])}a(7658);var l=a(7139),s=a(4870),u=a.p+"img/vk.cd161bd7.svg",c=a(2483);const d=[{path:"/",name:"main",component:()=>a.e(429).then(a.bind(a,4429))},{path:"/editor",name:"editor",component:()=>a.e(203).then(a.bind(a,3203))},{path:"/text-to-image",name:"text-to-image",component:()=>a.e(635).then(a.bind(a,3635))},{path:"/dream-booth",name:"dream-booth",component:()=>a.e(347).then(a.bind(a,3347))},{path:"/guides",name:"guides",component:()=>a.e(987).then(a.bind(a,7987))},{path:"/pricing",name:"Pricing",component:()=>a.e(368).then(a.bind(a,8368))},{path:"/settings",name:"Settings",component:()=>a.e(854).then(a.bind(a,8854))}],p=(0,c.p7)({history:(0,c.PO)("/image.AI/"),routes:d});var m=p,v=a.p+"img/yandex.1579c9a3.svg",g=a.p+"img/google.bbaceb48.svg",f=a(4219),b=a(5420),_=a(278),h=a(5739);function w(){const e=(0,_.Z)();function t(e){console.log(e)}function a(){}function n(){const t={id:26516,name:"Евгений Кондратьев",email:"test-email@mail.ru",password:"frej4324f43",credits:25};e.person=t,localStorage.setItem(h.m,JSON.stringify(t))}function o(){const t={};e.person=t,localStorage.setItem(h.m,JSON.stringify(t))}return{registration:t,checkVerificationEmail:a,loginIn:n,logout:o}}var k=a(2773);const U=e=>((0,o.dD)("data-v-27cb3db7"),e=e(),(0,o.Cn)(),e),S=U((()=>(0,o._)("span",{class:"title"},"Регистрация",-1))),C=U((()=>(0,o._)("div",{class:"socials"},[(0,o._)("p",null,"Регистрация с помощю"),(0,o._)("div",{class:"wrapper-socials"},[(0,o._)("img",{src:u,alt:"вконтакте"}),(0,o._)("img",{src:v,alt:"яндекс"}),(0,o._)("img",{src:g,alt:"гугл"})])],-1))),y={class:"card-buttons"},D=["onClick"];var q={__name:"RegistrationDialog",emits:["openAcceptDialog","openRegistrationDialog"],setup(e,{emit:t}){const{mapErrors:a}=(0,k.Z)(),{registration:r}=w(),i=(0,s.iH)({email:"",password:""}),l={email:{required:b.C1,email:b.Do},password:{required:b.C1}},u=(0,f.Xw)(l,i);let c=(0,s.iH)(!1),d=(0,s.iH)(!1);function p(){u.value.$validate(),u.value.$error||(r({email:i.value.email,name:i.value.password}),i.value.password="",i.value.email="",t("openAcceptDialog"),c.value=!1)}return(0,o.YP)(c,(e=>{e?t("openRegistrationDialog"):(u.value.$reset(),i.value={email:"",password:""})})),(e,t)=>{const r=(0,o.up)("v-text-field"),l=(0,o.up)("v-card"),m=(0,o.up)("v-dialog");return(0,o.wg)(),(0,o.j4)(m,{class:"dialog",modelValue:(0,s.SU)(c),"onUpdate:modelValue":t[4]||(t[4]=e=>(0,s.dq)(c)?c.value=e:c=e),width:"600"},{activator:(0,o.w5)((({props:e})=>[(0,o._)("button",(0,o.dG)({class:"create-account no-hover"},e),"Регистрация",16)])),default:(0,o.w5)((()=>[(0,o.Wm)(l,{class:"card"},{default:(0,o.w5)((()=>[S,(0,o._)("form",null,[(0,o.Wm)(r,{modelValue:i.value.email,"onUpdate:modelValue":t[0]||(t[0]=e=>i.value.email=e),"error-messages":(0,s.SU)(a)((0,s.SU)(u).email.$errors),label:"E-mail",onInput:(0,s.SU)(u).email.$touch,onBlur:(0,s.SU)(u).email.$touch},null,8,["modelValue","error-messages","onInput","onBlur"]),(0,o.Wm)(r,{modelValue:i.value.password,"onUpdate:modelValue":t[1]||(t[1]=e=>i.value.password=e),"error-messages":(0,s.SU)(a)((0,s.SU)(u).password.$errors),label:"Пароль",type:(0,s.SU)(d)?"text":"password","append-inner-icon":(0,s.SU)(d)?"mdi-eye":"mdi-eye-off","onClick:appendInner":t[2]||(t[2]=e=>(0,s.dq)(d)?d.value=!(0,s.SU)(d):d=!(0,s.SU)(d)),onInput:(0,s.SU)(u).password.$touch,onBlur:(0,s.SU)(u).password.$touch},null,8,["modelValue","error-messages","type","append-inner-icon","onInput","onBlur"]),C,(0,o._)("div",y,[(0,o._)("button",{onClick:t[3]||(t[3]=(0,n.iM)((e=>(0,s.dq)(c)?c.value=!1:c=!1),["prevent"]))},"Отмена"),(0,o._)("button",{class:"create-account no-hover",onClick:(0,n.iM)(p,["prevent"])},"Регистрация",8,D)])])])),_:1})])),_:1},8,["modelValue"])}}},V=a(89);const I=(0,V.Z)(q,[["__scopeId","data-v-27cb3db7"]]);var $=I,E=a.p+"img/accept.883ed528.svg",j=a.p+"img/reject.b36378ef.svg";const O=e=>((0,o.dD)("data-v-a668709c"),e=e(),(0,o.Cn)(),e),H={key:0},A=O((()=>(0,o._)("span",{class:"title"},"Подтверждение почты",-1))),M={class:"card-buttons"},x=["onClick"],W={key:1,class:"loader"},B=O((()=>(0,o._)("div",{class:"slider",style:{"--i":"0"}},null,-1))),Z=O((()=>(0,o._)("div",{class:"slider",style:{"--i":"1"}},null,-1))),P=O((()=>(0,o._)("div",{class:"slider",style:{"--i":"2"}},null,-1))),N=O((()=>(0,o._)("div",{class:"slider",style:{"--i":"3"}},null,-1))),T=O((()=>(0,o._)("div",{class:"slider",style:{"--i":"4"}},null,-1))),F=[B,Z,P,N,T],L={key:2,class:"accept"},R=O((()=>(0,o._)("img",{src:E,alt:""},null,-1))),J=[R],X={key:3,class:"accept"},Y=O((()=>(0,o._)("img",{src:j,alt:""},null,-1))),z=[Y];var Q={__name:"AcceptEmailDialog",emits:["closeDialog"],setup(e,{emit:t}){const{mapErrors:a}=(0,k.Z)();let r=(0,s.iH)(!0);const i=(0,s.iH)({code:""}),l={code:{required:b.C1}},u=(0,f.Xw)(l,i);let c=(0,s.iH)(!1),d=(0,s.iH)(!1),p=(0,s.iH)(!1);function m(){u.value.$validate(),u.value.$error||(c.value=!0,setTimeout((()=>{v(i.value.code)}),2e3))}function v(e){c.value=!1,"111"===e?(d.value=!0,setTimeout((()=>{d.value=!1,t("closeDialog")}),1e3)):(p.value=!0,setTimeout((()=>{p.value=!1}),1e3))}return(e,t)=>{const l=(0,o.up)("v-text-field"),v=(0,o.up)("v-card"),g=(0,o.up)("v-dialog");return(0,o.wg)(),(0,o.j4)(g,{class:"dialog",modelValue:(0,s.SU)(r),"onUpdate:modelValue":t[2]||(t[2]=e=>(0,s.dq)(r)?r.value=e:r=e),width:"600",persistent:""},{default:(0,o.w5)((()=>[(0,o.Wm)(v,{class:"card"},{default:(0,o.w5)((()=>[(0,s.SU)(c)||(0,s.SU)(d)||(0,s.SU)(p)?(0,o.kq)("",!0):((0,o.wg)(),(0,o.iD)("div",H,[A,(0,o._)("form",null,[(0,o.Wm)(l,{modelValue:i.value.code,"onUpdate:modelValue":t[0]||(t[0]=e=>i.value.code=e),label:"Код подтверждения","error-messages":(0,s.SU)(a)((0,s.SU)(u).code.$errors)},null,8,["modelValue","error-messages"]),(0,o._)("div",M,[(0,o._)("button",{onClick:t[1]||(t[1]=(0,n.iM)((t=>e.$emit("closeDialog")),["prevent"]))},"Закрыть"),(0,o._)("button",{class:"create-account no-hover",onClick:(0,n.iM)(m,["prevent"])},"Подтвердить",8,x)])])])),(0,s.SU)(c)?((0,o.wg)(),(0,o.iD)("section",W,F)):(0,o.kq)("",!0),(0,s.SU)(d)?((0,o.wg)(),(0,o.iD)("div",L,J)):(0,o.kq)("",!0),(0,s.SU)(p)?((0,o.wg)(),(0,o.iD)("div",X,z)):(0,o.kq)("",!0)])),_:1})])),_:1},8,["modelValue"])}}};const G=(0,V.Z)(Q,[["__scopeId","data-v-a668709c"]]);var K=G;const ee=e=>((0,o.dD)("data-v-9daa2dd6"),e=e(),(0,o.Cn)(),e),te=ee((()=>(0,o._)("span",{class:"title"},"Восстановление пароля",-1))),ae={key:0},ne={class:"card-buttons"},oe=["onClick"],re={key:1,class:"success"},ie={class:"card-buttons"};var le={__name:"ForgotPassword",setup(e){const{mapErrors:t}=(0,k.Z)();let a=(0,s.iH)(!0),r=(0,s.iH)(!0);const i=(0,s.iH)({email:""}),l={email:{required:b.C1,email:b.Do}},u=(0,f.Xw)(l,i);function c(){u.value.$error||(r.value=!1)}return(e,l)=>{const d=(0,o.up)("v-text-field"),p=(0,o.up)("v-card"),m=(0,o.up)("v-dialog");return(0,o.wg)(),(0,o.j4)(m,{class:"dialog",modelValue:(0,s.SU)(a),"onUpdate:modelValue":l[3]||(l[3]=e=>(0,s.dq)(a)?a.value=e:a=e),width:"600",persistent:""},{default:(0,o.w5)((()=>[(0,o.Wm)(p,{class:"card"},{default:(0,o.w5)((()=>[te,(0,s.SU)(r)?((0,o.wg)(),(0,o.iD)("form",ae,[(0,o.Wm)(d,{modelValue:i.value.email,"onUpdate:modelValue":l[0]||(l[0]=e=>i.value.email=e),"error-messages":(0,s.SU)(t)((0,s.SU)(u).email.$errors),label:"E-mail",onInput:(0,s.SU)(u).email.$touch,onBlur:(0,s.SU)(u).email.$touch},null,8,["modelValue","error-messages","onInput","onBlur"]),(0,o._)("div",ne,[(0,o._)("button",{onClick:l[1]||(l[1]=(0,n.iM)((t=>e.$emit("close")),["prevent"]))},"Отмена"),(0,o._)("button",{class:"create-account",onClick:(0,n.iM)(c,["prevent"])},"Восстановить",8,oe)])])):((0,o.wg)(),(0,o.iD)("div",re,[(0,o.Uk)(" Новый пароль отправлен! "),(0,o._)("div",ie,[(0,o._)("button",{class:"create-account",onClick:l[2]||(l[2]=(0,n.iM)((t=>e.$emit("close")),["prevent"]))},"Закрыть")])]))])),_:1})])),_:1},8,["modelValue"])}}};const se=(0,V.Z)(le,[["__scopeId","data-v-9daa2dd6"]]);var ue=se;const ce=e=>((0,o.dD)("data-v-35618af2"),e=e(),(0,o.Cn)(),e),de={class:"wrapper"},pe=ce((()=>(0,o._)("span",{class:"title"},"Вход",-1))),me={class:"forgot-password"},ve=["onClick"],ge=ce((()=>(0,o._)("div",{class:"socials"},[(0,o._)("p",null,"Войти с помощью"),(0,o._)("div",{class:"wrapper-socials"},[(0,o._)("img",{src:u,alt:"вконтакте"}),(0,o._)("img",{src:v,alt:"яндекс"}),(0,o._)("img",{src:g,alt:"гугл"})])],-1))),fe={class:"card-buttons"},be=["onClick"];var _e={__name:"LoginInDialog",emits:["openRegistrationDialog"],setup(e,{emit:t}){const{mapErrors:a}=(0,k.Z)(),{loginIn:r}=w(),i=(0,s.iH)({email:"",password:""}),u={email:{required:b.C1,email:b.Do},password:{required:b.C1}},c=(0,f.Xw)(u,i);let d=(0,s.iH)(!1),p=(0,s.iH)(!1),m=(0,s.iH)(!1);function v(){c.value.$validate(),c.value.$error||(r(),d.value=!1)}function g(){d.value=!1,p.value=!0}return(0,o.YP)(d,(e=>{e?t("openRegistrationDialog"):(c.value.$reset(),i.value={email:"",password:""})})),(e,t)=>{const r=(0,o.up)("v-text-field"),u=(0,o.up)("v-card"),f=(0,o.up)("v-dialog");return(0,o.wg)(),(0,o.iD)("div",de,[(0,o.Wm)(f,{class:"dialog",modelValue:(0,s.SU)(d),"onUpdate:modelValue":t[4]||(t[4]=e=>(0,s.dq)(d)?d.value=e:d=e),width:"600"},{activator:(0,o.w5)((({props:e})=>[(0,o._)("button",(0,l.vs)((0,o.F4)(e)),"Войти",16)])),default:(0,o.w5)((()=>[(0,o.Wm)(u,{class:"card"},{default:(0,o.w5)((()=>[pe,(0,o._)("form",null,[(0,o.Wm)(r,{modelValue:i.value.email,"onUpdate:modelValue":t[0]||(t[0]=e=>i.value.email=e),"error-messages":(0,s.SU)(a)((0,s.SU)(c).email.$errors),label:"E-mail",onInput:(0,s.SU)(c).email.$touch,onBlur:(0,s.SU)(c).email.$touch},null,8,["modelValue","error-messages","onInput","onBlur"]),(0,o.Wm)(r,{modelValue:i.value.password,"onUpdate:modelValue":t[1]||(t[1]=e=>i.value.password=e),"error-messages":(0,s.SU)(a)((0,s.SU)(c).password.$errors),counter:10,label:"Пароль",type:(0,s.SU)(m)?"text":"password","append-inner-icon":(0,s.SU)(m)?"mdi-eye":"mdi-eye-off","onClick:appendInner":t[2]||(t[2]=e=>(0,s.dq)(m)?m.value=!(0,s.SU)(m):m=!(0,s.SU)(m)),onInput:(0,s.SU)(c).password.$touch,onBlur:(0,s.SU)(c).password.$touch},null,8,["modelValue","error-messages","type","append-inner-icon","onInput","onBlur"]),(0,o._)("p",me,[(0,o.Uk)("Забыли пароль? "),(0,o._)("a",{onClick:(0,n.iM)(g,["prevent"])},"Восстановить",8,ve)]),ge,(0,o._)("div",fe,[(0,o._)("button",{onClick:t[3]||(t[3]=(0,n.iM)((e=>(0,s.dq)(d)?d.value=!1:d=!1),["prevent"]))},"Отмена"),(0,o._)("button",{class:"create-account no-hover",onClick:(0,n.iM)(v,["prevent"])},"Войти",8,be)])])])),_:1})])),_:1},8,["modelValue"]),(0,s.SU)(p)?((0,o.wg)(),(0,o.j4)((0,s.SU)(ue),{key:0,onClose:t[5]||(t[5]=e=>(0,s.dq)(p)?p.value=!1:p=!1)})):(0,o.kq)("",!0)])}}};const he=(0,V.Z)(_e,[["__scopeId","data-v-35618af2"]]);var we=he,ke=a(2578),Ue=a.p+"img/gallery.edd68518.svg",Se=a.p+"img/settings.210ec062.svg",Ce=a.p+"img/security.b2b7a143.svg",ye=a.p+"img/terms.5f645365.svg",De=a.p+"img/logOut.aec8970e.svg",qe=a.p+"img/invite.390f8bce.svg";const Ve=e=>((0,o.dD)("data-v-d52ab476"),e=e(),(0,o.Cn)(),e),Ie={class:"info-person"},$e=["title"],Ee={class:"wrapper-name-person"},je={class:"name-person"},Oe=Ve((()=>(0,o._)("p",null,[(0,o._)("img",{src:Ue,alt:"gallery"}),(0,o.Uk)("Моя галерея")],-1))),He=Ve((()=>(0,o._)("img",{src:Se,alt:"settings"},null,-1))),Ae=Ve((()=>(0,o._)("p",null,[(0,o._)("img",{src:Ce,alt:"privacy"}),(0,o.Uk)("Конфиденциальность")],-1))),Me=Ve((()=>(0,o._)("p",null,[(0,o._)("img",{src:ye,alt:"terms"}),(0,o.Uk)("Условия использования")],-1))),xe=Ve((()=>(0,o._)("img",{class:"rotate",src:De,alt:"log out"},null,-1))),We=Ve((()=>(0,o._)("p",null,[(0,o._)("img",{src:qe,alt:"invite"}),(0,o.Uk)("Пригласить другей")],-1)));var Be={__name:"AccountCard",props:{hasCloseDrawer:Boolean},emits:["closeMainDialog"],setup(e,{emit:t}){const a=e,{logout:r}=w(),i=(0,_.Z)(),{person:u}=(0,ke.Jk)(i),c=0;let d=(0,s.iH)(!1);function p(e){d.value=!0,m.push({path:e})}return(0,o.YP)(d,(e=>{e&&t("closeMainDialog")})),(0,o.YP)(a,(e=>{e.hasCloseDrawer||(d.value=!1)})),(e,t)=>(0,s.SU)(u).name?((0,o.wg)(),(0,o.iD)("div",{key:0,class:(0,l.C_)(["person",{opened:(0,s.SU)(d)}]),onClick:t[2]||(t[2]=e=>(0,s.dq)(d)?d.value=!(0,s.SU)(d):d=!(0,s.SU)(d))},[(0,o._)("div",Ie,[(0,o._)("span",{title:(0,s.SU)(u).name},(0,l.zw)((0,s.SU)(u).name),9,$e),(0,o._)("span",null,"кредит: "+(0,l.zw)((0,s.SU)(u).credits),1)]),(0,o._)("div",Ee,[(0,o._)("span",je,(0,l.zw)((0,s.SU)(u).name[c]),1)]),(0,o._)("section",{class:(0,l.C_)(["details-person",{"hidden-drop-down":!(0,s.SU)(d)}])},[Oe,(0,o._)("p",{onClick:t[0]||(t[0]=(0,n.iM)((e=>p("/settings")),["prevent"]))},[He,(0,o.Uk)("Настройки ")]),Ae,Me,(0,o._)("p",{onClick:t[1]||(t[1]=(0,n.iM)(((...e)=>(0,s.SU)(r)&&(0,s.SU)(r)(...e)),["prevent"]))},[xe,(0,o.Uk)("Выйти")]),We],2)],2)):(0,o.kq)("",!0)}};const Ze=(0,V.Z)(Be,[["__scopeId","data-v-d52ab476"]]);var Pe=Ze;const Ne={class:"main-header"},Te=(0,o._)("button",{class:"no-hover"},[(0,o._)("img",{src:u,alt:"vk icon"})],-1),Fe={class:"mini-header"};var Le={__name:"HeaderElement",setup(e){const t=(0,_.Z)(),{person:a}=(0,ke.Jk)(t);let r=(0,s.iH)(!0),i=(0,s.iH)(!1);function u(e){r.value=!0,m.push({path:e})}function c(){r.value=!r.value}function d(){r.value=!0}function p(){i.value=!0}function v(){i.value=!1}return(e,t)=>{const m=(0,o.up)("v-app-bar-nav-icon");return(0,o.wg)(),(0,o.iD)("header",{class:(0,l.C_)({"header-open":!(0,s.SU)(r)})},[(0,o._)("div",{class:"logo",onClick:t[0]||(t[0]=e=>u("/"))},"Лого"),(0,o._)("nav",Ne,[(0,o._)("button",{onClick:t[1]||(t[1]=e=>u("/editor"))},"Редактор"),(0,o._)("button",{onClick:t[2]||(t[2]=e=>u("/text-to-image"))},"Изображение по описанию"),(0,o._)("button",{onClick:t[3]||(t[3]=e=>u("/dream-booth"))},"ФотоМечты"),(0,o._)("button",{onClick:t[4]||(t[4]=e=>u("/guides"))},"Инфо"),Te,(0,o._)("button",{onClick:t[5]||(t[5]=e=>u("/pricing"))},"Цены"),(0,s.SU)(a).name?(0,o.kq)("",!0):((0,o.wg)(),(0,o.j4)((0,s.SU)(we),{key:0})),(0,s.SU)(a).name?(0,o.kq)("",!0):((0,o.wg)(),(0,o.j4)((0,s.SU)($),{key:1,onOpenAcceptDialog:p})),(0,s.SU)(i)?((0,o.wg)(),(0,o.j4)((0,s.SU)(K),{key:2,onCloseDialog:v})):(0,o.kq)("",!0),(0,o.Wm)((0,s.SU)(Pe))]),(0,o._)("nav",Fe,[(0,o.Wm)((0,s.SU)(Pe),{onCloseMainDialog:d,hasCloseDrawer:(0,s.SU)(r)},null,8,["hasCloseDrawer"]),(0,o.Wm)(m,{variant:"text",onClick:(0,n.iM)(c,["stop"])},null,8,["onClick"])]),(0,o._)("section",{class:(0,l.C_)(["navigation-drawer",{"drawer-hidden":(0,s.SU)(r)}])},[(0,o._)("button",{onClick:t[6]||(t[6]=e=>u("/editor"))},"Редактор"),(0,o._)("button",{onClick:t[7]||(t[7]=e=>u("/text-to-image"))},"Изображение по описанию"),(0,o._)("button",{onClick:t[8]||(t[8]=e=>u("/dream-booth"))},"ФотоМечты"),(0,o._)("button",{onClick:t[9]||(t[9]=e=>u("/guides"))},"Инфо"),(0,o._)("button",{onClick:t[10]||(t[10]=e=>u("/pricing"))},"Цены"),(0,s.SU)(a).name?(0,o.kq)("",!0):((0,o.wg)(),(0,o.j4)((0,s.SU)(we),{key:0,onOpenRegistrationDialog:c})),(0,s.SU)(a).name?(0,o.kq)("",!0):((0,o.wg)(),(0,o.j4)((0,s.SU)($),{key:1,onOpenAcceptDialog:p,onOpenRegistrationDialog:c})),(0,s.SU)(i)?((0,o.wg)(),(0,o.j4)((0,s.SU)(K),{key:2,onCloseDialog:v})):(0,o.kq)("",!0)],2)],2)}}};const Re=Le;var Je=Re,Xe=a.p+"img/instagram.c04ccc03.svg",Ye=a.p+"img/twitter.e59052a4.svg",ze=a.p+"img/vk.328e90d0.svg";const Qe=(0,o.uE)('<div class="wrapper-footer" data-v-680ad6b5><div class="logo" data-v-680ad6b5><p data-v-680ad6b5>Logo</p><div class="social" data-v-680ad6b5><img src="'+Xe+'" alt="" data-v-680ad6b5><img src="'+Ye+'" alt="" data-v-680ad6b5><img src="'+ze+'" alt="" data-v-680ad6b5></div></div><section class="item" data-v-680ad6b5><h3 data-v-680ad6b5>Продукт</h3><button data-v-680ad6b5>Арт генератор</button><button data-v-680ad6b5>AI редактор</button><button data-v-680ad6b5>Сеть управления</button><button data-v-680ad6b5>ФотоМечты</button><button data-v-680ad6b5>Цены</button></section><section class="item" data-v-680ad6b5><h3 data-v-680ad6b5>Виды</h3><button data-v-680ad6b5>Аналоговая Диффузия</button><button data-v-680ad6b5>Аниме Диффузия</button><button data-v-680ad6b5>Дисней Диффузия</button><button data-v-680ad6b5>Гибли Диффузия</button><button data-v-680ad6b5>Inkpunk Диффузия</button><button data-v-680ad6b5>ван Гог Диффузия</button></section><section class="item" data-v-680ad6b5><h3 data-v-680ad6b5>Ресурсы</h3><button data-v-680ad6b5>Политика конфиденциальности</button><button data-v-680ad6b5>Условия использования</button><button data-v-680ad6b5>Ограничения</button><button data-v-680ad6b5>Партнерская программа</button></section><section class="item" data-v-680ad6b5><h3 data-v-680ad6b5>О нас</h3><button data-v-680ad6b5>Инфо</button><button data-v-680ad6b5>FAQ</button><button data-v-680ad6b5>Email</button></section></div>',1),Ge=[Qe];function Ke(e,t,a,n,r,i){return(0,o.wg)(),(0,o.iD)("footer",null,Ge)}var et={name:"FooterElement"};const tt=(0,V.Z)(et,[["render",Ke],["__scopeId","data-v-680ad6b5"]]);var at=tt,nt={name:"App",components:{Header:Je,Footer:at}};const ot=(0,V.Z)(nt,[["render",i]]);var rt=ot,it=(a(9773),a(8727)),lt=a(481),st=a(8600);const ut=(0,ke.WB)(),ct=(0,it.Rd)({components:lt,directives:st});(0,n.ri)(rt).use(ut).use(m).use(ct).mount("#app")},2773:function(e,t,a){function n(){function e(e){return e.map((e=>{switch(e.$validator){case"required":return"Обязательное поле";case"email":return"Некорректный E-mail";case"minLength":return"Не соответствует минимальному кол-ву символов";default:return"Что-то не так"}}))}return{mapErrors:e}}a.d(t,{Z:function(){return n}})},278:function(e,t,a){a.d(t,{Z:function(){return i}});var n=a(2578),o=a(4870),r=a(5739);const i=(0,n.Q_)("store",(()=>{const e=localStorage.getItem(r.m);let t=(0,o.iH)(e?JSON.parse(e):{id:3245});return{person:t}}))}},t={};function a(n){var o=t[n];if(void 0!==o)return o.exports;var r=t[n]={exports:{}};return e[n](r,r.exports,a),r.exports}a.m=e,function(){var e=[];a.O=function(t,n,o,r){if(!n){var i=1/0;for(c=0;c<e.length;c++){n=e[c][0],o=e[c][1],r=e[c][2];for(var l=!0,s=0;s<n.length;s++)(!1&r||i>=r)&&Object.keys(a.O).every((function(e){return a.O[e](n[s])}))?n.splice(s--,1):(l=!1,r<i&&(i=r));if(l){e.splice(c--,1);var u=o();void 0!==u&&(t=u)}}return t}r=r||0;for(var c=e.length;c>0&&e[c-1][2]>r;c--)e[c]=e[c-1];e[c]=[n,o,r]}}(),function(){a.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return a.d(t,{a:t}),t}}(),function(){a.d=function(e,t){for(var n in t)a.o(t,n)&&!a.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})}}(),function(){a.f={},a.e=function(e){return Promise.all(Object.keys(a.f).reduce((function(t,n){return a.f[n](e,t),t}),[]))}}(),function(){a.u=function(e){return"js/"+e+"."+{203:"bcb1a83d",347:"cfabd025",368:"a9b5f2f2",429:"0e39bf48",635:"acb20201",854:"0bd32b9a",987:"7535b1a4"}[e]+".js"}}(),function(){a.miniCssF=function(e){return"css/"+e+"."+{429:"7ecee114",854:"e7fad1e4"}[e]+".css"}}(),function(){a.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){var e={},t="imager-front:";a.l=function(n,o,r,i){if(e[n])e[n].push(o);else{var l,s;if(void 0!==r)for(var u=document.getElementsByTagName("script"),c=0;c<u.length;c++){var d=u[c];if(d.getAttribute("src")==n||d.getAttribute("data-webpack")==t+r){l=d;break}}l||(s=!0,l=document.createElement("script"),l.charset="utf-8",l.timeout=120,a.nc&&l.setAttribute("nonce",a.nc),l.setAttribute("data-webpack",t+r),l.src=n),e[n]=[o];var p=function(t,a){l.onerror=l.onload=null,clearTimeout(m);var o=e[n];if(delete e[n],l.parentNode&&l.parentNode.removeChild(l),o&&o.forEach((function(e){return e(a)})),t)return t(a)},m=setTimeout(p.bind(null,void 0,{type:"timeout",target:l}),12e4);l.onerror=p.bind(null,l.onerror),l.onload=p.bind(null,l.onload),s&&document.head.appendChild(l)}}}(),function(){a.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){a.p="/image.AI/"}(),function(){if("undefined"!==typeof document){var e=function(e,t,a,n,o){var r=document.createElement("link");r.rel="stylesheet",r.type="text/css";var i=function(a){if(r.onerror=r.onload=null,"load"===a.type)n();else{var i=a&&("load"===a.type?"missing":a.type),l=a&&a.target&&a.target.href||t,s=new Error("Loading CSS chunk "+e+" failed.\n("+l+")");s.code="CSS_CHUNK_LOAD_FAILED",s.type=i,s.request=l,r.parentNode&&r.parentNode.removeChild(r),o(s)}};return r.onerror=r.onload=i,r.href=t,a?a.parentNode.insertBefore(r,a.nextSibling):document.head.appendChild(r),r},t=function(e,t){for(var a=document.getElementsByTagName("link"),n=0;n<a.length;n++){var o=a[n],r=o.getAttribute("data-href")||o.getAttribute("href");if("stylesheet"===o.rel&&(r===e||r===t))return o}var i=document.getElementsByTagName("style");for(n=0;n<i.length;n++){o=i[n],r=o.getAttribute("data-href");if(r===e||r===t)return o}},n=function(n){return new Promise((function(o,r){var i=a.miniCssF(n),l=a.p+i;if(t(i,l))return o();e(n,l,null,o,r)}))},o={143:0};a.f.miniCss=function(e,t){var a={429:1,854:1};o[e]?t.push(o[e]):0!==o[e]&&a[e]&&t.push(o[e]=n(e).then((function(){o[e]=0}),(function(t){throw delete o[e],t})))}}}(),function(){var e={143:0};a.f.j=function(t,n){var o=a.o(e,t)?e[t]:void 0;if(0!==o)if(o)n.push(o[2]);else{var r=new Promise((function(a,n){o=e[t]=[a,n]}));n.push(o[2]=r);var i=a.p+a.u(t),l=new Error,s=function(n){if(a.o(e,t)&&(o=e[t],0!==o&&(e[t]=void 0),o)){var r=n&&("load"===n.type?"missing":n.type),i=n&&n.target&&n.target.src;l.message="Loading chunk "+t+" failed.\n("+r+": "+i+")",l.name="ChunkLoadError",l.type=r,l.request=i,o[1](l)}};a.l(i,s,"chunk-"+t,t)}},a.O.j=function(t){return 0===e[t]};var t=function(t,n){var o,r,i=n[0],l=n[1],s=n[2],u=0;if(i.some((function(t){return 0!==e[t]}))){for(o in l)a.o(l,o)&&(a.m[o]=l[o]);if(s)var c=s(a)}for(t&&t(n);u<i.length;u++)r=i[u],a.o(e,r)&&e[r]&&e[r][0](),e[r]=0;return a.O(c)},n=self["webpackChunkimager_front"]=self["webpackChunkimager_front"]||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))}();var n=a.O(void 0,[998],(function(){return a(4193)}));n=a.O(n)})();
//# sourceMappingURL=app.fa1a888f.js.map