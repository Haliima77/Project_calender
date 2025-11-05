
document.querySelector('.dark-mode-switch').onclick = () => {
  document.body.classList.toggle('dark');
  document.body.classList.toggle('light');
};

function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

function getFebDays(year) {
  return isLeapYear(year) ? 29 : 28;
}


const calendar = document.querySelector('.calender');
const monthPicker = document.querySelector('#month-picker');
const monthList = document.querySelector('.month-list');
const yearDisplay = document.querySelector('#year');
const calendarDays = document.querySelector('.calender-days');

const month_names = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];


monthPicker.onclick = () => {
  monthList.classList.toggle('show');
};


function generateCalendar(month, year) {
  calendarDays.innerHTML = '';
  const days_of_month = [
    31, getFebDays(year), 31, 30, 31, 30,
    31, 31, 30, 31, 30, 31
  ];

  const today = new Date(); 
  monthPicker.innerHTML = month_names[month];
  yearDisplay.innerHTML = year;

  const first_day = new Date(year, month, 1);

  for (let i = 0; i < days_of_month[month] + first_day.getDay(); i++) {
    const day = document.createElement('div');

    if (i >= first_day.getDay()) {
      const date = i - first_day.getDay() + 1;
      day.innerHTML = date;


      if (
        date === today.getDate() &&
        year === today.getFullYear() &&
        month === today.getMonth()
      ) {
        day.classList.add('curr-date');
      }
    }
    calendarDays.appendChild(day);
  }

  highlightToday();
}


month_names.forEach((e, index) => {
  const month = document.createElement('div');
  month.innerHTML = `<div>${e}</div>`;
  month.onclick = () => {
    monthList.classList.remove('show'); 
    curr_month.value = index;
    generateCalendar(curr_month.value, curr_year.value);
  };
  monthList.appendChild(month);
});


document.querySelector('#prev-year').onclick = () => {
  --curr_year.value;
  generateCalendar(curr_month.value, curr_year.value);
};

document.querySelector('#next-year').onclick = () => {
  ++curr_year.value;
  generateCalendar(curr_month.value, curr_year.value);
};


const currDate = new Date();
const curr_month = { value: currDate.getMonth() };
const curr_year = { value: currDate.getFullYear() };

generateCalendar(curr_month.value, curr_year.value);


function highlightToday() {
  const today = new Date();
  const currentDate = today.getDate();
  const currentDay = today.getDay(); 


  document.querySelectorAll(".today-week").forEach(e => e.classList.remove("today-week"));


  const weekDays = document.querySelectorAll(".calender-week-day div");
  if (weekDays[currentDay]) {
    weekDays[currentDay].classList.add("today-week");
  }


  if (
    curr_month.value === today.getMonth() &&
    curr_year.value === today.getFullYear()
  ) {
    const allDays = document.querySelectorAll(".calender-days div");
    allDays.forEach(day => {
      if (parseInt(day.textContent) === currentDate) {
        day.classList.add("curr-date");
      }
    });
  }
}


function autoUpdateAtMidnight() {
  const now = new Date();
  const millisUntilMidnight =
    new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 5) - now;

  setTimeout(() => {

    const newDate = new Date();
    curr_month.value = newDate.getMonth();
    curr_year.value = newDate.getFullYear();
    generateCalendar(curr_month.value, curr_year.value);
    highlightToday();


    autoUpdateAtMidnight();
  }, millisUntilMidnight);
}


autoUpdateAtMidnight();