// Function to save to favorites
$(function() {
  $('#add-location').click(function() {
      $.ajax({
          type: "POST",
          url: '/save',
          data: $('#userLocation').serialize(),
          success: function(response) {
            $('.glyphicon-heart-empty').addClass('glyphicon-heart');
            $('.glyphicon-heart').removeClass('glyphicon-heart-empty');
            $('#add-location').attr('id', 'remove-location');
            console.log(response);
          },
          error: function(error) {
              console.log(error);
          }
      });
  });
});

// Function to remove from favorites
 $(document).on('click', '#remove-location', function() {
      $.ajax({
          type: "POST",
          url: '/remove',
          data: $('#userLocation').serialize(),
          success: function(response) {
            $('.glyphicon-heart').addClass('glyphicon-heart-empty');
            $('.glyphicon-heart-empty').removeClass('glyphicon-heart');
            $('#remove-location').attr('id', 'add-location');
            console.log(response);
          },
          error: function(error) {
              console.log(error);
          }
      });

  });


// Function to display pm25 chart
function displaypm25(){
  var location = document.getElementById('location').innerHTML;
  var graph_data = [];
  $("#thechart").empty();
  $("#theinfo").empty();

  var chart = new Morris.Line({
    // ID of the element in which to draw the chart.
    element: 'thechart',
    // Chart data records -- each entry in this array corresponds to a point on
    // the chart.
    data: graph_data,
    // The name of the data record attribute that contains x-values.
    xkey: 'year',
    // A list of names of data record attributes that contain y-values.
    ykeys: ['value'],
    // Labels for the ykeys -- will be displayed when you hover over the
    // chart.
    labels: ['Value']
  });



  $.getJSON( "https://api.openaq.org/v1/measurements?location="+location+"&parameter[]=pm25&limit=1000", function( data ) {
    var html = [];
    // Get all the data
    $.each( data, function( index, content ) {
        if (index == "results"){
          // Get all the data from the index Results
          var day = 0;
          var chart_value = 0;
          $.each( content, function( att, val ) {
            // From every entry of the result get everything
            $.each( val, function( id, value ) {
                // If is date get the data if not, print the line
                if (id == "date"){
                  $.each( value, function( date1, date2 ) {
                    var fromDate = new Date(date2);
                    day = fromDate.getTime();
                  });
                }
                // Get pollution value
                if (id == "value"){
                  chart_value = value;
                }

            });

            graph_data.push({"year": day, "value": chart_value });
          });

        }

    });

    chart.setData(graph_data);

  });

  var txt = "<div class='panel panel-info'> <div class='panel-heading'> <h3 class='panel-title'>Particulates - PM 2.5</h3> </div> <div class='panel-body'> <p>The difference between PM 10 and PM 2.5 is size.</p> <p>The smaller PM2.5 were particularly deadly, with a 36% increase in lung cancer per 10 μg/m3 as it can penetrate deeper into the lungs.</p> <div> <ul class='color-scale'> <li class='color-scale__item' style='background-color: rgb(181, 235, 177); width: 11.1111%;'><span class='color-scale__value'>0µg/m³</span></li> <li class='color-scale__item' style='background-color: rgb(151, 216, 181); width: 11.1111%;'><span class='color-scale__value'>12.2</span></li> <li class='color-scale__item' style='background-color: rgb(109, 201, 193); width: 11.1111%;'><span class='color-scale__value'>24.4</span></li> <li class='color-scale__item' style='background-color: rgb(77, 179, 210); width: 11.1111%;'><span class='color-scale__value'>36.7</span></li> <li class='color-scale__item' style='background-color: rgb(44, 140, 190); width: 11.1111%;'><span class='color-scale__value'>48.9</span></li> <li class='color-scale__item' style='background-color: rgb(18, 106, 174); width: 11.1111%;'><span class='color-scale__value'>61.1</span></li> <li class='color-scale__item' style='background-color: rgb(66, 55, 168); width: 11.1111%;'><span class='color-scale__value'>73.3</span></li> <li class='color-scale__item' style='background-color: rgb(63, 32, 134); width: 11.1111%;'><span class='color-scale__value'>85.6</span></li> <li class='color-scale__item' style='background-color: rgb(64, 8, 80); width: 11.1111%;'><span class='color-scale__value'>97.8+</span></li> </ul> </div> </div> </div>";  
  $("#theinfo").append(txt);

}




