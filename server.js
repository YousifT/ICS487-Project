
// Setup the file for integration with node.js / Express & add the frontend pages



// We need a method to 
// Given: Array of courses the user already finished
// Result: Array with the remaining courses left for him. 
// Note: filter all courses based on standing level and pre-requisite requirements fulfillled or not.


// Method 2:
// Given student GPA
// Decide Number of hours allowed


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
        
        if ((hoursLoad + newCourse.credit) > this.maxHours)
            return false
        return True

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