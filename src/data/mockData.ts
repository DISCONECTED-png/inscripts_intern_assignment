export const mockData: JobRow[] = Array.from({ length: 50 }, (_, i) => {
    const data: JobRow = {};
  
    if (i === 0) {
      data.jobRequest = "Launch social media campaign for product X";
      data.submitted = "15-11-2024";
      data.status = "In-process";
      data.submitter = "Aisha Patel";
      data.url = "www.aishapatel.com";
      data.assigned = "Sophie Choudhury";
      data.priority = "Medium";
      data.dueDate = "20-11-2024";
      data.estValue = "6,200,000 ₹";
    }
  
    if (i === 1) {
      data.jobRequest = "Update press kit for company redesign";
      data.submitted = "28-10-2024";
      data.status = "Need to start";
      data.submitter = "Irfan Khan";
      data.url = "www.irfankhanportfolio.com";
      data.assigned = "Tejas Pandey";
      data.priority = "High";
      data.dueDate = "30-10-2024";
      data.estValue = "3,500,000 ₹";
    }
  
    if (i === 2) {
      data.jobRequest = "Finalize user testing feedback for app update";
      data.submitted = "05-12-2024";
      data.status = "In-process";
      data.submitter = "Mark Johnson";
      data.url = "www.markjohnsondev.com";
      data.assigned = "Rachel Lee";
      data.priority = "Medium";
      data.dueDate = "10-12-2024";
      data.estValue = "4,750,000 ₹";
    }
  
    if (i === 3) {
      data.jobRequest = "Design new features for the website";
      data.submitted = "10-01-2025";
      data.status = "Complete";
      data.submitter = "Emily Green";
      data.url = "www.emilygreenart.com";
      data.assigned = "Tom Wright";
      data.priority = "Low";
      data.dueDate = "15-01-2025";
      data.estValue = "900,000 ₹";
    }
  
    if (i === 4) {
      data.jobRequest = "Prepare financial report for Q4";
      data.submitted = "25-01-2025";
      data.status = "Blocked";
      data.submitter = "Jessica Brown";
      data.url = "www.jessicabrowncv.com";
      data.assigned = "Kevin Smith";
      data.priority = "Low";
      data.dueDate = "30-01-2025";
      data.estValue = "2,800,000 ₹";
    }
  
    return data;
  });
  