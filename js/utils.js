/**
 * Копирует текст в буфер обмена
 */
export const copyToClipboard = (text) => {
  const input = document.createElement('input');
  document.body.appendChild(input);
  input.value = text;
  input.focus();
  input.select();
  const result = document.execCommand('copy');
  document.body.removeChild(input);
};