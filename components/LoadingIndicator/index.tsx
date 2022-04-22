import React from 'react';
import {RiLoader3Line} from 'react-icons/ri';

interface Props {
  size?: number;
}

const index = ({ size = 20 }: Props) => {
  return <RiLoader3Line size={size} className="animate-spin" />;
};

export default index;
