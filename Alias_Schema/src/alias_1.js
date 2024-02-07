const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/PersonData');

  const personSchema = new mongoose.Schema({
    userName: {
      type: String,
      alias: 'un',
    },
    emailAddress : {
        type : String,
        alias : 'emAd',
    },
    location : {
        type : String,
        alias : "loc",
    },
    company : {
        type : String,
        alias : "comp",
    },
    salaryAnually : {
         type : Number,
         alias : "sal",
    }
  });
  
  const Person = mongoose.model('Person', personSchema);

   await Person.insertMany([
    { 
       un : "Mayuk Mukherjee",
       emAd : "Mayuk@gmail.com",
       loc : "Barendranagar",
       comp : "Infosys",
       sal : 12,
    },
    { 
        un : "Suryendu Sarkar",
        emAd : "Suryendu@gmail.com",
        loc : "Thana para",
        comp : "Accenture",
        sal : 8,
     },
     { 
        un : "Sanlap Gadai",
        emAd : "Sanlap@gmail.com",
        loc : "Rail Gate",
        comp : "Wipro",
        sal : 14,
     },
    ]);

    const allPerson = await Person.find({});
    console.log(allPerson);

    function GetAllPersonData(){
        for(var i = 0; i < allPerson.length; i++){
            console.log("person "+(i+1)+" : user name is = "+allPerson[i].un);
            console.log("person "+(i+1)+" : email address is = "+allPerson[i].emAd);
            console.log("person "+(i+1)+" : location is = "+allPerson[i].loc);
            console.log("person "+(i+1)+" : company is = "+allPerson[i].comp);
            console.log("person "+(i+1)+" : Anualy salary is = "+allPerson[i].sal+" lakhs");
            console.log("\n");
        }
    }

    GetAllPersonData();

   allPerson[0].un = "Waren Buffet";
   allPerson[0].loc = "Texas USA";
   allPerson[0].sal = 165;

   allPerson[1].emAd = "Bill@Gates.com";
   allPerson[1].comp = "Microsoft Co production & gaming";

   allPerson[2].loc = "Shibuya, Tokyo";
   allPerson[2].sal = 200;

   GetAllPersonData();

}