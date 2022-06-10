const Sequelize = require('sequelize');

let today = new Date();
testDate = today.getFullYear() + '-' + parseInt(today.getMonth() + 1) + '-' + today.getDate();

console.log(testDate);

module.exports = (sequelize) => {
  class Person extends Sequelize.Model {}
  Person.init({
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'The value for "firstName" is empty. Please provide a value',
        },
        notEmpty: {
          msg: 'The value for "firstName" is empty. Please provide a value',
        },
      },
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'The value for "lastName" is empty. Please provide a value',
        },
        notEmpty: {
          msg: 'The value for "lastName" is empty. Please provide a value',
        },
      },
    },
    dateOfBirth: {
      type: Sequelize.DATEONLY,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'The value for "dateOfBirth" is empty. Please provide a value',
        },
        // validates that dateOfBirth is not in the future
        isBefore: {
          args: testDate,
          msg: `Please provide a date that is before today's date for "dateOfBirth"`,
        },
      },
    },
  }, {
    modelName: 'person',
    tableName: 'actors',
    sequelize
  });

  return Person;
}
