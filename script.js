// Toggle icon navbar
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

if (menuIcon && navbar) {
    menuIcon.onclick = () => {
        menuIcon.classList.toggle('bx-x');
        navbar.classList.toggle('active');
    }
}

// Scroll sections
let sections = document.querySelectorAll('section, .education-row#internship');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 100;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
            });

            // select the active link and add class
            let activeLink = document.querySelector(`header nav a[href*="${id}"]`);
            if (activeLink) activeLink.classList.add('active');

            sec.classList.add('show-animate');

            if (id === 'skills') {
                let progressCircles = document.querySelectorAll('.progress-circle');
                progressCircles.forEach(circle => {
                    if (!circle.classList.contains('animated')) {
                        circle.classList.add('animated');
                        let progress = circle.getAttribute('data-progress');
                        circle.style.setProperty('--progress', progress);
                    }
                });
            }
        } else {
            sec.classList.remove('show-animate');
        }
    });

    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);

    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');

    let footer = document.querySelector('footer');
    if (footer) {
        const reachedBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight;
        footer.classList.toggle('show-animate', reachedBottom);
    }
}

// Call onScroll handler on load and resize to ensure footer state is set correctly
window.addEventListener('load', () => {
    onScroll();
    setTimeout(onScroll, 200);
});
window.addEventListener('resize', onScroll);
onScroll();

// Digital clock
function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    const timeString = `${hours}:${minutes}:${seconds} ${ampm}`;
    const clockEl = document.getElementById('digital-clock');
    if (clockEl) {
        clockEl.textContent = timeString;
    }
}

updateClock();
setInterval(updateClock, 1000);