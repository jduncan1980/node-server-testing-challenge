module.exports = {
	handleError,
	innerFunction,
};

function handleError() {
	return innerFunction();
}

function innerFunction() {
	return (err, req, res, next) => {
		console.log('express error', err);

		if (err.statusCode >= 400) {
			res.status(err.statusCode).json({ message: err.message, ...err });
		} else {
			next();
		}
	};
}
