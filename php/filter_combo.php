<?php
$connect = mysqli_connect('localhost','root','','example');
$attribute_id = $_POST['attributeId'];
$filter_data = json_decode($_POST['filterData'],true);

$combo_list = json_decode($_POST['comboList'],true);
$combo_list = implode("','",$combo_list);

$node_id_array = json_decode($_POST['nodeIdArray'],true);
$node_id_array = implode("','",$node_id_array);

$sql = "SELECT $attribute_id FROM (SELECT DISTINCT($attribute_id) ";
$keys = array_keys($filter_data);

for($i = 0; $i < count($filter_data); $i++) {
    $condition_sql = "";
    if ($filter_data[$keys[$i]][0][0] === 'string'){
        if ($keys[$i] != $attribute_id){
            $condition_sql = ", $keys[$i] ";
        }
        

    } else if($filter_data[$keys[$i]][0][0] === 'number') {

        $condition_sql = ", SUM(CAST($keys[$i] as DECIMAL(10,2))) AS $keys[$i] ";
        
      }
      
    $sql .= $condition_sql;
}

$sql = $sql . "FROM nodes WHERE $attribute_id IN ('$combo_list') AND id in ('$node_id_array') GROUP BY $attribute_id) t1";

for($i = 0; $i < count($filter_data); $i++) {
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


//combine
$data_array = array(
  'nodeData' => $node_array
);
 
echo json_encode($data_array);

?>