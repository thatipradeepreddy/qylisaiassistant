import React from 'react';
import { useSelector } from 'react-redux';

function Home(props: any) {
  const data = useSelector((state: any) => state.USER);
  console.log(data, "data");

  // If isAuthenticated is false or data is empty, return null or a loading indicator
//   if (!data.isAuthenticated || !data.users || data.users.length === 0) {
//     return <div>Loading...</div>;
//   }

  // Assuming data.users is an array of users, you can map over it to render each user
  return (
    <div>
      <h1>Home</h1>
      <p>Data from parent:</p>
      <ul>
        {data.users.map((user: any) => (
          <li key={user.id}>
            Name: {user.name}, Email: {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
