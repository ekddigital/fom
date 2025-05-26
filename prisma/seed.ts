import { PrismaClient, Role, ProgressStatus } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Start seeding ...");

  // Clean up existing data
  await prisma.studentProgress.deleteMany();
  await prisma.question.deleteMany();
  await prisma.tip.deleteMany();
  await prisma.discussion.deleteMany();
  await prisma.friendship.deleteMany();
  await prisma.testAttempt.deleteMany();
  await prisma.topic.deleteMany();
  await prisma.chapter.deleteMany();
  await prisma.subject.deleteMany();
  await prisma.user.deleteMany();

  // Create Users
  const studentUser = await prisma.user.create({
    data: {
      clerk_id: "user_student_placeholder_clerk_id", // Replace with actual Clerk ID from your Clerk dashboard
      email: "student@example.com",
      name: "Student User",
      role: Role.STUDENT,
      avatar_url: "https://randomuser.me/api/portraits/lego/1.jpg",
    },
  });

  const teacherUser = await prisma.user.create({
    data: {
      clerk_id: "user_teacher_placeholder_clerk_id", // Replace with actual Clerk ID from your Clerk dashboard
      email: "teacher@example.com",
      name: "Teacher User",
      role: Role.TEACHER,
      avatar_url: "https://randomuser.me/api/portraits/lego/2.jpg",
    },
  });

  console.log(`Created users: ${studentUser.name}, ${teacherUser.name}`);

  // Create a Subject
  const subject1 = await prisma.subject.create({
    data: {
      title: "Introduction to Programming",
      description: "Learn the fundamentals of programming concepts.",
      created_by: teacherUser.clerk_id, // Link to the teacher user
    },
  });

  const subject2 = await prisma.subject.create({
    data: {
      title: "Web Development Basics",
      description: "Understanding HTML, CSS, and JavaScript.",
      created_by: teacherUser.clerk_id,
    },
  });

  console.log(`Created subjects: ${subject1.title}, ${subject2.title}`);

  // Create Chapters for Subject 1
  const s1_chapter1 = await prisma.chapter.create({
    data: {
      title: "Chapter 1: Getting Started with Code",
      order: 1,
      subject_id: subject1.id,
    },
  });

  const s1_chapter2 = await prisma.chapter.create({
    data: {
      title: "Chapter 2: Basic Programming Concepts",
      order: 2,
      subject_id: subject1.id,
    },
  });

  // Create Chapters for Subject 2
  const s2_chapter1 = await prisma.chapter.create({
    data: {
      title: "Chapter 1: Introduction to HTML",
      order: 1,
      subject_id: subject2.id,
    },
  });

  console.log("Created chapters.");

  // Create Topics for Subject 1, Chapter 1
  const s1_c1_topic1 = await prisma.topic.create({
    data: {
      title: "Topic 1.1: What is Programming?",
      order: 1,
      chapter_id: s1_chapter1.id,
    },
  });

  const s1_c1_topic2 = await prisma.topic.create({
    data: {
      title: "Topic 1.2: Setting up Your Development Environment",
      order: 2,
      chapter_id: s1_chapter1.id,
    },
  });

  // Create Topics for Subject 1, Chapter 2
  const s1_c2_topic1 = await prisma.topic.create({
    data: {
      title: "Topic 2.1: Variables, Data Types, and Operators",
      order: 1,
      chapter_id: s1_chapter2.id,
    },
  });

  const s1_c2_topic2 = await prisma.topic.create({
    data: {
      title: "Topic 2.2: Control Flow (If/Else, Loops)",
      order: 2,
      chapter_id: s1_chapter2.id,
    },
  });

  // Create Topics for Subject 2, Chapter 1
  const s2_c1_topic1 = await prisma.topic.create({
    data: {
      title: "Topic 1.1: HTML Structure and Tags",
      order: 1,
      chapter_id: s2_chapter1.id,
    },
  });

  console.log("Created topics.");

  // Create Questions for Topic s1_c2_topic1 (Variables, Data Types, and Operators)
  await prisma.question.createMany({
    data: [
      {
        topic_id: s1_c2_topic1.id,
        question_text: "What is a variable in programming?",
        choices: {
          a: "A fixed value that never changes",
          b: "A named storage location for data",
          c: "A type of conditional statement",
        },
        correct_choice: "b",
        difficulty_level: 1,
        explanation:
          "Variables are used to store information that can be referenced and manipulated in a computer program.",
      },
      {
        topic_id: s1_c2_topic1.id,
        question_text: "Which of the following is a common integer data type?",
        choices: { a: "String", b: "Boolean", c: "int" },
        correct_choice: "c",
        difficulty_level: 1,
        explanation:
          "'int' is commonly used to represent integer (whole number) data types.",
      },
    ],
  });

  // Create Questions for Topic s1_c2_topic2 (Control Flow)
  await prisma.question.createMany({
    data: [
      {
        topic_id: s1_c2_topic2.id,
        question_text:
          "What is an `if/else` statement primarily used for in programming?",
        choices: {
          a: "To repeat a block of code multiple times",
          b: "To define a new function",
          c: "To execute different code based on a condition",
        },
        correct_choice: "c",
        difficulty_level: 2,
        explanation:
          "If/else statements allow a program to make decisions and execute specific blocks of code accordingly.",
      },
    ],
  });

  console.log("Created questions.");

  // Create Student Progress for studentUser
  await prisma.studentProgress.createMany({
    data: [
      {
        user_id: studentUser.clerk_id,
        topic_id: s1_c1_topic1.id,
        status: ProgressStatus.COMPLETED,
        best_score: 95,
        last_attempted: new Date(),
      },
      {
        user_id: studentUser.clerk_id,
        topic_id: s1_c1_topic2.id,
        status: ProgressStatus.IN_PROGRESS,
        last_attempted: new Date(),
      },
      {
        user_id: studentUser.clerk_id,
        topic_id: s1_c2_topic1.id,
        status: ProgressStatus.NOT_STARTED,
      },
      {
        user_id: studentUser.clerk_id,
        topic_id: s2_c1_topic1.id, // Progress on a different subject
        status: ProgressStatus.COMPLETED,
        best_score: 88,
        last_attempted: new Date(),
      },
    ],
  });

  console.log("Created student progress.");

  // Example: Create a friendship (optional, if you want to test social features)
  // const friendship = await prisma.friendship.create({
  //   data: {
  //     requester_id: studentUser.clerk_id,
  //     addressee_id: teacherUser.clerk_id, // Or another student user if you create more
  //     status: 'ACCEPTED', // Assuming FriendshipStatus enum has ACCEPTED
  //   },
  // });
  // console.log('Created friendship example.');

  // Example: Create a discussion (optional)
  // const discussion = await prisma.discussion.create({
  //   data: {
  //     topic_id: s1_c1_topic1.id,
  //     author_id: studentUser.clerk_id,
  //     content: 'I found this topic really interesting! Does anyone have additional resources?',
  //   },
  // });
  // console.log('Created discussion example.');

  console.log("Seeding finished.");
}

main()
  .catch((e) => {
    console.error("Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
