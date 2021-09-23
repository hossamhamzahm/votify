const Poll = require('../modules/polls');
const Opt = require('../modules/opts');
const User = require('../modules/users');


module.exports.createPoll = async (req, res) => {
    req.body.poll["multi_opt"] = req.body.poll["multi_opt"] ? true : false;
    req.body.poll["add_opt"] = req.body.poll["add_opt"] ? true : false;

    const opts = req.body.poll.opts
    req.body.poll.opts = []
    req.body.poll.total_num = 0;
    const poll = new Poll(req.body.poll);
    const user = await User.findById(req.user.id)

    opts.forEach((opt, idx) => {
        opts[idx] = {
            val: opt,
            num_of_votes: 0,
            poll: poll.id
        };
    })

    saved_opts = await Opt.insertMany(opts);
    poll.opts = saved_opts;
    poll.author = req.user.id;
    user.polls.push(poll)

    await poll.save()
    await user.save()
    res.redirect('/polls')
};


module.exports.editPoll = async (req, res) => {
    const poll = await Poll.findById(req.params.id);
    poll.title = req.body.poll.title;
    poll.description = req.body.poll.description;
    poll["multi_opt"] = req.body.poll["multi_opt"] ? true : false;
    poll["add_opt"] = req.body.poll["add_opt"] ? true : false;
    await poll.save()
    res.redirect(`/polls/${req.params.id}/`)
};


module.exports.deletePoll = async (req, res) => {
    const poll = await Poll.findById(req.params.id) //.populate('opts')
    const author = await User.findById(poll.author)
    
    await Opt.deleteMany({ _id: { $in: poll.opts } })
    await author.updateOne({ $pull: { polls: { _id: { $in: poll.opts}}}})
    await Poll.findByIdAndDelete(req.params.id);
    res.redirect('/polls')
};


module.exports.renderNew = (req, res) => {
    res.render('polls/new');
};


module.exports.renderEdit = async(req, res) => {
    const poll = await Poll.findById(req.params.id).populate('opts')
    res.render('polls/edit', {poll});
};


module.exports.showAllPolls = async (req, res) => {
    const user = await User.findById(req.user.id).populate('polls');
    const polls = user.polls;
    res.render("polls/show_all", { polls });
};

module.exports.show = async (req, res) => {
    const poll = await Poll.findById(req.params.id).populate('opts').populate('author');
    res.render('polls/show', {poll});
};

