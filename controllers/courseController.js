import Course from '../models/Course.js';

export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find({});
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getCourseById = async (req,res) => {
  try {
    const id = req.params.id;
    const course = await Course.findById(id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.json(course);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};


export const createCourse = async (req, res) => {
  const { courseName,title,img,views,author,date,readTime } = req.body;

  try {
    const course = new Course({
      courseName,
      title,
      img,
      views,
      author,
      date,
      readTime
    });

    await course.save();
    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateCourse = async (req, res) => {
  const { id } = req.params;
  const { courseName,title,img,views,author,date,readTime } = req.body;

  try {
    const course = await Course.findById(id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    course.courseName = courseName || course.courseName;
    course.title = title || course.title;
    course.img = img || course.img;
    course.views = views || course.views;
    course.author = author || course.author;
    course.date = date || course.date;
    course.readTime = readTime || course.readTime;

    await course.save();
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteCourse = async (req, res) => {
  const { id } = req.params;

  try {
    const course = await Course.findById(id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    await course.deleteOne();

    res.json({ message: 'Course deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
