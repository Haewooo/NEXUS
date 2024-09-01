router.get('/', async (req, res) => {
    const searchQuery = req.query.search || '';  
    let filter = {
      $or: [
        { title: { $regex: searchQuery, $options: 'i' } },
        { tags: { $regex: searchQuery, $options: 'i' } }
      ]
    };
  
    try {
        const challenges = await Challenge.find(filter);
        res.json(challenges);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
  });