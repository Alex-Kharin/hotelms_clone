import * as React from 'react'
import styled from 'styled-components'
import img from '../../assets/img.jpg'

const DocWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 78%;
  background-color: #d5d5d57f;
  margin: 0 auto;
  
`

export function Documentation(props) {
    return (
        <DocWrapper>
            <header>
                <h1>Documentation</h1>
            </header>
            <article>
                <h2>Grid</h2>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore, molestiae?
                </p>
                <img src={img} width={1024}/>
                <p><b>More detail a little later. </b></p>
            </article>
        </DocWrapper>
    )
}