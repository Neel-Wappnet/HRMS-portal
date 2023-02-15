import {Sequelize} from "sequelize"
import {config} from "dotenv"

config()

const database = process.env.DB_DATABASE as string
const username = process.env.DB_USERNAME as string
const password = process.env.DB_PASSWORD as string
const host = process.env.DB_HOST

const sequelizeConnection = new Sequelize(database, username, password, {
  host: host,
  dialect:"postgres"
});

export default sequelizeConnection