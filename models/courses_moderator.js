const reader = require('xlsx')

const file = reader.readFile('./assets/ISE Plan Info.xlsx')

let allCourses = []

const sheets = file.SheetNames

for (let i=0; i<sheets.length; i++) {
    const temp = reader.utils.sheet_to_json(
        file.Sheets[file.SheetNames[i]])
   temp.forEach((res) => {
      allCourses.push(res)
   })
}

printCourses = () => {
    console.log(allCourses);
}


getAllCoursesNames = () => {
    let coursesNames = allCourses.map((course) => course.Course)
    return coursesNames
}

// return list of objects of courses
getAllCourses = () => allCourses

getCourse = (courseName) => {
    let result = allCourses.find((course) => course.Course === courseName)
    return result
}

// input: list of strings
// output: list of courses
getCourses = (courses) => {
    let result = [];
    courses.forEach((course) => result.push(this.getCourse(course)))
    return result
}

// input: list of string
// output: list of course objects that are ready to generate tables from
getCoursesReady = (InCourses) => {
    let courses = []
    InCourses.map((course) => {
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
    return courses
}

getHoursNeeded = (gpa, summer) => {
    let hours
    if (summer) {
        hours = (gpa < 2)? [1, 7] : [1, 8]
    } else {
        hours = (gpa < 2)? [12, 15]: (gpa < 3)? [12, 19]: [12, 21]
    }
    return hours
}

module.exports = {getAllCourses, getAllCoursesNames, getCourse, getCourses, getCoursesReady, getHoursNeeded}