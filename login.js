function register() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    if (username === "" || password === "") {
        alert("Please fill all fields.");
        return;
    }

    // Check if user already exists
    if (localStorage.getItem(username)) {
        alert("User already exists.");
    } else {
        localStorage.setItem(username, password);
        localStorage.setItem('loggedInUser', username);
        alert("Registration successful.");
        window.location.href = "index.html";
    }
}

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const storedPassword = localStorage.getItem(username);

    if (storedPassword === null) {
        alert("User does not exist. Please register.");
    } else if (storedPassword === password) {
        localStorage.setItem('loggedInUser', username);
        alert("Login successful.");
        window.location.href = "index.html";
    } else {
        alert("Incorrect password.");
    }
}
