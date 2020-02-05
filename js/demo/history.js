// Call the dataTables jQuery plugin
$(document).ready(function() 
{
  var t =  $('#historyTable').DataTable();

  $.ajax(
	{
		type : "POST",
		url : './php/get-data.php',
        data : {stat : true},
		dataType : "json",
		success : function(data)
		{
			var datas = data;
			var length = datas.length;

			for (var i = 0; i < length; i++)
			{
				var branch = datas[i]['branch'];
				var provider = datas[i]['provider'];
				var started = datas[i]['started'];
				var resolved = datas[i]['date_solved'];
				var status = datas[i]['status'];
				var downtime = datas[i]['down_time'];
				var id = datas[i]['id']

				t.row.add(
				[
					branch,
					provider,
					started,
					resolved,
					downtime,
					status
					//'<button class="btn btn-success" id="solve" name="solve" data-toggle="modal" style="width:100%" data-target="#solveModal" onclick="solve('+id+')"><i class="fa fa-check" aria-hidden="true"></i>&nbspSolve</button><br/> <button style="width:100%" class="btn btn-secondary" data-toggle="modal" data-target="#editModal" id="edit" name="edit" onclick="edit('+id+')"><i class="fas fa-pencil-alt"></i>&nbspEdit</button><button class="btn btn-info" data-toggle="modal" data-target="#remarksModal" style="width:100%"  onclick="remarks('+id+')"><i class="fa fa-eye"></i>&nbspRemarks</button>'
				]).draw( false );
				//$('#dataTable tbody').append('<tr><td>' + ticket +'</td><td>' + branch + '</td><td>' + provider + '</td><td>' + started + '</td><td>' + downtime + '</td><td>' + status + 
				//	'</td><td><button class="btn btn-success"><i class="fa fa-check" aria-hidden="true"></i>&nbspSolve</button> <button class="btn btn-secondary"><i class="fas fa-pencil-alt"></i>&nbspEdit</button></td></tr>');
			}
		}
	});
});