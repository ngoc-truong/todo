const createDom = () => {
    const leftCol = document.querySelector("#left-col");
    const mainContent = document.querySelector("#main-content");

    const showClickedToDo = (dataManager) => {
        const lis = document.querySelectorAll(".to-do");
        lis.forEach( (li) => {
            li.addEventListener("click", (e) => {
                let toDo = dataManager.findToDo(Number(e.target.dataset.todoId));
                let container = createToDoView(toDo);
                clearMainContent();
                mainContent.appendChild(container);
            })
        })
    }

    const clearMainContent = () => {
        while (mainContent.firstChild) {
            mainContent.removeChild(mainContent.lastChild);
        }
    }

    const createToDoView = (toDo) => {
        let container   = document.createElement("div");
        let title       = document.createElement("h1");
        let description = document.createElement("p");
        let dueDate     = document.createElement("p");
        let checked     = document.createElement("p");
        let ul          = document.createElement("ul");

        container.classList.add("todo-view");
        title.textContent = toDo.getTitle();
        description.textContent = toDo.getDescription();
        dueDate.textContent = "Due date: " + toDo.getDueDate();
        checked.textContent = toDo.getChecked();
        toDo.getNotes().forEach( (note) => {
            let li = document.createElement("li");
            li.textContent = note.getText();
            ul.appendChild(li);
        }); 

        container.append(
            title, 
            description,
            dueDate,
            checked,
            ul);

        return container;
    }

    // Fill out left column
    const fillLeftColumn = (projects) => {
        projects.forEach( (project) => {
            leftCol.appendChild(createContainerForProject(project));
        })
    }

    const createContainerForProject = (project) => {
        const container = document.createElement("div");
        const title     = document.createElement("h1");
        const ul = createUlForToDos(project.getToDos());
        
        // Interesting question: Is it better to "getTitle()" here, or to add "projectTitle" as an argument?
        title.textContent = project.getTitle();         
        title.classList.add("title");
        container.classList.add("project-left");
        
        container.appendChild(title);
        container.appendChild(ul);
        return container;
    }

    const createUlForToDos = (toDos) => {
        const ul = document.createElement("ul");

        toDos.forEach( (toDo) => {
            let li = createLiForToDo(toDo);
            ul.appendChild(li);
        });

        return ul;
    }

    const createLiForToDo = (toDo) => {
        let li = document.createElement("li");
        li.classList.add("to-do");
        li.dataset.projectId = toDo.getProjectId();
        li.dataset.todoId = toDo.getId();
        li.textContent = toDo.getTitle();

        return li;
    };

    return { fillLeftColumn, showClickedToDo };
};

export { createDom };