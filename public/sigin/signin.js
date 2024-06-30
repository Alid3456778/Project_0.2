// signin.js
document.getElementById("signInForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch('https://your-backend.com/api/authenticate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        if (!response.ok) {
            throw new Error('Failed to authenticate');
        }

        const data = await response.json();
        const token = data.token;

        // Store the token in local storage
        localStorage.setItem("userToken", token);

        // Redirect to the booking page or another page
        window.location.href = "booking.html";
    } catch (error) {
        alert(error.message);
    }
});
