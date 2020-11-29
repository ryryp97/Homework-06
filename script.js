$(document).ready(function () {
  console.log("ready!");

  $(".submitBtn").click( function() {
    event.preventDefault();
    var cityData = $(".city").val();
    console.log(cityData);
    // $(".pastCities").prepend("<div>").append(cityData);
    var cityDiv = $("<div>");
    var p = $("<p>").text(cityData);
    cityDiv.append(p);
    $(".pastCities").prepend(cityDiv);
    cityWeather(cityData);
  });

  var cityWeather = function (cityData) {
    var queryURL = "https://cors-anywhere.herokuapp.com/api.openweathermap.org/data/2.5/forecast?q=" + cityData + "&appid=6b9535f80b269234aa9c6fcf1d77ba62";
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
      console.log(response);
      var lat = response.city.coord.lat;
      var lon = response.city.coord.lon;
      var queryURL2 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=6b9535f80b269234aa9c6fcf1d77ba62"
      $.ajax({
        url: queryURL2,
        method: "GET"
      }).then(function (data) {
        console.log(data);
      })
    });
  };

});