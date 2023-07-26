const overlay = document.querySelector(".overlay")
const articleList = document.querySelector(".article-list")
const articleContainer = document.querySelector(".article-container")

const api = 'http://localhost:3000/articles'
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
   const ul = document.createElement("ul")
   const docFrag = document.createDocumentFragment()
   data.forEach((article => {
      const li = document.createElement("li")
      li.classList.add("card")
      li.innerHTML = `
      <h3>Title: ${article.title}</h3>
      <br>
      <p>Author: ${article.author}</p>
      <br>
      <br>
      <a href="./article.html?${article.id}">Read More</a>
      `
      ul.append(li)
      docFrag.append(ul)
   }))
   articleContainer.append(docFrag)

}