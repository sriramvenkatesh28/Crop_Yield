# from flask import Flask, redirect, url_for, render_template, request

# app = Flask(__name__)

# @app.route("/")
# def home():
#     print("hiiiii")
#     return "HI"

# @app.route("/city")
# def city():
#     city = request.form["nm"]
#     print(city)
#     return city

# if __name__ == "__main__":
#     app.run(debug=True)

from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
from json import load
from tensorflow import keras
from keras.models import load_model
import pandas as pd
import numpy as np
import json
import os
import ast

app = Flask(__name__)
# cors = CORS(app, resources={r'/api/*': {'origins': 'http://localhost:3000'}})

@app.route("/api", methods=["POST"])
@cross_origin()
def post_example():
    """POST in server"""
    request_data = request.get_json()
    a = []

    a.append(request_data["N"])
    a.append(request_data["P"])
    a.append(request_data["K"])
    a.append(request_data["temperature"])
    a.append(request_data["humidity"])
    a.append(request_data["ph"])
    a.append(request_data["rainfall"])

    ann = load_model('C:/project/best_model.h5')
    result = ann.predict([a])
    json_url = os.path.join("C:/project/", "ann.json")
    brand_dict = json.load(open(json_url))



    labels = ['label_apple', 'label_banana', 'label_blackgram', 'label_chickpea',
       'label_coconut', 'label_coffee', 'label_cotton', 'label_grapes',
       'label_jute', 'label_kidneybeans', 'label_lentil', 'label_maize',
       'label_mango', 'label_mothbeans', 'label_mungbean', 'label_muskmelon',
       'label_orange', 'label_papaya', 'label_pigeonpeas', 'label_pomegranate',
       'label_rice', 'label_watermelon']

    final = []

    test = pd.DataFrame(result,columns= list(brand_dict.values()))
    import operator
    dict_ = {}
    test['score'] = 0
    for index, row in test.iterrows():
        list_ = []
        dict_ = dict(row)
        sorted_dict = sorted(dict_.items(), key=operator.itemgetter(1),reverse=True)
        sorted_dict = sorted_dict[0:20]
        for i in sorted_dict:
            if i[1]>=0.05:
    #             print(i)
                list_.append({i[0]:i[1]})
    #             print(list_)
                test['score'][index] = list_

    print(test['score'][0])
    # output = []
    # for i in range(result):
    #     for j in range(22):
    #         np.array(output.append(result[i][j]))

    # output = ast.literal_eval(result)
    #print("Output is: ", output)

    # response = jsonify(result)

    return str(test['score'][0])

# @app.route("/api/city-data", methods=["GET"])
# @cross_origin()
# def helloWorld():
#     response = flask.jsonify({'some': 'data'})
#     response.headers.add('Access-Control-Allow-Origin', '*')
#     return response

if __name__ == "__main__":
    app.run(debug=True)



# import json
# from flask import Flask, request, jsonify, make_response
# from flask_cors import CORS, cross_origin
# from json import load
# from tensorflow import keras
# from keras.models import load_model
# import pandas as pd
# import numpy as np

# app = Flask(__name__)
# cors = CORS(app)
# app.config['CORS_HEADERS'] = 'Content-Type'

# @app.route("/city-data", methods=["POST"])
# @cross_origin()
# def home():
#     N = request.json.get("N")
#     print(N)
#     ann = load_model('C:/project/best_model.h5')
#     data = json.load('C:/project/floragram/soil-data.json')
#     for i in data:
#         print(i)
#         for j in data[i]:
#             print(j)

#     a = [27.0, 120.0, 200.0, 21.4527, 90.74, 6.11, 116.703]
#     result = np.array(ann.predict([a]))
#     print(result)
#     return "Hello"

# if __name__ == "__main__":
#     app.run(debug=True)

