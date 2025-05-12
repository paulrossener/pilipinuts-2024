export function triggerTypingAnimation() {
    const element = document.querySelector("#nutshell .container h1");
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            startTyping(entry.target);
        } else if (!entry.isIntersecting) {
            entry.target.style.opacity = '0';
        }
        });
    }, { threshold: 0.5 });

    // elements.forEach(elem => observer.observe(elem));
    observer.observe(element)
}

function startTyping(el, speed = 200) {
  const elements = el.querySelectorAll(".typing-text");

  elements.forEach(elem => {
    const cursor = elem.querySelector('.cursor');
    const fullText = cursor.textContent.trim(); // keep the text already inside
    let i = 0;

    // Avoid retyping if already typed
    if (cursor.dataset.typed === "true") return;

    // Prepare
    cursor.textContent = '';
    cursor.style.animation = '';
    cursor.dataset.typed = "true"; // prevent repeat typing

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