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

exports.printCourses = () => {
    console.log(allCourses);
}


exports.getAllCoursesNames = () => {
    let coursesNames = allCourses.map((course) => course.Course)
    return coursesNames
}

// return list of objects of courses
exports.getAllCourses = () => allCourses

exports.getCourse = (courseName) => {
    let result = allCourses.find((course) => course.Course === courseName)
    return result
}

// input: list of strings
// output: list of courses
exports.getCourses = (courses) => {
    let result = [];
    courses.forEach((course) => result.push(this.getCourse(course)))
    return result
}
