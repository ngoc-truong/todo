const createDom = () => {
    const projectsView      = document.querySelector("#projects");
    const toDosView         = document.querySelector("#todos-view");
    const toDoView          = document.querySelector("#todo-view");
    const newProjectButton  = document.querySelector("#new-project-button");
    const newProjectInput   = document.querySelector("#new-project");
    const addToDoForm       = document.querySelector("#add-todo-form");

    // General methods
    const resetView = (view) => {
        while(view.firstChild) {
            view.removeChild(view.lastChild);
        }
    }



    // Populate a todo view
    const showToDo = (dataManager) => {
        const toDosDom = document.querySelectorAll(".todo-preview, .todo-preview-title, time");

        toDosDom.forEach( (toDoDom) => {
            toDoDom.addEventListener("click", (e) => {;
                if(e.target !== e.currentTarget) return;

                resetView(toDoView);
                let toDo = dataManager.findToDo(e.target.dataset.todoId);
                let container = createContainerForToDo(toDo);
                toDoView.appendChild(container);
            })
        })
    }

    const createContainerForToDo = (toDo) => {
        let container = document.createElement("div");
        container.classList.add("todo");
        let div = createContainerForToDoListItem(toDo);
        div.classList.add("todo-header");

        let description = document.createElement("p");
        description.textContent = toDo.getDescription();
        description.classList.add("description");

        let ul = document.createElement("ul");
        ul.classList.add("notes");

        toDo.getNotes().forEach( (note) => {
            let li = document.createElement("li");
            li.textContent = note.getText();
            ul.appendChild(li);
        })

        container.append(div, description, ul);
        return container;
    }


    // Populate a project's todos preview
    const showToDosOfClickedProject = (dataManager, callback) => {
        const projectsDom = document.querySelectorAll(".project");

        projectsDom.forEach ( (projectDom) => {
            projectDom.addEventListener("click", (e) => {
                resetView(toDosView);
                resetView(toDoView);
                resetView(addToDoForm);

                let project = dataManager.findProject(e.target.dataset.projectId);

                addToDoForm.appendChild(createContainerForToDoForm(project));

                project.getToDos().forEach( (toDo) => {
                    let container = createContainerForToDoListItem(toDo);
                    toDosView.appendChild(container);
                })
                callback(dataManager);
            });
        });
    };

    const createContainerForToDoForm = (project) => {
        // ToDo-Title input field
        let titleP = document.createElement("p");
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
        let descriptionInput = document.createElement("input");
        descriptionInput.setAttribute("type", "text");
        descriptionInput.setAttribute("name", "todo-description");
        descriptionInput.setAttribute("id", "todo-description");

        let descriptionLabel = document.createElement("label");
        descriptionLabel.textContent = "Description";
        descriptionLabel.htmlFor = "todo-description";

        descriptionP.append(descriptionLabel, descriptionInput);


        // ToDo-DueDate input field
        let dateP = document.createElement("p");
        let dateInput = document.createElement("input");
        dateInput.setAttribute("type", "date");
        dateInput.setAttribute("name", "todo-date");
        dateInput.setAttribute("id", "todo-date");

        let dateLabel = document.createElement("label");
        dateLabel.textContent = "Due date";
        dateLabel.htmlFor = "todo-date";

        dateP.append(dateLabel, dateInput);

        // ToDo-Project input field
        let projectsSelector = document.createElement("select")
        projectsSelector.id = "projects-selector";
        projectsSelector.setAttribute("name", "projects-selector");

        projectsView.childNodes.forEach( (node) => {
            let option = document.createElement("option");
            option.value = node.textContent;
            option.textContent = option.value;
            if (option.value === project.getTitle()) {
                option.setAttribute("selected", true);
            }
            projectsSelector.appendChild(option);
        })

        // Submit button
        let submit = document.createElement("button");
        submit.setAttribute("id", "add-todo-button");
        submit.textContent = "Add new todo";

        // Container
        let container = document.createElement("div");
        container.append(titleP, descriptionP, dateP, projectsSelector, submit);

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
        button.textContent = "Delete";

        let checkBox        = document.createElement("input");
        checkBox.type       = "checkbox";
        checkBox.classList.add("checkBox");

        div.append(checkBox, title, dueTo, button);
        return div;
    }

    // Populate projects view

    // Adding new project
    const addNewProject = (dataManager) => {
        newProjectButton.addEventListener("click", (e) => {
            dataManager.addProjectToProjects(newProjectInput.value);
            resetView(projectsView);
            showProjects(dataManager.getProjects());
            showToDosOfClickedProject(dataManager, showToDo);
        })
    }


    const showProjects = (projects) => {
        projects.forEach( (project) => {
            projectsView.appendChild(createContainerForProject(project));
        })
    }

    const createContainerForProject = (project) => {
        const container = document.createElement("div");
        const title     = document.createElement("h3");
        
        title.textContent = project.getTitle();         
        title.classList.add("project");
        title.dataset.projectId = project.getId();
        container.classList.add("project-left");
        
        container.appendChild(title);
        return container;
    }

    return { showProjects, addNewProject, showToDosOfClickedProject, showToDo };
};

export { createDom };