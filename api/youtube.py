from googleapiclient.discovery import build

# Função para obter os títulos da playlist
def obter_titulos_playlist(api_key, playlist_id):
    youtube = build('youtube', 'v3', developerKey=api_key)
    
    # Lista de títulos
    titulos = []
    
    # Requisição inicial
    request = youtube.playlistItems().list(
        part="snippet",
        playlistId=playlist_id,
        maxResults=50
    )
    response = request.execute()
    
    # Coletar títulos
    while response:
        for item in response['items']:
            titulos.append(item['snippet']['title'])
        
        # Verifica se há mais páginas de resultados
        if 'nextPageToken' in response:
            request = youtube.playlistItems().list(
                part="snippet",
                playlistId=playlist_id,
                maxResults=50,
                pageToken=response['nextPageToken']
            )
            response = request.execute()
        else:
            break
    
    return titulos