// Function to display pm10 chart
function displaypm10(){
  var location = document.getElementById('location').innerHTML;
  var graph_data = [];
  $("#thechart").empty();
  $("#theinfo").empty();

  var chart = new Morris.Line({
    // ID of the element in which to draw the chart.
    element: 'thechart',
    // Chart data records -- each entry in this array corresponds to a point on
    // the chart.
    data: graph_data,
    // The name of the data record attribute that contains x-values.
    xkey: 'year',
    // A list of names of data record attributes that contain y-values.
    ykeys: ['value'],
    // Labels for the ykeys -- will be displayed when you hover over the
    // chart.
    labels: ['Value']
  });



  $.getJSON( "https://api.openaq.org/v1/measurements?location="+location+"&parameter[]=pm10&limit=1000", function( data ) {
    var html = [];
    // Get all the data
    $.each( data, function( index, content ) {
        if (index == "results"){
          // Get all the data from the index Results
          var day = 0;
          var chart_value = 0;
          $.each( content, function( att, val ) {
            // From every entry of the result get everything
            $.each( val, function( id, value ) {
                // If is date get the data if not, print the line
                if (id == "date"){
                  $.each( value, function( date1, date2 ) {
                    var fromDate = new Date(date2);
                    day = fromDate.getTime();
                  });
                }
                // Get pollution value
                if (id == "value"){
                  chart_value = value;
                }

            });

            graph_data.push({"year": day, "value": chart_value });
          });

        }

    });

    chart.setData(graph_data);

  });

  var txt = "<div class='panel panel-info'> <div class='panel-heading'> <h3 class='panel-title'>Particulates - PM 10</h3> </div> <div class='panel-body'> <p>Atmospheric particulate matter – also known as particulate matter (PM) or particulates – are microscopic solid or liquid matter suspended in the Earth's atmosphere.</p> <p>The term aerosol commonly refers to the particulate/air mixture, as opposed to the particulate matter alone. Sources of particulate matter can be man-made or natural. They have impacts on climate and precipitation that adversely affect human health.</p> </div>";
  $("#theinfo").append(txt);

}


// Function to display no2 chart
function displayno2(){
  var location = document.getElementById('location').innerHTML;
  var graph_data = [];
  $("#thechart").empty();
  $("#theinfo").empty();

  var chart = new Morris.Line({
    // ID of the element in which to draw the chart.
    element: 'thechart',
    // Chart data records -- each entry in this array corresponds to a point on
    // the chart.
    data: graph_data,
    // The name of the data record attribute that contains x-values.
    xkey: 'year',
    // A list of names of data record attributes that contain y-values.
    ykeys: ['value'],
    // Labels for the ykeys -- will be displayed when you hover over the
    // chart.
    labels: ['Value']
  });



  $.getJSON( "https://api.openaq.org/v1/measurements?location="+location+"&parameter[]=no2&limit=1000", function( data ) {
    var html = [];
    // Get all the data
    $.each( data, function( index, content ) {
        if (index == "results"){
          // Get all the data from the index Results
          var day = 0;
          var chart_value = 0;
          $.each( content, function( att, val ) {
            // From every entry of the result get everything
            $.each( val, function( id, value ) {
                // If is date get the data if not, print the line
                if (id == "date"){
                  $.each( value, function( date1, date2 ) {
                    var fromDate = new Date(date2);
                    day = fromDate.getTime();
                  });
                }
                // Get pollution value
                if (id == "value"){
                  chart_value = value;
                }

            });

            graph_data.push({"year": day, "value": chart_value });
          });

        }

    });

    chart.setData(graph_data);

  });

  var txt = "<div class='panel panel-info'> <div class='panel-heading'> <h3 class='panel-title'>Nitrogen dioxide - NO2</h3> </div> <div class='panel-body'> <p>For the public, chronic exposure to NO2 can cause respiratory effects including airway inflammation in healthy people and increased respiratory symptoms in people with asthma.</p> <p>NO2 creates ozone which causes eye irritation and exacerbates respiratory conditions, leading to increased visits to emergency departments and hospital admissions for respiratory issues, especially asthma.</p> </div> </div>";
  $("#theinfo").append(txt);

}


