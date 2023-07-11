let chiste;

const mostrarBtnes = () => {
  document
    .querySelectorAll("[puntuacion]")
    .forEach((boton) => (boton.style.display = "block"), 300);
};
const esconderBtnes = () => {
  document
    .querySelectorAll("[puntuacion]")
    .forEach((boton) => (boton.style.display = "none"), 400);
};

const randomNum10 = () => Math.floor(Math.random() * 10) + 1;

const combinarApisChiste = () => {
  const randomChiste = randomNum10();
  console.log("Random chiste:", randomChiste);

  if (randomChiste <= 5) respuestaChiste();
  else respuestaChiste2();
};

const respuestaChiste = async () => {
  esconderBtnes();
  try {
    const url = "https://icanhazdadjoke.com/";
    const opciones = {
      headers: {
        accept: "application/json",
      },
    };
    const respuesta = await fetch(url, opciones);
    const datos = await respuesta.json();
    chiste = datos.joke;
    console.log("Chiste: ", chiste);
  } catch (err) {
    console.error("Error catch:", err);
  }
  document.querySelector("#text-chiste").innerHTML = `" ${chiste} "`;
  mostrarBtnes();
};

const respuestaChiste2 = async () => {
  esconderBtnes();
  try {
    const url = "https://api.chucknorris.io/jokes/random";
    const respuesta = await fetch(url);
    const datos = await respuesta.json();
    chiste = datos.value;
    console.log("Chiste2: ", chiste);
  } catch (err) {
    console.log("Error catch:", err);
  }
  document.querySelector("#text-chiste").innerHTML = `" ${chiste} "`;
  mostrarBtnes();
};

const reporteChistes = [];

const puntuacion = (score) => {
  console.log("puntuacion");
  let aLen = reporteChistes.length;
  let ultimoChiste = reporteChistes[aLen - 1];

  if (aLen > 0 && ultimoChiste.joke === chiste) {
    ultimoChiste.score = score;
    ultimoChiste.date = new Date().toISOString();
  } else {
    reporteChistes.push({
      joke: chiste,
      score: score,
      date: new Date().toISOString(),
    });
  }
  console.table(reporteChistes);
};

const recibirInfoMeteo = async () => {
  let infoMeteo;
  try {
    const url =
      "https://api.openweathermap.org/data/2.5/weather?lat=41.3888&lon=2.159&appid=e6e499bd3921dfc34cafe0be3f3d2e05&lang=CA";
    const respuestaApiMeteo = await fetch(url);
    const datosMeteo = await respuestaApiMeteo.json();

    infoMeteo = datosMeteo.weather[0].description;
  } catch (err) {
    console.log(err.message);
  }

  document.querySelector("#texto-meteo").innerHTML = infoMeteo;
};

recibirInfoMeteo();
