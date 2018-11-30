imagesAPI = new API('https://randopic.herokuapp.com', 'images')
likesAPI = new API('https://randopic.herokuapp.com', 'likes')
commentsAPI = new API('https://randopic.herokuapp.com', 'comments')

let imageId = 1525


// ***IMAGE CARD***
const imageCard = document.querySelector('#image_card')
const imageTag = imageCard.querySelector('img')
const imageTitle = imageCard.querySelector('#name')
// ***LIKES***
const imageLikes = imageCard.querySelector('#likes')
const likeBtn = imageCard.querySelector('#like_button')
// ***COMMENTS***
const commentForm = imageCard.querySelector('#comment_form')
const commentInput = commentForm.querySelector('#comment_input')
const commentList = imageCard.querySelector('#comments')

const renderImageCard = image => {
  imageTag.src = image.url
  imageTitle.innerText = image.name
  imageLikes.innerText = image.like_count
  likeBtn.addEventListener('click', event => updateLikesAndRender(event, image))
  renderCommentList(image.comments)
  commentForm.addEventListener('submit', event => {
    event.preventDefault()
    updateCommentsAndRender(image)
  })
}

const renderCommentList = comments => {
  comments.forEach(renderComment)
}

const renderComment = comment => {
  const commentListEl = document.createElement('li')
  commentListEl.innerText = comment.content

  commentList.appendChild(commentListEl)
}

const updateLikesAndRender = (event, image) => {
  const imageToUpdate = {
    image_id: image.id,
    like_count: ++image.like_count
  }

  imageLikes.innerText = image.like_count

  likesAPI.create(imageToUpdate)
}

const updateCommentsAndRender = image => {
  const commentToCreate = {
    image_id: image.id,
    content: commentInput.value
  }

  commentForm.reset()
  renderComment(commentToCreate)
  commentsAPI.create(commentToCreate)
}

imagesAPI.get(1525)
  .then(renderImageCard)





// document.addEventListener('DOMContentLoaded', () => {
  //   console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')
  //   const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  //   const likeURL = `https://randopic.herokuapp.com/likes/`
  //   const commentsURL = `https://randopic.herokuapp.com/comments/`
// })
