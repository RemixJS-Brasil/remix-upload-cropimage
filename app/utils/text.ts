/**
 * Truncates the text adding an ellipsis at the end.
 * @param text - the text to be truncated
 * @param length - the number of characters to be returned before the ellipsis. Defaults to 25.
 */
export const truncateText = (text: string, length: number = 25) =>
  `${text.slice(0, length)}...`;
