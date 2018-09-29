"""Functions for reading data from the sentiment dictionary and tweet files."""

import os
import re
import string
from datetime import datetime
from ucb import main, interact
import codecs

DATA_PATH = 'data' + os.sep

def make_tweet(text, time, lat, lon, sentiment):
    """Return a tweet, represented as a python dictionary.

    text -- A string; the text of the tweet, all in lowercase
    time -- A datetime object; the time that the tweet was posted
    lat -- A number; the latitude of the tweet's location
    lon -- A number; the longitude of the tweet's location
    """
    return {'text': text, 'time': time, 'latitude': lat, 'longitude': lon, "sentiment": sentiment}


def tweet_words(tweet):
    """Return a list of words in the tweet.

    Arguments:
    tweet -- a tweet abstract data type.

    Return 1 value:
     - The list of words in the tweet.
    """
    return extract_words(tweet['text'])

def extract_words(text):
    """Return the words in a tweet, not including punctuation.
    >>> extract_words('anything else.....not my job')
    ['anything', 'else', 'not', 'my', 'job']
    >>> extract_words('i love my job. #winning')
    ['i', 'love', 'my', 'job', 'winning']
    >>> extract_words('make justin # 1 by tweeting #vma #justinbieber :)')
    ['make', 'justin', 'by', 'tweeting', 'vma', 'justinbieber']
    >>> extract_words("paperclips! they're so awesome, cool, & useful!")
    ['paperclips', 'they', 're', 'so', 'awesome', 'cool', 'useful']
    """
    s = ""
    c = ''
    for i in text:
        if i not in string.ascii_letters:
            i = ' '
        s += i
    return s.split()


def get_word_sentiment(word):
    """Return a number between -1 and +1 representing the degree of positive or
    negative feeling in the given word.

    Return None if the word is not in the sentiment dictionary.
    (0 represents a neutral feeling, not an unknown feeling.)
    """
    return word_sentiments.get(word, None)

def analyze_tweet_sentiment(tweet):
    """ Return a number between -1 and +1 representing the degree of positive or
    negative sentiment in the given tweet, averaging over all the words in the
    tweet that have a sentiment score.

    If there are words that don't have a sentiment score, leave them
    out of the calculation.

    If no words in the tweet have a sentiment score, return None.
    (do not return 0, which represents neutral sentiment).
    """
    average = None
    s = 0
    text = tweet_words(tweet)
    l = 0
    for i in text:
        temp = get_word_sentiment(i)
        if temp:
            s += temp
            l += 1

    if s != 0:
        average = s / l
    return average


def load_sentiments(file_name="data"+os.sep+"data/sentiments.csv"):
    """Read the sentiment file and return a dictionary containing the sentiment
    score of each word, a value from -1 to +1.
    """
    sentiments = {}
    for line in open(file_name, encoding='utf8'):
        word, score = line.split(',')
        sentiments[word] = float(score.strip())
    return sentiments

word_sentiments = load_sentiments()

def file_name_for_term(term):
    """Return a valid filename that corresponds to an arbitrary term string."""
    valid_characters = '-_' + string.ascii_letters + string.digits
    no_space = term.replace(' ', '_')
    return ''.join(c for c in no_space if c in valid_characters) + '.txt'

def generate_filtered_file(unfiltered_name, term):
    """Return the path to a file containing tweets that match term, generating
    that file if necessary.
    """
    filtered_path = DATA_PATH + file_name_for_term(term)
    if not os.path.exists(filtered_path):
        print('Generating filtered tweets file for "{0}".'.format(term))
        r = re.compile('\W' + term + '\W', flags=re.IGNORECASE)
        with open(filtered_path, mode='w', encoding='utf8') as out:
            unfiltered = open(DATA_PATH + unfiltered_name, encoding='utf')
            matches = [l for l in unfiltered if term in l.lower()]
            for line in matches:
                if r.search(line):
                    out.write(line)
    return filtered_path

def load_tweets(make_tweet, term='my job', file_name='data/filter_Herrican_Data.txt'):
    """Return the list of tweets in file_name that contain term.
    
    make_tweet -- a constructor that takes four arguments defined at line 12 in trends.py:
      - a string containing the words in the tweet
      - a datetime.datetime object representing the time of the tweet
      - a longitude coordinate
      - a latitude coordinate
    """
    term = term.lower()
    filtered_path = generate_filtered_file(file_name, term)
    tweets = []
    tweet = {}
    for line in open(filtered_path, encoding='utf-8-sig'):
        if len(line.strip().split("\t")) >=4:
            loc, _, time_text, text = line.strip().split("\t")
            time = datetime.strptime(time_text, '%Y/%m/%d %H:%M')
            lat, lon = eval(loc)
            # print(lat)
            # print(lon)
            tweet = make_tweet(text.lower(), time, lat, lon,'')
            # print(tweet)
            tweets.append(tweet)
    # print(len(tweets))
    # print(tweets[0]['text'])
    return tweets

    """Generate the json data which contains longtitude, langtitude and sentiment.
        Return this string. 
    """
def writejson(sentimentlist):
    start = "["
    end = "]"
    text =[]
    k=0
    for i in range(0,len(sentimentlist)):
        print(type(sentimentlist[i]['sentiment']))
        # Convert values to positive values and maintain relationships between good sentiment and bad sentiment
        if(sentimentlist[i]['sentiment'] == None):
            k+=1
            sentimentlist[i]['sentiment'] = 0
        elif(sentimentlist[i]['sentiment'] > 0.0):
            sentimentlist[i]['sentiment'] = str(float(sentimentlist[i]['sentiment']) *10)
        elif (sentimentlist[i]['sentiment']< 0.0):
            sentimentlist[i]['sentiment'] = str(float(sentimentlist[i]['sentiment']) *-1)
        #Generate the required json data
        sentimentjson = start + str(sentimentlist[i]['longitude']) + ","+ str(sentimentlist[i]['latitude']) +"," + str(sentimentlist[i]['sentiment']) + end
        print(sentimentjson)
        text.append(sentimentjson)
    print(k)
    # print(text)
    test_str = "".join(text)


    test_str=  test_str.replace("]", "],",7000)
    return (start +test_str[0:len(test_str)-1] + end)


if __name__ == '__main__':
 # tweets_content = []
 # print(word_sentiments)
 #set the term to '' to filter all tweet and get their sentiment value.
 tweets_content = load_tweets(make_tweet, term='', file_name='data/filter_Herrican_Data.txt')
 print(len(tweets_content))
 # print mood score of every tweet
 for i in range(0,len(tweets_content)):

  if(analyze_tweet_sentiment(tweets_content[i])!=None):
     # print(round(analyze_tweet_sentiment(tweets_content[i]), 2))
     tweets_content[i]['sentiment'] = round(analyze_tweet_sentiment(tweets_content[i]), 2)
  else:
     # print(analyze_tweet_sentiment(tweets_content[i]))
     tweets_content[i]['sentiment'] = analyze_tweet_sentiment(tweets_content[i])

f = codecs.open('data/hurricane.json', 'w', 'utf-8')
f.write(writejson(tweets_content))






