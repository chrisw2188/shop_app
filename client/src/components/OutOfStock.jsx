var React = require('react');

var OutOfStock = React.createClass({

  render: function() {
    return (
      <div id="outOfStock">
        <strong>{this.props.stock}</strong>
      </div>
    );
  }

});

module.exports = OutOfStock;