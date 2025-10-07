from dataclasses import dataclass

@dataclass(frozen=True)
class Animal:
    name: str
    species: str
    age: int

    def have_birthday(self) -> "Animal":
        # Жаңа объект қайта жасалады (жасы +1)
        return Animal(self.name, self.species, self.age + 1)

@dataclass(frozen=True)
class Enclosure:
    name: str
    animals: list

    def add_animal(self, animal: Animal) -> "Enclosure":
        # Ескі тізім өзгермейді, жаңасы құрылады
        return Enclosure(self.name, self.animals + [animal])

# Қолдану мысалы
if __name__ == "__main__":
    lion = Animal("Симба", "Арыстан", 5)
    print("Бастапқы жануар:", lion)

    lion_older = lion.have_birthday()
    print("Туған күннен кейін:", lion_older)

    savanna = Enclosure("Саванна", [lion])
    print("Бастапқы вольер:", savanna)

    zebra = Animal("Марти", "Зебра", 4)
    new_savanna = savanna.add_animal(zebra)

    print("Жаңа вольер (жануар қосылды):", new_savanna)
    print("Ескі вольер өзгеріссіз:", savanna)
