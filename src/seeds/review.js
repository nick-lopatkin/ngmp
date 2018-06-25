export default {
    up: queryInterface => queryInterface.bulkInsert('reviews',
        [
            {
                id: 1,
                productId: 1,
                head: 'Best beer',
                summary: 'Tasty',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 2,
                productId: 2,
                head: 'Worst vodka',
                summary: 'Do not buy it',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ], {}),
    down: queryInterface => queryInterface.bulkDelete('reviews', null, {}),
};
