const express = require("express");
const { UserEvent, Event, User } = require("../../models");

const userEvents = async (req, res) => {
  try {
    const allParticipations = await UserEvent.findAll({
      include: {
        model: User,
      },
    });

    res.status(200).json({ allParticipations });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = userEvents;
