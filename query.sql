SELECT 
  id,
  email,
  name,
  lastName,
  sex,
  date,
  address,
  typeHome,
  country,
  state,
  city,
  description
FROM 
  contacts;

(La query de arriba corresponde al almacenamiento actual del sistema todo en la tabla contacts)

Pero podemos generar un modelo relacional para dividir la informacion de pais, departamento y ciudad en 
tablas para solo asi asignarle el foreign key y generar consultas mas rapidas, por ejemplo:

SELECT 
  c.id,
  c.email,
  c.name,
  c.lastName,
  c.sex,
  c.date,
  c.address,
  c.typeHome,
  co.name AS country,
  s.name AS state,
  ci.name AS city,
  c.description
FROM 
  Contact c
JOIN 
  Country co ON c.countryId = co.id
JOIN 
  State s ON c.stateId = s.id
JOIN 
  City ci ON c.cityId = ci.id;
