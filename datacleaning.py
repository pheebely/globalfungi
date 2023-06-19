import pandas as pd
import numpy as np

df = pd.read_csv('globalfungi_merged.csv')
print(df)

print(df['continent'].nunique())

cont = df['continent'].unique()
counts = df['continent'].value_counts()

# continents = np.array([cont])
# continents = continents.tolist()
continents = ['North America', 'South America', 'Pacific Ocean', 'Atlantic Ocean',
              'Antarctica', 'Asia', 'Australia', 'Europe', 'Africa', 'Arctic Ocean', 'Indian Ocean']
string1 = 'continent: '
continents = [string1 + '"'+x+'"'for x in continents]
# print(continents)

# counts = np.array([counts])
# counts = counts.tolist()
counts = [19526, 17998, 12346, 2865, 1536, 1203, 637, 537, 417, 69, 50]
counts = list(map(str, counts))
string2 = 'total: '
counts = [string2 + x for x in counts]

# print(counts)

# using list slicing
# to interleave lists
continents_count = continents + counts
continents_count[::2] = continents
continents_count[1::2] = counts
print(continents_count)
