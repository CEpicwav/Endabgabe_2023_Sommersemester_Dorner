namespace endabgabe {
    // ein Vektor bildet eine Position mit x und y Koordinaten ab
    export class Vector {
        x: number;
        y: number;

        constructor(_x: number, _y: number) {
            this.set(_x, _y);
        }

        // setzt x und y auf den übergebenen Wert
        set(_x: number, _y: number): void {
            this.x = _x;
            this.y = _y;
        }

        // addiert den übergebenen Vektor zum aktuellen Vektor
        add(_addend: Vector): void {
            this.x += _addend.x;
            this.y += _addend.y;
        }

        // multipliziert den Vektor mit dem Skalar _factor
        scale(_factor: number): void {
            this.x *= _factor;
            this.y *= _factor;
        }

        // normalisiert den Vektor (Betrag = 1)
        normalize(): void {
            let magnitude: number = Math.hypot(this.x, this.y);
            if (magnitude > 0) {
                this.scale(1 / magnitude);
            }
        }

        // gibt die differenz zwischen zwei Vektoren als neuen Vektor zurück
        static getDifference(_v0: Vector, _v1: Vector): Vector {
            return new Vector(_v0.x - _v1.x, _v0.y - _v1.y);
        }

        // gibt die Länge des Vektors zurück
        get length(): number {
            return Math.hypot(this.x, this.y);
        }

        // gibt eine Kopie des Vektors zurück
        copy(): Vector {
            return new Vector(this.x, this.y);
        }
    }
}