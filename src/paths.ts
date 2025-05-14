export type Paths = Record<string, (...arg: string[]) => string>;

const topicsUri = "topics";
const postsUri = "posts";

const paths: Paths = {
  home: () => {
    return "/";
  },
  topicShow: (topicSlug: string) => {
    return `/${topicsUri}/${topicSlug}`;
  },
  postCreate: (topicSlug: string) => {
    return `/${topicsUri}/${topicSlug}/${postsUri}/new`;
  },
  postShow: (topicSlug: string, postId: string) => {
    return `/${topicsUri}/${topicSlug}/${postsUri}/${postId}`;
  },
};

export default paths;
