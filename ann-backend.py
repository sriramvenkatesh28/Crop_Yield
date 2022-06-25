from json import load
from tensorflow import keras
from keras.models import load_model
import pandas as pd
import json


values = [30, 50, 40, 30, 80, 6.5, 120]
ann = load_model('C:/project/best_model.h5')

results = ann.predict([values]) 

with open('results.json', 'w') as f:
    json.dump(values, f)

f = open('C:/project/floragram/soil-data.json')
  
# returns JSON object as 
# a dictionary
data = json.load(f)
  
# Iterating through the json
# list
for i in data:
    print(i)
    for j in data[i]:
        print(j)

res = data['Bangalore']
print(res[0])