export function triggerTypingAnimation() {
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            (entry.isIntersecting) ? entry.target.classList.add('animated') : entry.target.classList.remove('animated');
        });
    }, { threshold: 0.5 }); // Trigger when 50% of the element is in view

    const typingTexts = document.querySelectorAll('.typing-text');
    typingTexts.forEach(text => {
        observer.observe(text);
    });
}

export function triggerAnimation() {
    if (titleAnimation) return;

    titleAnimation = true;
    setTimeout(() => {
        titleAnimation = false;
    }, 1500 + num.length * 100);
}

export function scrollToSection(id) {
    console.log(id);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
}