var down = '';
var tel = 'ETPI';
var yr = '2019';
var solved = '';

$(document).ready(function()
{
  $.ajax(
  {
    type : "POST",
    url : './php/get-providers.php',
    dataType : "",
    success : function(data)
    {
      data = $.parseJSON(data);
      len = data.length;
      
      for (i = 0; i < len; i++)
      {
        id = data[i]['id'];
        provider = data[i]['provider'];

        $('#choose_provider').append($('<option>', {value:id, text:provider}));
      }
    }
  });

  $.ajax(
  {
    type : "POST",
    url : './php/get-year.php',
    dataType : "json",
    success : function(data)
    {
        len = data.length;

        for (i = 0; i < len; i++)
        {
          year = data[i]['year'];

          $('#choose_year').append($('<option>', {value:year, text:year}));
        }
    }
  });

  $.ajax(
  {
    type : "POST",
    url : './php/get-monthly-down.php',
    data : {provider : 1, year : '2019'},
    dataType : "json",
    success : function(data)
    {
      var datas = [];
      if (!data)
      {
        datas = [0,0,0,0,0,0,0,0,0,0,0,0];
      }
      else
      {
        datas = [data['jan'], data['feb'], data['mar'], data['apr'], data['may'], data['jun'], data['jul'], data['aug'], data['sep'], data['oct'], data['nov'], data['dec']];
      }
      //Set new default font family and font color to mimic Bootstrap's default styling
      Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
      Chart.defaults.global.defaultFontColor = '#292b2c';

      var label = ["January " + data['jan'], "February " + data['feb'], "March " + data['mar'], "April " + data['apr'], "May " + data['may'], "June " + data['jun'], "July " + data['jul'], "August " + data['aug'], "September " + data['sep'], "October " + data['oct'], "November " + data['nov'], "December " + data['dec']];

      // Bar Chart Example

      function setupCanvas(canvas) {
        // Get the device pixel ratio, falling back to 1.
        var dpr = window.devicePixelRatio || 1;
        // Get the size of the canvas in CSS pixels.
        var rect = canvas.getBoundingClientRect();
        // Give the canvas pixel dimensions of their CSS
        // size * the device pixel ratio.
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        var ctx = canvas.getContext('2d');
        // Scale all drawing operations by the dpr, so you
        // don't have to worry about the difference.
        ctx.scale(dpr, dpr);
        return ctx;
      }
      var ctx = setupCanvas(document.getElementById("myBarChart"));
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(100, 100);
      ctx.lineTo(200, 200);
      ctx.stroke();
      //var ctx = document.getElementById("myBarChart");
      var myLineChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: label ,
          datasets: [{
            label: "Down",
            backgroundColor: "rgba(2,117,216,1)",
            borderColor: "rgba(2,117,216,1)",
            data: datas,
          }],
        },
        options: {
          scales: {
            xAxes: [{
              time: {
                unit: 'month'
              },
              gridLines: {
                display: false
              },
              ticks: {
                maxTicksLimit: 12
              }
            }],
            yAxes: [{
              ticks: {
                min: 0,
                max: 50,
                maxTicksLimit: 25
              },
              gridLines: {
                display: true
              }
            }],
          },
          legend: {
            display: false
          }
        }
      });

      var len = data['downtime'].length;
      down = data['down'];
      solved = data['solvedData'];

      if (len > 0)
      {
        var t =  $('#dashTable').DataTable();
        t.clear().draw();

        var h = $('#hisTable').DataTable();
        h.clear().draw();

        for (i = 0; i < len; i++)
        {
          id = data['downtime'][i]['id'];
          ticket = data['downtime'][i]['ticket'];
          branch = data['downtime'][i]['branch'];
          telco = data['downtime'][i]['provider'];
          start = data['downtime'][i]['start'];
          downtime = data['downtime'][i]['downtime'];
          status = data['downtime'][i]['status'];

          t.row.add(
            [
              ticket,
              branch,
              telco,
              start,
              downtime,
              status,
              '<button class="btn btn-info" data-toggle="modal" data-target="#remModal" style="width:100%"  onclick="remark('+id+')"><i class="fa fa-eye"></i>&nbspRemarks</button>'
            ]).draw(false);
        }

        var l = data['solvedData'].length;

        if (l > 0)
        {
          for (i = 0; i < l; i++)
          {
            id = data['solvedData'][i]['id'];
            branch = data['solvedData'][i]['branch'];
            telco = data['solvedData'][i]['provider'];
            start = data['solvedData'][i]['start'];
            solve = data['solvedData'][i]['solve'];
            downtime = data['solvedData'][i]['downtime'];
            status = data['solvedData'][i]['status'];

            h.row.add(
              [
                branch,
                telco,
                start,
                solve,
                downtime,
                status,
                '<button class="btn btn-info" data-toggle="modal" data-target="#remModal" style="width:100%"  onclick="remark('+id+')"><i class="fa fa-eye"></i>&nbspRemarks</button>'
              ]).draw(false);
          }
        }
      }
    }
  });
});

$("#saveimg").click(function() 
{
  var canvas = document.getElementById("myBarChart");
  canvas.toBlob(function(blob) {
      saveAs(blob, "canvas.jpg");
  });
});

