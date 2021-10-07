from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import flask
import requests
from pymongo import MongoClient
from query_function import Query
from pymongo import MongoClient
from bson import json_util
import pandas as pd
import tweepy
import json
consumer_key = 'qFlI51JlIYuMFrxjYrA4L8TOd'
consumer_secret = 'mO0vLSnj9hUrbm91bDJCGwQx1NwGNJqfpxx3Y6ivmipEGtQh9H'
access_token = '1029302724742004737-2Afv2vrd57bFEEs2SYTS2tGUUTCL0T'
access_token_secret = 'utlTf5BZleq9TQFMqGVqJ4wbRMtswyChNkQWPf9dGufZj'
# OAuth process, using the keys and tokens
auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_token_secret)
api = tweepy.API(auth)


def isascii(s):
    return len(s) == len(s.encode())

#woeid for india
trend_list = []


def find_trends():
    avail_loc = api.trends_place(23424848)
    for i in avail_loc[0]['trends']:
        trend = i['name']
        if (trend[0] == '#'):
            trend = trend[1:]
        if isascii(trend):
            trend_list.append(trend.lower())


find_trends()


app = Flask(__name__, template_folder="templates")
query = Query()
client = MongoClient('localhost', 27017)
db = client.latest_news
collection = db.user_send
CORS(app)


@app.route('/insert', methods=['POST'])
def insert():
    s = ""
    content = request.get_json()

    result = query.insert_query(content)
    return jsonify(result)
    #{  "message": "Hello"}


@app.route('/update', methods=['POST', 'GET'])
def update():
    content = request.get_json()
    result = query.update_query(content)
    return jsonify(result)


@app.route('/check', methods=['POST', 'GET'])
def check():
    content = request.get_json()
    json = query.check_query(content['label'])
    return json_util.dumps(json)


app.route('/sort', methods=['POST'])


def sort():
    content = request.get_json()
    json = query.sort(content['label'])
    return json_util.dumps(json)


@app.route('/check_relevant', methods=['POST'])
def check_relevant():
    content = request.get_json()
    if "message" in content:
        array = query.relevant_query(content['message'], content['label'])
    else:
        array = query.check_query(content['label'])
    return json_util.dumps(array)


@app.route('/badwords', methods=['GET'])
def badwords():
    jsonfile = open('file.json', 'r')
    return json_util.dumps(jsonfile)


@app.route('/trends', methods=['GET'])
def twittertrends():

    lab = {"trends": trend_list}
    return json_util.dumps(lab)


@app.route('/')
def show():
    return render_template("")


if __name__ == '__main__':
    app.run(debug=True)
