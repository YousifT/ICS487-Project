
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






class TableCSP {
    constructor(Courses, hours, rules) {
        this.Courses = Courses
        this.minHours = hours[0]
        this.maxHours = hours[1]
        this.rules = rules
    }
}
    function is_consistent(state, newCourse) {
        var hoursLoad = 0
        for (var i=0; i<state.length; i++)
        hoursLoad += state[i].credit

        console.log("Current Credit load:" + hoursLoad)
        

        if (!(newCourse in state)) {
            if ((hoursLoad + newCourse.credit) > this.maxHours)
            return false
        return true
        }
        return false

    }



class Course {
    constructor(name, credit, difficulty,  standingLevel, lab) {
        this.name = name
        this.credit = credit
        this.difficulty = difficulty
        this.standingLevel = standingLevel
        this.lab = lab
    }

    get name() {
        return this.name
    }
    get credit() {
        return this.credit
    }
    get difficulty() {
        return this.difficulty
    }
    get standingLevel() {
        return this.standingLevel
    }
    get lab() {
        return this.lab
    }
}


function generateTables() {
    

}

var res = []
function TableDFS(problem, solution, depthGoal) {
    // Problem is an instance of TableCSP 
    // Check if a problem is complete, i.e: len == the depthGoal
    // if problem is not complete, assign a random new Course to the solution
    // Check solution is consistent



    let solution_Copy = JSON.parse(JSON.stringify(solution))
    let problem_Copy = JSON.parse(JSON.stringify(problem))

    if (problem_Copy.Courses.length == 0) {
        res.push(solution)
        return true
    }

    // Assign a new random value to Sol_copy
    problem_Copy.Courses.forEach(CourseItem => {
        if (is_consistent(solution_Copy, CourseItem)) {
            // update copied problem domain
        var ind = problem_Copy.Courses.findIndex( x => 
            x.name === CourseItem.name
            );

            if (ind !== -1) {
                problem_Copy.Courses.splice(ind, 1)
            }

            // Append CourseItem to Solution_Copy
            solution_Copy.push(CourseItem)
            
            return TableDFS(problem_Copy, solution_Copy, depthGoal)
        }
        
    });
    
    
    

}

function Evaluation (table) {

}


var c1 = {
    name: "ICS102",
    credit: 4,
    difficulty: "Easy",
    standingLevel: "Senior",
    lab: false
}

var c2 = {
    name: "ICS202",
    credit: 3,
    difficulty: "Hard",
    standingLevel: "Freshman",
    lab: true
}

var c3 = {
    name: "ICS203",
    credit: 4,
    difficulty: "Hard",
    standingLevel: "Freshman",
    lab: true
}

var c4 = {
    name: "ICS333",
    credit: 4,
    difficulty: "Medium",
    standingLevel: "Junior",
    lab: false
}

var c5 = {
    name: "ICS345",
    credit: 2,
    difficulty: "Easy",
    standingLevel: "Freshman",
    lab: true
}

var c6 = {
    name: "ICS410",
    credit: 4,
    difficulty: "Hard",
    standingLevel: "Senior",
    lab: true
}

var c7 = {
    name: "ICS442",
    credit: 3,
    difficulty: "Hard",
    standingLevel: "Freshman",
    lab: true
}


ExampleHours = [12, 19]
ExampleCourses = [c1, c2, c3, c4, c5, c6, c7]
ExampleRules = []

ExampleProblem = new TableCSP(ExampleCourses, ExampleHours, ExampleRules)

console.log(typeof(c1))
console.log(typeof(c2))


Sol4 = []
TableDFS(ExampleProblem, Sol4, 4)
console.log(Sol4)