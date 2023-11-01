
const formNameElement = document.getElementById('form-name');
const formTextElement = document.getElementById('form-text');
const buttonElement = document.querySelector('.add-form-button');
const addForm = document.querySelector('.add-form');
function newDateElement(date) {
  
  let myDate = new Date(date);
   
  const day = String(myDate.getDate()).padStart(2, '0'); 
  const month = String(myDate.getMonth() + 1) .padStart(2, '0');
  const year = String(myDate.getFullYear()).slice(-2);
  const hours = String(myDate.getHours()).padStart(2, '0');
  const minutes = String(myDate.getMinutes()).padStart(2, '0');
  let fullDate =`${day}.${month}.${year}  ${hours}:${minutes}`;
  return fullDate;
}

const commentBoxElement = document.getElementById('comments');

const startLoader = document.querySelector(".start-loader");
const commentLoader = document.querySelector(".comment-loader");

let comments = [];
startLoader.style.display = "flex";
commentLoader.style.display = "none";
const getFetch = () => {
  return fetch("https://wedev-api.sky.pro/api/v1/vera-Buganova/comments", {

    method: "GET"
  }).then((response) => {
    if(response.status === 500) {
      throw new Error("Сервер сломался");
    }
    if(response.status === 400) {
      throw new Error("Плохой запрос");
    }
    return response.json()
  }).then((responseLoader) => {
      startLoader.style.display = "none";
      return responseLoader;
  }).then((responseData) => {
      const appComments = responseData.comments.map((comment) => {
        return {
          name: comment.author.name,
          date: newDateElement(comment.date),
          text: comment.text,
          countLike: comment.likes,
          isliked: false,
        };
      })
      comments = appComments;
      rendercomments()
    }).catch((error) => {
      if (error.message === "Сервер сломался") {
        alert("Сервер сломался, попробуй позже");
        return;
      }
      if (error.message === "Плохой запрос") {
        alert("Имя и комментарий должны быть не короче 3 символов");
        return
      } else {
        alert("Кажется, у вас сломался интернет, попробуйте позже");
      }
    });
};
getFetch();

const rendercomments = () => {
  const commentsHtml = comments.map((comment) => {
      return  ` <li class="comment">
         <div class="comment-header">
           <div class="name space" >
             ${comment.name}
           </div>
           <div class="date">
             ${comment.date}
             </div>
         </div>
         <div class="comment-body">
           <div class="comment-text space">
             ${comment.text}
           </div>
         </div>
         <div class="comment-footer">
           <div class="likes">
             <span data-index="{index}" class="likes-counter">${comment.countLike}</span>
             <button data-index="{index}" class="like-button ${comment.isLike ? '-active-like' : ''}"></button>
           </div>
         </div>
       </li>`;
  }).join("");
    
  commentBoxElement.innerHTML = commentsHtml;
  addLikeEventListeners();
  answerComment()
}
rendercomments();

const postFetch = () => fetch("https://wedev-api.sky.pro/api/v1/vera-Buganova/comments", {
  method: "POST",
  body: JSON.stringify({
      name: formNameElement.value
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;"),
      text: formTextElement.value
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;"),
      forceError: true,
    })
  }).then((response) => {
    if(response.status === 500) {
      throw new Error("Сервер сломался");
    }
    if(response.status === 400) {
      throw new Error("Плохой запрос");
    }
    return response.json()
    }).then((responseData) => {
      return getFetch();
    }).then(() => {
      commentLoader.style.display = "none";
      addForm.style.display = "flex";
      formNameElement.value = "";
      formTextElement.value = "";
  }).catch((error) => {
      if (error.message === "Сервер сломался") {
        commentLoader.style.display = "none";
        addForm.style.display = "flex" ;
        alert("Сервер сломался, попробуй позже");
        return;
      }
      if (error.message === "Плохой запрос") {
        commentLoader.style.display = "none";
        addForm.style.display = "flex" ;
        alert("Имя и комментарий должны быть не короче 3 символов");
        return;
      } else {
        commentLoader.style.display = "none";
        addForm.style.display = "flex" ;
        alert("Кажется, у вас сломался интернет, попробуйте позже");
      }
  });