// Function to display o3 chart
function displayo3(){
  var location = document.getElementById('location').innerHTML;
  var graph_data = [];
  $("#thechart").empty();
  $("#theinfo").empty();

  var chart = new Morris.Line({
    // ID of the element in which to draw the chart.
    element: 'thechart',
    // Chart data records -- each entry in this array corresponds to a point on
    // the chart.
    data: graph_data,
    // The name of the data record attribute that contains x-values.
    xkey: 'year',
    // A list of names of data record attributes that contain y-values.
    ykeys: ['value'],
    // Labels for the ykeys -- will be displayed when you hover over the
    // chart.
    labels: ['Value']
  });



  $.getJSON( "https://api.openaq.org/v1/measurements?location="+location+"&parameter[]=o3&limit=1000", function( data ) {
    var html = [];
    // Get all the data
    $.each( data, function( index, content ) {
        if (index == "results"){
          // Get all the data from the index Results
          var day = 0;
          var chart_value = 0;
          $.each( content, function( att, val ) {
            // From every entry of the result get everything
            $.each( val, function( id, value ) {
                // If is date get the data if not, print the line
                if (id == "date"){
                  $.each( value, function( date1, date2 ) {
                    var fromDate = new Date(date2);
                    day = fromDate.getTime();
                  });
                }
                // Get pollution value
                if (id == "value"){
                  chart_value = value;
                }

            });

            graph_data.push({"year": day, "value": chart_value });
          });

        }

    });

    chart.setData(graph_data);

  });

  var txt = "<div class='panel panel-info'> <div class='panel-heading'> <h3 class='panel-title'>Ozone - 03</h3> </div> <div class='panel-body'> <p>Ozone precursors are a group of pollutants, predominantly those emitted during the combustion of fossil fuels.</p> <p>There is a great deal of evidence to show that ground level ozone can harm lung function and irritate the respiratory system. Exposure to ozone (and the pollutants that produce it) is linked to premature death, asthma, bronchitis, heart attack, and other cardiopulmonary problems.</p> </div>";
  $("#theinfo").append(txt);

}





// Function to display so2 chart
function displayso2(){
  var location = document.getElementById('location').innerHTML;
  var graph_data = [];
  $("#thechart").empty();
  $("#theinfo").empty();

  var chart = new Morris.Line({
    // ID of the element in which to draw the chart.
    element: 'thechart',
    // Chart data records -- each entry in this array corresponds to a point on
    // the chart.
    data: graph_data,
    // The name of the data record attribute that contains x-values.
    xkey: 'year',
    // A list of names of data record attributes that contain y-values.
    ykeys: ['value'],
    // Labels for the ykeys -- will be displayed when you hover over the
    // chart.
    labels: ['Value']
  });



  $.getJSON( "https://api.openaq.org/v1/measurements?location="+location+"&parameter[]=so2&limit=1000", function( data ) {
    var html = [];
    // Get all the data
    $.each( data, function( index, content ) {
        if (index == "results"){
          // Get all the data from the index Results
          var day = 0;
          var chart_value = 0;
          $.each( content, function( att, val ) {
            // From every entry of the result get everything
            $.each( val, function( id, value ) {
                // If is date get the data if not, print the line
                if (id == "date"){
                  $.each( value, function( date1, date2 ) {
                    var fromDate = new Date(date2);
                    day = fromDate.getTime();
                  });
                }
                // Get pollution value
                if (id == "value"){
                  chart_value = value;
                }

            });

            graph_data.push({"year": day, "value": chart_value });
          });

        }

    });

    chart.setData(graph_data);

  });
  var txt = "<div class='panel panel-info'> <div class='panel-heading'> <h3 class='panel-title'>Sulfur dioxide - SO2</h3> </div> <div class='panel-body'> <p>Sulfur dioxide is a major air pollutant and has significant impacts upon human health.</p> <p>In addition, the concentration of sulfur dioxide in the atmosphere can influence the habitat suitability for plant communities, as well as animal life. Sulfur dioxide emissions are a precursor to acid rain and atmospheric particulates.</p> </div>";
  $("#theinfo").append(txt);

}



