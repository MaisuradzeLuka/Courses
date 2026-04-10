const min = 16;
const max = 120;

export const ageData = Array.from({ length: max - min + 1 }, (_, i) => {
  const age = i + min;
  return {
    id: age,
    label: String(age),
    value: age,
  };
});
