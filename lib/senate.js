"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.senateIntervenes = exports.hasSenate = void 0;
const SenateIntervenes_1 = require("../Rules/SenateIntervenes");
const Democracy_1 = require("@civ-clone/base-government-democracy/Democracy");
const Republic_1 = require("@civ-clone/base-government-republic/Republic");
/**
 * Whether `player` has a Senate: whether its government is one of `governments`, the Republic and Democracy unless
 * a rule set names others. A player with no government yet has none.
 */
const hasSenate = (player, playerGovernmentRegistry, governments = [Republic_1.default, Democracy_1.default]) => {
    try {
        return playerGovernmentRegistry.getByPlayer(player).is(...governments);
    }
    catch (e) {
        return false;
    }
};
exports.hasSenate = hasSenate;
/**
 * Whether `player`'s Senate steps in to stop it doing something to `other`: whether any `SenateIntervenes` rule says
 * so. With no rules, it never does.
 */
const senateIntervenes = (player, other, context, ruleRegistry) => ruleRegistry
    .process(SenateIntervenes_1.default, player, other, context)
    .some((intervenes) => intervenes === true);
exports.senateIntervenes = senateIntervenes;
exports.default = exports.senateIntervenes;
//# sourceMappingURL=senate.js.map