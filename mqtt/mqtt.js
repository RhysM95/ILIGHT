const mqtt = require('mqtt');
const express = require('express');
const mongoose = require('mongoose');
const Light = require('./models/light'); 
const client = mqtt.connect("mqtt://broker.hivemq.com:1883");
const app = express();
const port = process.env.PORT || 5001;

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.static('public'));
app.use(express.static(`${__dirname}/public/generated-docs`));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => 
{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-RequestedWith, Content-Type, Accept");
    next();
});

client.on('connect', () => 
{
    client.subscribe('/ILIGHT/0/');
    client.subscribe('/ILIGHT/1/');
    client.subscribe('/ILIGHT/2/');
    client.subscribe('/ILIGHT/3/');
    client.subscribe('/ILIGHT/4/');
    client.subscribe('/ILIGHT/5/');
    client.subscribe('/ILIGHT/6/');
    client.subscribe('/ILIGHT/7/');
    client.subscribe('/ILIGHT/8/');
    client.subscribe('/ILIGHT/9/');
    client.subscribe('/ILIGHT/10/');
    console.log('mqtt connected');
});

client.on('message', (topic, message) => 
{
    console.log(`Received message on ${topic}: ${message}`);

    const data = JSON.parse(message);
    Light.findOne({"id": data.id }, (err, light) => 
    {
        if (err) 
        {
            console.log(err)
        }

        const { lightData } = light;
        const {volts, lux, status, time } = data.data;
        lightData.push({ volts, lux, status, time });
        console.log(light.lightData.status);
        light.save(err => 
        {
            if (err) 
            {
                console.log(err)
            }
        });
    });
});

app.get('/docs', (req, res) => 
{
    res.sendFile(`${__dirname}/public/generated-docs/index.html`);
});

app.post('/send-command', (req, res) => 
{
    const { lightId, command } = req.body;
    const topic = `/myid/command/${lightId}`;
    client.publish(topic, command, () => 
    {
        res.send('published new message');
    });
});
   
app.listen(port, () => 
{
    console.log(`listening on port ${port}`);
});
