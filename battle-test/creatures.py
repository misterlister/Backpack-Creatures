from classes import Creature, Species
from species import *

creatures1 = [Creature(f"{spec.name}:1", spec, 1) for spec in speciesList]

creatures10 = [Creature(f"{spec.name}:10", spec, 10) for spec in speciesList]

creatures50 = [Creature(f"{spec.name}:50", spec, 50) for spec in speciesList]

creatures100 = [Creature(f"{spec.name}:100", spec, 100) for spec in speciesList]