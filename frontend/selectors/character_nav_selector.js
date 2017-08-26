export const characterNavToArray = (characters) => {
  const characterKeys = Object.keys(characters);
  const characterNavArray = [];
  characterKeys.forEach( (character_id) => {
    characterNavArray.push(characters[character_id])
  });
  return characterNavArray;
}
