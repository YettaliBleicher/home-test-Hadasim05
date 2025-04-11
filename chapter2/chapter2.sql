CREATE DATABASE FamilyTree
use FamilyTree
GO

CREATE TABLE People (
    Person_Id INT IDENTITY(1,1) PRIMARY KEY,
    Personal_Name VARCHAR(255),
    Family_Name VARCHAR(255),
    Gender VARCHAR(10),
    Father_Id INT,
    Mother_Id INT,
    Spouse_Id INT,
    CONSTRAINT CK_SpouseNotSelf CHECK (Spouse_Id <> Person_Id)
);

INSERT INTO People (Personal_Name, Family_Name, Gender, Father_Id, Mother_Id, Spouse_Id)
VALUES
    ('מאיר', 'בלייכר', 'זכר', NULL, NULL, 2),
    ('אלישבע', 'בלייכר', 'נקבה', NULL, NULL, NULL),
    ('אליהו', 'בלייכר', 'זכר', 1, 2, 4),
    ('לאהלה', 'בלייכר', 'נקבה', NULL, NULL, NULL),
    ('יטלי', 'בלייכר', 'זכר', 1, 2, NULL);

SELECT * FROM People

---1
create table Relationship(
	Person_Id INT PRIMARY KEY,
	Relative_Id INT,
	Connection_Type NVARCHAR(10),
	FOREIGN KEY (Person_Id) references People(Person_Id),
	FOREIGN KEY (Relative_Id) references People(Person_Id),
    CHECK (Connection_Type IN ('אב', 'אם', 'אח', 'אחות', 'בן', 'בת', 'בן זוג', 'בת זוג', 'לא ידוע'))
);


create PROCEDURE InsertFamilyRelations
AS
BEGIN
    -- father
    INSERT INTO Relationship (Person_Id, Relative_Id, Connection_Type)
    SELECT Person_Id, Father_Id, 'אב' FROM People WHERE Father_Id IS NOT NULL
    AND NOT EXISTS (SELECT 1 FROM Relationship fr WHERE fr.Person_Id = Person_Id AND fr.Relative_Id = Father_Id AND fr.Connection_Type = 'אב');

    -- mother
    INSERT INTO Relationship (Person_Id, Relative_Id, Connection_Type)
    SELECT Person_Id, Mother_Id, 'אם' FROM People WHERE Mother_Id IS NOT NULL
    AND NOT EXISTS (SELECT 1 FROM Relationship fr WHERE fr.Person_Id = Person_Id AND fr.Relative_Id = Mother_Id AND fr.Connection_Type = 'אם');

    -- spouse
    INSERT INTO Relationship (Person_Id, Relative_Id, Connection_Type)
    SELECT p1.Person_Id, p1.Spouse_Id, CASE WHEN p2.Gender = 'זכר' THEN 'בן זוג' WHEN p2.Gender = 'נקבה' THEN 'בת זוג' ELSE 'לא ידוע' END
    FROM People p1
    LEFT JOIN People p2 ON p1.Spouse_Id = p2.Person_Id
    WHERE p1.Spouse_Id IS NOT NULL
    AND NOT EXISTS (SELECT 1 FROM Relationship fr WHERE fr.Person_Id = p1.Person_Id AND fr.Relative_Id = p1.Spouse_Id);

    -- children
    INSERT INTO Relationship (Person_Id, Relative_Id, Connection_Type)
    SELECT p1.Person_Id, p2.Person_Id, CASE WHEN p2.Gender = 'זכר' THEN 'בן' WHEN p2.Gender = 'נקבה' THEN 'בת' ELSE 'לא ידוע' END
    FROM People p1
    LEFT JOIN People p2 ON (p1.Person_Id = p2.Father_Id OR p1.Person_Id = p2.Mother_Id)
    WHERE p1.Person_Id IN (SELECT Father_Id FROM People UNION SELECT Mother_Id FROM People)
    AND NOT EXISTS (SELECT 1 FROM Relationship fr WHERE fr.Person_Id = p1.Person_Id AND fr.Relative_Id = p2.Person_Id AND fr.Connection_Type IN ('בן', 'בת', 'לא ידוע'));

    -- siblings
    INSERT INTO Relationship (Person_Id, Relative_Id, Connection_Type)
    SELECT p1.Person_Id, p2.Person_Id, CASE WHEN p2.Gender = 'זכר' THEN 'אח' WHEN p2.Gender = 'נקבה' THEN 'אחות' ELSE 'לא ידוע' END
    FROM People p1
    LEFT JOIN People p2 ON (p1.Father_Id = p2.Father_Id OR p1.Mother_Id = p2.Mother_Id)
    WHERE p1.Person_Id <> p2.Person_Id
    AND NOT EXISTS (SELECT 1 FROM Relationship fr WHERE fr.Person_Id = p1.Person_Id AND fr.Relative_Id = p2.Person_Id AND fr.Connection_Type IN ('אח', 'אחות', 'לא ידוע'));
END;

EXEC InsertFamilyRelations;

---2

CREATE PROCEDURE CheckSpouse @personId int, @spouseId int
as 

INSERT INTO Relationship (Person_Id, Relative_Id, Connection_Type)
SELECT p2.Person_Id, p1.Person_Id, CASE WHEN p1.Gender = 'זכר' THEN 'בן זוג' ELSE 'בת זוג' END
FROM People p1
JOIN People p2 ON p1.Spouse_Id = p2.Person_Id
WHERE p1.Spouse_Id IS NOT NULL
AND NOT EXISTS (
    SELECT 1
    FROM Relationship fr
    WHERE fr.Person_Id = p2.Person_Id AND fr.Relative_Id = p1.Person_Id
);
