var React = require('react');
var Header = React.createClass({
  propTypes:{
    title: React.PropTypes.string,
    className: React.PropTypes.string,
    sortType: React.PropTypes.string, // none, asc, desc
    onClick: React.PropTypes.func,
  },
  render() {
    var sortClass;
    if(this.props.sortType === 'asc') {
      sortClass = 'glyphicon glyphicon-sort-by-attributes';
    } else if(this.props.sortType === 'desc') {
      sortClass = 'glyphicon glyphicon-sort-by-attributes-alt';
    }
    return <div className={this.props.className + ' header'} onClick={this.props.onClick}>
      {this.props.title}
      <span className={sortClass + ' icon'}></span>
    </div>
  },
})

module.exports = Header;
