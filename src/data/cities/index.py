import json
from collections import defaultdict

# Читаем минифицированный файл
with open('cities.min.json', 'r', encoding='utf-8') as f:
    cities = json.load(f)

# Группируем по странам
cities_by_country = defaultdict(list)
for city in cities:
    cities_by_country[city['country']].append(city)

# Сохраняем в отдельные минифицированные файлы
for country, cities_list in cities_by_country.items():
    with open(f'cities_{country}.min.json', 'w', encoding='utf-8') as f:
        json.dump(cities_list, f, ensure_ascii=False, separators=(',', ':'))
    print(f"Saved cities_{country}.min.json ({len(cities_list)} cities, ~{len(json.dumps(cities_list, ensure_ascii=False, separators=(',', ':'))) / 1024} KB)")