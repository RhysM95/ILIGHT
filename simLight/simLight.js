const { URL, UNAME, PASSWORD } = process.env;

const mqtt = require('mqtt');
const express = require('express');
const readline = require('readline');
const Math = require('mathjs');

const client = mqtt.connect("mqtt://broker.hivemq.com:1883");

var lightData = {id: 0, data:{volts:0, lux:0, status:0, time:0}};

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
	const topic = `/ILIGHT/${lightID}/`;

	lightData.data.time = Date.now();
	lightData.data.volts = randomSensorValue(12, 16, 1);
	lightData.data.lux = randomSensorValue(0, 2000, 0);
	lightData.data.status = statusValue(0, 2, 0)
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

function randomSensorValue(min, max, decimalPlaces) {  
    var rand = Math.random()*(max-min) + min;
    var power = Math.pow(10, decimalPlaces);
    return Math.floor(rand*power) / power;
}

function statusValue(min, max, decimalPlaces) {  
    var rand = Math.random()*(max-min) + min;
    var power = Math.pow(10, decimalPlaces);
    var temp =  Math.floor(rand*power) / power;
	if (temp == 1) return "ON";
	else return "OFF";
}