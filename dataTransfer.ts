namespace endabgabe {

    export interface IceCreamScoop {
        color: string;
        number: number;
    }

    export interface IceCream {
        [name: string]: {
            eiskugel: IceCreamScoop;
            sprinkles: boolean;
            price: number;
        };
    }

    let url: string = "https://webuser.hs-furtwangen.de/~dornerle/Database/index.php/";

    //Funktion um die Daten aus dem Server auszulesen -> gibt Raketen zurück
    export async function handleLoad(): Promise<IceCream[]> {
        let response: Response = await fetch(url + "?command=find&collection=dataList&data={}");
        let item: string = await response.text();
        // any, da der Server mehr als nur unsere gespeicherten Daten zurückgeben wird
        let serverData: any = JSON.parse(item);
        let serverIceCreams: IceCream[] = [];
        for (let key in serverData["data"]) {
            serverIceCreams.push(serverData["data"][key]);
        }
        return serverIceCreams;
    }

    //Rakete speichern
    export async function saveIceCreamToServer(_iceCream: IceCream): Promise<void> {
        let query: URLSearchParams = new URLSearchParams();
        query.set("command", "insert");
        query.set("collection", "dataList");
        query.set("data", JSON.stringify(_iceCream));
        //Javascript Objekt zu einem JSON String umwandeln
        let response: Response = await fetch(url + "?" + query.toString());
        //URL nehmen und Daten anhängen und abschicken
        let responseText: string = await response.text();
        //Fängt den response ab und macht ein text daraus
        if (responseText.includes("success")) {
            alert("Item hinzugefügt!");
        }
        else {
            alert("Daten konnten nicht gespeichert werden!");
        }
    }
}