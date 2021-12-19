const firebasedb = require('firebase/database');
const { getAllUsers } = require('.');

var users = null;
async function list() {
  try {
    await firebasedb.onValue(firebasedb.ref(db, '/users'), (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        users = Object.values(data);
        console.log(users);
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
  const users = getAllUsers();
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
  update
};
