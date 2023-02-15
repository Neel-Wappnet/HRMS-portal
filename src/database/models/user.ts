import { DataTypes, Model, Optional, DataType } from 'sequelize';
import sequelizeConnection from "../../config/dbConnect"


interface userAttributes {
  empCode: number
  fullName: string
  email: string
  personalEmail: string
  company: string
  department: string
  designation: string
  bloodGroup: string
  gender: string
  birthDate: Date
  maritalStatus: boolean
  maritalDate: Date | undefined
  physicalHandicapped: boolean
  noteForHandicapped: string | undefined
  joiningDate: Date
  reportingUser: string

  createdAt: Date
  updatedAt: Date
}

export interface userInput extends Optional<userAttributes, "empCode"> { }

class User extends Model<userAttributes, userInput> implements userAttributes {
  public empCode!: number
  public fullName!: string
  public email!: string
  public personalEmail!: string
  public company!: string
  public department!: string
  public designation!: string
  public bloodGroup!: string
  public gender!: string
  public birthDate!: Date
  public maritalStatus!: boolean
  public maritalDate!: Date | undefined
  public physicalHandicapped!: boolean
  public noteForHandicapped!: string | undefined
  public joiningDate!: Date
  public reportingUser!: string

  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

User.init({
  empCode: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.BIGINT
  },
  fullName: {
    allowNull: false,
    type: DataTypes.STRING
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING
  },
  personalEmail: {
    allowNull: false,
    type: DataTypes.STRING
  },
  company: {
    allowNull: false,
    type: DataTypes.STRING
  },
  department: {
    allowNull: false,
    type: DataTypes.STRING
  },
  designation: {
    allowNull: false,
    type: DataTypes.STRING
  },
  bloodGroup: {
    allowNull: false,
    type: DataTypes.STRING
  },
  gender: {
    allowNull: false,
    type: DataTypes.STRING
  },
  birthDate: {
    allowNull: false,
    type: DataTypes.DATE
  },
  maritalStatus: {
    allowNull: false,
    type: DataTypes.BOOLEAN
  },
  maritalDate: {
    allowNull: false,
    type: DataTypes.DATE
  },
  physicalHandicapped: {
    allowNull: false,
    type: DataTypes.BOOLEAN
  },
  noteForHandicapped: {
    allowNull: false,
    type: DataTypes.STRING
  },
  joiningDate: {
    allowNull: false,
    type: DataTypes.DATE
  },
  reportingUser: {
    allowNull: false,
    type: DataTypes.STRING
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE
  }
}, {
  sequelize: sequelizeConnection,
  timestamps: true
})

export default User