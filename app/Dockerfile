# Utilise une image officielle de Node.js
FROM node:20

# Crée un répertoire de travail dans le conteneur
WORKDIR /usr/src/app

# Copie package.json et package-lock.json
COPY package*.json ./

# Installe les dépendances de l'application
RUN npm install

# Copie le reste du code de l'application
COPY . .

# Expose le port que l'application utilise
EXPOSE 3000

# Commande pour lancer l'application
CMD [ "npm", "start" ]
