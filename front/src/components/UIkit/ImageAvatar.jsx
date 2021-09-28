import React from 'react';
import Avatar from '@mui/material/Avatar';

const ImageAvatar = (props) => {
  return (
      <Avatar
        alt="User image"
        src={props.image}
        sx={{ width: 40, height: 40 }}
      />
  );
}

export default ImageAvatar;