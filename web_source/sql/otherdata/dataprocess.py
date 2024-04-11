# import os
# with open('./10k-pass.txt', 'wb+') as writeout:
#   with open('./10-million-password-list-top-10000.txt', 'rb') as readin:
#     for line in readin:
#       data = line[:-1]
#       data = b"('" + data + b"'),\n" 
#       # writeout.write(f"('{line[:-1]}'),\n")
#       writeout.write(data)

# chunk_size = 10000
# index = 0

# with open('./10k-pass.txt', 'rb') as readin:
#   while True:
#     chunk = readin.readlines(chunk_size)
#     if not chunk:
#       break
    
#     with open(f'./data_{index}.txt', 'wb+') as writeout:
#       for line in chunk:
#         writeout.write(line)
    
#     index += 1
password = []
with open('./2023-200_most_used_passwords.txt', 'r') as readin:
  for line in readin:
    password.append(line[:-1])
password.extend([
    'manchesterunited',
    'bachkhoa',
    'sinhviennam7'
])
password = list(set(password))

with open('./meh.txt', "w+") as writeout:
    for line in password:
        writeout.write(f"INSERT INTO mostCommonPassword2023(password) VALUES ('{line}');\n")


# passwordSet = set(password)
# print(passwordSet)
# print(len(passwordSet))