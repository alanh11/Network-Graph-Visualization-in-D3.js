<?php
$connect = mysqli_connect('localhost','root','','example');
$filter_attribute_id = json_decode($_POST['filterAttributeId'],true);
$attribute_id_string = $filter_attribute_id['string'];
$attribute_id_number = $filter_attribute_id['number'];
// echo json_encode($attribute_id_string);

$node_id_array = json_decode($_POST['nodeIdArray'],true);
$node_id_array = implode("','",$node_id_array);

$combo_list = json_decode($_POST['comboList'],true);
$combo_list = implode("','",$combo_list);

$attribute_id = $_POST['attributeId'];

$unique_string = array();
foreach ($attribute_id_string as &$value) {
    $sql = "SELECT DISTINCT($value) FROM 
    (SELECT DISTINCT($attribute_id), $value 
    FROM nodes 
    WHERE $attribute_id in ('$combo_list') AND id in ('$node_id_array') 
    GROUP BY $attribute_id) t1;";
    
    $result = mysqli_query($connect,$sql);
    while($row = mysqli_fetch_assoc($result))
    {
        $unique_string[] = $row;
    }
}

$sql = "SELECT DISTINCT($attribute_id)
    FROM nodes 
    WHERE $attribute_id in ('$combo_list') AND id in ('$node_id_array')";


$result = mysqli_query($connect,$sql);
while($row = mysqli_fetch_assoc($result))
{
    $unique_string[] = $row;
}
// echo json_encode($unique_string);

$min_max_number = array();
foreach ($attribute_id_number as &$value) {
    $sql = "SELECT MIN($value) AS 'min', MAX($value) as 'max' 
    FROM
    (SELECT DISTINCT($attribute_id), SUM(CAST($value as DECIMAL(10,2))) AS $value 
    FROM nodes WHERE $attribute_id in ('$combo_list') AND id in ('$node_id_array') GROUP BY $attribute_id) t1;";
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