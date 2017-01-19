import React from 'react';
import ContactAsForm from './ContactAsForm';

export default class Form extends React.Component {
  static propTypes = {
    addContact: React.PropTypes.func.isRequired,
    closeForm: React.PropTypes.func.isRequired,
  }
  render() {
    return <ContactAsForm
      name=""
      phone=""
      address=""
      onSave={this.props.addContact}
      onCancel={this.props.closeForm}
    />;
  }
};
