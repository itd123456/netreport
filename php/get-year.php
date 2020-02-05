<?php

	require('database.php');

	$db = new Database();

	$current = date('Y');

	$maxYear = "SELECT MAX(year) AS year
				FROM year_list";

	$max = $db->getMax($maxYear);

	$yearMax = (int)$max[0]['year'];
	$current = (int)$current;

	if ($current > $yearMax)
	{
		$insert = "INSERT INTO year_list(year)
				   VALUES('$current')";

		$db->execQuery($insert);
	}

	$sql = "SELECT *
			FROM year_list";

	$db->fetchAll($sql, 'year');
?>