DROP TABLE IF EXISTS `formdangky`;
CREATE TABLE `formdangky` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,  
    `fullName` VARCHAR(255) CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_unicode_ci' DEFAULT NULL,
    `dob` VARCHAR(10) CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_unicode_ci' DEFAULT NULL,                           
    `gender` ENUM('Male', 'Female', 'Other'), 
    `address` VARCHAR(255) CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_unicode_ci' DEFAULT NULL,
    `parentName` VARCHAR(255) CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_unicode_ci' DEFAULT NULL,
    `signature` VARCHAR(255) CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_unicode_ci' DEFAULT NULL,
    `phone1` VARCHAR(20) DEFAULT NULL,                    
    `phone2` VARCHAR(20) DEFAULT NULL,
    `class` VARCHAR(50) CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_unicode_ci' DEFAULT NULL,                   
    `className` VARCHAR(255) CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_unicode_ci' DEFAULT NULL,
    `classTime` VARCHAR(100) CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_unicode_ci' DEFAULT NULL,                      
    `classSchedule` VARCHAR(100) CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_unicode_ci' DEFAULT NULL,                  
    `fee` VARCHAR(50) CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_unicode_ci' DEFAULT NULL,                     
    `classStartDate` VARCHAR(100) CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_unicode_ci' DEFAULT NULL, 
    `classDuration` VARCHAR(100) CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_unicode_ci' DEFAULT NULL,           
    `createdAt` datetime NOT NULL      
);
