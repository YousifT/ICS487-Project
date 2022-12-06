
// Setup the file for integration with node.js / Express & add the frontend pages



// We need a method to 
// Given: Array of courses the user already finished
// Result: Array with the remaining courses left for him. 
// Note: filter all courses based on standing level and pre-requisite requirements fulfillled or not.


// Method 2:
// Given student GPA, and term status (summer or regular)
// Decide Number of hours allowed


// Output after method 2 should be array of (filtered) courses left for the student to take. Every 
// course in the format of a course object
// and an array "Hours" of size two. Hours[0] = Min Hours allowed, Hours[1] = Max hours allowed 

// Method 3
// Generate tables


// Method 4
// Check a table partial solution does not violate any constraint rules


// Method 5: 
// Check if a table is_goal (Complete and Correct)

// Method 6:
// Given a complete table, generate a rating for how "good" that table is


// Method 7 - AC-3 & MRV Algorithims
// (Implemnting them for better tree-search efficincy with Arc-consistency and Forward Checking)




const user = {
    name: "Rakan", 
    GPA: 2.7,
    standing: "Junior",
    partTimeHours: 0
}

class TableCSP {
    constructor(Courses, hours) {
        this.Courses = Courses
        this.minHours = hours[0]
        this.maxHours = hours[1]
    }
}



class Course {
    constructor(name, credit, difficulty,  standingLevel, lab, project) {
        this.name = name
        this.credit = credit
        this.difficulty = difficulty
        this.standingLevel = standingLevel
        this.lab = lab
        this.project = project
        this.importance = 0
    }


}

function is_consistent(problem, solution, newitem) {
    var hoursLoad = 0
    for (var i=0; i<solution.length; i++) {
        hoursLoad += solution[i].credit
    }


    if (!(newitem in solution)) {
        if ((hoursLoad + newitem.credit) > problem.maxHours)
        return false
    return true
    }
    return false

}

function minHoursAchieved(problem, solution) {
    var hoursLoad = 0
    for (var i=0; i<solution.length; i++) {
        hoursLoad += solution[i].credit
    }

    if (hoursLoad >= problem.minHours) 
        return true
    else
        return false
}

var solution_result = []
function generate_Tables(problem, solution, summer) {
    var solution_array = []
    
    if (!summer) {
        TableDFS(problem, solution_array, 3)
        TableDFS(problem, solution_array, 4)
        TableDFS(problem, solution_array, 5)
        TableDFS(problem, solution_array, 6)
        TableDFS(problem, solution_array, 7)
    }
    else {
        TableDFS(problem, solution_array, 1)
        TableDFS(problem, solution_array, 2)
        TableDFS(problem, solution_array, 3)
    }

    final_result = evaluate_Table(solution_result)

    console.log("FINAL RESULT\nTABLE ONE:")
    table_toPrint(final_result[0])
    console.log("TABLE TWO:")
    table_toPrint(final_result[1])
    console.log("TABLE THREE:")
    table_toPrint(final_result[2])


}


function table_toPrint(arr) {
    hours = 0
    let names = ""
    for (let j=0; j<arr.length; j++) {
        names += arr[j].name + ", "
        hours += arr[j].credit
    }
    let holder = Math.round(getValue(arr) * 1000 ) / 1000
    console.log("Length : "+ arr.length + " || Hours : " + hours + "\nCourses: " + names + " || Table Score = " + holder)
}

