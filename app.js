var ReactDOM = require('react-dom');
var React = require('react');
var PhoneBook = require('./PhoneBook');

$.ajax({
  url: 'http://www.mocky.io/v2/581335f71000004204abaf83',
  type: 'get',
  dataType: 'jsonp',
}).done(function(data) {
  ReactDOM.render(<PhoneBook contacts={data.contacts} />, document.getElementById('app'));
}.bind(this)).fail(function(data) {
  if(data.statusText) {
    console.log(data.statusText);
  }
});
