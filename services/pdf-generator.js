const PDFDocument = require('pdfkit');
const getStream = require('get-stream');
const fs = require('fs');

async function generatePDF(filename, taskInfo){
    try {
        const doc = new PDFDocument();
        doc.fontSize(12);
        
        for (var key in taskInfo) {
            var val = taskInfo[key];
            doc.font('Helvetica-Bold').text(key + ': ', {
                continued: true
            }).font('Helvetica').text(val);
            doc.moveDown();
        };

        doc.pipe(fs.createWriteStream(`${__dirname}/../` + filename + '.pdf'));
  
        doc.end();
  
        const pdfStream = await getStream.buffer(doc);
  
        return pdfStream;
    } catch (error) {
        return null;
    }
}

module.exports = generatePDF