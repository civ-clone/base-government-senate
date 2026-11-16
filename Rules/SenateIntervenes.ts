import Player from '@civ-clone/core-player/Player';
import Rule from '@civ-clone/core-rule/Rule';

/**
 * What a player's Senate is asked about. Every field is optional: a caller fills in what it knows, and a rule reads
 * what it needs. A rule set may pass more.
 */
export interface SenateContext {
  /**
   * What the player is about to do, for example `'break-treaty'` (moving or attacking across a treaty),
   * `'refuse-offer'`, `'ignore-audience'` or `'scandal'`.
   */
  reason?: string;
  /** The other player's reputation, as the rule set measures it. */
  reputation?: number;
  /** Whether the other player attacked this one without declaring war first. */
  sneakAttack?: boolean;
  /** How much more likely the Senate is to stand aside, from a wonder for example, as the rule set measures it. */
  bonus?: number;
  /**
   * This turn's roll, for a Senate that intervenes by chance. A rule must not draw it itself: the same question can be
   * asked more than once (an action's criteria ask once for each form it's offered in), so the caller passes a roll
   * the rule set keeps for the turn.
   */
  roll?: number;
  [key: string]: unknown;
}

/**
 * Whether `player`'s Senate steps in to stop it doing something to `other` (`null` when the caller doesn't know who),
 * for example breaking a treaty. The Senate intervenes when any rule says so; with no rules, it never does.
 */
export class SenateIntervenes extends Rule<
  [Player, Player | null, SenateContext],
  boolean
> {}

export default SenateIntervenes;
