const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/employeeData');

  const employeeSchema = new mongoose.Schema({
    name: {
      first: { type : String},
      last: {type : String},
    },
    job : {
        domain : { type : String},
        experience : { type : Number},
        company : { type : String}
    }
  }, {
    virtuals: {
      fullName: {
        get() {
          return "Full name of the employee : "+this.name.first + ' ' + this.name.last;
        }
      },
      jobDescription : {
         get() {
             let JD;

             JD = this.name.first+" "+this.name.last+ " is working as : "+this.job.domain+", with a experience of : "+this.job.experience+
                   " years , in company : "+this.job.company;
            return JD;
         }
      }
    }
  });

  const Employee = mongoose.model('Employee', employeeSchema);

  await Employee.insertMany([
       {
         name : {
               first : "Mayuk",
               last : "Mukherjee",
           },
        job : {
            domain : "MERN Stack Developer",
            experience : 7,
            company : "DELL Co. Technologies"
        }
       },
       {
        name : {
              first : "Suryendu",
              last : "Sarkar",
          },
       job : {
           domain : "ASP.NET Developer",
           experience : 11,
           company : "Mint GREEN Solutions"
       }
      }
  ])

   const allEmployee = await Employee.find({});
   console.log(allEmployee);

   console.log(allEmployee[0].fullName);
   console.log(allEmployee[0].jobDescription);

   console.log(allEmployee[1].fullName);
   console.log(allEmployee[1].jobDescription);
}