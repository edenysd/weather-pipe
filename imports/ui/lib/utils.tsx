export const formToJson = (form: HTMLFormElement) => {
  const data = new FormData(form);
  return Object.fromEntries(data.entries());
};

export const parseFloatAndClamp = (str: string, min: number, max: number) => {
  return Math.min(Math.max(Number.parseFloat(str), min + 1e-8), max - 1e-8);
};
