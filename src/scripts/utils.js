/**
 * Проверка на наличие введенного текста в input по заданному css селектору
 * @param selector - css селектор
 * @param classError - название класса, добавляется если поле пустое (required)
 * @returns {object} где ключ равен input.name, а значение input.value
 */
export const checkFields = (selector, classError) => {
  const elements = document.querySelectorAll(selector);
  let obj = {};

  [...elements].forEach((item, i) => {
    elements[i].classList.remove(classError);
    const value = item.type === 'checkbox' ? item.checked : item.value;

    if (value === '' && item.required) {
      elements[i].classList.add(classError);
      return;
    }

    obj[item.name] = item.value;
  });

  return obj;
};