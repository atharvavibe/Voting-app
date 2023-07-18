const Vote = require('../model/vote');
const User = require('../model/user');
const sequelize = require('../util/database');

exports.vote = async (req, res) => {
  try {
    if(!req.user.hasVoted){
      //console.log(req.body);
      const vote = req.body.option;
      // console.log(req.user.id);
      const candidateVote = await Vote.create({candidate: vote});
      const user = await User.update({hasVoted: true}, {where: {id: req.user.id}});
      const updatedUser = await User.findOne({where: {id: req.user.id}});
      console.log(user);
      return res.status(200).json({success: true, message: "Successfully Voted!", user, candidateVote, updatedUser })
    }
  } catch (error) {
    console.log(error);
  }
}

exports.getVotes = async (req, res) => {
  try {
    console.log(req.user);
    const votesArray = []
    const voteCounts = await Vote.findAll({
        attributes: ['candidate', [sequelize.fn('COUNT', sequelize.col('candidate')), 'votes']],
        group: ['candidate'],
        order: [[sequelize.col('candidate')]]

      });

      for(let i=0; i<voteCounts.length; i++){
        votesArray.push(voteCounts[i].dataValues);
      }
      return res.status(200).json({success: true, message: "Admin data", votes: votesArray});
  } catch (error) {
    console.log(error);
  }
}
