"use strict";

const respuestaChiste = async () => {
  try {
    const respuesta = await fetch("https://icanhazdadjoke.com/", {
      headers: {
        Accept: "application/json",
      },
    });
    const json = await respuesta.json();
    console.log("Chiste: ", json.joke);
    document.querySelector("#text-chiste").innerHTML = json.joke;
  } catch (err) {
    console.log(err.message);
  }
};
