function getBuffVariations(equipment) {
  const buffVariations = Object.keys(equipment.passive);
  buffVariations.splice(0, 1);

  return buffVariations;
}

export default getBuffVariations;