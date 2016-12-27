var React = require('react');
var ContactAsForm = require('./ContactAsForm');

var Contact = React.createClass({
  propTypes: {
    name: React.PropTypes.string.isRequired,
    phone: React.PropTypes.string.isRequired,
    address: React.PropTypes.string.isRequired,
    id: React.PropTypes.number.isRequired,
    removeContact: React.PropTypes.func.isRequired,
    updateContact: React.PropTypes.func.isRequired,
    className: React.PropTypes.string,
  },
  getInitialState() {
    return {
      mode: 0,
      name: this.props.name,
      phone: this.props.phone,
      address: this.props.address,
      error: 0,
    }
  },
  componentWillReceiveProps(newProps) {
    this.setState({
      mode: 0,
      name: newProps.name,
      phone: newProps.phone,
      address: newProps.address,
    });
  },
  render() {
    var classValue = this.state.error ? ' error col-sm-12' : 'col-sm-12';
    if(!this.state.mode) {
        return <div className={'row contact ' + this.props.className}>
          <div className="col-sm-3">
            <div className="col-sm-12">{this.props.name}</div>
          </div>
          <div className="col-sm-2">
            <div className="col-sm-12">{this.props.phone}</div>
          </div>
          <div className="col-sm-5">
            <div className="col-sm-12">{this.props.address}</div>
          </div>
          <div className="col-sm-2 actionsColumn">
            <div className="col-sm-12">
              <span className="removeContact glyphicon glyphicon-trash" onClick={this.removeContact.bind(this, this.props.id)}></span>
              <span className="editContact glyphicon glyphicon-pencil" onClick={this.changeModeToEdit}></span>
            </div>
          </div>
        </div>
    } else {
      return <ContactAsForm name={this.props.name} phone={this.props.phone} address={this.props.address} id={this.props.id} onSave={this.updateContact} onCancel={this.cancelEditing} />
    }
  },
  removeContact(id) {
    this.props.removeContact(id);
  },
  changeModeToEdit() {
    this.setState({
      mode: 1,
    })
  },
  updateContact(name, phone, address, id) {
    this.props.updateContact(id, name, phone, address);
    this.setState({
      mode: 0,
    })
  },
  cancelEditing() {
    this.setState({
        mode: 0,
        name: this.props.name,
        phone: this.props.phone,
        address: this.props.address,
        error: 0,
    });
  },
});


module.exports = Contact;
