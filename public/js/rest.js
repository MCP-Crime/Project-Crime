function getCrimesLatestData(callback){
    $.ajax({
        url: "https://data.cityofchicago.org/resource/crimes.json",
        method: "GET",
        data: {
            "$limit" : 200,
            "$$app_token" : "4LSXHra0DVbTUwNPgC4whpMzH"
        },
        success: function (data) {
            callback(data);
        },
        error: function (err) {
            console.log(err);
        }
    });
}
