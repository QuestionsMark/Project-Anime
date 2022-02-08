import React from 'react';
import { HOST_ADDRESS } from '../config';

export const Image = ({src, alt}) => <img src={`${HOST_ADDRESS}/images/${src}`} alt={alt} className="img"/>;