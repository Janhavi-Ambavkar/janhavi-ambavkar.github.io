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
        <a href="tel:${personalInfo.phone.replace('+', '')}" class="contact-link">
            <i class="fas fa-phone"></i> ${personalInfo.phone}
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

// Populate certificates section
function populateCertificatesSection() {
    const { certificates } = portfolioData;
    const certificatesGrid = document.getElementById('certificates-grid');
    
    certificatesGrid.innerHTML = certificates.map(cert => `
        <div class="certificate-card">
            <div class="certificate-icon">
                <i class="${cert.icon}"></i>
            </div>
            <div class="certificate-content">
                <h3>${cert.title}</h3>
                <p class="certificate-provider">${cert.provider}</p>
                <p class="certificate-description">${cert.description}</p>
                <span class="certificate-year">${cert.year}</span>
            </div>
        </div>
    `).join('');
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
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
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
            if (scrollY >= (sectionTop - 200)) {
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
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Typing effect for hero title
    function typeWriter(element, text, speed = 100) {
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
        typeWriter(heroTitle, originalText, 150);
    }

    // Parallax effect for hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        }
    });





    // Add hover effects for skill tags
    document.querySelectorAll('.skill-tag').forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.4)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = 'none';
        });
    });

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
        
        body:not(.loaded)::before {
            content: '';
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        body:not(.loaded)::after {
            content: 'Loading...';
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: white;
            font-size: 1.5rem;
            font-weight: 600;
            z-index: 10000;
        }
    `;
    document.head.appendChild(style);
}

// Start loading the portfolio when the page loads
document.addEventListener('DOMContentLoaded', loadPortfolioData);
