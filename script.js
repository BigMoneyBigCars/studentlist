"use strict";
window.addEventListener("DOMContentLoaded", init);
//arrays
const HTML = {};
let allStudents = [];
let currentList = [];
let expelledStudents = [];
let prefects = [];
let halfBlood = [];
let pureBlood = [];
//variables for blood status
let pureBloodTrue;
let halfBloodTrue;

//json urls
let jsonUrl1;
let jsonUrl2;

const myHeading = document.querySelectorAll("#sorting > div");
const myButtons = document.querySelectorAll(".filter");

function init() {
  jsonUrl1 = "https://petlatkea.dk/2020/hogwarts/students.json";
  jsonUrl2 = "https://petlatkea.dk/2020/hogwarts/families.json";
  start();
}
function start() {
  // EVLS for sorting & filter
  myHeading.forEach(button => {
    button.addEventListener("click", sortButtonClick);
  });

  myButtons.forEach(botton => {
    botton.addEventListener("click", filterBottonClick);
  });

  allStudents = currentList;
  fetchJson(jsonUrl2, makeBloodStatus);
}

async function fetchJson(url, callback) {
  const response = await fetch(url);
  const jsonData = await response.json();

  callback(jsonData);
}

const Student = {
  star: false,
  firstname: "",
  lastname: "unknown",
  middlename: "",
  house: "",
  nickname: "",
  image: "",
  age: 0,
  bloodStatus: "",
  gender: "",
  winner: false,
  expelled: false,
  bloodStatus: false
};

function makeBloodStatus(jsonData) {
  halfBlood = jsonData.half;
  pureBlood = jsonData.pure;
  fetchJson(jsonUrl1, makeObjects);
}

function hackTheSystem() {
  console.log("tis og guld");
  const myself = Object.create(Student);

  myself.fullname = "lasse Stausgaard";
  myself.firstname = "Lasse";
  myself.middlename = "Dumbledore";
  myself.lastname = "Stausgaard";
  myself.bloodStatus = "Wine";
  myself.star = true;
  myself.gender = "Wizard";
  myself.firstname = "Lasse";
  myself.winnner = true;
  myself.image = "/imgCrests/" + "harry_potter.jpg";
  console.log(myself);

  currentList.push(myself);

  /* if(hackTheSystem) {
  student.firstname = Math.floor(Math.random() * 26);
} */

  allStudents.forEach(student => {
    student.firstname = Math.floor(Math.random() * 26);
  });
  /* 
  const Lasse = {
    star: true,
    star: false,
    firstname: "Lasse",
    lastname: "Stausgaard",
    middlename: "Dumbledore",
    house: "Hogwarts",
    nickname: "",
    image: "",
    age: 0,
    bloodStatus: "Dobby",
    gender: "Human",
    winner: true,
    expelled: false,
    bloodStatus: false
  };
 */
  displayStudent(myself);
}

function makeObjects(jsonData) {
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

    let bloodStatus;

    pureBloodTrue = pureBlood.some(blood => {
      return blood === lastName;
    });

    halfBloodTrue = halfBlood.some(blood => {
      return blood === lastName;
    });

    if (pureBloodTrue === true) {
      bloodStatus = "Pure blood";
    } else if (halfBloodTrue === true) {
      bloodStatus = "half blood";
    } else bloodStatus = "muggle";

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
    studentObject.bloodStatus = bloodStatus;

    allStudents.push(studentObject);
  });

  console.log(allStudents);
  displayList(allStudents);
}

function expelStudent(student) {
  student.expelled = true;
  student.winner = false;

  /*   if (student.expelled === true) {
    console.log(" ses man");
    document.querySelector("[data-field=expel]").classList.add("hide");
  } */
  /* 
  
  expelledStudents = allStudents.filter(student => {
    return student.expelled === true;
  }); */

  // if expell=mig open popup

  expelledStudents.push(student);

  currentList = allStudents.filter(student => {
    return student.expelled === false;
  });

  displayList(currentList);
}

function displayList(student) {
  // clear the list
  document.querySelector("#list .tbody").innerHTML = "";

  // build a new list
  student.forEach(displayStudent);

  // SEARCHBAR
  let search = document.getElementById("search");
  let el = document.querySelectorAll(".element-container");

  let test1 = document.querySelector(".fullname");
  console.log(test1);

  console.log(el);

  let test = document.querySelector(".fullname").textContent;
  console.log(test);

  search.addEventListener("keyup", function() {
    el.forEach(student => {
      console.log(student);
      if (
        student
          .querySelector(".fullname")
          .textContent.toLowerCase()
          .includes(search.value.toLowerCase())
      ) {
        student.style.display = "contents";
      } else {
        student.style.display = "none";
      }
    });
  });
}

