
const currentYear = document.querySelector("#currentyear");
const lastModified = document.querySelector("#lastModified");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

if (lastModified) {
    lastModified.textContent = document.lastModified;
}
/*member directory script*/
const membersContainer = document.querySelector("#members-container");
const gridButton = document.querySelector("#grid-view");
const listButton = document.querySelector("#list-view");

const membershipLevels = {
    1: "Member",
    2: "Silver",
    3: "Gold"
};

async function loadMembers() {
    try {
        const response = await fetch("data/members.json");

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        const members = await response.json();
        displayMembers(members);
    } catch (error) {
        console.error("Error loading members:", error);
        membersContainer.textContent = "Unable to load the business directory.";
    }
}

function displayMembers(members) {
    membersContainer.replaceChildren();

    members.forEach((member) => {
        const card = document.createElement("article");
        card.className = "member-card";

        const image = document.createElement("img");
        image.src = `images/${member.image}`;
        image.alt = `${member.name} business logo`;
        image.loading = "lazy";
        image.width = 320;
        image.height = 180;

        const info = document.createElement("div");
        info.className = "member-info";

        const name = document.createElement("h2");
        name.textContent = member.name;

        const category = document.createElement("p");
        category.textContent = member.category;

        const address = document.createElement("p");
        address.textContent = member.address;

        const phone = document.createElement("p");
        phone.textContent = member.phone;

        const membership = document.createElement("p");
        membership.textContent = `Membership: ${membershipLevels[member.membership]}`;

        const website = document.createElement("a");
        website.href = member.website;
        website.textContent = "Website";
        website.target = "_blank";
        website.rel = "noopener noreferrer";

        if (member.website.endsWith(".example")) {
            website.removeAttribute("href");
            website.removeAttribute("target");
            website.textContent = "Demo website";
        }

        info.append(name, category, address, phone, membership, website);
        card.append(image, info);
        membersContainer.append(card);
    });
}

function changeView(view) {
    const isGrid = view === "grid";

    membersContainer.classList.toggle("members-grid", isGrid);
    membersContainer.classList.toggle("members-list", !isGrid);

    gridButton.setAttribute("aria-pressed", String(isGrid));
    listButton.setAttribute("aria-pressed", String(!isGrid));
}

gridButton.addEventListener("click", () => changeView("grid"));
listButton.addEventListener("click", () => changeView("list"));

loadMembers();
