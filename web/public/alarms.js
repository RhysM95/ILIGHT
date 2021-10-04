// const lightHi = 12000;
// const lightLo = 5000;
// const voltHi = 50;
// const voltLo = 20;

// const currentUser = localStorage.getItem('name');

// if(currentUser == "admin")
// {
//     $.get(`${API_URL}/lights`).then(response =>
//     {
//         response.forEach(light =>
//         {
//             end = light.lightData.length -1
            
//             $('#alarms tbody').append(`
//             <tr> 
//             <td>${light.user}</td>
//             <td>${light.name}</td>
//             <td>${light.lightData[end].volt + '°'}</td>
//             <td>${light.lightData[end].light + ' LUX'}</td>
//             </tr>
//             `);
//         });
               
//     }).catch(error =>
//     {
//         console.error(`Error: ${error}`);
//     });
// }

// else if (currentUser)
// {
//     $.get(`${API_URL}/users/${currentUser}/lights`).then(response => 
//     {
//         response.forEach((light) => 
//         {
//             end = light.lightData.length -1

//             $('#lights tbody').append(`
//             <tr data-light-id=${light._id}>
//             <td>${light.user}</td>
//             <td>${light.name}</td>
//             <td>${light.lightData[end].volt + 'V'}</td>
//             <td>${light.lightData[end].light + ' LUX'}</td>

//             </tr>
//             `);
//         });
        
//     }).catch(error => 
//     {
//         console.error(`Error: ${error}`);
//     });
// }

//     light_al(lightLo, lightHi);
//     volt_al(voltLo, voltHi);


// function light_al(lo, hi) 
// {
//     light_lo = false;
//     light_hi = false;
//     if (light.lightData[light.lightData.length -1].light <= lo)
//     {
//         light_lo = true;
//     };
//     if (light.lightData[light.lightData.length -1].light >= hi)
//     {
//         light_hi = true;
//     };
// }

// function volt_al(lo, hi) 
// {
//     volt_lo = false;
//     volt_hi = false;
//     if (light.lightData[light.lightData.length -1].volt <= lo)
//     {
//         volt_lo = true;
//     };
//     if (lightData.data[light.lightData.length -1].volt >= hi)
//     {
//         volt_hi = true;
//     };
// }