const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/StudentData');

    const studentSchema = new mongoose.Schema({
        studentName : {
            type: String,
            alias: 'name',
        },
        studentEmail : {
            type : String,
            alias : 'email',
        },
        studentAddress : {
            state : { type : String, alias : "st"},
            district : { type : String, alias : "dist"},
            city : { type : String, alias : "ct"},
        },
        scienceMarks : {
            theoryPaper : { 
                physics : { type : Number, alias : "phTheo"},
                chemistry : { type : Number, alias : "chTheo"},
                mathematics : { type : Number, alias : "mtTheo"},
            },
            practicalPaper : {
                physics : { type : Number, alias : "phPrt"},
                chemistry : { type : Number, alias : "chPrt"},
                mathematics : { type : Number, alias : "mtPrt"},
            }
        }
    },
    {
          methods: {
             getStudentBioData() {
                 const bioData =  "name is : "+this.name+", email is : "+this.email;
                 return bioData; 
            },
             getStudentLocationData() {
                const locationData =  "Student is currently living in state : "+this.st+", at district is : "+this.dist+
                                       ", at city is : "+this.ct;
                return locationData; 
           },
            getStudentScienceMarks(){
                let physicsTotal, chemistryTotal , mathematicsTotal;
                physicsTotal = this.phTheo + this.phPrt;
                chemistryTotal = this.chTheo + this.chPrt;
                mathematicsTotal = this.mtTheo + this.mtPrt;

                this.getHelloStudents(this.name, physicsTotal + chemistryTotal + mathematicsTotal);

                return "Marks in physics = "+physicsTotal+", chemistry = "+chemistryTotal+", mathematics = "+mathematicsTotal;
            },
            getHelloStudents(stuName, totalMarks){
                let grade, average;
                average = (totalMarks / 3).toFixed(2);

                if(average >= 90){
                     grade = "Excellent";
                }
                else if(average >= 70 && average < 90){
                     grade = "Very Good";
                }
                else if(average >= 50 && average < 70){
                    grade = "Good";
               }
               else if(average >= 30 && average < 50){
                grade = "Pass";
               }
               else{
                 grade = "Fail";
               }

               console.log(stuName+" , has got total marks of = "+totalMarks+", average = "+average
                  + ",\n with a grade of : "+grade);
            }
          }
    }
    );

    const Student = mongoose.model('Student', studentSchema);
   
    await Student.insertMany([
        {
            name : "Mayuk Mukherjee",
            email : "Mayuk@gmail.com",
            st : "California",
            dist : "Ohio",
            ct : "Colorado",
            phTheo : 79,
            chTheo : 68,
            mtTheo : 77,
            phPrt : 18,
            chPrt : 16,
            mtPrt : 19,
        },
        {
            name : "Suryendu Sarkar", 
            email : "Suryendu@gmail.com",
            st : "Alabama",
            dist : "Denver",
            ct : "California",
            phTheo : 49,
            chTheo : 58,
            mtTheo : 58,
            phPrt : 12,
            chPrt : 18,
            mtPrt : 12
        },
        {
            name : "Aninda Mukherjee",
            email : "Aninda@gmail.com",
            st : "Alaska",
            dist : "Texas",
            ct : "Huston",
            phTheo : 54,
            chTheo : 59,
            mtTheo : 42,
            phPrt : 15,
            chPrt : 20,
            mtPrt : 14,
        },
        {
            name : "Sanlap Gadai",
            email : "Sanlap@gmail.com",
            st : "MAssachuttes",
            dist : "Ohio",
            ct : "Atlanta",
            phTheo : 66,
            chTheo : 61,
            mtTheo : 59,
            phPrt : 18,
            chPrt : 12,
            mtPrt : 14,
        },
    ]);

    const allStudent = await Student.find({});
    console.log(allStudent);

    console.log("total students number = "+allStudent.length+"\n");

    for(var i = 0; i < allStudent.length; i++){
         console.log(allStudent[i].getStudentBioData());
         console.log(allStudent[i].getStudentLocationData());
         console.log(allStudent[i].getStudentScienceMarks());
         console.log("\n");
    }
}