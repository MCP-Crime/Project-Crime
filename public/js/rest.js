function getCrimesLatestData(callback){
    $.ajax({
        url: "https://data.cityofchicago.org/resource/ijzp-q8t2.json", //"https://data.cityofchicago.org/resource/crimes.json",
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

// function getCrimesLatestData(callback){
//     $.ajax({
//         url: "https://data.cityofchicago.org/resource/ijzp-q8t2.json?$where=block like" + " '%25" + '75TH' + "%25'",
//         method: "GET",
//         data: {
//             "$limit" : 200,
//             "$$app_token" : "4LSXHra0DVbTUwNPgC4whpMzH"
//         },
//         success: function (data) {
//             callback(data);
//         },
//         error: function (err) {
//             console.log(err);
//         }
//     });
// }
