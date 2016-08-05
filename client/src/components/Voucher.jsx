var React = require('react');

var Voucher = React.createClass({

  handleSubmit: function(e){
    e.preventDefault();
    this.props.applyVoucher(e.target.input.value);
  },



  render: function() {
    var voucher = null;
    if(this.props.voucher === "invalid"){
      voucher = <h4 id="invalid">This is not a valid voucher please try again.</h4>
    }

    if(this.props.cart.length > 0){
      return (
        <div id="voucher">
          <form onSubmit={this.handleSubmit}>
            <label>Enter your voucher code</label>
            <input id="input" type="text"/>
            <input type="submit" value="Apply Voucher"/>
          </form>
          {voucher}
        </div>
      );
    }
    return <div/>  
  }

});

module.exports = Voucher