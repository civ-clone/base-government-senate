import SenateIntervenes, { SenateContext } from '../Rules/SenateIntervenes';
import Democracy from '@civ-clone/base-government-democracy/Democracy';
import Government from '@civ-clone/core-government/Government';
import Player from '@civ-clone/core-player/Player';
import { PlayerGovernmentRegistry } from '@civ-clone/core-government/PlayerGovernmentRegistry';
import Republic from '@civ-clone/base-government-republic/Republic';
import { RuleRegistry } from '@civ-clone/core-rule/RuleRegistry';

/**
 * Whether `player` has a Senate: whether its government is one of `governments`, the Republic and Democracy unless
 * a rule set names others. A player with no government yet has none.
 */
export const hasSenate = (
  player: Player,
  playerGovernmentRegistry: PlayerGovernmentRegistry,
  governments: (typeof Government)[] = [Republic, Democracy]
): boolean => {
  try {
    return playerGovernmentRegistry.getByPlayer(player).is(...governments);
  } catch (e) {
    return false;
  }
};

/**
 * Whether `player`'s Senate steps in to stop it doing something to `other`: whether any `SenateIntervenes` rule says
 * so. With no rules, it never does.
 */
export const senateIntervenes = (
  player: Player,
  other: Player | null,
  context: SenateContext,
  ruleRegistry: RuleRegistry
): boolean =>
  ruleRegistry
    .process(SenateIntervenes, player, other, context)
    .some((intervenes: boolean): boolean => intervenes === true);

export default senateIntervenes;
