const classlist = require('../models/classlist')

module.exports = {
    getIndex : async (req, res) => {
        try {
            const classes = await classlist.find()
            res.render("archive.ejs", { Classes: classes });
        } catch (err) {
            if (err) return res.status(500).send(err);
        }
    },
    updateItem: async (req,res) => {
        const id = req.params.id
        const paid = {paid: true}
        try {
            await classlist.findByIdAndUpdate(
                id,
                paid
            )
            res.redirect('/');
        } catch (err) {
            if (err) return res.status(500).send(err)
            res.redirect('/');
        } 
    },
    updateItemAsNotPaid: async (req,res) => {
        const id = req.params.id
        const paid = {paid: false}
        try {
            await classlist.findByIdAndUpdate(
                id,
                paid
            )
            res.redirect('/');
        } catch (err) {
            if (err) return res.status(500).send(err)
            res.redirect('/');
        } 
    },
}