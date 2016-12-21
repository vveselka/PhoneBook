var React = require('react');

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
  componentWillReceiveProps() {
    this.setState({
      mode: 0,
    });
  },
  render() {
    var error = this.state.error ? ' error' : '';
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
      return <div  className='row contact'>
        <div className="col-sm-3">
          <input className={'col-sm-12' + error} onChange={this.handleInput} onKeyDown={this.handleUpdKeyDown.bind(this, this.props.id)} value={this.state.name} name='name' autoFocus={true}></input>
        </div>
        <div className="col-sm-2">
          <input className={'col-sm-12' + error} onChange={this.handleInput} onKeyDown={this.handleUpdKeyDown.bind(this, this.props.id)} value={this.state.phone} name='phone'></input>
        </div>
        <div className="col-sm-5">
          <input className={'col-sm-12' + error} onChange={this.handleInput} onKeyDown={this.handleUpdKeyDown.bind(this, this.props.id)} value={this.state.address} name='address'></input>
        </div>
        <div className="col-sm-2 actionsColumn">
          <span className="saveContact" onClick={this.updateContact.bind(this, this.props.id)}>
            Save
          </span>
          <span className="cancelUpdating" onClick={this.cancelEditing}>
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
