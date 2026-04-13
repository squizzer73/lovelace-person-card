// src/shared/condition-engine.ts
import type { Condition, ConditionRule, StyleEffect, HassLike } from './types';

function evaluateCondition(condition: Condition, hass: HassLike): boolean {
  const entityState = hass.states[condition.entity];
  if (!entityState) return false;

  const rawValue = condition.attribute != null
    ? entityState.attributes[condition.attribute]
    : entityState.state;

  const value = String(rawValue ?? '');
  const target = String(condition.value);
  const numValue = parseFloat(value);
  const numTarget = parseFloat(target);
  const numericOk = !isNaN(numValue) && !isNaN(numTarget);

  switch (condition.operator) {
    case 'eq':       return value === target;
    case 'neq':      return value !== target;
    case 'lt':       return numericOk && numValue < numTarget;
    case 'gt':       return numericOk && numValue > numTarget;
    case 'lte':      return numericOk && numValue <= numTarget;
    case 'gte':      return numericOk && numValue >= numTarget;
    case 'contains': return value.includes(target);
    default:         return false;
  }
}

/**
 * Evaluates an ordered list of ConditionRules against live HA state.
 * Rules are evaluated top-to-bottom; later matching rules overwrite conflicting effect keys.
 * The `contains` operator is case-sensitive.
 */
export function evaluateConditions(rules: ConditionRule[], hass: HassLike): StyleEffect {
  let result: StyleEffect = {};

  for (const rule of rules) {
    if (rule.conditions.length === 0) continue;

    const matches = rule.operator === 'or'
      ? rule.conditions.some(c => evaluateCondition(c, hass))
      : rule.conditions.every(c => evaluateCondition(c, hass));

    if (matches) {
      result = { ...result, ...rule.effect };
    }
  }

  return result;
}
