
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

    is_consistent(state, newCourse) {
        hoursLoad = 0
        for (i=0; i<length(state); i++)
        hoursLoad += state[i].credit
        

        if (!(newCourse in state.Courses)) {
            if ((hoursLoad + newCourse.credit) > this.maxHours)
            return false
        return True
        }
        return False

    }
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


TableDFS(problem, solution, depthGoal) {
    // Problem is an instance of TableCSP 
    // Check if a problem is complete, i.e: len == the depthGoal
    // if problem is not complete, assign a random new Course to the solution
    // Check solution is consistent 

    if (length(solution) == depthGoal)
        return solution
    solution_Copy = JSON.parse(JSON.stringify(solution))
    problem_Copy = JSON.parse(JSON.stringify(problem))

    // Assign a new random value to Sol_copy
    for (CourseItem in domain_Copy) {
        if (problem.is_consistent(solution_Copy, CourseItem)) {
            // update copied problem domain
            index = Array.prototype.indexOf(problem_Copy.Course, CourseItem)
            problem_Copy.Course.splice(index, 1)

            // Append CourseItem to Solution_Copy
            solution_Copy.push(CourseItem)
            
            return TableDFS(problem_Copy, solution_Copy, depthGoal)
        }
    }

}


