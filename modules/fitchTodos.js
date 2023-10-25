import { checkGetFitch, checkPostFitch } from "./checkFitchTodos.js"

const host = "https://wedev-api.sky.pro/api/v2/vera-Bu/comments";
let token = "Bearer bgc0b8awbwas6g5g5k5o5s5w606g37w3cc3bo3b83k39s3co3c83c03ck";

export function getFitchTodos() {
   return fetch(host, {
   method: "GET",
   headers: {
      Authorization: token,
   }
 }).then((response) => {
   checkGetFitch(response);
   return response.json();
});
}

export function postFetchTodo({formNameElement, formTextElement}) {
   return fetch(host, {
   method: "POST",
   headers: {
      Authorization: token,
   },
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
      //forceError: true,
    })
  }).then((response) => {
      checkPostFitch(response)
      return response.json()
   })
}