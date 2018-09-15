(function() {
    for(let i = 1; i < 12; i += 1) {
        
        const index = i;
        const assignment = document.getElementById("assignment-" + index);
        assignment.addEventListener("input", function() {
            MiniLoco.SetAssignmentText(index, assignment.value);
        });
        
        const assignmentImage = document.getElementById("assignment-" + index + "-addimage");
        assignmentImage.oninput = function (e) {
            const reader = new FileReader();
            reader.onload = function(event){
                const img = new Image();
                img.onload = function() {
                    MiniLoco.SetAssignmentImage(index, img);
                    console.log("set assignment image ...");
                    assignmentImage.value = null;
                }
                img.src = reader.result;
            }
            reader.readAsDataURL(e.target.files[0]);  
            console.log("read image ...");
        };
        
        const removeAssignmentImage = document.getElementById("assignment-" + index + "-removeimage");
        removeAssignmentImage.onclick = function (e) {
            MiniLoco.SetAssignmentImage(index, null);
        };
    }    
}());