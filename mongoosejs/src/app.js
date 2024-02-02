const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {

    await mongoose.connect('mongodb://127.0.0.1:27017/PetCatDB');

    const kittySchema = new mongoose.Schema({
        name: String,
        age: Number,
        breed: String,
        price: Number,
        discApplicable : Boolean
    });

      kittySchema.methods.speak = function speak(greet) {
    
        const greeting = this.name
            ? 'Meow name is ' + this.name + ", "+greet
            : 'I don\'t have a name';
        
        console.log(greeting);
    };

    kittySchema.methods.Description = function Description(discount_percentage) {

        const catAge = this.age ? this.age : 'I donot have age';
        const catBreed = this.breed ? this.breed : "I am not defined with breed";
        const catPrice = this.price ? this.price : "My price has not been decided";
        
        console.log(this.name+", is age of = "+catAge+" , of the breed = "+catBreed+", with a price of = $ "+catPrice+" USD");

        if(this.discApplicable){
            const discPer = discount_percentage;
            const finalAmount = catPrice - catPrice * (discPer / 100);
            console.log("If we apply the discount coupon.....");
            console.log("The final price can be = $ "+finalAmount+" USD");
        }
        else{
            console.log("Sorry !! no discount can be given...!!!")
        }
    };

    const Kitten = mongoose.model('Kitten', kittySchema);

    const fluffy = new Kitten({
        name: 'fluffy',
        age: 6,
        breed: "American Shorthair",
        price: 250,
        discApplicable : true
    });

    const Sophia = new Kitten({
        name: 'Sopiha',
        age: 9,
        breed: "Swiss Longhair",
        price: 170,
        discApplicable : true
    });

    const Malfoy = new Kitten({
        name: 'Malfoy',
        age: 12,
        breed: "British Cute",
        price: 195,
        discApplicable : false
    });

    const Mcgonical = new Kitten({
        name: 'McGonical',
        age: 13,
        breed: "German Sommthy Texture",
        price: 145,
        discApplicable : true
    });

    await fluffy.save();
    await Sophia.save();
    await Malfoy.save();
    await Mcgonical.save();

    fluffy.speak("A very good morning from my side !!");
    fluffy.Description(42);

    Sophia.speak("Good afternoon Sir.. !!");
    Sophia.Description(18);

    Malfoy.speak("Good night every one...!!");
    Malfoy.Description(12);

    Mcgonical.speak("Welcome to the class of magical appearence...!!");
    Mcgonical.Description(23);
}

