"use strict";
var endabgabe;
(function (endabgabe) {
    class IceCreamShop {
        maxCustomers;
        seats = [];
        menu = [];
        activeMenuItem = null;
        incomingCustomers = [];
        waitingCustomers = [];
        seatedCustomers = [];
        finishedCustomers = [];
        income = 0;
        lostIncome = 0;
        entrance;
        exit;
        constructor(_maxCustomers, _iceCreamMenu) {
            this.maxCustomers = _maxCustomers;
            // create seats on the left side of the canvas and add them to the seats array
            for (let i = 0; i < this.maxCustomers; i++) {
                let seatPosition = new endabgabe.Vector(endabgabe.gameCanvas.width / 2, endabgabe.gameCanvas.height / (this.maxCustomers + 1) + i * endabgabe.gameCanvas.height / (this.maxCustomers + 1));
                let seat = new Seat(seatPosition);
                this.seats.push(seat);
                this.entrance = new Door(new endabgabe.Vector(endabgabe.gameCanvas.width - endabgabe.gameCanvas.width / 10, endabgabe.gameCanvas.height / 3));
                this.exit = new Door(new endabgabe.Vector(endabgabe.gameCanvas.width - endabgabe.gameCanvas.width / 10, endabgabe.gameCanvas.height - endabgabe.gameCanvas.height / 3));
            }
            // create menu items
            for (let iceCream of _iceCreamMenu) {
                let menuItem = new MenuItem(iceCream, new endabgabe.Vector(endabgabe.gameCanvas.width / 10, endabgabe.gameCanvas.height / (endabgabe.iceCreamMenu.length + 1) + endabgabe.iceCreamMenu.indexOf(iceCream) * endabgabe.gameCanvas.height / (endabgabe.iceCreamMenu.length + 1)), (endabgabe.gameCanvas.height / 8) / _iceCreamMenu.length);
                this.menu.push(menuItem);
            }
        }
        update() {
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
                let freeSeat = this.checkForFreeSeats();
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
        checkClicked(_position) {
            for (let menuItem of this.menu) {
                if (menuItem.checkClicked(_position)) {
                    this.activeMenuItem = menuItem;
                }
            }
            const servingMenuItem = this.activeMenuItem;
            if (servingMenuItem == null) {
                return;
            }
            // check if a seat is clicked and if so, unseat the customer
            for (let seat of this.seats) {
                let eatingCustomer = seat.checkClicked(_position, servingMenuItem.iceCream);
                if (eatingCustomer != null) {
                    this.activeMenuItem = null;
                    this.finishedCustomers.push(eatingCustomer);
                    eatingCustomer.setTarget(this.exit);
                    // add income
                    this.income += eatingCustomer.desiredIceCream.price;
                }
            }
        }
        draw() {
            // draw current income
            endabgabe.drawCurrentIncome(new endabgabe.Vector(endabgabe.gameCanvas.width / 2, endabgabe.gameCanvas.height / 20), this.income);
            // draw the menu on the left side of the canvas
            for (let i = 0; i < this.menu.length; i++) {
                if (this.activeMenuItem == this.menu[i]) {
                    endabgabe.highlightIce(new endabgabe.Vector(endabgabe.gameCanvas.width / 10, endabgabe.gameCanvas.height / (this.menu.length + 1) + i * endabgabe.gameCanvas.height / (this.menu.length + 1)), (endabgabe.gameCanvas.height / 8) / this.menu.length);
                }
                endabgabe.drawIce(new endabgabe.Vector(endabgabe.gameCanvas.width / 10, endabgabe.gameCanvas.height / (this.menu.length + 1) + i * endabgabe.gameCanvas.height / (this.menu.length + 1)), (endabgabe.gameCanvas.height / 8) / this.menu.length, this.menu[i].iceCream);
            }
            // draw walls
            endabgabe.drawWall(new endabgabe.Vector(endabgabe.gameCanvas.width - endabgabe.gameCanvas.width / 10, 0), endabgabe.gameCanvas.width / 50, endabgabe.gameCanvas.height / 3 - this.entrance.size / 2);
            endabgabe.drawWall(new endabgabe.Vector(endabgabe.gameCanvas.width - endabgabe.gameCanvas.width / 10, endabgabe.gameCanvas.height / 3 + this.entrance.size / 2), endabgabe.gameCanvas.width / 50, endabgabe.gameCanvas.height / 3 - this.entrance.size);
            endabgabe.drawWall(new endabgabe.Vector(endabgabe.gameCanvas.width - endabgabe.gameCanvas.width / 10, (endabgabe.gameCanvas.height - endabgabe.gameCanvas.height / 3) + this.entrance.size / 2), endabgabe.gameCanvas.width / 50, endabgabe.gameCanvas.height / 2 - this.entrance.size / 2);
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
        removeFinishedCustomer(_customer) {
            this.finishedCustomers.splice(this.finishedCustomers.indexOf(_customer), 1);
        }
        removeUnsatisfiedCustomer(_customer) {
            this.waitingCustomers.splice(this.waitingCustomers.indexOf(_customer), 1);
            this.lostIncome += _customer.desiredIceCream.price;
            console.log("lost income: " + this.lostIncome);
        }
        checkForFreeSeats() {
            for (let seat of this.seats) {
                if (seat.customer == null) {
                    return seat;
                }
            }
            return null;
        }
        addNewCustomer(_customer) {
            // add the customer to the waiting customers
            _customer.setTarget(this.entrance);
            this.incomingCustomers.push(_customer);
        }
    }
    endabgabe.IceCreamShop = IceCreamShop;
    class Seat {
        position;
        customer;
        size;
        constructor(_position, _size = endabgabe.gameCanvas.height / 25) {
            this.position = _position;
            this.customer = null;
            this.size = _size;
        }
        draw() {
            if (this.customer != null) {
                endabgabe.crc2.fillStyle = "rgba(0, 100, 0, 1)";
            }
            else {
                endabgabe.crc2.fillStyle = "rgba(80, 50, 0, 1)";
            }
            endabgabe.crc2.beginPath();
            endabgabe.crc2.arc(this.position.x, this.position.y, this.size, 0, 2 * Math.PI);
            endabgabe.crc2.closePath();
            endabgabe.crc2.fill();
        }
        addCustomer(_customer) {
            this.customer = _customer;
            this.customer.setTarget(this);
        }
        clearSeat() {
            this.customer = null;
        }
        // falls der Seat geklickt wird, wird der Kunde, der auf dem Seat sitzt, aus dem Shop entfernt
        checkClicked(_position, _servingIceCream) {
            if (endabgabe.Vector.getDifference(_position, this.position).length < this.size) {
                if (this.customer != null && !this.customer.isMoving() && this.customer.serve(_servingIceCream)) {
                    let eatingCustomer = this.customer;
                    return eatingCustomer;
                }
            }
            return null;
        }
    }
    endabgabe.Seat = Seat;
    class Door {
        position;
        size;
        open;
        constructor(_position) {
            this.position = _position;
            this.size = endabgabe.gameCanvas.height / 10;
            this.open = true;
        }
    }
    endabgabe.Door = Door;
    class MenuItem {
        iceCream;
        position;
        size;
        constructor(_iceCream, _position, _size) {
            this.iceCream = _iceCream;
            this.position = _position;
            this.size = _size;
        }
        checkClicked(_position) {
            if (endabgabe.Vector.getDifference(_position, this.position).length < this.size * 2) {
                return true;
            }
            return false;
        }
    }
    endabgabe.MenuItem = MenuItem;
})(endabgabe || (endabgabe = {}));
//# sourceMappingURL=iceCreamShop.js.map