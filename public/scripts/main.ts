import { onKeyPress, onSubmit } from './eventListeners';

const urlInput = document.querySelector('input');
urlInput.addEventListener('keypress', (e: KeyboardEvent) => {
  document.querySelector('#error').innerHTML = '';
  if (e.key == 'Enter') {
    console.log('enter pressed');
  }
});
const submit = document.querySelector('#submit');
submit.addEventListener('click', () => {
  const val = urlInput.value;
  const reg = new RegExp('^http://');
  const isValid = reg.test(val);
  if (val && isValid) {
    console.log(urlInput.value);
  } else {
    document.querySelector('#error').innerHTML = 'please provide an url';
  }
});
