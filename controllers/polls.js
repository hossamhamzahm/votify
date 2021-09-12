const Poll = require('../modules/polls');


module.exports.createPoll = async(req, res) => {
    req.body.poll["multi-opt"] = req.body.poll["multi-opt"] ? true : false;
    req.body.poll["add-opt"] = req.body.poll["add-opt"] ? true : false;
    const poll = new Poll(req.body.poll);
    await poll.save();
    res.send(poll);
};