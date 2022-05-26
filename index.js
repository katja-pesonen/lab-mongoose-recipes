const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

const recipeOne = new Recipe({title: "kats recipe", cuisine:"spanish"});


// Connection to the database /special commands for WSL:
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
  autoIndex: false, // Don't build indexes
  maxPoolSize: 10, // Maintain up to 10 socket connections
  serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4 // Use IPv4, skip trying IPv6
}

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, options)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    recipeOne
    .save()
    .then(recipe => console.log("recipe creat", recipe))
    .catch(error => console.log("somme error", error))
    })

    Recipe.insertMany(data, (error, recipes)=>{
      if (error){
        console.log('An error happened:', error);
        return;
      }else{
        // console.log('The user is saved and its value is: ', recipes);
        Recipe.find({}, 'title')
              .then (recipe => console.log(recipe))
              .catch(error => {console.log(error)});
      }
      
      Recipe.findOneAndUpdate({title:"Rigatoni alla Genovese"}, { $set: { duration: 100 } })
        .then(console.log("update done"))
        .catch(console.log("update error"));

      Recipe.deleteOne({title:"Carrot Cake"})
        .then(console.log("deleted done"))
        .catch(console.log("deleted error"));
     })

  .catch(error => {
    console.error('Error connecting to the database', error);
  });

  