$(document).ready(function() {
    //getRecentCrimes();
    getCrimesLatestData(function(ret){
        console.log(ret);
        generateTable(ret);
    });
});

function generateTable(data){
    $('#recentCrimesTable').html('');

    $('#recentCrimesTable').append(
        $('<thead>').append(
            $('<tr>').attr({"style" : "color:white;background-color:grey"}).append(
                $('<th>').append("S.No.")
            ).append(
                $('<th>').append("Date")
            ).append(
                $('<th>').append("Time")
            ).append(
                $('<th>').append("Block")
            ).append(
                $('<th>').append("Crime Type")
            ).append(
                $('<th>').append("Crime Description")
            ).append(
                $('<th>').append("Location Description")
            )
        )
    ).append(
        $('<tbody>').attr("id", "recentCrimesTableBody")
    );

    for(var i=0; i<data.length; i++){
        var date = moment(data[i].date).format("YYYY-MM-DD");
        var time = moment(data[i].date).format("HH:mm"); 

        $('#recentCrimesTableBody').append(
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
                    data[i].block
                )
            ).append(
                $('<td>').append(
                    data[i].primary_type
                )
            ).append(
                $('<td>').append(
                    data[i].description
                )
            ).append(
                $('<td>').append(
                    data[i].location_description
                )
            )
        )
    }
}

function searchByStreet(){
    let isValid = true, message;

    if($('#blockNameSearch').val() == ""){
        message = "Please enter block name to continue..";
        isValid = false;
    }
    
    if(isValid){
        searchByBlock($('#blockNameSearch').val(), function(data){
            if(data != "" && data.length != 0){
                console.log(data);
                generateTable(data);
            }
            else{
                alert("No data found. Try another block..");
                isValid = false;
            }
        });
    }
    else{
        alert(message);
        isValid = false;
    }
    return isValid;
}

function searchByCrime(){
    let isValid = true, message;

    if($('#crimeTypeSelect').val() == ""){
        message = "Please select crime type!!";
        isValid = false;
    }
    
    if(isValid){
        searchByCrimeType($('#crimeTypeSelect').val(), function(data){
            if(data != "" && data.length != 0){
                console.log(data);
                generateTable(data);
            }
            else{
                alert("No data found. Try another block..");
                isValid = false;
            }
        });
    }
    else{
        alert(message);
        isValid = false;
    }
    return isValid;
}

// function searchByYear(){
//     alert();
//     let convertedDate = ($('#searchByYear').val()).toISOString();
//     console.log(convertedDate);
//     searchByDate(convertedDate, function(data){
//         if(data != "" && data.length != 0){
//             console.log(data);
//             generateTable(data);
//         }
//         else{
//             alert("No data found. Try another block..");
//             isValid = false;
//         }
//     });
// }
