window.addEventListener("DOMContentLoaded", init);

const HTML = {};
let allStudents = [];
let filter;
let sort; //sorting by type
let sortDirection; // the sorting direction
let currentList = []; // modifyable array

function init() {
  HTML.jsonUrl = "https://petlatkea.dk/2020/hogwarts/students.json";

  start();
}
function start() {
  console.log("ready");

  allStudents = currentList;

  let buttons = document.querySelectorAll("[data-action=filter]");
  let sortingButtons = document.querySelectorAll("[data-action=sort]");
  sortingButtons.forEach(button => {
    button.addEventListener("click", filterSortingButton);
  });

  buttons.forEach(button => {
    button.addEventListener("click", filterButton);
  });

  fetchJson(HTML.jsonUrl, makeObjects);
}

function filterSortedList(currentList) {
  const sortedList = filterStudentBySort(sort);

  currentList = sortedList;
  console.log(currentList);
  displayList(currentList);
}

function filterButton() {
  filter = this.dataset.filter;

  currentList = filterStudentByType(filter);

  filterSortedList(currentList);
  console.log(currentList);
}

function filterSortingButton() {
  if (this.dataset.direction == "asc") {
    this.dataset.direction = "dsc";
  } else if (this.dataset.direction == "dsc") {
    this.dataset.direction = "asc";
  }

  sortDirection = this.dataset.direction;
  sort = this.dataset.sort;
  console.log(currentList);
  const sortedList = filterStudentBySort(sort, sortDirection);
  console.log("test");
  displayList(sortedList);
}

function filterStudentBySort(sort, sortDirection) {
  console.log("set sort function");
  console.log(currentList);
  currentList = currentList.sort(compareSort);

  console.log(sort);

  function compareSort(a, b) {
    if (sortDirection == "asc") {
      if (sort === sort) {
        if (a[sort] < b[sort]) {
          console.log(sort);
          return -1;
        } else {
          return 1;
        }
      }
    } else {
      if (sort === sort) {
        if (a[sort] > b[sort]) {
          console.log(sort);
          return -1;
        }
      }
    }
  }
  return currentList;
}

function filterStudentByType(filter) {
  console.log("set filter function");
  console.log(filter);
  currentList = allStudents.filter(checkFilter);
  function checkFilter(student) {
    return student.house === filter || filter === "*";
  }
  return currentList;
}

async function fetchJson(url, callback) {
  const response = await fetch(url);
  const jsonData = await response.json();
  callback(jsonData);
}

const Student = {
  firstname: "",
  lastname: "unknown",
  middlename: "",
  house: "",
  nickname: "",
  image: "",
  age: 0,
  bloodStatus: ""
};

function makeObjects(jsonData) {
  console.log("make objects function");
  jsonData.forEach(jsonObject => {
    const studentObject = Object.create(Student);

    let fullName = jsonObject.fullname.trim().toLowerCase();

    let house = jsonObject.house.trim().toLowerCase();
    house = house.charAt(0).toUpperCase() + house.substring(1);

    let gender = jsonObject.gender.trim().toLowerCase();
    gender = gender.charAt(0).toUpperCase() + gender.substring(1);

    let firstSpace = fullName.indexOf(" ");
    let firstName = fullName.substring(0, firstSpace);
    let lastSpace = fullName.lastIndexOf(" ");
    let lastName = fullName.substring(lastSpace + 1, fullName.length);
    let middleName = fullName.substring(firstSpace + 1, lastSpace);

    let imageFirstname = lastName.toLowerCase();
    let imageLastLetter = firstName.charAt(0);

    let image = imageFirstname + "_" + imageLastLetter + ".png";

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
      studentObject.nickName = middleName;
      console.log(studentObject.nickName.trim()); // trim for nickname, remember to capitalize
    } else {
      middleName = middleName;
    }

    if (lastName == "Patil") {
      image = lastName + "_" + firstName + ".png";
      image = image.toLowerCase();
    } else if (lastName == "Finch-fletchley") {
      image = "fletchley_j" + ".png";
    } else if (lastName == " ") {
      console.log("leanne");
      image = "undefined";
      console.log(image);
    }

    // console.log(firstName + middleName + lastName);

    //house

    fullName = firstName + middleName + lastName;

    //console.log(fullName);

    studentObject.fullname = fullName;
    studentObject.firstname = firstName;
    studentObject.lastName = lastName;
    studentObject.gender = gender;
    studentObject.house = house;
    studentObject.image = "images/" + image;

    allStudents.push(studentObject);
  });

  displayList(allStudents);
}

function displayList(student) {
  // clear the list
  document.querySelector("#list tbody").innerHTML = "";

  // build a new list
  student.forEach(displayStudent);
}

function displayStudent(student) {
  const clone = document.querySelector("template#animal").content.cloneNode(true);

  clone.querySelector("[data-field=name]").textContent = student.fullname;
  clone.querySelector("[data-field=gender]").textContent = student.gender;
  clone.querySelector("[data-field=image] img").src = student.image;
  /*  
    clone.querySelector("[data-field=type]").textContent = animal.type;
    clone.querySelector("[data-field=age]").textContent = animal.age; */

  /* 
    clone.querySelector(".test").textContent = student.house;
    clone.querySelector("p").textContent = student.fullname;
    clone.querySelector("img").src = student.image;
    */

  clone.querySelector(".element-container").addEventListener("click", function() {
    showPopUp(student);
  });

  document.querySelector("#list tbody").appendChild(clone);
}

function showPopUp(student) {
  document.querySelector("#popUp").dataset.theme = student.house;
  document.querySelector("#popUp h2").textContent = student.fullname;
  document.querySelector("#popUp p").textContent = student.house;
  document.querySelector("#popUp img").src = student.image;

  document.querySelector("#popUp").style.display = "block";
  document.querySelector(".luk").addEventListener("click", noDisplayPopUp);
  document.querySelector("#popUp").addEventListener("click", noDisplayPopUp);
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
*/
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
