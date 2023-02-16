-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "empCode" CHAR(100) NOT NULL,
    "email" CHAR(150) NOT NULL,
    "password" CHAR(150) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LeaveMaster" (
    "id" SERIAL NOT NULL,
    "employeeId" INTEGER NOT NULL,
    "leaveBalance" INTEGER NOT NULL,

    CONSTRAINT "LeaveMaster_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Leave" (
    "id" SERIAL NOT NULL,
    "empCode" CHAR(100) NOT NULL,
    "subject" CHAR(255) NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "leaveReason" CHAR(100) NOT NULL,
    "approved" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Leave_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Holiday" (
    "id" SERIAL NOT NULL,
    "title" CHAR(40) NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "isOptional" BOOLEAN NOT NULL DEFAULT false,
    "status" TEXT NOT NULL,

    CONSTRAINT "Holiday_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Employee" (
    "id" SERIAL NOT NULL,
    "empCode" CHAR(100) NOT NULL,
    "name" CHAR(70) NOT NULL,
    "email" CHAR(150) NOT NULL,
    "departmentId" INTEGER NOT NULL,
    "role" TEXT NOT NULL,
    "designation" TEXT NOT NULL,
    "birthDate" TIMESTAMP(3) NOT NULL,
    "reportingUser" TEXT NOT NULL,
    "profileImage" TEXT NOT NULL,
    "contactNo" INTEGER NOT NULL,
    "address" TEXT NOT NULL,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Department" (
    "id" SERIAL NOT NULL,
    "deptName" CHAR(70) NOT NULL,

    CONSTRAINT "Department_pkey" PRIMARY KEY ("id")
);
