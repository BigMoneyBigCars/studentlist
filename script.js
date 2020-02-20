window.addEventListener("DOMContentLoaded", start);
const allStudents = [];

function start() {
  console.log("ready");

  loadJSON();
}

function loadJSON() {
  fetch("https://petlatkea.dk/2020/hogwarts/students.json")
    .then(response => response.json())
    .then(jsonData => {
      // when loaded, prepare objects
      prepareObjects(jsonData);
    });
}

const Student = {
  firstname: "",
  lastname: "unknown",
  middlename: "",
  house: "",
  nickname: "",
  image: "",
  age: 0
};

function prepareObjects(jsonData) {
  console.log("test");
  jsonData.forEach(jsonObject => {
    const student = Object.create(Student);

    let fullName = jsonObject.fullname.trim();
    fullName = fullName.toLowerCase();

    let firstSpace = fullName.indexOf(" ");
    let firstName = fullName.substring(0, firstSpace);

    let lastSpace = fullName.lastIndexOf(" ");
    let lastName = fullName.substring(lastSpace + 1, fullName.length);

    let middleName = fullName.substring(firstSpace + 1, lastSpace);

    //  if (middleName == middleName) {
    //} else middleName = " " + middleName + " ";

    let find = middleName.substring(0, 1);

    //uppercase/*
    firstName = firstName.charAt(0).toUpperCase() + firstName.substring(1);

    lastName = lastName.charAt(0).toUpperCase() + lastName.substring(1);

    if (middleName.length <= 1) {
    } else {
      middleName = " " + middleName.charAt(0).toUpperCase() + middleName.substring(1) + " ";
    }

    //middleName = middleName.charAt(0).toUpperCase() + middleName.substring(1);

    if (find === `"`) {
      student.nickName = middleName;
      console.log(student.nickName.trim()); // trim for nickname, remember to capitalize
    } else {
      middleName = middleName;
    }

    console.log(firstName + middleName + lastName);

    //house

    let house = jsonObject.house.trim();

    house = house.toLowerCase();

    let upperHouse = house.charAt(0).toUpperCase() + house.substring(1);

    console.log(upperHouse);
  });

  displayList();
}

function displayList() {
  console.log("Display list objects function");

  console.log("Hej Victoria");
}
/* 
function showStudents() {
  const liste = document.querySelector("#student-grid");
  const skabelon = document.querySelector(".template");

  students.forEach(element => {
    const klon = skabelon.cloneNode(true).content;

    klon.querySelector("h2").textContent = element.fullname;
    klon.querySelector("p").textContent = element.house;

    klon.querySelector(".element-container").dataset.theme = element.house;
    klon.querySelector(".element-container").addEventListener("click", function() {
      document.querySelector("#popUp").dataset.theme = element.house;
      document.querySelector("#popUp h2").textContent = element.fullname;
      document.querySelector("#popUp p").textContent = element.house;

      document.querySelector("#popUp").style.display = "block";
      document.querySelector(".luk").addEventListener("click", noDisplayPopUp);
      document.querySelector("#popUp").addEventListener("click", noDisplayPopUp);
    });
    liste.appendChild(klon);
  });
}
// pop up
function noDisplayPopUp() {
  document.querySelector("#popUp").style.display = "none";
}

function theme() {
  document.querySelector("select#theme").addEventListener("change", selected);

  function selected() {
    const selectedTheme = this.value;
    console.log(selectedTheme);
    document.querySelector("section").dataset.theme = selectedTheme;
  }
}
 */
