$(document).ready(function() {
    //getRecentCrimes();
    getCrimesLatestData(function(ret){
        console.log(ret);
        
        for(var i=0; i<ret.length; i++){

            var date = moment(ret[i].date).format("YYYY-MM-DD");
            var time = moment(ret[i].date).format("HH:mm"); 

            $('#recentCrimesTable').append(
                $('<tr>').append(
                    $('<td>').append(
                        i+1
                    )
                ).append(
                    $('<td>').append(
                        date
                    )
                ).append(
                    $('<td>').append(
                        time
                    )
                ).append(
                    $('<td>').append(
                        ret[i].block
                    )
                ).append(
                    $('<td>').append(
                        ret[i].primary_type
                    )
                ).append(
                    $('<td>').append(
                        ret[i].description
                    )
                ).append(
                    $('<td>').append(
                        ret[i].location_description
                    )
                )
            )
        }
    });
});
