import React from "react";
import styled from 'styled-components'
import {border, displayFlexAlignCenter, secondaryColor} from '../../settings/settings'
import {StyledLink} from '../simpleElements/StyledElements'

const FooterWrapper = styled.footer`
  grid-area: footer;
  border: ${border};
  background: ${secondaryColor};
  ${displayFlexAlignCenter};
  justify-content: center;
`

export function Footer(props) {
    return <FooterWrapper>
        <StyledLink to="/doc" size={'24px'}>Documentation</StyledLink>
    </FooterWrapper>
}