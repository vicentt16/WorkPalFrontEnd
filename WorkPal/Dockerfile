FROM node:22-slim

WORKDIR /front_end

COPY /WorkPal/package*.json ./
RUN npm install

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]