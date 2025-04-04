"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CommandAccess_1 = require("../Core/CommandAccess");
const CommandGroup_1 = require("../Core/CommandGroup");
const CommandResult_1 = require("../Core/CommandResult");
const CommandCooldown_1 = require("../Core/CommandCooldown");
exports.command = {
    Name: 'Update Guild',
    CommandGroup: CommandGroup_1.CommandGroup.Other,
    Usage: ['updateguild'],
    CommandAccess: CommandAccess_1.CommandAccess.Other,
    Cooldown: { BucketType: CommandCooldown_1.CooldownBucketType.User, CooldownDuration: 10 },
    RequiredPermissions: [],
    Execute: (context) => {
        return CommandResult_1.CommandResult.SuccessSilent();
    }
};
