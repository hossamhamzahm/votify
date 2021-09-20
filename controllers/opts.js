const Poll = require('../modules/polls');
const Opt = require('../modules/opts');

module.exports.editOpts = async(req, res) => {
    const poll = await Poll.findById(req.params.id);
    const req_opts = req.body.opts;
    console.log(req_opts)

    poll.total_num = 0
    let idx = 0
    for(let req_opt of req_opts.opt_id){
        const opt = await Opt.findById(req_opt);
        opt.num_of_votes = req_opts.num_of_votes[idx]
        poll.total_num += parseInt(req_opts.num_of_votes[idx])
        await opt.save()
        idx++
    }
    
    console.log("Total num", poll.total_num)
    await poll.save()
    res.redirect(`/polls/${req.params.id}`)
};

