 async function signup(e){
    try{
        e.preventDefault();
        const userSignupDetails = {
            username: e.target.username.value,
            password: e.target.password.value,
            email: e.target.email.value,
            phonenumber: e.target.phonenumber.value
        }

       console.log(userSignupDetails);
       const response = await axios.post('http://localhost:3000/user/signup', userSignupDetails);
       if(response.status === 200){
        window.location.href = 'login.html';
       }
    }
    catch(err){
        console.log(err);
    }
}