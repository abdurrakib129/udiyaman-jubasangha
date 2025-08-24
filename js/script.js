document.addEventListener('DOMContentLoaded', function() {
    // Set active navigation link based on current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-menu li a');
    
    navLinks.forEach(link => {
        // Remove active class from all links
        link.classList.remove('active');
        
        // Add active class to current page link
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
    
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (navMenu && navMenu.classList.contains('active') && !event.target.closest('nav')) {
            navMenu.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Activities Filter
    const filterButtons = document.querySelectorAll('.filter-btn');
    const activitiesContainer = document.getElementById('activities-container');
    
    if (filterButtons.length > 0 && activitiesContainer) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                button.classList.add('active');
                
                const filterValue = button.getAttribute('data-filter');
                
                // Filter activities
                const activities = activitiesContainer.querySelectorAll('.activity-card');
                
                activities.forEach(activity => {
                    if (filterValue === 'all') {
                        activity.style.display = 'block';
                    } else if (activity.classList.contains(filterValue)) {
                        activity.style.display = 'block';
                    } else {
                        activity.style.display = 'none';
                    }
                });
            });
        });
    }

    // View Toggle (Grid/List)
    const viewButtons = document.querySelectorAll('.view-btn');
    
    if (viewButtons.length > 0 && activitiesContainer) {
        viewButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                viewButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                button.classList.add('active');
                
                const viewValue = button.getAttribute('data-view');
                
                // Toggle view class on container
                if (viewValue === 'list') {
                    activitiesContainer.classList.remove('activities-grid');
                    activitiesContainer.classList.add('activities-list');
                } else {
                    activitiesContainer.classList.remove('activities-list');
                    activitiesContainer.classList.add('activities-grid');
                }
            });
        });
    }

    // Members Filter
    const memberFilterButtons = document.querySelectorAll('.members-filter .filter-btn');
    const coreTeamSection = document.getElementById('core-team');
    const generalMembersSection = document.getElementById('general-members');
    
    if (memberFilterButtons.length > 0 && coreTeamSection && generalMembersSection) {
        memberFilterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                memberFilterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                button.classList.add('active');
                
                const filterValue = button.getAttribute('data-filter');
                
                // Show/hide sections based on filter
                if (filterValue === 'all') {
                    coreTeamSection.style.display = 'block';
                    generalMembersSection.style.display = 'block';
                } else if (filterValue === 'core') {
                    coreTeamSection.style.display = 'block';
                    generalMembersSection.style.display = 'none';
                } else if (filterValue === 'general') {
                    coreTeamSection.style.display = 'none';
                    generalMembersSection.style.display = 'block';
                }
            });
        });
    }

    // FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    if (faqQuestions.length > 0) {
        faqQuestions.forEach(question => {
            question.addEventListener('click', () => {
                const answer = question.nextElementSibling;
                const icon = question.querySelector('.faq-toggle i');
                
                // Toggle answer visibility
                if (answer.style.display === 'block') {
                    answer.style.display = 'none';
                    icon.classList.remove('fa-minus');
                    icon.classList.add('fa-plus');
                } else {
                    answer.style.display = 'block';
                    icon.classList.remove('fa-plus');
                    icon.classList.add('fa-minus');
                }
            });
        });
    }

    // Contact Form Validation
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Basic form validation
            let isValid = true;
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const message = document.getElementById('message');
            
            if (!name.value.trim()) {
                isValid = false;
                showError(name, 'Please enter your name');
            } else {
                removeError(name);
            }
            
            if (!email.value.trim()) {
                isValid = false;
                showError(email, 'Please enter your email');
            } else if (!isValidEmail(email.value)) {
                isValid = false;
                showError(email, 'Please enter a valid email');
            } else {
                removeError(email);
            }
            
            if (!message.value.trim()) {
                isValid = false;
                showError(message, 'Please enter your message');
            } else {
                removeError(message);
            }
            
            if (isValid) {
                // In a real application, you would send the form data to a server here
                // For now, just show a success message
                contactForm.innerHTML = '<div class="form-success"><i class="fas fa-check-circle"></i><h3>Thank you for your message!</h3><p>We will get back to you soon.</p></div>';
            }
        });
    }
    
    // Helper functions for form validation
    function showError(input, message) {
        const formGroup = input.parentElement;
        let errorElement = formGroup.querySelector('.error-message');
        
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            formGroup.appendChild(errorElement);
        }
        
        errorElement.textContent = message;
        formGroup.classList.add('error');
    }
    
    function removeError(input) {
        const formGroup = input.parentElement;
        const errorElement = formGroup.querySelector('.error-message');
        
        if (errorElement) {
            formGroup.removeChild(errorElement);
        }
        
        formGroup.classList.remove('error');
    }
    
    function isValidEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    // Create placeholder images
    const placeholderImages = document.querySelectorAll('#placeholder-img');
    if (placeholderImages.length > 0) {
        placeholderImages.forEach(img => {
            const parent = img.parentElement;
            const width = parent.offsetWidth;
            const height = parent.offsetHeight || 200;
            const text = img.alt || 'Image';
            
            // Create SVG placeholder
            const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svg.setAttribute('width', '100%');
            svg.setAttribute('height', '100%');
            svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
            svg.style.backgroundColor = '#1e1e1e';
            
            // Create rectangle background
            const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            rect.setAttribute('width', width);
            rect.setAttribute('height', height);
            rect.setAttribute('fill', '#1e1e1e');
            
            // Create text element
            const textElement = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            textElement.setAttribute('x', '50%');
            textElement.setAttribute('y', '50%');
            textElement.setAttribute('dominant-baseline', 'middle');
            textElement.setAttribute('text-anchor', 'middle');
            textElement.setAttribute('fill', '#b0b0b0');
            textElement.setAttribute('font-family', 'Arial, sans-serif');
            textElement.setAttribute('font-size', '14px');
            textElement.textContent = text;
            
            // Append elements to SVG
            svg.appendChild(rect);
            svg.appendChild(textElement);
            
            // Replace img with SVG
            parent.replaceChild(svg, img);
        });
    }

    // Create placeholder map
    const placeholderMap = document.getElementById('placeholder-map');
    if (placeholderMap) {
        const width = placeholderMap.offsetWidth;
        const height = placeholderMap.offsetHeight || 400;
        
        // Create SVG placeholder
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('width', '100%');
        svg.setAttribute('height', '100%');
        svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
        svg.style.backgroundColor = '#1e1e1e';
        
        // Create rectangle background
        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('width', width);
        rect.setAttribute('height', height);
        rect.setAttribute('fill', '#1e1e1e');
        
        // Create map grid lines
        for (let i = 0; i < width; i += 50) {
            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('x1', i);
            line.setAttribute('y1', 0);
            line.setAttribute('x2', i);
            line.setAttribute('y2', height);
            line.setAttribute('stroke', '#333');
            line.setAttribute('stroke-width', '1');
            svg.appendChild(line);
        }
        
        for (let i = 0; i < height; i += 50) {
            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('x1', 0);
            line.setAttribute('y1', i);
            line.setAttribute('x2', width);
            line.setAttribute('y2', i);
            line.setAttribute('stroke', '#333');
            line.setAttribute('stroke-width', '1');
            svg.appendChild(line);
        }
        
        // Create map pin
        const pin = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        pin.setAttribute('transform', `translate(${width/2}, ${height/2})`);
        
        const pinCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        pinCircle.setAttribute('cx', '0');
        pinCircle.setAttribute('cy', '0');
        pinCircle.setAttribute('r', '15');
        pinCircle.setAttribute('fill', '#6a3de8');
        
        const pinPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        pinPath.setAttribute('d', 'M0,0 L0,20 L-5,15 L0,20 L5,15 Z');
        pinPath.setAttribute('fill', '#6a3de8');
        
        pin.appendChild(pinCircle);
        pin.appendChild(pinPath);
        
        // Create text elements
        const textElement1 = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        textElement1.setAttribute('x', '50%');
        textElement1.setAttribute('y', '30%');
        textElement1.setAttribute('dominant-baseline', 'middle');
        textElement1.setAttribute('text-anchor', 'middle');
        textElement1.setAttribute('fill', '#b0b0b0');
        textElement1.setAttribute('font-family', 'Arial, sans-serif');
        textElement1.setAttribute('font-size', '16px');
        textElement1.textContent = 'Google Maps will be embedded here';
        
        const textElement2 = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        textElement2.setAttribute('x', '50%');
        textElement2.setAttribute('y', '70%');
        textElement2.setAttribute('dominant-baseline', 'middle');
        textElement2.setAttribute('text-anchor', 'middle');
        textElement2.setAttribute('fill', '#b0b0b0');
        textElement2.setAttribute('font-family', 'Arial, sans-serif');
        textElement2.setAttribute('font-size', '14px');
        textElement2.textContent = '123 Community Street, City, State 12345';
        
        // Append elements to SVG
        svg.appendChild(rect);
        svg.appendChild(pin);
        svg.appendChild(textElement1);
        svg.appendChild(textElement2);
        
        // Replace div with SVG
        placeholderMap.innerHTML = '';
        placeholderMap.appendChild(svg);
    }

    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add animation on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.animate-on-scroll');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('animated');
            }
        });
    };
    
    // Run animation check on load and scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
});