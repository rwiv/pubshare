import axios from 'axios';

it('test', async () => {
  const res = await axios.post('http://localhost:3000/api/auth/login', {
    email: 'test1@gmail.com',
    password: '1234',
  });
  const token: string = res.data['access_token'];
  console.log(token);

  const res2 = await axios({
    method: 'GET',
    url: 'http://localhost:3000/api/auth/profile',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(res2.data);
});
