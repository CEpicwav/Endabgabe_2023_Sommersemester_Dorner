"use strict";
var endabgabe;
(function (endabgabe) {
    // ein Vektor bildet eine Position mit x und y Koordinaten ab
    class Vector {
        x;
        y;
        constructor(_x, _y) {
            this.set(_x, _y);
        }
        // setzt x und y auf den übergebenen Wert
        set(_x, _y) {
            this.x = _x;
            this.y = _y;
        }
        // addiert den übergebenen Vektor zum aktuellen Vektor
        add(_addend) {
            this.x += _addend.x;
            this.y += _addend.y;
        }
        // multipliziert den Vektor mit dem Skalar _factor
        scale(_factor) {
            this.x *= _factor;
            this.y *= _factor;
        }
        // normalisiert den Vektor (Betrag = 1)
        normalize() {
            let magnitude = Math.hypot(this.x, this.y);
            if (magnitude > 0) {
                this.scale(1 / magnitude);
            }
        }
        // gibt die differenz zwischen zwei Vektoren als neuen Vektor zurück
        static getDifference(_v0, _v1) {
            return new Vector(_v0.x - _v1.x, _v0.y - _v1.y);
        }
        // gibt die Länge des Vektors zurück
        get length() {
            return Math.hypot(this.x, this.y);
        }
        // gibt eine Kopie des Vektors zurück
        copy() {
            return new Vector(this.x, this.y);
        }
    }
    endabgabe.Vector = Vector;
})(endabgabe || (endabgabe = {}));
//# sourceMappingURL=vector.js.map