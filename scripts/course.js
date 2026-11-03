
const courses = [
  {
    subject: "CSE",
    number: 110,
    title: "Introduction to Programming",
    credits: 2,
    completed: false
  },
  {
    subject: "WDD",
    number: 130,
    title: "Web Fundamentals",
    credits: 2,
    completed: false
  },
  {
    subject: "CSE",
    number: 111,
    title: "Programming with Functions",
    credits: 2,
    completed: false
  },
  {
    subject: "CSE",
    number: 210,
    title: "Programming with Classes",
    credits: 2,
    completed: false
  },
  {
    subject: "WDD",
    number: 131,
    title: "Dynamic Web Fundamentals",
    credits: 2,
    completed: false
  },
  {
    subject: "WDD",
    number: 231,
    title: "Web Frontend Development I",
    credits: 2,
    completed: false
  }
];

// HTML elements

const courseList = document.querySelector("#course-list");
const totalCredits = document.querySelector("#total-credits");
const filterButtons = document.querySelectorAll("[data-filter]");

// Local storage

const storageKey = "wdd231-completed-courses";

// Unique course ID

function getCourseId(course) {
  return `${course.subject}${course.number}`;
}

// Load saved completed courses

function loadCompletedCourses() {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey));

    if (
      saved &&
      typeof saved === "object" &&
      !Array.isArray(saved)
    ) {
      courses.forEach((course) => {
        const id = getCourseId(course);

        if (typeof saved[id] === "boolean") {
          course.completed = saved[id];
        }
      });
    }
  } catch (error) {
    console.warn("Could not load saved courses:", error);
  }
}

// Save completed courses

function saveCompletedCourses() {
  const completed = {};

  courses.forEach((course) => {
    const id = getCourseId(course);
    completed[id] = course.completed;
  });

  try {
    localStorage.setItem(
      storageKey,
      JSON.stringify(completed)
    );
  } catch (error) {
    console.warn("Could not save completed courses:", error);
  }
}

// Current filter

let currentFilter = "all";

// Filter courses

function getFilteredCourses() {
  if (currentFilter === "all") {
    return courses;
  }

  return courses.filter(
    (course) => course.subject === currentFilter
  );
}

// Toggle course completion

function toggleCompleted(course) {
  course.completed = !course.completed;

  saveCompletedCourses();
  displayCourses();
}

// Display course cards

function displayCourses() {
  const filteredCourses = getFilteredCourses();

  courseList.innerHTML = "";

  filteredCourses.forEach((course) => {
    const card = document.createElement("article");
    card.classList.add("course-card");

    if (course.completed) {
      card.classList.add("completed");
    }

    // Course code

    const heading = document.createElement("h3");
    heading.textContent =
      `${course.subject} ${course.number}`;

    // Course title

    const title = document.createElement("p");
    title.textContent = course.title;

    card.append(heading, title);

    // Course credits

    const credits = document.createElement("p");
    credits.textContent = `${course.credits} Credits`;

    card.appendChild(credits);

    // Completion button

    const button = document.createElement("button");

    button.type = "button";
    button.classList.add("course-toggle");

    button.textContent = course.completed
      ? "✓ Completed"
      : "Mark as Completed";

    button.setAttribute(
      "aria-pressed",
      String(course.completed)
    );

    button.setAttribute(
      "aria-label",
      `Mark ${getCourseId(course)} as ${
        course.completed ? "not completed" : "completed"
      }`
    );

    button.addEventListener("click", () => {
      toggleCompleted(course);
    });

    card.appendChild(button);
    courseList.appendChild(card);
  });

  // Calculate total credits for displayed courses

  const total = filteredCourses.reduce(
    (sum, course) => sum + course.credits,
    0
  );

  // Calculate completed credits for displayed courses

  const completedCredits = filteredCourses
    .filter((course) => course.completed)
    .reduce(
      (sum, course) => sum + course.credits,
      0
    );

  totalCredits.textContent =
    `Total Credits: ${total} | Completed Credits: ${completedCredits}`;
}

// Course filter buttons

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    currentFilter = button.dataset.filter;

    filterButtons.forEach((item) => {
      item.classList.remove("selected");

      item.setAttribute(
        "aria-pressed",
        "false"
      );
    });

    button.classList.add("selected");

    button.setAttribute(
      "aria-pressed",
      "true"
    );

    displayCourses();
  });
});

// Initialize application

loadCompletedCourses();
displayCourses();
