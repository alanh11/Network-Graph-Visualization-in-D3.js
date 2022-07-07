d3.select("#left-tool-bar").
on("mouseover", function () {
  // d3.select("#left-tool-bar").style("border-color","red");
  // console.log("hover")
})


let sidebar = document.querySelector(".sidebar");
let sidebarBtn = document.querySelector(".bx-menu");
console.log(sidebarBtn);
sidebarBtn.addEventListener("click", () => {
  sidebar.classList.toggle("close");
});

function uncheckOtherCheckbox(obj) {
  var className = $(obj).attr('class').split('_')[0];
  // console.log(className);
  var checkboxOther = document.getElementsByClassName(className);
  // console.log(checkboxOther);
  if (obj.checked === true) {
    for (let i = 0; i < checkboxOther.length; i++) {
      checkboxOther[i].checked = true;
    }
  } else {
    for (let i = 0; i < checkboxOther.length; i++) {
      checkboxOther[i].checked = false;
    }
  }
}

function uncheckAll(obj) {
  var className = $(obj).attr('class');
  // console.log(className);
  var checkboxAll = document.getElementsByClassName(`${className}_all`);
  // console.log(checkboxAll);
  var checkboxOther = document.getElementsByClassName(className);
  // console.log(checkboxOther);
  var list = [];
  for (let i = 0; i < checkboxOther.length; i++) {
    if (checkboxOther[i].checked === true) {
      list.push(true);
    } else {
      list.push(false);
    }
  }
  if (list.includes(false) === true) {
    checkboxAll[0].checked = false;
  } else {
    checkboxAll[0].checked = true;
  }
}

function uncheckOtherCheckboxSearch(obj) {
  var checkboxOther = document.getElementsByClassName('search_category_other');
  // console.log(checkboxOther);
  if (obj.checked === true) {
    for (let i = 0; i < checkboxOther.length; i++) {
      checkboxOther[i].checked = true;
    }
  } else {
    for (let i = 0; i < checkboxOther.length; i++) {
      checkboxOther[i].checked = false;
    }
  }
}

function uncheckAllSearch(obj) {
  var checkboxAll = document.getElementsByClassName('search_category_all');
  // console.log(checkboxAll);
  var checkboxOther = document.getElementsByClassName('search_category_other');
  // console.log(checkboxOther);
  var list = [];
  for (let i = 0; i < checkboxOther.length; i++) {
    if (checkboxOther[i].checked === true) {
      list.push(true);
    } else {
      list.push(false);
    }
  }
  if (list.includes(false) === true) {
    checkboxAll[0].checked = false;
  } else {
    checkboxAll[0].checked = true;
  }
}

function uncheckOtherCheckboxGraphFilter(obj) {
  var className = $(obj).attr('class').split('_')[0] + '_' + $(obj).attr('class').split('_')[1];
  // console.log(className);
  var checkboxOther = document.getElementsByClassName(className);
  // console.log(checkboxOther);
  if (obj.checked === true) {
    for (let i = 0; i < checkboxOther.length; i++) {
      checkboxOther[i].checked = true;
    }
  } else {
    for (let i = 0; i < checkboxOther.length; i++) {
      checkboxOther[i].checked = false;
    }
  }
}

function uncheckAllGraphFilter(obj) {
  var className = $(obj).attr('class');
  // console.log(className);
  var checkboxAll = document.getElementsByClassName(`${className}_all`);
  // console.log(checkboxAll);
  var checkboxOther = document.getElementsByClassName(className);
  // console.log(checkboxOther);
  var list = [];
  for (let i = 0; i < checkboxOther.length; i++) {
    if (checkboxOther[i].checked === true) {
      list.push(true);
    } else {
      list.push(false);
    }
  }
  if (list.includes(false) === true) {
    checkboxAll[0].checked = false;
  } else {
    checkboxAll[0].checked = true;
  }
}

// define sidebar
$.ajax({
  url: 'php/sidebar.php',
  async: false,
  dataType: 'text',
  success: function (result) {
    sidebarDataObj = JSON.parse(result);
  },
  error: function () {
    alert("error");
  }
})
var nodeMetadataFilter = sidebarDataObj['nodeMetadataFilter'];
// console.log(nodeMetadataFilter);

// filter => string
var attributeString = sidebarDataObj['attributeString'];
var uniqueAttributeValueString = sidebarDataObj['uniqueAttributeValueString'];
// console.log(attributeString);
// console.log(uniqueAttributeValueString);

var filterOptionString = {};
$(attributeString).filter(function (i, n) {
  var list = [];
  $(uniqueAttributeValueString).filter(function (i, m) {
    if (Object.keys(m)[0] === n.attribute_id) {
      list.push(m[n.attribute_id]);
    }
  })
  filterOptionString[n.attribute_id] = list;
})

console.log(filterOptionString);

// filterOptionString = {
//   "Country": ["USA", "Canada", "Spain"]
// };

for (let i = 0; i < Object.keys(filterOptionString).length; i++) {
  var attributeId = Object.keys(filterOptionString)[i];
  var values = filterOptionString[attributeId];
  var attributeName = '';
  $(attributeString).filter(function (i, n) {
    if (n.attribute_id === attributeId) {
      attributeName = n.attribute_name;
    }
  })
  // console.log(attribute_name);

  var main = '<li class="entry-point-filter">' +
    '<div class="iocn-link">' +
    '<a href="#">' +
    '<i class="bx bx-collection"></i>' +
    '<span class="link_name">' + attributeName + '</span>' +
    '</a>' +
    '<i class="bx bxs-chevron-down arrow"></i>' +
    '</div>' +
    '<ul class="sub-menu">' +
    '<li><a class="link_name" href="#">' + attributeName + '</a></li>' +
    '<li class="checkbox-option">' +
    '<div class="checkbox"><input type="checkbox" class="' + attributeId + '_all" value="' + 'All' + '" onclick="uncheckOtherCheckbox(this);"></div>' +
    '<a href="#">&nbsp;' + 'All' + '</a>' +
    '</li>';

  var sub = '';
  for (let j = 0; j < values.length; j++) {
    var li = '<li class="checkbox-option">' +
      '<div class="checkbox"><input type="checkbox" class="' + attributeId + '" value="' + values[j] + '" onclick="uncheckAll(this);"></div>' +
      '<a href="#">&nbsp;' + values[j] + '</a>' +
      '</li>';

    sub = sub + li;
  }
  // console.log(sub);

  html = main + sub + '</ul>' + '</li>';
  // console.log(html);

  $('.nav-links').append(html);
}

// filter => number
var attributeNumber = sidebarDataObj['attributeNumber'];
var maxMinNumber = sidebarDataObj['minMaxNumber'];
// console.log(attributeNumber);
// console.log(maxMinNumber);

var filterOptionNumber = {};
$(attributeNumber).filter(function (i, n) {
  $(Object.keys(maxMinNumber)).filter(function (i, m) {
    if (n.attribute_id === m) {
      filterOptionNumber[n.attribute_id] = [maxMinNumber[m]];
    }
  })
})
console.log(filterOptionNumber);

for (let i = 0; i < Object.keys(filterOptionNumber).length; i++) {
  var attributeId = Object.keys(filterOptionNumber)[i];
  var min = filterOptionNumber[attributeId][0]['min'];
  var max = filterOptionNumber[attributeId][0]['max'];
  // console.log(min, max);
  var attributeName = '';
  $(attributeNumber).filter(function (i, n) {
    if (n.attribute_id === attributeId) {
      attributeName = n.attribute_name;
    }
  })

  var html = '<li class="entry-point-filter">' +
    '<div class="iocn-link">' +
    '<a href="#">' +
    '<i class="bx bx-collection"></i>' +
    '<span class="link_name">' + attributeName + '</span>' +
    '</a>' +
    '<i class="bx bxs-chevron-down arrow"></i>' +
    '</div>' +
    '<ul class="sub-menu">' +
    '<li><a class="link_name" href="#">' + attributeName + '</a></li>' +
    '<li>' +
    '<a href="#">Minimum Value</a>' +
    '<input type="text" class="inputBox" id="' + `${attributeId}_min` + '" placeholder=' + min + ' />' +
    '</li>' +
    '<li>' +
    '<a href="#">Maximum Value</a>' +
    '<input type="text" class="inputBox" id="' + `${attributeId}_max` + '" placeholder=' + max + ' />' +
    '</li>' +
    '</ul>' +
    '</li>'

  $('.nav-links').append(html);
}

// search
var attributeSearch = sidebarDataObj['attributeSearch'];
console.log(attributeSearch);

for (let i = 0; i < attributeSearch.length; i++) {
  var attributeId = attributeSearch[i].attribute_id;
  var attributeName = attributeSearch[i].attribute_name;

  var html = '<li class="checkbox-option">' +
    '<div class="checkbox"><input type="checkbox" class="search_category_other" value="' + attributeId + '" onclick="uncheckAllSearch(this);" checked></div>' +
    '<a href="#">&nbsp;' + attributeName + '</a>' +
    '</li>'

  $('#search-category-sub-menu').append(html);
}
html = html + '</ul>' + '</li>'
// console.log(html)

// open and close sub-menu
function openCloseSubmenu() {
  let arrow = document.querySelectorAll(".arrow");
  for (var i = 0; i < arrow.length; i++) {
    arrow[i].addEventListener("click", (e) => {
      let arrowParent = e.target.parentElement.parentElement; //selecting main parent of arrow
      arrowParent.classList.toggle("showMenu");
    });
  }
}
openCloseSubmenu();

// entry option selection
var entryPointSelection = "";
d3.select("#entry-point-filter")
  .on("click", function () {
    d3.selectAll('.entry-point-filter')
      .style('display', 'block');

    d3.selectAll('.entry-point-search')
      .style('display', 'none');

    d3.select('#entry-point-filter')
      .style('background-color', '#11101d');

    d3.select('#entry-point-search')
      .style('background-color', '#464866');
    entryPointSelection = "filter";
  });

