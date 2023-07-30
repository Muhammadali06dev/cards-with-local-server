const overlay = document.querySelector(".overlay")
const articleList = document.querySelector(".article-list")
const articleContainer = document.querySelector(".article-container")


const getData = async () => {
   overlay.classList.remove('hide')
   const req = await fetch('data/db.json')

   if (req.status >= 500) {
      throw Error("Server bilan bog'liq xatolik :(")
   } else if (req.status >= 400) {
      overlay.classList.add('hide')
      throw Error("Page not found :(")
   }

   const data = await req.json()
   overlay.classList.add("hide")
   return data

}

getData().then(data => {
   updateUI(data.articles)
}).catch(err => {
   console.log(err.message)
})


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