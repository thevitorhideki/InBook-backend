export interface IAuthorProps {
  name: string;
  avatarUrl?: string | null;
  about?: string | null;
  birthYear?: number | null;
  nationality?: string | null;
}

export class Author {
  private _id: number;
  private props: IAuthorProps;

  constructor(props: IAuthorProps, id?: number) {
    this.props = {
      ...props,
    };
    this._id = id;
  }

  public get id(): number {
    return this._id;
  }

  public get name(): string {
    return this.props.name;
  }

  public get avatarUrl(): string | null {
    return this.props.avatarUrl;
  }

  public get about(): string | null {
    return this.props.about;
  }

  public get birthYear(): number | null {
    return this.props.birthYear;
  }

  public get nationality(): string | null {
    return this.props.nationality;
  }

  public set name(name: string) {
    this.props.name = name;
  }

  public set avatarUrl(avatarUrl: string | null) {
    this.props.avatarUrl = avatarUrl;
  }

  public set about(about: string | null) {
    this.props.about = about;
  }

  public set birthYear(birthYear: number | null) {
    this.props.birthYear = birthYear;
  }

  public set nationality(nationality: string | null) {
    this.props.nationality = nationality;
  }
}
