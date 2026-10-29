import type { Track } from "../contexts/PlayerContext";

interface ItunesSong{
    trackId: number
    trackName: string
    artistName: string
    artworkUrl100: string
    previewUrl?: string
    primaryGenreName: string
}

export interface SearchSongType{
    term: string
    limit?: number
    signal?: AbortSignal
}

const cache = new Map<string, Track[]>();

function hasPreview(song:ItunesSong): song is ItunesSong & {previewUrl: string} {
    return song.previewUrl !== undefined
}

export async function iTunesSearchSong({term, limit = 50, signal}: SearchSongType): Promise<Track[]>{
    const cleanTerm = term.trim()
    if(!cleanTerm) return [];
    const key = `${cleanTerm.toLowerCase()}|${limit}`;
    const cached = cache.get(key)
    if(cached) return cached
    const url = `https://itunes.apple.com/search?term=${encodeURIComponent(cleanTerm)}&media=music&entity=song&limit=${limit}`
    const response = await fetch(url, {signal});
    if(!response.ok) throw new Error(`iTunes request failed (${response.status})`)
    const data: {results: ItunesSong[]} = await response.json();
    const tracks: Track[] = data.results.filter(hasPreview)
    .map((song) => (
        {
            id: String(song.trackId),
            title: song.trackName,
            artist: song.artistName,
            thumbnail: song.artworkUrl100.replace('100x100', '300x300') ?? null,
            audioUrl: song.previewUrl,
            genre: song.primaryGenreName
        }
    ))
    cache.set(key, tracks)
    return tracks
}