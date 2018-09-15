(function () {
    "use strict";
    
    const form = document.getElementById("form");
    
    const buildRow = function (i, identifier, text, container) {
        const id = identifier + "-" + i;
        const label = document.createElement("label");
        label.innerHTML = text;
        label.setAttribute("for", id);

        const assignmentInput = document.createElement("textarea");
        assignmentInput.id = id;
        assignmentInput.setAttribute("rows", 2);
        assignmentInput.setAttribute("cols", 20);
        //assignmentInput.setAttribute("type", "text");

        const addImage = document.createElement("input");
        const addImageId = id + "-addimage";
        addImage.setAttribute("type", "file");
        addImage.setAttribute("accept", "image/*");
        addImage.hidden = true;
        addImage.id = addImageId;

        const addImageLabel = document.createElement("label");
        addImageLabel.setAttribute("for",addImageId);
        {
            const addImageIcon = document.createElement("img");
            addImageIcon.src = "images/icons/80/icons8-add-image.png";
            addImageIcon.width = 30;
            addImageIcon.height = 30;
            addImageLabel.appendChild(addImageIcon);
        }

        const removeImageLabel = document.createElement("label");
        removeImageLabel.id = id + "-removeimage";

        {
            const removeImageIcon = document.createElement("img");
            removeImageIcon.src = "images/icons/80/icons8-remove-image.png";
            removeImageIcon.width = 30;
            removeImageIcon.height = 30;
            removeImageLabel.appendChild(removeImageIcon);
        }
        
        container.appendChild(label);
        container.appendChild(assignmentInput);
        container.appendChild(addImage);
        container.appendChild(addImageLabel);
        container.appendChild(removeImageLabel);
    };
    
    // build the different inputs
    for(let i = 1; i <= 12; i += 1) {
        const fieldSet = document.createElement("fieldset");
        
        {
            const legend = document.createElement("legend");
            legend.innerHTML = "Vak " + i + ":";

            const inputSquare = document.createElement("div");
            inputSquare.classList.add("input-square");
            
            {
                buildRow(i, "assignment", "Opgave", inputSquare);
                buildRow(i, "answer", "Antwoord", inputSquare);
            }
            
            fieldSet.appendChild(legend);
            fieldSet.appendChild(inputSquare);
        }
        
        form.appendChild(fieldSet);
    }
}());