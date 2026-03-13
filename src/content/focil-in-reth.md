# 📝 EPF FOCIL in Reth - Final Report

## Table of Contents
* [Introduction](#intro)
* [Acknowledgments](#acknowledgments)
* [Motivation](#motivation)
* [Implementation](#implementation)
* [Testing](#testing)
* [Future](#future)
* [Takeaways](#takeaways)

---

<a id="intro"></a>
## 🛡️ Introduction: Censorship is Scary

Censorship is a genuine threat in a decentralized system. While block builders gain greater influence, their decisions can undermine the credible neutrality of Ethereum. **FOCIL (Fork Choice Enforced Inclusion List)** is a vital feature designed to make Ethereum truly **censorship-resistant** by ensuring that block builders can no longer censor transactions. With this implementation, **Reth** joins the race to realize the future of resilient and permissionless.

---

<a id="acknowledgments"></a>
## 🙏 Acknowledgments

* **Jihoon:** For his invaluable help answering all my questions, assisting with debugging, and pushing me to speak up during the FOCIL breakout meetings.
* **Mario and Josh:** For running the EPF cohort and organizing the trip to Devconnect.
* **Kayta:** For collaborating with me on defining and implementing the FOCIL metrics.
 
---

<a id="motivation"></a>
## 💡 Motivation

When I joined the **Ethereum Protocol Fellowship (EPF)**, I felt quite lost. I had the motivation and interest to contribute to Ethereum, but I was suffering from choice fatigue, frequently jumping from one cool, shiny idea to the next. I knew I needed a concrete project to work on, not another "good first issue."

Coming in as a permissionless fellow, I had the "bottom of the barrel" in terms of cool pre-assigned projects, so I decided to define my own. This self-made project eventually settled on **FOCIL for Reth**, which, looking back, was the best decision I made all cohort. This EIP was the perfect difficulty for getting started: it involved adding a full feature to Reth with code touching different parts of the code base. It was also perfectly scoped, allowing me to spend half my time on testing, working with other client teams and their implementations, writing spec tests, and overall getting the full Ethereum core dev experience, not just some siloed project.

Now, why FOCIL specifically? I got into Ethereum because of a heightened paranoia, cybersecurity, and privacy phase in high school. From the moment I understood how Ethereum worked, it was clear to me: a fast blockchain is good, but blockchains are **utterly useless without permissionlessness, decentralization, and credible neutrality**. In a world where everyone is hooked on the drug of blockchain performance, I wanted to work on something that, even though it doesn't increase transactions per second, could have a greater impact on ensuring Ethereum's place as the global settlement layer in a world that is ever more divided and littered with the waning powers of the old world.

***

<a id="implementation"></a>
## 🛠️ Implementation

### Core Logic

When setting out on this new adventure, I knew that a former EF employee, **Jacob Kaufmann**, had already done some work. I assumed this would give me a good starting point. Unfortunately, my plan to save time by borrowing code turned into weeks of trying to interpret his code from a stale branch and port it over to my new fork. This proved to be a brutal waste of time, and looking back, I should have attempted to implement some basic features on my own first.

As my work continued, here are the main changes Reth needed to become FOCIL-ready:

#### Inclusion List Building
The building of the Inclusion List is not heavily specified, and for good reason. This allows clients or users to decide how they want to build the list, adding diversity to the transactions included.

For my Reth implementation, I went with a simple **proof-of-concept** so I could focus on the rest of the feature; the algorithm and research for these inclusion lists could be an entire project in its own right. The current implementation takes the best transactions from the top of the mempool (highest fees) and adds them to the 8 KB Inclusion List.

#### Inclusion List Validation
This validation occurs when the **Consensus Layer (CL)** calls `engine_newPayloadV5`. The client checks if all transactions in the `inclusionListTransactions` field that *could* be included are actually present in the payload passed to the **Execution Layer (EL)**. In layman's terms: if the block has extra space for the transaction, and the transaction is valid according to normal validity rules, then it must be included. If any transaction that could have been included is **NOT** included, the client returns `INCLUSION_LIST_UNSATISFIED`, which triggers a reorg on this block.

#### Block Building with Inclusion List
This logic is very similar to Inclusion List validation, but it applies to **local block building**. Here, we build a block like normal. At the end of the block, using `inclusionListTransactions` passed from `engine_forkchoiceUpdatedV4`, the client loops through the IL transactions and adds all valid, un-included transactions. This looping continues until the block is full or all transactions have been marked as invalid. The reason for the n-squared loop is that some transactions may become valid *after* other dependent transactions are included.

#### Primitives
I also implemented the required Inclusion List (IL) primitives and updated the necessary Engine API structs, specifically the new `engine_forkchoiceUpdatedV4` and `engine_newPayloadV5` structs, within Reth's **Alloy** library. These changes were essential for FOCIL functionality.

#### Implementation Notes
Due to FOCIL being **CFI'd** (Considered For Inclusion), it existed in a weird grey zone that resulted in the Reth team not paying too much attention to my work. This meant all my changes were kept in one fork rather than progressively merging PRs into the main branch.

### Metrics

While not expected, **Kayta**, an EPF alum, reached out to me about helping to define and implement metrics for the execution layer of FOCIL. CL metrics had already been defined and implemented on some clients.

Over a few weeks, Kayta, Jihoon, and I proposed and discussed several different metrics. After implementing them and weighing the cost and feasibility of certain metrics, we came to a consensus to cut most of them out, as they overlapped with data captured in the CL or were irrelevant.

The final metrics for the EL were:

* `execution_inclusion_list_block_validation_transactions_included_total`
* `execution_inclusion_list_block_validation_transactions_excluded_total`
* `execution_inclusion_list_block_validation_time_seconds`
* `execution_inclusion_list_block_building_transactions_included_total`
* `execution_inclusion_list_block_building_transactions_excluded_total`

Implementing these also required adding some necessary metrics features to Reth, such as **Prometheus buckets**, to accurately process the validation time metrics.

Overall, I had no prior experience implementing metrics, but through trial and error, I was able to get the hang of it and produce useful metrics that helped discover small bugs and create greater visibility into my FOCIL implementation.

### Challenges

Over the course of the implementation, surprisingly, it was the **little things that were challenging**. Not the bigger questions of how ILs should be passed through Reth, how to optimize validation, or how to add a brand-new Engine API. The blockers and long nights came from a few small snags that used up a lot of my time.

These issues arose not due to an **unfamiliarity with the entire Reth codebase** and minimal experience working on such a large **Rust** project. Reth's above-average composability also led many seemingly simple fixes to take longer than intended. I don't think this is a bad or good thing, but rather a design choice; sure, Geth is much easier to read and understand, but Reth is more modular and performant in certain cases. Yet, this design choice does lead to a steeper learning curve, even with the Rust compiler helping to catch mistakes.

Despite the challenges I faced through this process, I don't think I could have chosen a better project to introduce me to implementing large features for Ethereum clients. The work I have done has positioned me perfectly to continue contributing to Ethereum.

***

<a id="testing"></a>
## 🧪 Testing

What I thought would be more of a finishing touch, **testing**, turned out to be nearly **half my time** spent on the project.

After some basic unit tests inside Reth, I began spinning up my implementation on local devnets to see if the thing I had spent half my summer coding actually worked. Of course, the first time I spun it up, Reth crashed, but this would mark the second chapter of my project.

### Local Devnets
While the documentation for Kurtosis and devnets is quite robust, finding the FOCIL-specific images, the current state of implementations, and other specifics made getting started a slog. After I had everything in place, I was able to analyze the clients running.

When Reth first tried to take flight on a FOCIL devnet, there were a variety of issues I had not considered: I was missing the feature fork implementation, forgetting to turn on new Engine API methods, and other small bugs. Some were easier to track down than others, but the experience was humbling, to say the least.

After stabilizing Reth, the next thing I noticed was a bug in most CL clients. While running Reth in a CL pair, the chain would progress nicely, although no ILs were being passed upon the advent of `engine_newPayloadV5`. From there, I tested my hypothesis on Lodestar and Lighthouse, opening PRs where needed. After a short discussion with client team members, we were able to fix the issue. This fix also unintentionally solved some **missed block behavior** between Reth and Geth that were not fully understood beforehand.

Everyone's favorite part about implementing and testing EIPs is, of course, when the **Spec changes**. Luckily for me, it was just a few small things and moving the FOCIL `engine_updateWithInclusionListV1` logic into `engine_forkchoiceUpdatedV4`. This was the most frustrating portion of the project, as most client teams were busy with Fusaka and unable to update their FOCIL implementations. For instance, at the time of writing, only **Lodestar, Reth, and Geth** are rebased onto Fusaka.

Once Lodestar caught up, I was able to resume testing, which helped iron out the changes in both clients. Unfortunately, Geth suffered from an unknown bug during the rebase, which limited my ability to test EL interop.

Overall, Kurtosis Devnets were responsible for the vast majority of testing that resulted in uncovering hidden bugs and helping me better understand other client implementations and how the APIs are used in practice.

### Spec Tests

While still important, the spec tests for the EL scope are quite limited, as FOCIL is a **cross-layer change** with a heavy emphasis on the CL. Nonetheless, EL spec tests are still extremely useful for quickly testing clients without all the overhead and wait of a local devnet.

[Link to spec tests](https://github.com/ethereum/execution-specs/pull/1709)

My focus was on testing three main things regarding the Reth FOCIL Implementation: Inclusion List construction, Block Inclusion List validations, and Block Building Inclusion List validation. So far, I have only implemented tests for the **Inclusion List Validation** due to limitations of **EELS**, but I am actively working on the remaining tests.

Block Inclusion List Validation Tests:

| Function Name | Goal | Setup | Expectation |
|---|---|---|---|
| **Block Inclusion List Validation** | | | |
| `test_focil_block_validation_accepts_empty_inclusion_list` | Verify the EL correctly validates a payload with zero `inclusionListTransactions`. | The EL receives a payload and zero `inclusionListTransactions`. | The payload MUST be considered valid. |
| `test_focil_block_validation_accepts_full_inclusion_list` | Verify the EL validates a payload correctly including the maximum number of `inclusionListTransactions`. | The EL receives a payload and `inclusionListTransactions` whose size equals $MAX\_BYTES\_PER\_INCLUSION\_LIST$ * inclusion list committee size limit. | The payload MUST include all transactions. |
| `test_focil_block_validation_ignores_invalid_transactions_in_inclusion_list` | Ensure the EL validates a block that correctly omits invalid transactions found in the `inclusionListTransactions`. | The EL receives a payload and `inclusionListTransactions` which contains invalid transactions (intrinsically invalid, bad nonce, sender cannot afford the gas, bad encoding, eip-4844 transactions, etc.). | These invalid transactions MUST *not* be included in the block body. |
| `test_focil_block_validation_returns_error_when_inclusion_list_tx_is_omitted` | Verify block validation returns `INCLUSION_LIST_UNSATISFIED` if it omits a transaction that is valid against the current state and referenced by corresponding `inclusionListTransactions` for that slot. | The `inclusionListTransactions` references a transaction valid against the current state, but the block body omits it. | The EL MUST return an `INCLUSION_LIST_UNSATISFIED` error. | 
| `test_focil_block_validation_succeeds_with_interdependent_inclusion_list_transactions` | Verify that the EL correctly processes `inclusionListTransactions` that contain transactions where later ones depend on earlier ones. | Inclusion list is $[tx\_A, tx\_B]$. $tx\_A$ funds a new account. $tx\_B$ is a transaction sent from that new account. | Both transactions MUST be included. |
| `test_focil_block_validation_accepts_two_independent_inclusion_list_transactions` | Verify the EL validates a payload correctly including transactions from `inclusionListTransactions` with two transactions. | The EL receives a payload and `inclusionListTransactions` containing two independent valid transactions. | The payload MUST include both transactions; order is irrelevant. |

The idea of these tests is to validate that a client correctly processes ILs and applies them to payloads from `engine_newPayloadV4`. These tests cover the basic functionality we expect the client to handle, as well as some slightly more complicated scenarios. So far, these tests have only been tested on and **pass** on the Reth implementation.

Next steps for these tests are to figure out how to test the other parts of the implementation, if possible, and add more complicated validation situations, such as **AA (Account Abstraction) transactions**, where the tests are less obvious to come up with.

---

<a id="future"></a>
## 🚀 Future

With the majority of the Reth work complete, my main focus is on seeing that FOCIL makes it to a Mainnet hardfork. This involves adding more tests, helping other client teams get up to speed, and keeping my Reth implementation up to date so that it can be shipped when needed.

Currently, FOCIL is still CFI'd, but it seems increasingly likely that **All Core Developers (ACD)** will vote to push FOCIL to **H\* (the next hardfork)**. While this is unfortunate, as it pushes back seeing my FOCIL changes merged by another eight months, it also gives developers more time, especially on the CL side, to determine how we want to implement FOCIL on top of **EPBS (Enshrined-Proposer-Builder-Seperation)**, which will require some minor spec changes regarding the timing of IL committees and propagation.

---

<a id="takeaways"></a>
## ✅ Takeaways

I am eternally grateful for the opportunity to participate in the Ethereum Protocol Fellowship. Over the last four months, I have been able to drive far more impact in Ethereum than I ever thought through my first full project focused on the Ethereum protocol. Coming in, I thought it would be like any other intern-like project I had worked on in the past. I thought it would mostly be a coding project and I would just ship my Reth implementation at the end. But by the time of finishing the EPF, I had not only developed a fully working FOCIL EL implementation, but I was also active in FOCIL discussions, helping out broadly with testing, metrics, devnets, and assisting others in testing their implementations. There is still a lot to learn, but I finally feel confident that I can figure out a lot of these problems required for protocol development on my own.

The biggest wake-up call during this project was testing my autonomy. I had become accustomed to being able to ask experts questions anytime I got stuck, which makes sense when working for a for-profit company, as your output is often the number one objective. During my time as an EPF Fellow, it was quite the opposite: I had to figure almost everything out on my own, even when it took a few days to move past simple blockers. While my output and velocity were most certainly harmed, I am grateful for the depth of knowledge I now possess in my subject matter. I think a more thoughtful balance of these extremes will be more beneficial to my future growth in the industry. This should also be easier to obtain now that I have some credibility in the industry.

My only regret coming out of the EPF is that I had more time to contribute. More concretely, I wish I had focused more on my weekly reports, as writing and getting your ideas across concisely is especially crucial in open-source development where teams are truly global and across several different groups. With that said, I will make an effort to write up more of my work in the future, whether that be blog posts, X posts, or in Discord discussions.

Overall, my time in the EPF has humbled me and sharpened the tools at my disposal to create the Ethereum of tomorrow. I plan to continue my current work and find new projects that challenge me in the space.

---

## 🔗 Important Links

| Description | Link |
| :--- | :--- |
| **Reth Implementation (FOCIL Branch)** | https://github.com/PelleKrab/reth/tree/focil_impl |
| **EELS Spec Tests PR** | https://github.com/ethereum/execution-specs/pulls/PelleKrab |
| **FOCIL Implementer Wiki** | https://github.com/jihoonsong/focil-for-implementors/wiki/FOCIL-for-Implementors |
| **Weekly Reports** | https://github.com/eth-protocol-fellows/cohort-six/blob/master/development-updates.md |
