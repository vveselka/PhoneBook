import React, {Component, PropTypes} from 'react';

export default class Header extends React.Component {
  static propTypes = {
    title: React.PropTypes.string.isRequired,
    className: React.PropTypes.string.isRequired,
    sortType: React.PropTypes.string, // none, asc, desc
    onClick: React.PropTypes.func,
  }

  render() {
    let sortClass;
    if (this.props.sortType === 'asc') {
      sortClass = 'glyphicon glyphicon-sort-by-attributes';
    } else if (this.props.sortType === 'desc') {
      sortClass = 'glyphicon glyphicon-sort-by-attributes-alt';
    }
    const noSort = this.props.className.includes('noSort') ? 'noSort': '';
    return <div className={this.props.className} >
      <div className="col-sm-12">
        <div className={"header "+ noSort} onClick={this.props.onClick}>
        {this.props.title + ' '}
        </div>
        <span className="icon">
          <span className={sortClass}></span>
        </span>
      </div>
    </div>
  }
}
