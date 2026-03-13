import React from 'react'
import ProjectPage from './ProjectPage'
import chart from '../assets/images/proposer_data.png'

const CommitBoostCharon: React.FC = () => {
  return (
    <ProjectPage title="Commit-Boost × Charon Report" subtitle="A technical exploration into the compatibility and performance of Commit-Boost and Charon.">
      <h2>Introduction</h2>
      <p>
        Commit-Boost and Obol are both promising new technologies helping to improve Ethereum's decentralization and transparency. The aim of this project was to do some basic prototyping to see if the two systems were compatible. This was something the team at DV Labs had been interested in, but it wasn't a priority, so it was unknown.
      </p>
      <p>
        The scope of this project was to test out the compatibility between Charon, Obol's middleware that allows for distributed validators, and Commit-Boost's PBS (Proposer Builder Separation) module. Commit-Boost's niche is that it allows only one sidecar to be needed by a beacon node, enabling it to connect to relays, handle precommitments, and potentially other exciting new developments in the future.
      </p>

      <h2>Issues / Learning</h2>
      <h3>Holesky / Getting Started</h3>
      <p>
        What initially seemed like a relatively easy setup and data collection project turned into a grueling DevOps nightmare riddled with failing networks, waiting on software updates, and relentless troubleshooting.
      </p>
      <p>
        The first step was deploying 125 validators on Holesky. The challenge was that Obol's DV was designed with the assumption that each DV squad member would be running on separate machines and likely on separate networks. Luckily, there was a testing repo for running four DVs on one machine. After brushing up on Docker and a couple dozen configuration changes, I finally had a fully synced beacon node and four validator clients.
      </p>
      <p>
        Within 12 hours of setting up my testing environment, Holesky went down due to the Pectra upgrade. At first, I wasn't even sure what had happened: my clients were crashing due to memory issues, my disk filled up, my other disk corrupted, and even with 100 peers, my beacon node was barely syncing. After checking Twitter, I started piecing things together. I followed the steps laid out in EthPandaOps' tweet, but to no avail.
      </p>
      <p>
        The beacon node was crashing because the Lighthouse client's caching system has 32 GB of memory allocated to it. After a quick trip to Best Buy, my little home server was able to stop crashing and attempt to sync using the new PandaOps checkpoint.
      </p>
      <p>
        The next jump scare was an error from Nethermind saying I was out of storage. My server had two 1TB SSDs. Before Pectra, the total state was about 400GB, but afterward, it filled one drive and corrupted the other. By this point, it had been a week since Holesky failed to reach finality, and I had already been slashed to 21 ETH, so I decided to wait until the core devs could fix it.
      </p>
      <p>
        I had previously been walked through setting up and running a node in the cloud, but this experience was quite scary. Running halfway-decent hardware, I saw my memory requirements double and storage requirements triple. While I recognize that this likely wouldn't happen on mainnet, a smaller failure or attack could possibly knock most solo stakers offline, while large providers would likely remain online or recover much faster.
      </p>
      <p>
        It seems clear that these scenarios should be taken into account more seriously when considering hardware requirements for Ethereum nodes, and perhaps failsafes should be built in to prevent lower-end systems from crashing and burning.
      </p>
      <p>
        Upon Hoodi's release, node setup resumed quickly, though validator deposits were delayed by a long queue.
        A separate issue burned ~320 ETH through duplicate launchpad deposits, prompting maintainers to issue a fix.
      </p>

      <h3>Hoodi</h3>
      <p>
        Once Hoodi was released, I breathed a sigh of relief and was able to spin up my node quickly. There was about a week-long delay in staking infrastructure, so I manually made some validator deposits. Due to the long validator queue, I decided to only send a few, as there was no guarantee they would make it to the beacon chain. So I waited.
      </p>
      <p>
        Once the launchpad was up, I encountered another issue: the launchpad didn't check whether I had already made a deposit for a given set of credentials (unlike Obol's launchpad, which was still down). In the process of figuring this out, I accidentally burned about 320 ETH by submitting duplicate deposits. The maintainers were made aware of this issue, so hopefully, it will be fixed in the future.
      </p>

      <h3>Testing</h3>
      <p>
        Once a few deposits made it onto the beacon chain, with a little Docker magic, I had Commit-Boost running and validators registering with the Titan relay.
      </p>
      <p>
        This dream of working software was quickly interrupted by an error:
      </p>
      <pre style={{ background: '#f3f3f3', padding: '12px', borderRadius: '4px', fontSize: '13px', overflowX: 'auto', whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
        INFO : no header available for slot method=/eth/v1/builder/header/&#123;slot&#125;/&#123;parent_hash&#125;/&#123;pubkey&#125; req_id=d4726f41-262b-456d-9984-a58f305ca955 slot=197993 parent_hash=0xab1a08c7317c1bad07eb8e3693f05143e711c014f2c7dd08596fea92dfbfe584 validator=0xb73a581cf9a6876c1828c72e49ff9f9ce1318e780109e458f6ddfd68e5fc01bbbef95f97984cba1fecc2b6ae47bb3a0b
      </pre>
      <p>
        I continued to receive this error for three blocks. After upgrading Commit-Boost and adding some other relays, I was able to start getting some blocks from the relays. However, after digging deeper, it appeared that the issue was simply a lack of block bids on Hoodi, unlikely an error with Commit-Boost itself.
      </p>

      <h2>Results</h2>
      <p>
        After setting up the 125 nodes and making Commit-Boost more resilient, I let the node run for about 15 days: 10 days with Commit-Boost and 5 days with MEV-Boost as a control. After vibe-coding some parsers and making sure they worked, I compiled the data into statistical analysis.
      </p>
      
      <img src={chart} alt="Commit-Boost vs MEV-Boost proposer slot statistics" style={{ width: '100%', maxWidth: '100%' }} />
      <p style={{ fontSize: '13px', color: '#888', textAlign: 'center', marginTop: '-8px' }}>Figure 1: Commit-Boost vs MEV-Boost proposer slot statistics</p>

      <p>
        Although the data set is relatively small, it still provides some insights into Commit-Boost × Charon performance. In total, I produced 12 blocks and recorded 10 of them (due to a logging error). Once the locally built blocks, proposed when the relay failed to return a header, are removed, the local response times are roughly the same between Commit-Boost and MEV-Boost, suggesting there's likely no meaningful difference in overhead between them.
      </p>
      <p>
        The most concerning part of the data is the success rate of getting a payload from the relay. As shown, 100% of MEV-Boost slots included a payload from a builder, whereas Commit-Boost failed to get a payload over 50% of the time. This is likely not caused by Commit Boost itself, as the relay did respond, just without a header. After speaking to the Titan relay team, this appears to be due to the lack of builders on Hoodi.
      </p>
      <p>
        After further testing, as shown in the Google Sheet, it appears that Commit Boost works just as well as MEV-Boost. However, the dataset is still too small to conclude that their performance is exactly the same or that one is better. Commit Boost can, without a doubt, be used for Obol's Charon clients.
      </p>

      <h2>Conclusion</h2>
      <p>
        Although I'm disappointed in the limited amount of data I was able to collect, some delays being within my control, others due to external factors, I am still proud of what I accomplished, and more importantly, the knowledge and skills I gained from this project. I had hoped to get far enough to make some PRs to Charon or start looking into precommitments and their integration into Charon. Even so, I don't regret choosing this project over something more hands-on.
      </p>
      <p>
        While I had previously run a validator on testnet, running something of this scale on my own hardware was something I had always said I would eventually do, but likely would have never gotten around to actually executing. Because of this project, I was forced to dive deep into these systems and understand the fundamentals at a much greater depth: how the API calls work, how MEV works, what a validator looks like struggling to sync on a chain without finality, and so much more.
      </p>
      <p>
        The experience also shed light on UX problems and the difficulty of home staking, even for someone who grew up working on computers. That said, it poured gasoline on the fire that is my ambition to run my own validator on mainnet, and prepared me with the skills to actually do so.
      </p>
      <p>
        With all that said, I'm happy I was able to prove that Commit Boost does, in fact, work with Charon, and hopefully, this will lead to further integration of preconfirmation into Charon in the future.
      </p>

      <h2>More Information</h2>
      <ul>
        <li><strong>OS:</strong> Ubuntu 24.04.2 LTS x86_64</li>
        <li><strong>CPU:</strong> AMD Ryzen 7 2700X (16 threads) @ 3.70GHz</li>
        <li><strong>Memory:</strong> 32,042 MiB</li>
        <li><strong>Storage:</strong> Samsung SSD 860 1TB</li>
        <li><strong>Scripts & Setup:</strong> <a href="https://github.com/PelleKrab/CSCI-4240-Final-Project">GitHub Repository</a></li>
      </ul>

      <h2>Sources</h2>
      <ul>
        <li><a href="https://github.com/ObolNetwork/charon">Charon</a> - Obol Network</li>
        <li><a href="https://github.com/Commit-Boost/commit-boost-client">Commit-Boost</a> - DV Labs</li>
        <li><a href="https://github.com/flashbots/mev-boost">Mev-Boost</a> - Flashbots</li>
        <li><a href="https://launchpad.ethereum.org/en/">Ethereum Staking Launchpad</a></li>
        <li><a href="https://obol.org/">Obol Network</a></li>
      </ul>
    </ProjectPage>
  )
}

export default CommitBoostCharon
