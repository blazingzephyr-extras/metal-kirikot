"use strict";
/*import { readFileSync, writeFileSync } from 'fs';
import { Type } from 'js-binary';

/**
* Universal Database handler which saves and reads content of binary files!
* @param {string} mainPath path to folder where database lies
*/
/*export const DatabaseHandler = {
    /*
     * Method used for reading and converting binary data into JS Objects
     * @param {String} filePath path of file to read
     * @param {Type} schema schema to use for decoding file
     */
/*  read(path: string, schema: Type) {
      const source: string = readFileSync(`../Data/${path}`, 'utf-8');
      const buffer: Buffer = new Buffer(source);
      return schema.decode(buffer);
  },
  /**
   * Method used for writing binary files
   * @param {String} path path of file to write in
   * @param {Type} schema schema to use for encodding
   * @param {any} value content to encode in binary
   */
/*write(path: string, schema: Type, value: any) {
    const encoded = schema.encode(value);
    writeFileSync(`../Data/${path}`, encoded, 'utf-8');
}
}*/ 
