const Sequelize = require("sequelize");
const { DATABASE_URL } = require("./config");

const { Umzug, SequelizeStorage } = require("umzug");

const sequelize = new Sequelize(DATABASE_URL);

const migrationConf = {
  migrations: {
    glob: "migrations/*.js",
  },
  storage: new SequelizeStorage({ sequelize, tableName: "migrations" }),
  context: sequelize.getQueryInterface(),
  logger: console,
};

const runMigrations = async () => {
  const migrator = new Umzug(migrationConf);
  const migrations = await migrator.up();
  console.log("Migrations up to date", {
    files: migrations.map((mig) => mig.name),
  });
};
const rollbackMigration = async () => {
  await sequelize.authenticate();
  const migrator = new Umzug(migrationConf);
  await migrator.down();
};

const connectToDatabase = async () => {
  try {
    await runMigrations();
    await sequelize.authenticate();
    console.log("Connected to the database");
  } catch (error) {
    console.log("Failed to connect to the database");
    return process.exit(1);
  }
  return null;
};

module.exports = {
  connectToDatabase,
  sequelize,
  rollbackMigration,
};
