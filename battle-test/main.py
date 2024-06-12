from creatures import *
from moves import *
from creatureTypes import *

"""print("----------level 1----------")
for creature in creatures1:
    print(creature)"""
    
"""print("----------level 10----------")
for creature in creatures10:
    print(creature)"""
"""
print("----------level 50----------")
for creature in creatures50:
    print(creature)

print("----------level 100----------")
for creature in creatures100:
    print(creature)"""

creatureGroup = creatures50
print("----------Battles----------")
for i in range(len(creatureGroup)):
    creatureGroup[i].use_move(strike, creatureGroup[-(i+1)])
    print("----")

for i in range(len(creatureGroup)):
    creatureGroup[i].use_move(essenceDrain, creatureGroup[-(i+1)])
    print("----")

print("----------outcome----------")
for creature in creatureGroup:
    print(creature)



"""print("beast weaknesses")
for weak in beastType.weaknesses:
    print (weak.name)
    
print("beast resistances")
for res in beastType.resistances:
    print (res.name)"""