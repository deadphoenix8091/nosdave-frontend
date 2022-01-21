import Vue from 'vue';
Vue.filter('ability', function (value) {
  let map = { 
    "str": "STR", 
    "dex": "DEX", 
    "int": "INT", 
    "sta": "STA", 
    "speed": "Speed", 
    "attackspeed": "Attack Speed", 
    "attackspeedrate": "Attack Speed", 
    "jumpheight": "Jump Height", 
    "bowrange": "Bow Range", 
    "def": "DEF", 
    "parry": "Parry", 
    "reflectdamage": "Reflect Damage", 
    "rangedblock": "Ranged Block", 
    "meleeblock": "Melee Block", 
    "magicdefense": "Magic Defense", 
    "electricitydefense": "Electricity Defense", 
    "firedefense": "Fire Defense", 
    "winddefense": "Wind Defense", 
    "waterdefense": "Water Defense", 
    "earthdefense": "Earth Defense", 
    "attack": "Attack", 
    "hitrate": "Hit Rate", 
    "magicattack": "Magic Attack", 
    "swordattack": "Sword Attack", 
    "axeattack": "Axe Attack", 
    "knuckleattack": "Knuckle Attack", 
    "yoyoattack": "Yo-Yo Attack", 
    "bowattack": "Bow Attack", 
    "earthmastery": "Earth Mastery", 
    "firemastery": "Fire Mastery", 
    "watermastery": "Water Mastery", 
    "electricitymastery": "Electricity Mastery", 
    "windmastery": "Wind Mastery", 
    "damage": "Damage", 
    "criticalchance": "Critical Chance", 
    "elementattack": "Element Attack", 
    "skillchance": "Skill Chance", 
    "attribute": "Attribute", 
    "maxhp": "Max. HP", 
    "maxmp": "Max. MP", 
    "maxfp": "Max. FP", 
    "hprecovery": "HP Recovery", 
    "mprecovery": "MP Recovery", 
    "fprecovery": "FP Recovery", 
    "hprecoveryafterkill": "hprecoveryafterkill", 
    "mprecoveryafterkill": "mprecoveryafterkill", 
    "fprecoveryafterkill": "fprecoveryafterkill", 
    "decreasedmpconsumption": "decreasedmpconsumption", 
    "decreasedfpconsumption": "decreasedfpconsumption", 
    "minability": "Min. Ability", 
    "maxability": "Max. Ability", 
    "attributeimmunity": "Attribute Immunity", 
    "autohp": "autohp", 
    "decreasedcastingtime": "Decreased Casting Time", 
    "criticaldamage": "Critical Damage", 
    "skilldamage": "Skill Damage", 
    "hprestoration": "HP Restoration", 
    "criticalresist": "Critical Resist", 
    "healing": "Healing", 
    "pvpdamagereduction": "PVP Damage Reduction", 
    "magicdefense": "Magic Defense", 
    "pvpdamage": "PVP Damage", 
    "pvedamage": "PVE Damage", 
    "penya": "Penya", 
    "hp": "HP", 
    "mp": "MP", 
    "fp": "FP", 
    "allelementsdefense": "All Elements Defense", 
    "allstats": "All Stats", 
    "attackandmaxhp": "attackandmaxhp", 
    "defenseandhitratedecrease": "defenseandhitratedecrease", 
    "cure": "cure", 
    "movement": "movement", 
    "allelementsmastery": "allelementsmastery", 
    "allrecovery": "allrecovery", 
    "allrecoveryafterkill": "allrecoveryafterkill", 
    "decreasedfpandmpconsumption": "decreasedfpandmpconsumption", 
    "removealldebuff": "removealldebuff", 
    "block": "block", 
    "removedebuff": "removedebuff", 
    "damageandstealhp": "damageandstealhp", 
    "stealhp": "Steal HP", 
    "explostdecreaseatrevival": "explostdecreaseatrevival", 
    "cheerpoint": "Cheer Point"
  };
  return map[value];
});