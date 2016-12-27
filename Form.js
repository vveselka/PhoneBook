var React = require('react');
var ContactAsForm = require('./ContactAsForm');

var Form = React.createClass({
  propTypes: {
    addContact: React.PropTypes.func.isRequired,
    closeForm: React.PropTypes.func.isRequired,
  },
  render() {
    return <ContactAsForm
      name={""}
      phone={""}
      address={''}
      onSave={this.props.addContact}
      onCancel={this.props.closeForm} />;
  },
  addContact(name, phone, address) {
    this.props.addContact(name.trim(), phone.trim(), address.trim());
  },
});

module.exports = Form;
