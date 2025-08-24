

document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".transport-card");
  const modal = document.getElementById("info-modal");
  const modalTitle = document.getElementById("modal-title");
  const modalDescription = document.getElementById("modal-description");
  const modalImg = document.getElementById("modal-img");
  const closeBtn = document.querySelector(".close-btn");

  cards.forEach(card => {
    card.addEventListener("click", () => {
      modalTitle.textContent = card.getAttribute("data-title");
      modalDescription.textContent = card.getAttribute("data-description");
      modalImg.src = card.getAttribute("data-img");
      modal.style.display = "flex";
    });
  });

  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
});
