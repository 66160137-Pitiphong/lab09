document.addEventListener("DOMContentLoaded", async () => {
    const userList = document.getElementById("user-list");

    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        const users = await response.json();

        users.forEach(user => {
            const userElement = document.createElement("div");
            userElement.classList.add("user");
            userElement.innerHTML = `
                <p>${user.name}</p>
                <span>${user.email}</span>
            `;

            // คลิกที่ user แล้วไปหน้ารายละเอียด
            userElement.addEventListener("click", () => {
                window.location.href = `user-detail.html?id=${user.id}`;
            });

            userList.appendChild(userElement);
        });
    } catch (error) {
        console.error("Error fetching users:", error);
        userList.innerHTML = "<p>เกิดข้อผิดพลาดในการโหลดข้อมูล</p>";
    }
});
