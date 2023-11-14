import Notiflix from 'notiflix';

const form = document.querySelector('.form');
const firstDelayEl = document.querySelector('[name="delay"]');
const delayStepEl = document.querySelector('[name="step"]');
const amountEl = document.querySelector('[name="amount"]');

function getElValues() {
  const firstDelayValue = Number(firstDelayEl.value);
  const delayStepValue = Number(delayStepEl.value);
  const amountValue = Number(amountEl.value);
  return { firstDelayValue, delayStepValue, amountValue };
}


form.addEventListener('submit', event => {
  event.preventDefault();

  const { firstDelayValue, delayStepValue, amountValue } = getElValues();

  for (let i = 0; i < amountValue; i++) {
    const delay = firstDelayValue + delayStepValue * i;
    const position = i + 1;
    createPromise(position, delay);
  }
});


function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) resolve({ position, delay });
      else reject({ position, delay });
    }, delay);
  });
  
  handlePromiseResult(promise);
}


function handlePromiseResult(promise) {
  promise
    .then(({ position, delay }) => {
      Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });
}
