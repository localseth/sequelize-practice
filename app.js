const db = require('./db');
const { Movie, Person } = db.models;
const { Op } = db.Sequelize;


// movie helper function
const createMovie = (title, runtime, releaseDate, availableOnVHS) => {
  return Movie.create({title, runtime, releaseDate, availableOnVHS});
}

// async IIFE
(async () => {
  // sync 'Movies' table
  await db.sequelize.sync({ force: true });

  try {
    // test connection
    // await sequelize.authenticate();
    // console.log('Connection to the database successful!');

    // movie entries
    const movieInstances = await Promise.all([
      createMovie('Fight Club', 139, '1999-01-19', true),
      createMovie('300', 117, '2006-05-30', true),
      createMovie('Tangled', 100, '2010-04-10', false),
    ]);
    const moviesJSON = movieInstances.map(movie => movie.toJSON());
    // console.log(moviesJSON);

    const personInstances =  await Promise.all([
      Person.create({
        firstName: 'Gerard',
        lastName: 'Butler',
        dateOfBirth: '1969-06-09',
      })
    ]);
    const actorsJSON = personInstances.map(person => person.toJSON());
    // console.log(actorsJSON);

    const movieBuild = await Movie.build({
      title: 'Mad Max: Fury Road',
      runtime: 120,
      releaseDate: '2015-05-15',
      availableOnVHS: false,
    });
    await movieBuild.save();
    // console.log(movieBuild.toJSON());

    const movieById = await Movie.findByPk(1);
    // console.log(movieById.toJSON());

    const movieByRuntime = await Movie.findOne({ where: { runtime: 120 } });
    // console.log(movieByRuntime.toJSON());

    const movies = await Movie.findAll({
      attributes: ['id', 'title'],
      where: {
        releaseDate: {
          [Op.gte]: '2004-01-01',
        },
        runtime: {
          [Op.gt]: 95,
        },
      },
      order: [['id', 'DESC']]
    });
    console.log( movies.map(movie => movie.toJSON()) );

    const tangled = await Movie.findOne({
      where: {
        title: 'Tangled'
        },
    });
    await tangled.update({
      availableOnVHS: true,
      title: 'triangled',
    }, { fields: ['availableOnVHS'] });

    // console.log( tangled.get({ plain: true }) );

    await Movie.destroy({
      where: {
        releaseDate: {
          [Op.lt]: '2009-01-01',
        },
      },
    });

    // find and log all movies
    const updatedMovies = await Movie.findAll();
    console.log(updatedMovies.map(movie => movie.toJSON()));

    // console.log( allMovies.map(movie => movie.toJSON()) );

  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      const errors = error.errors.map(err => err.message);
      console.error('Validation errors: ', errors);
    } else {
      throw error;
    }
  }
})();
