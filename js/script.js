/* =========================================================
   G-DIGITAL AGENCY
   MAIN JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
       HEADER SCROLL
    ===================================================== */

    const header = document.querySelector(".header");

    if (header) {

        window.addEventListener("scroll", () => {

            if (window.scrollY > 50) {
                header.classList.add("scrolled");
            } else {
                header.classList.remove("scrolled");
            }

        });

    }


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealElements = document.querySelectorAll(
        ".about-content, " +
        ".about-visual, " +
        ".service-item, " +
        ".project-card, " +
        ".process-item, " +
        ".why-card, " +
        ".why-bottom"
    );


    const revealObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.15
        }
    );


    revealElements.forEach((element) => {

        element.classList.add("reveal");

        revealObserver.observe(element);

    });


    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".navbar a");


    function updateActiveNavigation() {

        let currentSection = "";

        sections.forEach((section) => {

            const sectionTop =
                section.offsetTop - 160;

            const sectionBottom =
                sectionTop + section.offsetHeight;


            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionBottom
            ) {

                currentSection =
                    section.getAttribute("id");

            }

        });


        navLinks.forEach((link) => {

            link.classList.remove("active");

            const linkTarget =
                link.getAttribute("href");


            if (
                linkTarget === `#${currentSection}`
            ) {

                link.classList.add("active");

            }

        });

    }


    window.addEventListener(
        "scroll",
        updateActiveNavigation
    );


    updateActiveNavigation();


    /* =====================================================
       SMOOTH SCROLL
    ===================================================== */

    const anchorLinks =
        document.querySelectorAll('a[href^="#"]');


    anchorLinks.forEach((link) => {

        link.addEventListener("click", (event) => {

            const targetId =
                link.getAttribute("href");


            /* Ignore empty # links */

            if (
                !targetId ||
                targetId === "#"
            ) {

                return;

            }


            const target =
                document.querySelector(targetId);


            if (!target) {

                return;

            }


            event.preventDefault();


            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


    /* =====================================================
       PROJECT / BUTTON SAFETY
    ===================================================== */

    document.querySelectorAll(".project-link").forEach((link) => {

        const href = link.getAttribute("href");

        if (!href || href === "#") {

            link.addEventListener("click", (event) => {

                event.preventDefault();

            });

        }

    });


    /* =====================================================
       PAGE READY
    ===================================================== */

    document.body.classList.add("page-loaded");


});
/* =========================================================
   G-DIGITAL — ÉTAPE 7
   ANIMATIONS AU SCROLL
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const revealElements = document.querySelectorAll(".reveal");

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("active");

                    observer.unobserve(entry.target);
                }

            });

        },
        {
            threshold: 0.15
        }
    );

    revealElements.forEach((element) => {
        revealObserver.observe(element);
    });

});
/* =========================================================
   RETOUR EN HAUT
========================================================= */

const backToTop = document.getElementById("backToTop");

if (backToTop) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 500) {
            backToTop.classList.add("show");
        } else {
            backToTop.classList.remove("show");
        }

    });

    backToTop.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}
/* =========================================================
   NAVIGATION INTELLIGENTE
========================================================= */

const header = document.querySelector(".header");

if (header) {

    const updateHeader = () => {

        if (window.scrollY > 80) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

    };

    window.addEventListener("scroll", updateHeader);

    updateHeader();
}
/* =========================================================
   ÉTAPE 7 — PARTIE 4
   VALIDATION DU FORMULAIRE
========================================================= */

const contactForm = document.getElementById("contactForm");

if (contactForm) {

    contactForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const name = document.getElementById("name");
        const email = document.getElementById("email");
        const message = document.getElementById("message");

        let valid = true;

        /* Nettoyage */

        document.querySelectorAll(".form-error").forEach(error => {
            error.classList.remove("show");
        });

        document.querySelectorAll(".error").forEach(field => {
            field.classList.remove("error");
        });

        /* NOM */

        if (name.value.trim().length < 2) {

            showError(
                name,
                "Veuillez entrer votre nom."
            );

            valid = false;
        }

        /* EMAIL */

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email.value.trim())) {

            showError(
                email,
                "Veuillez entrer une adresse e-mail valide."
            );

            valid = false;
        }

        /* MESSAGE */

        if (message.value.trim().length < 10) {

            showError(
                message,
                "Votre message doit contenir au moins 10 caractères."
            );

            valid = false;
        }

        /* SI ERREUR */

        if (!valid) {
            return;
        }

        /* SUCCÈS */

        const button =
            contactForm.querySelector(".contact-button");

        button.classList.add("loading");

        button.innerHTML =
            "Envoi en cours...";

        setTimeout(() => {

            button.classList.remove("loading");

            button.innerHTML =
                'Message envoyé <span>✓</span>';

            showSuccess(
                "Merci ! Votre demande a bien été enregistrée."
            );

            contactForm.reset();

        }, 1000);

    });


    /* =====================================================
       FONCTION ERREUR
    ===================================================== */

    function showError(field, message) {

        field.classList.add("error");

        let error =
            field.parentElement.querySelector(".form-error");

        if (!error) {

            error = document.createElement("span");

            error.className = "form-error";

            field.parentElement.appendChild(error);
        }

        error.textContent = message;

        error.classList.add("show");
    }


    /* =====================================================
       FONCTION SUCCÈS
    ===================================================== */

    function showSuccess(message) {

        let success =
            contactForm.querySelector(".form-success");

        if (!success) {

            success = document.createElement("div");

            success.className = "form-success";

            contactForm.appendChild(success);
        }

        success.textContent = message;

        success.classList.add("show");

    }

}


/* =========================================================
   MENU HAMBURGER — MOBILE
========================================================= */

const menuToggle = document.getElementById("menuToggle");
const navbar = document.querySelector(".navbar");

if (menuToggle && navbar) {

    menuToggle.addEventListener("click", () => {

        menuToggle.classList.toggle("active");
        navbar.classList.toggle("active");

    });


    /* Fermer le menu après avoir cliqué sur un lien */

    navbar.querySelectorAll("a").forEach((link) => {

        link.addEventListener("click", () => {

            menuToggle.classList.remove("active");
            navbar.classList.remove("active");

        });

    });


    /* Fermer le menu si on revient sur ordinateur */

    window.addEventListener("resize", () => {

        if (window.innerWidth > 900) {

            menuToggle.classList.remove("active");
            navbar.classList.remove("active");

        }

    });

}
