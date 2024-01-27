const express = require("express");
const { Op } = require("sequelize");
const { User, Event, UserEvent } = require("../../models");

const companyEventsCreatedByUser = async (req, res) => {
  try {
    const userId = req.user.id;

    const userEvents = await UserEvent.findAll({
      where: {
        userId: userId,
      },
      attributes: ["eventId"],
    });

    const participatedEventIds = userEvents.map(
      (userEvent) => userEvent.eventId
    );

    const companyEvents = await Event.findAll({
      where: {
        id: {
          [Op.in]: participatedEventIds,
        },
        "$User.type$": "company",
      },
      include: [
        {
          model: User,
          attributes: [],
        },
      ],
    });

    res.status(200).json({ companyEvents });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = companyEventsCreatedByUser;
