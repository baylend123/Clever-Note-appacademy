'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert('Notebooks', [
      { userId: 1, title: 'tempore quae iure quos corporis', tags: 'work' },
      {
        userId: 1,
        title: 'quia dignissimos velit minus similique',
        tags: 'school'
      },
      { userId: 1, title: 'blanditiis qui nulla in sit', tags: 'scratch' },
      {
        userId: 1,
        title: 'quidem expedita enim quia accusamus',
        tags: 'work'
      },
      {
        userId: 1,
        title: 'nostrum numquam quia est aliquam',
        tags: 'school'
      },
      {
        userId: 1,
        title: 'ipsa cumque veniam voluptatum aperiam',
        tags: 'scratch'
      },
      {
        userId: 1,
        title: 'nesciunt quisquam quia dolorem eos',
        tags: 'work'
      },
      { userId: 1, title: 'sint incidunt fuga fugiat sit', tags: 'school' },
      { userId: 1, title: 'in et dolorem ipsam sed', tags: 'scratch' },
      { userId: 1, title: 'mollitia ipsa quia iste inventore', tags: 'work' },
      { userId: 1, title: 'qui omnis nam eveniet ut', tags: 'school' },
      { userId: 1, title: 'et illo unde sed nam', tags: 'scratch' },
      {
        userId: 1,
        title: 'assumenda a voluptatem explicabo similique',
        tags: 'work'
      },
      { userId: 1, title: 'impedit autem minus qui id', tags: 'school' },
      {
        userId: 1,
        title: 'maiores laborum ipsam unde veniam',
        tags: 'scratch'
      },
      { userId: 1, title: 'harum aut repellat vitae omnis', tags: 'work' },
      {
        userId: 1,
        title: 'asperiores architecto cupiditate esse quos',
        tags: 'school'
      },
      {
        userId: 1,
        title: 'praesentium est sed nisi voluptatibus',
        tags: 'scratch'
      },
      {
        userId: 1,
        title: 'quasi aut repudiandae necessitatibus exercitationem',
        tags: 'work'
      },
      {
        userId: 1,
        title: 'possimus iusto sapiente perferendis minima',
        tags: 'school'
      },
      {
        userId: 1,
        title: 'ut ducimus laboriosam enim error',
        tags: 'scratch'
      },
      { userId: 1, title: 'beatae veritatis iste amet itaque', tags: 'work' },
      { userId: 1, title: 'qui non et est ipsam', tags: 'school' },
      {
        userId: 1,
        title: 'quis quia sapiente animi explicabo',
        tags: 'scratch'
      },
      { userId: 1, title: 'at minima quos et qui', tags: 'work' },
      { userId: 1, title: 'nemo porro porro accusamus non', tags: 'school' },
      { userId: 1, title: 'veniam dolor ut ad doloribus', tags: 'scratch' },
      { userId: 1, title: 'et aut ipsam veritatis aut', tags: 'work' },
      { userId: 1, title: 'eum est illum est aut', tags: 'school' },
      {
        userId: 1,
        title: 'perferendis voluptas autem nemo sit',
        tags: 'scratch'
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkDelete('Notebooks', null, {});
  }
};
