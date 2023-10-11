$(document).ready(function () {
    $("#jakarta_pollution_form").submit(function (e) {
        e.preventDefault();

        var form_data = {
            "stasiun": $("#station").val(), 
            "pm10": $("#pm10").val(),
            "pm25": $("#pm25").val(),
            "so2": $("#so2").val(),
            "co": $("#co").val(),
            "o3": $("#o3").val(),
            "no2": $("#no2").val()
        };
        
        $.ajax({
            type: "POST",
            url: "http://130.211.194.95/predict",
            data: JSON.stringify(form_data),
            contentType: "application/json",
            success: function (response) {
                $("#result").html("Result: " + response.message).addClass("success");
            },
            error: function (xhr, status, error) {
                if (xhr.status === 0) {
                    $("#result").html("Unable to connect to the server. Please check your internet connection.").addClass("error");
                } else {
                    $("#result").html("Error in prediction. Server returned status code " + xhr.status + ": " + error).addClass("error");
                }
            }
        });
    });
});
