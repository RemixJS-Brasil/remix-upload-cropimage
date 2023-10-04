export type Cx = (...a: Array<undefined | null | string | boolean>) => string;

export const cx: Cx = (...args) =>
  args
    .flat()
    .filter((x) => x !== null && x !== undefined && typeof x !== "boolean")
    .join(" ");
