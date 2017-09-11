export const characterNavToOrderedArray = (characters) => {
  // Order by script line count descending
  const characterKeys = Object.keys(characters);
  const characterNavArray = [];
  characterKeys.forEach( (character_id) => {
    characterNavArray.push(characters[character_id])
  });
  
  const compareFunc = (a, b) => {
    return parseInt(b.line_count) - parseInt(a.line_count)
  };

  characterNavArray.sort(compareFunc);

  return characterNavArray;
}
