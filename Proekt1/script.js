
function toggleLike(likeBtn) {
    likeBtn.classList.toggle("liked");
}

function toggleLike(likeBtn) {
    likeBtn.classList.toggle("liked");

   
    var productDiv = likeBtn.closest(".pro");

    
    var likeCount = productDiv.querySelector(".like-count");

    
    var currentLikes = parseInt(likeCount.textContent, 10);
    likeCount.textContent = likeBtn.classList.contains("liked") ? currentLikes + 1 : currentLikes - 1;
}

function addComment(commentBtn) {
    
    var productDiv = commentBtn.closest(".pro");

    
    var commentInput = productDiv.querySelector(".comment-input");
    var commentList = productDiv.querySelector(".comment-list");

    
    var commentText = commentInput.value.trim();


    if (commentText !== "") {
        var li = document.createElement("li");
        li.textContent = commentText;
        commentList.appendChild(li);
        commentInput.value = "";
    }
}