module.exports = {
    commonError: {
        error: true,
        msg: 'Error from the server',
    },
    commonErrorMsg: (msg) => {
        return {
            error: true,
            msg: msg,
        }
    },
    commonSuccess: {
        error: false,
        msg: 'Request Success',
    },
    commonSuccessMsg: (msg) => {
        return {
            error: false,
            msg: msg,
        }
    },
    commonResult: (data) => {
        return {
            error: false,
            msg: 'Request Success',
            data: data,
        }
    }
}