d3.select("#entry-point-search")
  .on("click", function () {
    d3.selectAll('.entry-point-filter')
      .style('display', 'none');

    d3.selectAll('.entry-point-search')
      .style('display', 'block');

    d3.select('#entry-point-filter')
      .style('background-color', '#464866');

    d3.select('#entry-point-search')
      .style('background-color', '#11101d');
    entryPointSelection = "search";
  });

// top navigation
$.ajax({
  url: 'php/top_navigation.php',
  async: false,
  dataType: 'text',
  success: function (result) {
    topNaviObj = JSON.parse(result);
  },
  error: function () {
    alert("error");
  }
})

var nodeColor = topNaviObj['nodeColor'];
var nodeSize = topNaviObj['nodeSize'];
var topCombo = topNaviObj['topCombo'];
var timeline = topNaviObj['timeline'];

var topNavigationOption = {
  'node_color': nodeColor,
  'node_size': nodeSize,
  'top_combo': topCombo,
  'timeline': timeline
};

var topNavigationObj = {};
for (let i = 0; i < Object.keys(topNavigationOption).length; i++) {
  var obj = {};
  Object.values(topNavigationOption)[i].forEach(function (e) {
    obj[e.attribute_id] = e.attribute_name;
  })

  topNavigationObj[Object.keys(topNavigationOption)[i]] = obj;
}

console.log(topNavigationObj);

for (let i = 0; i < Object.keys(topNavigationObj).length; i++) {
  var category = Object.keys(topNavigationObj)[i];
  var values = Object.values(topNavigationObj)[i];

  for (let j = 0; j < Object.keys(values).length; j++) {
    var attribute_id = Object.keys(values)[j];
    var attribute_name = Object.values(values)[j];
    var html = '<a href="#" name="right-tool-bar-section-content-option" class="' + category + '" id="top_navi_' + attribute_id + '">' + attribute_name + '</a>'
    // console.log(html)
    $(`#${category}_sub_menu`).append(html);
  }
}

// main function
var filteredData;
var graphData;
var clonedData;
var capturedData;
var nodeColorAttributeID = '';
var nodeSizeAttributeID = '';
var nodePosition = []
var selectedPaths = [];
var selectedNodes = [];

d3.select('#show-graph-btn').
on('click', function () {

  removeSvg();
  filteredData = filterData();

  if (filteredData === null) {
    alert('No filter was selected or entered');

  } else {
    graphData = update(filteredData[0], filteredData[1], nodeColorAttributeID, nodeSizeAttributeID, nodePosition);
    console.log(graphData);

    document.getElementById("unfix-nodes-btn").disabled = false;
    var option = document.getElementsByName("right-tool-bar-section-content-option");
    option.forEach(function (e) {
      e.style.display = "block";
    })
  }

})

d3.select('#graph_filter_btn')
  .on('click', function () {
    // filter => string
    var attributeIDFilterString = [];
    attributeString.forEach(element => {
      attributeIDFilterString.push(element.attribute_id);
    });
    // console.log(attributeIDFilterString);

    var filterObj = {};
    attributeIDFilterString.forEach(element => {
      var checkbox = $(`.${element}_graphFilter:checked`).map(function () {
        return $(this).val();
      }).get();
      var attribute_type = [];
      $(attributeString).filter(function (i, n) {
        if (n.attribute_id === element) {
          attribute_type.push(n.attribute_type);
        }
      })

      // console.log(checkbox);
      if (checkbox.length > 0) {
        filterObj[element] = [attribute_type, checkbox];
      }
    });

    // filter => number
    function isEmpty(str) {
      return !str.trim().length;
    }

    var attributeIdFilterNumber = [];
    attributeNumber.forEach(element => {
      attributeIdFilterNumber.push(element.attribute_id);
    });
    console.log(attributeIdFilterNumber);

    attributeIdFilterNumber.forEach(element => {
      var min = document.getElementById(`${element}_graphFilter_min`).value;
      var max = document.getElementById(`${element}_graphFilter_max`).value;

      var attribute_type = [];
      $(attributeNumber).filter(function (i, n) {
        if (n.attribute_id === element) {
          attribute_type.push(n.attribute_type);
        }
      })

      if (isEmpty(min) === false && isEmpty(max) === false) {
        var minMax = {
          'min': min,
          'max': max
        };
        filterObj[element] = [attribute_type, minMax];
      }
    });
    console.log(filterObj);

    $.ajax({
      url: "php/filter.php",
      async: false,
      type: "POST",
      data: {
        filterData: JSON.stringify(filterObj)
      },
      cache: false,
      success: function (result) {
        // var dataResult = JSON.parse(dataResult);
        // if (dataResult.statusCode == 200) {
        //     alert("Succeed");
        // } else if (dataResult.statusCode == 201) {
        //     alert("Error occured!");
        // }

        FilteredDataObj = JSON.parse(result);
      }
    });
    console.log(FilteredDataObj);

    removeSvg();
    filteredData = [FilteredDataObj['linkData'], FilteredDataObj['nodeData']]
    selectedNodes = [];
    selectedPaths = [];
    nodePosition = [];
    graphData = update(filteredData[0], filteredData[1], nodeColorAttributeID, nodeSizeAttributeID, nodePosition);

  })

d3.selectAll('.node_color').
on('click', function () {
  var fullID = this.id;
  // console.log(fullID);
  var nodeColorAttributeID = this.id.split('top_navi_')[1];

  removeSvg();

  nodePosition = [];
  for (let i = 0; i < graphData[1].length; i++) {
    var node = {};
    node.id = graphData[1][i].id;
    node.x = graphData[1][i].x;
    node.y = graphData[1][i].y;
    nodePosition.push(node);
  }
  console.log(nodePosition);
  graphData = update(graphData[0], graphData[1], nodeColorAttributeID, nodeSizeAttributeID, nodePosition);

  Array.from(document.getElementsByClassName("node_color")).forEach(
    function (element, index, array) {
      if (element.id != fullID) {
        document.getElementById(element.id).style.color = "#DCDCDC";
        document.getElementById(element.id).style.backgroundColor = "white";
      } else {
        document.getElementById(element.id).style.color = "black";
        document.getElementById(element.id).style.backgroundColor = "#c7c4c4";
      }
    }
  );

})

d3.selectAll('.node_size').
on('click', function () {
  // console.log(this.id);
  var fullID = this.id;
  nodeSizeAttributeID = this.id.split('top_navi_')[1];

  removeSvg();

  nodePosition = [];
  for (let i = 0; i < graphData[1].length; i++) {
    var node = {};
    node.id = graphData[1][i].id;
    node.x = graphData[1][i].x;
    node.y = graphData[1][i].y;
    nodePosition.push(node);
  }
  console.log(nodePosition);
  graphData = update(graphData[0], graphData[1], nodeColorAttributeID, nodeSizeAttributeID, nodePosition);
  console.log(graphData);

  graphData[1].forEach(function (e) {
    e.fx = null;
    e.fy = null;
  })

  Array.from(document.getElementsByClassName("node_size")).forEach(
    function (element, index, array) {
      if (element.id != fullID) {
        document.getElementById(element.id).style.color = "#DCDCDC";
        document.getElementById(element.id).style.backgroundColor = "white";
      } else {
        document.getElementById(element.id).style.color = "black";
        document.getElementById(element.id).style.backgroundColor = "#c7c4c4";
      }
    }
  );
})

