'use strict'

import {Data} from './Data'
import {ReadState} from './ReadState'
import {Field} from './Field'
/**
 * Create a type, given the format. The format can be either:
 * * A basic type, one of:
 *     `'uint', 'int', 'float', 'string', 'Buffer', 'boolean', 'json', 'oid', 'regex', 'date'`
 * * A compound type: an object, like:
 *     `{a: 'int', b: ['int'], c: [{'d?': 'string'}]}`
 * In the example above, 'b' is a an array of integers, 'd' is an optional field
 * * An array of values of the same type:
 *     `['int']`
 * @class
 * @param {string|Object|Array} type
 */
export class Type {
	/**
 * All possible types
 * @enum {string}
 */
public TYPE: any = {
	UINT: 'uint',
	INT: 'int',
	FLOAT: 'float',
	STRING: 'string',
	BUFFER: 'Buffer',
	BOOLEAN: 'boolean',
	JSON: 'json',
	OID: 'oid',
	REGEX: 'regex',
	DATE: 'date',
	ARRAY: '[array]',
	OBJECT: '{object}'
}
	/**
	 * @member {this.TYPE} Type#type
	 */
	public type: Type["TYPE"];
	
	/**
	 * Defined fields in an `OBJECT` type
	 * @member {?Array<Field>} Type#fields
	 */
	public fields: Array<Field> = [];
	/**
	 * Elements type for an `ARRAY` type
	 * @member {?Type} Type#subType
	 */
	public subType: Type = new Type("");
	
	constructor(type: string|object|Array<object>)
	{
	if (typeof type === 'string') {
		if (type in this.TYPE && type !== this.TYPE.ARRAY && type !== this.TYPE.OBJECT) {
			throw new TypeError('Unknown basic type: ' + type)
		}

		this.type = type
	} else if (Array.isArray(type)) {
		if (type.length !== 1) {
			throw new TypeError('Invalid array type, it must have exactly one element')
		}

		this.type = this.TYPE.ARRAY
		this.subType = new Type(type[0])
	} else {
		if (!type || typeof type !== 'object') {
			throw new TypeError('Invalid type: ' + type)
		}

		this.type = this.TYPE.OBJECT
		let _fieldType: any = this.type
		this.fields = Object.keys(type).map(function (name) {
			return new Field(name, _fieldType[name])
		})
	}
	}
	
/**
 * Expose all scalar types (see types.js)
 * @property {Object<Function>}
 */
public types: any;

/**
 * @param {*} value
 * @return {Buffer}
 * @throws if the value is invalid
 */
encode(value: any) {
	var data = new Data
	this.write(value, data, '')
	return data.toBuffer()
}

/**
 * @param {Buffer} buffer
 * @return {*}
 * @throws if fails
 */
decode(buffer: Buffer) {
	return this.read(new ReadState(buffer))
}

/**
 * @param {*} value
 * @param {Data} data
 * @param {string} path
 * @throws if the value is invalid
 */
write(value: any, data: Data, path: string) {
	var i, field, subpath, subValue, len

	if (this.type === this.TYPE.ARRAY) {
		// Array field
		return this._writeArray(value, data, path, this.subType)
	} else if (this.type !== this.TYPE.OBJECT) {
		// Simple type
		return this.types[this.type].write(value, data, path)
	}

	// Check for object type
	if (!value || typeof value !== 'object') {
		throw new TypeError('Expected an object at ' + path)
	}

	// Write each field
	for (i = 0, len = this.fields.length; i < len; i++) {
		field = this.fields[i]
		subpath = path ? path + '.' + field.name : field.name
		subValue = value[field.name]

		if (field.optional) {
			// Add 'presence' flag
			if (subValue === undefined || subValue === null) {
				this.types.boolean.write(false, data)
				continue
			} else {
				this.types.boolean.write(true, data)
			}
		}

		if (!field.array) {
			// Scalar field
			field.type.write(subValue, data, subpath)
			continue
		}

		// Array field
		this._writeArray(subValue, data, subpath, field.type)
	}
}

/**
 * @param {*} value
 * @param {Data} data
 * @param {string} path
 * @param {Type} type
 * @throws if the value is invalid
 * @private
 */
_writeArray(value: any, data: Data, path: string, type: Type) {
	var i, len
	if (!Array.isArray(value)) {
		throw new TypeError('Expected an Array at ' + path)
	}
	len = value.length
	this.types.uint.write(len, data)
	for (i = 0; i < len; i++) {
		type.write(value[i], data, path + '.' + i)
	}
}

/**
 * This funciton will be executed only the first time
 * After that, we'll compile the read routine and add it directly to the instance
 * @param {ReadState} state
 * @return {*}
 * @throws if fails
 */
read(state: ReadState) {
	this.read = this._compileRead()
	this.read(state);
}

/**
 * Return a signature for this type. Two types that resolve to the same hash can be said as equivalents
 * @return {Buffer}
 */
getHash() {
	var hash = new Data
	hashType(this, false, false)
	return hash.toBuffer()

	/**
	 * @param {Type} type
	 * @param {boolean} array
	 * @param {boolean} optional
	 */
	function hashType(type: Type, array: boolean, optional: boolean) {
		// Write type (first char + flags)
		// AOxx xxxx
		hash.writeUInt8((Type.prototype.TYPE & 0x3f) | (array ? 0x80 : 0) | (optional ? 0x40 : 0))

		if (Type.prototype.TYPE === Type.prototype.TYPE.ARRAY) {
			hashType(type.subType, false, false)
		} else if (Type.prototype.TYPE === Type.prototype.TYPE.OBJECT) {
			Type.prototype.types.uint.write(type.fields.length, hash)
			type.fields.forEach(function (field) {
				hashType(field.type, field.array, field.optional)
			})
		}
	}
}

/**
 * Compile the decode method for this object
 * @return {function(ReadState):*}
 * @private
 */
_compileRead() {
	if (this.type !== this.TYPE.OBJECT && this.type !== this.TYPE.ARRAY) {
		// Scalar type
		// In this case, there is no need to write custom code
		return this.types[this.type].read
	} else if (this.type === this.TYPE.ARRAY) {
		return this._readArray.bind(this, this.subType)
	}

	// As an example, compiling code to new Type({a:'int', 'b?':['string']}) will result in:
	// return {
	//     a: this.fields[0].type.read(state),
	//     b: this.types.boolean.read(state) ? this._readArray(state, this.fields[1].type) : undefined
	// }
	var code = 'return {' + this.fields.map(function (field, i) {
		var name = JSON.stringify(field.name),
			fieldStr = 'this.fields[' + i + ']',
			readCode, code

		if (field.array) {
			readCode = 'this._readArray(' + fieldStr + '.type, state)'
		} else {
			readCode = fieldStr + '.type.read(state)'
		}

		if (!field.optional) {
			code = name + ': ' + readCode
		} else {
			code = name + ': this.types.boolean.read(state) ? ' + readCode + ' : undefined'
		}
		return code
	}).join(',') + '}'

	return new Function('state', code)
}

/**
 * @param {Type} type
 * @param {ReadState} state
 * @return {Array}
 * @throws - if invalid
 * @private
 */
_readArray(type: Type, state: ReadState) {
	var arr = new Array(this.types.uint.read(state)),
		j
	for (j = 0; j < arr.length; j++) {
		arr[j] = type.read(state)
	}
	return arr
}
}