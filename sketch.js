var nn;

var training_data_or = [
  { inputs : [0,0], outputs: [0]},
  { inputs : [0,1], outputs: [1]},
  { inputs : [1,0], outputs: [1]},
  { inputs : [1,1], outputs: [1]},
];

var training_data_and = [
  { inputs : [0,0], outputs: [0]},
  { inputs : [0,1], outputs: [0]},
  { inputs : [1,0], outputs: [0]},
  { inputs : [1,1], outputs: [1]},
];

var training_data_xor = [
  { inputs : [0,0], outputs: [0]},
  { inputs : [0,1], outputs: [1]},
  { inputs : [1,0], outputs: [1]},
  { inputs : [1,1], outputs: [0]},
];


var res = 20;
var cols, rows;

function setup() {
  createCanvas(800,400);
  nn = new NeuralNetwork(2,4,1);
  cols = width / 2 / res;
  rows = height / res;
}

function draw() {
  var training_data = training_data_xor;

  for (var i = 0; i < 1000; i++) {
    var data = random(training_data);
    nn.train(data.inputs, data.outputs);
  }

  background(127);
  //draw the nodes
  drawNodes(nn.input_nodes, 1, 'rgb(255,100,150)', 20);
  drawNodes(nn.hidden_nodes, 2, 'rgb(100,150,255)', 20);
  drawNodes(nn.output_nodes, 3, 'rgb(100,255,150)', 20);


    //output the current probability space.
    for (var j = 0; j < rows; j++) {
      for (var i = 0; i < cols; i++) {
      
        var input1 = i/cols;
        var input2 = j/rows;
        var output = nn.predict([input1, input2]);
        fill(output * 255);
        rect((width / 2) + i * res, j * res, res, res);
      }
    }  
}


function drawNodes(node_count, layer, colour, r, data) {
  for (var n = 0; n < node_count; n++) {
    var coords = getCoords(node_count, n, layer);
    fill(colour);
    ellipse(coords.x, coords.y ,r,r);
  }
}

function getCoords(node_count, node, layer){
  //input columns should be 1/4 into the last half of the canvas.
  var x = width / 8 * layer;
  var y = (height / (node_count+1)) * (node+1)
  return {x: x, y: y};
}