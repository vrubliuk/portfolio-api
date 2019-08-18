const fs = require("fs");
require("dotenv").config();
const Project = require("../models/project");
const unselect = require("../helpers/unselect");

exports.postProject = async (req, res, next) => {
  const {userId} = req;
  const { name, screenshot, websiteUrl, repositoryUrl, summary, tags, priority } = req.body;
  const project = new Project({
    name,
    screenshot,
    websiteUrl,
    repositoryUrl,
    summary,
    tags,
    priority,
    userId
  });
  try {
    const savedProject = await project.save();
    res.status(201).json(unselect(savedProject, "userId", "__v"));
  } catch (error) {
    next(error);
  }
};

exports.putProject = async (req, res, next) => {
  const { id } = req.params;
  const { name, websiteUrl, repositoryUrl, summary, tags, priority } = req.body;
  try {
    const project = await Project.findByIdAndUpdate(
      id,
      {
        ...(name !== undefined ? { name } : {}),
        ...(websiteUrl !== undefined ? { websiteUrl } : {}),
        ...(repositoryUrl !== undefined ? { repositoryUrl } : {}),
        ...(summary !== undefined ? { summary } : {}),
        ...(tags !== undefined ? { tags } : {}),
        ...(priority !== undefined ? { priority } : {})
      },
      {
        new: true,
        useFindAndModify: false
      }
    ).select("-userId -__v");
    res.json(project);
  } catch (error) {
    next(error);
  }
};

exports.putProjectScreenshot = async (req, res, next) => {
  const { id } = req.params;
  const screenshot = req.file;
  if (!screenshot) return next(new Error("File type is not correct"));
  try {
    const project = await Project.findByIdAndUpdate(
      id,
      {
        screenshot: screenshot.path
      },
      {
        useFindAndModify: false
      }
    ).select("screenshot");
    res.json({ screenshot: `${process.env.URL}/${screenshot.path}` });
    const previousScreenshot = project.screenshot;
    if (previousScreenshot) {
      fs.unlink(previousScreenshot, err => {
        if (err) console.log(err);
      });
    }
  } catch (error) {
    next(error);
  }
};

exports.deleteProject = async (req, res, next) => {
  const { id } = req.params;
  try {
    await Project.findByIdAndDelete(id);
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};

exports.deleteProjectScreenshot = async (req, res, next) => {
  const { id } = req.params;
  try {
    const project = await Project.findById(id);
    const previousScreenshot = project.screenshot;
    project.screenshot = "";
    await project.save();
    res.sendStatus(200);
    fs.unlink(previousScreenshot, err => {
      if (err) console.log(err);
    });
  } catch (err) {
    next(err);
  }
};
