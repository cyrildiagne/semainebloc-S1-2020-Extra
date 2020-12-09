from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import random
import re
import requests
from google.cloud import storage
import os

app = Flask(__name__)
CORS(app)

print('Downloading corpus file...')
gcs = storage.Client()
bucket = gcs.get_bucket('gpu-sh.appspot.com')
blob = bucket.blob('lyrics/unique.txt')
data = blob.download_as_string().decode("utf-8")[1:]
print('Downloaded corpus file.')

dataset = data.split('\n')
data = None
blob = None

print('Got {} lines!'.format(len(dataset)))

print('Parsing lines...')
lines_dict = {}
for i, line in enumerate(dataset):
    if i % 1e6 == 0:
        print(i)
    if len(line) == 0:
        continue
    line = line[:-1] + re.sub('[^A-Za-z0-9]+', '', line[-1])
    word = line.split(' ')[-1].lower()
    if word not in lines_dict:
        lines_dict[word] = []
    lines_dict[word].append(i)
print('Parsing complete!')


def get_random_rhyme(result):
    word = random.choice(result)
    if word not in lines_dict:
        result.remove(word)
        if len(result) > 0:
            return get_random_rhyme(result)
        else:
            return ''
    item_id = random.choice(lines_dict[word])
    return dataset[item_id]


@app.route('/')
def hello():
    return 'Rhyme Service'


@app.route('/get')
def get():
    word = request.args.get('w')
    if word is None:
        return jsonify({'error': 'w parameter missing'}), 400

    res = requests.get(
        'https://api.datamuse.com/words?rel_rhy=' + word.lower() + '&max=25')
    res = json.loads(res.content)
    res = [r['word'] for r in res]

    if len(res) == 0:
        return jsonify({'error': 'no rhyme for word {}'.format(word)}), 400

    rhyme = get_random_rhyme(res)

    return rhyme


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8080, debug=True)
