const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/PersonData');

  const personSchema = new mongoose.Schema({
    name: {
      first: { type : String},
      last: {type : String}
    }
  }, {
    virtuals: {
      fullName: {
        get() {
          return this.name.first + ' ' + this.name.last;
        },
        set(nameInfo) {
          this.name.first = nameInfo.substr(0, nameInfo.indexOf(' '));
          this.name.last = nameInfo.substr(nameInfo.indexOf(' ') + 1);
        }
      }
    }
  });

  const Person = mongoose.model('Person', personSchema);
  
   await Person.insertMany([
       {
         fullName : "Mayuk Mukherjee",
       },
       {
         fullName : "Suryendu Sarkar",
       },
       {
         fullName : "Aninda Mukherjee",
       },
       {
         fullName : "Sanlap Gadai"
       }
   ]) 

   const allPerson = await Person.find({});
   console.log(allPerson);
}