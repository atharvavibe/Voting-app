var form = document.getElementById("myform");

window.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    const decodedToken = parseJwt(token);
    if(decodedToken.hasVoted === true){
        window.location.href = 'alreadyVoted.html';
    }
})

function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}
form.addEventListener("submit", async function(event){
    event.preventDefault();
    const token = localStorage.getItem('token');
    var selectedOption = document.querySelector('input[name="vote"]:checked');
    console.log(selectedOption.value);
    const vote = {
        option: selectedOption.value
    }
    if(selectedOption){
        const response = await axios.post('http://localhost:3000/user/vote',vote,{headers: {"Authorization" : token}});
        console.log(response);
        if(response.data.updatedUser.hasVoted){
            window.location.href = 'alreadyVoted.html';
        }
    }else{
        console.log("select an option");
    }
})