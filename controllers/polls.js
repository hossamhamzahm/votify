const Poll = require('../modules/polls');
const Opt = require('../modules/opts');


module.exports.createPoll = async(req, res) => {
    req.body.poll["multi_opt"] = req.body.poll["multi_opt"] ? true : false;
    req.body.poll["add_opt"] = req.body.poll["add_opt"] ? true : false;

    const opts = req.body.poll.opts
    req.body.poll.opts = []
    req.body.poll.total_num = 0;
    const poll = new Poll(req.body.poll);

    opts.forEach((opt, idx)=>{
        opts[idx] = {
            val: opt,
            num_of_votes: 0,
            poll: poll.id
        };
    })

    saved_opts =  await Opt.insertMany(opts)
    poll.opts = saved_opts


    await poll.save().
    then(() => res.redirect('/polls')).
    catch((E) => console.log(E, poll));
    console.log(poll)
    console.log(req.body.poll)
};



module.exports.showAllPolls = async (req, res) => {
    const polls = await Poll.find({});
    res.render("polls/show_all", { polls });
};

module.exports.show = async (req, res) => {
    const poll = await Poll.findById(req.params.id).populate('opts')
    // console.log(poll);
    res.render('polls/show', {poll});
};

