function toggleLike(likeBtn) {
    $(likeBtn).toggleClass("liked");

    var productDiv = $(likeBtn).closest(".pro");
    var likeCount = productDiv.find(".like-count");

    var currentLikes = parseInt(likeCount.text(), 10);
    likeCount.text(likeBtn.classList.contains("liked") ? currentLikes + 1 : currentLikes - 1);
}
function addComment(commentBtn) {
    var productDiv = $(commentBtn).closest(".pro");
    var commentInput = productDiv.find(".comment-input");
    var commentList = productDiv.find(".comment-list");

    var commentText = commentInput.val().trim();

    if (commentText !== "") {
        var li = $("<li>").text(commentText);
        commentList.append(li);
        commentInput.val("");
    }
}
function submitForm() {
    var valid = true;
    $('input[class="required"]').each(function() {
        if ($(this).val() === '') {
            alert("Please fill out all required fields and try again");
            valid = false;
        }
    });
    return valid;
}

