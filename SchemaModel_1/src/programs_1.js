const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {

  await mongoose.connect('mongodb://127.0.0.1:27017/SocialMedia');

  const blogSchema = new mongoose.Schema({
    title: String, // String is shorthand for {type: String}
    author: String,
    body: String,
    email: String,
    age: Number,
    hidden: Boolean,
    likes: Number,
    /* comments: [{ body: String, date: Date }],
      date: { type: Date, default: Date.now },
      hidden: Boolean,
      meta: {
        votes: Number,
        favs: Number
      } */
  });

  const Blog = mongoose.model('Blog', blogSchema);

  await Blog.insertMany([
    {
      title: "Quantum Mechanics",
      author: "Mayuk Mukherjee",
      body: "Brief description of Quantum Mechanics",
      email: "Mayuk@gmail.com",
      age: 25,
      hidden: false,
      likes: 344,
    },
    {
      title: "Cardiology Arrest",
      author: "Suryendu Sarkar",
      body: "Cardiac Arrest has been explained with all concepts",
      email: "Suryendu@gmail.com",
      age: 22,
      hidden: true,
      likes: 758,
    },
    {
      title: "Oceanic Volcanos",
      author: "Aninda Mukherjee",
      body: "Errupting volcanos of pasific ocean",
      email: "Aninda@gmail.com",
      age: 28,
      hidden: true,
      likes: 1356,
    },
    {
      title: "Sea Food", 
      author: "Sanlap Gadai",
      body: "Eating habbit of consuming Sea food can increase your life expectancy",
      email : "Sanlap@gmail.com",
      age : 34,
      hidden : false,
      likes : 688,
    },
    {
      title: "MMA Boxing", 
      author: "Winston Churchil",
      body: "Brutal history of Bloody MMA fights",
      email : "Winston@gmail.com",
      age : 29,
      hidden : false,
      likes : 526,
    },
    {
        title: "USA elections", 
        author: "Arnab Goswami",
        body: "Where the polls of election in US is going ",
        email : "Arnab@gmail.com",
        age : 38,
        hidden : true,
        likes : 489,
    },
  ])

  const allBlogs = await Blog.find({});
  console.log(allBlogs);

}