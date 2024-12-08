import streamlit as st
from api.openai import GeradorConteudo
from api.youtube import obter_titulos_playlist
from KEYS import *

# Streamlit App
st.title("🎥 Playlist do YouTube")

# Input para o usuário digitar o ID da playlist
playlist_id = st.text_input("Digite o ID da Playlist do YouTube:")

# Botão para buscar vídeos quando o ID for inserido
if playlist_id:    
    # Obter títulos da playlist do YouTube
    with st.spinner("Carregando playlist..."):
        titulos = obter_titulos_playlist(API_KEY_YOUTUBE, playlist_id)

    # Mostrar títulos na tela
    if titulos:
        st.subheader("Vídeos da Playlist:")

        # Opção para inverter a ordem dos vídeos
        inverter_ordem = st.checkbox("Inverter ordem da playlist", value=False)
        if inverter_ordem:
            titulos = list(reversed(titulos))

        # Exibir os títulos na ordem final
        for idx, titulo in enumerate(titulos, start=1):
            st.write(f"{idx}. {titulo}")

        # Escolher um título para gerar conteúdo
        titulo_escolhido = st.selectbox("Escolha um título para gerar conteúdo do capítulo:", titulos)

        # Determinar o capítulo anterior e o capítulo seguinte
        indice_titulo = titulos.index(titulo_escolhido)
        capitulo_anterior = titulos[indice_titulo - 1] if indice_titulo > 0 else "Introdução"
        capitulo_proximo = titulos[indice_titulo + 1] if indice_titulo < len(titulos) - 1 else "Conclusão"
        print("'''''''''''''''''''")
        print(indice_titulo)
        print(capitulo_anterior)
        print(capitulo_proximo)
        
        # Input para o tema
        tema = st.text_input("Digite o tema do seu texto:")

        # Gerar conteúdo com base no título escolhido
        if st.button("Gerar Capítulo"):
            if tema:
                # Criar uma instância da classe GeradorConteudo
                gerador = GeradorConteudo(API_KEY_OPENAI)

                # Gerar o conteúdo do capítulo usando o método da classe
                conteudo = gerador.criar_conteudo_capitulo(
                    "gpt-4o-mini", 1950, titulo_escolhido, tema, capitulo_anterior, capitulo_proximo
                )

                # Exibir o conteúdo gerado
                st.subheader("Conteúdo do Capítulo Gerado:")
                st.write(conteudo)
            else:
                st.error("Por favor, preencha o campo do tema para gerar o capítulo.")
    else:
        st.error("Nenhum vídeo encontrado na playlist!")
