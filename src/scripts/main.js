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

    // Добавляем тулбар для работы с методами из класса Table
    const buttons = {
      insertRow: 'Добавить строку',
      addRow: 'Добавить строку в конец',
      getData: 'Получить JSON',
      cleanTable: 'Очистить таблицу'
    };
    const div = document.createElement('div');
    div.classList.add('toolbar');
    const input = document.createElement('input');
    input.classList.add('input', 'toolbar__input');
    input.type = 'number';
    div.appendChild(input);

    for (let [key, value] of Object.entries(buttons)) {
      const button = document.createElement('button');
      button.classList.add('button', 'toolbar__button');
      button.textContent = value;
      button.addEventListener('click',  (function (e) {
        e.preventDefault();

        if (key === 'insertRow') {
          this.table[key](this.input.value);
        } else {
          this.table[key]();
        }

      }).bind({table, input}));
      div.appendChild(button);
    }

    document.querySelector('#table-wrapper').appendChild(div);
    table.render();
  })
})();