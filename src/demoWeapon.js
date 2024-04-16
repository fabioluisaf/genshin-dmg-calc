const demoWeapon = {
  weaponName: "Wolf's Gravestone",
  weaponType: "Claymore",
  level: 90,
  baseAtk: 608.07,
  substat: "atkPct",
  substatVal: 0.4962,
  passive: {
    attrNames: ["atkPct"],
    passiveDown: {
      variationName: " -- Passive Down",
      attrValues: [[0.2, 0.25, 0.3, 0.35, 0.4]]
    },
    passiveUp: {
      variationName: " -- Passive Up",
      attrValues: [[0.6, 0.75, 0.9, 1.05, 1.2]]
    },
    passiveAvg: {
      variationName: " -- Passive Avg",
      // "Passive stays up for 12s and down for 18s"
      attrValues: [[0.36, 0.45, 0.54, 0.63, 0.72]] 
    }
  }
}

export default demoWeapon;