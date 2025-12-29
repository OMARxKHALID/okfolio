export interface Project {
  title: string;
  category: string;
  categorySlug: string;
  image: string;
  rotation: number;
  description?: string;
  year?: string;
}

export interface Skill {
  name: string;
  level: string;
  color: string;
  iconName?: string;
}

export interface Testimonial {
  name: string;
  role: string;
  text: string;
  gradient: string;
  rotation: number;
}

export interface Category {
  title: string;
  slug: string;
  description: string;
  image: string;
  rotation: number;
}
