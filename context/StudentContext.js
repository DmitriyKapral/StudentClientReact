import { createContext, useContext, useState } from 'react';

const StudentContext = createContext();

export const useStudentContext = () => {
  return useContext(StudentContext);
};

export const StudentProvider = ({ children }) => {
  const [studentId, setStudentId] = useState(null);

  const setStudent = (id) => {
    setStudentId(id);
  };

  return (
    <StudentContext.Provider value={{ studentId, setStudent }}>
      {children}
    </StudentContext.Provider>
  );
};