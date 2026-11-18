
const formData = new URLSearchParams(window.location.search);

const requiredFields = [
    ["first-name", "display-first-name"],
    ["last-name", "display-last-name"],
    ["email", "display-email"],
    ["phone", "display-phone"],
    ["organization", "display-organization"]
];

requiredFields.forEach(([parameter, elementId]) => {
    const element = document.getElementById(elementId);
    const value = formData.get(parameter);

    if (element) {
        element.textContent = value?.trim() || "Not provided";
    }
});

const timestampElement = document.querySelector("#display-timestamp");
const timestampValue = formData.get("timestamp");

if (timestampElement) {
    const date = timestampValue ? new Date(timestampValue) : null;

    timestampElement.textContent =
        date && !Number.isNaN(date.getTime())
            ? date.toLocaleString("en-US", {
                dateStyle: "long",
                timeStyle: "short"
            })
            : "Not available";
}
