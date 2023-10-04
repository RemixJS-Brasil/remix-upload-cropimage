export const getPrevAndNextIds = (idList: number[], index: number) => {
  const [prevId] = index > 0 ? [idList[index - 1]] : [null];
  const [nextId] = index < idList.length - 1 ? [idList[index + 1]] : [null];

  return [prevId, nextId];
};
