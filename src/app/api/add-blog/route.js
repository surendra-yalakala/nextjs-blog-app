const { default: connectDB } = require("@/database");
const { default: Blog } = require("@/models/blog");
const Joi = require("joi");
const { NextResponse } = require("next/server");

const AddNewBlog = Joi.object({
  title: Joi.string().required(),
  description: Joi.string.required(),
});

export async function POST(req) {
  try {
    await connectDB();

    const extractBlogData = await req.json();
    const { title, description } = extractBlogData;

    const { error } = AddNewBlog.validate({
      title,
      description,
    });
    if (error) {
      return NextResponse.json({
        success: false,
        message: error.details[0].message,
      });
    }

    const newlyCreatedBlogItem = await Blog.create(extractBlogData);
    if (newlyCreatedBlogItem) {
      return NextResponse({
        success: true,
        message: "Blog added successfully",
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Something went wrong! please try again",
      });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong! please try again",
    });
  }
}
