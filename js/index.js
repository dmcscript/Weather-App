$(document).ready(function() {
  var city = "";
  var weather = "";
  var temp = "";
  var icon = "";
  var appId = "&APPID=4086db9f8fa3b58013ec2d7b97e9eae4";
  var unit = "F";
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var long = position.coords.longitude;
      var lat = position.coords.latitude;
      var link = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long + appId;
      //console.log("Lat: " + lat + " | " + "long: " + long);
      //console.log("Link: " + link);
      getWeather(link);
    });
  }
  $("#temp").click(function() {
    var temperature = $('#tempK').val();
    if (unit === "F") {
      unit = "C";
      console.log("Changed to C");
      $("#temp").html(tempUnitChange(temperature, "C"));
    } else {
      unit = "F";
      console.log("Change to F");
      $("#temp").html(tempUnitChange(temperature, "F"));
    }
  })
});

function getWeather(link) {
  $.ajax({
    type: "GET",
    dataType: "jsonp",
    url: link,
    success: function(response) {
      //console.log(response);
      city = response.name;
      weather = response.weather[0].main;
      temp = Math.round(response.main.temp);
      icon = "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png";
      console.log("City: " + city + " | weather: " + weather + "| Temp: " + temp + " | Icon: " + icon);
      temp = setWeather(city, weather, temp, icon);
    }
  });
}

function setWeather(city, weather, temp, icon) {
  $("#picture").html("<img src = " + icon + ">");
  $("#location").html(city);
  $("#condition").html(weather);
  $("#temp").html(tempUnitChange(temp, "F"));
  $("#tempK").val(temp);
}
function tempUnitChange(temp, units) {
  if (units === "C") {
    return (Math.round(temp - 273.15)).toString() + " &#8451";
  } else {
    return (Math.round((temp * 9) / 5 - 459.67)).toString() + " &#x2109;";
  }
}