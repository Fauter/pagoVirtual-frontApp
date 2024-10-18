import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import styled from 'styled-components/native';
import { ScrollView, View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BaseContainer from './BaseContainer';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Box = styled(View)`
  background-color: #ffffff;
  border-radius: 10px;
  padding: 20px 20px 0px 20px;
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

const Register = () => {
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = async () => {
    if (!firstName || !lastName || !email || !password) {
      Alert.alert('Error', 'Todos los campos son obligatorios.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        Alert.alert('Error', 'Por favor, ingresa un correo electrónico válido.');
        return;
    }
    try {
      const response = await fetch('http://192.168.100.6:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
        }),
      });

      const data = await response.json();
      console.log('Response data:', data);
      if (response.ok) {
        Alert.alert('Éxito', 'Usuario registrado correctamente');
        navigation.navigate('Login');
      } else {
        Alert.alert('Error', data.msg || 'No se pudo registrar el usuario. Inténtalo de nuevo.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'No se pudo registrar el usuario. Inténtalo de nuevo.');
    }
  };

  return (
    <BaseContainer>
      <KeyboardAvoidingView 
        style={{ flex: 1 }} 
        behavior={Platform.OS === 'ios' ? 'position' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
      >
        <ScrollView 
          contentContainerStyle={{ flexGrow: 1 }} 
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={{ flex: 1, position: 'relative' }}>
              <Box>
                    <Header>
                        <Title>Registro</Title>
                    </Header>
                    <ImageContainer>
                        <Image
                            source={{ uri: 'https://cdn.usegalileo.ai/sdxl10/f7618e93-de27-47ec-bae0-8cf914493755.png' }}
                            style={{ width: '100%', height: '100%' }}
                            resizeMode="cover"
                        />
                    </ImageContainer>
                    <Input 
                      placeholder="Nombre" 
                      placeholderTextColor="#a18249" 
                      value={firstName}
                      onChangeText={setFirstName} 
                    />
                    <Input 
                      placeholder="Apellido" 
                      placeholderTextColor="#a18249" 
                      value={lastName}
                      onChangeText={setLastName} 
                    />
                    <Input 
                      placeholder="Correo electrónico" 
                      placeholderTextColor="#a18249" 
                      value={email}
                      onChangeText={setEmail}
                      keyboardType="email-address"
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
                    <Button onPress={handleRegister}>
                        <ButtonText>Registrarse</ButtonText>
                    </Button>
                    <SocialButton>
                        <SocialButtonText>Registrarse con Google</SocialButtonText>
                    </SocialButton>
                    <SocialButton>
                        <SocialButtonText>Iniciar sesión con Face ID</SocialButtonText>
                    </SocialButton>
              </Box>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </BaseContainer>
  );
};

export default Register;