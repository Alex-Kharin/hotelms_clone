import React from "react";
import styled from 'styled-components'
import {border, secondaryColor} from '../../settings/settings'

const FooterWrapper = styled.footer`
  grid-area: footer;
  border: ${border};
  background: ${secondaryColor};
`

export function Footer(props) {
    return <FooterWrapper>Footer</FooterWrapper>
}