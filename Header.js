var React = require('react');
var Header = React.createClass({
  propTypes:{
    title: React.PropTypes.string,
    className: React.PropTypes.string,
    sortType: React.PropTypes.string, // none, asc, desc
    onClick: React.PropTypes.func,
  },
  render() {
    var sort;
    if(this.props.sortType === 'asc') {
      sort = '^';
    } else if(this.props.sortType === 'desc') {
      sort = '?';
    }
    return <div className={this.props.className + ' header'} onClick={this.props.onClick}>
      {this.props.title}
      <span>
        {sort}
      </span>
    </div>
  },
})

module.exports = Header;
