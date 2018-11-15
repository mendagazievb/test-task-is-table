// import {copyToClipboard} from './utils';

class Table {
  /**
   * @param id контейнер для таблицы
   * @param fields массив названий столбцов таблицы
   * @param rows количество строк в таблице
   * @param meta опциональный параметр (отображения ячейки заголовка, четной строки, нечетной строки)
   */
  constructor(id, fields = [], rows = 0, meta) {
    this.fields = fields;
    this.rows = rows;
    this.meta = meta;
    this.table = null;
    this.wrapper = document.getElementById(id);
  }

  render() {
    const table = document.createElement('table');
    table.classList.add('table');
    const tHead = document.createElement('thead');
    const tBody = document.createElement('tbody');
    const row = document.createElement('tr');
    row.classList.add('table__row');

    this.fields.forEach(field => {
      const th = document.createElement('th');
      th.textContent = field;
      row.appendChild(th);
    });

    // Проверка на наличие класса для строки заголовков
    if (this.meta[0]) {
      row.classList.add('table__row--header', this.meta[0]);
    }

    tHead.appendChild(row);

    for (let i = 0; i < this.rows; i++) {
      const row = this.createRow();
      row.classList.add('table__row');

      if (i % 2 === 0 && this.meta[1]) {
        row.classList.add('table__row--even', this.meta[1]);
      }

      if (i % 2 === 1 && this.meta[2]) {
        row.classList.add('table__row--odd', this.meta[2]);
      }

      tBody.appendChild(row);
    }

    let cell = null;
    let inputCell = null;
    let labelCell = null;

    document.addEventListener('click', (e) => {
      if (cell && cell.contains(e.target)) return;

      // Если есть открытый инпут, то скрываем и сохраняем значение
      if (inputCell) {
        labelCell.hidden = false;
        inputCell.hidden = true;
        labelCell.textContent = inputCell.value;
      }

      cell = e.target.closest('td');

      if (cell) {
        labelCell = cell.querySelector('label');
        inputCell = cell.querySelector('input');
        inputCell.hidden = false;
        labelCell.hidden = true;
      }

    });

    table.appendChild(tHead);
    table.appendChild(tBody);
    this.wrapper.appendChild(table);
    this.table = table;
  }

  createRow() {
    const row = document.createElement('tr');

    for (let j = 0; j < this.fields.length; j++) {
      const td = document.createElement('td');
      const label = document.createElement('label');
      const input = document.createElement('input');
      input.hidden = true;
      td.appendChild(label);
      td.appendChild(input);
      row.appendChild(td);
    }

    return row;
  }

  /**
   * Добавляет строку после указанной в параметре строки
   * @param index номер строки
   */
  insertRow(index) {
    const rows = this.table.rows;

    if (index < 0 || index > rows.length) {
      alert(`Строка с индексом ${index} не найдена`);
      return
    }

    this.table.tBodies[0].insertBefore(this.createRow(), rows[index].nextSibling)
  }

  /**
   * Добавляет строку в конец таблицы
   */
  addRow() {
    this.table.tBodies[0].appendChild(this.createRow());
  }

  /**
   * Получает JSON объект данных из таблицы
   */
  getData() {
    let array = [];

    [...this.table.rows].forEach((row, i) => {
      if (i === 0) return;
      let obj = {};

      [...row.cells].forEach((cell, i) => {
        const key = this.fields[i];
        obj[key] = cell.querySelector('label').textContent;
      });

      array.push(obj)
    });

    const data = JSON.stringify(array);

    navigator.clipboard.writeText(data)
      .then(() => alert(data))
      .catch(err => console.error(err))
  }

  /**
   * Очищает таблицу от данных
   */
  cleanTable() {
    [...this.table.rows].forEach((row, i) => {
      if (i === 0) return;

      [...row.cells].forEach(cell => {
        const input = cell.querySelector('input');

        if (input.value) {
          input.value = '';
          cell.querySelector('label').textContent = '';
        }
      })
    });
  }
}

export default Table;
