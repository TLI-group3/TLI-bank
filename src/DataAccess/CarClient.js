
export class CarClient{
    constructor(api) {
        this.api = api;

    }

    /**
     * Sends a PUT request to back-end containing the input data
     */
    sendRequest = (tradeIn, clientID) => {
        const requestOptions = {
            method: 'PUT',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({clientIDs: clientID, tradeInCar: tradeIn})
        };
        fetch(this.api +'/generateCars',requestOptions)
            // Handle success
            .then(response => {
                if(!response.ok) {
                    throw new Error("Something went wrong with the request, Status " + response.status);
                } else {
                    console.log("Trade In sent");
                }

            })
            .catch(err => console.log('Request Failed', err)); // Catch errors
    }

    /**
     * Sends a GET request to back-end containing the input data
     */

    getCars = async() => {
        const requestOptions = {
            method: "GET",
        };
        var response = await fetch(this.api+"/getCars/?input=1402110922112412", requestOptions);
        var json = await response.json();
        console.log("Car's fetched, loading unto widget")
        return json.cars;

    };
}