/* eslint-disable */
import React, { useEffect, useState } from 'react';

const TrustedUsers = () => {
  const [trustedUsers, setTrustedUsers] = useState([]);

  useEffect(() => {
    fetch('https://forum.apecoin.com/directory_items.json?period=all')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        const result = data.directory_items.map(item => ({
          username: item.user.username,
          trust_level: item.user.trust_level
        }));
        setTrustedUsers(result);
      })
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h1>Trusted Users</h1>
      {trustedUsers.map(user => (
        <div key={user.username}>
          <h2>{user.username}</h2>
          <p>Trust level: {user.trust_level}</p>
        </div>
      ))}
    </div>
  )
};

export default TrustedUsers;
