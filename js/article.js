const overlay = document.querySelector(".overlay")
const idEl = document.querySelector("#id")
const articleContainer = document.querySelector(".article-container")


const query = window.location.search
const id = query.slice(1)

idEl.textContent = id
const api = `http://localhost:3000/articles/${id}`
const request = new XMLHttpRequest()

request.addEventListener("readystatechange", (e) => {
   if (request.readyState == 4 && request.status == 200) {
      const data = JSON.parse(request.responseText)
      updateUI(data)
      overlay.classList.add("hide")
   } else if (request.readyState == 4) {
      console.log("Error")
      overlay.classList.add("hide")
   } else {
      overlay.classList.remove("hide")
   }
})

request.open("get", api)
request.send()

function updateUI(data) {
   articleContainer.innerHTML = `
   <div class="card">
   <img src="${data.image}" alt="" width="100">
            <h3>${data.title}</h3>
            <p class="card__description">
               ${data.body}
            </p>
            <h5 class="card__author">Author: ${data.author}</h5>
         </div>
   `
}
