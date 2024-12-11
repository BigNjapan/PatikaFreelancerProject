/*!
* Start Bootstrap - Freelancer v7.0.7 (https://startbootstrap.com/theme/freelancer)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-freelancer/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

    // Add portfolio item functionality
    const addPortfolioForm = document.querySelector('#addPortfolioForm');
    if (addPortfolioForm) {
        addPortfolioForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = new FormData(addPortfolioForm);
            try {
                const response = await fetch('/portfolio/add', {
                    method: 'POST',
                    body: formData
                });
                
                if (response.ok) {
                    window.location.href = '/';
                }
            } catch (error) {
                console.error('Error adding portfolio item:', error);
            }
        });
    }

    // Delete portfolio item functionality
    const deleteButtons = document.querySelectorAll('.delete-portfolio-item');
    deleteButtons.forEach(button => {
        button.addEventListener('click', async () => {
            const itemId = button.dataset.id;
            if (confirm('Are you sure you want to delete this item?')) {
                try {
                    const response = await fetch(`/portfolio/${itemId}`, {
                        method: 'DELETE'
                    });
                    
                    if (response.ok) {
                        window.location.reload();
                    }
                } catch (error) {
                    console.error('Error deleting portfolio item:', error);
                }
            }
        });
    });

    // Edit portfolio item functionality
    const editForms = document.querySelectorAll('.edit-portfolio-form');
    editForms.forEach(form => {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const itemId = form.dataset.id;
            const formData = new FormData(form);
            
            try {
                const response = await fetch(`/portfolio/${itemId}`, {
                    method: 'PUT',
                    body: formData
                });
                
                if (response.ok) {
                    window.location.href = '/';
                }
            } catch (error) {
                console.error('Error updating portfolio item:', error);
            }
        });
    });

});
