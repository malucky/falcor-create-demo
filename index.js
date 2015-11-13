var falcor = require('falcor');
var falcorExpress = require('falcor-express');
var Router = require('falcor-router');

var express = require('express');
var _ = require('lodash');
var app = express();

// Have Express request index.html
app.use(express.static('.'));

var $ref = falcor.Model.ref;

// Same data that was used in the view for our
// events, but this time on a simple object
// and not a Falcor model.
var productsData = {
  categoriesById: {
    0: {
      name: 'accesories'
    },
    1: {
      name: 'bags'
    }
  },
  products: [
    {
      name: 'Tomorrow is today, Red printed scarf',
      price: '$15.00',
      categories: [
        $ref('categoriesById[1]')
      ],
    },
    {
      name: 'Chanel the Cheetah',
      price: '$500.00',
      categories: [
        $ref('categoriesById[1]'),
        $ref('categoriesById[2]')
      ],
    }
  ]
};

// We setup a model.json endpoint and pass it a dataSourceRoute which
// allows us to serve a router. Various route requests can be sent to the
// router to request whatever data is required
app.use('/model.json', falcorExpress.dataSourceRoute(function(req, res) {
  return new Router([
    {
      // Our route needs to match a pattern of integers that
      // are used as productId
      route: "products[{integers:productIds}]['name', 'price']",
      get: function(pathSet) {
        var results = [];

        // Above we specified an productId identifier that is an
        // array of ids which we can loop over
        pathSet.productIds.forEach(function(productId) {

          // Next, an array of key names that map is held at pathSet[2]
          pathSet[2].map(function(key) {

            // We find the event the cooresponds to the current product id
            var product = productsData.products[productId];

            // Finally we push a path/value object onto
            // the results array
            results.push({
              path: ['products', productId, key],
              value: product[key]
            });
          });
        });

        return results;
      }
    },
    {
      // Our route needs to match a pattern of integers that
      // are used as categoryId
      route: "categoriesById[{integers:categoryIds}]['name']",
      get: function(pathSet) {
        console.log(pathSet);
        
        var results = [];

        // Above we specified an categoryId identifier that is an
        // array of ids which we can loop over
        pathSet.categoryIds.forEach(function(categoryId) {

          // Next, an array of key names that map is held at pathSet[2]
          pathSet[2].map(function(key) {
            var category = productsData.categoriesById[categoryId];
            console.log(category);

            // Finally we push a path/value object onto
            // the results array
            results.push({
              path: ['categoriesById', categoryId, key], 
              value: category[key]
            });
          });          
        });

        return results; 
      }      
    }
  ]);
}));

app.listen(3000);
console.log("Listening on http://localhost:3000");
