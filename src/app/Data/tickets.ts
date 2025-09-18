export enum Catogary {
  GettingStarted,
  AccountwithCard,
  LicensesPolicy,
  CustomizeTemplates,
  CustomizeLayouts,
}

export enum CatogaryStatus {
  AllTicket,
  Active,
  Closed,
  Deleted,
}

export const tickets = [
  {
    category: 'Getting Started',
    tickets: [
      {
        id: '2023-0001',
        time: '12:49 AM',
        title: 'How to Change primary Colors?',
        description:
          'It seems like you want to change the primary colors defined in your Tailwind CSS configuration. In your current configuration, you have defined primary colors with various shades ranging from 50 to 950. If you want to change these colors, you can simply replace the hex values with the ones you desire.',
        author: 'Mary Smith',
        avatar: 'assets/images/avatar/user-1.png',
        tags: ['Help', 'Design', 'Customize'],
        comments: 2,
        status: 'Active',
      },
      {
        id: '2023-0002',
        time: '11:20 AM',
        title: 'How to Change Font Family?',
        description:
          "To change the font family for the body text in your Tailwind CSS configuration, you would modify the 'body' key within the fontFamily object. Here's how you can do it:",
        author: 'Maribel White',
        avatar: 'assets/images/avatar/user-15.png',
        tags: ['Help', 'Design', 'Customize'],
        comments: 3,
        status: 'Closed',
      },
      {
        id: '2023-0003',
        time: '02:36 PM',
        title: 'How to enable dark mode in Tailwind CSS?',
        description:
          'To enable dark mode in Tailwind CSS, update your tailwind.config.js file with the darkMode option. You can choose between two different dark mode strategies: media or class.',
        author: 'Jennifer White',
        avatar: 'assets/images/avatar/user-18.png',
        tags: ['Help', 'Design', 'Customize'],
        comments: 2,
        status: 'Deleted',
      },
      {
        id: '2023-0004',
        time: '09:15 AM',
        title: 'Responsive Design Tips?',
        description:
          "Can someone provide tips on making a design responsive using Tailwind CSS? I've been struggling with making my layouts adjust properly on different screen sizes.",
        author: 'John Doe',
        avatar: 'assets/images/avatar/user-2.png',
        tags: ['Help', 'Design', 'Responsive'],
        comments: 4,
        status: 'Active',
      },
      {
        id: '2023-0005',
        time: '01:45 PM',
        title: 'Customizing Tailwind CSS with Plugins?',
        description:
          "I'm interested in customizing Tailwind CSS with plugins. What are some useful plugins and how can I integrate them into my project?",
        author: 'Jane Roe',
        avatar: 'assets/images/avatar/user-3.png',
        tags: ['Help', 'Plugins', 'Customize'],
        comments: 1,
        status: 'Active',
      },
      {
        id: '2023-0006',
        time: '04:30 PM',
        title: 'Best Practices for Utility-First CSS?',
        description:
          "What are some best practices for using a utility-first CSS framework like Tailwind? I'm new to this approach and would appreciate any guidance.",
        author: 'Alice Johnson',
        avatar: 'assets/images/avatar/user-4.png',
        tags: ['Help', 'Best Practices', 'CSS'],
        comments: 5,
        status: 'Closed',
      },
      {
        id: '2023-0007',
        time: '07:20 PM',
        title: 'Integrating Tailwind with React?',
        description:
          "Can anyone share their experience or resources on integrating Tailwind CSS with a React project? I'm looking for efficient ways to manage styles in my React components.",
        author: 'Bob Brown',
        avatar: 'assets/images/avatar/user-5.png',
        tags: ['Help', 'React', 'Integration'],
        comments: 3,
        status: 'Active',
      },
      {
        id: '2023-0008',
        time: '06:45 AM',
        title: 'Animations in Tailwind CSS?',
        description:
          'Is it possible to create animations using Tailwind CSS? If so, what are some examples or resources to get started with creating animations?',
        author: 'Charlie Davis',
        avatar: 'assets/images/avatar/user-6.png',
        tags: ['Help', 'Animations', 'CSS'],
        comments: 2,
        status: 'Closed',
      },
      {
        id: '2023-0009',
        time: '10:50 AM',
        title: 'Using Tailwind with SASS?',
        description:
          "Has anyone tried using Tailwind CSS with SASS? I'm curious about how to set it up and any potential issues I might run into.",
        author: 'Dana Evans',
        avatar: 'assets/images/avatar/user-7.png',
        tags: ['Help', 'SASS', 'CSS'],
        comments: 3,
        status: 'Active',
      },
      {
        id: '2023-0010',
        time: '08:35 PM',
        title: 'Performance Optimization in Tailwind?',
        description:
          "I'm looking for tips on optimizing the performance of a Tailwind CSS project. Are there any specific techniques or tools I should use?",
        author: 'Eve Foster',
        avatar: 'assets/images/avatar/user-8.png',
        tags: ['Help', 'Performance', 'Optimization'],
        comments: 4,
        status: 'Closed',
      },
    ],
  },
  {
    category: 'Account with Card',
    tickets: [
      {
        id: '2023-0008',
        time: '06:45 AM',
        title: 'Animations in Tailwind CSS?',
        description:
          'Is it possible to create animations using Tailwind CSS? If so, what are some examples or resources to get started with creating animations?',
        author: 'Charlie Davis',
        avatar: 'assets/images/avatar/user-6.png',
        tags: ['Help', 'Animations', 'CSS'],
        comments: 2,
        status: 'Closed',
      },
      {
        id: '2023-0009',
        time: '10:50 AM',
        title: 'Using Tailwind with SASS?',
        description:
          "Has anyone tried using Tailwind CSS with SASS? I'm curious about how to set it up and any potential issues I might run into.",
        author: 'Dana Evans',
        avatar: 'assets/images/avatar/user-7.png',
        tags: ['Help', 'SASS', 'CSS'],
        comments: 3,
        status: 'Active',
      },
      {
        id: '2023-0010',
        time: '08:35 PM',
        title: 'Performance Optimization in Tailwind?',
        description:
          "I'm looking for tips on optimizing the performance of a Tailwind CSS project. Are there any specific techniques or tools I should use?",
        author: 'Eve Foster',
        avatar: 'assets/images/avatar/user-8.png',
        tags: ['Help', 'Performance', 'Optimization'],
        comments: 4,
        status: 'Closed',
      },
    ],
  },
  {
    category: 'Licenses Policy',
    tickets: [
      {
        id: '2023-0009',
        time: '10:50 AM',
        title: 'Using Tailwind with SASS?',
        description:
          "Has anyone tried using Tailwind CSS with SASS? I'm curious about how to set it up and any potential issues I might run into.",
        author: 'Dana Evans',
        avatar: 'assets/images/avatar/user-7.png',
        tags: ['Help', 'SASS', 'CSS'],
        comments: 3,
        status: 'Active',
      },
      {
        id: '2023-0010',
        time: '08:35 PM',
        title: 'Performance Optimization in Tailwind?',
        description:
          "I'm looking for tips on optimizing the performance of a Tailwind CSS project. Are there any specific techniques or tools I should use?",
        author: 'Eve Foster',
        avatar: 'assets/images/avatar/user-8.png',
        tags: ['Help', 'Performance', 'Optimization'],
        comments: 4,
        status: 'Closed',
      },
    ],
  },
  {
    category: 'Customize Templates',
    tickets: [
      {
        id: '2023-0010',
        time: '08:35 PM',
        title: 'Performance Optimization in Tailwind?',
        description:
          "I'm looking for tips on optimizing the performance of a Tailwind CSS project. Are there any specific techniques or tools I should use?",
        author: 'Eve Foster',
        avatar: 'assets/images/avatar/user-8.png',
        tags: ['Help', 'Performance', 'Optimization'],
        comments: 4,
        status: 'Closed',
      },
      {
        id: '2023-0009',
        time: '10:50 AM',
        title: 'Using Tailwind with SASS?',
        description:
          "Has anyone tried using Tailwind CSS with SASS? I'm curious about how to set it up and any potential issues I might run into.",
        author: 'Dana Evans',
        avatar: 'assets/images/avatar/user-7.png',
        tags: ['Help', 'SASS', 'CSS'],
        comments: 3,
        status: 'Active',
      },
    ],
  },
  {
    category: 'Customize Layouts',
    tickets: [
      {
        id: '2023-0006',
        time: '04:30 PM',
        title: 'Best Practices for Utility-First CSS?',
        description:
          "What are some best practices for using a utility-first CSS framework like Tailwind? I'm new to this approach and would appreciate any guidance.",
        author: 'Alice Johnson',
        avatar: 'assets/images/avatar/user-4.png',
        tags: ['Help', 'Best Practices', 'CSS'],
        comments: 5,
        status: 'Closed',
      },
      {
        id: '2023-0007',
        time: '07:20 PM',
        title: 'Integrating Tailwind with React?',
        description:
          "Can anyone share their experience or resources on integrating Tailwind CSS with a React project? I'm looking for efficient ways to manage styles in my React components.",
        author: 'Bob Brown',
        avatar: 'assets/images/avatar/user-5.png',
        tags: ['Help', 'React', 'Integration'],
        comments: 3,
        status: 'Active',
      },
      {
        id: '2023-0008',
        time: '06:45 AM',
        title: 'Animations in Tailwind CSS?',
        description:
          'Is it possible to create animations using Tailwind CSS? If so, what are some examples or resources to get started with creating animations?',
        author: 'Charlie Davis',
        avatar: 'assets/images/avatar/user-6.png',
        tags: ['Help', 'Animations', 'CSS'],
        comments: 2,
        status: 'Closed',
      },
      {
        id: '2023-0009',
        time: '10:50 AM',
        title: 'Using Tailwind with SASS?',
        description:
          "Has anyone tried using Tailwind CSS with SASS? I'm curious about how to set it up and any potential issues I might run into.",
        author: 'Dana Evans',
        avatar: 'assets/images/avatar/user-7.png',
        tags: ['Help', 'SASS', 'CSS'],
        comments: 3,
        status: 'Active',
      },
      {
        id: '2023-0010',
        time: '08:35 PM',
        title: 'Performance Optimization in Tailwind?',
        description:
          "I'm looking for tips on optimizing the performance of a Tailwind CSS project. Are there any specific techniques or tools I should use?",
        author: 'Eve Foster',
        avatar: 'assets/images/avatar/user-8.png',
        tags: ['Help', 'Performance', 'Optimization'],
        comments: 4,
        status: 'Closed',
      },
    ],
  },
];
