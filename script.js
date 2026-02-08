// Load portfolio data from embedded script
function loadPortfolioData() {
    // portfolioData is already available from the embedded script in HTML
    if (typeof portfolioData !== 'undefined') {
        populatePortfolio();
    } else {
        console.error('Portfolio data not found. Please check the embedded data in index.html');
        document.body.innerHTML = '<div style="text-align: center; padding: 50px; font-family: Arial, sans-serif;"><h1>Error Loading Portfolio</h1><p>Please check the embedded portfolio data in index.html</p></div>';
    }
}

// Populate all sections with data
function populatePortfolio() {
    if (!portfolioData) return;

    populatePersonalInfo();
    populateHeroSection();
    populateAboutSection();
    populateExperienceSection();
    populateEducationSection();
    populateSkillsSection();
    populateCertificatesSection();
    populateAwardsSection();

    // Initialize other functionality after data is loaded
    initializePortfolio();
}

// Populate personal information
function populatePersonalInfo() {
    const { personalInfo } = portfolioData;

    // Update page title
    document.title = `${personalInfo.name} - Marketing & Sales Professional`;

    // Update navigation
    document.getElementById('nav-name').textContent = personalInfo.name;

    // Update footer
    document.getElementById('footer-name').textContent = personalInfo.name;
}

// Populate hero section
function populateHeroSection() {
    const { personalInfo, heroStats } = portfolioData;

    // Update hero content
    document.getElementById('hero-name').textContent = personalInfo.name;
    document.getElementById('hero-title').textContent = personalInfo.title;
    document.getElementById('hero-summary').textContent = personalInfo.summary;

    // Populate contact links
    const heroContact = document.getElementById('hero-contact');
    heroContact.innerHTML = `
        <a href="mailto:${personalInfo.email}" class="contact-link">
            <i class="fas fa-envelope"></i> ${personalInfo.email}
        </a>
        <a href="https://linkedin.com/in/${personalInfo.linkedin}" class="contact-link" target="_blank">
            <i class="fab fa-linkedin"></i> ${personalInfo.linkedinDisplay}
        </a>
    `;


}

// Populate about section
function populateAboutSection() {
    const { about } = portfolioData;
    const aboutText = document.getElementById('about-text');

    aboutText.innerHTML = `
        ${about.paragraphs.map(paragraph => `<p>${paragraph}</p>`).join('')}
        <div class="key-highlights">
            ${about.highlights.map(highlight => `
                <div class="highlight">
                    <i class="${highlight.icon}"></i>
                    <span>${highlight.text}</span>
                </div>
            `).join('')}
        </div>
    `;
}

// Populate experience section
function populateExperienceSection() {
    const { experience } = portfolioData;
    const timeline = document.getElementById('experience-timeline');

    timeline.innerHTML = experience.map(job => `
        <div class="timeline-item">
            <div class="timeline-marker"></div>
            <div class="timeline-content">
                <div class="job-header">
                    <h3>${job.title}</h3>
                    <span class="company">${job.company}</span>
                    <span class="duration">${job.duration}</span>
                </div>
                <ul class="job-achievements">
                    ${job.achievements.map(achievement => `<li>${achievement}</li>`).join('')}
                </ul>
            </div>
        </div>
    `).join('');
}

// Populate education section
function populateEducationSection() {
    const { education } = portfolioData;
    const educationGrid = document.getElementById('education-grid');

    educationGrid.innerHTML = education.map(edu => `
        <div class="education-card">
            <div class="education-header">
                <h3>${edu.degree}</h3>
                <span class="institution">${edu.institution}</span>
                <span class="duration">${edu.duration}</span>
            </div>
            <br />
            <p class="specialization">${edu.specialization}</p>
            <p class="gpa">${edu.gpa}</p>
        </div>
    `).join('');
}

// Populate skills section
function populateSkillsSection() {
    const { skills } = portfolioData;
    const skillsGrid = document.getElementById('skills-grid');

    skillsGrid.innerHTML = skills.map(category => `
        <div class="skill-category">
            <h3>${category.category}</h3>
            <div class="skill-tags">
                ${category.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
            </div>
        </div>
    `).join('');
}

// Helper function to get logo for certificate providers
const logoMap = {
    'Google Skillshop': 'logos/google_logo.jpeg',
    'HubSpot': 'logos/hubspot_logo.jpeg',
    'Alliance Française Madras': 'logos/french_logo.jpeg'
};

function getDefaultIcon(provider) {
    return logoMap[provider] || null;
}

// Populate certificates section
function populateCertificatesSection() {
    const { certificates } = portfolioData;
    const certificatesGrid = document.getElementById('certificates-grid');

    if (!certificates || certificates.length === 0) {
        console.error('No certificates data found');
        return;
    }

    certificatesGrid.innerHTML = certificates.map(cert => {
        let actionButtons = '';

        // Add action buttons based on certificate type
        if (cert.link) {
            // External link certificate
            actionButtons = `
                <div class="certificate-actions">
                    <a href="${cert.link}" target="_blank" class="certificate-btn certificate-btn-primary">
                        <i class="fas fa-external-link-alt"></i> View Certificate
                    </a>
                </div>
            `;
        } else if (cert.pdfFile) {
            // PDF certificate with preview
            actionButtons = `
                <div class="certificate-actions">
                    <button onclick="openPdfModal('${cert.pdfFile}', '${cert.title}')" class="certificate-btn certificate-btn-primary">
                        <i class="fas fa-eye"></i> Preview
                    </button>
                    <a href="${cert.pdfFile}" download class="certificate-btn certificate-btn-secondary">
                        <i class="fas fa-download"></i> Download
                    </a>
                </div>
            `;
        } else {
            actionButtons = ``;
        }
        return `
            <div class="certificate-card">
                <div class="certificate-icon">
                    ${cert.logo || logoMap[cert.provider] ?
                `<img src="${cert.logo || getDefaultIcon(cert.provider)}" alt="${cert.provider} logo" class="certificate-logo">` :
                `<i class="fas fa-certificate"></i>`
            }
                </div>
                <div class="certificate-content">
                    <h3>${cert.title}</h3>
                    <p class="certificate-provider">${cert.provider}</p>
                    <p class="certificate-description">${cert.description}</p>
                    <span class="certificate-year">${cert.year}</span>
                    ${actionButtons}
                </div>
            </div>
        `;
    }).join('');
}

