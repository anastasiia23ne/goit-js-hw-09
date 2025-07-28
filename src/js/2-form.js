const formStateKey = 'feedback-form-state';
const form = document.querySelector('.feedback-form');

const formData = {
  email: '',
  message: ''
};

const savedData = JSON.parse(localStorage.getItem(formStateKey));
if (savedData) {
  for (const key in savedData) {
    const input = document.querySelector(`[name="${key}"]`);
    if (input) {
      input.value = savedData[key];
      formData[key] = savedData[key];
    }
  }
}

form.addEventListener('input', event => {
  const key = event.target.name;
  const value = event.target.value.trim();

  formData[key] = value;
  localStorage.setItem(formStateKey, JSON.stringify(formData));
});

form.addEventListener('submit', event => {
  event.preventDefault();

  if (validateFormFields(formData)) {
    console.log('submit', formData);

    localStorage.removeItem(formStateKey);
    form.reset();
    formData.email = '';
    formData.message = '';
  } else {
    alert('Будь ласка, заповніть всі поля форми.');
  }
});


function validateFormFields(data) {
  let isValid = true;
  for (const key in data) {
    const input = document.querySelector(`[name="${key}"]`);
    if (!data[key]) {
      addBorderInputError(input);
      isValid = false;
    } else {
      removeBorderInputError(input);
    }
  }
  return isValid;
}


function addBorderInputError(input) {
  input.classList.add('error');
}

function removeBorderInputError(input) {
  input.classList.remove('error');
}
