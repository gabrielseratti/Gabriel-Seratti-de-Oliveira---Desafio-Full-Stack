FROM node:20-alpine

# Definir diretório de trabalho
WORKDIR /app

# Copiar package.json
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar código do projeto
COPY . .

# Expor porta do Vite
EXPOSE 5173

# Comando para rodar dev server
CMD ["npm", "run", "dev", "--", "--host"]