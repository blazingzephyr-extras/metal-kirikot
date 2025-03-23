'use strict'

export class Data {
	/**
	* Internal buffer
	* @member {Buffer}
	* @private
	*/
	private _buffer: Buffer = new Buffer(0);
	/**
	* Number of used bytes
	* @member {number}
	* @private
	*/
	private _length: number = 0;

	/**
	* A mutable-length write-only Buffer
	* @class
	* @param {number} [capacity=128] - initial Buffer size
	*/
	constructor(capacity: number = 0) {
	   this._buffer = new Buffer(capacity || 128);
	}
	/**
	* @param {Buffer} data
	*/
	appendBuffer(data: Buffer) {
		this._alloc(data.length)
		data.copy(this._buffer, this._length)
		this._length += data.length
	}
	/**
	* @param {number} value
	*/
	writeUInt8(value: number) {
		this._alloc(1)
		this._buffer.writeUInt8(value, this._length)
		this._length++
	}
	/**
	* @param {number} value
	*/
	writeUInt16(value: number) {
		this._alloc(2)
		this._buffer.writeUInt16BE(value, this._length)
		this._length += 2
	}
	/**
	* @param {number} value
	*/
	writeUInt32(value: number) {
		this._alloc(4)
		this._buffer.writeUInt32BE(value, this._length)
		this._length += 4
	}
	/**
	* @param {number} value
	*/
	writeDouble(value: number) {
		this._alloc(8)
		this._buffer.writeDoubleBE(value, this._length)
		this._length += 8
	}
	/**
    * Return the data as a Buffer.
	* Note: the returned Buffer and the internal Buffer share the same memory
	* @return {Buffer}
	*/
	toBuffer() {
		return this._buffer.slice(0, this._length)
	}
	/**
	* Alloc the given number of bytes
	* @param {number} bytes
	* @private
	*/
	_alloc(bytes: number) {
		var buffLen = this._buffer.length,
			newBuffer
	
		if (this._length + bytes > buffLen) {
			do {
				buffLen *= 2
			} while (this._length + bytes > buffLen)
	
			newBuffer = new Buffer(buffLen)
			this._buffer.copy(newBuffer, 0, 0, this._length)
			this._buffer = newBuffer
		}
	}
}