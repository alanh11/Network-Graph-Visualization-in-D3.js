<?php
$connect = mysqli_connect('localhost','root','','example');

$hops = $_POST['hops'];
$node_id = $_POST['nodeId'];


//nodes
$sql = "CALL hops_related_nodes('$node_id','$hops')";

$result = mysqli_query($connect,$sql);
while(mysqli_next_result($connect)){;}
$node_array = array();

while($row = mysqli_fetch_assoc($result))
{
  $node_array[] = $row;
}

$node_id = array();
foreach ($node_array as &$value) {
    $node_id[]= $value['id'];
}
$condition = implode("','",$node_id);

//links
$sql = "select 
edges_full.*
from edges_full
where edges_full.source in (select id from nodes where id in ('$condition'))
and edges_full.target in (select id from nodes where id in ('$condition'))";

$result = mysqli_query($connect,$sql);
while(mysqli_next_result($connect)){;}

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
mysqli_close($connect);

?>