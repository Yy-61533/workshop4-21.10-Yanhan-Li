const Node = require("../node");
const Cluster = require("../cluster");
const Simulator = require("../simulator");
const Network = require("../network");

const a = new Node("A");
const b = new Node("B");
const c = new Node("C");

// Elect B as leader
const cluster = new Cluster([a, b, c]);
const simulator = new Simulator(cluster, new Network());

simulator.electLeader(b);

console.log("====================");
console.log("HEARTBEATS");
console.log("====================");
console.log("Leader sending heartbeats to maintain authority...");

simulator.heartbeat();
simulator.heartbeat();
simulator.heartbeat();

console.log("LESSON:");
console.log("Heartbeats maintain leadership without transferring data.");