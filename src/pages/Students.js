import React, { useState, useEffect } from 'react';
import StudentComponent from '../components/StudentComponent';

function Students() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [minLoading, setMinLoading] = useState(true);

  useEffect(() => {
    // Set minimum loading time to 2 seconds
    const timer = setTimeout(() => {
      setMinLoading(false);
    }, 2000);

    fetch('https://randomuser.me/api/?results=12')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch students');
        }
        return response.json();
      })
      .then(data => {
        const formattedStudents = data.results.map((user, index) => ({
          id: index,
          name: `${user.name.first} ${user.name.last}`,
          email: user.email,
          year: (index % 4) + 1,
          photo: user.picture.large
        }));

        setStudents(formattedStudents);
        // Only set loading to false when both fetch is done and minLoading is false
        if (!minLoading) {
          setLoading(false);
        }
      })
      .catch(err => {
        setError(err.message);
        if (!minLoading) {
          setLoading(false);
        }
      });

    // Check if minLoading is already false (if fetch completes before 2 seconds)
    return () => {
      clearTimeout(timer);
      if (!minLoading) {
        setLoading(false);
      }
    };
  }, [minLoading]);

  useEffect(() => {
    // When minLoading becomes false, check if we can set loading to false
    if (!minLoading && (students.length > 0 || error)) {
      setLoading(false);
    }
  }, [minLoading, students, error]);

  if (loading) return <div className="loading-spinner"></div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <main className="students-container">
      <h1>Students</h1>
      <div className="students-list">
        {students.map(student => (
          <StudentComponent
            key={student.id}
            name={student.name}
            email={student.email}
            year={student.year}
            photo={student.photo}
          />
        ))}
      </div>
    </main>
  );
}

export default Students;
