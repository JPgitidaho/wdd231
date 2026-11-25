
import { places } from "../data/places.mjs";

const grid = document.querySelector("#discover-grid");
const visitMessage = document.querySelector("#visit-message");

places.forEach((place, index) => {
    const card = document.createElement("article");
    card.className = "place-card";

    const title = document.createElement("h2");
    title.className = "place-title";
    title.textContent = place.name;

    const figure = document.createElement("figure");
    figure.className = "place-image";

    const image = document.createElement("img");
    image.src = place.image;
    image.alt = `View of ${place.name}`;
    image.width = 300;
    image.height = 200;
    image.loading = index < 2 ? "eager" : "lazy";

    figure.appendChild(image);

    const address = document.createElement("address");
    address.className = "place-address";
    address.textContent = place.address;

    const description = document.createElement("p");
    description.className = "place-description";
    description.textContent = place.description;

    const button = document.createElement("button");
    button.className = "place-button";
    button.type = "button";
    button.textContent = "Learn More";

    button.addEventListener("click", () => {
        const query = encodeURIComponent(`${place.name}, ${place.address}`);

        window.open(
            `https://www.google.com/maps/search/?api=1&query=${query}`,
            "_blank",
            "noopener,noreferrer"
        );
    });

    const details = document.createElement("div");
details.className = "place-details";
details.append(description, address);

card.append(title, figure, details, button);
    grid.appendChild(card);
});

const lastVisit = Number(localStorage.getItem("discoverLastVisit"));
const currentVisit = Date.now();
const daysBetween = Math.floor((currentVisit - lastVisit) / 86400000);

if (!lastVisit) {
    visitMessage.textContent = "Welcome! Let us know if you have any questions.";
} else if (daysBetween < 1) {
    visitMessage.textContent = "Back so soon! Awesome!";
} else {
    const dayWord = daysBetween === 1 ? "day" : "days";
    visitMessage.textContent = `You last visited ${daysBetween} ${dayWord} ago.`;
}

localStorage.setItem("discoverLastVisit", currentVisit);
