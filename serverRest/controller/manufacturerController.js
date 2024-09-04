const { Manufacturer } = require("../db/models/imsModel");

exports.createManufacturer = async (req, res) => {
    try {
        const newManufacturer = await Manufacturer.create(req.body);
        res.status(201).json({
            status: "success",
            data: { manufacturer: newManufacturer },
        });
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: "invalid data set",
        });
    }
};

exports.getAllManufacturers = async (req, res) => {
    try {
        const manufacturer = await Manufacturer.find();
        res.status(201).json({
            status: "success",
            results: manufacturer.length,
            data: { manufacturer },
        });
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: "invalid data set",
        });
    }
};

exports.getManufacturer = async (req, res) => {
    try {
        const manufacturer = await Manufacturer.findById(req.params.id);
        res.status(201).json({
            status: "success",
            data: { manufacturer },
        });
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: "Could not find manufacturer",
        });
    }
};
exports.updateManufacturer = async (req, res) => {
    try {
        const manufacturer = await Manufacturer.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );
        res.status(201).json({
            status: "success",
            data: { manufacturer },
        });
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: "Could not find manufacturer",
        });
    }
};
exports.deleteManufacturer = async (req, res) => {
    try {
        const manufacturer = await Manufacturer.findByIdAndDelete(
            req.params.id
        );
        res.status(201).json({
            status: "success",
            manufacturer,
        });
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: "Could not find manufacturer",
        });
    }
};
