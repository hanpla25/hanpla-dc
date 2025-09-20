"use server";

import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { createClient } from "@/app/utils/supabase/server";

// --- Types ---
import { PostActionType } from "../types/actions";
import { JSONContent } from "@tiptap/react";
import { error } from "console";
import { maskIpAddress } from "@/app/utils/maskIpAddress";

const getIp = async (): Promise<string> => {
  const headersList = await headers();
  const ipAddress =
    headersList.get("x-forwarded-for")?.split(",")[0] ?? "unknown";

  return ipAddress;
};

const getFilePath = async (file: File): Promise<string> => {
  const fileExt = file.name.split(".").pop();
  const filePath = `placeholder/${Date.now()}.${fileExt}`;

  return filePath;
};

const uploadImage = async (filePath: string, file: File): Promise<void> => {
  const supabase = await createClient();

  const { error } = await supabase.storage
    .from("images")
    .upload(filePath, file, { upsert: true });

  if (error) console.error(error);
};

const getPublicUrl = async (filePath: string): Promise<string> => {
  const supabase = await createClient();

  const { data } = supabase.storage.from("images").getPublicUrl(filePath);

  return data.publicUrl;
};

const moveImage = async (imageName: string): Promise<void> => {
  const supabase = await createClient();

  const { error } = await supabase.storage
    .from("images")
    .move(`placeholder/${imageName}`, `post/${imageName}`);

  if (error) console.error(error);
};

const extractImageNamesFromContent = (content: string): string[] => {
  const contentObj = JSON.parse(content);

  const imageNames: string[] = [];

  function traverse(node: JSONContent) {
    if (node.type === "image" && node.attrs?.src) {
      try {
        const url = new URL(node.attrs.src);
        const pathParts = url.pathname.split("/");

        const fileName = pathParts[pathParts.length - 1];
        imageNames.push(fileName);
      } catch {
        console.error(error);
      }
    }

    if (node.content && Array.isArray(node.content)) {
      node.content.forEach(traverse);
    }
  }

  traverse(contentObj);

  return imageNames;
};

const convertSrcToNewPath = (src: string): string => {
  try {
    const url = new URL(src);
    const parts = url.pathname.split("/");
    const fileName = parts.pop();
    if (!fileName) return src;

    const newPath = `/storage/v1/object/public/images/post/${fileName}`;
    url.pathname = newPath;
    url.search = "";

    return url.toString();
  } catch {
    return src;
  }
};

const updateContentImagePaths = (contentObj: JSONContent) => {
  if (contentObj.type === "image" && contentObj.attrs?.src) {
    contentObj.attrs.src = convertSrcToNewPath(contentObj.attrs.src);
  }
  if (contentObj.content && Array.isArray(contentObj.content)) {
    for (const child of contentObj.content) {
      updateContentImagePaths(child);
    }
  }
};

export const getImageUrl = async (file: File): Promise<string> => {
  const filePath = await getFilePath(file);
  await uploadImage(filePath, file);
  const publicUrl = await getPublicUrl(filePath);

  return publicUrl;
};

export async function writeAction(
  _prevState: PostActionType | null,
  formData: FormData
) {
  const [ipAddress] = await Promise.all([getIp()]);

  const abbr = formData.get("abbr") as string;
  const gallName = formData.get("gallName") as string;
  const title = formData.get("title") as string;
  const content = formData.get("content");
  const nickname = formData.get("nickname") as string;
  const password = formData.get("password") as string;
  const formIsLogin = formData.get("isLogin") as string;
  const isLogin = formIsLogin === "true" ? true : false;

  if (typeof content !== "string")
    return {
      success: false,
      msg: "글쓰기 오류.",
    };

  if (content.length === 0) {
    return {
      success: false,
      msg: "내용을 입력해주세요.",
    };
  }

  const contentObj = JSON.parse(content);

  const imageNames = extractImageNamesFromContent(content);
  await Promise.all(imageNames.map((name) => moveImage(name)));
  updateContentImagePaths(contentObj);

  const updatedContent = contentObj;
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("posts")
    .insert({
      abbr,
      gallName,
      title,
      content: updatedContent,
      nickname,
      ipAddress,
      isLogin,
      password,
    })
    .select("id")
    .single();

  if (error) {
    console.error(error);

    return {
      success: false,
      msg: "글쓰기 오류",
    };
  }

  const postId = data.id;

  redirect(`/${abbr}/${postId}`);
}

export async function increaseCollumFromPosts({
  postId,
  collum,
}: {
  postId: number;
  collum: "likeCount" | "dislikeCount";
}): Promise<number | null> {
  const supabase = await createClient();

  const collumMap = {
    likeCount: "increment_post_like_count",
    dislikeCount: "increment_post_dislike_count",
  };

  const { data, error } = await supabase.rpc(collumMap[collum], {
    postId,
  });

  if (error) {
    console.error(error);
    return null;
  }

  return data?.[0]?.[collum] ?? null;
}

export async function commentAction(formData: FormData) {
  const supabase = await createClient();
  const [ipAddress] = await Promise.all([getIp()]);

  const postId = formData.get("postId") as string;
  const nickname = formData.get("nickname") as string;
  const password = formData.get("password") as string;
  const content = formData.get("content") as string;
  const parentId = formData.get("parentId") as string;
  const formIsLogin = formData.get("isLogin") as string;
  const isLogin = formIsLogin === "true" ? true : false;

  const { data, error } = await supabase
    .from("comments")
    .insert({
      postId,
      nickname,
      password,
      content,
      parentId,
      isLogin,
      ipAddress,
    })
    .select("id,postId,parentId,nickname,content,isLogin,ipAddress,createdAt")
    .single();

  if (error) {
    console.error(error);
  }

  return {
    id: data!.id,
    postId: data!.postId,
    parentId: data!.parentId ?? null,
    nickname: data!.nickname,
    content: data!.content,
    isLogin: data!.isLogin,
    ipAddress: maskIpAddress(ipAddress),
    createdAt: data!.createdAt,
  };
}
