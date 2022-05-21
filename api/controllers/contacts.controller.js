const db = require("../db/models");

exports.searchContacts = async (req, res, next) => {
    try {
        res.status(200).json({ sample: "List of contacts" });
    } catch (err) {
        next(err);
    }
};

exports.createContact = async (req, res, next) => {
    try {
        await db.Contact.create({
            parent_id: req.body.parentId,
            is_company: req.body.isCompany,
            is_client: req.body.isClient,
            is_vendor: req.body.isVendor,
            is_advisor: req.body.isAdvisor,
            title: req.body.title,
            given_name: req.body.givenName,
            middle_name: req.body.middleName,
            family_name: req.body.familyName,
            suffix: req.body.suffix,
            company_name: req.body.companyName,
            job_title: req.body.jobTitle,
            display_name: req.body.displayName,
            email: req.body.email,
            phone: req.body.phone,
            address: req.body.address,
            unit: req.body.unit,
            city: req.body.city,
            province: req.body.province,
            country: req.body.country,
            postal_code: req.body.postalCode
        });
        res.status(200).json({ message: "Contact created!" });
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
