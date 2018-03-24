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