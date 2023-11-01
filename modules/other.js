import { registrationForm, authorizationForm } from "./renderTodos.js"

export function newDateElement(date) {
  
   let myDate = new Date(date);
    
   const day = String(myDate.getDate()).padStart(2, '0'); 
   const month = String(myDate.getMonth() + 1) .padStart(2, '0');
   const year = String(myDate.getFullYear()).slice(-2);
   const hours = String(myDate.getHours()).padStart(2, '0');
   const minutes = String(myDate.getMinutes()).padStart(2, '0');
   let fullDate =`${day}.${month}.${year}  ${hours}:${minutes}`;
   return fullDate;
 }
 export function clickButtonsAuthorisation({commentForm, token, app}) {
   const buttonAuthorisation = document.querySelector(".button-authorizate");
   buttonAuthorisation.addEventListener('click', ({ token}) => {
      if (token) {
        app.innerHTML = commentForm;
      } else {
        app.innerHTML = registrationForm;
        clickButtonsRegistration({ app });
      }
    });
 }
 export function clickButtonsRegistration({ app }) {
   document.querySelector("#log").addEventListener('click', () => {
      app.innerHTML = authorizationForm;
      clickButtonsLogin({app});
      loginButtonClick();
      }
   );
 }
 export function clickButtonsLogin({app}) {
   document.querySelector("#reg").addEventListener('click', () => {
      app.innerHTML = registrationForm;
      clickButtonsRegistration({ app });
      }
    );
 }
export function loginButtonClick() {
   document.getElementById("auth-button").addEventListener('click', () => {
      const login = document.getElementById("auth-login").value;
      const password = document.getElementById("auth-password").value;
      if(!login) {
         alert("Укажите логин");
         return;
      }
      if(!password) {
         alert("Укажите пароль");
         return;
      }
      loginUser({
         login: login,
         password: password,
      })
   });
}
export function registrateButtonClick() {
   document.getElementById("reg-button").addEventListener('click', () => {
      const name = document.getElementById("auth-name").value;
      const login = document.getElementById("auth-login").value;
      const password = document.getElementById("auth-password").value;
      if(!name) {
         alert("Укажите имя");
         return;
      }
      if(!login) {
         alert("Укажите логин");
         return;
      }
      if(!password) {
         alert("Укажите пароль");
         return;
      }
      loginUser({
         name: name,
         login: login,
         password: password,
      })
   });
}
     


//  export function clickButtonsRegistrationForm() {
//    document.querySelector(".add-registrate-button").addEventListener('click', () => {
      
//       }
//     );
//  }
//export function clickButtonsAuthorisationForm() {
   //    document.querySelector(".add-authorizate-button").addEventListener('click', () => {
         
   //       }
   //     );
   //  }