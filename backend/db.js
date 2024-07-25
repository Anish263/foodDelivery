const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://anish:anish@clustergo.ebdgyft.mongodb.net/GoFood?retryWrites=true&w=majority&appName=ClusterGo'
const connectToMongo = async () => {

//     await mongoose.connect(mongoURI,{ useNewUrlParser: true, useUnifiedTopology: true })
//         .then(async () => {
//             console.log('Mongodb connected with server')
//             let fetched_data = await mongoose.connection.db.collection("food_items");
//             fetched_data.find({}).toArray(await function (err, data) {
//                 if (err) console.log(err);
//                 else {
//                     console.log(data);
//                     global.food_items = data;
                
//                 }
//             })
//         }).catch((err) => {
//             console.log(err);
//         })
// }
try {
    await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');
try{
    const fetched_data = await mongoose.connection.db.collection("food_items");
    let data = await fetched_data.find({}).toArray(); // Use await here to wait for the data
    const foodCategory = await mongoose.connection.db.collection("foodCategory"); 
    let catData = await foodCategory.find({}).toArray();
    global.food_items = data;
    global.foodCategory = catData;
   
}
catch (error) {
    console.error("Error fectching data",error);
 }
} catch (error) {
    console.error('Error connecting to MongoDB: ', error);
 }
};

module.exports = connectToMongo;