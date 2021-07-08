const PDFDocument = require('pdfkit');
const getStream = require('get-stream');
const fs = require('fs');

// generate the formatted PDF
async function generatePDF(filename, taskInfo){
    try {
        const doc = new PDFDocument();

        // title of the PDF
        doc.fontSize(20);
        doc.font('Helvetica-Bold').text('Task description', {
            align: 'center'
        });
        doc.moveDown();
        doc.moveDown();

        // Fields of the PDF, id field is excluded
        doc.fontSize(12);
        for (var key in taskInfo) {
            if (key !== "_id") {
                var val = taskInfo[key];
                var cap = key.substring(0, 1).toUpperCase() + key.substring(1);
                doc.font('Helvetica-Bold').text(cap + ': ', {
                    continued: true
                }).font('Helvetica').text(formatDescription(key, val));
                doc.moveDown();
            }
        };

        // create stream for returning it.
        doc.pipe(fs.createWriteStream(`${__dirname}/../` + filename + '.pdf'));
        doc.end();

        const pdfStream = await getStream.buffer(doc);

        return pdfStream;
    } catch (error) {
        return null;
    }
}

// Format the description
function formatDescription(key, value) {
    switch (key) {
        case 'duration':
            return value + " month(s)";
        case 'price':
            return value + " euros";
        case 'remote':
            return value + "%";
        default:
            return value;
    }
}

module.exports = { formatDescription, generatePDF };