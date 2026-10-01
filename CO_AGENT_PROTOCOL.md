# Dual-Agent Turn-Based Collaboration Protocol
## Keystone Overseas Architecture & Quality Assurance

### 1. Agent Identities & Mandates

- **Agent 1: Spec & Invariant Integrity Agent (Lead Builder)**
  - Implements functional requirements, architectural upgrades, UI/UX components, and data pipelines.
  - Maintains strict invariants: Brand (`Keystone Overseas`), HQ (`House 7, Mirpur Road, Sobhanbag, Dhanmondi, Dhaka`), Phone (`+880 1941 646278`), Email (`munim.m247@gmail.com`), and academic corridors.
  - Passes turn to Agent 2 after each implementation cycle.

- **Agent 2: Adversarial Boundary Auditor (Lead Validator)**
  - Stress-tests all implementations from an adversarial perspective.
  - Hunts for:
    1. **Fee Leakage**: Any accidental mention of agency fees, service fees, or file opening charges.
    2. **Regulatory Overreach**: Unlawful work-visa guarantees or unlicensed manpower export claims.
    3. **PII & Data Integrity**: Outdated emails (`info@`), unnormalized phone numbers, leaked student credentials.
    4. **Geographic Completeness**: Validating all 64 districts in Bangladesh across programmatic corridors.
    5. **Build & Route Integrity**: Zero broken links, zero 404s, valid Schema.org JSON-LD.
  - Has veto power: Can fail a build and require Agent 1 to remediate.

---

### 2. Turn-Taking Mechanics (The Blackboard Loop)

1. **Shared State**: Stored at `.agent_sync/turn_state.json`.
2. **Turn Flow**:
   - `Agent 1` executes work -> commits diff -> writes turn record -> triggers `Agent 2`.
   - `Agent 2` runs adversarial suite -> records findings -> issues verdict (`PASS`, `CONDITIONAL PASS`, `FAIL`) -> triggers `Agent 1`.
   - Loop continues until `Agent 2` issues an unqualified `PASS` and clearance.
