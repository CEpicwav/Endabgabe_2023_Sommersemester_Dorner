"use strict";
var endabgabe;
(function (endabgabe) {
    let url = "https://webuser.hs-furtwangen.de/~dornerle/myMingi/index.php/";
    let connected = false;
    //Funktion um die Daten aus dem Server auszulesen -> gibt Raketen zurück
    async function handleLoad() {
        let serverText = null;
        try {
            let response = await fetch(url + "?command=find&collection=dataList&data={}");
            serverText = await response.text();
            connected = true;
        }
        catch (error) {
            alert("Serverdaten konnten nicht geladen werden!");
            console.log("There was an error", error);
            connected = false;
        }
        // any, da der Server mehr als nur unsere gespeicherten Daten zurückgeben wird
        // falls der serverText zugewiesen ist, wird er in ein JSON Objekt umgewandelt
        if (serverText != null) {
            let serverData = JSON.parse(serverText);
            let serverIceCreams = [];
            for (let key in serverData["data"]) {
                serverIceCreams.push(serverData["data"][key]);
            }
            return serverIceCreams;
        }
        return [];
    }
    endabgabe.handleLoad = handleLoad;
    //Eis speichern
    async function saveIceCreamToServer(_iceCream) {
        if (connected == false) {
            alert("Es besteht keine Verbindung zum Server! Speichern nicht möglich!");
            return;
        }
        const itemID = await checkIfItAlreadyExists(_iceCream);
        if (itemID) {
            let query = new URLSearchParams();
            query.set("command", "update");
            query.set("collection", "dataList");
            query.set("id", itemID);
            query.set("data", JSON.stringify(_iceCream));
            let response = await fetch(url + "?" + query.toString());
            let responseText = await response.text();
            if (responseText.includes("success")) {
                alert("Updated Item!");
            }
            else {
                alert("Daten konnten nicht gespeichert werden!");
            }
            return;
        }
        let query = new URLSearchParams();
        query.set("command", "insert");
        query.set("collection", "dataList");
        query.set("data", JSON.stringify(_iceCream));
        //Javascript Objekt zu einem JSON String umwandeln
        let response = await fetch(url + "?" + query.toString());
        //URL nehmen und Daten anhängen und abschicken
        let responseText = await response.text();
        //Fängt den response ab und macht ein text daraus
        if (responseText.includes("success")) {
            alert("Item hinzugefügt!");
        }
        else {
            alert("Daten konnten nicht gespeichert werden!");
        }
    }
    endabgabe.saveIceCreamToServer = saveIceCreamToServer;
    async function checkIfItAlreadyExists(_iceCream) {
        let query = new URLSearchParams();
        query.set("command", "find");
        query.set("collection", "dataList");
        query.set("data", JSON.stringify({ name: _iceCream.name }));
        let response = await fetch(url + "?" + query.toString());
        let responseText = await response.text();
        if (JSON.parse(responseText).data != "") {
            const itemID = Object.keys(JSON.parse(responseText).data)[0];
            return itemID;
        }
        return null;
    }
})(endabgabe || (endabgabe = {}));
//# sourceMappingURL=dataTransfer.js.map