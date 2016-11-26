

function displayChart(){
  var location = document.getElementById('userLocation').value;
  var graph_data = [];
  
  var chart = new Morris.Line({
    // ID of the element in which to draw the chart.
    element: 'myfirstchart',
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

}
