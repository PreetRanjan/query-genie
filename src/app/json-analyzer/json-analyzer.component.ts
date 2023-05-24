import { Component, OnInit } from '@angular/core';
import { GenieConfig } from '../helpers/genie-config';
import { GenieService } from '../helpers/genie-service';

@Component({
  selector: 'app-json-analyzer',
  templateUrl: './json-analyzer.component.html',
  styleUrls: ['./json-analyzer.component.css'],
})
export class JsonAnalyzerComponent implements OnInit {
  public isLoading: boolean = false;
  public statusMessage: string = 'Running...';
  public editor: any;
  public editorComp: any;
  public config: GenieConfig;
  public tableName: string = 'tableName';
  public alias: string = 'a';
  public editor2: any;
  public editorComp2: any;
  public language: string = 'json';

  objects: item[] = [{ id: 0, name: 'Root' }];
  selectedObject: item = { id: 0, name: 'Root' };
  public editorOptions = {
    theme: 'vs-dark',
    language: 'json',
    autoIndent: true,
  };

  public outputEditorOptions = {
    theme: 'vs-dark',
    language: 'sql',
    autoIndent: true,
  };
  //public code: string =
  //  '//change you mode from the dropdown above \n \n function x() {\n  console.log("Hello world!");\n}';
  public code: string = '{"id":21,"name":"PREETish"}';
  //public code: string =
  //  'data = [1,2,    3,4,5] \nprint(data[0:3  ]) \n \n \n \n';
  public output_code: string = 'select 1; \n \n \n \n \n \n';
  constructor(private genie: GenieService) {
    this.config = {
      alias: this.alias,
      useAlias: true,
      tableName: this.tableName,
      useExplodeForArray: false,
      isLowerCase: true,
    };
  }

  ngOnInit(): void {
    //this.selectedObject = { id: 1, name: 'Angular' };
  }

  formatDoc(editor: any) {
    //console.log(editor);

    editor._editor.trigger('editor', 'editor.action.formatDocument');
    //this.editor2._editor.trigger('editor', 'editor.action.formatDocument');
  }

  editorInit(editor: any) {
    console.log('editor instantiated.');
    // Here you can access editor instance
    this.editorComp = editor;
    this.editor = editor._editor;
  }
  editorInit2(editor: any) {
    console.log('editor2 instantiated.');
    // Here you can access editor instance
    this.editorComp2 = editor;
    this.editor2 = editor._editor;
  }
  changeMode(mode: HTMLSelectElement) {
    //this.editor.editorConfig.language = mode.value;
    this.editorOptions.language = mode.value;
    console.log(mode.value);
    console.log(this.editor);
    console.log(this.editorComp.config);
    console.log(this.editorComp.editorConfig);
  }
  //Main method for generating the code.
  //To generate query based on object
  generateCode(editor: any) {
    let input_code = this.editorComp._value;
    let obj = JSON.parse(input_code);
    //let fieldNames = Object.keys(obj);
    let data = [];
    if (this.selectedObject.name == 'Root') {
      data = this.genie.getCols(obj);
    } else {
      data = this.genie.getCols(obj[this.selectedObject.name]);
    }
    let query = this.generateQuery(data);
    this.editor2.setValue(query);
  }
  //refresh objects in input JSON
  //This is now connected to Load Button but
  //it will be run JSON input change to make it more
  //accessible
  refreshObjects(editor: any) {
    this.objects = [{ id: 0, name: 'Root' }];
    let input_code = this.editorComp._value;
    console.log(input_code);
    let obj = JSON.parse(input_code);
    let fieldNames = Object.keys(obj);
    fieldNames.forEach((key, index) => {
      if (typeof obj[key] == 'object') {
        this.objects.push({ id: index, name: key });
      }
    });
    console.log(this.objects);
  }
  generateQuery(data: any[]): string {
    let cols: any[] = [];
    let tableName;
    //cols part
    data.forEach((col: any) => {
      //console.log(col);
      if (this.config.alias) {
        cols.push(' ' + this.config.alias + '.' + col.name);
      } else {
        cols.push(' ' + col.name);
      }
    });
    //lower part

    if (this.config.alias && this.config.useAlias) {
      tableName = this.config.tableName + ' ' + this.config.alias + ' \n';
    } else {
      tableName = this.config.tableName;
    }

    let cols_section = cols.join(',\n');

    let template = `SELECT \n ${cols_section} \nFROM \n  ${tableName}`;

    return template;
  }
  generateCode2(editor: any) {
    this.isLoading = true;
    this.statusMessage = 'Running...';
    //call code generation

    console.log('Code generation called!');
    let input_code = this.editorComp._value;
    console.log(this.editorComp);
    let obj = JSON.parse(input_code);
    let fieldNames = Object.keys(obj);
    let query = 'SELECT \n';
    let cols: any = [];
    fieldNames.forEach((n) => {
      //query += '  ' + this.alias + '.' + n + '\n';
      cols.push('  ' + this.alias + '.' + n);
    });

    let colsQuery = cols.join(',\n');
    query += colsQuery;
    query += '\nFROM \n  ' + this.tableName + ' ' + this.alias;
    //this.editorComp2.setValue(query);
    this.editor2.setValue(query);
    console.log(this.editor.getValue());
    this.editor2.trigger('editor', 'editor.action.formatDocument');
    this.isLoading = false;
    /*setInterval(() => {
      //write code to generate code
      let inputCode = this.editor._editor.getValue();
      console.log(inputCode);
      //let fieldNames = Object.keys
      this.editorComp2.setValue(inputCode);
      console.log('completed');
      this.statusMessage = '';
      
    }, 200);*/
  }
}

interface item {
  id: number;
  name: string;
}
