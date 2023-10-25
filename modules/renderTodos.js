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
}