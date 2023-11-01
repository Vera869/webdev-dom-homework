
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
 export function clickButtonsAuthorisation({commentForm, registrationForm, token, app}) {
   const buttonAuthorisation = document.querySelector(".button-authorizate");
   buttonAuthorisation.addEventListener('click', ({ token}) => {
      if (token) {
        console.log("hello");
        app.innerHTML = commentForm;
      } else {
        console.log("hi");
        app.innerHTML = registrationForm;
      }
    });
 }
 export function clickButtonsRegistration({authorizationForm, app }) {
   document.querySelector(".link-form entrance").addEventListener('click', () => {
      console.log("regauthorizz");
      app.innerHTML = authorizationForm;
      }
   );
 }
 export function clickButtonsLogin({app, registrationForm}) {
   document.querySelector(".regist").addEventListener('click', () => {
      app.innerHTML = registrationForm;
      }
    );
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