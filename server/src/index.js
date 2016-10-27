import express from 'express';
import promisePrint from 'promise-print';

export const app = express();

let post1 = {
  id: 'post:1',
  userId: 'ccheever',
  message: "Hello world",
  postTime: 1477539803158,
};
let post2 = {
  id: 'post:2',
  userId: 'fsc',
  message: "Need anything from the store?",
  postTime: 1477539811381,
};
const DATA = {
  POSTS: {
    'post:1': post1,
    'post:2': post2,
  },
  USERS: {
    ccheever: {
      id: 'ccheever',
      name: 'Charlie Cheever',
      photoUrl: 'http://www.incimages.com/uploaded_files/image/1940x900/charlie-cheever-quora-pan_20353.jpg',
    },
    fsc: {
      id: 'fsc',
      name: 'Francie Cheever',
      photoUrl: 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/p/6/005/0a2/1ca/29d9837.jpg',
    },
  },
  LIST_OF_POSTS: [post2, post1],
};

app.get('/', function (req, res) {
  res.send(JSON.stringify(DATA));
});

app.get('/posts', (req, res) => {
  res.send(JSON.stringify(DATA.LIST_OF_POSTS));
});

app.get('/users', (req, res) => {
  res.send(JSON.stringify(DATA.USERS));
});

export function addUser(props) {
  let user = {...props};
  DATA.USERS[user.id] = user;
  return user;
}

export function updateUser(props) {
  let user = DATA.USERS[props.id] || {};
  user = {...user, ...props};
  DATA.USERS[user.id] = user;
  return user;
}

export function addPost(props) {
  let post = {...props};
  post.postTime = Date.now();
  DATA.POSTS[post.id] = post;
  DATA.LIST_OF_POSTS.unshift(post);
}

app.all('/create_user', (req, res) => {
  let user = addUser(req.query);
  res.send(JSON.stringify(user));
});

app.all('/create_post', (req, res) => {
  let post = addPost(req.query);
  res.send(JSON.stringify(post));
});

app.all('/update_user', (req, res) => {
  let user = updateUser(req.query);
  res.send(JSON.stringify(user));
});

export async function startAsync(port) {
  port = port || 3000;
  app.listen(port, () => {
    console.log("Server started on port", port);
  });
}

if (require.main === module) {
  promisePrint(startAsync(process.argv[2]));
}

export default startAsync;
