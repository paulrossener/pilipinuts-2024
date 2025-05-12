export function triggerTypingAnimation() {
    const element = document.querySelector("#nutshell .container h1");
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            startTyping(entry.target);
        } else {
            entry.target.style.opacity = '0';
        }
        });
    }, { threshold: 0.5 });

    observer.observe(element)
}

function startTyping(el, speed = 200) {
  const elements = el.querySelectorAll(".typing-text");

  elements.forEach(elem => {
    const cursor = elem.querySelector('.cursor');
    const fullText = cursor.textContent.trim(); 
    let i = 0;

    if (cursor.dataset.typed === "true") return;

    // Prepare
    cursor.textContent = '';
    cursor.style.animation = '';
    cursor.dataset.typed = "true"; 

    const baseDelay = elem.classList.contains("delay") ? 2500 : 0;

    setTimeout(() => {
      const interval = setInterval(() => {
        if (i < fullText.length) {
          cursor.textContent += fullText[i];
          i++;
        } else {
          clearInterval(interval);
          cursor.style.animation = 'none';
          cursor.dataset.typed = "false";
        }
      }, speed);
    }, baseDelay);
  });
}