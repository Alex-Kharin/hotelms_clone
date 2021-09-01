import styled from 'styled-components'
import {Link} from 'react-router-dom'

export const Legend = styled.legend`
  padding: .2em;
  border: 1px solid green;
  border-left: #43b25a 5px solid;
  border-right: #43b25a 5px solid;
`

export const Fieldset = styled.fieldset`
  margin-bottom: 10px;
`

export const ErrorMessageElement = styled.span`
  color: red;
  text-align: center;
  font-weight: bold;
  padding: 5px;
`

export const StyledLink  = styled(Link)`
  text-decoration: none;
  color: ${props => props.color || 'black'};
  font-size: ${props => props.size || 'inherit'};
  font-weight: bold;
  &:active {
    color: white;
  }
`