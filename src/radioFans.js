// registrar por medio de formulario con datos: nombre, edad, id,
// fecha de nacimiento, correo, ciudad origen, ciudad residencia,
// lista de canciones.
import "./style.css";
class RadioFan {
  constructor(
    name,
    age,
    id,
    birthDate,
    email,
    cityOrigin,
    cityResidence,
    songList = []
  ) {
    this.name = name;
    this.age = age;
    this.id = id;
    this.birthDate = birthDate;
    this.email = email;
    this.cityOrigin = cityOrigin;
    this.cityResidence = cityResidence;
    this.songList = songList;
  }

  addSong(song) {
    if (this.songList.length >= 3) return;
    this.songList.push(song);
  }
}

const form = document.getElementById("fanForm");
const songInput = document.getElementById("songInput");
const addSongButton = document.getElementById("addSongBtn");
const fans = [];
const songList = [];

// obteniendo data
form.addEventListener("submit", function (event) {
  event.preventDefault();

  const formData = new FormData(form);
  checkData(formData);
  const name = formData.get("name");
  const age = parseInt(formData.get("age"), 10);
  const id = formData.get("document");
  const birthDate = formData.get("birth");
  const email = formData.get("email");
  const cityOrigin = formData.get("originCity");
  const cityResidence = formData.get("currentCity");
  const newFan = new RadioFan(
    name,
    age,
    id,
    birthDate,
    email,
    cityOrigin,
    cityResidence,
    songList
  );
  fans.push(newFan);
  form.reset();

  displayFans();
});

// verificando data
function checkData(data) {
  const requiredFields = [
    "name",
    "age",
    "document",
    "birth",
    "email",
    "originCity",
    "currentCity",
  ];
  for (const field of requiredFields) {
    console.log(data.get(field));
    if (!data.get(field)) {
      alert(`Por favor llena el campo: ${field}.`);
      throw new Error(`Missing required field: ${field}`);
    }
  }
}

function addSong() {
  const song = songInput.value.trim();
  if (!song) alert("El campo de canción no puede estar vacío.");
  if (songList.length < 3) {
    songList.push(song);
    songInput.value = "";
  } else {
    alert("Solo puedes agregar hasta 3 canciones.");
  }
}

function displayFans() {
  if (fans.length == 6) return;
  const tableBody = document.getElementById("fanTableBody");
  //   tableBody.innerHTML = "";
  fans.forEach((fan) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${fan.name}</td>
            <td>${fan.age}</td>
            <td>${fan.id}</td>
            <td>${fan.birthDate}</td>
            <td>${fan.email}</td>
            <td>${fan.cityOrigin}</td>
            <td>${fan.cityResidence}</td>
            <td>${fan.songList.join(", ")}</td>
        `;
    tableBody.appendChild(row);
  });
}

addSongButton.addEventListener("click", addSong);
