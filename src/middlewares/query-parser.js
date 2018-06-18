const queryParser = (req, res, next) => {
    const parsedQuery = req.query;
    console.log('parsedQuery: ', parsedQuery);
    res.parsedQuery = parsedQuery;
    next();
};

export default queryParser;
