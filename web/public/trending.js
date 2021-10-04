if(currentUser == "admin")
{
    $.get(`${API_URL}/lights`).then(response =>
    {
        const lightID = [];
        const voltArray  = [];
        const lightArray = [];
        var labelArray = [];
        var increment = 0;      //900000

        for (var i = 0; i < 8; i++){
            labelArray.push(formatted_time(new Date(Date.now() - increment)));
            increment += 900000;
        }

        response.forEach(light =>
        {
            
            if (lightID.indexOf(light.id, 0) == -1) lightID.push(light.id)
            const pvoltArray  = [0,0,0,0,0,0,0,0];
            const plightArray = [0,0,0,0,0,0,0,0];
            const countArray = [0,0,0,0,0,0,0,0];
            const sumVoltArray = [0,0,0,0,0,0,0,0];
            const sumLightArray = [0,0,0,0,0,0,0,0];

            for (var i = 0; i < light.lightData.length; i++){
                if(light.lightData[i].time > (Date.now() - 900000)){ 
                    //21600000 milli in 6 hours
                    //900000 milli in 15min

                    countArray[0]++;
                    sumVoltArray[0]+= light.lightData[i].volts;
                    sumLightArray[0]+= light.lightData[i].lux;
                   
                }else if (light.lightData[i].time > (Date.now() - 1800000)){
                    countArray[1]++;
                    sumVoltArray[1]+= light.lightData[i].volts;
                    sumLightArray[1]+= light.lightData[i].lux;

                } else if (light.lightData[i].time > (Date.now() - 2400000)){
                    countArray[2]++;
                    sumVoltArray[2]+= light.lightData[i].volts;
                    sumLightArray[2]+= light.lightData[i].lux;
                } else if (light.lightData[i].time > (Date.now() - 3000000)){
                    countArray[3]++;
                    sumVoltArray[3]+= light.lightData[i].volts;
                    sumLightArray[3]+= light.lightData[i].lux;
                } else if (light.lightData[i].time > (Date.now() - 3600000)){
                    countArray[4]++;
                    sumVoltArray[4]+= light.lightData[i].volts;
                    sumLightArray[4]+= light.lightData[i].lux;
                } else if (light.lightData[i].time > (Date.now() - 4200000)){
                    countArray[5]++;
                    sumVoltArray[5]+= light.lightData[i].volts;
                    sumLightArray[5]+= light.lightData[i].lux;
                } else if (light.lightData[i].time > (Date.now() - 4800000)){
                    countArray[6]++;
                    sumVoltArray[6]+= light.lightData[i].volts;
                    sumLightArray[6]+= light.lightData[i].lux;
                } else if (light.lightData[i].time > (Date.now() - 5400000)){
                    countArray[7]++;
                    sumVoltArray[7]+= light.lightData[i].volts;
                    sumLightArray[7]+= light.lightData[i].lux;
                }
                console.log(countArray);

                for (var j = 0; j < countArray.length; j++){
                    pvoltArray[j] = sumVoltArray[j]/countArray[j];
                    plightArray[j] = sumLightArray[j]/countArray[j];
                }

                voltArray.push(pvoltArray);
                lightArray.push(plightArray);
            }
        });
        
        new Chartist.Line('#chart1', {
            labels: labelArray,
            series: voltArray
        }, {
            low: 10,
            showArea: false
        });

        // new Chartist.Line('#chart2', {
        //     labels: labelArray,
        //     series: lightArray
        // }, {
        //     low: 0,
        //     showArea: false
        // });

        new Chartist.Line('#chart3', {
            labels: labelArray,
            series: lightArray
        }, {
            low: 0,
            showArea: false
        });

        // new Chartist.Line('#chart4', {
        //     labels: labelArray,
        //     series: moistureArray
        // }, {
        //     low: 0,
        //     showArea: false
        // });
    }).catch(error =>
    {
        console.error(`Error: ${error}`);
    });
}
else if (currentUser)
{
    $.get(`${API_URL}/users/${currentUser}/plants`).then(response => 
    {
        response.forEach((plant) => 
        {
            //
        });
        
    }).catch(error => 
    {
        console.error(`Error: ${error}`);
    });
}
else 
{
    const path = window.location.pathname;
    if (path !== '/login' && path !== '/registration') 
    {
        location.href = '/login';
    }
}
function formatted_time(d)
{
   return (d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds());
}

function addData(value){
    
}
