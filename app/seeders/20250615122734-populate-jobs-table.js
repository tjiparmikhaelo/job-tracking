/* eslint-disable @typescript-eslint/no-unused-vars */
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('jobs', [
      {
        company: 'Tech Solutions Inc',
        position: 'Frontend Developer',
        status: 'interview',
        application_date: new Date('2024-01-15'),
        job_url: 'https://techsolutions.com/careers/frontend-dev',
        notes: 'First round interview scheduled for next week. Focus on React and TypeScript experience.',
        salary: '$70,000 - $85,000',
        location: 'San Francisco, CA',
        contact_email: 'hr@techsolutions.com',
        follow_up_date: new Date('2024-01-25'),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        company: 'DataCore Analytics',
        position: 'Full Stack Developer',
        status: 'applied',
        application_date: new Date('2024-01-20'),
        job_url: 'https://datacore.com/jobs/fullstack-dev-2024',
        notes: 'Applied through company website. Requirements match my skillset perfectly.',
        salary: '$80,000 - $95,000',
        location: 'Remote',
        contact_email: 'careers@datacore.com',
        follow_up_date: new Date('2024-02-01'),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        company: 'StartupHub',
        position: 'Backend Engineer',
        status: 'offer',
        application_date: new Date('2024-01-05'),
        job_url: 'https://startuphub.io/careers/backend-engineer',
        notes: 'Received offer! Need to negotiate salary and start date. Great team culture.',
        salary: '$75,000 + equity',
        location: 'Austin, TX',
        contact_email: 'talent@startuphub.io',
        follow_up_date: new Date('2024-01-28'),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        company: 'Global Systems Ltd',
        position: 'Software Engineer',
        status: 'rejected',
        application_date: new Date('2024-01-10'),
        job_url: 'https://globalsystems.com/careers/software-engineer',
        notes: 'Rejection email received. They went with someone with more enterprise experience.',
        salary: '$65,000 - $80,000',
        location: 'New York, NY',
        contact_email: 'recruiting@globalsystems.com',
        follow_up_date: null,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        company: 'CloudFirst Technologies',
        position: 'DevOps Engineer',
        status: 'applied',
        application_date: new Date('2024-01-22'),
        job_url: 'https://cloudfirst.tech/jobs/devops-2024',
        notes: 'Strong match for AWS and Kubernetes requirements. Submitted through LinkedIn.',
        salary: '$85,000 - $100,000',
        location: 'Seattle, WA',
        contact_email: 'jobs@cloudfirst.tech',
        follow_up_date: new Date('2024-02-05'),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        company: 'InnovateLab',
        position: 'Mobile Developer',
        status: 'interview',
        application_date: new Date('2024-01-12'),
        job_url: 'https://innovatelab.com/careers/mobile-dev',
        notes: 'Second round technical interview completed. Waiting for final decision.',
        salary: '$70,000 - $90,000',
        location: 'Denver, CO',
        contact_email: 'hr@innovatelab.com',
        follow_up_date: new Date('2024-01-30'),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        company: 'FinTech Solutions',
        position: 'Senior Developer',
        status: 'withdrawn',
        application_date: new Date('2024-01-08'),
        job_url: 'https://fintechsolutions.com/careers/senior-dev',
        notes: 'Withdrew application after learning about poor work-life balance from Glassdoor reviews.',
        salary: '$90,000 - $110,000',
        location: 'Chicago, IL',
        contact_email: 'careers@fintechsolutions.com',
        follow_up_date: null,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        company: 'GreenTech Innovations',
        position: 'Full Stack Developer',
        status: 'applied',
        application_date: new Date('2024-01-25'),
        job_url: 'https://greentech-innovations.com/jobs/fullstack',
        notes: 'Mission-driven company focused on sustainability. Excited about their tech stack.',
        salary: '$75,000 - $88,000',
        location: 'Portland, OR',
        contact_email: 'talent@greentech-innovations.com',
        follow_up_date: new Date('2024-02-08'),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        company: 'Enterprise Corp',
        position: 'Software Architect',
        status: 'interview',
        application_date: new Date('2024-01-03'),
        job_url: 'https://enterprisecorp.com/careers/architect-2024',
        notes: 'Panel interview with senior leadership next week. Preparation focused on system design.',
        salary: '$110,000 - $130,000',
        location: 'Boston, MA',
        contact_email: 'recruitment@enterprisecorp.com',
        follow_up_date: new Date('2024-02-02'),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        company: 'Agile Dynamics',
        position: 'Frontend Engineer',
        status: 'applied',
        application_date: new Date('2024-01-28'),
        job_url: 'https://agiledynamics.com/careers/frontend-eng',
        notes: 'Recent application. Company uses modern React stack with Next.js.',
        salary: '$68,000 - $82,000',
        location: 'Remote',
        contact_email: 'hiring@agiledynamics.com',
        follow_up_date: new Date('2024-02-10'),
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('jobs', null, {});
  }
};