"use strict";
var endabgabe;
(function (endabgabe) {
    class Customer {
        position;
        desiredIceCream;
        satisfaction;
        served;
        waiting;
        waitingTime;
        waitingTimeLimit;
        eatingTime;
        target = null;
        seat = null;
        constructor(_position, _desiredIceCream) {
            this.position = _position;
            this.desiredIceCream = _desiredIceCream;
            this.satisfaction = 100;
            this.served = false;
            this.waiting = false;
            this.waitingTime = 0;
            this.waitingTimeLimit = 1000;
            // setzt eine zufällige eating time zwischen 5 und 10 sekunden
            this.eatingTime = Math.floor(Math.random() * 5 + 5) * 1000;
        }
        update() {
            if (this.waiting) {
                this.waitingTime++;
                if (this.waitingTime >= this.waitingTimeLimit && this.served == false && this.seat == null) {
                    endabgabe.iceCreamShop.removeUnsatisfiedCustomer(this);
                }
            }
            if (this.eatingTime > 0 && this.served) {
                // verringere die eating time abhängig von der frequenz in der update (refresh) aufgerufen wird
                this.eatingTime -= endabgabe.refreshRate;
                if (this.eatingTime <= 0) {
                    this.standUp();
                }
                return;
            }
            if (this.target != null) {
                this.move(this.target.position);
            }
        }
        // zeichnet den Kunden
        draw(_ordering = false) {
            if (this.waitingTime < this.waitingTimeLimit / 3) {
                endabgabe.drawHappySmiley(this.position);
            }
            else if (this.waitingTime < this.waitingTimeLimit / 3 * 2) {
                endabgabe.drawNeutralSmiley(this.position);
            }
            else {
                endabgabe.drawSadSmiley(this.position);
            }
            if (_ordering) {
                endabgabe.drawSpeechBallon(this.position, this.desiredIceCream);
            }
        }
        // bewegt den Kunden in Richtung des übergebenen Ziels
        move(_target) {
            let direction = endabgabe.Vector.getDifference(_target, this.position);
            direction.normalize();
            direction.scale(2);
            this.position.add(direction);
            // falls das ziel auf 5 genau erreicht wurde, setze das ziel auf null
            if (Math.abs(this.position.x - _target.x) < 5 && Math.abs(this.position.y - _target.y) < 5) {
                if (this.target instanceof endabgabe.Door) {
                    // falls der kunde served ist, wird er aus dem shop entfernt
                    if (this.served) {
                        endabgabe.iceCreamShop.removeFinishedCustomer(this);
                        return;
                    }
                    else {
                        this.waiting = true;
                    }
                }
                if (this.target instanceof endabgabe.Seat) {
                    this.target.customer = this;
                }
                this.target = null;
            }
        }
        isMoving() {
            if (this.target != null) {
                return true;
            }
            return false;
        }
        assignSeat(_seat) {
            this.seat = _seat;
            this.seat.addCustomer(this);
        }
        standUp() {
            if (this.seat != null) {
                this.seat.clearSeat();
                this.seat = null;
            }
        }
        // der kunde wird bedient und es wird geschaut ob das richtige eis gegeben wurde oder nicht. return ist true, falls das richtige eis gegeben wurde
        serve(_iceCream) {
            if (this.desiredIceCream == _iceCream) {
                this.satisfaction += 10;
                this.served = true;
                this.waiting = false;
                console.log("Customer was served the right ice cream");
                return true;
            }
            else {
                this.satisfaction -= 10;
                console.log("Customer was served the wrong ice cream");
                return false;
            }
        }
        setTarget(_target) {
            this.target = _target;
        }
    }
    endabgabe.Customer = Customer;
})(endabgabe || (endabgabe = {}));
//# sourceMappingURL=customer.js.map