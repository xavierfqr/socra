const handleValidationError = (err, res) => {
    let errors = Object.values(err.errors).map(el => el.message);
    let fields = Object.values(err.errors).map(el => el.path);
    let code = 400;
    if (errors.length > 1) {
        const formattedErrors = errors.join('.  ');
        res.status(code).send({error: "Bad request, some fields are not well formatted. Please read the documentation.", fields: fields, messages: formattedErrors });
    } else {
        res.status(code).send({error: "Bad request, some fields are not well formatted. Please read the documentation.", messages: errors, fields: fields})
    }
}

module.exports = handleValidationError