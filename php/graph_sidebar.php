<?php
$connect = mysqli_connect('localhost','root','','example');
$filter_attribute_id = json_decode($_POST['filterAttributeId'],true);
$attribute_id_string = $filter_attribute_id['string'];
$attribute_id_number = $filter_attribute_id['number'];
// echo json_encode($attribute_id_string);

$node_id_array = json_decode($_POST['nodeIdArray'],true);
$node_id_array = implode("','",$node_id_array);

$unique_string = array();
foreach ($attribute_id_string as &$value) {
    $sql = "SELECT Distinct $value FROM `nodes` 
    Where project_id = '1' and id in ('$node_id_array');";
    $result = mysqli_query($connect,$sql);
    while($row = mysqli_fetch_assoc($result))
    {
        $unique_string[] = $row;
    }
}
// echo json_encode($unique_string);

$min_max_number = array();
foreach ($attribute_id_number as &$value) {
    $sql = "SELECT MAX(CAST($value as DECIMAL(10,2))) as 'max', min(CAST($value as DECIMAL(10,2))) as 'min' FROM `nodes` 
    where project_id = '1' and id in ('$node_id_array');";
    $result = mysqli_query($connect,$sql);
    while($row = mysqli_fetch_assoc($result))
    {
        $min_max_number[$value] = $row;
    }
}
// echo json_encode($min_max_number);

//combine
$data_array = array(
    'uniqueString' => $unique_string,
    'minMaxNumber' => $min_max_number
);
 
echo json_encode($data_array);

?>