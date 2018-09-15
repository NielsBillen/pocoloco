const MiniLoco = (function () {
    "use strict";
    
    const my = {};
    
    const assignmentTexts = new Array(12);
    const answerTexts = new Array(12);
    
    const assignmentImages = new Array(12);
    const answerImages = new Array(12);
    
    for(let i = 0; i < 12; i += 1) {
        assignmentTexts[i] = "";
        answerTexts[i] = "";
        assignmentImages[i] = null;
        assignmentTexts[i] = null;
    }
    
    /**
     * Sets the assignment text of square 'i' to the given text, where
     * i is in the interval [1, 12].
     *
     * @param i
     *      the index of the assignment (in the range [1, 12]).
     * @param text
     *      the value for the assignemnt.
     */
    my.SetAssignmentText = function (i, text)  {
        const j = i - 1;
        const oldAssignment = assignmentTexts[j];
        assignmentTexts[j] = text;
        
        if (oldAssignment !== text) {
            Drawing.DrawAssignment(i);
        }
    };
    
    /**
     * Returns the assignment text of square 'i', where 'i' is in the
     * interval [1, 12].
     *
     * @param i
     *      the index of the assignment (in the range [1, 12]).
     * @return the value of the assignment
     */
     my.GetAssignmentText = function (i) {
        const j = i - 1;
        const result = assignmentTexts[j];
        
        if (result) {
            return result;
        } else {
            return "";
        }
    }
    
     /**
     * Sets the assignment text of square 'i' to the given text, where
     * i is in the interval [1, 12].
     *
     * @param i
     *      the index of the assignment (in the range [1, 12]).
     * @param text
     *      the value for the assignemnt.
     */
    my.SetAssignmentImage = function (i, image)  {
        const j = i - 1;
        const old = assignmentImages[j];
        assignmentImages[j] = image;
        
        Drawing.DrawAssignment(i);
    };
    
    /**
     */
    my.HasAssignmentImage = function (i) {
        return my.GetAssignmentImage(i) !== null;
    }
    
    /**
     * Returns the assignment text of square 'i', where 'i' is in the
     * interval [1, 12].
     *
     * @param i
     *      the index of the assignment (in the range [1, 12]).
     * @return the value of the assignment
     */
    my.GetAssignmentImage = function (i) {
        const j = i - 1;
        const result = assignmentImages[j];
        return result;
    }
    
    /**
     * Sets the assignment text of square 'i' to the given text, where
     * i is in the interval [1, 12].
     *
     * @param i
     *      the index of the assignment (in the range [1, 12]).
     * @param text
     *      the value for the assignemnt.
     */
    my.SetAnswerText = function (i, text)  {
        const j = i - 1;
        const oldAnswer = answerTexts[j];
        answerTexts[j] = text;
        
        if (oldAnswer !== text) {
            Drawing.drawAnswer(i);
        }
    };
    
    /**
     * Returns the assignment text of square 'i', where 'i' is in the
     * interval [1, 12].
     *
     * @param i
     *      the index of the assignment (in the range [1, 12]).
     * @return the value of the assignment
     */
    my.GetAnswerText = function (i) {
        const j = i - 1;
        const result = answerTexts[j];
        
        if (result) {
            return result;
        } else {
            return "";
        }
    }
    
    return my;
}());