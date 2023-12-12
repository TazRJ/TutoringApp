const classlist = require('../models/Class')
const cloudinary = require("../middleware/cloudinary");

module.exports = {
    getEdit: async (req,res) =>  {
        const id = req.params.id
        const paid = req.params.paid
        try {
            const classes = await classlist.find({ user:req.user.id })
            res.render("edit.ejs", {Classes: classes, classId: id, classPaid: paid, user: req.user})
        } catch (err) {
            if (err) return res.status(500).send(err)
        }
    },
    deleteClass : async (req,res) => {
        try {
            // Find post by id
            let post = await classlist.findById({ _id: req.params.id });
            // Delete image from cloudinary
            await cloudinary.uploader.destroy(post.cloudinaryId);
            // Delete post from db
            await classlist.remove({ _id: req.params.id });
            console.log("Deleted Post");
            res.redirect("/home");
        } catch (err) {
            if (err) return res.send(500, err)
            res.redirect("/home");
        }
    },
    updateClass : async (req,res) => {
        const id = req.params.id
        // Upload image to cloudinary
        let results = []

        for (const file of req.files) {
            const result = await cloudinary.uploader.upload(file.path, { 
                use_filename: true, 
                unique_filename: false 
            })
            results.push(result)
        } 

        try {

            // Fetch the current class
            const currentClass = await classlist.findById(id)

            // Add new files to the existing ones
            const updatedFiles = [...currentClass.files, ...results.map(result => result.secure_url)]
            const updatedCloudinaryIds = [...currentClass.cloudinaryId, ...results.map(result => result.public_id)]

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
                user:req.user.id,
                files: updatedFiles,  // Save file URLs in the class
                cloudinaryId: updatedCloudinaryIds
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
    },
    deleteFile : async (req,res) => {
        const { classId, fileId } = req.params;

        try {
            // Fetch the current class
            const currentClass = await classlist.findById(classId);

            // Find the index of the file to remove
            const indexToRemove = currentClass.cloudinaryId.indexOf(fileId);
            if (indexToRemove > -1) {
                // Remove the file from the arrays
                currentClass.files.splice(indexToRemove, 1);
                currentClass.cloudinaryId.splice(indexToRemove, 1);

                // Delete the file from Cloudinary
                await cloudinary.uploader.destroy(fileId);

                // Save the updated class back to the database
                await currentClass.save();
            }

            res.redirect('/home');
        } catch (err) {
            if (err) return res.status(500).send(err)
            res.redirect('/home');
        }

    }
}