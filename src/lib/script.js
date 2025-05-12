import sdgs from "$lib/data/sdg.json";

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
    sdgCont.setAttribute("class", `sdg-item flex flex-row w-full items-center gap-[10px] py-[7px] border-b border-white/50`);
    sdgCont.setAttribute('data-color', sdg.color); 

    const img = document.createElement('img');
    img.setAttribute('src', sdg.image);
    img.setAttribute('alt', sdg.title);
    img.setAttribute('class', `sdg-img mx-[10px] p-[5px] w-[50px] h-[50px] object-contain ${sdg.color}`);

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
    desc.setAttribute('class', 'truncate');

    textCont.appendChild(header);
    textCont.appendChild(desc);

    sdgCont.appendChild(img);
    sdgCont.appendChild(textCont);
    
    return sdgCont;
}