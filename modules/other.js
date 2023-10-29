import{ registrationForm, authorizationForm } from "./renderTodos.js"
import { token } from "./fetchTodos.js"

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
export  function goToAuthorizationButtonClick() {
  const app = document.getElementById("app");
  const goToAuthorizationButton = document.querySelector(".button-authorizate")
  goToAuthorizationButton.addEventListener('click', ({ token, authorizationForm, registrationForm }) => {
    if (token) {
      console.log("hello");
      app.innerHTML = authorizationForm;
    } else {
      console.log("hi");
      app.innerHTML = registrationForm;
    }
  });
}