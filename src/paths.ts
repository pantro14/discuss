export type Paths = Record<string, (...arg: string[]) => string>;

const topicsUri = 'topics';
const postsUri = 'posts';
const searchUri = 'search';

const paths: Paths = {
  home: () => {
    return '/';
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
  search: (term: string) => {
    return `/${searchUri}?term=${term}`;
  },
};

export default paths;
