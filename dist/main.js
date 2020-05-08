!function(e){var t={};function o(d){if(t[d])return t[d].exports;var r=t[d]={i:d,l:!1,exports:{}};return e[d].call(r.exports,r,r.exports,o),r.l=!0,r.exports}o.m=e,o.c=t,o.d=function(e,t,d){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:d})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var d=Object.create(null);if(o.r(d),Object.defineProperty(d,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)o.d(d,r,function(t){return e[t]}.bind(null,r));return d},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="",o(o.s=0)}([function(e,t,o){"use strict";o.r(t);let d=0;let r=0;let n=0;let c=[],l=(()=>{let e=[],t=[],o=[];const c=t=>{let o=(e=>{let t=d;d++;let o=[];return{id:t,toDos:o,getId:()=>t,getTitle:()=>e,getToDos:()=>o,setTitle:t=>{e=t},addToDo:e=>{e.setProjectId(t),o.push(e)}}})(t);e.push(o)},l=(e,o,d,n)=>{let c=((e,t,o)=>{let d,n=r;r++;let c=[];return{id:n,projectId:d,notes:c,getId:()=>n,getProjectId:()=>d,getTitle:()=>e,getDescription:()=>t,getDueDate:()=>o,getChecked:()=>!1,getNotes:()=>c,addNote:e=>{e.setToDoId(n),c.push(e)},setProjectId:e=>{d=e},setTitle:t=>{e=t},setDescription:e=>{t=e}}})(o,d,n);c.setTitle("My ToDo-Id is "+c.getId()),t.push(c),e.addToDo(c)},a=(e,t)=>{let d=(e=>{let t,o=n;n++;return{id:o,toDoId:t,getId:()=>o,getToDoId:()=>t,getText:()=>e,setText:t=>{e=t},setToDoId:e=>{t=e}}})(t);o.push(d),e.addNote(d)};return{createSampleData:(t,o,d)=>{for(let e=0;e<t;e++)c("Project "+e);e.forEach(e=>{for(let t=0;t<o;t++)l(e,`ToDo number ${t}.`,"This is my random description","2020")}),e.forEach(e=>{e.getToDos().forEach(e=>{for(let t=0;t<d;t++)a(e,`This is the note number ${t}.`)})})},addProjectToProjects:c,getProjects:()=>e,getToDos:()=>t,getNotes:()=>o,findProject:t=>e.find(e=>e.getId()===Number(t)),findToDo:e=>t.find(t=>t.getId()===Number(e)),findNote:e=>o.find(t=>t.getId()===Number(e))}})();l.createSampleData(3,3,2),c=l.getProjects();let a=(()=>{const e=document.querySelector("#projects"),t=document.querySelector("#todos-view"),o=document.querySelector("#todo-view"),d=document.querySelector("#new-project-button"),r=document.querySelector("#new-project"),n=document.querySelector("#add-todo-form"),c=e=>{for(;e.firstChild;)e.removeChild(e.lastChild)},l=e=>{document.querySelectorAll(".todo-preview, .todo-preview-title, time").forEach(t=>{t.addEventListener("click",t=>{if(t.target!==t.currentTarget)return;c(o);let d=e.findToDo(t.target.dataset.todoId),r=a(d);o.appendChild(r)})})},a=e=>{let t=document.createElement("div");t.classList.add("todo");let o=u(e);o.classList.add("todo-header");let d=document.createElement("p");d.textContent=e.getDescription(),d.classList.add("description");let r=document.createElement("ul");return r.classList.add("notes"),e.getNotes().forEach(e=>{let t=document.createElement("li");t.textContent=e.getText(),r.appendChild(t)}),t.append(o,d,r),t},i=(e,d)=>{document.querySelectorAll(".project").forEach(r=>{r.addEventListener("click",r=>{c(t),c(o),c(n);let l=e.findProject(r.target.dataset.projectId);n.appendChild(s(l)),l.getToDos().forEach(e=>{let o=u(e);t.appendChild(o)}),d(e)})})},s=t=>{let o=document.createElement("p"),d=document.createElement("input");d.setAttribute("type","text"),d.setAttribute("name","todo-title"),d.setAttribute("id","todo-title");let r=document.createElement("label");r.textContent="Title",r.htmlFor="todo-title",o.append(r,d);let n=document.createElement("p"),c=document.createElement("input");c.setAttribute("type","text"),c.setAttribute("name","todo-description"),c.setAttribute("id","todo-description");let l=document.createElement("label");l.textContent="Description",l.htmlFor="todo-description",n.append(l,c);let a=document.createElement("p"),i=document.createElement("input");i.setAttribute("type","date"),i.setAttribute("name","todo-date"),i.setAttribute("id","todo-date");let s=document.createElement("label");s.textContent="Due date",s.htmlFor="todo-date",a.append(s,i);let u=document.createElement("select");u.id="projects-selector",u.setAttribute("name","projects-selector"),e.childNodes.forEach(e=>{let o=document.createElement("option");o.value=e.textContent,o.textContent=o.value,o.value===t.getTitle()&&o.setAttribute("selected",!0),u.appendChild(o)});let p=document.createElement("button");p.setAttribute("id","add-todo-button"),p.textContent="Add new todo";let m=document.createElement("div");return m.append(o,n,a,u,p),m},u=e=>{let t=document.createElement("div");t.classList.add("todo-preview"),t.dataset.todoId=e.getId();let o=document.createElement("h3");o.classList.add("todo-preview-title"),o.textContent=e.getTitle(),o.dataset.todoId=e.getId();let d=document.createElement("time");d.textContent=e.getDueDate(),d.dataset.todoId=e.getId();let r=document.createElement("button");r.classList.add("delete"),r.textContent="Delete";let n=document.createElement("input");return n.type="checkbox",n.classList.add("checkBox"),t.append(n,o,d,r),t},p=t=>{t.forEach(t=>{e.appendChild(m(t))})},m=e=>{const t=document.createElement("div"),o=document.createElement("h3");return o.textContent=e.getTitle(),o.classList.add("project"),o.dataset.projectId=e.getId(),t.classList.add("project-left"),t.appendChild(o),t};return{showProjects:p,addNewProject:t=>{d.addEventListener("click",o=>{t.addProjectToProjects(r.value),c(e),p(t.getProjects()),i(t,l)})},showToDosOfClickedProject:i,showToDo:l}})();a.showProjects(c),a.addNewProject(l),a.showToDosOfClickedProject(l,a.showToDo)}]);