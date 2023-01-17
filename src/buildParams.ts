export const isProd = process.env.NODE_ENV === "production";

// Change this value to disable Redux logging in development
export const enableReduxLogging = !isProd && true;

export const baseUrls: Record<string, string> = {
  newm: isProd ? "https://studio.newm.io/" : "https://garage.newm.io/",
  cloudinary: "https://api.cloudinary.com/",
  lambda: "https://tcnzc8zrqi.execute-api.us-west-2.amazonaws.com/Prod/",
};
