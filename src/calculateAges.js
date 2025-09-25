// import "./style.css";

const ages = new Array(10).fill(0);
let limit = 10;
let button = document.getElementById("addAgeButton");
const data = {
  ages,
  averageAge: 0,
  minAge: 0,
  maxAge: 0,
  olderAge: 0,
  maxAges: [],
  minAges: [],
};

button.onclick = function () {
  if (limit > 0) {
    let ageInput = document.getElementById("ageInput");
    let age = parseInt(ageInput.value);
    if (!isNaN(age) && age > 0 && age < 120) {
      data.ages[10 - limit] = age;
      limit--;
      ageInput.value = ""; // Clear input field
      if (limit === 0) {
        button.disabled = true;
        ageInput.disabled = true;
      }
      calculateAges(data);
      displayAges(data);
    }
  }
  ageInput.focus();
};

function calculateAges(data) {
  const validAges = data.ages.filter((age) => age > 0);
  const totalAges = validAges.length;
  if (totalAges === 0) return;

  data.averageAge = Math.round(
    validAges.reduce((sum, age) => sum + age, 0) / totalAges
  );
  data.minAge = Math.min(...validAges);
  data.maxAge = Math.max(...validAges);
  data.olderAge = validAges.filter((age) => age > 60).length;
  data.maxAges = validAges.filter((age) => age > 60);
  console.log(data.maxAges);
  data.minAges = validAges.filter((age) => age < 18);
}

function displayAges(data) {
  document.getElementById("agesList").innerText =
    "Edades Ingresadas:" + data.ages.filter((age) => age > 0).length ||
    "No se registraron edades";
  document.getElementById("averageAge").innerText =
    "Edad Promedio:" + data.averageAge || "N/A";
  document.getElementById("minAge").innerText =
    "Menores de edad:" + data.minAge || "N/A";
  document.getElementById("maxAge").innerText =
    "Mayores de edad:" + data.maxAge || "N/A";
  document.getElementById("olderAges").innerText =
    "Adultos mayores:" + data.olderAge || "N/A";
  document.getElementById("maxAges").innerText =
    "Edad maxima:" + data.maxAges || "None";
  document.getElementById("minAges").innerText =
    "Edad minima:" + data.minAges || "None";
}
