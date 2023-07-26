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
from gensim import models
import gc
app = Flask(__name__)   
CORS(app)
okt = Okt()
tokenizer  = Tokenizer()

DATA_CONFIGS = 'data_configs_test.json'
DEFAULT_DATA = '../../DATA/'
prepro_configs = json.load(open(DEFAULT_DATA+'CLEAN_DATA/'+DATA_CONFIGS,'r'))

with open(DEFAULT_DATA+'CLEAN_DATA/tokenizer_senti.pickle','rb') as handle:
    word_vocab = pickle.load(handle)

prepro_configs['vocab'] = word_vocab

tokenizer.fit_on_texts(word_vocab)

MAX_LENGTH = 8
model = keras.models.load_model(DEFAULT_DATA+'my_senti_models')
model.load_weights(DEFAULT_DATA+'DATA_SENTI_OUT/cnn_classifier_kr/weights.h5')

model_senti = models.fasttext.load_facebook_vectors(DEFAULT_DATA+'cc.ko.300.bin.gz')
print("model succesfully loaded")

vector_test = tokenizer.texts_to_sequences("안녕")
pad_new_test = pad_sequences(vector_test, maxlen=MAX_LENGTH)

similarity_check = model_senti.similarity("아이언맨", "자비스") 
print(similarity_check)
print(model.predict(pad_new_test))



WSGIRequestHandler.protocol_version = 'HTTP/1.1' #keep alive를 지원
@app.route('/', methods = ['GET'])
def home():
    return "flask server is running now"

@app.route('/sentiment-analysis-player', methods=['POST'])
def sentiment_analysis_player():
    print("11111111111111")
    result = False
    percentage = 0
    dataString = request.get_data(as_text=True)
    values = dataString.split('|')
    print(values)
    #meteor_ = values[0]
    #targetID = int(values[1])
    sentence = values[2]
    # print("meteor word:", meteor_)
    sentence = okt.morphs(sentence, stem=True)
    # sentence = [word for word in sentence if not word in stopwords]
    vector = tokenizer.texts_to_sequences(sentence)
    pad_new = pad_sequences(vector, maxlen=MAX_LENGTH)
    #target_ID = (targetID >> 24) & 0x7F
    # similiarity = model_senti.similarity(meteor_,sentence) 
    predictions = model.predict(pad_new)
    predictions = float(predictions[0])
    # print('targetID 1 is Player 2 is Meteor :', target_ID)    
    if predictions > 0.5:
        result = True
        print("targetID 1 ATTACK")
    elif predictions < 0.5:
        result = False
        print("shield generated")
    percentage = predictions * 100
    print('percentage is :' , percentage)
    return jsonify({'result' : result, 'percentage': percentage})

@app.route('/sentiment-analysis-meteor', methods=['POST'])
def sentiment_analysis_meteor():
    print(222222)
    result = False
    dataString = request.get_data(as_text=True)
    values = dataString.split('|')
    print(values)
    meteor_ = values[0]
    # targetID = int(values[1])
    sentence = values[2]
    
    print("meteor word:", meteor_, "sentence: ", sentence)
    # target_ID = (targetID >> 24) & 0x7F
    similarity_check = model_senti.similarity(meteor_, sentence) 
    # print('targetID 1 is Player 2 is Meteor :', target_ID)    
    if  similarity_check > 0.25 and similarity_check < 1:
        print("target Meteor ATTACK")
        result = True
    else:
        result = False
    print('similarity is :', similarity_check)
    return jsonify({'result' : result, 'percentage': float(similarity_check)})



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
    
if __name__ == '__main__':
    app.run(host="0.0.0.0", debug=False, port=5050)