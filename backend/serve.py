from flask import Flask, jsonify, request
from flask_cors import CORS
from lambda_function import *

api = API()

app = Flask(__name__)
CORS(app)

@app.route('/')
def main():

    response = {
        "message": "Rhyming works!"
    }
    return jsonify(response)

@app.route('/rhymes', methods = ['POST', 'GET'])
def rhymes():
    if request.method == 'POST':
        text = request.json['text']

        rhymes =  api.get_rhymes(text)

        response = {
            "message": "Rhyme info!",
            'rhymes':  api.get_rhymes(text),
            "colors": api.get_rhymes_colors(text,rhymes),
            "syllables": api.get_syllable_breaks(text)
        }
        return jsonify(response)



if __name__ == "__main__":
    app.run(debug=True)