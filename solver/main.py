import time
from actions import Action
import random


def main():
    while True:
        state = input()
        
        time.sleep(0.9)
        
        print(random.choice(list(Action)))


main()