// Function to display co chart
function displayco(){
  var location = document.getElementById('location').innerHTML;
  var graph_data = [];
  $("#thechart").empty();
  $("#theinfo").empty();

  var chart = new Morris.Line({
    // ID of the element in which to draw the chart.
    element: 'thechart',
    // Chart data records -- each entry in this array corresponds to a point on
    // the chart.
    data: graph_data,
    // The name of the data record attribute that contains x-values.
    xkey: 'year',
    // A list of names of data record attributes that contain y-values.
    ykeys: ['value'],
    // Labels for the ykeys -- will be displayed when you hover over the
    // chart.
    labels: ['Value']
  });



  $.getJSON( "https://api.openaq.org/v1/measurements?location="+location+"&parameter[]=co&limit=1000", function( data ) {
    var html = [];
    // Get all the data
    $.each( data, function( index, content ) {
        if (index == "results"){
          // Get all the data from the index Results
          var day = 0;
          var chart_value = 0;
          $.each( content, function( att, val ) {
            // From every entry of the result get everything
            $.each( val, function( id, value ) {
                // If is date get the data if not, print the line
                if (id == "date"){
                  $.each( value, function( date1, date2 ) {
                    var fromDate = new Date(date2);
                    day = fromDate.getTime();
                  });
                }
                // Get pollution value
                if (id == "value"){
                  chart_value = value;
                }

            });

            graph_data.push({"year": day, "value": chart_value });
          });

        }
        var txt = "Nothing yet";
    });

    chart.setData(graph_data);

  });

  var txt = "";
  $("#theinfo").append(txt);

}



// Function to display bc chart
function displaybc(){
  var location = document.getElementById('location').innerHTML;
  var graph_data = [];
  $("#thechart").empty();
  $("#theinfo").empty();

  var chart = new Morris.Line({
    // ID of the element in which to draw the chart.
    element: 'thechart',
    // Chart data records -- each entry in this array corresponds to a point on
    // the chart.
    data: graph_data,
    // The name of the data record attribute that contains x-values.
    xkey: 'year',
    // A list of names of data record attributes that contain y-values.
    ykeys: ['value'],
    // Labels for the ykeys -- will be displayed when you hover over the
    // chart.
    labels: ['Value']
  });



  $.getJSON( "https://api.openaq.org/v1/measurements?location="+location+"&parameter[]=bc&limit=1000", function( data ) {
    var html = [];
    // Get all the data
    $.each( data, function( index, content ) {
        if (index == "results"){
          // Get all the data from the index Results
          var day = 0;
          var chart_value = 0;
          $.each( content, function( att, val ) {
            // From every entry of the result get everything
            $.each( val, function( id, value ) {
                // If is date get the data if not, print the line
                if (id == "date"){
                  $.each( value, function( date1, date2 ) {
                    var fromDate = new Date(date2);
                    day = fromDate.getTime();
                  });
                }
                // Get pollution value
                if (id == "value"){
                  chart_value = value;
                }

            });

            graph_data.push({"year": day, "value": chart_value });
          });

        }

    });

    chart.setData(graph_data);

  });

  var txt = "";
  $("#theinfo").append(txt);

}
