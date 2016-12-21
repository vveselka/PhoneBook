var React = require('react');

var Form = React.createClass({
  propTypes: {
    addContact: React.PropTypes.func.isRequired,
    closeForm: React.PropTypes.func.isRequired,
  },
  getInitialState() {
    return {
      name: '',
      phone: '',
      address: '',
      error: 0,
    }
  },
  render() {
    var classValue = this.state.error ? 'col-sm-12 error' : 'col-sm-12';
    return <div className="addNewContactForm fade row">
      <div className="col-sm-3">
        <input className={classValue} type='text' name='name' onChange={this.handleInput} onKeyDown={this.handleSaveKeyDown} value={this.state.name} autoFocus={true}></input>
      </div>
      <div className="col-sm-2">
        <input className={classValue} type='text' name='phone' onChange={this.handleInput} onKeyDown={this.handleSaveKeyDown} value={this.state.phone}></input>
      </div>
      <div className="col-sm-5">
        <input className={classValue} type='text' name='address' onChange={this.handleInput} onKeyDown={this.handleSaveKeyDown} value={this.state.address}></input>
      </div>
      <div className="col-sm-2">
        <span className="saveContact" onClick={this.addContact}>
          Save
        </span>
        <span className="cancelUpdating" onClick={this.closeForm}>
          Cancel
        </span>
      </div>
    </div>
  },
  handleInput(e) {
    this.setState({
      [e.target.name]: e.target.value,
      error: 0,
    });
  },
  addContact(e) {
    e.preventDefault();
    if(this.state.name.trim() !=='' && this.state.phone.trim() !== '' && this.state.address.trim() !== '') {
      this.props.addContact(this.state.name.trim(), this.state.phone.trim(), this.state.address.trim());
      this.setState({
        name: '',
        phone: '',
        address: '',
      });
    } else {
      this.setState({
        error: 1,
      });
    }
  },
  handleSaveKeyDown(e) {
    if(e.keyCode !== 13) return;
    else this.addContact(e);
  },
  closeForm() {
    this.props.closeForm();
  }
});

module.exports = Form;
