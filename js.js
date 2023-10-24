const calendarBody = document.getElementById("calendar-body");
const monthYear = document.getElementById("month-year");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");

const daysOfWeek = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
const months = [
    "ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO",
    "JULIO", "AGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE"
];

function getCurrentDate() {
    return new Date();
}

let currentDate = getCurrentDate();

function generateCalendar(year, month) {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const firstDayOfWeek = (firstDay.getDay() + 6) % 7; // Ajustar para que la semana empiece el lunes
    const lastDate = lastDay.getDate();
    const today = getCurrentDate();

    monthYear.textContent = months[month] + " " + year;
    calendarBody.innerHTML = "";

    let date = 1;

    for (let i = 0; i < 6; i++) {
        const row = document.createElement("tr");

        for (let j = 0; j < 7; j++) {
            const cell = document.createElement("td");
            if (i === 0 && j < firstDayOfWeek) {
                cell.textContent = "";
            } else if (date <= lastDate) {
                cell.textContent = date;
                if (
                    year === today.getFullYear() &&
                    month === today.getMonth() &&
                    date === today.getDate()
                ) {
                    cell.classList.add("today"); // Resaltar el día actual
                }
                date++;
            }
            row.appendChild(cell);
        }

        calendarBody.appendChild(row);
    }
}

function prevMonth() {
    currentDate.setMonth(currentDate.getMonth() - 1);
    generateCalendar(currentDate.getFullYear(), currentDate.getMonth());
}

function nextMonth() {
    currentDate.setMonth(currentDate.getMonth() + 1);
    generateCalendar(currentDate.getFullYear(), currentDate.getMonth());
}

prevButton.addEventListener("click", prevMonth);
nextButton.addEventListener("click", nextMonth);

generateCalendar(currentDate.getFullYear(), currentDate.getMonth());

// Actualizar automáticamente el día actual
setInterval(function () {
    const todayCells = document.querySelectorAll(".today");
    todayCells.forEach(function (cell) {
        cell.classList.remove("today");
    });
    currentDate = getCurrentDate();
    generateCalendar(currentDate.getFullYear(), currentDate.getMonth());
}, 1000 * 60); // Actualizar cada minuto
