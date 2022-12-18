use test;

CREATE TABLE Profesor (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  nume VARCHAR(255),
  Mail VARCHAR(255)
);
Drop table Curs;
CREATE TABLE Curs (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  nume VARCHAR(255),
  profesorId INTEGER,
  studentId integer,
  nota INTEGER DEFAULT 0,
  FOREIGN KEY (profesorId) REFERENCES Profesor(id)
);
Drop table Student;
CREATE TABLE Student (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  nume VARCHAR(255),
  mail VARCHAR(255)
);

CREATE TABLE student_curs (
	id INTEGER PRIMARY KEY AUTO_INCREMENT,
	StudentId Integer,
    CursId Integer,
	nota INTEGER DEFAULT 0,
	FOREIGN KEY (CursId) REFERENCES Curs(id),
	FOREIGN KEY (StudentId) REFERENCES Student(id)
);

