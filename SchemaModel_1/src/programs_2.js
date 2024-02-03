const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {

    await mongoose.connect('mongodb://127.0.0.1:27017/AnimalData');

    const animalSchema = new mongoose.Schema({ 
                             name: String,
                             type: String,
                             priceUSD : Number,
                             discPerc : Number,
                             discAvailable : Boolean,
                             countryOrigin : String,
                             breedQuality : String,
                             medicalExp : Number,
                            },
        {
            methods: {

                async findByName(modelName){
                   console.log("findByName method executed successfully....");
                   const name_result = await modelName.find({ name : this.name});

                   console.log("name = "+this.name+", type = "+this.type+
                   ",\nprice $"+this.priceUSD+" USD ,discount percentage = "+this.discPerc+", discount available = "+this.discAvailable+
                   "\n, country of origin = "+this.countryOrigin+
                   ",\nbreed quality = "+this.breedQuality+", medical expenses anually = $"+this.medicalExp+"USD\n")
                },
                  
                async findSimilarTypes(modelName) {
                    console.log("findSimilarTypes function() has been executed successfully.....");
                    
                    console.log("all the animals of type : "+this.type+" is \n");
                    return await modelName.find({ type: this.type }, "name type countryOrigin breedQuality");
                },

                async findSimilarCountryOrigins(modelName) {
                    console.log("findSimilarCountryOrigin function() has been executed successfully.....");
                    
                    console.log("all the animals originated from : "+this.countryOrigin+" is \n");
                    return await modelName.find({ countryOrigin: this.countryOrigin }, "name countryOrigin priceUSD medicalExp");
                },

                async findSimilarBreedQualities(modelName) {
                    console.log("findSimilarBreedQuality function() has been executed successfully.....");
                    
                    console.log("all the animals of breed quality : "+this.breedQuality+" is \n");
                    return await modelName.find({ breedQuality: this.breedQuality  }, "name type breedQuality countryOrigin");
                }

            }
        });

        animalSchema.methods.findPrice = async function() {
             console.log("\nI am inside findPrice method....");

             console.log("name = "+this.name+", type = "+this.type+
                   ",\nprice $"+this.priceUSD+" USD ,discount percentage = "+this.discPerc+", discount available = "+this.discAvailable+
                   "\n, country of origin = "+this.countryOrigin+
                   ",\nbreed quality = "+this.breedQuality+", medical expenses anually = "+this.medicalExp);
           
                   if(this.discAvailable){
                    const netPrice = this.priceUSD - this.priceUSD * ( this.discPerc / 100); 
                    return "price after discount = $"+netPrice+"\n";
                   }
                   else{
                     return "Discount is not available for "+this.name+" ("+this.type+")";
                   }
          };

    const Animal = mongoose.model('Animal', animalSchema);

    await Animal.insertMany([
        { 
            name : "German Shepard",
            type: 'Dog' ,
            priceUSD : 2500,
            discPerc : 22,
            discAvailable : true,
            countryOrigin : "Germany",
            breedQuality : "High",
            medicalExp : 490, 
        },
        {
            name : "Husky",
            type : "Dog",
            priceUSD : 1865,
            discPerc : 16,
            discAvailable : true,
            countryOrigin : "Alaska",
            breedQuality : "Medium",
            medicalExp : 255, 
        },
        {
            name : "British Short Hair",
            type : "Cat",
            priceUSD : 1250,
            discPerc : 34,
            discAvailable : false,
            countryOrigin : "United Kingdom",
            breedQuality : "Medium",
            medicalExp : 345, 
        },
        {
            name : "American Fluffy",
            type : "Cat",
            priceUSD : 1750,
            discPerc : 28,
            discAvailable : true,
            countryOrigin : "United Kingdom",
            breedQuality : "Low",
            medicalExp : 259, 
        },
        {
            name : "Bittle Sumdohg",
            type : "Rat",
            priceUSD : 2445,
            discPerc : 11,
            discAvailable : false,
            countryOrigin : "Alaska",
            breedQuality : "High",
            medicalExp : 735, 
        },
        {
            name : "Rattle Snake",
            type : "Snake",
            priceUSD : 3775,
            discPerc : 25,
            discAvailable : true,
            countryOrigin : "Germany",
            breedQuality : "Low",
            medicalExp : 1325, 
        },
        {
            name : "Black Mamba",
            type : "Snake",
            priceUSD : 1985,
            discPerc : 39,
            discAvailable : false,
            countryOrigin : "Uited States of America",
            breedQuality : "Medium",
            medicalExp : 688, 
        },
    ]);

    const allAnimals = await Animal.find({});
    // console.log(allAnimals);

    const name_results = await allAnimals[2].findByName(Animal);

    const type_results = await allAnimals[5].findSimilarTypes(Animal);
    console.log(type_results);

    const countryOrigin_results = await allAnimals[1].findSimilarCountryOrigins(Animal);
    console.log(countryOrigin_results);

    const breed_results = await allAnimals[3].findSimilarBreedQualities(Animal);
    console.log(breed_results);

    const price_result1 = await allAnimals[4].findPrice() 
    console.log(price_result1);

    const price_result2 = await allAnimals[3].findPrice() ;
    console.log(price_result2);
}

// {name : "Bittle Sumdohg", countryOrigin : "Alaska"}