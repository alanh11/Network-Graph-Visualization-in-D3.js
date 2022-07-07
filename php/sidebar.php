<?php
$connect = mysqli_connect('localhost','root','','example');

// filter => string
$sql = "SELECT * FROM nodes_metadata Where project_id = '1' and attribute_type = 'string' and filter = 'yes';";

$result = mysqli_query($connect,$sql);

$attribute_array_string = array();

while($row = mysqli_fetch_assoc($result))
{
  $attribute_array_string[] = $row;
}

$attribute_id_string = array();
foreach ($attribute_array_string as &$value) {
    $attribute_id_string[]= $value['attribute_id'];
}
// echo json_encode($attribute_id_string);

$unique_string = array();
foreach ($attribute_id_string as &$value) {
    $sql = "SELECT Distinct $value FROM `nodes` Where project_id = '1';";
    $result = mysqli_query($connect,$sql);
    while($row = mysqli_fetch_assoc($result))
    {
        $unique_string[] = $row;
    }
}

// filter => number
$sql = "SELECT * FROM nodes_metadata Where project_id = '1' and attribute_type = 'number' and filter = 'yes';";

$result = mysqli_query($connect,$sql);

$attribute_array_number = array();

while($row = mysqli_fetch_assoc($result))
{
  $attribute_array_number[] = $row;
}

$attribute_id_number = array();
foreach ($attribute_array_number as &$value) {
    $attribute_id_number[]= $value['attribute_id'];
}
// echo json_encode($attribute_id);

$min_max_number = array();
foreach ($attribute_id_number as &$value) {
    $sql = "SELECT MAX(CAST($value as DECIMAL(10,2))) as 'max', min(CAST($value as DECIMAL(10,2))) as 'min' FROM `nodes` where project_id = '1';";
    $result = mysqli_query($connect,$sql);
    while($row = mysqli_fetch_assoc($result))
    {
        $min_max_number[$value] = $row;
    }
}

// echo json_encode($min_max_number);

// search
$sql = "SELECT * FROM nodes_metadata Where project_id = '1' AND search = 'yes';";

$result = mysqli_query($connect,$sql);

$attribute_array_search = array();

while($row = mysqli_fetch_assoc($result))
{
  $attribute_array_search[] = $row;
}

// node metadata
$sql = "SELECT * FROM nodes_metadata Where project_id = '1' and filter = 'yes';";

$result = mysqli_query($connect,$sql);

$node_metadata_filter = array();

while($row = mysqli_fetch_assoc($result))
{
  $node_metadata_filter[] = $row;
}

//combine
$data_array = array(
    'attributeString' => $attribute_array_string,
    'uniqueAttributeValueString' => $unique_string,
    'attributeNumber' => $attribute_array_number,
    'minMaxNumber' => $min_max_number,
    'attributeSearch' => $attribute_array_search,
    'nodeMetadataFilter' => $node_metadata_filter
);
 
echo json_encode($data_array);

?>