$(document).ready(function () {
  var d = new Date();
  //This code checks to see if there are any past cities in localStorage and will display a card if there is a city in localStorage
  if (localStorage.getItem("city") !== null) {
    var cityDiv = $("<div>").attr("class", "card col-6");
    var p = $("<p>").text(localStorage.getItem("city"));
    cityDiv.append(p);
    $(".pastCities").prepend(cityDiv);
  };
  //On-click the value entered in the input field will be used to generate the weather data from that location
  $(".submitBtn").click( function() {
    event.preventDefault();
    var cityName = $(".city").val();
    console.log(cityName);
    var cityDiv = $("<div>").attr("class", "card col-6");
    var p = $("<p>").text(cityName);
    cityDiv.append(p);
    $(".pastCities").prepend(cityDiv);
    cityWeather(cityName);
    localStorage.setItem("city", cityName);
    $("p").click( function() {
      var p = $(this).text();
      cityWeather(p);
    })
  });
  //This allows previous weather data to be re-shown, this is alos placed within the on click function for the submit button to allow it to be applied to newly generated p elements
  $("p").click( function() {
    var p = $(this).text();
    cityWeather(p);
  })
  //Calls the open weather api and is able
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
        $(".cityDate").empty();
        $(".temp").empty();
        $(".humid").empty();
        $(".wind").empty();
        $(".uv").empty();
        $(".weatherData").removeClass("hide");
        $(".cityDate").text(cityName + " " + d.toDateString());
        $(".cityDate").append("<img src=http://openweathermap.org/img/wn/" + data.current.weather[0].icon + "@2x.png>")
        $(".temp").text(data.current.temp);
        $(".humid").text(data.current.humidity);
        $(".wind").text(data.current.wind_speed);
        $(".uv").text(data.current.uvi);
      })
    });
  };

});