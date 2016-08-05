var React = require('react');
var Stock = require("../sample_data.json");
var Display = require("./Display")
var Cart = require("./Cart")
var OutOfStock = require("./OutOfStock")
var Total = require("./Total")
var Voucher = require("./Voucher.jsx")

var ViewBox = React.createClass({

  getInitialState: function() {
    return {
      stock:Stock,
      cart: [],
      quantity: [],
      inStock:"",
      total:0,
      voucher:"" 
    };
  },


  addToCart: function(clicked){
    var addedItem = this.state.stock.filter(function(item){
      if(item.name === clicked)
        return item;
    })
    if(addedItem[0].quantity === 0){
      this.setState({
        inStock:"Sorry this item is not in stock" 
      });
      return
    }
    this.updateStock(addedItem);
    this.add(addedItem);
    this.total();
  },

  updateStock: function(addedItem){
    console.log(addedItem);
    var updated = this.state.stock.map(function(item){
      if(item === addedItem[0]){
        item.quantity -= 1;
      }
      return item
    })
    this.setState({
      stock:updated,
      inStock:"" 
    });
  },

  add: function(addedItem){
    var index = this.state.cart.indexOf(addedItem[0]);
    console.log(index);
    if(index + 1){
      quantity = this.state.quantity;
      quantity[index] += 1;
      this.setState({
        quantity:quantity 
      });
    }
    else{
    var newCart = this.state.cart.concat(addedItem);
    var quantity = this.state.quantity;
    quantity.push(1);
    this.setState({
       cart:newCart,
       quantity:quantity 
     });
     } 
  },

  removeItem: function(index){
    var quantity = this.state.quantity;
    var item = this.state.cart[index];
    this.refreshStock(item);
    quantity[index] -= 1;
    this.setState({
      quantity:quantity
    });
    console.log(quantity[index]);
    if(quantity[index] < 1){
      var cart = this.state.cart;
      quantity.splice(index, 1)
      cart.splice(index, 1)
      this.setState({
        cart:cart,
        quantity:quantity 
      });
    }
  },

  refreshStock: function(removedItem){
    console.log("update stock level");
    var newStock = this.state.stock.map(function(item){
      if(item === removedItem){
        item.quantity += 1;
      }
      return item;
    })
  },

  subTotal: function(){
    var total = 0
    this.state.cart.forEach(function(item){
      var index = this.state.cart.indexOf(item);
      var productTotal = this.state.quantity[index] * item.price;
      total += productTotal;
    }.bind(this))
    return total
  },

  total: function(){
    var total = this.subTotal();
    if(total){
    return this.voucherChecker(total)
    console.log("Discount Applied");
    }
    console.log("no discount applied");
    return total;
  },

  discount: function(){
    var subTotal = this.subTotal();
    var total = this.total();
    var discount = this.subTotal() - this.total()
    return discount
  },

  voucherChecker: function(total){
    if(this.state.voucher === "five"){
      console.log(this.state.voucher);
      return this.fiveDiscount(total);
    }
    if(this.state.voucher === "ten"){
      return this.tenDiscount(total);
    }
    if(this.state.voucher === "fifteen"){
      return this.fifteenDiscount(total);
    }
    return total;
  },


  fiveDiscount: function(total){
    total -= 5
    return total;
  },

  tenDiscount: function(total){
    if(total > 50){
      total -= 10
      return total;
    }
    return total;
  },

  fifteenDiscount: function(total){
    var footwear = this.state.cart.filter(function(item){
      if(item.category === "Men’s Footwear" || item.category === "Women’s Footwear"){
        return item
      }
    })
    console.log(footwear.length);
    if(footwear.length > 0 && total > 75){
      total -= 15;
      return total;
    }
    return total;
  },

  applyVoucher: function(code){
    if(code === "five" || code === "ten" ||  code === "fifteen"){
    var voucher = code
    this.setVoucher(voucher)
    }
    else{
    var voucher = "invalid"
    this.setVoucher(voucher)
    }
  },

  setVoucher: function(voucher){
    this.setState({
      voucher:voucher 
    });
  },

  render: function() {
    return (
      <div>
        <h1 id="title">D. Shop</h1>
        <Display 
        stock={this.state.stock}
        addToCart={this.addToCart}
        />
        <OutOfStock
        stock={this.state.inStock}
        />
        <Voucher 
        applyVoucher={this.applyVoucher}
        cart={this.state.cart}
        voucher={this.state.voucher}
        />
        <Cart
        basket={this.state.cart}
        quantity={this.state.quantity}
        remove={this.removeItem}
        />
        <Total
        total = {this.total()}
        subTotal={this.subTotal()}
        discount={this.discount()}
        />
      </div>
    );
  }

});

module.exports = ViewBox;