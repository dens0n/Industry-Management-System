const { Contact } = require("../db/models/imsModel");

exports.createContact = async (req, res) => {
    try {
        const newContact = await Contact.create(req.body);
        res.status(201).json({
            status: "success",
            data: { contact: newContact },
        });
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: "invalid data set",
        });
    }
};

exports.getAllContacts = async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.status(201).json({
            status: "success",
            results: contacts.length,
            data: { contacts },
        });
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: "invalid data set",
        });
    }
};

exports.getContact = async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);
        res.status(201).json({
            status: "success",
            data: { contact },
        });
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: "Could not find contact",
        });
    }
};
exports.updateContact = async (req, res) => {
    try {
        const contact = await Contact.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );
        res.status(201).json({
            status: "success",
            data: { contact },
        });
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: "Could not find contact",
        });
    }
};
exports.deleteContact = async (req, res) => {
    try {
        const contact = await Contact.findByIdAndDelete(req.params.id);
        res.status(201).json({
            status: "success",
            contact,
        });
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: "Could not find contact",
        });
    }
};
