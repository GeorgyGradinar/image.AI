import{a1 as D,l as _,m as M,v as p,b as d,f as t,j as h,z as $,u,A as v,x as B,F as x,r as w,o as i,t as n}from"./entry.4e55af4f.js";import{s as C}from"./seo.562cf0e2.js";import{g as T,a as F,l as j,s as z}from"./seoConfig.48149ed7.js";const N={class:"wrapper-history"},P={class:"header-history"},U=t("h1",null,"История покупок",-1),q={class:"wrapper-search"},A={class:"history"},E=t("thead",null,[t("tr",null,[t("th",{class:"text-left"}," Вид "),t("th",{class:"text-left"}," Дата "),t("th",{class:"text-left"}," Сумма "),t("th",{class:"text-left"}," Тип "),t("th",{class:"text-left"}," Статус ")])],-1),H={class:"top-block"},L={class:"bottom-block"},R={class:"mobile-sum"},Y=t("p",null,"Кол-во",-1),G={class:"sum"},I={class:"mobile-type"},J={class:"mobile-date"},K=t("p",null,"Дата",-1),O={class:"date"},tt={__name:"index",setup(Q){const{setProperty:b}=C();b(T.title,[...F,...T.meta],j,z);const{getPersonTransaction:V}=D();_("Дата");let r=_("Статус"),c=_(""),g=_([{id:1,action:"start_credits",credits_old:0,credits_new:25,user_id:2,created_at:"2023-06-05T07:35:10.000000Z",updated_at:"2023-06-05T07:35:10.000000Z",type:"Депозит"},{id:2,action:"generate_image",credits_old:25,credits_new:23,user_id:2,created_at:"2023-06-05T07:35:10.000000Z",updated_at:"2023-06-05T07:35:10.000000Z",type:"Генерация"},{id:3,action:"generate_image",credits_old:23,credits_new:20,user_id:2,created_at:"2023-06-05T07:35:10.000000Z",updated_at:"2023-06-05T07:35:10.000000Z",type:"Генерация"},{id:4,action:"generate_image",credits_old:20,credits_new:19,user_id:2,created_at:"2023-10-11T07:35:10.000000Z",updated_at:"2023-06-05T07:35:10.000000Z",type:"Генерация"}]);M(()=>{Z()});async function Z(){await V().then(a=>{console.log(a)})}function m(a){if(a==="start_credits")return"Начальный депозит";if(a==="generate_image")return"Генерация картинок"}function f(a){let e=new Date(a),l=e.getDate()<10?`0${e.getDate()}`:e.getDate(),o=e.getMonth()+1<10?`0${e.getMonth()+1}`:e.getMonth()+1;return`${l}.${o}.${e.getFullYear()} ${e.getHours()}:${e.getMinutes()}`}function y(a,e){let l=a>e?a:e,o=a<e?a:e;return l-o}return(a,e)=>{const l=p("v-select"),o=p("v-text-field"),k=p("v-table");return i(),d("div",N,[t("div",P,[U,t("div",q,[h(l,{class:$(["drop-down","rounded-lg"]),modelValue:u(r),"onUpdate:modelValue":e[0]||(e[0]=s=>v(r)?r.value=s:r=s),items:["Успешно","Отмена","Ожидание"],variant:"outlined","return-object":"","persistent-hint":""},null,8,["modelValue"]),h(o,{modelValue:u(c),"onUpdate:modelValue":e[1]||(e[1]=s=>v(c)?c.value=s:c=s),modelModifiers:{trim:!0},density:"compact",variant:"solo",label:"Поиск","append-inner-icon":"mdi-magnify","single-line":"","hide-details":""},null,8,["modelValue"])])]),t("section",A,[h(k,{class:"transactions"},{default:B(()=>[E,t("tbody",null,[(i(!0),d(x,null,w(u(g),s=>(i(),d("tr",{key:s.id},[t("td",null,n(m(s.action)),1),t("td",null,n(f(s.created_at)),1),t("td",null,n(y(s.credits_old,s.credits_new)),1),t("td",null,n(s.type),1),t("td",null,"Успешно "+n(),1)]))),128))])]),_:1}),(i(!0),d(x,null,w(u(g),s=>(i(),d("div",{class:"mobile-transactions",key:s.id},[t("div",H,[t("p",null,n(m(s.action)),1),t("p",null,"Успешно"+n(),1)]),t("div",L,[t("div",R,[Y,t("p",G,n(y(s.credits_old,s.credits_new)),1)]),t("p",I,n(s.type),1),t("div",J,[K,t("p",O,n(f(s.created_at)),1)])])]))),128))])])}}};export{tt as default};
