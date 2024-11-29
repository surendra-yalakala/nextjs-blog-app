"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import AddNewBlog from "../add-new-blog";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { Label } from "../ui/label";

const initialBlogFormData = {
  title: "",
  description: "",
};

function BlogOverview({ blogList }) {
  const [openBlogDialog, setOpenBlogDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [blogFormData, setBlogFormData] = useState(initialBlogFormData);
  const [currentEditedBlogId, setCurrentEditedBlogId] = useState(null);

  const router = useRouter();

  useEffect(() => {
    router.refresh();
  }, []);

  async function handleSaveBlogData(params) {
    try {
      setLoading(true);
      const res = currentEditedBlogId
        ? await fetch(`/api/update-blog/id=${currentEditedBlogId}`, {
            method: "PUT",
            body: JSON.stringify(blogFormData),
          })
        : await fetch("/api/add-blog", {
            method: "POST",
            body: JSON.stringify(blogFormData),
          });

      const result = await res.json();

      if (result?.success) {
        setBlogFormData(initialBlogFormData);
        setOpenBlogDialog(false);
        setCurrentEditedBlogId(null);
        setLoading(false);
        router.refresh();
      }
    } catch (error) {
      setLoading(false);
      setBlogFormData(initialBlogFormData);
      setOpenBlogDialog(false);
    }
  }

  async function handleDeleteBlogById(blogId) {
    const response = await fetch(`/api/delete-blog/id=${blogId}`, {
      method: "DELETE",
    });
    const result = await response.json();
    if (result.success) {
      router.refresh();
    } else {
    }
  }

  async function handleEdit(blogItem) {
    setCurrentEditedBlogId(blogItem?._id);
    setBlogFormData({
      title: blogItem?.title,
      description: blogItem?.description,
    });
    setOpenBlogDialog(true);
  }

  return (
    <div className="min-h-screen flex flex-col gap-10 bg-gradient-to-r from-purple-500 to-blue-600 p-6">
      <AddNewBlog
        openBlogDialog={openBlogDialog}
        setOpenBlogDialog={setOpenBlogDialog}
        loading={loading}
        setLoading={setLoading}
        blogFormData={blogFormData}
        setBlogFormData={setBlogFormData}
        handleSaveBlogData={handleSaveBlogData}
        currentEditedBlogId={currentEditedBlogId}
        setCurrentEditedBlogId={setCurrentEditedBlogId}
      />
      <div className="grid grid-cols-1 sm: grid-cols-2 lg: grid-cols-3 gap-6 mt-5">
        {blogList && blogList.length > 0 ? (
          blogList.map((blogItem) => (
            <Card className="p-5">
              <CardContent>
                <CardTitle className="mb-5">{blogItem?.title}</CardTitle>
                <CardDescription>{blogItem?.description}</CardDescription>
                <div className="mt-5 flex gap-5 items-center">
                  <Button onClick={() => handleEdit(blogItem)}>Edit</Button>
                  <Button onClick={() => handleDeleteBlogById(blogItem?._id)}>
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Label className="text-3xl font-extrabold">
            No blogs found please add one
          </Label>
        )}
      </div>
    </div>
  );
}

export default BlogOverview;
