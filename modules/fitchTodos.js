import { checkGetFitch, checkPostFitch } from "./checkFitchTodos.js"

export function getFitchTodos() {
   return fetch("https://wedev-api.sky.pro/api/v1/vera-Bu/comments", {
   method: "GET"
 }).then((response) => {
   checkGetFitch(response);
   return response.json();
});
}

export function postFetchTodo({formNameElement, formTextElement}) {
   return fetch("https://wedev-api.sky.pro/api/v1/vera-Bu/comments", {
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
      //forceError: true,
    })
  }).then((response) => {
      checkPostFitch(response)
      return response.json()
   })
}