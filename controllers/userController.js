const getUsersByRole = (req, res) => {
    const { role } = req.query;
  
    if (!role) return res.status(400).json({ message: "Role is required" });
  
    const filteredUsers = users
      .filter(user => user.role === role)
      .map(user => {
        if (role === "participant") {
          const userEvents = events
            .filter(event => event.participants.includes(user.email))
            .map(event => ({
              id: event.id,
              title: event.title,
              date: event.date,
              time: event.time,
            }));
  
          return {
            name: user.name,
            email: user.email,
            role: user.role,
            registeredEvents: userEvents,
          };
        }
  
        if (role === "organizer") {
          const organizedEvents = events
            .filter(event => event.organizer === user.email)
            .map(event => ({
              id: event.id,
              title: event.title,
              date: event.date,
              time: event.time,
            }));
  
          return {
            name: user.name,
            email: user.email,
            role: user.role,
            organizedEvents: organizedEvents,
          };
        }
  
        // fallback for other roles (if needed)
        return {
          name: user.name,
          email: user.email,
          role: user.role,
        };
      });
  
    res.json(filteredUsers);
  };
  