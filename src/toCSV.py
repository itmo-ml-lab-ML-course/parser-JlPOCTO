import csv
import os
import re

def checkGenres(genres):
    res = [];
    
    allGenres = {'Школа', 'Сверхъестественное', 'Безумие',
                 'Психологическое', 'Комедия', 'Машины',
                 'Спорт', 'Супер сила', 'Этти', 'Боевые искусства',
                 'Гурман', 'Самураи', 'Детектив', 'Дзёсей', 'Работа',
                 'Вампиры', 'Демоны', 'Игры', 'Детское', 'Космос', 'Пародия',
                 'Гарем', 'Фэнтези', 'Повседневность', 'Меха', 'Романтика',
                 'Военное', 'Фантастика', 'Ужасы', 'Сёнен', 'Сэйнэн', 'Сёдзё',
                 'Музыка', 'Полиция', 'Приключения', 'Триллер',
                 'Исторический', 'Драма', 'Экшен'}
    
    for genre in allGenres:
        if genre in genres:
            res.append(1)
        else:
            res.append(0)
    
    return res

with open('dbAnime.csv', 'w', newline='', encoding='utf-8') as csvFile:
    animeWriter = csv.writer(csvFile)
    fields = ["name", "type", "episodes", "released_part", "episode_length",
              "last_release_date",
              "rating_limit", "rating", "rating_numbers", "description",
              'is_school', 'is_supernatural', 'is_madness', 'is_psychological',
              'is_comedy', 'is_cars', 'is_sports', 'is_superpower', 'is_ecchi',
              'is_martial_arts', 'is_gourmet', 'is_samurai', 'is_detective',
              'is_josei', 'is_work', 'is_vampires', 'is_demons', 
              'is_games', 'is_for_children', 'is_space', 'is_parody',
              'is_harem', 'is_fantasy', 'is_slice_of_life', 'is_mecha',
              'is_romance', 'is_military', 'is_fantastic', 'is_horror',
              'is_shonen', 'is_seinen', 'is_shojo', 'is_music', 'is_police',
              'is_adventure', 'is_thriller', 'is_historical', 'is_drama',
              'is_action']
    animeWriter.writerow(fields)
    
    for i in range(18000):
        name = "./lab1/" + str(i) + ".txt"
        
        if os.path.exists(name): 
            with open(name, 'r', encoding='utf-8') as fileDesc:
                text = fileDesc.read()
                
                nameRe = re.search(r"Name: (.+)\n", text)
                name = None
                if nameRe:
                    name = nameRe.group(1)
                
                typeRe = re.search(r"Type: (.+)\n", text)
                titleType = None
                if typeRe:
                    titleType = typeRe.group(1)
                
                episodesRe = re.search(r"Episodes: (.+)\n", text)
                numEp = None
                releasedPart = 0.0
                if episodesRe:
                    episodes = episodesRe.group(1)
                    releasedPart = 1.0
                    numEp = episodes.split(' / ')[len(episodes.split(' / ')) - 1]
                    currEp = 0
                    if numEp.isdigit():
                        currEp = int(numEp)
                    if (len(episodes.split(' / ')) > 1):
                        currEp = episodes.split(' / ')[0]
                        if numEp.isdigit():
                            releasedPart = int(currEp) / int(numEp)
                        else:
                            releasedPart = ''
                
                epiLenRe = re.search(r"Episode length: (.+)\n", text)
                epiLen = None
                if epiLenRe:
                    epiLen = epiLenRe.group(1)
                
                dateRe = re.search(r"Last episode date release: (.+)\n", text)
                date = None
                if dateRe:
                    date = dateRe.group(1)
                
                result = re.search(r"Genres: (.+)\n", text)
                boolGenres = []
                if result:
                    currGenres = result.group(1).split(", ")
                    boolGenres = checkGenres(currGenres)
                
                limitRe = re.search(r"Rating limit: (.+)\n", text)
                limit = None
                if limitRe:
                    limit = limitRe.group(1)
                    
                ratingRe = re.search(r"Rating: (.+)\n", text)
                rating = None
                if ratingRe:
                    rating = ratingRe.group(1)
                    
                ratingNumRe = re.search(r"Rating numbers: (.+)\n", text)
                ratingNum = None
                if ratingNumRe:
                    ratingNum = ratingNumRe.group(1)
                    
                descrRe = re.search(r"Description: (.+)\n", text)
                descr = None
                if descrRe:
                    descr = descrRe.group(1)
                    
                animeWriter.writerow([name, titleType, numEp, releasedPart,
                                      epiLen, date, limit, rating, ratingNum,
                                      descr] + boolGenres)
