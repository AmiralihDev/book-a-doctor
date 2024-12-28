import axios from "axios";

const phoneNumber = document.getElementById("phone");
const password = document.getElementById("password");
const isRememberMe = document.getElementById("rememberMe");
const loginBtn = document.getElementById("loginBtn");
const durationInHours = 100;

function eventListeners() {
  loginBtn.addEventListener("click", handleLogin);
}

eventListeners();

async function handleLogin() {
  const loginFieldLength = loginLengthChecker(
    phoneNumber.value.trim(),
    password.value.trim()
  );

  if (loginFieldLength !== true) {
    alert(loginFieldLength);
    return;
  }

  // find user
  const user = await findUser(phoneNumber.value.trim(), password.value.trim());

  phoneNumber.value = "";
  password.value = "";

  if (!user) {
    alert("همچین کاربری با این مشخصات وجود ندارد");
    return;
  }
  //-----------login to user dashboard------------

  login(user);
}

function loginLengthChecker(phone, pass) {
  // check phone number length
  if (phone.length != 11) {
    return "شماره موبایل شما کامل نیست";
  }
  //check pass length
  if (pass.length < 8) {
    return "رمز عبورشما باید حداقل 8 حرف باشد";
  }
  return true;
}

async function findUser(phone = "", pass = "") {
  //get users
  const users = await axios.get("http://localhost:3000/users").then((data) => {
    return data;
  });

  //set default user type as null
  let user = null;

  //check request status
  if (users?.status == 200) {
    // check users with phone number and password
    user = await users?.data.find((person) => {
      const phoneNumber = person.phoneNumber;
      const password = person.password;

      if (pass == password && phoneNumber == phone) {
        return true;
      }
    });
  }

  return user;
}

function login(user) {

  let futureTime;
  const currentDate = new Date().getTime()

  //check remember me
  if (isRememberMe.checked) {
    //calculate X hours after
    futureTime = currentDate + durationInHours * 60 * 60 * 1000;
  } else {
    futureTime = currentDate
  }


  // create user data pack for set to ls
  const userPackForLs = {
    id : user.id,
    phoneNumber : user.phoneNumber,
    password : user.password,
    toDateAccepted : futureTime
  }

  // set user data to ls for login again
  localStorage.setItem("user",JSON.stringify(userPackForLs))
}

export function loginWithLs() {}
