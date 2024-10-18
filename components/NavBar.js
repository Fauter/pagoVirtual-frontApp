import React, { useState } from 'react';
import styled from 'styled-components/native';
import { TouchableOpacity, Text } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

const NavBarContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
  padding: 10px 16px;
  background-color: #ffffff;
  border-top-width: 1px;
  border-top-color: #F4EFE6;
  elevation: 5;
`;

const NavButton = styled(TouchableOpacity)`
  flex: 1;
  align-items: center;
  justify-content: center;
  gap: 4px;
`;

const NavText = styled(Text)`
  font-size: 12px; 
  color: #A18249;
`;

const ActiveNavText = styled(NavText)`
  color: #1C160C; 
`;

const SvgIconHouse = () => (
    <Svg width="24px" height="24px" fill="#A18249" viewBox="0 0 256 256">
        <Path d="M224,115.55V208a16,16,0,0,1-16,16H168a16,16,0,0,1-16-16V168a8,8,0,0,0-8-8H112a8,8,0,0,0-8,8v40a16,16,0,0,1-16,16H48a16,16,0,0,1-16-16V115.55a16,16,0,0,1,5.17-11.78l80-75.48.11-.11a16,16,0,0,1,21.53,0,1.14,1.14,0,0,0,.11.11l80,75.48A16,16,0,0,1,224,115.55Z"></Path>
    </Svg>
);
const SvgIconAlerts = () => (
    <Svg width="24px" height="24px" fill="#A18249" viewBox="0 0 256 256">
        <Path d="M216,192a8,8,0,0,1-8,8H48a8,8,0,0,1,0-16h8v-72a72,72,0,0,1,144,0v72h8A8,8,0,0,1,216,192ZM144,208a16,16,0,1,1-32,0Z"></Path>
    </Svg>
);
const SvgIconContact = () => (
    <Svg width="24px" height="24px" fill="#A18249" viewBox="0 0 256 256">
        <Path d="M229.66,177.83l-50.13-21.51a15.82,15.82,0,0,0-14.12,1.09l-27.47,17.47a96.06,96.06,0,0,1-45.88-45.88l17.47-27.47a15.82,15.82,0,0,0,1.09-14.12L78.17,26.34A16,16,0,0,0,59,19.36L26.41,37.12A19.91,19.91,0,0,0,16,54.17C16.46,142.53,97.47,223.54,185.83,240a19.91,19.91,0,0,0,17-10.41L236.64,197A16,16,0,0,0,229.66,177.83Z"></Path>
    </Svg>
);
const SvgIconProfile = () => (
    <Svg width="24px" height="24px" fill="#A18249" viewBox="0 0 256 256">
        <Path d="M128,136a56,56,0,1,0-56-56A56.06,56.06,0,0,0,128,136Zm0,16c-36.12,0-108,18.29-108,54v16a8,8,0,0,0,8,8H228a8,8,0,0,0,8-8V206c0-35.71-71.88-54-108-54Z"></Path>
    </Svg>
);
const SvgIconNewSavings = () => (
    <Svg width="24px" height="24px" fill="#A18249" viewBox="0 0 256 256">
        <Path d="M204,136a8,8,0,0,1-8,8H136v60a8,8,0,0,1-16,0V144H60a8,8,0,0,1,0-16h60V68a8,8,0,0,1,16,0v60h60A8,8,0,0,1,204,136Z"></Path>
    </Svg>
);


const NavBar = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('Inicio');

  useFocusEffect(
    React.useCallback(() => {
      const routeName = navigation.getState().routes[navigation.getState().index].name;
      setActiveTab(routeName);
    }, [navigation])
  );

  const handleNavigation = (screen) => {
    navigation.navigate(screen);
  };

  return (
    <NavBarContainer>
      <NavButton onPress={() => handleNavigation('AhorrosUser')}>
        <SvgIconHouse />
        <ActiveNavText style={{ color: activeTab === 'AhorrosUser' ? "#1C160C" : "#A18249" }}>Inicio</ActiveNavText>
      </NavButton>
      <NavButton onPress={() => handleNavigation('Alertas')}>
        <SvgIconAlerts />
        <NavText style={{ color: activeTab === 'Alertas' ? "#1C160C" : "#A18249" }}>Alertas</NavText>
      </NavButton>
      <NavButton onPress={() => handleNavigation('Contacto')}>
        <SvgIconContact />
        <NavText style={{ color: activeTab === 'Contacto' ? "#1C160C" : "#A18249" }}>Contacto</NavText>
      </NavButton>
      <NavButton onPress={() => handleNavigation('Perfil')}>
        <SvgIconProfile />
        <NavText style={{ color: activeTab === 'Perfil' ? "#1C160C" : "#A18249" }}>Perfil</NavText>
      </NavButton>
      <NavButton onPress={() => handleNavigation('AhorrosCrear')}>
        <SvgIconNewSavings />
        <NavText style={{ color: activeTab === 'AhorrosCrear' ? "#1C160C" : "#A18249" }}>Nuevo Ahorro</NavText>
      </NavButton>
    </NavBarContainer>
  );
};



export default NavBar;