// PDF Modal functionality
function openPdfModal(pdfUrl, title) {
    const modal = document.getElementById('pdf-modal');
    const iframe = document.getElementById('pdf-iframe');
    const modalTitle = document.getElementById('pdf-modal-title');
    const downloadLink = document.getElementById('pdf-download-link');

    // Set modal content
    modalTitle.textContent = title;
    iframe.src = pdfUrl;
    downloadLink.href = pdfUrl;

    // Show modal
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closePdfModal() {
    const modal = document.getElementById('pdf-modal');
    const iframe = document.getElementById('pdf-iframe');

    // Hide modal
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';

    // Clear iframe source to stop PDF loading
    iframe.src = '';
}

// Initialize PDF modal event listeners
function initializePdfModal() {
    const modal = document.getElementById('pdf-modal');
    const closeBtn = document.getElementById('pdf-modal-close');

    // Close modal when clicking close button
    closeBtn.addEventListener('click', closePdfModal);

    // Close modal when clicking outside
    modal.addEventListener('click', function (e) {
        if (e.target === modal) {
            closePdfModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closePdfModal();
        }
    });
}

// Populate awards section
function populateAwardsSection() {
    const { awards } = portfolioData;
    const awardsGrid = document.getElementById('awards-grid');

    awardsGrid.innerHTML = awards.map(award => `
        <div class="award-card">
            <div class="award-icon">
                <i class="${award.icon}"></i>
            </div>
            <h3>${award.title}</h3>
            <p>${award.description}</p>
        </div>
    `).join('');
}

// Initialize portfolio functionality
function initializePortfolio() {
    // Scroll Progress
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + "%";
    });

    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        if (hamburger) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }));

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Active navigation link highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Project Showcase Animation Logic
    initializeProjectShowcase();

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.timeline-item, .education-card, .skill-category, .award-card, .certificate-card, .highlight');

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275), transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        observer.observe(el);
    });

    // Typing effect for hero title
    function typeWriter(element, text, speed = 100) {
        if (!element) return;
        let i = 0;
        element.innerHTML = '';

        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }

        type();
    }

    // Initialize typing effect
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 100);
    }

    // Add loading animation
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });

    // Add CSS for loading state
    const style = document.createElement('style');
    style.textContent = `
        body:not(.loaded) {
            overflow: hidden;
        }
        
        body:not(.loaded)::after {
            content: '';
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: #090D33;
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        body:not(.loaded)::before {
            content: 'JA';
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: #4C18C1;
            font-size: 3rem;
            font-weight: 800;
            z-index: 10000;
            animation: pulse 1.5s infinite;
        }

        @keyframes pulse {
            0% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
            50% { opacity: 0.5; transform: translate(-50%, -50%) scale(1.1); }
            100% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        }
    `;
    document.head.appendChild(style);

    // Initialize PDF modal
    initializePdfModal();
}

// Project Showcase Initialization
function initializeProjectShowcase() {
    const showcase = document.getElementById('project-showcase');
    if (!showcase || !portfolioData.experience) return;

    // Use experience items as projects
    const projects = portfolioData.experience.slice(0, 5); // Take first 5

    showcase.innerHTML = projects.map((proj, index) => `
        <div class="project-card-mini ${index === 0 ? 'active' : index === 1 ? 'next' : ''}" data-index="${index}">
            <div class="mini-icon">
                <i class="fas fa-rocket"></i>
            </div>
            <h3 class="mini-title">${proj.title}</h3>
            <p class="mini-text">${proj.company}</p>
            <div class="mini-tag">${proj.duration}</div>
            <p class="mini-text" style="font-size: 0.75rem; opacity: 0.8;">${proj.achievements[0].substring(0, 100)}...</p>
        </div>
    `).join('');

    let currentIndex = 0;
    const cards = showcase.querySelectorAll('.project-card-mini');

    setInterval(() => {
        cards[currentIndex].className = 'project-card-mini prev';

        currentIndex = (currentIndex + 1) % cards.length;
        const nextIndex = (currentIndex + 1) % cards.length;

        cards[currentIndex].className = 'project-card-mini active';
        cards[nextIndex].className = 'project-card-mini next';

        // Reset others
        cards.forEach((card, idx) => {
            if (idx !== currentIndex && idx !== nextIndex && idx !== (currentIndex === 0 ? cards.length - 1 : currentIndex - 1)) {
                card.className = 'project-card-mini';
            }
        });
    }, 4000);
}

// Start loading the portfolio when the page loads
document.addEventListener('DOMContentLoaded', loadPortfolioData);
