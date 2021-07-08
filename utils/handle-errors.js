const handleValidationError = (err, res) => {
    let errors = Object.values(err.errors).map(el => el.message);
    let fields = Object.values(err.errors).map(el => el.path);
    const code = 400;
    if (errors.length > 1) {
        const formattedErrors = errors.join('.  ');
        res.status(code).send({error: "Bad request, some fields are not well formatted. Please read the documentation.", fields: fields, messages: formattedErrors });
    } else {
        res.status(code).send({error: "Bad request, some fields are not well formatted. Please read the documentation.", messages: errors, fields: fields})
    }
}

const handleUnknownError = (res) => {
    const code = 500;
    res.status(code).send({error: "An unknown error has occured. Please refer to the documentation or check the server availibility."});
}

const handleMongooseIdError = (res, id) => {
    const code = 400;
    res.status(code).send({error: "The provided ID: " + id + " is not a valid mongoose ID"});
}

const handleInvalidIdError = (res, id) => {
    const code = 404;
    res.status(code).send({error: "Ressource not found, please verify that the ID: " + id + " exists"});
}

module.exports = {
    handleValidationError,
    handleUnknownError,
    handleMongooseIdError,
    handleInvalidIdError
}