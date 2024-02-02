const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {

    await mongoose.connect('mongodb://127.0.0.1:27017/TankInformation');

    // creating Schema
    const TankSchema = new mongoose.Schema({
        name: String,
        size : String,
        EnteredService : Number,
        CountryOrigin : String,
        NumberBuilt : {type : Number, min : 10, max : 25000},
        MassTonns : {type : Number, min : 5, max : 100},
        EnginePowerHP : Number,
        RangeKM : Number,
    });

    // creating model
    const Tank = mongoose.model('Tank', TankSchema);

    await Tank.insertMany([
        {
            name: 'M60',
            size : "medium",
            EnteredService : 1959,
            CountryOrigin : "United States of America",
            NumberBuilt : 15000,
            MassTonns : 46,
            EnginePowerHP : 750,
            RangeKM : 450,
        }, 
        {
            name: 'T_62',
            size : "medium-large",
            EnteredService : 1961,
            CountryOrigin : "Soviet Union",
            NumberBuilt : 22700,
            MassTonns : 37,
            EnginePowerHP : 620,
            RangeKM : 320,
    
        }, 
        {
            name: 'Leopard_1',
            size : "large",
            EnteredService : 1999,
            CountryOrigin : "Canada",
            NumberBuilt : 114,
            MassTonns : 43,
            EnginePowerHP : 830,
            RangeKM : 600,
    
        }, 
        {
            name: 'Panzer_61',
            size : "small-medium",
            EnteredService : 1965,
            CountryOrigin : "Switzerland",
            NumberBuilt : 150,
            MassTonns : 39,
            EnginePowerHP : 630,
            RangeKM : 250,
    
        }
    ]);

    const all_TankData = await Tank.find();
    console.log(all_TankData);
  
    console.log("name is  = "+all_TankData[0].name+", size is = "+all_TankData[0].size+", year when it entered service = "+all_TankData[0].EnteredService+
    "\n country from where originated = "+all_TankData[0].CountryOrigin+", number of tanks built = "+all_TankData[0].NumberBuilt+
    "\n mass is = "+all_TankData[0].MassTonns+" Tonns"+", Engine Power is = "+all_TankData[0].EnginePowerHP+" HP "+", range is = "+all_TankData[0].RangeKM+" Km\n");

    console.log("name is  = "+all_TankData[1].name+", size is = "+all_TankData[1].size+", year when it entered service = "+all_TankData[1].EnteredService+
    "\n country from where originated = "+all_TankData[1].CountryOrigin+", number of tanks built = "+all_TankData[1].NumberBuilt+
    "\n mass is = "+all_TankData[1].MassTonns+" Tonns"+", Engine Power is = "+all_TankData[1].EnginePowerHP+" HP "+", range is = "+all_TankData[1].RangeKM+" Km\n");

    console.log("name is  = "+all_TankData[2].name+", size is = "+all_TankData[2].size+", year when it entered service = "+all_TankData[2].EnteredService+
    "\n country from where originated = "+all_TankData[2].CountryOrigin+", number of tanks built = "+all_TankData[2].NumberBuilt+
    "\n mass is = "+all_TankData[2].MassTonns+" Tonns"+", Engine Power is = "+all_TankData[2].EnginePowerHP+" HP "+", range is = "+all_TankData[2].RangeKM+" Km\n");

    console.log("name is  = "+all_TankData[3].name+", size is = "+all_TankData[3].size+", year when it entered service = "+all_TankData[3].EnteredService+
    "\n country from where originated = "+all_TankData[3].CountryOrigin+", number of tanks built = "+all_TankData[3].NumberBuilt+
    "\n mass is = "+all_TankData[3].MassTonns+" Tonns"+", Engine Power is = "+all_TankData[3].EnginePowerHP+" HP "+", range is = "+all_TankData[3].RangeKM+" Km\n");
}