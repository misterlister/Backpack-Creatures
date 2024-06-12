from classes import Move
from creatureTypes import *

strike = Move("strike", 
              beastType, 
              "Strike a physical blow on a foe",
              50,
              15,
              1,
              False)

essenceDrain = Move("essence drain", 
              necroticType, 
              "Sap a foe's essence",
              70,
              25,
              1,
              True)