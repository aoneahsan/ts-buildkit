import { z as ZOD, ZodType } from 'zod';

/**
 * Create a Zod type for a numeric enum.
 *
 * @param {TValues} values - The values of the enum.
 * @returns {ZodType<TValues[number]>} The Zod type for the enum.
 */
export function numericEnum<TValues extends readonly number[]>(
  values: TValues
) {
  return ZOD.number().superRefine((val, ctx) => {
    if (!values.includes(val)) {
      ctx.addIssue({
        code: 'invalid_value',
        values: [...values],
        input: val,
      });
    }
  }) as ZodType<TValues[number]>;
}
