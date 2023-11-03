import React from 'react';

const Header = ({ course }) => {
  return (
    <h1>{course}</h1>
  );
};

const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  );
};

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part, index) => (<Part key={index} part={part} />))}
    </div>
  );
};

const Total = (props) => {
  const totalExercises = props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises
  return (
    <p>
      <strong>Total of {totalExercises} exercises</strong>
    </p>
  );
};

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default App;
