const firebasedb = require('firebase/database');
const { db } = require('./index.js');


// router.get('/database', async (req, res, next) => {



// });

async function list() {
  var users = null;
  try {
    await firebasedb.onValue(firebasedb.ref(db, '/users'), (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        users = Object.values(data);
      }
      else {
        console.log('No data available');
      }
    });
    return users;
  } catch (err) {
    console.error(err);
  }
};

async function get({ email }) {
  const users = await list();
  return users.find(user => user.email == email)
}

async function create(user) {
  try {
    firebasedb.set(firebasedb.ref(db, 'users/' + user.id), {
      id: user.id,
      email: user.email,
      username: user.username,
      password: user.password,
    });
  } catch (err) {
    console.error(err);
  }
}

async function update(userId, updates) {
  try {
    firebasedb.update(
      firebasedb.ref(db, 'users/' + userId),
      updates,
    ).then(() => {
      console.log('successfully updated')
    })
  }
  catch (err) {
    console.error(err);
  }
}

module.exports = {
  get,
  list,
  create,
  update,
};
