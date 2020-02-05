<?php

	require('database.php');

	$database = new Database();

	$provider = ['ETPI', 'Globe', 'ICT', 'PLDT', 'Radius', 'Rise', 'Sky Biz'];

	foreach ($provider as $i)
	{
		$sql = "INSERT INTO provider(provider)
				VALUES('$i')";

		$database->execQuery($sql);
	}

?>