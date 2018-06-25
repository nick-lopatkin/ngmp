export default {
    up: queryInterface => queryInterface.bulkInsert('products',
        [
            {
                id: 1,
                name: 'Beer',
                description: 'IPA',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 2,
                name: 'Vodka',
                description: 'Stalichnaya',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ], {}),
    down: queryInterface => queryInterface.bulkDelete('products', null, {}),
};
