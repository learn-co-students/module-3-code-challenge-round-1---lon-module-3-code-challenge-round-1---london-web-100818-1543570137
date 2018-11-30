document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')
  let imageId = 1519
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`


  const commentForm = document.querySelector('#comment_form')
  const commentInput =  document.querySelector('#comment_input')
  const commentContainer = document.querySelector('#comments')
  const likeBtn = document.querySelector('#like_button')
  const imgTitle = document.querySelector('#name')
  const image = document.querySelector('#image')
  const likeDisplay = document.querySelector('#likes')

  const addImage = img => {
    image.src = `${img.url}`
    likeDisplay.innerHTML = `${img.like_count}`
    imgTitle.innerHTML = `${img.name}`

    for(comm of img.comments){
      const commItem = document.createElement('li')
      commItem.innerText = comm.content
      commentContainer.appendChild(commItem)
    }

    likeBtn.addEventListener('click', () => {
      ++img.like_count;
      likeDisplay.innerHTML = `${img.like_count}`
      updateImage(img)
    });
  }

  commentForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const comment = commentInput.value
    
    const newComm = document.createElement('li')
    newComm.innerHTML = comment
    
    commentContainer.appendChild(newComm)
    commentForm.reset()

    addComment(comment)
  })

  const getImage = () => 
    fetch(imageURL)
      .then(resp => resp.json())

  const updateImage = img => 
    fetch(likeURL, {
      method: 'POST', 
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        image_id : 1519,
        img 
      })
    })

  const addComment = comment =>
    fetch(commentsURL, {
      method: 'POST', 
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          image_id: 1519,
          content: comment
        })
      })
      .then(resp => resp.json())
  
  getImage()
    .then(addImage)

})