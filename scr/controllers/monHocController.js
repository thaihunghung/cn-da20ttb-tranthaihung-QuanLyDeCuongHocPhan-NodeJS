const MonHoc = require('../models/monHoc'); // Import the MonHoc model

exports.monHoc_create_get = (req, res) => {
    res.render('monHocForm'); // Render the form view
};

exports.monHoc_create_post = (req, res) => {
    // Create a new MonHoc instance with form data
    const monHoc = new MonHoc({
        tenMonHoc: req.body.tenMonHoc,
        TLTK: req.body.TLTK
        // Add other fields accordingly
    });

    // Save the MonHoc instance to the database
    monHoc.save(err => {
        if (err) { return res.status(500).send(err); }
        // Redirect to a success page or back to the form
        res.redirect('/monhoc/create');
    });
};