function displayStudent(student) {
  const clone = document.querySelector("template#student").cloneNode(true).content;

  //  console.log(student);
  clone.querySelector("[data-field=name]").textContent = student.fullname;
  clone.querySelector("[data-field=gender]").textContent = student.gender;
  clone.querySelector("[data-field=image] img").src = student.image;
  clone.querySelector("[data-field=house]").textContent = student.house;
  clone.querySelector("[data-field=house]").textContent = student.house;
  clone.querySelector("[data-field=bloodStatus]").textContent = student.bloodStatus;

  // star
  clone.querySelector("[data-field=star]").addEventListener("click", function() {
    toggleStar(student);
  });

  if (student.star == true) {
    clone.querySelector("[data-field=star]").textContent = "⭐";
  } else if (student.star == false) {
    clone.querySelector("[data-field=star]").textContent = "☆";
  }

  //winner
  clone.querySelector("[data-field=winner]").addEventListener("click", function() {
    toggleWinner(student);
  });

  if (student.winner == true) {
    clone.querySelector("[data-field=winner]").textContent = "🏆";
    clone.querySelector("[data-field=winner]").classList.remove("grey");
  } else if (student.winner == false) {
    clone.querySelector("[data-field=winner]").classList.add("grey");
  }

  clone.querySelector("[data-field=expel]").addEventListener("click", function() {
    expelStudent(student);
  });

  /* 
  if (student.winner == true) {
    clone.querySelector("[data-field=winner]").textContent = "🏆";
    clone.querySelector("[data-field=winner]").classList.remove("grey");
  } else if (student.winner == false) {
    clone.querySelector("[data-field=winner]").classList.add("grey");
  }
 */
  //
  /*  
    clone.querySelector("[data-field=type]").textContent = student.type;
    clone.querySelector("[data-field=age]").textContent = student.age; */

  /* 
    clone.querySelector(".test").textContent = student.house;
    clone.querySelector("p").textContent = student.fullname;
    clone.querySelector("img").src = student.image;
    */

  clone.querySelector("[data-field=show]").addEventListener("click", function() {
    showPopUp(student);
  });

  document.querySelector("#list .tbody").appendChild(clone);
}

function toggleWinner(student) {
  console.log("toggle winner function");
  prefects = currentList.filter(student => student.winner === true);

  const winnerType = prefects.some(winner => {
    return winner.house === student.house && winner.gender === student.gender;
  });

  if (student.winner === true) {
    student.winner = false;
  } else {
    if (winnerType) {
      console.log("cannot add more of one type ");
      alreadyOneGenderInHouse(student);
      student.winner = false;
    } else if (prefects.length == 8) {
      twoPrefectsEachHouse(student);
      student.winner = false;

      console.log("there's already 2 students in the array por favor");
    } else {
      student.winner = true;
    }
  }

  displayList(currentList);
}

function alreadyOneGenderInHouse(student) {
  console.log(currentList);
  console.log("already one gender function");

  document.querySelector("#onlyonekind").classList.add("show");
  document.querySelector("#onlyonekind > div > button").addEventListener("click", closeDialog);
  // document.querySelector("#onlyonekind .animal1").textContent = "det her virker ikke";

  currentList.forEach(prefectStudent => {
    if (prefectStudent.winner == true && prefectStudent.gender == student.gender && prefectStudent.house == student.house) {
      console.log(prefectStudent.fullname);
      document.querySelector("#onlyonekind .animal1").textContent = prefectStudent.fullname;
    }
    document.querySelector("#onlyonekind .remove1").addEventListener("click", function() {
      if (prefectStudent.gender == student.gender) {
        prefectStudent.winner = false;
        student.winner = true;
      }
    });
  });
}

function twoPrefectsEachHouse() {
  console.log("two prefects each house function");

  document.querySelector("#onlytwowinners").classList.add("show");
  document.querySelector("#onlytwowinners .closebutton").addEventListener("click", closeDialog);
}

function closeDialog() {
  document.querySelector("#onlyonekind").classList.remove("show");
  document.querySelector("#onlytwowinners").classList.remove("show");
}
function showPopUp(student) {
  console.log(student.house);
  document.querySelector(".house-crest").dataset.theme = student.house;
  document.querySelector("#popUp h2").textContent = student.fullname;
  document.querySelector("#popUp p").textContent = student.house;
  document.querySelector("#popUp h3").textContent = student.gender;
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

function sortButtonClick() {
  console.log("sortButton");

  //const sort = this.dataset.sort;
  if (this.dataset.action === "sort") {
    clearAllSort();
    console.log("forskellig fra sorted", this.dataset.action);
    this.dataset.action = "sorted";
  } else {
    if (this.dataset.sortDirection === "asc") {
      this.dataset.sortDirection = "desc";
      console.log("sortdir desc", this.dataset.sortDirection);
    } else {
      this.dataset.sortDirection = "asc";
      console.log("sortdir asc", this.dataset.sortDirection);
    }
  }
  mySort(this.dataset.sort, this.dataset.sortDirection);
}

function clearAllSort() {
  console.log("clearAllSort");
  myHeading.forEach(botton => {
    botton.dataset.action = "sort";
  });
}

function mySort(sortBy, sortDirection) {
  console.log(`mySort-, ${sortBy} sortDirection-  ${sortDirection}  `);
  let desc = 1;

  currentList = allStudents.filter(allStudents => true);

  if (sortDirection === "desc") {
    desc = -1;
  }

  currentList.sort(function(a, b) {
    var x = a[sortBy];
    var y = b[sortBy];
    if (x < y) {
      return -1 * desc;
    }
    if (x > y) {
      return 1 * desc;
    }
    return 0;
  });

  displayList(currentList);
}

//--------------------------------------FILTER

function toggleStar(student) {
  if (student.star == true) {
    student.star = false;
  } else {
    student.star = true;
  }
  console.log(student.star);
  displayList(currentList);
}

function filterBottonClick() {
  const filter = this.dataset.filter;
  clearAllSort();
  console.log(filter);
  myFilter(filter);
}

function myFilter(filter) {
  console.log("myFilter", filter);
  if (filter === "*") {
    currentList = allStudents.filter(allStudents => true);
    document.querySelector("#list > .tbody").classList.remove("pointerNone");
    displayList(currentList);
  } else if (filter === "expelled") {
    currentList = expelledStudents;
    document.querySelector("#list > .tbody").classList.add("pointerNone");
    displayList(currentList);
  } else {
    currentList = allStudents.filter(student => student.house === filter);
    document.querySelector("#list > .tbody").classList.remove("pointerNone");
    displayList(currentList);
  }
}
