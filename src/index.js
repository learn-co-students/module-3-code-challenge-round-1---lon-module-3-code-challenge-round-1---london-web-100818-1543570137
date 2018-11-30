document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  //Define elements
  let imageId = 1520 //Enter the id from the fetched image here
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`

  const imageEl = document.querySelector("#image")
  const nameEl = document.querySelector("#name")
  const likesEl = document.querySelector("#likes")
  const likeButtonEl = document.querySelector("#like_button")
  const commentsFormEl = document.querySelector("#comment_form")
  const commentsListEl = document.querySelector("#comments")
  const commentInputEl = document.querySelector("#comment_input")

  //Fetch image from server
  const fetchImageFromServer = () =>
    fetch(imageURL)
    .then(response => response.json())
    .then(image => appendImageOntoPage(image))

  //Append image data onto page
  const appendImageOntoPage = (image) => {
    imageEl.src = image.url
    nameEl.innerText = image.name
    likesEl.innerText = image.like_count
    image.comments.forEach(comment => {
      li = document.createElement("li")
      li.innerText = comment.content
      commentsListEl.appendChild(li)
    })
  }

  //Add like button event listener
  likeButtonEl.addEventListener("click", event => {
    let likesCount = parseInt(likesEl.innerText)
    likesCount += 1
    likesEl.innerText = parseInt(likesCount)
    updateLikeOnServer()
  })

  //Update like on server
  const updateLikeOnServer = () =>
    fetch(likeURL, {
      method: "POST",
      headers: {'Accept': 'application/json','Content-Type': 'application/json'},
      body: JSON.stringify({image_id: imageId})
    })

  //Add event listener onto comments form
  commentsFormEl.addEventListener("submit", event => {
    event.preventDefault()
    let newComment = document.createElement("li")
    newComment.innerText = commentInputEl.value
    commentsListEl.appendChild(newComment)
    commentsFormEl.reset()
    updateCommentsOnServer(newComment.innerText)
  })

  //Update comments onto server
  const updateCommentsOnServer = (comment) =>
   fetch(commentsURL, {
     method: "POST",
     headers: {'Accept': 'application/json','Content-Type': 'application/json'},
     body: JSON.stringify({image_id: imageId, content: comment})
  })

  fetchImageFromServer()

})
