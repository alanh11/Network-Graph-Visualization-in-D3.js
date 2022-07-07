<?php
$connect = mysqli_connect('localhost','root','','example');

$attributeIDFilterStringObj = json_decode($_POST['attributeIDFilterStringObj'],true);

$attribute_array = array();
foreach ($attributeIDFilterStringObj as $key => $values) {
    $sql = "SELECT ";
    $condition_sql = "";
    for($i = 0; $i < count($values); $i++) {
        $condition = $values[$i];
        if ($i === count($values)-1) {
            $sub_condition_sql = "SUM($condition) - count(*) AS $condition from ";
        } else {
            $sub_condition_sql = "SUM($condition) - count(*) AS $condition, ";
        }
        $condition_sql .= $sub_condition_sql;
    }
    $sql = $sql . $condition_sql . "(select DISTINCT($key), ";

    $condition_sql = "";
    for($i = 0; $i < count($values); $i++) {
        $condition = $values[$i];
        if ($i === count($values)-1) {
            $sub_condition_sql = " count(DISTINCT($condition)) AS $condition from nodes GROUP BY $key) t1";
        } else {
            $sub_condition_sql = " count(DISTINCT($condition)) AS $condition, ";
        }
        $condition_sql .= $sub_condition_sql;
    }
    $sql = $sql . $condition_sql;

    $result = mysqli_query($connect,$sql);
    while($row = mysqli_fetch_assoc($result))
    {
        $attribute_array[$key] = $row;
    }
}

$node_id_array = json_decode($_POST['nodeIdArray'],true);
$node_id_array = implode("','",$node_id_array);

$combo_list = json_decode($_POST['comboList'],true);
$combo_list = implode("','",$combo_list);

$attribute_id = $_POST['attributeId'];

$attribute_number_list = json_decode($_POST['attributeNumberList'],true);

$attribute_filter_string = array();
$attribute_filter_string[] = $attribute_id;

$sql = "SELECT $attribute_id, ";
foreach ($attribute_array as $key => $values) {
    if ($key === $attribute_id){

        foreach($values as $key2 => $values2){
            if(intval($values2) === 0) {
                $sql = $sql  . "$key2, ";
                $attribute_filter_string[] = $key2;
            }

        }
    }
}

// echo json_encode($attribute_id_string);

for($i = 0; $i < count($attribute_number_list); $i++) {
    $condition = $attribute_number_list[$i];
    if ($i === count($attribute_number_list)-1) {
        $condition_sql = "SUM($condition) AS $condition ";
    } else {
        $condition_sql = "SUM($condition) AS $condition, ";
    }
  
    $sql .= $condition_sql;
}

$sql = $sql . "FROM `nodes` WHERE project_id = 1 AND $attribute_id in ('$combo_list') AND id in ('$node_id_array') GROUP by $attribute_id;";
// echo $sql;

$node_array = array();

$result = mysqli_query($connect,$sql);
while($row = mysqli_fetch_assoc($result))
{
    $node_array[] = $row;
}

// combine
$data_array = array(
    'attributeFilterString' => $attribute_filter_string,
    'attributeArray' => $attribute_array,
    'nodeArray' => $node_array
);
 
echo json_encode($data_array);

?>