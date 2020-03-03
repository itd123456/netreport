// Call the dataTables jQuery plugin
$(document).ready(function() 
{
  var t =  $('#dataTable').DataTable();

  var data = ['Antipolo', 'Bacolod', 'Baguio', 'Baler', 'Baliuag', 'Bataan', 'Batangas', 'Benguet',
            'Bohol', 'Bukidnon','Bulacan', 'Butuan', 'Cabanatuan', 'Cagayan De Oro', 'Cainta',
'Calamba', 'Capiz', 'Cauayan', 'Cavite', 'Cebu', 'Consolacion', 'Dagupan', 'Dau',
                 'Davao', 'Digos', 'Digos City', 'Digos Trike', 'Dumaguete', 'Gapan', 'General Santos',
'Harrison Plaza', 'Head Office', 'Ilocos Norte', 'Iloilo', 'Imus', 'Intramuros',
'Isabela', 'Kabankalan', 'Kidapawan', 'Koronadal', 'La Trinidad', 'La Union', 'Lagro',
'Laguna', 'Laoag', 'Las Piñas', 'Lipa', 'Makati', 'Malaybalay', 'Malolos', 'Mandaluyong',
'Mandaue', 'Manila', 'Marikina', 'MBL', 'Meycauayan', 'Muntinlupa', 'Naga',
'Negros Occidental', 'Negros Oriental', 'Nueva Ecija', 'Olongapo', 'Pampanga',
'Paranaque', 'Pasay', 'Pasig', 'POEA', 'Quezon Avenue', 'Quezon City', 'Roxas',
'San Fernando PA', 'San Jose', 'San Mateo', 'San Pablo', 'Santiago', 'SC Koronadal',
'SC Panabo', 'SME Antipolo', 'SME Marikina', 'Tacloban', 'Tagbilaran', 'Tagum',
'Talavera', 'Tanay', 'Tandang Sora', 'Tarlac', 'Tuguegarao', 'Tuguegarao City',
'Valencia','Valenzuela', 'Cubao', 'Lucena', 'Cogon(Cebu)','Calbayog', 'Ormoc', 'Urdaneta', 'Malabon', 'Vigan', 'Lapu-Lapu',
'Kalibo', 'Buhangin', 'Talisay', 'SC Gensan', 'San Francisco', 'Bacoor', 'Antique', 'San Jose Delm Nonte', 'General Trias', 'Taguig'];

	var len = data.length;

	for (i = 0; i < len; i++)
	{
		var id = i + 1;
		var branch = data[i];
			
		$('#branch').append($('<option>', {value:id, text:branch}));
		$('#edit_branch').append($('<option>', {value:id, text:branch}));
	}

  $.ajax(
  	{
  		type : "POST",
  		url : './php/get-providers.php',
  		dataType : "json",
  		success : function(data)
  		{
  			len = data.length;
  			
  			for (i = 0; i < len; i++)
  			{
  				id = data[i]['id'];
  				provider = data[i]['provider'];

  				if (id != 8)
  				{
  					$('#provider').append($('<option>', {value:id, text:provider}));
  					$('#edit_provider').append($('<option>', {value:id, text:provider}));
  				}
  			}
  		}
  	});

  $.ajax(
  	{
  		type : "POST",
  		url : './php/get-statuses.php',
  		dataType : "",
  		success : function(data)
  		{
  			data = $.parseJSON(data);
  			len = data.length;

  			for (i = 0; i < len; i++)
  			{
  				id = data[i]['id'];
  				status = data[i]['status'];

  				$('#status').append($('<option>', {value:id, text:status}));
  				$('#edit_status').append($('<option>', {value:id, text:status}));
  			}
  		}
  	});

  $.ajax(
  	{
  		type : "POST",
  		url : './php/get-data.php',
  		data : {stat : 0},
  		dataType : "json",
  		success : function(data)
  		{
  			var datas = data;
  			var length = datas.length;

  			for (var i = 0; i < length; i++)
  			{
  				var ticket = datas[i]['ticket'];
  				var branch = datas[i]['branch'];
  				var provider = datas[i]['provider'];
  				var started = datas[i]['started'];
  				var downtime = datas[i]['downtime'];
  				var status = datas[i]['status'];
  				var id = datas[i]['id']
  				t.row.add(
  				[
  					ticket,
  					branch,
  					provider,
  					started,
  					downtime,
  					status,
  					'<button class="btn btn-success" id="solve" name="solve" data-toggle="modal" style="width:100%" data-target="#solveModal" onclick="solve('+id+')"><i class="fa fa-check" aria-hidden="true"></i>&nbspResolve</button><br/> <button style="width:100%" class="btn btn-secondary" data-toggle="modal" data-target="#editModal" id="edit" name="edit" onclick="edit('+id+')"><i class="fas fa-pencil-alt"></i>&nbspEdit</button><button class="btn btn-info" data-toggle="modal" data-target="#remarksModal" style="width:100%; height:15%" onclick="remark('+id+')"><i class="fa fa-eye"></i>&nbspRemarks</button>'
  				]).draw( false );
  				//$('#dataTable tbody').append('<tr><td>' + ticket +'</td><td>' + branch + '</td><td>' + provider + '</td><td>' + started + '</td><td>' + downtime + '</td><td>' + status + 
  				//	'</td><td><button class="btn btn-success"><i class="fa fa-check" aria-hidden="true"></i>&nbspSolve</button> <button class="btn btn-secondary"><i class="fas fa-pencil-alt"></i>&nbspEdit</button></td></tr>');
  			}
  		}
  	});
});

