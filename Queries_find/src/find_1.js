const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/StudentData');

  const studentSchema = new mongoose.Schema({
    name: {
        first : String,
        last : String,
    },
    email : String,
    address : {
        state : String,
        district : String,
        city : String,
    },
    science : {
        physics : Number,
        chemistry : Number,
        mathematics : Number,
    },
    hobbies : [String],
  });

  const Student = mongoose.model('Student', studentSchema);

   await Student.insertMany([
    { 
        name : {
            first : "Mayuk",
            last : "Mukherjee",
        },
        email : "Mayuk@gmail.com",
        address : {
            state : "California",
            district : "Atlanta",
            city : "Georgia",
        },
        science : {
            physics : 99,
            chemistry : 88,
            mathematics : 97,
        },
        hobbies : ["sports", "singing", "dancing", "painting"],
    },
    { 
        name : {
            first : "Suryendu",
            last : "Sarkar",
        },
        email : "Suryendu@gmail.com",
        address : {
            state : "Texas",
            district : "Atlanta",
            city : "Denver",
        },
        science : {
            physics : 74,
            chemistry : 82,
            mathematics : 86,
        },
        hobbies : ["reading", "singing", "blogging", "sculpting"],
    },
    { 
        name : {
            first : "Aninda",
            last : "Mukherjee",
        },
        email : "Aninda@gmail.com",
        address : {
            state : "Massachuttes",
            district : "Atlanta",
            city : "Georgia",
        },
        science : {
            physics : 82,
            chemistry : 94,
            mathematics : 75,
        },
        hobbies : ["painting", "travelling", "sports", "judo"],
    },
    { 
        name : {
            first : "Sanlap",
            last : "Gadai",
        },
        email : "Sanlap@gmail.com",
        address : {
            state : "Alabama",
            district : "Oklohama",
            city : "Atlanta",
        },
        science : {
            physics : 85,
            chemistry : 66,
            mathematics : 79,
        },
        hobbies : ["coocking", "drawing", "sports", "gymming"],
    },
   ]);
   
   const allStudent = await Student.find({});
  // console.log(allStudent);

  // name.first = "Mayuk", name.last = "Mukherjee"
   const result1 = await Student.find({ 'name.first' : 'Mayuk', 'name.last' : "Mukherjee",  'science.physics' : { $gte: 98 }, 
              'science.chemistry' : { $lte : 90, $gte : 85} }, 'name address.state address.district address.city hobbies');

   console.log(result1); 

   const result2 = await Student.find({ 'address.state' : /Texas/i, 'address.district' : /Atlanta/i, 'science.mathematics' : {$gt : 80, $lte : 90} }, 
                      'name.first name.last science.physics science.chemistry science.mathematics hobbies' );
   console.log(result2);

   const result3 = await Student.find({  'science.physics' : { $gte: 80, $lte : 85 }, 'science.chemistry' : { $gte : 90, $lte : 95},
                   'name.last' : "Mukherjee" }, 'name.first name.last address science.physics science.chemistry science.mathematics');
   console.log(result3);

   //likes: { $in: ['vaporizing', 'talking'] }
    const result4 = await Student.find({ 'name.first': /Sanlap/i, 'address.city' : /Atlanta/i , 'science.mathematics' : {$gt : 75, $lte : 85} }, 
                    'name address.state address.district address.city science hobbies');

   console.log(result4);

   const result5 = await Student.find({ hobbies : { $in : ['painting','sculpting'] }}, 'name.first name.last address science.chemistry hobbies');
   console.log(result5);

   const result6 = await Student.find({ hobbies : { $all : ["painting", "travelling", "sports", "judo"] }}, 'name address.state address.district address.city science hobbies');
   console.log(result6);

   const result7 = await Student.find({ hobbies : { $nin : ["gymming", "judo", "sculpting"] }}, 'name.first name.last address science.physics science.chemistry science.mathematics hobbies');
   console.log(result7);

}