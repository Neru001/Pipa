students = [
    {"name": "Aliya", "course": 2, "gpa": -3.4},
    {"name": "Dana", "course": 1, "gpa": 3.9},
    {"name": "Erik", "course": 2, "gpa": 3.8},
    {"name": "Madi", "course": 1, "gpa": 3.1}
]
students.sort(key=lambda s: (s['course'], -s['gpa']))
print(students)



# a = [
#     {'name': 'Aida', 'age': 23},
#     {'name': 'Dias', 'age': 19},
#     {'name': 'Mira', 'age': 25}
# ]
# a.sort(key=lambda p: p['age'])
# print(a)
