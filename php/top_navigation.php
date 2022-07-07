<?php
$connect = mysqli_connect('localhost','root','','example');

// combo
$sql = "SELECT * FROM nodes_metadata Where project_id = '1' 
        and combo = 'yes';";

$result = mysqli_query($connect,$sql);

$top_combo = array();

while($row = mysqli_fetch_assoc($result))
{
  $top_combo[] = $row;
}

// node color
$sql = "SELECT * FROM nodes_metadata Where project_id = '1' 
        and node_color = 'yes';";

$result = mysqli_query($connect,$sql);

$node_color = array();

while($row = mysqli_fetch_assoc($result))
{
  $node_color[] = $row;
}

// node size
$sql = "SELECT * FROM nodes_metadata Where project_id = '1' 
        and node_size = 'yes';";

$result = mysqli_query($connect,$sql);

$node_size = array();

while($row = mysqli_fetch_assoc($result))
{
  $node_size[] = $row;
}

// timeline
$sql = "SELECT * FROM nodes_metadata Where project_id = '1' 
        and timeline = 'yes';";

$result = mysqli_query($connect,$sql);

$timeline = array();

while($row = mysqli_fetch_assoc($result))
{
  $timeline[] = $row;
}


//combine
$data_array = array(
    'topCombo' => $top_combo,
    'nodeColor' => $node_color,
    'nodeSize' => $node_size,
    'timeline' => $timeline
);
 
echo json_encode($data_array);

?>