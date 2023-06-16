import{t as H}from"./transactions.8620ea4c.js";import{a as T,l as p,o,b as c,f as t,z as x,u as r,y,h as z,ae as N,s as D,m as P,q as S,a2 as q,v as I,j as k,x as L,F as $,r as w,t as i}from"./entry.31948361.js";import{g as V,a as j,l as E,s as R,b as U}from"./seoConfig.9d210976.js";const Y={class:"wrapper-navigation"},A=z('<svg class="refill" id="Icons" viewBox="0 0 32 32" data-v-fb8aaa69><ellipse class="st0" cx="11" cy="6" rx="6" ry="3" data-v-fb8aaa69></ellipse><path class="st0" d="M5,6v4c0,1.7,2.7,3,6,3s6-1.3,6-3V6" data-v-fb8aaa69></path><path class="st0" d="M5,10v4c0,1.7,2.7,3,6,3s6-1.3,6-3v-4" data-v-fb8aaa69></path><path class="st0" d="M5,14v4c0,1.7,2.7,3,6,3s6-1.3,6-3v-4" data-v-fb8aaa69></path><path class="st0" d="M5,18v4c0,1.7,2.7,3,6,3s6-1.3,6-3v-4" data-v-fb8aaa69></path><path class="st0" d="M5,22v4c0,1.7,2.7,3,6,3s6-1.3,6-3v-4" data-v-fb8aaa69></path><path class="st0" d="M17,22.2c1.1,0.5,2.5,0.8,4,0.8c3.3,0,6-1.3,6-3v-4" data-v-fb8aaa69></path><path class="st0" d="M17,13.8c1.1-0.5,2.5-0.8,4-0.8c3.3,0,6,1.3,6,3s-2.7,3-6,3c-1.5,0-2.9-0.3-4-0.8" data-v-fb8aaa69></path><path class="st0" d="M17,26.2c1.1,0.5,2.5,0.8,4,0.8c3.3,0,6-1.3,6-3v-4" data-v-fb8aaa69></path></svg>',1),G=z(`<svg class="spend" id="Layer_1" viewBox="0 0 100.353 100.352" data-v-fb8aaa69><g data-v-fb8aaa69><path d="M41.76,45.383c-7.691,0-13.949,6.258-13.949,13.949s6.257,13.948,13.949,13.948s13.949-6.257,13.949-13.948
		S49.451,45.383,41.76,45.383z M41.76,70.281c-6.037,0-10.949-4.911-10.949-10.948s4.912-10.949,10.949-10.949
		c6.038,0,10.949,4.912,10.949,10.949S47.797,70.281,41.76,70.281z" data-v-fb8aaa69></path><path d="M12.399,45.384c-0.829,0-1.5,0.671-1.5,1.5v24.896c0,0.828,0.671,1.5,1.5,1.5s1.5-0.672,1.5-1.5V46.884
		C13.899,46.055,13.228,45.384,12.399,45.384z" data-v-fb8aaa69></path><path d="M70.648,45.384c-0.828,0-1.5,0.671-1.5,1.5v24.896c0,0.828,0.672,1.5,1.5,1.5s1.5-0.672,1.5-1.5V46.884
		C72.148,46.055,71.477,45.384,70.648,45.384z" data-v-fb8aaa69></path><path d="M95.287,19.142H21.869c-0.829,0-1.5,0.671-1.5,1.5v7.419h-6.72c-0.829,0-1.5,0.671-1.5,1.5v8.248H4.714
		c-0.829,0-1.5,0.671-1.5,1.5v40.047c0,0.828,0.671,1.5,1.5,1.5h73.419c0.828,0,1.5-0.672,1.5-1.5v-8.248h7.436
		c0.828,0,1.5-0.672,1.5-1.5v-7.419h6.719c0.828,0,1.5-0.672,1.5-1.5V20.642C96.787,19.813,96.115,19.142,95.287,19.142z
		 M6.214,77.856V40.809h70.419v28.789c0,0.003-0.001,0.006-0.001,0.01s0.001,0.006,0.001,0.01v8.238H6.214z M85.568,68.108h-5.936
		V39.309c0-0.829-0.672-1.5-1.5-1.5H15.149v-6.748h70.419V68.108z M93.787,59.189h-5.219V29.561c0-0.829-0.672-1.5-1.5-1.5H23.369
		v-5.919h70.418V59.189z" data-v-fb8aaa69></path></g></svg>`,1),J={__name:"NavigationBlock",emits:["changeFilters"],setup(C,{emit:g}){let d=p("spend");function _(v){d.value=v,g("changeFilters",v)}return(v,n)=>(o(),c("div",Y,[t("nav",null,[t("button",{class:x({"active-left":r(d)==="refill"}),onClick:n[0]||(n[0]=l=>_("refill"))},[A,y(" Пополнение ")],2),t("button",{class:x({"active-right":r(d)==="spend"}),onClick:n[1]||(n[1]=l=>_("spend"))},[G,y(" Списание ")],2)])]))}},K=T(J,[["__scopeId","data-v-fb8aaa69"]]);const O={class:"wrapper-history"},Q=t("div",{class:"header-history"},[t("h1",null,"История транзакций")],-1),W={class:"history"},X={key:0,class:"wrapper-message"},Z=t("p",null,"На данный момент история пуста",-1),tt=[Z],at={key:1,class:"wrapper-transactions"},st=t("thead",null,[t("tr",null,[t("th",{class:"text-left"}," Дата "),t("th",{class:"text-left"}," Сумма "),t("th",{class:"text-left"}," Тип "),t("th",{class:"text-left"}," Статус ")])],-1),et=t("td",null,"Успешно",-1),nt=t("div",{class:"top-block"},[t("p",null,"Успешно")],-1),ot={class:"bottom-block"},ct={class:"mobile-sum"},lt=t("p",null,"Кол-во",-1),it={class:"sum"},rt={class:"mobile-type"},dt={class:"mobile-date"},_t=t("p",null,"Дата",-1),vt={class:"date"},ft={__name:"index",setup(C){const{setProperty:g}=U();g(V.title,[...j,...V.meta],E,R);const{getPersonTransaction:d}=H(),_=N(),{clearTransactionStore:v}=_,{allTransactions:n}=D(_);let l=p([]),u=p("spend");p("Статус"),p(""),P(()=>{d()}),S(n,()=>{b(u.value)});function b(e){window.scrollTo({top:0,behavior:"smooth"}),u.value=e,u.value==="refill"?l.value=n.value.filter(a=>f(a.action)==="Депозит"):u.value==="spend"&&(l.value=n.value.filter(a=>f(a.action)==="Генерация"))}function M(e){let a=new Date(e),h=a.getDate()<10?`0${a.getDate()}`:a.getDate(),s=a.getMonth()+1<10?`0${a.getMonth()+1}`:a.getMonth()+1,B=a.getHours()<10?`0${a.getHours()}`:a.getHours(),F=a.getMinutes()<10?`0${a.getMinutes()}`:a.getMinutes();return`${h}.${s}.${a.getFullYear()} ${B}:${F}`}function m(e,a){let h=e>a?e:a,s=e<a?e:a;return(h-s).toFixed(1)}function f(e){if(e==="start_credits"||e==="refill"||e==="referral_credits")return"Депозит";if(e==="make_request")return"Генерация"}return q(()=>{v()}),(e,a)=>{const h=I("v-table");return o(),c("div",O,[Q,t("section",W,[k(r(K),{onChangeFilters:b}),r(l).length?(o(),c("div",at,[k(h,{class:"transactions"},{default:L(()=>[st,t("tbody",null,[(o(!0),c($,null,w(r(l),s=>(o(),c("tr",{key:s.id},[t("td",null,i(M(s.created_at)),1),t("td",null,i(m(s.credits_old,s.credits_new)),1),t("td",null,i(f(s.action)),1),et]))),128))])]),_:1}),(o(!0),c($,null,w(r(l),s=>(o(),c("div",{class:"mobile-transactions",key:s.id},[nt,t("div",ot,[t("div",ct,[lt,t("p",it,i(m(s.credits_old,s.credits_new)),1)]),t("p",rt,i(f(s.action)),1),t("div",dt,[_t,t("p",vt,i(M(s.created_at)),1)])])]))),128))])):(o(),c("div",X,tt))])])}}};export{ft as default};