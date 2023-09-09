const input = document.createElement('input');
input.type = 'file';

let _resolve = () => {};
// eslint-disable-next-line no-unused-vars
let _reject = () => {};

input.addEventListener('input', () => {
  _resolve(input.files[0]);
  input.value = '';
});
/**
 *
 * @returns {Promise<File>}
 */
export const uploadSingle = async () => new Promise((resolve, reject) => {
  _resolve = resolve;
  _reject = reject;
  input.click();
});
