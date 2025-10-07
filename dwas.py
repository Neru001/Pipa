from abc import ABC, abstractmethod

# ===== Абстрактные классы =====

class Animal(ABC):
    """Интерфейс Животного."""
    @abstractmethod
    def speak(self) -> str:
        pass


class AnimalCreator(ABC):
    """Абстрактный Создатель (фабрика животных)."""
    @abstractmethod
    def create_animal(self) -> Animal:
        pass

    def introduce_animal(self) -> str:
        """Общая логика: познакомить с животным."""
        animal = self.create_animal()
        return f"Я создал животное, и оно говорит: {animal.speak()}"


# ===== Конкретные продукты =====

class Dog(Animal):
    def speak(self) -> str:
        return "Гав-гав!"


class Cat(Animal):
    def speak(self) -> str:
        return "Мяу!"


# ===== Конкретные создатели =====

class DogCreator(AnimalCreator):
    def create_animal(self) -> Animal:
        return Dog()


class CatCreator(AnimalCreator):
    def create_animal(self) -> Animal:
        return Cat()


# ===== Клиентский код =====

def client_code(creator: AnimalCreator):
    print(creator.introduce_animal())


if __name__ == "__main__":
    print("App: Запущено с DogCreator:")
    client_code(DogCreator())

    print("\nApp: Запущено с CatCreator:")
    client_code(CatCreator())