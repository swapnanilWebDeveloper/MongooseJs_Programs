const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/EmployeeData');

  const employeeSchema = new mongoose.Schema({
    name: {
      first: { type : String},
      last: {type : String},
    },
    address : {
        state : { type : String},
        district : { type : String },
        city : { type : String}
    },
    company : {
        name : { type : String},
        location : { type : String},
        domain : { type : String}
    }
  }, {
    virtuals: {
      fullName: {
        get() {
          return this.name.first + ' ' + this.name.last;
        }
      },
       employeeAddress: {
        get() {
          return "employee currently lives in "+this.address.state + ' // ' + this.address.district + ' // ' + this.address.city;
        }
      }
    }
  });

  employeeSchema.virtual('CompDetails').get(function() {
    return "curretnly working at : "+this.company.name + ' , at the : ' + this.company.location + 
                 ', branch  on the field of : ' + this.company.domain;
  });

  const Employee = mongoose.model('Employee', employeeSchema);

  await Employee.insertMany([
       {
         name : {
               first : "Mayuk",
               last : "Mukherjee",
           },
        address : {
            state : "Alabama",
            district : "California",
            city : "Ohio",
        },
        company : {
            name : "Infosys",
            location : "Denver",
            domain : "Java & SQL"
        }
       },
       {
        name : {
               first : "Suryendu",
               last : "Sarkar",
           },
        address : {
            state : "Texas",
            district : "Indiana",
            city : "Huston",
        },
        company : {
            name : "Amazon",
            location : "California",
            domain : "DataBase & web services"
        }
        },
        {
            name : {
                first : "Aninda",
                last : "Mukherjee",
            },
            address : {
               state : "Alaska",
               district : "Massachuttes",
               city : "Queens",
            },
            company : {
             name : "Microsoft",
             location : "NewYork",
             domain : "Software Development"
            }
        },
        {
            name : {
                first : "Souvik",
                last : "Chatterjee",
            },
            address : {
               state : "Boston",
               district : "Massachuttes",
               city : "Denver",
            },
            company : {
             name : "Adobe",
             location : "Ohio",
             domain : "MicroServices"
            }
        }
  ])

   const allEmployee = await Employee.find({});
   console.log(allEmployee);

 /*  console.log("full name is = "+allEmployee[0].fullName);
   console.log("full name is = "+allEmployee[0].employeeAddress);
   console.log("full name is = "+allEmployee[0].CompDetails); */
   
   // find that employee whose name.first is "Mayuk"....
   const nameRes1 = await Employee.find({ 'name.first' : 'Mayuk'});
   console.log(nameRes1);
   console.log("Employee's full name is = "+nameRes1[0].fullName);
   console.log(nameRes1[0].employeeAddress);
   console.log(nameRes1[0].CompDetails);

   // find that employee whose name.last is "Sarkar"....
   const nameRes2 = await Employee.find({ 'name.last' : 'Sarkar'});
   console.log(nameRes2);
   console.log("Employee's fullname is = "+nameRes2[0].fullName);
   console.log(nameRes2[0].employeeAddress);
   console.log(nameRes2[0].CompDetails);

   //find that employee whose address.district = "Massachuttes", city = "Queens"
   const nameRes3 = await Employee.find({ 'address.district' : 'Massachuttes', 'address.city' : 'Queens'});
   console.log(nameRes3);
   console.log("employee's fullname is = "+nameRes3[0].fullName);
   console.log(nameRes3[0].employeeAddress);
   console.log(nameRes3[0].CompDetails);

   // find that employee company.name = "Adobe" , company.domain = "MicroServices"
   const nameRes4 = await Employee.find({ 'company.name' : 'Adobe', 'company.domain' : 'MicroServices'});
   console.log(nameRes4);
   console.log("employee's fullanme is = "+nameRes4[0].fullName);
   console.log(nameRes4[0].employeeAddress);
   console.log(nameRes4[0].CompDetails);
}