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
            addProjectToProjects("Project " + i);
        }

        projects.forEach( (project) => {
            for (let i = 0; i < numOfToDos; i++) {
                addToDoToProject(project, `ToDo number ${i}.`, `This is my random description`, '2020');
            }
        })

        projects.forEach ( (project) => {
            project.getToDos().forEach( (toDo) => {
                for (let i = 0; i < numOfNotes; i++) {
                    addNoteToToDo(toDo, `This is the note number ${i}.`);
                }
            })
        })
    }

    const addProjectToProjects = (projectTitle) => {
        let myProject = createProject(projectTitle);
        projects.push(myProject);
    }

    const addToDoToProject = (project, title, description, dueDate) => {
        let toDo = createToDo(title, description, dueDate);
        //toDo.setTitle("My ToDo-Id is " + toDo.getId());
        toDos.push(toDo);
        project.addToDo(toDo);
    }

    const addNoteToToDo = (toDo, text) => {
        let note = createNote(text);
        notes.push(note);
        toDo.addNote(note);
    }

    const deleteProject = (project) => {
        let index = projects.indexOf(project);
        projects.splice(index, 1);
    }

    const deleteToDo = (toDo) => {
        // Delete in toDos
        let index = toDos.indexOf(toDo);
        toDos.splice(index, 1);
        
        // Delete in Projects
        let project = findProject(toDo.getProjectId());
        let indexInProjects = project.getToDos().indexOf(toDo);
        project.getToDos().splice(indexInProjects, 1);
    }

    const deleteNote = (note) => {
        // Delete in notes
        let index = notes.indexOf(note);
        notes.splice(index, 1);

        // Delete in ToDos
        let toDo = findToDo(note.getToDoId());
        let indexInToDos = toDo.getNotes().indexOf(note);
        toDo.getNotes().splice(indexInToDos, 1);
    }

    return {    createSampleData,   
                addProjectToProjects,
                addToDoToProject,
                addNoteToToDo, 
                deleteProject,
                deleteToDo,
                deleteNote, 
                getProjects,
                getToDos,
                getNotes,
                findProject,
                findToDo,
                findNote 
            };
};

export { createDataManager };
