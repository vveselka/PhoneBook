var React = require('react');

var ContactAsForm = React.createClass({
  propTypes: {
    name: React.PropTypes.string,
    phone: React.PropTypes.string,
    address: React.PropTypes.string,
    id: React.PropTypes.number,
    onCancel: React.PropTypes.func,
    onSave: React.PropTypes.func,
  },
  getInitialState() {
    return {
      name: this.props.name,
      phone: this.props.phone,
      address: this.props.address,
      error: 0,
    }

  },
  componentWillReceiveProps(newProps) {

  },
  render: function() {
    var classValue = this.state.error ? ' error col-sm-12' : 'col-sm-12';
    return <div className='row contact'>
      <div className="col-sm-3">
        <input className={classValue} onChange={this.handleInput} onKeyDown={this.handleUpdKeyDown.bind(this, this.props.id)} value={this.state.name ? this.state.name: '' } name='name' autoFocus={true}></input>
      </div>
      <div className="col-sm-2">
        <input className={classValue} onChange={this.handleInput} onKeyDown={this.handleUpdKeyDown.bind(this, this.props.id)} value={this.state.phone} name='phone'></input>
      </div>
      <div className="col-sm-5">
        <input className={classValue} onChange={this.handleInput} onKeyDown={this.handleUpdKeyDown.bind(this, this.props.id)} value={this.state.address} name='address'></input>
      </div>
      <div className="col-sm-2 actionsColumn">
        <span className="saveContact" onClick={this.save.bind(this, this.props.id)}>
          Save
        </span>
        <span className="cancelUpdating text-muted" onClick={this.props.onCancel}>
          Cancel
        </span>
      </div>
    </div>
  },
  save(id) {
    if(this.state.name.trim() !== '' && this.state.phone.trim() !== '' && this.state.address.trim() !== '') {
      this.props.onSave(this.state.name, this.state.phone, this.state.address, id);
    } else {
      this.setState({
        error: 1,
      })
    }
  },
  handleUpdKeyDown(id, e) {
    if(e.keyCode !== 13) return;
    else this.updateContact(id)
  },
  handleInput(e) {
    this.setState({
      [e.target.name]: e.target.value,
      error: 0,
    });
  },
  updateContact(id) {
    this.save(id);
  },
});


module.exports = ContactAsForm;