$('#generate_report').on('click', function()
{
  provider = $('#choose_provider').val();
  year = $('#choose_year').val();
  
  prov = $('#choose_provider option:selected').text();
  tel = prov;
  yr = year;

  $.ajax(
  {
    type : "POST",
    url : './php/get-monthly-down.php',
    data : {provider : provider, year : year},
    dataType : "json",
    success : function(data)
    {
      datas = [data['jan'], data['feb'], data['mar'], data['apr'], data['may'], data['jun'], data['jul'], data['aug'], data['sep'], data['oct'], data['nov'], data['dec']];

      //Set new default font family and font color to mimic Bootstrap's default styling
      Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
      Chart.defaults.global.defaultFontColor = '#292b2c';

      var label = ["January " + data['jan'], "February " + data['feb'], "March " + data['mar'], "April " + data['apr'], "May " + data['may'], "June " + data['jun'], "July " + data['jul'], "August " + data['aug'], "September " + data['sep'], "October " + data['oct'], "November " + data['nov'], "December " + data['dec']];

      // Bar Chart Example
      var ctx = document.getElementById("myBarChart");
      var myLineChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: label ,
          datasets: [{
            label: "Down",
            backgroundColor: "rgba(2,117,216,1)",
            borderColor: "rgba(2,117,216,1)",
            data: datas,
          }],
        },
        options: {
          scales: {
            xAxes: [{
              time: {
                unit: 'month'
              },
              gridLines: {
                display: false
              },
              ticks: {
                maxTicksLimit: 24
              }
            }],
            yAxes: [{
              ticks: {
                min: 0,
                max: 50,
                maxTicksLimit: 25
              },
              gridLines: {
                display: true
              }
            }],
          },
          legend: {
            display: false
          }
        }
      });

      var len = data['downtime'].length;
      down = data['down'];
      solved = data['solvedData'];

      var t =  $('#dashTable').DataTable();
      var h = $('#hisTable').DataTable();

      if (len > 0)
      {
        
        t.clear().draw();
        h.clear().draw();

        for (i = 0; i < len; i++)
        {
          id = data['downtime'][i]['id'];
          ticket = data['downtime'][i]['ticket'];
          branch = data['downtime'][i]['branch'];
          telco = data['downtime'][i]['provider'];
          start = data['downtime'][i]['start'];
          downtime = data['downtime'][i]['downtime'];
          status = data['downtime'][i]['status'];

          t.row.add(
            [
              ticket,
              branch,
              telco,
              start,
              downtime,
              status,
              '<button class="btn btn-info" data-toggle="modal" data-target="#remModal" style="width:100%"  onclick="remark('+id+')"><i class="fa fa-eye"></i>&nbspRemarks</button>'
            ]).draw(false);
        }

        var l = data['solvedData'].length;

        if (l > 0)
        {
          for (i = 0; i < l; i++)
          {
            id = data['solvedData'][i]['id'];
            branch = data['solvedData'][i]['branch'];
            telco = data['solvedData'][i]['provider'];
            start = data['solvedData'][i]['start'];
            solve = data['solvedData'][i]['solve'];
            downtime = data['solvedData'][i]['downtime'];
            status = data['solvedData'][i]['status'];

            h.row.add(
              [
                branch,
                telco,
                start,
                solve,
                downtime,
                status,
                '<button class="btn btn-info" data-toggle="modal" data-target="#remModal" style="width:100%"  onclick="remark('+id+')"><i class="fa fa-eye"></i>&nbspRemarks</button>'
              ]).draw(false);
          }
        }
      }
      else
      {
        t.clear().draw();
        h.clear().draw();

        $('#nodataModal').modal();
      }
    }
  });
});

$('#genExcel').on('click', function()
{
    month = $('#month').val();
    data = down[month];
    csv = [];
 
    var len = data.length;

    for (i = 0; i < len; i++)
    {
      objCsv = 
      {
        Ticket_No : data[i]['ticket'],
        Branch : data[i]['branch'],
        Telco : data[i]['provider'],
        Date_Started : data[i]['start'],
        solve : data[i]['solve'],
        Total_Down_Time : data[i]['downtime'],
        Concern : data[i]['status'],
        Remarks : data[i]['remarks']
      }
      csv.push(objCsv);
    }

    objCsv =
    {
      mon : month,
      tel : tel,
      yr : yr
    }
    csv.push(objCsv);

    if (csv.length > 1)
    {
      datas = JSON.stringify(csv);
      window.open('./php/generate-excel.php?downData='+datas);
    }
    else
    {
      $('#nodataModal').modal();
    }      
});

$('#solveExcel').on('click', function()
{
  month = $('#solve_month').val();
  csv = [];

  var len = solved.length;

  for (i = 0; i < len; i++)
  {
    monthSolved = solved[i]['solve'];
    substr = monthSolved.substring(0,3);
    
    if (month == substr)
    {
      objCsv = 
      {
        Ticket_No : solved[i]['ticket'],
        Branch : solved[i]['branch'],
        Telco : solved[i]['provider'],
        Date_Started : solved[i]['start'],
        solve : solved[i]['solve'],
        Total_Down_Time : solved[i]['downtime'],
        Concern : solved[i]['status'],
        Remarks : solved[i]['remarks']
      }
      csv.push(objCsv);
    }
  }
  objCsv =
  {
    mon : month,
    tel : tel,
    yr : yr
  }
  csv.push(objCsv);

  if (csv.length > 1)
  {
    datas = JSON.stringify(csv);
    window.open('./php/generate-resolved.php?downData='+datas);
  }
  else
  {
    $('#nodataModal').modal();
  }
});

function remark(id )
{
  key = {id : id};
    
  $.ajax(
  {
    type : "POST",
    url : './php/get-specific-data.php',
    data : key,
    dataType : "json",
    success : function(data)
    {
      remarks = data[0]['remarks'];
      $('#v_remarks').val(remarks);
    }
  });
}