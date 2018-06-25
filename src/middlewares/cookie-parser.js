const cookieParser = (req, res, next) => {
    const parsedCookies = {};
    const cookies = req.headers.cookie;
    if (cookies) {
        const cookiesArr = cookies.split(';');
        const cookiesTrimmed = cookiesArr.map(item => item.trim());
        cookiesTrimmed.forEach((item) => {
            const itemArr = item.split('=');
            parsedCookies[itemArr[0]] = itemArr[1];
        });
        console.log('cookies: ', parsedCookies);
        res.parsedCookies = parsedCookies;
    }
    next();
};

export default cookieParser;
