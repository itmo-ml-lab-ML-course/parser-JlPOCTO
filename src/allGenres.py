import re
import os

genres = set()
for i in range(18000):
    name = "./lab1/" + str(i) + ".txt"
    
    if os.path.exists(name): 
        with open(name, 'r', encoding='utf-8') as fileDesc:
            text = fileDesc.read()
            result = re.search(r"Genres: (.+)\n", text)
            if result:
                currGenres = result.group(1).split(", ")
                for genre in currGenres:
                    genres.add(genre)
                
with open("allGenres.txt", 'w') as f:
    f.write(str(genres))
