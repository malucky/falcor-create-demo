/* --------------------------------------

Below are several examples of hooking
up a Falcor model and getting data from
it to be displayed on the screen.

Step 1: A local model cache is setup
with some data. Data is requested with
various get requests to the model.

Step 2: We change the model over to a
JSON Graph with references so that data
isn't duplicated.

Step 3: We move the data over to the
server to be served from a Falcor Router.
This step is currently setup to run but 
you can comment it out and start from
Step 1 by uncommenting the appropriate
pieces.

----------------------------------------*/

/* === Step 1 === */

// We can prime the model cache with a new falcor.Model
var model = new falcor.Model({
  cache: {
    products: [
      {
        name: 'Tomorrow is today, Red printed scarf',
        price: '$15.00',
        categories: [
          {
            id: 1,
            name: 'accessories'
          }
        ],
      },
      {
        name: 'Chanel the Cheetah',
        price: '$500.00',
        categories: [
          {
            id: 1,
            name: 'accessories'
          },
          {
            id: 2,
            name: 'bags'
          }
        ],
      }
    ]
  }
});

// model
//   // We want the name and price values for the first two products
//   // from the data model
//   // FIX ME
//   .get(["products", {from: 0, to: 1}, ["name", "price"]], ["products", {from: 0, to: 1}, "categories", 0, "name"])
//   // .get(["products", {from: 0, to: 2}, ["name", "price", "categories"]])
//   .then(function(response) {
//     document.getElementById("event-data").innerHTML = JSON.stringify(response, null, 2);
//   });

// model
//   // We set the value of the first occurrence of accesories to accessories
//   .set(falcor.pathValue(["products", 0, "categories", 0, "name"], 'changed'))
//   .then(function(response) {
//     model
//       // What we find afterwards is that the value gets changed in one location, but not both.
//       // FIX ME
//       .get(["products", {from: 0, to: 1}, ["name", "price"]], ["products", {from: 0, to: 1}, "categories", 0, "name"])
//       .then(function(response) {
//         document.getElementById('event-data').innerHTML = JSON.stringify(response, null, 2);
//       });    
//   });


/* === Step 2 === */

// We can use the shorthand for references with a variable
// var $ref = falcor.Model.ref;

// var model = new falcor.Model({
//   cache: {
//     categoriesById: {
//       0: {
//         name: 'accesories'
//       },
//       1: {
//         name: 'bags'
//       }
//     },
//     products: [
//       {
//         name: 'Tomorrow is today, Red printed scarf',
//         price: '$15.00',
//         categories: [
//           $ref('categoriesById[1]')
//         ],
//       },
//       {
//         name: 'Chanel the Cheetah',
//         price: '$500.00',
//         categories: [
//           $ref('categoriesById[1]'),
//           $ref('categoriesById[2]')
//         ],
//       }
//     ]
//   }  
// });


// model
//   // Now when we rename the a category, it is reflected in both locations
//   .set(falcor.pathValue(["products", 0, "categories", 0, "name"], 'changed'))
//   .then(function(response) {
//     model
//       // What we find afterwards is that the value gets changed in one location, but not both.
//       .get(["products", {from: 0, to: 1}, ["name", "price"]], ["products", {from: 0, to: 1}, "categories", 0, "name"])
//       .then(function(response) {
//         document.getElementById('event-data').innerHTML = JSON.stringify(response, null, 2);
//       }); 
//   });


/* === Step 3 === */

// // We can set the model to have a data source that is retrieved from the backend
// // over HTTP by setting the soure to be a falcor.HttpDataSource.
var model = new falcor.Model({source: new falcor.HttpDataSource('/model.json')});

model
  .get(["products", {from: 0, to: 1}, ["name", "price"]], ["products", {from: 0, to: 1}, "categories" , 0, "name"])
  .then(function(response) {
    document.getElementById("event-data").innerHTML = JSON.stringify(response, null, 2);
  });
