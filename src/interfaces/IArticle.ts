export interface IArticle {
    id: string;
    title: string;
    description: string;
    content: string;
    url: string;
    image: string; // image-url
    publishedAt: Date;
    lang: string;
    source: ISource;
}

export interface ISource {
    id: string;
    name: string;
    url: string;
    content: string;
}