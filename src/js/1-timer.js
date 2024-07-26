import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const myInput = document.querySelector('#datetime-picker');
const startButton = document.querySelector('#start-button');

let userSelectedDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    if (selectedDate < new Date()) {
      iziToast.warning({
        title: 'Invalid Date',
        message: 'Please choose a date in the future',
        position: 'topCenter',
        timeout: 5000,
      });
      document.querySelector('#start-button').disabled = true;
    } else {
      document.querySelector('#start-button').disabled = false;
      userSelectedDate = selectedDate;
    }
  },
};

const fp = flatpickr(myInput, options);

const timer = {
  intervalId: null,

  start() {
    startButton.disabled = true;
    myInput.disabled = true;

    this.intervalId = setInterval(() => {
      const diff = userSelectedDate.getTime() - Date.now();

      if (diff <= 0) {
        this.stop();

        return;
      }

      const { days, hours, minutes, seconds } = convertMs(diff);

      document.querySelector('.js-timer__days .value').textContent =
        addLeadingZero(days);
      document.querySelector('.js-timer__hours .value').textContent =
        addLeadingZero(hours);
      document.querySelector('.js-timer__minutes .value').textContent =
        addLeadingZero(minutes);
      document.querySelector('.js-timer__seconds .value').textContent =
        addLeadingZero(seconds);
    }, 1000);
  },

  stop() {
    clearInterval(this.intervalId);
    startButton.disabled = false;
    myInput.disabled = false;
    iziToast.success({
      title: 'Done',
      message: 'Countdown completed!',
      position: 'topCenter',
      timeout: 5000,
    });
  },
};

startButton.addEventListener('click', function () {
  if (userSelectedDate) {
    timer.start();
  }
});

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
