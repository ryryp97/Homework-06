$(document).ready(function () {
  console.log("ready!");

  var d = new Date();

  console.log(d.toDateString());

  $(".submitBtn").click( function() {
    event.preventDefault();
    var cityName = $(".city").val();
    console.log(cityName);
    var cityDiv = $("<div>").attr("class", "card col-6");
    var p = $("<p>").text(cityName);
    cityDiv.append(p);
    $(".pastCities").prepend(cityDiv);
    cityWeather(cityName);
  });

  var cityWeather = function (cityName) {
    var queryURL = "https://cors-anywhere.herokuapp.com/api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=6b9535f80b269234aa9c6fcf1d77ba62";
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
        $(".weatherData").removeClass("hide");
        $(".cityDate").text(cityName + " " + d.toDateString());
      })
    });
  };

});