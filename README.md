# fake_news_verification_platform
made using react.js frontend and flask backend  

primary users: news verifiers  

##features:   

##-Offensive words highlighter  
##-sentimental score to each to better make judgement easier for verifier.  
![image](https://user-images.githubusercontent.com/49832962/139056043-91b7fa59-5dc6-4502-8265-7dfdbf900685.png)
  
  

##-twitter trends filter: used twitter trends keywords to filter out sensitive news first.
![temp](https://user-images.githubusercontent.com/49832962/139056649-ee81074e-0675-40dd-8336-b1ba753455d3.png)
##As shown in above picture, twitter trend called "pegasus" can be selected to filter the feed. This feature helps to find out latest sensitive news which needs to be prioritized for verification.

## How to run the Project? 
1. Download the Repo and go to the respective folder and start the Command Line Interface in the particular folder.
2. On Windows, type the following command: 

```
python server.py
```

This will activate the flask backend server on localhost.

3. navigate to "app" folder.
4. On Windows command line, type the following command: 

```
npm install
```
this will install all the dependencies.

5. On Windows command line, type the following command: 

```
npm start
```
this will start project and load webpage.
