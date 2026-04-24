import React from 'react'
import ProjectPage from './ProjectPage'

const FocilInReth: React.FC = () => {
  return (
    <ProjectPage title="EPF FOCIL in Reth - Final Report" subtitle="A technical report on implementing FOCIL (Fork Choice Enforced Inclusion List) in the Reth Ethereum client.">

      <h2>Table of Contents</h2>
      <ul>
        <li><a href="#intro">Introduction</a></li>
        <li><a href="#acknowledgments">Acknowledgments</a></li>
        <li><a href="#motivation">Motivation</a></li>
        <li><a href="#implementation">Implementation</a></li>
        <li><a href="#testing">Testing</a></li>
        <li><a href="#future">Future</a></li>
        <li><a href="#takeaways">Takeaways</a></li>
      </ul>

      <hr />

      <h2 id="intro">Introduction: Censorship is Scary</h2>
      <p>
        Censorship is a genuine threat in a decentralized system. While block builders gain greater influence, their decisions can undermine the credible neutrality of Ethereum. <strong>FOCIL (Fork Choice Enforced Inclusion List)</strong> is a vital feature designed to make Ethereum truly <strong>censorship-resistant</strong> by ensuring that block builders can no longer censor transactions. With this implementation, <strong>Reth</strong> joins the race to realize the future of resilient and permissionless.
      </p>

      <hr />

      <h2 id="acknowledgments">Acknowledgments</h2>
      <ul>
        <li><strong>Jihoon:</strong> For his invaluable help answering all my questions, assisting with debugging, and pushing me to speak up during the FOCIL breakout meetings.</li>
        <li><strong>Mario and Josh:</strong> For running the EPF cohort and organizing the trip to Devconnect.</li>
        <li><strong>Kayta:</strong> For collaborating with me on defining and implementing the FOCIL metrics.</li>
      </ul>

      <hr />

      <h2 id="motivation">Motivation</h2>
      <p>
        When I joined the <strong>Ethereum Protocol Fellowship (EPF)</strong>, I felt quite lost. I had the motivation and interest to contribute to Ethereum, but I was suffering from choice fatigue, frequently jumping from one cool, shiny idea to the next. I knew I needed a concrete project to work on, not another "good first issue."
      </p>
      <p>
        Coming in as a permissionless fellow, I had the "bottom of the barrel" in terms of cool pre-assigned projects, so I decided to define my own. This self-made project eventually settled on <strong>FOCIL for Reth</strong>, which, looking back, was the best decision I made all cohort. This EIP was the perfect difficulty for getting started: it involved adding a full feature to Reth with code touching different parts of the code base. It was also perfectly scoped, allowing me to spend half my time on testing, working with other client teams and their implementations, writing spec tests, and overall getting the full Ethereum core dev experience, not just some siloed project.
      </p>
      <p>
        Now, why FOCIL specifically? I got into Ethereum because of a heightened paranoia, cybersecurity, and privacy phase in high school. From the moment I understood how Ethereum worked, it was clear to me: a fast blockchain is good, but blockchains are <strong>utterly useless without permissionlessness, decentralization, and credible neutrality</strong>. In a world where everyone is hooked on the drug of blockchain performance, I wanted to work on something that, even though it doesn't increase transactions per second, could have a greater impact on ensuring Ethereum's place as the global settlement layer in a world that is ever more divided and littered with the waning powers of the old world.
      </p>

      <hr />

      <h2 id="implementation">Implementation</h2>

      <h3>Core Logic</h3>
      <p>
        When setting out on this new adventure, I knew that a former EF employee, <strong>Jacob Kaufmann</strong>, had already done some work. I assumed this would give me a good starting point. Unfortunately, my plan to save time by borrowing code turned into weeks of trying to interpret his code from a stale branch and port it over to my new fork. This proved to be a brutal waste of time, and looking back, I should have attempted to implement some basic features on my own first.
      </p>
      <p>
        As my work continued, here are the main changes Reth needed to become FOCIL-ready:
      </p>

      <h4>Inclusion List Building</h4>
      <p>
        The building of the Inclusion List is not heavily specified, and for good reason. This allows clients or users to decide how they want to build the list, adding diversity to the transactions included.
      </p>
      <p>
        For my Reth implementation, I went with a simple <strong>proof-of-concept</strong> so I could focus on the rest of the feature; the algorithm and research for these inclusion lists could be an entire project in its own right. The current implementation takes the best transactions from the top of the mempool (highest fees) and adds them to the 8 KB Inclusion List.
      </p>

      <h4>Inclusion List Validation</h4>
      <p>
        This validation occurs when the <strong>Consensus Layer (CL)</strong> calls <code>engine_newPayloadV5</code>. The client checks if all transactions in the <code>inclusionListTransactions</code> field that <em>could</em> be included are actually present in the payload passed to the <strong>Execution Layer (EL)</strong>. In layman's terms: if the block has extra space for the transaction, and the transaction is valid according to normal validity rules, then it must be included. If any transaction that could have been included is <strong>NOT</strong> included, the client returns <code>INCLUSION_LIST_UNSATISFIED</code>, which triggers a reorg on this block.
      </p>

      <h4>Block Building with Inclusion List</h4>
      <p>
        This logic is very similar to Inclusion List validation, but it applies to <strong>local block building</strong>. Here, we build a block like normal. At the end of the block, using <code>inclusionListTransactions</code> passed from <code>engine_forkchoiceUpdatedV4</code>, the client loops through the IL transactions and adds all valid, un-included transactions. This looping continues until the block is full or all transactions have been marked as invalid. The reason for the n-squared loop is that some transactions may become valid <em>after</em> other dependent transactions are included.
      </p>

      <h4>Primitives</h4>
      <p>
        I also implemented the required Inclusion List (IL) primitives and updated the necessary Engine API structs, specifically the new <code>engine_forkchoiceUpdatedV4</code> and <code>engine_newPayloadV5</code> structs, within Reth's <strong>Alloy</strong> library. These changes were essential for FOCIL functionality.
      </p>

      <h4>Implementation Notes</h4>
      <p>
        Due to FOCIL being <strong>CFI'd</strong> (Considered For Inclusion), it existed in a weird grey zone that resulted in the Reth team not paying too much attention to my work. This meant all my changes were kept in one fork rather than progressively merging PRs into the main branch.
      </p>

      <h3>Metrics</h3>
      <p>
        While not expected, <strong>Kayta</strong>, an EPF alum, reached out to me about helping to define and implement metrics for the execution layer of FOCIL. CL metrics had already been defined and implemented on some clients.
      </p>
      <p>
        Over a few weeks, Kayta, Jihoon, and I proposed and discussed several different metrics. After implementing them and weighing the cost and feasibility of certain metrics, we came to a consensus to cut most of them out, as they overlapped with data captured in the CL or were irrelevant.
      </p>
      <p>The final metrics for the EL were:</p>
      <ul>
        <li><code>execution_inclusion_list_block_validation_transactions_included_total</code></li>
        <li><code>execution_inclusion_list_block_validation_transactions_excluded_total</code></li>
        <li><code>execution_inclusion_list_block_validation_time_seconds</code></li>
        <li><code>execution_inclusion_list_block_building_transactions_included_total</code></li>
        <li><code>execution_inclusion_list_block_building_transactions_excluded_total</code></li>
      </ul>
      <p>
        Implementing these also required adding some necessary metrics features to Reth, such as <strong>Prometheus buckets</strong>, to accurately process the validation time metrics.
      </p>
      <p>
        Overall, I had no prior experience implementing metrics, but through trial and error, I was able to get the hang of it and produce useful metrics that helped discover small bugs and create greater visibility into my FOCIL implementation.
      </p>

      <h3>Challenges</h3>
      <p>
        Over the course of the implementation, surprisingly, it was the <strong>little things that were challenging</strong>. Not the bigger questions of how ILs should be passed through Reth, how to optimize validation, or how to add a brand-new Engine API. The blockers and long nights came from a few small snags that used up a lot of my time.
      </p>
      <p>
        These issues arose due to an <strong>unfamiliarity with the entire Reth codebase</strong> and minimal experience working on such a large <strong>Rust</strong> project. Reth's above-average composability also led many seemingly simple fixes to take longer than intended. I don't think this is a bad or good thing, but rather a design choice; sure, Geth is much easier to read and understand, but Reth is more modular and performant in certain cases. Yet, this design choice does lead to a steeper learning curve, even with the Rust compiler helping to catch mistakes.
      </p>
      <p>
        Despite the challenges I faced through this process, I don't think I could have chosen a better project to introduce me to implementing large features for Ethereum clients. The work I have done has positioned me perfectly to continue contributing to Ethereum.
      </p>

      <hr />

      <h2 id="testing">Testing</h2>
      <p>
        What I thought would be more of a finishing touch, <strong>testing</strong>, turned out to be nearly <strong>half my time</strong> spent on the project.
      </p>
      <p>
        After some basic unit tests inside Reth, I began spinning up my implementation on local devnets to see if the thing I had spent half my summer coding actually worked. Of course, the first time I spun it up, Reth crashed, but this would mark the second chapter of my project.
      </p>

      <h3>Local Devnets</h3>
      <p>
        While the documentation for Kurtosis and devnets is quite robust, finding the FOCIL-specific images, the current state of implementations, and other specifics made getting started a slog. After I had everything in place, I was able to analyze the clients running.
      </p>
      <p>
        When Reth first tried to take flight on a FOCIL devnet, there were a variety of issues I had not considered: I was missing the feature fork implementation, forgetting to turn on new Engine API methods, and other small bugs. Some were easier to track down than others, but the experience was humbling, to say the least.
      </p>
      <p>
        After stabilizing Reth, the next thing I noticed was a bug in most CL clients. While running Reth in a CL pair, the chain would progress nicely, although no ILs were being passed upon the advent of <code>engine_newPayloadV5</code>. From there, I tested my hypothesis on Lodestar and Lighthouse, opening PRs where needed. After a short discussion with client team members, we were able to fix the issue. This fix also unintentionally solved some <strong>missed block behavior</strong> between Reth and Geth that were not fully understood beforehand.
      </p>
      <p>
        Everyone's favorite part about implementing and testing EIPs is, of course, when the <strong>Spec changes</strong>. Luckily for me, it was just a few small things and moving the FOCIL <code>engine_updateWithInclusionListV1</code> logic into <code>engine_forkchoiceUpdatedV4</code>. This was the most frustrating portion of the project, as most client teams were busy with Fusaka and unable to update their FOCIL implementations. For instance, at the time of writing, only <strong>Lodestar, Reth, and Geth</strong> are rebased onto Fusaka.
      </p>
      <p>
        Once Lodestar caught up, I was able to resume testing, which helped iron out the changes in both clients. Unfortunately, Geth suffered from an unknown bug during the rebase, which limited my ability to test EL interop.
      </p>
      <p>
        Overall, Kurtosis Devnets were responsible for the vast majority of testing that resulted in uncovering hidden bugs and helping me better understand other client implementations and how the APIs are used in practice.
      </p>

      <h3>Spec Tests</h3>
      <p>
        While still important, the spec tests for the EL scope are quite limited, as FOCIL is a <strong>cross-layer change</strong> with a heavy emphasis on the CL. Nonetheless, EL spec tests are still extremely useful for quickly testing clients without all the overhead and wait of a local devnet.
      </p>
      <p><a href="https://github.com/ethereum/execution-specs/pull/1709">Link to spec tests</a></p>
      <p>
        My focus was on testing three main things regarding the Reth FOCIL Implementation: Inclusion List construction, Block Inclusion List validations, and Block Building Inclusion List validation. So far, I have only implemented tests for the <strong>Inclusion List Validation</strong> due to limitations of <strong>EELS</strong>, but I am actively working on the remaining tests.
      </p>
      <p>Block Inclusion List Validation Tests:</p>
      <div style={{ overflowX: 'auto' }}>
        <table>
          <thead>
            <tr>
              <th>Function Name</th>
              <th>Goal</th>
              <th>Setup</th>
              <th>Expectation</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={4}><strong>Block Inclusion List Validation</strong></td>
            </tr>
            <tr>
              <td><code>test_focil_block_validation_accepts_empty_inclusion_list</code></td>
              <td>Verify the EL correctly validates a payload with zero <code>inclusionListTransactions</code>.</td>
              <td>The EL receives a payload and zero <code>inclusionListTransactions</code>.</td>
              <td>The payload MUST be considered valid.</td>
            </tr>
            <tr>
              <td><code>test_focil_block_validation_accepts_full_inclusion_list</code></td>
              <td>Verify the EL validates a payload correctly including the maximum number of <code>inclusionListTransactions</code>.</td>
              <td>The EL receives a payload and <code>inclusionListTransactions</code> whose size equals MAX_BYTES_PER_INCLUSION_LIST × inclusion list committee size limit.</td>
              <td>The payload MUST include all transactions.</td>
            </tr>
            <tr>
              <td><code>test_focil_block_validation_ignores_invalid_transactions_in_inclusion_list</code></td>
              <td>Ensure the EL validates a block that correctly omits invalid transactions found in the <code>inclusionListTransactions</code>.</td>
              <td>The EL receives a payload and <code>inclusionListTransactions</code> which contains invalid transactions (intrinsically invalid, bad nonce, sender cannot afford the gas, bad encoding, eip-4844 transactions, etc.).</td>
              <td>These invalid transactions MUST <em>not</em> be included in the block body.</td>
            </tr>
            <tr>
              <td><code>test_focil_block_validation_returns_error_when_inclusion_list_tx_is_omitted</code></td>
              <td>Verify block validation returns <code>INCLUSION_LIST_UNSATISFIED</code> if it omits a transaction that is valid against the current state and referenced by corresponding <code>inclusionListTransactions</code> for that slot.</td>
              <td>The <code>inclusionListTransactions</code> references a transaction valid against the current state, but the block body omits it.</td>
              <td>The EL MUST return an <code>INCLUSION_LIST_UNSATISFIED</code> error.</td>
            </tr>
            <tr>
              <td><code>test_focil_block_validation_succeeds_with_interdependent_inclusion_list_transactions</code></td>
              <td>Verify that the EL correctly processes <code>inclusionListTransactions</code> that contain transactions where later ones depend on earlier ones.</td>
              <td>Inclusion list is [tx_A, tx_B]. tx_A funds a new account. tx_B is a transaction sent from that new account.</td>
              <td>Both transactions MUST be included.</td>
            </tr>
            <tr>
              <td><code>test_focil_block_validation_accepts_two_independent_inclusion_list_transactions</code></td>
              <td>Verify the EL validates a payload correctly including transactions from <code>inclusionListTransactions</code> with two transactions.</td>
              <td>The EL receives a payload and <code>inclusionListTransactions</code> containing two independent valid transactions.</td>
              <td>The payload MUST include both transactions; order is irrelevant.</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        The idea of these tests is to validate that a client correctly processes ILs and applies them to payloads from <code>engine_newPayloadV4</code>. These tests cover the basic functionality we expect the client to handle, as well as some slightly more complicated scenarios. So far, these tests have only been tested on and <strong>pass</strong> on the Reth implementation.
      </p>
      <p>
        Next steps for these tests are to figure out how to test the other parts of the implementation, if possible, and add more complicated validation situations, such as <strong>AA (Account Abstraction) transactions</strong>, where the tests are less obvious to come up with.
      </p>

      <hr />

      <h2 id="future">Future</h2>
      <p>
        With the majority of the Reth work complete, my main focus is on seeing that FOCIL makes it to a Mainnet hardfork. This involves adding more tests, helping other client teams get up to speed, and keeping my Reth implementation up to date so that it can be shipped when needed.
      </p>
      <p>
        Currently, FOCIL is still CFI'd, but it seems increasingly likely that <strong>All Core Developers (ACD)</strong> will vote to push FOCIL to <strong>H* (the next hardfork)</strong>. While this is unfortunate, as it pushes back seeing my FOCIL changes merged by another eight months, it also gives developers more time, especially on the CL side, to determine how we want to implement FOCIL on top of <strong>EPBS (Enshrined-Proposer-Builder-Separation)</strong>, which will require some minor spec changes regarding the timing of IL committees and propagation.
      </p>

      <hr />

      <h2 id="takeaways">Takeaways</h2>
      <p>
        I am eternally grateful for the opportunity to participate in the Ethereum Protocol Fellowship. Over the last four months, I have been able to drive far more impact in Ethereum than I ever thought through my first full project focused on the Ethereum protocol. Coming in, I thought it would be like any other intern-like project I had worked on in the past. I thought it would mostly be a coding project and I would just ship my Reth implementation at the end. But by the time of finishing the EPF, I had not only developed a fully working FOCIL EL implementation, but I was also active in FOCIL discussions, helping out broadly with testing, metrics, devnets, and assisting others in testing their implementations. There is still a lot to learn, but I finally feel confident that I can figure out a lot of these problems required for protocol development on my own.
      </p>
      <p>
        The biggest wake-up call during this project was testing my autonomy. I had become accustomed to being able to ask experts questions anytime I got stuck, which makes sense when working for a for-profit company, as your output is often the number one objective. During my time as an EPF Fellow, it was quite the opposite: I had to figure almost everything out on my own, even when it took a few days to move past simple blockers. While my output and velocity were most certainly harmed, I am grateful for the depth of knowledge I now possess in my subject matter. I think a more thoughtful balance of these extremes will be more beneficial to my future growth in the industry. This should also be easier to obtain now that I have some credibility in the industry.
      </p>
      <p>
        My only regret coming out of the EPF is that I had more time to contribute. More concretely, I wish I had focused more on my weekly reports, as writing and getting your ideas across concisely is especially crucial in open-source development where teams are truly global and across several different groups. With that said, I will make an effort to write up more of my work in the future, whether that be blog posts, X posts, or in Discord discussions.
      </p>
      <p>
        Overall, my time in the EPF has humbled me and sharpened the tools at my disposal to create the Ethereum of tomorrow. I plan to continue my current work and find new projects that challenge me in the space.
      </p>

      <hr />

      <h2>Links</h2>
      <table>
        <tbody>
          <tr>
            <td><strong>Reth Implementation (FOCIL Branch)</strong></td>
            <td><a href="https://github.com/PelleKrab/reth/tree/focil_impl">github.com/PelleKrab/reth/tree/focil_impl</a></td>
          </tr>
          <tr>
            <td><strong>EELS Spec Tests PR</strong></td>
            <td><a href="https://github.com/ethereum/execution-specs/pulls/PelleKrab">github.com/ethereum/execution-specs/pulls/PelleKrab</a></td>
          </tr>
          <tr>
            <td><strong>FOCIL Implementer Wiki</strong></td>
            <td><a href="https://github.com/jihoonsong/focil-for-implementors/wiki/FOCIL-for-Implementors">github.com/jihoonsong/focil-for-implementors</a></td>
          </tr>
          <tr>
            <td><strong>Weekly Reports</strong></td>
            <td><a href="https://github.com/eth-protocol-fellows/cohort-six/blob/master/development-updates.md">github.com/eth-protocol-fellows/cohort-six</a></td>
          </tr>
        </tbody>
      </table>

    </ProjectPage>
  )
}

export default FocilInReth
