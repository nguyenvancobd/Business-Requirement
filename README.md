
# run on local
```
install nodejs
install mongobd
npm install
npm start

```

# docker
* build image
```
docker build --rm -f "Dockerfile" -t exam:latest .
```
* run docker
```
docker run -p 3000:3000 exam
```
* stop docker
```
docker ps -a  
docker stop <container_id>   
docker rm <container_id>
```
- PROJECT STRUCTURE:

App 
+-- database
¦   +-- models 
¦		+-- user.js							# init user                           
¦	+-- database.js 						# config and init db
¦                        
+-- public
¦   +-- css
¦	¦   +-- main.css 						# info css 
¦	+-- js
¦	¦	+-- register.js						# handle action page register 
¦	¦	+-- subcribers.js					# handle action page show list user who register 
¦	+-- uploads                             # folder save image user. 
¦
+-- resources/view
¦   +-- register.ejs						# view for user register
¦   ¦  
¦   +-- subcribers.ejs						# view for show lis user register who register
¦     
+-- routes
¦   +-- register.js							# define routes register
¦	¦
¦   +-- subcribers.js						# define routes subcribers
¦   ¦   
¦   +-- users.js						    # define routes users
¦   ¦   +-- router.post("/create"...)	    # api create user
¦   ¦   ¦ 
¦   ¦-- +-- router.get("/read:....)			# api get list users
¦
+-- app.js
+-- package-lock.json
¦
+-- package.json
+-- Dockerfile
¦
+-- swagger.json 							# describe api 
¦
+-- README.md

