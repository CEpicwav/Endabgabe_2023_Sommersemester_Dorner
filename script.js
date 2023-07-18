"use strict";
var endabgabe;
(function (endabgabe) {
    window.addEventListener("load", async () => {
        let serverIceCreams = await endabgabe.handleLoad();
        serverIceCreams.forEach(icecream => {
            addEisToList(icecream);
        });
        showIceCreamToSelect();
    });
    let savedIceCreamSelection = document.getElementById("saved-iceCream-selection");
    let nameInput = document.getElementById("iceCream-name");
    let colorInput = document.getElementById("iceCream-color");
    let numberInput = document.getElementById("iceCream-number");
    let sprinklesInput = document.getElementById("iceCream-sprinkles");
    let priceInput = document.getElementById("iceCream-price");
    endabgabe.gameCanvas.addEventListener("click", giveIceCream);
    function giveIceCream(_event) {
        // x und y position der maus auf dem canvas werden ausgelesen. Es wird der Offset vom Canvas zum Seitenrand abgezogen
        let mousePosition = new endabgabe.Vector(_event.clientX - endabgabe.crc2.canvas.offsetLeft, _event.clientY - endabgabe.crc2.canvas.offsetTop);
    }
    // Ein Standard Vanille-Eis wird initialisiert
    endabgabe.iceCreamMenu = [];
    let vanillaIceCream = { "Vanille": { eiskugel: { color: "#ffff55", number: 3 }, sprinkles: true, price: 3 } };
    addEisToList(vanillaIceCream);
    let schokoIceCream = { "Schoko": { eiskugel: { color: "#441122", number: 1 }, sprinkles: false, price: 1 } };
    addEisToList(schokoIceCream);
    let cookiesIceCream = { "Cookies": { eiskugel: { color: "#996600", number: 2 }, sprinkles: true, price: 2 } };
    addEisToList(cookiesIceCream);
    showIceCreamToSelect();
    // fügt das Eis zu dem Eisarray hinzu
    function addEisToList(_iceCream) {
        endabgabe.iceCreamMenu.push(_iceCream);
    }
    function showIceCreamToSelect() {
        savedIceCreamSelection.innerHTML = "";
        for (let iceCream of endabgabe.iceCreamMenu) {
            let option = document.createElement("option");
            // Object.keys(iceCream)[0] stellt hier den Name der Rakete dar
            option.value = Object.keys(iceCream)[0];
            option.text = Object.keys(iceCream)[0];
            savedIceCreamSelection.add(option);
        }
        // setze die Anzeige auf die letzte Eissorte (diese ist auch die am neusten hinzugefügte)
        savedIceCreamSelection.value = Object.keys(endabgabe.iceCreamMenu[endabgabe.iceCreamMenu.length - 1])[0];
        setInputValuesToSelectedRocket(endabgabe.iceCreamMenu[endabgabe.iceCreamMenu.length - 1]);
    }
    function setInputValuesToSelectedRocket(_iceCream) {
        let iceCreamName = Object.keys(_iceCream)[0];
        nameInput.value = iceCreamName;
        colorInput.value = _iceCream[iceCreamName].eiskugel.color;
        numberInput.value = _iceCream[iceCreamName].eiskugel.number.toString();
        sprinklesInput.checked = _iceCream[iceCreamName].sprinkles;
        priceInput.value = _iceCream[iceCreamName].price.toString();
    }
    // get button to save the ice
    let saveIceCreamButton = document.getElementById("save-iceCream-button");
    saveIceCreamButton.addEventListener("click", saveIceCream);
    function saveIceCream() {
        let iceCreamName = nameInput.value;
        let iceCreamColor = colorInput.value;
        let iceCreamNumber = parseInt(numberInput.value);
        let iceCreamSprinkles = sprinklesInput.checked;
        let iceCreamPrice = parseInt(priceInput.value);
        let iceCream = { [iceCreamName]: { eiskugel: { color: iceCreamColor, number: iceCreamNumber }, sprinkles: iceCreamSprinkles, price: iceCreamPrice } };
        addEisToList(iceCream);
        showIceCreamToSelect();
        endabgabe.saveIceCreamToServer(iceCream);
    }
    // add event listener to the start button
    let startButton = document.getElementById("start-game-button");
    startButton.addEventListener("click", endabgabe.initGameLogic);
})(endabgabe || (endabgabe = {}));
//# sourceMappingURL=script.js.map