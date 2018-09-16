const MiniLocoBuilder = (function () {
    "use strict";
    
    const preview = document.getElementById("preview");
    const miniloco = document.getElementById("miniloco");
    const assignmentWrapper = document.getElementById("assignment-wrapper");
    
    
    const squareWidth = 40.3; // the width of a square (in mm)
    const pageWidth = 297.0; // the width of a landscape A4 paper (in mm)
    const pageHeight =  210.0; // the height of a landscape A4 paper (in mm);
    const widthRadio = squareWidth / pageWidth; // ratio of square width versus page width
    const titleRatio = 25.0 / pageHeight; // ratio of height of the title (25mm) versus height of page
    const pageRatio = Math.sqrt(2); // width / height ratio of an A4 paper (sqrt(2))
    
    const assignmentSquares = new Array(12);
    const assignmentSquaresIndices = new Array(12);
    
    /*
     */
    for(let i = 0; i < 12; i += 1) {
        const j = i + 1;
        const id = "assignment-" + j;
        const square = document.createElement("div");
        square.classList.add("assignment-square");
        square.id = id;
        assignmentWrapper.appendChild(square);
        
        const squareIndex = document.createElement("div");
        squareIndex.classList.add("assignment-index");
        squareIndex.id = id + "-index";
        squareIndex.innerHTML = j;

        
        square.appendChild(squareIndex);
        
        assignmentSquares[i] = square;
        assignmentSquaresIndices[i] = squareIndex;
    }
    
    
    /*
     * Recalculates the size of the canvas.
     */
    const Layout = function () {
        const bounds = preview.getBoundingClientRect();
        const ratio = bounds.width / bounds.height;
        const scale = window.devicePixelRatio || 1;
        
        let width, height;
        if (ratio > pageRatio) {
            const h = bounds.height * 0.95;
            width = Math.round(h * pageRatio);
            height = Math.round(h);
            
        } else {
            const w = bounds.width * 0.95;
            width = Math.round(w);
            height = Math.round(w / pageRatio);
        }
        
        const squareSize = Math.round(width * widthRadio);
        const titleHeight = Math.round(height * titleRatio);
        const titleWidth = Math.round(3 * titleHeight);
        const spacing = Math.round((height - 4 * squareSize - titleHeight) * 0.25);

        const wrapperWidth = Math.round(6 * squareSize);
        const wrapperHeight = Math.round(2 * squareSize);
        const wrapperLeft = Math.round((width - wrapperWidth) * 0.5);
        const wrapperTop = spacing;
        
        const squareIndexSize = Math.round(0.15 * squareSize);
        
        // apply the sizes
        miniloco.style.width = width + "px";
        miniloco.style.height = height + "px";
        assignmentWrapper.style.width = wrapperWidth + "px";
        assignmentWrapper.style.height = wrapperHeight + "px";
        assignmentWrapper.style.left = wrapperLeft + "px";
        assignmentWrapper.style.top = wrapperTop + "px";
        
        
        for(let i = 0; i < 12; i += 1) {
            assignmentSquaresIndices[i].style.width = squareIndexSize + "px";
            assignmentSquaresIndices[i].style.height = squareIndexSize + "px";
            
        }
    };
    
    
    
    window.addEventListener("load", Layout);
    window.addEventListener("resize", Layout);
}());