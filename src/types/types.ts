export type JobRow = {
    jobRequest?: string;
    submitted?: string;
    status?: "In-process" | "Complete" | "Blocked" | "Need to start";
    submitter?: string;
    url?: string;
    assigned?: string;
    priority?: "High" | "Medium" | "Low";
    dueDate?: string;
    estValue?: string;
    empty?: string;
    extra1?: string;
    extra2?: string;
  };