document.addEventListener('DOMContentLoaded', () => {
    const steps = document.querySelectorAll('.steps-container .step-card'); // Select all step cards
    const progress = document.querySelector('.progress'); // Select the progress bar
    const progressSteps = document.querySelectorAll('.progress-steps .step'); // Select the progress steps

    if (!steps.length || !progress || !progressSteps.length) {
        console.error('Steps, progress bar, or progress steps not found. Ensure the HTML structure is correct.');
        return;
    }

    function updateProgress(currentStep) {
        // Ensure the currentStep is within bounds
        if (currentStep < 1 || currentStep > steps.length) {
            console.error('Invalid step number. Ensure it is between 1 and the total number of steps.');
            return;
        }

        // Update the active state of progress steps
        progressSteps.forEach((step, index) => {
            if (index < currentStep) {
                step.classList.add('active');
            } else {
                step.classList.remove('active');
            }
        });

        // Update the progress bar width
        progress.style.width = `${(currentStep / steps.length) * 100}%`;
    }

    // Add hover event listeners to each step card
    steps.forEach((step, index) => {
        step.addEventListener('mouseover', () => {
            const currentStep = index + 1; // Steps are 1-based
            updateProgress(currentStep);
        });
    });
});

let currentFAQIndex = 0;

function moveFAQ(direction) {
    const faqCards = document.querySelector('.faq-cards');
    const totalFAQs = document.querySelectorAll('.faq-card').length;

    // Update the current index
    currentFAQIndex += direction;

    // Wrap around if the index goes out of bounds
    if (currentFAQIndex < 0) {
        currentFAQIndex = totalFAQs - 1;
    } else if (currentFAQIndex >= totalFAQs) {
        currentFAQIndex = 0;
    }

    // Move the FAQ cards
    faqCards.style.transform = `translateX(-${currentFAQIndex * 100}%)`;
}

