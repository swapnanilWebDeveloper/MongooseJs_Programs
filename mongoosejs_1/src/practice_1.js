/* const text = "I am writing , my Address 23000, 3500!!";
const segmenter = new Intl.Segmenter([], { granularity: 'word' });
const segmentedText = segmenter.segment(text);
const words = [...segmentedText].filter(s => s.isWordLike).map(s => s.segment);
console.log(words);

for(var i = 0; i < words.length ; i ++){
     console.log(words[i]+" ");
}  */

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
  
    for(var i = 0; i < all_TankData.length; i++){
        console.log("name is  = "+all_TankData[i].name+", size is = "+all_TankData[i].size+", year when it entered service = "+all_TankData[i].EnteredService+
        "\n country from where originated = "+all_TankData[i].CountryOrigin+", number of tanks built = "+all_TankData[i].NumberBuilt+
        "\n mass is = "+all_TankData[i].MassTonns+" Tonns"+", Engine Power is = "+all_TankData[i].EnginePowerHP+" HP "+", range is = "+all_TankData[i].RangeKM+" Km\n");
    }
}
