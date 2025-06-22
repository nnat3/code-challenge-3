const baseURL = "http://localhost:3000/posts";
const postList = document.querySelector("#post-list");
const postDetail = document.querySelector("#post-detail");
const newPostForm = document.querySelector("#new-post-form");
const editForm = document.querySelector("#edit-post-form");
const editTitle = document.querySelector("#edit-title");
const editContent = document.querySelector("#edit-content");
let currentPostId = null;

// Fetch and display all posts
function () {
    fetch (baseURL)
}