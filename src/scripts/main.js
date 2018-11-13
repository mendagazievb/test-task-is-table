import '../styles/styles.css';
import Table from './Table';

const table = new Table('table-wrapper', ['Company', 'Contact', 'Country'], 4);
console.log('a');
table.render();
table.getData();