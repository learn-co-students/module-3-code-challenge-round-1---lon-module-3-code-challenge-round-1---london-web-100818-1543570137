document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 1518 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  const imageCard = document.querySelector("#image_card");
  const list = imageCard.querySelector("ul");
  const commentForm = document.querySelector("#comment_form");

  commentForm.addEventListener("submit", (e) =>{
    e.preventDefault();
    const content = commentForm.querySelector("#comment_input").value;
    addComment(content);
    updateImageComments(makeCommentObj(content));
    commentForm.reset();
  })

  const likeEvent = (image) => {
    return e => {
      image.like_count += 1;
      addLike(image.like_count);
      updateImageLikes(makeLikeObj());
    }
  } 

  const appendImage = (image) => {
    list.innerHTML = "";
    imageCard.querySelector("#image").src = image.url;
    imageCard.querySelector("#name").innerText = image.name;
    addLike(image.like_count);
    addComments(image.comments);
    const likeBtn = imageCard.querySelector("#like_button");
    likeBtn.addEventListener("click", likeEvent(image));
  } 

  const makeCommentObj = (comment) => {
    return {
      content: comment,
      image_id: imageId,
      created_at: Date(),
      updated_at: Date()
    }
  }

  const makeLikeObj = () => {
    return {
      image_id: imageId,
      created_at: Date(),
      updated_at: Date()
    }
  }

  const addLike = (likes) => {
    const span = imageCard.querySelector("span")
    span.innerText = `Likes: ${likes}`
  }

  const deleteEvent = (comment, liEl) => {
    return e => {
      liEl.remove();
      deleteComment(comment);
    }
  }

  const makeDeleteBtn = (comment, liEl) => {
    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete comment";
    deleteBtn.addEventListener("click", deleteEvent(comment, liEl));
    return deleteBtn;
  }

  const makeListElement = (comment) => {
    const liEl = document.createElement("li");
    liEl.innerText = comment.content;
    liEl.appendChild(document.createElement("br"));
    liEl.appendChild(makeDeleteBtn(comment, liEl));
    return liEl;
  }

  const addComments = (comments) => {
    comments.forEach((comment) => {
      list.appendChild(makeListElement(comment));
    });
  }

  const addComment = (comment) => {
    const liEl = document.createElement("li");
    liEl.innerText = comment
    list.appendChild(liEl);
  }

  const fetchImage = () => fetch(imageURL).then(resp => resp.json());

  const updateImageLikes = (likeObj) => {
    fetch(likeURL, {
      method: "POST",
      headers: {'Content-Type': 'application/json',
        'Accept': 'application/json'},
      body: JSON.stringify(likeObj)
    })
  }

  const updateImageComments = (commentObj) => {
    fetch(commentsURL, {
      method: "POST",
      headers: {'Content-Type': 'application/json',
      'Accept': 'application/json'},
      body: JSON.stringify(commentObj)
    }).then(showImage)
  }

  const deleteComment = (comment) => {
    fetch(`${commentsURL}/${comment.id}`,{
      method: "DELETE",
    }).then(alert('Comment Successfully Destroyed'));
  }

  const showImage = () => fetchImage().then(appendImage);
  
  showImage();

})
