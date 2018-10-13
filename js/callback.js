(function() {
    for(let i = 1; i < 12; i += 1) {
        
        const index = i;
        
        // assignment callback
        const assignment = document.getElementById("assignment-" + index);
        assignment.addEventListener("input", function() {
            MiniLoco.SetAssignmentText(index, assignment.value);
        });
        
        // answer callback
        const answer = document.getElementById("answer-" + index);
        answer.addEventListener("input", function() {
            MiniLoco.SetAnswerText(index, answer.value);
        });
        
        // add assignment image callback
        const assignmentImage = document.getElementById("assignment-" + index + "-addimage");
        assignmentImage.oninput = function (e) {
            const reader = new FileReader();
            reader.onload = function(event){
                const img = new Image();
                img.onload = function() {
                    MiniLoco.SetAssignmentImage(index, img);
                    assignmentImage.value = null;
                }
                img.src = reader.result;
            }
            reader.readAsDataURL(e.target.files[0]);  
        };
        
        // remove assignment image callback
        const removeAssignmentImage = document.getElementById("assignment-" + index + "-removeimage");
        removeAssignmentImage.onclick = function (e) {
            MiniLoco.SetAssignmentImage(index, null);
        };
        
        // add assignment image callback
        const answerImage = document.getElementById("answer-" + index + "-addimage");
        answerImage.oninput = function (e) {
            const reader = new FileReader();
            reader.onload = function(event){
                const img = new Image();
                img.onload = function() {
                    MiniLoco.SetAnswerImage(index, img);
                    answerImage.value = null;
                }
                img.src = reader.result;
            }
            reader.readAsDataURL(e.target.files[0]);  
        };
        
        // remove assignment image callback
        const removeAnswerImage = document.getElementById("answer-" + index + "-removeimage");
        removeAnswerImage.onclick = function (e) {
            MiniLoco.SetAnswerImage(index, null);
        };
    }    
}());