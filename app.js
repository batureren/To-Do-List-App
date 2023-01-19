//!variables
const add = document.getElementById("add-button")
const input = document.getElementById("input-value");
const mystuff = document.getElementById("textchange")
const check = document.getElementById("checkmark")
const ul = document.getElementById("ul")
const h2 = document.querySelector("h2")
const now = new Date()
const date = now.getDate()
const month = now.getMonth() + 1;
const hours = (now.getHours() < 10 ? '0' : '') + now.getHours();
const minutes = (now.getMinutes() < 10 ? '0' : '') + now.getMinutes();
const year = now.getFullYear()
let currentDate = `${date}/${month}/${year} ${hours}:${minutes}`
let li = ""
let counter = 0
let totaltask = 0

//!text bölgesini uzatma ve submit edildiğinde geri küçültme
const text = document.getElementsByTagName("textarea");
for (let i = 0; i < text.length; i++) {
    text[i].setAttribute("style", "height:25px;overflow-y:hidden;");
    text[i].addEventListener("input", OnInput, false);
    text[i].addEventListener("submit", resetHeight);
    text[i].addEventListener("blur", resetHeight);
}

function OnInput() {
  this.style.height = 0;
  this.style.height = (this.scrollHeight) + "px";
}

function resetHeight() {
  this.style.height = "25px";
}

//!localstorage
if (localStorage.getItem("toDoList")) {
    ul.innerHTML = localStorage.getItem("toDoList")
    counter = ul.children.length
    mystuff.innerHTML = "📖 MY LIST 📖"
    totaltask = localStorage.getItem("taskCount");
    h2.innerHTML = `${totaltask} / 30`;
  }

//! Ekle tuşuna tıklama yapar
add.addEventListener("click", function() { 
    if(input.value.trim() === ""){
      alert("You can't do that! Write something...")
      return;
    }
    //!total task 30 olursa
    else if (totaltask >= 30) {
        alert("You have reached the maximum task limit! Clear some.")
        return;
    }else{
        counter++;
        totaltask++;
        h2.innerHTML = `${totaltask} / 30`
        mystuff.innerHTML = "📖 MY LIST 📖"
        li = document.createElement("li")
        ul.appendChild(li);
        $('li').addClass('show')
        li.innerHTML = `<button class='checkmark'><i class="fa-regular fa-square"></i></i></button>` + `<p>${input.value}</p>` + `<br><span>Created Date:</span> <b id="created-date">${currentDate} </b>` + `<button class='li'><i class='fas fa-trash-alt'></i></button>`
        input.value = ""
        input.focus();
        localStorage.setItem("toDoList", ul.innerHTML)
        localStorage.setItem("taskCount", totaltask)
      };
 })

 //!çekmark tıklandığında
    ul.addEventListener("click", function(event){
        if (event.target.classList.contains('fa-regular')){
            event.target.parentElement.parentElement.querySelector("p").classList.toggle("lined")
            event.stopPropagation();
            event.target.classList.replace('fa-regular', 'fa-solid');
            event.target.classList.replace('fa-square', 'fa-square-check');
            localStorage.setItem("toDoList", ul.innerHTML)
        }
        else if (event.target.classList.contains('fa-solid')){
            event.target.parentElement.parentElement.querySelector("p").classList.toggle("lined")
            event.stopPropagation();
            event.target.classList.replace('fa-solid', 'fa-regular');
            event.target.classList.replace('fa-square-check', 'fa-square');
            localStorage.setItem("toDoList", ul.innerHTML)
        }
    } )
//!çöp ikonu tıklandığında
    ul.addEventListener("click", function(e){
        if (e.target.className == "fas fa-trash-alt"){
            e.target.parentElement.parentElement.remove();
            e.stopPropagation();
            counter--;
            totaltask--;
            h2.innerHTML = `${totaltask} / 30`
            if (counter == 0) {
                mystuff.innerHTML = ""
                
            }
            localStorage.setItem("toDoList", ul.innerHTML)
            localStorage.setItem("taskCount", totaltask)
        }
    } )
//!enter tuşu basıldığında gönder
    window.addEventListener('keyup', (e) => {
    e.code === 'Enter' && add.click()
})