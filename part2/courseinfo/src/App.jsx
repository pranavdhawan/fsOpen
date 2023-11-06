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
  const totalExercises = props.parts.reduce((total, part) => total + part.exercises, 0)
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
      <Content parts={props.course.parts} />
      <Total parts={props.course.parts} />
    </div>
  )
}


const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]


  return (
    <div>
      <Course course={courses[0]} />
      <Course course={courses[1]} />
    </div>

  )
}

export default App