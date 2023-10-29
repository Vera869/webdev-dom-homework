import { getFitchTodos, postFetchTodo } from "./modules/fetchTodos.js"
import { commentsRender, renderCommentInGet } from "./modules/renderTodos.js"
import { errorProcessingGet, errorProcessingPost, checkButtonClick } from "./modules/check.js"
import { islikedComment, likeClick, renderAnswer } from "./modules/likesAndAnswer.js"
import { newDateElement } from "./modules/other.js"
//import { goToAuthorizationButtonClick } from "./modules/eventListeners.js"
//import { renderRegistrationForm, renderAuthorizationForm} from "./modules/renderTodos.js"

const formNameElement = document.getElementById('form-name');
const formTextElement = document.getElementById('form-text');
const buttonElement = document.querySelector('.add-form-button');
const addForm = document.querySelector('.add-form');

const commentBoxElement = document.getElementById('comments');

const startLoader = document.querySelector(".start-loader");
const commentLoader = document.querySelector(".comment-loader");

const authorizForm = document.querySelector('.authorizate-form');
const authorizbutton = document.querySelector('.authoriz-button');
const AuthorizMassage = document.querySelector('.choice-form');
const registrationForm = document.querySelector('.registration-form');
const registrationbutton = document.querySelector('.add-authorizate-button');


let comments = [];
const getFetch = () => {
   getFitchTodos()
      .then((responseLoader) => {
         //startLoader.style.display = "none";
         // AuthorizMassage.style.display = "flex";
         return responseLoader;
      }).then((responseData) => {
         renderCommentInGet({ responseData, comments, newDateElement, rendercomments });
      }).catch((error) => {
         errorProcessingGet(error)
      });
};
getFetch();

const rendercomments = (appComments = []) => {
   commentsRender({ comments: appComments, commentBoxElement });

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
rendercomments();