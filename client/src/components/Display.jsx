var React = require('react');

var Display = React.createClass({

  handleClick: function(e){
    console.log("yeah i just got clicked");
    this.props.addToCart(e.target.value)
  },

  render: function() {
    var items = this.props.stock.map(function(item){
      return (
        <tr key={item.name}>
          <td>{item.name}</td>
          <td>{item.category}</td>
          <td>{item.price.toFixed(2)}</td>
          <td>{item.quantity}</td>
          <td><button onClick={this.handleClick} value={item.name} >Add to cart</button></td>
        </tr>
        )
    }.bind(this))

    return (
      <div>
      <table id="display">
      <tbody>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock Level</th>

          </tr>
          {items}
          </tbody>
        </table>
      </div>
    );
  }

});

module.exports = Display;