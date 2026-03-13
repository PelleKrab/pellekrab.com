import React from 'react'
import ProjectPage from './ProjectPage'

const FRCJavaFramework: React.FC = () => {
  return (
    <ProjectPage title="FRC Java Framework" subtitle="A brief overview of our FRC Java programming framework for robotics competitions.">
      <h2>Introduction to FRC Java Framework</h2>
      <p>
        The FRC (FIRST Robotics Competition) Java Framework is a powerful tool for programming robots to compete in various challenges. It provides developers with a structured environment to create, test, and deploy code that controls robot movements, sensors, and automated tasks.
      </p>

      <h2>Objectives</h2>
      <ul>
        <li>Streamline the development of robot code.</li>
        <li>Reduce barrier to entry for new FRC programmers.</li>
        <li>Reduce bugs and increase efficiency during development.</li>
        <li>Create a command-based framework and increase modularity.</li>
        <li>Increase accuracy and decrease wait time with a PID.</li>
      </ul>

      <h2>Key Features</h2>
      <h3>Integration with WPILib</h3>
      <p>
        WPILib is a library specifically designed for FRC robot programming, offering a range of functions to control motors, sensors, and communication.
      </p>

      <h3>Teleop Mode XML Config</h3>
      <p>
        Develop code for operator-controlled robots. This can be simplified into different commands that allow for a more intuitive coding experience.
      </p>

      <h3>Autonomous Mode XML Config</h3>
      <p>
        Develop code for autonomous modes to perform complex tasks by using sensors to guide the robot's actions.
      </p>

      <h3>Robot XML Master Constant File</h3>
      <p>
        XML file holds all constants for the robot, ie. motor port numbers, PID constants, hardware settings, limit switch values, and other constants. Allows for changing constant values without recompiling code.
      </p>

      <h3>Sensor Integration</h3>
      <p>
        Easily interface with various sensors such as encoders, gyros, and cameras to enhance robot capabilities.
      </p>

      <h2>What I Learned</h2>
      <ol>
        <li>Leadership development</li>
        <li>Version Control</li>
        <li>Complex Java project / creating internal tooling</li>
        <li>Project Management</li>
      </ol>

      <h2>Learn More</h2>
      <p>If you want to learn more about our framework or want to use it for your FRC robot, please use the provided link to check out our <a href="https://github.com/3648TJSpartans/Framework/tree/master">GitHub</a>. Thanks!</p>
    </ProjectPage>
  )
}

export default FRCJavaFramework
