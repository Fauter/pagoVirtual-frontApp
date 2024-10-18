import React, { useState } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import BaseContainer from './BaseContainer'; 
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Box = styled(View)`
  background-color: #ffffff;
  border-radius: 10px;
  padding: 20px 20px 0px 20px;
  width: 100%;
  elevation: 5;
  margin-top: 20px;
`;

const Container = styled(View)`
  flex: 1;
  background-color: #f8fafc;
  padding: 16px;
`;

const Header = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 8px;
`;

const Title = styled(Text)`
  font-size: 26px;
  font-weight: 800;
  color: #0e141b;
  text-align: center;
  flex: 1;
`;

const DetailsHeader = styled(Text)`
  font-size: 18px;
  font-weight: 600;
  color: #0e141b;
  padding-top: 10px;
`;

const DetailRow = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  padding-vertical: 8px;
  padding-horizontal: 0px;
  border-bottom-width: 1px;
  border-bottom-color: #e0e0e0;
`;

const DetailTextContainer = styled(View)`
  flex-direction: column;
  justify-content: center;
`;

const DetailTitle = styled(Text)`
  font-size: 16px;
  color: #0e141b;
`;

const DetailSubtitle = styled(Text)`
  font-size: 14px;
  color: #6b7280;
`;

const IconContainer = styled(View)`
  justify-content: center;
`;

const PastTransactionRow = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-vertical: 8px;
  border-bottom-width: 1px;
  border-bottom-color: #e0e0e0;
`;

const PastTransactionTextContainer = styled(View)`
  flex-direction: column;
`;

const PastTransactionTitle = styled(Text)`
  font-size: 16px;
  color: #0e141b;
`;

const PastTransactionSubtitle = styled(Text)`
  font-size: 14px;
  color: #6b7280;
`;

const PastTransactionAmount = styled(Text)`
  font-size: 16px;
  color: #0e141b;
`;

const AhorrosDetalle = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [modoPrueba, setModoPrueba] = useState(false);
  const [fechaSimulada, setFechaSimulada] = useState(new Date());
  const [cronActivo, setCronActivo] = useState(false); 
  const { ahorro } = route.params;

  return (
    <BaseContainer>
      <Box>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Header>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="arrow-back" size={24} color="#0e141b" />
            </TouchableOpacity>
            <Title>{ahorro.nombre}</Title>
          </Header>
          <DetailsHeader>Detalles</DetailsHeader>
          <View style={{ paddingBottom: 16, paddingLeft: 5 }}>
            {renderDetailRow('Dirección', ahorro.direccion, 'home')}
            {renderDetailRow('Monto', `$${ahorro.monto.toLocaleString('es-AR')}`, 'attach-money')}
            {renderDetailRow('CVU Origen-Destino', `${ahorro.cvuOrigen} - ${ahorro.cvuDestino}`, 'credit-card')}
            {renderDetailRow('Fecha de Finalización', new Date(ahorro.fechaPago).toLocaleDateString(), 'date-range')}
            {renderDetailRow('Períodos', ahorro.periodos.toString(), 'repeat')}
            {renderDetailRow('Cuotas', ahorro.cuotas.toString(), 'list')}
            {renderDetailRow('Tipo de Pago', ahorro.repetir, 'repeat')}
          </View>

          <DetailsHeader>Historial</DetailsHeader>
          <View style={{ paddingBottom: 16, paddingLeft: 5 }}>
            {ahorro.historial.slice().reverse().map((transaccion, index) => (
              renderPastTransaction(transaccion, index)
            ))}
          </View>
        </ScrollView>
      </Box>
    </BaseContainer>
  );
};

const renderDetailRow = (title, subtitle, iconName) => (
  <DetailRow>
    <DetailTextContainer>
      <DetailTitle>{title}</DetailTitle>
      <DetailSubtitle>{subtitle}</DetailSubtitle>
    </DetailTextContainer>
    <IconContainer>
      <Icon name={iconName} size={24} color="#0e141b" />
    </IconContainer>
  </DetailRow>
);

const renderPastTransaction = (transaccion, index) => ( 
  <PastTransactionRow key={index}> 
    <PastTransactionTextContainer>
      <PastTransactionSubtitle>{new Date(transaccion.fecha).toLocaleDateString()}</PastTransactionSubtitle>
      <PastTransactionSubtitle>{new Date(transaccion.fecha).toLocaleTimeString()}</PastTransactionSubtitle>
    </PastTransactionTextContainer>
    <PastTransactionAmount>
      {transaccion.monto === 0 
        ? 'Ahorro transferido'
        : `+ $${transaccion.monto.toLocaleString('es-AR', { minimumFractionDigits: 2 })}`
      }
    </PastTransactionAmount>
  </PastTransactionRow>
);

export default AhorrosDetalle;
