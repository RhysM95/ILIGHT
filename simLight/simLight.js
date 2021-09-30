const { URL, UNAME, PASSWORD } = process.env;

const mqtt = require('mqtt');
const express = require('express');
const readline = require('readline');
const Math = require('mathjs');

const client = mqtt.connect("mqtt://broker.hivemq.com:1883");

var lightData = {id: 0, data:{volts:0, light:0, status:0, time:0}};

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout

});

var lightID;
rl.question(">>What is the Light ID?  ", function(answer) {
   lightID = answer;
   lightData.id = lightID;
   rl.close();
   connectMQTT();
   setInterval(sendData, 10000)
});

function sendData() {
	const topic = `/ILIGHT/${lighttID}/`;

	lightData.data.time = Date.now();
	lightData.data.volts = randomSensorValue(12.1, 15.5);
	lightData.data.light = randomSensorValue(0, 2000);
	lightData.data.status = randomSensorValue(0, 1);
	console.log("Sending to topic: " + topic);
	console.log("Data: " + JSON.stringify(lightData));
	client.publish(topic, JSON.stringify(lightData), () => {
		console.log('published new message topic');
	});
}

function connectMQTT(){
	client.on('connect', () => {
	    console.log('mqtt connected');
	});
}

function randomSensorValue(low, hi){
	return Math.floor(Math.random(low, hi));
}
