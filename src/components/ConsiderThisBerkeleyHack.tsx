import ProjectPage from './ProjectPage'

const ConsiderThisBerkeleyHack: React.FC = () => {
  return (
    <ProjectPage title="Consider This" subtitle="Quick trip to the Bay.">
      <img
        src="https://camo.githubusercontent.com/ac60cdfb0c006f8f7fc6b85b0faec2d3ade22d7ba2ddf3ebbe0e5912ce9f2522/68747470733a2f2f643131327936393861646975327a2e636c6f756466726f6e742e6e65742f70686f746f732f70726f64756374696f6e2f736f6674776172655f70686f746f732f3030322f3933322f3935302f64617461732f6f726967696e616c2e706e67"
        alt="Consider This"
      />
      <h2>Project Overview</h2>
      <p>
        The goal of this hackathon was to use AI for educational technology and positive societal impact. Hosted at the world's largest AI hackathon at UC Berkeley and sponsored by Cal Hacks, Berkeley SkyDeck, OpenAI, and Hume AI, our team of four—Juan Lucas Umali, Suyash Nagumalli, and myself—created "Consider This," an ed-tech platform designed to foster healthy, empathetic discussions with AI agents. Our platform emulates a Socratic Seminar environment for K-12 students, offering a tool where even quiet and shy students can engage in rich, human-like dialogue with AI, helping them think critically and escape echo chambers. This was my first time working with this team, and our diverse backgrounds and ideas culminated in a truly unique project.
      </p>

      <h2>Project Objectives</h2>
      <ul>
        <li>Leverage AI to enhance educational experiences.</li>
        <li>Create a multi-agent AI platform to foster critical thinking.</li>
        <li>Develop a tool that encourages positive societal impact through education.</li>
        <li>Provide an inclusive environment where all students can participate.</li>
      </ul>

      <h2>Key Features</h2>
      <h3>Multi-Agent Experience</h3>
      <p>
        We leveraged two distinct Empathetic Virtual Intelligences (EVIs) to create a multi-agent experience where AI agents were designed with unique conversational styles, inflections, personalities, and backgrounds. This diversity allowed for rich, nuanced discussions.
      </p>

      <h3>Socratic Seminar Environment</h3>
      <p>
        Our platform was designed to replicate the Socratic Seminar format, encouraging critical thinking and empathetic engagement. Even students who might not typically speak up in class could use our tool to explore divergent perspectives.
      </p>

      <h3>AI-Driven Dialogue</h3>
      <p>
        Powered by Hume AI and OpenAI, the platform enabled AI agents to engage in meaningful, empathetic conversations with students, offering insights and promoting deeper understanding of various topics.
      </p>

      <h3>Customizable Agent Profiles</h3>
      <p>
        Educators could tailor the AI agents to better fit the needs of their students, adjusting factors like personality and conversational style to match classroom dynamics.
      </p>

      <h2>What I Learned</h2>
      <ol>
        <li>The importance of empathy in AI-driven education.</li>
        <li>How to create a multi-agent AI system that engages users in a meaningful way.</li>
        <li>The challenges and rewards of rapid, cross-disciplinary collaboration.</li>
        <li>How AI can be leveraged to create inclusive learning environments that promote critical thinking.</li>
      </ol>

      <h2>Learn More</h2>
      <p>To see our code, check out our teams <a href="https://github.com/twolucasumali/consider-this">Repo</a>. Thank you for reading!</p>
    </ProjectPage>
  )
}

export default ConsiderThisBerkeleyHack
