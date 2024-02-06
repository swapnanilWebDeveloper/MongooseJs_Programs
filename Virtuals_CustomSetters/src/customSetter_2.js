const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/PersonData');

  const personSchema = new mongoose.Schema({
    name: {
      first: { type : String},
      last: {type : String}
    },
    address : {
        state : { type : String},
        district : {type : String},
        city : {type : String},
    },
    company : {
        name : {type : String},
        location : {type : String},
        salary : {type : Number}
    }

  }, {
    virtuals: {
      fullName: {
        get() {
          return "person's full name is = "+this.name.first + ' ' + this.name.last;
        },
        set(nameInfo) {
          this.name.first = nameInfo.substr(0, nameInfo.indexOf(' '));
          this.name.last = nameInfo.substr(nameInfo.indexOf(' ') + 1);
        }
      },
      fullLocation: {
        get() {
          return "The cuurent location of Person is = "+this.address.state+" , "+this.address.district+", "+this.address.city;
        },
        set(addrInfo) {
            const text = addrInfo;

            const segmenter = new Intl.Segmenter([], { granularity: 'word' });
            const segmentedText = segmenter.segment(text);
            const words = [...segmentedText].filter(s => s.isWordLike).map(s => s.segment);
           // console.log(words);

          this.address.state = words[0];
          this.address.district = words[1];
          this.address.city = words[2];
        }
      },
    }
  });

  personSchema.virtual('CompInformation').
  get(function() {
    return "This person is working in : "+this.company.name+", at the : "+this.company.location+" branch, with a salary of : $"+this.company.salary+"k";
  }).
  set(function(compInfo) {
    // console.log("Hello everyone...!!")
            const text = compInfo;
        
            const segmenter = new Intl.Segmenter([], { granularity: 'word' });
            const segmentedText = segmenter.segment(text);
            const words = [...segmentedText].filter(s => s.isWordLike).map(s => s.segment);
           // console.log(words);
        
            this.company.name = words[0];
            this.company.location = words[1];
            this.company.salary = words[2];
  });

  const Person = mongoose.model('Person', personSchema);
  
   await Person.insertMany([
       {
         fullName : "Mayuk Mukherjee",
         fullLocation : "California Denver Alabama",
         CompInformation : "Google Oklohama 120"
       },
       {
         fullName : "Suryendu Sarkar",
         fullLocation : "Alaska Ohio Oklohama",
         CompInformation : "Microsoft Massachuttes 250",
       },
       {
         fullName : "Aninda Mukherjee",
         fullLocation : "Colorado Texas Huston",
         CompInformation : "Amazon Arizona 155",
       },
       {
         fullName : "Sanlap Gadai",
         fullLocation : "Indiana Boston Massachuttes",
         CompInformation :  "Adobe Texas 375",
       }
   ]) 

   const allPerson = await Person.find({});
   console.log(allPerson);

   // find that Person whose name.first is "Mayuk"....
   const nameRes1 = await Person.find({ 'name.first' : 'Mayuk'});
   console.log(nameRes1);
   console.log(nameRes1[0].fullName);
   console.log(nameRes1[0].fullLocation);
   console.log(nameRes1[0].CompInformation);

   // find that Person whose name.last is "Sarkar"....
   const nameRes2 = await Person.find({ 'name.last' : 'Sarkar'});
   console.log(nameRes2);
   console.log(nameRes2[0].fullName);
   console.log(nameRes2[0].fullLocation);
   console.log(nameRes2[0].CompInformation);

   //find that Person whose address.district = "Texas", city = "Huston"
   const nameRes3 = await Person.find({ 'address.district' : 'Texas', 'address.city' : 'Huston'});
   console.log(nameRes3);
   console.log(nameRes3[0].fullName);
   console.log(nameRes3[0].fullLocation);
   console.log(nameRes3[0].CompInformation);

   // find that Person company.name = "Adobe" , company.location = "Texas"
   const nameRes4 = await Person.find({ 'company.name' : 'Adobe', 'company.location' : 'Texas'});
   console.log(nameRes4);
   console.log(nameRes4[0].fullName);
   console.log(nameRes4[0].fullLocation);
   console.log(nameRes4[0].CompInformation);
}