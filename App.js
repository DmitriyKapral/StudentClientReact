import React from 'react';
import AppNavigator from './navigation/AppNavigation';
import { StudentProvider } from './context/StudentContext';

const App = () => {
  return (
    <StudentProvider>
      <AppNavigator />
    </StudentProvider>
  );
};

export default App;