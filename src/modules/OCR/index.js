import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import styled from 'styled-components/native';
import { useEventListener } from 'react-native-tesseract-ocr';

const Wrapper = styled.View`
`;

const OCR = () => {

  return (
    <Wrapper>
      <Text>This is OCR Page</Text>
    </Wrapper>
  );
};

export default OCR;