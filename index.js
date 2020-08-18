var express = require('express');
var { graphqlHTTP } = require('express-graphql');
var {buildSchema} = require('graphql');

// GraphQL Schema
var schema = buildSchema(`
    type Query {
        student(id: Int!): Student
        students(course: String): [Student]
        allStudents: [Student]
    }

    type Student {
        id: Int
        name: String
        course: String
        address: String
        year: String
    }
`);

var studentData = [
    {
        id: 1,
        name: 'Shruti Agrawal',
        course: 'B.Tech',
        address: 'Varanasi',
        year: 'First Year'
    },
    {
        id: 2,
        name: 'Priyanka Singh',
        course: 'B.Tech',
        address: 'Allahabad',
        year: 'Final Year'
    },
    {
        id: 3,
        name: 'Sudheer Singh',
        course: 'B.Pharma',
        address: 'Varanasi',
        year: 'Third Year'
    }
]

var getStudent = function(args) {
    var id = args.id;
    return studentData.filter(student => {
        return student.id == id;
    })[0];
}

var getStudents = function(args) {
    if (args.course) {
        var course = args.course;
        return studentData.filter(student => student.course == course);
    } else {
        return coursesData;
    }
}

// resolver
var root = {
    student: getStudent,
    students: getStudents,
    allStudents:() => {
    return studentData
    }
};

// Creating an express server and a GraphQL endpoint
var app = express();
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}));

app.listen(4000, () => console.log('Server is running on port 4000'));


// query getStudentDetail($studentId: Int!){
//     student(id: $studentId){
//       name
//       address
//       year
//     }
//   }

// query getStudents($course: String){
//     students(course: $course){
//       name
//     }
//   }
  


  