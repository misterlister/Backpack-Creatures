from classes import CreatureType

fireType = CreatureType("fire")
radiantType = CreatureType("radiant")
waterType = CreatureType("water")
coldType = CreatureType("cold")
earthType = CreatureType("earth")
metalType = CreatureType("metal")
airType = CreatureType("air")
electricType = CreatureType("electric")
beastType = CreatureType("beast")
plantType = CreatureType("plant")
necroticType = CreatureType("necrotic")
arcaneType = CreatureType("arcane")

fireType.add_weaknesses([waterType, earthType, airType, arcaneType])
fireType.add_resistances([fireType, coldType, metalType, plantType])

radiantType.add_weaknesses([arcaneType])
radiantType.add_resistances([radiantType, necroticType])

waterType.add_weaknesses([coldType, electricType, plantType, arcaneType])
waterType.add_resistances([fireType, waterType, earthType])

coldType.add_weaknesses([fireType, arcaneType])
coldType.add_resistances([coldType, necroticType])

earthType.add_weaknesses([waterType, airType, plantType])
earthType.add_resistances([fireType, electricType])

metalType.add_weaknesses([fireType, earthType, electricType])
metalType.add_resistances([coldType, metalType, beastType, plantType, arcaneType])

airType.add_weaknesses([electricType, arcaneType])
airType.add_resistances([earthType, beastType])

electricType.add_weaknesses([earthType, plantType, arcaneType])
electricType.add_resistances([metalType, airType, electricType])

beastType.add_weaknesses([metalType, necroticType])
beastType.add_resistances([plantType, arcaneType])

plantType.add_weaknesses([fireType, coldType, beastType, necroticType])
plantType.add_resistances([waterType, earthType, electricType, plantType])

necroticType.add_weaknesses([fireType, radiantType, coldType])
necroticType.add_resistances([beastType, necroticType, arcaneType])

arcaneType.add_weaknesses([earthType, metalType, beastType, plantType, necroticType])
arcaneType.add_resistances([radiantType, airType, arcaneType])