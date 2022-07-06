from flask import Flask, jsonify, request
from flask_cors import CORS
from api import *

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
        song_bits = request.json['song_bits']
        text = " ".join(song_bits)

        rhyme = api.get_rhymes(text)
        frequency = api.get_frequency(text)
        bars = api.get_syllable_breaks(text)

        response = {
            "message": "Rhyme info!",
            'rhyme': {
                'length': len(text.split()),
                'rhyme': rhyme,
                'frequency': frequency,
                'bars': bars
            }
        }
        return jsonify(response)



if __name__ == "__main__":
    app.run(debug=True)