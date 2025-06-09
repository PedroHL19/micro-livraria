# Imagem base derivada do Node
FROM node

# Diretório de trabalho dentro da imagem
WORKDIR /app

# Copia os arquivos da raiz do projeto para /app
COPY . /app

# Instala as dependências do projeto
RUN npm install

# Comando para executar o serviço de shipping
CMD ["node", "/app/services/shipping/index.js"]
