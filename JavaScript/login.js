
const modalOverlay = document.querySelector('.modal-overlay');
const openModalButton = document.querySelector('.open-modal-button');
const closeModalButton = document.querySelector('.close-modal');
const loginForm = document.getElementById('loginForm');

// Open modal
openModalButton.addEventListener('click', () => {
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
});

// Close modal
closeModalButton.addEventListener('click', () => {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
});

// Close modal when clicking outside
modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Handle form submission
loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Add your login logic here
    console.log('Login attempt:', { email, password });
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
});
