export default (sequelize, DataTypes) => {
    const product = sequelize.define('product', {
        name: DataTypes.STRING,
        description: DataTypes.TEXT,
    });
    product.associate = (models) => {
        product.hasMany(models.review);
    };
    return product;
};