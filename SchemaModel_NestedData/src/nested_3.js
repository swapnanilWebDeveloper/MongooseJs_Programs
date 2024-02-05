const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/PersonData');

    const personSchema = new mongoose.Schema({
        name: {
            first: { type: String, required: true, lowercase: true, trim: true },
            last: { type: String, required: true, uppercase: true, trim: true }
        },

        username: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
            minLength: 6,
            maxLength: 25,
        },

        email: {
            type: String,
            required: true,
            uppercase: true,
            trim: true,
            minLength: 6,
            maxLength: 35,
        },

        living: Boolean,
        updated: {
            type: Date,
            default: Date.now,
        },

        age: {
            type: Number,
            min: [18, 'You are too young to be in profession'],
            max: [65, 'Now you can retire...'],
        },

        occupation: {
            type: String,
            required: true,
        }
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
            username: "Mayuk_ProgrammER_USER",
            email: "Mayuk@GMAIL.com",
            living : true,
            updated: new Date,
            age : 19,
            occupation: "Software Developer",
        },
        {
            name: {
                first: 'Suryendu',
                last: 'Sarkar',
            },
            username: "Suryendu_MediCAL_USER",
            email: "Suryendu@Gmail.com",
            living : true,
            updated: new Date,
            age : 54,
            occupation: "MBBS Doctor",
        },
        {
            name: {
                first: 'Aninda',
                last: 'Mukherjee',
            },
            username: "Aninda_Mathematician_USER",
            email: "Aninda@Gmail.com",
            living : false,
            updated: new Date,
            age : 55,
            occupation: "MBBS Doctor",
        },
        {
            name: {
                first: 'Snlap',
                last: 'Gadai',
            },
            username: "Sanlap_Physist_USER",
            email: "Sanlap@Gmail.com",
            living : false,
            updated: new Date,
            age : 48,
            occupation: "Physics Masters",
        },
        {
            name: {
                first: 'Souvik',
                last: 'Mondal',
            },
            username: "Souvik_UnEmployeed_USER",
            email: "Souvik@Gmail.com",
            living : true,
            updated: new Date,
            age : 48,
            occupation: "Tier 3 Engineer",
        },
    ]);

    const allPerson = await Person.find({});
   // console.log(allPerson);

    for (var i = 0; i < allPerson.length; i++){
        console.log("first Name = " + allPerson[i].name.first + ", last Name = " + allPerson[i].name.last);
        console.log("userName = "+allPerson[i].username);
        console.log("email = "+allPerson[i].email);
        console.log("living = "+allPerson[i].updated);
        console.log("updated = "+allPerson[i].age);
        console.log("occupation = "+allPerson[i].occupation);
    }

}