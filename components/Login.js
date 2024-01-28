import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from "axios";
import { useStudentContext } from '../context/StudentContext';

const Login = ({ navigation }) => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const { setStudent } = useStudentContext();

  const handleLogin = async () => {
    await axios.post("https://192.168.1.187:7263/Auth", {
            login,
            password,
        })
        .then((response) =>{
          if (response.status == 200)
          {
              setStudent(response.data.guid);
              navigation.navigate('Личный кабинет студента');
          }
          else{
              Alert.alert("Неправильный логин и пароль");
          }
        }).catch(function () {
          Alert.alert("Нету соединения к бд");
        });


  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Логин"
        onChangeText={text => setLogin(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Пароль"
        secureTextEntry={true}
        onChangeText={text => setPassword(text)}
      />
      <Button title="Войти" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
  },
});

export default Login;