// influencer.middleware.js
const influencerOnly = (req, res, next) => {
  if (req.user?.role === 'influencer') {
    next();
  } else {
    res.status(403).json({ message: 'Influencer access only' });
  }
};

export default influencerOnly;