var ticket = '';
function solve(tickets)
{
	ticket = tickets
}

$('#solve_data').on('click',function()
{
	var id = ticket;

	date = $('#date_solve').val();
	time = $('#time_solve').val();
	if (!date || !time)
	{
		alert('Date Solved is required');
		return false;
	}

	$.ajax(
	{
		type : "POST",
		url : './php/solve-issue.php',
		data : {id:id, solve_date: date + ' ' + time + ':00'},
		dataType : "",
		success : function()
		{
			location.reload();
		}
	});
});

var ids = '';
function edit(id)
{
	var key = {id:id}
	ids = id;
	$.ajax(
	{
		type : "POST",
		url : './php/get-specific-data.php',
		data : key,
		dataType : "json",
		success : function(data)
		{	
			$('#edit_status').val(data[0]['status']);
			$('#edit_branch').val(data[0]['branch']);
			$('#edit_provider').val(data[0]['provider']);
			$('#edit_ticket').val(data[0]['ticket']);
			$('#edit_remarks').val(data[0]['remarks']);
			$('#edit_time').val(data[0]['ti_me']);
			$('#edit_date').val(data[0]['da_te']);
		}
	});	
}

var idss = '';
function remark(id)
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
			$('#view_remarks').val(data[0]['remarks']);
		}
	});
}

$('#edit_data').on('click', function()
{
	data = 
	{
		id : ids,
		status : $('#edit_status').val(),
		branch : $('#edit_branch').val(),
		provider : $('#edit_provider').val(),
		ticket : $('#edit_ticket').val(),
		remarks : $('#edit_remarks').val(),
		time : $('#edit_time').val(),
		date : $('#edit_date').val()
	}
	//console.log(data);
	$.ajax(
	{
		type : "POST",
		url : './php/update-data.php',
		data : data,
		dataType : "",
		success : function()
		{
			location.reload();
		}
	})
});

$('#add_data').on('click',function()
{
	branch = $('#branch').val();
	ticket = $('#ticket').val();
	provider = $('#provider').val();
	started = $('#date').val() + ' ' + $('#time').val() + ':00';
	status = $('#status').val();
	remarks = $('#remarks').val();
	if (!ticket)
	{
		ticket = 'No Ticket';
	}
	data = 
	{
		branch : branch,
		ticket : ticket,
		provider : provider,
		started : started,
		status : status,
		remarks : remarks
	}

	$.ajax(
	{
		type : "POST",
		url : './php/add-data.php',
		data : data,
		dataType : "",
		success : function()
		{
			location.reload();
		}
	});
});
