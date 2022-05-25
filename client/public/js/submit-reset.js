const resetPasswordForm = document.getElementById("reset-password-form");
const message = document.getElementById("message");

resetPasswordForm.addEventListener("submit", async e => {
    e.preventDefault();

    const email = document.getElementById("email").value;

    const result = await fetch("/api/users/reset-password", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email
        })
    });

    const status = result.status;
    const response = await result.json();

    if (status !== 200) {
        message.innerText = response.message;
    } else {
        window.location.assign("/login");
    }
});
