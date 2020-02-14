<?php

	Class Database
	{
		private $host = "localhost";
		private $user = "network";
		private $pass = 'P@$$w0rd2020!';
		private $db = "network";
		private $conn;

		public function __construct()
		{
			date_default_timezone_set('Asia/Manila');

			$this->conn = new PDO("mysql:host=".$this->host.";dbname=".$this->db, $this->user, $this->pass);
		}

		public function getDownTime($resolved, $started)
		{
			if (!$resolved)
			{
				$resolved = $current = date('Y-m-d H:i:s');
			}

			$date1 = strtotime($resolved);
			$date2 = strtotime($started);

			$diff = abs($date1 - $date2);

			$years = floor($diff / (365*60*60*24));  

			$months = floor(($diff - $years * 365*60*60*24) / (30*60*60*24));  
			  
			$days = floor(($diff - $years * 365*60*60*24 - $months*30*60*60*24)/ (60*60*24)); 
			  
			$hours = floor(($diff - $years * 365*60*60*24 - $months*30*60*60*24 - $days*60*60*24) / (60*60));  
			  
			$minutes = floor(($diff - $years * 365*60*60*24 - $months*30*60*60*24 - $days*60*60*24 - $hours*60*60)/ 60);  
			  
			$seconds = floor(($diff - $years * 365*60*60*24 - $months*30*60*60*24 - $days*60*60*24 - $hours*60*60 - $minutes*60));  

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

			return $downtime;
		}

		public function fetchAll($sql, $isTime)
		{
			$stmt = $this->conn->prepare($sql);
			$stmt->execute();
			$result = $stmt->fetchAll(PDO::FETCH_ASSOC);

			if ($isTime == 'isTime')
			{
				$current = date('Y-m-d H:i:s');

				$count = count($result);

				for ($i = 0; $i < $count; $i++)
				{
					$date1 = strtotime($current);
					$date2 = strtotime($result[$i]['started']);

					$diff = abs($date1 - $date2);

					$years = floor($diff / (365*60*60*24));  
  
					$months = floor(($diff - $years * 365*60*60*24) / (30*60*60*24));  
					  
					$days = floor(($diff - $years * 365*60*60*24 - $months*30*60*60*24)/ (60*60*24)); 
					  
					$hours = floor(($diff - $years * 365*60*60*24 - $months*30*60*60*24 - $days*60*60*24) / (60*60));  
					  
					$minutes = floor(($diff - $years * 365*60*60*24 - $months*30*60*60*24 - $days*60*60*24 - $hours*60*60)/ 60);  
					  
					$seconds = floor(($diff - $years * 365*60*60*24 - $months*30*60*60*24 - $days*60*60*24 - $hours*60*60 - $minutes*60));  

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
					$result[$i]['downtime'] = $downtime;
				}
			}


			if (substr($isTime, 0,4) == 'down')
			{	
				$jan = 0;
				$feb = 0;
				$mar = 0;
				$apr = 0;
				$may = 0;
				$jun = 0;
				$jul = 0;
				$aug = 0;
				$sep = 0;
				$oct = 0;
				$nov = 0;
				$dec = 0;
				$downData = array();
				$solvedData = array();

				$jan_down = array();
				$feb_down = array();
				$mar_down = array();
				$apr_down = array();
				$may_down = array();
				$jun_down = array();
				$jul_down = array();
				$aug_down = array();
				$sep_down = array();
				$oct_down = array();
				$nov_down = array();
				$dec_down = array();

				$count = count($result);

				for ($i = 0; $i < $count; $i++)
				{
					$current = date('Y-m-d H:i:s');

					$s = $result[$i]['started'];
					$start_year = substr($s, 0, 4);
					$curr_yr = (int)substr($current, 0, 4);
					$yr = substr($isTime, 4, 8);
					$ds = '';
					$dsolved = $result[$i]['date_solved'];
					$dsint = (int)substr($dsolved, 0, 4);
					$yrint = (int)$yr;
					$syr = (int)$start_year;

					if (!$dsolved)
					{
						if ($syr == $yrint && $yrint == $curr_yr)
						{
							$dsolved = $current;
						}
						else if ($syr == $yrint && $yrint < $curr_yr)
						{
							$dsolved = $yr.'-12-01';
						}
						else if ($syr < $yrint)
						{
							$s = $yr.'-01-01';
							$dsolved = $current;
						}
						else if ($syr > $yrint)
						{
							continue;
						}
					}
					else if (substr($dsolved, 0, 4) == $start_year && ($yrint > $syr || $yrint < $syr))
					{
						continue;
					}
					else if (substr($dsolved, 0, 4) == $yr && $syr < $yrint)
					{
						$s = $yr.'-01-01';
					}
					else if ($dsint > $yrint && $start_year === $yr)
					{
						$ds = $yr.'-12-01';
					}

					if ($result[$i]['date_solved'])
					{
						$solvedInt = (int)substr($result[$i]['date_solved'], 0, 4);

						if ($yrint == $solvedInt)
						{
							$da_tetime = $this->getDownTime($result[$i]['date_solved'], $result[$i]['started']);
							$result[$i]['downtime'] = $da_tetime;

							array_push($solvedData, $result[$i]);
						}
					}

					$d = $dsolved;

					if (substr($d, 0, 4) != $yr && $start_year == $yr)
					{
						$d = $ds;
					}

					$dtime = $this->getDownTime($result[$i]['date_solved'], $result[$i]['started']);
					$result[$i]['downtime'] = $dtime;
					array_push($downData, $result[$i]);

					$started_sbstr = substr($s, 0, 5);
					$month = (int)substr($s, 5, 2);
					$solved_sbstr = substr($d, 0, 7);
					$start = '';

					do
					{
						if ($month < 10)
						{
							$start = $started_sbstr.'0'.$month;
						}
						else
						{
							$start = $started_sbstr.$month;
						}
						//print_r($start.'///'.$solved_sbstr.'                    ');
						if ($month == 1)
						{
							array_push($jan_down, $result[$i]);
							$jan += 1;
						}
						else if ($month == 2)
						{
							array_push($feb_down, $result[$i]);
							$feb += 1;
						}
						else if ($month == 3)
						{
							array_push($mar_down, $result[$i]);
							$mar += 1;
						}
						else if ($month == 4)
						{
							array_push($apr_down, $result[$i]);
							$apr += 1;
						}
						else if ($month == 5)
						{
							array_push($may_down, $result[$i]);
							$may += 1;
						}
						else if ($month == 6)
						{
							array_push($jun_down, $result[$i]);
							$jun += 1;
						}
						else if ($month == 7)
						{
							array_push($jul_down, $result[$i]);
							$jul += 1;
						}
						else if ($month == 8)
						{
							array_push($aug_down, $result[$i]);
							$aug += 1;
						}
						else if ($month == 9)
						{
							array_push($sep_down, $result[$i]);
							$sep += 1;
						}
						else if ($month == 10)
						{
							array_push($oct_down, $result[$i]);
							$oct += 1;
						}
						else if ($month == 11)
						{
							array_push($nov_down, $result[$i]);
							$nov += 1;
						}
						else if ($month == 12)
						{
							array_push($dec_down, $result[$i]);
							$dec += 1;
						}

						$month += 1;

					}while($start != $solved_sbstr);
				}

				$month = array("January"=>$jan_down, "February"=>$feb_down, "March"=>$mar_down, "April"=>$apr_down, "May"=>$may_down, "June"=>$jun_down, "July"=>$jul_down, "August"=>$aug_down, "September"=>$sep_down, "October"=>$oct_down, "November"=>$nov_down, "December"=>$dec_down);

				$res = array("jan"=>$jan, "feb"=>$feb, "mar"=>$mar, "apr"=>$apr, "may"=>$may, "jun"=>$jun, "jul"=>$jul, "aug"=>$aug, "sep"=>$sep, "oct"=>$oct, "nov"=>$nov, "dec"=>$dec, "downtime"=>$downData, "solvedData"=>$solvedData, "down"=>$month);

				 print json_encode($res);
			}

			if (substr($isTime, 0, 4) != 'down')
			{
				print json_encode($result);
			}
		}

		public function execQuery($sql)
		{
			$stmt = $this->conn->prepare($sql);
			$stmt->execute();
		}

		public function getMax($sql)
		{
			$stmt = $this->conn->prepare($sql);
			$stmt->execute();
			$result = $stmt->fetchAll(PDO::FETCH_ASSOC);

			return $result;
		}

		public function getBranch($sql)
		{
			$stmt = $this->conn->prepare($sql);
			$stmt->execute();
			$result = $stmt->fetchAll(PDO::FETCH_ASSOC);

			print json_encode($result);
		}
	}
	
?>