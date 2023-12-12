const classlist = require('../models/Class')
const cloudinary = require("../middleware/cloudinary");

module.exports = {
    getHome : async (req, res) => {
        try {
            const classes = await classlist.find({ user: req.user.id })
            classes.forEach((c) => {
                const date = new Date(c.classDate);
                const formattedDate = date.toLocaleDateString('en-AU');
                c.classDate = formattedDate;
            })
            res.render("home.ejs", { Classes: classes, user: req.user });
        } catch (err) {
            if (err) return res.status(500).send(err);
        }
    },
    createClass: async (req, res) => {
        try {
            // Upload image to cloudinary
            let results = []
            for (const file of req.files) {
                const result = await cloudinary.uploader.upload(file.path, { 
                    use_filename: true, 
                    unique_filename: false 
                })
                results.push(result)
            }      
            await classlist.create({
                name: req.body.name,
                classDate: req.body.classDate,
                rate: req.body.rate,
                topic: req.body.topic,
                pros: req.body.pros,
                cons: req.body.cons,
                homework: req.body.homework,
                user: req.user.id,
                files: results.map(result => result.secure_url),
                cloudinaryId: results.map(result => result.public_id)
            });
            console.log("Class has been added!");
            res.redirect("/home");
        } catch (err) {
            console.log(err);
            res.redirect("/home");
        }
    },
    markPaid: async (req,res) => {
        try {
            await classlist.findByIdAndUpdate(
                { _id: req.params.id },
                {paid: true}
            )
            res.redirect('/home');
        } catch (err) {
            if (err) return res.status(500).send(err)
            res.redirect('/home');
        } 
    },
    deleteClass : async (req,res) => {
        try {
            // Find post by id
            let post = await classlist.findById({ _id: req.params.id });
            // Delete images from cloudinary
            for (let id of post.cloudinaryId) {
                await cloudinary.uploader.destroy(id);
            }
            // Delete post from db
            await classlist.remove({ _id: req.params.id });
            console.log("Deleted Post");
            res.redirect("/home");
        } catch (err) {
            if (err) return res.send(500, err)
            res.redirect("/home");
        }
    }
}