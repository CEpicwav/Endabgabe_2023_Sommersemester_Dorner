namespace endabgabe {

    export class Customer {
        position: Vector;
        desiredIceCream: IceCream;
        satisfaction: number;
        served: boolean;
        waiting: boolean;
        waitingTime: number;
        waitingTimeLimit: number;
        eatingTime: number;
        target: Seat | Door | null = null;
        seat: Seat | null = null;

        constructor(_position: Vector, _desiredIceCream: IceCream) {
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

        update(): void {
            if (this.waiting) {
                this.waitingTime++;
                if (this.waitingTime >= this.waitingTimeLimit && this.served == false && this.seat == null) {
                    iceCreamShop.removeUnsatisfiedCustomer(this);
                }
            }
            if(this.eatingTime > 0 && this.served) {
                // verringere die eating time abhängig von der frequenz in der update (refresh) aufgerufen wird
                this.eatingTime -= refreshRate;
                if(this.eatingTime <= 0) {
                    this.standUp();
                }
                return;
            }
            if(this.target != null) {
                this.move(this.target.position);
            }
        }

        // zeichnet den Kunden
        draw(_ordering: boolean = false): void {
            if (this.waitingTime < this.waitingTimeLimit/3) {
                drawHappySmiley(this.position);
            } else if(this.waitingTime < this.waitingTimeLimit/3*2) {
                drawNeutralSmiley(this.position);
            } else {
                drawSadSmiley(this.position);
            }

            if(_ordering) {
                drawSpeechBallon(this.position, this.desiredIceCream);
            }
        }

        // bewegt den Kunden in Richtung des übergebenen Ziels
        move(_target: Vector): void {
            let direction: Vector = Vector.getDifference(_target, this.position);
            direction.normalize();
            direction.scale(2);
            this.position.add(direction);
            // falls das ziel auf 5 genau erreicht wurde, setze das ziel auf null
            if (Math.abs(this.position.x - _target.x) < 5 && Math.abs(this.position.y - _target.y) < 5) {
                if(this.target instanceof Door) {
                    // falls der kunde served ist, wird er aus dem shop entfernt
                    if(this.served) {
                        iceCreamShop.removeFinishedCustomer(this);
                        return;
                    } else {
                        this.waiting = true;
                    }
                }
                if(this.target instanceof Seat) {
                    this.target.customer = this;
                }
                this.target = null;
            }
        }

        isMoving(): boolean {
            if(this.target != null) {
                return true;
            }
            return false;
        }

        assignSeat(_seat: Seat): void {
            this.seat = _seat;
            this.seat.addCustomer(this);
        }

        standUp(): void {
            if(this.seat != null) {
                this.seat.clearSeat();
                this.seat = null;
            }
        }

        // der kunde wird bedient und es wird geschaut ob das richtige eis gegeben wurde oder nicht. return ist true, falls das richtige eis gegeben wurde
        serve(_iceCream: IceCream): boolean {
            if (this.desiredIceCream == _iceCream) {
                this.satisfaction += 10;
                this.served = true;
                this.waiting = false;
                console.log("Customer was served the right ice cream");
                return true;
            } else {
                this.satisfaction -= 10;
                console.log("Customer was served the wrong ice cream");
                return false;
            }
        }

        setTarget(_target: Seat | Door): void {
            this.target = _target;
        }

    }

}