const loginForm = document.getElementById("login-form");
const message = document.getElementById("message");

loginForm.addEventListener("submit", async e => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const result = await fetch("/api/tokens", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email,
            password
        })
    });

    const status = result.status;
    const response = await result.json();

    if (status !== 201) {
        message.innerText = response.message;
    } else {
        window.location.assign("/");
    }
});
