
const spotlightContainer = document.querySelector("#spotlight-container");

const spotlightLevels = {
    2: "Silver",
    3: "Gold"
};

function addSpotlightDetail(container, label, value) {
    const item = document.createElement("p");

    const heading = document.createElement("span");
    heading.className = "spotlight-label";
    heading.textContent = label;

    const content = document.createElement("span");
    content.textContent = value || "Not available";

    item.append(heading, content);
    container.append(item);
}

function createSpotlightCard(member) {
    const card = document.createElement("article");
    card.className = "member-card spotlight-card";

    const media = document.createElement("div");
    media.className = "spotlight-media";

    const image = document.createElement("img");
    image.src = `images/${member.image}`;
    image.alt = `${member.name} business logo`;
    image.width = 150;
    image.height = 150;
    image.loading = "lazy";

    const badge = document.createElement("span");
    badge.className = `membership-badge membership-${member.membership} spotlight-badge`;
    badge.textContent = `${spotlightLevels[member.membership]} Member`;

    media.append(image, badge);

    const info = document.createElement("div");
    info.className = "member-info spotlight-info";

    const heading = document.createElement("div");
    heading.className = "spotlight-heading";

    const category = document.createElement("p");
    category.className = "member-category";
    category.textContent = member.category;

    const name = document.createElement("h3");
    name.textContent = member.name;

    heading.append(category, name);

    const contact = document.createElement("div");
    contact.className = "spotlight-contact";

    addSpotlightDetail(contact, "Phone", member.phone);
    addSpotlightDetail(contact, "Address", member.address);

    const websiteRow = document.createElement("p");

    const websiteLabel = document.createElement("span");
    websiteLabel.className = "spotlight-label";
    websiteLabel.textContent = "Website";

    websiteRow.append(websiteLabel);

    const url = member.website || "";

    if (/^https?:\/\//i.test(url) && !/\.example(?:\/|$)/i.test(url)) {
        const link = document.createElement("a");
        link.href = url;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.textContent = url.replace(/^https?:\/\//i, "");

        websiteRow.append(link);
    } else {
        const websiteText = document.createElement("span");
        websiteText.textContent = url
            ? `${url.replace(/^https?:\/\//i, "")} (demo)`
            : "Not available";

        websiteRow.append(websiteText);
    }

    contact.append(websiteRow);

    const directoryLink = document.createElement("a");
    directoryLink.className = "spotlight-directory-link";
    directoryLink.href = "directory.html";
    directoryLink.textContent = "Explore Directory";

    const arrow = document.createElement("span");
    arrow.setAttribute("aria-hidden", "true");
    arrow.textContent = " →";

    directoryLink.append(arrow);

    info.append(heading, contact, directoryLink);
    card.append(media, info);

    return card;
}

async function loadSpotlights() {
    if (!spotlightContainer) return;

    try {
        const response = await fetch("data/members.json");

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        const members = await response.json();

        if (!Array.isArray(members)) {
            throw new Error("Invalid member data");
        }

        const eligible = members.filter(
            (member) => member.membership === 2 || member.membership === 3
        );

        for (let i = eligible.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));

            [eligible[i], eligible[j]] = [eligible[j], eligible[i]];
        }

        const fragment = document.createDocumentFragment();

        eligible.slice(0, 3).forEach((member) => {
            fragment.append(createSpotlightCard(member));
        });

        spotlightContainer.replaceChildren(fragment);
    } catch (error) {
        spotlightContainer.textContent = "Unable to load featured businesses.";
        console.error("Spotlight error:", error);
    }
}

loadSpotlights();
