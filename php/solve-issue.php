<?php

	require('database.php');

	$database = new Database();

	$solve_date = $_POST['solve_date'];
	$id = $_POST['id'];

	$sql = "UPDATE downtime_record
			SET resolve = true, date_solved = '$solve_date', down_time = '$downtime'
			WHERE id = $id";

	$solve = $database->execQuery($sql);

	$sel = "SELECT started, date_solved
			FROM downtime_record
			WHERE id = $id";

	$data = $database->getMax($sel);

	$date1 = strtotime($data[0]['date_solved']);
	$date2 = strtotime($data[0]['started']);

	$diff = abs($date1 - $date2);

	$years = floor($diff / (365*60*60*24));  

	$months = floor(($diff - $years * 365*60*60*24) / (30*60*60*24));  
	  
	$days = floor(($diff - $years * 365*60*60*24 - $months*30*60*60*24)/ (60*60*24)); 
	  
	$hours = floor(($diff - $years * 365*60*60*24 - $months*30*60*60*24 - $days*60*60*24) / (60*60));  
	  
	$minutes = floor(($diff - $years * 365*60*60*24 - $months*30*60*60*24 - $days*60*60*24 - $hours*60*60)/ 60);  
	  
	$seconds = floor(($diff - $years * 365*60*60*24 - $months*30*60*60*24 - $days*60*60*24 - $hours*60*60 - $minutes*60));  
	  
	$downtime = '';

	$yr = '';
	$mon = '';
	$d = '';
	$h = '';
	$min = '';

	if ($years > 0)
	{
		$yr = $years.' year(s)  ';
	}

	if ($months > 0)
	{
		$mon = $months.' month(s)  ';
	}

	if ($days > 0)
	{
		$d = $days.' day(s)  ';
	}

	if ($hours > 0)
	{
		$h = $hours.' hour(s)  ';
	}

	if ($minutes > 0)
	{
		$min = $minutes.' minute(s)';
	}

	$downtime = $yr.$mon.$d.$h.$min;
	
	$up = "UPDATE downtime_record
		   SET down_time = '$downtime'
		   WHERE id = $id";

	$database->execQuery($up);
?>