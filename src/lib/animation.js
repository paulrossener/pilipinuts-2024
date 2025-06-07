export function triggerTypingAnimation() {
    const element = document.querySelector("#nutshell .text-container");
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            startTyping(entry.target);
        } else {
            entry.target.style.opacity = '0';
        }
        });
    }, { threshold: 0.1 });

    observer.observe(element)
}

function startTyping(el, speed = 50) {
  const elements = el.querySelectorAll(".typing-text");
  const baseDelay = {
    0 : 0,
    1 : 1500,
    2 : 2500,
    3 : 3500
  }
  
  elements.forEach((elem, count) => {
    const cursor = elem.querySelector('.cursor');
    const fullText = cursor.textContent.trim(); 
    let i = 0;

    if (cursor.dataset.typed === "true") return;

    // Prepare
    cursor.textContent = '';
    cursor.style.animation = '';
    cursor.dataset.typed = "true"; 


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
    }, baseDelay[count]);
  });
}

export function proceedProject() {
  const projectIntro = document.getElementById('projectIntro');
  const projectStart = document.getElementById('startProject');
  const proceedIcon = projectIntro?.querySelector('.proceed');

  if (!projectIntro || !projectStart || !proceedIcon) return; 

  projectIntro.scrollIntoView({ behavior: 'smooth' });
  proceedIcon.classList.add('animate');
    setTimeout(() => {
      proceedIcon.classList.remove('animate');
      projectStart.scrollIntoView({ behavior: 'smooth' });
    }, 2500); 


  observer.observe(projectIntro);
}
