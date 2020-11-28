$(document).ready(function() {
    console.log("ready!");

    var submitBtn = $(".submitBtn");

    var cityData = $("#city").text();

    submitBtn.on("click", function() {
      preventDefault();
      console.log(cityData);
      console.log("yoyo")
    })

    var cityWeather = function() {
        var queryURL = "https://cors-anywhere.herokuapp.com/api.openweathermap.org/data/2.5/forecast?q=London&appid=6b9535f80b269234aa9c6fcf1d77ba62";
        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {
          console.log(response);
          var lat = response.city.coord.lat;
          var lon = response.city.coord.lon;
          var queryURL2 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=6b9535f80b269234aa9c6fcf1d77ba62"
          $.ajax({
            url: queryURL2,
            method: "GET"
          }).then(function(data) {
            console.log(data);
          })
        });
      };
  
    cityWeather();
    
});