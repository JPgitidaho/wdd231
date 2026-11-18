
const timestampInput = document.querySelector("#timestamp");

if (timestampInput) {
    timestampInput.value = new Date().toISOString();
}

const membershipButtons = document.querySelectorAll(".membership-details");

membershipButtons.forEach((button) => {
    const modal = document.getElementById(button.dataset.modal);

    if (modal) {
        button.addEventListener("click", () => {
            modal.showModal();
        });
    }
});

const closeButtons = document.querySelectorAll(".membership-modal .modal-close");

closeButtons.forEach((button) => {
    button.addEventListener("click", () => {
        button.closest("dialog").close();
    });
});
