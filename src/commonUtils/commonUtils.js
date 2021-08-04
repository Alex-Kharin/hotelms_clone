export function convertArrayOfObjectsToObjectOfObjects (key, array) {
    return array.reduce((acc, itemObj) => {
        acc[itemObj[key]] = itemObj
        return acc
    }, {})
}

export function convertObjectWithArraysToObjectWithObjects (key, object) {
    return Object.keys(object).reduce((acc, objKey) => {
        acc[objKey] = convertArrayOfObjectsToObjectOfObjects(key, object[objKey])
        return acc
    }, {})
}

export function reversObjectProp(obj) {
    return Object.keys(obj).reduce((acc, objKey) => {
        acc[obj[objKey]] = objKey
        return acc
    }, {})
}

export function CreateViewRentIntervals(apartments) {
    return Object.keys(apartments).reduce((acc, apartmentType) => {
        for (const apartment of apartments[apartmentType]) {
            let arr=[]
            for (const itemRentInfo of apartment.rentInfo) {
                arr.push(itemRentInfo.rentInterval)
            }
            if(arr.length) acc[apartment.id] = arr
        }
        return acc
    }, {})
}