export const environment = {
  production: false,
  api: 'http://localhost:3001/api/1.0'
};

export const spotifyCongifuration = {
  refreshAccessToken: 'https://accounts.spotify.com/api/token',
  apiSpotify: 'https://api.spotify.com/v1/',

  authEnpoint: 'https://accounts.spotify.com/authorize',
  clientId: '8b3c2dd5cd464b9f9bc179cdaca8e42b',
  clientSecret: '451d5e8b0b504465b4d769d7c7a5b715',
  redirectUrl: 'http://localhost:4200/auth/login',
  scopes: [
    "user-read-currently-playing", // musica tocando agora.
    "user-read-recently-played", // ler musicas tocadas recentemente
    "user-read-playback-state", // ler estado do player do usuario
    "user-top-read", // top artistas e musicas do usuario
    "user-modify-playback-state", // alterar do player do usuario.
    "user-library-read", // ler biblioteca dos usuarios
    "playlist-read-private", // ler playlists privads
    "playlist-read-collaborative" // ler playlists colaborativas
  ]
}
