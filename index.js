const express = require('express')
let ejs = require('ejs')
const app = express()
const port = 3000

const courses_moderator = require('./models/courses_moderator')
const generator = require('./models/generator.js')


app.set('view engine', 'ejs')
app.get('/', (req, res) => {
    res.render('welcome');
})

app.use(express.urlencoded({ extended: true }))

app.get('/start', (req, res) => {
    res.render('questions', {courses: courses_moderator.getAllCoursesNames()})
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

    let courses = courses_moderator.getCoursesCanRegister(body.course)
    let result = generator.generate_Tables(courses_moderator.getCoursesReady(courses), courses_moderator.getHoursNeeded(body.gpa, summer), user)

    result = result.map((table) => {
        let credit = 0
        table.forEach((course) => {
            credit += course.credit
        })
        return {
            table: table,
            credit: credit
        }
    })

    res.render('result', {result: result})
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))