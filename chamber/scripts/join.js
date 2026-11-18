
const timestampInput = document.querySelector("#timestamp");

if (timestampInput) {
    timestampInput.value = new Date().toISOString();
}

const membershipButtons = document.querySelectorAll(".membership-details");

membershipButtons.forEach((button) => {
    const modalId = button.dataset.modal;
    const modal = document.getElementById(modalId);

    if (modal) {
        button.addEventListener("click", () => {
            modal.showModal();
        });
    }
});
