const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/PersonData');

     const personSchema = new mongoose.Schema({
        name: {
          first: String,
          last: String
        },
        email : String,
        address : {
            state : String,
            district : String,
            city : String,
        },
        facebook: {
            votes: Number,
            favs: Number
        },

        nested: {
               stuff: { type: String, lowercase: true, trim: true }
        },
         
         age: { type: Number, min: 18, max: 65 },

         living: Boolean,
         hidden: Boolean,

         sport_array: [],
         singer_arrayofString: [String],
         phoneModel_ofNumber: [Number],
        // ofDates: [Date],

         updated: { type: Date, default: Date.now },
       //  date: { type: Date, default: Date.now },

         comments: [{ 
            body: String,
            date: Date,
            userName : String, 
            like : Boolean, 
            reply : String
        }],


      });
      
      // compile our model
      const Person = mongoose.model('Person', personSchema);
      
      // create a document
      await Person.insertMany([
        {
            name: { 
                    first: 'Mayuk',
                    last: 'Mukherjee',
                 },
            email : "Mayuk@gmail.com",
            address : {
                state : "Alabama",
                district : "Denver",
                city : "Ohio"
            },
            facebook : {
                votes : 2045,
                favs : 42,
            },
            nested : {
                stuff : "I am stuff number 1",
            },
            age : 34,

            living : true,
            hidden : false,

            sport_array : ["football",16, "cricket", 22, "badminton",25, "hockey", 29, "basketball"],
            
            singer_arrayofString : ["Taylor Swift", "Justin Bieber", "Bruno Mars", "Zayn Mallik", "Ed Sheeran"],

            phoneModel_ofNumber: [7, 11, 2, 4, 6, 16, 9],

            updated : new Date,

            comments: [
                { 
                   body: "This is comment number 1 from user 1",
                   date: new Date,
                   userName : "Kamilly Manoore", 
                   like : true, 
                   reply : "Thanks to you for feedback 1",
                },
                { 
                    body: "This is comment number 2 from user 2",
                    date: new Date,
                    userName : "Jemilly Rosaena", 
                    like : true, 
                    reply : "Thanks to you for feedback 2",
                 },
                 { 
                    body: "This is comment number 3 from user 3",
                    date: new Date,
                    userName : "Killey Jenner", 
                    like : false, 
                    reply : "Thanks to you for feedback 3",
                 },
            ],
        },
        
    ]);

    const allPerson = await Person.find({});
    console.log(allPerson);

    for(var i = 0; i < allPerson.length ; i++){
        console.log("first Name = "+allPerson[i].name.first+", last Name = "+allPerson[i].name.last);
        console.log("email = "+allPerson[i].email);
        console.log("state = "+allPerson[i].address.state+", district = "+allPerson[i].address.district+", city = "+allPerson[i].address.city);
        console.log("votes = "+allPerson[i].facebook.votes+", favourites = "+allPerson[i].facebook.favs);
        console.log("nested stuff = "+allPerson[i].nested.stuff+", age = "+allPerson[i].age+", living = "+allPerson[i].living+", hidden = "+allPerson[i].hidden);
        console.log("favourite sports = "+allPerson[i].sport_array+", favourite singers = "+allPerson[i].singer_arrayofString);
        console.log("Phone model number = "+allPerson[i].phoneModel_ofNumber);
        console.log("updated date = "+allPerson[i].updated);

        let allCom = allPerson[i].comments;
        console.log(allPerson[i].name.first+" "+allPerson[i].name.last+", has got : "+allCom.length+" comments....");

        for( var j = 0; j < allCom.length; j++){
             console.log("Person commented : "+allCom[j].userName);
             console.log("number "+(j+1)+" th comment is = "+allCom[j].body);
             console.log(allPerson[i].name.first+" "+allPerson[i].name.last+" replied with : "+allCom[j].reply);
             let res = allCom[j].like ? "Has liked your post" : "Has not liked your post";
             console.log(allCom[j].userName+" : "+res);
        }
    }

}