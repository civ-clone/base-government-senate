"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SenateIntervenes = void 0;
const Rule_1 = require("@civ-clone/core-rule/Rule");
/**
 * Whether `player`'s Senate steps in to stop it doing something to `other` (`null` when the caller doesn't know who),
 * for example breaking a treaty. The Senate intervenes when any rule says so; with no rules, it never does.
 */
class SenateIntervenes extends Rule_1.default {
}
exports.SenateIntervenes = SenateIntervenes;
exports.default = SenateIntervenes;
//# sourceMappingURL=SenateIntervenes.js.map