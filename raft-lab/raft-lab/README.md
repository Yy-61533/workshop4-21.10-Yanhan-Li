Raft Consensus Algorithm Lab
Project Description
This project is a Node.js implementation of the Raft Consensus Algorithm simulator. Raft is a consensus algorithm for managing a replicated log, designed to be easier to understand than Paxos while providing comparable performance and safety.

This simulator models node interactions in a distributed environment — including leader election, heartbeats, log replication, failure recovery, and network partitions — to demonstrate the core mechanisms of the Raft protocol.

The project covers all workshop parts (Part 1 - Part 10), including enhanced operational hardening features for production-ready Raft deployments.

Project Structure
raft-lab/
|-- simulator.js          # Simulator class - orchestrates the cluster simulation
|-- node.js               # Node class - implements Raft node state machine
|-- cluster.js            # Cluster class - manages node collections and quorum logic
|-- network.js            # Network class - simulates message passing and partitions
|-- logEntry.js           # LogEntry class - represents log entries (term + command)
|-- term.js               # Term class - manages term numbering
|-- package.json          # Project configuration and npm scripts
|-- package-lock.json     # Dependency lock file
|-- README.md             # Project documentation (this file)
|-- scenarios/            # Test scenario scripts
|   |-- leader_election.js      # Part 1: Establishing Authority (Leader Election)
|   |-- heartbeats.js           # Part 2: Maintaining Leadership (Heartbeats)
|   |-- leader_failure.js       # Part 3: Leader Failure and Re-Election
|   |-- log_replication.js      # Part 4: Replicating History (Log Replication)
|   |-- follower_failure.js     # Part 5: Continuing Despite Failure
|   |-- majority_lost.js        # Part 6: When Progress Stops (Majority Lost)
|   |-- network_partition.js    # Part 7: Surviving a Network Partition
|   |-- log_recovery.js         # Part 8: Repairing History (Log Recovery)
|   |-- hardening.js            # Part 9 & 10: Hardening & Enhancement
Prerequisites
Node.js version 18 or higher (download from https://nodejs.org/)
npm (comes bundled with Node.js)
A code editor (e.g., Visual Studio Code)
A GitHub account (for project submission)
Getting Started
Step 1: Install Dependencies
Open a terminal in the raft-lab root directory and run:

npm install
This will install all required dependencies as specified in package.json.

Step 2: Run Scenario Tests
You can run each scenario using npm scripts or by directly executing the files with Node.js.

Using npm scripts (recommended):
npm run election — Leader Election (Part 1)
npm run heartbeats — Heartbeats (Part 2)
npm run leader-failure — Leader Failure (Part 3)
npm run replication — Log Replication (Part 4)
npm run follower-failure — Follower Failure (Part 5)
npm run majority-lost — Majority Lost (Part 6)
npm run partition — Network Partition (Part 7)
npm run recovery — Log Recovery (Part 8)
npm run hardening — Hardening: Part 9 + Part 10
Running individual files directly:
node scenarios/leader_election.js
node scenarios/heartbeats.js
node scenarios/leader_failure.js
node scenarios/log_replication.js
node scenarios/follower_failure.js
node scenarios/majority_lost.js
node scenarios/network_partition.js
node scenarios/log_recovery.js
node scenarios/hardening.js
Core Modules
Node (node.js)
Implements the Raft node state machine with three states: FOLLOWER, CANDIDATE, and LEADER. Manages persistent state including currentTerm, votedFor, and the replicated log. Handles RPC requests for vote casting (requestVote) and log replication (appendEntries).

Cluster (cluster.js)
Manages collections of nodes and provides utility functions for quorum calculations, online node filtering, and leader discovery.

Simulator (simulator.js)
Orchestrates the overall simulation — drives time progression, triggers elections, heartbeats, and log replication scenarios.

Network (network.js)
Simulates network message passing between nodes. Supports features such as message delivery, dropping, and network partitioning to model real-world failure scenarios.

LogEntry (logEntry.js) & Term (term.js)
Data structure classes representing log entries (with term and command fields) and term numbering management.

Part 10: Enhanced Raft Deployment
This implementation extends the base Raft simulator with 7 operational hardening features designed to detect and mitigate common operational weaknesses in production Raft deployments:

1. Election Storm Detection (ElectionStormDetector)
Weakness addressed: Election timeouts that are too short or non-randomized cause multiple nodes to time out simultaneously, triggering unnecessary election storms.
Implementation: Tracks election timestamps and detects abnormally high election frequency within a configurable time window. Suggests randomized timeout strategies when storms are detected.
2. Leader Churn Monitoring (LeaderChurnMonitor)
Weakness addressed: Frequent leader changes reduce throughput and increase latency, as each election causes a brief period of unavailability.
Implementation: Tracks leader change history and emits warnings when the churn rate exceeds a configurable threshold. Suggests investigating network stability.
3. Network Partition Monitoring (NetworkPartitionMonitor)
Weakness addressed: Network partitions may go undetected, leading to stale data and inconsistent state across partitions.
Implementation: Detects partition events (split and heal), records partition duration and frequency, and alerts operators to prolonged partition scenarios.
4. Follower Lag Tracking (FollowerLagTracker)
Weakness addressed: Slow followers that cannot keep up with the leader waste replication resources and may eventually fall too far behind to recover efficiently.
Implementation: Monitors each follower’s log lag relative to the leader. Emits warnings when lag exceeds configurable thresholds.
5. Persistent State Validation (StateValidator)
Weakness addressed: Term rollback or log inconsistency can lead to severe data corruption.
Implementation: Validates term monotonicity (terms must always increase) and log consistency across nodes. Detects and logs protocol violations.
6. Audit Logging (AuditLogger)
Weakness addressed: Lack of operational audit records makes troubleshooting and compliance checking difficult.
Implementation: Records detailed logs of critical operations including elections, log replication, partition events, and health checks with timestamps.
7. Cluster Health Reporting (ClusterHealthReporter)
Weakness addressed: Without a holistic health view, operators cannot quickly assess cluster status.
Implementation: Generates comprehensive health reports including node states, majority availability, leader distribution, and aggregate health metrics.
Running the Enhanced Hardening Scenario
To run the hardening scenario with all 7 enhancement features active:

npm run hardening
or

node scenarios/hardening.js
The output will display detection results, warnings, and suggested defenses from all enabled enhancement modules.

Workshop Parts Overview
Part 1 — Establishing Authority (leader_election.js): Leader election with majority voting
Part 2 — Maintaining Leadership (heartbeats.js): Heartbeat mechanism for leadership maintenance
Part 3 — Leader Failure and Re-Election (leader_failure.js): Failure detection and leader replacement
Part 4 — Replicating History (log_replication.js): Log entry replication and commitment
Part 5 — Continuing Despite Failure (follower_failure.js): Fault tolerance with minority node failures
Part 6 — When Progress Stops (majority_lost.js): System behavior when majority is unavailable
Part 7 — Surviving a Network Partition (network_partition.js): Handling network splits and recovery
Part 8 — Repairing History (log_recovery.js): Log recovery for lagging followers
Part 9 — Breaking Operational Assumptions (hardening.js): Operational weakness detection
Part 10 — Hardening a Raft Deployment (hardening.js): Enhanced operational features implementation