buttonElement.addEventListener('click', (event) => {
  if(formNameElement.value === "" || formTextElement.value === "" || formNameElement.value.trim() == "" || formTextElement.value.trim() == "") {
    alert("Некорректно заполнены поля формы. Пожалуйста, исправьте и попробуйте снова.");
    return;
  } else {
    commentLoader.style.display = "flex";
    addForm.style.display = "none";
  }
  
  postFetch();
  event.stopPropagation();
  rendercomments();

});

function addlike(index) {  
  const likebuttons = document.querySelectorAll('.like-button');
  const likebutton = likebuttons[index];
  const comment = comments[index];
  
  if(!comment.isLike) {
    comment.countLike += 1;
    comment.isLike = true; 
    rendercomments();
  } else {
    comment.countLike -= 1;
    comment.isLike = false;
    rendercomments();
  }
} 

function addLikeEventListeners() {
  const likebuttons = document.querySelectorAll('.like-button');
  likebuttons.forEach((likebutton, index) => {
    likebutton.addEventListener('click', (event) => {
      event.stopPropagation();
      addlike(index);
    });
  });
}

function answerComment() {
  const commentsElement = document.querySelectorAll('.comment');
  const commentName = document.querySelectorAll('.name');
  const commentText = document.querySelectorAll('.comment-text');

  commentsElement.forEach((commentBody, index) => {
    commentBody.addEventListener('click', () => {
      formTextElement.value = `${commentText[index].textContent} 
        ${commentName[index].textContent}`;
    });
  })
  
};

addLikeEventListeners();
rendercomments();

/*
import { getFitchTodos, postFetchTodo, registrationApi, authorizationApi } from "./modules/fetchTodos.js"
import { renderCommentsAndForms, renderCommentInGet } from "./modules/renderTodos.js"
import { errorProcessingGet, errorProcessingPost, checkButtonClick } from "./modules/check.js"
import { islikedComment, likeClick, renderAnswer } from "./modules/likesAndAnswer.js"
import { newDateElement } from "./modules/other.js"

const formNameElement = document.getElementById('form-name');
const formTextElement = document.getElementById('form-text');
const buttonElement = document.querySelector('.add-form-button');
const addForm = document.querySelector('.add-form');

const commentBoxElement = document.getElementById('comments');

const startLoader = document.querySelector(".start-loader");
const commentLoader = document.querySelector(".comment-loader");

const goToAuthorizationButton = document.querySelector('.authoriz-button');
const AuthorizMassage = document.querySelector('.choice-form');
const registrationbutton = document.querySelector('.add-authorizate-button');

let comments = [];
const getFetch = () => {
   getFitchTodos()
      .then((responseLoader) => {
         return responseLoader;
      }).then((responseData) => {
         renderCommentInGet({ responseData, comments, newDateElement, rendercomments });
      }).catch((error) => {
         errorProcessingGet(error)
      });
};
getFetch();

const rendercomments = (appComments = []) => {
   renderCommentsAndForms({ comments: appComments, commentBoxElement });
   addLikeEventListeners();
   answerComment();
}
rendercomments();

const postFetch = () => {
   postFetchTodo({ formNameElement, formTextElement })
      .then((responseData) => {
         return getFetch();
      }).then(() => {
         commentLoader.style.display = "none";
         addForm.style.display = "flex";
         formNameElement.value = "";
         formTextElement.value = "";
      }).catch((error) => {
         errorProcessingPost({ error, addForm, commentLoader, getFetch })
      });
}
buttonElement.addEventListener('click', (event) => {
   checkButtonClick({ formNameElement, formTextElement, commentLoader, addForm, postFetch });
   event.stopPropagation();
   rendercomments();
});
function addlike(index) {
   const likebuttons = document.querySelectorAll('.like-button');
   const likebutton = likebuttons[index];
   const comment = comments[index];
   islikedComment({ comment, islike, rendercomments });
}
function addLikeEventListeners() {
   const likebuttons = document.querySelectorAll('.like-button');
   likeClick({ likebuttons, addlike });
}
function answerComment() {
   const commentsElement = document.querySelectorAll('.comment');
   const commentName = document.querySelectorAll('.name');
   const commentText = document.querySelectorAll('.comment-text');
   renderAnswer({ commentsElement, formTextElement, commentText, commentName });
};
addLikeEventListeners();
rendercomments();*/