const overlay = document.querySelector(".overlay")
const idEl = document.querySelector("#id")
const articleContainer = document.querySelector(".article-container")
const header = document.querySelector("h1")


const query = window.location.search
const id = query.slice(1)

idEl.textContent = id
const api = `data/db.json`


const getData = async (resource) => {
   overlay.classList.remove("hide")
   const request = await fetch(resource)

   if (request.status >= 500) {
      overlay.classList.add("hide")
      throw new Error("Serverda xatolik bor!!!")
   } else if (request.status >= 400) {
      overlay.classList.add("hide")
      throw new Error("Page not found :(")
   }

   const data = await request.json()
   overlay.classList.add("hide")
   return data
}

getData(api)
   .then(data => updateUI(data))
   .catch(err => header.innerHTML = (err.message))


function updateUI(obj) {
   const data = obj.articles[id - 1]
   articleContainer.innerHTML = `
   <div class="card">
   <img src="${data.image}" alt="" width="100">
            <h3>${data.title}</h3>
            <p class="card__description">
               ${data.body}
            </p>
            <h5 class="card__author">Author: ${data.author}</h5>
            <a href="../index.html">Home</a>
         </div>
   `
}
