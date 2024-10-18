import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styled from 'styled-components/native';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {LinearGradient} from 'expo-linear-gradient';
import BaseContainer from './BaseContainer'; 
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';


const Box = styled(View)`
  background-color: #ffffff;
  border-radius: 10px;
  padding: 20px 20px 30px 20px;
  width: 100%;
  align-items: center; 
  elevation: 5; 
  margin-top: 20px;
`;

const InputLabel = styled(Text)`
  color: #1C160C;
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 8px;
`;

const InputField = styled(TextInput)`
  width: 100%;
  height: 56px;
  border-radius: 10px;
  background-color: #F4EFE6;
  padding: 10px;
  color: #1C160C;
  margin-bottom: 16px;
`;

const Button = styled(TouchableOpacity)`
  background-color: ${props => (props.primary ? '#019863' : '#F4EFE6')};
  border-radius: 20px;
  height: 40px;
  justify-content: center;
  align-items: center;
  margin: 5px;
  flex: 1;
`;


const AhorrosCrear = () => {
  const [nombre, setNombre] = useState('');
  const [direccion, setDireccion] = useState('');
  const [monto, setMonto] = useState('');
  const [cvuOrigen, setCvuOrigen] = useState('');
  const [cvuDestino, setCvuDestino] = useState('');
  const [fechaPago, setFechaPago] = useState(new Date());
  const [periodos, setPeriodos] = useState('');
  const [showFechaPago, setShowFechaPago] = useState(false);
  const [repetir, setRepetir] = useState('Único');
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(null);

  const navigation = useNavigation();

  useEffect(() => {
    const fetchToken = async () => {
      const storedToken = await AsyncStorage.getItem('token'); 
      setToken(storedToken);
    };
    fetchToken();
  }, []);

  const handleContinue = async () => {
    if (!token) {
      Alert.alert('Error', 'No se pudo encontrar el token de usuario.');
      return;
    }
    if (!nombre || !direccion || !monto || !cvuOrigen || !cvuDestino || !periodos) {
      Alert.alert('Error', 'Por favor, completa todos los campos.');
      return;
    }

    const parsedMonto = parseFloat(monto);
    const parsedPeriodos = parseInt(periodos, 10);
    const hoy = new Date();
    const diferenciaDias = Math.floor((fechaPago - hoy) / (1000 * 60 * 60 * 24));
    const cuotas = Math.ceil(diferenciaDias / parsedPeriodos);
    const montoPorCuota = parsedMonto / cuotas;

    Alert.alert(
      'Confirmación',
      `Vas a crear un ahorro de $${monto} en ${cuotas} cuotas de $${montoPorCuota.toFixed(2)} cada ${parsedPeriodos} días.`,
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Confirmar',
          onPress: async () => {
            try {
              setLoading(true);
              const ahorroData = {
                nombre,
                direccion,
                monto: parsedMonto,
                cvuOrigen,
                cvuDestino,
                fechaPago,
                periodos: parsedPeriodos,
                repetir,
              };
              console.log('Ahorro Data:', JSON.stringify(ahorroData));
              console.log('Token:', token);
              const response = await fetch('http://192.168.100.6:5000/api/auth/ahorros/crear', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(ahorroData),
              });

              const data = await response.json();
              console.log('Response:', data);

              if (response.ok) {
                Alert.alert('Éxito', 'El ahorro fue creado exitosamente', [
                  {
                    text: 'OK',
                    onPress: () => navigation.navigate('AhorrosUser'), 
                  },
                ]);
              } else {
                Alert.alert('Error', data.message || 'No se pudo crear el ahorro');
              }
            } catch (error) {
              console.error('Error al crear el ahorro:', error);
              Alert.alert('Error', 'Ocurrió un error al intentar crear el ahorro');
            } finally {
              setLoading(false);
            }
          },
        },
      ]
    );
  };
    

  const handleClear = () => {
    setNombre('');
    setDireccion('');
    setCvuOrigen('');
    setMonto('');
    setFechaPago(new Date());
    setPeriodos('');
    setRepetir('No');
    setCvuDestino('');
  };

  const onChangeFechaPago = (event, selectedDate) => {
    const currentDate = selectedDate || fechaPago;
    setShowFechaPago(false);
    setFechaPago(currentDate);
  };

  const handlePeriodosChange = (value) => {
    if (/^\d*$/.test(value)) {
      setPeriodos(value); 
    }
  };

  return (
    <BaseContainer>
        <View style={{ flex: 1, position: 'relative' }}>
            <ScrollView 
            style={{ flex: 1 }}
            showsVerticalScrollIndicator={false} 
            contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
            >
            <Box>
                <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#1C160C', marginBottom: 20 }}>
                    Nuevo ahorro
                </Text>

                <InputLabel>Nombre</InputLabel>
                  <InputField
                      placeholder="Ej: Starbucks"
                      value={nombre}
                      onChangeText={setNombre}
                  />
                <InputLabel>Dirección</InputLabel>
                  <InputField
                      placeholder="Ej: Av. Corrientes 1234, CABA"
                      value={direccion}
                      onChangeText={setDireccion}
                  />          
                <InputLabel>Valor del ahorro</InputLabel>
                  <InputField
                      placeholder="Ingrese monto"
                      value={monto}
                      onChangeText={setMonto}
                      keyboardType="numeric"
                  />       
                <InputLabel>CBU/CVU/Alias Origen</InputLabel>
                  <InputField
                      placeholder="Ingrese CBU/CVU/Alias"
                      value={cvuOrigen}
                      onChangeText={setCvuOrigen}
                  />                   
                <InputLabel>CBU/CVU/Alias Destino</InputLabel>
                  <InputField
                      placeholder="Ingrese CBU/CVU/Alias"
                      value={cvuDestino}
                      onChangeText={setCvuDestino}
                  />                             
                <InputLabel>Fecha de finalización</InputLabel>
                  <TouchableOpacity onPress={() => setShowFechaPago(true)} style={{ width: '100%' }}>
                      <InputField
                          placeholder="Elija una fecha"
                          value={fechaPago.toLocaleDateString()}
                          editable={false}
                      />    
                  </TouchableOpacity>
                  {showFechaPago && (
                      <DateTimePicker
                          value={fechaPago}
                          mode="date"
                          display="default"
                          onChange={onChangeFechaPago}
                      />
                  )}
                <InputLabel>Periodos</InputLabel>
                    <InputField
                        placeholder="Ingrese número de cuotas"
                        value={periodos}
                        onChangeText={handlePeriodosChange} 
                        keyboardType="numeric"
                    />
                <InputLabel>Tipo de Pago</InputLabel>
                  <Picker
                      selectedValue={repetir}
                      onValueChange={(itemValue) => setRepetir(itemValue)}
                      style={{ height: 56, width: '100%', backgroundColor: '#F4EFE6', borderRadius: 10, marginBottom: 16 }}
                  >
                      <Picker.Item label="Único" value="Unico" />
                      <Picker.Item label="Recursivo" value="Recursivo" />
                  </Picker>

                <Text style={{ color: '#1C160C', marginBottom: 20 }}>
                Vas a debitar diariamente de tu cuenta $20000
                </Text>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Button primary onPress={handleContinue}>
                    <Text style={{ color: '#FFFFFF', fontWeight: 'bold' }}>Continuar</Text>
                </Button>
                <Button onPress={handleClear}>
                    <Text style={{ color: '#1C160C', fontWeight: 'bold' }}>Borrar</Text>
                </Button>
                </View>
            </Box>
            </ScrollView>
            <LinearGradient
              colors={['rgba(197, 235, 222, 0.8)', 'transparent']}
              style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 50 }}
              pointerEvents="none"
            />
            <LinearGradient
              colors={['transparent', 'rgba(197, 235, 222, 0.8)']}
              style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 50 }}
              pointerEvents="none"
            />
        </View>     
    </BaseContainer>
  );
};

export default AhorrosCrear;