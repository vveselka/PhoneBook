import React from 'react';

export default class ContactAsForm extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name,
      phone: this.props.phone,
      address: this.props.address,
      error: 0,
    }
  }

  static propTypes = {
    name: React.PropTypes.string.isRequired,
    phone: React.PropTypes.string.isRequired,
    address: React.PropTypes.string.isRequired,
    id: React.PropTypes.number,
    onCancel: React.PropTypes.func.isRequired,
    onSave: React.PropTypes.func.isRequired,
  }

  render() {
    const classValue = this.state.error ? ' error col-sm-12' : 'col-sm-12';
    return <div className="row contact">
      <div className="col-sm-3">
        <input
          className={classValue}
          onChange={(e) => this.handleInput(e)}
          onKeyDown={(e) => this.handleUpdKeyDown(this.props.id, e)}
          value={this.state.name ? this.state.name: '' }
          name="name"
          autoFocus={true}
        />
      </div>
      <div className="col-sm-2">
        <input
          className={classValue}
          onChange={(e) => this.handleInput(e)}
          onKeyDown={(e) => this.handleUpdKeyDown(this.props.id, e)}
          value={this.state.phone}
          name="phone"
        />
      </div>
      <div className="col-sm-5">
        <input
          className={classValue}
          onChange={(e) => this.handleInput(e)}
          onKeyDown={(e) => this.handleUpdKeyDown(this.props.id, e)}
          value={this.state.address}
          name="address"
        />
      </div>
      <div className="col-sm-2 actionsColumn">
        <span className="saveContact" onClick={() => this.save(this.props.id)}>
          Save
        </span>
        <span className="cancelUpdating text-muted" onClick={this.props.onCancel}>
          Cancel
        </span>
      </div>
    </div>
  }

  save(id) {
    if (this.state.name.trim() !== ''
      && this.state.phone.trim() !== ''
      && this.state.address.trim() !== '') {
      this.props.onSave(this.state.name, this.state.phone, this.state.address, id);
    } else {
      this.setState({
        error: 1,
      })
    }
  }

  handleUpdKeyDown(id, e) {
    if (e.keyCode !== 13) return;
    else this.save(id);
  }

  handleInput(e) {
    this.setState({
      [e.target.name]: e.target.value,
      error: 0,
    });
  }
}