d3.selectAll('.top_combo').
on('click', function () {
  console.log(this.id);
  var attributeId = this.id.split('top_navi_')[1];
  console.log(attributeId);

  var nodeIdArray = [];
  graphData[1].forEach(e => nodeIdArray.push(e.id));

  var attributeIDFilterString = [];
  attributeString.forEach(element => {
    attributeIDFilterString.push(element.attribute_id);
  });
  console.log(attributeIDFilterString);

  var attributeIDFilterStringObj = {};
  attributeIDFilterString.forEach(function (e) {
    var temp = [];
    attributeIDFilterString.forEach(function (f) {

      if (e != f) {
        temp.push(f);
      }
    })
    attributeIDFilterStringObj[e] = temp;
  })
  console.log(attributeIDFilterStringObj);

  var graphDataWithoutCombo = JSON.parse(JSON.stringify(graphData));

  var origFilteredData = restoreData(graphDataWithoutCombo[0], graphDataWithoutCombo[1]);
  removeSvg();

  function comboNodes(level, link_data_array, node_data_array) {
    var targetLevel = [];
    for (let i = 0; i < node_data_array.length; i++) {
      if (targetLevel.includes(node_data_array[i][level]) === false) {
        targetLevel.push(node_data_array[i][level]);
      }
    }

    var node_data_filtered = [];
    var country_node_obj = {
      "id": "",
      "name": ""
    };
    for (let i = 0; i < targetLevel.length; i++) {
      for (let j = 0; j <= node_data_array.length; j++) {
        if (j < node_data_array.length) {
          if (targetLevel[i] === node_data_array[j][level]) {
            country_node_obj.id = (i + 1).toString();
            country_node_obj.name = targetLevel[i];
            // console.log(country_node_obj)
          }
        } else {
          node_data_filtered.push(country_node_obj);
          country_node_obj = {
            "id": "",
            "name": ""
          };
        }
      }
    }
    console.log(node_data_filtered);

    var link_data_filtered = [];
    var country_link_obj = {};
    for (let i = 0; i < link_data_array.length; i++) {
      for (let j = 0; j < node_data_array.length; j++) {
        if (link_data_array[i].source === node_data_array[j].id) {
          country_link_obj.source = node_data_array[j][level];
        }
        if (link_data_array[i].target === node_data_array[j].id) {
          country_link_obj.target = node_data_array[j][level];
          // country_link_obj["type"] = link_data_array[i].type;
        }

      }
      link_data_filtered.push(country_link_obj);
      country_link_obj = {};
    }
    console.log(link_data_filtered);

    for (let i = 0; i < link_data_filtered.length; i++) {
      for (let j = 0; j < node_data_filtered.length; j++) {
        if (link_data_filtered[i].source === node_data_filtered[j].name) {
          link_data_filtered[i].source = node_data_filtered[j].id;
        }
        if (link_data_filtered[i].target === node_data_filtered[j].name) {
          link_data_filtered[i].target = node_data_filtered[j].id;
        }
      }
      country_link_obj = {};
    }
    console.log(link_data_filtered);

    link_data_filtered = link_data_filtered.filter((value, index, self) =>
      index === self.findIndex((t) => (
        (t.source + t.target) === (value.source + value.target) || (t.target + t.source) === (value.source + value.target)
      ))
    );
    console.log(link_data_filtered);
    var link_data_filtered_unique = [];
    link_data_filtered.forEach(function (e) {
      if (e.source != e.target) {
        link_data_filtered_unique.push(e)
      }
    })
    console.log(link_data_filtered_unique);
    return [link_data_filtered_unique, node_data_filtered];
  }

  var comboData = comboNodes(attributeId, origFilteredData[0], origFilteredData[1]);
  console.log(comboData);

  var comboList = [];
  comboData[1].forEach(function (e) {
    comboList.push(e.name);
  })

  console.log(comboList);
  // console.log(attributeNumber);

  var attributeNumberList = [];
  attributeNumber.forEach(e => attributeNumberList.push(e.attribute_id));
  console.log(attributeNumberList);

  $.ajax({
    url: "php/combo.php",
    async: false,
    type: "POST",
    data: {
      attributeIDFilterStringObj: JSON.stringify(attributeIDFilterStringObj),
      nodeIdArray: JSON.stringify(nodeIdArray),
      comboList: JSON.stringify(comboList),
      attributeNumberList: JSON.stringify(attributeNumberList),
      attributeId: attributeId
    },
    cache: false,
    success: function (result) {
      // var dataResult = JSON.parse(dataResult);
      // if (dataResult.statusCode == 200) {
      //     alert("Succeed");
      // } else if (dataResult.statusCode == 201) {
      //     alert("Error occured!");
      // }

      NewNodeObj = JSON.parse(result);
    }
  });
  console.log(NewNodeObj);

  var nodeArray = NewNodeObj['nodeArray'];
  console.log(nodeArray);

  var filterAttributeId = {
    "string": [],
    "number": []
  };

  comboData[1].forEach(function (e) {
    nodeArray.forEach(function (f) {
      if (e['name'] === f[attributeId]) {
        attributeNumberList.forEach(function (g) {
          if (Object.keys(f).includes(g)) {
            e[g] = parseFloat(f[g]).toFixed(2);
            if (filterAttributeId['number'].includes(g) === false) {
              filterAttributeId['number'].push(g);
            }

          }

        })
      }
    })
  })

  comboData[1].forEach(function (e) {
    nodeArray.forEach(function (f) {
      if (e['name'] === f[attributeId]) {
        attributeIDFilterString.forEach(function (g) {
          if (Object.keys(f).includes(g)) {
            e[g] = f[g];
            if (filterAttributeId['string'].includes(g) === false && g != attributeId) {
              filterAttributeId['string'].push(g);
            }
          }

        })
      }
    })
  })
  console.log(comboData);

  console.log(filterAttributeId);

  var nodeColorAttributeIdCombo = "";
  var nodeSizeAttributeIdCombo = "";
  var nodePositionCombo = [];

  var origComboData = JSON.parse(JSON.stringify(comboData));
  var comboGraphData = update(comboData[0], comboData[1], nodeColorAttributeIdCombo, nodeSizeAttributeIdCombo, nodePositionCombo);
  console.log(comboGraphData);
  console.log(origComboData);

  d3.selectAll(".graph_filter").style("display", "none");
  d3.selectAll(".graph_filter_combo").remove();
  graphFilterGeneratorCombo(filterAttributeId, nodeIdArray, comboList, attributeId, nodeIdArray);
  openCloseSubmenu();

  // update top navigation
  d3.select("#restart-btn").style("display", "none");
  d3.select("#exit-combo-btn").style("display", "block");

  var attributeFilterString = NewNodeObj['attributeFilterString'];
  console.log(attributeFilterString);
  d3.selectAll(".node_color").style("display", "none");
  d3.selectAll(".node_color_combo").remove();

  attributeFilterString.forEach(function (e) {
    var attributeName = '';
    attributeString.forEach(function (f) {
      if (f.attribute_id === e) {
        attributeName = f.attribute_name;
      }
    })
    console.log(attributeName);
    var html = '<a href="#" class="node_color_combo" id="top_navi_combo_' + e + '">' + attributeName + '</a>';
    $("#node_color_sub_menu").append(html);
  })

  // node color
  d3.selectAll('.node_color_combo').
  on('click', function () {
    // console.log(this.id);
    nodeColorAttributeIdCombo = this.id.split('top_navi_combo_')[1];

    removeSvg();

    console.log(comboData[1]);
    nodePositionCombo = [];
    for (let i = 0; i < comboData[1].length; i++) {
      var node = {};
      node.id = comboData[1][i].id;
      node.x = comboData[1][i].x;
      node.y = comboData[1][i].y;
      nodePositionCombo.push(node);
    }
    console.log(nodePositionCombo);
    comboGraphData = update(comboData[0], comboData[1], nodeColorAttributeIdCombo, nodeSizeAttributeIdCombo, nodePositionCombo);
  })

  // node size
  d3.selectAll('.node_size').
  on('click', function () {
    // console.log(this.id);
    nodeSizeAttributeIdCombo = this.id.split('top_navi_')[1];

    removeSvg();

    nodePositionCombo = [];
    for (let i = 0; i < comboData[1].length; i++) {
      var node = {};
      node.id = comboData[1][i].id;
      node.x = comboData[1][i].x;
      node.y = comboData[1][i].y;
      nodePositionCombo.push(node);
    }
    console.log(nodePositionCombo);
    comboGraphData = update(comboData[0], comboData[1], nodeColorAttributeIdCombo, nodeSizeAttributeIdCombo, nodePositionCombo);
    console.log(comboGraphData);

    comboGraphData[1].forEach(function (e) {
      e.fx = null;
      e.fy = null;
    })
  })

  // combo graph filter
  origComboDataStringify = JSON.stringify(origComboData);
  d3.select('#graph_filter_btn')
    .on('click', function () {
      origComboData = JSON.parse(origComboDataStringify);

      // filter => string
      var attributeIDFilterString = [];
      attributeString.forEach(element => {
        attributeIDFilterString.push(element.attribute_id);
      });
      // console.log(attributeIDFilterString);

      var filterObj = {};
      attributeIDFilterString.forEach(element => {
        var checkbox = $(`.${element}_graphFilterCombo:checked`).map(function () {
          return $(this).val();
        }).get();
        var attribute_type = [];
        $(attributeString).filter(function (i, n) {
          if (n.attribute_id === element) {
            attribute_type.push(n.attribute_type);
          }
        })

        // console.log(checkbox);
        if (checkbox.length > 0) {
          filterObj[element] = [attribute_type, checkbox];
        }
      });

      // filter => number
      function isEmpty(str) {
        return !str.trim().length;
      }

      var attributeIdFilterNumber = [];
      attributeNumber.forEach(element => {
        attributeIdFilterNumber.push(element.attribute_id);
      });
      console.log(attributeIdFilterNumber);

      attributeIdFilterNumber.forEach(element => {
        var min = document.getElementById(`${element}_graphFilterCombo_min`).value;
        var max = document.getElementById(`${element}_graphFilterCombo_max`).value;

        var attribute_type = [];
        $(attributeNumber).filter(function (i, n) {
          if (n.attribute_id === element) {
            attribute_type.push(n.attribute_type);
          }
        })

        if (isEmpty(min) === false && isEmpty(max) === false) {
          var minMax = {
            'min': min,
            'max': max
          };
          filterObj[element] = [attribute_type, minMax];
        }
      });
      console.log(filterObj);

      $.ajax({
        url: "php/filter_combo.php",
        async: false,
        type: "POST",
        data: {
          filterData: JSON.stringify(filterObj),
          attributeId: attributeId,
          comboList: JSON.stringify(comboList),
          nodeIdArray: JSON.stringify(nodeIdArray)
        },
        cache: false,
        success: function (result) {
          // var dataResult = JSON.parse(dataResult);
          // if (dataResult.statusCode == 200) {
          //     alert("Succeed");
          // } else if (dataResult.statusCode == 201) {
          //     alert("Error occured!");
          // }

          FilteredDataObj = JSON.parse(result);
        }
      });
      console.log(FilteredDataObj);

      console.log(origComboData);

      var ComboFilteredNodeData = [];
      var ComboFilteredLinkData = [];

      origComboData[1].forEach(function (e) {
        FilteredDataObj['nodeData'].forEach(function (f) {
          if (e['name'] === f[attributeId]) {
            ComboFilteredNodeData.push(e);
          }
        })
      })

      // console.log(ComboFilteredNodeData);

      var nodeID = [];
      ComboFilteredNodeData.forEach(e => nodeID.push(e.id));

      origComboData[0].forEach(function (e) {
        if (nodeID.includes(e.source) && nodeID.includes(e.target)) {
          ComboFilteredLinkData.push(e);
        }
      })

      // console.log(ComboFilteredLinkData);

      removeSvg();

      selectedNodes = [];
      selectedPaths = [];
      nodePosition = [];
      update(ComboFilteredLinkData, ComboFilteredNodeData, "", "", nodePosition);

    })

  // exit combo
  d3.select("#exit-combo-btn")
    .on("click", function () {

      removeSvg();

      var nodePosition = [];
      for (let i = 0; i < graphData[1].length; i++) {
        var node = {};
        node.id = graphData[1][i].id;
        node.x = graphData[1][i].x;
        node.y = graphData[1][i].y;
        nodePosition.push(node);
      }

      filteredData = restoreData(graphData[0], graphData[1]);

      graphData = update(filteredData[0], filteredData[1], nodeColorAttributeID, nodeSizeAttributeID, nodePosition);

      d3.select("#exit-combo-btn").style("display", "none");
      d3.select("#restart-btn").style("display", "block");

      d3.selectAll(".node_color").style("display", "block");
      d3.selectAll(".node_color_combo").remove();

      d3.selectAll(".graph_filter").style("display", "block");
      d3.selectAll(".graph_filter_combo").remove();
    })

})

