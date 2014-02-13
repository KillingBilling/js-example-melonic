'use strict';

var BigNumber = require('bignumber.js');

var contactPrice = BigNumber(0.3);
var maxPrice = BigNumber(5000); //BigNumber(600) * contactPrice;
var min = function(x, y) { return x.comparedTo(y) < 0 ? x : y };

module.exports = {

  cycles: {
    $subscription: {
      $begin: ['monthly']
    },
    monthly: {
      $duration: "1 month",
      coverage: {
        sum: {
          aggr: function(x,y){ return BigNumber(x).plus(y) },
          init: function(x) { return 0 }
        }
      },
      rub: {
        $cost: function(coverage$sum) { return min(BigNumber(coverage$sum).times(contactPrice), maxPrice) }
      }
    }
  },

  notifications: {
    rubBelow0: function(rub) { return BigNumber(rub).lt(0) }
  }

};
