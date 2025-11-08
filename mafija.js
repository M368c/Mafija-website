//nav_bar 
const label = document.getElementById('how-many-players');
const pages = Array.from(document.querySelectorAll('div[id^="page"]'));
let current = 0;

function showPage(index) {
    pages.forEach((p, i) => p.style.display = i === index ? 'block' : 'none');
}

document.querySelectorAll('.next_button').forEach(btn => {
    btn.addEventListener('click', () => {
        current++;
        showPage(current);

        if (current === 1) { addPlayerLabel(); label.style.display = "none"}
    });
});

document.querySelectorAll('.previous_button').forEach(btn => {
    btn.addEventListener('click', () => {
        if (current > 0) current--;
        if (current === 0) { label.style.display = "block" }
        showPage(current);
    });
});

showPage(current);

// JOBS
const addJobBtn = document.getElementById('new_job_button');
const jobList = document.getElementById('job-list');

spinner_sum = 0;
let jobData = [];

function updateJobs() {
    spinner_sum = 0;
    jobData = [];

    Array.from(jobList.querySelectorAll('.job-entry')).forEach(row => {
        const name = row.querySelector('.input-job').value.trim();
        const count = parseInt(row.querySelector('.job-spinner').value) || 1;
        if (name !== '') {
            spinner_sum += count;
            for (let i = 0; i < count; i++) {
                jobData.push(name);
            }
        }
    });
   label.textContent = "Igralci: " + spinner_sum;
}

function addJob(name = '', removable = true) {
    const row = document.createElement('div');
    row.className = 'job-entry';

    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Vpiši vlogo'
    input.className = "input-job";
    input.value = name;
    input.addEventListener('input', updateJobs);
    row.appendChild(input);

    const spinner_input = document.createElement('input');
    spinner_input.type = 'number';
    spinner_input.className = 'job-spinner';
    spinner_input.min = 1;
    spinner_input.max = 5;
    spinner_input.value = 1;
    spinner_input.addEventListener('input', updateJobs);
    row.appendChild(spinner_input);

    if (removable) {
        const removeBtn = document.createElement('button');
        removeBtn.type = 'button';
        removeBtn.className = 'remove';
        removeBtn.textContent = '✕';
        removeBtn.addEventListener('click', () => {
            row.remove();
            updateJobs();
        });
        row.appendChild(removeBtn);
    }

    jobList.appendChild(row);
    updateJobs();
}


const preset = ['morilec', 'zdravnik', 'policist'];
preset.forEach(job => addJob(job, true));

addJobBtn.addEventListener('click', () => {
    addJob();
    x += 1;
    label.textContent = "Igralci: " + x;
});


// PLAYER-JOB LABELS
const end_screen = document.querySelector('.end-screen');
const cards_container = document.querySelector('.cards-container');
const job_btn = document.querySelector('.job_btn'); // OK button

let currentIndex = 0;

function addPlayerLabel() {
    jobs = shuffleJobs();

    currentIndex = 0;
    showNextPlayer();
}

function centerCards() {
    const container = document.querySelector('.cards-container');
    const btn = document.querySelector('.job_btn');
    
    if (!container) return;

    const viewportHeight = window.innerHeight;
    const containerHeight = container.offsetHeight;
    const btnHeight = btn ? btn.offsetHeight : 0;

    // margin-top to center cards + OK button
    const marginTop = (viewportHeight - containerHeight - btnHeight) / 4;

    container.style.marginTop = marginTop > 0 ? marginTop + 'px' : '0px';
}

centerCards();

// Recalculate on window resize
window.addEventListener('resize', centerCards);


function showNextPlayer() {
    cards_container.innerHTML = "";
    job_btn.innerHTML = "";

    if (currentIndex >= jobs.length) {
    pages.forEach(page => page.style.display = 'none');
    document.getElementById("endScreen").style.display = "flex"; // show new screen

    // Button actions
    document.getElementById("new-game-btn").onclick = () => {
        currentIndex = 0;
        addPlayerLabel();
        pages[1].style.display = 'block';
        document.getElementById("endScreen").style.display = "none"; // hide end screen
    };

    document.getElementById("add-player-btn").onclick = () => {
        currentIndex = jobs.length;
        current = 0;
        label.style.display = "block"
        document.getElementById("page1").style.display = 'block';
        document.getElementById("endScreen").style.display = 'none';
        };
    return;
}

    // Cards
    const card = document.createElement('div');
    card.className = 'card';

    card.addEventListener('click', () => {
        if (!card.classList.contains('flipped')) {
            card.classList.add('flipped');
            // ok button when cards are hidden
            const okBtn = document.createElement('button');
            okBtn.className = "ok_button";
            okBtn.textContent = "OK";
            okBtn.onclick = () => {
                currentIndex++;
                showNextPlayer();
            }
            job_btn.appendChild(okBtn);
       
     };
        
    });

    const inner = document.createElement('div');
    inner.className = 'inner';

    const front = document.createElement('div');
    front.className = 'front';
    front.textContent = 'Pokaži vlogo';

    const back = document.createElement('div');
    back.className = 'back';
    back.textContent = jobs[currentIndex];

    inner.appendChild(front);
    inner.appendChild(back);
    card.appendChild(inner);

    cards_container.appendChild(card);
   
    setTimeout(centerCards, 0);
}

// function for shuffle
function shuffleJobs() {
    let shuffled = [...jobData];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}
