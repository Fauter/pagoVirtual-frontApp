import React, { useState } from 'react';
import styled from 'styled-components/native';
import { View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BaseContainer from './BaseContainer'; 
import Icon from 'react-native-vector-icons/MaterialIcons';

const Box = styled(View)`
  background-color: #ffffff;
  border-radius: 10px;
  padding: 10px 20px;
  width: 100%;
  align-items: center; 
  elevation: 5; 
  margin-top: 20px;
`;

const Header = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const Title = styled(Text)`
  font-size: 24px;
  font-weight: bold;
  color: #1c160c;
  text-align: center;
`;

const Input = styled(TextInput)`
  width: 100%; 
  height: 56px;
  border-radius: 10px;
  background-color: #f4efe6;
  padding: 10px;
  margin: 10px 0;
  color: #1c160c;
`;

const Button = styled(TouchableOpacity)`
  background-color: #019863;
  border-radius: 30px;
  height: 56px;
  justify-content: center;
  align-items: center;
  margin: 5px 0;
  width: 97%;
`;

const ButtonText = styled(Text)`
  color: #ffffff;
  font-weight: bold;
`;

const SocialButton = styled(TouchableOpacity)`
  background-color: #f4efe6;
  border-radius: 30px;
  height: 56px;
  justify-content: center;
  align-items: center;
  margin: 5px 0;
  width: 97%; 
`;

const SocialButtonText = styled(Text)`
  color: #1c160c;
  font-weight: bold;
`;

const ImageContainer = styled(View)`
  width: 100%; 
  aspect-ratio: 1; 
  border-radius: 10px; 
  overflow: hidden; 
  align-items: center; 
  justify-content: center; 
  margin: 10px 0; 
`;

const RegisterButton = styled(TouchableOpacity)`
  margin-top: 10px;
`;

const RegisterText = styled(Text)`
  color: #019863;
  font-weight: bold;
`;

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const handleLogin = async () => {
    try {
        const response = await fetch("http://192.168.100.6:5000/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });
        const data = await response.json();
        if (response.ok) {
            await AsyncStorage.setItem('token', data.token);
            console.log('Login exitoso:', data);
            Alert.alert('Login exitoso');
            navigation.navigate('MainStack');
        } else {
            console.log('Error en el login:', data);
            Alert.alert('Error al iniciar sesión', data.msg || 'Credenciales inválidas');
        }
    } catch (err) {
        console.error('Error en la petición:', err);
        Alert.alert('Error', 'Algo salió mal al intentar iniciar sesión');
    }
  }
  return (
    <BaseContainer>
      <Box>
        <Header>
          <Title>Pago Virtual</Title>
        </Header>
        <ImageContainer>
          <Image
            source={{ uri: 'https://cdn.usegalileo.ai/sdxl10/f7618e93-de27-47ec-bae0-8cf914493755.png' }}
            style={{ width: '100%', height: '100%' }}
            resizeMode="cover"
          />
        </ImageContainer>
        <Input 
            placeholder="Correo electrónico" 
            placeholderTextColor="#a18249" 
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
        />
        <View style={{ position: 'relative', width: '100%' }}>
          <Input 
              placeholder="Contraseña" 
              placeholderTextColor="#a18249" 
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
              autoCapitalize="none"
          />
          <TouchableOpacity
              style={{ 
                position: 'absolute',
                right: 10,
                top: 0,
                bottom: 0,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => setShowPassword(prev => !prev)}
          >
              <Icon name={showPassword ? 'visibility-off' : 'visibility'} size={24} color="#1c160c" />
          </TouchableOpacity>
        </View>
        <Button onPress={handleLogin}>
          <ButtonText>Iniciar sesión</ButtonText>
        </Button>
        <SocialButton>
          <SocialButtonText>Iniciar sesión con Google</SocialButtonText>
        </SocialButton>
        <SocialButton>
          <SocialButtonText>Iniciar sesión con Face ID</SocialButtonText>
        </SocialButton>
        <RegisterButton onPress={() => navigation.navigate('Register')}>
          <RegisterText>¿No tienes una cuenta? Registrarte.</RegisterText>
        </RegisterButton>
      </Box>
    </BaseContainer>
  );
};

export default Login;