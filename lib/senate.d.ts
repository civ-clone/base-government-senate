import { SenateContext } from '../Rules/SenateIntervenes';
import Government from '@civ-clone/core-government/Government';
import Player from '@civ-clone/core-player/Player';
import { PlayerGovernmentRegistry } from '@civ-clone/core-government/PlayerGovernmentRegistry';
import { RuleRegistry } from '@civ-clone/core-rule/RuleRegistry';
/**
 * Whether `player` has a Senate: whether its government is one of `governments`, the Republic and Democracy unless
 * a rule set names others. A player with no government yet has none.
 */
export declare const hasSenate: (
  player: Player,
  playerGovernmentRegistry: PlayerGovernmentRegistry,
  governments?: (typeof Government)[]
) => boolean;
/**
 * Whether `player`'s Senate steps in to stop it doing something to `other`: whether any `SenateIntervenes` rule says
 * so. With no rules, it never does.
 */
export declare const senateIntervenes: (
  player: Player,
  other: Player | null,
  context: SenateContext,
  ruleRegistry: RuleRegistry
) => boolean;
export default senateIntervenes;
