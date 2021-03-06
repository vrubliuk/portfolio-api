require("dotenv").config();
const fs = require("fs");
const Project = require("../models/project");
const unselect = require("../helpers/unselect");
const { gfsRemoveFile } = require("../helpers/gridFsStream");

exports.postProject = async (req, res, next) => {
  const { userId } = req;
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
  const { userId } = req;
  const { id } = req.params;
  const { name, websiteUrl, repositoryUrl, summary, tags, priority } = req.body;
  try {
    const project = await Project.findById(id);
    if (project.userId.toString() !== userId) return res.status(403).json({ message: "Not authorized!" });
    if (name !== undefined) project.name = name;
    if (websiteUrl !== undefined) project.websiteUrl = websiteUrl;
    if (repositoryUrl !== undefined) project.repositoryUrl = repositoryUrl;
    if (summary !== undefined) project.summary = summary;
    if (tags !== undefined) project.tags = tags;
    if (priority !== undefined) project.priority = priority;
    const updatedProject = await project.save();
    res.json(unselect(updatedProject._doc, "userId", "__v"));
  } catch (error) {
    next(error);
  }
};

exports.putProjectScreenshot = async (req, res, next) => {
  const { userId } = req;
  const { id } = req.params;
  const screenshot = req.file;
  if (!screenshot) return next(new Error("File type is not correct"));
  try {
    const project = await Project.findById(id);
    if (project.userId.toString() !== userId) {
      gfsRemoveFile(screenshot.id);
      return res.status(403).json({ message: "Not authorized!" });
    }
    const previousScreenshot = project.screenshot;
    project.screenshot = screenshot.id;
    await project.save();
    res.json({ screenshot: `${process.env.BASE_SERVER_URL}/api/files/${screenshot.id}` });
    if (previousScreenshot) {
      gfsRemoveFile(previousScreenshot);
    }
  } catch (error) {
    next(error);
  }
};

exports.deleteProject = async (req, res, next) => {
  const { userId } = req;
  const { id } = req.params;
  try {
    const project = await Project.findById(id);
    if (project.userId.toString() !== userId) return res.status(403).json({ message: "Not authorized!" });
    await Project.findByIdAndDelete(id);
    res.sendStatus(200);
    if (project.screenshot) {
      fs.unlink(project.screenshot, err => {
        if (err) console.log(err);
      });
    }
  } catch (error) {
    next(error);
  }
};

exports.deleteProjectScreenshot = async (req, res, next) => {
  const { userId } = req;
  const { id } = req.params;
  try {
    const project = await Project.findById(id);
    if (project.userId.toString() !== userId) return res.status(403).json({ message: "Not authorized!" });
    const previousScreenshot = project.screenshot;
    project.screenshot = null;
    await project.save();
    res.sendStatus(200);
    gfsRemoveFile(previousScreenshot);
  } catch (err) {
    next(err);
  }
};
