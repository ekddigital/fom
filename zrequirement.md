**Study Progress Tracking System**
**Competition Task for Advanced Computer Science Students**

---

**Overview**
Design and implement a web-based Study Progress Tracking System that empowers students to monitor their learning journey, receive personalized recommendations, collaborate with peers, and allows educators to gain actionable insights. Your solution should adhere to the DRY (Don’t Repeat Yourself) principle, employ modern web technologies (Next.js, React, MySQL), and use Clerk for authentication. You will be evaluated on architectural clarity, code quality, feature completeness, performance, and security.

---

## Objectives

1. **User Management & Authentication**

   * Implement secure sign-up/sign-in flows using Clerk.
   * Support role-based access: *Student*, *Teacher*, *Admin*.
   * Allow users to manage their profile (name, email, avatar).

2. **Personal Dashboard & Progress Visualization**

   * Enable each student to view their enrolled subjects, completed chapters, and performance metrics.
   * Visualize progress via interactive charts (Chart.js or D3.js).
   * Display recent activities (e.g., quizzes taken, strategies applied).

3. **Learning Progress Tracking & Recommendations**

   * Model curriculum as *Subjects* → *Chapters* → *Topics*.
   * Record students’ completion status and quiz scores per topic.
   * Generate personalized learning paths and strategies based on their progress, using a simple rule-based or data-driven approach.
   * Provide a “Recommended Next Steps” section on the dashboard.

4. **Adaptive Testing Engine**

   * For each student, dynamically select questions based on their past performance (e.g., if a student struggles with algebraic expressions, the system serves easier or focused problems).
   * Provide immediate feedback (correct answer, explanation).
   * Log test attempts, time taken, and success rates for analytics.

5. **Social Learning & Collaboration**

   * Allow students to “friend” or “follow” other students.
   * Display friends’ progress summaries (e.g., percent complete per subject).
   * Enable real-time chat or discussion threads for each subject/chapter (via WebSockets or polling).
   * Encourage knowledge sharing by letting students post tips (text-only).

6. **Data Analytics & Admin Tools**

   * Teachers/Admins can view aggregate reports:

     * Class-wide performance heatmaps per subject.
     * Top-performing students per chapter.
     * Subjects where the cohort is underperforming.
   * Export reports (CSV) for offline analysis.
   * Admin dashboard to manage users, subjects, and chapters.

7. **Security, Privacy & Deployment**

   * Store sensitive data (passwords, tokens) securely; enforce HTTPS (assume deployment on Vercel or similar).
   * Use JWTs issued by Clerk for API route protection.
   * Implement role-based authorization checks on all endpoints.
   * Encrypt all Personally Identifiable Information (PII) in transit and at rest (i.e., use TLS and MySQL encryption if available).
   * Document deployment steps: setting up MySQL, environment variables, and deploying the Next.js app.

---

## Major Milestone Tasks

### 1. Authentication & User Management (Week 1–2)

* **Integrate Clerk** to handle sign-up, sign-in, password resets, and email verification.
* **Define Roles & Permissions**:

  * *Student*: Access to personal dashboard, quizzes, and social features.
  * *Teacher*: All Student privileges + view class analytics.
  * *Admin*: Full access to manage users, subjects, curriculum data.
* **Profile Management**: Users can update their display name, avatar, and contact details.

> **Deliverables**
>
> * Clerk integration configured in Next.js (environment variables stored securely).
> * User schema in MySQL: `users (id, clerk_id, role, name, email, avatar_url, created_at, updated_at)`.
> * Backend middleware enforcing JWT validation and role-based access on API routes.

---

### 2. Core Functionality: Progress Tracking & Visualization (Week 2–4)

* **Curriculum Schema**:

  ```
  subjects (
    id, title, description, created_at, updated_at
  )
  chapters (
    id, subject_id → subjects.id, title, order, created_at, updated_at
  )
  topics (
    id, chapter_id → chapters.id, title, order, created_at, updated_at
  )
  ```
* **Progress Model**:

  ```
  student_progress (
    id, user_id → users.id, topic_id → topics.id,
    status ENUM('not_started','in_progress','completed'),
    best_score INT, last_attempted DATETIME
  )
  ```
* **Dashboard Views**:

  * **Subject List**: Show each subject with completion % (aggregate of chapters/topics).
  * **Chapter Details**: Within a subject, display chapter completion and topic-level status.
  * **Progress Chart**: Using Chart.js or D3.js, render an interactive bar or line chart of “Topics Completed Over Time.”
* **DRY Principle**:

  * Create reusable components for lists (e.g., `<SubjectCard>`, `<ChapterList>`, `<TopicItem>`).
  * Abstract API fetch logic into a single hook (`useFetchProgress(userId)`).

