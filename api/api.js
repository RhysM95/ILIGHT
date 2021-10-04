const mongoose = require('mongoose');
const express = require('express');
const Light = require('./models/light'); 
const User = require('./models/user'); 

mongoose.connect("mongodb+srv://mcmillanr:deakin@sit314.nhrog.mongodb.net/sit314", { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = process.env.PORT || 5000;

app.use(express.static('public'));
app.use(function(req, res, next) 
{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-RequestedWith, Content-Type, Accept");
    next();
});

app.use(express.static(`${__dirname}/public`));

app.listen(port, () =>
{
    console.log(`listening on port ${port}`);
});


app.get('/docs', (req, res) => 
{
    res.sendFile(`${__dirname}/public/generated-docs/index.html`);
});


app.get('/api/test', (req, res) => 
{
    res.send('The API is working!');
});

app.get('/api/users/:user/lights', (req, res) => 
{
    const { user } = req.params;
    Light.find({ "user": user }, (err, lights) => 
    {
        return err ? res.send(err): res.send(lights);
    });
});

app.get('/api/lights', (req, res) => 
{
    Light.find({}, (err, lights) => 
    {
        if (err == true) 
        {
            return res.send(err);
        }
        else 
        {
            return res.send(lights);
        }
    });
});

app.get('/api/lights/:lightId/light-history', (req, res) => 
{
    const { lightId } = req.params;
    Light.findOne({"_id": lightId }, (err, lights) => 
    {
        const { lightData } = lights;
        return err ? res.send(err): res.send(lightData);
    });
});

app.post('/api/lights', (req, res) => 
{
    const { location, user, lightData } = req.body;
    const newlight = new Light(
    {
        location,
        user,
        lightData
        // volts,
        // light,
        // status,
    });
    newlight.save(err => 
    {
        return err? res.send(err): res.send('successfully added Light and data');
    });
});

app.post('/api/authenticate', (req, res) => 
{
    const { name, password } = req.body;
    User.findOne({name}, (err, users) =>
    {
        if(err)
        {
            return res.send(err);
        }
        else if(!users)
        {   
            return res.send("User does not exist");
        }
        else if(users.password != password)
        {
            return res.send("Password incorrect");
        }
        else
        {
            return res.json(
            {
                success: true,
                message: 'Authenticated successfully',
            });      
        }
    });
});

app.post('/api/registration', (req, res) => 
{
    const { name, password } = req.body;
    User.findOne({name}, (err, users) =>
    {
        if(err)
        {
            return res.send(err);
        }
        else if(users)
        {
            return res.send("User already exists");
        }
        else
        {
            const newUser = new User(
            {
                name,
                password,
            });

            newUser.save(err => 
            {
                return err ? res.send(err): res.json(
                {
                    success: true,
                    message: 'Created new user'
                });
            });     
        }
    });
});