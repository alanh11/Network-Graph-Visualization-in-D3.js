<?php
$connect = mysqli_connect('localhost','root','','example');

$filter_data = json_decode($_POST['filterData'],true);

$sql = "select * from nodes";
$keys = array_keys($filter_data);

// foreach($keys as $key) {
//     $sql .= $key;
// }
// echo $sql;

for($i = 0; $i < count($filter_data); $i++) { 
  $condition_sql = "";
  if ($filter_data[$keys[$i]][0][0] === 'string'){
    $condition = implode("','",$filter_data[$keys[$i]][1]);
    if($i === 0) {
      $condition_sql = " where $keys[$i] in ('$condition')";
    } else {
      $condition_sql = " and $keys[$i] in ('$condition')";
    }
  } else if($filter_data[$keys[$i]][0][0] === 'number') {
    $condition_min = $filter_data[$keys[$i]][1]['min'];
    $condition_max = $filter_data[$keys[$i]][1]['max'];
    if($i === 0) {
      $condition_sql = " WHERE CAST($keys[$i] as DECIMAL(10,2)) >= CAST($condition_min as DECIMAL(10,2)) 
      AND CAST($keys[$i] as DECIMAL(10,2)) <= CAST($condition_max as DECIMAL(10,2))";
      
    } else {
      $condition_sql = " AND CAST($keys[$i] as DECIMAL(10,2)) >= CAST($condition_min as DECIMAL(10,2)) 
      AND CAST($keys[$i] as DECIMAL(10,2)) <= CAST($condition_max as DECIMAL(10,2))";
    }
  }

  $sql .= $condition_sql;
 }

$result = mysqli_query($connect,$sql);

$node_array = array();

while($row = mysqli_fetch_assoc($result))
{
  $node_array[] = $row;
}

//links
$node_id = array();
foreach ($node_array as &$value) {
    $node_id[]= $value['id'];
}
$condition = implode("','",$node_id);

$sql = "select 
edges_full.*
from edges_full
where edges_full.source in (select id from nodes where id in ('$condition'))
and edges_full.target in (select id from nodes where id in ('$condition'))";

$result = mysqli_query($connect,$sql);

$link_array = array();

while($row = mysqli_fetch_assoc($result))
{
  $link_array[] = $row;
}

//combine
$data_array = array(
  'linkData' => $link_array,
  'nodeData' => $node_array
);
 
echo json_encode($data_array);

?>