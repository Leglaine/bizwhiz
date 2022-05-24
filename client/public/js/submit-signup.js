const signupForm = document.getElementById("signup-form");
const message = document.getElementById("message");

signupForm.addEventListener("submit", async e => {
    e.preventDefault();

    const givenName = document.getElementById("given-name").value;
    const familyName = document.getElementById("family-name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmation = document.getElementById("confirmation").value;

    const result = await fetch("/api/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            givenName,
            familyName,
            email,
            password,
            confirmation
        })
    });

    const status = result.status;
    const response = await result.json();

    if (status !== 201) {
        message.innerText = response.message;
    } else {
        window.location.assign("/login");
    }
});
