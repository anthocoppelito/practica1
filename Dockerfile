# Etapa 1: Construcción de la aplicación Angular
FROM node:18 AS build

#Crear carpeta
RUN mkdir -p /app

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar los archivos necesarios para instalar dependencias
COPY package.json package-lock.json /app/

# Instalar las dependencias como el npm install - Si tienes un archivo package-lock.json, puedes usar npm ci en lugar de npm install para instalar dependencias. Esto es más rápido y asegura que las dependencias instaladas coincidan exactamente con las versiones bloqueadas en package-lock.json
RUN npm ci

# Copiar el resto del código fuente
COPY . /app

# Construir la aplicación Angular
RUN npm run build --prod

# Etapa 2: Servir la aplicación con Nginx
FROM nginx:alpine

# Copiar los archivos generados en la etapa de construcción al directorio de Nginx
COPY --from=build /app/dist/primera-app/browser /usr/share/nginx/html

# Copiar configuración personalizada de Nginx (opcional)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponer el puerto 80
EXPOSE 80