import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// This tells the app where to look for your markdown files
const postsDirectory = path.join(process.cwd(), 'content/posts');

export interface Post {
  slug: string;
  title: string;
  date: string;
  description: string;
  content: string;
  image?: string;
  author: string;
}

/**
 * Reads all files in /content/posts and returns them as an array of objects
 */
export function getAllPosts(): Post[] {
  // Create the directory if it doesn't exist yet to prevent errors
  if (!fs.existsSync(postsDirectory)) {
    fs.mkdirSync(postsDirectory, { recursive: true });
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith('.mdx'))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      // matter extracts the metadata (frontmatter) from the top of the file
      const { data, content } = matter(fileContents);

      return {
        slug,
        content,
        title: data.title ?? 'Untitled Post',
        date: data.date ?? new Date().toISOString(),
        description: data.description ?? '',
        author: data.author ?? 'Admin',
        image: data.image,
      } as Post;
    });

  // Sort by date descending (newest first)
  return allPostsData.sort((a, b) => (new Date(b.date).getTime() - new Date(a.date).getTime()));
}

/**
 * Finds a specific post file based on the URL slug
 */
export function getPostBySlug(slug: string): Post | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug,
      content,
      title: data.title ?? 'Untitled Post',
      date: data.date ?? new Date().toISOString(),
      description: data.description ?? '',
      author: data.author ?? 'Admin',
      image: data.image,
    } as Post;
  } catch (e) {
    return null;
  }
}
