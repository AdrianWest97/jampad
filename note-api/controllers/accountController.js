let User = require('../models/user');

exports.account = async (req, res) => {
  try {
		const user = await User.findById(req.user._id);
    console.log(req.user)
		if (user) res.send({ user});
	} catch (error) {
		res.send(error).status(500);
	}
}