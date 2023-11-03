import axios from 'axios';

it('test', async () => {
  const token = await login({
    email: 'test1@gmail.com',
    password: '1234',
  });
  const res = await profile(token);
  console.log(res.data);

  const token2 = await login({
    email: 'test2@gmail.com',
    password: '1234',
  });
  const res2 = await profile(token2);
  console.log(res2.data);
});

async function login(data: { email: string; password: string }) {
  const res = await axios.post(
    'http://localhost:3000/api/accounts/login',
    data,
  );
  return res.data['access_token'];
}

function profile(token: string) {
  return axios({
    method: 'GET',
    url: 'http://localhost:3000/dev/profile',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
