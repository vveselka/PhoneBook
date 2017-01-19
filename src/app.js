import ReactDOM from 'react-dom';
import React from 'react';
import PhoneBook from './PhoneBook';

let contacts = [
  {
    name: 'Oleta Level',
    phone_number: '+442032960159',
    address: '10 London Wall, London EC2M 6SA, UK',
  },
  {
    name: 'Lia Pigford',
    phone_number: '+44203296018223',
    address: 'Westmorland Cl, Darwen BB3 2TQ, UK',
  },
  {
    name: 'Adan Milian',
    phone_number: '+44203296001120',
    address: 'Ellerbeck Rd, Darwen BB3 3EX, UK',
  }
]

let contactsForPhoneBook;
if (JSON.parse(localStorage.getItem('contacts')) === null) {
  localStorage.setItem('contacts', JSON.stringify(contacts));
  contactsForPhoneBook = contacts;
} else contactsForPhoneBook = JSON.parse(localStorage.getItem('contacts'));

ReactDOM.render(<PhoneBook contacts={contactsForPhoneBook} />,
  document.getElementById('app'));
