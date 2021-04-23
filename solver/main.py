import time
from actions import Action
import random


class Solver:
    def __init__(self):
        pass


def main():
    while True:
        state = input()
        
        print(random.choice(list(Action)).value)


main()
