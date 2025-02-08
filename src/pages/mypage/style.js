import styled from 'styled-components';
import { flexCenterColumn, flexCenterRow, flexRow } from '../../global/common.js';
import { NavLink } from 'react-router-dom';

const S = {};


S.ContentTitle = styled.h3`
    font-size: ${({theme})=>theme.FONT_SIZE["h3"]};
    font-weight: ${({theme})=>theme.FONT_WEIGHT["bold"]};
    color: ${({theme})=>theme.PALLETTE.brand["primary_black"]};
`;

S.Background = styled.div`
    width: 100%;
    height: 100%;
    background-color: ${({theme})=>theme.PALLETTE.myGrey["background"]};
    padding: 20px 0px 300px 0px;
`;

S.Container = styled.div`
    display: flex;
    width: 1420px;
    padding: 20px;
    margin: 0 auto;
    justify-content: space-between;
`;

S.Sidebar = styled.div`
    width: 340px;
    background-color: #ffffff;
    padding: 20px;
    margin-right: 20px;
    border-radius: 10px;
`;

S.Content = styled.div`
    width: 1020px;
    padding: 40px;
    background-color: #ffffff;
    border-radius: 10px;
`;

S.ProfileInfoWrapper = styled.div`
    padding: 10px 14px;
    display: flex;
    flex-direction: row;
    align-items: center;

    & div.profileImage{
        border-radius: 50%;

        & img {
            margin-right: 20px;
        }
    }
    

    & h4 {
        font-size: ${({theme})=>theme.FONT_SIZE["h4"]};
        font-weight: ${({theme})=>theme.FONT_WEIGHT["medium"]};
        margin-bottom: 8px;
    }

    & p {
        font-size: ${({theme})=>theme.FONT_SIZE["p"]};
        font-weight: ${({theme})=>theme.FONT_WEIGHT["regular"]};
        color: ${({theme})=>theme.PALLETTE.grey["8"]};
    }
`;


S.FollowInfoWrapper = styled.div`
    padding: 24px 10px;
    ${flexRow}
    justify-content: space-between;
    align-items: center;

    & div.wrapper {
        ${flexRow}
        justify-content: space-between;
    }

    & span.title {
        font-size: ${({theme})=>theme.FONT_SIZE["sub-title"]};
        font-weight: ${({theme})=>theme.FONT_WEIGHT["medium"]};
        color: ${({theme})=>theme.PALLETTE.grey["8"]};
        margin-right: 4px;
    }

    & span.content {
        font-size: ${({theme})=>theme.FONT_SIZE["sub-title"]};
        font-weight: ${({theme})=>theme.FONT_WEIGHT["medium"]};
    }

    & div.divider {
        width: 1px;
        height: 16px; /* 원하는 높이 설정 */
        background-color: ${({theme})=>theme.PALLETTE.grey["2"]};
        margin: 0px 16px;
    }

    & button {
        cursor: pointer;
    }
`;

S.MenuSection = styled.section`
    padding: 36px 0px;
    border-top: 1px solid ${({theme})=>theme.PALLETTE.grey["2"]};

    & .wrapper {
        ${flexCenterRow}
        justify-content: space-between;
        padding: 0px 28px;
    }
`;

S.IconWrapper = styled.div`
    ${flexCenterColumn}

    & span.top-title {
        font-size: ${({theme})=>theme.FONT_SIZE["p"]};
        font-weight: ${({theme})=>theme.FONT_WEIGHT["regular"]};
        margin: 4px 0px;
    }

    & span.top-content {
        font-size: ${({theme})=>theme.FONT_SIZE["sub-title"]};
        font-weight: ${({theme})=>theme.FONT_WEIGHT["medium"]};
    }

    & a {
        color: ${({theme})=>theme.PALLETTE.brand["primary_black"]};
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 4px;
    }

    & a:hover {
        opacity: 0.8;
    }
`;

S.MenuListWrapper = styled.div`
    margin-bottom: 20px;

    & p.menu-title {
        font-size: ${({theme})=>theme.FONT_SIZE["sub-title"]};
        font-weight: ${({theme})=>theme.FONT_WEIGHT["medium"]};
        margin-bottom: 12px;
        margin-left: 10px;
    }
`;

S.MenuListNavLink = styled(NavLink)`
    padding: 8px 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 2px;
    color: ${({theme})=>theme.PALLETTE.brand["primary_black"]};
    border-radius: 6px;

    & span.menu-content {
        font-size: ${({theme})=>theme.FONT_SIZE["p"]};
        font-weight: ${({theme})=>theme.FONT_WEIGHT["regular"]};
    }

    & img {
        margin-right: 4px;
        width: 15px;
        height: 15px;
    }

    &:hover, &.active {
        background-color: ${({theme}) => theme.PALLETTE.myGrey["background"]}; // 원하는 색상으로 변경
    }
`;

S.PasswordTable = styled.table`
    width: 60%;
    margin: 0 auto;
    padding-top: 40px;

    & td.title {
        width: 30%;
        height: 80px;

        & span {
            color: ${({theme})=>theme.PALLETTE.sub["warning"]};
        }
    }

    & td input {
        width: 100%;
        border-radius: 8px;
        border: 1px solid ${({theme})=>theme.PALLETTE.grey["2"]};
    }

    & td input:focus {
        outline: none;
    }
`;

S.PasswordChangeButton = styled.button`
    width: 100px;
    padding: 12px 8px;
    font-size: ${({theme})=>theme.FONT_SIZE["title"]};
    font-weight: ${({theme})=>theme.FONT_WEIGHT["medium"]};
    background-color: ${({theme})=>theme.PALLETTE.brand["primary"]};
    color: #fff;
    border-radius: 10px;
    cursor: pointer;
`;

S.SmallButton = styled.button`
    border-radius: 10px;
    border: 1px solid ${({theme})=>theme.PALLETTE.grey["8"]};
    background-color: #fff;
`;

S.WarningText = styled.p`
    font-size: 12px;
    color: ${({theme})=>theme.PALLETTE.sub["warning"]};
    margin-top: 8px;
`;


export default S;
