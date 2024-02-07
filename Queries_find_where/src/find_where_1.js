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
  
    const result1 = await Student.find({ 'name.first' : "Mayuk", 'name.last' : "Mukherjee", 'address.state' : "California" }).
    where('address.district').equals('Atlanta').where('address.city').equals('Georgia').where('science.physics').gt(90).lte(100).
    select({ name: 1, "address.state" : 1, "address.district" : 1, "address.city" : 1, science : 1, hobbies : 1 });
    
   // console.log(result1);

    const result2 = await Student.find({ 'address.state' : /Texas/i, 'address.district' : /Atlanta/i, 'science.chemistry' : {$gt : 75, $lte : 85},
    hobbies : {$in : ["travelling", "judo", "blogging", "reading"]}}).where('address.city').equals('Denver').
    where('name.last').equals('Sarkar').where('science.mathematics').gt(85).lte(90).
    select({ 'name.first' : 1, 'name.last' : 1, address : 1, 'science.physics' : 1, 'science.chemistry' : 1, 'science.mathematics' : 1, hobbies : 1})

   // console.log(result2);

   const result3 = await Student.find({ "name.first" : /Aninda/i , "name.last" : /Mukherjee/i, email : 'Aninda@gmail.com'}).
                   where('address.state').equals('Massachuttes').
                   where('address.district').equals('Atlanta').
                   where('address.city').equals('Georgia').
                   where('science.physics').gte(80).lt(85).
                   where('science.chemistry').gt(85).lte(95).
                   where('science.mathematics').gte(70).lte(75).
                   where('hobbies').all([ 'painting', 'travelling', 'sports', 'judo' ]).
                   select({ name : 1, 'address.state' : 1, 'address.district' : 1, 'science.physics' : 1, 'science.mathematics' : 1, hobbies : 1})
   // console.log(result3);

    const result4 = await Student.find({ 'address.state' : 'Alabama', 'address.district' : 'Oklohama', 'address.city' : 'Atlanta'}).
                    where('name.first').equals('Sanlap').
                    where('address.district').equals('Oklohama').
                    where('address.city').equals('Atlanta').
                    where('science.physics').gte(80).lt(90).
                    where('science.mathematics').gt(75).lte(80).
                    where('hobbies').nin(['painting','travelling','blogging','dancing']).
                    select({ 'name.first' : 1, address : 1, 'science.physics' : 1, 'science.chemistry' : 1, hobbies : 1})
   
    // console.log(result4); 

    const result5 = await Student.find({ }).where('hobbies').in(['sculpting','gymming']).
                    select({ name : 1, 'address.state' : 1, 'address.city' : 1, 'science.chemistry' : 1, hobbies : 1 })
    
    // console.log(result5);

    const result6 = await Student.find({ }).where('hobbies').all(['travelling','sports','judo']).
                    select({ 'name.last' : 1 , 'address.district' : 1, science : 1, hobbies : 1 });
    // console.log(result6);

    const result7 = await Student.find({ }).where('hobbies').nin(['painting','travelling','reading','blogging']).
    select({ name : 1 , 'address.district' : 1, 'science.physics' : 1, 'science.mathematics' : 1, hobbies : 1 })

    console.log(result7);
}
