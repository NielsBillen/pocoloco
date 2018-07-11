/* export Drawing*/

const Drawing = (function () {
    "use strict";
    
    const my = {};
    const preview = document.getElementById("preview");
    const canvas = document.getElementById("canvas");
    
    const squareWidth = 40.3; // the width of a square (in mm)
    const pageWidth = 297.0; // the width of a landscape A4 paper (in mm)
    const pageHeight =  210.0; // the height of a landscape A4 paper (in mm);
    const widthRadio = squareWidth / pageWidth;
    const titleRatio = 25.0 / pageHeight;
    
    const canvasRatio = 1.41421356237;
            
    const layout = function () {
        const bounds = preview.getBoundingClientRect();
        const ratio = bounds.width / bounds.height;

        if (ratio > canvasRatio) {
            const h = bounds.height * 0.95;
            canvas.width = Math.round(h * canvasRatio);
            canvas.height = Math.round(h);
        } else {
            const w = bounds.width * 0.95;
            canvas.width = Math.round(w);
            canvas.height = Math.round(w / canvasRatio);
        }
    };
    
    const draw = function () {
        /* size calculations*/
        const width = canvas.width;
        const height = canvas.height;
        const squareSize = Math.round(width * widthRadio);
        const titleHeight = Math.round(height * titleRatio);
        const titleWidth = Math.round(3 * titleHeight);
        const spacing = Math.round((height* 0.5 - 2*squareSize - titleHeight  * 0.5) * 0.5);
                
        const context = canvas.getContext("2d", { alpha: false });
        
        context.translate(0.5, 0.5);
        
        /* clear the background */
        context.clearRect(0, 0, width, height);

        /* fill the background */
        context.fillStyle = "white";
        context.strokeStyle = "black";
        context.lineWidth = 1;
        context.alpha = 1;
        context.fillRect(0, 0, width, height);
        
        /* draw the border*/
        context.strokeRect(0, 0, width - 1, height - 1);
        
        /* draw the title */
        {
            const x = Math.round(squareSize * 0.5);
            const y = Math.round((height -titleHeight) / 2);
            context.strokeRect(x, y, titleWidth, titleHeight);
        }
        
        /* draw the permutation */
        {
            const x = Math.round(width - titleWidth - squareSize * 0.5);
            const y = Math.round((height - titleHeight) / 2);
            context.strokeRect(x, y, titleWidth, titleHeight);
        }
        
        /* draw the assignments */
        {
            const xOffset = Math.round((width - 6.0 * squareSize) * 0.5);
            const yOffset = Math.round(spacing);
            
            // draw the boxes
            for(let i = 0; i < 6; ++i) {
                const x = Math.round(xOffset + i * squareSize);
                const y = Math.round(yOffset);            
                drawSquare("assigment", context, x, y, squareSize, i + 1);
                drawSquare("assigment", context, x, y + squareSize, squareSize, i + 7);
            }
        }
        
        /* draw the answers */
        {
            const xOffset = Math.round((width - 6 * squareSize) * 0.5);
            const yOffset = Math.round(height - spacing - 2 * squareSize);
            
            // draw the boxes
            for(let i = 0; i < 6; ++i) {
                const x = Math.round(xOffset + i * squareSize);
                const y = Math.round(yOffset);            
                drawSquare("answer", context, x, y, squareSize, i + 1);
                drawSquare("answer", context, x, y + squareSize, squareSize, i + 7);
            }
        }        
    };
    
    const drawSquare = function (type, context, x, y, size, index) {
        context.strokeStyle = "black";
        context.lineWidth = "1";
        context.strokeRect(x, y, size, size);

        const textId = type + "-" + index;
        const textElement = document.getElementById(type + "-" + index);
        if (!textElement) {
            return;
        }
        const text = textElement.value;
        if (!text || text === "")
            return;
        
        const fontSize = Math.round(10 * size);
        context.font = fontSize + 'px RobotoCondensed';
        
        const xScale = 0.9 * size / context.measureText(text).width;
        const yScale = 7.5;
        const scale = Math.min(xScale, yScale);
        const scaledFontSize = Math.min(size * 0.75, Math.floor(fontSize * scale));

        context.font = scaledFontSize + "px RobotoCondensed";
    
        const textWidth = context.measureText(text).width;
        const xOffset = Math.round(x + size * 0.5);
        const yOffset = Math.round(y + size * 0.5);
        
        context.fillStyle = "black";
        context.textBaseline = "middle";
        context.textAlign = "center";
        context.fillText(text, xOffset, yOffset);        
    };
    
    my.update = function () {
        layout();
        draw();
    }
    return my;
}());

(function() {
    // attach the listeners
    for(let i = 1; i <= 12; ++i) {
        document.getElementById("assigment-" + i).addEventListener("input", Drawing.update);
        document.getElementById("answer-" + i).addEventListener("input", Drawing.update);
    }
}());

Drawing.update();
window.addEventListener("resize", Drawing.update);