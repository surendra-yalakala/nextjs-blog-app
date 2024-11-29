const { default: connectDB } = require("@/database");
const { default: Blog } = require("@/models/blog");
const { NextResponse } = require("next/server");

export async function GET(params) {
  try {
    await connectDB();
    const extractAllBlogs = await Blog.find({});

    if (extractAllBlogs) {
      return NextResponse.json({
        success: true,
        data: extractAllBlogs,
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Something went wrong. Please try again later!",
      });
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Something went wrong. Please try again later!",
    });
  }
}
