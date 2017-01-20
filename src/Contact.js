import React from 'react';
import ContactAsForm from './ContactAsForm';
import ReactModal from 'react-modal';

export default class Contact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name,
      phone: this.props.phone,
      address: this.props.address,
      mode: 0,
      showModal: false,
      justRemovedElement: false,
    }
  }

  static propTypes = {
    name: React.PropTypes.string.isRequired,
    phone: React.PropTypes.string.isRequired,
    address: React.PropTypes.string.isRequired,
    id: React.PropTypes.number.isRequired,
    removeContact: React.PropTypes.func.isRequired,
    updateContact: React.PropTypes.func.isRequired,
    className: React.PropTypes.string,
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      name: newProps.name,
      phone: newProps.phone,
      address: newProps.address,
      mode: 0,
      justRemovedElement: false,
    });
  }

  render() {
    if (!this.state.mode) {
      const classForRemovedElement = this.state.justRemovedElement ? 'removedContact ':'';
      return <div className={'row contact ' + this.props.className + classForRemovedElement}>
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
            <span
              className="removeContact glyphicon glyphicon-trash"
              onClick={() => this.setState({showModal: true})}
            />
            <ReactModal
              isOpen={this.state.showModal}
              contentLabel="Modal"
              className="modalStyle"
              overlayClassName="overlayModalStyle">
                <div className="modalContent">Do you really want to remove '{this.props.name}' contact?</div>
                <div className="modalButton" onClick={() => this.setState({showModal: false})}>No</div>
                <div className="modalButton" onClick={() => this.handleModalRemove()}>Yes</div>
            </ReactModal>
            <span
              className="editContact glyphicon glyphicon-pencil"
              onClick={() => this.setState({mode: 1})}
            />
          </div>
        </div>
      </div>
    } else {
      return <ContactAsForm
        name={this.props.name}
        phone={this.props.phone}
        address={this.props.address}
        id={this.props.id}
        onSave={this.updateContact.bind(this)}
        onCancel={() =>  this.cancelEditing()}
        />
    }
  }

  handleModalRemove() {
    this.setState({
      justRemovedElement: true,
      showModal: false,
    });
    setTimeout(() => this.props.removeContact(this.props.id), 500);
  }

  updateContact(name, phone, address, id) {
    this.props.updateContact(id, name, phone, address);
    this.setState({mode: 0})
  }

  cancelEditing() {
    this.setState({
      name: this.props.name,
      phone: this.props.phone,
      address: this.props.address,
      mode: 0,
    });
  }
}
