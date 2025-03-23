'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.Field = void 0;
var Type_1 = require("js-binary/lib/Type");
/**
 * Parse and represent an object field. See example in Type.js
 * @class
 * @param {string} name
 * @param {string|Object|Array<string>|Array<Object>} type
 */
var Field = /** @class */ (function () {
    function Field(name, type) {
        /** @member {boolean} */
        this.optional = false;
        /** @member {string} */
        this.name = "";
        /** @member {boolean} */
        this.array = false;
        /** @member {Type} */
        this.type = new Type_1.Type("");
        if (name[name.length - 1] === '?') {
            this.optional = true;
            name = name.substr(0, name.length - 1);
        }
        this.name = name;
        this.array = Array.isArray(type);
        if (this.array) {
            var typeArray = type;
            if (typeArray.length !== 1) {
                throw new TypeError('Invalid array type, it must have exactly one element');
            }
            type = typeArray[0];
        }
        this.type = type;
    }
    return Field;
}());
exports.Field = Field;
