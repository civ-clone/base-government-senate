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
   * A roll for a Senate that intervenes by chance, for a caller that has one, overriding the rule set's own. A rule
   * must not draw a number itself: the same question can be asked more than once (an action's criteria ask once for
   * each form it's offered in). The rule set keeps the turn's roll (and any other state, such as whether a Republic's
   * Senate is in session this turn) as saved state of its own and its rule reads it, so a reloaded game doesn't roll
   * again.
   */
  roll?: number;
  [key: string]: unknown;
}
/**
 * Whether `player`'s Senate steps in to stop it doing something to `other` (`null` when the caller doesn't know who),
 * for example breaking a treaty. The Senate intervenes when any rule says so; with no rules, it never does.
 */
export declare class SenateIntervenes extends Rule<
  [Player, Player | null, SenateContext],
  boolean
> {}
export default SenateIntervenes;
