import{$ as i,l}from"./entry.4e55af4f.js";const s=i("project",()=>{let e=l([{id:"-efrefwf5wf",name:"test",date:"12.03.2022"},{id:"-sdgvrghnyu5542",name:"test1",date:"12.10.2022"},{id:"-qqqweert998874",name:"test2",date:"03.03.2022"},{id:"-56cds48787",name:"test3",date:"06.07.2022"}]);function n(t){e.value=[t,...e.value]}function r(t){let a=e.value.findIndex(d=>d.id=t);e.value.splice(a,1),e.value=[...e.value]}function u(t){const a=e.value.findIndex(d=>d.id===t.id);e.value[a]={...e.value[a],name:t.name},e.value=[...e.value]}return{projects:e,addNewProject:n,deleteProject:r,updateParameters:u}});export{s as p};
