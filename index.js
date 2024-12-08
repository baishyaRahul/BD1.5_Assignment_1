const express = require('express');
const { resolve } = require('path');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(express.static('static'));

app.use(cors());

//Endpoint 1: Calculate the total price of items in the cart
function calculateCartValue(newItemPrice, cartTotal) {
  let totalItemPrice = newItemPrice + newItemPrice + newItemPrice;
  let totalValue = totalItemPrice + cartTotal;
  return totalValue.toString();
}
app.get('/cart-total', (req, res) => {
  let newItemPrice = parseFloat(req.query.newItemPrice);
  let cartTotal = parseFloat(req.query.cartTotal);

  res.send(calculateCartValue(newItemPrice, cartTotal));
});

// Endpoint 2 : Apply a discount based on membership status
function calculateDiscount(cartTotal, isMember) {
  let totalDiscount = cartTotal * (1 - 10 / 100);
  if (isMember) {
    return totalDiscount;
  } else {
    return cartTotal;
  }
}
app.get('/membership-discount', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let isMember = req.query.isMember === 'true';

  res.send(calculateDiscount(cartTotal, isMember).toString());
});

// Endpoint 3 : Calculate tax on the cart total
function calculateTax(cartTotal) {
  let totalTaxAmount = cartTotal * (1 - 95 / 100);
  return totalTaxAmount.toString();
}
app.get('/calculate-tax', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);

  res.send(calculateTax(cartTotal));
});

// Endpoint 4 : Estimate delivery time based on shipping method
function calculateDays(shippingMethod, distance) {
  if (shippingMethod === 'express') {
    return distance / 100;
  } else if (shippingMethod === 'standard') {
    return distance / 50;
  }
}
app.get('/estimate-delivery', (req, res) => {
  let shippingMethod = req.query.shippingMethod;
  let distance = parseFloat(req.query.distance);

  res.send(calculateDays(shippingMethod, distance).toString());
});

// Endpoint 5 : Calculate the shipping cost based on weight and distance
function calculateShippingCost(weight, distance) {
  return weight * distance * 0.1;
}
app.get('/shipping-cost', (req, res) => {
  let weight = parseFloat(req.query.weight);
  let distance = parseFloat(req.query.distance);

  res.send(calculateShippingCost(weight, distance).toString());
});

// Endpoint 6 : Calculate loyalty points earned from a purchase
function calculateLoyaltyPoints(purchaseAmount) {
  let loyaltyPoints = purchaseAmount * (1 + (100/100))
  return loyaltyPoints;
}
app.get('/loyalty-points', (req, res) => {
  let purchaseAmount = parseFloat(req.query.purchaseAmount);

  res.send(calculateLoyaltyPoints(purchaseAmount).toString());
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
