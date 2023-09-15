FROM node:18

# Create app directory
WORKDIR /app

COPY package*.json ./

COPY prisma ./prisma/

RUN npm install

RUN npx prisma generate


# Bundle app source
COPY . .

EXPOSE 4000

CMD ["node", "app.js", "prisma"]