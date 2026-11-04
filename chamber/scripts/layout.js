
const header = document.querySelector("#site-header");
const navigation = document.querySelector("#primary-navigation");
const footer = document.querySelector("#site-footer");

const currentPage = window.location.pathname.split("/").pop() || "index.html";

const links = [
    { href: "index.html", label: "Home" },
    { href: "directory.html", label: "Directory" },
    { href: "discover.html", label: "Discover" },
    { href: "join.html", label: "Join" }
];

if (header) {
    header.innerHTML = `
        <div class="header-container">
            <a href="index.html" class="brand" aria-label="Rancagua Chamber of Commerce - Home">
                <img src="images/favicon.svg" alt="" width="48" height="48">
                <span class="brand-name">Rancagua Chamber of Commerce</span>
            </a>

            <button
                id="menu-button"
                class="menu-button"
                type="button"
                aria-label="Open navigation menu"
                aria-controls="primary-navigation"
                aria-expanded="false">
                ☰
            </button>
        </div>
    `;
}

if (navigation) {
    navigation.innerHTML = `
        <ul>
            ${links.map(link => `
                <li>
                    <a href="${link.href}"
                       ${currentPage === link.href ? 'aria-current="page"' : ""}>
                        ${link.label}
                    </a>
                </li>
            `).join("")}
        </ul>
    `;
}

if (footer) {
    footer.innerHTML = `
        <div class="footer-container">
            <div class="footer-top">
                <div class="footer-brand">
                    <img src="images/favicon.svg" alt="" width="48" height="48">
                    <div>
                        <h2>Rancagua Chamber of Commerce</h2>
                        <p>O'Higgins Region, Chile</p>
                    </div>
                </div>
            </div>

            <div class="footer-bottom">
                <p>&copy; <span id="currentyear"></span> Juana Perez | WDD 231</p>
                <p class="last-modified">
                    Last Modification: <span id="lastModified"></span>
                </p>
            </div>
        </div>
    `;
}
