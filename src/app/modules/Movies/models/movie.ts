export interface IMovie {
    CategoryId: string;
    Image: string;
    Title: string;
    IMDBLink: string;
}

export interface IAddMovie {
    category: string;
    image: string;
    IMDBLink: string;
    title: string;
}
