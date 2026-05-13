export interface Game {
  name: string
  image_url: string | null
  release_year: number | null
  main_story: number | null
  main_extra: number | null
  completionist: number | null
  found: boolean
}
