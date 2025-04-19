document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("register-btn").addEventListener("click", () => {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let fullName = document.getElementById("fullName").value;
    let gender = document.getElementById("Gender").value;
    let bloodGroup = document.getElementById("blood-grp").value;
    let contactNo = document.getElementById("contactNo").value;
    let city = document.getElementById("city").value;

    let obj = {
      Email: email,
      Password: password,
      fullName: fullName,
      bloodGroup: bloodGroup,
      Contact: contactNo,
      City: city,
      Gender: gender,
    };

    console.log(obj);

    // setting up local storage
    localStorage.setItem("obj", JSON.stringify(obj));
  });
});
