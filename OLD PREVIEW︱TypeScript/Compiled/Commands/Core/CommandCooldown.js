"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CooldownBucketType = void 0;
var CooldownBucketType;
(function (CooldownBucketType) {
    CooldownBucketType[CooldownBucketType["User"] = 0] = "User";
    CooldownBucketType[CooldownBucketType["Channel"] = 1] = "Channel";
    CooldownBucketType[CooldownBucketType["Guild"] = 2] = "Guild";
    CooldownBucketType[CooldownBucketType["Global"] = 3] = "Global";
})(CooldownBucketType = exports.CooldownBucketType || (exports.CooldownBucketType = {}));
