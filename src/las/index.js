const lasExtractProcess = require('./lasExtractProcess');

module.exports = async function(req) {
    return new Promise(async (resolve, reject) => {
        let files = req.files;
        if (!files || !files.length) return reject('NO FILE CHOSEN!!!');
        let successFiles = [];
        let successWells = [];
        let errFiles = [];

        for (const file of files) {
            try {
                const extractedResult = await lasExtractProcess(file, {});
                console.log('Process Done!!!');
                successFiles.push(file.originalname);
                successWells = successWells.concat(extractedResult);
            } catch (err){
                console.log('SOMETHING WRONG!!!');
                errFiles.push({
                    filename: file.originalname,
                    err: err
                });
            }
        }
        const resVal = {
            errFiles: errFiles,
            successWells: successWells,
            successFiles: successFiles
        }
        return resolve(resVal);
    })
}
