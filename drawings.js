"use strict";
var endabgabe;
(function (endabgabe) {
    function drawHappySmiley(_position) {
        drawSmileyWithoutMouth(_position);
        endabgabe.crc2.beginPath();
        endabgabe.crc2.arc(_position.x, _position.y + 2, 5, 0, Math.PI, false); // Mouth (clockwise)
        endabgabe.crc2.stroke();
    }
    endabgabe.drawHappySmiley = drawHappySmiley;
    function drawNeutralSmiley(_position) {
        drawSmileyWithoutMouth(_position);
        endabgabe.crc2.beginPath();
        endabgabe.crc2.moveTo(_position.x - 5, _position.y + 4);
        endabgabe.crc2.lineTo(_position.x + 5, _position.y + 4); // Mouth (clockwise)
        endabgabe.crc2.stroke();
    }
    endabgabe.drawNeutralSmiley = drawNeutralSmiley;
    function drawSadSmiley(_position) {
        drawSmileyWithoutMouth(_position);
        endabgabe.crc2.beginPath();
        endabgabe.crc2.arc(_position.x, _position.y + 7, 5, 0, Math.PI, true); // Mouth (clockwise)
        endabgabe.crc2.stroke();
    }
    endabgabe.drawSadSmiley = drawSadSmiley;
    function drawSmileyWithoutMouth(_position) {
        endabgabe.crc2.fillStyle = "rgba(255, 255, 255, 1)";
        endabgabe.crc2.beginPath();
        endabgabe.crc2.arc(_position.x, _position.y, 10, 0, Math.PI * 2, true); // Outer circle
        endabgabe.crc2.fill();
        endabgabe.crc2.moveTo(_position.x - 5, _position.y - 3);
        endabgabe.crc2.arc(_position.x - 3, _position.y - 3, 2, 0, Math.PI * 2, true); // Left eye
        endabgabe.crc2.moveTo(_position.x + 1, _position.y - 3);
        endabgabe.crc2.arc(_position.x + 3, _position.y - 3, 2, 0, Math.PI * 2, true); // Right eye
        endabgabe.crc2.stroke();
    }
    function drawWall(_position, _width, _height) {
        endabgabe.crc2.fillStyle = "rgba(0, 0, 0, 1)";
        endabgabe.crc2.fillRect(_position.x, _position.y, _width, _height);
    }
    endabgabe.drawWall = drawWall;
    function drawIce(_position, _size = 30 / endabgabe.iceCreamMenu.length, _iceCream) {
        for (let i = 1; i <= _iceCream.iceCount; i++) {
            drawIceBall(new endabgabe.Vector(_position.x, _position.y - (_size * 0.5) * (i - 1)), _size, _iceCream.color);
        }
        drawIceCone(_position, _size);
        if (_iceCream.sprinkles) {
            drawSprinkles(new endabgabe.Vector(_position.x, _position.y - (_size * 0.5) * (_iceCream.iceCount - 1)), _size);
        }
    }
    endabgabe.drawIce = drawIce;
    function highlightIce(_position, _size = 30) {
        endabgabe.crc2.fillStyle = "rgba(255, 0, 255, 0.5)";
        endabgabe.crc2.beginPath();
        endabgabe.crc2.arc(_position.x, _position.y, _size * 2, 0, Math.PI * 2, true);
        endabgabe.crc2.closePath();
        endabgabe.crc2.fill();
    }
    endabgabe.highlightIce = highlightIce;
    function drawSprinkles(_position, _radius) {
        endabgabe.crc2.fillStyle = "#ff0000";
        endabgabe.crc2.beginPath();
        endabgabe.crc2.arc(_position.x, _position.y - (_radius * 0.6), _radius * 0.2, 0, Math.PI * 2, true);
        endabgabe.crc2.closePath();
        endabgabe.crc2.fill();
        endabgabe.crc2.fillStyle = "#00ff00";
        endabgabe.crc2.beginPath();
        endabgabe.crc2.arc(_position.x + (_radius * 0.3), _position.y - (_radius * 0.4), _radius * 0.2, 0, Math.PI * 2, true);
        endabgabe.crc2.closePath();
        endabgabe.crc2.fill();
        endabgabe.crc2.fillStyle = "#0000ff";
        endabgabe.crc2.beginPath();
        endabgabe.crc2.arc(_position.x - (_radius * 0.3), _position.y - (_radius * 0.4), _radius * 0.2, 0, Math.PI * 2, true);
        endabgabe.crc2.closePath();
        endabgabe.crc2.fill();
    }
    function drawIceCone(_position, _radius) {
        endabgabe.crc2.fillStyle = "#d2691e";
        endabgabe.crc2.beginPath();
        endabgabe.crc2.moveTo(_position.x, _position.y + (3 * _radius));
        endabgabe.crc2.lineTo(_position.x - _radius, _position.y);
        endabgabe.crc2.lineTo(_position.x + _radius, _position.y);
        endabgabe.crc2.closePath();
        endabgabe.crc2.fill();
    }
    function drawIceBall(_position, _radius, _color) {
        endabgabe.crc2.fillStyle = _color;
        endabgabe.crc2.beginPath();
        endabgabe.crc2.arc(_position.x, _position.y, _radius, 0, Math.PI, true);
        endabgabe.crc2.closePath();
        endabgabe.crc2.fill();
    }
    function drawSpeechBallon(_position, _iceCream, _size = endabgabe.gameCanvas.height / 150) {
        endabgabe.crc2.fillStyle = "rgba(255, 255, 255, 1)";
        endabgabe.crc2.beginPath();
        endabgabe.crc2.moveTo(_position.x + (_size * 9), _position.y - (_size * 20));
        endabgabe.crc2.quadraticCurveTo(_position.x - (_size * 1), _position.y - (_size * 20), _position.x - (_size * 1), _position.y - (_size * 12.5));
        endabgabe.crc2.quadraticCurveTo(_position.x - (_size * 1), _position.y - (_size * 5), _position.x + (_size * 4), _position.y - (_size * 5));
        endabgabe.crc2.quadraticCurveTo(_position.x + (_size * 4), _position.y - (_size * 1), _position.x, _position.y);
        endabgabe.crc2.quadraticCurveTo(_position.x + (_size * 6), _position.y - (_size * 1), _position.x + (_size * 7), _position.y - (_size * 5));
        endabgabe.crc2.quadraticCurveTo(_position.x + (_size * 19), _position.y - (_size * 5), _position.x + (_size * 19), _position.y - (_size * 12.5));
        endabgabe.crc2.quadraticCurveTo(_position.x + (_size * 19), _position.y - (_size * 20), _position.x + (_size * 9), _position.y - (_size * 20));
        endabgabe.crc2.stroke();
        endabgabe.crc2.closePath();
        endabgabe.crc2.fill();
        const offsetPosition = new endabgabe.Vector(_position.x + (_size * 9), _position.y - (_size * 15));
        drawIce(offsetPosition, _size * 3, _iceCream);
    }
    endabgabe.drawSpeechBallon = drawSpeechBallon;
    function drawCurrentIncome(_position, _income) {
        endabgabe.crc2.fillStyle = "rgba(0, 150, 0, 1)";
        endabgabe.crc2.font = "20px Arial";
        const text = "Einnahmen: " + _income + "€";
        endabgabe.crc2.textAlign = "center";
        endabgabe.crc2.fillText(text, _position.x, _position.y);
    }
    endabgabe.drawCurrentIncome = drawCurrentIncome;
    function drawCurrentSatisfaction(_position, _satisfaction) {
        endabgabe.crc2.fillStyle = "rgba(0, 150, 0, 1)";
        endabgabe.crc2.font = "20px Arial";
        const text = "Zufriedenheit: " + _satisfaction + "%";
        endabgabe.crc2.textAlign = "center";
        endabgabe.crc2.fillText(text, _position.x, _position.y);
    }
    endabgabe.drawCurrentSatisfaction = drawCurrentSatisfaction;
})(endabgabe || (endabgabe = {}));
//# sourceMappingURL=drawings.js.map