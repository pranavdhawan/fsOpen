import React from 'react';

const Header = (props) => {
  return (
    <h1>{props.name}</h1>
  );
};

const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  );
};

const Content = (props) => {
  return (
    <div>
      {props.parts.map((part, index) => (<Part key={index} part={part} />))}
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

const Course = (props) => {
  return (
    <div>
      <Header name={props.course.name}></Header>
      <Content parts={props.course.parts}/>
      <Total parts={props.course.parts}/>
    </div>
  )
}


const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }

  return <Course course={course} />
}

export default App