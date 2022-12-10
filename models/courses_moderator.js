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

const printCourses = () => {
    console.log(allCourses);
}


const getAllCoursesNames = () => {
    let coursesNames = allCourses.map((course) => course.Course)
    return coursesNames
}

// return list of objects of courses
const getAllCourses = () => allCourses

const getCourse = (courseName) => {
    let result = allCourses.find((course) => course.Course === courseName)
    return result
}

// input: list of strings
// output: list of courses
const getCourses = (courses) => {
    let result = [];
    courses.forEach((course) => result.push(this.getCourse(course)))
    return result
}

// input: list of string
// output: list of course objects that are ready to generate tables from
const getCoursesReady = (InCourses) => {
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

const getHoursNeeded = (gpa, summer) => {
    let hours
    if (summer) {
        hours = (gpa < 2)? [1, 7] : [1, 8]
    } else {
        hours = (gpa < 2)? [12, 15]: (gpa < 3)? [12, 19]: [12, 21]
    }
    return hours
}

// input: doneCourses: a list of string of the courses that the student have done
const getCoursesCanRegister = (doneCourses, standing) => {
    let canRegister = JSON.parse(JSON.stringify(allCourses))
    // prepare prerequisites
    canRegister = canRegister.map((course) => {
        let prerequisites = [];
        if (course['Pre-requisite']!=="none"){
            prerequisites = course['Pre-requisite'].split(" ")
            prerequisites = prerequisites.map((pre)=> {
                if (pre.includes("/")) {
                    return pre.split("/")
                } else {
                    return pre
                }
            })
        }
        return {
            'Course Standing': course['Course Standing'],
            prerequisites: prerequisites,
            Course: course.Course,
            'Co-requisite': course['Co-requisite'],
            Cridit: course.Cridit,
            'Difficulty out of': course['Difficulty out of 4'],
            Project: course.Project,
            Lab: course.Lab,
            juniorRequired: course.juniorRequired
        }
    })

    if (standing==="freshman" || standing==="sophomore" || "orientation") {
        canRegister = canRegister.filter((course) => course.juniorRequired==="No")
    }

    // remove done courses
    canRegister = canRegister.filter((course) => !doneCourses.includes(course.Course))

    // remove courses their prerequisites are not taken
    canRegister = canRegister.filter((course) => {
        let isPrerequisitesDone = true;
        if (course.prerequisites.length > 0)
        course.prerequisites.forEach((pre)=> {
            if (typeof pre === 'string') {
                if (!doneCourses.includes(pre)) {
                    isPrerequisitesDone = false
                }
            } else {
                pre = Object.values(pre)
                let counter = 0
                // console.log(pre)
                pre.forEach((preIn) => {
                    // console.log('\nin array\n')
                    if (doneCourses.includes(preIn)) {
                        counter++
                    }
                })
                isPrerequisitesDone = counter >= 1
            }
        })
        return isPrerequisitesDone
    })
    canRegister = canRegister.map((course) => course.Course)
    return canRegister
}

const printChecks = () => {
    let canRegister = []
    canRegister = JSON.parse(JSON.stringify(allCourses))
    canRegister = canRegister.map((course) => {
        let prerequisites = [];
        if (course['Pre-requisite']!=="none"){
            prerequisites = course['Pre-requisite'].split(" ")
            prerequisites = prerequisites.map((pre)=> {
                if (pre.includes("/")) {
                    return pre.split("/")
                } else {
                    return pre
                }
            })
        }
        return {
            'Course Standing': course['Course Standing'],
            prerequisites: prerequisites,
            Course: course.Course,
            'Co-requisite': course['Co-requisite'],
            Cridit: course.Cridit,
            'Difficulty out of': course['Difficulty out of 4'],
            Project: course.Project,
            Lab: course.Lab,
            juniorRequired: course.juniorRequired
        }
    })

    let doneCourses = ['MATH101', 'IAS111']
    canRegister = canRegister.filter((course) => !doneCourses.includes(course.Course))

    // canRegister = canRegister.filter((course) => course.juniorRequired==="No")

    // console.log(canRegister)
    canRegister = canRegister.filter((course) => {
        let isPrerequisitesDone = true;
        if (course.prerequisites.length > 0)
        course.prerequisites.forEach((pre)=> {
            // console.log(typeof pre)
            if (typeof pre === 'string') {
                if (!doneCourses.includes(pre)) {
                    isPrerequisitesDone = false
                    // console.log('just no multiple')
                }
            } else {
                pre = Object.values(pre)
                let counter = 0
                // console.log(pre)
                pre.forEach((preIn) => {
                    // console.log('\nin array\n')
                    if (doneCourses.includes(preIn)) {
                        counter++
                    }
                })
                isPrerequisitesDone = counter >= 1
            }
        })
        return isPrerequisitesDone
    })


    // console.log(canRegister)
    // console.log(canRegister.length)
    // console.log(allCourses.length)
}

const getCoursesByStanding = () => {
    let courses = []
    // console.log(allCourses)
    courses = JSON.parse(JSON.stringify(allCourses))
    let freshmanCourses = courses.filter((course) => course['Course Standing'] === "Freshman")
    let sophomoreCourses = courses.filter((course) => course['Course Standing'] === "Sophmore")
    let juniorCourses = courses.filter((course) => course['Course Standing'] === "Junior")
    let seniorCourses = courses.filter((course) => course['Course Standing'] === "Senior")

    freshmanCourses = freshmanCourses.map((course) => course.Course)
    sophomoreCourses = sophomoreCourses.map((course) => course.Course)
    juniorCourses = juniorCourses.map((course) => course.Course)
    seniorCourses = seniorCourses.map((course) => course.Course)
    return {freshmanCourses: freshmanCourses, sophomoreCourses: sophomoreCourses, juniorCourses: juniorCourses, seniorCourses: seniorCourses}
}

module.exports = {getAllCourses, getAllCoursesNames, getCourse, getCourses, getCoursesReady, getHoursNeeded, getCoursesCanRegister, getCoursesByStanding}