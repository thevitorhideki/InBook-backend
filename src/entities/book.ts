import { Replace } from '@/helpers/Replace';
import { Genre, Language } from '@prisma/client';
import { Review } from './review';
import { UserBookInteraction } from './user-book-interaction';

export interface IBookProps {
  title: string;
  description: string;
  genres: Genre[];
  language: Language;
  pages: number;
  duration: number;
  publicationYear?: number | null;
  coverImageUrl?: string | null;
  ebookFileUrl?: string | null;
  audiobookFileUrl?: string | null;
  authorId: number;
  reviews?: Review[] | null;
  interactions?: UserBookInteraction[] | null;

  createdAt: Date;
  updatedAt?: Date | null;
}

export class Book {
  private _id: number;
  private props: IBookProps;

  constructor(props: Replace<IBookProps, { createdAt?: Date }>, id?: number) {
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
      reviews: [],
      interactions: [],
    };
    this._id = id;
  }

  public get id(): number {
    return this._id;
  }

  public get title(): string {
    return this.props.title;
  }

  public get description(): string {
    return this.props.description;
  }

  public get genres(): Genre[] {
    return this.props.genres;
  }

  public get language(): Language {
    return this.props.language;
  }

  public get pages(): number {
    return this.props.pages;
  }

  public get duration(): number {
    return this.props.duration;
  }

  public get publicationYear(): number | null {
    return this.props.publicationYear;
  }

  public get coverImageUrl(): string | null {
    return this.props.coverImageUrl;
  }

  public get ebookFileUrl(): string | null {
    return this.props.ebookFileUrl;
  }

  public get audiobookFileUrl(): string | null {
    return this.props.audiobookFileUrl;
  }

  public get authorId(): number {
    return this.props.authorId;
  }

  public get reviews(): Review[] {
    return this.props.reviews;
  }

  public get interactions(): UserBookInteraction[] {
    return this.props.interactions;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }

  public get updatedAt(): Date | null | undefined {
    return this.props.updatedAt;
  }

  public set title(title: string) {
    this.props.title = title;
  }

  public set description(description: string) {
    this.props.description = description;
  }

  public set genres(genres: string[]) {
    const genresEnum: Genre[] = genres.map(
      (genre) => Genre[genre as keyof typeof Genre],
    );
    this.props.genres = genresEnum;
  }

  public set language(language: string) {
    const languageEnum: Language = Language[language as keyof typeof Language];
    this.props.language = languageEnum;
  }

  public set pages(pages: number) {
    this.props.pages = pages;
  }

  public set duration(duration: number) {
    this.props.duration = duration;
  }

  public set publicationYear(publicationYear: number | null) {
    this.props.publicationYear = publicationYear;
  }

  public set coverImageUrl(coverImageUrl: string | null) {
    this.props.coverImageUrl = coverImageUrl;
  }

  public set ebookFileUrl(ebookFileUrl: string | null) {
    this.props.ebookFileUrl = ebookFileUrl;
  }

  public set audiobookFileUrl(audiobookFileUrl: string | null) {
    this.props.audiobookFileUrl = audiobookFileUrl;
  }

  public set authorId(authorId: number) {
    this.props.authorId = authorId;
  }
}
