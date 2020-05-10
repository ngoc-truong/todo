const createDom = () => {
    const projectsView      = document.querySelector("#projects");
    const toDosView         = document.querySelector("#todos-view");
    const toDoView          = document.querySelector("#todo-view");
    const newProjectButton  = document.querySelector("#new-project-button");
    const newProjectInput   = document.querySelector("#new-project-input");
    const addToDoForm       = document.querySelector("#add-todo-form");
    const deleteSymbol      = "🗑";
    const addSymbol         = "+";

    // General methods
    const resetView = (view) => {
        while(view.firstChild) {
            view.removeChild(view.lastChild);
        }
    }

    // Check/Uncheck a todo
    const checkToDo = (dataManager) => {
        const checkBoxes = document.querySelectorAll("input[type=checkbox]");

        checkBoxes.forEach( (checkbox) => {
            checkbox.addEventListener("change", (e) => {
                toggleCheckClass(checkbox);
                const toDo = dataManager.findToDo(checkbox.dataset.todoId);
                toDo.toggleCheck();
            })
        })
    }

    const toggleCheckClass = (checkbox) => {
        if (checkbox.classList.contains("unchecked")){
            checkbox.classList.add("checked");
            checkbox.classList.remove("unchecked");

            checkbox.parentNode.classList.add("checked");
            checkbox.parentNode.classList.remove("unchecked");
        } else {
            checkbox.classList.add("unchecked");
            checkbox.classList.remove("checked");

            checkbox.parentNode.classList.add("unchecked");
            checkbox.parentNode.classList.remove("checked");
        }
    }

    /**** Populate a todo view ****/ 
    const refreshToDo = (toDo, dataManager) => {
        resetView(toDoView);
        let containerForm = createContainerForNoteForm(toDo);
        let containerToDo = createContainerForToDo(toDo);
        toDoView.append(containerForm, containerToDo);
        addNewNote(dataManager);
        deleteNote(dataManager);
    }

    // CRUD methods
    const addNewNote = (dataManager) => {
        const addNewNoteButton = document.querySelector("#add-note-button");
        const noteInput        = document.querySelector("#note-text");

        addNewNoteButton.addEventListener("click", (e) => {
            let text = noteInput.value;
            let toDo = dataManager.findToDo(noteInput.dataset.todoId);
            dataManager.addNoteToToDo(toDo, text);
            refreshToDo(toDo, dataManager);
        })
    }

    const deleteNote = (dataManager) => {
        let buttons = document.querySelectorAll(".delete-note");

        buttons.forEach( (button) => {
            button.addEventListener("click", (e) => {
                let note = dataManager.findNote(button.dataset.noteId);
                let toDo = dataManager.findToDo(note.getToDoId());
                dataManager.deleteNote(note);
                refreshToDo(toDo, dataManager);
            })
        })
    }

    const showToDoOfClickedToDo = (dataManager) => {
        const toDosDom = document.querySelectorAll(".todo-preview, .todo-preview-title, time");

        toDosDom.forEach( (toDoDom) => {
            toDoDom.addEventListener("click", (e) => {;
                if(e.target !== e.currentTarget) return;
                let toDo = dataManager.findToDo(e.target.dataset.todoId);
                refreshToDo(toDo, dataManager);
            })
        })
    }

    const createContainerForNoteForm = (toDo) => {
        let container = document.createElement("div");
        container.classList.add("add-form");

        // Note-text input field
        let noteInput  = document.createElement("input");
        noteInput.setAttribute("type", "text");
        noteInput.setAttribute("name", "note-text");
        noteInput.setAttribute("id", "note-text");
        noteInput.classList.add("new-input");
        noteInput.dataset.todoId = toDo.getId();

        let noteLabel = document.createElement("label");
        noteLabel.textContent = "New Note";
        noteLabel.htmlFor = "note-text";
        noteLabel.classList.add("new-label");


        // Submit button
        let submit = document.createElement("button");
        submit.setAttribute("id", "add-note-button");
        submit.classList.add("new-button");
        submit.textContent = addSymbol;

        container.append(noteLabel, noteInput, submit);
        return container;
    }

    const createContainerForToDo = (toDo) => {
        let container = document.createElement("div");
        container.classList.add("todo");

        let div = document.createElement("div");
        div.classList.add("todo-header");
        div.dataset.todoId = toDo.getId();

        let title = document.createElement("h3");
        title.classList.add("todo-preview-title");
        title.classList.add("todo-title");
        title.textContent = toDo.getTitle();
        title.dataset.todoId = toDo.getId();

        let dueTo = document.createElement("time");
        dueTo.textContent = toDo.getDueDate();    
        dueTo.dataset.todoId = toDo.getId();
        
        let description = document.createElement("p");
        description.textContent = toDo.getDescription();
        description.classList.add("description");

        let ul = document.createElement("ul");
        ul.classList.add("notes");

        toDo.getNotes().forEach( (note) => {
            let li = document.createElement("li");
            li.textContent = note.getText();
            li.dataset.noteId = note.getId();

            let button = document.createElement("button");
            button.textContent = deleteSymbol;
            button.classList.add("delete-note");
            button.dataset.noteId = note.getId();

            ul.append(li, button);
        })

        div.append(title, dueTo);
        container.append(div, description, ul);
        return container;
    }


    /****  Populate a project's todos preview ****/

    // Refresh methods
    const refreshToDos = (project, dataManager) => {
        resetView(addToDoForm);
        // Create new ToDo-Form and let button listen
        addToDoForm.appendChild(createContainerForToDoForm(project));
        addNewToDo(dataManager);

        // Set listeners
        refreshToDosWithoutAdd(project, dataManager);
    };

    const refreshToDosWithoutAdd = (project, dataManager) => {
        resetView(toDosView);
        resetView(toDoView);
        
        showPreviewsOfToDos(project);
        showToDoOfClickedToDo(dataManager);
        checkToDo(dataManager);
        deleteToDo(dataManager);
    };

    // Manipulating methods
    const deleteToDo = (dataManager) => {
        let buttons = document.querySelectorAll(".delete");

        buttons.forEach( (button) => {
            button.addEventListener("click", (e) => {
                console.log("moin");
                let toDo = dataManager.findToDo(button.dataset.todoId);
                let project = dataManager.findProject(toDo.getProjectId());
                dataManager.deleteToDo(toDo);
                refreshToDosWithoutAdd(project, dataManager);
            })
        })
    }

    const addNewToDo = (dataManager) => {
        const addToDoButton     = document.querySelector("#add-todo-button");
        const titleInput        = document.querySelector("#todo-title");
        const descriptionInput  = document.querySelector("#todo-description");
        const dueDateInput      = document.querySelector("#todo-date");
        const projectsInput     = document.querySelector("#projects-selector");

        addToDoButton.addEventListener("click", (e) => {
            const title = titleInput.value;
            const description = descriptionInput.value;
            const dueDate = dueDateInput.value;
            const projectId = projectsInput.options[projectsInput.selectedIndex].dataset.projectId;
            const project = dataManager.findProject(projectId);

            dataManager.addToDoToProject(project, title, description, dueDate);
            refreshToDosWithoutAdd(project, dataManager);
        })
    }

    const showPreviewsOfToDos = (project) => {
        project.getToDos().forEach( (toDo) => {
            let container = createContainerForToDoListItem(toDo);
            toDosView.appendChild(container);
        })
    }

    // Dom creation
    const createContainerForToDoForm = (project) => {
        // ToDo-Title input field
        let titleP = document.createElement("p");
        titleP.classList.add("input-field");
        let titleInput = document.createElement("input");
        titleInput.setAttribute("type", "text");
        titleInput.setAttribute("name", "todo-title");
        titleInput.setAttribute("id", "todo-title");
        let titleLabel = document.createElement("label");
        titleLabel.textContent = "Title";
        titleLabel.htmlFor = "todo-title";
        titleP.append(titleLabel, titleInput);
        
        // ToDo-Description input field
        let descriptionP = document.createElement("p");
        descriptionP.classList.add("input-field");
        let descriptionInput = document.createElement("input");
        descriptionInput.setAttribute("type", "textarea");
        descriptionInput.setAttribute("name", "todo-description");
        descriptionInput.setAttribute("id", "todo-description");
        let descriptionLabel = document.createElement("label");
        descriptionLabel.textContent = "Description";
        descriptionLabel.htmlFor = "todo-description";
        descriptionP.append(descriptionLabel, descriptionInput);

        // ToDo-DueDate input field
        let dateP = document.createElement("p");
        dateP.classList.add("input-field");
        let dateInput = document.createElement("input");
        dateInput.setAttribute("type", "date");
        dateInput.setAttribute("name", "todo-date");
        dateInput.setAttribute("id", "todo-date");
        let dateLabel = document.createElement("label");
        dateLabel.textContent = "Due Date";
        dateLabel.htmlFor = "todo-date";
        dateP.append(dateLabel, dateInput);

        // ToDo-Project input field
        let projectSelectorP = document.createElement("p");
        projectSelectorP.classList.add("input-field");
        let projectLabel = document.createElement("label");
        projectLabel.textContent = "Project";
        projectLabel.htmlFor = "projects-selector";
        let projectsSelector = document.createElement("select")
        projectsSelector.id = "projects-selector";
        projectsSelector.setAttribute("name", "projects-selector");
        projectsView.childNodes.forEach( (node) => { 
            if (node.firstChild !== null) {
                let option = document.createElement("option");
                option.value = node.firstChild.textContent;
                option.dataset.projectId = node.firstChild.dataset.projectId;
                option.textContent = option.value;

                if (option.value === project.getTitle()) {
                    option.setAttribute("selected", true);
                }

                projectsSelector.appendChild(option);
            }
        })
        projectSelectorP.append(projectLabel, projectsSelector);

        // Submit button
        let submit = document.createElement("button");
        submit.setAttribute("id", "add-todo-button");
        submit.textContent = "New todo";

        // Container
        let container = document.createElement("div");
        container.append(titleP, descriptionP, dateP, projectSelectorP, submit);

        return container;
    }

    const createContainerForToDoListItem = (toDo) => {
        let div = document.createElement("div");
        div.classList.add("todo-preview");
        div.dataset.todoId = toDo.getId();

        let title = document.createElement("h3");
        title.classList.add("todo-preview-title");
        title.textContent = toDo.getTitle();
        title.dataset.todoId = toDo.getId();

        let dueTo = document.createElement("time");
        dueTo.textContent = toDo.getDueDate();    
        dueTo.dataset.todoId = toDo.getId();
        
        let button = document.createElement("button");
        button.classList.add("delete");
        button.dataset.todoId = toDo.getId();
        button.textContent = deleteSymbol;

        let checkBox = document.createElement("input");
        checkBox.type = "checkbox";
        checkBox.dataset.todoId = toDo.getId();
        checkBox.classList.add("checkBox");
        checkBox.classList.add("unchecked");

        div.append(checkBox, title, dueTo, button);
        return div;
    }


    /****  Populate projects view ****/

    // Adding new project
    const refreshProjectsView = (dataManager) => {
        refreshWithoutAdd(dataManager);
        // Bug: Should not be called after add and delete? But why?
        addNewProject(dataManager);
    }

    const refreshWithoutAdd = (dataManager) => {
        resetView(projectsView);
        showProjects(dataManager.getProjects());
        deleteProject(dataManager);
        showToDosOfClickedProject(dataManager, showToDoOfClickedToDo);
    }

    const showProjects = (projects) => {
        projects.forEach( (project) => {
            projectsView.appendChild(createContainerForProject(project));
        })
    }

    const showToDosOfClickedProject = (dataManager) => {
        const projectsDom = document.querySelectorAll(".project");

        projectsDom.forEach ( (projectDom) => {
            projectDom.addEventListener("click", (e) => {
                let project = dataManager.findProject(e.target.dataset.projectId);
                refreshToDos(project, dataManager);
            });
        });
    };

    const addNewProject = (dataManager) => {
        newProjectButton.addEventListener("click", (e) => {
            dataManager.addProjectToProjects(newProjectInput.value);
            refreshWithoutAdd(dataManager);
        })
    }

    const deleteProject = (dataManager) => {
        const buttons = document.querySelectorAll(".delete-project");

        buttons.forEach((button) => {
            button.addEventListener("click", (e) => {
                let project = dataManager.findProject(button.dataset.projectId);
                dataManager.deleteProject(project);
                refreshWithoutAdd(dataManager);
            })
        })
    }

    const createContainerForProject = (project) => {
        const container     = document.createElement("div");
        const title         = document.createElement("h3");
        const deleteButton  = document.createElement("button");
        
        title.textContent = project.getTitle();         
        title.classList.add("project");
        title.dataset.projectId = project.getId();

        deleteButton.textContent = deleteSymbol;
        deleteButton.classList.add("delete-project");
        deleteButton.dataset.projectId = project.getId();

        container.classList.add("project-left");
        
        container.append(title, deleteButton);
        return container;
    }

    return {    showProjects, 
                addNewProject, 
                refreshProjectsView,
                showToDosOfClickedProject, 
                showToDoOfClickedToDo };
};

export { createDom };