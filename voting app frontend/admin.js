const candidate1Votes = document.getElementById('candidate1Votes');
const candidate2Votes = document.getElementById('candidate2Votes');
const candidate3Votes = document.getElementById('candidate3Votes');
const candidate4Votes = document.getElementById('candidate4Votes');

window.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('token');
    const response = await axios.get('http://localhost:3000/user/admin',{headers: {"Authorization" : token}});
    console.log(response.data.votes);
    displayVotes(response.data.votes);
});

function displayVotes(votes){
    candidate1Votes.innerHTML = `Candidate 1 : ${votes[0].votes}`;
    candidate2Votes.innerHTML = `Candidate 2 : ${votes[1].votes}`;
    candidate3Votes.innerHTML = `Candidate 3 : ${votes[2].votes}`;
    candidate4Votes.innerHTML = `Candidate 4 : ${votes[3].votes}`;
}