function TableDFS(problem, solution, depthGoal) {

    let solution_Copy = JSON.parse(JSON.stringify(solution))
    let problem_Copy = JSON.parse(JSON.stringify(problem))

    if (solution_Copy.length === depthGoal) {
        if (minHoursAchieved(problem, solution_Copy) === true) {
            solution_result.push(solution_Copy)
            return true
        }

    }
    if (problem_Copy.Courses.length === 0 ) {
        return false
    }



    if (solution_Copy.length === 0) {
        problem_Copy.Courses = DFSstart(problem_Copy)


        let prioHolder = getHighestPrio(problem_Copy)
        let accept = false
        while (accept === false) {
            let check = is_consistent(problem_Copy, solution_Copy, prioHolder)
            random = Math.random()
            if (prioHolder.importance === 3 && check == true) {
                if (random <= 0.95) {
                    solution_Copy.push(prioHolder)
                    var ind = problem_Copy.Courses.findIndex( x => 
                        x.name === prioHolder.name
                        );
            
                        if (ind !== -1) {
                            problem_Copy.Courses.splice(ind, 1)
                        }
                        accept = true
                        
                }
            }
    
            if (prioHolder.importance === 2 && check == true) {
                if (random <= 0.75) {
                    solution_Copy.push(prioHolder)
                    var ind = problem_Copy.Courses.findIndex( x => 
                        x.name === prioHolder.name
                        );
            
                        if (ind !== -1) {
                            problem_Copy.Courses.splice(ind, 1)
                        }
                        accept = true
                }
            }
    
    
            if (prioHolder.importance === 1 && check == true) {
                if (random <= 0.50) {
                    solution_Copy.push(prioHolder)
                    var ind = problem_Copy.Courses.findIndex( x => 
                        x.name === prioHolder.name
                        );
            
                        if (ind !== -1) {
                            problem_Copy.Courses.splice(ind, 1)
                        }
                        accept = true
                }
            }
    
            if (prioHolder.importance === 0 && check == true) {
                
                solution_Copy.push(prioHolder)
                var ind = problem_Copy.Courses.findIndex( x => 
                    x.name === prioHolder.name
                    );
        
                    if (ind !== -1) {
                        problem_Copy.Courses.splice(ind, 1)
                    }
                    accept = true
                
            }
    
        }    
    }


    for (let j=0; j<problem_Copy.Courses.length; j++) {
        rndmIndex = Math.floor(Math.random() *  problem.Courses.length)
        let item = problem_Copy.Courses[rndmIndex]
        while (!item) {
            rndmIndex = Math.floor(Math.random() *  problem.Courses.length)
            item = problem_Copy.Courses[rndmIndex]
        }


        let consistencyCheck = is_consistent(problem_Copy, solution_Copy, item)
        if (consistencyCheck ===  true) {
            // update copied problem domain
            var ind = problem_Copy.Courses.findIndex( x => 
            x.name === item.name
            );

            if (ind !== -1) {
                problem_Copy.Courses.splice(ind, 1)
            }

            // Append CourseItem to Solution_Copy
            solution_Copy.push(item)
                
            TableDFS(problem_Copy, solution_Copy, depthGoal)
            
            solution_Copy.pop()
        }
        else {
            continue
        }

    }
    if (solution_Copy.length !== 1) {
        solution_Copy.pop()
        TableDFS(problem_Copy, solution_Copy, depthGoal)
    }

       
    

}

function DFSstart (problem) {

    if (user.standing == "Senior") {
        problem.Courses.forEach(Course => {
            if (Course.standingLevel === "Junior")
                Course.importance = 1
            else if (Course.standingLevel === "Sophomore")
                Course.importance = 2
            else if (Course.standingLevel === "Freshmen")
                Course.importance = 3
            else {
                Course.importance = 0
            }

        });
    }
    else if (user.standing == "Junior") {
        problem.Courses.forEach( Course => {
            if (Course.standingLevel === "Sophomore")
                Course.importance = 2
            else if (Course.standingLevel === "Freshmen")
                Course.importance = 3
            else {
                Course.importance = 0
            }
        });
    }
    else if (user.standing == "Sophomore") {
        problem.Courses.forEach( Course => {
            if (Course.standingLevel === "Freshmen")
                Course.importance = 3
            else {
                Course.importance = 0
            }
        });
    }
    else {
        problem.Courses.forEach( Course => {
            Course.importance = 0
        })
    }

    return problem.Courses
}


function getHighestPrio(problem) {
    let prio =  problem.Courses[Math.floor(Math.random() *  problem.Courses.length)];
    for (let i=0; i<problem.Courses.length; i++) {
        if (problem.Courses[i].importance > prio.importance)
            prio = problem.Courses[i]
    }
    return prio
}


