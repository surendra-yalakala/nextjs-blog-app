const { default: connectDB } = require("@/database");
const { default: Blog } = require("@/models/blog");
const Joi = require("joi");
const { NextResponse } = require("next/server");

const EditBlog = Joi.object({
  title: Joi.string().required(),
  description: Joi.string.required(),
});

export async function PUT(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const getCurrentBlogId = searchParams.get("id");

    if (!getCurrentBlogId) {
      return NextResponse.json({
        success: false,
        message: "Current blog id required to edit",
      });
    }

    const { title, description } = await req.json();
    const { error } = EditBlog.validate({
      title,
      description,
    });

    if (error) {
      return NextResponse.json({
        success: false,
        message: error.details[0].message,
      });
    }

    const updateBlogById = await Blog.findOneAndUpdate(
      {
        id: getCurrentBlogId,
      },
      { title, description },
      { new: true }
    );
    if (updateBlogById) {
      return NextResponse.json({
        success: true,
        message: "Blog updated",
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Blog not updated",
      });
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "somethign went wrong please try again later",
    });
  }
}
