const Geometry = (function () {
    const my = {};
    
    my.Point = function (x, y) {
        this.getX = function () {
            return x;
        }
        
        this.getY = function () {
            return y;
        }
    }
    
    my.Rectangle = function (x, y, width, height) {
        this.getX = function () {
            return x;
        }
        
        this.getY = function () {
            return y;
        }
        
        this.getWidth = function () {
            return width;
        }
        
        this.getCenter = function () {
            return new my.Point(x + width * 0.5, y + height * 0.5);
        }
        
        this.getHeight = function () {
            return height;
        }
    };
    
    return my;
}());