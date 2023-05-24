import { isArrayOfObjects, isPrimitiveArray } from './genie-helper';

export class GenieService {
  //start program
  columns: any[] = [];
  objects: any[] = [];
  constructor() {
    this.columns = [];
    this.objects = [];
  }
  //function to call recursively
  getCols(obj: any) {
    this.columns = [];
    this.objects = [];
    //let columns = [];
    let fieldNames = Object.keys(obj);
    fieldNames.forEach((field) => {
      //call function recursively for object type not array
      if (typeof obj[field] != 'object') {
        //console.log("Parsing ", typeof obj[field]);
        this.columns.push({ name: field, type: typeof obj[field] });
      } else if (Array.isArray(obj[field])) {
        //console.log("Parsing ", typeof obj, "Is Array");
        this.columns.push({ name: field, type: 'array' });

        if (isPrimitiveArray(obj[field])) {
          //do nothing if array is of primitive types like string,number,boolean
        } else if (isArrayOfObjects(obj[field])) {
          //not bug free yet
          console.log('Parsing array of objects, ', obj[field][0]);

          let array_columns = this.getCols(obj[field][0]);
          this.columns.push(...array_columns);
          this.objects.push({
            name: field,
            type: 'object',
            cols: [...array_columns],
          });
        }
      } else if (
        typeof obj[field] == 'object' &&
        !Array.isArray(obj[field][0])
      ) {
        //objects.push({ name: field, type: "object" });
        this.columns.push({ name: field, type: 'object' });
        //console.log("Parsing ", typeof obj[field], "Not Array");
        let inner_columns = this.getCols(obj[field]);
        inner_columns = inner_columns.map((value) => {
          return { name: field + '.' + value.name, type: typeof value.type };
        });

        //console.log(inner_columns);
        this.columns.push(...inner_columns);
      }
    });
    return this.columns;
  }
}
