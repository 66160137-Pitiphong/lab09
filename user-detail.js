document.addEventListener("DOMContentLoaded", async () => {
    const userDetail = document.getElementById("user-detail");
    const viewPostsBtn = document.getElementById("view-posts");

    const params = new URLSearchParams(window.location.search);
    const userId = params.get("id");

    if (!userId) {
        userDetail.innerHTML = "<p>ไม่พบข้อมูลผู้ใช้</p>";
        return;
    }

    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
        const user = await response.json();

        userDetail.innerHTML = `
            <h2>${user.name} (${user.username})</h2>
            <p>Email: ${user.email}</p>
            <p>Phone: ${user.phone}</p>
            <p>Website: <a href="http://${user.website}" target="_blank">${user.website}</a></p>
            <p>Address: ${user.address.street}, ${user.address.city}</p>
        `;

        viewPostsBtn.addEventListener("click", () => {
            window.location.href = `user-posts.html?id=${userId}`;
        });
    } catch (error) {
        console.error("Error fetching user details:", error);
        userDetail.innerHTML = "<p>เกิดข้อผิดพลาดในการโหลดข้อมูล</p>";
    }
});
