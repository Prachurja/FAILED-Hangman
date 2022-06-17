const fs = require("fs")
const path = require("path")

module.exports = function deleteExpiredFiles(tempPath) {
    fs.readdirSync(tempPath).forEach(filePath => {
        if(path.extname(filePath) === "") {
            deleteExpiredFiles(path.join(tempPath, filePath))
        }

        else {
            [date, id] = filePath.split(" ")

            if(date < new Date().getTime()) {
                fs.unlinkSync(path.join(tempPath, filePath))
            }
        }
    })
}