import React from 'react';

const Footer = () => (
  <div className="mt-24 flex flex-col items-center">
    <p className="dark:text-gray-200 text-gray-700 text-center mb-10">
      © 2023 All rights reserved by ApeCoinDao.eth
    </p>
    <div className="flex flex-col items-center">
      <p className="dark:text-gray-200 text-gray-700 text-center mb-2">
        Join our community
      </p>
      <a href="https://discord.gg/wg0" >
        <img src="https://cdn.discordapp.com/attachments/1033079854826000484/1088692939607261244/discord_logo-removebg-preview.png" alt="Join us on Discord" width={50} height={50} />
      </a>
    </div>
  </div>
);

export default Footer;
