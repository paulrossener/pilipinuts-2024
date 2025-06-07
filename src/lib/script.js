import sdgs from "$lib/data/sdg.json";
import projects from "$lib/data/projects.json";

export async function featuredProjects() {
    const featured = document.getElementById('featuredProjects');
    const prev = document.getElementById('prev');
    const next = document.getElementById('next');

    const projectSlides = document.createElement('div');
    projectSlides.setAttribute('class', 'flex');
    featured.appendChild(projectSlides);

    async function createProjectCard(project, key) {
        const sdgItem = sdgs[key];

        const container = document.createElement('div');
        container.setAttribute('class', 'featured flex w-full h-full group');

        const rotateContainer = document.createElement('div');
        rotateContainer.setAttribute('class', 'relative rotating flex flex-col w-[250px] sm:w-[300px] md:w-[400px] lg:w-[450px] xl:w-[500px] h-full p-[15px]');
        rotateContainer.appendChild(await image(project.plot));

        const textContainer = document.createElement('div');
        textContainer.setAttribute('class', 'absolute h-[100px] gap-[20px] flex flex-col w-full bottom-0 left-0 px-[30px] pb-[30px]');

        const header = document.createElement("h3");
        header.setAttribute('class', 'flex flex-grow text-xs sm:text-sm md:text-base font-semibold will-change-transform transition duration-300 delay-150 group-hover:-translate-y-2');
        header.innerText = project.title;
        textContainer.appendChild(header);

        const stuff = document.createElement('div');
        stuff.setAttribute('class', 'flex flex-row w-full h-[20px] justify-between mt-auto will-change-transform transition duration-300 delay-250 group-hover:-translate-y-2');

        const p1 = document.createElement('p');
        p1.setAttribute('class', 'text-[8px] sm:text-[10px] md:text-xs');
        p1.innerText = project.class || "FLASK";

        const p2 = document.createElement('div');
        p2.setAttribute('class', 'flex items-center gap-2 text-[8px] sm:text-[10px] md:text-xs');

        const img = document.createElement('img');
        img.src = sdgItem.image;
        img.alt = 'SDG Icon';
        img.setAttribute('class', `w-3 h-3 p-0.5 rounded-full ${sdgItem.color}`);

        const title = document.createElement('span');
        title.innerText = sdgItem.title || "SDG NAME";
        title.setAttribute('class', 'hidden md:inline')

        p2.appendChild(img);
        p2.appendChild(title);

        stuff.appendChild(p1);
        stuff.appendChild(p2);
        textContainer.appendChild(stuff);
        rotateContainer.appendChild(textContainer);
        container.appendChild(rotateContainer);

        container.onclick = () => {
            try {
                const url = new URL(project.website);
                window.open(url.href, '_blank', 'noopener,noreferrer');
            } catch {
                console.error("Invalid URL:", project.website);
            }
        };

        return container;
    }

    const realProjects = [];
    for (const [key, sdg] of Object.entries(projects)) {
        for (const project of sdg) {
            if (project.bell) {
                const card = await createProjectCard(project, key);
                realProjects.push(card);
            }
        }
    }

    const firstClone = realProjects[0].cloneNode(true);
    const lastClone = realProjects[realProjects.length - 1].cloneNode(true);

    projectSlides.appendChild(lastClone);
    realProjects.forEach(card => projectSlides.appendChild(card));
    projectSlides.appendChild(firstClone);

    let currentIndex = 1;
    const totalCards = realProjects.length;

    function centerCard(index, behavior = 'smooth') {
        const card = projectSlides.children[index];
        const cardOffsetLeft = card.offsetLeft;
        const containerWidth = featured.offsetWidth;
        const cardWidth = card.offsetWidth;
        const scrollTarget = cardOffsetLeft - (containerWidth / 2) + (cardWidth / 2);

        featured.scrollTo({
            left: scrollTarget,
            behavior
        });
    }

    centerCard(currentIndex);

    next.addEventListener('click', () => {
        if (currentIndex <= totalCards) {
            currentIndex++;
            centerCard(currentIndex);
        }

        if (currentIndex === totalCards + 1) {
            currentIndex = 1;
            centerCard(currentIndex);
        }
    });

    prev.addEventListener('click', () => {
        if (currentIndex >= 0) {
            currentIndex--;
            centerCard(currentIndex);
        }

        if (currentIndex === 0) {
            currentIndex = totalCards;
            centerCard(currentIndex);
        }
    });
}


async function image(plotNumber) {
    try {
        const src = `/plots/${plotNumber}.png`;

        const wrapper = document.createElement('div');
        wrapper.setAttribute('class', 'relative w-auto h-[150px] sm:h-[180px] md:h-[210px] lg:h-[240px] xl:h-[270px] group');

        const img = document.createElement('img');
        img.src = src;
        img.alt = 'Profile';
        img.classList.add(
            'projectImage',
            'w-full',
            'h-auto',
            'object-cover'
        );

        const overlay = document.createElement('div');
        overlay.classList.add(
            'absolute',
            'bottom-0',
            'left-0',
            'w-full',
            'h-[100%]',
            'bg-gradient-to-t',
            'from-black/90',
            'to-transparent',
            'transition',
            'duration-500',
            'ease-in-out',
            'pointer-events-none'
        );
        wrapper.appendChild(img);
        wrapper.appendChild(overlay);

        return wrapper;

    } catch (error) {
        console.error('Error loading the image:', error);
    }
}


export function icons() {
    const iconList = document.getElementById('iconList');

    Object.entries(sdgs).forEach(([key, sdg]) => {
        const img = document.createElement('img');
        img.setAttribute('src', sdg.image);
        img.setAttribute('alt', sdg.title);
        img.setAttribute('class', `sdg-img p-2 w-[50px] h-[50px] object-contain ${sdg.color}`);
        // img.setAttribute('class', `sdg-img p-1 lg:p-2 w-[40px] h-[40px] sm:w-[35px] sm:h-[35px] md:w-[40px] md:h-[40px] lg:w-[45px] lg:h-[45px] xl:w-[50px] xl:h-[50px] object-contain ${sdg.color}`);
        iconList.appendChild(img);
    });
}