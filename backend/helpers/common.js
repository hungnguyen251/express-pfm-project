const responseSuccess200 = (res, message, data) => {
    return res.status(200).json({
        success: true,
        message: message, 
        data: data,
    });
}

const responseError400 = (res, message, data) => {
    return res.status(500).json({
        success: false,
        message: message, 
    });
}

module.exports = {
    responseSuccess200,
    responseError400
};
