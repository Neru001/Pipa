t = (int, str, str, float, int)
book = [t[i](x) if t[i] != str else x.strip() for i, x in enumerate(input().split(","))]

match book:
    case [_, author, title]:
        print("Yes")
    case [_, author, title, price]:
        print("Yes")
    case [_, author, title, price, year]:
        print("Yes")
    case _:
        print("No")


t = (int, str, str, float, int)
book = [t[i](x) if t[i] != str else x.strip() for i, x in enumerate(input().split(","))]

match book:
    case [_, author, title] if len(author) >= 6 and len(title) >= 10:
        print("Yes")
    case [_, author, title, price] if len(author) >= 6 and price > 0:
        print("Yes")
    case [_, author, title, year] if year >= 2020:
        print("Yes")
    case [_, author, title, price, year] if price > 0 and year >= 2020:
        print("Yes")
    case _:
        print("No")


cmd = ["rotate", 90]

match cmd:
    case ["move", x, y]:
        print(f"Перемещение в ({x}, {y})")
    case ["rotate", angle]:
        print(f"Поворот на {angle}°")
    case ["stop"]:
        print("Остановка")
    case _:
        print("Неизвестная команда")


def analyze(data):
    match data:
        case ("student", [name, score]):
            print(f"Студент {name} имеет балл {score}")
        case ("teacher", [name, subject]):
            print(f"Преподаватель {name} ведёт {subject}")
        case _:
            print("Неизвестный тип данных")

analyze(("student", ["Мансур", 95]))