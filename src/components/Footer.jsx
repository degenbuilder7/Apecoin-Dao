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
      <div className="flex items-center mb-4">
        <a href="https://discord.gg/wg0">
          <img src="https://cdn.discordapp.com/attachments/1033079854826000484/1088692939607261244/discord_logo-removebg-preview.png" alt="Join us on Discord" width={50} height={50} />
        </a>
        <a href="https://twitter.com/building4APE">
          <img src="https://cdn2.iconfinder.com/data/icons/social-media-2285/512/1_Twitter_colored_svg-512.png" alt="Follow us on Twitter" width={50} height={50} className="ml-4" />
        </a>
      </div>
    </div>
  </div>
);

export default Footer;