> **Deliverables**
>
> * Database seeded with sample subjects/chapters/topics.
> * Protected Next.js API routes:
>
>   * `GET /api/progress/:userId`
>   * `POST /api/progress/:userId/topic/:topicId` (mark as in\_progress or completed)
> * React pages/components to display and update progress.
> * Chart visualization embedded on student dashboard.

---

### 3. Adaptive Testing & Personalized Recommendations (Week 4–6)

* **Question Bank Schema**:

  ```
  questions (
    id, topic_id → topics.id, question_text, choices JSON, correct_choice, difficulty_level INT, created_at
  )
  ```

  ```
  test_attempts (
    id, user_id → users.id, question_id → questions.id,
    chosen_choice, is_correct BOOLEAN, attempted_at DATETIME
  )
  ```
* **Adaptive Logic**:

  1. Query the student’s `best_score` and recent `test_attempts` per topic.
  2. If accuracy < 60% for a topic → serve easier questions (difficulty ≤ current).
  3. If accuracy ≥ 80% → serve harder questions (difficulty ≥ current + 1).
  4. Otherwise, serve same-level questions.
* **Real-time Feedback**:

  * Upon submission, show whether the answer is correct and provide a brief explanation placeholder.
  * Update `student_progress.best_score` if new score > existing.
* **Recommendation Engine**:

  * **Rule 1**: If a student has completed ≥ 80% of topics in a chapter but low quiz scores, suggest targeted revision on missed topics.
  * **Rule 2**: If a student is idle for > 7 days, send dashboard banner: “Pick up where you left off: \[Subject Name].”
  * **Rule 3**: For each subject, recommend a “Next Chapter” based on lowest completion %.

> **Deliverables**
>
> * API endpoints:
>
>   * `GET /api/questions/next?userId=&topicId=` → returns a question object.
>   * `POST /api/questions/answer` → evaluates answer, returns feedback.
>   * `GET /api/recommendations/:userId` → returns list of recommended actions.
> * React components: `<AdaptiveTest>`, `<RecommendationList>`.
> * Utility functions for adaptive logic and recommendation rules, kept DRY (e.g., `getNextQuestion(userId, topicId)`).

---

### 4. Social Learning & Collaboration (Week 6–8)

* **Friend System**:

  ```
  friendships (
    id, requester_id → users.id, addressee_id → users.id,
    status ENUM('pending','accepted','blocked'), created_at
  )
  ```
* **Friends’ Progress Overview**:

  * On the student dashboard, show a “Friends’ Progress” panel with each friend’s overall completion %.
  * Clicking a friend’s card reveals their public profile: subjects completed, recent activities.
* **Discussion Threads**:

  ```
  discussions (
    id, topic_id → topics.id, author_id → users.id, content TEXT, created_at
  )
  ```
* **Real-Time Chat (Optional)**:

  * Use WebSockets (e.g., Socket.io) or polling to allow live messages per chapter.
  * Automatically scroll to newest message; show timestamps.
* **DRY Components**:

  * Common UI for lists: `<FriendCard>`, `<DiscussionPost>`.
  * Abstract WebSocket/polling logic into a single hook: `useChat(topicId)`.

> **Deliverables**
>
> * Database tables for `friendships` and `discussions`.
> * API routes:
>
>   * `POST /api/friends/request`, `POST /api/friends/respond`, `GET /api/friends/:userId`
>   * `GET /api/discussions/:topicId`, `POST /api/discussions/:topicId`
> * React pages/components for adding friends, viewing friends’ progress, and participating in discussions.
> * WebSocket or polling setup for live chat (if implemented).

---

### 5. Data Analytics & Admin Tools (Week 8–10)

* **Aggregate Reports**:

  * **Class Performance**: For a given subject, compute average completion %, average quiz score.
  * **Topic Difficulty Heatmap**: Identify topics where > 50% of students score < 50%.
  * **Leaderboards**: Top 5 students per subject/chapter by average score and completion speed.
* **Reporting Schema** (views or materialized tables):

  ```
  reports_subject (
    subject_id, avg_completion DECIMAL, avg_score DECIMAL, underperforming_topics JSON
  )
  ```
* **Export Functionality**:

  * Provide “Export CSV” endpoints (e.g., `/api/reports/subject/:subjectId/csv`).
  * Use server-side generation (e.g., `json2csv` library) to create downloadable files.
* **Admin Dashboard**:

  * **User Management**: List all users, change roles, deactivate accounts.
  * **Curriculum Management**: Create/Edit/Delete subjects, chapters, topics.
  * **Analytics View**: Display charts (bar chart for class performance, heatmap for topic difficulty).
