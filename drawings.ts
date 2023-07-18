namespace endabgabe {

    export function drawHappySmiley(_position: Vector): void {
        drawSmileyWithoutMouth(_position);
        crc2.beginPath();
        crc2.arc(_position.x, _position.y + 2, 5, 0, Math.PI, false);  // Mouth (clockwise)
        crc2.stroke();
    }

    export function drawNeutralSmiley(_position: Vector): void {
        drawSmileyWithoutMouth(_position);
        crc2.beginPath();
        crc2.moveTo(_position.x - 5, _position.y + 4);
        crc2.lineTo(_position.x + 5, _position.y + 4);  // Mouth (clockwise)
        crc2.stroke();
    }

    export function drawSadSmiley(_position: Vector): void {
        drawSmileyWithoutMouth(_position);
        crc2.beginPath();
        crc2.arc(_position.x, _position.y + 7, 5, 0, Math.PI, true);  // Mouth (clockwise)
        crc2.stroke();
    }

    function drawSmileyWithoutMouth(_position: Vector): void {
        crc2.fillStyle = "rgba(255, 255, 255, 1)";
        crc2.beginPath();
        crc2.arc(_position.x, _position.y, 10, 0, Math.PI * 2, true); // Outer circle
        crc2.fill();
        crc2.moveTo(_position.x - 5, _position.y - 3);
        crc2.arc(_position.x - 3, _position.y - 3, 2, 0, Math.PI * 2, true);  // Left eye
        crc2.moveTo(_position.x + 1, _position.y - 3);
        crc2.arc(_position.x + 3, _position.y - 3, 2, 0, Math.PI * 2, true);  // Right eye
        crc2.stroke();
    }

    export function drawWall(_position: Vector, _width: number, _height: number): void {
        crc2.fillStyle = "rgba(0, 0, 0, 1)";
        crc2.fillRect(_position.x, _position.y, _width, _height);
    }

    export function drawIce(_position: Vector, _size: number = 30 / iceCreamMenu.length, _iceCream: IceCream): void {

        for (let i = 1; i <= _iceCream.iceCount; i++) {
            drawIceBall(new Vector(_position.x, _position.y - (_size * 0.5) * (i - 1)), _size, _iceCream.color);
        }
        drawIceCone(_position, _size);
        if (_iceCream.sprinkles) {
            drawSprinkles(new Vector(_position.x, _position.y - (_size * 0.5) * (_iceCream.iceCount - 1)), _size);
        }
    }

    export function highlightIce(_position: Vector, _size: number = 30): void {
        crc2.fillStyle = "rgba(255, 0, 255, 0.5)";
        crc2.beginPath();
        crc2.arc(_position.x, _position.y, _size * 2, 0, Math.PI * 2, true);
        crc2.closePath();
        crc2.fill();
    }

    function drawSprinkles(_position: Vector, _radius: number): void {
        crc2.fillStyle = "#ff0000";
        crc2.beginPath();
        crc2.arc(_position.x, _position.y - (_radius * 0.6), _radius * 0.2, 0, Math.PI * 2, true);
        crc2.closePath();
        crc2.fill();
        crc2.fillStyle = "#00ff00";
        crc2.beginPath();
        crc2.arc(_position.x + (_radius * 0.3), _position.y - (_radius * 0.4), _radius * 0.2, 0, Math.PI * 2, true);
        crc2.closePath();
        crc2.fill();
        crc2.fillStyle = "#0000ff";
        crc2.beginPath();
        crc2.arc(_position.x - (_radius * 0.3), _position.y - (_radius * 0.4), _radius * 0.2, 0, Math.PI * 2, true);
        crc2.closePath();
        crc2.fill();
    }

    function drawIceCone(_position: Vector, _radius: number): void {
        crc2.fillStyle = "#d2691e";
        crc2.beginPath();
        crc2.moveTo(_position.x, _position.y + (3 * _radius));
        crc2.lineTo(_position.x - _radius, _position.y);
        crc2.lineTo(_position.x + _radius, _position.y);
        crc2.closePath();
        crc2.fill();
    }

    function drawIceBall(_position: Vector, _radius: number, _color: string): void {
        crc2.fillStyle = _color;
        crc2.beginPath();
        crc2.arc(_position.x, _position.y, _radius, 0, Math.PI, true);
        crc2.closePath();
        crc2.fill();
    }

    export function drawSpeechBallon(_position: Vector, _iceCream: IceCream, _size: number = gameCanvas.height / 150): void {
        crc2.fillStyle = "rgba(255, 255, 255, 1)";
        crc2.beginPath();
        crc2.moveTo(_position.x + (_size * 9), _position.y - (_size * 20));
        crc2.quadraticCurveTo(_position.x - (_size * 1), _position.y - (_size * 20), _position.x - (_size * 1), _position.y - (_size * 12.5));
        crc2.quadraticCurveTo(_position.x - (_size * 1), _position.y - (_size * 5), _position.x + (_size * 4), _position.y - (_size * 5));
        crc2.quadraticCurveTo(_position.x + (_size * 4), _position.y - (_size * 1), _position.x, _position.y);
        crc2.quadraticCurveTo(_position.x + (_size * 6), _position.y - (_size * 1), _position.x + (_size * 7), _position.y - (_size * 5));
        crc2.quadraticCurveTo(_position.x + (_size * 19), _position.y - (_size * 5), _position.x + (_size * 19), _position.y - (_size * 12.5));
        crc2.quadraticCurveTo(_position.x + (_size * 19), _position.y - (_size * 20), _position.x + (_size * 9), _position.y - (_size * 20));
        crc2.stroke();
        crc2.closePath();
        crc2.fill();

        const offsetPosition = new Vector(_position.x + (_size * 9), _position.y - (_size * 15));
        drawIce(offsetPosition, _size * 3, _iceCream);
    }

    export function drawCurrentIncome(_position: Vector, _income: number): void {
        crc2.fillStyle = "rgba(0, 150, 0, 1)";
        crc2.font = "20px Arial";
        const text = "Einnahmen: " + _income + "€";
        crc2.textAlign = "center";
        crc2.fillText(text, _position.x, _position.y);
    }

    export function drawCurrentSatisfaction(_position: Vector, _satisfaction: number): void {
        crc2.fillStyle = "rgba(0, 150, 0, 1)";
        crc2.font = "20px Arial";
        const text = "Zufriedenheit: " + _satisfaction + "%";
        crc2.textAlign = "center";
        crc2.fillText(text, _position.x, _position.y);
    }

}