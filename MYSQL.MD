
**ESCTRUCTURA DE CONSULTAS DE MYSQL**
    Operator	                Condition	                                            SQL Example
=, !=, < <=, >, >=	    Standard numerical operators	                            col_name != 4
BETWEEN … AND …	        Number is within range of two values (inclusive)	        col_name BETWEEN 1.5 AND 10.5
NOT BETWEEN … AND …	    Number is not within range of two values (inclusive)	    col_name NOT BETWEEN 1 AND 10
IN (…)	                Number exists in a list	                                    col_name IN (2, 4, 6)
NOT IN (…)	            Number does not exist in a list	                            col_name NOT IN (1, 3, 5)



Operator	                        Condition	                                                                                    Example
=	            Case sensitive exact string comparison (notice the single equals)	                                        col_name = "abc"
!= or <>	    Case sensitive exact string inequality comparison	                                                        col_name != "abcd"
LIKE	        Case insensitive exact string comparison	                                                                col_name LIKE "ABC"
NOT LIKE	    Case insensitive exact string inequality comparison	                                                        col_name NOT LIKE "ABCD"
%	            Used anywhere in a string to match a sequence of zero or more characters (only with LIKE or NOT LIKE)	    col_name LIKE "%AT%"
(matches "AT", "ATTIC", "CAT" or even "BATS")
_	            Used anywhere in a string to match a single character (only with LIKE or NOT LIKE)	                        col_name LIKE "AN_"
                (matches "AND", but not "AN")
IN (…)	        String exists in a list	                                                                                    col_name IN ("A", "B", "C")
NOT IN (…)	    String does not exist in a list	                                                                            col_name NOT IN ("D", "E", "F")






**
Select query with constraints
SELECT column, another_column, …
FROM mytable
WHERE condition
    AND/OR another_condition
    AND/OR …;
    
**
**Otra cláusula que se suele utilizar con la cláusula ORDER BY son las cláusulas LIMIT y OFFSET, que son una optimización útil para indicar a la base de datos el subconjunto de resultados que le interesa.La cláusula LIMIT reducirá el número de filas a devolver, y la cláusula OFFSET opcional especificará a partir de dónde empezar a contar el número de filas.**


SELECT column, another_table_column, …
FROM mytable
INNER JOIN another_table 
    ON mytable.id = another_table.id
WHERE condition(s)
ORDER BY column, … ASC/DESC
LIMIT num_limit OFFSET num_offset;


**Aunque los datos de una base de datos sean únicos, es posible que los resultados de una consulta concreta no lo sean: tomemos como ejemplo nuestra tabla Películas, en la que muchas películas diferentes pueden estrenarse el mismo año. En estos casos, SQL ofrece una forma cómoda de descartar las filas que tienen un valor de columna duplicado mediante la palabra clave DISTINCT. Dado que la palabra clave DISTINCT eliminará ciegamente las filas duplicadas, en una lección futura aprenderemos a descartar duplicados basados en columnas específicas utilizando la agrupación y la cláusula GROUP BY.**
SELECT DISTINCT column, another_column, …
FROM mytable
WHERE condition(s);