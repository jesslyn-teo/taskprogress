//jesslynteo.23@ichat.sp.edu.sg 2323064 DIT/FT/1B/05

const pool = require("../services/db");

const bcrypt = require("bcrypt");
const saltRounds = 10;

const callback = (error, results, fields) => {
    if (error) {
        console.error("Error creating tables:", error);
    } else {
        console.log("Tables created successfully");
    }
    process.exit();
}

bcrypt.hash('myPassword123$', saltRounds, (error, hash) => {
    if (error) {
        console.error("Error hashing password:", error);
    } else {
        console.log("Hashed password:", hash);

        const SQLSTATEMENT = `
        DROP TABLE IF EXISTS TaskProgress;
        DROP TABLE IF EXISTS Task;
        DROP TABLE IF EXISTS User;

        CREATE TABLE User (
            user_id int NOT NULL AUTO_INCREMENT,
            username TEXT NOT NULL,
            email TEXT NOT NULL,
            password TEXT NOT NULL,
            created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            last_login_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY(user_id)
        );

        CREATE TABLE Task (
            task_id int NOT NULL AUTO_INCREMENT,
            title text,
            description text,
            points int DEFAULT NULL,
            PRIMARY KEY(task_id)
        );

        CREATE TABLE TaskProgress (
            progress_id int NOT NULL AUTO_INCREMENT,
            user_id int NOT NULL,
            task_id int NOT NULL,
            completion_date timestamp NULL DEFAULT NULL,
            notes text,
            PRIMARY KEY(progress_id),
            KEY TaskProgress_user_id_user_user_id_idx (user_id),
            KEY TaskProgress_task_id_task_task_id_idx (task_id),
            CONSTRAINT taskProgress_task_id_task_task_id FOREIGN KEY(task_id) REFERENCES task(task_id) ON DELETE CASCADE ON UPDATE CASCADE,
            CONSTRAINT taskProgress_user_id_user_user_id FOREIGN KEY(user_id) REFERENCES user(user_id) ON DELETE CASCADE ON UPDATE CASCADE
        );

        INSERT INTO User (username, email, password) VALUES 
            ('Annie How','anniehow@amail.com', '${hash}'),
            ('Boh Shieh','bohshieh@bmail.com', '${hash}'),
            ('Carrie Ong','carrieong@cmail.com', '${hash}'), 
            ('Dabu Liao','dabuliao@dmail.com', '${hash}'),
            ('Ellie Fan','elliefan@email.com', '${hash}')
        ;

        INSERT INTO Task VALUES 
            (1,'Plant a Tree','Plant a tree in your neighbourhood or a designated green area.',50),
            (2,'Use Public Transportation','Use public transportation or carpool instead of driving alone.',30),
            (3,'Reduce Plastic Usage','Commit to using reusable bags and containers.',40),
            (4,'Energy Conservation','Turn off lights and appliances when not in use.',25),
            (5,'Composting','Start composting kitchen scraps to create natural fertilizer.',35)
        ;

        INSERT INTO TaskProgress VALUES 
            (1,2,2,'2023-11-14 16:00:00','Using MRT more often'),
            (2,3,3,'2023-11-14 16:00:00','Brought my own shopping bag'),
            (3,2,1,'2023-11-14 16:00:00','Planted a tree'),
            (4,5,1,'2023-11-14 16:00:00','Planted a tree'),
            (5,4,1,'2023-11-14 16:00:00','Planted a tree')
        ;

        DROP TABLE IF EXISTS FairyCompanion;
        DROP TABLE IF EXISTS StudentProgress;
        DROP TABLE IF EXISTS Spells;
        DROP TABLE IF EXISTS Student;

        CREATE TABLE Student (
            student_id int NOT NULL AUTO_INCREMENT,
            student_name text,
            class_id int DEFAULT NULL,
            fairy_companion_id varchar(50) DEFAULT NULL,
            PRIMARY KEY (student_id)
        );

        CREATE TABLE Spells (
            spells_id int NOT NULL AUTO_INCREMENT,
            spells_name text,
            spells_description text,
            PRIMARY KEY (spells_id)
        );

        CREATE TABLE StudentProgress (
            student_progress_id int NOT NULL AUTO_INCREMENT,
            student_id int NOT NULL,
            spells_id int NOT NULL,
            competition_date timestamp NULL DEFAULT NULL,
            competition_name text,
            competition_results varchar(50) DEFAULT NULL,
            PRIMARY KEY (student_progress_id),
            KEY StudentProgress_student_id_student_student_id_idx (student_id),
            KEY StudentProgress_spells_id_spells_spells_id_idx (spells_id),
            CONSTRAINT StudentProgress_spells_id_spells_spells_id FOREIGN KEY (spells_id) REFERENCES Spells (spells_id) ON DELETE CASCADE ON UPDATE CASCADE,
            CONSTRAINT StudentProgress_student_id_student_student_id FOREIGN KEY (student_id) REFERENCES Student (student_id) ON DELETE CASCADE ON UPDATE CASCADE
        );

        CREATE TABLE FairyCompanion (
            fairy_companion_id int NOT NULL AUTO_INCREMENT,
            fairy_companion_name text,
            fairy_companion_hair_color text,
            fairy_companion_eye_color text,
            fairy_companion_powers text,
            PRIMARY KEY (fairy_companion_id)
        );

        INSERT INTO Student VALUES 
            (1,'Aria ',1,''),
            (2,'Bowan ',2,''),
            (3,'Caspian ',1,'11'),
            (4,'Dante ',2,''),
            (5,'Elara ',1,'9'),
            (6,'Fova ',2,'1'),
            (7,'Gorion ',1,'13'),
            (8,'Hova ',2,'6'),
            (9,'Isolde ',2,'5'),
            (10,'Juna ',1,''),
            (11,'Kael',3,'3'),
            (12,'Lark',1,'2'),
            (13,'Maeve',2,''),
            (14,'Nyx',3,'8'),
            (15,'Orion',2,''),
            (16,'Phoenix',1,'7'),
            (17,'Quill',3,''),
            (18,'Rune',2,''),
            (19,'Sage',3,'10'),
            (20,'Talon',2,''),
            (21,'Ursula',3,''),
            (22,'Vesper',3,'4'),
            (23,'Wren',1,''),
            (24,'Xander',2,''),
            (25,'Yarrow',1,'12'),
            (26,'Zephyr',3,'')
        ;

        INSERT INTO Spells VALUES 
            (1,'Aetherial Veil','Conceals the caster and allies from sight.'),
            (2,'Baleful Hex','Casts a malevolent upon an individual.'),
            (3,'Chrono Shift','Manipulates time briefly.'),
            (4,'Dormantia','Induces a deep slumber upon the target for a specified duration.'),
            (5,'Ethereal Echo','Projects a duplicate of the caster to confuse adversaries.'),
            (6,'Frostbite','Envelops frost damage and slowing movement.'),
            (7,'Galeforce Gust','Summons a powerful windstorm to repel opponents and deflect projectiles.'),
            (8,'Hallowed Sanctuary','Erects a protective aura that shields against forces.')
        ;

        INSERT INTO StudentProgress VALUES 
            (1,1,8,'2024-04-15 05:00:00','Elemental Duels Tournament','TBC'),
            (2,1,6,'2024-06-05 06:00:00','Astral Projection Race ','TBC'),
            (3,1,4,'2023-08-18 04:00:00','Spellcasting Championship','2nd Place'),
            (4,2,2,'2024-04-15 05:00:00','Elemental Duels Tournament','TBC'),
            (5,2,1,'2024-06-05 06:00:00','Astral Projection Race ','TBC'),
            (6,3,3,'2023-10-12 03:00:00','Celestial Navigation Quest','1st Place'),
            (7,3,5,'2024-04-15 05:00:00','Elemental Duels Tournament','TBC'),
            (8,4,7,'2023-10-12 03:00:00','Celestial Navigation Quest','Participant'),
            (9,5,8,'2023-08-18 04:00:00','Spellcasting Championship','Participant'),
            (10,5,6,'2023-10-12 03:00:00','Celestial Navigation Quest','Participant')
        ;

        INSERT INTO FairyCompanion VALUES 
            (1,'Aurora','Red','Black','Glowing Aura'),
            (2,'Breezy','Orange','Brown','Whispering Winds'),
            (3,'Celeste','Yellow','Green','Natures Harmony'),
            (4,'Drystal','Green','Red','Sparkling Shield'),
            (5,'Ember','Blue','Blue','Mystic Enchantment')
        ;
        
        DROP TABLE IF EXISTS Messages;

        CREATE TABLE Messages (
            id INT PRIMARY KEY AUTO_INCREMENT,
            message_text TEXT NOT NULL,
            user_id INT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
          
        INSERT INTO Messages (message_text, user_id) VALUES
            ("Hello world!", 1),
            ("Yummy!", 2),  
            ("I am the one", 3),
            ("Nice to meet you", 2),
            ("We Love BED!", 4)
        ;
        `;
        pool.query(SQLSTATEMENT, callback);
    }
});

