var React = require('react');

var Cart = React.createClass({

  handleClick: function(e){
    this.props.remove(e.target.value);
  },

  render: function() {
    if(this.props.basket.length === 0){
      return (
        <div id= "cartDiv">
        <h4 id="cartEmpty">You don't have any items in your basket.</h4>
      </div>
      )
    }

    var items = this.props.basket.map(function(item){
      var index = this.props.basket.indexOf(item);
      return (
        <tr key={item.name}>
          <td>{item.name}</td>
          <td>{item.category}</td>
          <td>{item.price}</td>
          <td>{this.props.quantity[index]}</td>
          <td>
            <button value={index} onClick={this.handleClick}>Remove Item</button>
          </td>
        </tr>
        )
    }.bind(this))

    return (
      <div id="cartDiv">
        <table id="cart">
          <tbody>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Quantity</th>

            </tr>
            {items}
          </tbody>
        </table>
      </div>  

    );
  }

});

module.exports = Cart;