const classlist = require('../models/classlist')

module.exports = {
    getEdit: async (req,res) =>  {
        const id = req.params.id
        const paid = req.params.paid
        try {
            const classes = await classlist.find()
            res.render("edit.ejs", {Classes: classes, classId: id, classPaid: paid})
        } catch (err) {
            if (err) return res.status(500).send(err)
        }
    },
    deleteClass : (req,res) => {
        const id = req.params.id
        classlist.findByIdAndRemove(id, err => {
            if (err) return res.send(500, err)
            res.redirect("/");
        });
    },
    updateClass : async (req,res) => {
        const id = req.params.id
        try {
            await classlist.findByIdAndUpdate(
               id,
               {
                name: req.body.name,
                classDate: req.body.classDate,
                rate: req.body.rate,
                topic: req.body.topic,
                pros: req.body.pros,
                cons: req.body.cons,
                homework: req.body.homework
                },
                { new: true }
            )
            res.redirect('/');
        } catch (err) {
            if (err) return res.status(500).send(err)
            res.redirect('/');
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
            res.redirect('/');
        } catch (err) {
            if (err) return res.status(500).send(err)
            res.redirect('/');
        } 
    },
    markNotPaid: async (req,res) => {
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
    }
}