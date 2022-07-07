<?php

$connect = mysqli_connect('localhost','root','','example');

$graph_id = $_POST['graphId'];

$sql = "select link_data, node_data, nodeColorAttribute, nodeSizeAttribute, nodePosition, capturedPaths, captureNodes from captured_graph where graph_id = $graph_id";

$result = mysqli_query($connect,$sql);

$json_array = array();

while($row = mysqli_fetch_assoc($result))
{
  $json_array[] = $row;
}

echo json_encode($json_array);
mysqli_close($connect);
?>