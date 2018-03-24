var nn;

var training_data_or = {
  name: "OR Training Data",
  inputs: 2,
  outputs: 1,
  data: [
    { inputs : [0,0], outputs: [0]},
    { inputs : [0,1], outputs: [1]},
    { inputs : [1,0], outputs: [1]},
    { inputs : [1,1], outputs: [1]},
  ]
}
;

var training_data_and = {
  name: "AND Training Data",
  inputs: 2,
  outputs: 1,
  data: [
  { inputs : [0,0], outputs: [0]},
  { inputs : [0,1], outputs: [0]},
  { inputs : [1,0], outputs: [0]},
  { inputs : [1,1], outputs: [1]},
  ]
};

var training_data_xor = {
  name: "XOR Training Data",
  inputs: 2,
  outputs: 1,
  data: [
  { inputs : [0,0], outputs: [0]},
  { inputs : [0,1], outputs: [1]},
  { inputs : [1,0], outputs: [1]},
  { inputs : [1,1], outputs: [0]},
  ]
};


var training_data_xor = {
  name: "XOR Training Data",
  inputs: 2,
  outputs: 1,
  data: [
  { inputs : [0,0], outputs: [0]},
  { inputs : [0,1], outputs: [1]},
  { inputs : [1,0], outputs: [1]},
  { inputs : [1,1], outputs: [0]},
  ]
};

var training_data_xor = {
  name: "XOR Training Data",
  inputs: 2,
  outputs: 1,
  data: [
  { inputs : [0,0], outputs: [0]},
  { inputs : [0,1], outputs: [1]},
  { inputs : [1,0], outputs: [1]},
  { inputs : [1,1], outputs: [0]},
  ]
};

var training_data_rot = {
  name: "Weird Rotate Training Data",
  inputs: 2,
  outputs: 2,
  data: [
  { inputs : [0,0], outputs: [0,0]},
  { inputs : [0,1], outputs: [1,0]},
  { inputs : [1,0], outputs: [0,1]},
  { inputs : [1,1], outputs: [1,1]},
  ]
};

var training_data_roter = {
  name: "Weirder Rotate Training Data",
  inputs: 2,
  outputs: 3,
  data: [
  { inputs : [0,0],     outputs: [0,0,0]},
  { inputs : [0,1],     outputs: [1,0,0]},
  { inputs : [0.5,0.5], outputs: [0,1,0]},
  { inputs : [1,0],     outputs: [0,0,0]},
  { inputs : [1,1],     outputs: [1,1,0]},
  ]
};



var res = 20;
var cols, rows;
var training_data;
var hidden_nodes =5;

function setup() {
  training_data = training_data_xor;

  console.log(training_data.name);
  nn = new NeuralNetwork(
    training_data.inputs, 
    hidden_nodes, 
    training_data.outputs);
  
  
  createCanvas(800,400);
  cols = width / 2 / res;
  rows = height / res;
}

function draw() {


  for (var i = 0; i < 1000; i++) {
    //training_data.data.forEach(e => nn.train(e.inputs, e.outputs));
    var e = random(training_data.data);
    nn.train(e.inputs, e.outputs)
  }

  background(127);

  //draw the weights
  drawWeights(nn.input_nodes, nn.hidden_nodes, 1, 2, nn.weights_ih.data);
  drawWeights(nn.hidden_nodes, nn.output_nodes, 2, 3, nn.weights_ho.data);
  stroke(0);
  //draw the nodes
  drawNodes(nn.input_nodes, 1, 'rgb(255,100,150)', 20, [10,10]);
  drawNodes(nn.hidden_nodes, 2, 'rgb(100,150,255)', 20, nn.bias_h.data);
  drawNodes(nn.output_nodes, 3, 'rgb(100,255,150)', 20, nn.bias_o.data);


    //output the current probability space.
    for (var j = 0; j < rows; j++) {
      for (var i = 0; i < cols; i++) {
      
        var input1 = i/cols;
        var input2 = j/rows;
        var output = nn.predict([input1, input2]);
        var r = output[0] * 255;
        var g = output[1] * 255 || r;
        var b = output[2] * 255 || r;
        fill(r,g,b);
        rect((width / 2) + i * res, j * res, res, res);
      }
    }  
}

function drawWeights(nodes1, nodes2, l1, l2, data) {
  //console.table(data);
  for (var i = 0; i < nodes1; i++) {
    for (var j = 0; j < nodes2; j++){
      var orig = getCoords(nodes1, i, l1);
      var dest = getCoords(nodes2, j, l2);
      var weight = data[j][i];

      var width = map(abs(weight),0,20,1,5);
      var red = map(weight,0,-20,100,255);
      var green = map(weight,0,20,100,255); 
      stroke(red, green, 100);
      strokeWeight(width);
      line(orig.x, orig.y, dest.x, dest.y);
    }
  }
  strokeWeight(1);
}

function drawNodes(node_count, layer, colour, r, data) {
  for (var n = 0; n < node_count; n++) {
    var coords = getCoords(node_count, n, layer);
    var size = r * map(data[n], -20,20,0,2);
    fill(colour);
    ellipse(coords.x, coords.y ,size,size);
  }
}

function getCoords(node_count, node, layer){
  //input columns should be 1/4 into the first half of the canvas.
  var x = width / 8 * layer;
  var y = (height / (node_count+1)) * (node+1)
  return {x: x, y: y};
}