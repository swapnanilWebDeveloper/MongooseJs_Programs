const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/PersonData');

     const personSchema = new mongoose.Schema({
        name: {
          first: String,
          last: String
        },

        living: Boolean,
        updated: { type: Date, default: Date.now },
        age: { type: Number, min: 18, max: 65 },

        
      });
      
      // compile our model
      const Person = mongoose.model('Person', personSchema);
      
      // create a document
      await Person.insertMany([
        {
            name: { 
                    first: 'Mayuk',
                    last: 'Mukherjee',
                 }
        },
        {
            name: { 
                    first: 'Suryendu',
                    last: 'Sarkar',
                 }
        },
        {
            name: { 
                    first: 'Aninda',
                    last: 'Mukherjee',
                 }
        },
        {
            name: { 
                    first: 'Snlap',
                    last: 'Gadai',
                 }
        },
        {
            name: { 
                    first: 'Souvik',
                    last: 'Mondal',
                 }
        },
    ]);

    const allPerson = await Person.find({});
    console.log(allPerson);

    for(var i = 0; i < allPerson.length ; i++){
        console.log("first Name = "+allPerson[i].name.first+", last Name = "+allPerson[i].name.last);
    }

}