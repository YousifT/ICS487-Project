const express = require('express')
let ejs = require('ejs')
const app = express()
const port = 3000

app.set('view engine', 'ejs')
app.get('/', (req, res) => {
    res.render('welcome');
})

app.get('/start', (req, res) => {

    // TODO:    - [x] freshman year
    //          - [x] sophomore year
    //          - [ ] junior year
    //          - [ ] senior year
    // https://ise.kfupm.edu.sa/programs/undergraduate-program/degree-plan-new/ise-program-128-ch-degree-plan-with-summer-training/
    let courses = ['MATH101', 'PHYS101', 'ENGL101', 'CHEM101', 'IAS121', 'PE101', 'MATH102', 'PHYS102', 'ENGL102', 'ICS104', 'IAS111', 'CE101', 'ISE291', 'MATH201', 'ME216', 'ME217', 'ENG214', 'ISE205', 'COE292', 'MATH208', 'ME322', 'ME322', 'ME323', 'ISE315', 'EE204', 'IAS212'];

    // courses list is a list of the plan courses
    res.render('questions', {courses: courses})
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))