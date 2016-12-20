var React = require('react');

var Contact = React.createClass({
  propTypes: {
    name: React.PropTypes.string,
    phone: React.PropTypes.string,
    address: React.PropTypes.string,
    id: React.PropTypes.number.isRequired,
    removeContact: React.PropTypes.func.isRequired,
    updateContact: React.PropTypes.func.isRequired,
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
  componentWillReceiveProps() {
    this.setState({
      mode: 0,
    });
  },
  render() {
    var error = this.state.error ? ' error' : '';
    if(!this.state.mode) {
        return <div  className='row contact'>
          <div className="col-sm-3">{this.props.name}</div>
          <div className="col-sm-2">{this.props.phone}</div>
          <div className="col-sm-5">{this.props.address}</div>
          <div className="col-sm-1">
            <span className="removeContact glyphicon glyphicon-trash" onClick={this.removeContact.bind(this, this.props.id)}></span>
            <span className="editContact glyphicon glyphicon-pencil" onClick={this.changeModeToEdit}></span>
          </div>
        </div>
    } else {
      return <div  className='row contact'>
        <input className={'col-sm-3' + error} onChange={this.handleInput} onKeyDown={this.handleUpdKeyDown.bind(this, this.props.id)} value={this.state.name} name='name' autoFocus={true}></input>
        <input className={'col-sm-2' + error} onChange={this.handleInput} onKeyDown={this.handleUpdKeyDown.bind(this, this.props.id)} value={this.state.phone} name='phone'></input>
        <input className={'col-sm-5' + error} onChange={this.handleInput} onKeyDown={this.handleUpdKeyDown.bind(this, this.props.id)} value={this.state.address} name='address'></input>
        <div className="col-sm-2">
          <span className="saveContact manageContactLeft" onClick={this.updateContact.bind(this, this.props.id)}>
            Save
          </span>
          <span className="cancelUpdating manageContactRight" onClick={this.cancelEditing}>
            Cancel
          </span>
        </div>
      </div>
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
  handleInput(e) {
    this.setState({
      [e.target.name]: e.target.value,
      error: 0,
    });
  },
  updateContact(id) {
    if(this.state.name !== '' && this.state.phone !== '' && this.state.address !== '') {
      this.props.updateContact(id, this.state.name, this.state.phone, this.state.address);
      this.setState({
        mode: 0,
      });
    } else {
      this.setState({
        error: 1,
      })
    }
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
  handleUpdKeyDown(id, e) {
    if(e.keyCode !== 13) return;
    else this.updateContact(id)
  }
});


module.exports = Contact;