* **DRY Practices**:

  * Reuse chart components (e.g., `<BarChart data={…} />`, `<Heatmap data={…} />`).
  * Abstract CSV generation into a utility function: `generateCSV(rows, columns)`.

> **Deliverables**
>
> * Next.js API routes for report data (`GET /api/reports/subject/:subjectId`).
> * CSV export endpoints.
> * React admin pages: `<UserManagement>`, `<CurriculumEditor>`, `<AnalyticsDashboard>`.
> * Visualization components using Chart.js or D3.js.

---

## Technical Requirements

* **Frameworks & Libraries**

  * Frontend: React with Next.js (use built-in API routes for serverless functions).
  * Authentication: Clerk (for all sign-in/sign-up, JWT issuance, role-based protection).
  * Database: MySQL (design normalized schema, use migrations).
  * Data Visualization: Chart.js or D3.js (choose one consistently).
  * Real-Time: WebSockets (e.g., Socket.io) or polling (e.g., `setInterval` in a custom hook).
  * Styling: Tailwind CSS (for rapid, utility-first styling).

* **Architecture & Best Practices**

  * Follow the DRY principle: extract common logic into hooks, utilities, and shared components.
  * Use environment variables for sensitive configs (e.g., `CLERK_API_KEY`, `DATABASE_URL`).
  * Structure code into clear folders:

    ```
    /components       ← UI components (e.g., charts, lists)  
    /pages            ← Next.js pages (use folder-based routing)  
    /pages/api        ← API route handlers (CRUD for users, progress, quizzes, etc.)  
    /lib              ← Database client, utility functions, middleware (e.g., `authMiddleware.js`)  
    /styles           ← Global CSS/Tailwind config  
    /migrations       ← SQL or ORM migrations for schema changes  
    /hooks            ← Custom React hooks (e.g., `useFetchProgress`, `useChat`)  
    ```
  * Write modular, testable code:

    * Unit tests for utility functions (e.g., adaptive algorithm).
    * Integration tests for key API endpoints (e.g., progress updates, quiz submission).
  * Ensure mobile-responsive design for dashboards and quizzes.

* **Security & Privacy**

  * Enforce HTTPS in production (Next.js default on Vercel, or set up TLS certificates).
  * Validate all incoming data on the server side (use libraries like `zod` or `Yup` for schema validation).
  * Implement rate limiting on login and quiz endpoints (to prevent brute-force or DDoS).
  * Sanitize user-generated content (discussion posts) to prevent XSS.
  * Encrypt sensitive columns (e.g., user’s PII) in MySQL if supported.

* **Deployment & Maintenance**

  * Document setup steps:

    1. Provision MySQL instance (e.g., AWS RDS or local Docker).
    2. Configure environment variables (`.env.local`):

       ```
       DATABASE_URL=mysql://<user>:<pass>@<host>:<port>/<db>
       CLERK_API_KEY=<your_clerk_api_key>
       CLERK_API_SECRET=<your_clerk_api_secret>
       ```
    3. Run migrations.
    4. Deploy Next.js app on Vercel (or similar).
  * Monitor performance:

    * Log slow queries (use MySQL’s slow query log).
    * Set up simple health check endpoint (`GET /api/health` returning uptime).
  * Plan for versioned releases: tag Git commits; maintain CHANGELOG.

---

## Evaluation Criteria

1. **Functionality & Completeness (40%)**

   * All major features (authentication, progress tracking, adaptive testing, social, analytics) are implemented and integrated.
   * User flows are smooth and intuitive (e.g., registering, taking a quiz, viewing recommendations).

2. **Code Quality & DRY Compliance (20%)**

   * Minimal duplicate logic: common functionalities abstracted into hooks and utilities.
   * Clear folder structure, well-named variables/functions, meaningful comments where necessary.
   * Adequate error handling (e.g., 4xx/5xx responses with descriptive messages).

3. **User Experience & UI Design (15%)**

   * Responsive layouts (mobile + desktop).
   * Consistent styling using Tailwind CSS.
   * Intuitive navigation between dashboard, quizzes, discussions, and admin pages.

4. **Security & Performance (15%)**

   * Correct use of Clerk for secure authentication/authorization.
   * Input validation, XSS prevention, and secure data storage.
   * Reasonable API response times and optimized database queries (indexes on foreign keys, avoid N+1).

5. **Documentation & Deployment (10%)**

   * Clear README describing setup, environment variables, and running tests.
   * Deployment guide for production environment.
   * Inline code comments where algorithms are non-trivial (e.g., adaptive logic).

---

**Good luck!**
Leverage the DRY principle throughout—factor out common logic, reuse components, and keep your codebase maintainable. By the end of the competition, you should have a fully functional, secure, and polished Study Progress Tracking System ready for real-world use.