d3.selectAll('.timeline').
on('click', function () {
  // d3.select('#play').style('display','block');
  // d3.select('#pause').style('display','block');

  document.getElementById("pause").disabled = false;

  var fullID = this.id;
  timelineAttributeID = this.id.split('top_navi_')[1];
  console.log(timelineAttributeID);

  // Array.from(document.getElementsByClassName("timeline")).forEach(
  //   function (element, index, array) {
  //     console.log(element);
  //     if (element.id != fullID) {
  //       document.getElementById(element.id).style.color = "#DCDCDC";
  //       document.getElementById(element.id).style.backgroundColor = "white";
  //     } else {
  //       document.getElementById(element.id).style.color = "black";
  //       document.getElementById(element.id).style.backgroundColor = "#c7c4c4";
  //     }
  //   }
  // );

  timeline(timelineAttributeID);

  function timeline(timelineAttributeID) {

    var attributeValues = [];
    graphData[1].forEach(e => attributeValues.push(e[timelineAttributeID]));

    attributeValues = attributeValues.filter((value, index, self) =>
      index === self.findIndex((t) => (
        t === value
      ))
    );
    console.log(attributeValues);
    var list = [];
    for (let i = 0; i < attributeValues.length; i++) {
      var show = [];
      var hide = [];

      show.push(attributeValues[i]);
      $(attributeValues).filter(function (i, n) {
        if (n !== show[0]) {
          hide.push(n);
        }
      });
      list.push([show, hide]);
    }
    console.log(list);

    function filterNodeString(linkData, nodeData, attribute, stringValues) {
      var filteredNodeData = [];
      $(nodeData).filter(function (i, n) {
        $(stringValues).filter(function (i, m) {
          if (n[attribute] === m) {
            filteredNodeData.push(n);
          }
        });
      });
      console.log(filteredNodeData);

      var filteredLinkData = [];
      $(linkData).filter(function (i, n) {
        $(filteredNodeData).filter(function (i, m) {
          if (n.source === m.id) {
            filteredLinkData.push(n);
          }
        });
      });

      var SecondfilteredLinkData = [];
      $(filteredLinkData).filter(function (i, n) {
        $(filteredNodeData).filter(function (i, m) {
          if (n.target === m.id) {
            SecondfilteredLinkData.push(n);
          }
        });
      });
      console.log(SecondfilteredLinkData);

      return [SecondfilteredLinkData, filteredNodeData];
    }

    function show_hide_node(show, opacity) {
      var nodeShow = filterNodeString(graphData[0], graphData[1], timelineAttributeID, show)[1];
      var nodeIdShow = [];
      nodeShow.forEach(e => nodeIdShow.push(e.id));
      console.log(nodeIdShow);


      for (let i = 0; i < nodeIdShow.length; i++) {
        d3.select(`#nodeID${nodeIdShow[i]}`)
          .transition()
          .delay(200)
          .duration(2000).style("opacity", opacity);

        d3.select(`#labelID${nodeIdShow[i]}`)
          .transition()
          .delay(200)
          .duration(2000).style("opacity", opacity);
      }

      linkid = [];
      $(graphData[0]).filter(function (i, n) {
        $(nodeIdShow).filter(function (j, m) {
          if (n.source.id === m || n.target.id === m) {
            linkid.push(i);
          }
        });
      });

      linkid = linkid.filter((value, index, self) =>
        index === self.findIndex((t) => (
          t === value
        ))
      );
      console.log(linkid);

      for (let i = 0; i < linkid.length; i++) {
        d3.select(`#link-${linkid[i]}`)
          .transition()
          .delay(200)
          .duration(2000).style("opacity", opacity);
      }
    }

    //play and pause
    document.getElementById("play")
      .setAttribute("disabled", "true");
    var stats = 0;

    function pauser() {
      return new Promise(resolve => {
        let playbuttonclick = function () {
          document.getElementById("pause")
            .removeAttribute("disabled");

          document.getElementById("play")
            .setAttribute("disabled", "true");

          document.getElementById("play")
            .removeEventListener("click",
              playbuttonclick);

          stats = 0;
          resolve("resolved");
        };
        document.getElementById("play")
          .addEventListener("click", playbuttonclick);
      });
    }

    document.getElementById("pause")
      .addEventListener("click", function () {

        stats = 1;

        document.getElementById("pause")
          .setAttribute("disabled", "true");

        document.getElementById("play")
          .removeAttribute("disabled");

      });

    const timer = ms => new Promise(res => setTimeout(res, ms));
    async function show_hide_await() {
      for (i = 0; i < list.length; i++) {
        show_hide_node(list[i][0], 1.0);
        show_hide_node(list[i][1], 0.0);
        await timer(3000);
        if (stats == 1) await pauser();
      }
      d3.select("#chart-container").selectAll("circle").style("opacity", 1);
      d3.select("#chart-container").selectAll("path").style("opacity", 1);
      d3.select("#chart-container").selectAll("text").style("opacity", 1);
    }
    show_hide_await();

    // d3.select('#play').style('display','none');
    // d3.select('#pause').style('display','none');
  }
})


d3.select('#related-nodes-btn').
on('click', function () {
  if (selectedNodes.length != 1) {
    alert("Please select one node only!")
  } else {
    var hops = prompt("Showing all connected nodes within how many hops", "1");

    var selectedNodeId = selectedNodes.toString().split("nodeID")[1];
    console.log(selectedNodeId);

    $.ajax({
      url: "php/related_nodes.php",
      async: false,
      type: "POST",
      data: {
        nodeId: selectedNodeId,
        hops: hops
      },
      cache: false,
      success: function (result) {
        // var dataResult = JSON.parse(dataResult);
        // if (dataResult.statusCode == 200) {
        //     alert("Succeed");
        // } else if (dataResult.statusCode == 201) {
        //     alert("Error occured!");
        // }

        NewNodeObj = JSON.parse(result);
      }
    });
    console.log(NewNodeObj);

    removeSvg();

    var newNodeData = [NewNodeObj['linkData'], NewNodeObj['nodeData']];

    var lastGraphData = [
      [],
      []
    ];
    graphData[0].forEach(e => lastGraphData[0].push(e));
    graphData[1].forEach(e => lastGraphData[1].push(e));
    console.log(lastGraphData);

    newNodeData[0].forEach(e => lastGraphData[0].push(e));
    newNodeData[1].forEach(e => lastGraphData[1].push(e));
    console.log(lastGraphData);

    lastGraphData[0] = lastGraphData[0].filter((value, index, self) =>
      index === self.findIndex((t) => (
        t.source === value.source && t.target === value.target
      ))
    );

    lastGraphData[1] = lastGraphData[1].filter((value, index, self) =>
      index === self.findIndex((t) => (
        t.id === value.id
      ))
    );

    var nodePosition = [];
    for (let i = 0; i < lastGraphData[1].length; i++) {
      var node = {};
      node.id = lastGraphData[1][i].id;
      node.x = lastGraphData[1][i].x;
      node.y = lastGraphData[1][i].y;
      nodePosition.push(node);
    }
    console.log(nodePosition);

    $(lastGraphData[1]).filter(function (i, n) {
      delete n.fx;
      delete n.fy;
      delete n.x;
      delete n.y;
      delete n.vx;
      delete n.vy;
      delete n.index;
    });

    graphData = update(lastGraphData[0], lastGraphData[1], nodeColorAttributeID, nodeSizeAttributeID, nodePosition);
    selectedNodes = [];
    selectedPaths = [];

    var filterAttributeId = {};
    var tempString = [];
    var tempNumber = [];
    nodeMetadataFilter.forEach(function (e) {

      if (e.attribute_type === 'string') {
        tempString.push(e.attribute_id);
      } else if (e.attribute_type === 'number') {
        tempNumber.push(e.attribute_id);
      }

    })
    filterAttributeId['string'] = tempString;
    filterAttributeId['number'] = tempNumber;
    console.log(filterAttributeId);

    var nodeIdArray = [];
    graphData[1].forEach(e => nodeIdArray.push(e.id));
    console.log(nodeIdArray);

    d3.selectAll(".graph_filter").remove();
    graphFilterGenerator(filterAttributeId, nodeIdArray);
    openCloseSubmenu();
  }

})

