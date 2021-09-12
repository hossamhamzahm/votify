const Poll = require('../modules/polls');


module.exports.createPoll = async(req, res) => {
    req.body.poll["multi_opt"] = req.body.poll["multi_opt"] ? true : false;
    req.body.poll["add_opt"] = req.body.poll["add_opt"] ? true : false;

    req.body.poll.opts.forEach((opt, idx)=>{
        req.body.poll.opts[idx] = {
            val: opt,
            num_of_votes: 0
        };
    })
    req.body.poll.total_num = 0;
    const poll = new Poll(req.body.poll);
    await poll.save().
    then(() => res.send(poll)).
    catch((E) => console.log(E, poll));
    console.log(poll)
    console.log(req.body.poll)
};