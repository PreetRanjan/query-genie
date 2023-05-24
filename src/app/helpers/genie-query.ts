import { GenieConfig } from './genie-config';

export class GenieQuery {
  constructor(private config: GenieConfig) {}

  generateQuery(data: any[]): string {
    let cols: any[] = ['SELECT \n'];

    //cols part
    data.forEach((col: any) => {
      if (this.config.alias) {
        return ' ' + this.config.alias + '.' + col.name;
      } else {
        return ' ' + col.name;
      }
    });
    //lower part
    cols.push(this.config.tableName + '\n');

    if (this.config.alias && this.config.useAlias) {
      cols.push(this.config.tableName + this.config.alias + '\n');
    } else {
      cols.push(this.config.tableName);
    }

    return cols.join(',\n');
  }
}
