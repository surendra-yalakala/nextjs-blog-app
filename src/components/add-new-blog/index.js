"use client";

import React, { Fragment } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function AddNewBlog({
  openBlogDialog,
  setOpenBlogDialog,
  loading,
  blogFormData,
  setBlogFormData,
  handleSaveBlogData,
  currentEditedBlogId,
  setCurrentEditedBlogId,
}) {
  return (
    <Fragment>
      <div>
        <Button onClick={() => setOpenBlogDialog(true)}>Add New Blog</Button>
      </div>

      <Dialog
        open={openBlogDialog}
        onOpenChange={() => {
          setOpenBlogDialog(false);
          setBlogFormData({
            title: "",
            description: "",
          });
          setCurrentEditedBlogId(null);
        }}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {currentEditedBlogId ? "Edit Blog" : "Add New Blog"}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                className="col-span-3"
                name="title"
                placeholder="Enter blog title"
                value={blogFormData.title}
                onChange={(event) =>
                  setBlogFormData({
                    ...blogFormData,
                    title: event.target.value,
                  })
                }
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Input
                id="description"
                className="col-span-3"
                name="description"
                placeholder="Enter blog description"
                value={blogFormData.description}
                onChange={(event) =>
                  setBlogFormData({
                    ...blogFormData,
                    description: event.target.value,
                  })
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" onClick={handleSaveBlogData}>
              {loading ? "Saving Changes" : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
}

export default AddNewBlog;
