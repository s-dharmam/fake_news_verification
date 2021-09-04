from pymongo import MongoClient
from bson import json_util
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
sid_obj = SentimentIntensityAnalyzer()
import pandas as pd
#sentiment_dict = sid_obj.polarity_scores(sentence)
data = pd.read_csv("badwords.csv")
badwords = data['jigaboo'].tolist()


class Query:
    def __init__(self):
        self.client = MongoClient('localhost', 27017)
        self.db = self.client.latest_news
        self.collection = self.db.user_send

    def insert_query(self, content):
        in_database = self.collection.count_documents(content)
        #content=json_util.loads(content)
        print(content)

        result = -1
        print(content)
        #ontent=json_util.dumps(content)
        if in_database == 0:
            content['label'] = 0
            sentiment_dict = sid_obj.polarity_scores(content['message'])
            content['positive'] = sentiment_dict['pos']
            content['neutral'] = sentiment_dict['neu']
            content['negative'] = sentiment_dict['neg']

            result1 = self.collection.insert(content)
        else:
            for post in self.collection.find(content):
                result = (post['label'])
        return result

    def update_query(self, content):
        #print(str(content))

        in_database = self.collection.count_documents(
            {'message': content['message']})
        if in_database == 1:
            myquery = {'message': content['message']}
            newvalues = {"$set": {"label": content['label']}}
            a = self.collection.update_one(myquery, newvalues)
            return "Updated"
        else:
            return "Not Updated"

    def check_query(self, label):
        query = {"label": label}
        json = self.collection.find(query)
        # lst=[]
        # for i in json:

        #     sentence=i['message'].split()
        #     #print(sentence)
        #     s=""
        #     for j in sentence:
        #         j=j.lower()

        #         if j in badwords:
        #             s+=" <b style='color:red'> "
        #             s+=j
        #             s+=" </b> "
        #         else:
        #             s+=j+" "
        #    # print(s)
        #     i['message']=s
        #     lst.append(i)
        return json

    def sort(self, label):
        query = {"label": label}
        json = self.collection.find(query)
        lst = []
        for i in json:

            sentence = i['message'].split()
            #print(sentence)
            s = ""
            for j in sentence:
                j = j.lower()

                if j in badwords:
                    s += " <b style='color:red'> "
                    s += j
                    s += " </b> "
                else:
                    s += j + " "
        # print(s)
            i['message'] = s
            lst.append(i)
        return lst

    def relevant_query(self, message, label):
        if message == "":
            query = {"label": label}
            a = self.collection.find(query)
        else:
            a = self.collection.find(
                {
                    "label": label,
                    "$text": {
                        "$search": message,
                        "$caseSensitive": False,
                        "$diacriticSensitive": True
                    }
                }, {
                    "score": {
                        "$meta": "textScore"
                    }
                }).sort([("score", {
                    "$meta": "textScore"
                })]).limit(5)

        return a
