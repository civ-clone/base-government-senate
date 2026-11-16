import SenateIntervenes, { SenateContext } from '../Rules/SenateIntervenes';
import { hasSenate, senateIntervenes } from '../lib/senate';
import AvailableGovernmentRegistry from '@civ-clone/core-government/AvailableGovernmentRegistry';
import Criterion from '@civ-clone/core-rule/Criterion';
import Democracy from '@civ-clone/base-government-democracy/Democracy';
import Effect from '@civ-clone/core-rule/Effect';
import Government from '@civ-clone/core-government/Government';
import Player from '@civ-clone/core-player/Player';
import PlayerGovernment from '@civ-clone/core-government/PlayerGovernment';
import PlayerGovernmentRegistry from '@civ-clone/core-government/PlayerGovernmentRegistry';
import Republic from '@civ-clone/base-government-republic/Republic';
import RuleRegistry from '@civ-clone/core-rule/RuleRegistry';
import { expect } from 'chai';

class Monarchy extends Government {}
class Oligarchy extends Government {}

describe('hasSenate', (): void => {
  const ruleRegistry = new RuleRegistry(),
    playerGovernmentRegistry = new PlayerGovernmentRegistry(),
    governed = (government: Government | null): Player => {
      const player = new Player(ruleRegistry),
        playerGovernment = new PlayerGovernment(
          player,
          new AvailableGovernmentRegistry(),
          ruleRegistry
        );

      if (government !== null) {
        playerGovernment.set(government);
      }

      playerGovernmentRegistry.register(playerGovernment);

      return player;
    };

  it('is the Republic and Democracy', (): void => {
    expect(hasSenate(governed(new Republic()), playerGovernmentRegistry)).true;
    expect(hasSenate(governed(new Democracy()), playerGovernmentRegistry)).true;
    expect(hasSenate(governed(new Monarchy()), playerGovernmentRegistry)).false;
  });

  it('is none for a player with no government yet, or none registered', (): void => {
    expect(hasSenate(governed(null), playerGovernmentRegistry)).false;
    expect(hasSenate(new Player(ruleRegistry), playerGovernmentRegistry)).false;
  });

  it('is the governments a rule set names', (): void => {
    expect(
      hasSenate(governed(new Oligarchy()), playerGovernmentRegistry, [
        Oligarchy,
      ])
    ).true;
    expect(
      hasSenate(governed(new Republic()), playerGovernmentRegistry, [Oligarchy])
    ).false;
  });
});

describe('senateIntervenes', (): void => {
  const player = new Player(),
    other = new Player();

  it('never intervenes without rules', (): void => {
    expect(senateIntervenes(player, other, {}, new RuleRegistry())).false;
    expect(senateIntervenes(player, null, {}, new RuleRegistry())).false;
  });

  it('intervenes when any rule says so', (): void => {
    const ruleRegistry = new RuleRegistry();

    ruleRegistry.register(
      new SenateIntervenes(new Effect((): boolean => false))
    );

    expect(senateIntervenes(player, other, {}, ruleRegistry)).false;

    ruleRegistry.register(
      new SenateIntervenes(new Effect((): boolean => true))
    );

    expect(senateIntervenes(player, other, {}, ruleRegistry)).true;
  });

  it('gives the rules the player, the other player and the context', (): void => {
    const ruleRegistry = new RuleRegistry(),
      asked: [Player, Player | null, SenateContext][] = [],
      context: SenateContext = {
        reason: 'break-treaty',
        reputation: 2,
        sneakAttack: true,
        bonus: 50,
        roll: 37,
      };

    ruleRegistry.register(
      new SenateIntervenes(
        new Criterion(
          (
            player: Player,
            other: Player | null,
            context: SenateContext
          ): boolean => context.reason === 'break-treaty'
        ),
        new Effect(
          (
            player: Player,
            other: Player | null,
            context: SenateContext
          ): boolean => {
            asked.push([player, other, context]);

            return (context.roll ?? 0) >= (context.bonus ?? 0);
          }
        )
      )
    );

    expect(senateIntervenes(player, other, context, ruleRegistry)).false;
    expect(
      senateIntervenes(player, null, { ...context, roll: 50 }, ruleRegistry)
    ).true;
    expect(senateIntervenes(player, other, { reason: 'scandal' }, ruleRegistry))
      .false;
    expect(asked).length(2);
    expect(asked[0]).to.deep.equal([player, other, context]);
    expect(asked[1][1]).null;
  });
});
