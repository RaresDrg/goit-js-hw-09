import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const inputEl = document.getElementById('datetime-picker');
const startBtn = document.querySelector('[data-start]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

let dataSelected;
let intervalId;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    dataSelected = selectedDates[0];
    handleDateValidation();
  },
};
flatpickr(inputEl, options);


function handleDateValidation() {
  const diff = calculateDifference();
  if (diff <= 0) {
    Notiflix.Notify.failure('Please choose a date in the future');
    return
  }
  if (diff > 0) {
    startBtn.disabled = false;
    Notiflix.Notify.info(
      'Data selected. Now, press "Start" to run the countdown timer'
    );
  }
}

function calculateDifference() {
  return dataSelected - new Date();
}


startBtn.addEventListener('click', () => {
  intervalId = setInterval(printCountdownTimer, 1000);
  Notiflix.Notify.success("Time's running");
  startBtn.disabled = true;
  inputEl.disabled = true;
  inputEl.style.cursor = "not-allowed"
});


function printCountdownTimer() {
  const timeLeft = calculateDifference();

  if (timeLeft <= 0) {
    clearInterval(intervalId);
    Notiflix.Notify.warning("Time's up");
    return;
  }

  const { days, hours, minutes, seconds } = formatDateTime(timeLeft);

  daysEl.textContent = addLeadingZero(days)
  hoursEl.textContent = addLeadingZero(hours)
  minutesEl.textContent = addLeadingZero(minutes)
  secondsEl.textContent = addLeadingZero(seconds)
  secondsEl.style.color = '#ee5486';
}


function formatDateTime(timeLeft) {
  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
  const seconds = Math.floor((timeLeft / 1000) % 60);
  return { days, hours, minutes, seconds };
}


function addLeadingZero(value) {
  return value.toString().padStart(2, 0);
};
