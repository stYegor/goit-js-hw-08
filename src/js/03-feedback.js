import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';
let feedbackData = {};

const refs = {
  formData: document.querySelector('.feedback-form'),
  textareaData: document.querySelector('.feedback-form textarea'),
  emailData: document.querySelector('.feedback-form input'),
};

refs.formData.addEventListener('submit', onFormSubmit);
refs.textareaData.addEventListener('input', onTextareaInput);

refs.formData.addEventListener(
  'input',
  throttle(e => {
    feedbackData[e.target.name] = e.target.value;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(feedbackData));
  }, 500)
);

populateTextarea();

function onFormSubmit(evt) {
  evt.preventDefault();
  evt.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}

function onTextareaInput(evt) {
  const message = evt.target.value;
  localStorage.setItem(STORAGE_KEY, message);
}

function populateTextarea() {
  const savedMessage = localStorage.getItem(STORAGE_KEY);
  const parsedSavedMessage = JSON.parse(savedMessage);

  if (parsedSavedMessage) {
    feedbackData = parsedSavedMessage;
    refs.textareaData.value = feedbackData.message || '';
    refs.emailData.value = feedbackData.email || '';
  }
}

// refs.formData.addEventListener('submit', throttle(onFormSubmit, 500));
// refs.textareaData.addEventListener('input', throttle(onTextareaInput, 500));
