import React from "react"
import styled from "@emotion/styled"

const LogoContainer = styled("div")`
  display: flex;
  flex-direction: column;
  background: #5393fe;
  width: 60px;
  height: 51px;
  border-radius: 5px;
  justify-content: flex-end;
  padding: 9px 12px;
  transition: all 0.1s ease-in;
  position: relative;
  overflow: hidden;

  .Logo__type {
    font-size: 18px;
    font-weight: 800;
    color: #fff;
    text-decoration: none;
    line-height: 1;
    transition: all 0.1s ease-in-out;
  }
`
const Logo = (
  <LogoContainer>
    <span class="Logo__dot Logo__dot--yellow"></span>
    <span class="Logo__dot Logo__dot--magenta"></span>
    <span class="Logo__type">O</span>
  </LogoContainer>
)
export default Logo
