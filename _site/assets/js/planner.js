const tasks = [
    { name: "Pemilihan Beasiswa", duration: 0.5, color: "#f2b134", progress: 90 },
    { name: "Pemilihan Program", duration: 0.5, color: "#da6f2b", progress: 90 },
    { name: "Tes TOEFL IBT", duration: 1.5, color: "#f16666", progress: 35 },
    { name: "Tes GRE", duration: 1.5, color: "#928ff3", progress: 50 },
    { name: "Transkrip & Ijazah", duration: 1, color: "#6f8ffb", progress: 75 },
    { name: "Resume/CV", duration: 1, color: "#4cc2f0", progress: 90 },
    { name: "Surat Rekomendasi", duration: 1, color: "#81c469", progress: 50 },
    { name: "Statement of Purpose", duration: 1,  color: "#6ef388", progress: 25 },
    { name: "Formulir", duration: 0.5, color: "#34f91d", progress: 4 }
];

const programOptions = [
    { name: "Stanford MCIM Round 1", campus: "stanford", deadline: "2024-11-15" },
    { name: "MIT Chemical Engineering PhD", campus: "mit", deadline: "2024-12-01" }
];

function getStartWeekDay(date) {
    const dayOfWeek = date.getDay();
    const daysToMonday = (dayOfWeek === 0 ? 6 : dayOfWeek - 1);
    const mondayDate = new Date(date);
    mondayDate.setDate(date.getDate() - daysToMonday);
    return mondayDate;
}

function getDaysInMonth(date) {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}

function monthDiff(d1, d2) {
    let years = d2.getFullYear() - d1.getFullYear();
    let months = d2.getMonth() - d1.getMonth();
    let days = d2.getDate();

    let totalMonths = years * 12 + months + days / getDaysInMonth(d2);

    return Math.max(0, totalMonths);
}

const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

function createChart() {
    const deadlineDate = new Date(document.querySelector('.program-select').value);
    const programName = document.querySelector('.program-select').selectedOptions[0].text;
    const campus = document.querySelector('.program-select').selectedOptions[0].dataset.campus;

    const chartValues = document.querySelector(".chart-values");
    const chartBars = document.querySelector(".chart-bars");
    const deadline = document.querySelector(".deadline");
    const deadlineLine = document.querySelector(".deadline-line");

    const isCompacted = true;

    document.querySelector('.deadline img').src = `/assets/icons/${campus}.ico`;
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    document.querySelector('.deadline .deadline-text:nth-child(2)').textContent = "Deadline: " + deadlineDate.toLocaleDateString('en-GB', options);
    document.querySelector('.deadline .deadline-text:nth-child(3)').textContent = `(${programName})`;

    // Clear existing month labels and tasks
    chartValues.innerHTML = '';
    chartBars.innerHTML = '';

    let totalDuration = 0;
    tasks.forEach(task => {
        if (task.isActive !== false) {
            const duration = task.duration;
            const progress = task.progress;
            if (isCompacted) {
                totalDuration += duration * (1 - progress / 100);
            } else {
                totalDuration += duration;
            }
        }
    });

    let startDate = new Date(deadlineDate);
    startDate.setMonth(startDate.getMonth() - totalDuration);
    startDate = getStartWeekDay(startDate);

    const monthCount = Math.ceil(totalDuration) + 1;

    // Create month labels
    for (let i = 0; i < monthCount; i++) {
        const monthDate = new Date(startDate.getFullYear(), startDate.getMonth() + i, 1);
        const li = document.createElement('li');
        li.innerHTML = `<span>${monthNames[monthDate.getMonth()]}</span>`;
        chartValues.appendChild(li);

        // Add month divider
        if (i <= monthCount - 1) {
            const halfMonthDivider = document.createElement('li');
            halfMonthDivider.style.flexGrow = '0';
            halfMonthDivider.style.position = 'relative';
            halfMonthDivider.innerHTML = '<div style="position: absolute; top: 20px; bottom: 0; width: 1px; background-color: var(--divider); left: 50%;"></div>';
            chartValues.appendChild(halfMonthDivider);
        }
    }

    const totalWidth = 980; // Fixed width minus padding
    const monthWidth = totalWidth / monthCount;

    let currentStartDate = new Date(deadlineDate);
    let currentEndDate = new Date(deadlineDate);
    let activeTasksCount = 0;
    for (let index = tasks.length - 1; index >= 0; index--) {
        const task = tasks[index];
        if (task.isActive === false) continue;

        const duration = task.duration;
        const progress = task.progress;

        // Calculate start date for this task
        const remaining_duration = isCompacted ? duration * (1 - progress / 100) : duration;
        currentStartDate = new Date(currentEndDate - remaining_duration * 30 * 24 * 60 * 60 * 1000);
        // currentStartDate = getStartWeekDay(currentStartDate);

        const startMonth = monthDiff(startDate, currentStartDate);
        const left = startMonth * monthWidth;
        const width = duration * monthWidth;
        currentEndDate = new Date(currentStartDate);

        const li = document.createElement('li');
        li.dataset.color = task.color;
        li.style.left = `${left}px`;
        li.style.width = `${width}px`;
        li.style.top = `${40 + activeTasksCount * 30}px`;
        li.style.border = `2px solid ${task.color}`;

        li.innerHTML = `
    <div style="position: absolute; top: 0; right: 0; height: 100%; width: ${progress}%; background-color: ${task.color}; border-radius: 8px;"></div>
    <span class="timeline-text">${task.name}</span>
`;

        chartBars.appendChild(li);
        activeTasksCount++;
    }

    // Position deadline at the end
    const deadline_left = monthDiff(startDate, deadlineDate) * monthWidth;
    deadline.style.left = `${3 + deadline_left}px`;
    deadline.style.top = `${40 + activeTasksCount * 30}px`;
    deadlineLine.style.left = `${deadline_left}px`;
    deadlineLine.style.height = `${chartValues.offsetHeight + (activeTasksCount + 1) * 40}px`;
}

