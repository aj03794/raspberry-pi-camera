##### Goal of this application is to be able to use the raspberry pi camera via nodejs


##### How this project will work
1. Another app will monitor PIR sensor motion
2. Once motion is detected, it will push data to redis through pub/sub
3. This app will be subscribed to that redis topic
4. It will take a photo once motion is detected and it receives a message from redis
