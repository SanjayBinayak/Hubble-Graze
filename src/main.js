const API_KEY = import.meta.env.VITE_NASA_API_KEY;

function todaysimage() {
  document.querySelector("#app").innerHTML = "<p>Loading...</p>";

  fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`)
    .then(response => response.json())
    .then(data => {
      let media;

      if (data.media_type === "image") {
        media = `<img src="${data.url}"/>`;
      } else if (data.media_type === "video") {
        media = `<iframe src="${data.url}" frameborder="0" allowfullscreen></iframe>`;
      }

      document.querySelector("#app").innerHTML = `
        <h1>${data.title}</h1>
        ${media}
        <p>${data.explanation}</p>
      `;
    })
    .catch(err => {
      document.querySelector("#app").innerHTML = `<p>Error: ${err.message}</p>`;
    });
}

document.getElementById("today").addEventListener("click", todaysimage);

const element = document.getElementById("header");
element.addEventListener("animationstart", listener);
element.addEventListener("animationend", listener);
element.addEventListener("animationiteration", listener);

element.className = "slide-in";
function listener(event) {
  const l = document.createElement("li");
}

function imageByDate() {
  const selectedDate = document.getElementById("date").value;

  if (!selectedDate) {
    alert("Please select a date.");
    return;
  }

  document.querySelector("#app").innerHTML = "<p>Loading...</p>";

  fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${selectedDate}`)
    .then(response => response.json())
    .then(data => {
      let media;

      if (data.media_type === "image") {
        media = `<img src="${data.url}" alt="${data.title}">`;
      } else {
        media = `<iframe src="${data.url}" frameborder="0" allowfullscreen></iframe>`;
      }

      document.querySelector("#app").innerHTML = `
        <h1>${data.title}</h1>
        ${media}
        <p>${data.explanation}</p>
      `;
    })
    .catch(err => {
      document.querySelector("#app").innerHTML = `<p>${err.message}</p>`;
    });
}

document
  .getElementById("by-date")
  .addEventListener("click", imageByDate);