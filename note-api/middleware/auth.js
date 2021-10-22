const jwt = require('jsonwebtoken');
module.exports =  {
    auth: async (req, res, next) => {
	const authHeader = req.headers['authorization'];
	const token = authHeader && authHeader.split(' ')[1];
	if (token == null) return res.status(401).send({ message: "Access denied" });
	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, id) => {
		if (err) return res.status(401).send("Session expired");
		req.user = id;
		next();
	});
}
};


