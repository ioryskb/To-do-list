const formEl = document.querySelector(".form");
const inputEl = document.querySelector(".input");
const ulEl = document.querySelector(".list"); 

let list = JSON.parse(localStorage.getItem("list"))

list.forEach(task=>{
    toDoList(task)
})

formEl.addEventListener("submit", (event)=>{
    event.preventDefault(); //Prevents the browser from refreshing
    toDoList();
    
});

function toDoList(task){
    let newTask = inputEl.value;
    if(task){
        newTask = task.name
    }

   

    const liEl = document.createElement("li"); // Creates a new li HTML element
     if(task && task.checked){
         liEl.classList.add("checked");
    }
    liEl.innerText = newTask; // Adds the text in the input field into the newly created li HTML element

    ulEl.appendChild(liEl) // Adds the newly created li HTML element within the ul HTML element
    inputEl.value = "" // Clears the texts in the input field after submission (or when Enter is pressed)

    const checkBtnEl = document.createElement("div") // A constant variable that creates a new div HTML element
    checkBtnEl.innerHTML = `<i class="fa-solid fa-square-check">` // Adds the check icon in the newly created div section that has the new li HTML element
    liEl.appendChild(checkBtnEl)

    const trashBtnEl = document.createElement("div") // Creates a new div HTML element
    trashBtnEl.innerHTML = `<i class="fa-solid fa-trash">` // Adds the trash can icon into the div element
    liEl.appendChild(trashBtnEl ); // Adds the trashBtnEL which contains the trash icon into the list element

    checkBtnEl.addEventListener("click", ()=>{
        liEl.classList.toggle("checked");
        updateLocalStorage();
    });

    trashBtnEl.addEventListener("click",()=>{
        liEl.remove();
        updateLocalStorage();
    });
    updateLocalStorage()
}

function updateLocalStorage(){
    const liEls = document.querySelectorAll("li")
    list = []
    liEls.forEach(liEl=>{
        list.push({
            name: liEl.innerText,
            checked: liEl.classList.contains("checked")
        })
    })
    localStorage.setItem("list", JSON.stringify(list))
}