d3.select('#shortest-route-btn')
  .on("click", function () {

    if (selectedNodes.length != 2) {
      alert("Please select two nodes only!")
    } else {
      var origFilteredData = restoreDataWithPosition(graphData[0], graphData[1]);
      console.log(origFilteredData);

      var nodeId = [];
      selectedNodes.forEach(e => nodeId.push(e.split("nodeID")[1]));
      console.log(nodeId);
      var nodeDataByHops = [
        [nodeId[0]]
      ];

      var nodeArrayByHops = [
        []
      ];

      $(origFilteredData[0]).filter(function (i, n) {
        if (n.source === nodeId[0] || n.target === nodeId[0]) {
          nodeArrayByHops[0].push([n.source, n.target]);
        }
      });

      var ifFound = false;
      var counter = 0;

      var nodeDataByHopsAddi = [
        [nodeId[0]]
      ];
      while (ifFound === false) {
        var nodeData = [];
        var node_array = [];
        $(origFilteredData[0]).filter(function (i, n) {
          $(nodeDataByHops[counter]).filter(function (j, m) {
            if (n.source === m || n.target === m) {
              nodeData.push(n.source, n.target);
            }
          });
        });

        nodeData = nodeData.filter((value, index, self) =>
          index === self.findIndex((t) => (
            t === value
          ))
        );
        var nodeDataAddi = [];
        $(nodeData).filter(function (i, n) {
          if (nodeDataByHops[counter].includes(n) === false) {
            nodeDataAddi.push(n);
          }
        });
        console.log(nodeDataAddi);

        lastHopNode = [];
        nodeArrayByHops[counter].forEach(e => lastHopNode.push(e[0], e[1]));
        console.log(lastHopNode);

        $(origFilteredData[0]).filter(function (i, n) {
          $(nodeDataAddi).filter(function (i, m) {
            if (n.source === m || n.target === m) {
              if (lastHopNode.includes(n.source) === false || lastHopNode.includes(n.target) === false) {
                node_array.push([n.source, n.target]);
              }
              // if (nodeDataByHopsAddi[counter].includes(n.source) === false && nodeDataByHopsAddi[counter].includes(n.target) === false) {
              //     node_array.push([n.source, n.target]);
              // }
            }
          });
        });

        nodeDataByHops.push(nodeData);
        nodeDataByHopsAddi.push(nodeDataAddi);

        counter++;

        if (nodeDataAddi.includes(nodeId[1])) {
          break;
        }

        nodeArrayByHops.push(node_array);

        if (counter === origFilteredData[0].length - 1) {
          break;
        }
      }
      console.log(nodeDataByHops);
      console.log(nodeDataByHopsAddi);
      console.log(nodeArrayByHops);

      var links = [];
      var node = nodeId[1];

      for (let i = 1; i <= nodeArrayByHops.length; i++) {
        var ifFound = false;
        nodeArrayByHops[nodeArrayByHops.length - i].forEach(function (e) {
          if (ifFound === false) {
            if (e.includes(node)) {
              links.push(e);
              if (e[0] === node) {
                node = e[1];
                ifFound = true;
              } else {
                node = e[0];
                ifFound = true;
              }
              console.log(node);
            }
          }

        })
      }

      console.log(links);

      var linkIndex = [];
      $(origFilteredData[0]).filter(function (i, n) {
        $(links).filter(function (j, m) {
          if (m.includes(n.source) && m.includes(n.target)) {
            linkIndex.push(i);
          }
        });
      });

      console.log(linkIndex);

      $(linkIndex).filter(function (i, n) {
        d3.select(`#link-${n}`).style('stroke', 'red');
      });

    }

  });

// highlights
var highlight = false;
var highlightedNodeID = [];
var highlightedLinkID = [];
d3.select('#highlights-btn')
  .on("click", function () {
    if (selectedNodes.length === 0) {
      alert("Please select at least one node");
    } else {
      highlight = true;
      console.log(selectedNodes);
      highlightedNodeID = [];
      selectedNodes.forEach(function (e) {
        var id = e.split('nodeID')[1];
        highlightedNodeID.push(id);
      })
      console.log(highlightedNodeID);
      highlightedLinkID = [];

      $(graphData[0]).filter(function (i, n) {
        if (highlightedNodeID.includes(n.source.id) && highlightedNodeID.includes(n.target.id)) {
          highlightedLinkID.push(i);
        }
      })
      console.log(highlightedLinkID);

      graphData[1].forEach(function (e) {
        if (highlightedNodeID.includes(e.id) === false) {
          d3.select(`#nodeID${e.id}`).style("opacity", 0.1);
          d3.select(`#labelID${e.id}`).style("display", "none");
        }
      })

      $(graphData[0]).filter(function (i, n) {
        if (highlightedLinkID.includes(i) === false) {
          d3.select(`#link-${i}`).style("opacity", 0.1);
        }
      })
    }

  })

// remove highlights
d3.select('#remove-highlights-btn')
  .on("click", function () {
    // selectedNodes = [];
    // selectedPaths = [];
    // d3.select("#chart-container").selectAll("circle").style("stroke", "#ffffff");
    // d3.select("#chart-container").selectAll("path").style("stroke", "#8c8c8c");
    d3.select("#chart-container").selectAll("circle").style("opacity", 1);
    d3.select("#chart-container").selectAll("path").style("opacity", 1);
    d3.select("#chart-container").selectAll("text").style("display", "block");
    highlight = false;
  })

//capture graph data and send to server
$('#capture-btn').on('click', function (event) {
  console.log(graphData);
  var nodeColorAttributeID = graphData[2];
  var nodeSizeAttributeID = graphData[3];

  var nodePosition = [];
  for (let i = 0; i < graphData[1].length; i++) {
    var node = {};
    node.id = graphData[1][i].id;
    node.x = graphData[1][i].x;
    node.y = graphData[1][i].y;
    nodePosition.push(node);
  }

  var capturedPaths = [];
  var captureNodes = [];

  selectedPaths.forEach(e => capturedPaths.push(e));
  selectedNodes.forEach(e => captureNodes.push(e));

  capturedData = [];
  capturedData = [graphData[0], graphData[1], nodeColorAttributeID, nodeSizeAttributeID, nodePosition, capturedPaths, captureNodes];
  console.log(capturedData);
  $.ajax({
    url: "php/capture.php",
    type: "POST",
    data: {
      linkData: JSON.stringify(capturedData[0]),
      nodeData: JSON.stringify(capturedData[1]),
      nodeColorAttributeID: JSON.stringify(capturedData[2]),
      nodeSizeAttributeID: JSON.stringify(capturedData[3]),
      nodePosition: JSON.stringify(capturedData[4]),
      capturedPaths: JSON.stringify(capturedData[5]),
      captureNodes: JSON.stringify(capturedData[6])
    },
    cache: false,
    success: function (dataResult) {
      var dataResult = JSON.parse(dataResult);
      if (dataResult.statusCode == 200) {
        alert("Succeed");
      } else if (dataResult.statusCode == 201) {
        alert("Error occured!");
      }

    }
  });
  event.preventDefault();
});

//reload graph
d3.select("#reload-btn")
  .on("click", function () {
    var graphId = prompt('Please enter the graph id')
    $.ajax({
      url: 'php/reload.php',
      async: false,
      dataType: 'text',
      type: "POST",
      data: {
        graphId: graphId
      },
      success: function (result) {
        clonedData = [];
        temp = JSON.parse(result);
        console.log(temp);
        for (let i = 0; i < temp.length; i++) {
          clonedData.push(JSON.parse(temp[i].link_data));
          clonedData.push(JSON.parse(temp[i].node_data));
          clonedData.push(JSON.parse(temp[i].nodeColorAttribute));
          clonedData.push(JSON.parse(temp[i].nodeSizeAttribute));
          clonedData.push(JSON.parse(temp[i].nodePosition));
          clonedData.push(JSON.parse(temp[i].capturedPaths));
          clonedData.push(JSON.parse(temp[i].captureNodes));
        }
      },
      error: function () {
        alert("error");
      }
    });
    console.log(clonedData);

    var restoredData = restoreData(clonedData[0], clonedData[1]);
    console.log(restoredData);

    nodeColorAttributeID = clonedData[2];
    nodeSizeAttributeID = clonedData[3];
    nodePosition = clonedData[4];
    console.log(nodePosition);
    removeSvg();
    graphData = update(restoredData[0], restoredData[1], nodeColorAttributeID, nodeSizeAttributeID, nodePosition);

    d3.selectAll("circle").style("stroke", "white");
    d3.selectAll("path").style("stroke", "#8c8c8c");

    for (let i = 0; i < clonedData[5].length; i++) {
      d3.select(`#${clonedData[5][i]}`).style("stroke", "red");
    }

    for (let i = 0; i < clonedData[6].length; i++) {
      d3.select(`#${clonedData[6][i]}`).style("stroke", "red");
    }

    var filterAttributeId = {};
    var tempString = [];
    var tempNumber = [];
    nodeMetadataFilter.forEach(function (e) {

      if (e.attribute_type === 'string') {
        tempString.push(e.attribute_id);
      } else if (e.attribute_type === 'number') {
        tempNumber.push(e.attribute_id);
      }

    })
    filterAttributeId['string'] = tempString;
    filterAttributeId['number'] = tempNumber;
    console.log(filterAttributeId);

    var nodeIdArray = [];
    graphData[1].forEach(function (e) {
      nodeIdArray.push(e.id)
    });

    // console.log(nodeIdArray);

    graphFilterGenerator(filterAttributeId, nodeIdArray);

    graphNavigation();

    openCloseSubmenu();

  });

// if str is numeric
function isNumeric(str) {
  if (typeof str != "string") return false // we only process strings!  
  return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
    !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}

// remove graph
function removeSvg() {
  var graph = d3.select("#chart-container");
  graph.selectAll("svg").remove();
}

