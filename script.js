document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const errorMessage = document.getElementById("errorMessage");

    // Clear any previous error messages
    errorMessage.textContent = "";

    // Email validation regex
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      errorMessage.textContent = "Please enter a valid email address";
      return;
    }

    // Password validation
    const passwordPattern =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if (!passwordPattern.test(password)) {
      errorMessage.textContent =
        "Password must be at least 8 characters long, contain at least one uppercase letter, one number, and one special character.";
      return;
    }

    // Fetch user data from the JSON file
    fetch("users.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((users) => {
        // Check if the user exists in the fetched users data
        const user = users.find(
          (u) => u.email === email && u.password === password
        );
        if (user) {
          // Redirect to home page if credentials are correct
          window.location.href = "home.html";
        } else {
          // Show error message if credentials are incorrect
          errorMessage.textContent = "Invalid email or password";
        }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        errorMessage.textContent = "Error connecting to the data source";
      });
  });
  
