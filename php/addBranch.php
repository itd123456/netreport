<?php
	
	require('database.php');

	$db = new Database();

	$newBranch['Cubao', 'Lucena', 'Cogon(Cebu)','Calbayog', 'Ormoc'];

	for ($i = 0; $i < count($newBranch); $i++)
	{
		$sql = "INSERT INTO branch(branch)
				VALUES($newBranch[$i])";

		$db->execQuery($sql);
	}
?>