// filter data
function filterData() {
  var graphDataset = [
    [],
    []
  ];

  if (entryPointSelection === 'filter') {
    // filter => string
    var attributeIDFilterString = [];
    attributeString.forEach(element => {
      attributeIDFilterString.push(element.attribute_id);
    });

    var filterObj = {};
    attributeIDFilterString.forEach(element => {
      var checkbox = $(`.${element}:checked`).map(function () {
        return $(this).val();
      }).get();
      var attribute_type = [];
      $(attributeString).filter(function (i, n) {
        if (n.attribute_id === element) {
          attribute_type.push(n.attribute_type);
        }
      })

      // console.log(checkbox);
      if (checkbox.length > 0) {
        filterObj[element] = [attribute_type, checkbox];
      }
    });

    // filter => number
    function isEmpty(str) {
      return !str.trim().length;
    }

    var attributeIdFilterNumber = [];
    attributeNumber.forEach(element => {
      attributeIdFilterNumber.push(element.attribute_id);
    });
    // console.log(attributeIdFilterNumber);

    attributeIdFilterNumber.forEach(element => {
      var min = document.getElementById(`${element}_min`).value;
      var max = document.getElementById(`${element}_max`).value;

      var attribute_type = [];
      $(attributeNumber).filter(function (i, n) {
        if (n.attribute_id === element) {
          attribute_type.push(n.attribute_type);
        }
      })

      if (isEmpty(min) === false && isEmpty(max) === false) {
        var minMax = {
          'min': min,
          'max': max
        };
        filterObj[element] = [attribute_type, minMax];
      }
    });
    // console.log(filterObj);

    $.ajax({
      url: "php/filter.php",
      async: false,
      type: "POST",
      data: {
        filterData: JSON.stringify(filterObj)
      },
      cache: false,
      success: function (result) {
        // var dataResult = JSON.parse(dataResult);
        // if (dataResult.statusCode == 200) {
        //     alert("Succeed");
        // } else if (dataResult.statusCode == 201) {
        //     alert("Error occured!");
        // }

        FilteredDataObj = JSON.parse(result);
      }
    });
    // console.log(FilteredDataObj);


    if (Object.keys(filterObj).length === 0) {
      return null;
    }

    var filterAttributeId = {};
    var tempString = [];
    var tempNumber = [];
    nodeMetadataFilter.forEach(function (e) {

      if (e.attribute_type === 'string') {
        tempString.push(e.attribute_id);
      } else if (e.attribute_type === 'number') {
        tempNumber.push(e.attribute_id);
      }

    })
    filterAttributeId['string'] = tempString;
    filterAttributeId['number'] = tempNumber;
    console.log(filterAttributeId);

    var nodeIdArray = [];
    FilteredDataObj['nodeData'].forEach(function (e) {
      nodeIdArray.push(e.id)
    });
    // console.log(nodeIdArray);

    graphFilterGenerator(filterAttributeId, nodeIdArray);


  } else if (entryPointSelection === 'search') {
    var searchTerm = document.getElementById("searchBox").value;
    console.log(searchTerm);
    var attributeIdFilter = [];
    attributeSearch.forEach(e => attributeIdFilter.push(e.attribute_id));
    console.log(attributeIdFilter);

    var checkbox = $('.search_category_other:checked').map(function () {
      return $(this).val();
    }).get();
    console.log(checkbox);

    var entryPointHop = parseInt(document.getElementById("hopBox").value);
    console.log(entryPointHop);

    $.ajax({
      url: "php/search.php",
      async: false,
      type: "POST",
      data: {
        searchTerm: searchTerm,
        checkbox: JSON.stringify(checkbox),
        hops: entryPointHop
      },
      cache: false,
      success: function (result) {
        // var dataResult = JSON.parse(dataResult);
        // if (dataResult.statusCode == 200) {
        //     alert("Succeed");
        // } else if (dataResult.statusCode == 201) {
        //     alert("Error occured!");
        // }

        FilteredDataObj = JSON.parse(result);
      }
    });
    console.log(FilteredDataObj);

    var filterAttributeId = {};
    var tempString = [];
    var tempNumber = [];
    nodeMetadataFilter.forEach(function (e) {
      if (e.attribute_type === 'string') {
        tempString.push(e.attribute_id);
      } else if (e.attribute_type === 'number') {
        tempNumber.push(e.attribute_id);
      }
    })
    filterAttributeId['string'] = tempString;
    filterAttributeId['number'] = tempNumber;
    console.log(filterAttributeId);

    var nodeIdArray = [];
    FilteredDataObj['nodeData'].forEach(function (e) {
      nodeIdArray.push(e.id)
    });
    console.log(nodeIdArray);

    graphFilterGenerator(filterAttributeId, nodeIdArray);
  }

  graphNavigation();

  openCloseSubmenu();

  graphDataset = [FilteredDataObj['linkData'], FilteredDataObj['nodeData']];
  return graphDataset;
}

function graphNavigation() {
  d3.selectAll('.entry-point-filter')
    .style('display', 'none');

  d3.selectAll('.entry-point-search')
    .style('display', 'none');

  d3.selectAll('#show-graph-btn')
    .style('display', 'none');

  d3.selectAll('#entry-point-filter')
    .style('display', 'none');

  d3.selectAll('#entry-point-search')
    .style('display', 'none');

  d3.selectAll('#graph-filer')
    .style('display', 'block');

  d3.selectAll('#graph_filter_btn')
    .style('display', 'block');

  d3.selectAll('#reload-btn')
    .style('display', 'none');

  d3.selectAll('#restart-btn')
    .style('display', 'block');
}


function graphFilterGenerator(filterAttributeId, nodeIdArray) {
  $.ajax({
    url: "php/graph_sidebar.php",
    async: false,
    type: "POST",
    data: {
      filterAttributeId: JSON.stringify(filterAttributeId),
      nodeIdArray: JSON.stringify(nodeIdArray)
    },
    cache: false,
    success: function (result) {
      // var dataResult = JSON.parse(dataResult);
      // if (dataResult.statusCode == 200) {
      //     alert("Succeed");
      // } else if (dataResult.statusCode == 201) {
      //     alert("Error occured!");
      // }

      graphSidebarObj = JSON.parse(result);
    }
  });
  console.log(graphSidebarObj);
  var stringData = graphSidebarObj['uniqueString'];
  var string = [];

  stringData.forEach(function (e) {
    if (string.includes(Object.keys(e)[0]) === false) {
      string.push(Object.keys(e)[0]);
    }
  })
  // console.log(string);
  var graphFilterString = {};
  $(string).filter(function (i, n) {
    var list = [];
    $(stringData).filter(function (i, m) {
      if (n === Object.keys(m)[0]) {
        list.push(Object.values(m)[0]);
      }
    })
    graphFilterString[n] = list;
  })
  console.log(graphFilterString);

  var graphFilterNumber = graphSidebarObj['minMaxNumber'];
  for (let i = 0; i < Object.keys(graphFilterString).length; i++) {
    var attribute_id = Object.keys(graphFilterString)[i];
    var values = Object.values(graphFilterString)[i];
    var attributeName = '';
    nodeMetadataFilter.forEach(function (e) {
      if (e.attribute_id === attribute_id) {
        attributeName = e.attribute_name;
      }
    })
    // console.log(attributeName);

    var main = '<li class="graph_filter">' +
      '<div class="iocn-link">' +
      '<a href="#">' +
      '<i class="bx bx-collection"></i>' +
      '<span class="link_name">' + attributeName + '</span>' +
      '</a>' +
      '<i class="bx bxs-chevron-down arrow"></i>' +
      '</div>' +
      '<ul class="sub-menu">' +
      '<li><a class="link_name" href="#">' + attributeName + '</a></li>' +
      '<li class="checkbox-option">' +
      '<div class="checkbox"><input type="checkbox" class="' + attribute_id + '_graphFilter_all" value="' + 'All' + '" onclick="uncheckOtherCheckboxGraphFilter(this);"></div>' +
      '<a href="#">&nbsp;' + 'All' + '</a>' +
      '</li>';

    var sub = '';
    for (let j = 0; j < values.length; j++) {
      var li = '<li class="checkbox-option">' +
        '<div class="checkbox"><input type="checkbox" class="' + attribute_id + '_graphFilter" value="' + values[j] + '" onclick="uncheckAllGraphFilter(this);"></div>' +
        '<a href="#">&nbsp;' + values[j] + '</a>' +
        '</li>';

      sub = sub + li;
    }
    // console.log(sub);

    html = main + sub + '</ul>' + '</li>';
    // console.log(html);
    $('.nav-links').append(html);
  }


  for (i = 0; i < Object.keys(graphFilterNumber).length; i++) {
    var attribute_id = Object.keys(graphFilterNumber)[i];
    var values = Object.values(graphFilterNumber)[i];
    var attributeName = '';
    nodeMetadataFilter.forEach(function (e) {
      if (e.attribute_id === attribute_id) {
        attributeName = e.attribute_name;
      }
    })

    var min = values.min;
    var max = values.max;
    var html = '<li class="graph_filter">' +
      '<div class="iocn-link">' +
      '<a href="#">' +
      '<i class="bx bx-collection"></i>' +
      '<span class="link_name">' + attributeName + '</span>' +
      '</a>' +
      '<i class="bx bxs-chevron-down arrow"></i>' +
      '</div>' +
      '<ul class="sub-menu">' +
      '<li><a class="link_name" href="#">' + attributeName + '</a></li>' +
      '<li>' +
      '<a href="#">Minimum Value</a>' +
      '<input type="text" class="inputBox" id="' + `${attribute_id}_graphFilter_min` + '" placeholder=' + min + ' />' +
      '</li>' +
      '<li>' +
      '<a href="#">Maximum Value</a>' +
      '<input type="text" class="inputBox" id="' + `${attribute_id}_graphFilter_max` + '" placeholder=' + max + ' />' +
      '</li>' +
      '</ul>' +
      '</li>'

    $('.nav-links').append(html);
  }
}

