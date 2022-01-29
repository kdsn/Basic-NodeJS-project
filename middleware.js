function validateCookie(req, res, next) {

    const {cookies} = req;

    if ('session_id' in cookies) {
        if (cookies.session_id === 'abc') {
            next();
        } else {
            res.status(403).render('error', { title: '403 - Not authenticated', message: '403 - Not authenticated', customError: 'You have an invalid session' });
        }
    } else {
        res.status(403).render('error', { title: '403 - Not authenticated', message: '403 - Not authenticated', customError: 'you are not logged in' });
    }

}

module.exports = {validateCookie};