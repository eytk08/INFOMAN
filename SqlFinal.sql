Select * From patient;
Select * From doctor; 
Select * From infoman.condition; 
Select * From allergy;
Select * From surgery; 


-- Set their Age -- 
Update patient set patientAge = timestampdiff(Year,patientBday, curdate());

-- Select Commands --
-- 1, Simple  -- 
Select * 
From patient as P, doctor as D, allergy as A, Surgery as S
Where (P.fk_doctor_ID = D.doctor_ID) AND (P.patient_ID = A.fk_allergy_patient_ID) AND (P.patient_ID = S.fk_surgery_patient_ID);

-- 2, Simple  --
Select * 
From patient 
Where patientMarStat = 'Married' AND patientRel = 'Christian';

-- 3, Simple  -- 
Select * 
From patient 
Where (patientSex = 'M') AND (patientBday BETWEEN '1990-01-01' AND '2013-12-31');

-- 4, Moderate  -- 
Select patientSex, COUNT(*) as patientCNT
FROM patient 
Where (patientMarStat = 'Married') AND (patientHeight >= '150' OR patientWeight >= 80)
Group BY patientSex; 

-- 5, Moderate  -- 
Select patientSex, COUNT(*) as emailCNT
From patient 
Where patientEmail LIKE '%@yahoo.com%'
Group by patientSex;

-- 6, Moderate  -- 
Select patientRel, AVG(patientWeight) as weightAVG
From patient
Where patientAge > 18
Group by patientRel
Having weightAVG > 70
Order by weightAVG desc; 

-- 7, Difficult --
Select doctorPDoc, Count(*) as patientCNT
From patient as P, Doctor as D 
Where (P.fk_doctor_ID = D.doctor_ID) AND P.patientAge  > 30
Group by doctorPDoc;

-- 8, Difficult -- 
Select P.patientName, P.patientSex, D.doctorPDoc, S.surgeryLoc, S.surgeryName, AVG(P.patientAge) as patientageAVG 
From patient as P, doctor as D, surgery as S, infoman.condition as C
Where  (P.fk_doctor_ID = D.doctor_ID) AND (P.patient_ID = C.fk_condition_patient_ID) AND (P.patient_ID = S.fk_surgery_patient_ID) AND C.conditionMed IN ('Insulin', 'Antibiotics')
AND S.surgeryName IN ('Lobectomy', 'Open Heart Surgery', 'Appendectomy')
Group by P.patientName, P.patientSex, D.doctorPDoc, S.surgeryLoc, S.surgeryName
Having patientageAVG > 20;

-- 9, Difficult -- 
Select D.doctorPDoc, AVG(P.patientWeight) as WeightAVG
From patient as P, doctor as D, infoman.condition as C
Where (P.fk_doctor_ID = D.doctor_ID) AND (P.patient_ID = C.fk_condition_patient_ID)
Group by D.doctorPDoc
Having WeightAVG > 65;

-- 10, Difficult -- 
Select D.doctorPDoc, Floor(AVG(patientAge)) as ageAVG
From patient as P, Doctor as D, infoman.condition as C, allergy as A 
Where (P.fk_doctor_ID = D.Doctor_ID) AND (P.patient_ID = C.fk_condition_patient_ID) AND (P.patient_ID = A.fk_allergy_patient_ID) AND (C.conditionName LIKE '%Diabetes%' OR A.allergenName IN ('Peanuts', 'Mollusks'))
Group by D.doctorPDoc
Having ageAVG > 20;

