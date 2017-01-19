import React from 'react';
import Contact from './Contact';
import Form from './Form';
import Header from './Header';

export default class PhoneBook extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: this.props.contacts,
      showForm: false,
      search: '',
      sortingColumn: null,
      sortType: 'none',
      justAdded: false,
    }
  }

  static propTypes = {
    contacts: React.PropTypes.array.isRequired
  }

  render() {
    let allContacts = this.state.contacts;
    const searchQuery = this.state.search.trim().toLowerCase();
    if (searchQuery.length > 0 ) {
      allContacts = allContacts.filter(function(el) {
          return el.name.toLowerCase().includes(searchQuery)
            || el.phone_number.toLowerCase().includes(searchQuery)
            || el.address.toLowerCase().includes(searchQuery) ;
      });
    }

    allContacts = allContacts.map((element, index) => {
      const cssEffect = this.state.justAdded && index === 0 ? 'addedContact' : '';
      return <Contact
        key={index}
        name={element.name}
        phone={element.phone_number}
        address={element.address}
        id={index}
        removeContact={this.removeContact.bind(this)}
        updateContact={this.updateContact.bind(this)}
        className = {cssEffect}
      />;
    });

    return <div>
      <div className="addNewContact" onClick={(e) => this.handleShowForm(e)}>Add New</div>
      <input
        className="searchInput"
        type="text"
        value={this.state.search}
        onChange={(e) => this.handleSearch(e)}
        placeholder="Search contacts"
      />

      <div className="allContacts">
        <div className="row headers">
          <Header
            sortType={this.getSortType('name')}
            className="col-sm-3" title="Name"
            onClick={(e) => this.handleHeaderClick('name')}
          />
          <Header className="col-sm-2 noSort" title="Phone"/>
          <Header
            sortType={this.getSortType('address')}
            className="col-sm-5"
            title="Address"
            onClick={(e) => this.handleHeaderClick('address')}
          />
          <Header className="col-sm-2 noSort" title="Actions"/>
        </div>
        {this.state.showForm
          ? <Form
              addContact={this.addContact.bind(this)}
              closeForm={() => this.closeForm()}
            />
          : null}
        {allContacts}
      </div>
    </div>;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.justAdded) {
      setTimeout(() => this.setState({justAdded: false}), 3000);
    }
  }

  getSortType(column) {
    return this.state.sortingColumn === column ? this.state.sortType : 'none';
  }

  handleHeaderClick(column) {
    let sortType;
    if (this.state.sortingColumn !== column) {
      sortType = 'asc';
    } else {
      if (this.state.sortType === 'none') {
        sortType = 'asc';
      } else if (this.state.sortType === 'asc') {
        sortType = 'desc';
      } else if (this.state.sortType === 'desc') {
        sortType = 'asc';
      }
    }
    const sortedContacts = this.state.contacts.slice();

    sortedContacts.sort((a, b) => {
      let result = 0;
      if (a[column].toLowerCase() > b[column].toLowerCase()) {
        result = 1;
      } else if(a[column].toLowerCase() < b[column].toLowerCase()) {
        result = -1;
      }
      return sortType === 'asc' ? result : -result;
    });

    this.setState({
      contacts: sortedContacts,
      sortType: sortType,
      sortingColumn: column,
    });
  }

  handleShowForm() {
    this.setState({showForm: true})
  }

  removeContact(index) {
    const newContactList = this.state.contacts.slice();
    newContactList.splice(index, 1);
    localStorage.setItem('contacts', JSON.stringify(newContactList));
    this.setState({
      contacts: newContactList,
    });
  }

  updateContact(id, name, phone, address) {
    const newContactList = this.state.contacts.slice();
    localStorage.setItem('contacts', JSON.stringify(newContactList));
    newContactList[id].name = name;
    newContactList[id].phone_number = phone;
    newContactList[id].address = address;
    this.setState({
      contacts: newContactList,
      sortType: 'none',
    })
  }

  addContact(name, phone, address) {
    const newContactList = this.state.contacts.slice();
    newContactList.unshift({name: name, phone_number: phone, address: address});
    localStorage.setItem('contacts', JSON.stringify(newContactList));
    this.setState({
      contacts: newContactList,
      showForm: false,
      sortType: 'none',
      justAdded: true,
    });

  }

  handleSearch(e) {
    this.setState({search: e.target.value});
  }

  closeForm() {
    this.setState({showForm: false})
  }
}
