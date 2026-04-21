import ProjectPage from './ProjectPage'

const ECOBitesBSWHackathon: React.FC = () => {
  return (
    <ProjectPage title="ECO Bites" subtitle="First Hackathon, React Project, AI Project, and Hackathon Win">
      <h2>Project Overview</h2>
      <p>
        The goal of this hackathon was to create something that would positively impact our local community. Sponsored by Zed Industries, Webflow, Freeplay.ai, and TechnicalIntegrity.com, our team of three—Grayson, Uma, and myself—built a website to rate restaurants on their sustainability using AI. Our platform also featured a custom chatbot and dashboard to help restaurants set goals and improve their sustainability practices. Additionally, we created a frontend interface for users to view the sustainability scores of local restaurants. This was my first-ever hackathon, and I had no idea what to expect. I had to learn a lot of new skills in a very short time, and I'm certain this won't be my last hackathon experience.
      </p>

      <h2>Project Objectives</h2>
      <ul>
        <li>Leverage AI to rate sustainability practices.</li>
        <li>Learn React and TypeScript.</li>
        <li>Create something that benefits our community.</li>
        <li>Win the hackathon.</li>
      </ul>

      <h2>Key Features</h2>
      <h3>AI Rubric</h3>
      <p>
        After researching restaurant practices and their environmental impact, we distilled the information into a format that allows our AI model to evaluate overall sustainability. This provided a solid foundation for the AI to generate accurate ratings.
      </p>

      <h3>AI Chatbot</h3>
      <p>
        Powered by Claude 3, our chatbot had access to each restaurant's data and could suggest more sustainable options, helping them improve their rating and track progress over time.
      </p>

      <h3>User Frontend</h3>
      <p>
        The user interface allowed signed-in users to access a list of restaurants in their area, complete with a leaderboard showcasing the most sustainable eateries.
      </p>

      <h3>Restaurant Participation</h3>
      <p>
        We interviewed several local restaurants to gather test data for the website and received positive feedback from many of them, with interest in continuing the project.
      </p>

      <h2>What I Learned</h2>
      <ol>
        <li>AI fundamentals and their application in real-world scenarios.</li>
        <li>How to build and deploy a full-stack application using React and TypeScript.</li>
        <li>Hands-on experience with AI-driven sustainability evaluation and chatbot development.</li>
        <li>How to engage with and gather feedback from local businesses to refine project features.</li>
      </ol>

      <h2>Learn More</h2>
      <p>To see our code, check out our <a href="https://github.com/PelleKrab/my_first_blockchain">Repo</a>. Thank you for reading!</p>
    </ProjectPage>
  )
}

export default ECOBitesBSWHackathon
