// Custom Cursor
const cursor = document.querySelector('.custom-cursor');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// File items click to open links
const fileItems = document.querySelectorAll('.file-item');

fileItems.forEach(item => {
    item.addEventListener('click', () => {
        const link = item.getAttribute('data-link');
        if (link) {
            // Add click animation
            item.style.transform = 'scale(0.9)';
            
            setTimeout(() => {
                window.open(link, '_blank');
                item.style.transform = '';
            }, 200);
        }
    });
});

// Enhanced cursor interactions
fileItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(1.8)';
        cursor.style.borderColor = 'var(--accent-blue)';
        cursor.style.background = 'rgba(78, 205, 196, 0.3)';
    });
    
    item.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        cursor.style.borderColor = 'var(--deep-pink)';
        cursor.style.background = 'rgba(255, 107, 157, 0.2)';
    });
});

// Back button hover effect
const backButton = document.querySelector('.back-button');
if (backButton) {
    backButton.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(1.5)';
        cursor.style.borderColor = 'var(--deep-pink)';
    });
    
    backButton.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        cursor.style.borderColor = 'var(--deep-pink)';
    });
}

// Particle effect on file hover
fileItems.forEach(item => {
    item.addEventListener('mouseenter', (e) => {
        createParticles(e.currentTarget);
    });
});

function createParticles(element) {
    const rect = element.getBoundingClientRect();
    const colors = ['#FF6B9D', '#4ECDC4', '#5DADE2', '#FFD54F'];
    
    for (let i = 0; i < 6; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.left = rect.left + rect.width / 2 + 'px';
        particle.style.top = rect.top + rect.height / 2 + 'px';
        particle.style.width = '8px';
        particle.style.height = '8px';
        particle.style.borderRadius = '50%';
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '9997';
        
        const angle = (Math.PI * 2 * i) / 6;
        const velocity = 50;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;
        
        particle.style.animation = `particleFloat 0.8s ease-out forwards`;
        particle.style.setProperty('--vx', vx + 'px');
        particle.style.setProperty('--vy', vy + 'px');
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 800);
    }
}

// Add particle animation
const style = document.createElement('style');
style.textContent = `
    @keyframes particleFloat {
        0% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
        }
        100% {
            transform: translate(var(--vx), var(--vy)) scale(0);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Add floating animation to file icons
fileItems.forEach((item, index) => {
    const delay = index * 0.1;
    let offset = delay;
    
    function floatFile() {
        offset += 0.02;
        const y = Math.sin(offset) * 5;
        const fileIcon = item.querySelector('.file-icon');
        
        if (fileIcon && !item.matches(':hover')) {
            fileIcon.style.transform = `translateY(${y}px)`;
        }
        
        requestAnimationFrame(floatFile);
    }
    
    floatFile();
});

// Ripple effect on click
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

const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            width: 100px;
            height: 100px;
            margin: -50px 0 0 -50px;
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Prevent default cursor
document.body.style.cursor = 'none';
document.querySelectorAll('*').forEach(el => {
    el.style.cursor = 'none';
});

// Smooth page load
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Add magnetic effect to files
fileItems.forEach(item => {
    item.addEventListener('mousemove', (e) => {
        const rect = item.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        const icon = item.querySelector('.file-icon');
        icon.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px) rotateY(${x * 0.05}deg) rotateX(${-y * 0.05}deg)`;
    });
    
    item.addEventListener('mouseleave', () => {
        const icon = item.querySelector('.file-icon');
        icon.style.transform = '';
    });
});

console.log('Projects page loaded! 📁');