function createTaskControls() {
    const taskControlsContent = document.querySelector('.task-controls-content');
    taskControlsContent.innerHTML = '';

    tasks.forEach((task, index) => {
        const controlDiv = document.createElement('div');
        controlDiv.classList.add('task-control');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = `task-${index}`;
        checkbox.checked = task.isActive !== false;
        checkbox.addEventListener('change', (e) => {
            task.isActive = e.target.checked;
            slider.style.display = e.target.checked ? 'inline-block' : 'none';
            progressSpan.style.display = e.target.checked ? 'inline-block' : 'none';
            createChart();
        });

        const label = document.createElement('label');
        label.htmlFor = `task-${index}`;
        label.textContent = task.name;

        const slider = document.createElement('input');
        slider.type = 'range';
        slider.min = '0';
        slider.max = '100';
        slider.value = task.progress;
        slider.style.display = checkbox.checked ? 'inline-block' : 'none';
        slider.addEventListener('input', (e) => {
            task.progress = parseInt(e.target.value);
            progressSpan.textContent = `${task.progress}%`;
            createChart();
        });

        const progressSpan = document.createElement('span');
        progressSpan.textContent = `${task.progress}%`;
        progressSpan.style.display = checkbox.checked ? 'inline-block' : 'none';

        controlDiv.appendChild(checkbox);
        controlDiv.appendChild(label);
        controlDiv.appendChild(slider);
        controlDiv.appendChild(progressSpan);

        taskControlsContent.appendChild(controlDiv);
    });
}

function createProgramSelect() {
    const programSelect = document.querySelector('.program-select');
    programOptions.forEach(program => {
        const option = document.createElement('option');
        option.value = program.deadline;
        option.textContent = program.name;
        option.dataset.campus = program.campus;
        programSelect.appendChild(option);
    });
    programSelect.addEventListener('change', createChart);
}

function toggleTaskControls() {
    const content = document.querySelector('.task-controls-content');
    const button = document.querySelector('.collapse-button');
    if (content.style.display === 'none') {
        content.style.display = 'block';
        button.textContent = '▲';
    } else {
        content.style.display = 'none';
        button.textContent = '▼';
    }
}

let userName = '';

function toggleUserInput() {
    const container = document.querySelector('.user-input-container');
    const input = document.getElementById('user-name-input');
    if (container.style.display === 'none') {
        container.style.display = 'block';
        input.focus(); // Automatically focus on the input when displayed
    } else {
        container.style.display = 'none';
    }
}

function applyUserName() {
    const input = document.getElementById('user-name-input');
    userName = input.value.trim();
    updateUserNameDisplay();
    toggleUserInput();
}

function updateUserNameDisplay() {
    const footerText = document.querySelector('.page-madeby small');
    const taskControlsTitle = document.querySelector('.task-controls-title');
    
    if (userName) {
        footerText.innerHTML = `Dibuat dengan<span>❤</span> oleh MyKampus untuk ${userName}`;
        taskControlsTitle.textContent = `Ceklis Dokumen (${userName})`;
    } else {
        footerText.innerHTML = `Dibuat dengan <span>❤</span> oleh MyKampus Planner`;
        taskControlsTitle.textContent = 'Ceklis Dokumen';
    }
}

function handleUserNameInput(event) {
    if (event.key === 'Enter') {
        applyUserName();
    }
}

window.addEventListener("load", () => {
    createProgramSelect();
    createTaskControls();
    createChart();

    document.querySelector('.collapse-button').addEventListener('click', toggleTaskControls);
    document.querySelector('.user-input-toggle').addEventListener('click', toggleUserInput);
    document.getElementById('apply-user-name').addEventListener('click', applyUserName);
    document.getElementById('user-name-input').addEventListener('keypress', handleUserNameInput);

    // Initialize user name display
    updateUserNameDisplay();
});

window.addEventListener("resize", createChart);