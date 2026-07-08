Subject: AI Feedback Triage System - Project Proposal (README.md)

# AI Feedback Triage System: Project Proposal

## Project Overview
The **AI Feedback Triage System** is an automated web application designed to process, categorize, and prioritize incoming customer feedback (emails, reviews, and support tickets). 

### Real-World Problem
Customer support teams are often overwhelmed by a high volume of unorganized messages. Critical issues (like system outages) often get buried under low-priority requests, leading to slow response times and customer frustration. This app automates the "triage" phase, ensuring urgent issues are addressed first.

## Use Case & Workflow
### The Workflow
Currently, a support agent must manually read every incoming message to determine its department and urgency. 

### AI Improvement
The AI-Powered workflow introduces an **Intelligent Buffer**. As messages arrive, the AI instantly:
1.  **Categorizes** the intent (Billing, Technical, or Sales).
2.  **Prioritizes** based on urgency (1-5).
3.  **Drafts** a response using company knowledge.
This shifts the human agent from a "sorter" to a "resolver," significantly reducing the Time to First Response (TTFR).

## AI Features to Be Implemented
*   **Prompt Engineering:** To define the "Triage Specialist" persona and specific classification rules.
*   **Structured Outputs:** Using JSON to ensure the AI's decisions can be programmatically saved and used to trigger UI alerts.
*   **Retrieval-Augmented Generation (RAG) & Vector Databases:** To ground suggested responses in actual company documentation, preventing hallucinations.
*   **Evaluation Frameworks:** Using tools like **Promptfoo** to measure classification accuracy against a "Ground Truth" dataset.
*   **Observability Tools:** Implementing **LangSmith** to track latency, costs, and the reasoning traces for every ticket.

## Technical Approach
The system will be built using a modern AI stack:
*   **LLM:** OpenAI GPT-4o or Claude 3.5 Sonnet.
*   **Vector Store:** Supabase (pgvector) for unified data and embedding storage.
*   **Frameworks:** Vercel AI SDK and TypeScript for type-safe structured outputs.
*   **IDE:** Cursor for rapid development and AI-assisted coding.

## Example Prompts & Expected Outputs
### Example: Triage Request
**Prompt:** "Analyze the message. Return JSON with category (Billing, Technical, Sales) and urgency (1-5)."
**Input:** "My account is locked and I have a presentation in 10 minutes!"
**Output:**
```json
{
  "category": "Technical",
  "urgency": 5,
  "summary": "User locked out of account before a deadline.",
  "is_login_issue": true
}
```

## Evaluation Strategy
I will assess effectiveness using **Classification Accuracy** and **Urgency Correlation**. A "Ground Truth" dataset of 50 expert-labeled tickets will serve as the benchmark. We will use **Promptfoo** to ensure accuracy remains >90% during prompt iterations.


## To run the app locally
Initialize Project: Run npx create-next-app@latest . and select TypeScript, Tailwind, and App Router.
Environment Variable: Create a .env file and add OPENAI_API_KEY=your_key_here.
Install Dependencies: npm install ai @ai-sdk/openai zod.
Run: npm run dev and navigate to localhost:3000.

## Observability Plan
I will use **LangSmith** to track:
*   **Latency:** Ensuring triage happens in <2 seconds.
*   **Cost:** Monitoring token usage per ticket.
*   **Human Adoption:** Measuring how often agents accept the AI's suggested drafts versus rewriting them.
