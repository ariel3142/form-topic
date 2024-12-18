// Upvote/Downvote Logic
document.querySelectorAll('.post').forEach(post => {
    const upvoteBtn = post.querySelector('.upvote');
    const downvoteBtn = post.querySelector('.downvote');
    const scoreElement = post.querySelector('.score');

    let score = parseInt(scoreElement.textContent);

    upvoteBtn.addEventListener('click', () => {
        score++;
        scoreElement.textContent = score;
    });

    downvoteBtn.addEventListener('click', () => {
        score--;
        scoreElement.textContent = score;
    });
});

// Comment Button
document.querySelectorAll('.comment-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        alert('Fitur komentar masih dalam pengembangan!');
    });
});

// NAVIGATE TO COMMENTS
document.querySelectorAll('.comment-btn').forEach(button => {
    button.addEventListener('click', (e) => {
        const commentSection = document.getElementById(button.dataset.comment);
        commentSection.scrollIntoView({ behavior: 'smooth' });
    });
});

// ADD COMMENTS
document.querySelectorAll('.comments').forEach(section => {
    const commentInput = section.querySelector('.comment-input');
    const addCommentBtn = section.querySelector('.add-comment-btn');
    const commentList = section.querySelector('.comment-list');

    addCommentBtn.addEventListener('click', () => {
        if (commentInput.value.trim()) {
            const newComment = document.createElement('li');
            newComment.textContent = commentInput.value;
            commentList.appendChild(newComment);
            commentInput.value = '';
        }
    });
});

// CREATE NEW TOPIC
const newTopicForm = document.getElementById('newTopicForm');
const mainContent = document.querySelector('main');

newTopicForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('topicTitle').value;
    const description = document.getElementById('topicDescription').value;
    const imageFile = document.getElementById('topicImage').files[0];

    const newPost = document.createElement('div');
    newPost.classList.add('post');
    newPost.innerHTML = `
        <div class="vote">
            <button class="upvote">🔼</button>
            <span class="score">0</span>
            <button class="downvote">🔽</button>
        </div>
        <div class="content">
            <h2 class="post-title">${title}</h2>
            <p class="post-description">${description}</p>
            ${imageFile ? `<img src="${URL.createObjectURL(imageFile)}" alt="Topic Image">` : ''}
        </div>
    `;
    mainContent.appendChild(newPost);
    newTopicForm.reset();
});
// FUNCTIONALITY FOR UPVOTE AND DOWNVOTE
document.addEventListener('DOMContentLoaded', () => {
    const voteButtons = document.querySelectorAll('.vote');

    voteButtons.forEach((vote) => {
        const upvoteButton = vote.querySelector('.upvote');
        const downvoteButton = vote.querySelector('.downvote');
        const scoreElement = vote.querySelector('.score');

        let score = parseInt(scoreElement.textContent);

        // Add event listener for upvote
        upvoteButton.addEventListener('click', () => {
            score += 1;
            scoreElement.textContent = score;
        });

        // Add event listener for downvote
        downvoteButton.addEventListener('click', () => {
            score -= 1;
            scoreElement.textContent = score;
        });
    });
});
// Global Variables
let posts = JSON.parse(localStorage.getItem("posts")) || [];

// FUNCTION TO RENDER POSTS
function renderPosts() {
    const postContainer = document.getElementById('posts');
    postContainer.innerHTML = ""; // Clear existing posts

    posts.forEach((post, index) => {
        const postElement = document.createElement('div');
        postElement.className = 'post';
        postElement.innerHTML = `
            <h3>${post.title}</h3>
            <img src="${post.image}" alt="Uploaded Image" style="max-width: 100%; height: auto;" />
            <p>${post.comment}</p>
            <div class="vote">
                <button class="upvote">🔼</button>
                <span class="score">${post.score}</span>
                <button class="downvote">🔽</button>
            </div>
            <button onclick="addComment(${index})">Add Comment</button>
            <div id="comments-${index}" class="comments">
                ${post.comments.map(comment => `<p>${comment}</p>`).join('')}
            </div>
        `;
        postContainer.appendChild(postElement);
    });
}

// FUNCTION TO ADD NEW POST
function addNewPost(title, image, comment) {
    posts.push({ title, image, comment, score: 0, comments: [] });
    localStorage.setItem("posts", JSON.stringify(posts));
    renderPosts();
}

// ADD EVENT LISTENER TO FORM
document.getElementById('newPostForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('postTitle').value;
    const image = document.getElementById('postImage').value;
    const comment = document.getElementById('postComment').value;

    if (title && image && comment) {
        addNewPost(title, image, comment);
        e.target.reset();
    }
});

// FUNCTION TO ADD COMMENT
function addComment(index) {
    const comment = prompt("Add your comment:");
    if (comment) {
        posts[index].comments.push(comment);
        localStorage.setItem("posts", JSON.stringify(posts));
        renderPosts();
    }
}

// UPVOTE/DOWNVOTE LOGIC
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('upvote') || e.target.classList.contains('downvote')) {
        const postIndex = [...document.querySelectorAll('.post')].indexOf(e.target.closest('.post'));
        if (e.target.classList.contains('upvote')) {
            posts[postIndex].score += 1;
        } else if (e.target.classList.contains('downvote')) {
            posts[postIndex].score -= 1;
        }
        localStorage.setItem("posts", JSON.stringify(posts));
        renderPosts();
    }
});

// INITIAL RENDER
renderPosts();

