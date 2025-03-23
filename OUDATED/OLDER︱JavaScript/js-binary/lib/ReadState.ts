'use strict'

/**
 * Wraps a buffer with a read head pointer
 * @class
 * @param {Buffer} buffer
 */
export class ReadState { 
	/**
	 * @member {Buffer}
	 * @private
	 */
	private _buffer: Buffer = new Buffer(0);
	/**
	* @member {number}
	* @private
	*/
	private _offset: number = 0;

	constructor(buffer: Buffer) {
		this._buffer = buffer;
	}
	/**
	* Read one byte but don't advance the read pointer
	* @returns {number}
	*/
	public peekUInt8() {
		return this._buffer.readUInt8(this._offset);
	}
	/**
	* Read one byte and advance the read pointer
	* @returns {number}
	*/
	public readUInt8() {
		return this._buffer.readUInt8(this._offset++);
	}
	/**
	* @returns {number}
	*/
	readUInt16() {
		var r = this._buffer.readUInt16BE(this._offset);
		this._offset += 2;
		return r;
	}
	/**
	* @returns {number}
	*/
	readUInt32() {
		var r = this._buffer.readUInt32BE(this._offset);
		this._offset += 4;
		return r;
	}
	/**
	* @returns {number}
	*/
	readDouble() {
		var r = this._buffer.readDoubleBE(this._offset);
		this._offset += 8;
		return r;
	}
	/**
	* @param {number} length
	* @returns {Buffer}
	*/
	readBuffer(length: number) {
		if (this._offset + length > this._buffer.length) {
			throw new RangeError('Trying to access beyond buffer length');
		}
		var r = this._buffer.slice(this._offset, this._offset + length);
		this._offset += length;
		return r;
	}
	/**
	* @return {boolean}
	*/
	hasEnded() {
		return this._offset === this._buffer.length
	}
}