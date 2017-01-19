import ReactDOM from 'react-dom';
import React from 'react';
import PhoneBook from './PhoneBook';

$.ajax({
  url: 'http://www.mocky.io/v2/581335f71000004204abaf83',
  type: 'get',
  dataType: 'jsonp',
}).done((data) => ReactDOM.render(<PhoneBook contacts={data.contacts} />, document.getElementById('app')))
  .fail((data) => console.log('Error ' + data.status));
