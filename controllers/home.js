const classlist = require('../models/classlist')

module.exports = {
    getIndex : async (req, res) => {
        try {
            const classes = await classlist.find()
            res.render("index.ejs", { Classes: classes });
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
                homework: req.body.homework
            });
        try {
            await newClass.save();
            res.redirect("/");
        } catch (err) {
            if (err) return res.status(500).send(err);
            res.redirect("/");
        }
    }
}