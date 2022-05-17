function requireFields(fields) {
    let missingFields = [];

    // Create an array of key/value pairs for each required field
    const fieldsEntries = Object.entries(fields);

    fieldsEntries.forEach(entry => {
        const fieldName = entry[0];
        const fieldValue = entry[1];

        if (!fieldValue) {
            missingFields.push(fieldName);
        }
    });

    return missingFields;
}

module.exports = { requireFields };
