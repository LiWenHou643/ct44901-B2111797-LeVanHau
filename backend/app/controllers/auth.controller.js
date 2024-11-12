exports.login = async (req, res) => {
    try {
        const user = await AuthService.login(req.body);
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.logout = async (req, res) => {
    try {
        // Do something
        res.status(200).json({ message: 'Logout successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
