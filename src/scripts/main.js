import '../styles/styles.css';
import Table from './Table';

(function () {
  /**
   * Проверка на наличие введенного текста в input по заданному css селектору
   * @param selector - css селектор
   * @param classError - название класса, добавляется если поле пустое (required)
   * @returns {object} где ключ равен input.name, а значение input.value
   */
  const checkFields = (selector, classError) => {
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

  document.querySelector('.js-create-table').addEventListener('click', (e) => {
    let { labels, rows, meta } = checkFields('label > input', 'input-error');

    if (!labels || !rows) return;

    labels = labels.split(',').map(item => item.trim());
    rows = Number(rows);
    meta = meta.split(',').map(item => item.trim());

    const table = new Table('table-wrapper', labels, rows, meta);
    table.render();
  })
})();