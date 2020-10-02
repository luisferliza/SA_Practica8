FROM ubuntu:14.04
RUN apt-get update -y && apt-get upgrade -y
RUN apt-get install -y apache2 
COPY html /var/www/html
EXPOSE 80
CMD ["apache2ctl", "-D", "FOREGROUND"]