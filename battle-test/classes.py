from constants import EFFECTIVEMUL, INEFFECTIVEMUL, STABONUS, CRITBONUS, BASECRITCHANCE
from math import floor
from random import randint

class CreatureType:
    def __init__(self,
                 name: str
                 ) -> None:
        self.name = name
        self.weaknesses = []
        self.resistances = []
        
    def add_weaknesses(self, types: list):
        for type in types:
            self.weaknesses.append(type)
        
    def add_resistances(self, types: list):
        for type in types:
            self.resistances.append(type)
        
    def get_effectiveness(self, attackType) -> int:
        if attackType in self.weaknesses:
            return EFFECTIVEMUL
        if attackType in self.resistances:
            return INEFFECTIVEMUL
        return 1

class Move:
    def __init__(self,
                 name: str,
                 type: CreatureType,
                 description: str,
                 power: int,
                 variance: int,
                 energy: int,
                 magic: bool) -> None:
        self.name = name
        self.type = type
        self.description = description
        self.power = power
        self.variance = variance
        self.energy = energy
        self.magic = magic

class Species:
    def __init__(self,
                 name: str,
                 type1: CreatureType,
                 type2: CreatureType,
                 baseHP: int,
                 baseEnergy: int,
                 baseStrength: int,
                 baseMagic: int,
                 baseDefense: int,
                 baseResistance: int,
                 baseSpeed: int,
                 baseSkill: int
                 ) -> None:
        self.name = name
        self.type1 = type1
        self.type2 = type2
        self.baseHP = baseHP
        self.baseEnergy = baseEnergy
        self.baseStrength = baseStrength
        self.baseMagic = baseMagic
        self.baseSkill = baseSkill
        self.baseSpeed = baseSpeed
        self.baseDefense = baseDefense
        self.baseResistance = baseResistance

class Creature:
    def __init__(self,
                 nickname: str,
                 species: Species,
                 level: int
                 ) -> None:
        self.nickname = nickname
        self.species = species
        self.level = level
        self.stats = {}
        self.currentStats = {}
        self.generate_stats()
        self.reset_current_stats()
        self.defeated = False
        
    def generate_stats(self):
        self.stats["hp"] = self.calculate_hp()
        self.stats["energy"] = self.calculate_energy()
        self.stats["strength"] = self.calculate_stat(self.species.baseStrength)
        self.stats["magic"] = self.calculate_stat(self.species.baseMagic)
        self.stats["skill"] = self.calculate_stat(self.species.baseSkill)
        self.stats["speed"] = self.calculate_stat(self.species.baseSpeed)
        self.stats["defense"] = self.calculate_stat(self.species.baseDefense)
        self.stats["resistance"] = self.calculate_stat(self.species.baseResistance)
    
    def reset_current_stats(self):
        self.currentStats["hp"] = self.stats["hp"]
        self.currentStats["energy"] = self.stats["energy"]
        self.currentStats["strength"] = self.stats["strength"]
        self.currentStats["magic"] = self.stats["magic"]
        self.currentStats["skill"] = self.stats["skill"]
        self.currentStats["speed"] = self.stats["speed"]
        self.currentStats["defense"] = self.stats["defense"]
        self.currentStats["resistance"] = self.stats["resistance"]
        
    def calculate_hp(self):
        HP = self.species.baseHP * 2 * self.level
        HP /= 100
        HP += self.level + 10
        return floor(HP)
        
    def calculate_energy(self):
        energy = self.species.baseEnergy * 2 * self.level
        energy /= 100
        energy += self.level + 30
        return floor(energy)
        
    def calculate_stat(self, baseStat):
        stat = baseStat * 2 * self.level
        stat /= 100
        stat += 5
        return floor(stat)
    
    def get_effectiveness(self, attackType) -> float:
        if self.species.type1:
            type1eff = self.species.type1.get_effectiveness(attackType)
        else: 
            type1eff = 1
        if self.species.type2:
            type2eff = self.species.type2.get_effectiveness(attackType)
        else: 
            type2eff = 1
        return round((type1eff * type2eff), 2)
    
    def get_stab(self, attackType) -> float:
        stab = 1
        if self.species.type1 == attackType:
            stab += STABONUS
            if self.species.type2 == None:
                stab += STABONUS
        elif self.species.type2 == attackType:
            stab += STABONUS
        return stab
    
    def use_move(self, move: Move, target):
        if self.currentStats["energy"] < move.energy:
            print(f"{self.nickname} cannot use {move.name}! It does not have enough energy!")
            return
        self.currentStats["energy"] -= move.energy
        crit = self.check_crit()
        if crit:
            critMsg = "Critical Hit! "
        else:
            critMsg = ""
        damage = calculate_damage(self, target, move, crit)
        effectiveness = target.get_effectiveness(move.type)
        if effectiveness == 1.00:
            effectMsg = ""
        elif effectiveness == 0.67:
            effectMsg = "It is ineffective."
        elif effectiveness == 0.44:
            effectMsg = "It is very ineffective!"
        elif effectiveness == 1.5:
            effectMsg = "It is effective."
        elif effectiveness == 2.25:
            effectMsg = "It is very effective!"
        else:
            effectMsg = "ERROR!"
        print(f"{self.nickname} attacked {target.nickname} with {move.name}. {critMsg}{effectMsg}")
        target.take_damage(damage)
        
    def take_damage(self, damage):
        print(f"{self.nickname} took {damage} points of damage!")
        self.currentStats["hp"] -= damage
        if self.currentStats["hp"] <= 0:
            self.defeated = True
            print(f"{self.nickname} has been defeated!")
            
    def check_crit(self):
        crit_chance = BASECRITCHANCE + self.currentStats["skill"]
        if randint(1, 1000) < crit_chance:
            return True
        return False
        

    def __repr__(self):
        type1 = self.species.type1.name
        if self.species.type2 is not None:
            type2 = f"/{self.species.type2.name}"
        else:
            type2 = ""
        return(f"""
Nickname:   {self.nickname}
Species:    {self.species.name}
Type:       {type1}{type2}
Level:      {self.level}
HP:         {self.currentStats["hp"]}/{self.stats["hp"]}
Energy:     {self.currentStats["energy"]}/{self.stats["energy"]}
Strength:   {self.stats["strength"]}
Magic:      {self.stats["magic"]}
Skill:      {self.stats["skill"]}
Speed:      {self.stats["speed"]}
Defense:    {self.stats["defense"]}
Resistance: {self.stats["resistance"]}
""")
        
def calculate_damage(attacker: Creature, target: Creature, move: Move, crit: bool = False) -> int:
    if move.magic:
        offence = attacker.stats["magic"]
        defence = target.stats["resistance"]
    else:
        offence = attacker.stats["strength"]
        defence = target.stats["defense"]
    
    if crit:
        defence = round(defence / CRITBONUS)
        
    varianceRange = round(move.variance / (attacker.stats["skill"]/target.stats["speed"]))
    print("speeddifference", round(attacker.stats["skill"]/target.stats["speed"], 2))
    print("varianceRange", varianceRange)
    variance = (randint(int(100-varianceRange), 100)) / 100
    print("variance", variance)
    effectiveness = target.get_effectiveness(move.type)
    stab = attacker.get_stab(move.type)
    print("stab", stab)
        
    damage = ((attacker.level * 2) / 5) + 2
    damage *= (move.power * (offence / defence))
    damage /= 50
    damage += 2
    if crit:
        damage *= CRITBONUS
    damage *= variance * effectiveness * stab
    
    return round(damage)
