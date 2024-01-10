FROM node:14.15.0
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
RUN npm install -g @angular/cli@12
COPY . .
RUN npm run build

CMD ["npm", "start"]
