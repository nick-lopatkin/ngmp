export default {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('users',
            [
                {
                    id: 1,
                    login: 'admin',
                    password: 'password',
                    firstName: 'Name',
                    lastName: 'Surname',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    id: 2,
                    login: 'user',
                    password: '123456',
                    firstName: 'Jon',
                    lastName: 'Snow',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ], {});
    },
    down: (queryInterface) => {
        return queryInterface.bulkDelete('users', null, {});
    },
};
