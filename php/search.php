<?php
// select * from edges_full
// where edges_full.source in (select id from nodes_full where what like '%Horizontal stabiliser & elevator (A350)%')
// or edges_full.target in (select id from nodes_full where what like '%Horizontal stabiliser & elevator (A350)%');

// select DISTINCT nodes_full.* from nodes_full,
// (select * from edges_full
// 	where edges_full.source in (select id from nodes_full where what like '%Horizontal stabiliser & elevator (A350)%')
// 	or edges_full.target in (select id from nodes_full where what like '%Horizontal stabiliser & elevator (A350)%')) t1
// where nodes_full.id = t1.source
// or nodes_full.id = t1.target;

// select DISTINCT nodes_full.* from nodes_full,
// (select * from edges_full
// 	where edges_full.source in ('5')
// 	or edges_full.target in ('5')) t1
// where nodes_full.id = t1.source
// or nodes_full.id = t1.target;

// select DISTINCT nodes_full.* from nodes_full,
// (select * from edges_full
// 	where edges_full.source in ('5','34','216','218','308')
// 	or edges_full.target in ('5','34','216','218','308')) t1
// where nodes_full.id = t1.source
// or nodes_full.id = t1.target;

$connect = mysqli_connect('localhost','root','','example');

$hops = $_POST['hops'];
$checkbox = json_decode($_POST['checkbox']);
$search_term = $_POST['searchTerm'];

$temp = array();
$node_array = array();
for ($i = 0; $i < count($checkbox); $i++) {
  $attribute_id = $checkbox[$i];
  $sql = "CALL hops('$attribute_id','$search_term','$hops')";

  $result = mysqli_query($connect,$sql);
  while(mysqli_next_result($connect)){;}

  while($row = mysqli_fetch_assoc($result))
  {
    if (!in_array($row['id'], $temp)){
      $node_array[] = $row;
      $temp[] = $row['id'];
    }
    
  }
}

//nodes
// $sql = "CALL hops('attribute6','$search_term','$hops')";

// $result = mysqli_query($connect,$sql);
// while(mysqli_next_result($connect)){;}
// $node_array = array();

// while($row = mysqli_fetch_assoc($result))
// {
//   $node_array[] = $row;
// }
// $node_array = array_unique(array_column($node_array, 'id'));
// echo json_encode($node_array);

$node_id = array();
foreach ($node_array as &$value) {
    $node_id[]= $value['id'];
}
$node_id = array_unique($node_id);

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