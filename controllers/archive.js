const classlist = require('../models/Class')

module.exports = {
    getIndex : async (req, res) => {
        try {
            const classes = await classlist.find()
            res.render("archive.ejs", { Classes: classes });
        } catch (err) {
            if (err) return res.status(500).send(err);
        }
    }
}