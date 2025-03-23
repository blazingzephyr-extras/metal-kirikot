'use strict'

import { Type } from "js-binary/lib/Type";
/**
 * Parse and represent an object field. See example in Type.js
 * @class
 * @param {string} name
 * @param {string|Object|Array<string>|Array<Object>} type
 */
export class Field {
	/** @member {boolean} */
	public optional: boolean = false;
	/** @member {string} */
	public name: string = "";
	/** @member {boolean} */
	public array: boolean = false;
	/** @member {Type} */
	public type: Type = new Type("");

	constructor(name: string, type: Type) {
		if (name[name.length - 1] === '?') {
			this.optional = true;
			name = name.substr(0, name.length - 1);
		}
		this.name = name;
		this.array = Array.isArray(type);
		if (this.array) {
			let typeArray: any = type;
			if (typeArray.length !== 1) {
				throw new TypeError('Invalid array type, it must have exactly one element');
			}
			type = typeArray[0];
		}
		this.type = type;
	}
}