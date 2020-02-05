<?php

	require('database.php');

	$database = new Database();

	$stat = $_POST['stat'];

	$sql = "SELECT d.id, d.ticket, d.provider, s.status, b.branch, d.down_time,
			       p.provider, CONCAT(DATE_FORMAT(d.date_solved, '%M %d, %Y'), '  ', DATE_FORMAT(d.date_solved, '%h:%i %p')) AS date_solved, CONCAT(DATE_FORMAT(d.started, '%M %d, %Y'), '  ', DATE_FORMAT(d.started, '%h:%i %p')) AS started
			FROM downtime_record d
			JOIN branch b
			ON d.branch = b.id
			JOIN provider p
			ON d.provider = p.id
			JOIN status s
			ON d.status = s.id
			WHERE resolve = $stat
			ORDER BY d.branch";

	$record = $database->fetchAll($sql, 'isTime');
?>