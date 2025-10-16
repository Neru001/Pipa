numbers = [1, 2, 3, 4, 5, 6, 7, 8]
print(list(filter(lambda x: x % 2 == 0, numbers)))

nums = [-5, -2, 0, 3, 7, -1, 4]
print(list(filter(lambda x: x >= 0, nums)))

words = ["hi", "map", "python", "go", "filter"]
print(list(filter(lambda w: len(w) > 3, words)))

a = [1, 2, 3]
b = ["one", "two", "three"]
print(list(zip(a, b)))

keys = ["name", "age", "city"]
values = ["Aida", 20, "Almaty"]
print(dict(zip(keys, values)))

names = ["Aida", "Askar", "Dana"]
ages = [20, 25, 22]
cities = ["Astana", "Almaty", "Shymkent"]
print(list(zip(names, ages, cities)))


names = ["Aida", "Askar", "Dana", "Miras"]
scores = [45, 90, 55, 30]
subjects = ["Math", "Physics", "History", "Biology"]

data = zip(names, scores, subjects)
print(list(filter(lambda x: x[1] > 50, data)))