const inputLabel = document.querySelector(".subscribe-text")

const input = document.querySelector(".subscribe-input")

const inputBtn = document.querySelector(".subscribe-btn")

const message = document.createElement("p")

message.classList.add("input-message")

inputLabel.appendChild(message)

inputBtn.addEventListener('click',(e) => {
    e.preventDefault()

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const inputValue = input.value.trim();

    if (emailRegex.test(inputValue)) {
        localStorage.setItem("email", inputValue);
        message.textContent = "Email registered successfully."
    } else {
        message.textContent = "Oops! The email address you entered is invalid."
    }
})

