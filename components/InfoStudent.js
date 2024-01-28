import React, { useState } from 'react';
import { View, Text, Button, Modal, StyleSheet } from 'react-native';

const InfoStudent = ({ subject }) => {
  const [dialogVisible, setDialogVisible] = useState(false);

  const showDialog = () => {
    setDialogVisible(true);
  };

  const hideDialog = () => {
    setDialogVisible(false);
  };

  return (
    <View>
      <Button title={subject?.name} onPress={showDialog} />
      <Modal visible={dialogVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.header}>{subject?.name}</Text>
            <Text>Сумма баллов: {subject?.sumEvaluatuion}</Text>
            {subject?.sumEvaluatuion !== 0 && (
              <View>
                <Text>Дата и время || Оценка:</Text>
                {subject.evaluations.map((evaluation) => (
                  <View key={evaluation?.guid}>
                    <Text>{new Date(evaluation?.dateTime).toLocaleDateString()} || {evaluation?.quantity}</Text>
                  </View>
                ))}
              </View>
            )}
            <Button title="Закрыть" onPress={hideDialog} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default InfoStudent;