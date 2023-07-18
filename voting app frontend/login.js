

async function login(e){
    try {
        e.preventDefault();
        const userLoginDetails = {
        email: e.target.email.value,
        password: e.target.password.value
        }
     console.log(userLoginDetails);
     const response = await axios.post('http://localhost:3000/user/login', userLoginDetails);

     if(response.status === 200){
       alert(response.data.message);
        localStorage.setItem('token', response.data.token);
        const token = localStorage.getItem('token');
        const decodedToken = parseJwt(token);
        if(decodedToken.hasVoted === true){
            window.location.href = 'alreadyVoted.html';
        }
        else if(response.data.isAdmin === true){
            window.location.href = 'admin.html';
        }
        else{
            window.location.href = 'vote.html';
        }
     }
    }
    catch(err){
        console.log(err);
    }
}

function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}