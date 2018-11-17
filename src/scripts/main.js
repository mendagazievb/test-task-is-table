import '../styles/styles.css';
import { checkFields } from './utils';
import Table from './Table';
import Toolbar from './Toolbar';

(function () {
  const btnCreateTable = document.querySelector('.js-create-table');
  const id = 'table-wrapper';

  btnCreateTable.addEventListener('click', (e) => {
    e.preventDefault();

    let { labels, rows, meta } = checkFields('label > input', 'input-error');

    if (!labels || !rows) return;

    labels = labels.split(',').map(item => item.trim());
    rows = Number(rows);
    meta = meta.split(',').map(item => item.trim());

    const table = new Table(id, labels, rows, meta);
    new Toolbar(id, table).render();

    table.render();
  })
})();