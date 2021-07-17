import styled from 'styled-components'
import React from 'react'

export const CommonIcon = ({ className, children }) => (
    <span className={'material-icons ' + className}>
    {children}
  </span>
)

export const Icon = styled(CommonIcon)`
  font-size: ${({size}) => size}px;
`