const div= document.querySelector('#image_card')
const image=document.querySelector('#image')
const title=document.querySelector('#name')
const likeButton=document.querySelector('#like_button')
const span=document.querySelector('#likes')
const ulComment= document.querySelector('#comments')
const commentForm= document.querySelector('#comment_form')
const commentInput= document.querySelector('#comment_input')


document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 1523

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  getImage(imageURL)
})


function getImage(imageURL){
  fetch(imageURL)
  .then(resp=>resp.json())
  .then(json=>addImage(json))
}

// const likeFunction = (image_object) => event => {
//
//   span.innerText=`A`
// }

function addImage(image_object){
  image.src=image_object.url
  title.innerText=image_object.name
  span.innerText=`${image_object.like_count} Likes`
  for(comment of image_object.comments){
    let li=document.createElement('li')
    li.innerText=comment.content
    ulComment.appendChild(li)
    let delete_button=document.createElement('button')
    delete_button.innerText="Delete"
    li.appendChild(delete_button)


    delete_button.addEventListener('click',()=>{
      li.remove()
      fetch(`https://randopic.herokuapp.com/comments/${comment.id}`,{
        method: "DELETE",
        headers: {'Accept': 'application/json',
        'Content-Type': 'application/json'}
        }
        )




  })

  }
  likeButton.addEventListener('click',()=>{
    span.innerText=`${image_object.like_count+=1} likes`

    fetch('https://randopic.herokuapp.com/likes',{
      method: "POST",
      headers: {'Accept': 'application/json',
      'Content-Type': 'application/json'},
      body: JSON.stringify({
        image_id: 1523,
        like_count: image_object.like_count
      })

    })

  })

  commentForm.addEventListener('submit',()=>{
    event.preventDefault()
    let liComment=document.createElement('li')
    liComment.innerText=commentInput.value


    ulComment.appendChild(liComment)

    fetch('https://randopic.herokuapp.com/comments',{
      method: "POST",
      headers: {'Accept': 'application/json',
      'Content-Type': 'application/json'},
      body: JSON.stringify({
        image_id: 1523,
        content: commentInput.value
      })
    })
    commentForm.reset()

  })
}
