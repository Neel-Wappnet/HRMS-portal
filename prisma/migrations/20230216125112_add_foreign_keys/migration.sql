-- This is an empty migration.
ALTER TABLE "Employee"
ADD CONSTRAINT dept_foreign_key FOREIGN KEY (departmentId) REFERENCES Department (id);

ALTER TABLE "LeaveMaster"
ADD CONSTRAINT emp_foreign_key FOREIGN KEY (employeeId) REFERENCES Employee (id);
