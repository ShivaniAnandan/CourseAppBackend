import Purchase from '../models/Purchase.js';
import Course  from '../models/Course.js';
import sendEmail from '../utils/sendEmail.js';

// Buy a course
// export const buyCourse = async (req, res) => {
//   const { courseId } = req.body;

//   try {
//     // Check if course exists
//     const course = await Course.findById(courseId);
//     if (!course) {
//       return res.status(404).json({ message: 'Course not found' });
//     }

//     // Check if the user has already purchased the course
//     const existingPurchase = await Purchase.findOne({ user: req.user._id, course: courseId });
//     if (existingPurchase) {
//       return res.status(400).json({ message: 'Course already purchased' });
//     }

//     // Create a new purchase
//     const purchase = new Purchase({
//       user: req.user._id,
//       course: courseId,
//     });

//     await purchase.save();

//     // Assuming you have a price property in the course
//     const totalPrice = 499;
    
//     // Send confirmation email to the user
//     const subject = 'Course purchased successfully';
//     const htmlContent = `
//       <h2>Thank you for your purchase!</h2>
//       <p>Your Course ID: <strong>${purchase._id}</strong></p>
//       <p>Total Price: <strong>${totalPrice} INR</strong></p>
//       <p>Start Learning Now .</p>
//     `;
//     await sendEmail(user.email, subject, htmlContent);

    
//     res.status(201).json({ message: 'Course purchased successfully' });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// export const buyCourse = async (req, res) => {
//   const { courseId } = req.body;

//   try {
//     // Check if course exists
//     const course = await Course.findById(courseId);
//     if (!course) {
//       return res.status(404).json({ message: 'Course not found' });
//     }

//     // Check if the user has already purchased the course
//     const existingPurchase = await Purchase.findOne({ user: req.user._id, course: courseId });
//     if (existingPurchase) {
//       return res.status(400).json({ message: 'Course already purchased' });
//     }

//     // Assuming you have a price property in the course
//     const totalPrice = 499;

//     // Send confirmation email to the user first
//     const subject = 'Course purchased successfully';
//     const htmlContent = `
//       <h2>Thank you for your purchase!</h2>
//       <p>Your Course ID: <strong>${courseId}</strong></p>
//       <p>Total Price: <strong>${totalPrice} INR</strong></p>
//       <p>Start Learning Now.</p>
//     `;
//     const user = req.user;  // Assuming user is attached to the request
    
//     try {
//       await sendEmail(user.email, subject, htmlContent);
//     } catch (emailError) {
//       console.error('Failed to send confirmation email:', emailError);
//       return res.status(500).json({ message: 'Failed to send confirmation email. Please try again later.' });
//     }

//     // Create a new purchase only after the email is sent successfully
//     const purchase = new Purchase({
//       user: req.user._id,
//       course: courseId,
//     });

//     await purchase.save();

//     res.status(201).json({ message: 'Course purchased successfully' });
//   } catch (error) {
//     console.error('Server error:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

export const buyCourses = async (req, res) => {
  const { courseIds } = req.body; // Expecting an array of course IDs

  try {
    // Ensure courseIds is an array
    if (!Array.isArray(courseIds) || courseIds.length === 0) {
      return res.status(400).json({ message: 'No course IDs provided' });
    }

    const purchasedCourses = []; // Array to hold successfully purchased courses

    // Assuming you have a price property in the course
    const totalPrice = 499; // This should be dynamic based on the course
    
    // Iterate over each course ID
    for (const courseId of courseIds) {
      // Check if course exists
      const course = await Course.findById(courseId);
      if (!course) {
        return res.status(404).json({ message: `Course with ID ${courseId} not found` });
      }

      // Check if the user has already purchased the course
      const existingPurchase = await Purchase.findOne({ user: req.user._id, course: courseId });
      if (existingPurchase) {
        return res.status(400).json({ message: `Course with ID ${courseId} already purchased` });
      }

      

      // Create a new purchase record for the current course
      const purchase = new Purchase({
        user: req.user._id,
        course: courseId,
      });

      await purchase.save();
      purchasedCourses.push(courseId); // Add course ID to the array of purchased courses
    }

    // Send confirmation email to the user
    const subject = 'Courses purchased successfully';
    const htmlContent = `
      <h2>Thank you for your purchase!</h2>
      <p>Your Courses IDs: <strong>${purchasedCourses.join(', ')}</strong></p>
      <p>Total Price: <strong>${totalPrice * purchasedCourses.length} INR</strong></p>
      <p>Start Learning Now.</p>
    `;
    const user = req.user; // Assuming user is attached to the request

    try {
      await sendEmail(user.email, subject, htmlContent);
    } catch (emailError) {
      console.error('Failed to send confirmation email:', emailError);
      return res.status(500).json({ message: 'Failed to send confirmation email. Please try again later.' });
    }

    res.status(201).json({ message: 'Payment confirmed. Purchase saved!', purchasedCourses });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};



// Get all purchased courses for the logged-in user
export const getMyCourses = async (req, res) => {
  try {
    const purchases = await Purchase.find({ user: req.user._id }).populate('course');
    const courses = purchases.map(purchase => purchase.course);
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getAllPurchasedCourses = async (req, res) => {
  try {
    const purchases = await Purchase.find().populate('course');
    res.json(purchases);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
