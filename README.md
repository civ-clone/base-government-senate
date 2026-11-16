# base-government-senate

Whether a player's Senate steps in, for example to stop it breaking a treaty: the `SenateIntervenes` rules, and the
usual Senate of a Republic or a Democracy.

This is a library: it registers nothing. A rule set registers its own `SenateIntervenes` rules.

## `Rules/SenateIntervenes`

`SenateIntervenes(player, other, context) → boolean` answers whether `player`'s Senate stops it doing something to
`other` (`null` when the caller doesn't know who). The Senate intervenes when any rule says so; with no rules, it never
does.

`context` (`SenateContext`) carries what the caller knows. Every field is optional, and a rule set may pass more:

- `reason`: what the player is about to do, such as `'break-treaty'`, `'refuse-offer'`, `'ignore-audience'` or
  `'scandal'`;
- `reputation`: the other player's reputation;
- `sneakAttack`: whether the other player attacked this one without declaring war;
- `bonus`: how much more likely the Senate is to stand aside, from a wonder for example;
- `roll`: a roll for a Senate that intervenes by chance, for a caller that has one; it overrides the rule set's own.

A rule should not draw a random number itself. The same question can be asked more than once for one decision (an
action's criteria ask once for each form it's offered in). A Senate that intervenes by chance (Civilization II's: a roll
each turn, and a Republic's Senate in session one turn in three) keeps the turn's roll and that flag as the rule set's
own saved state, rolled once a turn, and its rule reads them. The state must be saved: a reloaded game must not roll
again.

## `lib/senate`

- `hasSenate(player, playerGovernmentRegistry, governments = [Republic, Democracy])`: whether the player's government is
  one with a Senate. A player with no government yet has none.
- `senateIntervenes(player, other, context, ruleRegistry)`: whether any `SenateIntervenes` rule says the Senate steps in.

A rule set whose Senate always stops a Republic or a Democracy breaking a treaty registers:

```ts
new SenateIntervenes(
  'my-rules:senate',
  new Effect((player: Player): boolean =>
    hasSenate(player, playerGovernmentRegistry)
  )
);
```

and asks `senateIntervenes(player, other, { reason: 'break-treaty' }, ruleRegistry)` where it would break one.

## Who asks

- civ1-unit's unit actions ask `senateIntervenes` before breaking a treaty, and civ1-unit registers Civ1's rule.
- The diplomacy readers don't ask the rule yet: base-diplomacy's `Readers.hasSenate` is a rule set's own predicate, and
  civ1-diplomacy answers it with its own `republican` (Republic or Democracy, the same answer as Civ1's rule).
  base-diplomacy's reader is being widened to take the other player, and civ2-diplomacy will route it through
  `senateIntervenes`. Civ1's diplomacy stays on its own predicate.
