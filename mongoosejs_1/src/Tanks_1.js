const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {

    await mongoose.connect('mongodb://127.0.0.1:27017/TankData');

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

    // creating documents through model
    const M60 = new Tank({
        name: 'M60',
        size : "medium",
        EnteredService : 1959,
        CountryOrigin : "United States of America",
        NumberBuilt : 15000,
        MassTonns : 46,
        EnginePowerHP : 750,
        RangeKM : 450,
    });

    console.log("name is  = "+M60.name+", size is = "+M60.size+", year when it entered service = "+M60.EnteredService+
    "\n country from where originated = "+M60.CountryOrigin+", number of tanks built = "+M60.NumberBuilt+
    "\n mass is = "+M60.MassTonns+" Tonns"+", Engine Power is = "+M60.EnginePowerHP+" HP "+", range is = "+M60.RangeKM+" Km\n");

    const T_62 = new Tank({
        name: 'T_62',
        size : "medium-large",
        EnteredService : 1961,
        CountryOrigin : "Soviet Union",
        NumberBuilt : 22700,
        MassTonns : 37,
        EnginePowerHP : 620,
        RangeKM : 320,

    });

    console.log("name is  = "+T_62.name+", size is = "+T_62.size+", year when it entered service = "+T_62.EnteredService+
    "\n country from where originated = "+T_62.CountryOrigin+", number of tanks built = "+T_62.NumberBuilt+
    "\n mass is = "+T_62.MassTonns+" Tonns"+", Engine Power is = "+T_62.EnginePowerHP+" HP "+", range is = "+T_62.RangeKM+" Km\n");

    const Leopard_1 = new Tank({
        name: 'Leopard_1',
        size : "large",
        EnteredService : 1999,
        CountryOrigin : "Canada",
        NumberBuilt : 114,
        MassTonns : 43,
        EnginePowerHP : 830,
        RangeKM : 600,

    });

    console.log("name is  = "+Leopard_1.name+", size is = "+Leopard_1.size+", year when it entered service = "+Leopard_1.EnteredService+
    "\n country from where originated = "+Leopard_1.CountryOrigin+", number of tanks built = "+Leopard_1.NumberBuilt+
    "\n mass is = "+Leopard_1.MassTonns+" Tonns"+", Engine Power is = "+Leopard_1.EnginePowerHP+" HP "+", range is = "+Leopard_1.RangeKM+" Km\n");
    
    const Panzer_61 = new Tank({
        name: 'Panzer_61',
        size : "small-medium",
        EnteredService : 1965,
        CountryOrigin : "Switzerland",
        NumberBuilt : 150,
        MassTonns : 39,
        EnginePowerHP : 630,
        RangeKM : 250,

    });

    console.log("name is  = "+Panzer_61.name+", size is = "+Panzer_61.size+", year when it entered service = "+Panzer_61.EnteredService+
    "\n country from where originated = "+Panzer_61.CountryOrigin+", number of tanks built = "+Panzer_61.NumberBuilt+
    "\n mass is = "+Panzer_61.MassTonns+" Tonns"+", Engine Power is = "+Panzer_61.EnginePowerHP+" HP "+", range is = "+Panzer_61.RangeKM+" Km\n");

   /* await M60.save();
      await T_62.save();
      await Leopard_1.save(); 
      await Panzer_61.save(); */

    // or do this code to insert all the documents 
    // to the collection
    await Tank.insertMany([M60, T_62, Leopard_1, Panzer_61]);

    const all_TankData = await Tank.find();
    console.log(all_TankData);

}