function GPA_Range(user) {
    let range = []
    if (user.GPA >= 3.5) {
        range[0] = 10
        range[1] = 36

    }
    else if (user.GPA >= 3) {
        range[0] = 35
        range[1] = 42
    }
    else if (user.GPA >= 2.5) {
        range[0] = 41
        range[1] = 47
    }
    else {
        range[0] = 48
        range[1] = 55
    } 


    if (user.partTimeHours > 0) {
        range[1] += Math.ceil(user.partTimeHours*1.5)
        if (user.GPA >= 3.5)
            range[1] += 3.5
    }
    return range

}

function evaluate_Table(results) {
    let max1 = 0
    let max1Table = undefined
    let max2 = 0
    let max2Table = undefined
    let max3 = 0
    let max3Table = undefined

    GPA_min = GPA_Range(user)[0]
    GPA_max = GPA_Range(user)[1]

    for (let i=0; i<results.length; i++) {
        let holder = Math.round(getValue(results[i]) * 10000 ) / 10000
        if (results[i].length > 5) {
            console.log("Table " + i)
            table_toPrint(results[i])
        }

        
        if (holder >= GPA_min && holder <= GPA_max) {
            if (holder > max1) {
                max1 = holder
                max1Table = results[i]
            }
            else if (holder > max2 && holder !== max1 && (max1-holder) > 1.1) {
                max2 = holder
                max2Table = results[i]
            }
            else if (holder > max3 && holder !== max1 && holder !== max2 && (max2-holder) > 1.1) {
                max3 = holder
                max3Table = results[i]
            }
        } 
    }
    max3_result = [max1Table, max2Table, max3Table]
    return max3_result

}

function getValue(table) {

    // start at 100, reduce based on hours/difficulty
    let score = 100
    totalHours = 0
    for (let j=0; j<table.length; j++) {
        if (table[j].importance > 1) {
            score += 10
        }
        score -= (table[j].credit*table[j].difficulty)/2.5
        totalHours += table[j].credit 
        if (table[j].lab == true)
            score -= 3
        if (table[j].project = true)
            score -= 4
    }
    score -= totalHours
    return score
}



var course1 = {
    name: "ISE321",
    credit: 3,
    difficulty: 3.25,
    standingLevel: "Junior",
    project: true,
    lab: false
}

var course2 = {
    name: "ISE391",
    credit: 2,
    standingLevel: "Junior",
    difficulty: 2.3,
    project: true,
    lab: true
}

var course3 = {
    name: "ISE402",
    credit: 3,
    standingLevel: "Senior",
    difficulty: 2.76,
    project: false,
    lab: false
}

var course4 = {
    name: "ISE405",
    credit: 3,
    standingLevel: "Senior",
    difficulty: 3.23,
    project: true,
    lab: true
}

var course5 = {
    name: "ISE422",
    credit: 3,
    standingLevel: "Senior",
    difficulty: 3.34,
    project: true,
    lab: false
}

var course6 = {
    name: "ISE4xx",
    credit: 3,
    standingLevel: "Senior",
    difficulty: 2.75,
    project: true,
    lab: false
}

var course7 = {
    name: "ISE4xx_2",
    credit: 3,
    standingLevel: "Senior",
    difficulty: 2.75,
    project: false,
    lab: false
}

var course8 = {
    name: "XExxx",
    credit: 3,
    standingLevel: "Junior",
    difficulty: 3,
    project: false,
    lab: false
}

var course9 = {
    name: "Cise305",
    credit: 3,
    standingLevel: "Junior",
    difficulty: 2.5,
    project: false,
    lab: false
}

var course10 = {
    name: "GSxxx",
    credit: 3,
    standingLevel: "Junior",
    difficulty: 2.25,
    project: false,
    lab: false
}

var course11 = {
    name: "IASxxx",
    credit: 2,
    standingLevel: "Junior",
    difficulty: 1,
    project: false,
    lab: false
}
var course12 = {
  name: "ISE205",
  credit: 3,
  standingLevel: "Sophomore",
  difficulty: 2.75,
  project: false,
  lab: false
}





ExampleHours = [12, 19]
ExampleCourses = [course1,course2,course3,course4,course5,course6,course7,course8,course9,course10,course11]

ExampleProblem = new TableCSP(ExampleCourses, ExampleHours)




generate_Tables(ExampleProblem, ExampleCourses, false)


