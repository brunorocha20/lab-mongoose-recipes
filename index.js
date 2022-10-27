const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

//Method 1 : Using Async Await

const bacalhau = {title: 'Bacalhau à Brás', level: 'Easy Peasy', ingredients: ['bacalhau', 'ovo', 'batata palha'], cuisine: 'tradicional', dishType: 'main_course', image: 'https://img-global.cpcdn.com/recipes/c941bf306ae3bbd6/680x482cq70/foto-principal-da-receita-bacalhau-a-bras.jpg', duration: 25, creator: 'Hugo Esteves'}

const manageRecipes = async () => {
  try {
    // Connection to the database "recipe-app"
    const dbConnection = await mongoose.connect(MONGODB_URI);
    console.log(`Connected to the database: "${dbConnection.connection.name}"`);

    // Before adding any recipes to the database, let's remove all existing ones
    await Recipe.deleteMany();

    // Run your code here, after you have insured that the connection was made
    
    await Recipe.create(bacalhau);
    console.log(bacalhau.title);

    let bueReceitas = await Recipe.insertMany(data);

    for (let i = 0; i < bueReceitas.length; i++) {
    console.log(bueReceitas[i].title);
    }

    let updateRigatoni = await Recipe.findOneAndUpdate({title: 'Rigatoni alla Genovese'}, {duration: 100});
    console.log(updateRigatoni);
    console.log('change succesfull');

    await Recipe.deleteOne({name: 'Carrot Cake'})

    dbConnection.disconnect();

  } catch (error) {
    console.log(error);
  }
};
manageRecipes();






//Method 2: Using .then() method
//If you want to use this method uncomment the code below:

/* mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
  })
  .catch((error) => {
    console.error('Error connecting to the database', error);
  }); */
