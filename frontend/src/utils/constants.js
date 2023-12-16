export const reactQCache = {
  GET_CHAT: "GET_CHAT",
  GET_MESSAGES: "GET_MESSAGES",
};

export const genrateImage = (url) => {
  return `${process.env.REACT_APP_BASE_URL || "http://localhost:3001"}+${url}`;
};

export const predefinedAnswers = [
  {
    question: "How can I manage stress during exam weeks?",
    answer:
      "It's normal to feel stressed during exams. Try creating a study schedule, taking breaks, and practicing relaxation techniques like deep breathing.",
  },
  {
    question:
      "What are some tips for improving my concentration while studying?",
    answer:
      "Break your study sessions into manageable chunks, eliminate distractions, and consider techniques like the Pomodoro method to enhance concentration.",
  },
  {
    question:
      "I'm feeling overwhelmed. What can I do to cope with academic pressure?",
    answer:
      " Reach out to a friend, family member, or counselor to talk about your feelings. Break tasks into smaller goals, prioritize, and remember it's okay to ask for help.",
  },
  {
    question: "How can I establish a healthy work-life balance as a student?",
    answer:
      "Set realistic goals, schedule dedicated time for relaxation and hobbies, and avoid overloading yourself with commitments. Balancing responsibilities is crucial for mental well-being.",
  },
  {
    question:
      "I often feel lonely. Any advice on making new friends in college?",
    answer:
      "Join clubs or activities that interest you, attend social events, and be open to meeting new people. Building connections takes time, so be patient with yourself.",
  },
  {
    question:
      "What are effective strategies for managing anxiety before a presentation?",
    answer:
      "Practice your presentation multiple times, focus on your breathing, and remind yourself that it's okay to feel nervous. Visualizing success can also be helpful.",
  },
  {
    question: "How do I know if I need professional help for my mental health?",
    answer:
      "If you're consistently struggling with daily life, feeling overwhelmed, or experiencing persistent changes in mood, it's important to seek support. Reach out to a mental health professional or your university's counseling services.",
  },
  {
    question:
      "Can you suggest some quick stress-relief techniques I can use during a busy day?",
    answer:
      "Try deep breathing exercises, progressive muscle relaxation, or a short mindfulness meditation. Taking short breaks to stretch or go for a walk can also help.",
  },
  {
    question:
      "I'm having trouble sleeping due to stress. Any tips for a better night's sleep?",
    answer:
      "Create a calming bedtime routine, limit screen time before sleep, and consider relaxation techniques like gentle stretching or listening to soothing music.",
  },
  {
    question: "How do I deal with homesickness as a college student?",
    answer:
      "Stay connected with loved ones through calls or video chats, explore campus activities to build a sense of community, and remember that it's normal to feel homesick during the transition to college.",
  },
  {
    question:
      "I feel a lot of pressure to succeed academically. How can I manage this pressure effectively?",
    answer:
      " Set realistic goals, break tasks into smaller steps, and focus on the learning process rather than just the end result. Don't hesitate to seek academic support services if needed.",
  },
  {
    question:
      "What are some self-care activities I can easily incorporate into my routine?",
    answer:
      "Practice self-care by taking short breaks, engaging in activities you enjoy, maintaining a healthy diet, and ensuring you get enough rest. Small, consistent acts of self-care can make a big difference.",
  },
  {
    question:
      "I'm struggling with time management. Any advice on organizing my schedule?",
    answer:
      "Use a planner or digital calendar to schedule tasks, set realistic deadlines, and prioritize assignments. Breaking down larger tasks into smaller, more manageable parts can make them less overwhelming.",
  },
  {
    question: "How can I build resilience in the face of challenges?",
    answer:
      "Focus on developing a positive mindset, learn from setbacks, and build a support network. Resilience comes from adapting to adversity, and seeking help when needed is a sign of strength.",
  },
  {
    question:
      "I'm feeling unmotivated. Any strategies to regain my motivation for studying?",
    answer:
      "Break your tasks into smaller, more achievable goals, reward yourself for completing them, and find study environments that inspire focus. Connecting with classmates for group study sessions can also boost motivation",
  },
];
