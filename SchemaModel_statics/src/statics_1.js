// getting-started.js
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/AnimalData');

  const animalSchema = new mongoose.Schema({ name: String, breed: String, countryOrigin : String },
    {
      statics: {
        async findByBreed(animal_breed) {
             
           const species = await this.find({ breed: new RegExp(animal_breed) });
           console.log("All animal species is = "+species);

           console.log("all the breed = "+animal_breed+", total found animal number = "+species.length);

           for(var i = 0; i < species.length; i++){
            console.log("name is = "+species[i].name);
            console.log("breed is = "+species[i].breed);
            console.log("countryOrigin is = "+species[i].countryOrigin+"\n");
           }

           return species;
        }
      }
    });

    animalSchema.statics.findByName =  async function(animal_name, modelName) {

        console.log("I am inside findByName() method...."+animal_name);
        const nameAnimal = await modelName.find({ name: new RegExp(animal_name) });
        
        console.log(nameAnimal);
        console.log("number of animals with name : "+animal_name+" : found = "+nameAnimal.length);

        for(var i = 0; i < nameAnimal.length; i++){
             console.log("name of the animal = "+nameAnimal[i].name);
             console.log("breed of the animal = "+nameAnimal[i].breed);
             console.log("country of origin of the animal = "+nameAnimal[i].countryOrigin);
        }

        return nameAnimal;
      };

    const Animal = mongoose.model('Animal', animalSchema);
     
    await Animal.insertMany([
        { 
          name: 'Siberian Husky',
          breed : "Dog",
          countryOrigin : "Siberia"
        },
        { 
            name: 'British Smooth Hair',
            breed : "Cat",
            countryOrigin : "United Kingdom"
        },
        { 
            name: 'American Short Hair',
            breed : "Cat",
            countryOrigin : "USA"
        },
        { 
            name: 'Bull Dog',
            breed : "Dog",
            countryOrigin : "Switzerland"
        }
    ]);

    let animals = await Animal.find({});
    console.log(animals);

    const breedResult = await Animal.findByBreed("Dog", "Bull Dog");
    console.log(breedResult);

    const nameResult = await Animal.findByName("American Short Hair", Animal);
    console.log(nameResult);

}