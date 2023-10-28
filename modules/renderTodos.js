import {token} from "./fitchTodos.js"


export function renderFormAutoriz(){

}


export function renderCommentInGet({responseData, comments, newDateElement, rendercomments}){
   const appComments = 
   responseData.comments.map((comment) => {
      return {
        name: comment.author.name,
        date: newDateElement(comment.date),
        text: comment.text,
        countLike: comment.likes,
        isliked: false,
      };
   })
   comments = appComments;
   rendercomments(appComments)
}
export function commentsRender ({comments, commentBoxElement}) {
  const app = document.getElementById("app");
  const commentForm = ` <div class="add-form addForm">
      <input id="form-name"
        type="text"
        class="add-form-name"
        placeholder="Введите ваше имя"
        value=""
      />
      <textarea id="form-text"
        value=""
        aria-valuetext=""
        type="textarea"
        class="add-form-text"
        placeholder="Введите ваш коментарий"
        rows="4"
      ></textarea>
      <div class="add-form-row">
        <button id="add-button" class="add-form-button">Написать</button>
      </div>
    </div>`
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
   const commentsConteinerHtml = `<div class="container" id="comment-box">
   <div class="start-loader">Пожалуйста, подождите - лента комментариев загружается...</div>
    <ul id="comments" class="comments">
      ${commentsHtml}
   </ul>
    ${token ? commentForm : `<p class="choice-form addForm messages-form "> Чтобы добавить коментарий  
    <span class="authoriz-button">Авторизуйтесь</span> </p>`}
   </div>`
    app.innerHTML = commentsConteinerHtml;
}
const renderAuthorizationForm = () => {
  const app = document.getElementById("app");
  app.innerHTML = `<div class="authorizate-form">
  <div class="loginForm">
    Логин
     <input id="auth-login"
       type="text"
       class="authorizate-login"
       placeholder="Укажите логин"
       value=""
     />
  </div>
  <br/><br/>
  <div class="passwordForm">
    Пароль
     <input id="auth-password"
       type="password"
       class="authorizate-password"
       placeholder="Укажите пароль"
       value=""
     />
  </div>
  <br/><br/>
   <div class="add-authorizate-form">
     <button id="auth-button" class="add-authorizate-button">Войти</button>
     <br/><br/>
     <div> Регистрация </div>
   </div>
</div>  `

}
const renderRegistrationForm = () => {
  const app = document.getElementById("app");
  app.innerHTML =`<div class="registration-form addForm" style="display: none;">
              <div class="nameForm">
              Имя
              <input id="auth-name"
                type="text"
                class="authorizate-name"
                placeholder="Укажите имя"
                value=""
                />
              </div>
              <br/><br/>
              <div class="authorizate-form">
                <div class="loginForm">
                  Логин
                  <input id="auth-login"
                    type="text"
                    class="authorizate-login"
                    placeholder="Укажите логин"
                    value=""
                  />
                </div>
                <br/><br/>
                <div class="passwordForm">
                  Пароль
                  <input id="auth-password"
                    type="password"
                    class="authorizate-password"
                    placeholder="Укажите пароль"
                    value=""
                  />
                </div>
                <br/><br/>
                <div class="add-authorizate-form">
                  <button id="auth-button" class="add-authorizate-button">Регистрация</button>
                  <br/><br/>
                  <div> Войти </div>
                </div>
              </div>       
            </div> `
};