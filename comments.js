const commentForm = document.getElementById("commentForm");
const commentsContainer = document.getElementById("commentsContainer");
const storageKey = "siteComments";

function getComments() {
  const savedComments = localStorage.getItem(storageKey);
  if (savedComments) {
    return JSON.parse(savedComments);
  }
  return [];
}

function saveComments(comments) {
  localStorage.setItem(storageKey, JSON.stringify(comments));
}

function showComments() {
  const comments = getComments();

  if (comments.length === 0) {
    commentsContainer.innerHTML = '<p class="small-text">No comments yet.</p>';
    return;
  }

  let html = "";

  for (let i = 0; i < comments.length; i += 1) {
    html += '<div class="comment-item">';
    html += '<p class="comment-name">' + comments[i].name + '</p>';
    html += '<p>' + comments[i].text + '</p>';
    html += '</div>';
  }

  commentsContainer.innerHTML = html;
}

commentForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const nameInput = document.getElementById("commentName");
  const textInput = document.getElementById("commentText");

  const newComment = {
    name: nameInput.value,
    text: textInput.value
  };

  const comments = getComments();
  comments.push(newComment);
  saveComments(comments);
  showComments();

  commentForm.reset();
});

showComments();
