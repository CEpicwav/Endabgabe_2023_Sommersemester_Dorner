namespace endabgabe {

    export class IceCreamShop {

        maxCustomers: number;
        seats: Seat[] = [];
        menu: MenuItem[] = [];
        activeMenuItem: MenuItem | null = null;
        incomingCustomers: Customer[] = [];
        waitingCustomers: Customer[] = [];
        seatedCustomers: Customer[] = [];
        finishedCustomers: Customer[] = [];
        income: number = 0;
        lostIncome: number = 0;
        entrance: Door;
        exit: Door;


        constructor(_maxCustomers: number, _iceCreamMenu: IceCream[]) {
            this.maxCustomers = _maxCustomers;
            // create seats on the left side of the canvas and add them to the seats array
            for (let i: number = 0; i < this.maxCustomers; i++) {
                let seatPosition: Vector = new Vector(gameCanvas.width / 2, gameCanvas.height / (this.maxCustomers + 1) + i * gameCanvas.height / (this.maxCustomers + 1));
                let seat: Seat = new Seat(seatPosition);
                this.seats.push(seat);
                this.entrance = new Door(new Vector(gameCanvas.width - gameCanvas.width / 10, gameCanvas.height / 3));
                this.exit = new Door(new Vector(gameCanvas.width - gameCanvas.width / 10, gameCanvas.height - gameCanvas.height / 3));
            }

            // create menu items
            for (let iceCream of _iceCreamMenu) {
                let menuItem: MenuItem = new MenuItem(
                    iceCream,
                    new Vector(gameCanvas.width / 10, gameCanvas.height / (iceCreamMenu.length + 1) + iceCreamMenu.indexOf(iceCream) * gameCanvas.height / (iceCreamMenu.length + 1)),
                    (gameCanvas.height / 8) / _iceCreamMenu.length
                );
                this.menu.push(menuItem);
            }
        }

        update(): void {

            // update in line customers
            for (let customer of this.incomingCustomers) {
                // check if the customer is already waiting and put them into the waiting customers if so
                if (customer.waiting) {
                    this.incomingCustomers.splice(this.incomingCustomers.indexOf(customer), 1);
                    this.waitingCustomers.push(customer);
                }
                customer.update();
            }
            // update waiting customers
            for (let customer of this.waitingCustomers) {
                // check if there are free seats and if so, seat the customer
                let freeSeat: Seat | null = this.checkForFreeSeats();
                if (freeSeat != null) {
                    customer.assignSeat(freeSeat);
                    this.waitingCustomers.splice(this.waitingCustomers.indexOf(customer), 1);
                    this.seatedCustomers.push(customer);
                }
                customer.update();
            }
            // update served customers
            for (let customer of this.seatedCustomers) {
                // check if the customer is already finished and put them into the finished customers if so
                if (customer.served) {
                    this.seatedCustomers.splice(this.seatedCustomers.indexOf(customer), 1);
                    this.finishedCustomers.push(customer);
                }
                customer.update();
            }
            // update finished customers
            for (let customer of this.finishedCustomers) {
                customer.update();
            }
        }

        // Funktion die aufgerufen wird, sobald auf den Canvas geklickt wird
        checkClicked(_position: Vector): void {

            for (let menuItem of this.menu) {
                if (menuItem.checkClicked(_position)) {
                    this.activeMenuItem = menuItem;
                }
            }

            const servingMenuItem: MenuItem | null = this.activeMenuItem;
            if (servingMenuItem == null) {
                return;
            }
            // check if a seat is clicked and if so, unseat the customer
            for (let seat of this.seats) {
                let eatingCustomer: Customer | null = seat.checkClicked(_position, servingMenuItem.iceCream);
                if (eatingCustomer != null) {
                    this.activeMenuItem = null;
                    this.finishedCustomers.push(eatingCustomer);
                    eatingCustomer.setTarget(this.exit);

                    // add income
                    this.income += eatingCustomer.desiredIceCream.price;
                }
            }
        }

        draw(): void {

            // draw current income
            drawCurrentIncome(new Vector(gameCanvas.width / 2, gameCanvas.height / 20), this.income);

            // draw the menu on the left side of the canvas
            for (let i: number = 0; i < this.menu.length; i++) {

                if (this.activeMenuItem == this.menu[i]) {
                    highlightIce(new Vector(gameCanvas.width / 10, gameCanvas.height / (this.menu.length + 1) + i * gameCanvas.height / (this.menu.length + 1)), (gameCanvas.height / 8) / this.menu.length);
                }

                drawIce(new Vector(gameCanvas.width / 10, gameCanvas.height / (this.menu.length + 1) + i * gameCanvas.height / (this.menu.length + 1)),
                    (gameCanvas.height / 8) / this.menu.length,
                    this.menu[i].iceCream
                );
            }

            // draw walls
            drawWall(new Vector(gameCanvas.width - gameCanvas.width / 10, 0), gameCanvas.width / 50, gameCanvas.height / 3 - this.entrance.size / 2);
            drawWall(new Vector(gameCanvas.width - gameCanvas.width / 10, gameCanvas.height / 3 + this.entrance.size / 2), gameCanvas.width / 50, gameCanvas.height / 3 - this.entrance.size);
            drawWall(new Vector(gameCanvas.width - gameCanvas.width / 10, (gameCanvas.height - gameCanvas.height / 3) + this.entrance.size / 2), gameCanvas.width / 50, gameCanvas.height / 2 - this.entrance.size / 2);

            // draw seats
            for (let seat of this.seats) {
                seat.draw();
            }

            // draw in line customers
            for (let customer of this.incomingCustomers) {
                customer.draw();
            }

            // draw waiting customers
            for (let customer of this.waitingCustomers) {
                customer.draw();
            }
            // draw served customers
            for (let customer of this.seatedCustomers) {
                customer.draw(true);
            }
            // draw finished customers
            for (let customer of this.finishedCustomers) {
                customer.draw();
            }
        }

        removeFinishedCustomer(_customer: Customer): void {
            this.finishedCustomers.splice(this.finishedCustomers.indexOf(_customer), 1);
        }

        removeUnsatisfiedCustomer(_customer: Customer): void {
            this.waitingCustomers.splice(this.waitingCustomers.indexOf(_customer), 1);
            this.lostIncome += _customer.desiredIceCream.price;
            console.log("lost income: " + this.lostIncome);
        }

        checkForFreeSeats(): Seat | null {
            for (let seat of this.seats) {
                if (seat.customer == null) {
                    return seat;
                }
            }
            return null;
        }

        addNewCustomer(_customer: Customer): void {
            // add the customer to the waiting customers
            _customer.setTarget(this.entrance);
            this.incomingCustomers.push(_customer);
        }

    }

    export class Seat {
        position: Vector;
        customer: Customer | null;
        size: number;

        constructor(_position: Vector, _size: number = gameCanvas.height / 25) {
            this.position = _position;
            this.customer = null;
            this.size = _size;
        }

        draw(): void {
            if (this.customer != null) {
                crc2.fillStyle = "rgba(0, 100, 0, 1)";
            } else {
                crc2.fillStyle = "rgba(80, 50, 0, 1)";
            }
            crc2.beginPath();
            crc2.arc(this.position.x, this.position.y, this.size, 0, 2 * Math.PI);
            crc2.closePath();
            crc2.fill();
        }

        addCustomer(_customer: Customer): void {
            this.customer = _customer;
            this.customer.setTarget(this);
        }

        clearSeat(): void {
            this.customer = null;
        }

        // falls der Seat geklickt wird, wird der Kunde, der auf dem Seat sitzt, aus dem Shop entfernt
        checkClicked(_position: Vector, _servingIceCream: IceCream): Customer | null {
            if (Vector.getDifference(_position, this.position).length < this.size) {
                if (this.customer != null && !this.customer.isMoving() && this.customer.serve(_servingIceCream)) {
                    let eatingCustomer = this.customer;
                    return eatingCustomer;
                }
            }
            return null;
        }
    }

    export class Door {
        position: Vector;
        size: number;
        open: boolean;

        constructor(_position: Vector) {
            this.position = _position;
            this.size = gameCanvas.height / 10;
            this.open = true;
        }
    }

    export class MenuItem {
        iceCream: IceCream;
        position: Vector;
        size: number;

        constructor(_iceCream: IceCream, _position: Vector, _size: number) {
            this.iceCream = _iceCream;
            this.position = _position;
            this.size = _size;
        }

        checkClicked(_position: Vector): boolean {
            if (Vector.getDifference(_position, this.position).length < this.size * 2) {
                return true;
            }
            return false;
        }
    }
}