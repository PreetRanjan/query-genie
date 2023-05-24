//helpers for query genie

//check if object is an array
function isArray(obj: object) {
  if (Array.isArray(obj)) {
  }
  return Array.isArray(obj);
}

//check if its an array of objects
function isArrayOfObjects(obj: any) {
  if (isArray(obj) && typeof obj[0] == 'object') {
    return true;
  }
  return false;
}

//shcek if its an array of primitive types
function isPrimitiveArray(obj: any) {
  if (
    isArray(obj) &&
    typeof obj[0] == 'string' &&
    typeof obj[0] == 'number' &&
    typeof obj[0] == 'boolean'
  ) {
    return true;
  }
  return false;
}

//export functions
export { isArray, isPrimitiveArray, isArrayOfObjects };
