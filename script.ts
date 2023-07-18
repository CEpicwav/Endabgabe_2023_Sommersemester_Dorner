namespace endabgabe {

    window.addEventListener("load", async () => {
        let serverIceCreams: IceCream[] = await handleLoad();
        serverIceCreams.forEach(icecream => {
            addEisToList(icecream);
        });
        showIceCreamToSelect();
    });

    let savedIceCreamSelection = document.getElementById("saved-iceCream-selection") as HTMLSelectElement;
    let nameInput: HTMLInputElement = <HTMLInputElement>document.getElementById("iceCream-name");
    let colorInput: HTMLInputElement = <HTMLInputElement>document.getElementById("iceCream-color");
    let numberInput: HTMLInputElement = <HTMLInputElement>document.getElementById("iceCream-number");
    let sprinklesInput: HTMLInputElement = <HTMLInputElement>document.getElementById("iceCream-sprinkles");
    let priceInput: HTMLInputElement = <HTMLInputElement>document.getElementById("iceCream-price");

    gameCanvas.addEventListener("click", giveIceCream);

    function giveIceCream(_event: MouseEvent): void {
        // x und y position der maus auf dem canvas werden ausgelesen. Es wird der Offset vom Canvas zum Seitenrand abgezogen
        let mousePosition: Vector = new Vector(_event.clientX - crc2.canvas.offsetLeft, _event.clientY - crc2.canvas.offsetTop);
    }

    // Ein Standard Vanille-Eis wird initialisiert
    export let iceCreamMenu: IceCream[] = [];
    let vanillaIceCream: IceCream = { "Vanille": { eiskugel: { color: "#ffff55", number: 3 }, sprinkles: true,  price: 3 } };
    addEisToList(vanillaIceCream);
    let schokoIceCream: IceCream = { "Schoko": { eiskugel: { color: "#441122", number: 1 }, sprinkles: false, price: 1 } };
    addEisToList(schokoIceCream);
    let cookiesIceCream: IceCream = { "Cookies": { eiskugel: { color: "#996600", number: 2 }, sprinkles: true, price: 2 } };
    addEisToList(cookiesIceCream);
    showIceCreamToSelect();

    // fügt das Eis zu dem Eisarray hinzu
    function addEisToList(_iceCream: IceCream): void {
        iceCreamMenu.push(_iceCream);
    }

    function showIceCreamToSelect(): void {

        savedIceCreamSelection.innerHTML = "";

        for (let iceCream of iceCreamMenu) {
            let option: HTMLOptionElement = document.createElement("option");
            // Object.keys(iceCream)[0] stellt hier den Name der Rakete dar
            option.value = Object.keys(iceCream)[0];
            option.text = Object.keys(iceCream)[0];
            savedIceCreamSelection.add(option);
        }

        // setze die Anzeige auf die letzte Eissorte (diese ist auch die am neusten hinzugefügte)
        savedIceCreamSelection.value = Object.keys(iceCreamMenu[iceCreamMenu.length - 1])[0];
        setInputValuesToSelectedRocket(iceCreamMenu[iceCreamMenu.length - 1]);
    }

    function setInputValuesToSelectedRocket(_iceCream: IceCream): void {
        let iceCreamName: string = Object.keys(_iceCream)[0];
        nameInput.value = iceCreamName;
        colorInput.value = _iceCream[iceCreamName].eiskugel.color;
        numberInput.value = _iceCream[iceCreamName].eiskugel.number.toString();
        sprinklesInput.checked = _iceCream[iceCreamName].sprinkles;
        priceInput.value = _iceCream[iceCreamName].price.toString();
    }

    // get button to save the ice
    let saveIceCreamButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("save-iceCream-button");
    saveIceCreamButton.addEventListener("click", saveIceCream);

    function saveIceCream(): void {
        let iceCreamName: string = nameInput.value;
        let iceCreamColor: string = colorInput.value;
        let iceCreamNumber: number = parseInt(numberInput.value);
        let iceCreamSprinkles: boolean = sprinklesInput.checked;
        let iceCreamPrice: number = parseInt(priceInput.value);

        let iceCream: IceCream = { [iceCreamName]: { eiskugel: { color: iceCreamColor, number: iceCreamNumber }, sprinkles: iceCreamSprinkles, price: iceCreamPrice } };
        addEisToList(iceCream);
        showIceCreamToSelect();
        saveIceCreamToServer(iceCream);
    }

    // add event listener to the start button
    let startButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("start-game-button");
    startButton.addEventListener("click", initGameLogic);
}