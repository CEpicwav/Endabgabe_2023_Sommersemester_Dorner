namespace endabgabe {

    window.addEventListener("load", async () => {
        let serverIceCreams: IceCream[] = await handleLoad();
        serverIceCreams.forEach(icecream => {
            addEisToList(icecream);
        });
        showIceCreamsToSelect();
    });

    let savedIceCreamSelection = document.getElementById("saved-iceCream-selection") as HTMLSelectElement;
    let nameInput: HTMLInputElement = <HTMLInputElement>document.getElementById("iceCream-name");
    let colorInput: HTMLInputElement = <HTMLInputElement>document.getElementById("iceCream-color");
    let numberInput: HTMLInputElement = <HTMLInputElement>document.getElementById("iceCream-number");
    let sprinklesInput: HTMLInputElement = <HTMLInputElement>document.getElementById("iceCream-sprinkles");
    let priceInput: HTMLInputElement = <HTMLInputElement>document.getElementById("iceCream-price");

    // Ein Standard Vanille-Eis wird initialisiert
    export let iceCreamMenu: IceCream[] = [];
    let vanillaIceCream: IceCream = { name: "Vanille", color: "#ffff55", iceCount: 3, sprinkles: true, price: 3 };
    addEisToList(vanillaIceCream);
    let schokoIceCream: IceCream = { name: "Schoko", color: "#441122", iceCount: 1, sprinkles: false, price: 1 };
    addEisToList(schokoIceCream);
    let cookiesIceCream: IceCream = { name: "Cookies", color: "#996600", iceCount: 2, sprinkles: true, price: 2 };
    addEisToList(cookiesIceCream);
    showIceCreamsToSelect();

    // fügt das Eis zu dem Eisarray hinzu
    function addEisToList(_iceCream: IceCream): void {
        iceCreamMenu.push(_iceCream);
    }

    // Reagiere auf Änderungen des ausgewählten Elements
    savedIceCreamSelection.addEventListener("change", () => {
        let selectedIceCream: IceCream | undefined = iceCreamMenu.find(iceCream => iceCream.name === savedIceCreamSelection.value);
        if (selectedIceCream) {
            setInputValuesToSelectedIceCream(selectedIceCream);
            drawCurrentIceCream();
        } else {
            throw new Error("Diese Auswahl existiert nicht.");
        }
    });

    function showIceCreamsToSelect(): void {

        savedIceCreamSelection.innerHTML = "";

        for (let iceCream of iceCreamMenu) {
            let option: HTMLOptionElement = document.createElement("option");
            option.value = iceCream.name;
            option.text = iceCream.name;
            savedIceCreamSelection.add(option);
        }

        // setze die Anzeige auf die letzte Eissorte (diese ist auch die am neusten hinzugefügte)
        savedIceCreamSelection.value = iceCreamMenu[iceCreamMenu.length - 1].name;
        setInputValuesToSelectedIceCream(iceCreamMenu[iceCreamMenu.length - 1]);
        drawCurrentIceCream();
    }

    function setInputValuesToSelectedIceCream(_iceCream: IceCream): void {
        let iceCreamName: string = _iceCream.name;
        nameInput.value = iceCreamName;
        colorInput.value = _iceCream.color;
        numberInput.value = _iceCream.iceCount.toString();
        sprinklesInput.checked = _iceCream.sprinkles;
        priceInput.value = _iceCream.price.toString();
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

        let iceCream: IceCream = { name: iceCreamName, color: iceCreamColor, iceCount: iceCreamNumber, sprinkles: iceCreamSprinkles, price: iceCreamPrice };
        addEisToList(iceCream);
        showIceCreamsToSelect();
        saveIceCreamToServer(iceCream);
    }

    function drawCurrentIceCream(): void {
        let iceCreamName: string = nameInput.value;
        let iceCreamColor: string = colorInput.value;
        let iceCreamNumber: number = parseInt(numberInput.value);
        let iceCreamSprinkles: boolean = sprinklesInput.checked;
        let iceCreamPrice: number = parseInt(priceInput.value);

        let iceCream: IceCream = { name: iceCreamName, color: iceCreamColor, iceCount: iceCreamNumber, sprinkles: iceCreamSprinkles, price: iceCreamPrice };
        drawIce(new Vector(300, 300), 100, iceCream);
    }

    // add event listener to the start button
    let startButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("start-game-button");
    startButton.addEventListener("click", initGameLogic);
}