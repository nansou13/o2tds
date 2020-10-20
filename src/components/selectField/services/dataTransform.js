import { forgeFieldValue, forgeMultipleFieldValues } from '../../../services/dataTransform';

export const forgeSelectFieldValue = (value) =>
  Array.isArray(value)
    ? forgeMultipleFieldValues(value.map((obj) => obj.key))
    : forgeFieldValue(value && value.key);
