sudo docker rmi web-api apinode bd
cd WebPage
sudo docker build -t web-api .
cd ..
cd API
sudo docker build -t apinode .
cd ..
cd DB
sudo docker build -t bd .