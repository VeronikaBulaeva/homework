const username = document.getElementById('username');
const password = document.getElementById('password');
const passwordError = document.getElementById("passwordErrorMessage");
const usernameError = document.getElementById("usernameErrorMessage");
const passwordImg = document.getElementById("passwordInputBox-img")
const usernameImg = document.getElementById("usernameInputBox-img")
const form = document.getElementById('form')

function togglePassword() {
  const img = document.getElementById("password-img")

  if (password.type === 'text') {
    password.type = 'password';
    img.src = "./img/hide.png"
  } else {
    password.type = 'text';
    img.src = "./img/view.png"
  }
}

function getPasswordError() {
  passwordImg.src = "./img/remove.png"
  passwordImg.classList.add("display_block")
  password.className = "password error-input"
  passwordError.className = "error display_block";
  passwordError.textContent = "Пароль должен быть не меньше 8-ми символов, содержать хотя бы 1 цифру, 1 специальный символ и 1 заглавную букву";
}

function getUsernameError() {
  usernameImg.src = "./img/remove.png"
  usernameImg.classList.add("display_block")
  username.className = "username error-input"
  usernameError.className = "error display_block";
  usernameError.textContent = "Имя пользователя дллжно быть не короче 3-х и не больше 15 символов.";
}

form.addEventListener("input", function (event) {
  event.preventDefault();
  validateForm();
});

form.addEventListener("submit", function (event) {
  event.preventDefault();
  const validForm = validateForm();

  if (!validForm) {
    getPasswordError()
    getUsernameError()
  }
});


function validateForm() {
  password.addEventListener("input", (event) => {
    if (!password.validity.valid) {
      getPasswordError()
    } else {
      passwordImg.src = "./img/check.png"
      passwordImg.classList.add("display_block")
      password.className = "password success"
      passwordError.className = "color_transparent"
    }
  });

  username.addEventListener("input", () => {
    if (!username.validity.valid) {
      getUsernameError()
    } else {
      usernameImg.src = "./img/check.png"
      usernameImg.classList.add("display_block")
      username.className = "username success"
      usernameError.className = "color_transparent"
    }
  });

  const isValid = username.validity.valid && password.validity.valid

  if (isValid) {
    document.getElementById("submitBtn").setAttribute("type", "reset")
  }

  return isValid;
}
