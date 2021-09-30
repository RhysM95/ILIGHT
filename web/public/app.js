$('#navbar').load('navbar.html');
$('#footer').load('footer.html');

const MQTT_URL = 'http://localhost:5001/system-control';
const API_URL = 'http://localhost:5000/api';

const currentUser = localStorage.getItem('name');

if(currentUser == "admin")
{
    $.get(`${API_URL}/lights`).then(response =>
    {

        response.forEach(light =>
        {
            end = light.lightData.length -1

            $('#lights tbody').append(`
            <tr> 
            <td>${light.user}</td>
            <td>${light.name}</td>
            <td>${light.lightData[end].volts + 'V'}</td>
            <td>${light.lightData[end].light + ' LUX'}</td>
            <td>${light.lightData[end].status}</td>
            </tr>
            `);
        });
               
    }).catch(error =>
    {
        console.error(`Error: ${error}`);
    });
}

else if (currentUser)
{
    $.get(`${API_URL}/users/${currentUser}/lights`).then(response => 
    {
        response.forEach((light) => 
        {
            end = light.lightData.length -1

            $('#lights tbody').append(`
            <tr data-light-id=${light._id}>
            <td>${light.user}</td>
            <td>${light.name}</td>
            <td>${light.lightData[end].volts + 'V'}</td>
            <td>${light.lightData[end].light + ' LUX'}</td>
            <td>${light.lightData[end].status}</td>
            </tr>
            `);
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

$('#add-light').on('click', () => 
{
    const name = $('#name').val();
    const user = $('#user').val();
    const lightData = [];

    const body = 
    {
        name,
        user,
        lightData
    };

    $.post(`${API_URL}/lights`, body).then(response => 
    {
        location.href = '/';
    }).catch(error => 
    {
        console.error(`Error: ${error}`);
    });
});

$('#system-control').on('click', function()
{
    const command = $('#command').val();
    const lightID = $('#lightID').val();
    $.post(`${MQTT_URL}/system-control`, { command, lightID });
});

$('#register').on('click', () =>
{
    const name = $('#username').val();
    const password = $('#password').val();
    const confirm = $('#confirm').val();

    if (password != confirm)
    {
        $('#alert').append(`<p class="alert alert-danger">Passwords do not match</p>`);
    }
    else
    {
        $.post(`${API_URL}/registration`, { name, password }).then((response) =>
        {
            if (response.success) 
            {
                location.href = '/login';
            } 
            else 
            {
                $('#alert').append(`<p class="alert alert-danger">${response}</p>`); 
            }
        });
    }
});

$('#login').on('click', () => 
{
    const username = $('#username').val();
    const password = $('#password').val();
    $.post(`${API_URL}/authenticate`, { "name": username, password }).then((response) =>
    {
        if (response.success) 
        {
            localStorage.setItem('name', username);
            localStorage.setItem('isAuthenticated', true);
            location.href = '/light-data';
        } 
        else 
        {
            $('#message').append(`<p class="alert alert-danger">${response}</p>`);
        }
    });
});

const logout = () => 
{
    localStorage.removeItem('name');
    localStorage.removeItem('isAuthenticated');   
    location.href = '/login';
}  