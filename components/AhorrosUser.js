import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useIsFocused, useNavigation, useFocusEffect } from '@react-navigation/native';
import { useAhorros } from './AhorrosProvider';
import BaseContainer from './BaseContainer'; 
import axios from 'axios';

const Box = styled(View)`
  background-color: #ffffff;
  border-radius: 10px;
  padding: 10px 20px;
  width: 100%;
  align-items: center; 
  elevation: 5; 
  margin-top: 20px;
  min-height: 400px;
  height: auto;
`;

// Header
const Header = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 8px;
  background-color: #FFFFFF;
`;
const LeftSection = styled(View)`
  flex-direction: row;
  align-items: center;
  flex: 1;
`;
const BackButton = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
`;
const Title = styled(Text)`
  font-size: 18px;
  color: #1C160C;
  font-weight: bold;
  margin-left: 10px;
`;
const MenuButton = styled(TouchableOpacity)`
  justify-content: center;
  align-items: center;
  width: 48px;
  height: 48px;
  align-self: flex-end;
`;
//

// Search Box
const SearchContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  background-color: #F4EFE6;
  border-radius: 12px;
  height: 48px;
  margin-top: 16px;
  width: 100%;
`;
const SearchIconContainer = styled(View)`
  padding-left: 16px;
  justify-content: center;
  align-items: center;
`;
const SearchInput = styled(TextInput)`
  flex: 1;
  padding: 0 16px;
  color: #1C160C;
  font-size: 16px;
  background-color: #F4EFE6;
  border-radius: 12px;
`;
//

// Filtro 
const FilterContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  padding: 10px 0;
  width: 100%;
`;
const FilterButton = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  background-color: #F4EFE6;
  padding: 4px 8px;
  border-radius: 16px;
  margin: 0;  
`;
const FilterText = styled(Text)`
  color: #1C160C;
  font-size: 14px;
  margin-left: 4px;
`;

// Ahorro Item Container
const AhorroContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  margin: 15px 0;
  padding: 0px;
  background-color: ${props => (props.pausado ? '#f0f0f0' : '#ffffff')};
  border-radius: 8px;
  width: 100%;
  justify-content: space-between;
`;
// Icon Container
const IconContainer = styled(View)`
  width: 40px;
  height: 40px;
  justify-content: center;
  align-items: center;
  background-color: #E8E8E8;
  border-radius: 8px;
`;
// Button
const ViewButton = styled(TouchableOpacity)`
  background-color: #A18249;
  border-radius: 8px;
  padding: 6px 12px;
`;

const handleNavigation = (screenName, ahorro) => {
  navigation.navigate(screenName, { ahorro });
};

const AhorrosUser = () => {
    const [search, setSearch] = useState('');
    const [ahorros, setAhorros] = useState([]);
    const navigation = useNavigation();
    const isFocused = useIsFocused();

    const handleNavigation = (screenName, ahorro) => {
      navigation.navigate(screenName, { ahorro });
    };

    useEffect(() => {
      const fetchAhorros = async () => {
          const token = await AsyncStorage.getItem('token');
          try {
            const response = await axios.get('http://192.168.100.6:5000/api/auth/ahorros', {
              headers: {
                  'x-auth-token': token,
              },
            });
            if (Array.isArray(response.data)) {
              setAhorros(response.data);
            } else {
              console.error('Los datos no tienen el formato esperado:', response.data);
            }
          } catch (error) {
              console.error('Error al obtener ahorros:', error.response ? error.response.data : error.message);
          }
      };
      if (isFocused) {
        fetchAhorros();
      }
    }, [isFocused]);

    const filteredAhorros = ahorros.filter(ahorro => 
      ahorro.nombre.toLowerCase().includes(search.toLowerCase()) || 
      ahorro.direccion.toLowerCase().includes(search.toLowerCase())
    );
    const ahorrosPausados = filteredAhorros.filter(ahorro => ahorro.estado === 'pausado');
    const ahorrosActivos = filteredAhorros.filter(ahorro => ahorro.estado !== 'pausado');


    return (
      <BaseContainer>
        <Box>
            <Header>
                <LeftSection>
                    <BackButton>
                        <Icon name="arrow-back" size={24} color="#1C160C" />
                    </BackButton>
                    <Title>Mis cuentas</Title>
                </LeftSection>
                <MenuButton>
                    <Icon name="more-vert" size={24} color="#1C160C" />
                </MenuButton>
            </Header>
    
            <SearchContainer>
              <SearchIconContainer>
                  <Icon name="search" size={24} color="#A18249" />
              </SearchIconContainer>
              <SearchInput
                  placeholder="Busca por cuenta, alias o dirección"
                  placeholderTextColor="#A18249"
                  value={search}
                  onChangeText={setSearch}
              />
            </SearchContainer>

            <FilterContainer>
                <FilterButton>
                    <Icon name="filter-list" size={20} color="#1C160C" />
                    <FilterText>Filtrar</FilterText>
                    <Icon name="arrow-drop-down" size={20} color="#1C160C" />
                </FilterButton>
            </FilterContainer>

            {filteredAhorros.length === 0 ? (
                <Text style={{ marginTop: 20, color: '#1C160C' }}>No tienes ahorros</Text>
            ) : (
              <View style={{ marginTop: 0 }}>
                {ahorrosActivos.map((ahorro) => (
                  <AhorroContainer key={ahorro.id || ahorro.nombre}>
                    <IconContainer>
                      <Icon name="location-on" size={24} color="#1C160C" />
                    </IconContainer>
                    <View style={{ flex: 1, marginLeft: 10 }}>
                      <Text style={{ color: '#1C160C', fontWeight: 'bold', margin: 0, padding: 0 }}>{ahorro.nombre}</Text>
                      <Text style={{ color: '#1C160C', margin: 0, padding: 0 }}>{ahorro.direccion}</Text>
                    </View>
                    <ViewButton onPress={() => handleNavigation('AhorrosDetalle', ahorro)}>
                      <Text style={{ color: '#ffffff' }}>Ver</Text>
                    </ViewButton>
                  </AhorroContainer>
                ))}
                {ahorrosPausados.length > 0 && (
                  <View style={{ marginTop: 20 }}>
                    <Text style={{ fontWeight: 'bold', marginBottom: 10, color: '#1C160C' }}>Pausados:</Text>
                    {ahorrosPausados.map((ahorro) => (
                      <AhorroContainer key={ahorro.id || ahorro.nombre} pausado>
                        <IconContainer>
                          <Icon name="pause" size={24} color="#1C160C" />
                        </IconContainer>
                        <View style={{ flex: 1, marginLeft: 10 }}>
                          <Text style={{ color: '#1C160C', fontWeight: 'bold', margin: 0, padding: 0 }}>{ahorro.nombre}</Text>
                          <Text style={{ color: '#1C160C', margin: 0, padding: 0 }}>{ahorro.direccion}</Text>
                        </View>
                        <ViewButton onPress={() => handleNavigation('AhorrosDetalle', ahorro)}>
                          <Text style={{ color: '#ffffff' }}>Ver</Text>
                        </ViewButton>
                      </AhorroContainer>
                    ))}
                  </View>
                )}
              </View>
            )}
        </Box>
      </BaseContainer>
    );
  };
  
  export default AhorrosUser;