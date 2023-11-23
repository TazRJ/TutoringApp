const classlist = require('../models/Class')

module.exports = {
    getEdit: async (req,res) =>  {
        const id = req.params.id
        const paid = req.params.paid
        try {
            const classes = await classlist.find({userId:req.user.id})
            res.render("edit.ejs", {Classes: classes, classId: id, classPaid: paid, userId:req.user.id})
        } catch (err) {
            if (err) return res.status(500).send(err)
        }
    },
    deleteClass : async (req,res) => {
        const id = await req.params.id
        classlist.findByIdAndRemove(id, err => {
            if (err) return res.send(500, err)
            res.redirect("/home");
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
                homework: req.body.homework,
                userId:req.user.id
                },
                { new: true }
            )
            res.redirect('/home');
        } catch (err) {
            if (err) return res.status(500).send(err)
            res.redirect('/home');
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
    markNotPaid: async (req,res) => {
        const id = req.params.id
        const paid = {paid: false}
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
    }
}