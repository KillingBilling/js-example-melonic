'use strict';

var BigNumber = require('bignumber.js');

var price = BigNumber(5000);

module.exports = {

  cycles: {
    $subscription: {
      $begin: ['monthly']
    },
    monthly: {
      $duration: "1 month",
      rub: {
        $cost: function(coverage$sum) { return price }
      }
    }
  },

  notifications: {
    rubBelow0: function(rub) { return BigNumber(rub).lt(0) }
  }

};
