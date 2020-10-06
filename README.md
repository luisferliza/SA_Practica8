# Laboratorio Software Avanzado - Práctica 8

## Luis Fernando Lizama - 201602656

El video de demostracion de este proyecto puede encontrarse en  [este enlace](https://youtu.be/-37pgXOIswY "Video")

## Configuración general
El Script para eliminar las imagenes anteriores y crear las nuevas se encuentra en el archivo main.sh. Para ejecutarlo unicamente escribimos el comando
```bash
./main.sh
```

Para levantar toda la arquitectura con docker compose ejecutamos el comando 
```cmd
sudo docker-compose up
```

Y para detenerlo ejecutamos 
```cmd
sudo docker-compose down
```

## Servidor de base de datos
El servidor de base de datos se crea a partir de una imagen de mysql versión 9. Se crea un Script de base de datos que se encarga de crear la tabla estudainte y de insertar dos registros para poder realizar las pruebas de la aplicación. 

Script:
```sql
Create table estudiante(
    id int auto_increment,
    carnet int unique not null,
    nombre varchar(200) not null,
    PRIMARY KEY(id)
);

insert into estudiante(carnet, nombre) values (201602656, 'Luis Lizama');
insert into estudiante(carnet, nombre) values (201805469, 'Rita Gomez');
```
Dockerfile:
```Dockerfile
# Derived from official mysql image (our base image)
FROM mysql:8

# Base de datos a utilizar
ENV MYSQL_DATABASE practica

# Add the content of the sql-scripts/ directory to your image
# All scripts in docker-entrypoint-initdb.d/ are automatically
# executed during container startup
COPY ./sql-scripts/ /docker-entrypoint-initdb.d/
```
 ## API REST
La API REST se encarga de comunicarse con la base de datos y recuperar la inforamción de los estudiantes en formato JSON. Los parámetros de conexión se pasan a traves del archivo de docker compose por lo que es dinámico para cualquier base de datos que se desee consultar. Este servidor funciona con Express y una imagen de node

Dockerfile:
```Dockerfile
FROM node
WORKDIR /App
ADD . /App
RUN npm install
ENV PORT 3000
ENV IP "192.168.0.0"
CMD ["node","index.js"]
```

 ## Servidor WEB
eL SERVIDOR web no es mas que una  página en HTML situada en un servidor de apache. Las conexiones se realizan a través de localhost. Para instalar Apache2 se utiliza una versión de Ubuntu 12
Dockerfile:
```Dockerfile
FROM ubuntu:14.04
RUN apt-get update -y && apt-get upgrade -y
RUN apt-get install -y apache2 
COPY html /var/www/html
EXPOSE 80
CMD ["apache2ctl", "-D", "FOREGROUND"]
```

 ## Docker Compose
El archivoo de docker compose se compone de 3 servicios y una red interna que permite la comunicación entre todos los servicios. Cada uno de los servicios posee una IP interna estática y los parámetros de conexión tambien se pasan por medio del docker compose. 
Dockerfile:
```yml
version: "3"
services:
  api:
    image: apinode
    ports:
      - "3000:3000"
    networks:
      testing_net:
            ipv4_address: 182.18.7.9
    
    environment:
      - PORT=3000
      - IP=182.18.7.2
      - PASS=123456789
      - USER=root
    depends_on:
      - mysql  
  mysql:
    container_name: mysql
    restart: always
    image: bd
    command: --default-authentication-plugin=mysql_native_password
    environment:
      MYSQL_ROOT_PASSWORD: 123456789
      MYSQL_DATABASE: practica
    volumes:
      - my-db:/var/lib/mysql
    networks:
        testing_net:
            ipv4_address: 182.18.7.2
  
  webpage:
    image: web-api
    restart: always
    ports:
      - 80:80
    networks:
        testing_net:
            ipv4_address: 182.18.7.4
    depends_on:
      - api

networks:
    testing_net:
        ipam:
            driver: default
            config:
                - subnet: 182.18.7.0/24
  
volumes:
  my-db:
```
