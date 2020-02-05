<?php

	require('database.php');

	$db = new Database();

	$year = $_POST['year'];
	$provider = $_POST['provider'];

	// $year = '2020';
	// $provider = '1';

	$down = 'down'.$year;

	if ($provider == 8)
	{
		$sql = "SELECT d.id, d.ticket, d.provider, s.status, b.branch, d.down_time, d.date_solved, d.started,p.provider, d.remarks,
		   CONCAT(DATE_FORMAT(d.date_solved, '%M %d, %Y'), '  ', DATE_FORMAT(d.date_solved, '%h:%i %p')) AS solve, 
		   CONCAT(DATE_FORMAT(d.started, '%M %d, %Y'), '  ', DATE_FORMAT(d.started, '%h:%i %p')) AS start
			FROM downtime_record d
			JOIN branch b
			ON d.branch = b.id
			JOIN provider p
			ON d.provider = p.id
			JOIN status s
			ON d.status = s.id
			ORDER BY d.provider";
	}
	else
	{
		$sql = "SELECT d.id, d.ticket, d.provider, s.status, b.branch, d.down_time, d.date_solved, d.started,p.provider, d.remarks,
		   CONCAT(DATE_FORMAT(d.date_solved, '%M %d, %Y'), '  ', DATE_FORMAT(d.date_solved, '%h:%i %p')) AS solve, 
		   CONCAT(DATE_FORMAT(d.started, '%M %d, %Y'), '  ', DATE_FORMAT(d.started, '%h:%i %p')) AS start
			FROM downtime_record d
			JOIN branch b
			ON d.branch = b.id
			JOIN provider p
			ON d.provider = p.id
			JOIN status s
			ON d.status = s.id
			WHERE d.provider = '$provider'
			ORDER BY d.provider";
	}

	$data = $db->fetchAll($sql, $down);
?>