import requests
import os
import json

class GeradorConteudo:
    def __init__(self, api_key):
        self.api_key = api_key
        self.headers = {"Authorization": f"Bearer {api_key}", "Content-Type": "application/json"}
        self.link = "https://api.openai.com/v1/chat/completions"

    def carregar_prompt_from_txt(self, nome_arquivo):
        """Carrega um prompt a partir de um arquivo de texto."""
        pasta_prompts = os.path.join(os.getcwd(), 'prompts')  # Mudar depois se necessário
        caminho_arquivo = os.path.join(pasta_prompts, nome_arquivo)

        # Verificar se o arquivo existe
        if not os.path.exists(caminho_arquivo):
            raise FileNotFoundError(f"O arquivo '{nome_arquivo}' não foi encontrado na pasta {pasta_prompts}.")
        
        # Carregar o conteúdo do arquivo de texto
        with open(caminho_arquivo, "r") as file:
            return file.read()

    def criar_conteudo_capitulo(self, 
                                modelo, 
                                max_tokens, 
                                titulo, 
                                tema, 
                                capitulo_anterior,
                                capitulo_proximo):
        """Gera o conteúdo de um capítulo com base no prompt e nas variáveis."""
        # Carregar o prompt do arquivo
        prompt = self.carregar_prompt_from_txt('criar_conteudo_capitulo.txt')
        # Substituir as variáveis no prompt
        prompt = prompt.format(titulo=titulo, tema=tema, capitulo_anterior=capitulo_anterior, capitulo_proximo=capitulo_proximo)

        # Montar o corpo da mensagem para a API
        body_mensagem = {
            "model": modelo,  # Definindo o modelo GPT-3.5-turbo
            "messages": [{"role": "user", "content": prompt}],
            "max_tokens": max_tokens,  # Limite de tokens, ajuste conforme necessário
            "temperature": 0.7  # Controle de criatividade
        }
        body_mensagem = json.dumps(body_mensagem)

        # Enviar a requisição para a API do OpenAI
        requisicao = requests.post(self.link, headers=self.headers, data=body_mensagem)
        resposta = requisicao.json()

        return resposta["choices"][0]["message"]["content"].strip()  # Retorna o conteúdo gerado