const { default: connectDB } = require("@/database");
const { default: Blog } = require("@/models/blog");
const { NextResponse } = require("next/server");

export async function DELETE(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const getCurrentBlogId = searchParams.get("id");

    if (!getCurrentBlogId) {
      return NextResponse.json({
        success: false,
        message: "Blog id is required to delete",
      });
    }

    const deleteCurrentBlogId = await Blog.findByIdAndDelete(getCurrentBlogId);
    if (deleteCurrentBlogId) {
      return NextResponse.json({
        success: true,
        message: "Deleted",
      });
    } else
      return NextResponse.json({
        success: false,
        message: "somethign went wrong please try again later",
      });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "somethign went wrong please try again later",
    });
  }
}
