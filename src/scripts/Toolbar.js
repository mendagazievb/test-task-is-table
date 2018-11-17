export default class Toolbar {
  /**
   * Панель для работы с методами из класса Table через интерфейс
   * @param id - id контейнера для тулбара
   * @param context - экземпляр таблицы
   */
  constructor(id, context) {
    this.wrapper = document.getElementById(id);
    this.context = context;
  }

  render() {
    const buttons = {
      insertRow: 'Добавить строку после',
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
      button.addEventListener('click', function (e) {
        e.preventDefault();

        if (key === 'insertRow') {
          this.table[key](this.input.value);
        } else {
          this.table[key]();
        }

      }.bind({input, table: this.context}));
      div.appendChild(button);
    }

    this.wrapper.appendChild(div);
  }
}