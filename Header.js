var React = require('react');
var Header = React.createClass({
  propTypes:{
    title: React.PropTypes.string.isRequired,
    className: React.PropTypes.string.isRequired,
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
    var noSort = this.props.className.includes('noSort') ? 'noSort': '';
    return <div className={this.props.className} onClick={this.props.onClick}>
      <div className="col-sm-12">
        <div className={'header '+ noSort}>
        {this.props.title + ' '}
        </div>
        <span className='icon'>
          <span className={sortClass}></span>
        </span>
      </div>
    </div>
  },
})

module.exports = Header;
