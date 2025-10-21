# Partyst-backend
Backend en nest para aplicacion Partyst

para correr la bd en mysql:

1. Descargar la imagen para Docker de MySQL
      docker pull mysql:latest
2. Crear el contenedor
    (La contraseña por defecto es 1234)
    docker run --name docker-mysql -e MYSQL_ROOT_PASSWORD=1234 -p 3307:3306 -v ./init:/docker-entrypoint-initdb.d -d mysql

3. Ver lista de contenedores
    docker ps -1

para poder correr en local se debe realizar:

1. npm install
2. npm run prisma:pull
3. npm run start:dev

##IMPORTANTE
Cuando se realicen cambios de la bd, se debe crear una copia de seguridad para los demas integrantes
- docker exec -it docker-mysql mysqldump -u root -p1234 --all-databases > init/backup.sql
