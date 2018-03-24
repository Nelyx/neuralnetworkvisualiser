var nn;


var res = 20;
var cols, rows;

function setup() {
  createCanvas(800,400);
  nn = new NeuralNetwork(2,4,1);
  cols = width / 2 / res;
  rows = height / res;
}

function draw() {

}