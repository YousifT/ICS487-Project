const express = require('express')
let ejs = require('ejs')
const app = express()
const port = 3000

const io = require('./io')


app.set('view engine', 'ejs')
app.get('/', (req, res) => {
    res.render('welcome');
})

app.use(express.urlencoded({ extended: true }))

app.get('/start', (req, res) => {
    res.render('questions', {courses: io.getAllCoursesNames()})
})

app.post('/result', (req, res) => {
    const body = req.body
    let summer = true;
    if (typeof (body.summer) == 'undefined') {
        summer = false
    }
    const user = {
        name: body.name,
        GPA: body.gpa,
        standing: body.standing,
        partTimeHours: body.partTimeHours,
        summer: summer
    }

    let courses = []
    let allCourses = io.getAllCourses();
    body.course.map((course) => {
        let target = allCourses.find(courseOn =>{
            // console.log(courseOn.Course)
            return courseOn.Course===course
        })
        let project = (target.Project=='No')? false : true;
        let lab = (target.Lab=='No')? false : true;
        courses.push({
            name: target.Course,
            credit: target.Cridit,
            standingLevel: target['Course Standing'],
            difficulty: target['Difficulty out of 4'],
            project: project,
            lab: lab
        })
    })


    console.log(courses)

    res.render('result')
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))