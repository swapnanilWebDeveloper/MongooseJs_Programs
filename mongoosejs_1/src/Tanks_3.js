const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {

    await mongoose.connect('mongodb://127.0.0.1:27017/DataBaseTank');

    // creating Schema
    const TankSchema = new mongoose.Schema({
        name: String,
        size: String,
        EnteredService: Number,
        CountryOrigin: String,
        NumberBuilt: { type: Number, min: 10, max: 25000 },
        MassTonns: { type: Number, min: 5, max: 5000 },
        EnginePowerHP: Number,
        RangeKM: Number,
    });

    // creating model
    const Tank = mongoose.model('Tank', TankSchema);

    await Tank.insertMany([
        {
            name: 'M60',
            size: "medium",
            EnteredService: 1959,
            CountryOrigin: "United States of America",
            NumberBuilt: 15000,
            MassTonns: 46,
            EnginePowerHP: 750,
            RangeKM: 450,
        },
        {
            name: 'T_62',
            size: "medium-large",
            EnteredService: 1961,
            CountryOrigin: "Soviet Union",
            NumberBuilt: 22700,
            MassTonns: 37,
            EnginePowerHP: 620,
            RangeKM: 320,

        },
        {
            name: 'Leopard_1',
            size: "large",
            EnteredService: 1999,
            CountryOrigin: "Canada",
            NumberBuilt: 114,
            MassTonns: 43,
            EnginePowerHP: 830,
            RangeKM: 600,

        },
        {
            name: 'Panzer_61',
            size: "small-medium",
            EnteredService: 1965,
            CountryOrigin: "Switzerland",
            NumberBuilt: 150,
            MassTonns: 39,
            EnginePowerHP: 630,
            RangeKM: 250,

        },
        // new documents
        {
            name: 'T-62',
            size: "medium",
            EnteredService: 1965,
            CountryOrigin: "Canada",
            NumberBuilt: 124,
            MassTonns: 44,
            EnginePowerHP: 745,
            RangeKM: 355,

        },
        {
            name: 'Panzer_61',
            size: "small-medium",
            EnteredService: 1965,
            CountryOrigin: "Switzerland",
            NumberBuilt: 355,
            MassTonns: 498,
            EnginePowerHP: 845,
            RangeKM: 560,

        },
        {
            name: 'T-62',
            size: "medium-large",
            EnteredService: 1974,
            CountryOrigin: "Switzerland",
            NumberBuilt: 234,
            MassTonns: 68,
            EnginePowerHP: 895,
            RangeKM: 470,

        },
        {
            name: 'Leopard_1',
            size: "small",
            EnteredService: 1995,
            CountryOrigin: "Canada",
            NumberBuilt: 3445,
            MassTonns: 56,
            EnginePowerHP: 460,
            RangeKM: 654,

        },
        {
            name: 'T-62',
            size: "small-medium",
            EnteredService: 1979,
            CountryOrigin: "Canada",
            NumberBuilt: 2995,
            MassTonns: 58,
            EnginePowerHP: 532,
            RangeKM: 480,

        },
    ]);

    const all_TankData = await Tank.find();
    console.log(all_TankData);

    console.log("find the tank details which has a country of origin = Canada\n");
    const TankData_1 = await Tank.find({ CountryOrigin: "Canada" });
    console.log(TankData_1);

    console.log("find the tank details which has a country of origin = Switzerland\n");
    const TankData_2 = await Tank.find({ CountryOrigin: "Switzerland" });
    console.log(TankData_2);

    console.log("country of origin = Switzerland\n" +
        "Number built less than 250");
    const TankData_3 = await Tank.find({ CountryOrigin: "Switzerland", NumberBuilt: { $lte: 250 } });
    console.log(TankData_3);

    console.log("Repeat the above and show only\n"+
    "name, EnteredService, CountryOrigin, RangeKM");
    const TankData_4 = await Tank.find({ CountryOrigin: /Switzerland/i, NumberBuilt:  {$lte: 250} }, "name EnteredService CountryOrigin RangeKM");
    console.log(TankData_4);

    console.log("CountryOrigin = Canada, name = T-62\n"+
    "name, CountryOrigin, EnteredService, EnginePowerHP");
    const TankData_5 = await Tank.find({CountryOrigin : /Canada/i, name : /T-62/i }, "name CountryOrigin EnterdeService EnginePowerHP" );
    console.log(TankData_5);

    console.log("CountryOrigin = Canada, name = Leopard_1\n"+
    "name, CountryOrigin, NumberBuilt, MassTonns");
    const TankData_6 = await Tank.find({ CountryOrigin : /Canada/i, name : /Leopard_1/i }, 'name CountryOrigin NumberBuilt MassTonns ');
    console.log(TankData_6);
}