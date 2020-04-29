import styled from "styled-components";
import { Row } from "antd";

export const InfoContainer = styled(Row)`
  display: flex;
  height: 100%;
  padding-top: 28px;
  padding-bottom: 28px;
  background-color: ${props => props.theme.inputColor};
  font-family: Roboto;
`;
export const FriendsContainer = styled(Row)`
  display: flex;
  flex-wrap: wrap;
`;

export const FixedContainer = styled(Row)`
  width: 882px;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  @media only screen and (max-width: 767px) {
    justify-content: center;
  }
  margin: 0 auto;
  padding: 16px;
  box-shadow: ${props => props.theme.boxShadow2};
  border-radius: 8px;
`;

export const FriendsHeading = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 30px;
  color: ${props => props.theme.secondaryText};
`;
