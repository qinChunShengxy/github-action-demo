import{J as c,W as _,r as d,o as u,i as x,l as e,w as b,u as t}from"./vendor.4445d887.js";const f={class:"app-container"},w={setup(v){const r=[{date:"2016-05-03",name:"Tom",address:"No. 189, Grove St, Los Angeles"},{date:"2016-05-02",name:"Tom",address:"No. 189, Grove St, Los Angeles"},{date:"2016-05-04",name:"Tom",address:"No. 189, Grove St, Los Angeles"},{date:"2016-05-01",name:"Tom",address:"No. 189, Grove St, Los Angeles"}],l=c({form:{pageIndex:1,pageSize:20},total:500}),p=()=>{},{form:a,total:i}=_(l);return(S,o)=>{const n=d("el-table-column"),m=d("el-table"),g=d("Pagination");return u(),x("div",f,[e(m,{data:r,border:"",fit:"","highlight-current-row":""},{default:b(()=>[e(n,{type:"index",width:"50"}),e(n,{property:"date",label:"Date",width:"120"}),e(n,{property:"name",label:"Name",width:"120"}),e(n,{property:"address",label:"Address"})]),_:1}),e(g,{method:p,"page-index":t(a).pageIndex,"onUpdate:page-index":o[0]||(o[0]=s=>t(a).pageIndex=s),"page-size":t(a).pageSize,"onUpdate:page-size":o[1]||(o[1]=s=>t(a).pageSize=s),total:t(i)},null,8,["page-index","page-size","total"])])}}};export{w as default};
