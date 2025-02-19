document.addEventListener("DOMContentLoaded", async () => {
    const postsList = document.getElementById("posts-list");
    const userName = document.getElementById("user-name");

    const params = new URLSearchParams(window.location.search);
    const userId = params.get("id");

    if (!userId) {
        postsList.innerHTML = "<p>ไม่พบข้อมูลโพสต์</p>";
        return;
    }

    try {
        const userResponse = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
        const user = await userResponse.json();
        userName.textContent = user.name;

        const postsResponse = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`);
        const posts = await postsResponse.json();

        posts.forEach(post => {
            const postElement = document.createElement("div");
            postElement.classList.add("post");
            postElement.innerHTML = `
                <h3>${post.title}</h3>
                <p>${post.body}</p>
                <button onclick="toggleComments(${post.id}, this)">ดูความคิดเห็น</button>
                <div id="comments-${post.id}" class="comments" style="display: none;"></div>
            `;
            postsList.appendChild(postElement);
        });
    } catch (error) {
        console.error("Error fetching posts:", error);
        postsList.innerHTML = "<p>เกิดข้อผิดพลาดในการโหลดข้อมูล</p>";
    }
});

async function toggleComments(postId, button) {
    const commentsDiv = document.getElementById(`comments-${postId}`);
    if (commentsDiv.style.display === "none") {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
        const comments = await response.json();
        commentsDiv.innerHTML = comments.map(comment => `<p><strong>${comment.name}</strong>: ${comment.body}</p>`).join("");
        commentsDiv.style.display = "block";
        button.textContent = "ซ่อนความคิดเห็น";
    } else {
        commentsDiv.style.display = "none";
        button.textContent = "ดูความคิดเห็น";
    }
    
}
