export interface Cat {
  id: number;
  name: string;
  breed: string;
  imageUrl: string;
  likes: number;
}

// What getCats() returns: the cats, plus the moment they were read from the API
export interface CatsSnapshot {
  cats: Cat[];
  fetchedAt: string;
}
