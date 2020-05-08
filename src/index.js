import { createProject } from "./project";
import { createToDo } from "./todo";
import { createNote } from "./note";
import { createDom } from "./dom";
import { createDataManager } from "./data";


// Create sample data
let projects = [];

// Data
let myData = createDataManager();
myData.createSampleData(3, 3, 2);
projects = myData.getProjects();


// Dom

let myDom = createDom();
myDom.showProjects(projects);
myDom.addNewProject(myData);
myDom.showToDosOfClickedProject(myData, myDom.showToDo);