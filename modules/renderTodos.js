import {token} from "./fitchTodos.js"
//import { goToAuthorizationButtonClick } from "./eventListeners.js"

export function renderCommentInGet({responseData, comments, newDateElement, rendercomments}){
   const appComments = 
   responseData.comments.map((comment) => {
      return {
        // {
        //   "id": "64253950ca1ce2a815a327cf",
        //   "date": "2023-03-30T07:25:04.020Z",
        //   "likes": 0,
        //   "isLiked": false,
        //   "text": "Буду первым",
        //   "author": {
        //     "id": "64226edb0cdb1574f162d950",
        //     "login": "admin",
        //     "name": "Глеб Админ"
        //   }
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
        </div>`;

export function commentsRender ({comments, commentForm}) {
  const app = document.getElementById("app");
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
        <div class="comment-loader" style="display: none;">Комментарий добавляется...</div>
        </div>
          <ul id="comments" class="comments">
            ${commentsHtml}
        </ul>
          ${token ? commentForm : `<p class="choice-form addForm messages-Form""> Чтобы добавить коментарий <span class="button-authorizate"> Авторизуйтесь </span> </p>`}
        </div>`
    app.innerHTML = commentsConteinerHtml;
    
  const goToAuthorizationButtonClick = () => {
    const app = document.getElementById("app");
    const goToAuthorizationButton = document.querySelector(".button-authorizate")
    goToAuthorizationButton.addEventListener('click', ({ renderRegistrationForm, renderAuthorizationForm, token}) => {
      if(token) {
          console.log("hello");
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
                    </div>
                  </div>  `;
      }else {
          console.log("hi");
          app.innerHTML =  `<div class="registration-form addForm"">
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
              <button id="auth-button" class="add-authorizate-button">Войти</button>
            </div>
          </div>       
        </div> `;
      }
    });
  }
goToAuthorizationButtonClick();
}

export function renderAuthorizationForm() {
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
                    </div>
                  </div>  `;
} 

export function renderRegistrationForm() {
  const app = document.getElementById("app");
  app.innerHTML =  `<div class="registration-form addForm" style="display: none;">
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
                          <button id="auth-button" class="add-authorizate-button">Войти</button>
                        </div>
                      </div>       
                    </div> `;
}
