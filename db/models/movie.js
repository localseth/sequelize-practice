const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  class Movie extends Sequelize.Model {}
  Movie.init({
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'The value for "title" is empty. Please provide a value',
        },
        notEmpty: {
          msg: 'The value for "title" is empty. Please provide a value',
        },
      },
    },
    runtime: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'The value for "runtime" is empty. Please provide a value',
        },
        min: {
          args: 1,
          msg: 'Please provide a value greater than "0" for "runtime"',
        },
      },
    },
    releaseDate: {
      type: Sequelize.DATEONLY,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'The value for "releaseDate" is empty. Please provide a value',
        },
        isAfter: {
          args: '1895-12-27',
          msg: 'Please provide a value on or after "1895-12-28"',
        },
      },
    },
    availableOnVHS: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      validate: {
        notNull: {
          msg: 'The value for "availableOnVHS" is empty. Please provide a value',
        },
      },
    },
  }, {
    modelName: 'movie',
    tableName: 'top_movies_of_all_time',
    paranoid: true,
    sequelize
  });

  return Movie;
}
