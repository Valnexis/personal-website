const albumList = document.getElementById("album-list");

albumData.forEach((item) => {
    const listItem = document.createElement("li");
    listItem.classList.add("album-item");

    listItem.innerHTML = `
        <h3>${item.title}</h3>
        <p><strong>Tarih:</strong> ${item.date}</p>
        <p>${item.description}</p>
    `;

    albumList.appendChild(listItem);
});

const albumContainer = document.querySelector(".album-container");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");

prevButton.addEventListener("click", () => {
    albumContainer.scrollBy({ left: -300, behavior: "smooth" }); // Geriye kaydır
});

nextButton.addEventListener("click", () => {
    albumContainer.scrollBy({ left: 300, behavior: "smooth" }); // İleriye kaydır
});