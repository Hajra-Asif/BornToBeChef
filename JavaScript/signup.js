                        const modalOverlay = document.querySelector('.modal-overlay');
                        const openModalButton = document.querySelector('.open-modal-button');
                        const closeModalButton = document.querySelector('.close-modal');
                        const signupForm = document.getElementById('signupForm');
                        const switchToLogin = document.getElementById('switchToLogin');
                
                        openModalButton.addEventListener('click', () => {
                            modalOverlay.classList.add('active');
                            document.body.style.overflow = 'hidden';
                        });
                
                        closeModalButton.addEventListener('click', () => {
                            modalOverlay.classList.remove('active');
                            document.body.style.overflow = '';
                        });
                
                        modalOverlay.addEventListener('click', (e) => {
                            if (e.target === modalOverlay) {
                                modalOverlay.classList.remove('active');
                                document.body.style.overflow = '';
                            }
                        });
                
                        signupForm.addEventListener('submit', function (e) {
                            e.preventDefault();
                            const formData = {
                                firstName: document.getElementById('firstName').value,
                                lastName: document.getElementById('lastName').value,
                                email: document.getElementById('email').value,
                                password: document.getElementById('password').value,
                                confirmPassword: document.getElementById('confirmPassword').value,
                                termsAccepted: document.getElementById('terms').checked
                            };
                
                            // Add your signup logic here
                            console.log('Sign up attempt:', formData);
                        });
                
                        switchToLogin.addEventListener('click', (e) => {
                            e.preventDefault();
                            // Add logic to switch to login modal
                            console.log('Switching to login modal');
                        });
                
                        document.addEventListener('keydown', (e) => {
                            if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
                                modalOverlay.classList.remove('active');
                                document.body.style.overflow = '';
                            }
                        });