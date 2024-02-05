const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/AnimalData');

      const animalSchema = new mongoose.Schema({ 
             name: String,
             breed: String,
             price : Number,
             discPerc : Number,
             discAvailable : Boolean,
             CountryOrigin : String,
        },
        {
          query: {
            // findByName query is here
            async byName(name) {
              console.log("Out of query builder function()....");

              const resAnimal = await this.where("name").equals(name);
              console.log("all the animals of name = "+name+" is found "+resAnimal.length);
              console.log(resAnimal);

              for(var i = 0; i < resAnimal.length; i++){
                    console.log("name of the animaal = "+resAnimal[i].name);
                    console.log("breed of the animaal = "+resAnimal[i].breed);
                    console.log("price of the animaal = "+resAnimal[i].price);
                    console.log("discPerc of the animaal = "+resAnimal[i].discPerc);
                    console.log("discAvailable of the animaal = "+resAnimal[i].discAvailable);
                    console.log("CountryOrigin of the animaal = "+resAnimal[i].CountryOrigin);
              }

              return resAnimal;
            },

           // findByPrice query is here

           async byPrice(min, max) {
            console.log("Out of query builder function()....");
            
            //await Tank.find({ size: 'small' }).where('createdDate').gt(oneYearAgo).exec();

            const resAnimal = await this.where("price").gte(min).lte(max);
            console.log("all the animals of price between = $"+min+" and $"+max+" is found "+resAnimal.length);
            console.log(resAnimal);

            for(var i = 0; i < resAnimal.length; i++){
                  console.log("name of the animal = "+resAnimal[i].name);
                  console.log("breed of the animal = "+resAnimal[i].breed);
                  console.log("price of the animal = "+resAnimal[i].price);
                  console.log("discPerc of the animal = "+resAnimal[i].discPerc);
                  console.log("discAvailable of the animal = "+resAnimal[i].discAvailable);
                  console.log("CountryOrigin of the animal = "+resAnimal[i].CountryOrigin);

                  if(resAnimal[i].discAvailable){
                    const netPrice = resAnimal[i].price -  resAnimal[i].price * (resAnimal[i].discPerc / 100);
                    console.log("\nprice after discount = $"+netPrice);
                  }
                  else{
                    console.log("\nDiscount is not available...for : "+resAnimal[i].name);
                  }
            }

            return resAnimal;
          }, 

          }
        });

        animalSchema.query.byBreed = async function(animal_breed) {
            console.log("byBreed function is executing...");

            const resAnimal = await this.where('breed').equals(animal_breed);
            console.log("all the breed of : "+animal_breed+", found = "+resAnimal.length+" times..");

            for(var i = 0; i < resAnimal.length; i++){
                console.log("\nname of the animal : "+resAnimal[i].name);
                console.log("breed of the animal : "+resAnimal[i].breed);
                console.log("price of the animal : $"+resAnimal[i].price);
                console.log("discPerc of the animal : "+resAnimal[i].discPerc+" '%' ");
                console.log("discAvailable of the animal : "+resAnimal[i].discAvailable);
                console.log("CountryOrigin of the animal : "+resAnimal[i].CountryOrigin);
            }

            return resAnimal;
          };

        const Animal = mongoose.model('Animal', animalSchema);

        await  Animal.insertMany([
            { 
               name: "Agean",
               breed: "Cat",
               price : 240,
               discPerc : 16,
               discAvailable : true,
               CountryOrigin : "Greece",
            },
            { 
                name: "American Bobtail",
                breed: "Cat",
                price : 355,
                discPerc : 23,
                discAvailable : true,
                CountryOrigin : "United States",
             },
             { 
                name: "Common KeelBack",
                breed: "Snake",
                price : 157,
                discPerc : 34,
                discAvailable : false,
                CountryOrigin : "New Guinea",
             },
             { 
                name: "Glosy Snake",
                breed: "Snake",
                price : 497,
                discPerc : 29,
                discAvailable : false,
                CountryOrigin : "Mexico",
             },
             { 
                name: "Philippine forest rat",
                breed: "Rat",
                price : 179,
                discPerc : 7,
                discAvailable : true,
                CountryOrigin : "Philippines",
             },
             { 
                name: "Rare UniBack",
                breed: "Rat",
                price : 88,
                discPerc : 13,
                discAvailable : false,
                CountryOrigin : "New Guinea",
             },
        ]);

        const animals = await Animal.find({});
       // console.log(animals);

          const nameResult = await Animal.find().byName('Glosy Snake');
          console.log(nameResult);
   
         const breedResult = await Animal.find().byBreed("Rat");
         console.log(breedResult);  
      
         const priceResult = await Animal.find().byPrice(100, 200);
         console.log(priceResult);   
}