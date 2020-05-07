import { createProject } from "./project";
import { createToDo } from "./todo";
import { createNote } from "./note";

const createDataManager = () => {
    let projects = [];
    let toDos = [];
    let notes = [];

    // Getter
    const getProjects = () => projects;
    const getToDos = () => toDos;
    const getNotes = () => notes;

    // Find data
    const findProject = (projectId) => {
        let foundProject = projects.find( project => project.getId() === Number(projectId) );
        return foundProject;
    };

    const findToDo = (toDoId) => {
        let foundToDo = toDos.find( toDo => toDo.getId() === Number(toDoId) );
        return foundToDo;
    }

    const findNote = (noteId) => {
        let foundNote = notes.find( note => note.getId() === Number(noteId) );
        return foundNote;
    }

    // Create data
    const createSampleData = (numOfProjects, numOfToDos, numOfNotes) => {
        for (let i = 0; i < numOfProjects; i++) {
            addNewProjectToProjects();
        }

        projects.forEach( (project) => {
            for (let i = 0; i < numOfToDos; i++) {
                addOneToDoTo(project);
            }
        })

        projects.forEach ( (project) => {
            project.getToDos().forEach( (toDo) => {
                for (let i = 0; i < numOfNotes; i++) {
                    addOneNoteTo(toDo);
                }
            })
        })
    }

    const addNewProjectToProjects = () => {
            let myProject = createProject("", "");
            myProject.setTitle(`Projectname ${myProject.getId()}`);
            myProject.setDescription(`Beschreibung meines Projektes ${myProject.getId()}`);
            projects.push(myProject);
    }

    const addOneToDoTo = (project) => {
        let toDo = createToDo("", "", `10-2020`);
        toDo.setTitle(`ToDo ${toDo.getId()} in project ${project.getId()}`)
        toDo.setDescription(`This is my toDo number ${toDo.getId()} in my project ${project.getId()}: ${project.getTitle()}`);
        toDos.push(toDo);
        project.addToDo(toDo);
    }

    const addOneNoteTo = (toDo) => {
        let note = createNote("");
        note.setText(`This is my note number ${note.getId()} for my todo ${toDo.getId()}`);
        notes.push(note);
        toDo.addNote(note);
    }

    return {    createSampleData,   
                getProjects,
                getToDos,
                getNotes,
                findProject,
                findToDo,
                findNote 
            };
};

export { createDataManager };
