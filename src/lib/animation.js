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

function startTyping(el, speed = 100) {
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

    const baseDelay = elem.classList.contains("delay") ? 1500 : 0;

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

export function proceedProject() {
  const projectIntro = document.getElementById('projectIntro');
  const projectStart = document.getElementById('startProject');
  const proceedIcon = projectIntro?.querySelector('.proceed');

  if (!projectIntro || !projectStart || !proceedIcon) return; // Safety check

  projectIntro.scrollIntoView({ behavior: 'smooth' });
  proceedIcon.classList.add('animate');
    setTimeout(() => {
      console.log('ugh');
      proceedIcon.classList.remove('animate');
      projectStart.scrollIntoView({ behavior: 'smooth' });
    }, 2500); 


  observer.observe(projectIntro);
}
