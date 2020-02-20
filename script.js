window.addEventListener("DOMContentLoaded", startpage);
let students;
function startpage() {
  console.log("test");

  theme();

  getJson();
}

async function getJson() {
  let jsonData = await fetch("students1991.json");

  students = await jsonData.json();

  console.log(students);

  showStudents();
}

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