function graphFilterGeneratorCombo(filterAttributeId, nodeIdArray, comboList, attributeId, nodeIdArray) {
  $.ajax({
    url: "php/graph_sidebar_combo.php",
    async: false,
    type: "POST",
    data: {
      filterAttributeId: JSON.stringify(filterAttributeId),
      nodeIdArray: JSON.stringify(nodeIdArray),
      comboList: JSON.stringify(comboList),
      attributeId: attributeId,
      nodeIdArray: JSON.stringify(nodeIdArray)
    },
    cache: false,
    success: function (result) {
      // var dataResult = JSON.parse(dataResult);
      // if (dataResult.statusCode == 200) {
      //     alert("Succeed");
      // } else if (dataResult.statusCode == 201) {
      //     alert("Error occured!");
      // }

      graphSidebarObj = JSON.parse(result);
    }
  });
  console.log(graphSidebarObj);

  var stringData = graphSidebarObj['uniqueString'];
  var string = [];

  stringData.forEach(function (e) {
    if (string.includes(Object.keys(e)[0]) === false) {
      string.push(Object.keys(e)[0]);
    }
  })
  // console.log(string);
  var graphFilterString = {};
  $(string).filter(function (i, n) {
    var list = [];
    $(stringData).filter(function (i, m) {
      if (n === Object.keys(m)[0]) {
        list.push(Object.values(m)[0]);
      }
    })
    graphFilterString[n] = list;
  })
  console.log(graphFilterString);

  var graphFilterNumber = graphSidebarObj['minMaxNumber'];
  for (let i = 0; i < Object.keys(graphFilterString).length; i++) {
    var attribute_id = Object.keys(graphFilterString)[i];
    var values = Object.values(graphFilterString)[i];
    var attributeName = '';
    nodeMetadataFilter.forEach(function (e) {
      if (e.attribute_id === attribute_id) {
        attributeName = e.attribute_name;
      }
    })
    // console.log(attributeName);

    var main = '<li class="graph_filter_combo">' +
      '<div class="iocn-link">' +
      '<a href="#">' +
      '<i class="bx bx-collection"></i>' +
      '<span class="link_name">' + attributeName + '</span>' +
      '</a>' +
      '<i class="bx bxs-chevron-down arrow"></i>' +
      '</div>' +
      '<ul class="sub-menu">' +
      '<li><a class="link_name" href="#">' + attributeName + '</a></li>' +
      '<li class="checkbox-option">' +
      '<div class="checkbox"><input type="checkbox" class="' + attribute_id + '_graphFilterCombo_all" value="' + 'All' + '" onclick="uncheckOtherCheckboxGraphFilter(this);"></div>' +
      '<a href="#">&nbsp;' + 'All' + '</a>' +
      '</li>';

    var sub = '';
    for (let j = 0; j < values.length; j++) {
      var li = '<li class="checkbox-option">' +
        '<div class="checkbox"><input type="checkbox" class="' + attribute_id + '_graphFilterCombo" value="' + values[j] + '" onclick="uncheckAllGraphFilter(this);"></div>' +
        '<a href="#">&nbsp;' + values[j] + '</a>' +
        '</li>';

      sub = sub + li;
    }
    // console.log(sub);

    html = main + sub + '</ul>' + '</li>';
    // console.log(html);
    $('.nav-links').append(html);
  }


  for (i = 0; i < Object.keys(graphFilterNumber).length; i++) {
    var attribute_id = Object.keys(graphFilterNumber)[i];
    var values = Object.values(graphFilterNumber)[i];
    var attributeName = '';
    nodeMetadataFilter.forEach(function (e) {
      if (e.attribute_id === attribute_id) {
        attributeName = e.attribute_name;
      }
    })

    var min = values.min;
    var max = values.max;
    var html = '<li class="graph_filter_combo">' +
      '<div class="iocn-link">' +
      '<a href="#">' +
      '<i class="bx bx-collection"></i>' +
      '<span class="link_name">' + attributeName + '</span>' +
      '</a>' +
      '<i class="bx bxs-chevron-down arrow"></i>' +
      '</div>' +
      '<ul class="sub-menu">' +
      '<li><a class="link_name" href="#">' + attributeName + '</a></li>' +
      '<li>' +
      '<a href="#">Minimum Value</a>' +
      '<input type="text" class="inputBox" id="' + `${attribute_id}_graphFilterCombo_min` + '" placeholder=' + min + ' />' +
      '</li>' +
      '<li>' +
      '<a href="#">Maximum Value</a>' +
      '<input type="text" class="inputBox" id="' + `${attribute_id}_graphFilterCombo_max` + '" placeholder=' + max + ' />' +
      '</li>' +
      '</ul>' +
      '</li>'

    $('.nav-links').append(html);
  }
}

// show graph
var selectedPaths = [];
var selectedNodes = [];

