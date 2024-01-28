import React, { useState, useEffect } from 'react';
import { View, Text, Button, Modal, StyleSheet, Dimensions } from 'react-native';
import { subjectsAPI } from '../service/AllSubjects';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
  } from "react-native-chart-kit";

const Diagram = ({ studentId }) => {
  const [dialogVisible, setDialogVisible] = useState(false);
  const [chartData, setChartData] = useState({
    labels: [0, 0, 0, 0, 0, 0],
    datasets: [
      {
        data: [0, 0, 0, 0, 0, 0]
      }
    ]
  });
  const chartConfig = {
    backgroundGradientFrom: "#FFFFFF",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#FFFFFF",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(25, 25, 112, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
  };

  useEffect(() =>{
    const fetchData = async () => {
        try {
          const data = await subjectsAPI.getSubjectsStudent(studentId);
          setChartData({
            labels: data.subjects,
            datasets: [
              {
                data: data.sumEvalitions
              }
            ]
          });
        } catch (error) {
          console.error('Ошибка при загрузке данных:', error);
        }
      };
  
      fetchData();
  }, []);

  const showDialog = () => {
    setDialogVisible(true);
  };

  const hideDialog = () => {
    setDialogVisible(false);
  };

  return (
    <View>
      <Button title='Графики' onPress={showDialog} />
      <Modal visible={dialogVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
          <BarChart
                data={chartData}
                width={Dimensions.get("window").width} // from react-native
                height={220}
                verticalLabelRotation={30}
                yAxisInterval={1} // optional, defaults to 1
                chartConfig={chartConfig}
                bezier
                
            />
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

export default Diagram;