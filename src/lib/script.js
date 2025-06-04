import sdgs from "$lib/data/sdg.json";
import projects from "$lib/data/projects.json";

export function projectList() {
    const col1 = document.getElementById('col-1');
    const col2 = document.getElementById('col-2');
    if (!col1 || !col2) return;

    const entries = Object.entries(sdgs);
    const half = Math.ceil(entries.length / 2);

    const items1 = entries.slice(0, half);
    const items2 = entries.slice(half);

    for (const [key, sdg] of items1) {
        col1.appendChild(sdgItem(key, sdg));
    }

    for (const [key, sdg] of items2) {
        col2.appendChild(sdgItem(key, sdg));
    }

}

function sdgItem(key, sdg) {
    const sdgCont = document.createElement('div');
    sdgCont.setAttribute("class", `sdg-item flex flex-row w-full items-center gap-4 py-[7px] border-b border-white/50`);
    sdgCont.setAttribute('data-color', sdg.color); 

    const img = document.createElement('img');
    img.setAttribute('src', sdg.image);
    img.setAttribute('alt', sdg.title);
    img.setAttribute('class', `sdg-img p-2 w-[50px] h-[50px] object-contain ${sdg.color}`);

    sdgCont.addEventListener('mouseenter', () => {
        const color = sdgCont.dataset.color.replace(/^bg-|\[|\]/g, '');
        sdgCont.style.backgroundColor = color;
    });

    sdgCont.addEventListener('mouseleave', () => {
        sdgCont.style.backgroundColor = ''; 
    });

    sdgCont.addEventListener('click', () => {
        window.location.href = `/sdg-${key}`;
    });

    const textCont = document.createElement('div');
    textCont.setAttribute('class', 'flex flex-col h-[100%] justify-center truncate');

    const header = document.createElement('h3');
    header.setAttribute('class', 'font-semibold');
    header.innerText = sdg.title;

    const desc = document.createElement('p');
    desc.innerText = sdg.description;
    desc.setAttribute('class', 'truncate font-mono font-light text-sm');

    textCont.appendChild(header);
    textCont.appendChild(desc);

    sdgCont.appendChild(img);
    sdgCont.appendChild(textCont);
    
    return sdgCont;
}




export async function featuredProjects() {
    const featured = document.getElementById('featuredProjects');
    const prev = document.getElementById('prev');
    const next = document.getElementById('next');

    const emptyText = document.createElement('h3');
    emptyText.setAttribute('class', 'text-white')
    emptyText.innerText = 'NOTHING FOLLOWS';

    const emptyStart = document.createElement('div');
    emptyStart.setAttribute('class', 'empty flex flex-col justify-center items-center w-[500px] h-full p-[15px]');
    emptyStart.appendChild(emptyText);
    featured.appendChild(emptyStart);

    for (const [key, sdg] of Object.entries(projects)) {
        for (const project of sdg) {
            const sdgItem = sdgs[key];

            const container = document.createElement('div');
            container.setAttribute('class', 'featured flex w-full h-full');

            const rotateContainer = document.createElement('div');
            rotateContainer.setAttribute('class', 'rotating flex flex-col w-[500px] h-full p-[15px]');
            rotateContainer.appendChild(await image());

            const header = document.createElement("h3");
            header.setAttribute('class', 'flex flex-grow text-base px-2');
            header.innerText = project.title;
            rotateContainer.appendChild(header);

            const stuff = document.createElement('div');
            stuff.setAttribute('class', 'flex flex-row w-full h-[20px] justify-between mt-auto');

            const p1 = document.createElement('p');
            p1.setAttribute('class', 'text-sm');
            p1.innerText = project.class || "FLASK";

            const p2 = document.createElement('p');
            p2.setAttribute('class', 'text-sm');
            p2.innerText = sdgItem.title || "SDG NAME";

            stuff.appendChild(p1);
            stuff.appendChild(p2);
            rotateContainer.appendChild(stuff);
            container.appendChild(rotateContainer);

            featured.appendChild(container);
        }
    };

    const emptyTextEnd = document.createElement('h3');
    emptyTextEnd.setAttribute('class', 'text-white')
    emptyTextEnd.innerText = 'NOTHING FOLLOWS';

    const emptyEnd = document.createElement('div');
    emptyEnd.setAttribute('class', 'empty flex flex-col justify-center items-center w-[500px] h-full p-[15px] opacty-0.5');
    emptyEnd.appendChild(emptyTextEnd);
    featured.appendChild(emptyEnd);

    function centerCard(index) {
        const card = featured.children[index];
        const cardOffsetLeft = card.offsetLeft;
        const containerWidth = featured.offsetWidth;
        const cardWidth = card.offsetWidth;
        const scrollTarget = cardOffsetLeft - (containerWidth / 2) + (cardWidth / 2);

        const maxScroll = featured.scrollWidth - containerWidth;
        const allowedScroll = Math.min(scrollTarget, maxScroll);

        featured.scrollTo({
            left: allowedScroll,
            behavior: 'smooth'
        });
    }

    centerCard(2);

    let currentIndex = 1;
    const totalCards = featured.children.length;

    next.addEventListener('click', () => {
        if (currentIndex < totalCards - 2) currentIndex++;
        centerCard(currentIndex);
    });

    prev.addEventListener('click', () => {
        if (currentIndex > 1) currentIndex--;
        centerCard(currentIndex);
    });
}

async function image() {
    try {
        const module = await import('$lib/assets/plots/16.png');
        const src = module.default;

        const img = document.createElement('img');
        img.src = src;
        img.alt = 'Profile';
        img.classList.add('mb-4', 'h-auto', 'w-auto');
        
        return img;

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
        iconList.appendChild(img);
    });
}