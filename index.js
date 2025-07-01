const baseURL = "https://code-challenge-3-k0xv.onrender.com/posts";
const postList = document.querySelector("#post-list");
const postDetail = document.querySelector("#post-detail");
const newPostForm = document.querySelector("#new-post-form");
const editForm = document.querySelector("#edit-post-form");
const editTitle = document.querySelector("#edit-title");
const editContent = document.querySelector("#edit-content");
let currentPostId = null;

// Fetch and display all posts
function displayPosts() {
  fetch(baseURL)
    .then((res) => res.json())
    .then((posts) => {
      postList.innerHTML = "";
      posts.forEach((post) => {
        const postItem = document.createElement("div");
        postItem.textContent = post.title;
        postItem.addEventListener("click", () => handlePostClick(post.id));
        postList.appendChild(postItem);
      });

    });
}

function handlePostClick(id) {
  fetch(`${baseURL}/${id}`)
    .then((res) => res.json())
    .then((post) => {
      currentPostId = post.id;
      postDetail.innerHTML = `
        <h2>${post.title}</h2>
        <p><strong>By:</strong> ${post.author}</p>
        <p>${post.content}</p>
        <button id="edit-btn">Edit</button>
        <button id="delete-btn">Delete</button>
      `;
      document.querySelector("#edit-btn").addEventListener("click", () => {
        editTitle.value = post.title;
        editContent.value = post.content;
        editForm.classList.remove("hidden");
      });
      document.querySelector("#delete-btn").addEventListener("click", () => {
        handleDeletePost(post.id);
      });
    });
}

function addNewPostListener() {
  newPostForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(newPostForm);
    const newPost = {
      title: formData.get("title"),
      content: formData.get("content"),
      author: formData.get("author"),
    };

    fetch(baseURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPost),
    })
      .then((res) => res.json())
      .then(() => {
        newPostForm.reset();
        displayPosts();
      });
  });
}

editForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const updatedPost = {
    title: editTitle.value,
    content: editContent.value,
  };

  fetch(`${baseURL}/${currentPostId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedPost),
  })
    .then((res) => res.json())
    .then(() => {
      editForm.classList.add("hidden");
      displayPosts();
      handlePostClick(currentPostId);
    });
});

document.querySelector("#cancel-edit").addEventListener("click", () => {
  editForm.classList.add("hidden");
});

function handleDeletePost(id) {
  fetch(`${baseURL}/${id}`, {
    method: "DELETE",
  }).then(() => {
    postDetail.innerHTML = "<p>Select a post to view details.</p>";
    displayPosts();
  });
}

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  displayPosts(true);
  addNewPostListener();
});
