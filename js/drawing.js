/* export Drawing*/

/******************************************************************************
 * A collection of drawing methods and utilities for drawing the Mini Loco
 *****************************************************************************/

const Drawing = (function () {
    "use strict";
    
    const my = {};
    const font = "Arial";
    
    const preview = document.getElementById("preview");
    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d", { alpha: false, antialias: false});

    // size constants
    const squareWidth = 40.3; // the width of a square (in mm)
    const pageWidth = 297.0; // the width of a landscape A4 paper (in mm)
    const pageHeight =  210.0; // the height of a landscape A4 paper (in mm);
    const widthRadio = squareWidth / pageWidth; // ratio of square width versus page width
    const titleRatio = 25.0 / pageHeight; // ratio of height of the title (25mm) versus height of page
    const canvasRatio = 1.41421356237; // width / height ratio of an A4 paper (sqrt(2))
    
    // constants used for drawing
    let width; // width of the canvas (in px)
    let height; // height of the canvas (in px)
    let squareSize; // size of a square (in px)
    let titleWidth; // width of the title (in px)
    let titleHeight; // height of the title (in px)
    let spacing; // spacing between assignment
    
    /**************************************************************************
     * Calculates the complete size of the given text using the given font
     * individual line sizes are also given
     *************************************************************************/
    
    /*
     * Calculates the size of the given text in the given font style.
     *
     * @param text
     *      the text to calculate the size of.
     * @param fontStyle
     *      the style of the font.
     * @return an object containing the text, width and height.
     */
    const MeasureText = function(text, fontStyle) {
        if (text === null) {
            throw new Error("the given text is null!");
        }
        if (fontStyle === null) {
            throw new Error("the given font style is null!");
        }
        
        const body = document.getElementsByTagName('body')[0];
        const dummy = document.createElement('div');
        const dummyText = document.createTextNode(text);
         
        dummy.setAttribute('style', "font: " + fontStyle + ';position:absolute;top:0;left:0;margin:0;padding:0;');

        dummy.appendChild(dummyText);
        body.appendChild(dummy);
        
        context.font = fontStyle;
        
        const result = { };
        result.text = text;
        result.width = dummy.offsetWidth;
        result.height = dummy.offsetHeight;

        body.removeChild(dummy);
        
        return result;
    };
    
    /*
     * Calculates the size of the given text in the given font style where
     * for each line of the given text, the width and height of the line is 
     * also calculated.
     *
     * @param text
     *      the text to calculate the size of.
     * @param fontStyle
     *      the style of the font.
     * @return an object containing the total width and height of the text
     *      and an array storing the width, height and text of each
     *      separate line.
     */
    const MeasureMultilineText = function(text, font) {
        if (text === null) {
            throw new Error("the given text is null!");
        }
        if (font === null) {
            throw new Error("the given font style is null!");
        }
        
        // split into lines
        const lines = text.split('\n');
        const lineSizes = new Array(lines.length);
        
        let totalWidth = 0;
        let totalHeight = 0;
        for(let i = 0; i < lineSizes.length; i += 1) {
            lineSizes[i] = MeasureText(lines[i], font);
            totalHeight += lineSizes[i].height;
            totalWidth = Math.max(totalWidth, lineSizes[i].width);
        }
        
        const result = {};
        result.totalWidth = totalWidth;
        result.totalHeight = totalHeight;
        result.lineSizes = lineSizes;
        
        return result;
    };
    
    /*
     * Recalculates the size of the canvas.
     */
    const Layout = function () {
        const bounds = preview.getBoundingClientRect();
        const ratio = bounds.width / bounds.height;
        const scale = window.devicePixelRatio || 1;
        
        if (ratio > canvasRatio) {
            const h = bounds.height * 0.95;
            canvas.width = Math.round(h * canvasRatio * scale);
            canvas.height = Math.round(h * scale);
            
            canvas.style.width = Math.round(h * canvasRatio) + "px";
            canvas.style.height = Math.round(h) + "px";
        } else {
            const w = bounds.width * 0.95;
            canvas.width = Math.round(w * scale);
            canvas.height = Math.round(w * scale / canvasRatio);
            
            canvas.style.width = Math.round(w) + "px";
            canvas.style.height = Math.round(w / canvasRatio) + "px";
        }
        
        /* size calculations*/
        width = canvas.width;
        height = canvas.height;
        squareSize = Math.round(width * widthRadio);
        titleHeight = Math.round(height * titleRatio);
        titleWidth = Math.round(3 * titleHeight);
        spacing = Math.round((height - 4 * squareSize - titleHeight) * 0.25);
        context.translate(0.5, 0.5); // anti-alias bug
    };
    
    /*
     * Redraws the full content of the canvas.
     */
    const Redraw = function () {
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
            const y = Math.round((height - titleHeight) / 2);
            context.strokeRect(x, y, titleWidth, titleHeight);
        }
        
        /* draw the permutation */
        {
            const x = Math.round(width - titleWidth - squareSize * 0.5);
            const y = Math.round((height - titleHeight) / 2);
            context.strokeRect(x, y, titleWidth, titleHeight);
        }
        
        /* draw the assignments */
        for(let i = 1; i <= 12; ++i) {
            my.DrawAssignment(i);
        }
    };
    
    /*
     * Returns the largest font size the given text can be drawn in
     * while still being contained in the rectangle specified by
     * the given width, height and margin.
     *
     * @param text
     *      the text to perform the size calculations on.
     * @param width
     *      the width of the region in which the text should fit.
     * @param height
     *      the height of the region in which the text should fit.
     * @param margin (optional; default = 0)
     *      the margin of space which should be taken into account.
     */
    const GetLargestFontSize = function(text, width, height, margin) {
        if (text === null || text === "")
            return Number.POSITIVE_INFINITY;
        
        // set margin to default value
        margin = margin || 0;

        const clientWidth = width - 2 * margin;
        const clientHeight = height - 2 * margin;
        
        if (clientWidth <= 0)
            return 0;
        if (clientHeight  <= 0)
            return 0;
        
        const referenceFont = 100;
        const size = MeasureMultilineText(text, referenceFont + "px " + font);
        
        const textScaleX = clientWidth / size.totalWidth;
        const textScaleY = clientHeight / size.totalHeight;
        const textScale = Math.min(textScaleX, textScaleY);
        
        return Math.floor(referenceFont * textScale);
    };
    
    const DrawImageInside = function (image, x, y, width, height, margin) {
        if (!image)
            return;
        
        // set margin to default value
        margin = margin || 0;
        
        // check the remaining size
        const clientWidth = width - 2 * margin;
        const clientHeight = height - 2 * margin;
        if (clientWidth <= 0)
            return;
        if (clientHeight  <= 0)
            return;
        
        const imageRatio = image.width / image.height;
        const clientRatio = clientWidth / clientHeight;
        
        let w, h;
        if (imageRatio > clientRatio) {
            w = clientWidth;
            h = clientWidth / imageRatio;
        } else {
            h = clientHeight;
            w = clientHeight * imageRatio;
        }
        
        const xOffset = x + margin + (clientWidth - w) * 0.5;
        const yOffset = y + margin + (clientHeight - h) * 0.5;
        
        context.drawImage(image, xOffset, yOffset, w, h);
        
    };
    
    const DrawTextInside = function (text, color, x, y, width, height, margin) {
        if (!text || text === "")
            return;
        
        // set margin to default value
        margin = margin || 0;

        const clientWidth = width - 2 * margin;
        const clientHeight = height - 2 * margin;
        
        if (clientWidth <= 0)
            return;
        if (clientHeight  <= 0)
            return;
        
        const fontSize = GetLargestFontSize(text, clientWidth, clientHeight, 0);
        const fontStyle = fontSize + "px " + font;
        
        context.fillStyle = color;
        context.textBaseline = "top";
        context.textAlign = "left";
        context.font = fontStyle;
        
        const size = MeasureMultilineText(text, fontStyle);
        let drawY = y + margin + (clientHeight - size.totalHeight) * 0.5;
        
        for(let i = 0; i < size.lineSizes.length; i += 1) {
            const lineSize = size.lineSizes[i];
            const drawX = x + margin + (clientWidth - lineSize.width) * 0.5;
            context.fillText(lineSize.text, drawX, drawY);
            drawY += lineSize.height;
        }
    };
    
    /*
     * Redraws the square containing assignment 'i'.
     * 
     * @param i
     *      the index of the assignment to redraw.
     */
    my.DrawAssignment = function(i) {
        const j = i - 1;
        const squareX = Math.round((width - 6.0 * squareSize) * 0.5 + (j % 6) * squareSize);
        const squareY = Math.round(spacing + (j < 6 ? 0 : 1) * squareSize);
        const indexSize = Math.round(squareSize * 0.15);
        const margin = Math.round(squareSize * 0.05);
              
        /**********************************************************************
         * Draw the square itself
         *********************************************************************/
        
        context.clearRect(squareX, squareY, squareSize, squareSize);
        context.fillStyle = "white";
        context.strokeStyle = "black";
        context.lineWidth = 1;
        context.alpha = 1;
        context.fillRect(squareX, squareY, squareSize, squareSize);
        context.strokeRect(squareX, squareY, squareSize, squareSize);
        
        /**********************************************************************
         * Draw the index of the square
         *********************************************************************/
        
        context.fillStyle = "black";
        context.fillRect(squareX, squareY, indexSize, indexSize);
        DrawTextInside("" + i, "white", squareX, squareY, indexSize, indexSize);
       
        /**********************************************************************
         * Draw the image
         *********************************************************************/
        
        const text = MiniLoco.GetAssignmentText(i);
        const image = MiniLoco.GetAssignmentImage(i);
        
        if (image) {
            DrawImageInside(image, squareX, squareY + indexSize, squareSize, squareSize - indexSize, margin);
            
            // check whether there is text to draw
            if (text && text !== "") {
                DrawTextInside(text, "black", squareX + indexSize, squareY, squareSize - 2 * indexSize, indexSize, 0);
            }
        }
        else {
            // check whether there is text to draw
            if (text && text !== "") {
                DrawTextInside(text, "black", squareX, squareY + indexSize, squareSize, squareSize - indexSize, margin);
            }
        }
    }
    
    /*const drawSquare = function (type, context, x, y, size, index) {
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
        context.font = fontSize + "px " + font;
        
        const xScale = 0.9 * size / context.measureText(text).width;
        const yScale = 7.5;
        const scale = Math.min(xScale, yScale);
        const scaledFontSize = Math.min(size * 0.75, Math.floor(fontSize * scale));

        context.font = scaledFontSize + "px " + font;
    
        const textWidth = context.measureText(text).width;
        const xOffset = Math.round(x + size * 0.5);
        const yOffset = Math.round(y + size * 0.5);
        
        context.fillStyle = "black";
        context.textBaseline = "middle";
        context.textAlign = "center";
        context.fillText(text, xOffset, yOffset);        
    };*/
    
    my.update = function () {
        Layout();
        Redraw();
    }
    return my;
}());

(function() {
    // attach the listeners
    /*for(let i = 1; i <= 12; ++i) {
        document.getElementById("assignment-" + i).addEventListener("input", Drawing.update);
        document.getElementById("answer-" + i).addEventListener("input", Drawing.update);
    }*/
}());

Drawing.update();
window.addEventListener("resize", Drawing.update);