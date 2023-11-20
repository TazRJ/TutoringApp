const classlist = require('../models/classlist')

module.exports = {
    getEdit: async (req,res) =>  {
        const id = req.params.id
        const paid = req.params.paid
        console.log(id)
        try {
            const classes = await classlist.find()
            res.render("edit.ejs", {Classes: classes, classId: id, classPaid: paid})
        } catch (err) {
            if (err) return res.status(500).send(err)
        }
    },
    deleteItem: async (req,res) => {
        const id = req.params.id
        try {
            const result = await classlist.findByIdAndDelete(id)
            console.log(result)
            res.redirect('back')
        } catch (err) {
            if (err) return res.status(500).send(err)
        } 
    },
    updateItem: async (req,res) => {
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
                },
            )
            res.redirect('/');
        } catch (err) {
            if (err) return res.status(500).send(err)
            res.redirect('/');
        } 
    }
}