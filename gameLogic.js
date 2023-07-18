"use strict";
var endabgabe;
(function (endabgabe) {
    endabgabe.gameCanvas = document.getElementById("game-canvas");
    endabgabe.crc2 = endabgabe.gameCanvas.getContext("2d");
    endabgabe.refreshRate = 1000 / 50;
    let servedIceCreams = [];
    let updateGameStateInterval;
    function initGameLogic() {
        // create a new ice cream shop
        endabgabe.iceCreamShop = new endabgabe.IceCreamShop(5, endabgabe.iceCreamMenu);
        endabgabe.gameCanvas.addEventListener("click", checkClickedCanvasPosition);
        // clear the interval if it already exists
        window.clearInterval(updateGameStateInterval);
        // start the game loop
        updateGameStateInterval = window.setInterval(updateGameState, endabgabe.refreshRate);
    }
    endabgabe.initGameLogic = initGameLogic;
    function updateGameState() {
        // update the ice cream shop
        endabgabe.iceCreamShop.update();
        drawGame();
        newCustomers();
    }
    // übermalt den canvas alle "refreshrate" sekunden mit weißer Farbe
    function drawGame() {
        endabgabe.crc2.fillStyle = "rgba(255, 255, 255, 1)";
        endabgabe.crc2.fillRect(0, 0, endabgabe.gameCanvas.width, endabgabe.gameCanvas.height);
        // draw the ice cream shop
        endabgabe.iceCreamShop.draw();
    }
    function checkClickedCanvasPosition(_e) {
        let mousePosition = new endabgabe.Vector(_e.clientX - endabgabe.gameCanvas.offsetLeft, _e.clientY - endabgabe.gameCanvas.offsetTop);
        endabgabe.iceCreamShop.checkClicked(mousePosition);
    }
    function newCustomers() {
        // randomly create a new customer with an average of 1 new customer per 3 seconds, in respect of the refreshrate
        if (Math.random() < 1 / (3 * (1000 / endabgabe.refreshRate))) {
            // create a new customer at the right side of the canvas with a random desired ice cream
            let customer = new endabgabe.Customer(new endabgabe.Vector(endabgabe.gameCanvas.width, Math.random() * endabgabe.gameCanvas.height), endabgabe.iceCreamMenu[Math.floor(Math.random() * endabgabe.iceCreamMenu.length)]);
            // add the customer to the waiting customers
            endabgabe.iceCreamShop.addNewCustomer(customer);
        }
    }
    function addToServerdIceCreams(_iceCream) {
        servedIceCreams.push(_iceCream);
    }
    endabgabe.addToServerdIceCreams = addToServerdIceCreams;
})(endabgabe || (endabgabe = {}));
//# sourceMappingURL=gameLogic.js.map