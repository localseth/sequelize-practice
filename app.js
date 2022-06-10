const db = require('./db');
const { Movie, Person } = db.models;


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
      createMovie('Tangled', 100, '3010-04-10', false),
    ]);
    const moviesJSON = movieInstances.map(movie => movie.toJSON());
    console.log(moviesJSON);

    const personInstances =  await Promise.all([
      Person.create({
        firstName: 'Gerard',
        lastName: 'Butler',
        dateOfBirth: '1969-06-09',
      })
    ]);
    const actorsJSON = personInstances.map(person => person.toJSON());
    console.log(actorsJSON);

  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      const errors = error.errors.map(err => err.message);
      console.error('Validation errors: ', errors);
    } else {
      throw error;
    }
  }
})();
