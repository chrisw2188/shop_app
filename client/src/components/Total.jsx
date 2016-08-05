var React = require('react');

var Total = React.createClass({



  render: function() {







    return (
      <div id="total">
        <h4>Basket Total</h4>
        <p className="red">Sub Total: £{this.props.subTotal.toFixed(2)}</p>
        <p className="blue">Discount: £{this.props.discount.toFixed(2)}</p>
        <p className="red">Total: £{this.props.total.toFixed(2)}</p>

      </div>
    );
  }

});

module.exports = Total;