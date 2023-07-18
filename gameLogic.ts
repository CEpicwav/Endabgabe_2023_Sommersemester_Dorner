namespace endabgabe {

    export let gameCanvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("game-canvas");
    export let crc2: CanvasRenderingContext2D = <CanvasRenderingContext2D>gameCanvas.getContext("2d");

    export const refreshRate: number = 1000 / 50;

    export let iceCreamShop: IceCreamShop;
    let servedIceCreams: IceCream[] = [];

    let updateGameStateInterval: number;

    export function initGameLogic(): void {
        // create a new ice cream shop
        iceCreamShop = new IceCreamShop(5, iceCreamMenu);
        gameCanvas.addEventListener("click", checkClickedCanvasPosition);

        // clear the interval if it already exists
        window.clearInterval(updateGameStateInterval);
        // start the game loop
        updateGameStateInterval = window.setInterval(updateGameState, refreshRate);
    }

    function updateGameState(): void {
        // update the ice cream shop
        iceCreamShop.update();
        drawGame();
        newCustomers();
    }

    // übermalt den canvas alle "refreshrate" sekunden mit weißer Farbe
    function drawGame(): void {
        crc2.fillStyle = "rgba(255, 255, 255, 1)";
        crc2.fillRect(0, 0, gameCanvas.width, gameCanvas.height);
        
        // draw the ice cream shop
        iceCreamShop.draw();
    }

    function checkClickedCanvasPosition(_e: Event): void {
        let mousePosition: Vector = new Vector((<MouseEvent>_e).clientX - gameCanvas.offsetLeft, (<MouseEvent>_e).clientY - gameCanvas.offsetTop);
        iceCreamShop.checkClicked(mousePosition);
    }

    function newCustomers(): void {
        // randomly create a new customer with an average of 1 new customer per 3 seconds, in respect of the refreshrate
        if (Math.random() < 1 / (3 * (1000 / refreshRate))) {
            // create a new customer at the right side of the canvas with a random desired ice cream
            let customer: Customer = new Customer(new Vector(gameCanvas.width, Math.random() * gameCanvas.height), iceCreamMenu[Math.floor(Math.random() * iceCreamMenu.length)]);
            // add the customer to the waiting customers
            iceCreamShop.addNewCustomer(customer);
        }
    }

    export function addToServerdIceCreams(_iceCream: IceCream): void {
        servedIceCreams.push(_iceCream);
    }

}