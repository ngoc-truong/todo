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
myDom.fillLeftColumn(projects);
myDom.showClickedToDo(myData);


/*

// High-level methods (better in database.js?)
const printAllProjects = (projects) => {
    projects.forEach( (project) => {
        printProject(project);
    })
};

const printProject = (project) => {
    console.log("" + project.getTitle());
    project.getToDos().forEach( (toDo) => {
        console.log("- " + toDo.getTitle());

        toDo.getNotes().forEach ( (note) => {
            console.log(`-- ${note.getText()}`);
        })
    })
};  


const findProject = (projects, projectId) => {
    let foundProject = projects.find( project => project.getId() === Number(projectId) );
    return foundProject;
};

const findToDo = (projects, projectId, toDoId) => {
    let foundProject = findProject(projects, projectId);
    let foundToDo = foundProject.getToDos().find( toDo => toDo.getId() === Number(toDoId) );
    return foundToDo;
};


*/