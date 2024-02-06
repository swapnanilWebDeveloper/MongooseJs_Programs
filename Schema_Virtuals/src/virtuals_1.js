const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/PersonData');

  const personSchema = new mongoose.Schema({
    name: {
      first: { type : String},
      last: {type : String},
    }
  }, {
    virtuals: {
      fullName: {
        get() {
          return this.name.first + ' ' + this.name.last;
        }
      }
    }
  });

  const Person = mongoose.model('Person', personSchema);

  await Person.insertMany([
       {
         name : {
               first : "Mayuk",
               last : "Mukherjee",
           }
       }
  ])

   const allPerson = await Person.find({});
   console.log(allPerson);

   console.log("full name is = "+allPerson[0].fullName);
}