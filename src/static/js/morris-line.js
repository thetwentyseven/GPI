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


$.getJSON( "https://api.openaq.org/v1/measurements?city=Edinburgh&parameter[]=pm25&date_from=2016-02-27&limit=1000", function( data ) {
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
                // Get the date data from this entry
                html.push( "<ul>" );
                $.each( value, function( date1, date2 ) {
                  var fromDate = new Date(date2);
                  day = fromDate.getTime();

                  html.push( "<li>" + day + "</li>" );
                  // Print line
                  html.push( "<li id='" + date1 + "'>" + date1 +": " + date2 + "</li>" );
                });
                html.push( "</ul>" );
              // If its not date print the line
              } else {
                html.push( "<li id='" + id + "'>" + id +": " + value + "</li>" );
              }
              // Get pollution value
              if (id == "value"){
                chart_value = value;
              }

          });

          html.push( "<br />" );
          graph_data.push({"year": day, "value": chart_value });
          console.log(graph_data);
        });

      }

  });

  chart.setData(graph_data);

  $( "<ul/>", {
    "class": "my-new-list",
    html: html.join( "" )
  }).appendTo( "#locations" );

});
