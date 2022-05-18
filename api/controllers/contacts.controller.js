// const db = require("../db/models");

exports.searchContacts = async (req, res, next) => {
    try {
        res.status(200).json({ sample: "List of contacts" });
    } catch (err) {
        next(err);
    }
};

exports.createContact = async (req, res, next) => {
    try {
        res.status(200).json({ sample: "Contact created!" });
    } catch (err) {
        next(err);
    }
};

exports.getContactById = async (req, res, next) => {
    try {
        res.status(200).json({ sample: "Contact details" });
    } catch (err) {
        next(err);
    }
};

exports.updateContact = async (req, res, next) => {
    try {
        res.status(200).json({ sample: "Contact updated!" });
    } catch (err) {
        next(err);
    }
};

exports.deleteContact = async (req, res, next) => {
    try {
        res.status(200).json({ sample: "Contact deleted!" });
    } catch (err) {
        next(err);
    }
};
