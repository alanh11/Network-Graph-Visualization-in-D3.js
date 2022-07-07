<?php
$connect = mysqli_connect('localhost','root','','example');

$link_data=mysqli_real_escape_string($connect,$_POST['linkData']);
$node_data=mysqli_real_escape_string($connect,$_POST['nodeData']);
$node_color_attribute_id=$_POST['nodeColorAttributeID'];
$node_size_attribute_id=$_POST['nodeSizeAttributeID'];
$nodePosition=$_POST['nodePosition'];
$capturedPaths=$_POST['capturedPaths'];
$captureNodes=$_POST['captureNodes'];

$sql = "INSERT INTO `captured_graph` (`link_data`, `node_data`, `nodeColorAttribute`, `nodeSizeAttribute`,`nodePosition`, `capturedPaths`,`captureNodes`) 
VALUES ('$link_data','$node_data','$node_color_attribute_id','$node_size_attribute_id','$nodePosition','$capturedPaths','$captureNodes')";

if (mysqli_query($connect, $sql)) {
    echo json_encode(array("statusCode"=>200));
} 
else {
    echo json_encode(array("statusCode"=>201));
}
?>