export function islikedComment({comment, rendercomments}) {
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
export function likeClick({likebuttons, addlike}) {
   likebuttons.forEach((likebutton, index) => {
      likebutton.addEventListener('click', (event) => {
        event.stopPropagation();
        addlike(index);
      });
    });
}
export function renderAnswer({commentsElement, formTextElement, commentText, commentName}) {
   const commentBody = document.querySelector('.comment-body');
   commentsElement.forEach((commentBody, index) => {
     commentBody.addEventListener('click', () => {
       formTextElement.value = `${commentText[index].textContent} 
         ${commentName[index].textContent}`;
     });
   })
}
