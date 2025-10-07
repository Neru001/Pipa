# # 1. Сандарды өсу ретімен сұрыптау
# a = [7, 3, 9, 1, 4]
# a.sort()
# print(a)  # [1, 3, 4, 7, 9]

# # 2. Сандарды кему ретімен сұрыптау
# a = [2, 8, 5, 1]
# a.sort(reverse=True)
# print(a)  # [8, 5, 2, 1]

# # 3. Жолдарды алфавит бойынша сұрыптау
# a = ['banana', 'apple', 'cherry']
# a.sort()
# print(a)
# # 4. Сөздерді ұзындығы бойынша сұрыптау
# a = ["python", "ai", "informatics", "data"]
# a.sort(key=len)
# print(a)  # ['ai', 'data', 'python', 'informatics']

# # 5. Сандарды абсолюттік мәні бойынша сұрыптау
# a = [-5, 2, -1, 7, -3]
# a.sort(key=abs)
# print(a)  # [-1, 2, -3, -5, 7]

# 6. Сөздердің соңғы әрпі бойынша сұрыптау
a = ["car", "dog", "apple", "sun"]
a.sort(key=lambda w: w[-1])
print(a)  # ['banana', 'car', 'dog', 'sun']

# # 7. Кортеждер тізімін екінші элементі бойынша сұрыптау
# a = [(1, 5), (2, 3), (4, 1)]
# a.sort(key=lambda x: x[1])
# print(a)  # [(4, 1), (2, 3), (1, 5)]

# # 8. Сөздік тізімін ‘age’ өрісі бойынша сұрыптау
# a = [
#     {'name': 'Aida', 'age': 23},
#     {'name': 'Dias', 'age': 19},
#     {'name': 'Mira', 'age': 25}
# ]
# a.sort(key=lambda p: p['age'])
# print(a)
# # [{'name': 'Dias', 'age': 19}, {'name': 'Aida', 'age': 23}, {'name': 'Mira', 'age': 25}]

# # 9. Тек жұп сандарды алып, өсу ретімен сұрыптау
# numbers = [5, 8, 2, 7, 4, 9, 6]
# even_sorted = sorted([n for n in numbers if n % 2 == 0])
# print(even_sorted)  # [2, 4, 6, 8]

# # 10. Студенттерді курс бойынша (өсу), GPA бойынша (кему)
# students = [
#     {"name": "Aliya", "course": 2, "gpa": 3.4},
#     {"name": "Dana", "course": 1, "gpa": 3.9},
#     {"name": "Erik", "course": 2, "gpa": 3.8},
#     {"name": "Madi", "course": 1, "gpa": 3.1}
# ]
# students.sort(key=lambda s: (s['course'], -s['gpa']))
# print(students)
# # [{'name': 'Dana', 'course': 1, 'gpa': 3.9}, {'name': 'Madi', 'course': 1, 'gpa': 3.1}, {'name': 'Erik', 'course': 2, 'gpa': 3.8}, {'name': 'Aliya', 'course': 2, 'gpa': 3.4}]

# # 11. Сөздерді дауысты әріптер саны бойынша сұрыптау
# a = ["river", "road", "angel", "girl", "lonely"]
# vowels = "aeiou"
# a.sort(key=lambda w: sum(ch in vowels for ch in w))
# print(a)  # ['road', 'girl', 'river', 'angel', 'lonely']
