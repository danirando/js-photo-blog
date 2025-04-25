// salvo indirizzo Api in una costante

const uriApi = "https://lanciweb.github.io/demo/api/pictures/";

// ricavo dall'html le card dove inserire i dati

const cardOneEl = document.getElementById("card-1");
const cardTwoEl = document.getElementById("card-2");
const cardThreeEl = document.getElementById("card-3");
const cardFourEl = document.getElementById("card-4");
const cardFiveEl = document.getElementById("card-5");
const cardSixEl = document.getElementById("card-6");

// ricavo dall'html il main

const mainEl = document.getElementById("main");

// faccio una chiamata AJAX all'API

axios.get(uriApi).then((response) => {
  // salvo in una array i dati della risposta
  const arrayData = response.data;

  // uso metodo map per ricavare titoli, url, date e li salvo in 3 nuovi array
  const arrayTitle = arrayData.map((item) => item.title);
  const arrayUrl = arrayData.map((item) => item.url);
  const arrayDate = arrayData.map((item) => item.date);

  // creo un array con tutte le card
  const cardEl = [
    cardOneEl,
    cardTwoEl,
    cardThreeEl,
    cardFourEl,
    cardFiveEl,
    cardSixEl,
  ];

  //per ogni card inserisco stringa html con i dati estratti dalla chiamata all'api
  cardEl.forEach((card, i) => {
    card.innerHTML += `
      <img id="pin-${i + 1}" class="pin" src="./assets/img/pin.svg" alt="" />
      <img class="image" src="${arrayUrl[i]}" alt="" />
      <h5>${arrayTitle[i]}</h5>
      <h6>${arrayDate[i]}</h6>
    `;
  });

  // al click di ogni card creata aggiungo anteprima
  cardEl.forEach((card, i) => {
    card.addEventListener("click", () => {
      const mainEl = document.getElementById("main");

      // Crea il contenitore di anteprima senza cancellare il contenuto precedente, "beforeend" inserisce la stringa alla fine dell'elemento
      mainEl.insertAdjacentHTML(
        "beforeend",
        `
        <div class="preview-container">
          <button class="btn btn-secondary">Chiudi</button>
          <img src="${arrayUrl[i]}" alt="" />
        </div>
      `
      );

      // Seleziono tutti gli elementi del dom che hanno classe preview-container, crea un array di nodi
      const previewContainers = document.querySelectorAll(".preview-container");

      // seleziono l'ultimo container creato (-1 perchè array inizia da 0)
      const latestPreview = previewContainers[previewContainers.length - 1];

      // seleziono il bottone "Chiudi" all'interno dell'ultimo contenitore di anteprima.
      const closeButton = latestPreview.querySelector(".btn");

      // Aggiungo un event listener sul click del bottone per nascondere l'anteprima
      closeButton.addEventListener("click", () => {
        latestPreview.classList.add("d-none");
        cardEl[i].classList.remove("d-none");
      });
      cardEl[i].classList.add("d-none");
    });

    // nascondo il pin all'hover del mouse sulla corrispetiva card
    cardEl.forEach((card, i) => {
      card.addEventListener("mouseenter", () => {
        const pinEl = document.querySelectorAll(".pin");
        pinEl[i].classList.add("d-none");
        // rimostro il pin all'uscita del mouse dalla card
        card.addEventListener("mouseleave", () => {
          pinEl[i].classList.remove("d-none");
        });
      });
    });
  });
});
