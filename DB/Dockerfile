# Derived from official mysql image (our base image)
FROM mysql:8

# Base de datos a utilizar
ENV MYSQL_DATABASE practica

# Add the content of the sql-scripts/ directory to your image
# All scripts in docker-entrypoint-initdb.d/ are automatically
# executed during container startup
COPY ./sql-scripts/ /docker-entrypoint-initdb.d/