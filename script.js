// Custom Cursor
const cursor = document.querySelector('.custom-cursor');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// Discover button scroll functionality
const discoverBtn = document.querySelector('.discover-btn');
const skillsSection = document.querySelector('.skills-section');

discoverBtn.addEventListener('click', () => {
    skillsSection.scrollIntoView({ behavior: 'smooth' });
});

// Skills boxes - scatter away from cursor
const skillBoxes = document.querySelectorAll('.skill-box');
const skillsContainer = document.querySelector('.skills-container');

let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function updateSkillBoxes() {
    skillBoxes.forEach(box => {
        const rect = box.getBoundingClientRect();
        const boxCenterX = rect.left + rect.width / 2;
        const boxCenterY = rect.top + rect.height / 2;

        const deltaX = mouseX - boxCenterX;
        const deltaY = mouseY - boxCenterY;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

        const repelRadius = 150; // Distance at which boxes start to repel

        if (distance < repelRadius) {
            const force = (repelRadius - distance) / repelRadius;
            const moveX = -deltaX * force * 0.5;
            const moveY = -deltaY * force * 0.5;

            box.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.05)`;
            box.style.transition = 'transform 0.1s ease-out';
        } else {
            box.style.transform = 'translate(0, 0) scale(1)';
            box.style.transition = 'transform 0.3s ease-out';
        }
    });

    requestAnimationFrame(updateSkillBoxes);
}

// Start the animation loop
requestAnimationFrame(updateSkillBoxes);

// Folder click - navigate to projects page
const folder = document.getElementById('projectFolder');

if (folder) {
    folder.addEventListener('click', () => {
        // Add click animation
        folder.style.transform = 'scale(0.95)';
        setTimeout(() => {
            window.location.href = 'projects.html';
        }, 200);
    });
}

// Contact button - navigate to contact page
const contactButton = document.querySelector('.contact-button');

if (contactButton) {
    contactButton.addEventListener('click', () => {
        // Add click animation
        contactButton.style.transform = 'scale(0.95)';
        setTimeout(() => {
            window.location.href = 'contact.html';
        }, 200);
    });
}

// Character floating animation enhancement
const character = document.querySelector('.animated-character');

if (character) {
    let floatOffset = 0;
    
    function enhancedFloat() {
        floatOffset += 0.02;
        const y = Math.sin(floatOffset) * 20;
        const rotate = Math.sin(floatOffset * 0.5) * 3;
        
        character.style.transform = `translateY(${y}px) rotate(${rotate}deg)`;
        requestAnimationFrame(enhancedFloat);
    }
    
    enhancedFloat();
}

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe sections
const sections = document.querySelectorAll('.skills-section, .projects-section');
sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(50px)';
    section.style.transition = 'all 0.8s ease-out';
    observer.observe(section);
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        hero.style.opacity = 1 - (scrolled / 700);
    }
});

// Smooth reveal for skill boxes
skillBoxes.forEach((box, index) => {
    box.style.opacity = '0';
    box.style.transform = 'scale(0.8) translateY(30px)';
    
    setTimeout(() => {
        box.style.transition = 'all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        box.style.opacity = '1';
        box.style.transform = 'scale(1) translateY(0)';
    }, index * 100);
});

// Cursor interaction effects
document.querySelectorAll('.skill-box, .discover-btn, .folder, .contact-button').forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(1.5)';
        cursor.style.borderColor = 'var(--accent-blue)';
    });
    
    element.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        cursor.style.borderColor = 'var(--deep-pink)';
    });
});

// Add glow effect to discover text
const glowText = document.querySelector('.glow-text');
if (glowText) {
    setInterval(() => {
        glowText.style.textShadow = `
            0 0 ${Math.random() * 40 + 20}px rgba(255, 107, 157, 0.8),
            0 0 ${Math.random() * 60 + 30}px rgba(78, 205, 196, 0.6)
        `;
    }, 2000);
}

// Prevent default cursor on interactive elements
document.body.style.cursor = 'none';
document.querySelectorAll('a, button, .skill-box, .folder, .discover-btn').forEach(el => {
    el.style.cursor = 'none';
});

// Add ripple effect on click
document.addEventListener('click', (e) => {
    const ripple = document.createElement('div');
    ripple.style.position = 'fixed';
    ripple.style.left = e.clientX + 'px';
    ripple.style.top = e.clientY + 'px';
    ripple.style.width = '0';
    ripple.style.height = '0';
    ripple.style.borderRadius = '50%';
    ripple.style.border = '2px solid var(--deep-pink)';
    ripple.style.pointerEvents = 'none';
    ripple.style.zIndex = '9998';
    ripple.style.animation = 'ripple 0.6s ease-out';
    
    document.body.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
});

// Add ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            width: 100px;
            height: 100px;
            margin: -50px 0 0 -50px;
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

