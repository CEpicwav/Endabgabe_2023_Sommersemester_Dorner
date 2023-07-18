"use strict";
var endabgabe;
(function (endabgabe) {
    let url = "https://webuser.hs-furtwangen.de/~dornerle/Database/index.php/";
    //Funktion um die Daten aus dem Server auszulesen -> gibt Raketen zurück
    async function handleLoad() {
        let response = await fetch(url + "?command=find&collection=dataList&data={}");
        let item = await response.text();
        // any, da der Server mehr als nur unsere gespeicherten Daten zurückgeben wird
        let serverData = JSON.parse(item);
        let serverIceCreams = [];
        for (let key in serverData["data"]) {
            serverIceCreams.push(serverData["data"][key]);
        }
        return serverIceCreams;
    }
    endabgabe.handleLoad = handleLoad;
    //Rakete speichern
    async function saveIceCreamToServer(_iceCream) {
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
})(endabgabe || (endabgabe = {}));
//# sourceMappingURL=dataTransfer.js.map