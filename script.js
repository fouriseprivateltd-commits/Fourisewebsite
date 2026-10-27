const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const expanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!expanded));
    navLinks.classList.toggle("open", !expanded);
    document.body.classList.toggle("menu-open", !expanded);
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menuToggle.setAttribute("aria-expanded", "false");
      navLinks.classList.remove("open");
      document.body.classList.remove("menu-open");
    });
  });
}

const revealElements = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -35px 0px" });
  revealElements.forEach((element) => observer.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("is-visible"));
}

const yearElem = document.getElementById("year");
if (yearElem) {
  yearElem.textContent = new Date().getFullYear();
}

const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(contactForm);
    const name = String(data.get("parentName") || "").trim();
    const age = String(data.get("childAge") || "").trim();
    const method = String(data.get("contactMethod") || "WhatsApp").trim();
    const need = String(data.get("learningNeed") || "").trim();
    const message = [
      "Hello FOURISE Learning, I would like to enquire about learning support.",
      "",
      `Parent/Guardian: ${name}`,
      `Child's age: ${age}`,
      `Preferred contact: ${method}`,
      `Learning goals: ${need || "I'd like to discuss my child's needs."}`
    ].join("\n");

    const status = contactForm.querySelector(".form-status");
    const targetUrl = `https://wa.me/918848292588?text=${encodeURIComponent(message)}`;
    
    if (status) {
      status.textContent = "Connecting to WhatsApp (+91 88482 92588)...";
    }

    window.open(targetUrl, "_blank", "noopener,noreferrer");
  });
}
