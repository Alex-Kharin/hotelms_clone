export function convertArrayOfObjectsToObjectOfObjects (key, array) {
    let result = array.reduce((acc, itemObj) => {
        acc[itemObj[key]] = itemObj
        return acc
    }, {})
    return result
}

export function convertObjectWithArraysToObjectWithObjects (key, object) {
    let result = Object.keys(object).reduce((acc, objKey) => {
        acc[objKey] = convertArrayOfObjectsToObjectOfObjects(key, object[objKey])
        return acc
    }, {})
    return result
}
