const Poll = require('../modules/polls');
const Opt = require('../modules/opts');

module.exports.editOpts = async (req, res) => {
    const poll = await Poll.findById(req.params.id);
    const req_opts = req.body.opts;

    poll.total_num = 0
    let idx = 0
    for (let req_opt of req_opts.opt_id) {
        const opt = await Opt.findById(req_opt);
        if (opt.num_of_votes > req_opts.num_of_votes[idx]) {
            opt.voters.pull({ _id: req.user.id })
        }
        else if (opt.num_of_votes < req_opts.num_of_votes[idx]) {
            opt.voters.push({ _id: req.user.id })
        }
        opt.num_of_votes = req_opts.num_of_votes[idx]
        poll.total_num += parseInt(req_opts.num_of_votes[idx])
        await opt.save()
        idx++
    }

    await poll.save()
    res.redirect(`/polls/${req.params.id}`)
};

module.exports.removeOpt = async (req, res) => {
    const poll = await Poll.findById(req.params.id);
    const opt = await Opt.findById(req.params.optId)

    poll.opts.pull({ _id: req.params.optId });
    poll.total_num = parseInt(poll.total_num) - parseInt(opt.num_of_votes);


    await poll.save()
    await Opt.findByIdAndRemove(req.params.optId);
    res.status(200).send("Ok")
};

module.exports.newOpt = async (req, res) => {
    let req_opt = {
        val: req.body.text,
        num_of_votes: 0,
        poll: req.params.id
    }
    
    const poll = await Poll.findById(req.params.id);
    const opt = new Opt(req_opt);
    poll.opts.push(opt);


    await poll.save()
    await opt.save()
    res.status(200).send("Ok")
};