function update(linkData, nodeData, nodeColorAttributeID, nodeSizeAttributeID, loadNodePosition) {
  $(linkData).filter(function (i, n) {
    $(nodeData).filter(function (i, m) {
      if (n.source === m.id) {
        n.source = m;
      }
      if (n.target === m.id) {
        n.target = m;
      }
    })
  });

  // Compute targetDistance for each link
  for (let i = 0; i < linkData.length; i++) {
    if (linkData[i].targetDistance === -1) continue;
    linkData[i].targetDistance = 0;
    for (let j = i + 1; j < linkData.length; j++) {
      if (linkData[j].targetDistance === -1) continue;
      if (
        linkData[i].target === linkData[j].source &&
        linkData[i].source === linkData[j].target
      ) {
        linkData[i].targetDistance = 1;
        linkData[j].targetDistance = -1;
      }
    }
  }

  $(loadNodePosition).filter(function (i, n) {
    $(nodeData).filter(function (i, m) {
      if (n.id === m.id) {
        m.fx = n.x;
        m.fy = n.y;
      }
    });
  });

  ////////////////////////////////////////////////////////////
  //// Initial Setup /////////////////////////////////////////
  ////////////////////////////////////////////////////////////

  var rect = document.getElementById('chart-container').getBoundingClientRect();

  const width = rect.width;
  const height = 800;

  const nodeRadius = 15;

  const forcePadding = nodeRadius + 10;
  const targetDistanceUnitLength = nodeRadius / 4;

  var color = d3.scaleOrdinal(d3.schemeCategory10);

  // console.log(nodeData)

  ////////////////////////////////////////////////////////////
  //// Render Chart //////////////////////////////////////////
  ////////////////////////////////////////////////////////////

  const chartContainer = d3.select("#chart-container");

  const svg = chartContainer
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .call(d3.zoom().on("zoom", function () {
      svg.attr("transform", d3.event.transform)
    }))
    .append("g");

  // Per-type markers, as they don't inherit styles.
  svg
    .append("defs")
    .selectAll("marker")
    .data(["Directed", "Indirected"])
    .enter()
    .append("marker")
    .attr("id", d => d)
    .attr("markerWidth", 30)
    .attr("markerHeight", 30)
    .attr("refX", 10)
    .attr("refY", 4)
    .attr("orient", "auto")
    .attr("markerUnits", "userSpaceOnUse")
    .append("path")
    .attr("d", "M0,0 L0,8 L8,4 z");

  var thisSelectedPath;

  const linkPath = svg
    // .append("g")
    .selectAll("path")
    .data(linkData)
    .enter()
    .append("path")
    .attr("id", (d, i) => `link-${i}`)
    .attr("class", d => `link ${d.type}`)
    .attr("marker-end", d => `url(#${d.type})`)
    .attr("stroke-width", function (d) {
      // return (d.co_pub / 2);
      return 2;
    })
    .on("click", function (d) {
      thisSelectedPath = this.id;
      if (selectedPaths.includes(thisSelectedPath) === false) {
        selectedPaths.push(thisSelectedPath);
        console.log(selectedPaths);
        // var details = "Source: " + d.source.name + "\n" +
        //   "Target: " + d.target.name;
        // document.getElementById("show_result").innerText = details;
        d3.select(this).style("stroke", "red");
      } else {
        selectedPaths = selectedPaths.filter(e => e !== thisSelectedPath);
        console.log(selectedPaths);
        d3.select(this).style("stroke", "#8c8c8c");
      }

    });
  //.attr("marker-start", d => `url(#${d.type})`)

  /*.text(d => d.type); */
  var thisSelectedNode;
  var multipleMoving = [];

  const nodeCircle = svg
    // .append("g")
    .selectAll("circle")
    .data(nodeData)
    .enter()
    .append("circle")
    .attr("r", function (d) {
      if (isNumeric(d[nodeSizeAttributeID]) === true) {
        d.radius = Math.log10(parseFloat(d[nodeSizeAttributeID])) + nodeRadius;
        // console.log(d[nodeSizeAttributeID]);
      } else {
        d.radius = nodeRadius;
      }
      // d.radius = nodeRadius;
      return d.radius;

    })
    .attr("fill", function (d) {
      // console.log(color(d[nodeColorAttributeID]));
      return color(d[nodeColorAttributeID]);
    })
    .attr("id", function (d) {
      return "nodeID" + d.id;
    })
    .call(
      d3
      .drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended)
    )
    .on("click", function (d) {
      thisSelectedNode = this.id;

      if (d3.event.ctrlKey) {
        if (multipleMoving.includes(thisSelectedNode) === false) {
          multipleMoving.push(thisSelectedNode);
          console.log(multipleMoving);

          d3.select(this).style("stroke", "blue");
        } else {
          multipleMoving = multipleMoving.filter(e => e !== thisSelectedNode);
          console.log(multipleMoving);
          d3.select(this).style("stroke", "white");
        }
      } else {
        if (selectedNodes.includes(thisSelectedNode) === false) {
          selectedNodes.push(thisSelectedNode);
          console.log(selectedNodes);
          // var details = "ID: " + d.id + "\n" +
          //   "Name: " + d.name + "\n" +
          //   "Country: " + d.country + "\n" +
          //   "Sales: " + d.sales + "\n" +
          //   "Employees: " + d.employees;
          // document.getElementById("show_result").innerText = details;
          d3.select(this).style("stroke", "red");
        } else {
          selectedNodes = selectedNodes.filter(e => e !== thisSelectedNode);
          console.log(selectedNodes);
          d3.select(this).style("stroke", "white");
        }
      }
    })
    .on("mouseover", function (d) {
      if (highlight === true) {
        var id = this.id.split("nodeID")[1];
        if (highlightedNodeID.includes(id) === false) {
          d3.select(`#nodeID${id}`).style("opacity", 1);
          d3.select(`#labelID${id}`).style("display", "block");
        }
      }

    })
    .on("mouseout", function (d) {
      if (highlight === true) {
        var id = this.id.split("nodeID")[1];
        if (highlightedNodeID.includes(id) === false) {
          d3.select(`#nodeID${id}`).style("opacity", 0.1);
          d3.select(`#labelID${id}`).style("display", "none");
        }
      }

    });

  const getInitials = (name) => {
    let initials = name.split(' ');

    if (initials.length > 1) {
      initials = initials.shift().charAt(0) + initials.pop().charAt(0);
    } else {
      initials = name.substring(0, 2);
    }

    return initials.toUpperCase();
  };

  // const nodeLabelini = svg
  //     .append("g")
  //     .selectAll("text")
  //     .data(nodeData)
  //     .enter()
  //     .append("text")
  //     .attr("class", "node-label")
  //     .attr("y", ".31em")
  //     .attr("text-anchor", "middle")
  //     .style("font-size", "15px")
  //     .style("font-weight", "bold")
  //     .style("fill", "white")
  //     .text(function (d) {
  //         return getInitials(d.name);
  //     });

  const nodeLabel = svg
    // .append("g")
    .selectAll("text")
    .data(nodeData)
    .enter()
    .append("text")
    .attr("id", function (d) {
      return "labelID" + d.id;
    })
    .attr("class", "node-label")
    .attr("dy", "2.5em")
    // .attr("y", "2.5em")
    .attr("text-anchor", "middle")
    .text(function (d) {
      return d.name;
    });


  // zoom
  //   var zoom_handler = d3.zoom()
  //     .on("zoom", zoom_actions);

  //   zoom_handler(chartContainer);

  //   chartContainer.on("dblclick.zoom", null);

  //   function zoom_actions() {
  //     svg.attr("transform", d3.event.transform)
  //   }

  // simulation
  var simulation = d3
    .forceSimulation()
    .force(
      "link",
      d3
      .forceLink()
      .id(d => d.name)
      .distance(100)
      .links(linkData)
    )
    .force(
      "collide",
      d3
      .forceCollide()
      // .radius(nodeRadius + 10)
      .radius(function (d) {
        // console.log(d.radius);
        return 5 + d.radius;
      })
      .iterations(4)
    )
    .force("charge", d3.forceManyBody().strength(-30))
    .force("center", d3.forceCenter(width / 2, height / 2))
    .on("tick", ticked)
    .nodes(nodeData);

  // Use elliptical arc path segments to doubly-encode directionality.
  function ticked() {
    linkPath
      // .attr(
      //   "d",
      //   d => {
      //     diffX = d.target.x - d.source.x;
      //     diffY = d.target.y - d.source.y;

      //     // Length of path from center of source node to center of target node
      //     pathLength = Math.sqrt((diffX * diffX) + (diffY * diffY));

      //     // x and y distances from center to outside edge of target node
      //     offsetX = (diffX * d.target.radius) / pathLength;
      //     offsetY = (diffY * d.target.radius) / pathLength;

      //     // console.log(d.target.x,d.source.x);

      //     return "M" + d.source.x + "," + d.source.y + "L" + (d.target.x - offsetX) + "," + (d.target.y - offsetY);
      //   }
      //   // d => `M${d.source.x},${d.source.y} L${d.target.x},${d.target.y}`
      // )
      .attr("d", linkArc)
      .attr("transform", d => {
        const translation = calcTranslation(
          d.targetDistance * targetDistanceUnitLength,
          d.source,
          d.target
        );
        d.offsetX = translation.dx;
        d.offsetY = translation.dy;
        return `translate (${d.offsetX}, ${d.offsetY})`;
      });

    nodeCircle
      .attr("cx", function (d) {
        return d.x;
      })
      .attr("cy", function (d) {
        return d.y;
      });

    nodeLabel
      .attr("x", function (d) {
        return d.x;
      })
      .attr("y", function (d) {
        return d.y;
      });

    // nodeCircle.attr("transform", transform);
    // nodeLabel.attr("transform", transform);

    // nodeLabelini.attr("transform", transform);

    // linkLabel.attr("transform", d => {
    //   if (d.target.x < d.source.x) {
    //     return (
    //       "rotate(180," +
    //       ((d.source.x + d.target.x) / 2 + d.offsetX) +
    //       "," +
    //       ((d.source.y + d.target.y) / 2 + d.offsetY) +
    //       ")"
    //     );
    //   } else {
    //     return "rotate(0)";
    //   }
    // });
  }

  function linkArc(d) {
    var sourceX = d.source.x;
    var sourceY = d.source.y;
    var targetX = d.target.x;
    var targetY = d.target.y;

    var theta = Math.atan((targetX - sourceX) / (targetY - sourceY));
    var phi = Math.atan((targetY - sourceY) / (targetX - sourceX));

    var sinTheta = d.source.radius * Math.sin(theta);
    var cosTheta = d.source.radius * Math.cos(theta);
    var sinPhi = d.target.radius * Math.sin(phi);
    var cosPhi = d.target.radius * Math.cos(phi);

    // Set the position of the link's end point at the source node
    // such that it is on the edge closest to the target node
    if (d.target.y > d.source.y) {
      sourceX = sourceX + sinTheta;
      sourceY = sourceY + cosTheta;
    } else {
      sourceX = sourceX - sinTheta;
      sourceY = sourceY - cosTheta;
    }

    // Set the position of the link's end point at the target node
    // such that it is on the edge closest to the source node
    if (d.source.x > d.target.x) {
      targetX = targetX + cosPhi;
      targetY = targetY + sinPhi;
    } else {
      targetX = targetX - cosPhi;
      targetY = targetY - sinPhi;
    }

    // Draw an arc between the two calculated points
    var dx = targetX - sourceX,
      dy = targetY - sourceY,
      dr = 0;
    // dr = Math.sqrt(dx * dx + dy * dy);

    return "M" + sourceX + "," + sourceY + "A" + dr + "," + dr + " 0 0,1 " + targetX + "," + targetY;
  }

  function transform(d) {
    console.log(width, forcePadding);
    d.x =
      d.x <= forcePadding ?
      forcePadding :
      d.x >= width - forcePadding ?
      width - forcePadding :
      d.x;
    d.y =
      d.y <= forcePadding ?
      forcePadding :
      d.y >= height - forcePadding ?
      height - forcePadding :
      d.y;
    return "translate(" + d.x + "," + d.y + ")";
  }

  var nodeFixed = true;
  d3.select('#unfix-nodes-btn').
  on('click', function () {
    nodeFixed = false;
    document.getElementById("fix-nodes-btn").disabled = false;
    document.getElementById("unfix-nodes-btn").disabled = true;
  })

  d3.select('#fix-nodes-btn').
  on('click', function () {
    nodeFixed = true;
    document.getElementById("unfix-nodes-btn").disabled = false;
    document.getElementById("fix-nodes-btn").disabled = true;
  })

  // drag fucntion
  function dragstarted(d) {

    if (nodeFixed === true) {
      $(nodeData).filter(function (i, n) {
        n.fx = n.x;
        n.fy = n.y;
      });
    } else {
      $(nodeData).filter(function (i, n) {
        n.fx = null;
        n.fy = null;
      });
    }

    if (!d3.event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;

  }

  function dragged(d) {

    var changeX = d.fx - d3.event.x;
    var changeY = d.fy - d3.event.y;

    d.fx = d3.event.x;
    d.fy = d3.event.y;

    // multiple nodes moving
    var multipleMovingNodeId = [];
    multipleMoving.forEach(e => multipleMovingNodeId.push(e.toString().split("nodeID")[1]));

    if (nodeFixed === true) {
      $(nodeData).filter(function (i, n) {
        $(multipleMovingNodeId).filter(function (i, m) {

          if (multipleMovingNodeId.includes(d.id) && n.id === m) {
            if (n.id != d.id) {
              n.fx = n.fx - changeX;
              n.fy = n.fy - changeY;
            }
          }
        })
      });
    }
  }

  function dragended(d) {
    if (!d3.event.active) simulation.alphaTarget(0);

    if (nodeFixed === true) {
      d.fx = d.x;
      d.fy = d.y;
    } else {
      // d.fx = null;
      // d.fy = null;
      $(nodeData).filter(function (i, n) {
        n.fx = n.x;
        n.fy = n.y;
      });
    }
  }

  // https://bl.ocks.org/ramtob/3658a11845a89c4742d62d32afce3160
  /**
   * @param {number} targetDistance
   * @param {x,y} point0
   * @param {x,y} point1, two points that define a line segmemt
   * @returns
   * a translation {dx,dy} from the given line segment, such that the distance
   * between the given line segment and the translated line segment equals
   * targetDistance
   */
  function calcTranslation(targetDistance, point0, point1) {
    var x1_x0 = point1.x - point0.x,
      y1_y0 = point1.y - point0.y,
      x2_x0,
      y2_y0;
    if (y1_y0 === 0) {
      x2_x0 = 0;
      y2_y0 = targetDistance;
    } else {
      var angle = Math.atan(x1_x0 / y1_y0);
      x2_x0 = -targetDistance * Math.cos(angle); // cluster
      y2_y0 = targetDistance * Math.sin(angle);
    }
    return {
      dx: x2_x0,
      dy: y2_y0
    };
  }

  return [linkData, nodeData, nodeColorAttributeID, nodeSizeAttributeID];
}

//convert data back to original format
function restoreData(oldLinkData, oldNodeData) {
  oldLinkData.forEach(function (e) {
    e.source = e.source.id;
    e.target = e.target.id;
    delete e.index;
    delete e.offsetX;
    delete e.offsetY;
    delete e.targetDistance;
  })

  oldNodeData.forEach(function (e) {
    delete e.fx;
    delete e.fy;
    delete e.x;
    delete e.y;
    delete e.vx;
    delete e.vy;
    delete e.index;
  })

  return [oldLinkData, oldNodeData];
}

//convert data back to original format with position
function restoreDataWithPosition(oldLinkData, oldNodeData) {
  var newLinkData = [];
  for (let i = 0; i < oldLinkData.length; i++) {
    var temp = {};

    temp.source = oldLinkData[i].source.id;
    temp.target = oldLinkData[i].target.id;

    newLinkData.push(temp);
  }

  var newNodeData = [];
  for (let i = 0; i < oldNodeData.length; i++) {
    var temp = {};

    temp.id = oldNodeData[i].id;
    temp.name = oldNodeData[i].name;

    newNodeData.push(temp);
  }

  return [newLinkData, newNodeData];
}