import {
  unstable_parseMultipartFormData,
  type DataFunctionArgs,
  type V2_MetaFunction,
  unstable_createMemoryUploadHandler,
  json,
} from "@remix-run/node";
import { Form, Link, useSubmit, useNavigation } from "@remix-run/react";
import { useState } from "react";
import { Avatar, AvatarImage } from "~/components/ui/avatar";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";

import { CropIcon } from "@radix-ui/react-icons";
import { Button } from "~/components/ui/button";
import CropImage from "~/components/CropImage";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "Update Profile Picture" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

const MAX_SIZE = 1024 * 1024 * 3;

export async function loader({ request }: DataFunctionArgs) {
  //TODO: loading image
  return json({});
}

export async function action({ request }: DataFunctionArgs) {
  const formData = await unstable_parseMultipartFormData(
    request,
    unstable_createMemoryUploadHandler({ maxPartSize: MAX_SIZE })
  );

  const data = Object.fromEntries(formData);
  console.log(data);

  return json({});
}

export default function LoadPhoto() {
  const [fileImage, setFile] = useState<File | null>(null);
  const [fileImageBlob, setFileBlob] = useState<string | undefined>(undefined);
  const [openCrop, setOpenCrop] = useState(false);
  const [openProfile, setOpenProfile] = useState(true);

  const transition = useNavigation(); //useTransition();
  const busy =
    transition.state === "submitting" || transition.state === "loading";

  const submit = useSubmit();

  return !openCrop ? (
    <>
      <Dialog open={openProfile} onOpenChange={setOpenProfile}>
        <DialogContent className="w-full max-w-[600px]">
          <DialogHeader className="">
            <DialogTitle className="mb-2 mt-6">
              <h1 className="text-lg font-bold">Update Profile Picture</h1>
            </DialogTitle>
            <p>Click to upload a new profile picture from your device</p>
          </DialogHeader>

          <Form
            className="w-full"
            method="post"
            encType="multipart/form-data"
            onSubmit={(event) => {
              event.preventDefault();

              const formData = new FormData();
              if (fileImage) {
                formData.append("picture", fileImage);
                submit(formData, {
                  method: "post",
                  encType: "multipart/form-data",
                });
              }
            }}
          >
            <div className="flex justify-start mt-2">
              <div className="flex  flex-col items-center justify-end ">
                <div className="relative">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src={fileImageBlob} alt="" />
                  </Avatar>
                  <div className="absolute inset-0 top-10 left-14 ">
                    {fileImage && (
                      <Button
                        className="w-8 h-8 p-1  bg-black/50 rounded-full"
                        aria-label="Crop"
                        color="primary"
                        onClick={() => setOpenCrop(true)}
                      >
                        <CropIcon />
                      </Button>
                    )}
                  </div>
                </div>
                <div className="mt-2">
                  {fileImage ? (
                    <Button
                      className="w-28 bg-zinc-400 rounded-full font-bold hover:bg-black/50"
                      type="submit"
                      name="intent"
                      value="submit"
                      disabled={busy}
                    >
                      {busy ? "Updating..." : "Update"}
                    </Button>
                  ) : null}
                </div>
              </div>
            </div>
            <hr className="mt-4" />
            <div className="mt-4 flex gap-4 items-center justify-end">
              <Link to="/settings">Cancel</Link>
              <label
                className="bg-zinc-300  flex items-center rounded-full  px-16   text-md h-11  text-white text-center cursor-pointer hover:bg-black/50"
                htmlFor="profilePhoto"
              >
                Upload Picture
              </label>

              <input
                id="profilePhoto"
                type="file"
                hidden
                onChange={(e) => {
                  const file = e.currentTarget.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    setFile(file);
                    reader.onload = (event) => {
                      setFileBlob(
                        event.target?.result?.toString() ?? undefined
                      );
                      setOpenCrop(true);
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />
            </div>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  ) : (
    <CropImage {...{ fileImageBlob, setOpenCrop, setFile, setFileBlob }} />
  );
}
