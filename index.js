import fs from 'fs';

class LocalDB {
    constructor(dbPath) {
        this.dbPath = dbPath
    }

    checkFileExist(filePath){
        if (fs.existsSync(filePath)) {
            return true
        }
        return false
    }

    findAll(collection)  {
        var path = this.dbPath+collection
        if (!this.checkFileExist(path)) {
            return false
        }

        var documents = JSON.parse(fs.readFileSync(path))
        return Array.isArray(documents) ? documents : [documents];
    }

    // will query and return single data and there's a filter
    find(collection, filter, value) {
        var path = this.dbPath+collection
        if (!this.checkFileExist(path)) {
            return false
        }

        var documents = JSON.parse(fs.readFileSync(path))
    
        var singleDocument
    
        documents.forEach(document => {
            if(filter == "" && value == "") {
                return singleDocument = document
            }
    
            if (document.hasOwnProperty(filter) && document[filter] == value) {
                return singleDocument = document
            }
        })
        
        return singleDocument
    }

    // will return boolean
    store(collection, documentRequest) {
        var path = this.dbPath+collection
        
        if (typeof documentRequest != "object") {
            return false
        }

        var data = this.findAll(collection)
        if (typeof data == "boolean" && !data) {
            return false
        }

        data.push(documentRequest)

        var documentString = JSON.stringify(data)
        fs.writeFileSync(path, documentString)

        return true
    }

    // will return boolean
    update(collection, documentRequest, filter, value) {
        if ((filter == "" || filter == undefined) && (value == "" || value == undefined)) {
            return false
        }

        var result = this.destroy(collection, filter, value)
        if (!result){
            return false
        }
        var result = this.store(collection, documentRequest)
        if (!result){
            return false
        }

        return true
    }

    // will return boolean
    destroy(collection, filter, value) {
        var path = this.dbPath+collection
        if (!this.checkFileExist(path)) {
            return false
        }

        var documents = this.findAll(collection)
        documents.forEach((val, idx) => {
            if (val[filter] == value) {
                documents.splice(idx, 1)
            }
        })

        var documentString = JSON.stringify(documents)
        fs.writeFileSync(path, documentString)

        return true
    }

    checkHealth(collection) {
        return collection
    }
}

module.exports = LocalDB