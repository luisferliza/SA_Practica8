Create table estudiante(
    id int auto_increment,
    carnet int unique not null,
    nombre varchar(200) not null,
    PRIMARY KEY(id)
);

insert into estudiante(carnet, nombre) values (201602656, 'Luis Lizama');

insert into estudiante(carnet, nombre) values (201805469, 'Rita Gomez');