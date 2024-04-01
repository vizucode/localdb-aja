# Localdb-aja

Localdb-aja is framework to make easier store, update, delete, find data to local file system.

## Installation

### using yarn package
```bash
yarn add localdb-aja
```

### using npm package
```bash
npm i localdb-aja
```

## Usage

Please make sure you have to create the file .json first before starting!

```javascript
import localdb  from 'localdb-aja';

/**
 * Please add the constant path your database folder, ex: ./db/ 
 * don't forget the backslash after the folder name
 */
var localDB = new localdb("./db")

/**
 * to store data in your local-database
 * will return boolean
 */
var jsonData = `{"name":"yoromiya kasunagi"}`
jsonData = JSON.parse(jsonData)

localDB.store("product.json", jsonData)


/**
 * to update data in your local-database
 * will return boolean
 */
var jsonData = `{"name":"kurisu amane"}`
jsonData = JSON.parse(jsonData)

localDB.update("product.json", jsonData, "name", "bang messi")

/**
 * to delete data in your local-database
 * will return boolean
 */
localDB.destroy("product.json", "name", "yoromia kusanagi")

/**
 * to find all data in your local-database
 * will return the array of data
 */
localDB.findAll("product.json")

/**
 * to find specific data in your local-database
 * will return object of data
 */
localDB.find("product.json", "name", "yuta okkotsu")

```

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
