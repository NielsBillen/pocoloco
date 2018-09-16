const Printer = (function () {
    "use strict";
    
    const my = {};
    const miniloco = document.getElementById("miniloco");
    const printButton = document.getElementById("print");
    
    my.PrintMiniLoco = function () {
        const mywindow = window.open('', 'PRINT', 'height=400,width=600');
        mywindow.document.write('<html><head><title>' + document.title  + '</title>');
        mywindow.document.write('</head><body >');
        mywindow.document.write(miniloco.innerHTML);
        mywindow.document.write('</body></html>');

        mywindow.document.close(); // necessary for IE >= 10
        mywindow.focus(); // necessary for IE >= 10*/

        mywindow.print();
        mywindow.close();

        return true;
    };
    
    printButton.addEventListener("click", my.PrintMiniLoco);
    
    return my;
}());