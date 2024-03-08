export function removeFields<TIn, TOut>(object: TIn, fields: string[]): TOut {
  const copy = JSON.parse(JSON.stringify(object));
  for (const field of fields) delete copy[field];
  return copy;
}
