FROM node:14

# Установите рабочий каталог
WORKDIR /usr/src/app

# Установите зависимости
COPY package*.json ./
RUN npm install

# Скопируйте исходный код
COPY . .

# Откройте порт
EXPOSE 3000

# Запустите приложение
CMD ["npm", "start"]
