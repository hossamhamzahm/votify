const Poll = require('../modules/polls');
const Opt = require('../modules/opts');
const User = require('../modules/users');
const ExpressError = require('../utils/ExpressError');

module.exports.createPoll = async (req, res, next) => {
    req.body.poll["multi_opt"] = req.body.poll["multi_opt"] ? true : false;
    req.body.poll["add_opt"] = req.body.poll["add_opt"] ? true : false;
    req.body.poll["allow_download"] = req.body.poll["allow_download"] ? true : false;

    const opts = req.body.poll.opts
    req.body.poll.opts = []
    req.body.poll.total_num = 0;
    const poll = new Poll(req.body.poll);
    const user = await User.findById(req.user.id)

    if(!user){
        return new next(ExpressError(`Couldn't find user id ${req.user.id}`, 404));
    }

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


module.exports.editPoll = async (req, res, next) => {
    const poll = await Poll.findById(req.params.id);

    if(!poll){
        return new next(ExpressError(`Couldn't find poll id ${req.params.id}`, 404));
    }

    poll.title = req.body.poll.title;
    poll.description = req.body.poll.description;
    poll["add_opt"] = req.body.poll["add_opt"] ? true : false;
    poll["allow_download"] = req.body.poll["allow_download"] ? true : false;
    await poll.save()
    res.redirect(`/polls/${req.params.id}/`)
};


module.exports.deletePoll = async (req, res, next) => {
    const poll = await Poll.findById(req.params.id) //.populate('opts')
    const author = await User.findById(poll.author)

    if (!author) {
        return new next(ExpressError(`Couldn't find user id ${req.user.id}`, 404));
    }
    if (!poll) {
        return new next(ExpressError(`Couldn't find poll id ${req.params.id}`, 404));
    }

    await Opt.deleteMany({ _id: { $in: poll.opts } })
    await author.updateOne({ $pull: { polls: { _id: { $in: poll.opts}}}})
    await Poll.findByIdAndDelete(req.params.id);
    res.redirect('/polls')
};


module.exports.renderNew = (req, res) => {
    res.render('polls/new');
};


module.exports.renderEdit = async(req, res, next) => {
    const poll = await Poll.findById(req.params.id).populate('opts')

    if (!poll) {
        return new next(ExpressError(`Couldn't find poll id ${req.params.id}`, 404))
    }

    res.render('polls/edit', {poll});
};


module.exports.showAllPolls = async (req, res, next) => {
    const user = await User.findById(req.user.id).populate({
        path: 'polls',
        populate: {
            path: 'opts'
        }
    });

    if (!user) {
        return new next(ExpressError(`Couldn't find user id ${req.user.id}`, 404))
    }

    const polls = user.polls;
    res.render("polls/show_all", { polls });
};

module.exports.show = async (req, res, next) => {
    const poll = await Poll.findById(req.params.id).populate({
        path: 'opts',
        populate: {
            path: 'voters',
            select:['f_name', 'l_name', 'email','_id']
        },
    }).populate('author');

    if (!poll) {
        return next(new ExpressError(`Couldn't find poll id ${req.params.id}`, 404))
    }
    else res.render('polls/show', {poll});
};

