
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

        if (!Array.isArray(members)) {
            throw new Error("Invalid member data");
        }

        displayMembers(members);
    } catch (error) {
        console.error("Error loading members:", error);
        membersContainer.textContent = "Unable to load the business directory.";
    }
}

function displayMembers(members) {
    const fragment = document.createDocumentFragment();

    members.forEach((member, index) => {
        const card = document.createElement("article");
        card.className = "member-card";

        const image = document.createElement("img");
        image.src = `images/${member.image}`;
        image.alt = `${member.name} business logo`;
        image.width = 180;
        image.height = 180;
        image.loading = index === 0 ? "eager" : "lazy";

        if (index === 0) {
            image.fetchPriority = "high";
        }

        const info = document.createElement("div");
        info.className = "member-info";

        const heading = document.createElement("div");
        heading.className = "member-heading";

        const category = document.createElement("p");
        category.className = "member-category";
        category.textContent = member.category;

        const membership = document.createElement("span");
        membership.className = `membership-badge membership-${member.membership}`;
        membership.textContent = membershipLevels[member.membership];

        heading.append(category, membership);

        const name = document.createElement("h2");
        name.textContent = member.name;

        const description = document.createElement("p");
        description.className = "member-description";
        description.textContent = member.description;

        const details = document.createElement("div");
        details.className = "member-details";

        const address = document.createElement("p");
        address.className = "member-address";
        address.textContent = member.address;

        const phone = document.createElement("p");
        phone.className = "member-phone";
        phone.textContent = member.phone;

        const website = document.createElement("a");

        if (member.website.endsWith(".example")) {
            website.textContent = "Demo Business";
        } else {
            website.href = member.website;
            website.textContent = "Visit Website";
            website.target = "_blank";
            website.rel = "noopener noreferrer";
        }

        details.append(address, phone, website);
        info.append(heading, name, description, details);
        card.append(image, info);
        fragment.append(card);
    });

    membersContainer.replaceChildren(fragment);
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
