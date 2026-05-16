const cursor     = document.getElementById('cursor');
const cursorRing = document.getElementById('cursor-ring');

let mouseX = 0, mouseY = 0;
let ringX  = 0, ringY  = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top  = mouseY + 'px';
});

function animateRing() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  cursorRing.style.left = ringX + 'px';
  cursorRing.style.top  = ringY + 'px';
  requestAnimationFrame(animateRing);
}
animateRing();

document.querySelectorAll('a, button, .project-card, .skill-card, .assignment-card, .contact-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.classList.add('grow');
    cursorRing.classList.add('grow');
  });
  el.addEventListener('mouseleave', () => {
    cursor.classList.remove('grow');
    cursorRing.classList.remove('grow');
  });
});


const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});



const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileLinks = document.querySelectorAll('.mobile-link');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
  document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
});

mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});



const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {

      const siblings = [...entry.target.parentElement.querySelectorAll('.reveal')];
      const index = siblings.indexOf(entry.target);
      entry.target.style.transitionDelay = (index * 0.08) + 's';
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => revealObserver.observe(el));



const skillBars = document.querySelectorAll('.skill-bar');

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animated');
    }
  });
}, { threshold: 0.3 });

skillBars.forEach(bar => skillObserver.observe(bar));



const statNums = document.querySelectorAll('.stat-num');

function animateCounter(el) {
  const target   = parseInt(el.dataset.target, 10);
  const duration = 1800;
  const start    = performance.now();

  function update(now) {
    const elapsed  = now - start;
    const progress = Math.min(elapsed / duration, 1);

    const eased    = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target);
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = target;
  }
  requestAnimationFrame(update);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

statNums.forEach(el => counterObserver.observe(el));



const form        = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const btn = form.querySelector('button[type="submit"]');
    btn.textContent  = 'Sending...';
    btn.disabled     = true;


    setTimeout(() => {
      form.reset();
      btn.textContent = 'Message Sent ✓';
      formSuccess.classList.add('show');

      setTimeout(() => {
        btn.textContent = 'Send Message ↗';
        btn.disabled    = false;
        formSuccess.classList.remove('show');
      }, 4000);
    }, 1200);



  });
}



const sections  = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

const activeSectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navAnchors.forEach(a => {
        a.style.color = '';
        if (a.getAttribute('href') === '#' + entry.target.id) {
          a.style.color = 'var(--accent)';
        }
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(sec => activeSectionObserver.observe(sec));



const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();



function wrapLetters(selector) {
  const el = document.querySelector(selector);
  if (!el) return;
  el.querySelectorAll('.name-line').forEach(line => {
    line.innerHTML = [...line.textContent].map(ch =>
      ch === ' '
        ? ' '
        : `<span class="letter" style="display:inline-block;transition:transform 0.2s,color 0.2s">${ch}</span>`
    ).join('');
  });
  el.querySelectorAll('.letter').forEach(letter => {
    letter.addEventListener('mouseenter', () => {
      letter.style.transform = 'translateY(-6px) scale(1.1)';
      letter.style.color     = 'var(--accent)';
    });
    letter.addEventListener('mouseleave', () => {
      letter.style.transform = '';
      letter.style.color     = '';
    });
  });
}
wrapLetters('.hero-name');
