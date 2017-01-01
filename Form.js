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
});

module.exports = Form;
