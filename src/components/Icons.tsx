/* eslint-disable @typescript-eslint/no-explicit-any */
// @ts-nocheck
import styled from 'styled-components';
import React from 'react';
import dark from '../data/dark.svg';
import light from '../data/light.svg';


const SVGIconButton = styled.div`
  cursor: pointer;
`;

type IconProp = {
  onClick: (arg0: any) => any,
  title: string
};

export const DarkIcon = ({ title, onClick }: IconProp) => <SVGIconButton title={title} onClick={onClick}><img src={dark} alt="dark" /></SVGIconButton>;
export const LightIcon = ({ title, onClick }: IconProp) => <SVGIconButton title={title} onClick={onClick}><img src={light} alt="light" /></SVGIconButton>;
