var React = require('react');
var Contact = require('./Contact');
var Form = require('./Form');

var PhoneBook = React.createClass({
  propTypes: {
    contacts: React.PropTypes.array.isRequired,
  },
  getInitialState() {
    return {
        contacts: this.props.contacts,
        showForm: false,
        search: ''
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
      return <Contact key={index} name={element.name} phone={element.phone_number} address={element.address} id={index} removeContact={this.removeContact} updateContact={this.updateContact}/>
    }.bind(this));
    return <div>
      <div className="addNewContact" onClick={this.handleShowForm}>Add New</div>
      <input className='searchInput' type='text' value={this.state.search} onChange={this.handleSearch}></input>
      <div className="orderByName" onClick={this.orderContactsByName} >Order by Name</div>
      {this.state.showForm ? <Form addContact={this.addContact} closeForm={this.closeForm} /> : null}
      <div className='allContacts'>
        {allContacts}
      </div>
    </div>
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
