import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Alert, Modal, Pressable } from 'react-native';
import { useStudentContext } from '../context/StudentContext';
import { getStudentAPI } from '../service/StudentService';
import { averageAPI } from '../service/AverageService';
import InfoStudent from '../components/InfoStudent';
import Diagram from '../components/Diagram';


const MainScreen = ({ navigation }) => {
  const { studentId, setStudent } = useStudentContext();
  const [studentData, setStudentData] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [average, setAverage] = useState(0);


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async() => {
    const response = await getStudentAPI.getStudent(studentId);
    setStudentData(response);
  }

  const averageData = async() => {
    const response = await averageAPI.getAverageStudent(studentId);
    setAverage(response);
  }

  const handleLogout = () => {
    setStudent(null);
    navigation.navigate('Авторизация');
  };


  return (
    <View style={styles.container}>
      <Text>Фамилия Имя Отчество: {'\n'}{studentData?.fio}</Text>
      <Text>Группа:{'\n'}{studentData?.groupName}</Text>
      <Text>Факультет: {'\n'}{studentData?.facultyName}</Text>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Средний балл: {average}</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Закрыть</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Button
        style={[styles.button, styles.buttonOpen]}
        onPress={() => {setModalVisible(true); averageData();}}
        title='Средний балл'>
      </Button>
      <Text>Предметы:</Text>
      <View>
        {studentData?.subjects.map((subject) => (
          <InfoStudent key={subject?.guid} subject={subject} />
        ))}
      </View>
      <Diagram studentId={studentId}/>
      <Button title="Открыть модальное окно" onPress={openModal} />
      
      {/* Другие компоненты и функциональность */}
      <Button title="Выйти" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default MainScreen;