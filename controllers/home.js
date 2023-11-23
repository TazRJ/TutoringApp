const classlist = require('../models/Class')

module.exports = {
    getHome : async (req, res) => {
        try {
            const classes = await classlist.find({userId:req.user.id})
            res.render("home.ejs", { Classes: classes, user: req.user });
        } catch (err) {
            if (err) return res.status(500).send(err);
        }
    },
    createClass: async (req, res) => {
        const newClass = new classlist(
            {
                name: req.body.name,
                classDate: req.body.classDate,
                rate: req.body.rate,
                topic: req.body.topic,
                pros: req.body.pros,
                cons: req.body.cons,
                homework: req.body.homework,
                userId: req.user.id
            });
        try {
            await newClass.save();
            res.redirect("/home");
        } catch (err) {
            if (err) return res.status(500).send(err);
            res.redirect("/home");
        }
    },
    markPaid: async (req,res) => {
        const id = req.params.id
        const paid = {paid: true}
        try {
            await classlist.findByIdAndUpdate(
                id,
                paid
            )
            res.redirect('/home');
        } catch (err) {
            if (err) return res.status(500).send(err)
            res.redirect('/home');
        } 
    },
    deleteClass : async (req,res) => {
        const id = await req.params.id
        classlist.findByIdAndRemove(id, err => {
            if (err) return res.send(500, err)
            res.redirect("/home");
        });
    }
}