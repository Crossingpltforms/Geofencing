import React from "react";
import {HeaderContainer, Wrapper, LeftSection, BackImage, BackText, MiddleSection, RightSection, BackTouch, MiddleText} from './style'
const Header=(props)=>{
    return(
        <HeaderContainer>
            <Wrapper>
                <LeftSection>
                    {
                        props.backIcon === false ? null : (
                            <BackTouch onPress={()=>props.goBack()} >
                                <BackImage source={require('../../assets/images/Back.png')}/>
                                {props.backtext!='' ? <BackText numberOfLines={1}>Sign In</BackText> : null }
                            </BackTouch>
                        )
                    }
                </LeftSection>
                <MiddleSection>
              		{/* <LogoImage 
                        source={require('../../assets/logo/MatematikTutor_owl.png')}
                    /> */}
                    {
                    props.centerTitle!='' ? <MiddleText numberOfLines={1}>{props.centerTitle}</MiddleText> :null }
              	</MiddleSection>
                <RightSection>
                    {/* <SearchIcon 
                        source={require('../../assets/Header-icons/Search.png')}
                    /> */}
                    {/* <SettingTouch onPress={()=>setModalOneVisible(true)}> */}
                        {/* <SettingIcon source={require('../../assets/Header-icons/Settings.png')} /> */}
                    {/* </SettingTouch> */}
              	</RightSection>
            </Wrapper>
        </HeaderContainer>
    )
}

export default Header;