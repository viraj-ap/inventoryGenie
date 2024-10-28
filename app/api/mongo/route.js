// import { MongoClient } from "mongodb";  
// import { NextResponse } from "next/server";

// export async function GET(request) {


// // Replace the uri string with your connection string.
// const uri = "mongodb://localhost:27017/";

// const client = new MongoClient(uri);

// async function run() {
//   try {
//     const database = client.db('Inventory');
//     const movies = database.collection('Inventory');

//     // Query for a movie that has the title 'Back to the Future'
//     const query = { title: 'Back to the Future' };
//     const movie = await movies.findOne(query);

//     console.log(movie);
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);

// }