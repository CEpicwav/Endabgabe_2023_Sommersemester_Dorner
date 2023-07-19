"use strict";
var endabgabe;
(function (endabgabe) {
    window.addEventListener("load", async () => {
        let serverIceCreams = await endabgabe.handleLoad();
        serverIceCreams.forEach(icecream => {
            addIceToList(icecream);
        });
        showIceCreamsToSelect();
    });
    let savedIceCreamSelection = document.getElementById("saved-iceCream-selection");
    let nameInput = document.getElementById("iceCream-name");
    let colorInput = document.getElementById("iceCream-color");
    let numberInput = document.getElementById("iceCream-number");
    let sprinklesInput = document.getElementById("iceCream-sprinkles");
    let priceInput = document.getElementById("iceCream-price");
    // Ein Standard Vanille-Ice wird initialisiert
    endabgabe.iceCreamMenu = [];
    let vanillaIceCream = { name: "Vanille", color: "#ffff55", iceCount: 3, sprinkles: true, price: 3 };
    addIceToList(vanillaIceCream);
    let schokoIceCream = { name: "Schoko", color: "#441122", iceCount: 1, sprinkles: false, price: 1 };
    addIceToList(schokoIceCream);
    let cookiesIceCream = { name: "Cookies", color: "#996600", iceCount: 2, sprinkles: true, price: 2 };
    addIceToList(cookiesIceCream);
    showIceCreamsToSelect();
    // fügt das Ice zu dem Icearray hinzu
    function addIceToList(_iceCream) {
        endabgabe.iceCreamMenu.push(_iceCream);
    }
    // Reagiere auf Änderungen des ausgewählten Elements
    savedIceCreamSelection.addEventListener("change", () => {
        let selectedIceCream = endabgabe.iceCreamMenu.find(iceCream => iceCream.name === savedIceCreamSelection.value);
        if (selectedIceCream) {
            setInputValuesToSelectedIceCream(selectedIceCream);
            drawCurrentIceCream();
        }
        else {
            throw new Error("Diese Auswahl existiert nicht.");
        }
    });
    function showIceCreamsToSelect() {
        savedIceCreamSelection.innerHTML = "";
        for (let iceCream of endabgabe.iceCreamMenu) {
            let option = document.createElement("option");
            option.value = iceCream.name;
            option.text = iceCream.name;
            savedIceCreamSelection.add(option);
        }
        // setze die Anzeige auf die letzte Icesorte (diese ist auch die am neusten hinzugefügte)
        savedIceCreamSelection.value = endabgabe.iceCreamMenu[endabgabe.iceCreamMenu.length - 1].name;
        setInputValuesToSelectedIceCream(endabgabe.iceCreamMenu[endabgabe.iceCreamMenu.length - 1]);
        drawCurrentIceCream();
    }
    function setInputValuesToSelectedIceCream(_iceCream) {
        let iceCreamName = _iceCream.name;
        nameInput.value = iceCreamName;
        colorInput.value = _iceCream.color;
        numberInput.value = _iceCream.iceCount.toString();
        sprinklesInput.checked = _iceCream.sprinkles;
        priceInput.value = _iceCream.price.toString();
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
        let iceCream = { name: iceCreamName, color: iceCreamColor, iceCount: iceCreamNumber, sprinkles: iceCreamSprinkles, price: iceCreamPrice };
        addIceToList(iceCream);
        showIceCreamsToSelect();
        endabgabe.saveIceCreamToServer(iceCream);
    }
    function drawCurrentIceCream() {
        let iceCreamName = nameInput.value;
        let iceCreamColor = colorInput.value;
        let iceCreamNumber = parseInt(numberInput.value);
        let iceCreamSprinkles = sprinklesInput.checked;
        let iceCreamPrice = parseInt(priceInput.value);
        endabgabe.crc2.fillStyle = "rgba(255, 255, 255, 1)";
        endabgabe.crc2.fillRect(0, 0, endabgabe.gameCanvas.width, endabgabe.gameCanvas.height);
        let iceCream = { name: iceCreamName, color: iceCreamColor, iceCount: iceCreamNumber, sprinkles: iceCreamSprinkles, price: iceCreamPrice };
        endabgabe.drawIce(new endabgabe.Vector(300, 300), 50, iceCream);
    }
    // add event listener to the start button
    let startButton = document.getElementById("start-game-button");
    startButton.addEventListener("click", endabgabe.initGameLogic);
})(endabgabe || (endabgabe = {}));
//# sourceMappingURL=script.js.map