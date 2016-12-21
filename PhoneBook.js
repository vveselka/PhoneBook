var React = require('react');
var Contact = require('./Contact');
var Form = require('./Form');
var Header = require('./Header');

var PhoneBook = React.createClass({
  propTypes: {
    contacts: React.PropTypes.array.isRequired,
  },
  getInitialState() {
    return {
        contacts: this.props.contacts,
        showForm: false,
        search: '',
        sortingColumn: null,
        sortType: 'none',
    };
  },
  render() {
    var allContacts = this.state.contacts;
    var searchQuery = this.state.search.trim().toLowerCase();
    if(searchQuery.length > 0 ) {
      var allContacts = this.state.contacts;
      allContacts = allContacts.filter(function(el) {
          return el.name.toLowerCase().includes(searchQuery) || el.phone_number.toLowerCase().includes(searchQuery) || el.address.toLowerCase().includes(searchQuery) ;
      });
    }
    allContacts = allContacts.map(function(element, index) {
      return <Contact
        key={index}
        name={element.name}
        phone={element.phone_number}
        address={element.address}
        id={index}
        removeContact={this.removeContact}
        updateContact={this.updateContact}
      />;
    }.bind(this));
    return <div>
      <div className="addNewContact" onClick={this.handleShowForm}>Add New</div>
      <input className='searchInput' type='text' value={this.state.search} onChange={this.handleSearch}></input>
      <div className='allContacts'>
        <div className="row headers">
          <Header sortType={this.getSortType('name')} className="col-sm-3" title='Name' onClick={this.handleHeaderClick.bind(this, 'name')}/>
          <Header sortType={this.getSortType('phone')} className="col-sm-2" title='Phone' onClick={this.handleHeaderClick.bind(this, 'phone')}/>
          <Header sortType={this.getSortType('address')} className="col-sm-5" title='Address' onClick={this.handleHeaderClick.bind(this, 'address')} />
          <Header className="col-sm-2" title='Actions'/>
        </div>
        {this.state.showForm ? <Form addContact={this.addContact} closeForm={this.closeForm} /> : null}
        {allContacts}
      </div>
    </div>;
  },
  getSortType(column) {
    return this.state.sortingColumn === column ? this.state.sortType : 'none';
  },
  handleHeaderClick(column) {
    var sortType;
    if (this.state.sortingColumn !== column) {
      sortType = 'asc';
    } else {
      if(this.state.sortType === 'none') {
        sortType = 'asc';
      } else if(this.state.sortType === 'asc') {
        sortType = 'desc';
      } else if(this.state.sortType === 'desc') {
        sortType = 'asc';
      }
    }
    this.setState({
      sortingColumn: column,
      sortType: sortType,
    });
    var sortedContacts = this.state.contacts.slice();
    sortedContacts.sort(function(a,b) {
      var result = 0;
      if (a[column] > b[column]) {
        result = 1;
      } else if(a[column] < b[column]) {
        result = -1;
      }
      return sortType === 'asc' ? result : -result;
    });
    this.setState({
      contacts: sortedContacts,
    });
  },
  handleShowForm() {
    this.setState({
      showForm: true,
    })
  },
  removeContact(index) {
    var newContactList = this.state.contacts.slice();
    newContactList.splice(index, 1);
    this.setState({
      contacts: newContactList,
    });
  },
  updateContact(id, name, phone, address) {
    var newContactList = this.state.contacts.slice();
    newContactList[id].name = name;
    newContactList[id].phone_number = phone;
    newContactList[id].address = address;
    this.setState({
      contacts: newContactList,
    })
  },
  addContact(name, phone, address) {
    var newContactList = this.state.contacts.slice();
    newContactList.push({name: name, phone_number: phone, address: address});
    this.setState({
      contacts: newContactList,
      showForm: false,
    });
  },
  handleSearch(e) {
    this.setState({
      search: e.target.value,
    });
  },
  orderContactsByName() {
    var sortedContacts = this.state.contacts;
    sortedContacts.sort(function(a, b) {
      return a.name > b.name ? 1: (a.name < b.name) ? -1: 0;
    });
    this.setState({
      contacts: sortedContacts,
    })
  },
  closeForm() {
    this.setState({
      showForm: false,
    })
  }
});

module.exports = PhoneBook;
