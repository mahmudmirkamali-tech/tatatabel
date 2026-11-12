export type AgentId =
  | "scheduler"
  | "registrar"
  | "floor"
  | "ledger"
  | "sentinel"
  | "night"
  | "brand"
  | "brief";

export type AgentStatus = "running" | "waiting" | "idle";
export type AgentBand = "auto" | "until-line" | "content-lead";
export type DecisionKind = "finance" | "schedule" | "hr" | "brand";
export type DecisionStatus = "pending" | "approved" | "rejected";
export type ProgramKind = "class" | "workshop" | "event" | "concert" | "cafe";
export type Presence = "confirmed" | "watched" | "silent" | "remote" | "covered";
export type ContentStatus = "draft" | "steered" | "sent" | "escalate";
export type Role = "hamzeh" | "content";

export type Agent = {
  id: AgentId;
  name: string;
  duty: string;
  band: AgentBand;
  accountable: string;
  worksWith: string;
  autonomyNote: string;
  status: AgentStatus;
  lastAction: string;
};

export type Decision = {
  id: string;
  agentId: AgentId;
  kind: DecisionKind;
  title: string;
  detail: string;
  prepared: string;
  rule: string;
  amount?: number;
  category?: string;
  status: DecisionStatus;
  at: string;
};

export type ProgramItem = {
  id: string;
  title: string;
  kind: ProgramKind;
  when: string;
  start: string;
  end: string;
  place: string;
  capacity: number;
  enrolled: number;
  lead: string;
  status: "set" | "conflict" | "proposed";
  note: string;
};

export type Registration = {
  id: string;
  programId: string;
  name: string;
  status: "confirmed" | "waitlist" | "offered" | "cancelled";
  agentNote: string;
};

export type Staff = {
  id: string;
  name: string;
  role: string;
  shift: string;
  presence: Presence;
  score: number;
  agentNote: string;
  reminded: boolean;
};

export type HumanTask = {
  id: string;
  assignee: string;
  title: string;
  from: AgentId;
  status: "open" | "done";
};

export type LedgerEntry = {
  id: string;
  kind: "income" | "expense";
  amount: number;
  category: string;
  note: string;
  source: "voice" | "agent" | "approval";
  at: string;
};

export type Alert = {
  id: string;
  title: string;
  detail: string;
  agentId: AgentId;
  resolved: boolean;
};

export type Activity = {
  id: string;
  agentId: AgentId;
  text: string;
  at: string;
  auto: boolean;
};

export type Lesson = {
  id: string;
  agentId: AgentId;
  text: string;
  at: string;
};

export type ContentPiece = {
  id: string;
  title: string;
  channel: string;
  draft: string;
  status: ContentStatus;
};

export type NightLetter = {
  id: string;
  title: string;
  sentAt: string;
  wins: string[];
  issues: string[];
  tomorrow: string[];
};

export type Flags = {
  seatFilled: boolean;
  rezaCleared: boolean;
  milkOrdered: boolean;
  hallFixed: boolean;
  captionSteered: boolean;
};

export type Data = {
  agents: Agent[];
  decisions: Decision[];
  programs: ProgramItem[];
  registrations: Registration[];
  staff: Staff[];
  tasks: HumanTask[];
  ledger: LedgerEntry[];
  alerts: Alert[];
  activity: Activity[];
  lessons: Lesson[];
  content: ContentPiece[];
  letter: NightLetter;
  flags: Flags;
  ceiling: number;
  brandDirection: string;
  reportRead: boolean;
};
