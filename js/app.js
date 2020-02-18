/**
 *
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Define Global Variables
 *
 */

const navList = document.getElementById("navbar__list");
const sections = document.querySelectorAll("section");

/**
 * End Global Variables
 * Start Helper Functions
 *
 */

const isInViewport = el => {
  var rect = el.getBoundingClientRect(),
    vWidth = window.innerWidth || doc.documentElement.clientWidth,
    vHeight = window.innerHeight || doc.documentElement.clientHeight,
    efp = function(x, y) {
      return document.elementFromPoint(x, y);
    };

  // Return false if it's not in the viewport
  if (
    rect.right < 0 ||
    rect.bottom < 0 ||
    rect.left > vWidth ||
    rect.top > vHeight
  )
    return false;

  // Return true if any of its four corners are visible
  return (
    el.contains(efp(rect.left, rect.top)) ||
    el.contains(efp(rect.right, rect.top)) ||
    el.contains(efp(rect.right, rect.bottom)) ||
    el.contains(efp(rect.left, rect.bottom))
  );
};

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

//build the nav
sections.forEach(section => {
  const listItem = `<li class="menu__link ${section.id}" data-link=${section.id}><a href="#${section.id}">${section.dataset.nav}</a></li>`;
  navList.insertAdjacentHTML("beforeend", listItem);
});

// Scroll to section on link click
navList.addEventListener("click", e => {
  e.preventDefault();
  const parent = e.target.hasAttribute("data-link")
    ? e.target
    : e.target.parentElement;
  const elementToScrollTo = document.getElementById(parent.dataset.link);
  elementToScrollTo.scrollIntoView({ block: "end", behavior: "smooth" });
});

//Highlighting the nav link when scrolling to it's section
window.addEventListener("scroll", e => {
  sections.forEach(section => {
    if (isInViewport(section)) {
      section.classList.add("your-active-class");
      document
        .getElementsByClassName(`${section.id}`)[0]
        .classList.add("active");
    } else {
      section.classList.remove("your-active-class");
      document
        .getElementsByClassName(`${section.id}`)[0]
        .classList.remove("active");
    }
  });
});

// Scroll to top button
window.onscroll = () => scrollToTop();

const scrollToTop = () => {
  const mybutton = document.getElementById("myBtn");
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
};

const topFunction = () => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
};
