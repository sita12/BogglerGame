import React from 'react';
import styled from 'styled-components'

const HeaderStyle =  styled.header`
    background-color: DodgerBlue;
    padding: 20px 0;
    text-align: center;
`
const Header = () => {
    return (
        <div className="col-lg-13">
            <HeaderStyle> Boggler Game </HeaderStyle>
        </div>
    )
}

export default Header
