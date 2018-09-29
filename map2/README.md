
# Map2: 
Sentiments of Hurricane tweets distribution  
2017-08-25 --- 2017-09-05

## Writer
Xiao Zhang

## Brief
Use the established thesaurus to analyze and quantify each tweet's sentiment, 
and visualize it on the map in combination with latitude and longitude coordinates.

## How to use
In this project, I use python to process the tweet data to get sentiment value of each tweet.
Based on the thesaurus, sentiment value of tweet is calculated which is between -1 ~ +1. 
In order to visualize them on the map, for the value between -1 ~ 0, multiply -1 then become a number between 0~1,
for the value between 0~1, multiply 10 and become a number between 1~10. for the value "None", multiply 0.

## How to build