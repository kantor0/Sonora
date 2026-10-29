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

function hasPreview(song:ItunesSong): song is ItunesSong & {previewUrl: string} {
    return song.previewUrl !== undefined
}

export async function iTunesSearchSong({term, limit = 50, signal}: SearchSongType): Promise<Track[]>{
    try{
        const url = `https://itunes.apple.com/search?term=${encodeURIComponent(term)}&media=music&entity=song&limit=${limit}`
        console.log(url)
        const response = await fetch(url, {signal});
        const data: {results: ItunesSong[]} = await response.json();
        const results = data.results.filter(hasPreview)
        .map((song) => (
            {
                id: String(song.trackId),
                title: song.trackName,
                artist: song.artistName,
                thumbnail: song.artworkUrl100.replace('100x100', '300x300'),
                audioUrl: song.previewUrl
            }
        ))
        return results
    }catch(error){
        return []
        console.warn(error)
    }
}