const add = document.getElementById("add-button")
const input = document.getElementById("input-value");
const mystuff = document.getElementById("textchange")
const check = document.getElementById("checkmark")
const ul = document.getElementById("ul")
const now = new Date()
const date = now.getDate()
const month = now.getMonth() + 1;
const hours = now.getHours()
const minutes = now.getMinutes()
const year = now.getFullYear()
let currentDate = `${date}/${month}/${year} ${hours}:${minutes}`
let li = ""
let counter = 0

add.addEventListener("click", function() { //! Ekle tuşuna tıklama yapar
    if(input.value.trim() === ""){
      alert("You can't do that! Write something...")
      return;
    }else{
        counter++;
        mystuff.innerHTML = "MY LIST"
        li = document.createElement("li")
        ul.appendChild(li);
        li.innerHTML = `<button class='checkmark'><i class="fa-regular fa-square"></i></i></button>` + `<p>${input.value}</p>` + `<br><span>Created Date:</span> <b id="created-date">${currentDate} </b>` + `<button class='li'><i class='fas fa-trash-alt'></i></button>`
        input.value = ""
        input.focus();
      };

    })

    ul.addEventListener("click", function(event){
        if (event.target.classList.contains('fa-regular')){
            event.target.parentElement.parentElement.querySelector("p").classList.toggle("lined")
            event.stopPropagation();
            event.target.classList.replace('fa-regular', 'fa-solid');
            event.target.classList.replace('fa-square', 'fa-square-check');
            li.classList.add("green")
        }
        else if (event.target.classList.contains('fa-solid')){
            event.target.parentElement.parentElement.querySelector("p").classList.toggle("lined")
            event.stopPropagation();
            event.target.classList.replace('fa-solid', 'fa-regular');
            event.target.classList.replace('fa-square-check', 'fa-square');
        }
    } )

    ul.addEventListener("click", function(e){
        if (e.target.className == "fas fa-trash-alt"){
            e.target.parentElement.parentElement.remove();
            e.stopPropagation();
            counter--;
            if (counter == 0) {
                mystuff.innerHTML = ""
            }
        }
    } )

    window.addEventListener('keyup', (e) => {
    e.code === 'Enter' && add.click()
})