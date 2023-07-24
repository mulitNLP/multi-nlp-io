import re
import json
from konlpy.tag import Okt
from keras.utils import pad_sequences
from keras.preprocessing.text import Tokenizer
import pickle
import keras
from flask import Flask, request, jsonify
import re
from flask_cors import CORS
from werkzeug.serving import WSGIRequestHandler
app = Flask(__name__)
CORS(app)
okt = Okt()
tokenizer  = Tokenizer()

DATA_CONFIGS = 'data_configs_test.json'
prepro_configs = json.load(open('DATA/CLEAN_DATA/'+DATA_CONFIGS,'r'))

with open('DATA/CLEAN_DATA/tokenizer_senti.pickle','rb') as handle:
    word_vocab = pickle.load(handle)

prepro_configs['vocab'] = word_vocab

tokenizer.fit_on_texts(word_vocab)

MAX_LENGTH = 8
model = keras.models.load_model('DATA/my_senti_models')
model.load_weights('DATA/DATA_SENTI_OUT/cnn_classifier_kr/weights.h5')





WSGIRequestHandler.protocol_version = 'HTTP/1.1' #keep alive를 지원
@app.route('/sentiment-analysis', methods=['POST'])
def sentiment_analysis():
    global result, percentage
    dataString = request.get_data(as_text=True)
    values = dataString.split('|')
    print(values)
    playerID = values[0]
    targetID = int(values[1])
    sentence = values[2]
    # Process the sentence using your sentiment analysis code
    # You can use the sentiment analysis code from your original Python code here
    # For example:
    # result = perform_sentiment_analysis(sentence)
    # sentence = re.sub(r'[^ㄱ-ㅎㅏ-ㅣ가-힣\\s ]','', sentence)
    # # # stopwords = ['은','는','이','가','하','아','것','들','의','있','되','수','보','주','등','한']
    sentence = okt.morphs(sentence, stem=True)
    # sentence = [word for word in sentence if not word in stopwords]
    vector = tokenizer.texts_to_sequences(sentence)
    pad_new = pad_sequences(vector, maxlen=MAX_LENGTH)
    target_ID = (targetID >> 24) & 0x7F
    predictions = model.predict(pad_new)
    predictions = float(predictions[0])
    print('targetID: 1 is Player 2 is Meteor', target_ID)
    if target_ID == 1 and predictions > 0.5:
        result = True
        print("targetID 1 ATTACK")
    elif target_ID == 2 and predictions > 0.7:
            print("target Meteor ATTACK")
            result = True
    elif predictions < 0.5:
        result = False
        print("shield generated")
    else:
        result = None
    
    percentage = predictions * 100
    print('percentage is :' , percentage)
    return jsonify({'result' : result, 'percentage': percentage})
    #player
    #meteor
    # # return jsonify({'ID' : target_ID, "user" : "meteor" , "skill" : "shield", 'predictions' :predictions})
    # elif predictions < 0.5 and AttackOrD == "true":
    #     #result = -1
    #     print("{:.2f}% 확률로 부정 리뷰입니다.\n".format((1 - predictions) * 100)) #PlayerID
    #     use_skill(False, (1 - predictions) * 100)
    #     return jsonify({'ID' : playerID, "user" : "player" , "skill" : "shield", 'predictions' :predictions})
    # elif predictions > 0.5 and AttackOrD == "false":
    #     print("{:.2f}% 확률로 긍정 리뷰입니다.\n".format(predictions * 100)) #None
    #     use_skill(True, predictions * 100 )
    #     return 
    # elif predictions < 0.5 and AttackOrD == "false" :
    #     #result = -1
    #     print("{:.2f}% 확률로 부정 리뷰입니다.\n".format((1 - predictions) * 100)) #PlayerID
    #     use_skill(False, (1 - predictions) * 100)
    #     return jsonify({'ID' : playerID, "user" : "player" , "skill" : "shield", 'predictions' :predictions})
@app.route('/use-skill', methods = ['POST'])
def use_skill():
    return jsonify(result, percentage)
    
if __name__ == '__main__':
    app.run(debug=True, port=5050)