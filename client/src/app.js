var React = require('react');
var ReactDOM = require('react-dom');

var ViewBox = require('./components/ViewBox.jsx')


window.onload = function(){
  ReactDOM.render(
    <ViewBox 
    />,
    document.getElementById('app')
  );
}
