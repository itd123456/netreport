<?php
	
	require('database.php');

	$db = new Database();

	$newBranch['Cubao', 'Lucena', 'Cogon(Cebu)','Calbayog', 'Ormoc', 'Urdaneta', 'Malabon', 'Vigan', 'Lapu-Lapu',
				'Kalibo', 'Buhangin', 'Talisay', 'SC Gensan', 'San Francisco', 'Bacoor', 'Antique', 'San Jose Delm Nonte', 
				'General Trias', 'Taguig'];

	for ($i = 0; $i < count($newBranch); $i++)
	{
		$sql = "INSERT INTO branch(branch)
				VALUES($newBranch[$i])";

		$db->execQuery($sql);
	}
?>